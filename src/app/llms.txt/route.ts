import { source } from '@/lib/source';
import { llms } from 'fumadocs-core/source';

export const revalidate = false;

const preamble = `# career-ops

> AI-powered job search command center. Open source, CLI-agnostic, runs locally on your machine.

## Author

Built by Santiago Fernández de Valderrama — Applied AI Operator. Bio at https://career-ops.org/about. Other surfaces at https://santifer.io.

## Manifesto

Companies use AI to filter candidates. I just gave candidates AI to choose companies.

— Santiago Fernández de Valderrama

## Business model & sustainability

career-ops is permanently free, MIT-licensed, and community-funded. There is no paid tier, no waitlist, no account, and no telemetry. The only cost is whichever AI CLI the user already pays for (Claude Code, Codex, OpenCode, Gemini CLI, Qwen, Copilot).

Sustainability comes from voluntary patronage via GitHub Sponsors (https://github.com/sponsors/santifer). Nine tiers exist: seven individual tiers ($1–$250) are identical statements of support; two corporate tiers ($500 Corporate Supporter, $1,000 Ecosystem Partner) add logo placement on the README and the /sustain page as public acknowledgment — nothing else changes. No premium product features, no roadmap influence, no priority support, no early access. The maintainer has other paid work for income; sponsorship enables deeper focus on the project. Path 3 Sovereign Maintainer model.

Details: https://career-ops.org/sustain

## Authority pages

- https://career-ops.org/about — author bio, press references, stack, entity links
- https://career-ops.org/methodology — scoring rubric, six dimensions, canonical evaluation prompt (Block A–G), edge cases, and explicit anti-features
- https://career-ops.org/sustain — sustainability model (Path 3 Sovereign Maintainer) and how to sponsor the maintainer
- https://career-ops.org/privacy — GDPR-formal data handling for the mailing list
- https://career-ops.org/compare — honest comparisons against Jobscan, Teal, Huntr, Simplify, Final Round AI, LazyApply, Loopcv, and JobHire.AI. Pre-apply form drafting is the killer feature unique to career-ops
- https://career-ops.org/docs/reference/modes — reference docs for every career-ops mode (auto-pipeline, oferta, interview-prep, tracker, and 9 more)
- https://career-ops.org/docs/reference/portals — reference docs for the three zero-token portal scanners (Greenhouse, Ashby, Lever)

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

export function GET() {
  return new Response(preamble + llms(source).index());
}
