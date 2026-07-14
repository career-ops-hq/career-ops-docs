import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { instrumentSerif, instrumentSerifRegular } from '@/lib/fonts';
import {
  findSignature,
  getGithubDisplayName,
  signatureAnchor,
  signatureAvatarUrl,
} from '@/lib/signatures';
import { CAREEROPS_DEFINITION } from '@/lib/shared';

// Path-based share URL for a signature (signature-flywheel spec v2 §2).
// Hash fragments never reach the server, so /manifesto#sig-x gives every
// signer the same generic OG card; this route exists so each signer's
// share renders a personalized card (avatar + one-liner + ordinal). The
// Ledger Bot posts this URL in its merge comment.
//
// Human visitors get a signature-certificate landing (2026-07-14,
// Santiago: cold social traffic converts better on a focused page than
// dumped at a wall anchor, and the page should LOOK like the OG card —
// dark editorial, serif, amber — not plain text). The wall stays one
// click away.
//
// 5-minute ISR bridge; the merge webhook (/api/revalidate-signatures)
// revalidates these pages on demand.
export const revalidate = 300;

const SIGNATURES_GITHUB_URL =
  'https://github.com/santifer/career-ops/blob/main/SIGNATURES.md';

// Warm near-black + cream + amber — same palette as the OG cards, fixed
// dark regardless of site theme: the certificate is an artifact, not a
// document, and renders identically everywhere, like the share card.
const CARD_BG = '#14100c';
const INK = '#f4ede4';
const AMBER = '#e08a44';

type Props = { params: Promise<{ username: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const sig = await findSignature(username);
  const title = sig
    ? `Signatory #${sig.ordinal} · The CareerOps Manifesto`
    : 'The CareerOps Manifesto';
  const description = sig?.evidence
    ? `"${sig.evidence}" · @${sig.username}`
    : sig
      ? `@${sig.username} signed The CareerOps Manifesto.`
      : CAREEROPS_DEFINITION;
  return {
    title,
    description,
    // Thin share pages: the canonical document is the manifesto itself.
    // noindex keeps thousands of near-duplicate URLs out of the index;
    // OG scrapers read the card metadata regardless.
    alternates: { canonical: 'https://career-ops.org/manifesto' },
    robots: { index: false, follow: true },
    openGraph: {
      type: 'article',
      siteName: 'career-ops',
      url: `https://career-ops.org/manifesto/s/${username.toLowerCase()}`,
      title,
      description,
    },
  };
}

export default async function SignatureSharePage({ params }: Props) {
  const { username } = await params;
  const sig = await findSignature(username);

  if (!sig) {
    return (
      <main className="mx-auto w-full max-w-xl px-6 py-24 text-center">
        <h1 className="text-fd-foreground text-2xl font-medium tracking-tight">
          This signature isn&rsquo;t on the wall yet
        </h1>
        <p className="mt-4 text-fd-muted-foreground leading-relaxed">
          Signatures are merged in waves and appear here within minutes of
          being merged. If you just opened your pull request, hold tight; if
          it was merged a while ago, the wave that carries it is on its way.
        </p>
        <p className="mt-8">
          <Link
            href="/manifesto"
            className="text-fd-foreground underline underline-offset-4"
          >
            Read The CareerOps Manifesto →
          </Link>
        </p>
      </main>
    );
  }

  // v2.3: the ledger's bot-stamped Display Name is the source; the
  // profile API is only a fallback for pre-v2.3 lines.
  const displayName = sig.name ?? (await getGithubDisplayName(sig));
  const wallTarget = `/manifesto#${signatureAnchor(sig)}`;

  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-12 md:py-20">
      {/* The certificate — visually the OG card, as a page. */}
      <div
        className="rounded-2xl px-5 py-5 md:px-6 md:py-6"
        style={{
          backgroundColor: CARD_BG,
          backgroundImage:
            'radial-gradient(ellipse 90% 70% at 50% -10%, rgba(224, 138, 68, 0.10), transparent 60%)',
          color: INK,
        }}
      >
        <div className="rounded-xl border border-[rgba(244,237,228,0.14)] px-4 py-10 md:px-10 md:py-12 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-[rgba(244,237,228,0.55)]">
            The CareerOps Manifesto
          </p>

          <Image
            src={signatureAvatarUrl(sig, 240)}
            alt={`GitHub avatar of @${sig.username}`}
            width={112}
            height={112}
            className="mx-auto mt-8 rounded-full border-2 border-[rgba(244,237,228,0.25)]"
          />

          <h1
            className={`${instrumentSerifRegular.className} mt-7 text-4xl md:text-5xl leading-tight`}
          >
            Signatory #{sig.ordinal}
          </h1>

          <p className="mt-3 text-base text-[rgba(244,237,228,0.85)]">
            <a
              href={`https://github.com/${sig.username}`}
              target="_blank"
              rel="nofollow ugc noreferrer noopener"
              className="underline underline-offset-4 decoration-[rgba(244,237,228,0.4)] hover:decoration-current"
            >
              @{sig.username}
            </a>
            {displayName && <span> · {displayName}</span>}
          </p>

          {sig.evidence && (
            <p
              className={`${instrumentSerif.className} mt-7 text-xl md:text-2xl leading-relaxed`}
              style={{ color: AMBER }}
            >
              &ldquo;{sig.evidence}&rdquo;
            </p>
          )}

          <div className="mx-auto mt-9 h-px w-24 bg-[rgba(244,237,228,0.22)]" />

          <p className="mt-6 text-sm text-[rgba(244,237,228,0.6)] tracking-wide">
            {sig.date && (
              <>
                Signed <time dateTime={sig.date}>{sig.date}</time> ·{' '}
              </>
            )}
            career-ops.org/manifesto
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/manifesto"
              className="w-full sm:w-auto rounded-lg px-5 py-2.5 text-sm font-medium"
              style={{ backgroundColor: INK, color: CARD_BG }}
            >
              Read the manifesto →
            </Link>
            <Link
              href="/manifesto#how-to-sign"
              className="w-full sm:w-auto rounded-lg border border-[rgba(244,237,228,0.3)] px-5 py-2.5 text-sm font-medium text-[rgba(244,237,228,0.9)]"
            >
              Add your signature
            </Link>
          </div>
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-fd-muted-foreground">
        Every signature is a public commit in the{' '}
        <a
          href={SIGNATURES_GITHUB_URL}
          target="_blank"
          rel="noreferrer noopener"
          className="underline underline-offset-2"
        >
          career-ops repository
        </a>
        .{' '}
        <Link href={wallTarget} className="underline underline-offset-2">
          View this one on the wall →
        </Link>
        {sig.sourceUrl && (
          <>
            {' '}
            <a
              href={sig.sourceUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="underline underline-offset-2"
            >
              · Source ↗
            </a>
          </>
        )}
      </p>
    </main>
  );
}
