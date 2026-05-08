import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/cn';
import { TerminalIcon } from 'lucide-react';
import { Hero, CreateAppAnimation, AgnosticBackground } from './page.client';
import { instrumentSerif, instrumentSerifRegular } from '@/lib/fonts';
import { SubscribeForm } from '@/components/subscribe-form';
import { CopyableCommand } from '@/components/copyable-command';
import { getProjectStats } from '@/lib/stats';
import { homeFaqSchema } from '@/lib/schema';

// "43,204" → "43K+". Floor-rounding to the thousands keeps the number
// honestly conservative (the live count is always at-or-above what we
// show), and the `+` carries momentum without inflating.
function formatK(n: number): string {
  if (n < 1000) return n.toLocaleString('en-US');
  return `${Math.floor(n / 1000)}K+`;
}
export const metadata: Metadata = {
  metadataBase: new URL('https://career-ops.org'),
  title: 'career-ops — AI-powered job search command center',
  description:
    'Open source AI-powered job search system. Runs in your CLI on your machine. CLI-agnostic, MIT-licensed, local-first. Evaluate jobs, generate tailored CVs, track applications.',
  alternates: { canonical: 'https://career-ops.org' },
  openGraph: {
    type: 'website',
    url: 'https://career-ops.org',
    siteName: 'career-ops',
    title: 'career-ops — AI-powered job search command center',
    description:
      'Open source AI-powered job search system. Runs in your CLI. CLI-agnostic, MIT, local-first.',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@santifer',
    creator: '@santifer',
    title: 'career-ops — AI-powered job search command center',
    description:
      'Open source AI-powered job search system. Runs in your CLI. CLI-agnostic, MIT, local-first.',
  },
};

const buttonVariants = cva(
  'inline-flex justify-center px-5 py-3 rounded-full font-medium tracking-tight transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-brand text-brand-foreground hover:bg-brand-200',
        secondary: 'border bg-fd-secondary text-fd-secondary-foreground hover:bg-fd-accent',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);

type Contributor = {
  login: string;
  avatar_url: string;
  html_url: string;
};

