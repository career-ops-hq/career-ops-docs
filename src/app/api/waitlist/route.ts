import { createHash } from 'node:crypto';
import { head, put } from '@vercel/blob';
import { z } from 'zod';
import { trackWaitlistJoin } from '@/lib/track';
import {
  ASSISTANTS,
  COUNTRIES,
  EMAILS_PREFIX,
  WAITLIST_LOCALES,
  assistantFlags,
  normalizeRef,
} from '@/lib/waitlist';

export const runtime = 'nodejs';

const Body = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  country: z.enum(COUNTRIES as [string, ...string[]]),
  // "None" excludes the rest, here as in the form.
  assistants: z
    .array(z.enum(ASSISTANTS))
    .min(1)
    .refine((a) => !a.includes('none') || a.length === 1),
  locale: z.enum(WAITLIST_LOCALES),
  ref: z.string().optional(),
  hp: z.string().optional(), // honeypot: bots fill hidden fields
});

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }

  const parsed = Body.safeParse(json);
  if (!parsed.success) {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }
  const { email, country, assistants, locale, ref, hp } = parsed.data;

  // Pretend success, so the trap doesn't show.
  if (hp) return Response.json({ ok: true });

  // One blob per address, named by its hash: a second signup finds the file and
  // stops here, so it neither counts again nor changes the original date, and the
  // answer looks the same either way. A delete request finds the file from the
  // address alone.
  const pathname = `${EMAILS_PREFIX}/${createHash('sha256').update(email).digest('hex')}.json`;
  try {
    await put(pathname, JSON.stringify({ email, at: new Date().toISOString() }), {
      access: 'private',
      addRandomSuffix: false,
      allowOverwrite: false,
      contentType: 'application/json',
    });
  } catch (err) {
    // The SDK has no error type for "already exists", so look before failing.
    const exists = await head(pathname).then(
      () => true,
      () => false,
    );
    if (exists) return Response.json({ ok: true });
    console.error('waitlist put failed:', err);
    return Response.json({ error: 'Could not save' }, { status: 502 });
  }

  await trackWaitlistJoin(
    normalizeRef(ref),
    locale,
    country.toLowerCase(),
    assistantFlags(assistants),
  );
  return Response.json({ ok: true });
}
