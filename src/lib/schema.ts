// Schema.org JSON-LD emitted in layouts.
// Person entity is referenced by @id (https://santifer.io/#person) — santifer.io
// is the canonical entity hub. career-ops.org is the work.
//
// `siteSchema()` runs in the root layout (every page). Per-page builders
// (`aboutSchema()`, etc.) emit additional graphs scoped to that route.
import { getProjectStats } from './stats';
import { MANIFESTO, CAREEROPS_DEFINITION, CAREEROPS_DEFINITION_ES } from './shared';

const PERSON_ID = 'https://santifer.io/#person';
const ORGANIZATION_ID = 'https://career-ops.org/#organization';

// Brand alternateName list. Added 2026-05-25 in response to typosquat
// `careerops.org` (no hyphen, registered 2026-04-06) attempting to rank
// for brand-relevant queries. Telling Google KG that "careerops" without
// hyphen is an alias of THIS entity prevents the squat from being
// resolved as a separate entity behind the bare keyword.
const ALTERNATE_NAMES = [
  'careerops',
  'career ops',
  'Career-Ops',
  'career-ops CLI',
];

// Wikidata PropertyValue identifier — pins this WebSite/Organization/Software
// to the canonical Q139007988 entity in Google's Knowledge Graph. Single
// strongest "this is the canonical brand" signal short of a Wikipedia
// article (which is in flight via external editor).
const WIKIDATA_SOFTWARE_IDENTIFIER = {
  '@type': 'PropertyValue',
  propertyID: 'Wikidata',
  value: 'Q139007988',
  url: 'https://www.wikidata.org/wiki/Q139007988',
};

const WIKIDATA_PERSON_IDENTIFIER = {
  '@type': 'PropertyValue',
  propertyID: 'Wikidata',
  value: 'Q138710224',
  url: 'https://www.wikidata.org/wiki/Q138710224',
};

