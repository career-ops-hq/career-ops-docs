import type { ReactNode } from 'react';
import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { DocsSidebarRow } from '@/components/github-star';
import { AISearchLazy } from '@/components/ai/lazy';

// Docs chrome for the Italian subtree (2026-10-13). The tree comes
// from the 'it' locale, so the sidebar shows exactly the translated pages
// (fallbackLanguage:null => no English fallback entries): the full docs set
// (Italian launched at full parity: every EN page has a .it.mdx).
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.getPageTree('it')}
      {...baseOptions({ compact: true, locale: 'it' })}
      themeSwitch={{ enabled: false }}
      sidebar={{ footer: <DocsSidebarRow /> }}
    >
      <AISearchLazy />
      {children}
    </DocsLayout>
  );
}
