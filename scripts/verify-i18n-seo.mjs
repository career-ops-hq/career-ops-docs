// i18n SEO guard (search-ops verdict D9, 30 Sep 2026: "the most valuable item
// on the list").
//
// The site declares its language clusters twice: hreflang links in every page's
// HTML and xhtml:link alternates in the sitemap. Two declarations of the same
// fact drift unless something compares them, and a broken cluster is silent:
// Google drops hreflang it cannot reciprocate without telling anyone. So for
// every URL in the sitemap this checks:
//
//   - 200, and a canonical that points at the URL itself;
//   - the hreflang cluster: self-reference, x-default to the English member,
//     each member's code matching its URL prefix, every target in the sitemap
//     (and therefore fetched and required to be 200), and reciprocity: every
//     member lists the same cluster;
//   - parity: the HTML cluster equals the sitemap cluster;
//   - language signals: Content-Language header and <meta http-equiv> equal
//     the URL's locale, og:locale starts with it, and <html lang> equals it
//     (a WARNING until every locale has its own root layout, search-ops D1);
//   - markdown negotiation on docs URLs: the Accept: text/markdown variant and
//     the .md twin are markdown with X-Robots-Tag: noindex, and the negotiated
//     variant carries Vary: Accept. Vary: Accept on the HTML variant is a
//     WARNING: Next's own Vary on prerendered pages drops it (1 Oct 2026). The
//     markdown side already keys shared caches on Accept, which is what keeps
//     the noindex variant away from Googlebot;
//   - /index, /docs/index and every /<locale>/docs/index answer 308 to their
//     canonical URL;
//   - no English URL that production has disappears from the build. New English
//     URLs are reported, never failed: adding a page is legitimate. A removal
//     on purpose goes in ALLOWED_EN_REMOVALS in the same PR, with its redirect.
//
// Three states, never a silent green: PASS (exit 0), FAIL (exit 1) and NOT RUN
// (exit 3). Zero URLs checked is NOT RUN, and so is a production sitemap that
// could not be read for the English comparison.
//
//   BASE=http://localhost:3999 node scripts/verify-i18n-seo.mjs   # the guard
//   node scripts/verify-i18n-seo.mjs --selftest   # prove every check can fail
//
// The selftest builds a correct in-memory site, requires it to pass, then
// sabotages one thing at a time and requires the matching check to fail. A
// check that has stopped looking fails the selftest instead of passing green.
// Node builtins only, so CI runs the selftest before npm ci.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const SITE = 'https://career-ops.org';
const BASE = (process.env.BASE || 'http://localhost:3999').replace(/\/$/, '');
const DEFAULT_LOCALE = 'en';
const CONCURRENCY = 8;

// 'fail' once every locale has its own root layout (search-ops D1, from 6 Oct).
const HTML_LANG_MODE = 'warn';
const HTML_VARY_MODE = 'warn';

// English URLs removed on purpose (each with its 308 in next.config.mjs).
const ALLOWED_EN_REMOVALS = [];

// ---------------------------------------------------------------- parsing

// URLs are compared and fetched exactly as declared. The one equivalence is the
// bare origin: the sitemap lists the English home as https://career-ops.org/
// and its canonical is https://career-ops.org. Normalizing every trailing slash
// would hide a declared https://career-ops.org/de/, which answers 308.
const norm = (u) => (u === `${SITE}/` ? SITE : u);
const decode = (s) =>
  s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'");

function attrs(tag) {
  const out = {};
  for (const [, k, v] of tag.matchAll(/([a-zA-Z_:][-\w:.]*)\s*=\s*"([^"]*)"/g)) {
    out[k.toLowerCase()] = decode(v);
  }
  return out;
}

