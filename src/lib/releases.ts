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
  /** Display version, e.g. "v1.16.0" */
  version: string;
  /** ISO date the release was published */
  date: string;
  /** Link to the release on GitHub (raw notes, assets) */
  url: string;
  sections: ChangelogSection[];
};

// "career-ops-v1.16.0" -> "v1.16.0"
function displayVersion(tag: string): string {
  const stripped = tag.replace(/^career-ops-/, '').trim();
  return stripped.startsWith('v') ? stripped : `v${stripped}`;
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
      .map((r) => ({
        version: displayVersion(r.tag_name),
        date: (r.published_at ?? '').slice(0, 10),
        url: r.html_url as string,
        sections: parseBody(typeof r.body === 'string' ? r.body : ''),
      }))
      .filter((r) => r.sections.length > 0);
  } catch {
    return [];
  }
}
