import { blog } from 'collections/server';
import { type InferPageType, loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';

// Blog source — paralela a docs source pero con baseUrl distinto y
// schema extendido (date, tags, summary). Auto-discovery vía
// blogSource.getPages() permite que sitemap.ts y archive page se
// generen sin mantener listas hardcoded.
export const blogSource = loader({
  baseUrl: '/blog',
  source: blog.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export type BlogPage = InferPageType<typeof blogSource>;
