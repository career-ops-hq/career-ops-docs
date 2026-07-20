import Link from 'next/link';
import Image from 'next/image';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/cn';
import { TerminalIcon, Trophy } from 'lucide-react';
import { Hero, CreateAppAnimation, AgnosticBackground } from './page.client';
import { instrumentSerif, instrumentSerifRegular } from '@/lib/fonts';
import { SubscribeForm } from '@/components/subscribe-form';
import { CopyableCommand } from '@/components/copyable-command';
import { CompareRotator } from '@/components/compare-rotator';
import { getProjectStats } from '@/lib/stats';
import type { HomeDict } from './home-dict';

// One home trunk, rendered for every locale. Structure, widgets and
// layout are identical across languages; only the strings — supplied by
// `dict` — change. This is the maintainable i18n shape for the TSX home:
// a single component, one dictionary per locale (home-dict.tsx). The
// thesis blockquote is the one exception: canonical, literal English on
// every locale, so it stays hardcoded here.

// "43,204" → "43K+". Floor-rounding keeps the number honestly
// conservative (live count is always at-or-above what we show).
function formatK(n: number): string {
  if (n < 1000) return n.toLocaleString('en-US');
  return `${Math.floor(n / 1000)}K+`;
}

type Contributor = { login: string; avatar_url: string; html_url: string };

async function getContributors(): Promise<Contributor[]> {
  try {
    const res = await fetch(
      'https://api.github.com/repos/santifer/career-ops/contributors?per_page=12',
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

const PRESS = {
  biEN: 'https://www.businessinsider.com/how-i-built-tool-filter-job-listings-landed-head-ai-2026-4',
  wiredGR:
    'https://wired.com.gr/article/to-ai-ergaleio-pou-fernei-epanastasi-ston-tropo-pou-psachnoume-douleia/',
};

const CLIS = [
  { name: 'Claude Code', src: '/clis/claude.svg' },
  { name: 'Codex', src: '/clis/openai.svg' },
  { name: 'Gemini CLI', src: '/clis/googlegemini.svg' },
  { name: 'GitHub Copilot', src: '/clis/githubcopilot.svg' },
  { name: 'OpenCode', src: '/clis/opencode.svg' },
  { name: 'Qwen CLI', src: '/clis/qwen.svg' },
];

const buttonVariants = cva(
  'inline-flex justify-center px-5 py-3 rounded-full font-medium tracking-tight transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-brand text-brand-foreground hover:bg-brand-200',
        secondary:
          'border bg-fd-secondary text-fd-secondary-foreground hover:bg-fd-accent',
      },
    },
    defaultVariants: { variant: 'primary' },
  },
);

