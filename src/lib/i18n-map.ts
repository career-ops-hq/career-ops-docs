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

/** Bidirectional hreflang for a docs page that HAS a real ES twin.
 *  Pass the EN page.url (e.g. /docs/introduction/what-is-career-ops); the ES
 *  twin lives at /es + that path. x-default → EN (the canonical language). */
export function docsHreflang(enUrl: string): Record<string, string> {
  return {
    en: `${ORIGIN}${enUrl}`,
    es: `${ORIGIN}/es${enUrl}`,
    'x-default': `${ORIGIN}${enUrl}`,
  };
}

/** The home pair: EN at `/`, ES at `/es`. Same bidirectional + x-default → EN
 *  shape, kept explicit because the home is not a Fumadocs docs page. */
export const HOME_EN = '/';
export const HOME_ES = '/es';
export function hreflangHome(): Record<string, string> {
  return {
    en: `${ORIGIN}/`,
    es: `${ORIGIN}/es`,
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
