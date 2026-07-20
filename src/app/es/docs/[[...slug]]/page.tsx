import { source } from '@/lib/source';
import { DocsPageView } from '@/components/docs-page-view';
import { docsHreflang } from '@/lib/i18n-map';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// Spanish docs route — reuses the SAME render trunk (DocsPageView) as /docs/**,
// resolving each page in the 'es' locale. It exists only for slugs with a real
// .es.mdx (see generateStaticParams), so it is never a thin English mirror.
type Props = { params: Promise<{ slug?: string[] }> };

export default async function Page(props: Props) {
  const { slug } = await props.params;
  const page = source.getPage(slug, 'es');
  if (!page) notFound();

  return <DocsPageView page={page} />;
}

export async function generateStaticParams() {
  // With fallbackLanguage:null, getPages('es') is EXACTLY the set of pages that
  // have an .es.mdx — so /es/docs/* is generated only for real translations,
  // never an English-content page under a Spanish URL.
  return source.getPages('es').map((page) => ({ slug: page.slugs }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;
  const page = source.getPage(slug, 'es');
  if (!page) notFound();

  // The EN twin always exists (ES ⊆ EN); its url is the canonical EN path, and
  // the ES URL is deterministically /es + that path (slugs are not translated).
  const enUrl = source.getPage(slug)?.url ?? `/docs/${(slug ?? []).join('/')}`;
  const esUrl = `https://career-ops.org/es${enUrl}`;
  // seoTitle here is the transcreated ES <title> (framing, localized to ES
  // fan-out); the visible H1 stays page.data.title.
  const metaTitle = page.data.seoTitle ?? page.data.title;

  return {
    title: metaTitle,
    description: page.data.description,
    alternates: {
      canonical: esUrl,
      languages: docsHreflang(enUrl),
    },
    robots: { index: true, follow: true },
    openGraph: {
      type: 'article',
      url: esUrl,
      siteName: 'career-ops',
      locale: 'es_ES',
      title: metaTitle,
      description: page.data.description,
    },
  };
}
