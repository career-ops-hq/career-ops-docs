import { blog } from 'collections/server';
import { type InferPageType, loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { i18n } from '@/lib/i18n';
import { BLOG_LOCALES, BLOG_TWINS, type BlogLocale } from '@/lib/blog-twins';

// Blog source — parallel to the docs source, with its own baseUrl and an
// extended schema (date, tags, summary). Same loader-only i18n as docs: a post
// has a twin in <loc> iff content/blog/<slug>.<loc>.mdx exists, and the twin
// keeps the English slug (/<loc>/blog/<slug>). Only BLOG_LOCALES have a route. EN surfaces (index, sitemap, llms-full)
// must ask for getPages('en'): with i18n on, getPages() returns every locale.
export const blogSource = loader({
  i18n,
  baseUrl: '/blog',
  source: blog.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export type BlogPage = InferPageType<typeof blogSource>;

/** The post's twin in `locale`, or undefined when it has none. */
export function blogTwin(page: BlogPage, locale: 'en' | BlogLocale): BlogPage | undefined {
  return blogSource.getPage(page.slugs, locale);
}

/**
 * The hreflang cluster of an English post: every language it exists in, plus
 * x-default to the English post. Undefined when the post has no twin, so an
 * English-only post keeps its metadata exactly as before. Every member of a
 * cluster emits this same map (pages and sitemap).
 */
export function blogCluster(en: BlogPage): Record<string, string> | undefined {
  const site = 'https://career-ops.org';
  const twins = BLOG_LOCALES.flatMap((loc) => {
    const t = blogTwin(en, loc);
    return t ? [[loc, `${site}${t.url}`] as const] : [];
  });
  if (twins.length === 0) return undefined;
  return { en: `${site}${en.url}`, ...Object.fromEntries(twins), 'x-default': `${site}${en.url}` };
}

// Build-time invariants. A translated post without an English twin, a post in
// a language with no /<loc>/blog route, or a twin list that disagrees with the
// files would each publish something broken without any error.
{
  for (const loc of i18n.languages) {
    if (loc === 'en' || (BLOG_LOCALES as readonly string[]).includes(loc)) continue;
    const orphan = blogSource.getPages(loc);
    if (orphan.length > 0) {
      throw new Error(`blog: ${loc} posts have no route yet: ${orphan.map((p) => p.path).join(', ')}`);
    }
  }
  for (const loc of BLOG_LOCALES) {
    const pages = blogSource.getPages(loc);
    for (const p of pages) {
      if (!blogSource.getPage(p.slugs, 'en')) {
        throw new Error(`blog: ${p.path} has no English twin at content/blog/${p.slugs[0]}.mdx`);
      }
    }
    const onDisk = pages.map((p) => p.slugs[0]).sort();
    const listed = [...BLOG_TWINS[loc]].sort();
    if (onDisk.join(',') !== listed.join(',')) {
      throw new Error(
        `blog: BLOG_TWINS.${loc} [${listed.join(', ')}] does not match the ${loc} posts on disk [${onDisk.join(', ')}]`,
      );
    }
  }
}