function parseSitemap(xml) {
  const urls = [];
  for (const block of xml.match(/<url>[\s\S]*?<\/url>/g) || []) {
    const loc = block.match(/<loc>\s*([^<\s]+)\s*<\/loc>/)?.[1];
    if (!loc) continue;
    const cluster = {};
    for (const tag of block.match(/<xhtml:link\b[^>]*>/g) || []) {
      const a = attrs(tag);
      if (a.rel === 'alternate' && a.hreflang && a.href) cluster[a.hreflang] = norm(a.href);
    }
    urls.push({ loc: norm(decode(loc)), cluster });
  }
  return urls;
}

function parseHead(html) {
  const head = html.split(/<\/head>/i)[0];
  const cluster = {};
  let canonical = null;
  let ogLocale = null;
  let metaLang = null;
  for (const tag of head.match(/<link\b[^>]*>/gi) || []) {
    const a = attrs(tag);
    if (a.rel === 'canonical' && a.href) canonical = norm(a.href);
    if (a.rel === 'alternate' && a.hreflang && a.href) cluster[a.hreflang] = norm(a.href);
  }
  for (const tag of head.match(/<meta\b[^>]*>/gi) || []) {
    const a = attrs(tag);
    if (a.property === 'og:locale') ogLocale = a.content ?? null;
    if ((a['http-equiv'] || '').toLowerCase() === 'content-language') metaLang = a.content ?? null;
  }
  const htmlLang = html.match(/<html\b[^>]*\blang="([^"]*)"/i)?.[1] ?? null;
  return { cluster, canonical, ogLocale, metaLang, htmlLang, hasHead: /<\/head>/i.test(html) };
}

const pathOf = (url) => (url.startsWith(SITE) ? url.slice(SITE.length) || '/' : url);

function localeOf(path, locales) {
  const m = path.match(/^\/([a-z]{2}(?:-[a-z]{2})?)(?=\/|$)/i);
  return m && locales.includes(m[1]) ? m[1] : DEFAULT_LOCALE;
}

const isDocs = (path, locales) => {
  const loc = localeOf(path, locales);
  const rest = loc === DEFAULT_LOCALE ? path : path.slice(loc.length + 1) || '/';
  return rest === '/docs' || rest.startsWith('/docs/');
};

const sameCluster = (a, b) => {
  const ka = Object.keys(a).sort();
  const kb = Object.keys(b).sort();
  return ka.length === kb.length && ka.every((k, i) => k === kb[i] && a[k] === b[kb[i]]);
};
const show = (c) =>
  Object.keys(c).sort().map((k) => `${k}=${pathOf(c[k])}`).join(' ') || '(none)';

// ---------------------------------------------------------------- checks
// check(snapshot) is pure: the guard feeds it fetched responses, the selftest
// feeds it a fixture. Returns { fails, warns, info, notRun, checked }.

