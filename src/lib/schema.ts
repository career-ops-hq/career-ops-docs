// Schema.org JSON-LD emitted in layouts.
// Person entity is referenced by @id (https://santifer.io/#person) — santifer.io
// is the canonical entity hub. career-ops.org is the work.
//
// `siteSchema()` runs in the root layout (every page). Per-page builders
// (`aboutSchema()`, etc.) emit additional graphs scoped to that route.
import { getProjectStats } from './stats';

const PERSON_ID = 'https://santifer.io/#person';

// sameAs URLs — Santiago's verified profiles across the web. Matches the
// canonical list maintained on santifer.io. Wikidata Q138710224 is the
// entity master; everything else points back to it via `equivalentClass`.
// `santifer.io/about` is included alongside `Person.url` to explicitly
// map this local ProfilePage back to the canonical entity hub on
// santifer.io — belt-and-braces signal for Google's KG reconciliation.
const PERSON_SAMEAS = [
  'https://santifer.io/about',
  'https://www.linkedin.com/in/santifer',
  'https://github.com/santifer',
  'https://x.com/santifer',
  'https://dev.to/santifer',
  'https://santifer.substack.com',
  'https://contentdigest.santifer.io',
  'https://www.youtube.com/@santifer_io',
  'https://stackoverflow.com/users/32541743',
  'https://orcid.org/0009-0006-2192-7210',
  'https://www.crunchbase.com/person/santiago-fernandez-de-valderrama',
  'https://huggingface.co/santifer',
  'https://www.wikidata.org/wiki/Q138710224',
  'https://santiferirepair.es',
  'https://www.facebook.com/santifer.io/',
  'https://www.producthunt.com/@santifer',
  'https://app.daily.dev/santifer',
];

// Reddit DiscussionForumPosting references — viral launch posts about
// career-ops authored by Santiago on his verified Reddit account
// (Beach-Independent — 5y old account, history matches santifer.io bio
// including the phone-repair business exit). Brand-mention signals
// correlate ~3× more strongly with AI search citation than backlinks
// (Ahrefs December 2025 study). Both posts encoded with upvote +
// comment InteractionCounters so AI engines can read social proof.
// Headlines preserved verbatim from the actual Reddit titles, even
// where "offers" is technically the wrong noun (the Reddit title
// cannot be edited post-publish; the post body carries the correction).
const SOFTWARE_SUBJECT_OF = [
  {
    '@type': 'DiscussionForumPosting',
    url: 'https://www.reddit.com/r/ClaudeAI/comments/1sd2f37/i_built_an_ai_job_search_system_with_claude_code/',
    headline:
      'I built an AI job search system with Claude Code that scored 740+ offers and landed me a job. Just open sourced it.',
    datePublished: '2026-04-05T12:30:50Z',
    author: { '@id': PERSON_ID },
    publisher: { '@type': 'Organization', name: 'Reddit', url: 'https://www.reddit.com' },
    interactionStatistic: [
      {
        '@type': 'InteractionCounter',
        interactionType: 'https://schema.org/LikeAction',
        userInteractionCount: 2815,
        name: 'Reddit upvotes',
      },
      {
        '@type': 'InteractionCounter',
        interactionType: 'https://schema.org/CommentAction',
        userInteractionCount: 249,
        name: 'Reddit comments',
      },
    ],
  },
  {
    '@type': 'DiscussionForumPosting',
    url: 'https://www.reddit.com/r/SideProject/comments/1rw1lg4/i_automated_my_job_search_with_ai_agents_516/',
    headline:
      'I automated my job search with AI agents — 516 evaluations, 66 applications, zero manual screening',
    datePublished: '2026-03-17T09:17:59Z',
    author: { '@id': PERSON_ID },
    publisher: { '@type': 'Organization', name: 'Reddit', url: 'https://www.reddit.com' },
    interactionStatistic: [
      {
        '@type': 'InteractionCounter',
        interactionType: 'https://schema.org/LikeAction',
        userInteractionCount: 575,
        name: 'Reddit upvotes',
      },
      {
        '@type': 'InteractionCounter',
        interactionType: 'https://schema.org/CommentAction',
        userInteractionCount: 359,
        name: 'Reddit comments',
      },
    ],
  },
  {
    '@type': 'Article',
    url: 'https://www.producthunt.com/products/santifer-io',
    headline: 'Career-Ops on Claude — Product Hunt launch (#7 Product of the Day)',
    datePublished: '2026-04-08T00:00:00Z',
    author: { '@id': PERSON_ID },
    publisher: { '@type': 'Organization', name: 'Product Hunt', url: 'https://www.producthunt.com' },
    interactionStatistic: {
      '@type': 'InteractionCounter',
      interactionType: 'https://schema.org/LikeAction',
      userInteractionCount: 147,
      name: 'Product Hunt upvotes',
    },
  },
];

