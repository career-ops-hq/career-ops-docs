import { DEFAULT_OG_IMAGE } from '@/lib/shared';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogSource, blogTwin } from '@/lib/blog-source';
import { BlogPostView, type BlogFrontmatter } from '@/components/blog-post-view';

// Only posts with a Spanish twin exist here; any other /es/blog/* path 404s.
export const dynamicParams = false;

export async function generateStaticParams() {
  return blogSource.getPages('es').map((page) => ({ slug: page.slugs[0] }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;
  const page = blogSource.getPage([slug], 'es');
  if (!page) notFound();
  const en = blogTwin(page, 'en');
  if (!en) notFound();

  const data = page.data as unknown as BlogFrontmatter;
  const url = `https://career-ops.org${page.url}`;
  const enUrl = `https://career-ops.org${en.url}`;
  return {
    title: `${data.seoTitle ?? data.title} · blog de career-ops`,
    description: data.summary || data.description,
    alternates: {
      canonical: url,
      languages: { en: enUrl, es: url, 'x-default': enUrl },
    },
    openGraph: {
      images: [DEFAULT_OG_IMAGE],
      type: 'article',
      url,
      siteName: 'career-ops',
      locale: 'es_ES',
      title: data.title,
      description: data.summary || data.description,
      publishedTime: data.date,
      modifiedTime: data.lastModified || data.date,
    },
    twitter: { images: [DEFAULT_OG_IMAGE.url], card: 'summary_large_image' },
    robots: { index: true, follow: true },
  };
}

export default async function SpanishBlogPostPage(props: Props) {
  const { slug } = await props.params;
  const page = blogSource.getPage([slug], 'es');
  if (!page) notFound();
  return <BlogPostView page={page} locale="es" />;
}
