import { docs } from 'collections/server';
import { type InferPageType, loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { docsContentRoute, docsImageRoute, docsRoute } from './shared';
import { i18n } from './i18n';

// See https://fumadocs.dev/docs/headless/source-api for more info
// i18n is loader-only (see ./i18n). Calls without a locale default to `en`, so
// every existing EN consumer is unaffected; the ES route passes 'es' explicitly.
export const source = loader({
  i18n,
  baseUrl: docsRoute,
  source: docs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export function getPageImage(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, 'image.png'];

  return {
    segments,
    url: `${docsImageRoute}/${segments.join('/')}`,
  };
}

export function getPageMarkdownUrl(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, 'content.md'];

  return {
    segments,
    url: `${docsContentRoute}/${segments.join('/')}`,
  };
}

const SITE_URL = 'https://career-ops.org';

// Fumadocs' getText('processed') HTML-escapes punctuation that sits in
// markdown-syntax positions: a `)` inside a URL becomes `&#x29;` (which breaks
// the whole link — `https://opencode.ai&#x29;`), `*` becomes `&#x2A;` (breaks
// bold/italic), a backtick becomes `&#x60;` (breaks inline code). Agents read
// these entities literally, so the mirror ships broken markdown. Decode them.
// (search-ops audit-md-calidad-2026-W30, leak #2 — one exporter bug, global.)
function decodeEntities(md: string): string {
  return md
    .replace(/&#x([0-9a-fA-F]+);/g, (_m, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_m, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&'); // last, so a literal &amp;lt; never double-decodes
}

// Rewrite root-relative links so an agent reading the raw markdown can resolve
// them, and keep it inside the markdown layer: absolutize every `/…` href, and
// point internal `/docs/*` links at their `.md` mirror (the site's clean-URL
// convention). Same-page `#anchors`, protocol-relative `//host`, and
// already-absolute `http(s)://` links are left untouched. (leak #3.)
function absolutizeLinks(md: string): string {
  return md.replace(/\]\((\/(?!\/)[^)\s]*)\)/g, (_m, href) => {
    const cut = href.search(/[#?]/);
    const path = cut === -1 ? href : href.slice(0, cut);
    const suffix = cut === -1 ? '' : href.slice(cut);
    const clean = path.length > 1 ? path.replace(/\/$/, '') : path;
    const isDoc =
      (clean === '/docs' || clean.startsWith('/docs/')) &&
      !/\.[a-z0-9]+$/i.test(clean); // skip assets like /docs/x.png (no .md twin)
    return `](${SITE_URL}${clean}${isDoc ? '.md' : ''}${suffix})`;
  });
}

// Shared serialization cleanup for any markdown served to agents (the docs
// mirror below and the blog dump in llms-full.txt). Strips MDX/HTML comments
// (which have leaked internal repo paths), decodes escaped entities, and
// absolutizes links.
export function normalizeAgentMarkdown(md: string): string {
  const withoutComments = md
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
    .replace(/<!--[\s\S]*?-->/g, '');
  return absolutizeLinks(decodeEntities(withoutComments));
}

export async function getLLMText(page: InferPageType<typeof source>) {
  const processed = normalizeAgentMarkdown(await page.data.getText('processed'));
  const description = page.data.description ? `\n> ${page.data.description}\n` : '';

  return `# ${page.data.title}

Source: ${SITE_URL}${page.url} (canonical HTML, identical content)
${description}
${processed}`;
}
