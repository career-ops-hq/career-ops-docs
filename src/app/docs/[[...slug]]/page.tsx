import { getPageImage, source } from '@/lib/source';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { DocsPageView } from '@/components/docs-page-view';
import { docsHreflang, DOCS_LOCALES } from '@/lib/i18n-map';

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return <DocsPageView page={page} />;
}

export async function generateStaticParams() {
  // With i18n enabled, source.generateParams() emits a `lang` key and one entry
  // per language — which does not match this EN-only, lang-less route. Enumerate
  // the default-language pages explicitly so /docs/** stays exactly the EN URLs
  // it was before i18n (the ES twins live at /es/docs/** via their own route).
  return source.getPages('en').map((page) => ({ slug: page.slugs }));
}

export async function generateMetadata(props: PageProps<'/docs/[[...slug]]'>): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  // seoTitle (optional frontmatter) drives the <title> tag when present;
  // the visible H1 stays page.data.title (short command name). QW1.
  const metaTitle = page.data.seoTitle ?? page.data.title;
  // Reciprocal hreflang, built from the locales that actually have a twin.
  // Source-derived (no hand-kept map): with fallbackLanguage:null,
  // getPage(slug, loc) resolves iff a .<loc>.mdx exists — never a fallback — so
  // the bidirectional + x-default→EN cluster is always truthful (search-ops).
  const twins = DOCS_LOCALES.filter(
    (loc) => source.getPage(page.slugs, loc) != null,
  );
  const languages = twins.length ? docsHreflang(page.url, twins) : undefined;
  return {
    title: metaTitle,
    description: page.data.description,
    alternates: {
      canonical: `https://career-ops.org${page.url}`,
      ...(languages && { languages }),
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: metaTitle,
      description: page.data.description,
      images: getPageImage(page).url,
    },
  };
}