function check(snap, opts = {}) {
  const htmlLangMode = opts.htmlLangMode ?? HTML_LANG_MODE;
  const htmlVaryMode = opts.htmlVaryMode ?? HTML_VARY_MODE;
  const fails = [];
  const warns = [];
  const info = [];
  const notRun = [];
  const fail = (id, path, msg) => fails.push({ id, path, msg });
  const warn = (id, path, msg) => warns.push({ id, path, msg });

  if (!snap.sitemap) {
    notRun.push('sitemap.xml did not return 200: nothing was checked');
    return { fails, warns, info, notRun, checked: 0 };
  }
  const urls = parseSitemap(snap.sitemap);
  if (urls.length === 0) {
    notRun.push('sitemap.xml lists 0 URLs: nothing was checked');
    return { fails, warns, info, notRun, checked: 0 };
  }
  const bySitemap = new Map(urls.map((u) => [u.loc, u]));
  const locales = [
    ...new Set(urls.flatMap((u) => Object.keys(u.cluster))),
  ].filter((l) => l !== 'x-default' && l !== DEFAULT_LOCALE);

  let checked = 0;
  for (const { loc, cluster: smCluster } of urls) {
    const path = pathOf(loc);
    const locale = localeOf(path, locales);
    const page = snap.pages[path];
    if (!page || page.status !== 200) {
      fail('status', path, `HTML answered ${page ? page.status : 'nothing'}, expected 200`);
      continue;
    }
    checked++;
    const h = parseHead(page.body);
    if (!h.hasHead) fail('head', path, 'no </head> in the HTML');

    // canonical
    if (h.canonical !== loc) fail('canonical', path, `canonical is ${h.canonical ?? '(none)'}, expected ${loc}`);

    // clusters
    const hasSm = Object.keys(smCluster).length > 0;
    const hasHtml = Object.keys(h.cluster).length > 0;
    if (!sameCluster(smCluster, h.cluster)) {
      fail('parity', path, `HTML hreflang [${show(h.cluster)}] differs from the sitemap [${show(smCluster)}]`);
    }
    if (locale !== DEFAULT_LOCALE && !hasSm && !hasHtml) {
      fail('cluster', path, `a ${locale} page declares no hreflang cluster (it must point back to its English twin)`);
    }
    for (const [src, c] of [['sitemap', smCluster], ['HTML', h.cluster]]) {
      if (!Object.keys(c).length) continue;
      if (c[locale] !== loc) fail('self', path, `${src} cluster has ${locale}=${c[locale] ? pathOf(c[locale]) : '(none)'}, expected itself`);
      if (!c['x-default']) fail('x-default-missing', path, `${src} cluster has no x-default`);
      else if (c['x-default'] !== c[DEFAULT_LOCALE]) {
        fail('x-default-target', path, `${src} x-default is ${pathOf(c['x-default'])}, expected the ${DEFAULT_LOCALE} member ${c[DEFAULT_LOCALE] ? pathOf(c[DEFAULT_LOCALE]) : '(none)'}`);
      }
      for (const [code, href] of Object.entries(c)) {
        if (code === 'x-default') continue;
        if (localeOf(pathOf(href), locales) !== code) fail('code', path, `${src} hreflang=${code} points at ${pathOf(href)}, whose prefix is another language`);
        if (!bySitemap.has(href)) fail('target', path, `${src} hreflang=${code} target ${pathOf(href)} is not in the sitemap`);
      }
    }
    if (hasSm) {
      for (const [code, href] of Object.entries(smCluster)) {
        if (code === 'x-default') continue;
        const other = bySitemap.get(href);
        if (other && !sameCluster(other.cluster, smCluster)) {
          fail('reciprocity', path, `its ${code} member ${pathOf(href)} lists [${show(other.cluster)}], not the same cluster`);
        }
      }
    }

    // language signals
    const cl = (page.headers['content-language'] || '').trim();
    if (locale !== DEFAULT_LOCALE) {
      if (cl !== locale) fail('content-language', path, `Content-Language header is '${cl}', expected ${locale}`);
      if (h.metaLang !== locale) fail('meta-content-language', path, `<meta http-equiv="content-language"> is '${h.metaLang ?? ''}', expected ${locale}`);
      if (!h.ogLocale || !h.ogLocale.startsWith(`${locale}_`)) fail('og-locale', path, `og:locale is '${h.ogLocale ?? ''}', expected ${locale}_XX`);
    } else {
      if (cl && cl !== DEFAULT_LOCALE) fail('content-language-en', path, `English page sends Content-Language: ${cl}`);
      if (h.metaLang && h.metaLang !== DEFAULT_LOCALE) fail('meta-content-language-en', path, `English page declares content-language ${h.metaLang}`);
      if (h.ogLocale && !h.ogLocale.startsWith(`${DEFAULT_LOCALE}_`)) fail('og-locale-en', path, `English page declares og:locale ${h.ogLocale}`);
    }
    if (h.htmlLang !== locale) {
      (htmlLangMode === 'fail' ? fail : warn)('html-lang', path, `<html lang="${h.htmlLang ?? ''}">, expected ${locale}`);
    }

    // markdown negotiation (docs, and the English home)
    if (isDocs(path, locales) || path === '/') {
      const neg = snap.negotiated[path];
      if (!neg || neg.status !== 200 || !/text\/markdown/.test(neg.headers['content-type'] || '')) {
        fail('md-negotiation', path, `Accept: text/markdown answered ${neg ? `${neg.status} ${neg.headers['content-type'] || ''}` : 'nothing'}, expected markdown`);
      } else {
        if (!/(^|,)\s*accept\s*(,|$)/i.test(neg.headers.vary || '')) fail('md-vary', path, `markdown variant Vary is '${neg.headers.vary || ''}', expected to include Accept`);
        if (!/noindex/i.test(neg.headers['x-robots-tag'] || '')) fail('md-noindex', path, 'markdown variant has no X-Robots-Tag: noindex');
      }
      if (!/(^|,)\s*accept\s*(,|$)/i.test(page.headers.vary || '')) {
        (htmlVaryMode === 'fail' ? fail : warn)('html-vary', path, `HTML variant Vary is '${page.headers.vary || ''}', without Accept`);
      }
    }
    if (isDocs(path, locales)) {
      const md = snap.mdTwins[path];
      if (!md || md.status !== 200 || !/text\/markdown/.test(md.headers['content-type'] || '')) {
        fail('md-twin', path, `${path === '/' ? '' : path}.md answered ${md ? `${md.status} ${md.headers['content-type'] || ''}` : 'nothing'}, expected markdown`);
      } else if (!/noindex/i.test(md.headers['x-robots-tag'] || '')) {
        fail('md-twin-noindex', path, `${path}.md has no X-Robots-Tag: noindex`);
      }
    }
  }

  // /index → 308
  for (const [from, to] of indexRedirects(locales)) {
    const r = snap.redirects[from];
    const target = r?.location ? norm(pathOf(r.location.replace(/^https?:\/\/[^/]+/, SITE))) : null;
    if (!r || r.status !== 308 || target !== to) {
      fail('index-308', from, `answered ${r ? `${r.status} → ${target ?? '(no Location)'}` : 'nothing'}, expected 308 → ${to}`);
    }
  }

  // English URL set vs production
  if (snap.prodSitemap === undefined) {
    // comparison not requested (BASE is production itself)
  } else if (!snap.prodSitemap) {
    notRun.push('production sitemap could not be read: English URL set not compared');
  } else {
    const en = (list) => new Set(list.filter((u) => localeOf(pathOf(u.loc), locales) === DEFAULT_LOCALE).map((u) => u.loc));
    const prodEn = en(parseSitemap(snap.prodSitemap));
    const buildEn = en(urls);
    if (prodEn.size === 0) notRun.push('production sitemap lists 0 English URLs: not compared');
    // A URL production has and this build lacks is a removal only if
    // production's commit is an ancestor of this build. If a sibling PR merged
    // and deployed after this run checked out, production is AHEAD, and its new
    // pages would read as removals here. CI sets PROD_IS_ANCESTOR from the
    // GitHub Deployments API; a local run leaves it unset and compares.
    const prodAhead = snap.prodIsAncestor === false;
    for (const u of prodEn) {
      if (buildEn.has(u) || ALLOWED_EN_REMOVALS.includes(u)) continue;
      if (prodAhead) info.push(`production is ahead of this build, so not judged a removal: ${pathOf(u)} (re-run after merging main to compare)`);
      else fail('en-removed', pathOf(u), 'English URL in production is missing from this build');
    }
    for (const u of buildEn) if (!prodEn.has(u)) info.push(`new English URL (not in production yet): ${pathOf(u)}`);
    if (prodEn.size) info.push(`English URL set: ${[...prodEn].filter((u) => buildEn.has(u)).length}/${prodEn.size} of production present`);
  }

  return { fails, warns, info, notRun, checked, total: urls.length, locales };
}

