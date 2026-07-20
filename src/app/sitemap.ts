import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';
import { blogSource } from '@/lib/blog-source';
import { lastModFor } from '@/lib/git-date';
import comparisonsData from '@/lib/data/comparisons.json';

export const revalidate = 3600;

const SITE_URL = 'https://career-ops.org';

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: lastModFor('src/app/(home)/page.tsx'),
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: lastModFor('src/app/about/page.tsx'),
    },
    {
      url: `${SITE_URL}/methodology`,
      lastModified: lastModFor('src/app/methodology/page.tsx'),
    },
    {
      url: `${SITE_URL}/manifesto`,
      lastModified: lastModFor('src/app/manifesto/page.tsx'),
    },
    {
      // The changelog's real freshness is the latest release date (the
      // page re-renders hourly from the GitHub Releases API); the file's
      // git date is the best build-time proxy available here.
      url: `${SITE_URL}/changelog`,
      lastModified: lastModFor('src/app/changelog/page.tsx'),
    },
    {
      url: `${SITE_URL}/press`,
      lastModified: lastModFor('src/app/press/page.tsx'),
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: lastModFor('src/app/privacy/page.tsx'),
    },
    {
      url: `${SITE_URL}/sustain`,
      lastModified: lastModFor('src/app/sustain/page.tsx'),
    },
    {
      url: `${SITE_URL}/compare`,
      lastModified: lastModFor('src/app/compare/page.tsx'),
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
        : lastModFor('src/lib/data/comparisons.json'),
    });
  }

  // /blog index + /blog/[slug] — auto-discovered from blogSource.
  entries.push({
    url: `${SITE_URL}/blog`,
    lastModified: lastModFor('src/app/blog/page.tsx'),
  });
  for (const post of blogSource.getPages()) {
    const data = post.data as { date?: string; lastModified?: string };
    const lastMod = data.lastModified || data.date;
    const mdxRel = `content/blog/${post.slugs.join('/')}.mdx`;
    entries.push({
      url: `${SITE_URL}${post.url}`,
      lastModified: lastMod
        ? new Date(`${lastMod}T00:00:00Z`)
        : lastModFor(mdxRel),
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
      lastModified: lastModFor(mdxRel),
    });
  }

  // Spanish (es) home.
  entries.push({
    url: `${SITE_URL}/es`,
    lastModified: new Date('2026-07-20'),
    alternates: {
      languages: {
        en: `${SITE_URL}/`,
        es: `${SITE_URL}/es`,
        'x-default': `${SITE_URL}/`,
      },
    },
  });

  // ES docs — SOURCE-DERIVED, no hand-kept map (search-ops drift contract).
  // A page has an ES twin iff getPage(slug, 'es') resolves, which with
  // fallbackLanguage:null happens only for a real .es.mdx (never an English
  // fallback). So a Spanish URL / hreflang alternate is emitted exclusively for
  // pages that are actually translated — never a thin es-labelled EN page.
  for (const enPage of source.getPages('en')) {
    if (!source.getPage(enPage.slugs, 'es')) continue;
    const enUrl = `${SITE_URL}${enPage.url}`;
    const esUrl = `${SITE_URL}/es${enPage.url}`;
    const esMdxRel = `content/docs/${enPage.slugs.join('/')}.es.mdx`;
    entries.push({
      url: esUrl,
      lastModified: lastModFor(esMdxRel),
      alternates: {
        languages: { en: enUrl, es: esUrl, 'x-default': enUrl },
      },
    });
  }

  // priority and changefreq deliberately omitted — Google has ignored
  // both since 2017, and emitting cargo-cult values is flagged as low
  // signal by audit tools.
  return entries;
}
