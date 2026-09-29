import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

// Share card for the homes (en, es, fr), rendered with next/og. It carries
// the hero line, so the card people share says what the page says. The old
// card was a JPEG with "You got the job. And it didn't cost you a thing."
// baked into the pixels, which kept an outcome promise and an unqualified
// "free" alive on every share after the page itself dropped them.
// The font is read from disk, never fetched (a build-time fetch took the
// whole build down on 7 Sep); the route files must trace it in next.config.

export const ogSize = { width: 1200, height: 630 };

const COPY = {
  en: { line1: 'They screen you.', pre: 'Now you screen\u00a0', accent: 'them', post: '.', sub: 'It never applies in your name.' },
  es: { line1: 'Te filtran.', pre: 'Ahora filtras\u00a0', accent: 'tú', post: '.', sub: 'Nunca envía una candidatura en tu nombre.' },
  fr: { line1: 'On vous trie.', pre: 'À\u00a0', accent: 'vous', post: '\u00a0de trier.', sub: 'Il ne postule jamais en votre nom.' },
} as const;

export type OgLocale = keyof typeof COPY;

export const ogAlt: Record<OgLocale, string> = {
  en: 'career-ops — They screen you. Now you screen them.',
  es: 'career-ops — Te filtran. Ahora filtras tú.',
  fr: 'career-ops — On vous trie. À vous de trier.',
};

const BRAND = 'hsl(26, 73%, 51%)';

export async function heroOgImage(locale: OgLocale) {
  const c = COPY[locale];
  const serif = await readFile(join(process.cwd(), 'src/app/(home)/InstrumentSerif-Regular.ttf'));
  const serifData = serif.buffer.slice(serif.byteOffset, serif.byteOffset + serif.byteLength) as ArrayBuffer;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          padding: '0 88px',
          background: '#0b0a09',
          backgroundImage:
            'radial-gradient(ellipse 62% 70% at 86% 112%, rgba(230,120,40,0.95), rgba(230,120,40,0) 72%), radial-gradient(ellipse 48% 55% at 60% 122%, rgba(250,200,90,0.70), rgba(250,200,90,0) 72%), radial-gradient(ellipse 38% 50% at 104% 58%, rgba(240,110,85,0.70), rgba(240,110,85,0) 70%)',
          fontFamily: 'Instrument Serif',
          color: 'white',
        }}
      >
        <div style={{ display: 'flex', fontSize: 104, lineHeight: 1.02, letterSpacing: '-0.01em' }}>{c.line1}</div>
        <div style={{ display: 'flex', fontSize: 104, lineHeight: 1.02, letterSpacing: '-0.01em' }}>
          <span>{c.pre}</span>
          <span style={{ color: BRAND }}>{c.accent}</span>
          <span>{c.post}</span>
        </div>
        <div style={{ display: 'flex', fontSize: 42, lineHeight: 1.2, marginTop: 34, color: 'rgba(255,255,255,0.62)' }}>{c.sub}</div>

        <div style={{ position: 'absolute', left: 88, bottom: 52, display: 'flex', alignItems: 'center', gap: 16 }}>
          <span
            style={{
              background: BRAND,
              width: 56,
              height: 56,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 44,
              borderRadius: 9,
              lineHeight: 1,
              paddingBottom: 5,
            }}
          >
            co
          </span>
          <span style={{ fontSize: 32, color: 'rgba(255,255,255,0.9)', lineHeight: 1 }}>career-ops.org</span>
        </div>
      </div>
    ),
    { ...ogSize, fonts: [{ name: 'Instrument Serif', data: serifData, style: 'normal', weight: 400 }] },
  );
}
