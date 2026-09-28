import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { DocsSidebarStarRow } from '@/components/github-star';
import { AISearchLazy } from '@/components/ai/lazy';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      {...baseOptions({ compact: true })}
      themeSwitch={{ enabled: false }}
      sidebar={{ footer: <DocsSidebarStarRow locale="en" /> }}
    >
      {/* Interaction-gated: the AI chat chunk only downloads on first
          click or ⌘/ — see components/ai/lazy.tsx (audit perf #10c). */}
      <AISearchLazy />

      {children}
    </DocsLayout>
  );
}
