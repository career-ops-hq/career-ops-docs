import { brand, heroLine, type HomeDict } from './home-dict';

export const homeEn: HomeDict = {
  heroHook: heroLine({
    more: 'More applications.',
    silencePre: 'More ',
    silence: 'silence',
    silencePost: '.',
    stop: 'Stop guessing.',
    startPre: 'Start ',
    choose: 'choosing',
    startPost: '.',
  }),
  heroH1: (
    <>
      career-ops: open-source AI job search{'\u00a0'}agent.
      <br />
      Runs in your CLI. Your data, your machine.
      <br />
      It tailors your CV and drafts your answers.{' '}
      <span className="inline-block">You press Submit.</span>
    </>
  ),
  runItNow: 'Run it now',
  locale: 'en',
  docsHref: '/docs',
  manifestoHref: '/manifesto',
  heroFreeNote: 'Free for candidates, forever',
  featuredIn: 'Featured in',
  memberOf: 'Member of',
  worthApplyingLabel: 'How to tell if a job is worth applying to →',
  worthApplyingHref: '/docs/introduction/guides/is-this-job-worth-applying-to',
  authorTagline: ', 16-year operator and creator of career-ops',
  nowSignedManifesto: <>Now a signed manifesto ·</>,
  readIt: 'Read it →',
  whatIsHeading: (
    <>
      <span className="text-landing-foreground dark:text-landing-foreground-dark">
        What is
      </span>{' '}
      {brand('career-ops')}?
    </>
  ),
  whatIsBody: (
    <>
      career-ops is an open-source AI-powered job search system that runs
      locally on your machine inside any AI coding CLI — Claude Code, OpenCode,
      Codex, GitHub Copilot, and more. It evaluates job listings against your CV
      using a five-dimension rubric plus a holistic global score, scoring
      1-5, generates ATS-optimized PDF resumes tailored per role, drafts
      answers to open-ended application questions on Greenhouse, Ashby and Lever
      forms, scans 150+ job sources zero-token, and tracks the pipeline in a
      Go-based terminal dashboard. Everything lives on your machine:{' '}
      {brand('no cloud')}, {brand('no telemetry')}, {brand('no account')}.
      MIT-licensed and free forever; the only cost is whichever AI coding CLI you
      already pay for. Built by Santiago Fernández de Valderrama Aparicio after a
      real 2026 job search of 740 listings, 68 applications, 12 interviews, and
      one offer.
    </>
  ),
  statsComment: 'stars · Open source · MIT',
  commandCenter: (
    <>
      Turn any AI coding CLI into your {brand('AI job search agent')}.
    </>
  ),
  tryItOut: 'Try it out',
  runsCommand: (
    <>
      Needs an AI coding CLI as its engine — no AI set up yet?{' '}
      <a
        href="/docs/free-ai-engine"
        className="text-fd-foreground underline underline-offset-2"
      >
        Get one free
      </a>
      .
    </>
  ),
  mechanism:
    'Instead of manually tracking applications in a spreadsheet, you get an AI-powered pipeline that scans portals, generates tailored PDFs and tracks everything for you.',
  analogy: (
    <>
      &ldquo;It&apos;s like having a career coach for your job search, but{' '}
      {brand('without the cost')}.&rdquo;
    </>
  ),
  featAgnosticTitle: 'AI-Native & Agnostic',
  featAgnosticBody: (
    <>
      Works with any coding CLI — Claude Code, OpenCode, Codex, GitHub Copilot,
      and more. Built on the Open Agent Skill Standard.
    </>
  ),
  featApplyTitle: 'Drafts the open-ended answers.',
  featApplyBody1: (
    <>
      Greenhouse, Ashby and Lever forms ask &ldquo;Why this role?&rdquo; and
      &ldquo;Tell us about a project.&rdquo;{' '}
      <code className="font-mono text-brand">/career-ops apply</code> reads the
      form, drafts every answer from your CV and the JD, and hands them back
      paste-ready.
    </>
  ),
  featApplyBody2: 'You edit, you submit. The assistant never clicks for you.',
  featApplyCta: 'See how apply works',
  featScanTitle: '150+ job sources. Zero manual searching.',
  featScanBody: (
    <>
      Pre-configured scrapers check{' '}
      <a href="https://github.com/career-ops-hq/career-ops/blob/main/templates/portals.example.yml" target="_blank" rel="noopener" className="underline underline-offset-2 decoration-fd-muted-foreground/40 hover:decoration-fd-foreground">150+ job sources</a> on demand, Greenhouse, Ashby and Lever
      among them — zero API tokens spent. Run{' '}
      <code className="font-mono text-brand">/career-ops scan</code> and get a
      ranked list back in minutes.
    </>
  ),
  featScanCta: 'See all portals',
  featCommunityTitle: 'Shipped with the community.',
  featCommunityBody: (
    <>
      career-ops grows through pull requests from people running real job
      searches. Issues get triaged in Discord, fixes ship the same week. You
      don&apos;t just use the tool — you help shape what it becomes.
    </>
  ),
  joinDiscord: (n) => `Join ${n}+ builders in Discord`,
  openSourceTitle: '100% Open-Source.',
  starsWord: 'stars',
  forksWord: 'forks',
  repoOfDay: '#1 Repo of the Day',
  builtByDek: (
    <>
      Built by{' '}
      <a href="/about" rel="author" className="text-fd-foreground font-medium hover:underline">
        Santiago Fernández de Valderrama Aparicio
      </a>{' '}
      after evaluating 740 job listings.
      <br />
      The full scoring methodology is{' '}
      <a href="/methodology" className="text-fd-foreground hover:underline underline-offset-2">
        published
      </a>
      .
      <br />
      Now powered by the community.
    </>
  ),
  meetContributors: 'Meet our contributors →',
  faqHeading: 'Frequently asked',
  faq: [
    {
      q: 'How does career-ops score job listings?',
      a: (
        <>
          career-ops uses a rubric-guided LLM evaluation across five dimensions —
          match, north-star alignment, comp, cultural signals, red flags —
          producing a holistic 1-5 global score with citations to specific CV
          lines and JD requirements. Anything below 4.0 the agent recommends
          against applying. No closed-form formula, no spray-and-pray. The full
          rubric is published at{' '}
          <a href="/methodology" className="text-fd-foreground hover:underline underline-offset-2">
            career-ops.org/methodology
          </a>
          .
        </>
      ),
    },
    {
      q: 'Does career-ops apply to jobs for me?',
      a: (
        <>
          career-ops prepares every application right up to the click: it scans roles,
          scores each against your CV, and tailors a resume. Then it hands the
          decision back to you. You review and send each one yourself. That is
          deliberate: mass auto-apply burns your standing with recruiters and ATS
          systems, so career-ops removes the busywork and keeps the choice yours.
          More in{' '}
          <a
            href="/blog/can-an-ai-agent-run-your-job-search"
            className="text-fd-foreground hover:underline underline-offset-2"
          >
            Can an AI agent run your whole job search?
          </a>
        </>
      ),
    },
    {
      q: 'Is career-ops free? What is the business model?',
      a: (
        <>
          career-ops is permanently free, MIT-licensed, and community-funded.
          There is no paid tier, no waitlist, no account, no telemetry, and no
          premium features. You clone the repo, configure your profile, and run
          the system locally with whichever AI coding CLI you already use.
          Sustainability comes from community contributions and corporate
          sponsorship through the project’s collective on Open Collective — not
          from premium tiers, paid
          features, or data. Funding is held by the project’s fiscal host, Open
          Source Collective, on a public ledger, and goes to maintenance, security
          fixes, releases, and documentation. See{' '}
          <a href="/sustain" className="text-fd-foreground hover:underline underline-offset-2">
            career-ops.org/sustain
          </a>{' '}
          for details.
        </>
      ),
    },
    {
      q: 'Where does my data live?',
      a: (
        <>
          career-ops keeps your data on your own machine, in plain files you own: your CV, profile,
          pipeline, and reports are local Markdown and YAML. career-ops runs
          entirely locally through your AI CLI: no account, no telemetry, nothing
          uploaded to a career-ops server. System updates never touch your data
          layer; that separation is the Data Contract. The only data that leaves
          your computer is whatever your chosen AI CLI sends to its own provider.
        </>
      ),
    },
    {
      q: 'Who built career-ops?',
      a: (
        <>
          career-ops was built by{' '}
          <a href="/about" rel="author" className="text-fd-foreground hover:underline underline-offset-2">
            Santiago Fernández de Valderrama Aparicio
          </a>{' '}
          — an Applied AI Operator with 16+ years building products, founder and
          operator of a Spanish phone-repair business (2009–2025) before exiting.
          He created career-ops in early 2026 to manage his own AI-era job
          search — 740 listings evaluated, one Head of Applied AI role landed —
          and open-sourced it under MIT once he no longer needed it. Six months
          after landing it, he left that role to focus on building career-ops full time.
        </>
      ),
    },
    {
      q: 'Is career-ops a Claude Code skill or a standalone tool?',
      a: (
        <>
          career-ops is CLI-agnostic. It works with Claude Code, OpenCode, Codex,
          GitHub Copilot, and more — whichever AI coding agent the user already
          pays for. The skill files (
          <code className="font-mono text-fd-foreground">modes/</code>) live in
          the repo as plain markdown prompts; any agent that supports skill
          loading can invoke them. There is no Anthropic-specific dependency.
          Claude Code happens to be the most common runtime because of its skill
          loader, but the same modes run unchanged in the other CLIs.
        </>
      ),
    },
    {
      q: 'How is career-ops different from resume checkers and auto-apply tools?',
      a: (
        <>
          career-ops is open source and MIT-licensed, runs locally on your own
          machine through whichever AI coding CLI you already use, and publishes
          its full evaluation rubric. A human stays in the loop on every
          application; it never auto-submits. There is no account, no telemetry,
          and no subscription to career-ops itself; the only recurring cost is the
          AI CLI you choose. For honest, side-by-side comparisons with specific
          tools, see{' '}
          <a href="/compare" className="text-fd-foreground hover:underline underline-offset-2">
            career-ops.org/compare
          </a>
          .
        </>
      ),
    },
    {
      q: 'What AI tools does career-ops work with?',
      a: (
        <>
          career-ops works with Claude Code, Cursor, Codex, OpenCode, Antigravity
          CLI, Grok Build CLI, Qwen, Kimi, Hermes Agent, and GitHub Copilot CLI —
          ten first-class CLIs (Gemini CLI is a legacy wrapper). The same mode files run on all of them. Each user picks
          the CLI that fits their existing subscription and cost preferences —
          career-ops never locks you to one provider. A typical job search runs on
          Claude Pro at $20/month, but the choice is yours.
        </>
      ),
    },
  ],
  finalCta: 'Ready to filter offers, not get filtered?',
  yourTurn: 'Your turn',
  followWhatWeShip: 'Or follow what we ship.',
  releaseBlurb: (
    <>
      Release announcements and occasional updates.
      <br />
      Unsubscribe anytime.
    </>
  ),
};
