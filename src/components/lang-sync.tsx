'use client';

import { useEffect } from 'react';

// Keeps <html lang> right across client-side navigation. The inline script in
// the locale layouts only runs on a full page load; React does not execute a
// script it inserts during client rendering, so switching language through the
// app would leave the previous language declared. On unmount the default comes
// back, and React runs unmount cleanups before the next layout's effects, so
// going straight from Spanish to French ends on 'fr'.
export function LangSync({ lang }: { lang: string }) {
  useEffect(() => {
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.lang = 'en';
    };
  }, [lang]);
  return null;
}
