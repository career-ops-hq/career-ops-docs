import type { ReactNode } from 'react';
import { instrumentSerif } from '@/lib/fonts';

// Home copy dictionary: the shared type and helpers. Each language's copy
// lives in its own file (home-en.tsx, home-es.tsx, home-fr.tsx, home-de.tsx),
// so editing one home moves only that home's lastmod (see home-date.ts).
// Before October 2026 the four lived here, and any edit to one of them moved
// the date of all four.
//
// Home copy dictionary — one trunk, text varies by language. The home
// component renders IDENTICAL structure/widgets for every locale; only
// these strings change. Rich blocks (brand spans, links) are ReactNode
// so the formatting travels with the translation. Same keys in every
// locale. NEVER translated (stay hardcoded in the component): the thesis
// signature, "career-ops"/"CareerOps", the canonical name, mode command
// strings, code identifiers.
//
// Static numbers inside prose (740 listings, 68 applications) are part
// of the copy. LIVE stats (star/fork counts) are interpolated in the
// component from getProjectStats, not here.

export type HomeDict = {
  heroHook: ReactNode;
  heroH1: ReactNode;
  runItNow: string;
  // Page language, for the star button's click event (its label stays English).
  locale: 'en' | 'es' | 'fr' | 'de';
  // Locale-aware destination for the "get started" / docs CTAs: EN '/docs',
  // ES '/es/docs'. Keeps the Spanish home sending users into the Spanish docs
  // (which now has a translated landing) instead of dropping them into English.
  docsHref: string;
  // Locale-aware manifesto link (EN '/manifesto', ES '/es/manifesto'). Same
  // reason as docsHref: the Spanish home must send readers to the Spanish
  // manifesto, not drop them into the English one.
  manifestoHref: string;
  // Small note under the hero buttons: the price answer where the decision is
  // made. "for candidates" is the qualifier that keeps it from a bare "free".
  heroFreeNote: string;
  featuredIn: string;
  // Label for the Vercel Open Source Program badge, a separate group from the press.
  memberOf: string;
  // One line under the "What is career-ops?" text, to the guide on judging a
  // job before applying. Optional: absent on a locale where that guide has no
  // translation. (Until 30-sep that was fr; the /fr route redirects an
  // untranslated slug to English, so the link is safe either way.)
  worthApplyingLabel?: string;
  worthApplyingHref?: string;
  authorTagline: string;
  // Official localized rendering of the signature thesis, shown BELOW the
  // literal-English blockquote (which stays verbatim on every locale, it is the
  // citable entity anchor). Optional: absent on EN (no sub-line), present on ES.
  thesisTranslation?: string;
  nowSignedManifesto: ReactNode;
  readIt: string;
  whatIsHeading: ReactNode;
  whatIsBody: ReactNode;
  statsComment: string; // after "// {N} " — "stars · Open source · MIT"
  commandCenter: ReactNode;
  tryItOut: string;
  runsCommand: ReactNode; // "Needs an AI coding CLI… Get one free."
  mechanism: string;
  analogy: ReactNode;
  featAgnosticTitle: string;
  featAgnosticBody: ReactNode;
  featApplyTitle: string;
  featApplyBody1: ReactNode;
  featApplyBody2: string;
  featApplyCta: string;
  featScanTitle: string;
  featScanBody: ReactNode;
  featScanCta: string;
  featCommunityTitle: string;
  featCommunityBody: ReactNode;
  joinDiscord: (n: string) => string;
  openSourceTitle: string;
  starsWord: string;
  forksWord: string;
  repoOfDay: string;
  builtByDek: ReactNode;
  meetContributors: string;
  faqHeading: string;
  faq: { q: string; a: ReactNode }[];
  finalCta: string;
  yourTurn: string;
  followWhatWeShip: string;
  releaseBlurb: ReactNode;
};

export const brand = (t: ReactNode) => <span className="text-brand">{t}</span>;

// Hero line (decided by Santiago, 29-sep): the rival is the process, volume
// and silence, never the companies. Same size and weight throughout; the
// hierarchy comes only from colour, in three steps (venture-ops spec V6 +
// V7a, ratios in consultas/tipografia-mensaje-2026-09-29): the pain in cool
// grey, the turn ("Stop guessing") in olive, the action in full ink, with
// one orange word. "silence" is set in the real Instrument Serif Italic
// (font-synthesis is off on the parent, so a missing face stays upright
// instead of being slanted by the browser). Each sentence is inline-block,
// so the line only breaks between sentences: two lines on wide screens,
// four on phones.
const HOOK_PAIN = 'text-[#6b7280] dark:text-[#8a8f98]';
const HOOK_TURN = 'text-[#59592a] dark:text-[#b7af7e]';
const HOOK_ACTION = 'text-[#26261a] dark:text-[#e4e2d0]';
const HOOK_ACCENT = 'text-[#a55212] dark:text-[#dd7627]';

export function heroLine(t: {
  more: string;
  silencePre: string;
  silence: string;
  silencePost: string;
  stop: string;
  startPre: string;
  choose: string;
  startPost: string;
}): ReactNode {
  return (
    <>
      <span className={`block ${HOOK_PAIN}`}>
        <span className="inline-block">{t.more}</span>{' '}
        <span className="inline-block">
          {t.silencePre}
          <span className={instrumentSerif.className}>{t.silence}</span>
          {t.silencePost}
        </span>
      </span>
      <span className="block max-md:mt-[0.25em]">
        <span className={`inline-block ${HOOK_TURN}`}>{t.stop}</span>{' '}
        <span className={`inline-block ${HOOK_ACTION}`}>
          {t.startPre}
          <span className={HOOK_ACCENT}>{t.choose}</span>
          {t.startPost}
        </span>
      </span>
    </>
  );
}
