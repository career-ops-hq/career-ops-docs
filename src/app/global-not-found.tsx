import type { Metadata } from 'next';
import { RootShell, rootMetadata } from '@/components/root-shell';

// 404 for URLs that match no route at all. With one root layout per locale
// there is no single layout left to wrap a not-found page in, so Next renders
// this file instead (experimental.globalNotFound in next.config.mjs). It keeps
// what the 404 looked like before the split: Next's default message inside the
// English shell, footer included, and noindex. A missing page INSIDE a locale
// (a /de/docs slug that does not exist) still renders in that locale's root
// layout through notFound().
export const metadata: Metadata = {
  ...rootMetadata,
  title: '404: This page could not be found.',
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <RootShell locale="en">
      <main className="flex flex-1 items-center justify-center py-24 text-center">
        <div className="flex items-center">
          <h1 className="mr-5 border-r border-fd-border pr-6 text-2xl font-medium leading-[49px]">404</h1>
          <h2 className="text-sm leading-[49px]">This page could not be found.</h2>
        </div>
      </main>
    </RootShell>
  );
}
