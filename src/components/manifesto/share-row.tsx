'use client';

import { useState } from 'react';

// Quiet share row under the signature certificate — pure intent URLs, no
// SDKs, no trackers. First-person prefilled copy (the visitor is the
// card's owner in the overwhelming case: they arrive from the merge
// reply), fully editable in each composer. 'CareerOps Manifesto'
// verbatim in every share propagates the term with attribution.

export function ShareRow({ url, ordinal }: { url: string; ordinal: number }) {
  const [copied, setCopied] = useState(false);

  const post = `I signed the CareerOps Manifesto. Nine rights every job seeker should have. Signatory #${ordinal}.`;
  const chat = `I just signed the CareerOps Manifesto, nine rights every job seeker should have: ${url}`;
  const enc = encodeURIComponent;

  const links = [
    {
      label: 'X',
      href: `https://x.com/intent/post?text=${enc(`${post} ${url}`)}`,
    },
    {
      label: 'LinkedIn',
      // share-offsite is URL-only; the OG card carries the visual.
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`,
    },
    {
      label: 'WhatsApp',
      href: `https://wa.me/?text=${enc(chat)}`,
    },
    {
      label: 'Telegram',
      href: `https://t.me/share/url?url=${enc(url)}&text=${enc(
        'I just signed the CareerOps Manifesto, nine rights every job seeker should have.',
      )}`,
    },
  ];

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
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
