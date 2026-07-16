import { trackBadgeSignClick } from '@/lib/track';

// Beacon target for the badge landing's sign CTA (SPEC-4b measurement).
// navigator.sendBeacon posts a tiny JSON {via, to} as the visitor leaves
// for GitHub; the event lands in the private analytics store. Always
// 204, never an error surface — analytics must not be observable or
// breakable from the client.

export async function POST(req: Request) {
  try {
    const raw = (await req.text()).slice(0, 500);
    const data = JSON.parse(raw) as { via?: unknown; to?: unknown };
    const via = typeof data.via === 'string' ? data.via : '';
    const to = typeof data.to === 'string' ? data.to : '';
    if (via && to) await trackBadgeSignClick(via, to);
  } catch {
    // malformed beacon — drop silently
  }
  return new Response(null, { status: 204 });
}
