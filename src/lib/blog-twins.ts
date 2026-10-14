// Blog posts with a translated twin (content/blog/<slug>.<loc>.mdx), served at
// /<loc>/blog/<slug> with the same slug as the English post. The language bar
// is a client component and cannot read the content loader, so it reads this
// list; src/lib/blog-source.ts fails the build if it ever disagrees with the
// files on disk.
export const BLOG_LOCALES = ['es', 'pt', 'it'] as const;
export type BlogLocale = (typeof BLOG_LOCALES)[number];

export const BLOG_TWINS: Record<BlogLocale, readonly string[]> = {
  es: ['why-am-i-not-getting-interviews'],
  pt: [],
  it: [],
};
