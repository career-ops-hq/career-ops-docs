import type { Metadata } from 'next';
import { homeFaqSchemaFr } from '@/lib/schema';
import { hreflangHome } from '@/lib/i18n-map';
import { HomeContent } from '../../(home)/home-content';
import { homeFr } from '../../(home)/home-dict';

// French home — SAME trunk as the English/Spanish homes (HomeContent), rendered
// with the French dictionary. The signature thesis stays in LITERAL English
// (no official French translation until venture-ops ratifies one), so homeFr
// has no thesisTranslation and only the English blockquote renders.

export const metadata: Metadata = {
  metadataBase: new URL('https://career-ops.org'),
  title: 'career-ops — recherche d’emploi par IA, open source et local-first',
  description:
    'Système open source de recherche d’emploi par IA. Il tourne sur votre propre machine, dans l’assistant de codage IA que vous utilisez déjà. Il évalue les offres, adapte votre CV et suit vos candidatures. Sans compte, sans cloud, gratuit.',
  alternates: {
    canonical: 'https://career-ops.org/fr',
    languages: hreflangHome(),
  },
  openGraph: {
    type: 'website',
    url: 'https://career-ops.org/fr',
    siteName: 'career-ops',
    locale: 'fr_FR',
    title: 'career-ops — recherche d’emploi par IA, open source et local-first',
    description:
      'Système open source de recherche d’emploi par IA. Il tourne dans votre CLI. Vos données, votre machine.',
  },
};

export default function HomePageFr() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchemaFr()) }}
      />
      <HomeContent dict={homeFr} />
    </>
  );
}
