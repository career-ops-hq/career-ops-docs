import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';
import { blogSource } from '@/lib/blog-source';
import { gitLastMod } from '@/lib/git-date';
import { homeLastModified } from '@/lib/home-date';
import comparisonsData from '@/lib/data/comparisons.json';
import { getChangelog } from '@/lib/releases';

export const revalidate = 3600;

const SITE_URL = 'https://career-ops.org';

// lastmod ONLY when git gives a real authored date. When git can't (a shallow
// Vercel clone with no history for the file), OMIT lastmod rather than fall back
// to the uniform checkout mtime — 84/116 URLs sharing one fabricated date made
// Google distrust and ignore lastmod site-wide. Omitting is honest; Google then
// uses its own crawl signal. (2026-07-24 audit, sitemap HIGH.)
const gd = (relPath: string): Date | undefined => gitLastMod(relPath) ?? undefined;
// Hand-written dates are a day ("2026-09-29") or, when the hour matters, the
// full timestamp of the deploy that shipped the change. Only a bare day gets
// midnight: "T00:00:00Z" on a change that shipped at 17:08 claims a time
// before it existed.
const handDate = (s: string): Date => new Date(s.length === 10 ? `${s}T00:00:00Z` : s);

// A page's date is the newest of the files that actually make up what a reader
// sees, not only its route file. The home's route file (page.tsx) had not
// changed since 21 July while its text, which lives in home-dict.tsx, changed
// on 22 September: the most edited page on the site was telling Google it was
// two months stale. Same for the manifesto, whose signed text is its own file.
const gdMax = (...relPaths: string[]): Date | undefined => {
  const dates = relPaths
    .map((p) => gitLastMod(p))
    .filter((d): d is Date => d != null);
  return dates.length ? new Date(Math.max(...dates.map((d) => d.getTime()))) : undefined;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Real publication date of the newest career-ops release (the `web-*`
  // component train is not part of this page's series — see `isCore`).
  const releases = (await getChangelog()).filter((r) => r.isCore);
  const latestReleaseDate = releases[0]?.date;
  const changelogLastMod = latestReleaseDate
    ? new Date(`${latestReleaseDate}T00:00:00Z`)
    : gd('src/app/(en)/changelog/page.tsx');

  // One hreflang cluster per page, emitted on EVERY member, English included.
  // Until 30-sep the English home and the 34 English docs had no xhtml:link
  // while their ES/FR/DE twins did: Google's sitemap method expects each <url>
  // to list all versions, itself included (i18n SEO audit, 30-sep).
  const homeCluster = {
    en: `${SITE_URL}/`,
    es: `${SITE_URL}/es`,
    fr: `${SITE_URL}/fr`,
    de: `${SITE_URL}/de`,
    'x-default': `${SITE_URL}/`,
  };
  const DOCS_LOCALES = ['es', 'fr', 'de'] as const;
  // Source-derived (search-ops drift contract): a page has a twin iff
  // getPage(slug, loc) resolves, which with fallbackLanguage:null happens only
  // for a real .<loc>.mdx, never an English fallback.
  const docsCluster = (enPage: ReturnType<typeof source.getPages>[number]) => {
    const twins = DOCS_LOCALES.filter((loc) => source.getPage(enPage.slugs, loc) != null);
    if (!twins.length) return null;
    const enUrl = `${SITE_URL}${enPage.url}`;
    const cluster: Record<string, string> = { en: enUrl, 'x-default': enUrl };
    for (const loc of twins) cluster[loc] = `${SITE_URL}/${loc}${enPage.url}`;
    return { twins, cluster };
  };

  const entries: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: homeLastModified('en'),
      alternates: { languages: homeCluster },
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: gd('src/app/(en)/about/page.tsx'),
    },
    {
      url: `${SITE_URL}/methodology`,
      lastModified: gd('src/app/(en)/methodology/page.tsx'),
    },
    {
      url: `${SITE_URL}/manifesto`,
      lastModified: gdMax('src/app/(en)/manifesto/page.tsx', 'src/lib/manifesto-text.ts'),
      alternates: {
        languages: {
          en: `${SITE_URL}/manifesto`,
          es: `${SITE_URL}/es/manifesto`,
          'x-default': `${SITE_URL}/manifesto`,
        },
      },
    },
    {
      // The changelog's real freshness is the latest release date, and we
      // have it: getChangelog() reads the Releases API on the same hourly
      // cadence as this sitemap. The git date used before was a build-time
      // proxy that Vercel's shallow clone turned into `undefined`, leaving
      // the most frequently changing page on the site with NO lastmod at
      // all. `published_at` is an authored date, so this asserts nothing
      // fabricated; if the API is down we fall back to omitting it.
      // (search-ops W34: ChatGPT answers a 4-release-old version — stale,
      // not poisoned, and staleness is what a freshness signal addresses.)
      url: `${SITE_URL}/changelog`,
      lastModified: changelogLastMod,
    },
    {
      url: `${SITE_URL}/press`,
      lastModified: gd('src/app/(en)/press/page.tsx'),
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: gd('src/app/(en)/privacy/page.tsx'),
    },
    {
      url: `${SITE_URL}/sustain`,
      lastModified: gd('src/app/(en)/sustain/page.tsx'),
    },
    {
      url: `${SITE_URL}/compare`,
      lastModified: gd('src/app/(en)/compare/page.tsx'),
    },
  ];

  // /compare/[slug] — one entry per comparison in comparisons.json.
  // lastModified comes from the data file's lastModified field
  // (preferred) or git history of the data JSON itself.
  for (const c of comparisonsData.comparisons) {
    entries.push({
      url: `${SITE_URL}/compare/${c.slug}`,
      lastModified: c.lastModified
        ? handDate(c.lastModified)
        : gd('src/lib/data/comparisons.json'),
    });
  }

  // /blog index + /blog/[slug] — auto-discovered from blogSource.
  entries.push({
    url: `${SITE_URL}/blog`,
    lastModified: gd('src/app/(en)/blog/page.tsx'),
  });
  for (const post of blogSource.getPages()) {
    const data = post.data as { date?: string; lastModified?: string };
    const lastMod = data.lastModified || data.date;
    const mdxRel = `content/blog/${post.slugs.join('/')}.mdx`;
    entries.push({
      url: `${SITE_URL}${post.url}`,
      lastModified: lastMod
        ? handDate(lastMod)
        : gd(mdxRel),
    });
  }

  // /docs/** auto-discovered from Fumadocs source (includes
  // /docs/reference/modes/* and /docs/reference/portals/* shipped
  // post-migration from the deleted /use-cases routes).
  for (const page of source.getPages('en')) {
    // page.url already includes the /docs prefix via baseUrl in source.ts.
    // The date comes from the page's REAL source file (page.path), never from a
    // path rebuilt out of its slugs. Rebuilding guessed `reference/modes.mdx` for
    // a folder index that lives at `reference/modes/index.mdx`, found no file,
    // and silently dropped <lastmod> for that URL. docs-page-view already reads
    // page.path, which is why the page showed a date the sitemap did not.
    const mdxRel = `content/docs/${page.path}`;
    const c = docsCluster(page);

    entries.push({
      url: `${SITE_URL}${page.url}`,
      lastModified: gd(mdxRel),
      ...(c ? { alternates: { languages: c.cluster } } : {}),
    });
  }

  // Localized homes (es, fr, de) — same cluster as the English home.
  entries.push({
    url: `${SITE_URL}/es`,
    lastModified: homeLastModified('es'),
    alternates: { languages: homeCluster },
  });
  entries.push({
    url: `${SITE_URL}/fr`,
    lastModified: homeLastModified('fr'),
    alternates: { languages: homeCluster },
  });
  entries.push({
    url: `${SITE_URL}/de`,
    lastModified: homeLastModified('de'),
    alternates: { languages: homeCluster },
  });

  // Spanish (es) manifesto — /es/manifesto. Standalone TSX article (like the
  // home), so it is listed explicitly with its bidirectional hreflang pair.
  entries.push({
    url: `${SITE_URL}/es/manifesto`,
    lastModified: gdMax('src/app/es/manifesto/page.tsx', 'src/lib/manifesto-text.ts'),
    alternates: {
      languages: {
        en: `${SITE_URL}/manifesto`,
        es: `${SITE_URL}/es/manifesto`,
        'x-default': `${SITE_URL}/manifesto`,
      },
    },
  });

  // Localized docs (es, fr, de): one entry per existing twin, each carrying the
  // same cluster as its English page (see docsCluster above).
  for (const enPage of source.getPages('en')) {
    const c = docsCluster(enPage);
    if (!c) continue;
    const { twins, cluster } = c;
    for (const loc of twins) {
      // Same rule as above: the twin's own source path. The rebuilt path turned
      // the docs index into `content/docs/.es.mdx`, a file that cannot exist.
      const mdxRel = `content/docs/${source.getPage(enPage.slugs, loc)!.path}`;
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
