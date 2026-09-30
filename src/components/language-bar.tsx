'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

// Language switcher + browser-detection suggestion, both living in the header.
// Ported from santifer.io's pattern (cv-santiago): suggest, never auto-redirect
// (an auto-redirect breaks Google's crawl of the hreflang cluster and annoys
// users whose browser is in a language they don't read — a banner is Google's
// own guidance). Detection is client-only; the banner never renders in SSR
// (that caused a React #418 hydration mismatch on santifer.io).
//
// N-locale (en/es/fr 2026-07-21, de 2026-09-30): the switcher shows the
// current locale plus a link per other locale (stateless, no dropdown). Each link resolves to the
// SAFE URL for that locale — docs go to /<loc>/docs (the route redirects an
// untranslated slug to EN), the home to /<loc>, the manifesto to its twin when
// one exists (es) or the locale home otherwise (fr and de have none yet), and
// any other EN-only page to the locale home. So a toggle never 404s.

type Code = 'en' | 'es' | 'fr' | 'de';
const LOCALES: { code: Code; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
  { code: 'fr', label: 'FR' },
  { code: 'de', label: 'DE' },
];
// Locales whose manifesto is actually translated (has an /<loc>/manifesto route).
const MANIFESTO_LOCALES: Code[] = ['es'];

/** Circular flag icons (SVG, not emoji — emoji renders inconsistently). */
function FlagES({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" aria-hidden="true">
      <clipPath id="flagCircleES"><circle cx="8" cy="8" r="8" /></clipPath>
      <g clipPath="url(#flagCircleES)">
        <rect y="0" width="16" height="4" fill="#c60b1e" />
        <rect y="4" width="16" height="8" fill="#ffc400" />
        <rect y="12" width="16" height="4" fill="#c60b1e" />
      </g>
    </svg>
  );
}
function FlagEN({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" aria-hidden="true">
      <clipPath id="flagCircleEN"><circle cx="8" cy="8" r="8" /></clipPath>
      <g clipPath="url(#flagCircleEN)">
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
    <svg className={className} viewBox="0 0 16 16" aria-hidden="true">
      <clipPath id="flagCircleFR"><circle cx="8" cy="8" r="8" /></clipPath>
      <g clipPath="url(#flagCircleFR)">
        <rect width="6" height="16" fill="#002395" />
        <rect x="5" width="6" height="16" fill="#fff" />
        <rect x="10" width="6" height="16" fill="#ed2939" />
      </g>
    </svg>
  );
}
function FlagDE({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" aria-hidden="true">
      <clipPath id="flagCircleDE"><circle cx="8" cy="8" r="8" /></clipPath>
      <g clipPath="url(#flagCircleDE)">
        <rect y="0" width="16" height="6" fill="#000" />
        <rect y="5" width="16" height="6" fill="#dd0000" />
        <rect y="10" width="16" height="6" fill="#ffce00" />
      </g>
    </svg>
  );
}
const FLAG: Record<Code, (p: { className?: string }) => React.ReactNode> = {
  en: FlagEN,
  es: FlagES,
  fr: FlagFR,
  de: FlagDE,
};

/** Which locale is this path? (localized surfaces are prefixed /es, /fr or /de.) */
function localeOf(pathname: string): Code {
  if (pathname === '/es' || pathname.startsWith('/es/')) return 'es';
  if (pathname === '/fr' || pathname.startsWith('/fr/')) return 'fr';
  if (pathname === '/de' || pathname.startsWith('/de/')) return 'de';
  return 'en';
}

/** The EN-relative base path of the current page (locale prefix stripped). */
function baseOf(pathname: string): string {
  const loc = localeOf(pathname);
  if (loc === 'en') return pathname;
  return pathname.slice(3) || '/'; // drop '/es', '/fr' or '/de'
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
  // Any other EN-only page (about, blog, compare, …) has no localized version.
  return `/${target}`;
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
};

/**
 * 3-state machine in sessionStorage (survives re-mounts between navigations):
 *  null → never shown, reveal after a 2s delay · 'shown' → keep visible on
 *  re-mount without re-animating · 'dismissed' → silent for the rest of the
 *  session. The real preference lives in the URL; storage only drives the
 *  banner and expires with the session, so a return visit is re-offered once.
 *  No cookie, no localStorage → zero GDPR surface.
 */
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

  const dismiss = useCallback(() => {
    sessionStorage.setItem(KEY, 'dismissed');
    setVisible(false);
  }, [KEY]);

  return { showBanner: visible, dismiss, animate: visible && firstAppearance.current };
}

// `compact`: never show the sentence, only the switch link. The docs layouts
// render the bar in the narrow sidebar, where the sentence could only wrap.
export function LanguageBar({ compact = false }: { compact?: boolean }) {
  const pathname = usePathname() || '/';
  const current = localeOf(pathname);
  const base = baseOf(pathname);

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
          // Below 1280px the desktop header has no room for it next to the
          // localized tagline, search, theme and the four-language switcher
          // (which stays available): measured 30-sep, the French tagline
          // squeezed the theme toggle to 24px from 1100 to 1260px.
          className={`inline-flex h-8 items-center gap-1.5 whitespace-nowrap rounded-full border border-brand/30 bg-brand/5 ps-3 pe-1.5 text-sm${compact ? '' : ' lg:max-[1279px]:hidden'}${animate ? ' animate-in fade-in slide-in-from-right-2 duration-500' : ''}`}
        >
          {/* The lead-in question needs another ~150px: from 1280 to 1400px
              it squeezed the theme toggle again on /fr and /de. */}
          <span className={compact ? 'hidden' : 'hidden min-[1440px]:inline text-fd-muted-foreground'}>
            {BANNER[target].question}
          </span>
          <Link
            href={localeUrl(base, target)}
            onClick={dismiss}
            className="inline-flex items-center gap-1.5 font-medium text-brand-text hover:underline"
          >
            <TargetFlag className="w-3.5 h-3.5" />
            {BANNER[target].cta}
          </Link>
          <button
            onClick={dismiss}
            aria-label="Dismiss"
            className="inline-flex size-5 items-center justify-center rounded-full text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-foreground transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
      {/* Switcher: the languages in a fixed order, the current one
          highlighted as the selected segment (not a link). */}
      <nav aria-label="Language" className="inline-flex h-8 items-center gap-0.5 rounded-full border bg-fd-card p-0.5 text-sm">
        {LOCALES.map((l) => {
          const Flag = FLAG[l.code];
          // From 1024 to 1119px the desktop header is at its tightest: with
          // four languages the long ES/FR taglines squeezed the theme toggle
          // (measured 30-sep). The codes stay, the flags go; the code is what
          // names the language anyway.
          const inner = (
            <>
              <Flag className={compact ? 'w-3.5 h-3.5' : 'w-3.5 h-3.5 lg:max-[1119px]:hidden'} />
              {l.label}
            </>
          );
          return l.code === current ? (
            <span
              key={l.code}
              aria-current="true"
              className="inline-flex h-full items-center gap-1 rounded-full bg-fd-accent px-2 font-medium text-fd-foreground"
            >
              {inner}
            </span>
          ) : (
            <Link
              key={l.code}
              href={localeUrl(base, l.code)}
              aria-label={`Switch language to ${l.label}`}
              className="inline-flex h-full items-center gap-1 rounded-full px-2 text-fd-muted-foreground hover:bg-fd-accent/60 hover:text-fd-foreground transition-colors"
            >
              {inner}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
