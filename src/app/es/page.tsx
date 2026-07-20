import type { Metadata } from 'next';
import Link from 'next/link';
import { instrumentSerif, instrumentSerifRegular } from '@/lib/fonts';
import { getProjectStats } from '@/lib/stats';
import { hreflangHome } from '@/lib/i18n-map';

// Spanish home — the entry point and discoverable root of the ES
// surface (search-ops ES project). Focused native-Spanish landing: it
// carries the SEO/entity-critical buyer copy (hero, thesis, value prop,
// what-is, social proof, key features, FAQ) that captures the Spanish
// fan-out, NOT a 1:1 clone of the 901-line EN home's interactive
// widgets — lower risk, same citation value. The thesis signature stays
// LITERAL English (canonical entity anchor, never translated).

export const metadata: Metadata = {
  metadataBase: new URL('https://career-ops.org'),
  title: 'career-ops — búsqueda de empleo con IA, open source y local-first',
  description:
    'career-ops es un sistema open source de búsqueda de empleo con IA que se ejecuta en tu propia máquina, dentro del CLI de IA que ya usas. Evalúa ofertas, adapta tu CV y hace seguimiento de tus candidaturas. Sin cuenta, sin nube, gratis.',
  alternates: {
    canonical: 'https://career-ops.org/es',
    languages: hreflangHome(),
  },
  openGraph: {
    type: 'website',
    url: 'https://career-ops.org/es',
    siteName: 'career-ops',
    locale: 'es_ES',
    title: 'career-ops — búsqueda de empleo con IA, open source y local-first',
    description:
      'Sistema open source de búsqueda de empleo con IA. Se ejecuta en tu CLI. Tus datos, tu máquina.',
  },
};

