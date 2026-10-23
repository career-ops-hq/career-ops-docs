import type { ReactNode } from 'react';
import { RootShell, rootMetadata } from '@/components/root-shell';

// Root layout of every Vietnamese page: <html lang="vi"> and the
// content-language meta come from the server, so crawlers that read raw HTML
// see the page's language. Next sends Content-Language: vi over HTTP
// (next.config.mjs). Vietnamese launched on its own root layout.
export const metadata = rootMetadata;

export default function Layout({ children }: { children: ReactNode }) {
  return <RootShell locale="vi">{children}</RootShell>;
}
