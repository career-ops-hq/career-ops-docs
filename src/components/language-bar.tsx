'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

// Language button + browser-detection suggestion, both living in the header.
// Ported from santifer.io's pattern (cv-santiago): suggest, never auto-redirect
// (an auto-redirect breaks Google's crawl of the hreflang pair and annoys users
// whose browser is in a language they don't read — a banner is Google's own
// guidance). Detection is client-only; the banner never renders in SSR (that
// caused a React #418 hydration mismatch on santifer.io).
//
// Multi-language ready: add a locale to LOCALES + create its /prefix routes and
// the pill becomes a menu; detection already walks navigator.languages.

type Code = 'en' | 'es';
const LOCALES: { code: Code; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
];

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
const FLAG: Record<Code, (p: { className?: string }) => React.ReactNode> = {
  en: FlagEN,
  es: FlagES,
};

/** Which locale is this path? (ES surfaces are prefixed /es; everything else EN.) */
function localeOf(pathname: string): Code {
  return pathname === '/es' || pathname.startsWith('/es/') ? 'es' : 'en';
}

/** The mirrored URL in the other locale. Routes are prefix-mirrored for the home
 *  and the docs tree; other (EN-only) pages fall back to the locale home. The ES
 *  docs route redirects an untranslated slug to its EN page, so this never 404s. */
function alternateUrl(pathname: string): string {
  if (localeOf(pathname) === 'es') {
    if (pathname === '/es') return '/';
    if (pathname === '/es/manifesto') return '/manifesto';
    if (pathname.startsWith('/es/docs')) return pathname.slice(3) || '/';
    return '/';
  }
  if (pathname === '/') return '/es';
  if (pathname === '/manifesto') return '/es/manifesto';
  if (pathname.startsWith('/docs')) return '/es' + pathname;
  return '/es';
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
};

/**
 * 3-state machine in sessionStorage (survives re-mounts between navigations):
 *  null → never shown, reveal after a 2s delay · 'shown' → keep visible on
 *  re-mount without re-animating · 'dismissed' → silent for the rest of the
 *  session. The real preference lives in the URL; storage only drives the
 *  banner and expires with the session, so a return visit is re-offered once.
 *  No cookie, no localStorage → zero GDPR surface.
 */
function useLanguageBanner(current: Code, target: Code, mismatch: boolean) {
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
  const alt = alternateUrl(pathname);
  const other = LOCALES.find((l) => l.code !== current)!; // 2-locale toggle; menu when >2

  // Client-only: don't render the detection banner during SSR (hydration).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const target = mounted ? detectLocale() : current;
  const mismatch = mounted && target !== current;
  const { showBanner, dismiss, animate } = useLanguageBanner(current, target, mismatch);

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
            href={alt}
            onClick={dismiss}
            className="inline-flex items-center gap-1 font-medium text-brand hover:text-brand-200 transition-colors"
          >
            {BANNER[target].prefix}
            <TargetFlag className="w-3.5 h-3.5 mx-0.5" />
            {other.label}
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
      <Link
        href={alt}
        aria-label={`Idioma: ${current.toUpperCase()} — cambiar a ${other.label}`}
        className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-full border bg-fd-card text-sm font-medium text-fd-muted-foreground hover:text-fd-foreground hover:border-fd-primary/40 transition-colors"
      >
        <CurrentFlag className="w-3.5 h-3.5" />
        {LOCALES.find((l) => l.code === current)!.label}
      </Link>
    </div>
  );
}
