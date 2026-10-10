import type { ReactNode } from 'react';
import { RootShell, rootMetadata } from '@/components/root-shell';

// Root layout of every French page: <html lang="fr"> and the
// content-language meta come from the server, so crawlers that read raw HTML
// see the page's language. Next sends Content-Language: fr over HTTP
// (next.config.mjs). Until October 2026 these pages shared the English root
// layout and a script fixed <html lang> in the browser.
export const metadata = rootMetadata;

export default function Layout({ children }: { children: ReactNode }) {
  return <RootShell locale="fr">{children}</RootShell>;
}
