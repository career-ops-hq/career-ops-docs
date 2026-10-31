'use client';

import { usePathname } from 'next/navigation';
import { BLOG_ES_TWINS } from '@/lib/blog-twins';
import Link from 'next/link';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Check, ChevronDown, X } from 'lucide-react';
import { UI } from '@/lib/ui-strings';

// Language switcher + browser-detection suggestion, both living in the header.
// Ported from santifer.io's pattern (cv-santiago): suggest, never auto-redirect
// (an auto-redirect breaks Google's crawl of the hreflang cluster and annoys
// users whose browser is in a language they don't read — a banner is Google's
// own guidance). Detection is client-only; the banner never renders in SSR
// (that caused a React #418 hydration mismatch on santifer.io).
//
// N-locale (en/es/fr 2026-07-21, de 2026-09-30). Since 30-sep the switcher is
// a dropdown: one button with the current language, a menu with every
// language by its native name (four inline pills no longer fit, and each new
// language would add ~55px to the header). The menu's links are ALWAYS in the
// DOM, only hidden while closed, so the server HTML still links every language
// version for crawlers that do not run JS. Each link resolves to the
// SAFE URL for that locale — docs go to /<loc>/docs (the route redirects an
// untranslated slug to EN), the home to /<loc>, the manifesto to its twin when
// one exists (es) or the locale home otherwise (fr, de and pt have none yet), and
// any other EN-only page to the locale home. So a toggle never 404s.

type Code = 'en' | 'es' | 'fr' | 'de' | 'pt' | 'it' | 'zh' | 'tr';
const LOCALES: { code: Code; label: string; name: string }[] = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'es', label: 'ES', name: 'Español' },
  { code: 'fr', label: 'FR', name: 'Français' },
  { code: 'de', label: 'DE', name: 'Deutsch' },
  { code: 'pt', label: 'PT', name: 'Português' },
  { code: 'it', label: 'IT', name: 'Italiano' },
  { code: 'zh', label: 'ZH', name: '简体中文' },
  { code: 'tr', label: 'TR', name: 'Türkçe' },
];
// Locales whose manifesto is actually translated (has an /<loc>/manifesto route).
const MANIFESTO_LOCALES: Code[] = ['es'];

/** Circular flag icons (SVG, not emoji — emoji renders inconsistently). */
// Rounded with CSS, not an SVG <clipPath>: a clipPath needs a document-wide
// id, every copy of a flag shared it, and the first copy lives in the hidden
// crawlable <nav>. A url(#id) that resolves into display:none clips nothing
// visible, so the flag next to the suggestion disappeared.
const FLAG_CLIP = { borderRadius: '50%', overflow: 'hidden' } as const;
function FlagES({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" aria-hidden="true" style={FLAG_CLIP}>
      <g>
        <rect y="0" width="16" height="4" fill="#c60b1e" />
        <rect y="4" width="16" height="8" fill="#ffc400" />
        <rect y="12" width="16" height="4" fill="#c60b1e" />
      </g>
    </svg>
  );
}
function FlagEN({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" aria-hidden="true" style={FLAG_CLIP}>
      <g>
        <rect width="16" height="16" fill="#012169" />
        <path d="M0 0L16 16M16 0L0 16" stroke="#fff" strokeWidth="2.5" />
        <path d="M0 0L16 16M16 0L0 16" stroke="#c8102e" strokeWidth="1.5" />
        <path d="M8 0V16M0 8H16" stroke="#fff" strokeWidth="4" />
        <path d="M8 0V16M0 8H16" stroke="#c8102e" strokeWidth="2.5" />
      </g>
    </svg>
  );
}
function FlagFR({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" aria-hidden="true" style={FLAG_CLIP}>
      <g>
        <rect width="6" height="16" fill="#002395" />
        <rect x="5" width="6" height="16" fill="#fff" />
        <rect x="10" width="6" height="16" fill="#ed2939" />
      </g>
    </svg>
  );
}
function FlagIT({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" aria-hidden="true" style={FLAG_CLIP}>
      <g>
        <rect width="6" height="16" fill="#009246" />
        <rect x="5" width="6" height="16" fill="#fff" />
        <rect x="10" width="6" height="16" fill="#ce2b37" />
      </g>
    </svg>
  );
}
function FlagDE({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" aria-hidden="true" style={FLAG_CLIP}>
      <g>
        <rect y="0" width="16" height="6" fill="#000" />
        <rect y="5" width="16" height="6" fill="#dd0000" />
        <rect y="10" width="16" height="6" fill="#ffce00" />
      </g>
    </svg>
  );
}
// Brazil, not Portugal: the Portuguese content is pt-BR (Brazil is ~87% of the
// Portuguese-language clicks).
function FlagBR({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" aria-hidden="true" style={FLAG_CLIP}>
      <g>
        <rect width="16" height="16" fill="#009c3b" />
        <polygon points="8,2.5 14.5,8 8,13.5 1.5,8" fill="#ffdf00" />
        <circle cx="8" cy="8" r="3" fill="#002776" />
      </g>
    </svg>
  );
}
// No national flag for Chinese: the content is Simplified (mainland
// conventions), but Taiwan and Hong Kong readers are ~75% of the Chinese-language
// clicks, and a PRC flag would speak to only some of them. A neutral disc with
// 中 ("Chinese") instead, the same size as the flags (search-ops F1, 15-oct).
function FlagZH({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" aria-hidden="true" style={FLAG_CLIP}>
      <g>
        <rect width="16" height="16" fill="#52525b" />
        <text x="8" y="12" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">
          中
        </text>
      </g>
    </svg>
  );
}
function FlagTR({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" aria-hidden="true" style={FLAG_CLIP}>
      <rect width="16" height="16" fill="#e30a17" />
      <circle cx="6.5" cy="8" r="4" fill="#fff" />
      <circle cx="7.5" cy="8" r="3.2" fill="#e30a17" />
      <polygon fill="#fff" points="9.40,8.00 10.79,7.55 10.78,6.10 11.63,7.28 13.02,6.82 12.16,8.00 13.02,9.18 11.63,8.72 10.78,9.90 10.79,8.45" />
    </svg>
  );
}

