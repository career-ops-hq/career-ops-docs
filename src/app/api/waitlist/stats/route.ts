import { timingSafeEqual } from 'node:crypto';
import { list } from '@vercel/blob';
import { ASSISTANTS, JOINS_PREFIX, LOADS_PREFIX } from '@/lib/waitlist';

export const dynamic = 'force-dynamic';

type Row = {
  loads: number;
  joins: number;
  countries: Record<string, number>;
  assistants: Record<string, number>;
  /** Joins by how many real assistants they marked ("0" = only None). */
  assistantCount: Record<string, number>;
};

async function eventFields(prefix: string): Promise<string[][]> {
  const out: string[][] = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix: `${prefix}/`, cursor, limit: 1000 });
    for (const b of page.blobs) {
      out.push(b.pathname.slice(prefix.length + 1).split('__').slice(0, -1));
    }
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  return out;
}

function authorized(req: Request): boolean {
  const secret = process.env.WAITLIST_STATS_TOKEN;
  if (!secret) return false;
  const given = Buffer.from(req.headers.get('authorization') ?? '');
  const want = Buffer.from(`Bearer ${secret}`);
  return given.length === want.length && timingSafeEqual(given, want);
}

// Daily totals for warpchart, by day, ref and page language. Never an email or
// a single row: the email blobs are not even listed here.
export async function GET(req: Request) {
  if (!authorized(req)) return new Response(null, { status: 404 });

  const rows = new Map<string, Row>();
  const rowOf = (day: string, ref: string, locale: string) => {
    const key = `${day}|${ref}|${locale}`;
    let row = rows.get(key);
    if (!row) {
      row = { loads: 0, joins: 0, countries: {}, assistants: {}, assistantCount: {} };
      rows.set(key, row);
    }
    return row;
  };

  for (const [day, ref, locale] of await eventFields(LOADS_PREFIX)) {
    rowOf(day, ref, locale).loads += 1;
  }
  for (const [day, ref, locale, country, flags] of await eventFields(JOINS_PREFIX)) {
    const row = rowOf(day, ref, locale);
    row.joins += 1;
    row.countries[country] = (row.countries[country] ?? 0) + 1;
    ASSISTANTS.forEach((a, i) => {
      if (flags[i] === '1') row.assistants[a] = (row.assistants[a] ?? 0) + 1;
    });
    const marked = String(ASSISTANTS.filter((a, i) => a !== 'none' && flags[i] === '1').length);
    row.assistantCount[marked] = (row.assistantCount[marked] ?? 0) + 1;
  }

  const days = [...rows.entries()]
    .map(([key, row]) => {
      const [day, ref, locale] = key.split('|');
      return { day, ref, locale, ...row };
    })
    .sort((a, b) => a.day.localeCompare(b.day) || a.ref.localeCompare(b.ref));
  return Response.json({ days }, { headers: { 'Cache-Control': 'no-store' } });
}
