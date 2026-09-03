// Markdown twin of /es/manifesto — the Spanish manifesto, for AI assistants.
//
// This one is not a translation of a mirror: the core repo ships MANIFESTO.md
// in English only, so career-ops.org is the CANONICAL surface for the Spanish
// manifesto (deliverable manifiesto-es-2026-07-21). If this route serves the
// English text by accident, there is no upstream to fall back on and the
// Spanish canon simply stops existing for agents — which is why the guard
// asserts this body cites the /es/ canonical URL and reads as Spanish.
//
// Same literal-route reasoning as the English twin; see
// src/app/manifesto.md/route.ts and src/lib/manifesto-text.ts.
import { manifestoMarkdown } from '@/lib/manifesto-text';
import { getSignatures } from '@/lib/signatures';

// The signature ledger is shared with the English page — signatures are data,
// never translated — so the cadence matches too.
export const revalidate = 300;

export async function GET() {
  const signatures = await getSignatures();

  return new Response(manifestoMarkdown('es', signatures.length), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'X-Robots-Tag': 'noindex',
    },
  });
}