const FLAG: Record<Code, (p: { className?: string }) => React.ReactNode> = {
  en: FlagEN,
  es: FlagES,
  fr: FlagFR,
  de: FlagDE,
  pt: FlagBR,
  it: FlagIT,
  zh: FlagZH,
  tr: FlagTR,
};

/** Which locale is this path? (localized surfaces are prefixed /es, /fr, /de, /pt, /it, /zh or /tr.) */
function localeOf(pathname: string): Code {
  if (pathname === '/es' || pathname.startsWith('/es/')) return 'es';
  if (pathname === '/fr' || pathname.startsWith('/fr/')) return 'fr';
  if (pathname === '/de' || pathname.startsWith('/de/')) return 'de';
  if (pathname === '/pt' || pathname.startsWith('/pt/')) return 'pt';
  if (pathname === '/it' || pathname.startsWith('/it/')) return 'it';
  if (pathname === '/zh' || pathname.startsWith('/zh/')) return 'zh';
  if (pathname === '/tr' || pathname.startsWith('/tr/')) return 'tr';
  return 'en';
}

/** The EN-relative base path of the current page (locale prefix stripped). */
function baseOf(pathname: string): string {
  const loc = localeOf(pathname);
  if (loc === 'en') return pathname;
  return pathname.slice(3) || '/'; // drop '/es', '/fr', '/de', '/pt', '/it', '/zh' or '/tr'
}

/** The URL for `target` locale of the page whose EN-relative path is `base`.
 *  Always resolves to a route that exists (or safely redirects), so no 404. */
function localeUrl(base: string, target: Code): string {
  if (target === 'en') {
    // EN pages are unprefixed. Docs/home/manifesto/etc. all live at `base`.
    return base;
  }
  if (base === '/') return `/${target}`; // home
  if (base.startsWith('/docs')) return `/${target}${base}`; // route redirects if untranslated
  if (base === '/manifesto') {
    // A manifesto twin exists only for some locales; otherwise send to the home.
    return MANIFESTO_LOCALES.includes(target) ? `/${target}/manifesto` : `/${target}`;
  }
  if (base === '/waitlist') return `/${target}/waitlist`;
  if (target === 'es' && base.startsWith('/blog/') && BLOG_ES_TWINS.includes(base.slice(6))) {
    return `/es${base}`; // a blog post with a Spanish twin (same slug)
  }
  // Any other EN-only page (about, blog, compare, …) has no localized version.
  return `/${target}`;
}

/** The ?ref of a waitlist page, to carry across languages: it says where the
 *  reader came from, and warpchart reads it per signup. Read after mount because
 *  the page is static. Empty on every other page. */
function useWaitlistRefQuery(base: string): string {
  const [query, setQuery] = useState('');
  useEffect(() => {
    if (base !== '/waitlist') return;
    const ref = new URLSearchParams(window.location.search).get('ref');
    setQuery(ref ? `?ref=${encodeURIComponent(ref)}` : '');
  }, [base]);
  return query;
}

