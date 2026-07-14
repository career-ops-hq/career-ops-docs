// Community signatures for /manifesto — fetched from the core repo's
// SIGNATURES.md, parsed into the wall + the /manifesto/s/[username] share
// pages. Self-maintaining like releases.ts: a transient fetch failure
// degrades to an empty list rather than breaking the build.
//
// Freshness: tagged 'signatures' so the Ledger Bot's merge webhook can
// revalidate on demand (POST /api/revalidate-signatures), with a 5-minute
// ISR bridge as fallback if the webhook is delayed (launch-day spec:
// hour-long staleness kills the share moment).
//
// SIGNATURES.md line format is FROZEN per signature-flywheel spec v2 D4
// (pipe separator; the em-dash draft is superseded). The `id:` field is
// the signer's immutable numeric GitHub user ID, appended by the Ledger
// Bot at merge time — signers never write it:
//
//   - @username | Name (optional) | YYYY-MM-DD | "optional one-liner" | id:12345678
//
// Only @username is required; fields after it are optional and classified
// by shape, not position. Lines that don't start with "- @" (headings,
// prose, blank lines) are ignored, so the file can carry an intro and the
// honesty/fraud headers without confusing the parser.

const SIGNATURES_RAW_URL =
  'https://raw.githubusercontent.com/santifer/career-ops/main/SIGNATURES.md';

export type Signature = {
  /** GitHub username, without the leading @ (mutable — logins get renamed) */
  username: string;
  /** Immutable numeric GitHub user ID (from the bot-appended id: field) */
  id: string | null;
  /** Source of the signature — the GitHub discussion (or PR) it came
   *  from, bot-stamped as `src:<url>`. Traceability: every line points
   *  at its verifiable origin. Optional; older lines simply lack it. */
  sourceUrl: string | null;
  /** Display name, if the signer provided one */
  name: string | null;
  /** ISO date (YYYY-MM-DD), if provided */
  date: string | null;
  /** Optional one-line "what changed in my search" evidence */
  evidence: string | null;
  /** 1-based position in the ledger — "Signatory #N" */
  ordinal: number;
};

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const ID_RE = /^id:(\d+)$/;

/** Canonical DOM anchor for a signature: immutable ID when the bot has
 *  stamped one, username as fallback for hand-merged early lines. */
export function signatureAnchor(sig: Signature): string {
  return `sig-${sig.id ?? sig.username}`;
}

/** GitHub avatar URL — by immutable ID when available (survives login
 *  renames), by username as fallback. */
export function signatureAvatarUrl(sig: Signature, size = 96): string {
  // Both forms live on avatars.githubusercontent.com — the only avatar
  // host whitelisted in next.config images.remotePatterns.
  return sig.id
    ? `https://avatars.githubusercontent.com/u/${sig.id}?s=${size}`
    : `https://avatars.githubusercontent.com/${sig.username}?s=${size}`;
}

function parseLine(line: string): Omit<Signature, 'ordinal'> | null {
  const m = line.match(/^-\s+@([A-Za-z0-9](?:[A-Za-z0-9-]{0,38}))\s*(.*)$/);
  if (!m) return null;
  const sig: Omit<Signature, 'ordinal'> = {
    username: m[1],
    id: null,
    name: null,
    date: null,
    evidence: null,
    sourceUrl: null,
  };
  // Fields are pipe-separated; classify each by shape rather than trusting
  // position, so omitted optionals never shift meaning.
  for (const raw of m[2].split('|')) {
    const field = raw.trim();
    if (!field) continue;
    const idMatch = field.match(ID_RE);
    if (idMatch) sig.id = idMatch[1];
    else if (field.startsWith('src:')) {
      const url = field.slice(4).trim();
      if (/^https:\/\/github\.com\//.test(url)) sig.sourceUrl = url;
    } else if (DATE_RE.test(field)) sig.date = field;
    else if (/^[“"].*[”"]$/.test(field)) sig.evidence = field.slice(1, -1).trim();
    else if (!sig.name) sig.name = field;
  }
  return sig;
}

export async function getSignatures(): Promise<Signature[]> {
  try {
    const res = await fetch(SIGNATURES_RAW_URL, {
      next: { revalidate: 300, tags: ['signatures'] },
    });
    if (!res.ok) return [];
    const text = await res.text();
    const seen = new Set<string>();
    const signatures: Signature[] = [];
    for (const line of text.split('\n')) {
      const sig = parseLine(line.trim());
      if (!sig) continue;
      // Dedupe by immutable ID when present (usernames get freed and can
      // recur); fall back to username for pre-bot lines.
      const key = sig.id ? `id:${sig.id}` : sig.username.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      signatures.push({ ...sig, ordinal: signatures.length + 1 });
    }
    return signatures;
  } catch {
    return [];
  }
}

/** Case-insensitive lookup by username (share URLs carry the login). */
export async function findSignature(
  username: string,
): Promise<Signature | null> {
  const signatures = await getSignatures();
  const needle = username.toLowerCase();
  return (
    signatures.find((s) => s.username.toLowerCase() === needle) ?? null
  );
}

/** Public display name from the signer's GitHub profile (format v2.2
 *  removed the Name field from the ledger; the profile is the source).
 *  Cached 24h per user. GITHUB_TOKEN env (read-only PAT) lifts the
 *  unauthenticated 60 req/hr ceiling — without it this degrades to null
 *  under launch-day load and surfaces render @username only. */
export async function getGithubDisplayName(ref: {
  id?: string | null;
  username: string;
}): Promise<string | null> {
  try {
    const url = ref.id
      ? `https://api.github.com/user/${ref.id}`
      : `https://api.github.com/users/${ref.username}`;
    const res = await fetch(url, {
      headers: process.env.GITHUB_TOKEN
        ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
        : undefined,
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const name = typeof data?.name === 'string' ? data.name.trim() : '';
    return name || null;
  } catch {
    return null;
  }
}

/** ISO timestamp of the last commit touching SIGNATURES.md — the ledger
 *  lines only carry dates, so the "last one N minutes ago" dynamic norm
 *  needs the commit time. Same tag + 5-minute cadence as the wall; null
 *  on any failure (the norm simply doesn't render). */
export async function getLedgerLastSignedAt(): Promise<string | null> {
  try {
    const res = await fetch(
      'https://api.github.com/repos/santifer/career-ops/commits?path=SIGNATURES.md&per_page=1',
      { next: { revalidate: 300, tags: ['signatures'] } },
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data?.[0]?.commit?.committer?.date ?? null;
  } catch {
    return null;
  }
}
