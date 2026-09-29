import { heroOgImage, ogAlt, ogSize } from '@/lib/og-hero';

// Node runtime: the renderer reads its font from disk (see og-hero.tsx).
export const runtime = 'nodejs';
export const size = ogSize;
// PNG keeps the serif crisp when LinkedIn / X / Slack re-compress the card.
export const contentType = 'image/png';
export const alt = ogAlt.fr;

export default function OG() {
  return heroOgImage('fr');
}
