import type { ReactNode } from 'react';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';

// Layout for the Spanish home (/es) — same site chrome as the EN home, but the
// language switcher points back to English (locale: 'es'). Lives in a (home)
// route group, mirroring the EN home, so this HomeLayout does NOT wrap the
// /es/docs subtree (that gets its own DocsLayout).
export default function Layout({ children }: { children: ReactNode }) {
  return <HomeLayout {...baseOptions({ locale: 'es' })}>{children}</HomeLayout>;
}
