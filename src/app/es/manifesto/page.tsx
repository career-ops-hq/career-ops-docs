import type { Metadata } from 'next';
import Link from 'next/link';
import { instrumentSerifRegular } from '@/lib/fonts';
import { manifestoSchemaEs } from '@/lib/schema';
import { hreflangManifesto } from '@/lib/i18n-map';
import { CAREEROPS_DEFINITION_ES, MANIFESTO_SIGNATURE_ES } from '@/lib/shared';
import {
  getLedgerLastSignedAt,
  getSignatures,
  signatureAnchor,
  signatureAvatarUrl,
} from '@/lib/signatures';
import { SignPreview } from '@/components/manifesto/sign-preview';

// Spanish twin of /manifesto — the official, frozen translation of the
// signed CareerOps Manifesto (search-ops/venture-ops deliverable
// manifiesto-es-2026-07-21, localized:false = full fidelity, NOT the
// home's fan-out framing). Deliberately a self-contained mirror rather
// than a trunk+dict like the home: a signed document has one authoritative
// version PER LANGUAGE that does not track EN word-drift, so a parallel
// page is the correct shape. The body is ALL Spanish — the iconic English
// thesis lives on the EN page and the hreflang pair links them (venture-ops
// rule for this page; the EN-above/ES-below pattern is home-only). Copy here
// changes only when the canonical EN manifesto changes or venture-ops/
// search-ops ratify a new translation. Everything runtime — signatures,
// schema, the signing widget — is shared with the EN page.

export const revalidate = 300;

const SIGNATURES_GITHUB_URL =
  'https://github.com/santifer/career-ops/blob/main/SIGNATURES.md';
const MANIFESTO_MD_URL =
  'https://github.com/santifer/career-ops/blob/main/MANIFESTO.md';
const RELEASE_TAG_URL =
  'https://github.com/santifer/career-ops/releases/tag/manifesto-v1.0';

