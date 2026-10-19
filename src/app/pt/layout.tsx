import type { ReactNode } from 'react';
import { RootShell, rootMetadataFor } from '@/components/root-shell';

// Root layout of every Portuguese (pt-BR) page: <html lang="pt"> and the
// content-language meta come from the server, so crawlers that read raw HTML
// see the page's language. Next sends Content-Language: pt over HTTP
// (next.config.mjs). Until October 2026 these pages shared the English root
// layout and a script fixed <html lang> in the browser.
export const metadata = rootMetadataFor('pt');

export default function Layout({ children }: { children: ReactNode }) {
  return <RootShell locale="pt">{children}</RootShell>;
}
