import type { ReactNode } from 'react';
import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { AISearchLazy } from '@/components/ai/lazy';

// Docs chrome for the Spanish subtree. The tree comes from the 'es' locale, so
// the sidebar shows exactly the translated pages (fallbackLanguage:null => no
// English fallback entries) — the curated buyer/entity subset, growing as pages
// are translated. Language switcher points back to English (locale: 'es').
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.getPageTree('es')}
      {...baseOptions({ compact: true, locale: 'es' })}
    >
      <AISearchLazy />
      {children}
    </DocsLayout>
  );
}