export const metadata: Metadata = {
  metadataBase: new URL('https://career-ops.org'),
  title: 'El Manifiesto CareerOps · career-ops',
  description: CAREEROPS_DEFINITION_ES,
  alternates: {
    canonical: 'https://career-ops.org/es/manifesto',
    languages: hreflangManifesto(),
  },
  openGraph: {
    type: 'article',
    url: 'https://career-ops.org/es/manifesto',
    siteName: 'career-ops',
    locale: 'es_ES',
    title: 'El Manifiesto CareerOps',
    description: CAREEROPS_DEFINITION_ES,
    images: [
      {
        url: 'https://career-ops.org/og-manifesto.png',
        width: 1200,
        height: 630,
        alt: 'El Manifiesto CareerOps. ¿De qué lado está tu agente?',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'El Manifiesto CareerOps',
    description: CAREEROPS_DEFINITION_ES,
    images: ['https://career-ops.org/og-manifesto.png'],
  },
  robots: { index: true, follow: true },
};

// Spanish relative time for the dynamic norm — Spanish rendering of the EN
// timeAgo (deliverable timeAgo ES strings). Same 5-minute ISR cadence.
function timeAgoEs(iso: string): string | null {
  const ms = Date.now() - new Date(iso).getTime();
  if (Number.isNaN(ms) || ms < 0) return null;
  const minutes = Math.round(ms / 60_000);
  if (minutes < 1) return 'justo ahora';
  if (minutes === 1) return 'hace un minuto';
  if (minutes < 60) return `hace ${minutes} minutos`;
  const hours = Math.round(minutes / 60);
  if (hours === 1) return 'hace una hora';
  if (hours < 24) return `hace ${hours} horas`;
  const days = Math.round(hours / 24);
  return days === 1 ? 'ayer' : `hace ${days} días`;
}

export default async function ManifestoPageEs() {
  const [signatures, lastSignedAt] = await Promise.all([
    getSignatures(),
    getLedgerLastSignedAt(),
  ]);
  const lastSignedAgo = lastSignedAt ? timeAgoEs(lastSignedAt) : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(manifestoSchemaEs()) }}
      />
      <article className="mx-auto w-full max-w-3xl px-6 py-12 md:py-16">
        <header className="mb-12">
          <p className="text-sm text-fd-muted-foreground">
            Por{' '}
            <a
              href="/about"
              className="text-fd-foreground underline underline-offset-2"
            >
              Santiago Fernández de Valderrama Aparicio
            </a>
            , creador de career-ops · Publicado el{' '}
            <time dateTime="2026-07-14">14 de julio de 2026</time> ·{' '}
            {/* Reciprocal language link — the manifesto has no nav bar, so this
                is how a reader crosses to the English original (and reinforces
                the hreflang pair for crawlers). */}
            <a
              href="/manifesto"
              hrefLang="en"
              className="text-fd-foreground underline underline-offset-2"
            >
              English
            </a>
          </p>
          <h1
            className={`${instrumentSerifRegular.className} mt-4 text-fd-foreground text-3xl md:text-4xl xl:text-5xl tracking-tight`}
          >
            El Manifiesto CareerOps
          </h1>
          {/* Definitional lead — the canonical "CareerOps es…" sentence opens
              the page so answer engines can lift it as a self-contained
              passage. Byte-identical with the ES schema description and the
              FAQ below (CAREEROPS_DEFINITION_ES). */}
          <p className="mt-6 text-fd-muted-foreground text-base lg:text-lg leading-relaxed">
            {CAREEROPS_DEFINITION_ES}
          </p>
        </header>

        {/* Official Spanish translation of the canonical manifesto text
            (frozen — deliverable manifiesto-es-2026-07-21). The conversion
            CTA + dynamic norm after "La frontera" are page furniture, not
            part of the signed text. */}
        <div className="space-y-6 text-fd-foreground/90 leading-relaxed text-base lg:text-lg">
          <p className="text-sm text-fd-muted-foreground font-medium tracking-wide">
            v1.0, firmado a las 60.000 estrellas. 14 de julio de 2026
          </p>

          {/* The thesis in Spanish, directly — NO English literal above it
              (venture-ops rule for this page). */}
          <p
            className={`${instrumentSerifRegular.className} text-fd-foreground text-2xl md:text-3xl leading-snug`}
          >
            Las empresas usan IA para filtrar candidatos.
            <br />
            Nosotros dimos IA a los candidatos para elegir empresas.
          </p>

          <p>
            En algún momento del camino, buscar trabajo se convirtió en un acto
            de volumen: cientos de solicitudes, currículums rellenos de palabras
            clave, silencio como respuesta. Creemos que existe una práctica
            mejor. Operamos nuestras búsquedas de empleo como los ingenieros
            operan producción: con evidencia, con disciplina, con herramientas
            de nuestro lado de la mesa.
          </p>

          <p>
            A esta práctica la llamamos <strong>CareerOps</strong>.
          </p>

          <h2 className="text-fd-foreground text-xl font-medium tracking-tight pt-4">
            La práctica
          </h2>

          <ol className="list-decimal space-y-4 pl-6">
            <li>
              <strong>Aplica mejor a menos.</strong>{' '}Diez solicitudes en las
              que crees valen más que doscientas en las que no.
            </li>
            <li>
              <strong>Señal antes que volumen.</strong>{' '}El objetivo no es que
              te vean más. Es que te vean con claridad.
            </li>
            <li>
              <strong>Evidencia antes que palabras clave.</strong>{' '}Cada
              afirmación se remonta a algo verdadero. Reformula, nunca inventes.
              Una IA que miente por ti no está de tu lado.
            </li>
            <li>
              <strong>Decide un humano.</strong>{' '}Nada se envía solo, nunca. La
              herramienta prepara; la persona elige.
            </li>
            <li>
              <strong>Local-first.</strong>{' '}Tu búsqueda no es el dataset de
              nadie.
            </li>
            <li>
              <strong>Dignidad a ambos lados de la mesa.</strong>{' '}El tiempo de
              quien recluta merece respeto. El tuyo también.
            </li>
          </ol>

          <h2 className="text-fd-foreground text-xl font-medium tracking-tight pt-4">
            Lo que viene
          </h2>

          <p>
            Los dos lados de la contratación se están automatizando. Las
            empresas ya usan IA para leerte. Pronto sus agentes y los tuyos
            intercambiarán requisitos, condiciones y disponibilidad antes de que
            los humanos se conozcan. No tememos ese mundo, y no escribimos esto
            para detenerlo.
          </p>

          <p>
            Escribimos esto para que llegue con derechos. Porque la pregunta
            nunca fue si ambos lados tendrán agentes. La pregunta es de qué lado
            está tu agente.
          </p>

          <h2 className="text-fd-foreground text-xl font-medium tracking-tight pt-4">
            Tus derechos
          </h2>

          <p>
            Existan las herramientas que existan, las construya quien las
            construya, estos se mantienen. También nos obligan a nosotros.
          </p>

          <ol className="list-decimal space-y-3 pl-6">
            <li>Eres invisible por defecto.</li>
            <li>Nadie te propone sin tu sí.</li>
            <li>Tu sí es humano. Siempre. No se puede delegar en un agente.</li>
            <li>
              Nunca pagas. En el momento en que quien busca trabajo tiene que
              pagar, la práctica está rota.
            </li>
            <li>
              Quien busca se muestra primero. Una empresa ve quién eres solo
              después de que tú viste quiénes son.
            </li>
            <li>Tus datos son tuyos: portables, exportables, eliminables.</li>
            <li>Puedes irte en cualquier momento, por completo.</li>
            <li>
              Tu agente trabaja para ti. No para una plataforma, no para un
              empleador.
            </li>
            <li>
              Sabrás cuándo decide una máquina. Si un sistema te rechaza, tienes
              derecho a saber que fue un sistema.
            </li>
          </ol>

          <h2 className="text-fd-foreground text-xl font-medium tracking-tight pt-4">
            La frontera
          </h2>

          <p
            className={`${instrumentSerifRegular.className} text-fd-foreground text-xl md:text-2xl leading-snug`}
          >
            Los agentes pueden negociar todo excepto tu sí.
            <br />
            Los humanos se conocen en la primera entrevista.
          </p>

          {/* Conversion CTA + dynamic norm — page furniture (not canonical). */}
          <div className="pt-2">
            <p>
              <a
                href="#how-to-sign"
                className="text-fd-foreground font-medium underline underline-offset-4"
              >
                Si estos derechos los sientes tuyos, suma tu nombre →
              </a>
            </p>
            {signatures.length > 0 && (
              <p className="mt-2 text-sm text-fd-muted-foreground">
                {signatures.length.toLocaleString('es-ES')}{' '}
                {signatures.length === 1 ? 'firma' : 'firmas'}
                {lastSignedAgo && <> · la última {lastSignedAgo}</>}
              </p>
            )}
          </div>

          <h2 className="text-fd-foreground text-xl font-medium tracking-tight pt-4">
            Lo que CareerOps no es
          </h2>

          <p>
            No es auto-aplicar a mil empleos. No es rellenar palabras clave a
            velocidad de máquina. Una IA que hace spam a doscientas empresas en
            tu nombre no está de tu lado; está gastando tu reputación.
          </p>

          <p>
            El volumen era la vieja manera. Automatizar la vieja manera solo
            hace ruido más rápido. CareerOps es la nueva manera de buscar:
            evidencia que entra, criterio que sale, menos solicitudes, a
            propósito.
          </p>

          <h2 className="text-fd-foreground text-xl font-medium tracking-tight pt-4">
            El nombre
          </h2>

          <p>
            CareerOps, el nombre de la práctica, pertenece a todos los que la
            practican. career-ops, el proyecto donde nació, sigue siendo su
            primera implementación de referencia, nada más. Construye la tuya.
            Las implementaciones son bienvenidas.
          </p>

          <p className="italic text-fd-muted-foreground pt-2">
            Para firmar, añade tu nombre. Tu firma se convierte en un commit.
            Para muchos, será el primero.
          </p>
        </div>

        {/* Canonical signature — the name + handle are non-translatables;
            only the role and date localize. Exactly ONE link in the bio
            line, to santifer.io/about. */}
        <div className="mt-12">
          <p
            className={`${instrumentSerifRegular.className} text-fd-foreground text-xl md:text-2xl`}
          >
            {MANIFESTO_SIGNATURE_ES}
          </p>
          <p className="mt-2 text-sm text-fd-muted-foreground">
            Santiago es Applied AI Operator con más de 16 años construyendo y
            operando productos. Llevó su propia búsqueda de empleo de 2026 como
            un pipeline operado: 740 vacantes evaluadas, 68 solicitudes, 12
            procesos de entrevista, 1 oferta firmada. Después liberó el sistema
            como open source.{' '}
            <a
              href="https://santifer.io/about"
              className="text-fd-foreground underline underline-offset-2"
            >
              Más en santifer.io
            </a>
            .
          </p>
        </div>

        <hr className="my-12 border-t border-fd-border" />

        {/* Community signatures — rendered from the same SIGNATURES.md as the
            EN page (signatures are data, never translated). Anchors are
            language-neutral fragment ids. */}
        <section id="signatures">
          <h2 className="text-fd-foreground text-xl font-medium tracking-tight">
            Firmado por la comunidad
            {signatures.length > 0 && (
              <span className="ml-2 text-fd-muted-foreground font-normal">
                · {signatures.length.toLocaleString('es-ES')}{' '}
                {signatures.length === 1 ? 'firma' : 'firmas'}
              </span>
            )}
          </h2>
          <p className="mt-3 text-fd-foreground/90 leading-relaxed">
            El manifiesto está abierto a la firma de cualquiera que practique
            CareerOps. Las firmas viven en{' '}
            <a
              href={SIGNATURES_GITHUB_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="text-fd-foreground underline underline-offset-2"
            >
              SIGNATURES.md
            </a>
            , en el repositorio del proyecto, y se integran por tandas; las
            firmas nuevas aparecen aquí a los pocos minutos de integrarse.
          </p>

          {signatures.length > 0 ? (
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {signatures.map((sig) => (
                <div
                  key={sig.id ?? sig.username}
                  id={signatureAnchor(sig)}
                  className="scroll-mt-24 rounded-xl border border-fd-border bg-fd-secondary/30 p-4 flex flex-col"
                >
                  {sig.id && <span id={`sig-${sig.username}`} />}
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={signatureAvatarUrl(sig, 96)}
                      alt=""
                      width={40}
                      height={40}
                      loading="lazy"
                      className="rounded-full border border-fd-border shrink-0"
                    />
                    <div className="min-w-0">
                      <a
                        href={`https://github.com/${sig.username}`}
                        target="_blank"
                        rel="nofollow ugc noreferrer noopener"
                        className="block text-sm font-medium text-fd-foreground hover:underline underline-offset-2 truncate"
                      >
                        @{sig.username}
                      </a>
                      {sig.name && (
                        <span className="block text-xs text-fd-muted-foreground truncate">
                          {sig.name}
                        </span>
                      )}
                    </div>
                    <Link
                      href={`/manifesto/s/${sig.username.toLowerCase()}`}
                      className="ml-auto shrink-0 text-xs text-fd-muted-foreground tabular-nums hover:text-fd-foreground hover:underline underline-offset-2"
                      title={`Certificado de firma de @${sig.username}`}
                    >
                      #{sig.ordinal}
                    </Link>
                  </div>
                  {sig.evidence && (
                    <p
                      className={`${instrumentSerifRegular.className} mt-3 text-[15px] italic leading-relaxed text-fd-foreground/85`}
                    >
                      &ldquo;{sig.evidence}&rdquo;
                    </p>
                  )}
                  {(sig.date || sig.sourceUrl) && (
                    <span className="mt-auto pt-2 text-xs text-fd-muted-foreground">
                      {sig.date && <time dateTime={sig.date}>{sig.date}</time>}
                      {sig.sourceUrl && (
                        <>
                          {sig.date && ' · '}
                          <a
                            href={sig.sourceUrl}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="hover:text-fd-foreground hover:underline underline-offset-2"
                          >
                            fuente ↗
                          </a>
                        </>
                      )}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-6 text-sm text-fd-muted-foreground">
              Las firmas aparecerán aquí a medida que se integren. Sé de los
              primeros:{' '}
              <a
                href="#how-to-sign"
                className="text-fd-foreground underline underline-offset-2"
              >
                aquí te contamos cómo
              </a>
              .
            </p>
          )}
        </section>

        <hr className="my-12 border-t border-fd-border" />

        {/* How to sign — same flow as the EN page; the widget is locale-aware.
            The GitHub-side prefill (sign-link.ts) stays language-neutral. */}
        <section id="how-to-sign" className="scroll-mt-24">
          <h2 className="text-fd-foreground text-xl font-medium tracking-tight">
            Cómo firmar
          </h2>
          <p className="mt-3 text-fd-foreground/90 leading-relaxed">
            Firmar toma unos treinta segundos y ocurre en GitHub, así cada firma
            queda ligada a una cuenta real. Tu nombre de usuario, la fecha y tu
            enlace permanente salen del propio envío; no hay formato que puedas
            equivocar. Del resto nos encargamos nosotros.
          </p>

          <SignPreview locale="es" />

          {/* Retention policy — mirrors the canonical SIGNATURES.md header
              (Spanish rendering of the vigente text). If the repo header
              changes, change this with it. */}
          <div className="mt-8 rounded-lg border border-fd-border bg-fd-secondary/40 p-4 text-sm text-fd-foreground/90 leading-relaxed">
            <p className="font-medium text-fd-foreground">
              Política de equidad y retención
            </p>
            <p className="mt-2">
              Las firmas con patrón masivo se ponen en cola, no se rechazan; la
              cola es pública. Criterios para encolar: ráfagas de tiempo y
              huellas idénticas; nunca la antigüedad de la cuenta por sí sola
              (quien firma legítimamente muchas veces tiene una cuenta recién
              creada y cero seguidores; para esa persona es este manifiesto).
              Las firmas son append-only: solo se añade. Las eliminaciones
              ocurren por petición propia o por determinación de fraude o
              suplantación del mantenedor; cada eliminación es a su vez un commit
              público con su motivo declarado. La identidad detrás de cada firma
              sale de los metadatos verificados del envío de GitHub que la trajo,
              nunca de lo que se escriba en el archivo.
            </p>
          </div>
        </section>

        <hr className="my-12 border-t border-fd-border" />

        {/* Visible FAQ mirroring the FAQPage JSON-LD (ES). */}
        <section>
          <h2 className="text-fd-foreground text-xl font-medium tracking-tight">
            Preguntas frecuentes
          </h2>

          <div className="mt-6">
            <h3 className="text-fd-foreground font-medium">¿Qué es CareerOps?</h3>
            <p className="mt-2 text-fd-foreground/90 leading-relaxed">
              {CAREEROPS_DEFINITION_ES} El término nombra la práctica, no un
              producto: tratar la búsqueda de empleo como un pipeline operado
              (captación, puntuación, adaptación, seguimiento) en lugar de un
              montón de solicitudes sueltas. La implementación de referencia es{' '}
              <Link
                href="/es"
                className="text-fd-foreground underline underline-offset-2"
              >
                career-ops
              </Link>{' '}
              (en minúsculas, con guion), el centro de mando open source con
              licencia MIT que ejecuta todo el pipeline en local, en la máquina
              de quien busca empleo, a través del CLI de IA que ya use. La
              práctica es más grande que la herramienta: puedes practicar
              CareerOps con una hoja de cálculo y disciplina; career-ops solo
              automatiza la capa operativa.
            </p>
          </div>

          <div className="mt-6">
            <h3 className="text-fd-foreground font-medium">
              ¿Quién acuñó el término CareerOps?
            </h3>
            <p className="mt-2 text-fd-foreground/90 leading-relaxed">
              CareerOps fue acuñado como nombre de la práctica por Santiago
              Fernández de Valderrama Aparicio (santifer), creador del proyecto
              open source career-ops, en El Manifiesto CareerOps (The CareerOps
              Manifesto), publicado el 14 de julio de 2026 en esta página y
              firmado en el repositorio del proyecto (
              <a
                href={MANIFESTO_MD_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="text-fd-foreground underline underline-offset-2"
              >
                MANIFESTO.md
              </a>
              , release tag{' '}
              <a
                href={RELEASE_TAG_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="text-fd-foreground underline underline-offset-2"
              >
                manifesto-v1.0
              </a>
              ). El nombre sigue el patrón de DevOps y MLOps: una disciplina
              -Ops que convierte una actividad improvisada en una práctica
              operada e instrumentada. El compuesto había aparecido antes en
              nombres de producto sueltos, como pasa con los compuestos -Ops; el
              manifiesto es la primera definición de CareerOps como práctica.
              Desarrolló la práctica durante su propia búsqueda de empleo de 2026
              (740 vacantes evaluadas, 68 solicitudes, 12 procesos de entrevista,
              1 oferta firmada) antes de nombrarla y abrirla a firmas de la
              comunidad.
            </p>
          </div>
        </section>

        <hr className="my-12 w-32 mx-auto border-t-2 border-fd-foreground/20 lg:w-40" />

        <p className="text-center text-xs text-fd-muted-foreground">
          Texto canónico:{' '}
          <a
            href={MANIFESTO_MD_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="underline underline-offset-2"
          >
            MANIFESTO.md
          </a>
          , en inglés (commit fechado) · etiquetado{' '}
          <a
            href={RELEASE_TAG_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="underline underline-offset-2"
          >
            manifesto-v1.0
          </a>{' '}
          · Publicado el <time dateTime="2026-07-14">14 de julio de 2026</time>.{' '}
          <strong className="font-medium text-fd-foreground/80">
            Esta página es la traducción oficial al español; el documento
            firmado por la comunidad es el original en inglés.
          </strong>
        </p>

        <div className="mt-10 text-center">
          <Link
            href="/methodology"
            className="text-fd-foreground text-base hover:underline underline-offset-4"
          >
            Lee la metodología detrás de la práctica →
          </Link>
        </div>
      </article>
    </>
  );
}
