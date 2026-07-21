import type { MetadataRoute } from 'next';

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

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Internal/asset endpoints, not human content. /llms.mdx/ (the
        // agent-facing markdown mirror) is deliberately NOT disallowed: agents
        // must be able to fetch it, and its X-Robots-Tag: noindex keeps the raw
        // markdown out of the search index without blocking retrieval.
        disallow: ['/api/', '/og/'],
      },
      ...aiCrawlers.map((userAgent) => ({ userAgent, allow: '/' })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
