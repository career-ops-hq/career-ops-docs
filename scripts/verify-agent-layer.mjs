// Anti-regression guard for the agent-facing layer (search-ops V2 audit, #7).
//
// agentic-seo (Osmani) assumes a STATIC docs site — files on disk — but this
// site is Next.js SSR, where AGENTS.md, llms.txt and every docs .md are
// dynamic routes. So instead of a black-box score, this asserts the exact
// invariants each agent-layer PR verified by hand. Any regression (a broken
// .md rewrite, leaked JSX, escaped entities, a disallowed mirror, a lost
// AGENTS.md pointer) fails CI.
//
// Usage: BASE=http://localhost:3999 node scripts/verify-agent-layer.mjs
// Run against a `next start` server (the workflow boots one first).

const BASE = process.env.BASE || 'http://localhost:3999';

/** Per-locale sample: the index, the entry page, and a nested one. */
/** Non-default locales that must have full markdown parity with EN. */
const LOCALES = ['es', 'fr'];

/** Per-locale sample: the index, the entry page, and a nested one. */
const LOCALE_SAMPLE = ['docs', 'docs/introduction/what-is-career-ops', 'docs/faq'];

/** A representative sample; if these hold the exporter/proxy are healthy. */
const DOC_SAMPLE = [
  'docs/faq',
  'docs/free-ai-engine',
  'docs/introduction/guides/apply-for-a-job',
  'docs/reference/modes',
];

const failures = [];
const fail = (msg) => failures.push(msg);

async function get(path, headers = {}) {
  const res = await fetch(`${BASE}${path}`, { headers, redirect: 'manual' });
  const body = await res.text();
  return { res, body, ct: res.headers.get('content-type') || '' };
}

