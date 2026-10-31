// Shared rules for the web version waitlist (/waitlist, /<locale>/waitlist). Two
// separate things are stored in the project's private Blob store, with no key
// in common: the email, on its own, for the one message; and the counts (ref,
// language, country, assistants) with the day and no email, which is what makes
// "your country and answer only count toward totals" true.

export const ASSISTANTS = ['chatgpt', 'gemini', 'claude', 'other', 'none'] as const;
export type Assistant = (typeof ASSISTANTS)[number];

export const WAITLIST_LOCALES = ['en', 'es', 'fr', 'de', 'pt', 'it', 'zh', 'tr'] as const;
export type WaitlistLocale = (typeof WAITLIST_LOCALES)[number];

export const LOADS_PREFIX = 'waitlist-loads';
export const JOINS_PREFIX = 'waitlist-joins';
export const EMAILS_PREFIX = 'waitlist-emails';

// ISO 3166-1 alpha-2. The form shows each name in the page's language through
// Intl.DisplayNames, and the API only accepts these codes.
export const COUNTRIES = (
  'AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ ' +
  'CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO ' +
  'FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE ' +
  'JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO ' +
  'MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW ' +
  'PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM ' +
  'TN TO TR TT TV TW TZ UA UG UM US UY UZ VA VC VE VG VI VN VU WF WS YE YT ZA ZM ZW'
).split(' ');

/** Where the visitor came from (?ref=readme-en). Empty is `direct`; anything
 *  that is not a short slug is `other`, so a crafted link can't write free text
 *  into the store. */
export function normalizeRef(ref: unknown): string {
  if (typeof ref !== 'string' || ref === '') return 'direct';
  const slug = ref.toLowerCase();
  return /^[a-z0-9-]{1,40}$/.test(slug) ? slug : 'other';
}

/** Assistant answers as five 0/1 flags in ASSISTANTS order, one per option,
 *  never as joined text. */
export function assistantFlags(picked: readonly Assistant[]): string {
  return ASSISTANTS.map((a) => (picked.includes(a) ? '1' : '0')).join('');
}

/** Day of an event, with no time of day. */
export function eventDay(now = new Date()): string {
  return now.toISOString().slice(0, 10);
}
