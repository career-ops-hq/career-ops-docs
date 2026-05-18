import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { instrumentSerifRegular } from '@/lib/fonts';
import { useCaseSchema } from '@/lib/schema';
import useCasesData from '@/lib/data/use-cases.json';

type UseCaseEntry = {
  slug: string;
  category: 'mode' | 'portal' | 'cli';
  slugName: string;
  displayName: string;
  h1: string;
  summary: string;
  whatItDoes: string;
  whenToUse: string;
  example: string;
  gotchas: string;
  related: string[];
};

function get(slug: string): UseCaseEntry | undefined {
  return useCasesData.useCases.find((u) => u.slug === slug) as
    | UseCaseEntry
    | undefined;
}

export function generateStaticParams() {
  return useCasesData.useCases.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = get(slug);
  if (!data) return { title: 'Use case not found' };
  return {
    title: `${data.h1} · career-ops`,
    description: data.summary,
    alternates: { canonical: `https://career-ops.org/use-cases/${slug}` },
    openGraph: {
      type: 'article',
      url: `https://career-ops.org/use-cases/${slug}`,
      siteName: 'career-ops',
      title: `${data.h1} · career-ops`,
      description: data.summary,
    },
    robots: { index: true, follow: true },
  };
}

export default async function UseCasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = get(slug);
  if (!data) notFound();

  // Hub-and-spoke linking: related entries from data.related[]
  const relatedEntries = data.related
    .map((s) => get(s))
    .filter((e): e is UseCaseEntry => Boolean(e));

  const categoryLabel =
    data.category === 'mode'
      ? 'Mode'
      : data.category === 'portal'
        ? 'Portal'
        : 'CLI';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(useCaseSchema(data)) }}
      />
      <article className="mx-auto w-full max-w-3xl px-6 py-12 md:py-16">
        <header className="mb-12">
          <p className="text-sm text-fd-muted-foreground">
            <Link
              href="/use-cases"
              className="text-fd-foreground underline underline-offset-2"
            >
              Use cases
            </Link>
            {' / '}
            {categoryLabel}
            {' / '}
            <code className="font-mono">{data.slugName}</code>
          </p>
          <h1
            className={`${instrumentSerifRegular.className} mt-4 text-fd-foreground text-3xl md:text-4xl xl:text-5xl tracking-tight leading-tight`}
          >
            {data.h1}
          </h1>
          <p className="mt-6 text-fd-muted-foreground text-base lg:text-lg leading-relaxed">
            {data.summary}
          </p>
        </header>

        <div className="space-y-10 text-fd-foreground/90 leading-relaxed">
          <section>
            <h2
              className={`${instrumentSerifRegular.className} text-2xl md:text-3xl tracking-tight text-fd-foreground`}
            >
              What it does
            </h2>
            <p className="mt-3">{data.whatItDoes}</p>
          </section>

          <section>
            <h2
              className={`${instrumentSerifRegular.className} text-2xl md:text-3xl tracking-tight text-fd-foreground`}
            >
              When to use it
            </h2>
            <p className="mt-3">{data.whenToUse}</p>
          </section>

          <section>
            <h2
              className={`${instrumentSerifRegular.className} text-2xl md:text-3xl tracking-tight text-fd-foreground`}
            >
              Example
            </h2>
            <pre className="mt-3 overflow-x-auto rounded-lg bg-fd-foreground/5 p-4 text-sm font-mono text-fd-foreground/90 whitespace-pre-wrap">
              {data.example}
            </pre>
          </section>

          <section>
            <h2
              className={`${instrumentSerifRegular.className} text-2xl md:text-3xl tracking-tight text-fd-foreground`}
            >
              Gotchas
            </h2>
            <p className="mt-3">{data.gotchas}</p>
          </section>

          {relatedEntries.length > 0 && (
            <section>
              <h2
                className={`${instrumentSerifRegular.className} text-2xl md:text-3xl tracking-tight text-fd-foreground`}
              >
                Related
              </h2>
              <ul className="mt-4 space-y-2">
                {relatedEntries.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/use-cases/${r.slug}`}
                      className="text-fd-foreground hover:underline underline-offset-2"
                    >
                      <code className="font-mono mr-2">{r.slugName}</code>
                      <span className="text-fd-foreground/80">— {r.summary}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </article>
    </>
  );
}
