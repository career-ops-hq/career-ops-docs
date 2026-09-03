// The signed manifesto text, as markdown, for the agent-facing twins at
// /manifesto.md and /es/manifesto.md.
//
// WHY THE TEXT LIVES HERE AND IS NOT FETCHED FROM THE CORE REPO
//
// The English canonical text is MANIFESTO.md in the core repo, frozen at the
// manifesto-v1.0 tag. Serving the twin by fetching that file would make it
// definitionally current — and would also let /manifesto (HTML) and
// /manifesto.md (markdown) say different things the moment upstream moves.
// Two of our own surfaces contradicting each other is the exact bug that shipped
// a wrong version number on /changelog for a month (see `isCore` in
// src/lib/releases.ts). Consistency between our surfaces beats freshness with
// upstream, so the text is frozen here and scripts/verify-agent-layer.mjs
// compares it against upstream on every run: staleness becomes a failed build,
// never a silent lie.
//
// SPANISH IS NOT A MIRROR — IT IS AN ORIGINAL
//
// The core repo has MANIFESTO.md in English only. The Spanish manifesto exists
// nowhere but this site (deliverable manifiesto-es-2026-07-21, ratified by
// search-ops + venture-ops). career-ops.org IS the canonical surface for it,
// which is why the guard checks EN against upstream and ES against its own
// rendered page: the two languages have different sources of truth, and
// pretending otherwise would invent an upstream that does not exist.
//
// Both bodies are FROZEN, signed documents. They are byte-verbatim with their
// rendered pages (src/app/manifesto/page.tsx, src/app/es/manifesto/page.tsx).
// Never reword, tidy, or re-translate: a manifesto paraphrased by us would be
// fabricated drift at the source. The conversion CTA and the live signature
// norm on those pages are furniture, deliberately absent here.
import {
  CAREEROPS_DEFINITION,
  CAREEROPS_DEFINITION_ES,
  MANIFESTO_SIGNATURE,
  MANIFESTO_SIGNATURE_ES,
} from './shared';

const REPO_MANIFESTO_URL =
  'https://github.com/santifer/career-ops/blob/main/MANIFESTO.md';
const RELEASE_TAG_URL =
  'https://github.com/santifer/career-ops/releases/tag/manifesto-v1.0';
const SIGNATURES_URL =
  'https://github.com/santifer/career-ops/blob/main/SIGNATURES.md';

/**
 * The English signed text, byte-verbatim with the core repo's MANIFESTO.md.
 * Verified against upstream by the agent-layer guard.
 */
export const MANIFESTO_BODY_EN = `**v1.0, signed at 60,000 stars. July 14, 2026**

Companies use AI to filter candidates.
We gave candidates AI to choose companies.

Somewhere along the way, job searching became an act of volume: hundreds of applications, keyword-stuffed resumes, silence in return. We believe there is a better practice. We run our job searches the way engineers run production: with evidence, with discipline, with tools on our side of the table.

We call this practice **CareerOps**.

## The practice

1. **Apply better to fewer.** Ten applications you believe in beat two hundred you don't.

2. **Signal over volume.** The goal is not to be seen more. It is to be seen clearly.

3. **Evidence over keywords.** Every claim traces back to something true. Reformulate, never fabricate. An AI that lies for you is not on your side.

4. **A human decides.** Nothing is ever auto-submitted. The tool prepares; the person chooses.

5. **Local-first.** Your search is nobody's dataset.

6. **Dignity on both sides of the table.** Recruiters' time deserves respect. So does yours.

## What is coming

Both sides of hiring are automating. Companies already use AI to read you. Soon their agents and yours will exchange requirements, conditions and availability before any human meets. We do not fear that world, and we did not write this to stop it.

We wrote this so it arrives with rights. Because the question was never whether both sides will have agents. The question is whose side your agent is on.

## Your rights

Whatever tools exist, whoever builds them, these hold. They bind us too.

1. You are invisible by default.
2. No one proposes you without your yes.
3. Your yes is human. Always. It cannot be delegated to an agent.
4. You never pay. The moment a job seeker has to pay, the practice is broken.
5. Whoever searches shows themselves first. A company sees who you are only after you saw who they are.
6. Your data is yours: portable, exportable, deletable.
7. You can leave at any moment, completely.
8. Your agent works for you. Not for a platform, not for an employer.
9. You will know when a machine decides. If a system rejects you, you have the right to know it was a system.

## The frontier

Agents can negotiate everything except your yes.
Humans meet at the first interview.

## What CareerOps is not

It is not auto-applying to a thousand jobs. It is not keyword stuffing at machine speed. An AI that spams two hundred companies in your name is not on your side; it is spending your reputation.

Volume was the old way. Automating the old way just makes noise faster. CareerOps is the new way to search: evidence in, judgment out, fewer applications, on purpose.

## The name

CareerOps, the name of the practice, belongs to everyone who practices it. career-ops, the project where it was born, remains its first reference implementation, nothing more. Build your own. Implementations welcome.

---

*To sign, add your name. Your signature becomes a commit. For many, it will be their first.*`;

