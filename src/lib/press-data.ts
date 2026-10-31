// Everything /press and /press.md say, in one file, so the page, its markdown
// twin and the schema date cannot disagree. Journalists and directory editors
// copy this text verbatim and answer engines cite it: figures written by hand
// carry PRESS_AS_OF, live ones come from getProjectStats().
import type { ProjectStats } from '@/lib/stats';

// Change these two together, on the day a change to this file ships.
export const PRESS_LAST_UPDATED = '2026-10-31';
export const PRESS_LAST_UPDATED_LABEL = '31 Oct 2026';
// When the hand-written figures below were last measured.
const PRESS_AS_OF = '31 Oct 2026';

const REPO_URL = 'https://github.com/career-ops-hq/career-ops';
export const HIRED_URL = `${REPO_URL}/blob/main/HIRED.md`;
const SITE = 'career-ops.org';

// The count behind the README badge. Omitted rather than guessed if the file
// cannot be read: a figure here gets copied into articles.
export async function getHiredCount(): Promise<number | null> {
  try {
    const res = await fetch(
      'https://raw.githubusercontent.com/career-ops-hq/career-ops/main/docs/hired-count.json',
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return null;
    const data = await res.json();
    return typeof data.count === 'number' ? data.count : null;
  } catch {
    return null;
  }
}

export const PRESS_SUMMARY =
  'career-ops is an open-source AI job search agent. It reads job listings, scores each one against your CV and drafts the application. It drafts and fills; it never submits. You press Submit.';

// Boilerplate at three lengths, the standard press-kit format. Factual, no hype
// verbs, no superlatives. The labels count the words, so they cannot go stale.
const OPENING =
  'career-ops is an open-source (MIT) AI job search agent, free for candidates, that puts hiring leverage on the candidate’s side. Today it runs on your own machine, inside the AI coding CLI you already use: no account, no telemetry, no backend of ours. Your CV goes from your machine to the AI provider you chose, and nowhere else. It drafts and fills; it never submits. You press Submit.';

export const BOILERPLATE = {
  short: `career-ops is an open-source AI job search agent, free for candidates, that puts hiring leverage on the candidate’s side. ${REPO_URL}`,
  medium: `${OPENING} It scans listings, scores them from 1 to 5 across five dimensions, tailors your CV per role and tracks the pipeline. ${REPO_URL}`,
  long: `${OPENING} It works with Claude Code, Codex, Cursor, OpenCode, GitHub Copilot CLI and other CLIs, and free and local models work too. It scans company career pages on ATS platforms such as Greenhouse, Ashby, Lever and Workday, plus job boards in several countries, scores each listing from 1 to 5 against a published rubric of five scoring dimensions, generates an ATS-tailored PDF résumé per role, and tracks the pipeline in a local dashboard. Santiago Fernández de Valderrama Aparicio built it during his own 2026 job search (740 job listings evaluated, 68 applications, 12 interviews, 1 offer), then open-sourced it. It reached 50,000 GitHub stars in June 2026, about two months after the repository was created. In July 2026 he published The CareerOps Manifesto, naming the practice and its nine candidate rights. ${REPO_URL}`,
};

export function wordCountLabel(text: string): string {
  return `~${Math.round(text.split(/\s+/).length / 10) * 10} words`;
}

// What a writer needs to get right, in one place. Each line prevents an error
// seen in third-party posts or answer engines (mentions-ops and search-ops,
// 31-oct), stated as the correct fact.
export const WRITING_RULES: { label: string; value: string }[] = [
  {
    label: 'The name',
    value:
      'career-ops, lowercase and hyphenated, also at the start of a sentence. CareerOps, in CamelCase, is the practice named in the manifesto.',
  },
  {
    label: 'Who submits',
    value:
      'It drafts and fills; it never submits. You press Submit.',
  },
  {
    label: 'The score',
    value: 'Each listing gets a score from 1 to 5 across five dimensions, with the reasoning.',
  },
  {
    label: 'The creator’s search',
    value:
      '740 job listings evaluated, 68 applications, 12 interviews, 1 offer. He applied to 68 of the 740. It is one person’s search, not a promise.',
  },
  {
    label: 'Adoption',
    value:
      'career-ops has no telemetry, so there is no user count. Public signals are GitHub stars, contributors and the hired stories. Stars are not users, the hired stories are not a success rate, and any number needs its date.',
  },
  {
    label: 'Where your CV goes',
    value:
      'No backend of ours. Your CV goes from your machine to the AI provider you chose, and nowhere else.',
  },
  {
    label: 'Press mentions',
    value: 'The April 2026 feature ran in WIRED Greece. Please credit that edition.',
  },
  {
    label: 'The brand',
    value:
      'Use the logo and wordmark as provided, without recoloring or redrawing them. Please don’t imply endorsement, partnership or sponsorship. The brand is never for promoting auto-apply or mass-apply tools.',
  },
  {
    label: 'Reuse',
    value:
      'Quote the boilerplate and the thesis verbatim, and link to career-ops.org or the GitHub repository. Describe it as open source (MIT) and free for candidates. Please don’t say or imply that candidates pay for career-ops.',
  },
  {
    label: 'Built on career-ops',
    value:
      'The official project is github.com/career-ops-hq/career-ops and career-ops.org. Anything else built on career-ops is a separate project, with its own authors and terms.',
  },
];

export const OFFICIAL_LINKS: { label: string; href: string }[] = [
  { label: 'Website', href: `https://${SITE}` },
  { label: 'Repository', href: REPO_URL },
  { label: 'Press kit', href: `https://${SITE}/press` },
  { label: 'Manifesto', href: `https://${SITE}/manifesto` },
  { label: 'Changelog', href: `https://${SITE}/changelog` },
  { label: 'Hired stories', href: HIRED_URL },
  { label: 'Community plugins', href: `https://${SITE}/docs/reference/plugins` },
];

export type PressFact = { label: string; value: string; href?: string };

function roundDown(n: number, to: number): string {
  return (Math.floor(n / to) * to).toLocaleString('en-US');
}

export function pressFacts(stats: ProjectStats, hired: number | null): PressFact[] {
  return [
    { label: 'Name', value: 'career-ops (lowercase, hyphenated)' },
    {
      label: 'Category',
      value: 'Open-source AI job search agent · puts hiring leverage on the candidate’s side',
    },
    { label: 'Creator', value: 'Santiago Fernández de Valderrama Aparicio' },
    { label: 'License', value: 'MIT' },
    { label: 'Price', value: 'Free for candidates, forever.' },
    {
      label: 'Model',
      value:
        'Local-first. No account, no telemetry, no backend of ours: your CV goes from your machine to the AI provider you chose, and nowhere else.',
    },
    { label: 'Inception', value: '17 March 2026' },
    ...(stats.live.latestRelease
      ? [{ label: 'Latest release', value: `${stats.latestRelease} (live)`, href: `https://${SITE}/changelog` }]
      : []),
    {
      label: 'Release pace',
      value: `33 releases of the core between May and October 2026, roughly weekly since mid-September (as of ${PRESS_AS_OF})`,
    },
    {
      label: 'Job sources',
      value: `More than 100, from ATS platforms to job boards in several countries (as of ${PRESS_AS_OF})`,
    },
    {
      label: 'Languages',
      value: 'Website in 8 languages, README in 19 and evaluation modes in 20, English included',
    },
    {
      label: 'AI CLIs supported',
      value:
        'Claude Code, Cursor, Codex, OpenCode, Pi, Antigravity CLI, Grok Build CLI, Qwen, Kimi, Hermes Agent, GitHub Copilot CLI (Gemini CLI: legacy wrapper)',
    },
    { label: 'GitHub stars', value: `${roundDown(stats.stars, 1000)}+ (live)` },
    { label: 'GitHub forks', value: `${roundDown(stats.forks, 1000)}+ (live)` },
    {
      label: 'Contributors',
      value: `700+, as shown on the GitHub repository page, bots and manifesto signatories included (as of ${PRESS_AS_OF})`,
      href: `${REPO_URL}/graphs/contributors`,
    },
    { label: 'Discord community', value: `${roundDown(stats.discordMembers, 100)}+ members` },
    ...(hired != null
      ? [
          {
            label: 'Hired stories',
            value: `${hired} hires on the record in HIRED.md, each linked to a public story posted by the person who got hired.`,
            href: HIRED_URL,
          },
        ]
      : []),
    {
      label: 'Creator’s result',
      value: '740 listings evaluated → 68 applications → 12 interviews → 1 offer',
    },
    {
      label: 'Manifesto',
      value: `The CareerOps Manifesto, published 14 Jul 2026 at 60,000 stars · ${SITE}/manifesto`,
    },
    {
      label: 'Program',
      value: 'Member of the Vercel Open Source Program, Summer 2026 cohort (in-kind support).',
    },
    { label: 'Photo of the creator', value: 'On request: hi@career-ops.org' },
    {
      label: 'The term',
      value:
        'CareerOps (CamelCase) = the practice, defined in the manifesto · career-ops (lowercase, hyphenated) = the tool',
    },
    {
      label: 'Wikidata',
      value: 'Q139007988 (software) · Q138710224 (creator)',
    },
  ];
}

// Dates come from the core's git history, GitHub and warpchart's star ledger.
export const TIMELINE: { date: string; label: string; event: string }[] = [
  { date: '2026-03-17', label: '17 Mar 2026', event: 'Project inception, during Santiago’s own job search.' },
  { date: '2026-04-04', label: '4 Apr 2026', event: 'Repository created on GitHub, under the MIT license.' },
  { date: '2026-04-06', label: '6 Apr 2026', event: '10,000 GitHub stars.' },
  { date: '2026-04-17', label: '17 Apr 2026', event: 'Feature in WIRED Greece.' },
  { date: '2026-04-28', label: '28 Apr 2026', event: 'Feature in Business Insider.' },
  { date: '2026-06', label: 'Jun 2026', event: '50,000 GitHub stars, about two months after the repository was created.' },
  { date: '2026-07-14', label: '14 Jul 2026', event: 'The CareerOps Manifesto, published the day the project crossed 60,000 stars.' },
  { date: '2026-09-01', label: '1 Sep 2026', event: 'The repository moves to the career-ops-hq organization on GitHub.' },
  { date: '2026-10-16', label: '16 Oct 2026', event: '75,000 GitHub stars.' },
];

// Press coverage, kept in sync with /about. Earned media only.
export const PRESS = [
  {
    outlet: 'Business Insider',
    date: '2026-04-28',
    dateLabel: '28 Apr 2026',
    headline: 'How I built a tool to filter job listings — and landed Head of AI',
    url: 'https://www.businessinsider.com/how-i-built-tool-filter-job-listings-landed-head-ai-2026-4',
  },
  {
    outlet: 'Business Insider Deutschland',
    date: '2026-04-28',
    dateLabel: '28 Apr 2026',
    headline: 'Mein KI-Tool scannt 700 Job-Anzeigen — so half es mir, Karriere zu machen',
    url: 'https://www.businessinsider.de/karriere/bewerbung/mein-ki-tool-scannt-700-job-anzeigen-so-half-es-mir-karriere-zu-machen/',
  },
  {
    outlet: 'WIRED Greece',
    date: '2026-04-17',
    dateLabel: '17 Apr 2026',
    headline: 'Το AI εργαλείο που φέρνει επανάσταση στον τρόπο που ψάχνουμε δουλειά',
    url: 'https://wired.com.gr/article/to-ai-ergaleio-pou-fernei-epanastasi-ston-tropo-pou-psachnoume-douleia/',
  },
  {
    outlet: 'Create OS Lounge',
    date: '2026-04-15',
    dateLabel: '15 Apr 2026',
    headline: 'Conversation with Eric: career-ops origins, multi-agent orchestration',
    url: 'https://www.youtube.com/watch?v=pDkAe5JbREk',
  },
];

export const FOUNDER_PARAGRAPH =
  'Santiago Fernández de Valderrama Aparicio is the creator of career-ops and has spent 16+ years building and selling products. He founded Santifer iRepair in 2009 and sold it in 2025. He built career-ops during his own 2026 job search, and it landed him a Head of Applied AI role. He then open-sourced the project under MIT. Six months after landing that role, he left it to focus on building career-ops full time.';

export const THESIS =
  'Companies use AI to filter candidates. I just gave candidates AI to choose companies.';

// Literal from the README, in his own words. No lines from interviews: those
// went through a publication's edit.
export const QUOTES = [
  'Months of sending CVs into silence. So I built the filter I needed.',
  'I built career-ops to manage my own job search, and it worked: it landed me a Head of Applied AI role. Six months later I left that role to focus on building career-ops full time.',
];
export const QUOTE_ATTRIBUTION = 'Santiago Fernández de Valderrama Aparicio, creator of career-ops';
export const QUOTES_SOURCE = `${REPO_URL}#readme`;

export const DEMO = {
  href: `${REPO_URL}/blob/main/docs/demo.gif`,
  caption: 'My own search, partway through, with the UI in Spanish.',
};

export function pressMarkdown(stats: ProjectStats, hired: number | null, definition: string): string {
  const facts = pressFacts(stats, hired)
    .map((f) => `- ${f.label}: ${f.value}${f.href ? ` (${f.href})` : ''}`)
    .join('\n');
  return `# career-ops press kit

${PRESS_SUMMARY}

Last updated ${PRESS_LAST_UPDATED_LABEL}. Canonical page: https://${SITE}/press. Press contact: hi@career-ops.org

## Writing about career-ops

${WRITING_RULES.map((r) => `- ${r.label}: ${r.value}`).join('\n')}

## Official links

${OFFICIAL_LINKS.map((l) => `- ${l.label}: ${l.href}`).join('\n')}

## Key facts

${facts}

## Boilerplate

### One line

${BOILERPLATE.short}

### Short

${BOILERPLATE.medium}

### Standard

${BOILERPLATE.long}

## The thesis

"${THESIS}" Santiago Fernández de Valderrama Aparicio

## Quotes

${QUOTES.map((q) => `- "${q}"`).join('\n')}

Attribution: ${QUOTE_ATTRIBUTION}. Source: ${QUOTES_SOURCE}

## The CareerOps Manifesto

${definition}

Canonical text: https://${SITE}/manifesto

## Creator

${FOUNDER_PARAGRAPH}

Full bio: https://${SITE}/about

## Product demo

${DEMO.href} (${DEMO.caption})

## Timeline

${TIMELINE.map((t) => `- ${t.label}: ${t.event}`).join('\n')}

## Coverage

${PRESS.map((p) => `- ${p.dateLabel}, ${p.outlet}: [${p.headline}](${p.url})`).join('\n')}
`;
}
