// A ceiling on waitlist writes, so a script can't inflate the totals or the Blob
// bill without limit. Each request writes one blob. Counted per function instance
// and with no IP on purpose: the waitlist keeps no IP, no cookie and no
// fingerprint. It is a ceiling, not an identity check: a flood also turns away
// real people until the minute ends, and scaling out raises it.
const WINDOW_MS = 60_000;
const CAP = { join: 30, load: 120 } as const;

const windows = { join: { start: 0, used: 0 }, load: { start: 0, used: 0 } };

export function underWaitlistCap(kind: keyof typeof CAP, now = Date.now()): boolean {
  const w = windows[kind];
  if (now - w.start >= WINDOW_MS) {
    w.start = now;
    w.used = 0;
  }
  w.used += 1;
  return w.used <= CAP[kind];
}
