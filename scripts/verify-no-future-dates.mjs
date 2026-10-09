// No date on the site may be later than the build.
//
// On 29-sep a change prepared for a 3 October deploy shipped on 29 September
// with its dates still set to 3 October: three sitemap <lastmod> values, three
// schema dateModified values and three visible "Last updated" lines were in
// the future. A future lastmod is the signal that makes Google stop trusting
// lastmod for the whole sitemap, and indexnow.yml kept re-announcing those
// URLs on every push because their lastmod always sat above the push window.
// Nothing noticed; it surfaced while reading an IndexNow log.
//
// For the sitemap and every URL in it, this checks that no <lastmod>, no
// JSON-LD datePublished/dateModified and no <time datetime> is later than now
// (plus a few minutes of clock skew).
//
// Usage: BASE=http://localhost:3999 node scripts/verify-no-future-dates.mjs
// Run against a `next start` server (the guard boots one first). Node
// builtins only.

const BASE = process.env.BASE || 'http://localhost:3999';
const SITE = 'https://career-ops.org';
const LIMIT = Date.now() + 10 * 60 * 1000;

const failures = [];
function check(where, what, value) {
  const t = Date.parse(value);
  if (!Number.isNaN(t) && t > LIMIT) failures.push(`${where}  ${what} = ${value}`);
}

async function get(path) {
  const res = await fetch(`${BASE}${path}`, { redirect: 'manual' });
  if (!res.ok) return null;
  return res.text();
}

const sitemap = await get('/sitemap.xml');
if (!sitemap) {
  console.error('FAIL: /sitemap.xml did not return 200');
  process.exit(1);
}

const urls = [];
for (const block of sitemap.match(/<url>[\s\S]*?<\/url>/g) || []) {
  const loc = block.match(/<loc>\s*([^<\s]+)\s*<\/loc>/)?.[1];
  const lastmod = block.match(/<lastmod>\s*([^<\s]+)\s*<\/lastmod>/)?.[1];
  if (!loc) continue;
  urls.push(loc);
  if (lastmod) check(loc, 'sitemap <lastmod>', lastmod);
}

for (const loc of urls) {
  const path = loc.startsWith(SITE) ? loc.slice(SITE.length) || '/' : loc;
  const html = await get(path);
  if (!html) continue;
  for (const [, json] of html.matchAll(
    /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
  )) {
    for (const [, key, value] of json.matchAll(/"(datePublished|dateModified)"\s*:\s*"([^"]+)"/g)) {
      check(loc, `JSON-LD ${key}`, value);
    }
  }
  for (const [, value] of html.matchAll(/<time[^>]*\bdate[tT]ime="([^"]+)"/g)) {
    check(loc, '<time datetime>', value);
  }
}

if (failures.length) {
  console.error(`FAIL: ${failures.length} date(s) later than the build:`);
  for (const f of failures) console.error(`  ${f}`);
  process.exit(1);
}
console.log(`OK: no future dates in the sitemap or on ${urls.length} pages`);