// Press / NewsArticle references — published pieces about Santiago.
// Mirrors santifer.io/about subjectOf array (5 entries).
const PERSON_SUBJECT_OF = [
  {
    '@type': 'NewsArticle',
    url: 'https://www.businessinsider.com/how-i-built-tool-filter-job-listings-landed-head-ai-2026-4',
    headline:
      'How I built a tool to filter job listings — and landed Head of AI',
    datePublished: '2026-04-28T00:00:00Z',
    publisher: { '@type': 'Organization', name: 'Business Insider' },
  },
  {
    '@type': 'NewsArticle',
    url: 'https://www.businessinsider.de/karriere/bewerbung/mein-ki-tool-scannt-700-job-anzeigen-so-half-es-mir-karriere-zu-machen/',
    headline: 'Mein KI-Tool scannt 700 Job-Anzeigen — so half es mir, Karriere zu machen',
    datePublished: '2026-04-28T00:00:00Z',
    publisher: { '@type': 'Organization', name: 'Business Insider Deutschland' },
  },
  {
    '@type': 'NewsArticle',
    url: 'https://sqbconsulting.uz/biznes/kak-moj-instrument-otbora-700-vakansij-pomog-stat-glavoj-ai/',
    headline: 'Как мой инструмент отбора 700 вакансий помог стать главой AI',
    datePublished: '2026-04-28T00:00:00Z',
    inLanguage: 'ru',
    publisher: { '@type': 'Organization', name: 'SQB Consulting', url: 'https://sqbconsulting.uz' },
    isBasedOn: 'https://www.businessinsider.com/how-i-built-tool-filter-job-listings-landed-head-ai-2026-4',
  },
  {
    '@type': 'NewsArticle',
    url: 'https://wired.com.gr/article/to-ai-ergaleio-pou-fernei-epanastasi-ston-tropo-pou-psachnoume-douleia/',
    headline:
      'Το AI εργαλείο που φέρνει επανάσταση στον τρόπο που ψάχνουμε δουλειά',
    datePublished: '2026-04-17T00:00:00Z',
    author: { '@type': 'Person', name: 'Niko Efstathiou' },
    publisher: { '@type': 'Organization', name: 'WIRED Greece' },
  },
  {
    '@type': 'VideoObject',
    '@id': 'https://career-ops.org/#video-create-os-lounge',
    url: 'https://www.youtube.com/watch?v=pDkAe5JbREk',
    name: 'Create OS Lounge — Santiago Fernández de Valderrama',
    description:
      'Conversation with Eric on career-ops origins, multi-agent orchestration, and the asymmetry between candidate-side AI and recruiter-side ATS.',
    thumbnailUrl: 'https://img.youtube.com/vi/pDkAe5JbREk/maxresdefault.jpg',
    embedUrl: 'https://www.youtube.com/embed/pDkAe5JbREk',
    contentUrl: 'https://www.youtube.com/watch?v=pDkAe5JbREk',
    uploadDate: '2026-04-15T00:00:00Z',
    creator: { '@type': 'Person', name: 'Eric (Narrative Pilot)' },
    publisher: { '@type': 'Organization', name: 'Create OS' },
  },
  {
    '@type': 'NewsArticle',
    url: 'https://www.diariodesevilla.es/vivirensevilla/Salir-compras-solucion-expres-telefono_0_817718799.html',
    headline: 'Salir de compras en busca de la solución exprés del teléfono',
    datePublished: '2014-06-19T00:00:00Z',
    publisher: { '@type': 'Organization', name: 'Diario de Sevilla' },
  },
];

