import { DEFAULT_OG_IMAGE } from '@/lib/shared';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { instrumentSerif, instrumentSerifRegular } from '@/lib/fonts';
import { pressSchema } from '@/lib/schema';
import { CAREEROPS_DEFINITION } from '@/lib/shared';
import { getProjectStats } from '@/lib/stats';
import {
  BOILERPLATE,
  DEMO,
  FOUNDER_PARAGRAPH,
  OFFICIAL_LINKS,
  PRESS,
  PRESS_LAST_UPDATED,
  PRESS_LAST_UPDATED_LABEL,
  PRESS_SUMMARY,
  QUOTES,
  QUOTES_SOURCE,
  QUOTE_ATTRIBUTION,
  THESIS,
  TIMELINE,
  WRITING_RULES,
  getHiredCount,
  pressFacts,
  wordCountLabel,
} from '@/lib/press-data';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Press & Brand Kit · career-ops',
  description:
    'Official press kit for career-ops: boilerplate copy, key facts, logos, and media coverage. An open-source, MIT-licensed AI job search agent by Santiago Fernández de Valderrama Aparicio.',
  alternates: { canonical: 'https://career-ops.org/press' },
  openGraph: {
    images: [DEFAULT_OG_IMAGE],
    type: 'website',
    url: 'https://career-ops.org/press',
    siteName: 'career-ops',
    title: 'Press & Brand Kit · career-ops',
    description:
      'Boilerplate copy, key facts, logos, and media coverage for career-ops, an open-source AI job search agent.',
  },
  robots: { index: true, follow: true },
};

// Downloadable brand assets. The "co" mark ships as a static SVG
// (public/bimi-logo.svg) and a 180px PNG (the /apple-icon route). The
// social banner is the 1200×630 OG image. All same-origin so the
// download attribute works without CORS.
const ASSETS = [
  {
    label: 'Logo: "co" mark (SVG)',
    href: '/bimi-logo.svg',
    note: 'Vector, brand orange on rounded square. Scales to any size.',
    download: 'career-ops-logo.svg',
  },
  {
    label: 'Logo: "co" mark (PNG, 180px)',
    href: '/apple-icon',
    note: 'Raster fallback for surfaces that do not accept SVG.',
    download: 'career-ops-logo.png',
  },
  {
    label: 'Author image (illustration, PNG, 384px)',
    href: '/santiago-avatar.png',
    note: 'The illustrated avatar used on /about and GitHub.',
    download: 'santiago-fernandez-de-valderrama-aparicio.png',
  },
  {
    label: 'Social banner (JPG, 1200×630)',
    href: '/og-banner.jpg',
    note: 'Open Graph card. Use for article headers and link previews.',
    download: 'career-ops-banner.jpg',
  },
  {
    label: 'Manifesto: nine rights card (PNG, 1080×1080)',
    href: '/manifesto-rights-card.png',
    note: 'The nine candidate rights, quote-card format. Reuse freely with attribution.',
    download: 'careerops-manifesto-rights.png',
  },
  {
    label: 'Manifesto: link card (PNG, 1200×630)',
    href: '/og-manifesto.png',
    note: 'The manifesto share card. Reuse freely with attribution.',
    download: 'careerops-manifesto-card.png',
  },
];

