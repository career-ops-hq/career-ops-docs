// hreflang helpers for the Spanish (es) surfaces of career-ops.org.
//
// The docs cluster is NO LONGER a hand-kept map (search-ops drift contract,
// point b): a page has an ES twin iff its .es.mdx exists, which the Fumadocs
// source knows directly (source.getPage(slug, 'es') resolves only for real
// translations, because i18n runs with fallbackLanguage:null). Callers check
// that existence and, when true, build the cluster with `docsHreflang`. The ES
// URL is deterministic — /es + the EN path — because slugs are not translated.
//
// The home pair stays explicit here: the home is a TSX dictionary component,
// not a Fumadocs docs page, so there is no .es.mdx to derive it from.

const ORIGIN = 'https://career-ops.org';

/** Non-default locales that can have docs twins. Extend as languages are added
 *  (each also needs its route group + defineI18n entry). */
export const DOCS_LOCALES = ['es', 'fr'] as const;

/** Bidirectional hreflang cluster for a docs page, built from the locales that
 *  actually have a twin. Pass the EN page.url and the subset of DOCS_LOCALES
 *  whose .<loc>.mdx exists (the caller checks via source.getPage(slug, loc), so
 *  the cluster is always truthful — never a hand-kept map). Locale URL is
 *  deterministically /<loc> + the EN path (slugs are not translated). x-default
 *  → EN (the canonical language). */
export function docsHreflang(
  enUrl: string,
  locales: readonly string[],
): Record<string, string> {
  const langs: Record<string, string> = {
    en: `${ORIGIN}${enUrl}`,
    'x-default': `${ORIGIN}${enUrl}`,
  };
  for (const loc of locales) langs[loc] = `${ORIGIN}/${loc}${enUrl}`;
  return langs;
}

/** The home pair: EN at `/`, ES at `/es`. Same bidirectional + x-default → EN
 *  shape, kept explicit because the home is not a Fumadocs docs page. */
export const HOME_EN = '/';
export const HOME_ES = '/es';
export const HOME_FR = '/fr';
export function hreflangHome(): Record<string, string> {
  return {
    en: `${ORIGIN}/`,
    es: `${ORIGIN}/es`,
    fr: `${ORIGIN}/fr`,
    'x-default': `${ORIGIN}/`,
  };
}

/** The manifesto pair: EN at `/manifesto`, ES at `/es/manifesto`. Explicit
 *  like the home because /manifesto is a standalone TSX article, not a
 *  Fumadocs docs page. Same bidirectional + x-default → EN shape. */
export const MANIFESTO_EN = '/manifesto';
export const MANIFESTO_ES = '/es/manifesto';
export function hreflangManifesto(): Record<string, string> {
  return {
    en: `${ORIGIN}/manifesto`,
    es: `${ORIGIN}/es/manifesto`,
    'x-default': `${ORIGIN}/manifesto`,
  };
}
