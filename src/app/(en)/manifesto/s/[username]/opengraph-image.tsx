import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import {
  findSignature,
  getGithubDisplayName,
  hasFirstContributionMark,
  signatureAvatarUrl,
} from '@/lib/signatures';

// Personalized OG card for /manifesto/s/[username] — the share edge of
// the signature flywheel. Design matches the launch OG cards: warm
// near-black, hairline frame, Instrument Serif display, amber accent.
export const alt = 'Signature · The CareerOps Manifesto';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const BG = '#14100c';
const INK = '#f4ede4';
const AMBER = '#e08a44';

export default async function Image({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const [sig, serifBuffer] = await Promise.all([
    findSignature(username),
    // undici fetch() rejects file: URLs, so read from disk; the path is
    // whitelisted for Vercel's file tracing in next.config.mjs
    // (outputFileTracingIncludes).
    readFile(
      join(
        process.cwd(),
        'src/app/manifesto/s/[username]/InstrumentSerif-Regular.ttf',
      ),
    ),
  ]);
  const serif = serifBuffer.buffer.slice(
    serifBuffer.byteOffset,
    serifBuffer.byteOffset + serifBuffer.byteLength,
  ) as ArrayBuffer;

  const avatarUrl = sig ? signatureAvatarUrl(sig, 240) : null;
  const [displayName, firstContribution] = sig
    ? await Promise.all([
        sig.name ?? getGithubDisplayName(sig),
        hasFirstContributionMark(sig),
      ])
    : [null, false];

  // Keep one-liners card-sized; the full line lives on the wall.
  const quote =
    sig?.evidence && sig.evidence.length > 140
      ? `${sig.evidence.slice(0, 137)}...`
      : sig?.evidence;

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
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            padding: '0 100px',
            textAlign: 'center',
          }}
        >
          {sig && (
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
          )}

          {avatarUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatarUrl}
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
              fontSize: sig ? 64 : 84,
              marginTop: 30,
              lineHeight: 1.05,
              display: 'flex',
            }}
          >
            {sig
              ? `Signatory #${sig.ordinal} · @${sig.username}`
              : 'The CareerOps Manifesto'}
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

          {quote ? (
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
              {`"${quote}"`}
            </div>
          ) : (
            <div
              style={{
                fontFamily: 'Instrument Serif',
                fontSize: 34,
                color: AMBER,
                marginTop: 26,
                display: 'flex',
              }}
            >
              Whose side is your agent on?
            </div>
          )}

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

          {/* First-contribution mark — same post-confirmation label the
              certificate page reads; the diamond is a CSS-drawn glyph
              because satori has no font fallback for ✦. */}
          {firstContribution && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginTop: 18,
                color: AMBER,
                fontSize: 19,
              }}
            >
              <div
                style={{
                  width: 9,
                  height: 9,
                  backgroundColor: AMBER,
                  transform: 'rotate(45deg)',
                  display: 'flex',
                }}
              />
              first public contribution on GitHub
            </div>
          )}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Instrument Serif',
          data: serif,
          style: 'normal',
          weight: 400,
        },
      ],
    },
  );
}
