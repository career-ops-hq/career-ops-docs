import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { getGithubDisplayName, getSignatures } from '@/lib/signatures';

// Pre-signing reward preview: renders the share card a prospective signer
// WOULD get, from just a GitHub username (?u=login) — public avatar +
// "Signatory #<next ordinal>" placeholder. No ledger data involved; this
// exists so the how-to-sign section can show people their card BEFORE
// they open a PR (the "what happens after I sign?" uncertainty is the
// biggest non-dev friction). Cached 5 minutes per username.

const BG = '#14100c';
const INK = '#f4ede4';
const AMBER = '#e08a44';

const USERNAME_RE = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const raw = url.searchParams.get('u') ?? '';
  const username = raw.trim().replace(/^@/, '');
  if (!USERNAME_RE.test(username)) {
    return new Response('invalid username', { status: 400 });
  }
  // Optional one-liner preview (&q=): sanitized to the same constraints
  // the ledger enforces — single line, no pipes, card-sized.
  const quote = (url.searchParams.get('q') ?? '')
    .replace(/[|\n\r]/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/^["\u201C]|["\u201D]$/g, '')
    .trim()
    .slice(0, 140);

  const [signatures, serifBuffer, avatarOk, displayName] = await Promise.all([
    getSignatures(),
    readFile(
      join(
        process.cwd(),
        'src/app/manifesto/s/[username]/InstrumentSerif-Regular.ttf',
      ),
    ),
    // Probe the public avatar; nonexistent users get a card without one
    // instead of a satori crash.
    fetch(`https://avatars.githubusercontent.com/${username}?s=240`, {
      method: 'HEAD',
      next: { revalidate: 3600 },
    })
      .then((r) => r.ok)
      .catch(() => false),
    getGithubDisplayName({ username }),
  ]);
  const serif = serifBuffer.buffer.slice(
    serifBuffer.byteOffset,
    serifBuffer.byteOffset + serifBuffer.byteLength,
  ) as ArrayBuffer;

  const nextOrdinal = signatures.length + 1;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          backgroundColor: BG,
          color: INK,
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 28,
            left: 28,
            right: 28,
            bottom: 28,
            border: '1px solid rgba(244, 237, 228, 0.14)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'rotate(-16deg)',
            fontFamily: 'Instrument Serif',
            fontSize: 150,
            letterSpacing: '0.12em',
            color: 'rgba(244, 237, 228, 0.06)',
          }}
        >
          PREVIEW
        </div>
        <div
          style={{
            position: 'absolute',
            top: 46,
            right: 50,
            display: 'flex',
            border: '1px solid rgba(224, 138, 68, 0.65)',
            borderRadius: 9999,
            padding: '6px 16px',
            fontSize: 17,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: AMBER,
          }}
        >
          Preview · not signed
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            padding: '0 100px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 19,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(244, 237, 228, 0.55)',
              display: 'flex',
            }}
          >
            The CareerOps Manifesto
          </div>

          {avatarOk && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`https://avatars.githubusercontent.com/${username}?s=240`}
              alt=""
              width={120}
              height={120}
              style={{
                borderRadius: 9999,
                marginTop: 34,
                border: '2px solid rgba(244, 237, 228, 0.25)',
              }}
            />
          )}

          <div
            style={{
              fontFamily: 'Instrument Serif',
              fontSize: 64,
              marginTop: 30,
              lineHeight: 1.05,
              display: 'flex',
            }}
          >
            {`Signatory #${nextOrdinal} · @${username}`}
          </div>

          {displayName && (
            <div
              style={{
                fontSize: 26,
                color: 'rgba(244, 237, 228, 0.75)',
                marginTop: 14,
                display: 'flex',
              }}
            >
              {displayName}
            </div>
          )}

          <div
            style={{
              fontFamily: 'Instrument Serif',
              fontSize: 34,
              color: AMBER,
              marginTop: 26,
              lineHeight: 1.25,
              display: 'flex',
            }}
          >
            {quote ? `"${quote}"` : 'Whose side is your agent on?'}
          </div>

          <div
            style={{
              width: 120,
              height: 2,
              backgroundColor: 'rgba(244, 237, 228, 0.22)',
              marginTop: 36,
              display: 'flex',
            }}
          />
          <div
            style={{
              fontSize: 21,
              letterSpacing: '0.05em',
              color: 'rgba(244, 237, 228, 0.6)',
              marginTop: 22,
              display: 'flex',
            }}
          >
            career-ops.org/manifesto
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Instrument Serif', data: serif, style: 'normal', weight: 400 },
      ],
      headers: {
        'Cache-Control': 'public, max-age=300, s-maxage=300',
      },
    },
  );
}
