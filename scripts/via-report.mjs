// Aggregates the private attribution events from the careerops-analytics
// Blob store (SPEC-1b durable layer + SPEC-4b badge funnel). Data lives
// in each blob's pathname ({prefix}/{ts}__{via}__{to}__e.json), so list()
// passes are enough — no content downloads.
//
// Usage:
//   vercel env pull /tmp/venv --environment production
//   BLOB_READ_WRITE_TOKEN=$(grep BLOB_READ_WRITE_TOKEN /tmp/venv | cut -d= -f2 | tr -d '"') \
//     node scripts/via-report.mjs [--days 7]
import { list } from '@vercel/blob';

const daysArg = process.argv.indexOf('--days');
const days = daysArg > -1 ? Number(process.argv[daysArg + 1]) : null;
const since = days ? Date.now() - days * 86_400_000 : 0;

async function collect(prefix) {
  const byVia = new Map();
  const byTo = new Map();
  let total = 0;
  let cursor;
  do {
    const res = await list({ prefix: `${prefix}/`, cursor, limit: 1000 });
    for (const b of res.blobs) {
      // The trailing '__' anchors the third field before the random suffix.
      const m = b.pathname.match(
        new RegExp(`^${prefix}/(\\d+)__([a-z0-9_-]+)__([a-z0-9_-]+)__`),
      );
      if (!m || Number(m[1]) < since) continue;
      total += 1;
      byVia.set(m[2], (byVia.get(m[2]) ?? 0) + 1);
      byTo.set(m[3], (byTo.get(m[3]) ?? 0) + 1);
    }
    cursor = res.cursor;
  } while (cursor);
  return { total, byVia, byTo };
}

const fmt = (map) =>
  [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, 30);
const window = days ? ` (last ${days}d)` : '';

const arrivals = await collect('via-events');
console.log(`cert_via events${window}: ${arrivals.total}`);
console.log('\nTop referrers (via):');
for (const [k, v] of fmt(arrivals.byVia)) console.log(`  ${String(v).padStart(5)}  @${k}`);
console.log('\nTop landing certificates (to):');
for (const [k, v] of fmt(arrivals.byTo)) console.log(`  ${String(v).padStart(5)}  @${k}`);

// SPEC-4b badge funnel: badge arrivals (via=badge--*) → sign clicks on
// the badge landing → compare with the ledger delta for the same window
// to answer "how many badge visitors end up signing" (k-metric,
// kill-rule 2026-07-22). Signing finishes on GitHub, so the last step
// joins against SIGNATURES.md growth, not a client event.
const clicks = await collect('sign-clicks');
const badgeArrivals = [...arrivals.byVia.entries()]
  .filter(([k]) => k.startsWith('badge--'))
  .reduce((sum, [, v]) => sum + v, 0);
console.log(`\nBadge funnel${window}:`);
console.log(`  arrivals from badges (via=badge--*): ${badgeArrivals}`);
console.log(`  sign clicks on badge landings:       ${clicks.total}`);
if (clicks.total) {
  console.log('\n  Sign clicks by landing certificate:');
  for (const [k, v] of fmt(clicks.byTo)) console.log(`  ${String(v).padStart(5)}  @${k}`);
}
console.log(
  '  → close the funnel against the ledger delta for the same window' +
    ' (git log --since on SIGNATURES.md).',
);
