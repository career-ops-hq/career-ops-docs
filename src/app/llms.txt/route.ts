import { buildLlmsTxt } from '@/lib/llms-index';

// 1h ISR so the canonical stats block reflects live GitHub numbers
// (matches the home page schema and the footer chip cadence). Static
// generation at build time was producing a stale "44,200+ stars" line
// that AI crawlers picked up and resurfaced as fact.
export const revalidate = 3600;

export async function GET() {
  return new Response(await buildLlmsTxt());
}
