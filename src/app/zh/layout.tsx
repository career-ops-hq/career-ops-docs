import type { ReactNode } from 'react';
import { RootShell, rootMetadataFor } from '@/components/root-shell';

// Root layout of every Chinese page: <html lang="zh-Hans"> and the
// content-language meta come from the server, so crawlers that read raw HTML
// see the page's language. Next sends Content-Language: zh-Hans over HTTP
// (next.config.mjs). The URL code is zh; the tag names the script (root-shell.tsx).
export const metadata = rootMetadataFor('zh');

export default function Layout({ children }: { children: ReactNode }) {
  return <RootShell locale="zh">{children}</RootShell>;
}
