'use client';

import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { signOnGitHubUrl } from '@/lib/sign-link';

// THE signing widget (how-to-sign): single published path per Santiago's
// final call — a prefilled GitHub DISCUSSION under the signer's own
// session (not an issue: thousands of signature issues would pollute the
// maintenance tracker and the issues/30d vital-signs metric; discussions
// touch nothing). Three steps: write your line (optional) → Sign on
// GitHub → Start discussion there. Identity comes from the discussion
// author; the Ledger Bot commits the line with credit. Organic PRs are
// still processed but the page no longer documents them.
//
// The card preview is the motivational layer: Santiago's real Signatory
// #1 card by default; a purely-optional username field personalizes it
// (PREVIEW-watermarked server-side to prevent screenshot impersonation).
//
// Locale-aware: all human copy is pulled from STRINGS[locale] so the ES
// manifesto (/es/manifesto) renders a fully-Spanish widget. Multi-language
// ready — add a locale key to grow. The signing deep link itself stays
// language-neutral (the GitHub-side prefill is frozen in sign-link.ts).
// "Start discussion" is kept in English on purpose: it is the literal
// GitHub button label the signer must click.

const USERNAME_RE = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/;
const DEFAULT_CARD = '/manifesto/s/santifer/opengraph-image';

type Locale = 'en' | 'es';

type SignStrings = {
  linePrompt: string;
  cardAlt: string;
  exampleBadge: string;
  generating: string;
  previewInvite: string;
  previewGeneric: string;
  usernamePlaceholder: string;
  usernameAria: string;
  step1Label: string;
  signButton: string;
  step3: ReactNode;
  noAccount: ReactNode;
};

const STRINGS: Record<Locale, SignStrings> = {
  en: {
    // Same prompt the maintainer surfaces on the GitHub side — byte-aligned.
    linePrompt: 'what changed in your search, or what you want hiring to become',
    cardAlt: 'Preview of the personal signature card',
    exampleBadge: 'Example',
    generating: 'Generating your card…',
    previewInvite: 'This is Signatory #1. Preview yours (optional):',
    previewGeneric:
      'Every signature gets a permanent card and link like this one.',
    usernamePlaceholder: 'your GitHub username',
    usernameAria: 'GitHub username, only to preview your card',
    step1Label: 'Write your line, or leave it empty:',
    signButton: 'Sign on GitHub →',
    step3: (
      <>
        Press <strong>Start discussion</strong> there. GitHub may ask you to
        confirm you searched for similar discussions; just tick it and post, it
        is a standard GitHub step. Done: your signature and your permanent card
        appear within minutes, and the commit is credited to your GitHub
        account.
      </>
    ),
    noAccount: (
      <>
        No GitHub account? The button will offer to create one (free, 2
        minutes). If you end up on your new account’s home page, just come back
        and tap Sign on GitHub again.
      </>
    ),
  },
  es: {
    linePrompt:
      'qué cambió en tu búsqueda, o en qué quieres que se convierta la contratación',
    cardAlt: 'Vista previa de la tarjeta de firma personal',
    exampleBadge: 'Ejemplo',
    generating: 'Generando tu tarjeta…',
    previewInvite: 'Este es el Firmante n.º 1. Previsualiza la tuya (opcional):',
    previewGeneric:
      'Cada firma recibe una tarjeta y un enlace permanentes como este.',
    usernamePlaceholder: 'tu usuario de GitHub',
    usernameAria: 'Usuario de GitHub, solo para previsualizar tu tarjeta',
    step1Label: 'Escribe tu línea, o déjala en blanco:',
    signButton: 'Firmar en GitHub →',
    step3: (
      <>
        Pulsa <strong>Start discussion</strong> ahí. GitHub puede pedirte que
        confirmes que buscaste discusiones similares; solo márcalo y publica, es
        un paso estándar de GitHub. Listo: tu firma y tu tarjeta permanente
        aparecen en unos minutos, y el commit queda acreditado a tu cuenta de
        GitHub.
      </>
    ),
    noAccount: (
      <>
        ¿No tienes cuenta de GitHub? El botón te ofrecerá crear una (gratis, 2
        minutos). Si acabas en la página de inicio de tu nueva cuenta, vuelve
        aquí y pulsa Firmar en GitHub de nuevo.
      </>
    ),
  },
};

// Sign-link strings live in src/lib/sign-link.ts (single frozen source,
// shared with the certificate invitation state). Verified (warpchart,
// real HTTP): /discussions/new prefilled SURVIVES the GitHub login
// redirect, so logged-out signers land on the filled form.

function cleanLine(value: string): string {
  return value
    .replace(/[|\n\r]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 140);
}

