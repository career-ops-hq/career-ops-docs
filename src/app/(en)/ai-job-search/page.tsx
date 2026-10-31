import { DEFAULT_OG_IMAGE } from '@/lib/shared';
import type { Metadata } from 'next';
import { aiJobSearchGuide } from '@/lib/blog-source';
import { BlogPostView, type BlogFrontmatter } from '@/components/blog-post-view';

// The category guide (F4, search-ops). Its text is content/blog/ai-job-search.mdx.
const en = aiJobSearchGuide('en');
const es = aiJobSearchGuide('es');
const data = en.data as unknown as BlogFrontmatter;
const url = `https://career-ops.org${en.url}`;

export const metadata: Metadata = {
  title: `${data.title} · career-ops`,
  description: data.description,
  alternates: {
    canonical: url,
    languages: { en: url, es: `https://career-ops.org${es.url}`, 'x-default': url },
  },
  openGraph: {
    images: [DEFAULT_OG_IMAGE],
    type: 'article',
    url,
    siteName: 'career-ops',
    title: data.title,
    description: data.description,
    publishedTime: data.date,
    modifiedTime: data.lastModified || data.date,
  },
  twitter: { images: [DEFAULT_OG_IMAGE.url], card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export default function AiJobSearchPage() {
  return <BlogPostView page={en} locale="en" />;
}
