import { DEFAULT_OG_IMAGE } from '@/lib/shared';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogSource, blogTwin } from '@/lib/blog-source';
import { BlogPostView, type BlogFrontmatter } from '@/components/blog-post-view';

export async function generateStaticParams() {
  // /blog/[slug] is a single-segment route, so we flatten the slugs
  // array Fumadocs returns to a string. Posts must live at
  // content/blog/<slug>.mdx (no nested directories) for this to hold.
  return blogSource.getPages('en').map((page) => ({ slug: page.slugs[0] }));
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
  const url = `https://career-ops.org${page.url}`;
  // hreflang only when a Spanish twin exists; every other post keeps its
  // metadata exactly as before.
  const es = blogTwin(page, 'es');
  return {
    title: `${data.seoTitle ?? data.title} · career-ops blog`,
    description: data.summary || data.description,
    alternates: {
      canonical: url,
      ...(es
        ? { languages: { en: url, es: `https://career-ops.org${es.url}`, 'x-default': url } }
        : {}),
    },
    openGraph: {
      images: [DEFAULT_OG_IMAGE],
      type: 'article',
      url,
      siteName: 'career-ops',
      title: data.title,
      description: data.summary || data.description,
      publishedTime: data.date,
      modifiedTime: data.lastModified || data.date,
    },
    twitter: {
      images: [DEFAULT_OG_IMAGE.url], card: 'summary_large_image' },
    robots: { index: true, follow: true },
  };
}

export default async function BlogPostPage(props: PageProps<'/blog/[slug]'>) {
  const params = await props.params;
  const slug = Array.isArray(params.slug) ? params.slug : [params.slug];
  const page = blogSource.getPage(slug);
  if (!page) notFound();
  return <BlogPostView page={page} locale="en" />;
}
