// Markdown twin of /changelog, for AI assistants.
//
// Why this route exists: the Vercel agent-channel measurement for the 7 days
// to 2026-08-17 put /changelog in the top 5 routes requested by VERIFIED live
// assistants (chatgpt-user, gpt-actions, claude-user, oai-searchbot,
// perplexitybot) — yet /changelog had no markdown surface at all. It is not a
// /docs page, so neither the `.md` rewrite nor the Accept negotiation in
// src/proxy.ts covered it, and it was missing from the /llms.txt index. An
// assistant asking about "what changed in the latest career-ops release" got
// a React-rendered HTML page and no clean passage to quote.
//
// Served from a literal `changelog.md` route directory — the same proven
// pattern as /AGENTS.md, /llms.txt and /llms-full.txt. Deliberately NOT a
// next.config rewrite or a proxy match: file-extension paths route reliably
// as literal segments, which is the lesson from the Next 16 middleware→proxy
// migration documented in src/proxy.ts.
//
// Citability, per the GEO doctrine (self-contained passages, direct answer
// first): every heading names the subject. The HTML page can say "v1.22.0"
// under a "Changelog" h1 because a human reads the page; a model quoting one
// extracted passage cannot see that context, so each release heading here
// reads "career-ops v1.22.0" and the lead paragraph answers the latest-version
// question outright.
import { getChangelog } from '@/lib/releases';

// Match the HTML page's cadence so both reflect the same release feed.
export const revalidate = 3600;

const GITHUB_RELEASES = 'https://github.com/santifer/career-ops/releases';

function formatDate(iso: string): string {
  if (!iso) return '';
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

function unavailable(): string {
  return `# career-ops changelog

The release feed is momentarily unavailable. The complete, canonical release
history is on GitHub: ${GITHUB_RELEASES}

career-ops is an open-source, local-first AI job-search tool. Full index for
agents: https://career-ops.org/llms.txt
`;
}

export async function GET() {
  // Editorial decision (venture-ops via search-ops, 2026-08-17): this page
  // tells ONE series, the tool's. The `web-*` component train is filtered out
  // rather than labelled, because a page whose correctness depends on the
  // consumer reading a label correctly is a fragile protection — our own
  // parser was the first consumer that failed to read it. A single series
  // needs no interpretation. If the dashboard ever becomes a first-class
  // surface, it gets its own page, never a mixed one.
  const releases = (await getChangelog()).filter((r) => r.isCore);

  let body: string;
  if (releases.length === 0) {
    body = unavailable();
  } else {
    // Anchor "latest" to the career-ops train specifically. The repo also
    // ships a `web-*` component train from the same feed, and it is often
    // the newest entry — quoting it as "the latest career-ops release" would
    // state a false version number on the page assistants read most.
    const latest = releases.find((r) => r.isCore) ?? releases[0];
    const lead = `# career-ops changelog

The latest release of **career-ops** is **${latest.version}**, published ${formatDate(latest.date)}. career-ops is an open-source, local-first AI job-search tool that ships several times a week; this page is generated from the project's GitHub Releases and updates itself.

Updates never touch your data. The system layer (scripts, modes, templates, docs) is replaceable; your layer (\`cv.md\`, \`config/profile.yml\`, \`data/*\`, \`reports/*\`, \`output/*\`) is not touched by an update. See the Data Contract: https://career-ops.org/docs

Canonical release history: ${GITHUB_RELEASES}
HTML version of this page: https://career-ops.org/changelog
`;

    const entries = releases.map((r) => {
      const sections = r.sections
        .map((s) => {
          const items = s.items
            .map((it) => `- ${it.scope ? `**${it.scope}:** ` : ''}${it.text}`)
            .join('\n');
          return `### ${s.label}\n\n${items}`;
        })
        .join('\n\n');
      // Subject-bearing heading: a quoted passage must stand on its own, and
      // must not pass a sub-component's version off as the tool's.
      const subject = r.isCore ? 'career-ops' : `career-ops ${r.component}`;
      return `## ${subject} ${r.version} — ${formatDate(r.date)}\n\nRelease notes: ${r.url}\n\n${sections}`;
    });

    body = `${lead}\n---\n\n${entries.join('\n\n---\n\n')}\n`;
  }

  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      // Alternate representation of the canonical HTML page — fetchable by
      // agents, never competing with /changelog in the search index. Same
      // discipline as the /docs .md mirror and /AGENTS.md.
      'X-Robots-Tag': 'noindex',
    },
  });
}
