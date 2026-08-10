import { buildLlmsTxt } from '@/lib/llms-index';

// The homepage's agent representation. An agent that requests `/` with
// `Accept: text/markdown` lands here via src/proxy.ts.
//
// Why the llms.txt body rather than a markdown rendering of the home page:
// the home is marketing copy (hero, rotator, social proof) that carries no
// information an agent needs. Its correct agent version is the canonical
// index — what the project is, the live stats, and a token-counted map of
// every docs page. One artifact, one place to maintain. (search-ops verdict,
// 2026-08-10, after the Cloudflare agent-ready scan showed content
// negotiation was scoped to /docs only, leaving the site's front door and
// both citation money pages returning HTML to agents.)
//
// noindex for the same reason as the /docs mirror: fetchable by agents,
// never competing with the canonical HTML in search.
export const revalidate = 3600;

export async function GET() {
  return new Response(await buildLlmsTxt(), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'X-Robots-Tag': 'noindex',
      // The same URL serves HTML or markdown depending on Accept, so caches
      // must key on it. Without this, Cloudflare can hand markdown to a
      // browser or HTML to an agent.
      Vary: 'Accept',
    },
  });
}
