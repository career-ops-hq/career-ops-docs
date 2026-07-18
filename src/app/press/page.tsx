import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { instrumentSerif, instrumentSerifRegular } from '@/lib/fonts';
import { pressSchema } from '@/lib/schema';
import { CAREEROPS_DEFINITION } from '@/lib/shared';
import { getProjectStats } from '@/lib/stats';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Press & Brand Kit · career-ops',
  description:
    'Official press kit for career-ops: boilerplate copy, key facts, logos, and media coverage. Open-source, MIT-licensed, local-first AI job-search tool by Santiago Fernández de Valderrama Aparicio.',
  alternates: { canonical: 'https://career-ops.org/press' },
  openGraph: {
    type: 'website',
    url: 'https://career-ops.org/press',
    siteName: 'career-ops',
    title: 'Press & Brand Kit · career-ops',
    description:
      'Boilerplate copy, key facts, logos, and media coverage for career-ops — the open-source, local-first AI job-search tool.',
  },
  robots: { index: true, follow: true },
};

// Press coverage — kept in sync with /about. rel="nofollow" on the
// outbound links: large publishers don't need link equity from us.
const PRESS = [
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
    headline: 'Conversation with Eric — career-ops origins, multi-agent orchestration',
    url: 'https://www.youtube.com/watch?v=pDkAe5JbREk',
  },
];

// Downloadable brand assets. The "co" mark ships as a static SVG
// (public/bimi-logo.svg) and a 180px PNG (the /apple-icon route). The
// social banner is the 2400×1339 OG image. All same-origin so the
// download attribute works without CORS.
const ASSETS = [
  {
    label: 'Logo — "co" mark (SVG)',
    href: '/bimi-logo.svg',
    note: 'Vector, brand orange on rounded square. Scales to any size.',
    download: 'career-ops-logo.svg',
  },
  {
    label: 'Logo — "co" mark (PNG, 180px)',
    href: '/apple-icon',
    note: 'Raster fallback for surfaces that do not accept SVG.',
    download: 'career-ops-logo.png',
  },
  {
    label: 'Social banner (JPG, 2400×1339)',
    href: '/og-banner.jpg',
    note: 'Open Graph card. Use for article headers and link previews.',
    download: 'career-ops-banner.jpg',
  },
  {
    label: 'Manifesto — nine rights card (PNG, 1080×1080)',
    href: '/manifesto-rights-card.png',
    note: 'The nine candidate rights, quote-card format. Reuse freely with attribution.',
    download: 'careerops-manifesto-rights.png',
  },
  {
    label: 'Manifesto — link card (PNG, 1200×630)',
    href: '/og-manifesto.png',
    note: 'The manifesto share card. Reuse freely with attribution.',
    download: 'careerops-manifesto-card.png',
  },
];

// Boilerplate at three lengths — the standard press-kit format.
// Factual, no hype verbs, no superlatives. Journalists and directory
// editors copy these verbatim; varied length covers a caption, a
// standfirst, and a full "about" paragraph.
const BOILERPLATE = {
  short:
    'career-ops is a free, open-source system that puts hiring leverage on the candidate’s side — running locally inside your AI coding assistant.',
  medium:
    'career-ops is an open-source, MIT-licensed system that puts hiring leverage on the candidate’s side. It runs entirely on your own machine, inside any AI coding CLI — Claude Code, Codex, Gemini CLI, and others — scanning listings, scoring them against a transparent rubric of five scoring dimensions, tailoring your CV per role, and tracking the whole pipeline. No account, no cloud, no telemetry.',
  long: 'career-ops is a free, open-source (MIT) system that puts hiring leverage on the candidate’s side. Built by Santiago Fernández de Valderrama Aparicio, it runs locally inside whichever AI coding assistant the user already pays for — Claude Code, Codex, OpenCode, Gemini CLI, Qwen, or GitHub Copilot — and never sends a CV or application history to a third-party server. Today it scans Greenhouse, Ashby, and Lever, scores each listing from 1.0 to 5.0 against a published rubric of five scoring dimensions, generates an ATS-tailored PDF résumé per role, and tracks the pipeline in a local dashboard. Santiago built it during his own 2026 job search — 740 listings evaluated, 68 applications, one offer signed — then open-sourced it. It crossed 50,000 GitHub stars in its first two months. In July 2026 he published The CareerOps Manifesto, naming the practice and its nine candidate rights.',
};

