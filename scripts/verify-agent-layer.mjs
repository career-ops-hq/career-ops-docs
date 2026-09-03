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

/** Collapse a markdown/HTML fragment to comparable plain text. */
function normalize(t) {
  return t
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/^\d+\.\s+/gm, '')
    .replace(/[\u2018\u2019\u02bc]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Strip tags + decode the few entities the pages actually emit. */
function plain(html) {
  return normalize(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&rsquo;|&#x27;|&#39;/g, "'")
      .replace(/&ldquo;|&rdquo;|&quot;/g, '"')
      .replace(/&amp;/g, '&')
      .replace(/&nbsp;/g, ' ')
      .replace(/&mdash;/g, '\u2014')
      .replace(/&middot;/g, '\u00b7'),
  );
}

/**
 * The signed text of a manifesto twin: between the definition lead and the
 * signature. The signature LABEL localizes ("Signed:" / "Firmado:") while the
 * version line does not, so match the label per language — anchoring on the
 * English one made this return null for Spanish, which the guard caught on its
 * first run.
 */
function signedBody(md) {
  const start = md.indexOf('**v1.0,');
  if (start < 0) return null;
  let end = -1;
  for (const label of ['**Signed:**', '**Firmado:**']) {
    const i = md.indexOf(`\n\n${label}`);
    if (i > start && (end < 0 || i < end)) end = i;
  }
  if (end <= start) return null;
  return md.slice(start, end).trim();
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

  // 2b. /changelog.md — the markdown twin of the #2 route live assistants
  //     request (Vercel agent-channel measurement, 7d to 2026-08-17). It is
  //     not a /docs page, so no rewrite or proxy rule covers it: only this
  //     literal route. It must stay listed in /llms.txt or agents cannot find
  //     it, and each release heading must carry the subject so an extracted
  //     passage stands alone.
  {
    const { res, body, ct } = await get('/changelog.md');
    if (res.status !== 200) fail(`/changelog.md status ${res.status} (want 200)`);
    if (!ct.includes('text/markdown')) fail(`/changelog.md content-type "${ct}" (want text/markdown)`);
    if ((res.headers.get('x-robots-tag') || '') !== 'noindex')
      fail('/changelog.md missing X-Robots-Tag: noindex');
    if (!/^## career-ops v/m.test(body))
      fail('/changelog.md release headings lost their subject (want "## career-ops vX.Y.Z")');
    // One series only — the tool's (venture-ops editorial decision via
    // search-ops, 2026-08-17). A heading whose subject carries a component
    // ("## career-ops web v0.6.1") means another train leaked in. This is the
    // failure mode worth guarding: adding a `cli-*` or `action-*` train would
    // not error, the .map() would just publish extra, silently.
    const foreign = (body.match(/^## career-ops (?!v)\S+/gm) || [])[0];
    if (foreign) fail(`/changelog.md carries a non-tool release train ("${foreign.trim()}")`);
    // Authority pages list the CANONICAL HTML url (an assistant citing a
    // source shows that url to a human, who should not land on raw markdown);
    // the twin rides along inside the same entry. /AGENTS.md is the one .md
    // entry there, legitimately — it has no HTML form. (search-ops, PR #34.)
    const { body: index } = await get('/llms.txt');
    if (!/^- https:\/\/career-ops\.org\/changelog /m.test(index))
      fail('/llms.txt no longer lists the canonical /changelog in Authority pages');
    if (!index.includes('https://career-ops.org/changelog.md'))
      fail('/llms.txt no longer names the /changelog.md twin (agents cannot discover it)');
  }

  // 2c. /manifesto.md + /es/manifesto.md — the twins of the page that DEFINES
  //     the practice. Two languages with two different sources of truth, and
  //     the guard checks each against its own:
  //
  //       EN — the core repo ships MANIFESTO.md (frozen at manifesto-v1.0).
  //            Our copy is frozen too, deliberately (see src/lib/manifesto-text.ts:
  //            a fetched twin could contradict our own HTML page). So the ONLY
  //            thing standing between "frozen" and "stale" is this check.
  //       ES — no upstream exists; the repo is English-only. career-ops.org IS
  //            the canonical Spanish manifesto, so there is nothing to compare
  //            it against except its own rendered page.
  //
  //     Both are also checked paragraph-by-paragraph against the HTML they
  //     mirror. That is the invariant that matters: the twin says what the page
  //     says. It proves the transcription instead of trusting it.
  {
    for (const [lang, url] of [['en', '/manifesto'], ['es', '/es/manifesto']]) {
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

      // Own-canonical invariant, same as the locale docs: a twin that cites the
      // other language's URL has silently served the wrong document.
      const wantCanonical = `https://career-ops.org${url}`;
      if (!md.body.includes(wantCanonical))
        fail(`${url}.md does not cite its own canonical URL (${wantCanonical})`);

      const body = signedBody(md.body);
      if (!body) {
        fail(`${url}.md has no signed body between the lead and the signature`);
        continue;
      }

      // The twin must match the page it mirrors, paragraph by paragraph.
      const pageText = plain(html.body);
      const missing = body
        .split(/\n{2,}/)
        .map(normalize)
        .filter((para) => para.length > 40 && !pageText.includes(para));
      if (missing.length)
        fail(
          `${url}.md diverges from the rendered page in ${missing.length} paragraph(s); ` +
            `first: "${missing[0].slice(0, 70)}…"`,
        );

      if (lang === 'es') {
        // A Spanish twin quietly serving English would pass every check above
        // except this one — and unlike the docs, there is no upstream to
        // recover the Spanish text from if it disappears.
        if (body.includes('We call this practice'))
          fail('/es/manifesto.md is serving the ENGLISH manifesto text');
        if (!body.includes('A esta práctica la llamamos'))
          fail('/es/manifesto.md lost the Spanish signed text');
      }
    }

    // EN against upstream. Three states on purpose: match, mismatch, and
    // could-not-check — the last one FAILS rather than passing quietly. A guard
    // that reports success when it could not run is the two-state instrument
    // that lies when it breaks (search-ops, 2026-08-25).
    const UPSTREAM =
      'https://raw.githubusercontent.com/santifer/career-ops/main/MANIFESTO.md';
    let upstream = null;
    try {
      const r = await fetch(UPSTREAM);
      if (r.ok) upstream = await r.text();
      else fail(`could not verify /manifesto.md against upstream: HTTP ${r.status}`);
    } catch (e) {
      fail(`could not verify /manifesto.md against upstream: ${e.message}`);
    }
    if (upstream) {
      const start = upstream.indexOf('**v1.0,');
      const end = upstream.indexOf('\n\n**Signed:**');
      const theirs = start >= 0 && end > start ? upstream.slice(start, end).trim() : null;
      const { body: mine } = await get('/manifesto.md');
      const ours = signedBody(mine);
      if (!theirs) fail('upstream MANIFESTO.md no longer has the expected shape');
      else if (!ours) fail('/manifesto.md has no signed body to compare with upstream');
      else if (theirs !== ours)
        fail(
          'the frozen manifesto text no longer matches the core repo MANIFESTO.md ' +
            '(upstream moved, or our copy drifted) — reconcile before shipping',
        );
    }
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
    `✓ Agent-layer guard passed (AGENTS.md, llms.txt, changelog.md, manifesto.md \u00d72 vs upstream+page, llms-full.txt, robots, ` +
      `${DOC_SAMPLE.length} EN docs × .md/Accept/html/clean, ` +
      `${LOCALES.length} locales × ${LOCALE_SAMPLE.length} pages × .md/Accept/html/locale)`,
  );
}

main().catch((e) => {
  console.error('Agent-layer guard crashed:', e);
  process.exit(1);
});
