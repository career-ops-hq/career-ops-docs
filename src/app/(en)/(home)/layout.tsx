import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';

export default function Layout({ children }: LayoutProps<'/'>) {
  // !pb-0 cancels the global `main { md:pb-12 }` (set in global.css) so
  // the home page's full-bleed CTA gradient bleeds straight into the
  // footer's border-t. Other layouts (#nd-docs-layout etc.) keep the
  // default breathing room.
  return <HomeLayout {...baseOptions()} className="!pb-0">{children}</HomeLayout>;
}