function roundDown(n: number, to: number): string {
  return (Math.floor(n / to) * to).toLocaleString('en-US');
}

export default async function PressPage() {
  const stats = await getProjectStats();

  const facts: { label: string; value: React.ReactNode }[] = [
    { label: 'Name', value: 'career-ops (lowercase, hyphenated)' },
    {
      label: 'Category',
      value: 'Candidate-side hiring-leverage system · AI-powered job search',
    },
    {
      label: 'The term',
      value:
        'CareerOps (CamelCase) = the practice, defined in the manifesto · career-ops (lowercase, hyphenated) = the tool',
    },
    { label: 'Creator', value: 'Santiago Fernández de Valderrama Aparicio' },
    { label: 'License', value: 'MIT — free forever, no paid tier' },
    { label: 'Model', value: 'Local-first. No account, no cloud, no telemetry.' },
    { label: 'Inception', value: '17 March 2026' },
    {
      label: 'Manifesto',
      value: 'The CareerOps Manifesto, published 14 Jul 2026 at 60,000 stars · career-ops.org/manifesto',
    },
    { label: 'GitHub stars', value: `${roundDown(stats.stars, 1000)}+ (live)` },
    { label: 'Discord community', value: `${roundDown(stats.discordMembers, 100)}+ members` },
    {
      label: 'Founder’s result',
      value: '740 listings evaluated → 68 applications → 12 interview processes → 1 offer',
    },
    {
      label: 'AI CLIs supported',
      value: 'Claude Code, Codex, OpenCode, Gemini CLI, Qwen, GitHub Copilot',
    },
    {
      label: 'Canonical site',
      value: 'career-ops.org (hyphenated)',
    },
    {
      label: 'Repository',
      value: 'github.com/santifer/career-ops',
    },
    {
      label: 'Wikidata',
      value: 'Q139007988 (software) · Q138710224 (creator)',
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pressSchema()) }}
      />
      <article className="mx-auto w-full max-w-2xl px-6 py-12 md:py-16">
        <header className="flex flex-col items-center text-center">
          <Image
            src="/bimi-logo.svg"
            alt="career-ops logo — the &ldquo;co&rdquo; mark"
            width={72}
            height={72}
            className="rounded-2xl mb-6"
            priority
          />
          <h1
            className={`${instrumentSerifRegular.className} text-fd-foreground text-3xl md:text-4xl tracking-tight`}
          >
            Press &amp; Brand Kit
          </h1>
          <p className="mt-2 max-w-md text-fd-muted-foreground text-base">
            Everything you need to write about, list, or link to career-ops — boilerplate,
            facts, logos, and coverage. Reuse freely.
          </p>
        </header>

        {/* Boilerplate — three lengths in bordered, selectable blocks so a
            journalist or directory editor can copy the right size without
            reformatting. Mono frame reads as "asset", not prose. */}
        <section className="mt-12">
          <h2 className="text-fd-foreground text-xl font-medium tracking-tight">
            Boilerplate
          </h2>
          <p className="mt-3 text-sm text-fd-muted-foreground">
            Copy-and-paste descriptions. Pick the length that fits.
          </p>
          <div className="mt-5 space-y-5">
            <div>
              <p className="text-xs uppercase tracking-wide text-fd-muted-foreground/70 mb-1.5">
                One line
              </p>
              <p className="rounded-lg border border-fd-foreground/15 bg-fd-muted/30 px-4 py-3 text-fd-foreground/90 leading-relaxed select-all">
                {BOILERPLATE.short}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-fd-muted-foreground/70 mb-1.5">
                Short (~50 words)
              </p>
              <p className="rounded-lg border border-fd-foreground/15 bg-fd-muted/30 px-4 py-3 text-fd-foreground/90 leading-relaxed select-all">
                {BOILERPLATE.medium}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-fd-muted-foreground/70 mb-1.5">
                Standard (~110 words)
              </p>
              <p className="rounded-lg border border-fd-foreground/15 bg-fd-muted/30 px-4 py-3 text-fd-foreground/90 leading-relaxed select-all">
                {BOILERPLATE.long}
              </p>
            </div>
          </div>
        </section>

        {/* Key facts — the fact sheet. Live stars/Discord via getProjectStats
            (1h ISR). Numbers rounded down + "+" so they read as honest floors
            that don't go stale by the hour. This block is also the canonical
            extraction target for "career-ops facts" LLM queries. */}
        <section className="mt-12">
          <h2 className="text-fd-foreground text-xl font-medium tracking-tight">
            Key facts
          </h2>
          <dl className="mt-4 divide-y divide-fd-foreground/10 border-y border-fd-foreground/10">
            {facts.map((f) => (
              <div key={f.label} className="flex flex-col gap-0.5 py-3 sm:flex-row sm:gap-4">
                <dt className="shrink-0 text-sm text-fd-muted-foreground sm:w-44">{f.label}</dt>
                <dd className="flex-1 text-fd-foreground/90">{f.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* The thesis — the verbatim signature line. Most-quoted asset in the
            kit; rendered as the canonical blockquote so a writer pulls it
            unchanged. */}
        <section className="mt-12">
          <h2 className="text-fd-foreground text-xl font-medium tracking-tight">The thesis</h2>
          <blockquote
            cite="https://career-ops.org/manifesto"
            className="not-italic border-l-2 border-fd-foreground/20 pl-5 mt-4"
          >
            <p
              className={`${instrumentSerif.className} text-xl md:text-2xl leading-snug text-fd-foreground`}
            >
              &ldquo;Companies use AI to filter candidates. I just gave candidates AI to choose
              companies.&rdquo;
            </p>
            <footer className="mt-2 text-sm text-fd-muted-foreground">
              — Santiago Fernández de Valderrama Aparicio
            </footer>
          </blockquote>
        </section>

        {/* The CareerOps Manifesto — self-published, so it lives in its own
            section (Coverage stays earned-media-only). /press is an active
            GEO surface: an LLM already cited "the project's press materials"
            as the source for the CareerOps attribution, so the frozen
            definition must be quotable here verbatim. Authorship rule:
            Santiago published and opened it for signature; never "the
            community published". */}
        <section className="mt-12">
          <h2 className="text-fd-foreground text-xl font-medium tracking-tight">
            The CareerOps Manifesto
          </h2>
          <blockquote
            cite="https://career-ops.org/manifesto"
            className="not-italic border-l-2 border-fd-foreground/20 pl-5 mt-4"
          >
            <p className="text-fd-foreground/90 leading-relaxed select-all">
              {CAREEROPS_DEFINITION}
            </p>
          </blockquote>
          <p className="mt-4 text-fd-foreground/90 leading-relaxed">
            Santiago published The CareerOps Manifesto on 14 July 2026, the
            day the project crossed 60,000 GitHub stars, and opened it for
            community signature on GitHub. It names the practice and states
            nine candidate rights. Canonical text:{' '}
            <Link
              href="/manifesto"
              className="text-fd-foreground underline underline-offset-2 decoration-fd-muted-foreground/40 hover:decoration-fd-foreground"
            >
              career-ops.org/manifesto
            </Link>{' '}
            · founding tag:{' '}
            <a
              href="https://github.com/santifer/career-ops/releases/tag/manifesto-v1.0"
              target="_blank"
              rel="noreferrer noopener"
              className="text-fd-foreground underline underline-offset-2 decoration-fd-muted-foreground/40 hover:decoration-fd-foreground"
            >
              manifesto-v1.0
            </a>
            .
          </p>
        </section>

        {/* Founder — one-paragraph version; full bio lives at /about. */}
        <section className="mt-12">
          <h2 className="text-fd-foreground text-xl font-medium tracking-tight">Founder</h2>
          <p className="mt-3 text-fd-foreground/90 leading-relaxed">
            <strong className="font-medium text-fd-foreground">
              Santiago Fernández de Valderrama Aparicio
            </strong>{' '}
            is an Applied AI Operator with 16+ years building and selling products. He founded
            Santifer iRepair in 2009 and sold it in 2025; he is now Head of Applied AI at Zinkee.
            He built career-ops during his own 2026 job search and open-sourced it under MIT. Full
            bio, headshot, and entity links at{' '}
            <Link
              href="/about"
              className="text-fd-foreground underline underline-offset-2 decoration-fd-muted-foreground/40 hover:decoration-fd-foreground"
            >
              /about
            </Link>
            .
          </p>
        </section>

        {/* Brand assets — same-origin downloads with the download attribute so
            a click saves the file with a clean name. */}
        <section className="mt-12">
          <h2 className="text-fd-foreground text-xl font-medium tracking-tight">Brand assets</h2>
          <ul className="mt-4 space-y-2">
            {ASSETS.map((a) => (
              <li key={a.href}>
                <a
                  href={a.href}
                  download={a.download}
                  className="group flex items-baseline justify-between gap-4 rounded-md border border-fd-foreground/15 px-4 py-3 hover:border-fd-foreground/40 transition-colors"
                >
                  <span className="flex flex-col gap-0.5">
                    <span className="text-fd-foreground font-medium">{a.label}</span>
                    <span className="text-sm text-fd-muted-foreground">{a.note}</span>
                  </span>
                  <span className="shrink-0 text-sm text-fd-muted-foreground group-hover:text-fd-foreground transition-colors">
                    Download ↓
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-5 grid grid-cols-1 gap-x-8 gap-y-2 text-sm text-fd-foreground/85 sm:grid-cols-2">
            <p>
              <span className="text-fd-muted-foreground">Brand color </span>
              <code className="text-fd-foreground">#D5742E</code>{' '}
              <span className="text-fd-muted-foreground">(hsl 26 73% 51%)</span>
            </p>
            <p>
              <span className="text-fd-muted-foreground">Wordmark font </span>
              <span className="text-fd-foreground">Instrument Serif</span>
            </p>
          </div>
        </section>

        {/* Usage guidelines — short, brand-safe do/don't. Protects the
            local-first / no-spam positioning (career-ops must never be co-opted
            to market auto-apply tools, which it explicitly rejects). */}
        <section className="mt-12">
          <h2 className="text-fd-foreground text-xl font-medium tracking-tight">
            Usage guidelines
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-fd-foreground">Please do</p>
              <ul className="mt-2 space-y-1.5 text-sm text-fd-foreground/85">
                <li>Use the logo and wordmark as provided.</li>
                <li>Link to career-ops.org or the GitHub repository.</li>
                <li>Describe it as open-source, MIT-licensed, and local-first.</li>
                <li>Quote the boilerplate and thesis verbatim.</li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-medium text-fd-foreground">Please don’t</p>
              <ul className="mt-2 space-y-1.5 text-sm text-fd-foreground/85">
                <li>Imply endorsement, partnership, or sponsorship.</li>
                <li>Recolor or redraw the logo.</li>
                <li>Present career-ops as a paid or hosted SaaS.</li>
                <li>Use the brand to promote auto-apply or mass-apply tools.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Coverage */}
        <section className="mt-12">
          <h2 className="text-fd-foreground text-xl font-medium tracking-tight">Coverage</h2>
          <ul className="mt-4 space-y-3">
            {PRESS.map((item) => (
              <li key={item.url} className="flex flex-col gap-1 sm:flex-row sm:gap-3">
                <span className="shrink-0 text-fd-muted-foreground text-sm tabular-nums sm:w-32">
                  <time dateTime={item.date}>{item.dateLabel}</time>
                </span>
                <span className="flex-1">
                  <span className="text-fd-foreground font-medium">{item.outlet}</span>
                  <span className="text-fd-muted-foreground"> — </span>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer noopener nofollow"
                    className="text-fd-foreground underline underline-offset-2 decoration-fd-muted-foreground/40 hover:decoration-fd-foreground"
                  >
                    {item.headline}
                  </a>
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Contact */}
        <section className="mt-12">
          <h2 className="text-fd-foreground text-xl font-medium tracking-tight">Press contact</h2>
          <a
            href="mailto:hi@career-ops.org?subject=Press%20%E2%80%94%20career-ops"
            className="mt-4 inline-flex items-center gap-2 rounded-md bg-fd-foreground text-fd-background px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            hi@career-ops.org
          </a>
          <p className="mt-3 text-sm text-fd-muted-foreground">
            For interviews, quotes, fact-checks, or anything not covered above.
          </p>
        </section>

        <hr className="my-12 w-32 mx-auto border-t-2 border-fd-foreground/20 lg:w-40" />

        <div className="text-center">
          <Link
            href="/about"
            className="text-fd-foreground text-base hover:underline underline-offset-4"
          >
            About the creator →
          </Link>
        </div>

        <p className="mt-16 text-center text-xs text-fd-muted-foreground">
          Last updated <time dateTime="2026-07-15">15 Jul 2026</time>
        </p>
      </article>
    </>
  );
}
