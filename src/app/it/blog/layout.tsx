import type { ReactNode } from 'react';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';

// Italian blog posts only (/it/blog/<slug>). There is deliberately no
// /it/blog index while so few posts have a Italian twin.
export default function Layout({ children }: { children: ReactNode }) {
  return <HomeLayout {...baseOptions({ locale: 'it' })}>{children}</HomeLayout>;
}
