'use client';

import { useEffect, useState } from 'react';
import { UI } from '@/lib/ui-strings';
import { ASSISTANTS, COUNTRIES, type Assistant, type WaitlistLocale } from '@/lib/waitlist';

export type WaitlistFormCopy = {
  email: string;
  country: string;
  countryPlaceholder: string;
  assistants: string;
  assistantsHint: string;
  assistantLabels: Record<Assistant, string>;
  assistantsRequired: string;
  submit: string;
  submitting: string;
  privacy: React.ReactNode;
  sent: string;
};

type State = 'idle' | 'submitting' | 'sent' | 'error';

const FIELD =
  'w-full rounded-md border bg-fd-background px-3 py-2 text-sm text-fd-foreground placeholder:text-fd-muted-foreground focus:outline-none focus:ring-2 focus:ring-fd-ring';

export function WaitlistForm({ locale, copy }: { locale: WaitlistLocale; copy: WaitlistFormCopy }) {
  const [ref, setRef] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [hp, setHp] = useState(''); // honeypot
  const [state, setState] = useState<State>('idle');
  const [error, setError] = useState<string | null>(null);
  const [countries, setCountries] = useState<{ code: string; name: string }[]>([]);

  // Filled in the browser: the country names come from Intl, and the server's and
  // the browser's ICU data differ, which would fail hydration.
  useEffect(() => {
    const names = new Intl.DisplayNames([locale], { type: 'region' });
    setCountries(
      COUNTRIES.map((code) => ({ code, name: names.of(code) ?? code })).sort((a, b) =>
        a.name.localeCompare(b.name, locale),
      ),
    );
  }, [locale]);

  // The page is static, so the ref is read here. The load counts once per page
  // arrival, with the ref and the language and nothing else.
  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get('ref') ?? '';
    setRef(value);
    // Reloads and back/forward don't count. No flag in the browser to dedupe
    // further: storing one for analytics would need consent (ePrivacy art. 5(3)).
    const [nav] = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    if (nav && nav.type !== 'navigate') return;
    const body = JSON.stringify({ ref: value, locale });
    if (!navigator.sendBeacon?.('/api/waitlist/load', body)) {
      void fetch('/api/waitlist/load', { method: 'POST', body, keepalive: true }).catch(() => {});
    }
  }, [locale]);

  // "None" excludes the others, and marking any other clears "None".
  function toggle(option: Assistant) {
    setAssistants((current) => {
      if (current.includes(option)) return current.filter((a) => a !== option);
      return option === 'none' ? ['none'] : [...current.filter((a) => a !== 'none'), option];
    });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === 'submitting') return;
    if (assistants.length === 0) {
      setState('error');
      setError(copy.assistantsRequired);
      return;
    }
    setState('submitting');
    setError(null);
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, country, assistants, locale, ref, hp }),
      });
      if (!res.ok) throw new Error(UI[locale].subscribeFailed);
      setState('sent');
    } catch (err) {
      setState('error');
      setError(err instanceof Error ? err.message : UI[locale].subscribeFailed);
    }
  }

  if (state === 'sent') {
    return (
      <p role="status" aria-live="polite" className="text-fd-foreground text-base">
        {copy.sent}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      {/* Honeypot: hidden from humans, bots fill it. */}
      <label className="sr-only" aria-hidden="true">
        {UI[locale].honeypot}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={hp}
          onChange={(e) => setHp(e.target.value)}
        />
      </label>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="waitlist-email" className="text-fd-foreground text-sm font-medium">
          {copy.email}
        </label>
        <input
          id="waitlist-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={FIELD}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="waitlist-country" className="text-fd-foreground text-sm font-medium">
          {copy.country}
        </label>
        <select
          id="waitlist-country"
          required
          autoComplete="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className={FIELD}
        >
          <option value="" disabled>
            {copy.countryPlaceholder}
          </option>
          {countries.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <fieldset className="flex flex-col gap-1.5">
        <legend className="text-fd-foreground text-sm font-medium">{copy.assistants}</legend>
        <p className="text-fd-muted-foreground text-sm">{copy.assistantsHint}</p>
        <div className="mt-1 flex flex-wrap gap-x-5 gap-y-2">
          {ASSISTANTS.map((option) => (
            <label key={option} className="inline-flex items-center gap-2 text-sm text-fd-foreground">
              <input
                type="checkbox"
                checked={assistants.includes(option)}
                onChange={() => toggle(option)}
                className="size-4"
              />
              {copy.assistantLabels[option]}
            </label>
          ))}
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={state === 'submitting'}
        className="self-start rounded-md bg-brand px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {state === 'submitting' ? copy.submitting : copy.submit}
      </button>

      {state === 'error' && error ? (
        <p role="alert" className="text-fd-foreground text-sm">
          {error}
        </p>
      ) : null}

      <p className="text-fd-muted-foreground text-sm leading-relaxed">{copy.privacy}</p>
    </form>
  );
}
