import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import {
  findSignature,
  getGithubDisplayName,
  hasFirstContributionMark,
  signatureAvatarUrl,
} from '@/lib/signatures';

// Square (1080x1080) downloadable signature card — the Instagram /
// WhatsApp / stories format the wide OG card can't serve. REAL signers
// only: no ledger entry → 404 (pre-sign previews stay watermarked on
// /manifesto/sign-preview and are deliberately not downloadable). The
// personal verification URL is printed on the card so every native-image
// share carries its own proof-of-signature pointer.

const BG = '#14100c';
const INK = '#f4ede4';
const AMBER = '#e08a44';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ username: string }> },
) {
  const { username } = await params;
  const [sig, serifBuffer] = await Promise.all([
    findSignature(username),
    readFile(
      join(
        process.cwd(),
        'src/app/manifesto/s/[username]/InstrumentSerif-Regular.ttf',
      ),
    ),
  ]);
  if (!sig) return new Response('not found', { status: 404 });

  const [displayName, firstContribution] = await Promise.all([
    sig.name ?? getGithubDisplayName(sig),
    hasFirstContributionMark(sig),
  ]);
  const serif = serifBuffer.buffer.slice(
    serifBuffer.byteOffset,
    serifBuffer.byteOffset + serifBuffer.byteLength,
  ) as ArrayBuffer;

  const quote =
    sig.evidence && sig.evidence.length > 160
      ? `${sig.evidence.slice(0, 157)}...`
      : sig.evidence;

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
            top: 30,
            left: 30,
            right: 30,
            bottom: 30,
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
            padding: '0 96px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 21,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(244, 237, 228, 0.55)',
              display: 'flex',
            }}
          >
            The CareerOps Manifesto
          </div>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={signatureAvatarUrl(sig, 280)}
            alt=""
            width={150}
            height={150}
            style={{
              borderRadius: 9999,
              marginTop: 44,
              border: '2px solid rgba(244, 237, 228, 0.25)',
            }}
          />

          <div
            style={{
              fontFamily: 'Instrument Serif',
              fontSize: 76,
              marginTop: 40,
              lineHeight: 1.05,
              display: 'flex',
            }}
          >
            {`Signatory #${sig.ordinal}`}
          </div>

          <div
            style={{
              fontSize: 30,
              color: 'rgba(244, 237, 228, 0.85)',
              marginTop: 16,
              display: 'flex',
            }}
          >
            {displayName ? `@${sig.username} · ${displayName}` : `@${sig.username}`}
          </div>

          {quote && (
            <div
              style={{
                fontFamily: 'Instrument Serif',
                fontSize: 38,
                color: AMBER,
                marginTop: 40,
                lineHeight: 1.3,
                display: 'flex',
              }}
            >
              {`"${quote}"`}
            </div>
          )}

          <div
            style={{
              width: 120,
              height: 2,
              backgroundColor: 'rgba(244, 237, 228, 0.22)',
              marginTop: 48,
              display: 'flex',
            }}
          />
          <div
            style={{
              fontSize: 24,
              letterSpacing: '0.04em',
              color: 'rgba(244, 237, 228, 0.6)',
              marginTop: 26,
              display: 'flex',
            }}
          >
            {`career-ops.org/manifesto/s/${sig.username.toLowerCase()}`}
          </div>
          {sig.date && (
            <div
              style={{
                fontSize: 21,
                color: 'rgba(244, 237, 228, 0.45)',
                marginTop: 12,
                display: 'flex',
              }}
            >
              {`Signed ${sig.date}`}
            </div>
          )}

          {/* First-contribution mark — same post-confirmation label the
              certificate page reads; the diamond is a CSS-drawn glyph
              because satori has no font fallback for ✦. */}
          {firstContribution && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginTop: 20,
                color: AMBER,
                fontSize: 22,
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
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
      width: 1080,
      height: 1080,
      fonts: [
        { name: 'Instrument Serif', data: serif, style: 'normal', weight: 400 },
      ],
      headers: {
        'Cache-Control': 'public, max-age=300, s-maxage=300',
      },
    },
  );
}
