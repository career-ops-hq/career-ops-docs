import { NextResponse, type NextRequest } from 'next/server';

// Agent-facing content negotiation for /docs/**.
//
// AI agents (Claude Code, Codex, ChatGPT, Perplexity) reach for markdown two
// ways that the site silently 404'd or returned HTML for until 2026-07-22:
//   1. `<docs-url>.md`        — append `.md` to a docs URL (the pattern behind
//                               ~59% of agent format-404s in the Mintlify
//                               docs-url-discovery bench).
//   2. `Accept: text/markdown` — HTTP content negotiation.
// A complete, clean markdown mirror already existed at
// /llms.mdx/docs/<slug>/content.md (see src/app/llms.mdx/docs) — it was just
// invisible. Both branches below rewrite to that mirror, which returns
// text/markdown (+ X-Robots-Tag: noindex so the raw markdown never competes
// with the canonical HTML in search).
//
// Humans are never affected: a browser always lists `text/html` in Accept and
// never appends `.md`, so neither branch fires for them. (search-ops audit
// audit-capa-agentica-2026-W30 §2.)

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

export function middleware(req: NextRequest): NextResponse {
  const { pathname } = req.nextUrl;
  const rel = pathname === '/docs' ? '' : pathname.slice(DOCS_PREFIX.length);

  // 1. `<docs-url>.md` → markdown mirror (a distinct, cache-safe URL).
  if (pathname.endsWith('.md')) {
    return mirrorRewrite(req, rel.slice(0, -'.md'.length));
  }

  // 2. `Accept: text/markdown` → markdown mirror at the same human URL.
  if (prefersMarkdown(req.headers.get('accept'))) {
    return mirrorRewrite(req, rel);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/docs', '/docs/:path*'],
};
