import { NextResponse, type NextRequest } from 'next/server';

// Agent-facing content negotiation for /docs/**.
//
// AI agents (Claude Code, Codex, ChatGPT, Perplexity) reach for markdown two
// ways that the site silently 404'd or returned HTML for until 2026-07-22:
//   1. `<docs-url>.md`        — append `.md` to a docs URL (the pattern behind
//                               ~59% of agent format-404s in the Mintlify
//                               docs-url-discovery bench).
//   2. `Accept: text/markdown` — HTTP content negotiation.
// Both resolve to the clean markdown mirror at /llms.mdx/docs/<slug>/content.md
// (see src/app/llms.mdx/docs), which returns text/markdown + X-Robots-Tag:
// noindex so the raw markdown never competes with the canonical HTML in search.
//
// Split by mechanism, each using the right tool: `<docs-url>.md` is a
// next.config `beforeFiles` rewrite (a routing rewrite fires deterministically
// for file-extension paths — middleware interception of `.md` proved
// unreliable across the Next 16 middleware→proxy migration, 404'ing on the
// `.md` before reaching the mirror). This proxy handles ONLY the Accept header,
// which a static rewrite cannot read.
//
// Humans are never affected: a browser always lists `text/html` in Accept and
// never appends `.md`, so neither path fires for them. (search-ops audits
// audit-capa-agentica-2026-W30 §2 + audit-md-calidad-2026-W30.)

const DOCS_PREFIX = '/docs/';

function mirrorRewrite(req: NextRequest, slug: string): NextResponse {
  const url = req.nextUrl.clone();
  url.search = '';
  // Mirror route expects the last segment to be `content.md`; a leading slug
  // may be empty (the /docs index) or nested (reference/modes).
  url.pathname = `/llms.mdx/docs/${slug ? `${slug}/` : ''}content.md`;
  return NextResponse.rewrite(url);
}

function prefersMarkdown(accept: string | null): boolean {
  if (!accept) return false;
  // Fire only when markdown is explicitly requested AND html is not — i.e. a
  // programmatic client. Browsers and Next's own RSC requests never match.
  return accept.includes('text/markdown') && !accept.includes('text/html');
}

export function proxy(req: NextRequest): NextResponse {
  const { pathname } = req.nextUrl;

  // `<docs-url>.md` is served by the next.config rewrite → the markdown mirror.
  // Leave it for the routing layer (see the file header for why).
  if (pathname.endsWith('.md')) return NextResponse.next();

  // `Accept: text/markdown` on the human URL → the same markdown mirror.
  if (prefersMarkdown(req.headers.get('accept'))) {
    const slug = pathname === '/docs' ? '' : pathname.slice(DOCS_PREFIX.length);
    return mirrorRewrite(req, slug);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/docs', '/docs/:path*'],
};
