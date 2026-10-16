import type { ReactNode } from 'react';
import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { DocsSidebarRow } from '@/components/github-star';
import { AISearchLazy } from '@/components/ai/lazy';

// Docs chrome for the Chinese subtree (2026-10-15). The tree comes
// from the 'zh' locale, so the sidebar shows exactly the translated pages
// (fallbackLanguage:null => no English fallback entries): the full docs set
// (Chinese launched at full parity: every EN page has a .zh.mdx).
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.getPageTree('zh')}
      {...baseOptions({ compact: true, locale: 'zh' })}
      themeSwitch={{ enabled: false }}
      sidebar={{ footer: <DocsSidebarRow /> }}
    >
      <AISearchLazy />
      {children}
    </DocsLayout>
  );
}
