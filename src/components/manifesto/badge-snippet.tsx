'use client';

import { useState } from 'react';

// "Your badge" (SPEC-4 piece 2, v3 per Santiago's executive GO +
// career-ops-ux/warpchart verification flags): crisp inline preview,
// SIZE segmented control (Large 56 default / Standard 28, habitat
// labels), and the editor-style embed block. MARKDOWN-FIRST (warpchart
// embed data: ~90% copy the first snippet, and <picture> breaks on
// strict renderers — GitHub mobile app, npm, GitLab): the default tab
// is a one-line markdown embed of the dark monocaja, which survives
// both light and dark backgrounds by design. 'Adaptive (HTML)' is the
// second tab for readers who want the <picture> theme switch. One copy
// icon-button with feedback; wrapped, never scrolled. Lives inside the
// dark certificate card (fixed cream-on-warm-black palette).

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

export function BadgeSnippet({
  username,
  n,
  svgLarge,
  svgStandard,
}: {
  username: string;
  /** Immutable signatory number (rendered on the badge). */
  n: number;
  /** Inline markup of the 56px badge (crisp preview, Large). */
  svgLarge: string;
  /** Inline markup of the 28px badge (crisp preview, Standard). */
  svgStandard: string;
}) {
  const [tab, setTab] = useState<'md' | 'html'>('md');
  const [size, setSize] = useState<56 | 28>(56);
  const [copied, setCopied] = useState(false);

  // ?h= only when Large — the route defaults to 28 (keeps the Standard
  // URL minimal). The asset always ships at the exact render size.
  // v=2 stamps the monocaja redesign (warpchart flag): fresh snippets
  // get a fresh Camo entry immediately; pre-redesign embeds expire on
  // their own max-age. The route ignores it.
  const q = (params: string) => `?${params ? `${params}&` : ''}v=2`;
  const sizeQ = q(size === 56 ? 'h=56' : '');
  const paperQ = q(size === 56 ? 'theme=paper&h=56' : 'theme=paper');
  const badgeUrl = `https://career-ops.org/badge/${username}.svg`;
  // The wrapping link carries ?via=badge--{user}: (a) badge-driven clicks
  // aggregate separately from share clicks in the private via report;
  // (b) any via arrival renders the VISITOR view of the certificate
  // (participation-first, owner tooling hidden) — Santiago's call,
  // re-confirmed by career-ops-ux over /manifesto#sign.
  const certUrl = `https://career-ops.org/manifesto/s/${username}?via=badge--${username}`;
  const alt = `CareerOps Manifesto — Signed #${n}`;
  const snippets = {
    // Default: one-line markdown, single dark asset — the monocaja is
    // designed to survive both light and dark backgrounds, and this
    // line works on every renderer.
    md: `[![${alt}](${badgeUrl}${sizeQ})](${certUrl})`,
    // Adaptive upgrade: <picture> theme switch (light README → dark
    // box, dark README → paper box; GitHub resolves
    // prefers-color-scheme from the reader's theme).
    html: `<a href="${certUrl}">
  <picture>
    <source media="(prefers-color-scheme: dark)"
            srcset="${badgeUrl}${paperQ}">
    <img alt="${alt}"
         src="${badgeUrl}${sizeQ}">
  </picture>
</a>`,
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

  const sizeClass = (s: 56 | 28) =>
    `rounded-md px-3.5 py-1.5 text-[13px] transition-colors min-h-8 ${
      size === s
        ? 'bg-[#DD7627] font-semibold text-[#281d15]'
        : 'bg-transparent text-[rgba(244,237,228,0.7)] hover:text-[#f4ede4]'
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

      {/* Preview on its own quiet panel, reflecting the selected size.
          INLINE SVG, not <img>: WebKit rasterizes SVG-in-img at intrinsic
          size and upscales the bitmap (the blur Santiago reported twice)
          — inline participates in the document's vector render. */}
      <div
        className="mt-4 flex justify-center rounded-lg border border-[rgba(244,237,228,0.14)] bg-[rgba(244,237,228,0.05)] px-4 py-6"
        role="img"
        aria-label={alt}
        dangerouslySetInnerHTML={{
          __html: size === 56 ? svgLarge : svgStandard,
        }}
      />

      {/* SIZE segmented control — Large 56 is the default (statement). */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className="text-[11px] font-semibold tracking-[0.8px] text-[rgba(244,237,228,0.6)]">
          SIZE
        </span>
        <div
          className="inline-flex rounded-lg border border-[rgba(244,237,228,0.25)] p-0.5"
          role="radiogroup"
          aria-label="Badge size"
        >
          <button
            type="button"
            role="radio"
            aria-checked={size === 56}
            onClick={() => setSize(56)}
            className={sizeClass(56)}
          >
            Large
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={size === 28}
            onClick={() => setSize(28)}
            className={sizeClass(28)}
          >
            Standard
          </button>
        </div>
        {/* Habitat labels (career-ops-ux flag): the copy steers each
            size to where it belongs, so the 56 never ends up broken
            inside a repo shields row. */}
        <span className="text-xs text-[rgba(244,237,228,0.5)]">
          {size === 56
            ? '56px — for your profile README'
            : '28px — fits a repo shields row'}
        </span>
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
              Adaptive (HTML)
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
      <p className="mt-3 text-[11px] text-[rgba(244,237,228,0.45)]">
        Served at the exact size you pick — crisp everywhere, no scaling.
        The adaptive embed auto-switches with the reader&apos;s theme.
      </p>
    </div>
  );
}
