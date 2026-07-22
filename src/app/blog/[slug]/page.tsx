import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogSource } from '@/lib/blog-source';
import { getMDXComponents } from '@/components/mdx';
import { instrumentSerifRegular } from '@/lib/fonts';
import { blogPostSchema, faqPageSchema } from '@/lib/schema';
import { createRelativeLink } from 'fumadocs-ui/mdx';

type BlogFrontmatter = {
  title: string;
  seoTitle?: string;
  description?: string;
  date: string;
  lastModified?: string;
  summary?: string;
  tags: string[];
  faq?: Array<{ q: string; a: string }>;
};

export async function generateStaticParams() {
  // /blog/[slug] is a single-segment route, so we flatten the slugs
  // array Fumadocs returns to a string. Posts must live at
  // content/blog/<slug>.mdx (no nested directories) for this to hold.
  return blogSource.getPages().map((page) => ({ slug: page.slugs[0] }));
}

export async function generateMetadata(
  props: PageProps<'/blog/[slug]'>,
): Promise<Metadata> {
  const params = await props.params;
  // Fumadocs collections use slug arrays; for a flat /blog/[slug] we
  // wrap in an array.
  const slug = Array.isArray(params.slug) ? params.slug : [params.slug];
  const page = blogSource.getPage(slug);
  if (!page) notFound();

  const data = page.data as unknown as BlogFrontmatter;
  return {
    title: `${data.seoTitle ?? data.title} · career-ops blog`,
    description: data.summary || data.description,
    alternates: { canonical: `https://career-ops.org${page.url}` },
    openGraph: {
      type: 'article',
      url: `https://career-ops.org${page.url}`,
      siteName: 'career-ops',
      title: data.title,
      description: data.summary || data.description,
      publishedTime: data.date,
      modifiedTime: data.lastModified || data.date,
    },
    twitter: { card: 'summary_large_image' },
    robots: { index: true, follow: true },
  };
}

export default async function BlogPostPage(props: PageProps<'/blog/[slug]'>) {
  const params = await props.params;
  const slug = Array.isArray(params.slug) ? params.slug : [params.slug];
  const page = blogSource.getPage(slug);
  if (!page) notFound();

  const data = page.data as unknown as BlogFrontmatter;
  const MDX = page.data.body;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            blogPostSchema({
              url: `https://career-ops.org${page.url}`,
              title: data.title,
              description: data.summary || data.description || '',
              date: data.date,
              lastModified: data.lastModified || data.date,
              tags: data.tags,
            }),
          ),
        }}
      />
      {data.faq && data.faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              faqPageSchema(`https://career-ops.org${page.url}`, data.faq),
            ),
          }}
        />
      )}
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
            , Applied AI Operator ·{' '}
            <time dateTime={data.date}>{formatDate(data.date)}</time>
            {data.lastModified && data.lastModified !== data.date && (
              <>
                {' '}· Updated{' '}
                <time dateTime={data.lastModified}>
                  {formatDate(data.lastModified)}
                </time>
              </>
            )}
          </p>
          <h1
            className={`${instrumentSerifRegular.className} mt-4 text-fd-foreground text-3xl md:text-4xl xl:text-5xl tracking-tight leading-tight`}
          >
            {data.title}
          </h1>
          {data.summary && (
            <p className="mt-6 text-fd-muted-foreground text-base lg:text-lg leading-relaxed">
              {data.summary}
            </p>
          )}
        </header>
        <div className="prose prose-neutral dark:prose-invert max-w-none text-fd-foreground/90 leading-relaxed">
          <MDX
            components={getMDXComponents({
              a: createRelativeLink(blogSource, page),
            })}
          />
        </div>
      </article>
    </>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}
