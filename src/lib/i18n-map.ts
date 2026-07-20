// Translation map for the Spanish (es) surfaces of career-ops.org.
//
// The full Fumadocs i18n system (defineI18n + [lang] routing) is the
// eventual home for this — until then, translated pages ship as
// standalone /es/ routes at the SAME path they will keep under Fumadocs
// i18n (hideLocale: 'default-locale'), so there is no URL change / link
// rot when the system lands. This map is the single source for the
// bidirectional hreflang cluster: the EN docs page reads it to emit its
// alternate, and each ES page emits the reciprocal — a one-directional
// or self-refless hreflang is worse than none (search-ops).
//
// Key: the EN docs URL path (page.url from the Fumadocs source).
// Value: the ES URL path.
export const ES_TRANSLATIONS: Record<string, string> = {
  '/docs/introduction/what-is-career-ops':
    '/es/docs/introduction/what-is-career-ops',
};

const ORIGIN = 'https://career-ops.org';

/** hreflang alternates for a page that has an ES twin (or is one).
 *  Returns the languages map for Next metadata `alternates.languages`,
 *  bidirectional + x-default → EN. Pass the EN path (the map key). */
export function hreflangFor(enPath: string): Record<string, string> | null {
  const esPath = ES_TRANSLATIONS[enPath];
  if (!esPath) return null;
  return {
    en: `${ORIGIN}${enPath}`,
    es: `${ORIGIN}${esPath}`,
    'x-default': `${ORIGIN}${enPath}`,
  };
}

/** The home pair: EN at `/`, ES at `/es`. Kept separate from the docs
 *  ES_TRANSLATIONS map because the EN home path is `/` (root), not a
 *  docs URL. Same bidirectional + x-default → EN shape. */
export const HOME_EN = '/';
export const HOME_ES = '/es';
export function hreflangHome(): Record<string, string> {
  return {
    en: `${ORIGIN}/`,
    es: `${ORIGIN}/es`,
    'x-default': `${ORIGIN}/`,
  };
}
