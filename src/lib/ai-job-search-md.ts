import { aiJobSearchGuide } from '@/lib/blog-source';
import { normalizeAgentMarkdown } from '@/lib/source';

// Markdown twin of the category guide, for AI assistants. A literal route, like
// /manifesto.md and /changelog.md: extension paths route reliably only as literal
// segments, and the proxy does not cover this page. Top-level pages need this
// route, an llms.txt line and a guard invariant (scripts/verify-agent-layer.mjs).
export async function aiJobSearchMarkdown(locale: 'en' | 'es'): Promise<Response> {
  const page = aiJobSearchGuide(locale);
  const url = `https://career-ops.org${page.url}`;
  // Drop the explicit [#id] anchors: they are page markup, not text for a reader.
  const body = normalizeAgentMarkdown(await page.data.getText('processed')).replace(
    /^(#{1,6} .*?) \[#[^\]]+\]$/gm,
    '$1',
  );
  return new Response(`# ${page.data.title} (${url})\n\n${body}\n`, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      Link: `<${url}>; rel="canonical"`,
      // Alternate form of the HTML page, never competing with it in the index.
      'X-Robots-Tag': 'noindex',
      // Same URL, HTML or markdown depending on Accept. Next.js drops the Vary
      // set in next.config for these responses (search-ops D3, 30-sep).
      Vary: 'Accept',
    },
  });
}
