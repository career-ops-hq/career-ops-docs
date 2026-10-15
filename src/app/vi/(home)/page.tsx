import type { Metadata } from 'next';
import { homeFaqSchemaVi } from '@/lib/schema';
import { homeLastModified } from '@/lib/home-date';
import { hreflangHome } from '@/lib/i18n-map';
import { HomeContent } from '@/app/_home/home-content';
import { homeVi } from '@/app/_home/home-vi';

// Vietnamese home: SAME trunk as the other homes (HomeContent), rendered with the
// Vietnamese dictionary. The signature thesis stays in LITERAL English (no
// ratified Vietnamese rendering), so homeVi has no thesisTranslation and only the
// English blockquote renders, as on the French, German, Portuguese and Italian homes.
// The <title> is the category phrase from the search-ops native profile for
// Vietnamese (measured fan-out, 15 Oct 2026).

export const metadata: Metadata = {
  metadataBase: new URL('https://career-ops.org'),
  title: 'career-ops: tác tử AI mã nguồn mở để tìm việc',
  description:
    'Hệ thống mã nguồn mở để tìm việc với AI. Chạy trên máy của bạn, ngay trong trợ lý lập trình AI bạn đang dùng. Đánh giá tin tuyển dụng, điều chỉnh CV và theo dõi các đơn ứng tuyển của bạn. Không cần tài khoản, giấy phép MIT.',
  alternates: {
    canonical: 'https://career-ops.org/vi',
    languages: hreflangHome(),
  },
  openGraph: {
    type: 'website',
    url: 'https://career-ops.org/vi',
    siteName: 'career-ops',
    locale: 'vi_VN',
    title: 'career-ops: tác tử AI mã nguồn mở để tìm việc',
    description:
      'Hệ thống mã nguồn mở để tìm việc với AI. Chạy trong CLI của bạn, trên máy của bạn.',
  },
};

export default function HomePageVi() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchemaVi(homeLastModified('vi'))) }}
      />
      <HomeContent dict={homeVi} />
    </>
  );
}
