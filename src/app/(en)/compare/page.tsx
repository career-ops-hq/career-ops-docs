import { DEFAULT_OG_IMAGE } from '@/lib/shared';
import type { Metadata } from 'next';
import { instrumentSerifRegular } from '@/lib/fonts';
import comparisonsData from '@/lib/data/comparisons.json';

export const metadata: Metadata = {
  title: 'Compare AI job search tools · career-ops',
  description:
    'career-ops side by side with Teal, Jobscan, Simplify, LoopCV and more: price, where your CV goes, and who presses Submit. Free for candidates.',
  alternates: { canonical: 'https://career-ops.org/compare' },
  openGraph: {
    images: [DEFAULT_OG_IMAGE],
    type: 'website',
    url: 'https://career-ops.org/compare',
    siteName: 'career-ops',
    title: 'Compare AI job search tools · career-ops',
    description:
      'career-ops side by side with Teal, Jobscan, Simplify, LoopCV and more: price, where your CV goes, and who presses Submit. Free for candidates.',
  },
  robots: { index: true, follow: true },
};

export default function CompareIndexPage() {
  return (
    <article className="mx-auto w-full max-w-2xl px-6 py-12 md:py-16">
      <header className="mb-12">
        <h1
          className={`${instrumentSerifRegular.className} text-fd-foreground text-3xl md:text-4xl xl:text-5xl tracking-tight leading-tight`}
        >
          How career-ops stacks up against the rest.
        </h1>
        <p className="mt-4 text-fd-muted-foreground text-base lg:text-lg leading-relaxed">
          Open source local vs SaaS cloud. MIT vs proprietary. Free vs $50–200 a
          month. The matrix is honest, the verdicts are blunt, and neither
          product wins every row. Not sure what to compare? Start with{' '}
          <a href="/ai-job-search" className="text-brand-text hover:underline underline-offset-2">
            how to choose an AI job search agent
          </a>
          .
        </p>
      </header>

      <div className="space-y-6">
        {comparisonsData.comparisons.map((c) => (
          <a
            key={c.slug}
            href={`/compare/${c.slug}`}
            className="block rounded-lg border border-fd-foreground/10 p-5 hover:border-fd-foreground/30 transition-colors"
          >
            <p
              className={`${instrumentSerifRegular.className} text-xl text-fd-foreground tracking-tight`}
            >
              career-ops vs {c.competitor.name}
            </p>
            <p className="mt-1 text-sm text-fd-muted-foreground">
              {c.competitor.tagline}
            </p>
            <p className="mt-3 text-sm text-fd-foreground/80">{c.intro}</p>
          </a>
        ))}
      </div>

      <p className="mt-12 text-sm text-fd-muted-foreground text-center">
        More comparisons coming soon. Want to suggest one?{' '}
        <a
          href="https://github.com/career-ops-hq/career-ops/discussions"
          className="text-fd-foreground underline underline-offset-2"
          rel="noopener"
        >
          Open a discussion
        </a>
        .
      </p>
    </article>
  );
}
