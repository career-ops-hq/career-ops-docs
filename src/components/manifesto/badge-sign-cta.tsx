'use client';

// Prominent sign CTA on the badge landing (SPEC-4b): the one conversion
// action for a visitor who arrived from someone's README badge. Fires a
// fire-and-forget beacon (sign_click) as the tab opens GitHub — the
// k-metric's middle step between badge arrival and ledger delta.
// Navigation is never blocked or delayed by the beacon.

export function BadgeSignCta({
  signUrl,
  via,
  to,
}: {
  signUrl: string;
  via: string;
  to: string;
}) {
  function onClick() {
    try {
      const payload = JSON.stringify({ via, to });
      const sent = navigator.sendBeacon?.('/api/track-sign-click', payload);
      if (!sent) {
        fetch('/api/track-sign-click', {
          method: 'POST',
          body: payload,
          keepalive: true,
        }).catch(() => {});
      }
    } catch {
      // analytics must never interfere with the signing intent
    }
  }

  return (
    <a
      href={signUrl}
      target="_blank"
      rel="noreferrer noopener"
      onClick={onClick}
      className="mt-5 inline-block w-full sm:w-auto rounded-lg px-6 py-3 text-sm font-medium"
      style={{ backgroundColor: '#f4ede4', color: '#14100c' }}
    >
      Sign on GitHub →
    </a>
  );
}
