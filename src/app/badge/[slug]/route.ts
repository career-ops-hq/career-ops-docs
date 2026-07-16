import { findSignature } from '@/lib/signatures';
import { badgeSvg, type BadgeHeight, type BadgeTheme } from '@/lib/badge-svg';

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
  req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const { searchParams } = new URL(req.url);
  // ?h=28|56 — the asset ships at the EXACT render size (the client
  // never scales), per the size-toggle spec. Whitelisted; default 28.
  const h: BadgeHeight = searchParams.get('h') === '56' ? 56 : 28;
  // ?theme=paper — cream variant for the <picture> dark-README source
  // (prefers-color-scheme). Whitelisted; default dark.
  const theme: BadgeTheme =
    searchParams.get('theme') === 'paper' ? 'paper' : 'dark';
  // 404s are NEVER cacheable (warpchart flag): if someone loads their
  // badge before signing and Camo caches the 404, the badge stays broken
  // right after they sign — the worst possible moment to fail.
  const notFound = () =>
    new Response('not found', {
      status: 404,
      headers: { 'Cache-Control': 'no-store' },
    });
  const username = slug.toLowerCase().replace(/\.svg$/, '');
  if (!USERNAME_RE.test(username)) {
    return notFound();
  }
  const sig = await findSignature(username);
  if (!sig) {
    // ALWAYS 404 for non-signers — this is the counterfeit barrier.
    return notFound();
  }
  return new Response(badgeSvg(h, { n: sig.ordinal, theme }), {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
