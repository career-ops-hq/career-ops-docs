'use client';

import { useEffect, useMemo, useState } from 'react';
import { signOnGitHubUrl } from '@/lib/sign-link';

// THE signing widget (how-to-sign): single published path per Santiago's
// final call — a prefilled GitHub DISCUSSION under the signer's own
// session (not an issue: thousands of signature issues would pollute the
// maintenance tracker and the issues/30d vital-signs metric; discussions
// touch nothing). Three steps: write your line (optional) → Sign on
// GitHub → Start discussion there. Identity comes from the discussion
// author; the Ledger Bot commits the line with credit. Organic PRs are
// still processed but the page no longer documents them.
//
// The card preview is the motivational layer: Santiago's real Signatory
// #1 card by default; a purely-optional username field personalizes it
// (PREVIEW-watermarked server-side to prevent screenshot impersonation).

const USERNAME_RE = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/;
const DEFAULT_CARD = '/manifesto/s/santifer/opengraph-image';
// Same prompt the maintainer surfaces on the GitHub side — byte-aligned.
const LINE_PROMPT =
  'what changed in your search, or what you want hiring to become';

// Sign-link strings live in src/lib/sign-link.ts (single frozen source,
// shared with the certificate invitation state). Verified (warpchart,
// real HTTP): /discussions/new prefilled SURVIVES the GitHub login
// redirect, so logged-out signers land on the filled form.

function cleanLine(value: string): string {
  return value
    .replace(/[|\n\r]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 140);
}

function StepChip({ n }: { n: string }) {
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-fd-border text-xs font-medium text-fd-foreground">
      {n}
    </span>
  );
}

export function SignPreview() {
  const [username, setUsername] = useState('');
  const [line, setLine] = useState('');
  const [debounced, setDebounced] = useState({ u: '', q: '' });
  const [loadedSrc, setLoadedSrc] = useState(DEFAULT_CARD);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  const cleanUser = username.trim().replace(/^@/, '');
  const validUser = USERNAME_RE.test(cleanUser);

  useEffect(() => {
    const t = setTimeout(
      () =>
        setDebounced({ u: validUser ? cleanUser : '', q: cleanLine(line) }),
      500,
    );
    return () => clearTimeout(t);
  }, [cleanUser, validUser, line]);

  // src derives from the debounced pair — every username OR line change
  // produces a new URL, so the <img> always re-fetches.
  const src = useMemo(() => {
    if (!debounced.u) return DEFAULT_CARD;
    const params = new URLSearchParams({ u: debounced.u });
    if (debounced.q) params.set('q', debounced.q);
    return `/manifesto/sign-preview?${params.toString()}`;
  }, [debounced]);

  const generating = src !== loadedSrc;
  const isExample = src === DEFAULT_CARD;
  // If the OG endpoint ever fails, the frame hides entirely — an empty
  // box reads as breakage; absence reads as nothing.
  const broken = failedSrc === src;

  // With no line written, the prefill doubles as an in-form placeholder
  // (frozen EMPTY_BODY inside sign-link.ts). With a line, just the line.
  const signUrl = signOnGitHubUrl(cleanLine(line));

  return (
    <div className="mt-6">
      {/* The card — the reward, visible before anyone commits to a step. */}
      {!broken && (
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={src}
            src={src}
            alt="Preview of the personal signature card"
            width={1200}
            height={630}
            loading="lazy"
            onLoad={() => setLoadedSrc(src)}
            onError={() => {
              setLoadedSrc(src);
              setFailedSrc(src);
            }}
            className={`w-full rounded-xl border border-fd-border transition-opacity duration-300 ${
              generating ? 'opacity-50' : 'opacity-100'
            }`}
          />
          {isExample && !generating && (
            <span className="absolute right-3 top-3 rounded-full border border-white/20 bg-black/55 px-2.5 py-1 text-[11px] uppercase tracking-[0.15em] text-white/85">
              Example
            </span>
          )}
          {generating && (
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="rounded-full bg-black/60 px-3.5 py-1.5 text-xs text-white/90">
                Generating your card&hellip;
              </span>
            </span>
          )}
        </div>
      )}
      {!broken && (
        <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-2">
          <p aria-live="polite" className="text-sm text-fd-muted-foreground">
            {isExample
              ? 'This is Signatory #1. Preview yours (optional):'
              : 'Every signature gets a permanent card and link like this one.'}
          </p>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="your GitHub username"
            aria-label="GitHub username, only to preview your card"
            autoComplete="off"
            spellCheck={false}
            className="rounded-lg border border-fd-border bg-fd-secondary/40 px-3 py-1.5 text-sm text-fd-foreground placeholder:text-fd-muted-foreground focus:outline-none focus:ring-1 focus:ring-fd-foreground/30 sm:w-56"
          />
        </div>
      )}

      {/* The three steps — the whole signing flow. */}
      <div className="mt-7 space-y-5">
        <div className="flex items-start gap-3">
          <StepChip n="1" />
          <div className="min-w-0 flex-1">
            <label className="flex flex-col gap-1.5 text-sm text-fd-foreground/90">
              <span>Write your line, or leave it empty:</span>
              <input
                type="text"
                value={line}
                onChange={(e) => setLine(e.target.value)}
                placeholder={LINE_PROMPT}
                maxLength={140}
                autoComplete="off"
                className="rounded-lg border border-fd-border bg-fd-secondary/40 px-3 py-2 text-sm text-fd-foreground placeholder:text-fd-muted-foreground focus:outline-none focus:ring-1 focus:ring-fd-foreground/30"
              />
            </label>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <StepChip n="2" />
          <a
            href={signUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-lg px-5 py-2.5 text-sm font-medium"
            style={{
              backgroundColor: 'var(--color-fd-foreground)',
              color: 'var(--color-fd-background)',
            }}
          >
            Sign on GitHub →
          </a>
        </div>

        <div className="flex items-start gap-3">
          <StepChip n="3" />
          <p className="text-sm text-fd-foreground/90 leading-relaxed pt-0.5">
            Press <strong>Start discussion</strong> there. GitHub may ask
            you to confirm you searched for similar discussions; just tick
            it and post, it is a standard GitHub step. Done: your signature
            and your permanent card appear within minutes, and the commit
            is credited to your GitHub account.
          </p>
        </div>
      </div>

      <p className="mt-5 text-xs text-fd-muted-foreground leading-relaxed">
        No GitHub account? The button will offer to create one (free, 2
        minutes). If you end up on your new account&rsquo;s home page, just
        come back and tap Sign on GitHub again.
      </p>
    </div>
  );
}
