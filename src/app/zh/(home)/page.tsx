import type { Metadata } from 'next';
import { homeFaqSchemaZh } from '@/lib/schema';
import { homeLastModified } from '@/lib/home-date';
import { hreflangHome } from '@/lib/i18n-map';
import { HomeContent } from '@/app/_home/home-content';
import { homeZh } from '@/app/_home/home-zh';

// Chinese home: SAME trunk as the other homes (HomeContent), rendered with the
// Simplified Chinese dictionary. The signature thesis stays in LITERAL English
// (no ratified Chinese rendering), so homeZh has no thesisTranslation and only
// the English blockquote renders, as on the French, German, Portuguese and
// Italian homes. The <title> is the category phrase from the search-ops native
// profile for Chinese (measured fan-out, 15 Oct 2026), the README.cn tagline.

export const metadata: Metadata = {
  metadataBase: new URL('https://career-ops.org'),
  title: 'career-ops：开源的 AI 求职智能体',
  description:
    '用 AI 找工作的开源系统。运行在你的电脑上，就在你已经在用的 AI 编程助手里。为职位打分、定制你的简历、跟踪你的申请。无需注册账号，MIT 许可证。',
  alternates: {
    canonical: 'https://career-ops.org/zh',
    languages: hreflangHome(),
  },
  openGraph: {
    type: 'website',
    url: 'https://career-ops.org/zh',
    siteName: 'career-ops',
    locale: 'zh_CN',
    title: 'career-ops：开源的 AI 求职智能体',
    description: '用 AI 找工作的开源系统。运行在你的 CLI 里，在你自己的电脑上。',
  },
};

export default function HomePageZh() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchemaZh(homeLastModified('zh'))) }}
      />
      <HomeContent dict={homeZh} />
    </>
  );
}
