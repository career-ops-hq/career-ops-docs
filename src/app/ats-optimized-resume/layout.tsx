import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';

export default function Layout({ children }: LayoutProps<'/ats-optimized-resume'>) {
  return <HomeLayout {...baseOptions()}>{children}</HomeLayout>;
}
