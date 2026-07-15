'use client';

import { useState } from 'react';

// Quiet share row under the signature certificate — pure intent URLs, no
// SDKs, no trackers. First-person prefilled copy (the visitor is the
// card's owner in the overwhelming case: they arrive from the merge
// reply), fully editable in each composer. 'CareerOps Manifesto'
// verbatim in every share propagates the term with attribution.
//
// variant='fresh' (SPEC-1b, the just-signed moment — the bot links the
// certificate with ?fresh=1): WhatsApp/Telegram first (dark-social 1:1
// converts better right after signing), gate-approved prefill in the
// signer's own voice, and ?via={username} attribution appended to every
// outgoing link — measured only in private server logs on landing,
// never surfaced publicly.

export function ShareRow({
  url,
  ordinal,
  variant = 'default',
  viaUser,
}: {
  url: string;
  ordinal: number;
  variant?: 'default' | 'fresh';
  viaUser?: string;
}) {
  const [copied, setCopied] = useState(false);
  const enc = encodeURIComponent;

  const fresh = variant === 'fresh';
  const shareUrl =
    fresh && viaUser ? `${url}?via=${enc(viaUser)}` : url;

  // Gate-approved copys — do not reword.
  const post = fresh
    ? `just signed the CareerOps Manifesto. my signature is a commit: ${shareUrl}`
    : `I signed the CareerOps Manifesto. Nine rights every job seeker should have. Signatory #${ordinal}. ${url}`;
  const chat = fresh
    ? `just signed the CareerOps Manifesto. my signature is a commit: ${shareUrl}`
    : `I just signed the CareerOps Manifesto, nine rights every job seeker should have: ${url}`;

  const x = { label: 'X', href: `https://x.com/intent/post?text=${enc(post)}` };
  const linkedin = {
    label: 'LinkedIn',
    // share-offsite is URL-only; the OG card carries the visual.
    href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(shareUrl)}`,
  };
  const whatsapp = { label: 'WhatsApp', href: `https://wa.me/?text=${enc(chat)}` };
  const telegram = {
    label: 'Telegram',
    href: `https://t.me/share/url?url=${enc(shareUrl)}&text=${enc(
      fresh
        ? 'just signed the CareerOps Manifesto. my signature is a commit:'
        : 'I just signed the CareerOps Manifesto, nine rights every job seeker should have.',
    )}`,
  };

  const links = fresh
    ? [whatsapp, telegram, x, linkedin]
    : [x, linkedin, whatsapp, telegram];

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — the address bar still works.
    }
  }

  return (
    <p className="mt-4 text-center text-sm text-fd-muted-foreground">
      Share:{' '}
      {links.map((l, i) => (
        <span key={l.label}>
          {i > 0 && ' · '}
          <a
            href={l.href}
            target="_blank"
            rel="noreferrer noopener"
            className="underline underline-offset-4 hover:text-fd-foreground"
          >
            {l.label}
          </a>
        </span>
      ))}
      {' · '}
      <button
        type="button"
        onClick={copyLink}
        className="underline underline-offset-4 hover:text-fd-foreground"
      >
        {copied ? 'Copied' : 'Copy link'}
      </button>
    </p>
  );
}
