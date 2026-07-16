import { findSignature } from '@/lib/signatures';
import { BADGE_SVG } from '@/lib/badge-svg';

// Signatory badge (SPEC-4 piece 1) — a custom brand SVG, deliberately not
// a generic shields.io: the co mark + launch palette, self-backgrounded so
// ONE asset reads beautifully on both light and dark GitHub READMEs.
// Anti-counterfeit guarantee: the IMAGE itself 404s for non-signers —
// GitHub's Camo proxy fetches the image directly and cannot follow the
// wrapping link, so a pasted badge only ever renders for real ledger
// entries. Measurement happens via clicks on the wrapping link (each
// badge links to the signer's own certificate), never via renders.
//
// Served at /badge/{username}.svg (the .svg suffix is optional).

const USERNAME_RE = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/;

// The badge SVG lives in src/lib/badge-svg.ts (single source, shared
// with the certificate's inline preview). v2 design per career-ops-ux
// review; anti-WebKit hardening (no clipPath) per their pixelation
// diagnosis.

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const username = slug.toLowerCase().replace(/\.svg$/, '');
  if (!USERNAME_RE.test(username)) {
    return new Response('not found', { status: 404 });
  }
  const sig = await findSignature(username);
  if (!sig) {
    // ALWAYS 404 for non-signers — this is the counterfeit barrier.
    return new Response('not found', { status: 404 });
  }
  return new Response(BADGE_SVG, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
