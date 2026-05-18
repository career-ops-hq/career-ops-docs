import type { Metadata } from 'next';
import Link from 'next/link';
import { blogSource } from '@/lib/blog-source';
import { instrumentSerifRegular } from '@/lib/fonts';

export const metadata: Metadata = {
  title: 'Blog · career-ops',
  description:
    'Long-form writing on AI-powered job search, Claude Code skill design, the open-source operator playbook, and what the data from 740+ listings actually says.',
  alternates: { canonical: 'https://career-ops.org/blog' },
  openGraph: {
    type: 'website',
    url: 'https://career-ops.org/blog',
    siteName: 'career-ops',
    title: 'Blog · career-ops',
    description:
      'Long-form writing on AI-powered job search, Claude Code skill design, and the open-source operator playbook.',
  },
  robots: { index: true, follow: true },
};

export default function BlogIndexPage() {
  const posts = blogSource
    .getPages()
    .slice()
    .sort((a, b) => {
      const da = (a.data as { date?: string }).date ?? '';
      const db = (b.data as { date?: string }).date ?? '';
      return db.localeCompare(da);
    });

  return (
    <article className="mx-auto w-full max-w-2xl px-6 py-12 md:py-16">
      <header className="mb-12">
        <h1
          className={`${instrumentSerifRegular.className} text-fd-foreground text-3xl md:text-4xl xl:text-5xl tracking-tight leading-tight`}
        >
          Notes from the operator side.
        </h1>
        <p className="mt-4 text-fd-muted-foreground text-base lg:text-lg leading-relaxed">
          Long-form writing on AI-powered job search, Claude Code skill design,
          and what the data from 740+ listings actually says. Less marketing,
          more methodology.
        </p>
      </header>

      <div className="space-y-6">
        {posts.length === 0 && (
          <p className="text-fd-muted-foreground">
            First post drops soon. Subscribe in the GitHub repo to get notified.
          </p>
        )}
        {posts.map((p) => {
          const data = p.data as {
            title: string;
            description?: string;
            date?: string;
            summary?: string;
          };
          return (
            <Link
              key={p.url}
              href={p.url}
              className="block rounded-lg border border-fd-foreground/10 p-5 hover:border-fd-foreground/30 transition-colors"
            >
              {data.date && (
                <time
                  dateTime={data.date}
                  className="text-xs text-fd-muted-foreground"
                >
                  {formatDate(data.date)}
                </time>
              )}
              <p
                className={`${instrumentSerifRegular.className} text-xl text-fd-foreground tracking-tight mt-1`}
              >
                {data.title}
              </p>
              {(data.summary || data.description) && (
                <p className="mt-2 text-sm text-fd-foreground/80">
                  {data.summary || data.description}
                </p>
              )}
            </Link>
          );
        })}
      </div>
    </article>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}