function indexRedirects(locales) {
  return [
    ['/index', '/'],
    ['/docs/index', '/docs'],
    ...locales.flatMap((l) => [[`/${l}/index`, `/${l}`], [`/${l}/docs/index`, `/${l}/docs`]]),
  ];
}

// ---------------------------------------------------------------- fetching

async function fetchOne(path, headers = {}) {
  try {
    const res = await fetch(`${BASE}${path}`, { headers, redirect: 'manual' });
    const h = {};
    res.headers.forEach((v, k) => { h[k] = h[k] ? `${h[k]}, ${v}` : v; });
    const body = res.status === 200 ? await res.text() : '';
    return { status: res.status, headers: h, body, location: res.headers.get('location') };
  } catch (e) {
    return { status: `error (${e.cause?.code || e.message})`, headers: {}, body: '' };
  }
}

async function pool(items, fn) {
  const out = new Array(items.length);
  let i = 0;
  await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
    while (i < items.length) { const k = i++; out[k] = await fn(items[k]); }
  }));
  return out;
}

async function collect() {
  const sm = await fetchOne('/sitemap.xml');
  const snap = { sitemap: sm.status === 200 ? sm.body : null, pages: {}, negotiated: {}, mdTwins: {}, redirects: {} };
  if (!snap.sitemap) return snap;
  const urls = parseSitemap(snap.sitemap);
  const locales = [...new Set(urls.flatMap((u) => Object.keys(u.cluster)))].filter((l) => l !== 'x-default' && l !== DEFAULT_LOCALE);
  const paths = urls.map((u) => pathOf(u.loc));
  await pool(paths, async (p) => {
    snap.pages[p] = await fetchOne(p);
    if (isDocs(p, locales) || p === '/') snap.negotiated[p] = await fetchOne(p, { Accept: 'text/markdown' });
    if (isDocs(p, locales)) snap.mdTwins[p] = await fetchOne(`${p}.md`);
  });
  await pool(indexRedirects(locales), async ([from]) => { snap.redirects[from] = await fetchOne(from); });
  if (BASE !== SITE) {
    try {
      const res = await fetch(`${SITE}/sitemap.xml`);
      snap.prodSitemap = res.ok ? await res.text() : null;
    } catch {
      snap.prodSitemap = null;
    }
    if (process.env.PROD_IS_ANCESTOR === '0') snap.prodIsAncestor = false;
    if (process.env.PROD_IS_ANCESTOR === '1') snap.prodIsAncestor = true;
  }
  return snap;
}

