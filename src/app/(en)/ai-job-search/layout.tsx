import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';

export default function Layout({ children }: LayoutProps<'/ai-job-search'>) {
  return <HomeLayout {...baseOptions()}>{children}</HomeLayout>;
}
