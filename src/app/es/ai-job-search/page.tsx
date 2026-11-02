import { OG_IMAGE_BY_LOCALE } from '@/lib/shared';
import type { Metadata } from 'next';
import { aiJobSearchGuide } from '@/lib/blog-source';
import { BlogPostView, type BlogFrontmatter } from '@/components/blog-post-view';

// Spanish twin of the category guide. Its text is content/blog/ai-job-search.es.mdx.
const en = aiJobSearchGuide('en');
const es = aiJobSearchGuide('es');
const data = es.data as unknown as BlogFrontmatter;
const url = `https://career-ops.org${es.url}`;
const enUrl = `https://career-ops.org${en.url}`;

export const metadata: Metadata = {
  title: `${data.title} · career-ops`,
  description: data.description,
  alternates: {
    canonical: url,
    languages: { en: enUrl, es: url, 'x-default': enUrl },
  },
  openGraph: {
    images: [OG_IMAGE_BY_LOCALE.es],
    type: 'article',
    url,
    siteName: 'career-ops',
    locale: 'es_ES',
    title: data.title,
    description: data.description,
    publishedTime: data.date,
    modifiedTime: data.lastModified || data.date,
  },
  twitter: { images: [OG_IMAGE_BY_LOCALE.es.url], card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export default function SpanishAiJobSearchPage() {
  return <BlogPostView page={es} locale="es" />;
}