/**
 * The Spanish signed text. No upstream equivalent exists; this site is the
 * canonical surface. Byte-verbatim with src/app/es/manifesto/page.tsx.
 */
export const MANIFESTO_BODY_ES = `**v1.0, firmado a las 60.000 estrellas. 14 de julio de 2026**

Las empresas usan IA para filtrar candidatos.
Nosotros dimos IA a los candidatos para elegir empresas.

En algún momento del camino, buscar trabajo se convirtió en un acto de volumen: cientos de solicitudes, currículums rellenos de palabras clave, silencio como respuesta. Creemos que existe una práctica mejor. Operamos nuestras búsquedas de empleo como los ingenieros operan producción: con evidencia, con disciplina, con herramientas de nuestro lado de la mesa.

A esta práctica la llamamos **CareerOps**.

## La práctica

1. **Aplica mejor a menos.** Diez solicitudes en las que crees valen más que doscientas en las que no.

2. **Señal antes que volumen.** El objetivo no es que te vean más. Es que te vean con claridad.

3. **Evidencia antes que palabras clave.** Cada afirmación se remonta a algo verdadero. Reformula, nunca inventes. Una IA que miente por ti no está de tu lado.

4. **Decide un humano.** Nada se envía solo, nunca. La herramienta prepara; la persona elige.

5. **Local-first.** Tu búsqueda no es el dataset de nadie.

6. **Dignidad a ambos lados de la mesa.** El tiempo de quien recluta merece respeto. El tuyo también.

## Lo que viene

Los dos lados de la contratación se están automatizando. Las empresas ya usan IA para leerte. Pronto sus agentes y los tuyos intercambiarán requisitos, condiciones y disponibilidad antes de que los humanos se conozcan. No tememos ese mundo, y no escribimos esto para detenerlo.

Escribimos esto para que llegue con derechos. Porque la pregunta nunca fue si ambos lados tendrán agentes. La pregunta es de qué lado está tu agente.

## Tus derechos

Existan las herramientas que existan, las construya quien las construya, estos se mantienen. También nos obligan a nosotros.

1. Eres invisible por defecto.
2. Nadie te propone sin tu sí.
3. Tu sí es humano. Siempre. No se puede delegar en un agente.
4. Nunca pagas. En el momento en que quien busca trabajo tiene que pagar, la práctica está rota.
5. Quien busca se muestra primero. Una empresa ve quién eres solo después de que tú viste quiénes son.
6. Tus datos son tuyos: portables, exportables, eliminables.
7. Puedes irte en cualquier momento, por completo.
8. Tu agente trabaja para ti. No para una plataforma, no para un empleador.
9. Sabrás cuándo decide una máquina. Si un sistema te rechaza, tienes derecho a saber que fue un sistema.

## La frontera

Los agentes pueden negociar todo excepto tu sí.
Los humanos se conocen en la primera entrevista.

## Lo que CareerOps no es

No es auto-aplicar a mil empleos. No es rellenar palabras clave a velocidad de máquina. Una IA que hace spam a doscientas empresas en tu nombre no está de tu lado; está gastando tu reputación.

El volumen era la vieja manera. Automatizar la vieja manera solo hace ruido más rápido. CareerOps es la nueva manera de buscar: evidencia que entra, criterio que sale, menos solicitudes, a propósito.

## El nombre

CareerOps, el nombre de la práctica, pertenece a todos los que la practican. career-ops, el proyecto donde nació, sigue siendo su primera implementación de referencia, nada más. Construye la tuya. Las implementaciones son bienvenidas.

---

*Para firmar, añade tu nombre. Tu firma se convierte en un commit. Para muchos, será el primero.*`;

