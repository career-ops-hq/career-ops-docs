import type { ReactNode } from 'react';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';

// Layout for the German home (/de) — same site chrome as the EN/ES homes. Lives
// in a (home) route group so this HomeLayout does NOT wrap the /de/docs subtree
// (that gets its own DocsLayout).
export default function Layout({ children }: { children: ReactNode }) {
  return <HomeLayout {...baseOptions({ locale: 'de' })}>{children}</HomeLayout>;
}
