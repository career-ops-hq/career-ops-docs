export const appName = 'career-ops';
export const docsRoute = '/docs';
export const docsImageRoute = '/og/docs';
export const docsContentRoute = '/llms.mdx/docs';

// Repo the docs CONTENT lives in — used to build the "Open in GitHub"
// link on every docs page. This is the docs site repo, NOT the core
// `career-ops` repo (that mismatch shipped 404 links on all docs pages
// until 2026-07-06).
export const gitConfig = {
  user: 'santifer',
  repo: 'career-ops-docs',
  branch: 'main',
};

// Signature thesis — LITERAL canonical. Must appear byte-identical on the
// home blockquote, /about, /methodology, llms.txt, and as `slogan` in the
// Schema.org graph. Single source of truth so it can never drift. Never
// reword, translate, or alter the pronoun.
export const MANIFESTO =
  'Companies use AI to filter candidates. I just gave candidates AI to choose companies.';

// Last-known-good floors for live project stats. getProjectStats() never
// returns a value below these, so a transient unauthenticated-GitHub-API
// failure (60 req/hr on shared Vercel IPs) can never leak "0 stars" into
// llms.txt or collapse the schema interactionStatistic counters to zero.
// These are FLOORS, not display values — bump them up as the real numbers
// grow so the safety net stays close to reality.
export const STATS_FLOOR = {
  stars: 56000,
  forks: 11000,
  // Live count now comes from Discord's public invite endpoint in
  // stats.ts (crossed 4,000 on 2026-07-05); this is just the net.
  discordMembers: 4000,
};

// Fallback release tag used when the GitHub releases API is unreachable at
// build / ISR time. Normalised to a leading "v"; sourced from the live
// core repo. Bump on each core release (or rely on the dynamic fetch).
export const LATEST_RELEASE_FALLBACK = 'v1.15.0';
