import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { instrumentSerifRegular } from '@/lib/fonts';
import { comparisonSchema } from '@/lib/schema';
import comparisonsData from '@/lib/data/comparisons.json';

type ComparisonEntry = (typeof comparisonsData)['comparisons'][number];

function getComparison(slug: string): ComparisonEntry | undefined {
  return comparisonsData.comparisons.find((c) => c.slug === slug);
}

export function generateStaticParams() {
  return comparisonsData.comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = getComparison(slug);
  if (!data) return { title: 'Comparison not found' };
  const title = `career-ops vs ${data.competitor.name} · honest comparison`;
  const description = data.intro;
  const imageUrl = data.heroImage
    ? `https://career-ops.org${data.heroImage}`
    : undefined;
  return {
    title,
    description,
    alternates: { canonical: `https://career-ops.org/compare/${slug}` },
    openGraph: {
      type: 'article',
      url: `https://career-ops.org/compare/${slug}`,
      siteName: 'career-ops',
      title,
      description,
      ...(imageUrl && {
        images: [{ url: imageUrl, width: 1200, height: 630, alt: `career-ops vs ${data.competitor.name}` }],
      }),
    },
    twitter: imageUrl
      ? { card: 'summary_large_image', images: [imageUrl] }
      : undefined,
    robots: { index: true, follow: true },
  };
}

export default async function ComparisonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getComparison(slug);
  if (!data) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(comparisonSchema(data)) }}
      />
      <article className="mx-auto w-full max-w-3xl px-6 py-12 md:py-16">
        <header className="mb-12">
          <p className="text-sm text-fd-muted-foreground">
            By{' '}
            <a
              href="/about"
              className="text-fd-foreground underline underline-offset-2"
            >
              Santiago Fernández de Valderrama Aparicio
            </a>
            , Applied AI Operator · Last updated{' '}
            <time dateTime={data.lastModified}>{formatDate(data.lastModified)}</time>
          </p>
          <h1
            className={`${instrumentSerifRegular.className} mt-4 text-fd-foreground text-3xl md:text-4xl xl:text-5xl tracking-tight`}
          >
            career-ops vs {data.competitor.name}
          </h1>
          {/* Direct answer in the first ~60 words under the H1 — a
              self-contained, extractable verdict (search-ops doctrine §2:
              AI engines cite passages that answer the query without
              needing surrounding context). The narrative intro follows. */}
          {'directAnswer' in data && (
            <p className="mt-6 text-fd-foreground text-base lg:text-lg leading-relaxed font-medium">
              {(data as { directAnswer?: string }).directAnswer}
            </p>
          )}
          <p className="mt-4 text-fd-muted-foreground text-base lg:text-lg leading-relaxed">
            {data.intro}
          </p>
        </header>

        {data.heroImage && (
          <figure className="mb-12 -mx-2 md:-mx-6">
            <Image
              src={data.heroImage}
              alt={`career-ops vs ${data.competitor.name}`}
              width={1200}
              height={630}
              className="w-full h-auto rounded-lg border border-fd-foreground/10"
              priority
            />
          </figure>
        )}

        <div className="space-y-12 text-fd-foreground/90 leading-relaxed">
          <section>
            <h2
              className={`${instrumentSerifRegular.className} text-2xl md:text-3xl tracking-tight text-fd-foreground`}
            >
              The honest summary
            </h2>
            <p className="mt-4 text-lg text-fd-foreground">
              {data.verdict.headline}
            </p>
            {data.verdict.body.map((para, i) => (
              <p key={i} className="mt-4">
                {para}
              </p>
            ))}
          </section>

          {/* Per-page unique data (optional field): concrete divergent
              numbers, deliberately NOT another feature matrix — added to
              break template uniformity where GSC signaled quality
              rejection (crawled-not-indexed). */}
          {'byTheNumbers' in data && (
            <section>
              <h2
                className={`${instrumentSerifRegular.className} text-2xl md:text-3xl tracking-tight text-fd-foreground`}
              >
                By the numbers
              </h2>
              <dl className="mt-6 space-y-5">
                {(data as unknown as { byTheNumbers: Array<{ metric: string; careerOps: string; competitor: string }> }).byTheNumbers.map((row, i) => (
                  <div key={i} className="rounded-lg border border-fd-foreground/10 p-5">
                    <dt className="font-medium text-fd-foreground">{row.metric}</dt>
                    <dd className="mt-2 text-sm text-fd-foreground/85">
                      <span className="font-medium">career-ops:</span> {row.careerOps}
                    </dd>
                    <dd className="mt-1 text-sm text-fd-muted-foreground">
                      <span className="font-medium">{data.competitor.name}:</span> {row.competitor}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          <section>
            <h2
              className={`${instrumentSerifRegular.className} text-2xl md:text-3xl tracking-tight text-fd-foreground`}
            >
              Feature matrix
            </h2>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-fd-foreground/20">
                    <th className="py-3 text-left font-medium pr-4">Feature</th>
                    <th className="py-3 text-left font-medium pr-4">career-ops</th>
                    <th className="py-3 text-left font-medium">{data.competitor.name}</th>
                  </tr>
                </thead>
                <tbody>
                  {data.features.map((f, i) => (
                    <tr key={i} className="border-b border-fd-foreground/10 align-top">
                      <td className="py-3 pr-4 font-medium">{f.name}</td>
                      <td className="py-3 pr-4">{f.careerOps}</td>
                      <td className="py-3">{f.competitor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2
              className={`${instrumentSerifRegular.className} text-2xl md:text-3xl tracking-tight text-fd-foreground`}
            >
              Pricing &amp; license at a glance
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-fd-foreground/10 p-5">
                <p className="text-fd-muted-foreground text-sm">career-ops</p>
                <p className="mt-2 font-medium">$0 (MIT, open source)</p>
                <p className="mt-2 text-sm text-fd-muted-foreground">
                  Recurring cost: only your AI CLI subscription (Claude Pro $20/mo typical).
                  Your data never leaves your machine.
                </p>
              </div>
              <div className="rounded-lg border border-fd-foreground/10 p-5">
                <p className="text-fd-muted-foreground text-sm">{data.competitor.name}</p>
                <p className="mt-2 font-medium">{data.competitor.pricing}</p>
                <p className="mt-2 text-sm text-fd-muted-foreground">
                  {data.competitor.license}. {data.competitor.dataModel}
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2
              className={`${instrumentSerifRegular.className} text-2xl md:text-3xl tracking-tight text-fd-foreground`}
            >
              Frequently asked
            </h2>
            <dl className="mt-6 space-y-6">
              {data.faq.map((item, i) => (
                <div key={i}>
                  <dt className="font-medium text-fd-foreground">{item.q}</dt>
                  <dd className="mt-2 text-fd-foreground/85">{item.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        <hr className="my-12 w-32 mx-auto border-t-2 border-fd-foreground/20 lg:w-40" />

        <p className="text-center text-fd-muted-foreground">
          See all comparisons at{' '}
          <a
            href="/compare"
            className="text-fd-foreground underline underline-offset-2"
          >
            /compare
          </a>
          . Read about the project at{' '}
          <a
            href="/about"
            className="text-fd-foreground underline underline-offset-2"
          >
            /about
          </a>
          . The numbers behind the approach:{' '}
          <a
            href="/blog/job-search-data-from-740-listings"
            className="text-fd-foreground underline underline-offset-2"
          >
            740 listings, analyzed
          </a>
          .
        </p>
      </article>
    </>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}
