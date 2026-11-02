import { blog } from 'collections/server';
import { createGetUrl, type InferPageType, loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { i18n } from '@/lib/i18n';
import { BLOG_ES_TWINS } from '@/lib/blog-twins';

// Blog source — parallel to the docs source, with its own baseUrl and an
// extended schema (date, tags, summary). Same loader-only i18n as docs: a post
// has a Spanish twin iff content/blog/<slug>.es.mdx exists, and the twin keeps
// the English slug (/es/blog/<slug>). EN surfaces (index, sitemap, llms-full)
// must ask for getPages('en'): with i18n on, getPages() returns every locale.
//
// One post lives outside /blog: the category guide, at /ai-job-search and
// /es/ai-job-search (Santiago, 26-oct: Bing weighs the phrase in the URL).
// Keeping it in this collection means the blog index, the sitemap and llms-full
// follow it through page.url. The /blog routes must not serve it: they list
// blogRoutePages().
const AI_JOB_SEARCH_SLUG = 'ai-job-search';
const blogUrl = createGetUrl('/blog', i18n);

export const blogSource = loader({
  i18n,
  baseUrl: '/blog',
  url: (slugs, locale) =>
    slugs[0] === AI_JOB_SEARCH_SLUG
      ? locale === 'es'
        ? '/es/ai-job-search'
        : '/ai-job-search'
      : blogUrl(slugs, locale),
  source: blog.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export type BlogPage = InferPageType<typeof blogSource>;

/** The post's twin in `locale`, or undefined when it has none. */
export function blogTwin(page: BlogPage, locale: 'en' | 'es'): BlogPage | undefined {
  return blogSource.getPage(page.slugs, locale);
}

/** The posts served under /blog (or /es/blog), so everything but the guide. */
export function blogRoutePages(locale: 'en' | 'es'): BlogPage[] {
  return blogSource.getPages(locale).filter((p) => p.slugs[0] !== AI_JOB_SEARCH_SLUG);
}

/** The category guide in `locale`. It exists on disk, so a miss is a broken build. */
export function aiJobSearchGuide(locale: 'en' | 'es'): BlogPage {
  const page = blogSource.getPage([AI_JOB_SEARCH_SLUG], locale);
  if (!page) throw new Error(`blog: the ${locale} category guide is missing`);
  return page;
}

// Build-time invariants. A Spanish post without an English twin, a French
// post (no /fr/blog route exists), or a twin list that disagrees with the
// files would each publish something broken without any error.
{
  const fr = blogSource.getPages('fr');
  if (fr.length > 0) {
    throw new Error(`blog: French posts have no route yet: ${fr.map((p) => p.path).join(', ')}`);
  }
  const es = blogSource.getPages('es');
  for (const p of es) {
    if (!blogSource.getPage(p.slugs, 'en')) {
      throw new Error(`blog: ${p.path} has no English twin at content/blog/${p.slugs[0]}.mdx`);
    }
  }
  const onDisk = es.map((p) => p.slugs[0]).sort();
  const listed = [...BLOG_ES_TWINS].sort();
  if (onDisk.join(',') !== listed.join(',')) {
    throw new Error(
      `blog: BLOG_ES_TWINS [${listed.join(', ')}] does not match the Spanish posts on disk [${onDisk.join(', ')}]`,
    );
  }
}
