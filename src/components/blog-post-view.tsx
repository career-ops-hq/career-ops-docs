import { getMDXComponents } from '@/components/mdx';
import { instrumentSerifRegular } from '@/lib/fonts';
import { blogPostSchema, faqPageSchema } from '@/lib/schema';
import { blogSource, type BlogPage } from '@/lib/blog-source';
import { createRelativeLink } from 'fumadocs-ui/mdx';

export type BlogFrontmatter = {
  title: string;
  seoTitle?: string;
  description?: string;
  date: string;
  lastModified?: string;
  summary?: string;
  tags: string[];
  faq?: Array<{ q: string; a: string }>;
};

// Shared render for a blog post, used by /blog/[slug] (EN) and
// /es/blog/[slug] (ES). Only the byline labels and the date locale vary.
const LABELS = {
  en: { by: 'By', role: 'creator of career-ops', updated: 'Updated', dateLocale: 'en-US' },
  es: { by: 'Por', role: 'creador de career-ops', updated: 'Actualizado el', dateLocale: 'es' },
} as const;

export function BlogPostView({ page, locale }: { page: BlogPage; locale: 'en' | 'es' }) {
  const data = page.data as unknown as BlogFrontmatter;
  const MDX = page.data.body;
  const t = LABELS[locale];
  const url = `https://career-ops.org${page.url}`;
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(t.dateLocale, { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            blogPostSchema({
              url,
              title: data.title,
              description: data.summary || data.description || '',
              date: data.date,
              lastModified: data.lastModified || data.date,
              tags: data.tags,
              inLanguage: locale,
            }),
          ),
        }}
      />
      {data.faq && data.faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqPageSchema(url, data.faq, locale === 'en' ? undefined : locale)),
          }}
        />
      )}
      <article className="mx-auto w-full max-w-3xl px-6 py-12 md:py-16">
        <header className="mb-12">
          <p className="text-sm text-fd-muted-foreground">
            {t.by}{' '}
            <a
              href="/about"
              className="text-fd-foreground underline underline-offset-2"
            >
              Santiago Fernández de Valderrama Aparicio
            </a>
            , {t.role} ·{' '}
            <time dateTime={data.date}>{formatDate(data.date)}</time>
            {data.lastModified && data.lastModified !== data.date && (
              <>
                {' '}· {t.updated}{' '}
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
