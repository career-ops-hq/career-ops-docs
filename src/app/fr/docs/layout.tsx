import type { ReactNode } from 'react';
import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { AISearchLazy } from '@/components/ai/lazy';

// Docs chrome for the French subtree (French pilot, 2026-07-21). The tree comes
// from the 'fr' locale, so the sidebar shows exactly the translated pages
// (fallbackLanguage:null => no English fallback entries) — the curated grounded
// subset (what-is, faq, free-ai-engine), growing as pages are translated.
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.getPageTree('fr')}
      {...baseOptions({ compact: true, locale: 'fr' })}
    >
      <AISearchLazy />
      {children}
    </DocsLayout>
  );
}
