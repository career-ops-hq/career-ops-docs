import type { Metadata } from 'next';
import { homeFaqSchema } from '@/lib/schema';
import { hreflangHome } from '@/lib/i18n-map';
import { HomeContent } from './home-content';
import { homeEn } from './home-dict';

export const metadata: Metadata = {
  metadataBase: new URL('https://career-ops.org'),
  // SEO <title> — category-first, brand at the end (search-ops-measured,
  // venture-ops GO). The H1/hero stay brand-first (identity); the title is a
  // SERP door, not identity. og/twitter titles keep the brand-first form.
  title: 'Open-source AI job search agent, local-first | career-ops',
  description:
    'Open source AI-powered job search system. Runs in your CLI on your machine. CLI-agnostic, MIT-licensed, local-first. Evaluate jobs, generate tailored CVs, track applications.',
  alternates: {
    canonical: 'https://career-ops.org',
    languages: hreflangHome(),
  },
  openGraph: {
    type: 'website',
    url: 'https://career-ops.org',
    siteName: 'career-ops',
    title: 'career-ops — open-source AI job search command center',
    description:
      'Open source AI-powered job search system. Runs in your CLI. CLI-agnostic, MIT, local-first.',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@santifer',
    creator: '@santifer',
    title: 'career-ops — open-source AI job search command center',
    description:
      'Open source AI-powered job search system. Runs in your CLI. CLI-agnostic, MIT, local-first.',
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema()) }}
      />
      <HomeContent dict={homeEn} />
    </>
  );
}