export async function HomeContent({ dict }: { dict: HomeDict }) {
  const [contributors, stats] = await Promise.all([
    getContributors(),
    getProjectStats(),
  ]);

  return (
    <>
      {/* Hero */}
      <div className="relative flex min-h-[600px] h-[70vh] max-h-[900px] border rounded-2xl overflow-hidden mx-auto w-full max-w-[1400px] bg-origin-border mt-4">
        <Hero />
        <Image
          src="/hero_image.avif"
          alt="career-ops terminal interface showing the job pipeline tracker"
          width={1628}
          height={1044}
          sizes="(min-width: 1400px) 1050px, (min-width: 1024px) 75vw, 100vw"
          className="absolute top-[58%] left-[25%] max-w-[1400px] rounded-xl block [animation:fade-in-delayed_700ms_ease_400ms_both] [mask-image:linear-gradient(to_right,transparent_0%,black_8%)]"
          priority
        />
        <div className="flex flex-col z-2 px-4 size-full md:p-12 max-md:items-center max-md:text-center">
          <p
            aria-hidden="true"
            className={`${instrumentSerifRegular.className} text-5xl mt-12 mb-6 leading-[1.05] xl:text-7xl xl:mb-8`}
          >
            {dict.heroHook}
          </p>
          <h1 className="mb-8 max-w-xl text-base font-normal text-fd-muted-foreground md:text-lg">
            {dict.heroH1}
          </h1>
          <div className="flex flex-row items-center gap-4 flex-wrap w-fit">
            <Link
              href="/docs"
              className={cn(buttonVariants(), 'inline-flex items-center gap-2 max-sm:text-sm')}
            >
              {dict.runItNow}
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
              {dict.viewSource}
            </a>
          </div>
        </div>
      </div>

      {/* Press coverage */}
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12 mt-12 lg:mt-16">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-fd-muted-foreground mb-6">
          {dict.featuredIn}
        </p>
        <div className="flex flex-row flex-wrap items-center justify-center gap-10 md:gap-16">
          <a
            href={PRESS.wiredGR}
            target="_blank"
            rel="noopener noreferrer nofollow"
            aria-label="Featured in WIRED Greece"
            className="opacity-55 hover:opacity-100 transition-opacity duration-300"
          >
            <Image src="/press/wired.svg" alt="WIRED" width={110} height={22} className="h-[22px] w-auto brightness-0 dark:invert" />
          </a>
          <a
            href={PRESS.biEN}
            target="_blank"
            rel="noopener noreferrer nofollow"
            aria-label="Featured in Business Insider"
            className="opacity-55 hover:opacity-100 transition-opacity duration-300"
          >
            <Image src="/press/business-insider.svg" alt="Business Insider" width={84} height={26} className="h-[26px] w-auto brightness-0 dark:invert" />
          </a>
        </div>
      </div>

      {/* Manifesto blockquote — canonical signature thesis, LITERAL English on
          top of every locale (entity anchor LLMs cite verbatim; never altered).
          On localized surfaces the official translation sits BELOW it (EN-above /
          ES-below), fed from dict.thesisTranslation — absent on EN, so nothing
          renders there. */}
      <div className="mx-auto w-full max-w-[1100px] px-6 md:px-12 mt-16 lg:mt-24">
        <hr className="mx-auto w-32 lg:w-40 border-t-2 border-fd-foreground/20 mb-10 lg:mb-14" />
        <blockquote className="text-center" cite="https://career-ops.org/manifesto">
          <p className={`${instrumentSerif.className} text-2xl sm:text-3xl md:text-4xl xl:text-5xl leading-tight text-fd-foreground`} lang="en">
            &ldquo;<span className="text-fd-foreground/55">Companies</span> use AI to filter{' '}
            <span className="text-brand">candidates</span>.
            <br />
            I just gave{' '}
            <span className="relative inline-block text-brand">
              candidates
              <svg aria-hidden="true" className="absolute left-0 -bottom-2 w-full h-[0.18em] overflow-visible" viewBox="0 0 200 8" preserveAspectRatio="none" fill="none">
                <path d="M 2 5 C 30 2, 70 7, 110 4 S 170 6, 198 3" stroke="currentColor" strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
              </svg>
            </span>{' '}
            AI to choose <span className="text-fd-foreground/55">companies</span>.&rdquo;
          </p>
          {dict.thesisTranslation && (
            <p
              className="mx-auto mt-5 max-w-2xl text-balance text-base sm:text-lg text-fd-muted-foreground"
              lang="es"
            >
              {dict.thesisTranslation}
            </p>
          )}
          <footer className="mt-6 flex items-center justify-center gap-2.5 text-sm text-fd-muted-foreground">
            <Image src="/santiago-avatar.png" alt="Santiago Fernández de Valderrama Aparicio" width={44} height={44} className="rounded-full" />
            <span>
              <a href="/about" rel="author" className="text-fd-muted-foreground hover:text-fd-foreground hover:underline">
                Santiago Fernández de Valderrama Aparicio
              </a>
              {dict.authorTagline}
            </span>
          </footer>
          <p className="mt-5 text-center text-sm text-fd-muted-foreground">
            {dict.nowSignedManifesto}{' '}
            <Link href="/manifesto" className="text-fd-foreground underline underline-offset-4 decoration-fd-foreground/40 hover:decoration-current">
              {dict.readIt}
            </Link>
          </p>
        </blockquote>
      </div>

      {/* What is career-ops? — self-contained GEO answer block. */}
      <div className="w-full bg-[#efeeed] dark:bg-stone-900 dot-bg mt-16 lg:mt-24 py-16 lg:py-24">
        <section className="mx-auto w-full max-w-[920px] px-6 md:px-12">
          <h2 className={`${instrumentSerif.className} text-center text-3xl md:text-4xl xl:text-5xl mb-10 lg:mb-12`}>
            {dict.whatIsHeading}
          </h2>
          <div className="rounded-2xl bg-fd-card border bg-origin-border shadow-lg bg-gradient-to-br from-brand/10 via-transparent to-transparent overflow-hidden">
            <div className="flex items-center gap-2 px-5 md:px-7 py-3 border-b border-fd-foreground/10">
              <span className="block size-2.5 rounded-full bg-fd-foreground/15" aria-hidden="true" />
              <span className="block size-2.5 rounded-full bg-fd-foreground/15" aria-hidden="true" />
              <span className="block size-2.5 rounded-full bg-fd-foreground/15" aria-hidden="true" />
              <span className="ml-3 font-mono text-xs text-fd-muted-foreground tracking-wide">
                <span className="text-fd-foreground/40">&gt;_</span> /career-ops --describe
              </span>
            </div>
            <div className="px-6 md:px-10 py-8 md:py-10">
              <p className="text-base md:text-lg leading-[1.7] text-fd-foreground/90">
                {dict.whatIsBody}
              </p>
              <p className="font-mono text-xs text-fd-muted-foreground mt-8 tracking-wide">
                <span className="text-fd-foreground/40">{'//'}</span>{' '}
                <span className="mr-1">{formatK(stats.stars)}</span>{dict.statsComment}
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 gap-10 mt-16 lg:mt-24 px-6 mx-auto w-full max-w-[1400px] md:px-12 lg:grid-cols-2">
        <h2 className={`${instrumentSerifRegular.className} col-span-full text-center text-3xl tracking-tight leading-tight md:text-4xl xl:text-5xl`}>
          {dict.commandCenter}
        </h2>

        {/* Demo container */}
        <div className="relative min-h-[520px] lg:min-h-[560px] rounded-2xl col-span-full overflow-hidden flex flex-col items-center justify-center gap-6 lg:gap-8 p-6 md:p-10">
          <Image src="/buffalo-dither.png" loading="lazy" alt="" width={1628} height={1044} quality={60} sizes="(min-width: 1400px) 1376px, (min-width: 768px) 92vw, 100vw" className="absolute inset-0 size-full object-cover object-center -z-1" />
          <div className="w-full max-w-[800px] p-2 bg-fd-card text-fd-card-foreground border rounded-2xl shadow-lg">
            <div className="flex flex-col sm:flex-row gap-2">
              <span className="text-brand-text text-center sm:content-center font-mono font-bold uppercase border-2 border-brand/50 px-2 py-1 sm:py-0 rounded-xl text-sm self-start sm:self-auto">
                {dict.tryItOut}
              </span>
              <CopyableCommand command="npx @santifer/career-ops init" className="flex-1 min-w-0" />
            </div>
            <p className="mt-2 px-1 text-xs text-fd-muted-foreground">
              {dict.runsCommand}
            </p>
            <div className="relative bg-fd-secondary rounded-xl mt-2 border shadow-md">
              <div className="flex flex-row items-center gap-2 border-b p-2 text-fd-muted-foreground">
                <TerminalIcon className="size-4" />
                <span className="text-xs font-medium">Terminal</span>
                <div className="ms-auto me-2 size-2 rounded-full bg-red-400" />
              </div>
              <CreateAppAnimation className="p-2 text-fd-secondary-foreground/80" />
            </div>
          </div>
          <div className="w-full max-w-[800px] rounded-2xl bg-black/85 backdrop-blur-sm p-5 lg:p-6 text-white text-sm md:text-base leading-relaxed">
            <p>{dict.mechanism}</p>
          </div>
        </div>

        {/* Analogy mini-quote */}
        <blockquote className="col-span-full text-center my-4 lg:my-8">
          <p className={`${instrumentSerif.className} text-2xl md:text-3xl xl:text-4xl leading-tight text-fd-foreground`}>
            {dict.analogy}
          </p>
          <footer className="mt-3 text-sm text-fd-muted-foreground">
            —{' '}
            <a href="/about" rel="author" className="hover:text-fd-foreground hover:underline">
              Santiago Fernández de Valderrama Aparicio
            </a>
          </footer>
        </blockquote>

        {/* Feature grid — 4 cards */}
        <div className="rounded-2xl text-sm p-6 bg-origin-border shadow-lg border bg-fd-card relative flex flex-col overflow-hidden z-2 min-h-[300px]">
          <h3 className={`${instrumentSerifRegular.className} tracking-tight text-2xl lg:text-3xl mb-6`}>{dict.featAgnosticTitle}</h3>
          <p className="mb-6">{dict.featAgnosticBody}</p>
          <div className="flex flex-row flex-wrap items-center gap-6 md:gap-7 mt-auto">
            {CLIS.map((cli) => (
              <Image key={cli.name} src={cli.src} alt={cli.name} title={cli.name} width={28} height={28} className="size-7 brightness-0 dark:invert opacity-55 hover:opacity-100 transition-opacity duration-300" />
            ))}
          </div>
          <AgnosticBackground />
        </div>

        <div className="rounded-2xl text-sm p-6 bg-origin-border shadow-lg border bg-fd-card bg-gradient-to-bl from-brand/10 via-transparent to-transparent min-h-[300px] flex flex-col">
          <h3 className={`${instrumentSerifRegular.className} tracking-tight text-2xl lg:text-3xl mb-6`}>{dict.featApplyTitle}</h3>
          <p className="mb-4">{dict.featApplyBody1}</p>
          <p className="mb-6">{dict.featApplyBody2}</p>
          <Link href="/docs/reference/modes/apply" className={cn(buttonVariants({ variant: 'secondary' }), 'text-sm w-fit mt-auto')}>{dict.featApplyCta}</Link>
        </div>

        <div className="rounded-2xl text-sm p-6 bg-origin-border shadow-lg border bg-fd-card bg-gradient-to-tr from-brand/10 via-transparent to-transparent min-h-[300px] flex flex-col">
          <h3 className={`${instrumentSerifRegular.className} tracking-tight text-2xl lg:text-3xl mb-6`}>{dict.featScanTitle}</h3>
          <p className="mb-6">{dict.featScanBody}</p>
          <Link href="/docs" className={cn(buttonVariants({ variant: 'secondary' }), 'text-sm w-fit mt-auto')}>{dict.featScanCta}</Link>
        </div>

        <div className="rounded-2xl text-sm p-6 bg-origin-border shadow-lg border bg-fd-card bg-gradient-to-br from-brand/10 via-transparent to-transparent min-h-[300px] flex flex-col">
          <h3 className={`${instrumentSerifRegular.className} tracking-tight text-2xl lg:text-3xl mb-6`}>{dict.featCommunityTitle}</h3>
          <p className="mb-6">{dict.featCommunityBody}</p>
          <Link href="/community" className={cn(buttonVariants({ variant: 'secondary' }), 'text-sm w-fit mt-auto')}>
            {dict.joinDiscord((Math.floor(stats.discordMembers / 100) * 100).toLocaleString('en-US'))}
          </Link>
        </div>

        {/* 100% Open-Source */}
        <div className="col-span-full mt-16 lg:mt-24 py-8 lg:py-10 flex flex-col items-center text-center gap-6">
          <div className="flex flex-col items-center gap-2 lg:gap-3">
            <h2 className={`${instrumentSerifRegular.className} tracking-tight text-4xl lg:text-5xl text-brand`}>
              <a href="https://github.com/santifer/career-ops" target="_blank" rel="me noopener noreferrer" className="hover:text-brand-200 transition-colors">
                {dict.openSourceTitle}
              </a>
            </h2>
            <p className={`${instrumentSerifRegular.className} text-2xl md:text-3xl tabular-nums tracking-tight text-fd-foreground/60 flex flex-wrap items-center justify-center gap-x-3`}>
              <span>{formatK(stats.stars)} {dict.starsWord}</span>
              <span aria-hidden="true" className="text-fd-foreground/25">·</span>
              <span>{formatK(stats.forks)} {dict.forksWord}</span>
              <span aria-hidden="true" className="text-fd-foreground/25">·</span>
              <a href="https://trendshift.io/repositories/25195" target="_blank" rel="noopener noreferrer nofollow" className="inline-flex items-center gap-1.5 hover:text-fd-foreground transition-colors">
                <Trophy aria-hidden="true" className="size-5 md:size-6 text-brand" />
                {dict.repoOfDay}
              </a>
            </p>
          </div>
          <p className="max-w-2xl text-fd-muted-foreground text-base lg:text-lg leading-relaxed">
            {dict.builtByDek}
          </p>
          <div className="flex flex-row flex-wrap items-center justify-center mt-2">
            {contributors.map((contributor, i) => (
              <a key={contributor.login} href={contributor.html_url} target="_blank" rel="noreferrer noopener" className="size-10 overflow-hidden rounded-full border-4 border-fd-background bg-fd-background -mr-3 md:size-12" style={{ zIndex: contributors.length - i }}>
                <Image src={contributor.avatar_url} alt={contributor.login} width={48} height={48} className="size-full object-cover" />
              </a>
            ))}
          </div>
          <a href="https://github.com/santifer/career-ops/graphs/contributors" target="_blank" rel="noreferrer noopener" className="text-sm text-fd-muted-foreground hover:text-fd-foreground hover:underline">
            {dict.meetContributors}
          </a>
          <a href="https://warpchart.dev/r/santifer/career-ops?utm_source=career-ops.org" target="_blank" rel="noopener noreferrer" className="mt-4 w-full max-w-[800px]">
            <img src="https://warpchart.dev/api/chart?repo=santifer/career-ops&theme=light&w=800&h=420" alt="career-ops star history on Warpchart — 0 to 50K+ GitHub stars drawn from real timestamps" width={800} height={420} loading="lazy" className="w-full h-auto dark:hidden" />
            <img src="https://warpchart.dev/api/chart?repo=santifer/career-ops&theme=dark&w=800&h=420" alt="career-ops star history on Warpchart — 0 to 50K+ GitHub stars drawn from real timestamps" width={800} height={420} loading="lazy" className="w-full h-auto hidden dark:block" />
          </a>
        </div>
      </div>

      {/* Compare rotator */}
      <CompareRotator />

      {/* Frequently asked */}
      <section className="mx-auto w-full max-w-[1100px] px-6 md:px-12 mt-16 lg:mt-24">
        <h2 className={`${instrumentSerifRegular.className} text-center tracking-tight text-3xl md:text-4xl lg:text-5xl mb-10 lg:mb-14`}>
          {dict.faqHeading}
        </h2>
        <dl className="space-y-8 lg:space-y-10">
          {dict.faq.map((item, i) => (
            <div key={i}>
              <dt className="text-fd-foreground font-medium text-lg lg:text-xl mb-2">{item.q}</dt>
              <dd className="text-fd-foreground/80 leading-relaxed">{item.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Final CTA */}
      <section className="mt-16 lg:mt-24 pt-20 lg:pt-28 pb-16 lg:pb-20 text-center px-6 bg-gradient-to-b from-transparent via-brand/5 to-brand/10">
        <p className={`${instrumentSerifRegular.className} text-3xl md:text-4xl xl:text-5xl tracking-tight mb-8 max-w-3xl mx-auto`}>
          {dict.finalCta}
        </p>
        <Link href="/docs" className={cn(buttonVariants(), 'text-base px-8 py-3.5 inline-flex items-center gap-2')}>
          {dict.yourTurn}
          <span aria-hidden="true" className="cli-cursor inline-block h-[1em] w-[0.35em] bg-current align-middle" />
        </Link>
        <div className="mt-16 lg:mt-20 max-w-md mx-auto">
          <p className="text-sm text-fd-muted-foreground mb-4">{dict.followWhatWeShip}</p>
          <SubscribeForm compact />
          <p className="mt-3 text-xs text-fd-muted-foreground">{dict.releaseBlurb}</p>
        </div>
      </section>
    </>
  );
}
