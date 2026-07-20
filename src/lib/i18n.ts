import { defineI18n } from 'fumadocs-core/i18n';

// i18n lives ONLY on the loader (fumadocs-core). defineDocs/defineConfig in
// this version have no i18n field, so source.config.ts stays untouched, and
// getPage()/getPages()/getPageTree() with no locale argument keep defaulting to
// `en` — the 8 EN consumers of `source` (sitemap, og, llms.*, chat, search,
// docs page + layout) render byte-identically without any change.
//
//  - parser 'dot'            translations are sibling files: page.mdx (EN) +
//                            page.es.mdx. No folder-per-language, no tree move.
//  - hideLocale 'default-locale'  EN keeps its unprefixed /docs/** URLs (the 48
//                            indexed pages must NOT move). A translated page is
//                            served at /es/docs/** by an explicit Next route
//                            that reuses the EN render — no middleware, no
//                            [lang] segment.
//  - fallbackLanguage null   NO fallback. getPages('es') returns ONLY pages that
//                            actually have an .es.mdx, so /es/docs/* exists
//                            exclusively for real translations (Option B). The
//                            ES tree is thus the curated buyer/entity subset by
//                            construction — the README/web frontera — and
//                            hreflang is derived from .es.mdx existence, never a
//                            hand-kept map (search-ops drift contract, point b).
export const i18n = defineI18n({
  defaultLanguage: 'en',
  languages: ['en', 'es'],
  parser: 'dot',
  hideLocale: 'default-locale',
  fallbackLanguage: null,
});
