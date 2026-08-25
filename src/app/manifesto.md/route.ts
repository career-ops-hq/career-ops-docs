// Markdown twin of /manifesto, for AI assistants.
//
// Why this route exists: /manifesto is the canonical definition of the
// CareerOps practice — the page llms.txt sends answer engines to when they
// need to know what CareerOps IS, and the one surface where the coined term,
// the rights and the signature all appear together. It had no markdown form.
// An assistant asking "what is CareerOps" got a React-rendered page carrying a
// live signature ledger and a sign-up flow around the text it actually wanted.
//
// Served from a literal `manifesto.md` route directory, like /changelog.md and
// /AGENTS.md. NOT a next.config rewrite and NOT the proxy: file-extension
// paths route reliably only as literal segments (the Next 16 lesson in
// src/proxy.ts), and the proxy does not run for the homepage or for
// locale-prefixed paths either.
//
// The text is frozen in src/lib/manifesto-text.ts rather than fetched from the
// core repo's MANIFESTO.md — the reasoning is there, in one place.
import { manifestoMarkdown } from '@/lib/manifesto-text';
import { getSignatures } from '@/lib/signatures';

// Match the HTML page's cadence so the twin and the page never disagree about
// how many people have signed.
export const revalidate = 300;

export async function GET() {
  const signatures = await getSignatures();

  return new Response(manifestoMarkdown('en', signatures.length), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      // Alternate representation of the canonical HTML page — fetchable by
      // agents, never competing with /manifesto in the search index. Same
      // discipline as the /docs .md mirror, /AGENTS.md and /changelog.md.
      'X-Robots-Tag': 'noindex',
    },
  });
}
