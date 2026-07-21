import { source } from '@/lib/source';
import { DocsPageView } from '@/components/docs-page-view';
import { docsHreflang, DOCS_LOCALES } from '@/lib/i18n-map';
import { notFound, redirect } from 'next/navigation';
import type { Metadata } from 'next';

// French docs route — reuses the SAME render trunk (DocsPageView) as /docs/**,
// resolving each page in the 'fr' locale. It exists only for slugs with a real
// .fr.mdx (see generateStaticParams), so it is never a thin English mirror.
type Props = { params: Promise<{ slug?: string[] }> };

export default async function Page(props: Props) {
  const { slug } = await props.params;
  const page = source.getPage(slug, 'fr');
  if (!page) {
    // No French translation yet → send the reader to the English page rather
    // than a 404, so the language toggle is always safe to click.
    const en = source.getPage(slug);
    if (en) redirect(en.url);
    notFound();
  }

  return <DocsPageView page={page} />;
}

export async function generateStaticParams() {
  // With fallbackLanguage:null, getPages('fr') is EXACTLY the set of pages that
  // have a .fr.mdx — so /fr/docs/* is generated only for real translations.
  return source.getPages('fr').map((page) => ({ slug: page.slugs }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;
  const page = source.getPage(slug, 'fr');
  if (!page) notFound();

  const enUrl = source.getPage(slug)?.url ?? `/docs/${(slug ?? []).join('/')}`;
  const frUrl = `https://career-ops.org/fr${enUrl}`;
  // Cluster from the locales that actually have a twin (fr is always present
  // here; es appears only if a .es.mdx exists for this slug).
  const twins = DOCS_LOCALES.filter((loc) => source.getPage(slug, loc) != null);
  // seoTitle here is the transcreated FR <title> (framing, localized to the FR
  // fan-out); the visible H1 stays page.data.title.
  const metaTitle = page.data.seoTitle ?? page.data.title;

  return {
    title: metaTitle,
    description: page.data.description,
    alternates: {
      canonical: frUrl,
      languages: docsHreflang(enUrl, twins),
    },
    robots: { index: true, follow: true },
    openGraph: {
      type: 'article',
      url: frUrl,
      siteName: 'career-ops',
      locale: 'fr_FR',
      title: metaTitle,
      description: page.data.description,
    },
  };
}
