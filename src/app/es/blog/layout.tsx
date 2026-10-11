import type { ReactNode } from 'react';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';

// Spanish blog posts only (/es/blog/<slug>). There is deliberately no
// /es/blog index while so few posts have a Spanish twin.
export default function Layout({ children }: { children: ReactNode }) {
  return <HomeLayout {...baseOptions({ locale: 'es' })}>{children}</HomeLayout>;
}
