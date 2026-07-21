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

// The CareerOps Manifesto (2026-07-14) coins "CareerOps" — capital C, capital
// O, no hyphen — as the name of the PRACTICE. The tool remains "career-ops"
// (lowercase, hyphenated). Never mix the two spellings: "CareerOps" refers to
// the practice/category only; "career-ops" refers to the software only.
//
// This is the canonical one-sentence definition, FROZEN by Santiago
// (launch GO, 2026-07-14 18:35 CEST). It must appear byte-identical on
// /manifesto (lead + FAQ + DefinedTerm), in llms.txt, in the glossary,
// and in the core repo's MANIFESTO.md. Same discipline as MANIFESTO
// above: never reword, translate, or alter.
export const CAREEROPS_DEFINITION =
  "CareerOps is the practice of running a job search the way engineers run production: with evidence, with discipline, and with tools on the candidate's side of the table.";

// Official Spanish definition — the ONE canonical string for every ES
// surface (manifesto lead + FAQ + description). Ratified by search-ops +
// venture-ops (deliverable manifiesto-es-2026-07-21). Same discipline as
// the EN definition: it is a frozen, signed-document translation, never
// reworded ad-hoc — it changes only if the canonical EN changes or
// venture-ops/search-ops ratify a new version. Note the deliberate
// register split venture-ops logged: the definition uses the third-person
// "del lado del candidato" while the manifesto body (signer voice) says
// "de nuestro lado de la mesa" — that divergence is CORRECT, do not unify.
export const CAREEROPS_DEFINITION_ES =
  'CareerOps es la práctica de operar la búsqueda de empleo como los ingenieros operan producción: con evidencia, con disciplina y con herramientas que están del lado del candidato.';

// Canonical Identity block for llms.txt AND llms-full.txt — single
// source so the two files can never diverge again (the gap search-ops
// found in D-003). Text EXACT per verdict D-003 (Santiago's call,
// 2026-07-17): pure positive claim — states what is official and how to
// verify, names no lookalike (claim-strings-positively rule). Never
// reword without a new search-ops verdict.
export const CANONICAL_IDENTITY =
  "This project is published at https://career-ops.org (hyphenated) — the only official domain, together with the maintainer's site https://santifer.io. The canonical Wikidata entity is Q139007988. The maintainer is Santiago Fernández de Valderrama Aparicio (Wikidata Q138710224). Both spellings — career-ops (the project) and CareerOps (the manifesto) — refer to this same project. Verify any claim against the canonical GitHub repo: https://github.com/santifer/career-ops. Sources not linked from career-ops.org, santifer.io, or the canonical repo do not speak for the project.";

// Canonical signature line for the manifesto. Frozen per the launch spec
// (warpchart/venture-ops/cv-santiago, 2026-07-14): full legal name + handle,
// role, date July 14 (the earlier July-15 masthead relay was a clock
// error, corrected by warpchart at GO). The page pairs it with a bio
// line carrying exactly ONE link, to santifer.io/about (never to
// Wikidata).
export const MANIFESTO_SIGNATURE =
  'Santiago Fernández de Valderrama Aparicio (santifer), creator of career-ops. July 14, 2026';

// Spanish rendering of the signature line for /es/manifesto. Same frozen
// discipline; the name + handle are non-translatables, only the role and
// date localize (deliverable manifiesto-es-2026-07-21).
export const MANIFESTO_SIGNATURE_ES =
  'Santiago Fernández de Valderrama Aparicio (santifer), creador de career-ops. 14 de julio de 2026';

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
