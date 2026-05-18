import type { Metadata } from 'next';
import { instrumentSerifRegular } from '@/lib/fonts';
import comparisonsData from '@/lib/data/comparisons.json';

export const metadata: Metadata = {
  title: 'Compare · career-ops',
  description:
    'Honest comparisons between career-ops and other AI job search tools. Open source local vs SaaS cloud, MIT vs proprietary, free vs $50-200/mo. No fake ratings, no pasivo-agresivo framing.',
  alternates: { canonical: 'https://career-ops.org/compare' },
  openGraph: {
    type: 'website',
    url: 'https://career-ops.org/compare',
    siteName: 'career-ops',
    title: 'Compare · career-ops',
    description:
      'Honest comparisons between career-ops and other AI job search tools.',
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
          product wins every row.
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
          href="https://github.com/santifer/career-ops/discussions"
          className="text-fd-foreground underline underline-offset-2"
          rel="noreferrer noopener"
        >
          Open a discussion
        </a>
        .
      </p>
    </article>
  );
}