export async function siteSchema() {
  const stats = await getProjectStats();
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://career-ops.org/#website',
        url: 'https://career-ops.org',
        name: 'career-ops',
        description:
          'AI-powered job search command center. Open source, CLI-agnostic, runs locally.',
        inLanguage: 'en',
        publisher: { '@id': PERSON_ID },
      },
      {
        '@type': 'SoftwareSourceCode',
        '@id': 'https://career-ops.org/#software',
        name: 'career-ops',
        url: 'https://career-ops.org',
        codeRepository: 'https://github.com/santifer/career-ops',
        programmingLanguage: ['TypeScript', 'Go', 'Bash'],
        license: 'https://opensource.org/licenses/MIT',
        creator: { '@id': PERSON_ID },
        author: { '@id': PERSON_ID },
        discussionUrl: 'https://discord.gg/8pRpHETxa4',
        sameAs: [
          'https://github.com/santifer/career-ops',
          'https://www.wikidata.org/wiki/Q139007988',
        ],
        subjectOf: SOFTWARE_SUBJECT_OF,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
        interactionStatistic: [
          {
            '@type': 'InteractionCounter',
            interactionType: 'https://schema.org/LikeAction',
            userInteractionCount: stats.stars,
            name: 'GitHub stars',
          },
          {
            '@type': 'InteractionCounter',
            interactionType: 'https://schema.org/ShareAction',
            userInteractionCount: stats.forks,
            name: 'GitHub forks',
          },
          {
            '@type': 'InteractionCounter',
            interactionType: 'https://schema.org/JoinAction',
            userInteractionCount: stats.discordMembers,
            name: 'Discord members',
          },
        ],
      },
      // SoftwareApplication coexists with SoftwareSourceCode — different
      // Google rich result families. SoftwareApplication describes the
      // installable PRODUCT, SoftwareSourceCode the CODE. Both link to
      // the same Person via @id.
      {
        '@type': 'SoftwareApplication',
        '@id': 'https://career-ops.org/#application',
        name: 'career-ops',
        url: 'https://career-ops.org',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Linux, macOS, Windows',
        creator: { '@id': PERSON_ID },
        author: { '@id': PERSON_ID },
        license: 'https://opensource.org/licenses/MIT',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
      // Full Person definition lives in the site-level schema so every
      // page (including /docs/**) emits the canonical entity hub. The
      // @id matches santifer.io/#person — Google merges duplicates by
      // @id, so re-stating the node on each page is canonical, not
      // redundant. This unblocks per-page byline-level entity resolution
      // (Dec 2025 EEAT signal).
      {
        '@type': 'Person',
        '@id': PERSON_ID,
        name: 'Santiago Fernández de Valderrama',
        url: 'https://santifer.io/about',
        image: 'https://santifer.io/foto-avatar.png',
        jobTitle: 'Applied AI Operator',
        worksFor: { '@type': 'Organization', name: 'Zinkee' },
        sameAs: PERSON_SAMEAS,
        subjectOf: PERSON_SUBJECT_OF,
      },
    ],
  };
}

// Lexicon of canonical category terms. Each gets a DefinedTerm node so
// LLMs and search engines can cite the definition by URL fragment. The
// list is intentionally short — quality over quantity, no padding.
const DEFINED_TERMS = [
  {
    name: 'score-gated apply',
    description:
      'An application workflow where every potential job is evaluated against an explicit rubric and only those above a threshold (4.0/5.0 in career-ops) are recommended for application. The opposite of spray-and-pray.',
  },
  {
    name: 'AI-native job matching',
    description:
      'Job-search tooling whose primary reasoning engine is an LLM rather than keyword matching. Distinguished from "AI-augmented" tools that add a generative layer on top of legacy ranking systems.',
  },
  {
    name: 'JD-resume distance',
    description:
      'The semantic gap between a job description and a candidate CV — measured by an LLM against an explicit rubric of skills, proof points, and archetype fit. Not a vector similarity score; an audited judgement with citations.',
  },
  {
    name: 'agent-augmented job search',
    description:
      'A job search where an AI agent handles the repetitive analytical work — reading postings, comparing against the candidate profile, drafting tailored materials — while the human retains every commit decision (apply / reject / negotiate).',
  },
  {
    name: 'transparent matching',
    description:
      'Match scoring whose rubric, prompts, and reasoning are publishable in clear so the candidate (and the recruiter) can audit why a score was produced. The implementation is open source and the evaluation cites specific evidence.',
  },
  {
    name: 'asymmetric AI hiring',
    description:
      'The current hiring landscape, in which companies use AI to filter candidates at scale while candidates lack equivalent tooling. Career-ops exists to close that asymmetry — AI on the candidate side of the table.',
  },
  {
    name: 'candidate-side AI augmentation',
    description:
      'Tooling owned by the candidate that helps them evaluate roles, tailor materials, and track applications — distinct from recruiter-side ATS and HR tooling. Local-first by design; no employer can see, access, or modify it.',
  },
  {
    name: 'multi-LLM routing for evals',
    description:
      'Running the same evaluation prompt across multiple LLMs (Claude, Codex, OpenCode, Gemini, Qwen, Copilot) so the user can pick the model that fits their cost / quality / privacy profile. Career-ops is CLI-agnostic by design.',
  },
  {
    name: 'career-ops',
    description:
      'An open-source AI-powered job search command center. Runs locally on the user\'s own machine via any AI coding CLI (Claude Code, Codex, OpenCode, Gemini CLI, Qwen, Copilot). MIT-licensed; created by Santiago Fernández de Valderrama in 2026 after evaluating 740 listings during his own job search and landing a Head of Applied AI role.',
  },
  {
    name: 'Block A-G evaluation',
    description:
      'The canonical career-ops evaluation prompt structure: a seven-section output (Block A through G) covering Role Summary, CV Match, Level Strategy, Comp & Demand, Personalisation Plan, Interview Prep, and Posting Legitimacy. Defined verbatim in modes/oferta.md (canonical Spanish; English translation in flight per issue #363).',
  },
];

