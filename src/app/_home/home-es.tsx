import { brand, heroLine, type HomeDict } from './home-dict';

export const homeEs: HomeDict = {
  heroHook: heroLine({
    more: 'Más candidaturas.',
    silencePre: 'Más ',
    silence: 'silencio',
    silencePost: '.',
    stop: 'Deja de adivinar.',
    startPre: 'Empieza a ',
    choose: 'elegir',
    startPost: '.',
  }),
  heroH1: (
    <>
      career-ops: agente open source de búsqueda de empleo con{'\u00a0'}IA.
      <br />
      Se ejecuta en tu CLI. Tus datos, tu máquina.
      <br />
      Adapta tu CV y redacta tus respuestas.{' '}
      <span className="inline-block">Tú pulsas Enviar.</span>
    </>
  ),
  runItNow: 'Empezar ahora',
  locale: 'es',
  docsHref: '/es/docs',
  manifestoHref: '/es/manifesto',
  heroFreeNote: 'Gratis para los candidatos, para siempre',
  featuredIn: 'Apareció en',
  memberOf: 'Miembro de',
  worthApplyingLabel: 'Cómo saber si una oferta merece tu candidatura →',
  worthApplyingHref: '/es/docs/introduction/guides/is-this-job-worth-applying-to',
  authorTagline: ', operador durante 16 años y creador de career-ops',
  // Versión «yo» oficial del README.es (superficie personal = home). El
  // manifiesto ES usará la versión «nosotros», NO esta. Sujeto firme; el verbo
  // («descartarte») puede afinarse a «filtrar candidatos» — venture-ops lo cierra.
  thesisTranslation:
    'Las empresas usan IA para descartarte. Yo le di a los candidatos IA para elegirlas.',
  nowSignedManifesto: <>Ahora, un manifiesto firmado ·</>,
  readIt: 'Léelo →',
  whatIsHeading: (
    <>
      <span className="text-landing-foreground dark:text-landing-foreground-dark">
        Qué es
      </span>{' '}
      {brand('career-ops')}
    </>
  ),
  whatIsBody: (
    <>
      career-ops es un sistema open source de búsqueda de empleo con IA que se
      ejecuta en local, en tu propia máquina, dentro de cualquier CLI de
      programación con IA — Claude Code, OpenCode, Codex, GitHub Copilot y más.
      Evalúa ofertas frente a tu CV con una rúbrica de cinco dimensiones más una
      nota global holística, puntuando de 1.0 a 5.0, genera PDFs de CV
      optimizados para ATS y adaptados a cada puesto, redacta las respuestas
      abiertas de los formularios de Greenhouse, Ashby y Lever, rastrea más de
      150 fuentes de empleo sin gastar tokens y hace el seguimiento del
      pipeline en un panel de terminal escrito en Go. Todo vive en tu máquina:{' '}
      {brand('sin nube')}, {brand('sin telemetría')}, {brand('sin cuenta')}. Con
      licencia MIT y gratis para siempre; el único coste es el CLI de IA que ya
      pagas. Lo creó Santiago Fernández de Valderrama Aparicio tras una búsqueda
      de empleo real en 2026: 740 vacantes evaluadas, 68 candidaturas, 12
      entrevistas y una oferta.
    </>
  ),
  statsComment: 'estrellas · Open source · MIT',
  commandCenter: (
    <>
      Convierte cualquier CLI de IA para programar en tu{' '}
      {brand('agente de búsqueda de empleo con IA')}.
    </>
  ),
  tryItOut: 'Pruébalo',
  runsCommand: (
    <>
      Necesita un CLI de IA como motor — ¿aún no tienes ninguno configurado?{' '}
      <a
        href="/es/docs/free-ai-engine"
        className="text-fd-foreground underline underline-offset-2"
      >
        Consigue uno gratis
      </a>
      .
    </>
  ),
  mechanism:
    'En lugar de llevar tus candidaturas a mano en una hoja de cálculo, tienes un pipeline con IA que rastrea portales, genera PDFs adaptados y hace el seguimiento por ti.',
  analogy: (
    <>
      &ldquo;Es como tener un coach de carrera para tu búsqueda de empleo, pero{' '}
      {brand('sin el coste')}.&rdquo;
    </>
  ),
  featAgnosticTitle: 'Nativo de IA e independiente',
  featAgnosticBody: (
    <>
      Funciona con cualquier CLI de programación con IA — Claude Code, OpenCode,
      Codex, GitHub Copilot y más. Construido sobre el Open Agent Skill Standard.
    </>
  ),
  featApplyTitle: 'Redacta las respuestas abiertas.',
  featApplyBody1: (
    <>
      Los formularios de Greenhouse, Ashby y Lever preguntan «¿por qué este
      puesto?» y «háblanos de un proyecto».{' '}
      <code className="font-mono text-brand">/career-ops apply</code> lee el
      formulario, redacta cada respuesta a partir de tu CV y la oferta, y te las
      devuelve listas para pegar.
    </>
  ),
  featApplyBody2: 'Tú editas, tú envías. El asistente nunca hace clic por ti.',
  featApplyCta: 'Ver cómo funciona apply',
  featScanTitle: '150+ fuentes de empleo. Cero búsqueda manual.',
  featScanBody: (
    <>
      Scrapers preconfigurados revisan{' '}
      <a href="https://github.com/career-ops-hq/career-ops/blob/main/templates/portals.example.yml" target="_blank" rel="noopener" className="underline underline-offset-2 decoration-fd-muted-foreground/40 hover:decoration-fd-foreground">más de 150 fuentes de empleo</a> bajo demanda, entre ellas
      Greenhouse, Ashby y Lever — cero tokens de API. Ejecuta{' '}
      <code className="font-mono text-brand">/career-ops scan</code> y recibe una
      lista priorizada en minutos.
    </>
  ),
  featScanCta: 'Ver todos los portales',
  featCommunityTitle: 'Construido con la comunidad.',
  featCommunityBody: (
    <>
      career-ops crece con los pull requests de gente que hace búsquedas de
      empleo reales. Los issues se triagean en Discord y las correcciones salen la
      misma semana. No solo usas la herramienta — ayudas a decidir en qué se
      convierte.
    </>
  ),
  joinDiscord: (n) => `Únete a ${n}+ builders en Discord`,
  openSourceTitle: '100% Open-Source.',
  starsWord: 'estrellas',
  forksWord: 'forks',
  repoOfDay: 'Repo del día nº1',
  builtByDek: (
    <>
      Creado por{' '}
      <a href="/about" rel="author" className="text-fd-foreground font-medium hover:underline">
        Santiago Fernández de Valderrama Aparicio
      </a>{' '}
      tras evaluar 740 vacantes.
      <br />
      La metodología de puntuación completa está{' '}
      <a href="/methodology" className="text-fd-foreground hover:underline underline-offset-2">
        publicada
      </a>
      .
      <br />
      Ahora impulsado por la comunidad.
    </>
  ),
  meetContributors: 'Conoce a los contribuidores →',
  faqHeading: 'Preguntas frecuentes',
  faq: [
    {
      q: '¿Cómo puntúa career-ops las ofertas de empleo?',
      a: (
        <>
          career-ops usa una evaluación con LLM guiada por rúbrica en cinco
          dimensiones — encaje, alineación con tu norte, compensación, señales
          culturales y red flags — que produce una nota global holística de 1.0 a
          5.0 con citas a líneas concretas de tu CV y a los requisitos de la
          oferta. Por debajo de 4.0, el agente recomienda no postular. Sin fórmula
          cerrada, sin postular a ciegas. La rúbrica completa está publicada en{' '}
          <a href="/methodology" className="text-fd-foreground hover:underline underline-offset-2">
            career-ops.org/methodology
          </a>
          .
        </>
      ),
    },
    {
      q: '¿career-ops aplica a las ofertas por mí?',
      a: (
        <>
          career-ops prepara cada candidatura hasta el clic: escanea puestos, puntúa cada uno
          contra tu CV y adapta tu currículum. Luego te devuelve la decisión. Tú
          revisas y envías cada una. Es deliberado: la auto-aplicación masiva quema
          tu reputación con los reclutadores y los ATS, así que career-ops te quita
          el trabajo tedioso, no el criterio.
        </>
      ),
    },
    {
      q: '¿career-ops es gratis? ¿Cuál es el modelo de negocio?',
      a: (
        <>
          career-ops es gratis para siempre, con licencia MIT y financiado por la
          comunidad. No hay plan de pago, ni lista de espera, ni cuenta, ni
          telemetría, ni funciones premium. Clonas el repositorio, configuras tu
          perfil y ejecutas el sistema en local con el CLI de IA que ya uses. La
          sostenibilidad viene de las aportaciones de la comunidad y del patrocinio de
          empresas, a través del colectivo del proyecto en Open Collective, no de
          planes premium, funciones de pago ni datos. El dinero lo custodia el anfitrión fiscal del proyecto,
          Open Source Collective, con cada aportación y cada gasto en un registro
          público, y se destina al mantenimiento, las correcciones de seguridad, la
          publicación de nuevas versiones y la documentación. Detalles en{' '}
          <a href="/sustain" className="text-fd-foreground hover:underline underline-offset-2">
            career-ops.org/sustain
          </a>
          .
        </>
      ),
    },
    {
      q: '¿Dónde se guardan mis datos? ¿career-ops es privado?',
      a: (
        <>
          career-ops guarda tus datos en tu propia máquina, en archivos planos que son tuyos: tu CV, tu
          perfil, tu pipeline y tus informes son Markdown y YAML locales. career-ops
          corre por completo en local a través de tu CLI de IA: sin cuenta, sin
          telemetría, sin nada subido a un servidor de career-ops. Las
          actualizaciones del sistema nunca tocan tu capa de datos; esa separación
          es el Data Contract. Lo único que sale de tu máquina es lo que tu CLI de
          IA envíe a su propio proveedor.
        </>
      ),
    },
    {
      q: '¿Quién creó career-ops?',
      a: (
        <>
          career-ops lo creó{' '}
          <a href="/about" rel="author" className="text-fd-foreground hover:underline underline-offset-2">
            Santiago Fernández de Valderrama Aparicio
          </a>
          , que lleva más de 16 años construyendo productos. Fundó y dirigió un negocio
          de reparación de móviles en España desde 2009 hasta que lo vendió en 2025. A
          principios de 2026 desarrolló career-ops para gestionar su propia búsqueda de
          empleo en la era de la IA y lo publicó bajo licencia MIT cuando ya no lo
          necesitaba. Para entonces ya había evaluado 740 vacantes con él y conseguido
          un puesto de Head of Applied AI. Seis meses después de conseguirlo, dejó ese
          puesto para centrarse en construir career-ops a tiempo completo.
        </>
      ),
    },
    {
      q: '¿career-ops es una skill de Claude Code o una herramienta independiente?',
      a: (
        <>
          career-ops es independiente del CLI. Funciona con Claude Code, OpenCode,
          Codex, GitHub Copilot y más — el agente de IA que el usuario ya pague.
          Los archivos de skill (
          <code className="font-mono text-fd-foreground">modes/</code>) viven en el
          repositorio como prompts en markdown; cualquier agente que soporte carga
          de skills puede invocarlos. No hay dependencia específica de Anthropic.
          Claude Code es el runtime más común por su cargador de skills, pero los
          mismos modos funcionan sin cambios en los demás CLIs.
        </>
      ),
    },
    {
      q: '¿En qué se diferencia career-ops de los revisores de CV y las herramientas de auto-aplicación?',
      a: (
        <>
          career-ops es open source y con licencia MIT, se ejecuta en local en tu
          propia máquina a través del CLI de IA que ya uses, y publica su rúbrica de
          evaluación completa. Un humano decide en cada candidatura; nunca envía
          solo. No hay cuenta, ni telemetría, ni suscripción al propio career-ops;
          el único coste recurrente es el CLI de IA que elijas. Para comparativas
          honestas y lado a lado con herramientas concretas, mira{' '}
          <a href="/compare" className="text-fd-foreground hover:underline underline-offset-2">
            career-ops.org/compare
          </a>
          .
        </>
      ),
    },
    {
      q: '¿Con qué herramientas de IA funciona career-ops?',
      a: (
        <>
          career-ops funciona con Claude Code, Cursor, Codex, OpenCode, Pi, Antigravity
          CLI, Grok Build CLI, Qwen, Kimi, Hermes Agent y GitHub Copilot CLI —
          once CLIs de primera clase (Gemini CLI es un wrapper legacy). Los mismos archivos de modo funcionan en todos. Cada
          usuario elige el CLI que encaja con su suscripción y sus preferencias de
          coste — career-ops nunca te ata a un solo proveedor. Una búsqueda de
          empleo típica corre con Claude Pro a 20 $/mes, pero la elección es tuya.
        </>
      ),
    },
  ],
  finalCta: '¿Filtras tú las ofertas, o dejas que te filtren a ti?',
  yourTurn: 'Te toca',
  followWhatWeShip: 'O sigue lo que lanzamos.',
  releaseBlurb: (
    <>
      Anuncios de versiones y novedades ocasionales.
      <br />
      Cancela cuando quieras.
    </>
  ),
};