function StepChip({ n }: { n: string }) {
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-fd-border text-xs font-medium text-fd-foreground">
      {n}
    </span>
  );
}

export function SignPreview({ locale = 'en' }: { locale?: Locale }) {
  const t = STRINGS[locale];
  const [username, setUsername] = useState('');
  const [line, setLine] = useState('');
  const [debounced, setDebounced] = useState({ u: '', q: '' });
  const [loadedSrc, setLoadedSrc] = useState(DEFAULT_CARD);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  const cleanUser = username.trim().replace(/^@/, '');
  const validUser = USERNAME_RE.test(cleanUser);

  useEffect(() => {
    const timer = setTimeout(
      () =>
        setDebounced({ u: validUser ? cleanUser : '', q: cleanLine(line) }),
      500,
    );
    return () => clearTimeout(timer);
  }, [cleanUser, validUser, line]);

  // src derives from the debounced pair — every username OR line change
  // produces a new URL, so the <img> always re-fetches.
  const src = useMemo(() => {
    if (!debounced.u) return DEFAULT_CARD;
    const params = new URLSearchParams({ u: debounced.u });
    if (debounced.q) params.set('q', debounced.q);
    return `/manifesto/sign-preview?${params.toString()}`;
  }, [debounced]);

  const generating = src !== loadedSrc;
  const isExample = src === DEFAULT_CARD;
  // If the OG endpoint ever fails, the frame hides entirely — an empty
  // box reads as breakage; absence reads as nothing.
  const broken = failedSrc === src;

  // With no line written, the prefill doubles as an in-form placeholder
  // (frozen EMPTY_BODY inside sign-link.ts). With a line, just the line.
  const signUrl = signOnGitHubUrl(cleanLine(line));

  return (
    <div className="mt-6">
      {/* The card — the reward, visible before anyone commits to a step. */}
      {!broken && (
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={src}
            src={src}
            alt={t.cardAlt}
            width={1200}
            height={630}
            loading="lazy"
            onLoad={() => setLoadedSrc(src)}
            onError={() => {
              setLoadedSrc(src);
              setFailedSrc(src);
            }}
            className={`w-full rounded-xl border border-fd-border transition-opacity duration-300 ${
              generating ? 'opacity-50' : 'opacity-100'
            }`}
          />
          {isExample && !generating && (
            <span className="absolute right-3 top-3 rounded-full border border-white/20 bg-black/55 px-2.5 py-1 text-[11px] uppercase tracking-[0.15em] text-white/85">
              {t.exampleBadge}
            </span>
          )}
          {generating && (
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="rounded-full bg-black/60 px-3.5 py-1.5 text-xs text-white/90">
                {t.generating}
              </span>
            </span>
          )}
        </div>
      )}
      {!broken && (
        <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-2">
          <p aria-live="polite" className="text-sm text-fd-muted-foreground">
            {isExample ? t.previewInvite : t.previewGeneric}
          </p>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={t.usernamePlaceholder}
            aria-label={t.usernameAria}
            autoComplete="off"
            spellCheck={false}
            className="rounded-lg border border-fd-border bg-fd-secondary/40 px-3 py-1.5 text-sm text-fd-foreground placeholder:text-fd-muted-foreground focus:outline-none focus:ring-1 focus:ring-fd-foreground/30 sm:w-56"
          />
        </div>
      )}

      {/* The three steps — the whole signing flow. */}
      <div className="mt-7 space-y-5">
        <div className="flex items-start gap-3">
          <StepChip n="1" />
          <div className="min-w-0 flex-1">
            <label className="flex flex-col gap-1.5 text-sm text-fd-foreground/90">
              <span>{t.step1Label}</span>
              <input
                type="text"
                value={line}
                onChange={(e) => setLine(e.target.value)}
                placeholder={t.linePrompt}
                maxLength={140}
                autoComplete="off"
                className="rounded-lg border border-fd-border bg-fd-secondary/40 px-3 py-2 text-sm text-fd-foreground placeholder:text-fd-muted-foreground focus:outline-none focus:ring-1 focus:ring-fd-foreground/30"
              />
            </label>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <StepChip n="2" />
          <a
            href={signUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-lg px-5 py-2.5 text-sm font-medium"
            style={{
              backgroundColor: 'var(--color-fd-foreground)',
              color: 'var(--color-fd-background)',
            }}
          >
            {t.signButton}
          </a>
        </div>

        <div className="flex items-start gap-3">
          <StepChip n="3" />
          <p className="text-sm text-fd-foreground/90 leading-relaxed pt-0.5">
            {t.step3}
          </p>
        </div>
      </div>

      <p className="mt-5 text-xs text-fd-muted-foreground leading-relaxed">
        {t.noAccount}
      </p>
    </div>
  );
}
