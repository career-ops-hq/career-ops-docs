import type { Metadata } from 'next';
import { homeFaqSchemaIt } from '@/lib/schema';
import { homeLastModified } from '@/lib/home-date';
import { hreflangHome } from '@/lib/i18n-map';
import { HomeContent } from '@/app/_home/home-content';
import { homeIt } from '@/app/_home/home-it';

// Italian home: SAME trunk as the other homes (HomeContent), rendered with the
// Italian dictionary. The signature thesis stays in LITERAL English (no
// ratified Italian rendering), so homeIt has no thesisTranslation and only the
// English blockquote renders, as on the French, German and Portuguese homes.
// The <title> is the category phrase from the search-ops native profile for
// Italian (measured fan-out, 13 Oct 2026).

export const metadata: Metadata = {
  metadataBase: new URL('https://career-ops.org'),
  title: 'career-ops: agente AI open source per la ricerca di lavoro',
  description:
    'Sistema open source per cercare lavoro con l’AI. Gira sul tuo computer, dentro l’assistente di programmazione AI che usi già. Valuta gli annunci, adatta il tuo curriculum e tiene traccia delle tue candidature. Nessun account, licenza MIT.',
  alternates: {
    canonical: 'https://career-ops.org/it',
    languages: hreflangHome(),
  },
  openGraph: {
    type: 'website',
    url: 'https://career-ops.org/it',
    siteName: 'career-ops',
    locale: 'it_IT',
    title: 'career-ops: agente AI open source per la ricerca di lavoro',
    description:
      'Sistema open source per cercare lavoro con l’AI. Gira nella tua CLI, sul tuo computer.',
  },
};

export default function HomePageIt() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchemaIt(homeLastModified('it'))) }}
      />
      <HomeContent dict={homeIt} />
    </>
  );
}