// /methodology — TechArticle authored by Person, plus FAQPage with 5–7
// extended answers and a DefinedTerm set for the category lexicon.
// Search engines and LLMs treat this as a canonical, dated technical
// reference; dateModified is the EEAT freshness signal.
export function methodologySchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        '@id': 'https://career-ops.org/methodology/#article',
        url: 'https://career-ops.org/methodology',
        headline: 'How career-ops scores job listings',
        description:
          'The 4.0/5.0 threshold, the six dimensions, the canonical evaluation prompt, edge cases, and what we explicitly do not do.',
        datePublished: '2026-05-07T00:00:00Z',
        dateModified: '2026-05-07T00:00:00Z',
        author: { '@id': PERSON_ID },
        publisher: { '@id': PERSON_ID },
        isPartOf: { '@id': 'https://career-ops.org/#website' },
        about: { '@id': 'https://career-ops.org/#software' },
        mainEntityOfPage: 'https://career-ops.org/methodology',
        inLanguage: 'en',
        articleSection: 'Methodology',
        wordCount: 2000,
        keywords: DEFINED_TERMS.map((t) => t.name),
        image: {
          '@type': 'ImageObject',
          url: 'https://career-ops.org/og-banner.jpg',
          width: 1200,
          height: 630,
        },
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://career-ops.org/methodology/#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How does career-ops actually score job listings?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'career-ops uses a rubric-guided LLM evaluation across six dimensions (match, north-star alignment, comp, cultural signals, red flags, global) producing a score from 1.0 to 5.0. Below 4.0 the agent recommends against applying. There is no closed-form weighting formula — the global score is the LLM’s judgement given the rubric, with citations to specific CV lines and JD requirements.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is career-ops free? What is the business model?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'career-ops is MIT-licensed open source. There is no paid tier, no waitlist, no account, no telemetry. You clone the repo, configure your profile, and run it locally. The only cost is whichever AI CLI you point it at (Claude Code, Codex, OpenCode, Gemini CLI, Qwen, Copilot).',
            },
          },
          {
            '@type': 'Question',
            name: 'How is career-ops different from Indeed AI or LinkedIn AI?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Indeed and LinkedIn AI features sit on the recruiter side of the table — they help employers filter candidates faster. career-ops sits on the candidate side, helping a single person evaluate which roles deserve their attention. The rubric is published, the code is open source, and nothing is shared with employers or platforms.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can companies use career-ops to filter candidates?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. career-ops is built for individual job seekers and reads only data the candidate provides about themselves (CV, profile, target archetypes). It does not ingest candidate databases, parse resumes at scale, or score third parties. Repurposing it for employer-side filtering is technically possible but contrary to its design and stated intent.',
            },
          },
          {
            '@type': 'Question',
            name: 'What data does career-ops collect from users?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'career-ops itself collects nothing. It is local code that runs on your machine. The only data leaving your computer is whatever your configured AI CLI sends to its provider — and that subset is whatever pieces of your CV and the public job postings you choose to evaluate. Local-only execution via Ollama is in flight (PR #561).',
            },
          },
          {
            '@type': 'Question',
            name: 'Who built career-ops? Why?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'career-ops was built by Santiago Fernández de Valderrama, an Applied AI Operator with 16+ years building products. He created it to manage his own AI-era job search in early 2026 — 740 listings evaluated, one Head of AI role landed — and open-sourced it under MIT once he no longer needed it.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does career-ops work with my ATS or job board?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'career-ops scans Greenhouse, Ashby, and Lever via their public APIs (zero-token, no scraping). For other portals it can use Playwright through a configured AI CLI. It does not integrate with employer-side ATS, does not scrape LinkedIn (issue #238), and does not use anti-bot fingerprint masking (PR #235 rejected by design).',
            },
          },
        ],
      },
      ...DEFINED_TERMS.map((t) => ({
        '@type': 'DefinedTerm',
        '@id': `https://career-ops.org/methodology/#term-${t.name.replace(/\s+/g, '-')}`,
        name: t.name,
        description: t.description,
        inDefinedTermSet: 'https://career-ops.org/methodology',
      })),
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://career-ops.org/methodology/#breadcrumbs',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://career-ops.org/' },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Methodology',
            item: 'https://career-ops.org/methodology',
          },
        ],
      },
    ],
  };
}

