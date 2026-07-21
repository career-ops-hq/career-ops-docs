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
// N-locale (en/es/fr, 2026-07-21): the switcher shows the current locale plus a
// link per other locale (stateless, no dropdown). Each link resolves to the
// SAFE URL for that locale — docs go to /<loc>/docs (the route redirects an
// untranslated slug to EN), the home to /<loc>, the manifesto to its twin when
// one exists (es) or the locale home otherwise (fr has no manifesto yet), and
// any other EN-only page to the locale home. So a toggle never 404s.

type Code = 'en' | 'es' | 'fr';
const LOCALES: { code: Code; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
  { code: 'fr', label: 'FR' },
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
const FLAG: Record<Code, (p: { className?: string }) => React.ReactNode> = {
  en: FlagEN,
  es: FlagES,
  fr: FlagFR,
};

/** Which locale is this path? (localized surfaces are prefixed /es or /fr.) */
function localeOf(pathname: string): Code {
  if (pathname === '/es' || pathname.startsWith('/es/')) return 'es';
  if (pathname === '/fr' || pathname.startsWith('/fr/')) return 'fr';
  return 'en';
}

/** The EN-relative base path of the current page (locale prefix stripped). */
function baseOf(pathname: string): string {
  const loc = localeOf(pathname);
  if (loc === 'en') return pathname;
  return pathname.slice(3) || '/'; // drop '/es' or '/fr'
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

// The banner speaks the TARGET language — the reader may not read the page's.
const BANNER: Record<Code, { message: string; prefix: string }> = {
  en: { message: 'This site is available in English', prefix: 'Switch to' },
  es: { message: 'Este sitio está disponible en español', prefix: 'Cambiar a' },
  fr: { message: 'Ce site est disponible en français', prefix: 'Passer en' },
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

export function LanguageBar() {
  const pathname = usePathname() || '/';
  const current = localeOf(pathname);
  const base = baseOf(pathname);
  const others = LOCALES.filter((l) => l.code !== current);

  // Client-only: don't render the detection banner during SSR (hydration).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const target = mounted ? detectLocale() : current;
  const mismatch = mounted && target !== current;
  const { showBanner, dismiss, animate } = useLanguageBanner(target, mismatch);

  const CurrentFlag = FLAG[current];
  const TargetFlag = FLAG[target];

  return (
    <div className="flex items-center gap-2.5">
      {mounted && showBanner && (
        <div
          className={`flex items-center gap-2 text-sm${animate ? ' animate-in fade-in slide-in-from-right-2 duration-500' : ''}`}
        >
          <span className="hidden lg:inline text-fd-muted-foreground">
            {BANNER[target].message}
          </span>
          <Link
            href={localeUrl(base, target)}
            onClick={dismiss}
            className="inline-flex items-center gap-1 font-medium text-brand hover:text-brand-200 transition-colors"
          >
            {BANNER[target].prefix}
            <TargetFlag className="w-3.5 h-3.5 mx-0.5" />
            {LOCALES.find((l) => l.code === target)!.label}
          </Link>
          <button
            onClick={dismiss}
            aria-label="Dismiss"
            className="text-fd-muted-foreground hover:text-fd-foreground transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
      {/* Switcher: current locale (highlighted) + a link per other locale. */}
      <div className="inline-flex items-center gap-1 h-8 px-2 rounded-full border bg-fd-card text-sm">
        <CurrentFlag className="w-3.5 h-3.5" />
        <span className="font-medium text-fd-foreground">
          {LOCALES.find((l) => l.code === current)!.label}
        </span>
        {others.map((l) => {
          const Flag = FLAG[l.code];
          return (
            <Link
              key={l.code}
              href={localeUrl(base, l.code)}
              aria-label={`Switch language to ${l.label}`}
              className="inline-flex items-center gap-1 pl-1.5 ml-0.5 border-l border-fd-border text-fd-muted-foreground hover:text-fd-foreground transition-colors"
            >
              <Flag className="w-3.5 h-3.5" />
              {l.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