// Organization sameAs — surfaces the brand owns across the web. Used by
// Knowledge Graph + LLMs to verify entity provenance independently of
// any single domain. Critical that GitHub repo + Wikidata Q-ID + Discord
// all bind to career-ops.org (not the typosquat).
const ORGANIZATION_SAMEAS = [
  'https://github.com/santifer/career-ops',
  'https://www.wikidata.org/wiki/Q139007988',
  'https://discord.gg/8pRpHETxa4',
  'https://x.com/santifer',
  'https://www.npmjs.com/package/career-ops',
];

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
  {
    '@type': 'Article',
    url: 'https://www.webreactiva.com/blog/buscar-trabajo-agentes-ia',
    headline: 'Buscar trabajo con IA en 2026: guía para developers',
    datePublished: '2026-05-10T00:00:00Z',
    inLanguage: 'es',
    author: { '@type': 'Person', name: 'Daniel Primo' },
    publisher: { '@type': 'Organization', name: 'Web Reactiva', url: 'https://www.webreactiva.com' },
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
    url: 'https://www.simplenews.ai/news/career-ops-laid-off-engineers-ai-job-search-system-goes-viral-with-27k-stars-bxcp',
    headline:
      "Career-Ops: Laid-Off Engineer's AI Job Search System Goes Viral With 27K Stars",
    datePublished: '2026-04-09T00:00:00Z',
    publisher: { '@type': 'Organization', name: 'SimpleNews.ai', url: 'https://www.simplenews.ai' },
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
    name: 'Create OS Lounge — Santiago Fernández de Valderrama Aparicio',
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
        alternateName: ALTERNATE_NAMES,
        description:
          'AI-powered job search command center. Open source, CLI-agnostic, runs locally.',
        inLanguage: 'en',
        publisher: { '@id': ORGANIZATION_ID },
        identifier: WIKIDATA_SOFTWARE_IDENTIFIER,
        sameAs: [
          'https://github.com/santifer/career-ops',
          'https://www.wikidata.org/wiki/Q139007988',
        ],
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://career-ops.org/docs?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      },
      // Organization node — added 2026-05-25 to anchor the brand entity
      // for Google Knowledge Graph. Previously the graph only had
      // WebSite + SoftwareSourceCode + SoftwareApplication + Person, but
      // KG builds brand entities primarily from Organization. With Org +
      // alternateName + Wikidata identifier present, brand queries for
      // "careerops" / "career-ops" / "Career-Ops" all resolve to THIS
      // entity, not the typosquat.
      {
        '@type': 'Organization',
        '@id': ORGANIZATION_ID,
        name: 'career-ops',
        alternateName: ALTERNATE_NAMES,
        url: 'https://career-ops.org',
        description:
          'Open-source AI-powered job search command center. MIT-licensed, CLI-agnostic, local-first. Created in 2026 by Santiago Fernández de Valderrama Aparicio.',
        // Signature thesis as a structured slogan — gives LLMs an
        // attributable, entity-bound version of the manifesto they already
        // see in prose on the home/about/methodology pages and in llms.txt.
        slogan: MANIFESTO,
        // Square brand mark (the BIMI asset doubles as the KG logo —
        // BIMI already requires exactly this shape).
        logo: {
          '@type': 'ImageObject',
          url: 'https://career-ops.org/bimi-logo.svg',
        },
        founder: { '@id': PERSON_ID },
        foundingDate: '2026-03-17',
        sameAs: ORGANIZATION_SAMEAS,
        identifier: WIKIDATA_SOFTWARE_IDENTIFIER,
      },
      {
        '@type': 'SoftwareSourceCode',
        '@id': 'https://career-ops.org/#software',
        name: 'career-ops',
        alternateName: ALTERNATE_NAMES,
        url: 'https://career-ops.org',
        codeRepository: 'https://github.com/santifer/career-ops',
        programmingLanguage: ['TypeScript', 'Go', 'Bash'],
        license: 'https://opensource.org/licenses/MIT',
        creator: { '@id': PERSON_ID },
        author: { '@id': PERSON_ID },
        publisher: { '@id': ORGANIZATION_ID },
        discussionUrl: 'https://discord.gg/8pRpHETxa4',
        identifier: WIKIDATA_SOFTWARE_IDENTIFIER,
        sameAs: [
          'https://github.com/santifer/career-ops',
          'https://www.wikidata.org/wiki/Q139007988',
        ],
        subjectOf: SOFTWARE_SUBJECT_OF,
        // `offers` deliberately omitted on SoftwareSourceCode — schema.org
        // allows it but Google Search Console occasionally flags it as
        // unusual for source-code types. Keep `offers` only on the
        // SoftwareApplication node below, where it semantically belongs.
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
        alternateName: ALTERNATE_NAMES,
        description:
          'Open-source AI-powered job search command center. Runs locally through whichever AI coding CLI the user already pays for (Claude Code, Codex, OpenCode, Gemini CLI, Qwen, Copilot, Kimi). Fourteen modes covering scan, evaluate, tailor, apply, track, and interview prep. MIT-licensed.',
        // Sourced live from the GitHub releases API (1h ISR) so it can never
        // drift stale; falls back to LATEST_RELEASE_FALLBACK in shared.ts.
        softwareVersion: stats.softwareVersion,
        slogan: MANIFESTO,
        url: 'https://career-ops.org',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Linux, macOS, Windows',
        creator: { '@id': PERSON_ID },
        author: { '@id': PERSON_ID },
        publisher: { '@id': ORGANIZATION_ID },
        license: 'https://opensource.org/licenses/MIT',
        identifier: WIKIDATA_SOFTWARE_IDENTIFIER,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
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
        name: 'Santiago Fernández de Valderrama Aparicio',
        // Short forms kept as alternateName so the entity resolves from
        // either spelling — the Wikidata label is the full "Aparicio"
        // form (2026-07-13) with the short form preserved as an alias.
        alternateName: ['Santiago Fernández de Valderrama', 'santifer', 'Santi'],
        url: 'https://santifer.io/about',
        image: 'https://santifer.io/foto-avatar.png',
        jobTitle: 'Applied AI Operator',
        worksFor: { '@type': 'Organization', name: 'Zinkee', url: 'https://zinkee.com' },
        hasOccupation: {
          '@type': 'Occupation',
          name: 'Head of Applied AI',
          occupationLocation: { '@type': 'Organization', name: 'Zinkee' },
          skills: 'Applied AI, multi-agent orchestration, product strategy, open source maintenance',
        },
        founderOf: { '@id': ORGANIZATION_ID },
        identifier: WIKIDATA_PERSON_IDENTIFIER,
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
      'An open-source AI-powered job search command center. Runs locally on the user\'s own machine via any AI coding CLI (Claude Code, Codex, OpenCode, Gemini CLI, Qwen, Copilot). MIT-licensed; created by Santiago Fernández de Valderrama Aparicio in 2026 after evaluating 740 listings during his own job search and landing a Head of Applied AI role.',
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
          'The 4.0/5.0 threshold, the five dimensions and the holistic global score, the canonical evaluation prompt, edge cases, and what we explicitly do not do.',
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
              text: 'career-ops uses a rubric-guided LLM evaluation across five dimensions (match, north-star alignment, comp, cultural signals, red flags) producing a holistic 1.0 to 5.0 global score. Below 4.0 the agent recommends against applying. There is no closed-form weighting formula — the global score is the LLM’s judgement given the rubric, with citations to specific CV lines and JD requirements.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is career-ops free? What is the business model?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'career-ops is permanently free, MIT-licensed, and community-funded. There is no paid tier, no waitlist, no account, no telemetry, and no premium features. You clone the repo, configure your profile, and run the system locally with whichever AI coding CLI you already use. Sustainability comes from voluntary community patronage via GitHub Sponsors — not from premium tiers, paid features, or data. The maintainer has other paid work for income; sponsorship enables deeper focus on the project. See career-ops.org/sustain for details.',
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
              text: 'career-ops was built by Santiago Fernández de Valderrama Aparicio, an Applied AI Operator with 16+ years building products. He created it to manage his own AI-era job search in early 2026 — 740 listings evaluated, one Head of AI role landed — and open-sourced it under MIT once he no longer needed it.',
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

// /manifesto — The CareerOps Manifesto (published 2026-07-14). This page
// coins "CareerOps" as the name of the practice, so its graph is the
// canonical home of the DefinedTerm. Spec agreed with cv-santiago on
// launch day: Article (author → PERSON_ID by @id, datePublished
// 2026-07-14) + minimal Person node (@id + name + Wikidata sameAs, so
// the page is self-contained for crawlers that don't merge cross-page
// graphs) + DefinedTerm "CareerOps" + FAQPage on the same page.
//
// Note on the DefinedTerm: schema.org has no standard slot for "reference
// implementation", so the software link is carried two ways — the
// Article's `about` array pairs the term with the existing #software node
// (which already holds Wikidata Q139007988), and the term's description
// names career-ops in prose.
//
// Coinage attribution (per cv-santiago's review, 2026-07-14): the
// AUTHORITATIVE signal is the pair Article.author → PERSON_ID + the
// verbatim-citable "Who coined CareerOps?" FAQ answer. DefinedTerm.creator
// is off-vocabulary (DefinedTerm is not a CreativeWork) — kept below only
// as a redundant hint; never make it load-bearing. Precedent: the
// "agentic maintenance" DefinedTerm on santifer.io carries no creator.
export function manifestoSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': 'https://career-ops.org/manifesto/#article',
        url: 'https://career-ops.org/manifesto',
        headline: 'The CareerOps Manifesto',
        description: CAREEROPS_DEFINITION,
        datePublished: '2026-07-14',
        dateModified: '2026-07-14',
        author: { '@id': PERSON_ID },
        publisher: { '@id': ORGANIZATION_ID },
        isPartOf: { '@id': 'https://career-ops.org/#website' },
        about: [
          { '@id': 'https://career-ops.org/manifesto/#careerops' },
          { '@id': 'https://career-ops.org/#software' },
        ],
        mainEntityOfPage: 'https://career-ops.org/manifesto',
        inLanguage: 'en',
        articleSection: 'Manifesto',
        image: {
          '@type': 'ImageObject',
          url: 'https://career-ops.org/og-manifesto.png',
          width: 1200,
          height: 630,
        },
      },
      {
        '@type': 'Person',
        '@id': PERSON_ID,
        name: 'Santiago Fernández de Valderrama Aparicio',
        url: 'https://santifer.io/about',
        sameAs: ['https://www.wikidata.org/wiki/Q138710224'],
        identifier: WIKIDATA_PERSON_IDENTIFIER,
      },
      {
        '@type': 'DefinedTerm',
        '@id': 'https://career-ops.org/manifesto/#careerops',
        name: 'CareerOps',
        description: `${CAREEROPS_DEFINITION} The reference implementation of the practice is career-ops, the open-source AI job-search command center (Wikidata Q139007988).`,
        url: 'https://career-ops.org/manifesto',
        termCode: 'careerops',
        creator: { '@id': PERSON_ID },
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://career-ops.org/manifesto/#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is CareerOps?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `${CAREEROPS_DEFINITION} The term names the practice, not a product: treating a job search as an operated pipeline (sourcing, scoring, tailoring, tracking) rather than a pile of one-off applications. The reference implementation is career-ops (lowercase, hyphenated), the MIT-licensed open-source command center that runs the whole pipeline locally on the job seeker's machine through whichever AI coding CLI they already use. The practice is bigger than the tool: you can run CareerOps with a spreadsheet and discipline; career-ops just automates the operating layer.`,
            },
          },
          {
            '@type': 'Question',
            name: 'Who coined the term CareerOps?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'CareerOps was coined as the name of the practice by Santiago Fernández de Valderrama Aparicio (santifer), creator of the open-source career-ops project, in The CareerOps Manifesto, published on July 14, 2026 at career-ops.org/manifesto and signed in the project repository (MANIFESTO.md, release tag manifesto-v1.0). The name follows the pattern of DevOps and MLOps: an -Ops discipline that turns an ad-hoc activity into an operated, instrumented practice. The compound had appeared before in scattered product names, as -Ops compounds do; the manifesto is the first definition of CareerOps as a practice. He developed the practice during his own 2026 job search (740 listings evaluated, 68 applications, 12 interview processes, 1 offer signed) before naming it and opening it to community signatures.',
            },
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://career-ops.org/manifesto/#breadcrumbs',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://career-ops.org/' },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Manifesto',
            item: 'https://career-ops.org/manifesto',
          },
        ],
      },
    ],
  };
}