// /docs/** — three-level BreadcrumbList: Home → Docs → page. Intermediate
// path segments (e.g. "introduction", "guides") are flattened to keep the
// breadcrumb readable in SERP; deeper hierarchy would require a slug→title
// lookup against the source tree, and Google only displays the last 2-3
// items in breadcrumb rich results anyway.
export function docsBreadcrumbSchema(opts: {
  url: string;
  title?: string;
}) {
  const isDocsLanding = opts.url === '/docs' || opts.url === '/docs/';
  const items: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }> = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://career-ops.org/' },
    { '@type': 'ListItem', position: 2, name: 'Docs', item: 'https://career-ops.org/docs' },
  ];
  if (!isDocsLanding && opts.title) {
    items.push({
      '@type': 'ListItem',
      position: 3,
      name: opts.title,
      item: `https://career-ops.org${opts.url}`,
    });
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `https://career-ops.org${opts.url}#breadcrumbs`,
    itemListElement: items,
  };
}

// /home — three high-priority FAQs surfaced as a separate JSON-LD graph.
// These are the questions that buyers, journalists, and developers ask
// first; pre-answering them in machine-readable form is direct AEO play.
export function homeFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://career-ops.org/#faq',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How does career-ops score job listings?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'career-ops uses a rubric-guided LLM evaluation across six dimensions — match, north-star alignment, comp, cultural signals, red flags, and global fit — producing a 1.0–5.0 score with citations to specific CV lines and JD requirements. Anything below 4.0 the agent recommends against applying. No closed-form formula, no spray-and-pray. The full rubric is published at career-ops.org/methodology.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is career-ops free? What is the business model?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'career-ops is MIT-licensed open source with no paid tier, no waitlist, no account, and no telemetry. You clone the repo, configure your profile, and run it locally on your own machine. The only cost is whichever AI CLI you point it at — Claude Code, Codex, OpenCode, Gemini CLI, Qwen, or Copilot. There is no other revenue model: no upsell, no enterprise tier, no data sale.',
        },
      },
      {
        '@type': 'Question',
        name: 'Who built career-ops?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'career-ops was built by Santiago Fernández de Valderrama — an Applied AI Operator with 16+ years building products, founder and operator of a Spanish phone-repair business (2009–2025) before exiting, and currently Head of Applied AI at Zinkee. He created career-ops in early 2026 to manage his own AI-era job search — 740 listings evaluated, one Head of AI role landed — and open-sourced it under MIT once he no longer needed it.',
        },
      },
    ],
  };
}

// /about — adds ProfilePage + BreadcrumbList. The full Person entity
// now lives in siteSchema (root layout) so every page emits it; here we
// only reference Person via @id and surface the page-specific nodes.
export function aboutSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': 'https://career-ops.org/about/#profilepage',
        url: 'https://career-ops.org/about',
        name: 'Santiago Fernández de Valderrama',
        description:
          'Applied AI Operator. Built career-ops after evaluating 740 listings.',
        inLanguage: 'en',
        mainEntity: { '@id': PERSON_ID },
        dateModified: '2026-05-07T00:00:00Z',
        isPartOf: { '@id': 'https://career-ops.org/#website' },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://career-ops.org/about/#breadcrumbs',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://career-ops.org/' },
          { '@type': 'ListItem', position: 2, name: 'About', item: 'https://career-ops.org/about' },
        ],
      },
    ],
  };
}