async function getContributors(): Promise<Contributor[]> {
  try {
    const res = await fetch(
      'https://api.github.com/repos/santifer/career-ops/contributors?per_page=12',
      {
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

// Press article URLs (sourced via cv-santiago — canonical in santifer.io
// Person.subjectOf JSON-LD).
const PRESS = {
  biEN: 'https://www.businessinsider.com/how-i-built-tool-filter-job-listings-landed-head-ai-2026-4',
  wiredGR: 'https://wired.com.gr/article/to-ai-ergaleio-pou-fernei-epanastasi-ston-tropo-pou-psachnoume-douleia/',
};

// Compatible AI coding CLIs. Logos from simpleicons.org (CC0) except
// OpenCode which is sourced from opencode.ai/brand and simplified to a
// monochrome-friendly mark. Order: alphabetical by display name.
const CLIS = [
  { name: 'Claude Code', src: '/clis/claude.svg' },
  { name: 'Codex', src: '/clis/openai.svg' },
  { name: 'Gemini CLI', src: '/clis/googlegemini.svg' },
  { name: 'GitHub Copilot', src: '/clis/githubcopilot.svg' },
  { name: 'OpenCode', src: '/clis/opencode.svg' },
  { name: 'Qwen CLI', src: '/clis/qwen.svg' },
];

export default async function HomePage() {
  const [contributors, stats] = await Promise.all([getContributors(), getProjectStats()]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema()) }}
      />
      {/* Hero */}
      <div className="relative flex min-h-[600px] h-[70vh] max-h-[900px] border rounded-2xl overflow-hidden mx-auto w-full max-w-[1400px] bg-origin-border mt-4">
        <Hero />
        <Image
          src="/hero_image.png"
          alt="career-ops terminal interface showing the job pipeline tracker"
          width={1628}
          height={1044}
          className="absolute top-[58%] left-[25%] max-w-[1400px] rounded-xl block [animation:fade-in-delayed_700ms_ease_400ms_both] [mask-image:linear-gradient(to_right,transparent_0%,black_8%)]"
          priority
        />
        <div className="flex flex-col z-2 px-4 size-full md:p-12 max-md:items-center max-md:text-center">
          {/* Visually prominent display copy — emotional hook. Not a heading
              semantically; aria-hidden so screen readers skip directly to the
              functional H1 below which carries the keyword-rich description.
              Instrument Serif regular: same family as the manifesto italic
              (voice coherence) but differentiated style so the cita keeps
              its uniqueness. */}
          <p
            aria-hidden="true"
            className={`${instrumentSerifRegular.className} text-5xl mt-12 mb-6 leading-[1.05] xl:text-7xl xl:mb-8`}
          >
            You got the job,
            <br />
            and it didn&apos;t cost you a <span className="text-brand">thing</span>.
          </p>
          {/* Functional H1 — visually secondary but the one Google, ChatGPT,
              Perplexity index. Carries the searchable description: 'AI-powered
              job search', 'open source', 'CLI', 'local-first'. */}
          <h1 className="mb-8 max-w-xl text-base font-normal text-fd-muted-foreground md:text-lg">
            Open source AI-powered job search.
            <br />
            Runs in your CLI. Your data, your machine.
          </h1>
          <div className="flex flex-row items-center gap-4 flex-wrap w-fit">
            <Link
              href="/docs"
              className={cn(buttonVariants(), 'inline-flex items-center gap-2 max-sm:text-sm')}
            >
              Run it now
              <span
                aria-hidden="true"
                className="cli-cursor inline-block h-[1em] w-[0.35em] bg-current align-middle"
              />
            </Link>
            <a
              href="https://github.com/santifer/career-ops"
              target="_blank"
              rel="noreferrer noopener"
              className={cn(buttonVariants({ variant: 'secondary' }), 'max-sm:text-sm')}
            >
              View source
            </a>
          </div>
        </div>
      </div>

      {/* Press coverage — Tier 1 logos (WIRED + BI) + Tier 2 text-only secondary.
          Logos served from /public/press/ (sourced from cv-santiago). Filter
          forces monochrome regardless of original SVG colors: brightness(0)
          for light mode, +invert for dark mode. */}
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12 mt-12 lg:mt-16">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-fd-muted-foreground mb-6">
          Featured in
        </p>
        <div className="flex flex-row flex-wrap items-center justify-center gap-10 md:gap-16">
          <a
            href={PRESS.wiredGR}
            target="_blank"
            rel="noopener noreferrer nofollow"
            aria-label="Featured in WIRED Greece"
            className="opacity-55 hover:opacity-100 transition-opacity duration-300"
          >
            <Image
              src="/press/wired.svg"
              alt="WIRED"
              width={110}
              height={22}
              className="h-[22px] w-auto brightness-0 dark:invert"
            />
          </a>
          <a
            href={PRESS.biEN}
            target="_blank"
            rel="noopener noreferrer nofollow"
            aria-label="Featured in Business Insider"
            className="opacity-55 hover:opacity-100 transition-opacity duration-300"
          >
            <Image
              src="/press/business-insider.svg"
              alt="Business Insider"
              width={84}
              height={26}
              className="h-[26px] w-auto brightness-0 dark:invert"
            />
          </a>
        </div>
      </div>

      {/* Manifesto blockquote — canonical signature thesis in first person.
          Same wording on every surface (home, /llms.txt, future /about,
          schema). It's the entity anchor LLMs cite verbatim — do not vary.
          Hairline dividers (top + bottom, narrow centered) frame the cita
          as an editorial pull-quote — pattern used by NYT, The Atlantic. */}
      <div className="mx-auto w-full max-w-[1100px] px-6 md:px-12 mt-16 lg:mt-24">
        <hr className="mx-auto w-32 lg:w-40 border-t-2 border-fd-foreground/20 mb-10 lg:mb-14" />
        <blockquote className="text-center" cite="https://career-ops.org/methodology">
          <p
            className={`${instrumentSerif.className} text-2xl sm:text-3xl md:text-4xl xl:text-5xl leading-tight text-fd-foreground`}
          >
            {/* Antimetábole / chiasmus: companies ↔ candidates roles invert.
                Color reinforces it visually — "candidates" carries brand
                orange (the agent / hero); "companies" desaturates (the
                former dominant frame). The orange visibly migrates from
                end-of-line-1 to start-of-line-2, mirroring the conceptual
                inversion. */}
            &ldquo;<span className="text-fd-foreground/55">Companies</span> use AI to filter{' '}
            <span className="text-brand">candidates</span>.
            <br />
            I just gave{' '}
            <span className="relative inline-block text-brand">
              candidates
              {/* Hand-drawn underline (irregular Bezier) — visual punch on the
                  second occurrence: this is where the chiasmus inverts and
                  candidates become the agents. */}
              <svg
                aria-hidden="true"
                className="absolute left-0 -bottom-2 w-full h-[0.18em] overflow-visible"
                viewBox="0 0 200 8"
                preserveAspectRatio="none"
                fill="none"
              >
                <path
                  d="M 2 5 C 30 2, 70 7, 110 4 S 170 6, 198 3"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </span>{' '}
            AI to choose <span className="text-fd-foreground/55">companies</span>.&rdquo;
          </p>
          <footer className="mt-6 flex items-center justify-center gap-2.5 text-sm text-fd-muted-foreground">
            <Image
              src="/santiago-avatar.png"
              alt="Santiago Fernández de Valderrama"
              width={44}
              height={44}
              className="rounded-full"
            />
            <span>
              <a
                href="/about"
                rel="author"
                className="text-fd-muted-foreground hover:text-fd-foreground hover:underline"
              >
                Santiago Fernández de Valderrama
              </a>
              , 16-year operator and Head of Applied AI
            </span>
          </footer>
        </blockquote>
        <hr className="mx-auto w-32 lg:w-40 border-t-2 border-fd-foreground/20 mt-10 lg:mt-14" />
      </div>

      <div className="grid grid-cols-1 gap-10 mt-16 lg:mt-24 px-6 mx-auto w-full max-w-[1400px] md:px-12 lg:grid-cols-2">
        {/* H2 statement — teaser before the proof. Instrument Serif regular,
            same family as hero/100%-Open-Source/feature cards/CTA. The
            antecedent of the four h3 cards below. */}
        <h2
          className={`${instrumentSerifRegular.className} col-span-full text-center text-3xl tracking-tight leading-tight md:text-4xl xl:text-5xl`}
        >
          Turn any AI coding CLI into a full job search{' '}
          <span className="text-brand">command center</span>.
        </h2>

        {/* Demo container — terminal animation + side-by-side sub-text cards
            ALL composed over the halftone dither bg. Container ampliado para
            acomodar terminal arriba + grid 2-col de cards (mechanism, analogy)
            abajo. Cards mantienen el card style del feature grid (consistency)
            pero text left-aligned para prose readability. */}
        <div className="relative min-h-[520px] lg:min-h-[560px] rounded-2xl col-span-full overflow-hidden flex flex-col items-center justify-center gap-6 lg:gap-8 p-6 md:p-10">
          <Image
            src="/buffalo-dither.png"
            loading="lazy"
            alt=""
            width={1628}
            height={1044}
            className="absolute inset-0 size-full object-cover object-center -z-1"
          />

          {/* Terminal box centered */}
          <div className="w-full max-w-[800px] p-2 bg-fd-card text-fd-card-foreground border rounded-2xl shadow-lg">
            <div className="flex flex-col sm:flex-row gap-2">
              <span className="text-brand text-center sm:content-center font-mono font-bold uppercase border-2 border-brand/50 px-2 py-1 sm:py-0 rounded-xl text-sm self-start sm:self-auto">
                Try it out
              </span>
              <CopyableCommand
                command="git clone https://github.com/santifer/career-ops.git"
                className="flex-1 min-w-0"
              />
            </div>

            <div className="relative bg-fd-secondary rounded-xl mt-2 border shadow-md">
              <div className="flex flex-row items-center gap-2 border-b p-2 text-fd-muted-foreground">
                <TerminalIcon className="size-4" />
                <span className="text-xs font-medium">Terminal</span>
                <div className="ms-auto me-2 size-2 rounded-full bg-red-400" />
              </div>
              <CreateAppAnimation className="p-2 text-fd-secondary-foreground/80" />
            </div>
          </div>

          {/* Mechanism card — single dark card inside the dither container,
              compact dark bg + white text for legibility. */}
          <div className="w-full max-w-[800px] rounded-2xl bg-black/85 backdrop-blur-sm p-5 lg:p-6 text-white text-sm md:text-base leading-relaxed">
            <p>
              Instead of manually tracking applications in a spreadsheet, you get an AI-powered
              pipeline that scans portals, generates tailored PDFs and tracks everything for you.
            </p>
          </div>
        </div>

        {/* Analogy mini-quote — bridges demo above and feature grid below.
            Instrument Serif italic (smaller cousin of the canonical manifesto
            blockquote). "without the cost" carries the hand-drawn underline:
            it's the user-facing benefit, the punchline of the analogy. */}
        <p
          className={`${instrumentSerif.className} col-span-full text-center text-2xl md:text-3xl xl:text-4xl leading-tight text-fd-foreground my-4 lg:my-8`}
        >
          &ldquo;It&apos;s like having a career coach for your job search, but{' '}
          <span className="relative inline-block text-brand">
            without the cost
            <svg
              aria-hidden="true"
              className="absolute left-0 -bottom-2 w-full h-[0.18em] overflow-visible"
              viewBox="0 0 200 8"
              preserveAspectRatio="none"
              fill="none"
            >
              <path
                d="M 2 5 C 30 2, 70 7, 110 4 S 170 6, 198 3"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </span>
          .&rdquo;
        </p>

        {/* Feature grid — 4 cards forming a 2x2 in lg+: technical (AI-Native),
            philosophical (Not spray), practical (45+ portals), human (Community).
            Each card title is h3 (children of the h2 statement above). */}
        <div className="rounded-2xl text-sm p-6 bg-origin-border shadow-lg border bg-fd-card relative flex flex-col overflow-hidden z-2 min-h-[340px]">
          <h3
            className={`${instrumentSerifRegular.className} tracking-tight text-2xl lg:text-3xl mb-6`}
          >
            AI-Native &amp; Agnostic
          </h3>
          <p className="mb-6">
            Works with any coding CLI — Claude Code, Codex, OpenCode, Gemini CLI, Qwen CLI, GitHub
            Copilot. Built on the Open Agent Skill Standard.
          </p>
          <div className="flex flex-row flex-wrap items-center gap-6 md:gap-7">
            {CLIS.map((cli) => (
              <Image
                key={cli.name}
                src={cli.src}
                alt={cli.name}
                title={cli.name}
                width={28}
                height={28}
                className="size-7 brightness-0 dark:invert opacity-55 hover:opacity-100 transition-opacity duration-300"
              />
            ))}
          </div>
          <AgnosticBackground />
        </div>

        <div className="rounded-2xl text-sm p-6 bg-origin-border shadow-lg border bg-fd-card bg-gradient-to-bl from-brand/10 via-transparent to-transparent min-h-[340px]">
          <h3
            className={`${instrumentSerifRegular.className} tracking-tight text-2xl lg:text-3xl mb-6`}
          >
            Not spray-and-pray.
          </h3>
          <p className="mb-6">
            The system refuses to recommend applying to anything scoring below 4.0 out of 5. Every
            evaluation is a hard filter — not a nudge.
          </p>
          <Link
            href="/docs/introduction/what-is-career-ops"
            className={cn(buttonVariants({ variant: 'secondary' }), 'text-sm')}
          >
            Read our mission statement
          </Link>
        </div>

        <div className="rounded-2xl text-sm p-6 bg-origin-border shadow-lg border bg-fd-card bg-gradient-to-tr from-brand/10 via-transparent to-transparent min-h-[340px] flex flex-col">
          <h3
            className={`${instrumentSerifRegular.className} tracking-tight text-2xl lg:text-3xl mb-6`}
          >
            45+ company portals. Zero manual searching.
          </h3>
          <p className="mb-6">
            Pre-configured scrapers check career pages across 45+ companies and job aggregators on
            demand. Run <code className="font-mono text-brand">/career-ops scan</code> and get a
            ranked list back in minutes.
          </p>
          <Link
            href="/docs"
            className={cn(buttonVariants({ variant: 'secondary' }), 'text-sm w-fit')}
          >
            See all portals
          </Link>
        </div>

        {/* Card 4 — community. Closes the 2x2 grid; gradient in the fourth
            corner (top-left → to-br) so all four cards have distinct
            personality without copy-paste. */}
        <div className="rounded-2xl text-sm p-6 bg-origin-border shadow-lg border bg-fd-card bg-gradient-to-br from-brand/10 via-transparent to-transparent min-h-[340px] flex flex-col">
          <h3
            className={`${instrumentSerifRegular.className} tracking-tight text-2xl lg:text-3xl mb-6`}
          >
            Shipped with the community.
          </h3>
          <p className="mb-6">
            career-ops grows through pull requests from people running real job searches. Issues get
            triaged in Discord, fixes ship the same week. You don&apos;t just use the tool — you
            help shape what it becomes.
          </p>
          <Link
            href="/community"
            className={cn(buttonVariants({ variant: 'secondary' }), 'text-sm w-fit')}
          >
            Join 2,500+ builders in Discord
          </Link>
        </div>

        {/* 100% Open-Source — community/identity moment. Frameless + open
            prose to differentiate from the contained feature cards above
            and from the contained CTA panel below. */}
        <div className="col-span-full mt-16 lg:mt-24 py-8 lg:py-10 flex flex-col items-center text-center gap-6">
          {/* Heading + dek pair — editorial pattern (NYT/Atlantic). The
              dek carries quantitative proof of the community embrace
              (live from GitHub API, 1h ISR) without diluting the
              identity statement above. tabular-nums keeps digits stable
              across hover/refresh; soft separator and muted color keep
              the hierarchy clearly subordinate. */}
          <div className="flex flex-col items-center gap-2 lg:gap-3">
            <h2
              className={`${instrumentSerifRegular.className} tracking-tight text-4xl lg:text-5xl text-brand`}
            >
              100% Open-Source.
            </h2>
            <p
              className={`${instrumentSerifRegular.className} text-2xl md:text-3xl tabular-nums tracking-tight text-fd-foreground/60`}
            >
              <span>{formatK(stats.stars)} stars</span>
              <span aria-hidden="true" className="mx-3 text-fd-foreground/25">
                ·
              </span>
              <span>{formatK(stats.forks)} forks</span>
            </p>
          </div>
          <p className="max-w-2xl text-fd-muted-foreground text-base lg:text-lg leading-relaxed">
            Built by{' '}
            <a
              href="/about"
              rel="author"
              className="text-fd-foreground font-medium hover:underline"
            >
              Santiago Fernández de Valderrama
            </a>{' '}
            after evaluating 740 job listings.
            <br />
            The full scoring methodology is{' '}
            <a
              href="/methodology"
              className="text-fd-foreground hover:underline underline-offset-2"
            >
              published
            </a>
            .
            <br />
            Now powered by the community.
          </p>

          <div className="flex flex-row flex-wrap items-center justify-center mt-2">
            {contributors.map((contributor, i) => (
              <a
                key={contributor.login}
                href={contributor.html_url}
                target="_blank"
                rel="noreferrer noopener"
                className="size-10 overflow-hidden rounded-full border-4 border-fd-background bg-fd-background -mr-3 md:size-12"
                style={{ zIndex: contributors.length - i }}
              >
                <Image
                  src={contributor.avatar_url}
                  alt={contributor.login}
                  width={48}
                  height={48}
                  className="size-full object-cover"
                />
              </a>
            ))}
          </div>

          <a
            href="https://github.com/santifer/career-ops/graphs/contributors"
            target="_blank"
            rel="noreferrer noopener"
            className="text-sm text-fd-muted-foreground hover:text-fd-foreground hover:underline"
          >
            Meet our contributors →
          </a>
        </div>

      </div>

      {/* Final CTA — full-bleed brand gradient. No card, no border, no
          rounded corners — the gradient (transparent top → brand/10 bottom)
          extends edge-to-edge and bleeds straight into the footer's
          border-t (the home layout's <main> padding-bottom is overridden
          to 0 in global.css to make the colour land exactly at the
          hairline). The brand-orange button is the single saturated
          focal point; generous vertical padding carries the weight. */}
      <section className="mt-16 lg:mt-24 pt-20 lg:pt-28 pb-16 lg:pb-20 text-center px-6 bg-gradient-to-b from-transparent via-brand/5 to-brand/10">
        <p
          className={`${instrumentSerifRegular.className} text-3xl md:text-4xl xl:text-5xl tracking-tight mb-8 max-w-3xl mx-auto`}
        >
          Ready to filter offers, not get filtered?
        </p>
        <Link href="/docs" className={cn(buttonVariants(), 'text-base px-8 py-3.5 inline-flex items-center gap-2')}>
          Your turn
          <span
            aria-hidden="true"
            className="cli-cursor inline-block h-[1em] w-[0.35em] bg-current align-middle"
          />
        </Link>

        {/* Subordinate alternative for visitors not ready to install today.
            Lives inside the gradient panel so it shares context with the
            primary CTA — single closing moment, not two competing sections.
            Visual weight ~25-30% of the install ask. The helper text under
            the form mirrors the footer form's body verbatim (contractual
            phrasing — kept identical cross-placement). */}
        <div className="mt-16 lg:mt-20 max-w-md mx-auto">
          <p className="text-sm text-fd-muted-foreground mb-4">Or follow what we ship.</p>
          <SubscribeForm compact />
          <p className="mt-3 text-xs text-fd-muted-foreground">
            Release announcements and occasional updates.
            <br />
            Unsubscribe anytime.
          </p>
        </div>
      </section>
    </>
  );
}
