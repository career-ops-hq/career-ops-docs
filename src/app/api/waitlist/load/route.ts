import { trackWaitlistLoad } from '@/lib/track';
import { normalizeRef, WAITLIST_LOCALES, type WaitlistLocale } from '@/lib/waitlist';

// Beacon from the waitlist page on load: the "click" of warpchart's funnel,
// because GitHub doesn't report clicks out of a README. Always 204, as in
// /api/track-sign-click.
export async function POST(req: Request) {
  try {
    const raw = (await req.text()).slice(0, 500);
    const data = JSON.parse(raw) as { ref?: unknown; locale?: unknown };
    if (WAITLIST_LOCALES.includes(data.locale as WaitlistLocale)) {
      await trackWaitlistLoad(normalizeRef(data.ref), data.locale as WaitlistLocale);
    }
  } catch {
    // malformed beacon: drop silently
  }
  return new Response(null, { status: 204 });
}
