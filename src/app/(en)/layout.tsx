import type { ReactNode } from 'react';
import { RootShell, rootMetadata } from '@/components/root-shell';

// Root layout of every English page. Each language has its own root layout
// (es/, fr/ and de/layout.tsx), so <html lang> is right in the server HTML.
// Moving between them is a full page load, which only happens when the reader
// switches language.
export const metadata = rootMetadata;

export default function Layout({ children }: { children: ReactNode }) {
  return <RootShell locale="en">{children}</RootShell>;
}
