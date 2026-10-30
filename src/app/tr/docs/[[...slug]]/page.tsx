import { getPageImage } from '@/lib/source';
import { source } from '@/lib/source';
import { DocsPageView } from '@/components/docs-page-view';
import { docsHreflang, DOCS_LOCALES } from '@/lib/i18n-map';
import { notFound, redirect } from 'next/navigation';
import type { Metadata } from 'next';

// Turkish docs route: reuses the SAME render trunk (DocsPageView) as /docs/**,
// resolving each page in the 'tr' locale. It exists only for slugs with a real
// .tr.mdx (see generateStaticParams), so it is never a thin English mirror.
type Props = { params: Promise<{ slug?: string[] }> };

export default async function Page(props: Props) {
  const { slug } = await props.params;
  const page = source.getPage(slug, 'tr');
  if (!page) {
    // No Turkish translation yet → send the reader to the English page rather
    // than a 404, so the language toggle is always safe to click.
    const en = source.getPage(slug);
    if (en) redirect(en.url);
    notFound();
  }

  return <DocsPageView page={page} />;
}

export async function generateStaticParams() {
  // With fallbackLanguage:null, getPages('tr') is EXACTLY the set of pages that
  // have a .tr.mdx: so /tr/docs/* is generated only for real translations.
  return source.getPages('tr').map((page) => ({ slug: page.slugs }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;
  const page = source.getPage(slug, 'tr');
  if (!page) notFound();

  const enUrl = source.getPage(slug)?.url ?? `/docs/${(slug ?? []).join('/')}`;
  const trUrl = `https://career-ops.org/tr${enUrl}`;
  // Cluster from the locales that actually have a twin (tr is always present
  // here; es/fr/de/pt/it/zh appear only if their file exists for this slug).
  const twins = DOCS_LOCALES.filter((loc) => source.getPage(slug, loc) != null);
  // seoTitle here is the transcreated TR <title> (framing, localized to the TR
  // fan-out); the visible H1 stays page.data.title.
  const metaTitle = page.data.seoTitle ?? page.data.title;

  return {
    title: metaTitle,
    description: page.data.description,
    alternates: {
      canonical: trUrl,
      languages: docsHreflang(enUrl, twins),
    },
    robots: { index: true, follow: true },
    openGraph: {
      images: getPageImage(page).url,
      type: 'article',
      url: trUrl,
      siteName: 'career-ops',
      locale: 'tr_TR',
      title: metaTitle,
      description: page.data.description,
    },
  };
}
