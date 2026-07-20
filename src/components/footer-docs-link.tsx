'use client';

import { usePathname } from 'next/navigation';

// The global footer lives in the root layout (rendered on every page, EN and
// ES). Its "Docs" link must follow the locale: on any /es surface it points at
// the Spanish docs landing, everywhere else at the English one. Only /docs has
// an ES twin today, so only this footer link is locale-aware; the rest of the
// footer nav stays English until those pages are translated (tracked separately
// as the "localize global chrome" follow-up, together with <html lang>).
export function FooterDocsLink() {
  const pathname = usePathname();
  const href = pathname?.startsWith('/es') ? '/es/docs' : '/docs';
  return (
    <a href={href} className="hover:text-fd-foreground hover:underline">
      Docs
    </a>
  );
}
