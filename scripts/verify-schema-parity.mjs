// Structured data must describe the page it sits on.
//
// Google's rule for FAQ markup is that every question and answer in the
// JSON-LD is visible on the page. Twice in September that rule broke without
// anything noticing: the /docs/faq schema had drifted from the page in nine
// answers, and the Spanish and French docs emitted the English FAQPage (with
// the English page's @id) on pages where none of it is visible. The home FAQ
// schema, a hand-kept copy, had drifted too. Each was found by someone reading
// production HTML by hand. This script does that reading on every build.
//
// For every URL in the sitemap it checks:
//   1. Parity: each FAQPage question and answer, and each DefinedTerm
//      definition, appears verbatim in the page's visible text.
//   2. Language: every JSON-LD node that describes THIS page (its url,
//      @id or mainEntityOfPage is the page's URL) declares the page's own
//      language, from its /es or /fr prefix, English otherwise. Nodes about
//      other things keep their own language: a Greek WIRED article cited as
//      press coverage is rightly "el".
//
// Two escape hatches, both reviewed by search-ops, both narrow:
//   ALLOWED — a deliberate exact substitution inside one claim; any other
//             drift in that claim still fails.
//   KNOWN   — a mismatch owned by someone else, printed on every run and not
//             failing it. When it is fixed the script says so, so the list
//             only shrinks. Empty since 26-sep; keep it that way.
//
// Usage: BASE=http://localhost:3999 node scripts/verify-schema-parity.mjs
// Run against a `next start` server (the guard boots one first). Node
// builtins only.

const BASE = process.env.BASE || 'http://localhost:3999';
const SITE = 'https://career-ops.org';

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
function decode(s) {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => {
    if (e[0] === '#') {
      const code = e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return String.fromCodePoint(code);
    }
    return ENTITIES[e.toLowerCase()] ?? m;
  });
}

// Compare with all whitespace removed: rendering puts line breaks, tags and
// non-breaking spaces where the source had plain spaces, and none of that
// changes what a reader sees. Everything else must match exactly.
const squash = (s) => decode(s).replace(/[\s  ]+/g, '');

function visibleText(html) {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ');
}

function jsonLd(html) {
  const out = [];
  for (const m of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      out.push(JSON.parse(m[1]));
    } catch {
      out.push({ __unparseable: m[1].slice(0, 80) });
    }
  }
  return out;
}

function* nodes(value) {
  if (Array.isArray(value)) {
    for (const v of value) yield* nodes(v);
  } else if (value && typeof value === 'object') {
    yield value;
    for (const v of Object.values(value)) if (v && typeof v === 'object') yield* nodes(v);
  }
}

// Pre-existing mismatches owned by someone other than this repo's agent.
// Key: `${path} | ${claim}` exactly as the failure line prints it after the
// path. Remove an entry the moment its owner resolves it.
const KNOWN = {};

// Deliberate, exact differences between a schema claim and its page, ratified
// by search-ops. Each entry swaps one exact schema string for the exact
// visible string before comparing, so any OTHER drift in that claim still
// fails. The manifesto says "on this page"; the schema travels without the
// page, where "this page" means nothing, so it names the URL instead.
const ALLOWED = {
  '/manifesto | FAQ answer to "Who coined the term CareerOps?"': [
    ['at career-ops.org/manifesto', 'on this page'],
  ],
  '/es/manifesto | FAQ answer to "¿Quién acuñó el término CareerOps?"': [
    ['en career-ops.org/es/manifesto', 'en esta página'],
  ],
};

const localeOf = (path) => (/^\/(es|fr)(\/|$)/.exec(path)?.[1] ?? 'en');

function firstMissingSentence(text, page) {
  const sentences = text.split(/(?<=[.!?:;])\s+/);
  return sentences.find((s) => !page.includes(squash(s))) ?? text;
}