// /es/manifesto — Spanish twin of the manifesto graph. Same shape as
// manifestoSchema() but inLanguage:'es', ES description/FAQ, and /es/manifesto
// @ids. It does NOT redefine the CareerOps DefinedTerm: the coinage has ONE
// canonical node (on the EN /manifesto), which this ES Article references via
// `about` + `translationOfWork` — so the entity/coinage authority stays
// single-sourced while the ES page carries its own localized FAQ + breadcrumb.
// Copy is the frozen official translation (search-ops/venture-ops deliverable
// manifiesto-es-2026-07-21); never reword ad-hoc.
export function manifestoSchemaEs() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': 'https://career-ops.org/es/manifesto/#article',
        url: 'https://career-ops.org/es/manifesto',
        headline: 'El Manifiesto CareerOps',
        description: CAREEROPS_DEFINITION_ES,
        datePublished: '2026-07-14',
        dateModified: '2026-07-14',
        author: { '@id': PERSON_ID },
        publisher: { '@id': ORGANIZATION_ID },
        isPartOf: { '@id': 'https://career-ops.org/#website' },
        // The ES article is a translation of the canonical EN manifesto —
        // states that relationship explicitly for entity reconcilers.
        translationOfWork: { '@id': 'https://career-ops.org/manifesto/#article' },
        about: [
          { '@id': 'https://career-ops.org/manifesto/#careerops' },
          { '@id': 'https://career-ops.org/#software' },
        ],
        mainEntityOfPage: 'https://career-ops.org/es/manifesto',
        inLanguage: 'es',
        articleSection: 'Manifiesto',
        image: {
          '@type': 'ImageObject',
          url: 'https://career-ops.org/og-manifesto.png',
          width: 1200,
          height: 630,
        },
      },
      {
        '@type': 'Person',
        '@id': PERSON_ID,
        name: 'Santiago Fernández de Valderrama Aparicio',
        url: 'https://santifer.io/about',
        sameAs: ['https://www.wikidata.org/wiki/Q138710224'],
        identifier: WIKIDATA_PERSON_IDENTIFIER,
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://career-ops.org/es/manifesto/#faq',
        inLanguage: 'es',
        mainEntity: [
          {
            '@type': 'Question',
            name: '¿Qué es CareerOps?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `${CAREEROPS_DEFINITION_ES} El término nombra la práctica, no un producto: tratar la búsqueda de empleo como un pipeline operado (captación, puntuación, adaptación, seguimiento) en lugar de un montón de solicitudes sueltas. La implementación de referencia es career-ops (en minúsculas, con guion), el centro de mando open source con licencia MIT que ejecuta todo el pipeline en local, en la máquina de quien busca empleo, a través del CLI de IA que ya use. La práctica es más grande que la herramienta: puedes practicar CareerOps con una hoja de cálculo y disciplina; career-ops solo automatiza la capa operativa.`,
            },
          },
          {
            '@type': 'Question',
            name: '¿Quién acuñó el término CareerOps?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'CareerOps fue acuñado como nombre de la práctica por Santiago Fernández de Valderrama Aparicio (santifer), creador del proyecto open source career-ops, en El Manifiesto CareerOps (The CareerOps Manifesto), publicado el 14 de julio de 2026 en career-ops.org/es/manifesto y firmado en el repositorio del proyecto (MANIFESTO.md, release tag manifesto-v1.0). El nombre sigue el patrón de DevOps y MLOps: una disciplina -Ops que convierte una actividad improvisada en una práctica operada e instrumentada. El compuesto había aparecido antes en nombres de producto sueltos, como pasa con los compuestos -Ops; el manifiesto es la primera definición de CareerOps como práctica. Desarrolló la práctica durante su propia búsqueda de empleo de 2026 (740 vacantes evaluadas, 68 solicitudes, 12 procesos de entrevista, 1 oferta firmada) antes de nombrarla y abrirla a firmas de la comunidad.',
            },
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://career-ops.org/es/manifesto/#breadcrumbs',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://career-ops.org/es' },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Manifiesto',
            item: 'https://career-ops.org/es/manifesto',
          },
        ],
      },
    ],
  };
}