/** Best browser-preferred locale we support (walks navigator.languages in order). */
function detectLocale(): Code {
  if (typeof navigator === 'undefined') return 'en';
  const prefs = navigator.languages?.length ? navigator.languages : [navigator.language || 'en'];
  for (const p of prefs) {
    const base = p.toLowerCase().split('-')[0];
    const hit = LOCALES.find((l) => l.code === base);
    if (hit) return hit.code;
  }
  return 'en';
}

// The suggestion speaks the TARGET language — the reader may not read the
// page's. The link says what it does ("View in English"); the question is the
// optional lead-in, shown only where the header has room for it.
const BANNER: Record<Code, { question: string; cta: string }> = {
  en: { question: 'Prefer English?', cta: 'View in English' },
  es: { question: '¿Prefieres español?', cta: 'Ver en español' },
  fr: { question: 'Vous préférez le français ?', cta: 'Voir en français' },
  de: { question: 'Lieber auf Deutsch?', cta: 'Auf Deutsch ansehen' },
  pt: { question: 'Prefere português?', cta: 'Ver em português' },
  it: { question: 'Preferisci l\u2019italiano?', cta: 'Leggi in italiano' },
  zh: { question: '更想看中文？', cta: '查看中文版' },
  tr: { question: 'Türkçe okumak ister misin?', cta: 'Türkçeye geç' },
};

/**
 * 3-state machine in sessionStorage (survives re-mounts between navigations):
 *  null → never shown, reveal after a 2s delay · 'shown' → keep visible on
 *  re-mount without re-animating · 'dismissed' → silent for the rest of the
 *  session. The real preference lives in the URL; storage only drives the
 *  banner and expires with the session, so a return visit is re-offered once.
 *  No cookie, no localStorage → zero GDPR surface.
 */
const DISMISS_EVENT = 'lang-banner-dismiss';

function useLanguageBanner(target: Code, mismatch: boolean) {
  const KEY = `lang-banner-dismissed:${target}`;
  const stored = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem(KEY) : null;
  const [visible, setVisible] = useState(stored === 'shown');
  const firstAppearance = useRef(stored !== 'shown');

  useEffect(() => {
    if (stored || !mismatch) return;
    const t = setTimeout(() => {
      sessionStorage.setItem(KEY, 'shown');
      setVisible(true);
    }, 2000);
    return () => clearTimeout(t);
  }, [KEY, stored, mismatch]);

  // Auto-dismiss once the mismatch is gone (user switched language themselves).
  useEffect(() => {
    if (visible && !mismatch) {
      sessionStorage.setItem(KEY, 'dismissed');
      setVisible(false);
    }
  }, [KEY, visible, mismatch]);

  // The banner can be mounted more than once (header, mobile panel, floating
  // pill): closing one closes them all.
  useEffect(() => {
    const onDismiss = () => setVisible(false);
    window.addEventListener(DISMISS_EVENT, onDismiss);
    return () => window.removeEventListener(DISMISS_EVENT, onDismiss);
  }, []);

  const dismiss = useCallback(() => {
    sessionStorage.setItem(KEY, 'dismissed');
    setVisible(false);
    window.dispatchEvent(new Event(DISMISS_EVENT));
  }, [KEY]);

  return { showBanner: visible, dismiss, animate: visible && firstAppearance.current };
}

