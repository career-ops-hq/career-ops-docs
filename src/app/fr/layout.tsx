import type { ReactNode } from 'react';
import { LangSync } from '@/components/lang-sync';

// Every page under /fr declared <html lang="en">: the root layout hardcodes it,
// and a nested layout cannot render its own <html>. Search engines that read
// the declared language, and screen readers choosing a voice, treated these
// pages as English.
//
// The full fix is a separate root layout per locale, which means moving every
// English route into a group and changing its git path, which in turn resets
// the git-derived <lastmod> of every moved page to the day of the move. Until
// that is done properly, two narrower corrections:
//   - next.config.mjs sends Content-Language: fr on these routes, the HTTP
//     signal Bing reads, without making any page dynamic;
//   - this script sets the DOM's lang before first paint, for screen readers
//     and for crawlers that render JavaScript.
// The <html> element carries suppressHydrationWarning, so React accepts it.
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: "document.documentElement.lang='fr'" }} />
      <LangSync lang="fr" />
      {children}
    </>
  );
}