// ---------------------------------------------------------------- report

function stateOf(r) {
  if (r.fails.length) return 1;
  if (r.notRun.length || r.checked === 0) return 3;
  return 0;
}

function report(r) {
  for (const i of r.info) console.log(`  info  ${i}`);
  const byId = (list) => list.reduce((m, x) => ((m[x.id] ||= []).push(x), m), {});
  for (const [id, list] of Object.entries(byId(r.warns))) {
    console.log(`  WARN  ${id}: ${list.length} URL(s), e.g. ${list[0].path}: ${list[0].msg}`);
  }
  for (const f of r.fails) console.error(`  FAIL  [${f.id}] ${f.path}: ${f.msg}`);
  for (const n of r.notRun) console.error(`  NOT RUN  ${n}`);
  const state = stateOf(r);
  if (state === 1) console.error(`FAIL: ${r.fails.length} i18n problem(s) on ${r.checked}/${r.total ?? 0} URLs`);
  if (state === 3) console.error(`NOT RUN: ${r.checked} URLs checked; the guard did not run in full, so this is not a pass`);
  if (state !== 0) return state;
  console.log(`PASS: i18n SEO guard, ${r.checked}/${r.total} URLs (locales: en, ${r.locales.join(', ')}), ${r.warns.length} warning(s)`);
  return 0;
}

// ---------------------------------------------------------------- selftest

