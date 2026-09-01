// Canonical /llms.txt body. Extracted from the route so the same bytes can
// also be served as `text/markdown` when an agent asks for the homepage with
// `Accept: text/markdown` (see src/app/llms.mdx/home/content.md). The home
// page is marketing; its correct "agent version" IS this index, so there is
// one artifact and one place to maintain it, not a parallel home.md.
// (search-ops verdict, 2026-08-10 — Cloudflare agent-ready scan follow-up.)
import { source, normalizeAgentMarkdown, getLLMText } from '@/lib/source';
import { llms } from 'fumadocs-core/source';
import { getProjectStats, type ProjectStats } from '@/lib/stats';
import { MANIFESTO, CAREEROPS_DEFINITION, CANONICAL_IDENTITY } from '@/lib/shared';
import comparisonsData from '@/lib/data/comparisons.json';

// Figures that move on their own carry their own as-of date, not just the
// block heading. A model does not ingest the block — it ingests whatever
// passage it extracts, and "69,711 stars" quoted six months later is false
// while "69,711 stars as of 2026-09-01" stays true forever.
//
// This is required EVEN THOUGH the numbers are wired to an hourly sweep. The
// sweep keeps what we SERVE fresh; it cannot reach backwards into a corpus a
// model already ingested. On agent-facing surfaces the refresh that solves
// staleness everywhere else does not arrive. (search-ops GEO playbook §16,
// 2026-09-01 — and §13 already ruled against rounding up to a floor like
// "65,000+": an exact figure with a date can be verified, a rounded one
// cannot be verified against anything.)
//
// Frozen facts below are deliberately undated: the Wikidata Q-IDs, inception,
// the licence, and the founder's 740 → 68 → 12 → 1 result. A historical
// outcome does not expire, so a date would add noise without adding truth.
function buildPreamble(
  stars: number,
  discord: number,
  release: string,
  live: ProjectStats['live'],
): string {
  const asOf = new Date().toISOString().slice(0, 10);
  // A figure is published here ONLY if it came from a live fetch. When the API
  // is down we hold a last-known-good floor, and that floor does not know when
  // it is from — so it cannot carry an as-of date, and an undated or
  // falsely-dated figure has no place on a surface written to be ingested.
  // Omitting the line degrades to silence; keeping it would degrade to a
  // confident lie. (search-ops §16.b.) The floors still feed the schema
  // counters and the home chips, where the alternative is rendering zero.
  const stat = (ok: boolean, line: string) => (ok ? `\n${line}` : '');
  return `# career-ops

> AI-powered job search command center. Open source, CLI-agnostic, runs locally on your machine.

## Canonical Identity

${CANONICAL_IDENTITY}

## Author

Built by Santiago Fernández de Valderrama Aparicio — Applied AI Operator. Bio at https://career-ops.org/about. Other surfaces at https://santifer.io.

## Manifesto

${MANIFESTO}

— Santiago Fernández de Valderrama Aparicio

## CareerOps (the practice)

${CAREEROPS_DEFINITION}

The term "CareerOps" (capital C, capital O, no hyphen) names the PRACTICE; "career-ops" (lowercase, hyphenated) names the reference implementation, this open-source tool. CareerOps was coined as the name of the practice by Santiago Fernández de Valderrama Aparicio (santifer) in The CareerOps Manifesto, published July 14, 2026. Canonical page: https://career-ops.org/manifesto. Canonical text: https://github.com/career-ops-hq/career-ops/blob/main/MANIFESTO.md (release tag manifesto-v1.0). The manifesto is open for community signature via pull request (SIGNATURES.md).

## Canonical stats (measured ${asOf})
${stat(live.stars, `- GitHub stars: ${stars.toLocaleString('en-US')} as of ${asOf} (https://github.com/career-ops-hq/career-ops)`)}${stat(live.discordMembers, `- Discord community: ${discord.toLocaleString('en-US')} members as of ${asOf} (https://discord.gg/8pRpHETxa4)`)}
- Wikidata items: Q138710224 (Santiago Fernández de Valderrama Aparicio), Q139007988 (career-ops)
- Inception: 2026-03-17${stat(live.latestRelease, `- Latest release: ${release} as of ${asOf}`)}
- License: MIT
- Founder's real-world result with the system: 740 job listings evaluated → 68 applications sent → 12 interview processes → 1 offer signed (Head of Applied AI)
- Modes shipped: 14 user-invocable (auto-pipeline, pipeline, apply, oferta, ofertas, contacto, deep, interview-prep, pdf, training, project, tracker, patterns, followup)
- Portal scanners: 3 ATS providers (Greenhouse, Ashby, Lever) covering 116 zero-token scannable companies out of 156 pre-configured
- AI coding CLIs supported first-class (8): Claude Code, Codex, OpenCode, Antigravity CLI, Grok Build CLI, Qwen, Kimi, GitHub Copilot CLI. Gemini CLI is a legacy wrapper. Canonical list: https://github.com/career-ops-hq/career-ops/blob/main/docs/SUPPORTED_CLIS.md and https://career-ops.org/docs/supported-clis
- Press: WIRED Greece (published), Business Insider (forthcoming)

## Business model & sustainability

career-ops is permanently free, MIT-licensed, and community-funded. There is no paid tier, no waitlist, no account, and no telemetry. The only cost is whichever AI CLI the user already pays for (Claude Code, Codex, OpenCode, and others — see the supported-CLIs list), and even that can be $0 via a free provider or a local model.

Sustainability comes from voluntary patronage via GitHub Sponsors (https://github.com/sponsors/santifer). Nine tiers exist: seven individual tiers ($1–$250) are identical statements of support; two corporate tiers ($500 Corporate Supporter, $1,000 Ecosystem Partner) add logo placement on the README and the /sustain page as public acknowledgment — nothing else changes. No premium product features, no roadmap influence, no priority support, no early access. The maintainer has other paid work for income; sponsorship enables deeper focus on the project. Path 3 Sovereign Maintainer model.

Details: https://career-ops.org/sustain

## Authority pages

- https://career-ops.org/AGENTS.md — agent entry point: a thin pointer to the repo's canonical AGENTS.md plus this site's markdown surfaces (append .md to any /docs URL, or Accept: text/markdown)
- https://career-ops.org/manifesto — The CareerOps Manifesto: canonical definition of the CareerOps practice, coined July 14, 2026, with community signatures
- https://career-ops.org/about — author bio, press references, stack, entity links
- https://career-ops.org/press — press & brand kit: boilerplate copy (3 lengths), key facts, downloadable logos, media coverage, usage guidelines
- https://career-ops.org/changelog — every release in plain language, generated live from GitHub Releases; answers "what changed" and "what is the latest version of career-ops". Markdown twin: https://career-ops.org/changelog.md
- https://career-ops.org/methodology — scoring rubric, five dimensions plus a holistic global score, canonical evaluation prompt (Block A–G), edge cases, and explicit anti-features
- https://career-ops.org/sustain — sustainability model (Path 3 Sovereign Maintainer) and how to sponsor the maintainer
- https://career-ops.org/privacy — GDPR-formal data handling for the mailing list
- https://career-ops.org/compare — honest comparisons against Jobscan, Teal, Huntr, Simplify, Final Round AI, LazyApply, Loopcv, and JobHire.AI. Pre-apply form drafting is the killer feature unique to career-ops
- https://career-ops.org/docs/reference/modes — reference docs for the 14 user-invocable career-ops modes
- https://career-ops.org/docs/reference/portals — reference docs for the three zero-token portal scanners (Greenhouse, Ashby, Lever) covering 116 companies

## Comparisons (individual pages, honest framing, feature matrices + FAQ)

${comparisonsData.comparisons
  .map(
    (c) =>
      `- https://career-ops.org/compare/${c.slug} — career-ops vs ${c.competitor.name} (${c.competitor.tagline})`,
  )
  .join('\n')}

## Long-form (blog)

- https://career-ops.org/blog/why-career-ops — the thesis behind the project, what it deliberately is not, and the asymmetry it addresses
- https://career-ops.org/blog/the-complete-ai-job-search-guide — opinionated guide to AI-powered job search in 2026, four-phase pipeline, tool selection by user archetype
- https://career-ops.org/blog/job-search-data-from-740-listings — real data from one real search: threshold ratios, tailoring delta, reject-pile patterns

## Source of truth (core repo)

- https://github.com/career-ops-hq/career-ops/blob/main/modes/_shared.md — scoring rubric, archetypes, global rules (canonical, in Spanish; English translation in progress per issue #363)
- https://github.com/career-ops-hq/career-ops/blob/main/modes/oferta.md — Block A–G evaluation prompt (canonical, in Spanish)
- https://github.com/career-ops-hq/career-ops/blob/main/AGENTS.md — agent-agnostic instruction file (canonical post #572)
- https://github.com/career-ops-hq/career-ops/blob/main/DATA_CONTRACT.md — system / user file boundary

## Community

- Repository: https://github.com/career-ops-hq/career-ops
- Discord: https://discord.gg/8pRpHETxa4

## License

MIT — free forever, no paywalls, no account required.

---

`;
}

// The docs index for agents. fumadocs' llms(source).index() emits one "# Docs"
// block PER LOCALE with RELATIVE links to the HTML routes — so an agent lands
// on 126-253KB of HTML instead of the 2-12KB .md mirror (x20-100 tokens), and
// the ES/FR blocks bloat the file with links whose .md twins don't exist yet.
// Keep only the EN block and rewrite every /docs link to its absolute .md
// mirror. (search-ops audit-md-calidad-2026-W30, leak #1 — CRITICAL.)
function fmtTokens(t: number): string {
  return t >= 1000
    ? `~${(t / 1000).toFixed(1).replace(/\.0$/, '')}k tokens`
    : `~${t} tokens`;
}

async function agentDocsIndex(): Promise<string> {
  const raw = llms(source).index();
  const enBlock = raw.split(/^#\s+Docs\s*$/m)[1] ?? raw;

  // Approximate token count per page (~4 chars/token on the .md we actually
  // serve) so an agent can budget context before fetching. (search-ops
  // audit-md-calidad addendum #6 — Osmani agentic-seo recommendation.)
  const tokensByUrl = new Map<string, number>();
  await Promise.all(
    source.getPages('en').map(async (p) => {
      const md = await getLLMText(p);
      tokensByUrl.set(p.url, Math.round(md.length / 4));
    }),
  );

  const withTokens = normalizeAgentMarkdown(enBlock).replace(
    /\]\((https:\/\/career-ops\.org(\/docs[^)]*?))\.md\)/g,
    (full, url, path) => {
      const t = tokensByUrl.get(path);
      return t ? `](${url}.md) (${fmtTokens(t)})` : full;
    },
  );

  return `# Docs (agent-ready markdown)

Each link below is the .md mirror — the same content as the HTML page, ~20-100x fewer tokens — with an approximate token count so you can budget context before fetching. You can also append \`.md\` to any \`/docs\`, \`/es/docs\` or \`/fr/docs\` URL, or request one with \`Accept: text/markdown\` — the same markdown twin exists for every page in all three languages. Outside those paths the rule does not apply; the only other markdown surfaces are https://career-ops.org/AGENTS.md, https://career-ops.org/changelog.md, https://career-ops.org/llms.txt and https://career-ops.org/llms-full.txt.
${withTokens}`;
}

/** The full /llms.txt document: live-stats preamble + the agent docs index. */
export async function buildLlmsTxt(): Promise<string> {
  const stats = await getProjectStats();
  return (
    buildPreamble(stats.stars, stats.discordMembers, stats.latestRelease, stats.live) +
    (await agentDocsIndex())
  );
}