// `compact`: never show the sentence, only the switch link. The docs layouts
// render the bar in the narrow sidebar, where the sentence could only wrap.
export function LanguageBar({ compact = false }: { compact?: boolean }) {
  const pathname = usePathname() || '/';
  const current = localeOf(pathname);
  const base = baseOf(pathname);
  const refQuery = useWaitlistRefQuery(base);

  // Client-only: don't render the detection banner during SSR (hydration).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const target = mounted ? detectLocale() : current;
  const mismatch = mounted && target !== current;
  const { showBanner, dismiss, animate } = useLanguageBanner(target, mismatch);

  const TargetFlag = FLAG[target];

  return (
    <div className={compact ? 'flex flex-col items-start gap-2' : 'flex items-center gap-2'}>
      {mounted && showBanner && (
        <div
          data-lang-banner
          // Measured 30-sep with the dropdown (four languages, 16px steps):
          // the tightest header is /fr, whose long tagline needs 1136px for
          // the banner and 1264px for banner + question. Below that the theme
          // toggle gets squeezed, so the banner shows from 1152px and the
          // question from 1280px (xl). Re-measure when a language is added:
          // .claude/skills/nuevo-idioma/kit/medir-cabecera.js.
          className={`inline-flex h-8 items-center gap-1.5 whitespace-nowrap rounded-full border border-brand/30 bg-brand/5 ps-3 pe-1.5 text-sm${compact ? '' : ' lg:max-[1151px]:hidden'}${animate ? ' animate-in fade-in slide-in-from-right-2 duration-500' : ''}`}
        >
          <span data-banner-question className={compact ? 'hidden' : 'hidden xl:inline text-fd-muted-foreground'}>
            {BANNER[target].question}
          </span>
          <Link
            href={localeUrl(base, target) + refQuery}
            onClick={dismiss}
            className="inline-flex items-center gap-1.5 font-medium text-brand-text hover:underline"
          >
            <TargetFlag className="w-3.5 h-3.5" />
            {BANNER[target].cta}
          </Link>
          <button
            onClick={dismiss}
            aria-label={UI[target].dismiss}
            className="inline-flex size-5 items-center justify-center rounded-full text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-foreground transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
      <LanguageMenu current={current} base={base} compact={compact} />
    </div>
  );
}

/**
 * The same suggestion, for screens where the header has no room for it.
 * Below lg the header's links live in the collapsed mobile menu, so a reader
 * whose browser is in Portuguese landing on an English page never saw the
 * offer; between 1024 and 1151px the header hides it to keep the theme
 * toggle. Mounted once per page (RootShell); it shows only while no header
 * copy of the banner is actually on screen, so the two never appear together.
 * Bottom-start, clear of the AI search button at bottom-end of the docs.
 */
export function LanguageSuggestion() {
  const pathname = usePathname() || '/';
  const current = localeOf(pathname);
  const base = baseOf(pathname);
  const refQuery = useWaitlistRefQuery(base);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const target = mounted ? detectLocale() : current;
  const mismatch = mounted && target !== current;
  const { showBanner, dismiss, animate } = useLanguageBanner(target, mismatch);

  const [headerShows, setHeaderShows] = useState(true);
  useEffect(() => {
    if (!showBanner) return;
    // On screen, not merely rendered: the docs keep a copy in the mobile
    // drawer, which has a layout box while closed off-canvas. Hit-testing the
    // banner's centre tells a visible copy from a hidden or covered one.
    const onScreen = (el: Element) => {
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return false;
      const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
      return !!hit && el.contains(hit);
    };
    const check = () => setHeaderShows(Array.from(document.querySelectorAll('[data-lang-banner]')).some(onScreen));
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [showBanner]);

  if (!mounted || !showBanner || headerShows) return null;
  const TargetFlag = FLAG[target];
  return (
    <div
      lang={target}
      className={`fixed bottom-4 inset-s-4 z-20 inline-flex h-10 items-center whitespace-nowrap gap-1.5 rounded-full border border-brand/30 bg-fd-background ps-3.5 pe-2 text-sm shadow-lg${animate ? ' animate-in fade-in slide-in-from-bottom-2 duration-500' : ''}`}
    >
      <Link
        href={localeUrl(base, target) + refQuery}
        hrefLang={target}
        onClick={dismiss}
        className="inline-flex items-center gap-1.5 font-medium text-brand-text hover:underline"
      >
        <TargetFlag className="w-3.5 h-3.5" />
        {BANNER[target].cta}
      </Link>
      <button
        onClick={dismiss}
        aria-label={UI[target].dismiss}
        className="inline-flex size-6 shrink-0 items-center justify-center rounded-full text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-foreground transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

/**
 * Disclosure-navigation dropdown (WAI-ARIA "disclosure navigation menu"): a
 * button that shows and hides a list of links. No role="menu", which would
 * promise arrow-key handling; Tab moves through the links. Closes on Escape
 * (focus returns to the button), on a click outside, on navigation, and on
 * scroll or resize (a fixed-position menu would otherwise drift off its button).
 *
 * The open menu is portaled to <body> with position: fixed under the button.
 * Fumadocs' mobile panel lives inside a Radix NavigationMenu viewport with
 * overflow: hidden, which clipped an absolute dropdown; laying the list out
 * in the panel's flow instead pushed the GitHub and theme buttons around
 * (Santiago, 1-oct). A portal escapes every container the bar sits in: the
 * desktop header, the docs sidebar and the mobile panel.
 *
 * A hidden copy of the links is always in the server HTML, so crawlers that
 * do not run JS still see every language version.
 */
const MENU_MIN_W = 192; // min-w-48

function LanguageMenu({ current, base, compact }: { current: Code; base: string; compact: boolean }) {
  const refQuery = useWaitlistRefQuery(base);
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ top: number; left?: number; right?: number } | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  useEffect(() => setOpen(false), [pathname]);

  const place = useCallback(() => {
    const r = btnRef.current?.getBoundingClientRect();
    if (!r) return;
    const top = r.bottom + 6;
    const vw = window.innerWidth;
    // Open towards the side with room: from the button's left edge when the
    // button sits in the left half (docs sidebar, mobile menu panel), from its
    // right edge otherwise (desktop header). Either way, keep 8px inside the
    // viewport: hung from the right edge in the mobile panel, it overflowed.
    if (compact || r.left + r.width / 2 < vw / 2) {
      setPos({ top, left: Math.max(8, Math.min(r.left, vw - MENU_MIN_W - 8)) });
    } else {
      setPos({ top, right: Math.max(8, vw - r.right) });
    }
  }, [compact]);

  useEffect(() => {
    if (!open) return;
    const inside = (t: EventTarget | null) =>
      !!t && (btnRef.current?.contains(t as Node) || menuRef.current?.contains(t as Node));
    const onDown = (e: MouseEvent) => {
      if (!inside(e.target)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      btnRef.current?.focus();
    };
    const onMove = (e: Event) => {
      if (!inside(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onMove);
    window.addEventListener('scroll', onMove, true);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onMove);
      window.removeEventListener('scroll', onMove, true);
    };
  }, [open]);

  const cur = LOCALES.find((l) => l.code === current) ?? LOCALES[0];
  const CurFlag = FLAG[cur.code];
  // The bar renders twice (desktop header and the mobile menu panel), so a
  // fixed id would be duplicated: useId keeps aria-controls unambiguous.
  const menuId = `language-menu-${useId().replace(/:/g, '')}`;

  const list = (
    <ul className="flex flex-col gap-0.5">
      {LOCALES.map((l) => {
        const Flag = FLAG[l.code];
        const isCurrent = l.code === current;
        const inner = (
          <>
            <Flag className="w-4 h-4 shrink-0" />
            <span lang={l.code} className="flex-1">{l.name}</span>
            {isCurrent ? (
              <Check aria-hidden="true" className="w-4 h-4 text-brand-text" />
            ) : (
              <span className="text-xs text-fd-muted-foreground">{l.label}</span>
            )}
          </>
        );
        return (
          <li key={l.code} data-locale={l.code}>
            {isCurrent ? (
              <span
                aria-current="true"
                className="flex items-center gap-2.5 rounded-lg bg-fd-accent px-2.5 py-2 font-medium text-fd-foreground"
              >
                {inner}
              </span>
            ) : (
              // Full-strength text: the muted grey read as "disabled" in dark
              // mode. The current language is marked by the check, the accent
              // background and aria-current, not by dimming the others.
              <Link
                href={localeUrl(base, l.code) + refQuery}
                hrefLang={l.code}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-fd-foreground hover:bg-fd-accent transition-colors"
              >
                {inner}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="relative">
      <button
        ref={btnRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={UI[current].languageMenu(cur.name)}
        onClick={() => {
          if (!open) place();
          setOpen((o) => !o);
        }}
        className="inline-flex h-8 items-center gap-1.5 rounded-full border bg-fd-card ps-2.5 pe-2 text-sm font-medium text-fd-foreground hover:bg-fd-accent transition-colors"
      >
        <CurFlag className="w-3.5 h-3.5" />
        {cur.label}
        <ChevronDown
          aria-hidden="true"
          className={`w-3.5 h-3.5 text-fd-muted-foreground transition-transform${open ? ' rotate-180' : ''}`}
        />
      </button>
      {/* Server-rendered, never shown: the crawlable copy of the links. */}
      <nav aria-label={UI[current].languageNav} className="hidden">
        {list}
      </nav>
      {open &&
        pos &&
        createPortal(
          <nav
            ref={menuRef}
            id={menuId}
            aria-label={UI[current].languageNav}
            style={{ position: 'fixed', top: pos.top, left: pos.left, right: pos.right }}
            className="z-[100] min-w-48 rounded-xl border bg-fd-popover p-1.5 text-sm text-fd-popover-foreground shadow-lg animate-in fade-in zoom-in-95 duration-100"
          >
            {list}
          </nav>,
          document.body,
        )}
    </div>
  );
}
