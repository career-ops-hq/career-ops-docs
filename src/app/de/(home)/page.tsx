import type { Metadata } from 'next';
import { homeFaqSchemaDe } from '@/lib/schema';
import { homeLastModified } from '@/lib/home-date';
import { hreflangHome } from '@/lib/i18n-map';
import { HomeContent } from '../../(home)/home-content';
import { homeDe } from '../../(home)/home-dict';

// German home — SAME trunk as the other homes (HomeContent), rendered with the
// German dictionary. The signature thesis stays in LITERAL English (no ratified
// German rendering), so homeDe has no thesisTranslation and only the English
// blockquote renders, as on the French home.

export const metadata: Metadata = {
  metadataBase: new URL('https://career-ops.org'),
  title: 'career-ops: Open-Source-KI-Agent für die Jobsuche',
  description:
    'Open-Source-System für die Jobsuche mit KI. Es läuft auf deinem eigenen Rechner, in dem KI-Coding-Assistenten, den du schon nutzt. Es bewertet Stellen, passt deinen Lebenslauf an und verfolgt deine Bewerbungen. Ohne Konto, ohne Cloud, Open Source.',
  alternates: {
    canonical: 'https://career-ops.org/de',
    languages: hreflangHome(),
  },
  openGraph: {
    type: 'website',
    url: 'https://career-ops.org/de',
    siteName: 'career-ops',
    locale: 'de_DE',
    title: 'career-ops: Open-Source-KI-Agent für die Jobsuche',
    description:
      'Open-Source-System für die Jobsuche mit KI. Es läuft in deiner CLI. Deine Daten, dein Rechner.',
  },
};

export default function HomePageDe() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchemaDe(homeLastModified('de'))) }}
      />
      <HomeContent dict={homeDe} />
    </>
  );
}
