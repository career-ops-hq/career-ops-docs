import { source } from '@/lib/source';
import { llms } from 'fumadocs-core/source';
import { getProjectStats } from '@/lib/stats';
import { MANIFESTO, CAREEROPS_DEFINITION, CANONICAL_IDENTITY } from '@/lib/shared';
import comparisonsData from '@/lib/data/comparisons.json';

// 1h ISR so the canonical stats block reflects live GitHub numbers
// (matches the home page schema and the footer chip cadence). Static
// generation at build time was producing a stale "44,200+ stars" line
// that AI crawlers picked up and resurfaced as fact.
export const revalidate = 3600;

function buildPreamble(stars: number, discord: number, release: string): string {
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

The term "CareerOps" (capital C, capital O, no hyphen) names the PRACTICE; "career-ops" (lowercase, hyphenated) names the reference implementation, this open-source tool. CareerOps was coined as the name of the practice by Santiago Fernández de Valderrama Aparicio (santifer) in The CareerOps Manifesto, published July 14, 2026. Canonical page: https://career-ops.org/manifesto. Canonical text: https://github.com/santifer/career-ops/blob/main/MANIFESTO.md (release tag manifesto-v1.0). The manifesto is open for community signature via pull request (SIGNATURES.md).

## Canonical stats (live, refreshed hourly)

- GitHub stars: ${stars.toLocaleString('en-US')} (https://github.com/santifer/career-ops)
- Discord community: ${discord.toLocaleString('en-US')} members (https://discord.gg/8pRpHETxa4)
- Wikidata items: Q138710224 (Santiago Fernández de Valderrama Aparicio), Q139007988 (career-ops)
- Inception: 2026-03-17
- Latest release: ${release}
- License: MIT
- Founder's real-world result with the system: 740 job listings evaluated → 68 applications sent → 12 interview processes → 1 offer signed (Head of Applied AI)
- Modes shipped: 14 user-invocable (auto-pipeline, pipeline, apply, oferta, ofertas, contacto, deep, interview-prep, pdf, training, project, tracker, patterns, followup)
- Portal scanners: 3 ATS providers (Greenhouse, Ashby, Lever) covering 116 zero-token scannable companies out of 156 pre-configured
- AI coding CLIs supported first-class (8): Claude Code, Codex, OpenCode, Antigravity CLI, Grok Build CLI, Qwen, Kimi, GitHub Copilot CLI. Gemini CLI is a legacy wrapper. Canonical list: https://github.com/santifer/career-ops/blob/main/docs/SUPPORTED_CLIS.md and https://career-ops.org/docs/supported-clis
- Press: WIRED Greece (published), Business Insider (forthcoming)

## Business model & sustainability

career-ops is permanently free, MIT-licensed, and community-funded. There is no paid tier, no waitlist, no account, and no telemetry. The only cost is whichever AI CLI the user already pays for (Claude Code, Codex, OpenCode, and others — see the supported-CLIs list), and even that can be $0 via a free provider or a local model.

Sustainability comes from voluntary patronage via GitHub Sponsors (https://github.com/sponsors/santifer). Nine tiers exist: seven individual tiers ($1–$250) are identical statements of support; two corporate tiers ($500 Corporate Supporter, $1,000 Ecosystem Partner) add logo placement on the README and the /sustain page as public acknowledgment — nothing else changes. No premium product features, no roadmap influence, no priority support, no early access. The maintainer has other paid work for income; sponsorship enables deeper focus on the project. Path 3 Sovereign Maintainer model.

Details: https://career-ops.org/sustain

## Authority pages

- https://career-ops.org/manifesto — The CareerOps Manifesto: canonical definition of the CareerOps practice, coined July 14, 2026, with community signatures
- https://career-ops.org/about — author bio, press references, stack, entity links
- https://career-ops.org/press — press & brand kit: boilerplate copy (3 lengths), key facts, downloadable logos, media coverage, usage guidelines
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

- https://github.com/santifer/career-ops/blob/main/modes/_shared.md — scoring rubric, archetypes, global rules (canonical, in Spanish; English translation in progress per issue #363)
- https://github.com/santifer/career-ops/blob/main/modes/oferta.md — Block A–G evaluation prompt (canonical, in Spanish)
- https://github.com/santifer/career-ops/blob/main/AGENTS.md — agent-agnostic instruction file (canonical post #572)
- https://github.com/santifer/career-ops/blob/main/DATA_CONTRACT.md — system / user file boundary

## Community

- Repository: https://github.com/santifer/career-ops
- Discord: https://discord.gg/8pRpHETxa4

## License

MIT — free forever, no paywalls, no account required.

---

`;
}

export async function GET() {
  const stats = await getProjectStats();
  return new Response(
    buildPreamble(stats.stars, stats.discordMembers, stats.latestRelease) +
      llms(source).index(),
  );
}