// /sustain — Path 3 Sovereign Maintainer page. Emits WebPage with
// significantLink to GitHub Sponsors + BreadcrumbList. We deliberately
// do NOT use DonateAction (Schema.org's donate-action semantics map to
// 501(c)(3) charities, and Google's parser can flag misuse). career-ops
// is individual maintainer + OSS, not a registered charity — neutral
// `significantLink` + mainContentOfPage carry the funding signal
// without the legal-tier mismatch.
export function sustainSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://career-ops.org/sustain#webpage',
        url: 'https://career-ops.org/sustain',
        name: 'Sustain career-ops',
        description:
          'career-ops is permanently free, MIT-licensed, and community-funded. Path 3 Sovereign Maintainer model — sponsorship buys time, not direction.',
        inLanguage: 'en',
        dateModified: '2026-05-16T00:00:00Z',
        about: { '@id': 'https://career-ops.org/#software' },
        isPartOf: { '@id': 'https://career-ops.org/#website' },
        significantLink: 'https://github.com/sponsors/santifer',
        mainContentOfPage: {
          '@type': 'WebPageElement',
          text: 'career-ops is permanently free, MIT-licensed, and community-funded. The maintainer has other paid work; sponsorship is not a livelihood but a way to dedicate time to the project. Sustainability comes from voluntary patronage — not premium tiers, paid features, or data.',
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://career-ops.org/sustain#breadcrumbs',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://career-ops.org/' },
          { '@type': 'ListItem', position: 2, name: 'Sustain', item: 'https://career-ops.org/sustain' },
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

// /docs/** — TechArticle bound to the canonical Person author + the
// software entity. Docs pages previously emitted only BreadcrumbList, so
// AI extractors received clean prose with zero provenance (no author, no
// entity link, no date). This gives every docs page an attributable
// author, topic, and freshness signal without editing the MDX. The
// `dateModified` is supplied by the git/build resolver in the page when
// available; omitted otherwise so we never assert a fake date.
export function docsTechArticleSchema(opts: {
  url: string;
  title: string;
  description?: string;
  dateModified?: string;
}) {
  const pageUrl = `https://career-ops.org${opts.url}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    '@id': `${pageUrl}#article`,
    url: pageUrl,
    headline: opts.title,
    ...(opts.description ? { description: opts.description } : {}),
    author: { '@id': PERSON_ID },
    publisher: { '@id': PERSON_ID },
    isPartOf: { '@id': 'https://career-ops.org/#website' },
    about: { '@id': 'https://career-ops.org/#software' },
    inLanguage: 'en',
    mainEntityOfPage: pageUrl,
    ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
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
          text: 'career-ops uses a rubric-guided LLM evaluation across five dimensions — match, north-star alignment, comp, cultural signals, red flags — producing a holistic 1.0–5.0 global score with citations to specific CV lines and JD requirements. Anything below 4.0 the agent recommends against applying. No closed-form formula, no spray-and-pray. The full rubric is published at career-ops.org/methodology.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is career-ops free? What is the business model?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'career-ops is permanently free, MIT-licensed, and community-funded. There is no paid tier, no waitlist, no account, no telemetry, and no premium features. You clone the repo, configure your profile, and run the system locally with whichever AI coding CLI you already use. Sustainability comes from voluntary community patronage via GitHub Sponsors — not from premium tiers, paid features, or data. The maintainer has other paid work for income; sponsorship enables deeper focus on the project. See career-ops.org/sustain for details.',
        },
      },
      {
        '@type': 'Question',
        name: 'Who built career-ops?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'career-ops was built by Santiago Fernández de Valderrama Aparicio — an Applied AI Operator with 16+ years building products, founder and operator of a Spanish phone-repair business (2009–2025) before exiting, and currently Head of Applied AI at Zinkee. He created career-ops in early 2026 to manage his own AI-era job search — 740 listings evaluated, one Head of AI role landed — and open-sourced it under MIT once he no longer needed it.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is career-ops a Claude Code skill or a standalone tool?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'career-ops is CLI-agnostic. It works with Claude Code, Codex, OpenCode, Gemini CLI, Qwen, and Copilot — whichever AI coding agent the user already pays for. The skill files (modes/) live in the repo as plain markdown prompts; any agent that supports skill loading can invoke them. There is no Anthropic-specific dependency. Claude Code happens to be the most common runtime because of its skill loader, but the same modes run unchanged in the other CLIs.',
        },
      },
      {
        '@type': 'Question',
        name: 'How is career-ops different from other AI job search tools?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most AI job search tools — Jobscan, Teal, Huntr, autoapply.ai — are cloud SaaS products that upload your resume and job data to their servers, charge $20–80/month, and keep their matching algorithm closed. career-ops is the inverse: open source, MIT-licensed, runs locally on your machine through whichever AI CLI you already use, and publishes the full evaluation rubric. The only recurring cost is your AI CLI subscription. Side-by-side comparisons at career-ops.org/compare.',
        },
      },
      {
        '@type': 'Question',
        name: 'What AI tools does career-ops work with?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Claude Code (primary), Codex (OpenAI), OpenCode, Gemini CLI (Google), Qwen, and GitHub Copilot. The same mode files run on all six. Each user picks the CLI that fits their existing subscription and cost preferences — career-ops never locks you to one provider. A typical job search runs on Claude Pro at $20/month, but the choice is yours.',
        },
      },
    ],
  };
}

