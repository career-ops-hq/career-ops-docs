// Single source for the prefilled sign-on-GitHub deep link. The widget
// (sign-preview.tsx) and the non-signer invitation state on the
// certificate route both build from HERE so the frozen strings can never
// fork. Category slug CONFIRMED AND FROZEN by the maintainer (2026-07-14
// 22:10; renames require prior IPC). EMPTY_BODY is byte-frozen with the
// maintainer's matcher v2.4.2 — changing one character breaks his
// template-vs-edited detection; IPC him FIRST.

export const DISCUSSION_CATEGORY = 'signatures';

export const EMPTY_BODY =
  '<!-- Optional: replace the dash below with one sentence about your search, or what you want hiring to become. Leaving just the dash is a perfectly valid signature. -->\n-';

export function signOnGitHubUrl(body?: string): string {
  const clean = (body ?? '').trim();
  return `https://github.com/santifer/career-ops/discussions/new?category=${DISCUSSION_CATEGORY}&title=${encodeURIComponent('Signing the manifesto')}&body=${encodeURIComponent(clean || EMPTY_BODY)}`;
}
