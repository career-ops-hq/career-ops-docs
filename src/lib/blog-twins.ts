// Blog posts with a Spanish twin (content/blog/<slug>.es.mdx), served at
// /es/blog/<slug> with the same slug as the English post. The language bar is
// a client component and cannot read the content loader, so it reads this
// list; src/lib/blog-source.ts fails the build if it ever disagrees with the
// files on disk.
export const BLOG_ES_TWINS: readonly string[] = ['why-am-i-not-getting-interviews'];
