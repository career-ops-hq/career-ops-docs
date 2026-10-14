'use client';

import { useEffect } from 'react';
import { track } from '@vercel/analytics';

// Web Analytics pageviews keep the path without its query, so a campaign link
// (?utm_source=discord) is invisible in them. This sends one `landing_utm`
// event per page load that carries UTM, with three properties only:
// utm_source, utm_campaign and the page language. Values are cut to 40
// characters so nobody can push free text into the analytics. Nothing else
// from the URL is read, and the URL itself is left untouched (canonical and
// hreflang do not change).
const MAX = 40;

type VaWindow = Window & { va?: (...args: unknown[]) => void; vaq?: unknown[][] };

export function UtmLanding({ locale }: { locale: string }) {
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const source = q.get('utm_source')?.slice(0, MAX);
    if (!source) return;
    // <Analytics /> from @vercel/analytics/next sits behind a Suspense boundary
    // and sets up window.va after this effect has run, so `track` would find
    // no queue and drop the event. Same queue the package creates; its script
    // drains it when it loads.
    const w = window as VaWindow;
    w.va ??= (...args: unknown[]) => {
      (w.vaq ??= []).push(args);
    };
    track('landing_utm', {
      utm_source: source,
      utm_campaign: q.get('utm_campaign')?.slice(0, MAX) ?? null,
      locale,
    });
  }, [locale]);
  return null;
}
