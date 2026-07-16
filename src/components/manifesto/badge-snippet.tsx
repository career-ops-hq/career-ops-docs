'use client';

import { useState } from 'react';

// "Your badge" (SPEC-4 piece 2): live preview of the signatory badge SVG
// plus one-click copyable Markdown/HTML embeds. The wrapping link points
// at the signer's OWN certificate — every click on a badge in someone
// else's README is another lap of the loop. Render-side counterfeit
// protection lives in the badge endpoint itself (404 for non-signers).

export function BadgeSnippet({ username }: { username: string }) {
  const [copied, setCopied] = useState<'md' | 'html' | null>(null);

  const badgeUrl = `https://career-ops.org/badge/${username}.svg`;
  const certUrl = `https://career-ops.org/manifesto/s/${username}`;
  const alt = 'CareerOps Manifesto · signatory';
  const md = `[![${alt}](${badgeUrl})](${certUrl})`;
  const html = `<a href="${certUrl}"><img src="${badgeUrl}" alt="${alt}" height="28"></a>`;

  async function copy(kind: 'md' | 'html', text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(kind);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // Clipboard unavailable — the snippets are selectable text.
    }
  }

  return (
    <div className="mt-8 text-left">
      <p className="text-sm font-medium text-fd-foreground">Your badge</p>
      <p className="mt-1 text-xs text-fd-muted-foreground">
        For your GitHub profile README. It links to this certificate, and
        it only renders for real signatures.
      </p>
      <p className="mt-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={badgeUrl} alt={alt} height={28} />
      </p>
      <div className="mt-3 space-y-2">
        <div className="flex items-stretch gap-2">
          <pre className="min-w-0 flex-1 overflow-x-auto rounded-lg border border-fd-border bg-fd-secondary/40 px-3 py-2 text-xs">
            <code>{md}</code>
          </pre>
          <button
            type="button"
            onClick={() => copy('md', md)}
            className="shrink-0 rounded-lg border border-fd-border px-3 py-2 text-xs text-fd-foreground hover:bg-fd-secondary/60"
          >
            {copied === 'md' ? 'Copied' : 'Copy Markdown'}
          </button>
        </div>
        <div className="flex items-stretch gap-2">
          <pre className="min-w-0 flex-1 overflow-x-auto rounded-lg border border-fd-border bg-fd-secondary/40 px-3 py-2 text-xs">
            <code>{html}</code>
          </pre>
          <button
            type="button"
            onClick={() => copy('html', html)}
            className="shrink-0 rounded-lg border border-fd-border px-3 py-2 text-xs text-fd-foreground hover:bg-fd-secondary/60"
          >
            {copied === 'html' ? 'Copied' : 'Copy HTML'}
          </button>
        </div>
      </div>
    </div>
  );
}
