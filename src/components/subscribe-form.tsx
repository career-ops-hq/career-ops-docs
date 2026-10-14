'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';
import { UI } from '@/lib/ui-strings';
import type { SiteLocale } from '@/components/locale-root-provider';

type State = 'idle' | 'submitting' | 'sent' | 'error';

type Props = {
  className?: string;
  // When `compact`, the form omits its internal heading + body copy so the
  // parent can provide a section-level heading (used in the home block).
  // The footer keeps the default layout with copy inline.
  compact?: boolean;
  locale?: SiteLocale;
};

export function SubscribeForm({ className, compact = false, locale = 'en' }: Props) {
  const t = UI[locale];
  const [email, setEmail] = useState('');
  const [hp, setHp] = useState(''); // honeypot
  const [state, setState] = useState<State>('idle');
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === 'submitting') return;
    setState('submitting');
    setError(null);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, hp }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error ?? t.subscribeFailed);
      }
      setState('sent');
    } catch (err) {
      setState('error');
      setError(err instanceof Error ? err.message : t.subscribeFailed);
    }
  }

  return (
    <div
      className={cn(
        compact
          ? 'flex w-full flex-col items-center'
          : 'grid gap-6 md:grid-cols-[1fr_auto] md:items-start md:gap-12',
        className,
      )}
    >
      {!compact && (
        <div className="max-w-md">
          <p className="text-fd-foreground text-sm font-medium">
            Get notified when there's something worth sharing.
          </p>
          <p className="mt-1 text-fd-muted-foreground text-sm">
            Release announcements and occasional updates.
            <br />
            Unsubscribe anytime.
          </p>
        </div>
      )}

      {state === 'sent' ? (
        <p
          role="status"
          aria-live="polite"
          className={cn(
            'text-fd-foreground text-sm',
            !compact && 'md:text-right md:self-center',
          )}
        >
          {t.subscribeSent}
        </p>
      ) : (
        <form
          onSubmit={onSubmit}
          noValidate
          className="flex w-full flex-col gap-2 sm:flex-row sm:items-center md:w-auto"
        >
          {/* Honeypot — hidden from humans, bots fill it. */}
          <label className="sr-only" aria-hidden="true">
            {t.honeypot}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={hp}
              onChange={(e) => setHp(e.target.value)}
            />
          </label>

          <label className="sr-only" htmlFor="subscribe-email">
            {t.emailLabel}
          </label>
          <input
            id="subscribe-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={state === 'submitting'}
            className="flex-1 min-w-0 rounded-md border bg-fd-background px-3 py-2 text-sm text-fd-foreground placeholder:text-fd-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring sm:w-64"
          />
          <button
            type="submit"
            disabled={state === 'submitting'}
            className="rounded-md border bg-fd-secondary px-4 py-2 text-sm font-medium text-fd-secondary-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground disabled:pointer-events-none disabled:opacity-50"
          >
            {state === 'submitting' ? t.subscribing : t.subscribe}
          </button>
          {state === 'error' && error ? (
            <p
              role="alert"
              className="text-fd-muted-foreground text-xs sm:basis-full sm:mt-1"
            >
              {error}. {t.subscribeRetry}
            </p>
          ) : null}
        </form>
      )}
    </div>
  );
}