function fixture() {
  const S = SITE;
  const clusterHome = { en: `${S}`, de: `${S}/de`, 'x-default': `${S}` };
  const clusterFaq = { en: `${S}/docs/faq`, de: `${S}/de/docs/faq`, 'x-default': `${S}/docs/faq` };
  const smLinks = (c) => Object.entries(c).map(([k, v]) => `<xhtml:link rel="alternate" hreflang="${k}" href="${v}"/>`).join('');
  const entry = (loc, c) => `<url><loc>${loc}</loc>${c ? smLinks(c) : ''}<lastmod>2026-09-30T00:00:00.000Z</lastmod></url>`;
  const sitemap = `<?xml version="1.0"?><urlset>${[
    entry(`${S}/`, clusterHome), entry(`${S}/de`, clusterHome),
    entry(`${S}/docs/faq`, clusterFaq), entry(`${S}/de/docs/faq`, clusterFaq),
    entry(`${S}/about`, null),
  ].join('')}</urlset>`;
  const html = ({ lang, canonical, cluster, og, meta }) => `<!DOCTYPE html><html lang="${lang}"><head>` +
    (meta ? `<meta http-equiv="content-language" content="${meta}"/>` : '') +
    `<link rel="canonical" href="${canonical}"/>` +
    (cluster ? Object.entries(cluster).map(([k, v]) => `<link rel="alternate" hrefLang="${k}" href="${v}"/>`).join('') : '') +
    (og ? `<meta property="og:locale" content="${og}"/>` : '') + '</head><body>x</body></html>';
  const ok = (body, extra = {}) => ({ status: 200, headers: { 'content-type': 'text/html; charset=utf-8', vary: 'rsc, Accept', ...extra }, body });
  const md = { status: 200, headers: { 'content-type': 'text/markdown; charset=utf-8', vary: 'Accept', 'x-robots-tag': 'noindex' }, body: '# x' };
  const redirect = (to) => ({ status: 308, headers: {}, body: '', location: `http://localhost:3999${to}` });
  return {
    sitemap,
    pages: {
      '/': ok(html({ lang: 'en', canonical: `${S}`, cluster: clusterHome })),
      '/de': ok(html({ lang: 'de', canonical: `${S}/de`, cluster: clusterHome, og: 'de_DE', meta: 'de' }), { 'content-language': 'de' }),
      '/docs/faq': ok(html({ lang: 'en', canonical: `${S}/docs/faq`, cluster: clusterFaq })),
      '/de/docs/faq': ok(html({ lang: 'de', canonical: `${S}/de/docs/faq`, cluster: clusterFaq, og: 'de_DE', meta: 'de' }), { 'content-language': 'de' }),
      '/about': ok(html({ lang: 'en', canonical: `${S}/about` })),
    },
    negotiated: { '/': { ...md }, '/docs/faq': { ...md }, '/de/docs/faq': { ...md } },
    mdTwins: { '/docs/faq': { ...md }, '/de/docs/faq': { ...md } },
    redirects: {
      '/index': redirect('/'), '/docs/index': redirect('/docs'),
      '/de/index': redirect('/de'), '/de/docs/index': redirect('/de/docs'),
    },
    prodSitemap: sitemap,
  };
}

const clone = (o) => JSON.parse(JSON.stringify(o));
const edit = (snap, path, from, to) => {
  const p = snap.pages[path];
  if (!p.body.includes(from)) throw new Error(`selftest fixture: '${from}' not in ${path}`);
  p.body = p.body.replace(from, to);
};

