import type { ReactNode } from 'react';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';

// Layout for the Spanish (/es) surfaces — same site chrome as the EN
// home, but the language switcher points back to English (locale: 'es').
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout {...baseOptions({ locale: 'es' })}>{children}</HomeLayout>
  );
}
