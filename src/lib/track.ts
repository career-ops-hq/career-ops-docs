import { put } from '@vercel/blob';

// Private attribution events (SPEC-1b durable layer + SPEC-4b funnel):
// one small JSON blob per event in the PRIVATE careerops-analytics
// store — no counters to race, aggregation happens offline
// (scripts/via-report.mjs). Strictly fire-and-forget: a Blob outage must
// never break the certificate flow, and nothing here is ever surfaced
// publicly.
//
// GitHub logins are [A-Za-z0-9-], so the whole event fits safely in the
// pathname — the report aggregates with list() calls, no content
// downloads. The body repeats the event as JSON for forward
// compatibility. Trailing '__e' terminator: addRandomSuffix appends
// '-{rand}' right before the extension, which would otherwise corrupt
// the last data field (caught by the launch-day E2E: 'llwp' parsed as
// 'llwp-bwbg').
async function putEvent(
  prefix: string,
  evt: string,
  via: string,
  to: string,
): Promise<void> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return;
  try {
    const safe = (v: string) =>
      v.toLowerCase().replace(/[^a-z0-9-]/g, '_').slice(0, 40);
    const event = { evt, via: safe(via), to: safe(to), at: new Date().toISOString() };
    await put(
      `${prefix}/${Date.now()}__${event.via}__${event.to}__e.json`,
      JSON.stringify(event),
      {
        access: 'private',
        addRandomSuffix: true,
        contentType: 'application/json',
      },
    );
  } catch {
    // fire-and-forget by contract
  }
}

/** Attributed certificate arrival (?via= on a share or badge click). */
export async function trackCertVia(via: string, to: string): Promise<void> {
  return putEvent('via-events', 'cert_via', via, to);
}

/** Sign-button click on the badge landing (SPEC-4b k-metric: badge
 *  arrivals → sign clicks → ledger delta answers "how many badge
 *  visitors end up signing"). */
export async function trackBadgeSignClick(
  via: string,
  to: string,
): Promise<void> {
  return putEvent('sign-clicks', 'sign_click', via, to);
}
