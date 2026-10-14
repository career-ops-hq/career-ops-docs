import type { ReactNode } from 'react';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';

// Portuguese blog posts only (/pt/blog/<slug>). There is deliberately no
// /pt/blog index while so few posts have a Portuguese twin.
export default function Layout({ children }: { children: ReactNode }) {
  return <HomeLayout {...baseOptions({ locale: 'pt' })}>{children}</HomeLayout>;
}
