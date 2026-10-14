'use client';

import { useState } from 'react';
import { CheckIcon, CopyIcon } from 'lucide-react';
import { cn } from '@/lib/cn';
import { UI } from '@/lib/ui-strings';
import type { SiteLocale } from '@/components/locale-root-provider';

// Single-line monospace command + copy-to-clipboard button. Pattern from
// Vercel/Linear/Stripe — the snippet truncates on narrow viewports rather
// than wrapping; the user's intent is "copy this", not "read this".
export function CopyableCommand({
  command,
  className,
  locale = 'en',
}: {
  command: string;
  className?: string;
  locale?: SiteLocale;
}) {
  const t = UI[locale];
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Non-secure context or permission denied — fail silently. The
      // command stays visible and the user can still select+copy manually.
    }
  }

  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-xl bg-fd-secondary border shadow-sm pl-4 pr-1.5 py-1.5 font-mono text-sm text-fd-muted-foreground',
        className,
      )}
    >
      <code className="flex-1 min-w-0 truncate">{command}</code>
      {/* "Copied" sits LEFT of the button on sm+. Always rendered; only its
          opacity transitions on copy/revert — keeps the layout stable so
          the text doesn't shift or push the button as state flips. Hidden
          entirely on mobile (icon-only there). */}
      <span
        aria-hidden="true"
        className={cn(
          'hidden sm:inline-block shrink-0 text-xs font-medium text-brand',
          'transition-opacity duration-200',
          copied ? 'opacity-100' : 'opacity-0',
        )}
      >
        {t.copied}
      </span>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? t.copiedToClipboard : t.copyCommand}
        title={copied ? t.copied : t.copy}
        className={cn(
          'shrink-0 inline-flex items-center justify-center rounded-md p-1.5 transition-colors',
          'text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring',
        )}
      >
        {copied ? (
          <CheckIcon className="size-4 text-brand" aria-hidden="true" />
        ) : (
          <CopyIcon className="size-4" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
