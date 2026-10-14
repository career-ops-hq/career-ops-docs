import { DEFAULT_OG_IMAGE } from '@/lib/shared';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogCluster, blogSource, blogTwin } from '@/lib/blog-source';
import type { BlogLocale } from '@/lib/blog-twins';
import { BlogPostView, type BlogFrontmatter } from '@/components/blog-post-view';

// The translated twin of an English blog post, at /<loc>/blog/<slug>. Each
// locale's route file binds these to its locale; only posts with a twin in
// that locale exist there, any other /<loc>/blog/* path 404s.
const SUFFIX: Record<BlogLocale, string> = {
  es: 'blog de career-ops',
  pt: 'blog do career-ops',
  it: 'blog di career-ops',
};
const OG_LOCALE: Record<BlogLocale, string> = { es: 'es_ES', pt: 'pt_BR', it: 'it_IT' };

type Props = { params: Promise<{ slug: string }> };

export function twinPost(locale: BlogLocale) {
  async function generateStaticParams() {
    return blogSource.getPages(locale).map((page) => ({ slug: page.slugs[0] }));
  }

  async function generateMetadata(props: Props): Promise<Metadata> {
    const { slug } = await props.params;
    const page = blogSource.getPage([slug], locale);
    if (!page) notFound();
    const en = blogTwin(page, 'en');
    if (!en) notFound();

    const data = page.data as unknown as BlogFrontmatter;
    const url = `https://career-ops.org${page.url}`;
    return {
      title: `${data.seoTitle ?? data.title} · ${SUFFIX[locale]}`,
      description: data.summary || data.description,
      alternates: { canonical: url, languages: blogCluster(en) },
      openGraph: {
        images: [DEFAULT_OG_IMAGE],
        type: 'article',
        url,
        siteName: 'career-ops',
        locale: OG_LOCALE[locale],
        title: data.title,
        description: data.summary || data.description,
        publishedTime: data.date,
        modifiedTime: data.lastModified || data.date,
      },
      twitter: { images: [DEFAULT_OG_IMAGE.url], card: 'summary_large_image' },
      robots: { index: true, follow: true },
    };
  }

  async function Page(props: Props) {
    const { slug } = await props.params;
    const page = blogSource.getPage([slug], locale);
    if (!page) notFound();
    return <BlogPostView page={page} locale={locale} />;
  }

  return { generateStaticParams, generateMetadata, Page };
}
