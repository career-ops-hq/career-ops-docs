import { getPageImage } from '@/lib/source';
import { source } from '@/lib/source';
import { DocsPageView } from '@/components/docs-page-view';
import { docsHreflang, DOCS_LOCALES } from '@/lib/i18n-map';
import { notFound, redirect } from 'next/navigation';
import type { Metadata } from 'next';

// Portuguese (pt-BR) docs route: reuses the SAME render trunk (DocsPageView) as /docs/**,
// resolving each page in the 'pt' locale. It exists only for slugs with a real
// .pt.mdx (see generateStaticParams), so it is never a thin English mirror.
type Props = { params: Promise<{ slug?: string[] }> };

export default async function Page(props: Props) {
  const { slug } = await props.params;
  const page = source.getPage(slug, 'pt');
  if (!page) {
    // No Portuguese translation yet → send the reader to the English page rather
    // than a 404, so the language toggle is always safe to click.
    const en = source.getPage(slug);
    if (en) redirect(en.url);
    notFound();
  }

  return <DocsPageView page={page} />;
}

export async function generateStaticParams() {
  // With fallbackLanguage:null, getPages('pt') is EXACTLY the set of pages that
  // have a .pt.mdx: so /pt/docs/* is generated only for real translations.
  return source.getPages('pt').map((page) => ({ slug: page.slugs }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;
  const page = source.getPage(slug, 'pt');
  if (!page) notFound();

  const enUrl = source.getPage(slug)?.url ?? `/docs/${(slug ?? []).join('/')}`;
  const ptUrl = `https://career-ops.org/pt${enUrl}`;
  // Cluster from the locales that actually have a twin (pt is always present
  // here; es/fr/de appear only if their file exists for this slug).
  const twins = DOCS_LOCALES.filter((loc) => source.getPage(slug, loc) != null);
  // seoTitle here is the transcreated PT <title> (framing, localized to the PT
  // fan-out); the visible H1 stays page.data.title.
  const metaTitle = page.data.seoTitle ?? page.data.title;

  return {
    title: metaTitle,
    description: page.data.description,
    alternates: {
      canonical: ptUrl,
      languages: docsHreflang(enUrl, twins),
    },
    robots: { index: true, follow: true },
    openGraph: {
      images: getPageImage(page).url,
      type: 'article',
      url: ptUrl,
      siteName: 'career-ops',
      locale: 'pt_BR',
      title: metaTitle,
      description: page.data.description,
    },
  };
}
