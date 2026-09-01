// Live project stats consumed by Schema.org JSON-LD (interactionStatistic),
// llms.txt, and the footer/home chips. GitHub stars/forks + the latest
// release tag are fetched from the public API with 1h ISR. Every value is
// guarded by a last-known-good floor (src/lib/shared.ts) so a transient
// unauthenticated-API failure can NEVER render "0 stars" into llms.txt or
// zero out the schema counters — that was the single highest-severity
// finding of the 2026-06-30 SEO audit.
import { STATS_FLOOR, LATEST_RELEASE_FALLBACK } from './shared';

const REPO_API = 'https://api.github.com/repos/career-ops-hq/career-ops';
// The LIST, not /releases/latest. The repo ships two trains from one feed
// (`career-ops-*` for the tool, `web-*` for the dashboard) and /releases/latest
// can hand back either — it just happens to return the tool's today. Fetching
// the list lets us pick the tool's train instead of hoping.
const RELEASES_API =
  'https://api.github.com/repos/career-ops-hq/career-ops/releases?per_page=30';
// Discord's public invite endpoint returns approximate_member_count with
// no bot and no auth — the invite code is the public one on the site.
const DISCORD_INVITE_API =
  'https://discord.com/api/v10/invites/8pRpHETxa4?with_counts=true';

export type ProjectStats = {
  stars: number;
  forks: number;
  discordMembers: number;
  /** Latest core release, normalised to a leading "v" (e.g. "v1.15.0"). */
  latestRelease: string;
  /** Same release without the "v" prefix, for schema softwareVersion. */
  softwareVersion: string;
};

// The core repo tags releases as "career-ops-v1.31.0"; the site wants
// "v1.31.0" (display) and "1.31.0" (schema).
//
// Stripping ONLY the "career-ops-" prefix was the bug that published
// "vweb-v0.6.1" on /changelog for a month — a `web-*` tag survives the strip
// untouched and then gets a "v" glued on the front. That surface was fixed in
// src/lib/releases.ts; this copy of the same mistake was still feeding
// llms.txt, which is the surface assistants read most. It had not fired only
// because GitHub happened to keep returning the tool's release.
//
// Split on the LAST "-v" so a hyphenated component name stays intact, and
// return the component so the caller can reject a train that is not ours.
function parseTag(tag: string): { component: string; display: string; version: string } {
  const m = tag.trim().match(/^(.*)-v?(\d[\w.+-]*)$/);
  if (!m) {
    const raw = tag.trim();
    const display = raw.startsWith('v') ? raw : `v${raw}`;
    return { component: CORE_COMPONENT, display, version: display.replace(/^v/, '') };
  }
  return {
    component: m[1] || CORE_COMPONENT,
    display: `v${m[2]}`,
    version: m[2],
  };
}

const CORE_COMPONENT = 'career-ops';

export async function getProjectStats(): Promise<ProjectStats> {
  // Start at the floors. Live values only ever replace a floor when they
  // are present AND larger — so an API hiccup degrades to the floor, never
  // to zero.
  let stars = STATS_FLOOR.stars;
  let forks = STATS_FLOOR.forks;

  try {
    const res = await fetch(REPO_API, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      if (typeof data.stargazers_count === 'number' && data.stargazers_count > stars)
        stars = data.stargazers_count;
      if (typeof data.forks_count === 'number' && data.forks_count > forks)
        forks = data.forks_count;
    }
  } catch {
    // keep floors — fail silent so the page still renders real-ish numbers
  }

  let discordMembers = STATS_FLOOR.discordMembers;
  try {
    const res = await fetch(DISCORD_INVITE_API, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      if (
        typeof data.approximate_member_count === 'number' &&
        data.approximate_member_count > discordMembers
      )
        discordMembers = data.approximate_member_count;
    }
  } catch {
    // keep the floor
  }

  let { display: latestRelease, version: softwareVersion } =
    parseTag(LATEST_RELEASE_FALLBACK);

  try {
    const res = await fetch(RELEASES_API, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        // First entry of the TOOL's train. Anything else in the feed is a
        // sub-component and must never be published as the product version.
        const core = data
          .filter((r) => !r.draft && !r.prerelease && typeof r.tag_name === 'string')
          .map((r) => parseTag(r.tag_name as string))
          .find((t) => t.component === CORE_COMPONENT);
        if (core) {
          latestRelease = core.display;
          softwareVersion = core.version;
        }
      }
    }
  } catch {
    // keep fallback release
  }

  return {
    stars,
    forks,
    discordMembers,
    latestRelease,
    softwareVersion,
  };
}
