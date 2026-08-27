import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

// CSP Report-Only — observational, never blocks. After 2-4 weeks of
// console-violation triage we can flip the header name to enforcing
// `Content-Security-Policy`. Sources allowed are the actual surfaces
// in use today (Vercel Analytics, GitHub avatars, santifer.io avatar,
// YouTube thumbnails for VideoObject) — anything else surfaces as a
// warning we can investigate before lockdown.
const cspReportOnly = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  // warpchart.dev serves the home star-history chart (SVG embed) — it
  // must be whitelisted before this policy can ever flip to enforcing.
  "img-src 'self' data: blob: https://avatars.githubusercontent.com https://santifer.io https://img.youtube.com https://warpchart.dev",
  "font-src 'self' data:",
  "connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com https://api.github.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ');

// Baseline security headers applied to every route.
const securityHeaders = [
  {
    // Added 2026-07-06 AFTER fixing the www subdomain (valid cert +
    // 308 to apex) — includeSubDomains would have bricked www before
    // that. send.career-ops.org is mail-only (SPF/MX), unaffected by
    // an HTTPS-only policy.
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  { key: 'Content-Security-Policy-Report-Only', value: cspReportOnly },
];

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // The personalized signature OG card reads its serif TTF from disk at
  // request time (undici fetch rejects file: URLs); whitelist it for
  // Vercel's file tracing so the lambda bundle includes it.
  outputFileTracingIncludes: {
    '/manifesto/s/[username]/opengraph-image': [
      './src/app/manifesto/s/[username]/*.ttf',
    ],
    '/manifesto/sign-preview': ['./src/app/manifesto/s/[username]/*.ttf'],
    '/manifesto/s/[username]/card-square': [
      './src/app/manifesto/s/[username]/*.ttf',
    ],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    // Default deviceSizes top out at 3840, which over-serves the hero
    // AVIF (~195KB) to 2x-retina laptops whose ideal rung is ~2560
    // (~108KB). Content maxes at 1400px wide, so 2560 covers 2x DPR
    // with margin. (2026-06-30 audit, perf #10b.)
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920, 2560],
    // Next 16 restricts `quality` to [75] by default and silently drops any
    // other value (the request 404s), so the buffalo-dither hero's quality={45}
    // was being served at 75 (200-278KB). Whitelist the qualities actually used.
    // (2026-07-24 audit, perf HIGH.)
    qualities: [45, 60, 75],
    remotePatterns: [
      { hostname: 'avatars.githubusercontent.com' },
    ],
  },
  async rewrites() {
    return {
      // beforeFiles so these land ahead of the /docs/[[...slug]] page route,
      // which would otherwise 404 on the unknown `.md` slug. A routing rewrite
      // (not middleware) fires deterministically for file-extension paths.
      // The mirror route sets Content-Type: text/markdown + X-Robots-Tag:
      // noindex. Agent-facing markdown — search-ops audit, agent layer.
      beforeFiles: [
        // Homepage content negotiation. NOT done in src/proxy.ts: verified
        // 2026-08-10 that the proxy does not run for `/` at all (a debug
        // header set unconditionally on the root never appeared), the same
        // class of Next 16 surprise as the `.md` interception. The routing
        // layer handles it deterministically instead.
        //
        // `has` fires when Accept contains text/markdown; `missing` keeps it
        // from firing when the client also accepts HTML, so browsers and
        // Next's own RSC requests are never touched.
        {
          source: '/',
          has: [{ type: 'header', key: 'accept', value: '.*text/markdown.*' }],
          missing: [{ type: 'header', key: 'accept', value: '.*text/html.*' }],
          destination: '/llms.mdx/home/content.md',
        },
        { source: '/docs.md', destination: '/llms.mdx/docs/content.md' },
        {
          source: '/docs/:slug(.*).md',
          destination: '/llms.mdx/docs/:slug/content.md',
        },
        // The same two shapes for the non-default locales. They need a separate
        // destination because the EN mirror resolves pages without a locale,
        // which fumadocs defaults to `en` — that default is why 32 Spanish URLs
        // had no markdown twin at all. See the route header for why the locale
        // is an explicit path segment rather than an optional prefix.
        {
          source: '/:lang(es|fr)/docs.md',
          destination: '/llms.mdx/i18n/:lang/docs/content.md',
        },
        {
          source: '/:lang(es|fr)/docs/:slug(.*).md',
          destination: '/llms.mdx/i18n/:lang/docs/:slug/content.md',
        },
        // Accept negotiation for the locale docs. NOT done in src/proxy.ts:
        // verified 2026-08-20 against a production build that the proxy does
        // not run for locale-prefixed paths — /docs negotiates correctly while
        // /es/docs returns HTML with identical headers and identical code. Same
        // class of Next 16 surprise as `/` and as the `.md` interception, and
        // the same remedy: let the routing layer do it deterministically.
        //
        // These must stay AFTER the `.md` rules above, or `:slug(.*)` would
        // swallow `<url>.md` before the explicit markdown rewrite sees it.
        {
          source: '/:lang(es|fr)/docs',
          has: [{ type: 'header', key: 'accept', value: '.*text/markdown.*' }],
          missing: [{ type: 'header', key: 'accept', value: '.*text/html.*' }],
          destination: '/llms.mdx/i18n/:lang/docs/content.md',
        },
        {
          source: '/:lang(es|fr)/docs/:slug(.*)',
          has: [{ type: 'header', key: 'accept', value: '.*text/markdown.*' }],
          missing: [{ type: 'header', key: 'accept', value: '.*text/html.*' }],
          destination: '/llms.mdx/i18n/:lang/docs/:slug/content.md',
        },
      ],
    };
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        // OG/Twitter card images: keep them fetchable by share bots (no robots
        // Disallow) but out of the search index, so social previews render on
        // /docs and every /compare page. (2026-07-24 audit, technical HIGH.)
        source: '/og/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
      },
      {
        // FLOSS/fund domain verification. The spec requires text/plain, and
        // this file has NO EXTENSION — neither Vercel nor Next infers a type
        // for it, so it ships as application/octet-stream by default.
        //
        // That failure is silent in the worst way: the URL returns 200, the
        // body is correct, and a browser renders it perfectly. Only the
        // fundingjson validator objects, at submit time. Verify with
        // `curl -sI`, never with a browser. (Trap hit and documented by
        // cv-santiago on santifer.io, 2026-08-27.)
        //
        // `X-Content-Type-Options: nosniff` from securityHeaders makes getting
        // this right MORE important, not less: nothing downstream will guess.
        //
        // Ordering note: cv-santiago's warning to place this before any
        // catch-all applies to vercel.json, where the first match wins. Next's
        // headers() applies every matching rule, and securityHeaders sets no
        // Content-Type, so there is nothing to collide with here. Do not
        // "fix" the position.
        source: '/.well-known/funding-manifest-urls',
        headers: [
          { key: 'Content-Type', value: 'text/plain; charset=utf-8' },
        ],
      },
      {
        // Email-signature assets. The URL travels inside every message sent
        // from the domain, so it is fetched by mail clients on machines we do
        // not control and must stay stable for years, not months.
        //
        // `immutable` is correct here ONLY because of a contract: this URL is
        // FROZEN. If the mark is ever redrawn, publish it under a NEW filename
        // rather than overwriting this one — a client or CDN that cached it may
        // keep serving the old bytes for a year, and mail already delivered
        // will keep pointing here forever regardless.
        //
        // noindex because it exists to be fetched, not found: /press is where
        // logos are published with the context that makes them usable.
        source: '/email/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex' },
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Founding-sponsor one-pager. Fetchable by anyone with the link (it is
        // sent directly to prospects) but kept out of the index on purpose: the
        // PDF carries "$5,000 / month" and "$60,000/year", and the site's most
        // defended citable claim is that career-ops is free with no paid plans.
        // A search engine or LLM extracting the price out of the PDF's context
        // would manufacture exactly the pricing drift that claim exists to stop
        // — auto-review sites already invented tiers for career-ops once.
        // Indexing buys nothing here: nobody discovers a media kit by search.
        //
        // must-revalidate because the numbers inside are live (stars, cloners,
        // dated 11 Aug 2026) and the file gets regenerated and overwritten in
        // place; a cached copy would keep serving stale figures.
        source: '/founding-sponsor.pdf',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex' },
          { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
        ],
      },
      {
        // RFC 8288 discovery, on the URLs an agent is most likely to hit
        // first. These advertise the agent-facing layer at the HTTP level, so
        // a client that only issues HEAD finds llms.txt and the markdown
        // alternate without parsing HTML. Vary: Accept is REQUIRED on every
        // content-negotiated route: the same URL returns HTML or markdown
        // depending on the request, so a cache that does not key on Accept can
        // serve markdown to a browser or HTML to an agent.
        // (search-ops verdict, 2026-08-10.)
        source: '/',
        headers: [
          {
            key: 'Link',
            value:
              '</llms.txt>; rel="alternate"; type="text/plain"; title="llms.txt", </llms-full.txt>; rel="alternate"; type="text/plain"; title="llms-full.txt", </>; rel="alternate"; type="text/markdown"',
          },
          { key: 'Vary', value: 'Accept' },
        ],
      },
      {
        source: '/docs/:path*',
        headers: [
          {
            key: 'Link',
            value:
              '</llms.txt>; rel="alternate"; type="text/plain"; title="llms.txt"',
          },
          { key: 'Vary', value: 'Accept' },
        ],
      },
      {
        source: '/docs',
        headers: [
          {
            key: 'Link',
            value:
              '</llms.txt>; rel="alternate"; type="text/plain"; title="llms.txt"',
          },
          { key: 'Vary', value: 'Accept' },
        ],
      },
    ];
  },
};

export default withMDX(config);
