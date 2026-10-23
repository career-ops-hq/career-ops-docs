import type { ReactNode } from 'react';
import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { DocsSidebarRow } from '@/components/github-star';
import { AISearchLazy } from '@/components/ai/lazy';

// Docs chrome for the Vietnamese subtree (2026-10-13). The tree comes
// from the 'vi' locale, so the sidebar shows exactly the translated pages
// (fallbackLanguage:null => no English fallback entries): the full docs set
// (Vietnamese launched at full parity: every EN page has a .vi.mdx).
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.getPageTree('vi')}
      {...baseOptions({ compact: true, locale: 'vi' })}
      themeSwitch={{ enabled: false }}
      sidebar={{ footer: <DocsSidebarRow /> }}
    >
      <AISearchLazy />
      {children}
    </DocsLayout>
  );
}
