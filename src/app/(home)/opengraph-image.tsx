import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

// Force Node runtime so we can read the banner from the filesystem
// (public/og-banner.jpg) at build time. The default edge runtime would
// require an HTTP fetch, but during the production build the site is
// not yet deployed — the fetch returns 404 HTML and ImageResponse
// throws "Invalid JPEG".
export const runtime = 'nodejs';

export const size = { width: 1200, height: 630 };
// PNG output (lossless) so the brand mark and wordmark stay crisp when
// LinkedIn / X / Slack re-compress the image for their own caches.
// Stacking JPEG quantization on top of ImageResponse's own JPEG output
// produced visibly blurry text and aura artefacts; PNG keeps the strip
// sharp at any downscale and the file size is still reasonable
// (~400-500 KB) for an OG card.
export const contentType = 'image/png';
export const alt = 'career-ops — You got the job. And it didn\'t cost you a thing.';

// OG image — hero banner from the core repo (docs/hero-banner.jpg) as
// background + a quiet brand strip centered on the bottom edge with
// the "co" mark and "career-ops.org". Reusing the core's hero banner
// keeps the visual identity continuous between repo and site — the
// same image people see in the README is what they share. The brand
// strip adds identity recognition (mark same as favicon/navbar) and
// an implicit CTA via the URL.
export default async function OG() {
  const bannerPath = join(process.cwd(), 'public', 'og-banner.jpg');
  // The font is read from disk, not fetched. A build-time fetch to
  // fonts.gstatic.com made every deployment depend on a third party being
  // reachable at that instant: on 7 Sep it timed out (ETIMEDOUT) and took the
  // whole build down from a route that renders one static image. The sibling
  // route under manifesto/s/[username] already vendors its font for the same
  // reason. The file is the exact bytes that URL served, so the rendering is
  // unchanged, and the path is whitelisted for file tracing in next.config.mjs.
  const [bannerBuffer, serifBuffer] = await Promise.all([
    readFile(bannerPath),
    readFile(join(process.cwd(), 'src/app/(home)/InstrumentSerif-Regular.ttf')),
  ]);
  const instrumentSerifData = serifBuffer.buffer.slice(
    serifBuffer.byteOffset,
    serifBuffer.byteOffset + serifBuffer.byteLength,
  ) as ArrayBuffer;

  const bannerDataUri = `data:image/jpeg;base64,${bannerBuffer.toString('base64')}`;

  const brand = 'hsl(26, 73%, 51%)';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          background: '#000',
        }}
      >
        {/* Banner background — full bleed, cover */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bannerDataUri}
          alt=""
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        {/* Brand strip — centered horizontally on bottom edge */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              fontFamily: 'Instrument Serif',
            }}
          >
            <span
              style={{
                background: brand,
                width: 72,
                height: 72,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: 56,
                borderRadius: 11,
                letterSpacing: '0.01em',
                lineHeight: 1,
                paddingBottom: 6,
              }}
            >
              co
            </span>
            <span style={{ fontSize: 38, color: 'white', lineHeight: 1 }}>career-ops.org</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Instrument Serif',
          data: instrumentSerifData,
          style: 'normal',
          weight: 400,
        },
      ],
    },
  );
}