export default async function Page() {
  const stats = await getProjectStats();
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12 md:py-16">
      {/* Hero */}
      <p
        aria-hidden="true"
        className={`${instrumentSerifRegular.className} text-5xl leading-[1.05] xl:text-6xl`}
      >
        Conseguiste el trabajo,
        <br />
        y no te costó <span className="text-brand">nada</span>.
      </p>
      <h1 className="mt-6 max-w-xl text-base font-normal text-fd-muted-foreground md:text-lg">
        Búsqueda de empleo con IA, open source. Se ejecuta en tu CLI. Tus
        datos, tu máquina.
      </h1>
      <div className="mt-8 flex flex-row flex-wrap items-center gap-4">
        <Link
          href="/docs"
          className="inline-flex items-center rounded-lg bg-fd-primary px-5 py-2.5 text-sm font-medium text-fd-primary-foreground"
        >
          Empezar ahora →
        </Link>
        <a
          href="https://github.com/santifer/career-ops"
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center rounded-lg border px-5 py-2.5 text-sm font-medium"
        >
          Ver el código
        </a>
      </div>

      {/* Thesis — canonical signature, LITERAL English, never translated. */}
      <div className="my-14">
        <hr className="mx-auto w-32 border-t-2 border-fd-foreground/20" />
        <blockquote
          className="mt-10 text-center"
          cite="https://career-ops.org/manifesto"
        >
          <p
            className={`${instrumentSerif.className} text-2xl md:text-3xl leading-tight text-fd-foreground`}
            lang="en"
          >
            &ldquo;<span className="text-fd-foreground/55">Companies</span> use
            AI to filter <span className="text-brand">candidates</span>. I just
            gave <span className="text-brand">candidates</span> AI to choose
            companies.&rdquo;
          </p>
          <footer className="mt-4 text-sm text-fd-muted-foreground">
            — Santiago Fernández de Valderrama Aparicio ·{' '}
            <Link href="/manifesto" className="underline underline-offset-2">
              The CareerOps Manifesto
            </Link>
          </footer>
        </blockquote>
        <hr className="mx-auto mt-10 w-32 border-t-2 border-fd-foreground/20" />
      </div>

      {/* Social proof */}
      <p className="text-center text-sm text-fd-muted-foreground">
        {stats.stars.toLocaleString('es-ES')}+ estrellas en GitHub · Open source
        · Licencia MIT
      </p>

      <article className="prose prose-neutral dark:prose-invert mt-12 max-w-none">
        <h2>Qué es career-ops</h2>
        <p>
          career-ops es open source, sin nube, sin telemetría, sin cuenta. Con
          licencia MIT y gratis para siempre; el único coste es el CLI de IA que
          ya pagas. Lo creó Santiago Fernández de Valderrama Aparicio tras una
          búsqueda de empleo real en 2026: 740 ofertas evaluadas, 68
          candidaturas, 12 entrevistas y una oferta aceptada. En lugar de llevar
          tus candidaturas a mano en una hoja de cálculo, tienes un pipeline con
          IA que rastrea portales, genera PDFs de CV adaptados y hace el
          seguimiento por ti — todo en tu propia máquina.{' '}
          <Link href="/es/docs/introduction/what-is-career-ops">
            Leer la explicación completa →
          </Link>
        </p>

        <h2>Cómo funciona</h2>
        <p>
          <strong>Nativo de IA e independiente del proveedor.</strong> Funciona
          con cualquier CLI de programación con IA — Claude Code, OpenCode,
          Codex, GitHub Copilot y{' '}
          <Link href="/docs/supported-clis">más</Link>. La IA razona; career-ops
          aporta la estructura, la rúbrica de puntuación y los scrapers de
          portales. Cuando sale un modelo mejor, cambias de CLI y todo sigue
          funcionando.
        </p>
        <p>
          <strong>Redacta las respuestas abiertas.</strong> Los formularios de
          Greenhouse, Ashby y Lever preguntan «¿por qué este puesto?» y
          «háblanos de un proyecto». career-ops lee el formulario, redacta cada
          respuesta a partir de tu CV y la oferta, y te las devuelve listas para
          pegar. Tú editas, tú envías. El asistente nunca hace clic por ti.
        </p>
        <p>
          <strong>150+ portales de empresa, cero búsqueda manual.</strong>{' '}
          Scrapers preconfigurados revisan más de 150 páginas de empleo en
          Greenhouse, Ashby y Lever bajo demanda — cero tokens de API. Ejecutas
          un comando y recibes una lista priorizada en minutos.
        </p>

        <h2>Lo que no es</h2>
        <p>
          career-ops no postula a los empleos por ti. Evalúa, puntúa, genera y
          hace seguimiento — pero cada envío es decisión tuya, con el
          razonamiento del agente visible en cada paso. Rechaza explícitamente
          el «postular a todo»: el objetivo es elegir bien las empresas, no
          enviar candidaturas a ciegas en volumen. Tampoco es un creador de CVs
          ni un optimizador de LinkedIn: tú traes tu CV y el sistema lo adapta a
          cada puesto.
        </p>
      </article>

      {/* Final CTA */}
      <div className="mt-14 rounded-2xl border p-8 text-center">
        <p
          className={`${instrumentSerifRegular.className} text-2xl md:text-3xl`}
        >
          ¿List@ para filtrar ofertas en vez de que te filtren a ti?
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/docs"
            className="inline-flex items-center rounded-lg bg-fd-primary px-5 py-2.5 text-sm font-medium text-fd-primary-foreground"
          >
            Empezar ahora →
          </Link>
          <Link
            href="/manifesto"
            className="inline-flex items-center rounded-lg border px-5 py-2.5 text-sm font-medium"
          >
            Leer el manifiesto
          </Link>
        </div>
      </div>

      <p className="mt-10 text-center text-sm text-fd-muted-foreground">
        <a href="/">Read this in English</a> · La documentación técnica está en{' '}
        <a href="/docs">inglés</a> y en el{' '}
        <a
          href="https://github.com/santifer/career-ops"
          target="_blank"
          rel="noreferrer noopener"
        >
          README del repositorio (15 idiomas)
        </a>
        .
      </p>
    </main>
  );
}