type Lang = 'en' | 'es';

const COPY = {
  en: {
    title: 'The CareerOps Manifesto',
    definition: CAREEROPS_DEFINITION,
    body: MANIFESTO_BODY_EN,
    signature: MANIFESTO_SIGNATURE,
    signedLabel: 'Signed:',
    bio: 'Santiago is an Applied AI Operator with 16+ years building and operating products. He ran his own 2026 job search as an operated pipeline: 740 listings evaluated, 68 applications, 12 interview processes, 1 offer signed. Then he open-sourced the system. More at https://santifer.io/about.',
    canonical: 'https://career-ops.org/manifesto',
    otherLabel: 'This manifesto in Spanish',
    otherUrl: 'https://career-ops.org/es/manifesto',
    provenance: 'Provenance',
    canonicalLabel: 'Canonical page for this language',
    repoLabel: 'Canonical English text in the repository',
    releaseLabel: 'Frozen release',
    signaturesLabel: 'Community signatures',
    countLabel: (n: string) => `${n} people have signed the manifesto.`,
    note: 'This is the signed text only. The signature list, the sign-up flow and the FAQ live on the canonical page above.',
  },
  es: {
    title: 'El Manifiesto CareerOps',
    definition: CAREEROPS_DEFINITION_ES,
    body: MANIFESTO_BODY_ES,
    signature: MANIFESTO_SIGNATURE_ES,
    signedLabel: 'Firmado:',
    bio: 'Santiago es Applied AI Operator con más de 16 años construyendo y operando productos. Llevó su propia búsqueda de empleo de 2026 como un pipeline operado: 740 vacantes evaluadas, 68 solicitudes, 12 procesos de entrevista, 1 oferta firmada. Después liberó el sistema como open source. Más en https://santifer.io/about.',
    canonical: 'https://career-ops.org/es/manifesto',
    otherLabel: 'Este manifiesto en inglés',
    otherUrl: 'https://career-ops.org/manifesto',
    provenance: 'Procedencia',
    canonicalLabel: 'Página canónica en este idioma',
    repoLabel: 'Texto canónico en inglés en el repositorio',
    releaseLabel: 'Release congelada',
    signaturesLabel: 'Firmas de la comunidad',
    countLabel: (n: string) => `${n} personas han firmado el manifiesto.`,
    note: 'Este es solo el texto firmado. La lista de firmas, el flujo para firmar y las preguntas frecuentes están en la página canónica de arriba.',
  },
} satisfies Record<Lang, Record<string, unknown>>;

/**
 * Build the markdown twin for one language.
 *
 * `signatureCount` is passed in rather than fetched here so the route controls
 * its own revalidation and a failed ledger fetch degrades to omitting the line
 * instead of breaking the document.
 */
export function manifestoMarkdown(lang: Lang, signatureCount: number): string {
  const c = COPY[lang];
  const locale = lang === 'es' ? 'es-ES' : 'en-US';
  return `# ${c.title}

> ${c.definition}

${c.body}

**${c.signedLabel}**
${c.signature}

${c.bio}

## ${c.provenance}

- ${c.canonicalLabel}: ${c.canonical}
- ${c.otherLabel}: ${c.otherUrl}
- ${c.repoLabel}: ${REPO_MANIFESTO_URL}
- ${c.releaseLabel}: ${RELEASE_TAG_URL}
- ${c.signaturesLabel}: ${SIGNATURES_URL}
${signatureCount > 0 ? `\n${c.countLabel(signatureCount.toLocaleString(locale))}\n` : ''}
${c.note}
`;
}