// /blog/[slug] — BlogPosting schema. Author is the canonical Person
// entity via @id; publisher is the same Person (single-author blog).
// dateModified is the freshness signal Google ranks on.
export function blogPostSchema(args: {
  url: string;
  title: string;
  description: string;
  date: string;
  lastModified: string;
  tags: string[];
  image?: string;
}) {
  // Google's Article rich result requires `image`; without it all three
  // posts were ineligible (2026-06-30 audit). Defaults to the site OG
  // banner when a post doesn't supply its own absolute image URL.
  const imageUrl = args.image ?? 'https://career-ops.org/og-banner.jpg';
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${args.url}#article`,
    url: args.url,
    headline: args.title,
    description: args.description,
    datePublished: args.date,
    dateModified: args.lastModified,
    author: { '@id': PERSON_ID },
    publisher: { '@id': PERSON_ID },
    image: {
      '@type': 'ImageObject',
      url: imageUrl,
      width: 1200,
      height: 630,
    },
    inLanguage: 'en',
    keywords: args.tags.join(', '),
    isPartOf: { '@id': 'https://career-ops.org/#website' },
    mainEntityOfPage: args.url,
  };
}

// /compare/[slug] — comparison page schema. Emits SoftwareApplication
// for both products (career-ops via @id reference to the canonical node
// in siteSchema; competitor as a fresh node), a plain WebPage for the
// comparison itself (AboutPage was considered and rejected — the page
// is about a comparison, not about the subject), an ItemList encoding the feature
// matrix, FAQPage with comparison-specific questions, and a
// BreadcrumbList. We deliberately avoid Review or AggregateRating —
// no fake ratings. The honest matrix and verdict carry the comparison
// signal without manufactured social proof.
type ComparisonData = {
  slug: string;
  competitor: {
    name: string;
    url: string;
    tagline: string;
    pricing: string;
    license: string;
    dataModel: string;
  };
  intro: string;
  lastModified: string;
  heroImage?: string;
  features: Array<{ name: string; careerOps: string; competitor: string }>;
  verdict: { headline: string; body: string[] };
  faq: Array<{ q: string; a: string }>;
};

