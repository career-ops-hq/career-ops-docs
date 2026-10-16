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
  // 'fr' added 2026-07-21 (French pilot). Same loader-only model: a page has a
  // French twin iff its .fr.mdx exists; /fr/docs/** is served by an explicit
  // Next route reusing the EN render. Grows page by page like 'es'.
  // 'de' added 2026-09-30: Germany is the #4 country by pageviews and Google
  // clicks and the first non-English-speaking market; full parity from day one
  // (the index must be translated or /de/docs falls back to English).
  // 'pt' added 2026-10-13: Brazilian Portuguese (pt-BR content, code 'pt'),
  // the next language by demand; the core ships modes/pt. Full parity.
  // 'it' added 2026-10-13: Italian ("tu"), the core ships all ten modes in
  // modes/it. Full parity.
  // 'zh' added 2026-10-15: Simplified Chinese (zh-Hans content, code 'zh'),
  // as the core's README.cn and modes/zh. Full parity.
  languages: ['en', 'es', 'fr', 'de', 'pt', 'it', 'zh'],
  parser: 'dot',
  hideLocale: 'default-locale',
  fallbackLanguage: null,
});
