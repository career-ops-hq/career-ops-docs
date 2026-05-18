import { execSync } from 'node:child_process';
import { statSync } from 'node:fs';
import path from 'node:path';
import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';
import { blogSource } from '@/lib/blog-source';
import comparisonsData from '@/lib/data/comparisons.json';

export const revalidate = 3600;

const SITE_URL = 'https://career-ops.org';
const REPO_ROOT = path.resolve(process.cwd());

// lastmod resolution chain:
//   1. git log (real authored timestamp)
//   2. fs.statSync mtime (survives Vercel shallow clones)
//   3. build time fallback
function lastModFor(relPath: string): Date {
  try {
    const iso = execSync(`git log -1 --format=%cI -- "${relPath}"`, {
      cwd: REPO_ROOT,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    if (iso) return new Date(iso);
  } catch {
    /* fall through */
  }
  try {
    return statSync(path.join(REPO_ROOT, relPath)).mtime;
  } catch {
    return new Date();
  }
}

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
  for (const page of source.getPages()) {
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

  // priority and changefreq deliberately omitted — Google has ignored
  // both since 2017, and emitting cargo-cult values is flagged as low
  // signal by audit tools.
  return entries;
}
