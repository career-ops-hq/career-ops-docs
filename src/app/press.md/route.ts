// Markdown twin of /press, for AI assistants and anyone copying facts. Served
// from a literal route directory like /changelog.md and /manifesto.md: paths
// with a file extension route reliably only that way (see src/proxy.ts).
import { getHiredCount, pressMarkdown } from '@/lib/press-data';
import { CAREEROPS_DEFINITION } from '@/lib/shared';
import { getProjectStats } from '@/lib/stats';

// Same cadence as the page, so both show the same live figures.
export const revalidate = 3600;

export async function GET() {
  const [stats, hired] = await Promise.all([getProjectStats(), getHiredCount()]);

  return new Response(pressMarkdown(stats, hired, CAREEROPS_DEFINITION), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      // Fetchable by agents, never competing with /press in the search index.
      'X-Robots-Tag': 'noindex',
    },
  });
}
