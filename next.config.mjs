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
        { source: '/docs.md', destination: '/llms.mdx/docs/content.md' },
        {
          source: '/docs/:slug(.*).md',
          destination: '/llms.mdx/docs/:slug/content.md',
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
    ];
  },
};

export default withMDX(config);
