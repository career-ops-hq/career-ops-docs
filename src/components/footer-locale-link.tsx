'use client';

import { usePathname } from 'next/navigation';

// The global footer lives in the root layout (rendered on every page, EN and
// ES). A footer link for a page that HAS an ES twin must follow the locale: on
// any /es surface it points at the Spanish version, everywhere else at the
// English one. Use this ONLY for pages with an ES twin (today: /docs and
// /manifesto). The rest of the footer nav stays English until those pages are
// translated (tracked separately as the "localize global chrome" follow-up,
// together with <html lang> and the footer labels).
export function FooterLocaleLink({
  path,
  children,
}: {
  /** The EN path (e.g. '/docs', '/manifesto'). The ES twin is '/es' + path. */
  path: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const href = pathname?.startsWith('/es') ? `/es${path}` : path;
  return (
    <a href={href} className="hover:text-fd-foreground hover:underline">
      {children}
    </a>
  );
}
