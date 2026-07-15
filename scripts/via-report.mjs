// Aggregates the private cert_via share-attribution events from the
// careerops-analytics Blob store (SPEC-1b durable layer). Data lives in
// each blob's pathname (via-events/{ts}__{via}__{to}.json), so one
// list() pass is enough — no content downloads.
//
// Usage:
//   vercel env pull /tmp/venv --environment production
//   BLOB_READ_WRITE_TOKEN=$(grep BLOB_READ_WRITE_TOKEN /tmp/venv | cut -d= -f2 | tr -d '"') \
//     node scripts/via-report.mjs [--days 7]
import { list } from '@vercel/blob';

const daysArg = process.argv.indexOf('--days');
const days = daysArg > -1 ? Number(process.argv[daysArg + 1]) : null;
const since = days ? Date.now() - days * 86_400_000 : 0;

const byVia = new Map();
const byTo = new Map();
let total = 0;
let cursor;
do {
  const res = await list({ prefix: 'via-events/', cursor, limit: 1000 });
  for (const b of res.blobs) {
    // The trailing '__' anchors the third field before the random suffix.
    const m = b.pathname.match(/^via-events\/(\d+)__([a-z0-9_-]+)__([a-z0-9_-]+)__/);
    if (!m || Number(m[1]) < since) continue;
    total += 1;
    byVia.set(m[2], (byVia.get(m[2]) ?? 0) + 1);
    byTo.set(m[3], (byTo.get(m[3]) ?? 0) + 1);
  }
  cursor = res.cursor;
} while (cursor);

const fmt = (map) =>
  [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, 30);
console.log(`cert_via events${days ? ` (last ${days}d)` : ''}: ${total}`);
console.log('\nTop referrers (via):');
for (const [k, v] of fmt(byVia)) console.log(`  ${String(v).padStart(5)}  @${k}`);
console.log('\nTop landing certificates (to):');
for (const [k, v] of fmt(byTo)) console.log(`  ${String(v).padStart(5)}  @${k}`);
