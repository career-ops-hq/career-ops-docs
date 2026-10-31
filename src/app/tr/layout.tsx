import type { ReactNode } from 'react';
import { RootShell, rootMetadataFor } from '@/components/root-shell';

// Root layout of every Turkish page: <html lang="tr"> and the
// content-language meta come from the server, so crawlers that read raw HTML
// see the page's language. Next sends Content-Language: tr over HTTP
// (next.config.mjs). Turkish launched on its own root layout.
export const metadata = rootMetadataFor('tr');

export default function Layout({ children }: { children: ReactNode }) {
  return <RootShell locale="tr">{children}</RootShell>;
}