export default async function PressPage() {
  const [stats, hired] = await Promise.all([getProjectStats(), getHiredCount()]);
  const facts = pressFacts(stats, hired);

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
            alt="career-ops logo, the &ldquo;co&rdquo; mark"
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
            {PRESS_SUMMARY}
          </p>
          <p className="mt-3 max-w-md text-sm text-fd-muted-foreground">
            Boilerplate, facts, logos and coverage below, free to reuse. Questions and fact-checks:{' '}
            <a
              href="mailto:hi@career-ops.org?subject=Press%3A%20career-ops"
              className="text-fd-foreground underline underline-offset-2 decoration-fd-muted-foreground/40 hover:decoration-fd-foreground"
            >
              hi@career-ops.org
            </a>
            .
          </p>
        </header>

        <section className="mt-12">
          <h2 className="text-fd-foreground text-xl font-medium tracking-tight">
            Writing about career-ops
          </h2>
          <dl className="mt-4 divide-y divide-fd-foreground/10 border-y border-fd-foreground/10">
            {WRITING_RULES.map((r) => (
              <div key={r.label} className="flex flex-col gap-0.5 py-3 sm:flex-row sm:gap-4">
                <dt className="shrink-0 text-sm text-fd-muted-foreground sm:w-44">{r.label}</dt>
                <dd className="flex-1 text-fd-foreground/90">{r.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-12">
          <h2 className="text-fd-foreground text-xl font-medium tracking-tight">Official links</h2>
          <ul className="mt-4 space-y-1.5">
            {OFFICIAL_LINKS.map((l) => (
              <li key={l.href} className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
                <span className="shrink-0 text-sm text-fd-muted-foreground sm:w-44">{l.label}</span>
                <a
                  href={l.href}
                  className="break-all text-fd-foreground underline underline-offset-2 decoration-fd-muted-foreground/40 hover:decoration-fd-foreground"
                >
                  {l.href.replace('https://', '')}
                </a>
              </li>
            ))}
          </ul>
        </section>

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
                Short ({wordCountLabel(BOILERPLATE.medium)})
              </p>
              <p className="rounded-lg border border-fd-foreground/15 bg-fd-muted/30 px-4 py-3 text-fd-foreground/90 leading-relaxed select-all">
                {BOILERPLATE.medium}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-fd-muted-foreground/70 mb-1.5">
                Standard ({wordCountLabel(BOILERPLATE.long)})
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
                <dd className="flex-1 text-fd-foreground/90">
                  {f.href ? (
                    <a
                      href={f.href}
                      className="underline underline-offset-2 decoration-fd-muted-foreground/40 hover:decoration-fd-foreground"
                    >
                      {f.value}
                    </a>
                  ) : (
                    f.value
                  )}
                </dd>
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
              &ldquo;{THESIS}&rdquo;
            </p>
            <footer className="mt-2 text-sm text-fd-muted-foreground">
              Santiago Fernández de Valderrama Aparicio
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
              href="https://github.com/career-ops-hq/career-ops/releases/tag/manifesto-v1.0"
              target="_blank"
              rel="noopener"
              className="text-fd-foreground underline underline-offset-2 decoration-fd-muted-foreground/40 hover:decoration-fd-foreground"
            >
              manifesto-v1.0
            </a>
            .
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-fd-foreground text-xl font-medium tracking-tight">Quotes</h2>
          <ul className="mt-4 space-y-4">
            {QUOTES.map((q) => (
              <li key={q} className="border-l-2 border-fd-foreground/20 pl-5 text-fd-foreground/90 leading-relaxed select-all">
                &ldquo;{q}&rdquo;
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-fd-muted-foreground">
            {QUOTE_ATTRIBUTION}.{' '}
            <a
              href={QUOTES_SOURCE}
              className="underline underline-offset-2 decoration-fd-muted-foreground/40 hover:decoration-fd-foreground"
            >
              Source
            </a>
            .
          </p>
        </section>

        {/* Creator — one-paragraph version; full bio lives at /about. */}
        <section className="mt-12">
          <h2 className="text-fd-foreground text-xl font-medium tracking-tight">Creator</h2>
          <p className="mt-3 text-fd-foreground/90 leading-relaxed">
            {FOUNDER_PARAGRAPH} Full bio and entity links at{' '}
            <Link
              href="/about"
              className="text-fd-foreground underline underline-offset-2 decoration-fd-muted-foreground/40 hover:decoration-fd-foreground"
            >
              /about
            </Link>
            .
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-fd-foreground text-xl font-medium tracking-tight">Timeline</h2>
          <ul className="mt-4 space-y-2">
            {TIMELINE.map((t) => (
              <li key={t.date} className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
                <span className="shrink-0 text-fd-muted-foreground text-sm tabular-nums sm:w-32">
                  <time dateTime={t.date}>{t.label}</time>
                </span>
                <span className="flex-1 text-fd-foreground/90">{t.event}</span>
              </li>
            ))}
          </ul>
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
          <p className="mt-5 text-sm text-fd-foreground/85">
            <span className="text-fd-muted-foreground">Product demo </span>
            <a
              href={DEMO.href}
              className="text-fd-foreground underline underline-offset-2 decoration-fd-muted-foreground/40 hover:decoration-fd-foreground"
            >
              demo.gif on GitHub
            </a>{' '}
            <span className="text-fd-muted-foreground">(&ldquo;{DEMO.caption}&rdquo;)</span>
          </p>
          <div className="mt-3 grid grid-cols-1 gap-x-8 gap-y-2 text-sm text-fd-foreground/85 sm:grid-cols-2">
            <p>
              <span className="text-fd-muted-foreground">Brand color </span>
              <code className="text-fd-foreground">#DD7627</code>{' '}
              <span className="text-fd-muted-foreground">(hsl 26 73% 51%)</span>
            </p>
            <p>
              <span className="text-fd-muted-foreground">Wordmark font </span>
              <span className="text-fd-foreground">Instrument Serif</span>
            </p>
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
                  <span className="text-fd-muted-foreground"> · </span>
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
            href="mailto:hi@career-ops.org?subject=Press%3A%20career-ops"
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
          Last updated <time dateTime={PRESS_LAST_UPDATED}>{PRESS_LAST_UPDATED_LABEL}</time>
        </p>
      </article>
    </>
  );
}
