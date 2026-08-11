const SITE_URL = 'https://career-ops.org';

// AI crawlers explicitly allowed. career-ops.org wants to be cited by
// ChatGPT / Claude / Perplexity / Gemini etc. — that channel converts
// repo virality into inbound. Default-allow works but explicit signals
// intent and survives policy changes by individual bots.
const aiCrawlers = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'CCBot',
  'Applebot-Extended',
  'cohere-ai',
  'Meta-ExternalAgent',
  'Bytespider',
  // Bingbot powers Bing Copilot retrieval; explicit allow keeps the
  // signal aligned with the Bing Webmaster Tools property and lifts the
  // platform's GEO score (Bing Copilot was the only platform tracking
  // flat in the 2026-05-10 audit).
  'Bingbot',
];

// Content Signals (contentsignals.org). All three yes, deliberately, and it
// is the opposite of the CDN default (`ai-train=no`).
//
// The project's public position is that it wants to be read, cited AND
// trained on: being part of the corpus is the only channel that moves a
// model's parametric knowledge, and grounded citation is already won. An
// explicit declaration also protects against a CDN changing its defaults and
// quietly dropping the site out of the next training crawl.
//
// This is a positioning statement as much as a technical one. Ratified by
// search-ops 2026-08-10 and sent to venture-ops as FYI. Do not flip any of
// these to `no` without both of them.
const CONTENT_SIGNAL = 'search=yes, ai-input=yes, ai-train=yes';

// Written by hand rather than via MetadataRoute.Robots because Next's
// metadata helper cannot emit non-standard directives, and Content-Signal is
// one. Same output as before plus the signal line.
// Emitted at the top of the served file. venture-ops condition, 2026-08-10:
// `ai-train=yes` is right for the public documentation of an open-source
// project and would be wrong on any surface that serves data about people.
// The scope has to be legible in the file itself so nobody copies it to the
// wrong site a year from now.
const SCOPE_NOTE = `# Content-Signal below applies to this site: the public documentation of an
# open-source project. It does NOT carry over to any surface serving candidate
# data. Those require the opposite policy.`;

function buildRobots(): string {
  const blocks: string[] = [
    // Only /api/ (POST-only endpoints) is blocked. /og/ is NOT disallowed:
    // Disallow is the wrong tool for "fetchable but not indexed" — it also
    // stops LinkedIn/Slack/Discord/X bots from fetching the preview cards of
    // /docs and every /compare page, blanking their social shares. Those
    // routes carry X-Robots-Tag: noindex (next.config) instead. Same pattern
    // as the /llms.mdx/ markdown mirror.
    `User-Agent: *\nContent-Signal: ${CONTENT_SIGNAL}\nAllow: /\nDisallow: /api/`,
    ...aiCrawlers.map(
      (ua) => `User-Agent: ${ua}\nContent-Signal: ${CONTENT_SIGNAL}\nAllow: /`,
    ),
  ];

  return `${SCOPE_NOTE}\n\n${blocks.join('\n\n')}\n\nHost: ${SITE_URL}\nSitemap: ${SITE_URL}/sitemap.xml\n`;
}

export function GET() {
  return new Response(buildRobots(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
