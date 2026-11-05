'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { WAITLIST_LOCALES, waitlistPath, type WaitlistLocale } from '@/lib/waitlist';

const LANGUAGE_NAMES: Record<WaitlistLocale, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  pt: 'Português',
  it: 'Italiano',
  zh: '中文',
  tr: 'Türkçe',
};

// Links to the other languages. They carry the ?ref in the URL, because a signup
// after a language switch would otherwise count as direct, and storing it in the
// browser for analytics would need consent (see waitlist-form.tsx).
export function WaitlistLanguageLinks({ locale }: { locale: WaitlistLocale }) {
  const [query, setQuery] = useState('');
  useEffect(() => {
    const ref = new URLSearchParams(window.location.search).get('ref');
    setQuery(ref ? `?ref=${encodeURIComponent(ref)}` : '');
  }, []);

  return (
    <p className="flex flex-wrap gap-x-4 gap-y-1">
      {WAITLIST_LOCALES.filter((other) => other !== locale).map((other) => (
        <Link key={other} href={waitlistPath(other) + query} lang={other} className="hover:underline">
          {LANGUAGE_NAMES[other]}
        </Link>
      ))}
    </p>
  );
}
