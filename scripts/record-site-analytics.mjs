#!/usr/bin/env node
// Appends a dated row to metrics/site-analytics.tsv from Vercel Web Analytics.
//
// Background: on 2026-08-12 a site-traffic figure reached 12 sponsor emails
// with nobody able to say what day it came from. The fix was never a better
// argument, it was a series with provenance. This writes that series.
//
// `vercel metrics` (CLI 54.x) exposes Web Analytics — pageviews and any
// dimension — with `--format json`. It is NOT called "analytics", which is why
// it was missed twice; found by venture-ops on 2026-08-15.
//
// `uniques` stays blank on purpose. The schema advertises a
// `unique/visitor_id` aggregation but it returns empty at every window and
// granularity tried (30d, 7d, with and without grouping). Rather than compute
// something adjacent and let it be read as the real figure, the column is left
// empty and filled by hand from the dashboard. An empty cell is honest; a
// derived one gets quoted.
//
// Usage:  node scripts/record-site-analytics.mjs [--window 30d] [--dry-run]

import { execFileSync } from 'node:child_process';
import { appendFileSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, '..', 'metrics', 'site-analytics.tsv');
const METRIC = 'vercel.analytics_pageview.count';
const PROJECT = 'career-ops-docs';

const args = process.argv.slice(2);
const windowArg = args.includes('--window')
  ? args[args.indexOf('--window') + 1]
  : '30d';
const dryRun = args.includes('--dry-run');

function metrics(extra = []) {
  const out = execFileSync(
    'vercel',
    ['metrics', METRIC, '-p', PROJECT, '--since', windowArg, '-F', 'json', ...extra],
    { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 },
  );
  return JSON.parse(out.slice(out.indexOf('{')));
}

const KEY = 'vercel_analytics_pageview_count_sum';

// Total pageviews over the window.
const total = metrics().summary?.[0]?.[KEY];
if (typeof total !== 'number') {
  console.error('No pude leer el total de pageviews. Nada escrito.');
  process.exit(1);
}

// Referrers, summed across time buckets. The CLI returns per-bucket rows, so
// grouping has to happen here; `--limit` caps groups PER BUCKET, not overall.
const byRef = new Map();
for (const row of metrics(['--group-by', 'referrer_hostname', '--limit', '15']).data ?? []) {
  // An absent or empty referrer is direct traffic. The CLI renders it as
  // "(not set)", which reads like a data gap in a row a sponsor might see.
  const host = row.referrer_hostname?.trim() ? row.referrer_hostname : 'direct';
  byRef.set(host, (byRef.get(host) ?? 0) + (row[KEY] ?? 0));
}
const topSources = [...byRef.entries()]
  .sort((a, b) => b[1] - a[1])
  .slice(0, 3)
  .map(([h, n]) => `${h} ${n}`)
  .join(' · ');

// Date only: the row records which day it was read, not the minute.
const readAt = new Date().toISOString().slice(0, 10);
const row = [
  readAt,
  windowArg,
  '', // uniques — dashboard only, see header comment
  String(total),
  topSources,
  'vercel metrics (CLI)',
].join('\t');

if (dryRun) {
  console.log(row);
  process.exit(0);
}

const existing = readFileSync(OUT, 'utf8');
if (existing.split('\n').some((l) => l.startsWith(`${readAt}\t${windowArg}\t`))) {
  console.log(`Ya hay fila para ${readAt} / ${windowArg}. Nada escrito.`);
  process.exit(0);
}
appendFileSync(OUT, `${row}\n`);
console.log(`✅ ${row}`);
console.log('   uniques queda vacío: rellénalo a mano desde el dashboard.');
