import type { ReactNode } from 'react';
import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { DocsSidebarRow } from '@/components/github-star';
import { AISearchLazy } from '@/components/ai/lazy';

// Docs chrome for the Turkish subtree (2026-10-30). The tree comes
// from the 'tr' locale, so the sidebar shows exactly the translated pages
// (fallbackLanguage:null => no English fallback entries): the full docs set
// (Turkish launched at full parity: every EN page has a .tr.mdx).
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.getPageTree('tr')}
      {...baseOptions({ compact: true, locale: 'tr' })}
      themeSwitch={{ enabled: false }}
      sidebar={{ footer: <DocsSidebarRow /> }}
    >
      <AISearchLazy />
      {children}
    </DocsLayout>
  );
}
