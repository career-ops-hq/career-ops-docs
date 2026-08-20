import { getLLMText, source } from '@/lib/source';
import { i18n } from '@/lib/i18n';
import { notFound } from 'next/navigation';

// Markdown mirror for the NON-DEFAULT locales (/es/docs/**, /fr/docs/**).
//
// The EN mirror lives at /llms.mdx/docs/** and resolves pages without passing a
// locale, which fumadocs defaults to `en` — that default is exactly why the 93
// (really 32) Spanish URLs had no markdown twin: the route could not express
// which language was being asked for. Rather than overload the EN route with an
// optional leading segment that would collide with real docs slugs, locales get
// their own explicit path and pass the locale through.
//
// Reached only via the next.config `beforeFiles` rewrite for `<url>.md` and the
// Accept negotiation in src/proxy.ts — never linked directly.
export const revalidate = false;

// Params typed explicitly rather than via the generated RouteContext: that type
// is derived from routes Next has already seen, so a brand-new route cannot
// reference it until a build has run — a bootstrapping order that breaks `tsc`
// on a clean checkout.
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ lang: string; slug?: string[] }> },
) {
  const { lang, slug } = await params;

  // Only real, non-default locales. `en` belongs to the other route, and an
  // unknown value must 404 rather than silently fall back to English — a
  // wrong-language answer is worse than no answer. The widening cast is the
  // narrowing check itself: `lang` arrives as a plain string from the URL.
  const locales: readonly string[] = i18n.languages;
  if (lang === i18n.defaultLanguage || !locales.includes(lang)) notFound();

  // The rewrite appends `content.md` as the final segment; drop it.
  const page = source.getPage(slug?.slice(0, -1), lang);
  if (!page) notFound();

  return new Response(await getLLMText(page), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      // Same discipline as the EN mirror: fetchable by agents, never competing
      // with the canonical HTML page in the search index.
      'X-Robots-Tag': 'noindex',
    },
  });
}

export function generateStaticParams() {
  return i18n.languages
    .filter((lang) => lang !== i18n.defaultLanguage)
    .flatMap((lang) =>
      source.getPages(lang).map((page) => ({
        lang,
        slug: [...page.slugs, 'content.md'],
      })),
    );
}
