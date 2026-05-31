// Live project stats consumed by Schema.org JSON-LD (interactionStatistic).
// GitHub stars/forks fetched from public API with 1h ISR; Discord member count
// is manual snapshot until a bot token is configured.
const REPO_API = 'https://api.github.com/repos/santifer/career-ops';

export type ProjectStats = {
  stars: number;
  forks: number;
  discordMembers: number;
};

export async function getProjectStats(): Promise<ProjectStats> {
  let stars = 0;
  let forks = 0;
  try {
    const res = await fetch(REPO_API, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      stars = data.stargazers_count ?? 0;
      forks = data.forks_count ?? 0;
    }
  } catch {
    // fail silent, fall back to zero so schema still renders
  }
  return {
    stars,
    forks,
    discordMembers: 3354, // snapshot 2026-05-31 — replace with API fetch when Discord bot token wired
  };
}
