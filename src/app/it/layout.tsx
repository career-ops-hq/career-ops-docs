import type { ReactNode } from 'react';
import { RootShell, rootMetadata } from '@/components/root-shell';

// Root layout of every Italian page: <html lang="it"> and the
// content-language meta come from the server, so crawlers that read raw HTML
// see the page's language. Next sends Content-Language: it over HTTP
// (next.config.mjs). Italian launched on its own root layout.
export const metadata = rootMetadata;

export default function Layout({ children }: { children: ReactNode }) {
  return <RootShell locale="it">{children}</RootShell>;
}
