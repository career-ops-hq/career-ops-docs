import type { Metadata } from 'next';
import Link from 'next/link';
import { instrumentSerifRegular } from '@/lib/fonts';
import useCasesData from '@/lib/data/use-cases.json';

export const metadata: Metadata = {
  title: 'Use cases · career-ops',
  description:
    'Every career-ops mode, portal, and CLI runtime documented with concrete invocations, real examples, and version-stable gotchas. Sourced directly from v1.8.0.',
  alternates: { canonical: 'https://career-ops.org/use-cases' },
  openGraph: {
    type: 'website',
    url: 'https://career-ops.org/use-cases',
    siteName: 'career-ops',
    title: 'Use cases · career-ops',
    description:
      'Every career-ops mode, portal, and CLI runtime documented with concrete invocations.',
  },
  robots: { index: true, follow: true },
};

export default function UseCasesIndex() {
  const modes = useCasesData.useCases.filter((u) => u.category === 'mode');
  const portals = useCasesData.useCases.filter((u) => u.category === 'portal');
  const clis = useCasesData.useCases.filter((u) => u.category === 'cli');

  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-12 md:py-16">
      <header className="mb-12">
        <h1
          className={`${instrumentSerifRegular.className} text-fd-foreground text-3xl md:text-4xl xl:text-5xl tracking-tight leading-tight`}
        >
          Every mode, every portal, every CLI.
        </h1>
        <p className="mt-4 text-fd-muted-foreground text-base lg:text-lg leading-relaxed">
          Sourced directly from the v1.8.0 canonical skill manifest. Each page
          has the invocation, a real example, and the gotchas that bite people
          on first use.
        </p>
      </header>

      <Section title="Modes" entries={modes} />
      <Section title="Portals" entries={portals} />
      <Section title="CLIs" entries={clis} />
    </article>
  );
}

function Section({
  title,
  entries,
}: {
  title: string;
  entries: typeof useCasesData.useCases;
}) {
  return (
    <section className="mb-12">
      <h2
        className={`${instrumentSerifRegular.className} text-2xl md:text-3xl tracking-tight text-fd-foreground mb-6`}
      >
        {title} ({entries.length})
      </h2>
      <ul className="space-y-3">
        {entries.map((e) => (
          <li key={e.slug}>
            <Link
              href={`/use-cases/${e.slug}`}
              className="block rounded-lg border border-fd-foreground/10 p-4 hover:border-fd-foreground/30 transition-colors"
            >
              <div className="flex items-baseline gap-3">
                <code className="font-mono text-fd-foreground font-medium">
                  {e.slugName}
                </code>
                <span className="text-xs text-fd-muted-foreground">
                  {e.displayName}
                </span>
              </div>
              <p className="mt-2 text-sm text-fd-foreground/80">{e.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