async function main() {
  const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
  const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
    m[1].replace(SITE, '') || '/',
  );
  if (paths.length < 50) throw new Error(`sitemap has only ${paths.length} URLs — refusing to pass on a partial crawl`);

  const failures = [];
  let checked = 0;
  for (const path of paths) {
    const res = await fetch(`${BASE}${path}`);
    if (!res.ok) {
      failures.push({ path, claim: `HTTP ${res.status}`, detail: '' });
      continue;
    }
    const html = await res.text();
    const page = squash(visibleText(html));
    const lang = localeOf(path);

    for (const block of jsonLd(html)) {
      if (block.__unparseable) failures.push({ path, claim: 'unparseable JSON-LD', detail: block.__unparseable });
      for (const n of nodes(block)) {
        const about = [n.url, n['@id'], n.mainEntityOfPage]
          .filter((v) => typeof v === 'string')
          .map((v) => v.split('#')[0].replace(/\/$/, ''));
        const describesPage = about.includes(`${SITE}${path === '/' ? '' : path}`);
        if (describesPage && typeof n.inLanguage === 'string' && n.inLanguage !== lang) {
          failures.push({ path, claim: `${n['@type']} ${n['@id'] ?? ''} declares inLanguage "${n.inLanguage}" on a "${lang}" page`, detail: '' });
        }
        if (n['@type'] === 'Question') {
          checked++;
          let answer = n.acceptedAnswer?.text ?? '';
          for (const [from, to] of ALLOWED[`${path} | FAQ answer to "${n.name}"`] ?? []) {
            if (!answer.includes(from)) {
              failures.push({ path, claim: `FAQ answer to "${n.name}"`, detail: `allowed substitution no longer applies: "${from}" is gone — update ALLOWED` });
            }
            answer = answer.replace(from, to);
          }
          if (!page.includes(squash(n.name ?? ''))) {
            failures.push({ path, claim: `FAQ question not visible: "${n.name}"`, detail: '' });
          } else if (!page.includes(squash(answer))) {
            failures.push({ path, claim: `FAQ answer to "${n.name}"`, detail: `not visible. First missing sentence: "${firstMissingSentence(answer, page)}"` });
          }
        }
        if (n['@type'] === 'DefinedTerm' && typeof n.description === 'string') {
          checked++;
          if (!page.includes(squash(n.description))) {
            failures.push({
              path,
              claim: `glossary definition of "${n.name}"`,
              set: n.inDefinedTermSet ? 'DefinedTermSet' : '',
              detail: `not visible. First missing sentence: "${firstMissingSentence(n.description, page)}"`,
            });
          }
        }
      }
    }
  }

  // A parity check that finds nothing to compare is not a pass: it means the
  // extraction broke. /docs/faq alone carries more than ten questions.
  if (checked < 10) {
    console.error(`FAIL: only ${checked} schema claims found across ${paths.length} URLs — the extraction is broken, not the site clean`);
    process.exit(1);
  }
  const keyOf = (f) => `${f.path} | ${f.claim}`;
  const isKnown = (f) => Boolean(KNOWN[keyOf(f)]);
  const known = failures.filter(isKnown);
  const fresh = failures.filter((f) => !isKnown(f));

  const seenKeys = new Set(failures.map(keyOf));
  const resolved = Object.keys(KNOWN).filter((k) => !seenKeys.has(k));

  if (known.length) {
    console.log(`known issues (${known.length}, not failing — owner in scripts/verify-schema-parity.mjs):`);
    for (const f of known) console.log(`  ~ ${keyOf(f)}`);
  }
  if (resolved.length) {
    console.log(`resolved known issues — delete them from KNOWN:`);
    for (const k of resolved) console.log(`  ✓ ${k}`);
  }
  if (fresh.length) {
    console.error(`FAIL: ${fresh.length} structured-data claims do not match their page (${checked} checked, ${paths.length} URLs)`);
    for (const f of fresh) console.error(`  - ${keyOf(f)} ${f.detail}`);
    process.exit(1);
  }
  console.log(`OK: ${checked} FAQ and glossary claims checked on ${paths.length} URLs; no new mismatch, language matches on every page's own nodes`);
}

main().catch((e) => {
  console.error(`FAIL: ${e.message}`);
  process.exit(1);
});
