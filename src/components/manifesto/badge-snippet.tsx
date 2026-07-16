'use client';

import { useState } from 'react';

// "Your badge" (SPEC-4 piece 2, v2 per Santiago's design feedback):
// large crisp badge preview on its own panel, and an editor-style embed
// block — Markdown/HTML as tabs, one copy icon-button with feedback —
// instead of ugly scrolling bars. Lives inside the dark certificate
// card, so colors use the card's fixed palette (cream on warm black).

const INK = '#f4ede4';
const AMBER = '#DD7627';

function CopyIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function BadgeSnippet({ username }: { username: string }) {
  const [tab, setTab] = useState<'md' | 'html'>('md');
  const [copied, setCopied] = useState(false);

  const badgeUrl = `https://career-ops.org/badge/${username}.svg`;
  const certUrl = `https://career-ops.org/manifesto/s/${username}`;
  const alt = 'CareerOps Manifesto · signatory';
  const snippets = {
    md: `[![${alt}](${badgeUrl})](${certUrl})`,
    html: `<a href="${certUrl}"><img src="${badgeUrl}" alt="${alt}" height="28"></a>`,
  };

  async function copy() {
    try {
      await navigator.clipboard.writeText(snippets[tab]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — the snippet is selectable text.
    }
  }

  const tabClass = (t: 'md' | 'html') =>
    `px-3 py-2 text-xs font-medium transition-colors border-b-2 ${
      tab === t
        ? 'border-[#DD7627] text-[#f4ede4]'
        : 'border-transparent text-[rgba(244,237,228,0.5)] hover:text-[rgba(244,237,228,0.8)]'
    }`;

  return (
    <div className="mt-9 text-left">
      <p className="text-sm font-medium" style={{ color: INK }}>
        Your badge
      </p>
      <p className="mt-1 text-xs text-[rgba(244,237,228,0.6)]">
        For your GitHub profile README. It links to this certificate, and
        it only renders for real signatures.
      </p>

      {/* Large preview on its own quiet panel — 2x render keeps the serif
          crisp instead of squinting at 28px. */}
      <div className="mt-4 flex justify-center rounded-lg border border-[rgba(244,237,228,0.14)] bg-[rgba(244,237,228,0.05)] px-4 py-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={badgeUrl} alt={alt} style={{ height: 56, width: 'auto' }} />
      </div>

      {/* Editor-style embed block: tabs + icon copy button. */}
      <div className="mt-4 overflow-hidden rounded-lg border border-[rgba(244,237,228,0.14)] bg-[#1a1511]">
        <div className="flex items-center justify-between border-b border-[rgba(244,237,228,0.10)] pl-1 pr-1">
          <div className="flex" role="tablist" aria-label="Embed format">
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'md'}
              onClick={() => setTab('md')}
              className={tabClass('md')}
            >
              Markdown
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'html'}
              onClick={() => setTab('html')}
              className={tabClass('html')}
            >
              HTML
            </button>
          </div>
          <button
            type="button"
            onClick={copy}
            aria-label={copied ? 'Copied' : 'Copy to clipboard'}
            title={copied ? 'Copied' : 'Copy'}
            className="rounded-md p-2 transition-colors"
            style={{ color: copied ? AMBER : 'rgba(244,237,228,0.55)' }}
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
          </button>
        </div>
        {/* Wrapped, never scrolled — a copy-paste snippet has no business
            showing a scrollbar (Santiago's call). */}
        <pre className="whitespace-pre-wrap break-all px-4 py-3.5 text-xs leading-relaxed">
          <code className="text-[rgba(244,237,228,0.85)]">{snippets[tab]}</code>
        </pre>
      </div>
    </div>
  );
}
