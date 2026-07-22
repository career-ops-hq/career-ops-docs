// Agent entry point for career-ops.org. A thin POINTER, never a copy: the
// canonical agent instructions for the tool live in the repo and must not be
// mirrored here (zero drift). Served at /AGENTS.md — the path agent tooling
// probes (agentic-seo etc.). GO'd by the maintainer via search-ops
// (audit-md-calidad-2026-W30). Kept in sync only with the surface URLs it
// lists, not with any external content.
export const dynamic = 'force-static';

const AGENTS = `# AGENTS.md — career-ops.org

career-ops.org is the documentation and narrative site for **career-ops**, an
open-source, local-first AI job-search tool. This file is a pointer, not a
copy — the canonical, always-current agent instructions live in the repo.

## Using the tool (career-ops)

The tool runs entirely on the user's machine, inside their AI coding CLI
(Claude Code, Codex, OpenCode, and others). There is no hosted product, no
account, and no API to call on this domain — you install and run it locally.
The canonical agent instructions ship in the repository:

- https://raw.githubusercontent.com/santifer/career-ops/main/AGENTS.md (raw)
- https://github.com/santifer/career-ops/blob/main/AGENTS.md (rendered)
- Repository: https://github.com/santifer/career-ops

## Reading this site (career-ops.org)

- Index for agents: https://career-ops.org/llms.txt
- Full-context dump: https://career-ops.org/llms-full.txt
- Every docs page has a clean markdown twin: append \`.md\` to any /docs URL
  (e.g. https://career-ops.org/docs/faq.md), or send \`Accept: text/markdown\`.
`;

export function GET() {
  return new Response(AGENTS, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      // Alternate representation of repo-canonical instructions; keep the
      // pointer out of the search index (same discipline as the .md mirror).
      'X-Robots-Tag': 'noindex',
    },
  });
}
