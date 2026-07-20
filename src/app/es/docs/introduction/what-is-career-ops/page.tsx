import type { Metadata } from 'next';
import { Callout } from 'fumadocs-ui/components/callout';
import { hreflangFor } from '@/lib/i18n-map';

// Spanish "what is career-ops" — the vertical i18n pilot (search-ops,
// 2026-07-20). It ships at the SAME path it keeps under the eventual
// Fumadocs i18n system (hideLocale: 'default-locale'), so swapping the
// rendering mechanism later never changes this URL — no SEO
// re-migration, only an invisible internal swap. EN stays untouched.
//
// Scope per the README/web frontera: the web owns Spanish BUYER + ENTITY
// intent; the technical reference stays in the core's 15-language README.

const EN_PATH = '/docs/introduction/what-is-career-ops';
const ES_PATH = '/es/docs/introduction/what-is-career-ops';

export const metadata: Metadata = {
  title:
    '¿Qué es career-ops? El sistema de búsqueda de empleo con IA, open source y local-first',
  description:
    'Presentamos career-ops, la herramienta open source de gestión de carrera profesional que se ejecuta en tu propia máquina con el CLI de IA que ya usas.',
  alternates: {
    canonical: `https://career-ops.org${ES_PATH}`,
    languages: hreflangFor(EN_PATH) ?? undefined,
  },
  openGraph: {
    type: 'article',
    url: `https://career-ops.org${ES_PATH}`,
    siteName: 'career-ops',
    locale: 'es_ES',
    title: '¿Qué es career-ops?',
    description:
      'El sistema de búsqueda de empleo con IA, open source y local-first.',
  },
};

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12 md:py-16">
      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <h1>Qué es career-ops</h1>

        <p>
          career-ops es un sistema de búsqueda de empleo open source que se
          ejecuta dentro de tu asistente de programación con IA. Le das la URL
          de una oferta o su texto y lee la descripción, puntúa el puesto frente
          a tu perfil en cinco dimensiones más una nota global holística, genera
          un PDF de CV adaptado que cita líneas concretas de tu currículum y lo
          registra todo en un tracker local de candidaturas — todo en un solo
          comando, sin hojas de cálculo, sin cuenta y sin que tus datos salgan
          de tu máquina. career-ops lo creó{' '}
          <a href="https://santifer.io/about" rel="author">
            Santiago Fernández de Valderrama Aparicio
          </a>{' '}
          para gestionar una búsqueda de empleo real en la era de la IA a
          principios de 2026: 740 ofertas evaluadas contra una rúbrica
          explícita, un puesto de Head of Applied AI conseguido en Zinkee. Lo
          publicó bajo licencia MIT cuando dejó de necesitarlo, para que
          cualquiera que haga una búsqueda de empleo estructurada pueda usar el
          mismo sistema gratis, en su propia máquina, con el modelo de IA que ya
          paga.
        </p>

        <h2>Filosofía</h2>

        <h3>Open source, en serio</h3>
        <p>
          career-ops no tiene plan de pago, ni lista de espera, ni cuenta, ni
          telemetría. Clonas el repositorio, rellenas un archivo de
          configuración YAML, colocas tu CV en markdown y ejecutas el sistema en
          local con el CLI de IA que ya uses. Tu CV, tu perfil y tu historial de
          candidaturas nunca salen de tu máquina a menos que tú mismo los subas
          a algún sitio. El proyecto crece con las contribuciones de la
          comunidad, revisadas de forma abierta: cuando alguien añade un scraper
          de un portal de empresa, mejora la rúbrica de puntuación o corrige un
          fallo, esa mejora llega a todo el mundo en la siguiente versión. Ese
          es todo el modelo de negocio — no hay upsell, ni plan enterprise, ni
          venta de datos prevista. El sistema es MIT para siempre; aunque el
          maintainer deje de publicar, la rúbrica, los prompts y los scrapers
          siguen siendo tuyos para hacer fork, auditar y ejecutar.
        </p>

        <Callout title="¿Quieres contribuir?">
          Lee la{' '}
          <a href="https://github.com/santifer/career-ops/blob/main/CONTRIBUTING.md">
            guía de contribución
          </a>{' '}
          antes de abrir un pull request. La versión corta: abre primero un
          issue para comentar el cambio y luego envía tu PR. Los maintainers
          revisan rápido.
        </Callout>

        <h3>Nativo de IA e independiente del proveedor</h3>
        <p>
          career-ops no incluye su propio modelo de IA. Funciona como un
          conjunto de slash commands y archivos de prompt dentro del CLI de IA
          en el que ya confías: Claude Code, Codex, OpenCode, Gemini CLI, Qwen
          CLI o GitHub Copilot. La IA razona; career-ops aporta la estructura, la
          rúbrica de puntuación, los scrapers de portales de empresa y el
          contrato de datos que mantiene tus archivos como tuyos. Esta
          arquitectura significa que no quedas atado a la hoja de ruta ni a los
          precios de un solo proveedor: cuando sale un modelo mejor, cambias de
          CLI y career-ops sigue funcionando por encima sin cambios. La misma
          rúbrica — cinco dimensiones de puntuación más una nota global
          holística — produce un razonamiento comparable tanto si la apuntas a
          un modelo de Claude, OpenAI, Gemini o Qwen — elige el motor que encaje
          con tu coste, calidad y privacidad, y cámbialo libremente según
          evolucione el panorama.
        </p>

        <h2>Cuándo usar career-ops</h2>
        <p>
          career-ops es la herramienta adecuada cuando haces una búsqueda de
          empleo activa y estructurada, no cuando echas un vistazo casual.
          Funciona mejor para candidatos que ya tienen un CV con el que están
          contentos y quieren adaptarlo a cada candidatura sin reescribirlo a
          mano cada vez, que gestionan varias candidaturas y quieren una única
          fuente de verdad en lugar de una hoja de cálculo desbordada, que
          quieren postular solo a puestos que de verdad encajan en vez de a todo
          lo vagamente relacionado, y que se manejan con comandos en una
          terminal aunque no programen profesionalmente. career-ops probablemente
          no es lo que necesitas si vas a enviar una o dos candidaturas y ya
          está. La configuración — clonar el repo, configurar tu perfil, añadir
          tu CV — lleva unos quince minutos, una inversión que solo compensa
          cuando evalúas más de un puñado de puestos.
        </p>

        <h2>Lo que no es</h2>
        <p>
          career-ops no postula a los empleos por ti. El sistema evalúa, puntúa,
          genera y hace seguimiento — pero cada envío es decisión tuya, tomada
          con el razonamiento del agente visible en cada paso, y nada va a
          ninguna parte sin tu aprobación explícita. career-ops tampoco es un
          creador de CVs ni un optimizador de LinkedIn; tú traes el CV que ya
          tienes y el sistema se asegura de que cada versión esté afinada al
          puesto que tienes delante. Es un pipeline, no una fábrica de
          contenido. La frontera entre el código del sistema (que se actualiza
          con cada versión) y los datos del usuario (que nunca se sobrescriben)
          la impone el DATA_CONTRACT.md del repositorio: tu CV, tu perfil y tu
          historial de candidaturas son soberanos — career-ops los leerá, pero
          nunca reescribirá ni borrará en silencio lo que hayas puesto ahí, en
          ninguna versión.
        </p>

        <hr />
        <p className="text-sm">
          <a href={EN_PATH}>Read this in English</a> · career-ops.org
        </p>
      </article>
    </main>
  );
}
