import type { Metadata } from 'next';
import { homeFaqSchemaTr } from '@/lib/schema';
import { homeLastModified } from '@/lib/home-date';
import { hreflangHome } from '@/lib/i18n-map';
import { HomeContent } from '@/app/_home/home-content';
import { homeTr } from '@/app/_home/home-tr';

// Turkish home: SAME trunk as the other homes (HomeContent), rendered with the
// Turkish dictionary. The signature thesis stays in LITERAL English (no ratified
// Turkish rendering), so homeTr has no thesisTranslation and only the English
// blockquote renders, as on the other translated homes. The <title> is the
// category phrase from the search-ops native profile for Turkish (30 Oct 2026).

export const metadata: Metadata = {
  metadataBase: new URL('https://career-ops.org'),
  title: 'career-ops: açık kaynaklı yapay zeka iş arama ajanı',
  description:
    'Yapay zeka ile iş aramak için açık kaynaklı sistem. Makinende, zaten kullandığın yapay zeka kodlama asistanının içinde çalışır. İlanları değerlendirir, CV’ni uyarlar ve başvurularını takip eder. Hesap yok, MIT lisanslı.',
  alternates: {
    canonical: 'https://career-ops.org/tr',
    languages: hreflangHome(),
  },
  openGraph: {
    type: 'website',
    url: 'https://career-ops.org/tr',
    siteName: 'career-ops',
    locale: 'tr_TR',
    title: 'career-ops: açık kaynaklı yapay zeka iş arama ajanı',
    description:
      'Yapay zeka ile iş aramak için açık kaynaklı sistem. CLI’ında, kendi makinende çalışır.',
  },
};

export default function HomePageTr() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchemaTr(homeLastModified('tr'))) }}
      />
      <HomeContent dict={homeTr} />
    </>
  );
}
