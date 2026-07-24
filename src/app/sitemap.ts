import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';
import { blogSource } from '@/lib/blog-source';
import { gitLastMod } from '@/lib/git-date';
import comparisonsData from '@/lib/data/comparisons.json';

export const revalidate = 3600;

const SITE_URL = 'https://career-ops.org';

// lastmod ONLY when git gives a real authored date. When git can't (a shallow
// Vercel clone with no history for the file), OMIT lastmod rather than fall back
// to the uniform checkout mtime — 84/116 URLs sharing one fabricated date made
// Google distrust and ignore lastmod site-wide. Omitting is honest; Google then
// uses its own crawl signal. (2026-07-24 audit, sitemap HIGH.)
const gd = (relPath: string): Date | undefined => gitLastMod(relPath) ?? undefined;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: gd('src/app/(home)/page.tsx'),
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: gd('src/app/about/page.tsx'),
    },
    {
      url: `${SITE_URL}/methodology`,
      lastModified: gd('src/app/methodology/page.tsx'),
    },
    {
      url: `${SITE_URL}/manifesto`,
      lastModified: gd('src/app/manifesto/page.tsx'),
      alternates: {
        languages: {
          en: `${SITE_URL}/manifesto`,
          es: `${SITE_URL}/es/manifesto`,
          'x-default': `${SITE_URL}/manifesto`,
        },
      },
    },
    {
      // The changelog's real freshness is the latest release date (the
      // page re-renders hourly from the GitHub Releases API); the file's
      // git date is the best build-time proxy available here.
      url: `${SITE_URL}/changelog`,
      lastModified: gd('src/app/changelog/page.tsx'),
    },
    {
      url: `${SITE_URL}/press`,
      lastModified: gd('src/app/press/page.tsx'),
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: gd('src/app/privacy/page.tsx'),
    },
    {
      url: `${SITE_URL}/sustain`,
      lastModified: gd('src/app/sustain/page.tsx'),
    },
    {
      url: `${SITE_URL}/compare`,
      lastModified: gd('src/app/compare/page.tsx'),
    },
  ];

  // /compare/[slug] — one entry per comparison in comparisons.json.
  // lastModified comes from the data file's lastModified field
  // (preferred) or git history of the data JSON itself.
  for (const c of comparisonsData.comparisons) {
    entries.push({
      url: `${SITE_URL}/compare/${c.slug}`,
      lastModified: c.lastModified
        ? new Date(`${c.lastModified}T00:00:00Z`)
        : gd('src/lib/data/comparisons.json'),
    });
  }

  // /blog index + /blog/[slug] — auto-discovered from blogSource.
  entries.push({
    url: `${SITE_URL}/blog`,
    lastModified: gd('src/app/blog/page.tsx'),
  });
  for (const post of blogSource.getPages()) {
    const data = post.data as { date?: string; lastModified?: string };
    const lastMod = data.lastModified || data.date;
    const mdxRel = `content/blog/${post.slugs.join('/')}.mdx`;
    entries.push({
      url: `${SITE_URL}${post.url}`,
      lastModified: lastMod
        ? new Date(`${lastMod}T00:00:00Z`)
        : gd(mdxRel),
    });
  }

  // /docs/** auto-discovered from Fumadocs source (includes
  // /docs/reference/modes/* and /docs/reference/portals/* shipped
  // post-migration from the deleted /use-cases routes).
  for (const page of source.getPages('en')) {
    // page.url already includes the /docs prefix via baseUrl in source.ts.
    // Reconstruct MDX path from slugs:
    //   []                                 -> content/docs/index.mdx
    //   ['intro', 'what-is-career-ops']    -> content/docs/intro/what-is-career-ops.mdx
    const mdxRel =
      page.slugs.length === 0
        ? 'content/docs/index.mdx'
        : `content/docs/${page.slugs.join('/')}.mdx`;

    entries.push({
      url: `${SITE_URL}${page.url}`,
      lastModified: gd(mdxRel),
    });
  }

  // Localized homes (es, fr) — share the same hreflang cluster.
  const homeCluster = {
    en: `${SITE_URL}/`,
    es: `${SITE_URL}/es`,
    fr: `${SITE_URL}/fr`,
    'x-default': `${SITE_URL}/`,
  };
  entries.push({
    url: `${SITE_URL}/es`,
    lastModified: new Date('2026-07-20'),
    alternates: { languages: homeCluster },
  });
  entries.push({
    url: `${SITE_URL}/fr`,
    lastModified: gd('src/app/fr/(home)/page.tsx'),
    alternates: { languages: homeCluster },
  });

  // Spanish (es) manifesto — /es/manifesto. Standalone TSX article (like the
  // home), so it is listed explicitly with its bidirectional hreflang pair.
  entries.push({
    url: `${SITE_URL}/es/manifesto`,
    lastModified: gd('src/app/es/manifesto/page.tsx'),
    alternates: {
      languages: {
        en: `${SITE_URL}/manifesto`,
        es: `${SITE_URL}/es/manifesto`,
        'x-default': `${SITE_URL}/manifesto`,
      },
    },
  });

  // Localized docs (es, fr) — SOURCE-DERIVED, no hand-kept map (search-ops drift
  // contract). A page has a twin iff getPage(slug, loc) resolves, which with
  // fallbackLanguage:null happens only for a real .<loc>.mdx (never an English
  // fallback). For each EN page we emit one entry per existing twin, and every
  // entry's hreflang cluster lists EN + all the twins that exist for that page.
  const DOCS_LOCALES = ['es', 'fr'] as const;
  for (const enPage of source.getPages('en')) {
    const twins = DOCS_LOCALES.filter(
      (loc) => source.getPage(enPage.slugs, loc) != null,
    );
    if (!twins.length) continue;
    const enUrl = `${SITE_URL}${enPage.url}`;
    const cluster: Record<string, string> = {
      en: enUrl,
      'x-default': enUrl,
    };
    for (const loc of twins) cluster[loc] = `${SITE_URL}/${loc}${enPage.url}`;
    for (const loc of twins) {
      const mdxRel = `content/docs/${enPage.slugs.join('/')}.${loc}.mdx`;
      entries.push({
        url: `${SITE_URL}/${loc}${enPage.url}`,
        lastModified: gd(mdxRel),
        alternates: { languages: cluster },
      });
    }
  }

  // priority and changefreq deliberately omitted — Google has ignored
  // both since 2017, and emitting cargo-cult values is flagged as low
  // signal by audit tools.
  return entries;
}
