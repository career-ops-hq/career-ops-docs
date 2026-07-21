import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';
import { z } from 'zod';

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections
export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    // seoTitle decouples the <title> tag (long, query + brand — for
    // SERP/AI-citation) from the visible H1 (short, the command name —
    // Fumadocs ties both to `title` by default). Optional: pages
    // without it keep title as the <title>.
    schema: pageSchema.extend({
      seoTitle: z.string().optional(),
      // i18n contract (search-ops, 2026-07-20). Only present on translation
      // files (page.es.mdx); EN pages omit them. translationHash = hash of the
      // EN response body this translation tracks (drift trigger, read by the
      // Phase-2 sync Action). localized = its framing is transcreated to the
      // language's fan-out (excluded from parity). translatedFrom = EN source URL.
      translationHash: z.string().optional(),
      localized: z.boolean().optional(),
      translatedFrom: z.string().optional(),
    }),
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

// /blog — separate collection for long-form editorial content.
// Distinct from /docs (tutorial-style technical reference). Each post
// extends pageSchema with author + date + tags + canonical for
// Article/BlogPosting schema emission and dateModified accuracy.
export const blog = defineDocs({
  dir: 'content/blog',
  docs: {
    schema: pageSchema.extend({
      date: z.string(),
      lastModified: z.string().optional(),
      tags: z.array(z.string()).default([]),
      summary: z.string().optional(),
      // Optional FAQ mirror — when present, the post emits a FAQPage JSON-LD
      // alongside the BlogPosting graph (AI Overviews prefer FAQ structured
      // data backed by visible content, so keep these in sync with the
      // visible "Frequently asked" section in the body).
      faq: z
        .array(z.object({ q: z.string(), a: z.string() }))
        .optional(),
    }),
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  mdxOptions: {
    // MDX options
  },
});
