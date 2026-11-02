import type { Metadata } from 'next';
import { homeFaqSchema } from '@/lib/schema';
import { homeLastModified } from '@/lib/home-date';
import { hreflangHome } from '@/lib/i18n-map';
import { HomeContent } from '@/app/_home/home-content';
import { homeEn } from '@/app/_home/home-en';

export const metadata: Metadata = {
  metadataBase: new URL('https://career-ops.org'),
  // SEO <title> — category-first, brand at the end (search-ops-measured,
  // venture-ops GO). The H1/hero stay brand-first (identity); the title is a
  // SERP door, not identity. og/twitter titles carry the hero line (29-sep):
  // LinkedIn shows the card of organic posts as a thumbnail whose text
  // cannot be read, so the headline has to travel in the title too.
  title: 'Open-source AI job search agent on GitHub · career-ops',
  description:
    'Score every job against your CV before you apply, get a tailored resume for each role and track applications. Open source on GitHub, free for candidates.',
  alternates: {
    canonical: 'https://career-ops.org',
    languages: hreflangHome(),
  },
  openGraph: {
    type: 'website',
    url: 'https://career-ops.org',
    siteName: 'career-ops',
    title: 'More applications. More silence. Stop guessing. Start choosing. | career-ops',
    description:
      'Open-source AI job search agent. Runs in your CLI. CLI-agnostic, MIT, local-first.',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@santifer',
    creator: '@santifer',
    title: 'More applications. More silence. Stop guessing. Start choosing. | career-ops',
    description:
      'Open-source AI job search agent. Runs in your CLI. CLI-agnostic, MIT, local-first.',
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema(homeLastModified('en'))) }}
      />
      <HomeContent dict={homeEn} />
    </>
  );
}