export function comparisonSchema(data: ComparisonData) {
  const pageUrl = `https://career-ops.org/compare/${data.slug}`;
  const imageUrl = data.heroImage
    ? `https://career-ops.org${data.heroImage}`
    : undefined;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: `career-ops vs ${data.competitor.name}`,
        description: data.intro,
        inLanguage: 'en',
        dateModified: `${data.lastModified}T00:00:00Z`,
        isPartOf: { '@id': 'https://career-ops.org/#website' },
        about: { '@id': 'https://career-ops.org/#software' },
        author: { '@id': PERSON_ID },
        ...(imageUrl && {
          image: {
            '@type': 'ImageObject',
            url: imageUrl,
            width: 1200,
            height: 630,
          },
        }),
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${pageUrl}#competitor`,
        name: data.competitor.name,
        url: data.competitor.url,
        applicationCategory: 'BusinessApplication',
        description: data.competitor.tagline,
      },
      {
        '@type': 'ItemList',
        '@id': `${pageUrl}#feature-matrix`,
        name: `Feature comparison: career-ops vs ${data.competitor.name}`,
        numberOfItems: data.features.length,
        itemListElement: data.features.map((f, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: f.name,
          description: `career-ops: ${f.careerOps} — ${data.competitor.name}: ${f.competitor}`,
        })),
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        mainEntity: data.faq.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumbs`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://career-ops.org/' },
          { '@type': 'ListItem', position: 2, name: 'Compare', item: 'https://career-ops.org/compare' },
          { '@type': 'ListItem', position: 3, name: `vs ${data.competitor.name}`, item: pageUrl },
        ],
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
        name: 'Santiago Fernández de Valderrama Aparicio',
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

// Press / brand-kit page. WebPage bound to the software entity, plus the
// downloadable brand assets surfaced as ImageObject nodes so crawlers and
// LLMs can resolve "career-ops logo" / "career-ops press kit" queries to a
// canonical answer. mainEntity → #software keeps entity provenance on the
// canonical domain (not the typosquat). dateModified stamped on edit.
export function pressSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://career-ops.org/press/#webpage',
        url: 'https://career-ops.org/press',
        name: 'Press & Brand Kit · career-ops',
        description:
          'Official press kit for career-ops: boilerplate descriptions, key facts, logos, and media coverage. Open-source, MIT-licensed AI job-search tool by Santiago Fernández de Valderrama Aparicio.',
        inLanguage: 'en',
        about: { '@id': 'https://career-ops.org/#software' },
        isPartOf: { '@id': 'https://career-ops.org/#website' },
        publisher: { '@id': ORGANIZATION_ID },
        dateModified: '2026-07-15T00:00:00Z',
        // Reference the canonical DefinedTerm node on /manifesto — never
        // duplicate the definition here.
        mentions: { '@id': 'https://career-ops.org/manifesto/#careerops' },
        primaryImageOfPage: { '@id': 'https://career-ops.org/press/#logo' },
      },
      {
        '@type': 'ImageObject',
        '@id': 'https://career-ops.org/press/#logo',
        url: 'https://career-ops.org/bimi-logo.svg',
        caption: 'career-ops logo — the "co" mark',
        encodingFormat: 'image/svg+xml',
        width: '96',
        height: '96',
      },
      {
        '@type': 'ImageObject',
        '@id': 'https://career-ops.org/press/#banner',
        url: 'https://career-ops.org/og-banner.jpg',
        caption: 'career-ops social banner',
        encodingFormat: 'image/jpeg',
        width: '2400',
        height: '1339',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://career-ops.org/press/#breadcrumbs',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://career-ops.org/' },
          { '@type': 'ListItem', position: 2, name: 'Press', item: 'https://career-ops.org/press' },
        ],
      },
    ],
  };
}