// Each saboteur breaks exactly one thing; `expect` is the check id that must fail.
const SABOTAGE = [
  ['status', (s) => { s.pages['/de/docs/faq'].status = 404; }],
  ['canonical', (s) => edit(s, '/de', 'rel="canonical" href="https://career-ops.org/de"', 'rel="canonical" href="https://career-ops.org"')],
  ['self', (s) => { edit(s, '/de/docs/faq', '<link rel="alternate" hrefLang="de" href="https://career-ops.org/de/docs/faq"/>', ''); }],
  ['parity', (s) => edit(s, '/', '</head>', '<link rel="alternate" hrefLang="fr" href="https://career-ops.org/fr"/></head>')],
  ['x-default-target', (s) => { s.sitemap = s.sitemap.replace('hreflang="x-default" href="https://career-ops.org/docs/faq"/>', 'hreflang="x-default" href="https://career-ops.org/de/docs/faq"/>'); }],
  ['target', (s) => { s.sitemap = s.sitemap.split('hreflang="de" href="https://career-ops.org/de/docs/faq"').join('hreflang="de" href="https://career-ops.org/de/docs/faqx"'); }],
  ['reciprocity', (s) => { s.sitemap = s.sitemap.replace(/(<loc>https:\/\/career-ops\.org\/de<\/loc>)<xhtml:link rel="alternate" hreflang="en" href="https:\/\/career-ops\.org"\/>/, '$1'); }],
  ['code', (s) => { s.sitemap = s.sitemap.split('hreflang="de" href="https://career-ops.org/de"/>').join('hreflang="fr" href="https://career-ops.org/de"/>'); }],
  ['cluster', (s) => {
    s.sitemap = s.sitemap.replace(/(<loc>https:\/\/career-ops\.org\/de\/docs\/faq<\/loc>)(<xhtml:link[^>]*>)+/, '$1');
    s.pages['/de/docs/faq'].body = s.pages['/de/docs/faq'].body.replace(/<link rel="alternate"[^>]*>/g, '');
  }],
  ['content-language', (s) => { delete s.pages['/de'].headers['content-language']; }],
  ['meta-content-language', (s) => edit(s, '/de/docs/faq', 'content="de"/>', 'content="en"/>')],
  ['og-locale', (s) => edit(s, '/de', 'content="de_DE"', 'content="en_US"')],
  ['md-negotiation', (s) => { s.negotiated['/de/docs/faq'] = { status: 200, headers: { 'content-type': 'text/html' }, body: '' }; }],
  ['md-vary', (s) => { s.negotiated['/docs/faq'].headers.vary = 'rsc'; }],
  ['md-noindex', (s) => { delete s.negotiated['/docs/faq'].headers['x-robots-tag']; }],
  ['md-twin-noindex', (s) => { delete s.mdTwins['/de/docs/faq'].headers['x-robots-tag']; }],
  ['head', (s) => edit(s, '/about', '</head>', '')],
  ['x-default-missing', (s) => {
    s.sitemap = s.sitemap.split('<xhtml:link rel="alternate" hreflang="x-default" href="https://career-ops.org/docs/faq"/>').join('');
    for (const p of ['/docs/faq', '/de/docs/faq']) edit(s, p, '<link rel="alternate" hrefLang="x-default" href="https://career-ops.org/docs/faq"/>', '');
  }],
  ['content-language-en', (s) => { s.pages['/'].headers['content-language'] = 'de'; }],
  ['meta-content-language-en', (s) => edit(s, '/', '<head>', '<head><meta http-equiv="content-language" content="de"/>')],
  ['og-locale-en', (s) => edit(s, '/', '</head>', '<meta property="og:locale" content="de_DE"/></head>')],
  // A declared URL with a trailing slash answers 308: it must not be read as
  // the slashless page that answers 200.
  ['status', (s) => {
    s.sitemap = s.sitemap.split('https://career-ops.org/de<').join('https://career-ops.org/de/<').split('href="https://career-ops.org/de"').join('href="https://career-ops.org/de/"');
    for (const p of ['/', '/de']) s.pages[p].body = s.pages[p].body.split('href="https://career-ops.org/de"').join('href="https://career-ops.org/de/"');
    s.pages['/de/'] = { status: 308, headers: {}, body: '', location: '/de' };
  }],
  ['md-twin', (s) => { s.mdTwins['/docs/faq'] = { status: 404, headers: {}, body: '' }; }],
  ['index-308', (s) => { s.redirects['/de/docs/index'].status = 307; }],
  ['en-removed', (s) => { s.prodSitemap = s.prodSitemap.replace('</urlset>', '<url><loc>https://career-ops.org/press</loc></url></urlset>'); }],
  ['html-lang', (s) => edit(s, '/de', '<html lang="de">', '<html lang="en">'), { htmlLangMode: 'fail' }],
  ['html-vary', (s) => { s.pages['/docs/faq'].headers.vary = 'rsc'; }, { htmlVaryMode: 'fail' }],
];