async function main() {
  // 1. /AGENTS.md — 200 markdown, thin pointer to the repo's canonical file.
  {
    const { res, body, ct } = await get('/AGENTS.md');
    if (res.status !== 200) fail(`/AGENTS.md status ${res.status} (want 200)`);
    if (!ct.includes('text/markdown')) fail(`/AGENTS.md content-type "${ct}" (want text/markdown)`);
    if (!body.includes('raw.githubusercontent.com/santifer/career-ops/main/AGENTS.md'))
      fail('/AGENTS.md no longer points to the repo raw AGENTS.md');
  }

  // 2. /llms.txt — 200, absolute .md links, exactly one EN "# Docs" block.
  {
    const { res, body } = await get('/llms.txt');
    if (res.status !== 200) fail(`/llms.txt status ${res.status} (want 200)`);
    const mdLinks = (body.match(/\]\(https:\/\/career-ops\.org\/docs[^)]*\.md\)/g) || []).length;
    if (mdLinks < 20) fail(`/llms.txt has ${mdLinks} absolute .md links (want >= 20)`);
    const docsBlocks = (body.match(/^# Docs\b/gm) || []).length;
    if (docsBlocks !== 1) fail(`/llms.txt has ${docsBlocks} "# Docs" blocks (want exactly 1, EN-only)`);
    if (/\]\(\/(es\/|fr\/)?docs/.test(body)) fail('/llms.txt still has relative /docs links');
  }

  // 3. /llms-full.txt — no escaped entities anywhere (docs + blog).
  {
    const { body } = await get('/llms-full.txt');
    if (/&#x[0-9a-fA-F]+;|&#\d+;/.test(body)) fail('/llms-full.txt contains escaped HTML entities');
  }

  // 4. robots.txt must NOT disallow the /llms.mdx/ mirror.
  {
    const { body } = await get('/robots.txt');
    if (/Disallow:\s*\/llms\.mdx\//.test(body)) fail('robots.txt disallows /llms.mdx/ (agents need it)');
  }

  // 5. Per-doc invariants: .md rewrite, Accept negotiation, browser intact,
  //    and a clean mirror (no escaped entities, no leaked JSX, no relative links).
  for (const slug of DOC_SAMPLE) {
    // 5a. `<url>.md` → markdown mirror + noindex (the next.config rewrite).
    const md = await get(`/${slug}.md`);
    if (md.res.status !== 200) fail(`/${slug}.md status ${md.res.status} (want 200)`);
    if (!md.ct.includes('text/markdown')) fail(`/${slug}.md content-type "${md.ct}"`);
    if ((md.res.headers.get('x-robots-tag') || '') !== 'noindex')
      fail(`/${slug}.md missing X-Robots-Tag: noindex`);

    // 5b. Accept: text/markdown on the human URL → markdown (the proxy).
    const acc = await get(`/${slug}`, { Accept: 'text/markdown' });
    if (!acc.ct.includes('text/markdown')) fail(`/${slug} with Accept:markdown returned "${acc.ct}"`);

    // 5c. A browser (Accept: text/html) still gets HTML.
    const html = await get(`/${slug}`, { Accept: 'text/html,*/*;q=0.8' });
    if (!html.ct.includes('text/html')) fail(`/${slug} browser request returned "${html.ct}" (want html)`);

    // 5d. Mirror body cleanliness.
    const b = md.body;
    if (/&#x[0-9a-fA-F]+;|&#\d+;/.test(b)) fail(`/${slug}.md contains escaped entities`);
    if (/<(div|Tabs?|Steps?|Accordions?|Callout|details|summary)[\s>]/.test(b))
      fail(`/${slug}.md contains leaked JSX tags`);
    // Relative links (root-relative, not anchors/absolute) should not survive.
    if (/\]\(\/(?!\/)[^)]*\)/.test(b)) fail(`/${slug}.md contains relative links`);
  }

  // 6. Locale parity. 32 Spanish URLs shipped with NO markdown twin at all —
  //    the mirror resolved pages without a locale, which fumadocs defaults to
  //    `en`. Assert the same invariants per locale so the asymmetry cannot come
  //    back silently, and assert the content really is in that language: a
  //    mirror quietly serving English would pass every status check while being
  //    worse than a 404.
  for (const lang of LOCALES) {
    for (const slug of LOCALE_SAMPLE) {
      const url = `/${lang}/${slug}`;

      const md = await get(`${url}.md`);
      if (md.res.status !== 200) fail(`${url}.md status ${md.res.status} (want 200)`);
      if (!md.ct.includes('text/markdown')) fail(`${url}.md content-type "${md.ct}"`);
      if ((md.res.headers.get('x-robots-tag') || '') !== 'noindex')
        fail(`${url}.md missing X-Robots-Tag: noindex`);

      const acc = await get(url, { Accept: 'text/markdown' });
      if (!acc.ct.includes('text/markdown'))
        fail(`${url} with Accept:markdown returned "${acc.ct}"`);

      const html = await get(url, { Accept: 'text/html,*/*;q=0.8' });
      if (!html.ct.includes('text/html'))
        fail(`${url} browser request returned "${html.ct}" (want html)`);

      // Must cite its own locale's canonical URL, not the EN one — the cheapest
      // proof that the locale actually reached source.getPage.
      if (!md.body.includes(`career-ops.org/${lang}/`))
        fail(`${url}.md does not cite the ${lang} canonical URL (fell back to en?)`);
    }
  }

  if (failures.length) {
    console.error(`\n✗ Agent-layer guard: ${failures.length} regression(s)\n`);
    for (const f of failures) console.error(`  - ${f}`);
    process.exit(1);
  }
  console.log(
    `✓ Agent-layer guard passed (AGENTS.md, llms.txt, llms-full.txt, robots, ` +
      `${DOC_SAMPLE.length} EN docs × .md/Accept/html/clean, ` +
      `${LOCALES.length} locales × ${LOCALE_SAMPLE.length} pages × .md/Accept/html/locale)`,
  );
}

main().catch((e) => {
  console.error('Agent-layer guard crashed:', e);
  process.exit(1);
});
