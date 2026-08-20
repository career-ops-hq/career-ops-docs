// Changelog data for /changelog — fetched from the core repo's GitHub
// Releases with 1h ISR, same self-maintaining pattern as stats.ts: the
// page updates itself when the maintainer publishes a release, and a
// transient API failure degrades to an empty list (the page then points
// at GitHub Releases) rather than breaking the build.
//
// The core generates release notes with conventional-changelog, so each
// body is machine-parseable: "### Features" / "### Bug Fixes" sections
// with bullets like "* **scope:** text ([#123](url)) ([hash](url))".
// We strip the commit/issue link furniture — hashes and PR links read as
// author-terminal noise to the site's mixed audience; the GitHub link on
// each entry keeps the raw notes one click away.

const RELEASES_API =
  'https://api.github.com/repos/santifer/career-ops/releases?per_page=30';

export type ChangelogItem = {
  scope: string | null;
  text: string;
};

export type ChangelogSection = {
  label: string;
  items: ChangelogItem[];
};

export type ChangelogRelease = {
  /**
   * Which release train this belongs to, from the tag prefix: "career-ops"
   * for the tool itself, "web" for the dashboard component. The repo ships
   * both from one Releases feed and GitHub names them accordingly
   * ("career-ops: v1.26.0", "web: v0.6.1").
   */
  component: string;
  /**
   * True for the career-ops tool train (as opposed to a sub-component).
   *
   * EDITORIAL GATE — canonical wording, do not restate elsewhere. Both
   * /changelog and /changelog.md filter on this; each call site points here so
   * there is one copy to keep true. Decided 2026-08-17 by the maintainer and
   * venture-ops independently, consolidated by search-ops:
   *
   *   The `web-*` train does not appear on /changelog. It is RE-EVALUATED when
   *   the web leaves RC (milestone 2.0 → GA). If it is published then, it gets
   *   its OWN page (/changelog/web or equivalent), NEVER mixed into the main
   *   series — the single series is what protects the surface from
   *   intermediaries that do not read labels.
   *
   * Three reasons, strongest first:
   *  1. The `web` component exists separately in release-please precisely so
   *     its commits do NOT move the product version. A public changelog
   *     telling both trains would editorially undo a separation the repo makes
   *     on purpose — design coherence, not taste, which is why this reason
   *     outlives any change of mind about presentation.
   *  2. Filtering beats labelling: the label protects against yesterday's bug,
   *     the single series protects against tomorrow's scraper that does not
   *     exist yet. Our own parser was the first consumer that failed to read
   *     the label (it rendered `web-v0.6.1` as `vweb-v0.6.1` and gave it the
   *     "Latest" chip).
   *  3. /changelog is the contract for what career-ops IS — the local-first
   *     tool. The dashboard is a component; mixing its releases promotes it to
   *     product category.
   *
   * Status at the time of writing: the web is in RC, milestone 2.0-beta.
   */
  isCore: boolean;
  /** Display version, e.g. "v1.16.0" */
  version: string;
  /** ISO date the release was published */
  date: string;
  /** Link to the release on GitHub (raw notes, assets) */
  url: string;
  sections: ChangelogSection[];
};

const CORE_COMPONENT = 'career-ops';

// Tags carry the release train as a prefix: "career-ops-v1.26.0" (the tool)
// and "web-v0.6.1" (the dashboard component). Splitting on the LAST "-v"
// keeps a hyphenated component name intact.
//
// The previous version stripped only "career-ops-" and prefixed a "v" to
// whatever was left, so "web-v0.6.1" rendered as "vweb-v0.6.1" — malformed,
// and worse, misattributed: it sat at the top of /changelog looking like the
// latest career-ops version while /llms.txt correctly said v1.26.0. Two of
// our own surfaces contradicting each other on the route AI assistants
// request most. (Found 2026-08-17 while adding the markdown twin.)
function parseTag(tag: string): { component: string; version: string } {
  const m = tag.trim().match(/^(.*)-v?(\d[\w.+-]*)$/);
  if (!m) {
    const raw = tag.trim();
    return {
      component: CORE_COMPONENT,
      version: raw.startsWith('v') ? raw : `v${raw}`,
    };
  }
  return { component: m[1] || CORE_COMPONENT, version: `v${m[2]}` };
}

// Human labels for conventional-changelog section headings. Anything not
// mapped keeps its original heading text.
const SECTION_LABELS: Record<string, string> = {
  Features: 'New',
  'Bug Fixes': 'Fixed',
  'Performance Improvements': 'Faster',
  Reverts: 'Reverted',
  Documentation: 'Docs',
};

function parseItem(line: string): ChangelogItem | null {
  const m = line.match(/^\*\s+(?:\*\*(.+?):\*\*\s*)?(.+)$/);
  if (!m) return null;
  let text = m[2]
    // drop trailing "([#123](url))" and "([abc1234](url))" link furniture
    .replace(/\s*\(\[[^\]]*\]\([^)]*\)\)/g, '')
    // unwrap any remaining inline markdown links to their text
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .trim();
  if (!text) return null;
  // Sentence-case the first character; the notes are commit subjects.
  text = text.charAt(0).toUpperCase() + text.slice(1);
  return { scope: m[1] ?? null, text };
}

function parseBody(body: string): ChangelogSection[] {
  const sections: ChangelogSection[] = [];
  let current: ChangelogSection | null = null;
  for (const raw of body.split('\n')) {
    const line = raw.trim();
    const heading = line.match(/^###\s+(.+)$/);
    if (heading) {
      const name = heading[1].trim();
      current = { label: SECTION_LABELS[name] ?? name, items: [] };
      sections.push(current);
      continue;
    }
    if (current && line.startsWith('* ')) {
      const item = parseItem(line);
      if (item) current.items.push(item);
    }
  }
  return sections.filter((s) => s.items.length > 0);
}

export async function getChangelog(): Promise<ChangelogRelease[]> {
  try {
    const res = await fetch(RELEASES_API, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    if (!Array.isArray(data)) return [];
    return data
      .filter((r) => !r.draft && !r.prerelease && typeof r.tag_name === 'string')
      .map((r) => {
        const { component, version } = parseTag(r.tag_name);
        return {
          component,
          isCore: component === CORE_COMPONENT,
          version,
          date: (r.published_at ?? '').slice(0, 10),
          url: r.html_url as string,
          sections: parseBody(typeof r.body === 'string' ? r.body : ''),
        };
      })
      .filter((r) => r.sections.length > 0);
  } catch {
    return [];
  }
}
