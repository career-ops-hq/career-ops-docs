import type { Metadata } from 'next';
import { homeFaqSchemaPt } from '@/lib/schema';
import { homeLastModified } from '@/lib/home-date';
import { hreflangHome } from '@/lib/i18n-map';
import { HomeContent } from '@/app/_home/home-content';
import { homePt } from '@/app/_home/home-pt';

// Portuguese (pt-BR) home: SAME trunk as the other homes (HomeContent),
// rendered with the Portuguese dictionary. The signature thesis stays in
// LITERAL English (no ratified Portuguese rendering), so homePt has no
// thesisTranslation and only the English blockquote renders, as on the French
// and German homes. The <title> is the category phrase from the search-ops
// native profile for Portuguese (measured fan-out, 1 Oct 2026).

export const metadata: Metadata = {
  metadataBase: new URL('https://career-ops.org'),
  title: 'career-ops: agente de IA de código aberto para busca de emprego',
  description:
    'Sistema de código aberto para procurar emprego com IA. Roda no seu computador, dentro do assistente de programação com IA que você já usa. Avalia vagas, adapta seu currículo e acompanha suas candidaturas. Sem conta, código aberto (MIT).',
  alternates: {
    canonical: 'https://career-ops.org/pt',
    languages: hreflangHome(),
  },
  openGraph: {
    type: 'website',
    url: 'https://career-ops.org/pt',
    siteName: 'career-ops',
    locale: 'pt_BR',
    title: 'career-ops: agente de IA de código aberto para busca de emprego',
    description:
      'Sistema de código aberto para procurar emprego com IA. Roda na sua CLI, no seu computador.',
  },
};

export default function HomePagePt() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchemaPt(homeLastModified('pt'))) }}
      />
      <HomeContent dict={homePt} />
    </>
  );
}
