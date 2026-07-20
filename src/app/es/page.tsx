import type { Metadata } from 'next';
import { hreflangHome } from '@/lib/i18n-map';
import { HomeContent } from '../(home)/home-content';
import { homeEs } from '../(home)/home-dict';

// Spanish home — SAME trunk as the English home (HomeContent), rendered
// with the Spanish dictionary. One component, one dict per locale: no
// duplicated structure, maintainable (Santiago's directive 2026-07-20).

export const metadata: Metadata = {
  metadataBase: new URL('https://career-ops.org'),
  title: 'career-ops — búsqueda de empleo con IA, open source y local-first',
  description:
    'Sistema open source de búsqueda de empleo con IA. Se ejecuta en tu propia máquina, dentro del CLI de IA que ya usas. Evalúa ofertas, adapta tu CV y hace seguimiento de tus candidaturas. Sin cuenta, sin nube, gratis.',
  alternates: {
    canonical: 'https://career-ops.org/es',
    languages: hreflangHome(),
  },
  openGraph: {
    type: 'website',
    url: 'https://career-ops.org/es',
    siteName: 'career-ops',
    locale: 'es_ES',
    title: 'career-ops — búsqueda de empleo con IA, open source y local-first',
    description:
      'Sistema open source de búsqueda de empleo con IA. Se ejecuta en tu CLI. Tus datos, tu máquina.',
  },
};

export default function HomePageEs() {
  return <HomeContent dict={homeEs} />;
}
