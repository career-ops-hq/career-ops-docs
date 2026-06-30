// Live project stats consumed by Schema.org JSON-LD (interactionStatistic),
// llms.txt, and the footer/home chips. GitHub stars/forks + the latest
// release tag are fetched from the public API with 1h ISR. Every value is
// guarded by a last-known-good floor (src/lib/shared.ts) so a transient
// unauthenticated-API failure can NEVER render "0 stars" into llms.txt or
// zero out the schema counters — that was the single highest-severity
// finding of the 2026-06-30 SEO audit.
import { STATS_FLOOR, LATEST_RELEASE_FALLBACK } from './shared';

const REPO_API = 'https://api.github.com/repos/santifer/career-ops';
const RELEASES_API =
  'https://api.github.com/repos/santifer/career-ops/releases/latest';

export type ProjectStats = {
  stars: number;
  forks: number;
  discordMembers: number;
  /** Latest core release, normalised to a leading "v" (e.g. "v1.15.0"). */
  latestRelease: string;
  /** Same release without the "v" prefix, for schema softwareVersion. */
  softwareVersion: string;
};

// The core repo tags releases as "career-ops-v1.15.0"; the site wants
// "v1.15.0" (display) and "1.15.0" (schema). Normalise both shapes.
function normaliseTag(tag: string): { display: string; version: string } {
  const stripped = tag.replace(/^career-ops-/, '').trim();
  const display = stripped.startsWith('v') ? stripped : `v${stripped}`;
  return { display, version: display.replace(/^v/, '') };
}

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

  let { display: latestRelease, version: softwareVersion } =
    normaliseTag(LATEST_RELEASE_FALLBACK);

  try {
    const res = await fetch(RELEASES_API, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      if (typeof data.tag_name === 'string' && data.tag_name.trim()) {
        ({ display: latestRelease, version: softwareVersion } = normaliseTag(
          data.tag_name,
        ));
      }
    }
  } catch {
    // keep fallback release
  }

  return {
    stars,
    forks,
    discordMembers: STATS_FLOOR.discordMembers,
    latestRelease,
    softwareVersion,
  };
}