function selftest() {
  const problems = [];
  // Every id the guard can fail with must have a sabotage, so a check added
  // later without one turns the selftest red instead of going unproven.
  const source = readFileSync(fileURLToPath(import.meta.url), 'utf8');
  const ids = new Set([...source.matchAll(/\bfail\('([a-z0-9-]+)'|\? fail : warn\)\('([a-z0-9-]+)'/g)].map((m) => m[1] || m[2]));
  const covered = new Set(SABOTAGE.map(([id]) => id));
  for (const id of ids) if (!covered.has(id)) problems.push(`check '${id}' has no sabotage in SABOTAGE`);
  if (ids.size < 20) problems.push(`found only ${ids.size} check ids in the source: the scan itself is broken`);
  const good = check(fixture(), { htmlLangMode: 'fail', htmlVaryMode: 'fail' });
  if (good.fails.length || good.notRun.length || good.checked !== 5) {
    problems.push(`the correct fixture does not pass: ${good.checked}/5 checked, ${[...good.fails.map((f) => `[${f.id}] ${f.path}: ${f.msg}`), ...good.notRun].join(' | ')}`);
  }
  for (const [id, sabotage, opts] of SABOTAGE) {
    const s = clone(fixture());
    sabotage(s);
    const r = check(s, { htmlLangMode: 'fail', htmlVaryMode: 'fail', ...opts });
    if (!r.fails.some((f) => f.id === id)) {
      problems.push(`sabotage '${id}' went undetected (fails: ${r.fails.map((f) => f.id).join(', ') || 'none'})`);
    }
  }
  // warn mode reports and does not fail
  const w = clone(fixture());
  edit(w, '/de', '<html lang="de">', '<html lang="en">');
  const rw = check(w, { htmlLangMode: 'warn', htmlVaryMode: 'fail' });
  if (rw.fails.length || !rw.warns.some((x) => x.id === 'html-lang')) problems.push('html-lang in warn mode must warn, not fail');
  // the three states
  const empty = clone(fixture()); empty.sitemap = '<urlset></urlset>';
  if (stateOf(check(empty)) !== 3) problems.push('0 URLs must be NOT RUN (exit 3)');
  const noProd = clone(fixture()); noProd.prodSitemap = null;
  const rp = check(noProd, { htmlLangMode: 'fail', htmlVaryMode: 'fail' });
  if (stateOf(rp) !== 3) problems.push('an unreadable production sitemap must be NOT RUN (exit 3)');

  if (problems.length) {
    console.error(`FAIL: selftest, ${problems.length} problem(s):`);
    for (const p of problems) console.error(`  ${p}`);
    return 1;
  }
  // production ahead of the build: its extra English URL is info, not a removal
  const ahead = clone(fixture());
  ahead.prodSitemap = ahead.prodSitemap.replace('</urlset>', '<url><loc>https://career-ops.org/press</loc></url></urlset>');
  ahead.prodIsAncestor = false;
  const ra = check(ahead, { htmlLangMode: 'fail', htmlVaryMode: 'fail' });
  if (ra.fails.length || !ra.info.some((i) => i.includes('production is ahead'))) problems.push('production ahead of the build must be info, not en-removed');
  console.log(`PASS: selftest, ${ids.size} check ids found in the source, each with a sabotage; the correct fixture passes and all ${SABOTAGE.length} sabotages are caught; production ahead is info; 0 URLs and an unreadable production sitemap are NOT RUN`);
  return 0;
}

// ---------------------------------------------------------------- main

if (process.argv.includes('--selftest')) {
  process.exit(selftest());
} else {
  const snap = await collect();
  process.exit(report(check(snap)));
}
