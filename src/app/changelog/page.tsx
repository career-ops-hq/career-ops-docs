import type { Metadata } from 'next';
import { instrumentSerifRegular } from '@/lib/fonts';
import { getChangelog } from '@/lib/releases';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Changelog · career-ops',
  description:
    'Every career-ops release, in plain language: new modes, providers, fixes, and improvements. Sourced live from GitHub Releases — the project ships several times a week.',
  alternates: { canonical: 'https://career-ops.org/changelog' },
  openGraph: {
    type: 'website',
    url: 'https://career-ops.org/changelog',
    siteName: 'career-ops',
    title: 'Changelog · career-ops',
    description:
      'Every career-ops release, in plain language. Sourced live from GitHub Releases.',
  },
  robots: { index: true, follow: true },
};

function changelogSchema(latestDate?: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://career-ops.org/changelog#webpage',
        url: 'https://career-ops.org/changelog',
        name: 'career-ops changelog',
        description:
          'Every career-ops release in plain language, sourced live from GitHub Releases.',
        isPartOf: { '@id': 'https://career-ops.org/#website' },
        about: { '@id': 'https://career-ops.org/#software' },
        ...(latestDate ? { dateModified: latestDate } : {}),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://career-ops.org/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Changelog',
            item: 'https://career-ops.org/changelog',
          },
        ],
      },
    ],
  };
}

function formatDate(iso: string): string {
  if (!iso) return '';
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export default async function ChangelogPage() {
  const releases = await getChangelog();
  const latestDate = releases[0]?.date;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(changelogSchema(latestDate)),
        }}
      />
      <article className="mx-auto w-full max-w-3xl px-6 py-12 md:py-16">
        <header className="mb-12">
          <h1
            className={`${instrumentSerifRegular.className} text-4xl md:text-5xl tracking-tight text-fd-foreground`}
          >
            Changelog
          </h1>
          <p className="mt-4 text-fd-muted-foreground">
            Every release, in plain language. career-ops ships several times a
            week; this page reads straight from{' '}
            <a
              href="https://github.com/santifer/career-ops/releases"
              rel="noreferrer noopener"
              className="text-fd-foreground underline underline-offset-2"
            >
              GitHub Releases
            </a>{' '}
            and updates itself. Your data is never touched by an update — see
            the{' '}
            <a
              href="/docs"
              className="text-fd-foreground underline underline-offset-2"
            >
              Data Contract
            </a>
            .
          </p>
        </header>

        {releases.length === 0 ? (
          <p className="text-fd-muted-foreground">
            The release feed is momentarily unavailable. Browse the full
            history on{' '}
            <a
              href="https://github.com/santifer/career-ops/releases"
              rel="noreferrer noopener"
              className="text-fd-foreground underline underline-offset-2"
            >
              GitHub Releases
            </a>
            .
          </p>
        ) : (
          <div className="space-y-14">
            {releases.map((release, i) => (
              <section key={release.version} id={release.version}>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h2
                    className={`${instrumentSerifRegular.className} text-2xl md:text-3xl tracking-tight text-fd-foreground`}
                  >
                    <a
                      href={release.url}
                      rel="noreferrer noopener"
                      className="hover:underline underline-offset-4"
                    >
                      {release.version}
                    </a>
                  </h2>
                  {i === 0 && (
                    <span className="rounded-full border border-brand/30 px-2.5 py-0.5 text-xs font-medium text-brand-text">
                      Latest
                    </span>
                  )}
                  <time
                    dateTime={release.date}
                    className="text-sm text-fd-muted-foreground"
                  >
                    {formatDate(release.date)}
                  </time>
                </div>

                <div className="mt-5 space-y-6">
                  {release.sections.map((section) => (
                    <div key={section.label}>
                      <h3 className="text-xs font-medium uppercase tracking-widest text-fd-muted-foreground">
                        {section.label}
                      </h3>
                      <ul className="mt-2 space-y-1.5">
                        {section.items.map((item, j) => (
                          <li
                            key={j}
                            className="text-fd-foreground/90 leading-relaxed"
                          >
                            {item.scope && (
                              <code className="mr-2 rounded bg-fd-muted px-1.5 py-0.5 text-xs text-fd-muted-foreground">
                                {item.scope}
                              </code>
                            )}
                            {item.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {i < releases.length - 1 && (
                  <hr className="mt-14 w-32 border-t-2 border-fd-foreground/20 lg:w-40" />
                )}
              </section>
            ))}
          </div>
        )}
      </article>
    </>
  );
}
