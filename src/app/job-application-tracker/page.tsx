import type { Metadata } from 'next';
import IntentLanding from '@/components/IntentLanding';
import landingsData from '@/lib/data/intent-landings.json';

const SLUG = 'job-application-tracker';
const data = landingsData.landings.find((l) => l.slug === SLUG)!;

export const metadata: Metadata = {
  title: `${data.h1} · career-ops`,
  description: data.tagline,
  alternates: { canonical: `https://career-ops.org/${SLUG}` },
  openGraph: {
    type: 'article',
    url: `https://career-ops.org/${SLUG}`,
    siteName: 'career-ops',
    title: `${data.h1} · career-ops`,
    description: data.tagline,
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <IntentLanding data={data} />;
}
