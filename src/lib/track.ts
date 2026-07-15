import { put } from '@vercel/blob';

// Private share-attribution events (SPEC-1b point 5, durable layer
// approved by warpchart 2026-07-15): one small JSON blob per cert_via
// landing in the PRIVATE careerops-analytics store — no counters to
// race, aggregation happens offline (scripts/via-report.mjs). Strictly
// fire-and-forget: a Blob outage must never break the certificate flow,
// and nothing here is ever surfaced publicly.
export async function trackCertVia(via: string, to: string): Promise<void> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return;
  try {
    // GitHub logins are [A-Za-z0-9-], so the whole event fits safely in
    // the pathname — scripts/via-report.mjs aggregates with a single
    // list() call, no content downloads. The body repeats the event as
    // JSON for forward compatibility.
    const safe = (v: string) =>
      v.toLowerCase().replace(/[^a-z0-9-]/g, '_').slice(0, 40);
    const event = {
      evt: 'cert_via',
      via: safe(via),
      to: safe(to),
      at: new Date().toISOString(),
    };
    // Trailing '__e' terminator: addRandomSuffix appends '-{rand}' right
    // before the extension, which would otherwise corrupt the last data
    // field (caught by the launch-day E2E: 'llwp' parsed as 'llwp-bwbg').
    await put(
      `via-events/${Date.now()}__${event.via}__${event.to}__e.json`,
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
