import { NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

// On-demand revalidation for the signature wall + share pages, called by
// the Ledger Bot's GitHub Action after each merge wave (signature-flywheel
// spec v2 §1: hour-long ISR staleness kills the launch-day share moment;
// the 5-minute ISR on the pages is only a bridge for webhook failures).
//
// Auth: shared secret in SIGNATURES_REVALIDATE_SECRET (Vercel env), sent
// as an `x-revalidate-secret` header or a `?secret=` query param.
//
//   curl -X POST -H "x-revalidate-secret: $SECRET" \
//     https://career-ops.org/api/revalidate-signatures

export async function POST(req: Request) {
  const expected = process.env.SIGNATURES_REVALIDATE_SECRET;
  const provided =
    req.headers.get('x-revalidate-secret') ??
    new URL(req.url).searchParams.get('secret');

  if (!expected || provided !== expected) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  // Next 16 signature: (tag, profile) — 'max' expires the tag everywhere
  // immediately, which is exactly the wave-merge semantics we want.
  revalidateTag('signatures', 'max');
  revalidatePath('/manifesto');
  revalidatePath('/manifesto/s/[username]', 'page');

  return NextResponse.json({
    ok: true,
    revalidated: ['tag:signatures', '/manifesto', '/manifesto/s/*'],
    at: new Date().toISOString(),
  });
}
