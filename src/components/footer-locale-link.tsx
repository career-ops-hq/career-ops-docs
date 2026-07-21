'use client';

import { usePathname } from 'next/navigation';

// The global footer lives in the root layout (rendered on every page, EN, ES
// and FR). A footer link for a page that HAS a localized twin must follow the
// locale: on an /es or /fr surface it points at that language's version — but
// ONLY for the locales that actually have that page. `locales` lists them
// (default: both es and fr have /docs; /manifesto passes just ['es']). If the
// current locale has no twin for this path, the link stays English so it never
// 404s. The rest of the footer nav stays English until those pages are
// translated (the "localize global chrome" follow-up, with <html lang> + labels).
type Loc = 'es' | 'fr';

export function FooterLocaleLink({
  path,
  locales = ['es', 'fr'],
  children,
}: {
  /** The EN path (e.g. '/docs', '/manifesto'). The twin is '/<loc>' + path. */
  path: string;
  /** Locales that actually have this page translated. */
  locales?: Loc[];
  children: React.ReactNode;
}) {
  const pathname = usePathname() ?? '';
  const current: 'en' | Loc = pathname.startsWith('/es')
    ? 'es'
    : pathname.startsWith('/fr')
      ? 'fr'
      : 'en';
  const href =
    current !== 'en' && locales.includes(current) ? `/${current}${path}` : path;
  return (
    <a href={href} className="hover:text-fd-foreground hover:underline">
      {children}
    </a>
  );
}
