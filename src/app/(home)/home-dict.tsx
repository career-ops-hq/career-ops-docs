import type { ReactNode } from 'react';

// Home copy dictionary — one trunk, text varies by language. The home
// component renders IDENTICAL structure/widgets for every locale; only
// these strings change. Rich blocks (brand spans, links) are ReactNode
// so the formatting travels with the translation. Same keys in every
// locale. NEVER translated (stay hardcoded in the component): the thesis
// signature, "career-ops"/"CareerOps", the canonical name, mode command
// strings, code identifiers.
//
// Static numbers inside prose (740 listings, 68 applications) are part
// of the copy. LIVE stats (star/fork counts) are interpolated in the
// component from getProjectStats, not here.

export type HomeDict = {
  heroHook: ReactNode;
  heroH1: ReactNode;
  runItNow: string;
  viewSource: string;
  // Locale-aware destination for the "get started" / docs CTAs: EN '/docs',
  // ES '/es/docs'. Keeps the Spanish home sending users into the Spanish docs
  // (which now has a translated landing) instead of dropping them into English.
  docsHref: string;
  // Locale-aware manifesto link (EN '/manifesto', ES '/es/manifesto'). Same
  // reason as docsHref: the Spanish home must send readers to the Spanish
  // manifesto, not drop them into the English one.
  manifestoHref: string;
  featuredIn: string;
  authorTagline: string;
  // Official localized rendering of the signature thesis, shown BELOW the
  // literal-English blockquote (which stays verbatim on every locale, it is the
  // citable entity anchor). Optional: absent on EN (no sub-line), present on ES.
  thesisTranslation?: string;
  nowSignedManifesto: ReactNode;
  readIt: string;
  whatIsHeading: ReactNode;
  whatIsBody: ReactNode;
  statsComment: string; // after "// {N} " — "stars · Open source · MIT"
  commandCenter: ReactNode;
  tryItOut: string;
  runsCommand: ReactNode; // "Needs an AI coding CLI… Get one free."
  mechanism: string;
  analogy: ReactNode;
  featAgnosticTitle: string;
  featAgnosticBody: ReactNode;
  featApplyTitle: string;
  featApplyBody1: ReactNode;
  featApplyBody2: string;
  featApplyCta: string;
  featScanTitle: string;
  featScanBody: ReactNode;
  featScanCta: string;
  featCommunityTitle: string;
  featCommunityBody: ReactNode;
  joinDiscord: (n: string) => string;
  openSourceTitle: string;
  starsWord: string;
  forksWord: string;
  repoOfDay: string;
  builtByDek: ReactNode;
  meetContributors: string;
  faqHeading: string;
  faq: { q: string; a: ReactNode }[];
  finalCta: string;
  yourTurn: string;
  followWhatWeShip: string;
  releaseBlurb: ReactNode;
};

const brand = (t: ReactNode) => <span className="text-brand">{t}</span>;

export const homeEn: HomeDict = {
  heroHook: (
    <>
      You got the job,
      <br />
      and it didn&apos;t cost you a {brand('thing')}.
    </>
  ),
  heroH1: (
    <>
      Open source AI-powered job search.
      <br />
      Runs in your CLI. Your data, your machine.
    </>
  ),
  runItNow: 'Run it now',
  viewSource: 'View source',
  docsHref: '/docs',
  manifestoHref: '/manifesto',
  featuredIn: 'Featured in',
  authorTagline: ', 16-year operator and Head of Applied AI',
  nowSignedManifesto: <>Now a signed manifesto ·</>,
  readIt: 'Read it →',
  whatIsHeading: (
    <>
      <span className="text-landing-foreground dark:text-landing-foreground-dark">
        What is
      </span>{' '}
      {brand('career-ops')}?
    </>
  ),
  whatIsBody: (
    <>
      career-ops is an open-source AI-powered job search system that runs
      locally on your machine inside any AI coding CLI — Claude Code, OpenCode,
      Codex, GitHub Copilot, and more. It evaluates job listings against your CV
      using a five-dimension rubric plus a holistic global score, scoring
      1.0–5.0, generates ATS-optimized PDF resumes tailored per role, drafts
      answers to open-ended application questions on Greenhouse, Ashby and Lever
      forms, scans 150+ company portals zero-token, and tracks the pipeline in a
      Go-based terminal dashboard. Everything lives on your machine:{' '}
      {brand('no cloud')}, {brand('no telemetry')}, {brand('no account')}.
      MIT-licensed and free forever; the only cost is whichever AI coding CLI you
      already pay for. Built by Santiago Fernández de Valderrama Aparicio after a
      real 2026 job search of 740 listings, 68 applications, 12 interviews, and
      one offer.
    </>
  ),
  statsComment: 'stars · Open source · MIT',
  commandCenter: (
    <>
      Turn any AI coding CLI into a full job search {brand('command center')}.
    </>
  ),
  tryItOut: 'Try it out',
  runsCommand: (
    <>
      Needs an AI coding CLI as its engine — no AI set up yet?{' '}
      <a
        href="/docs/free-ai-engine"
        className="text-fd-foreground underline underline-offset-2"
      >
        Get one free
      </a>
      .
    </>
  ),
  mechanism:
    'Instead of manually tracking applications in a spreadsheet, you get an AI-powered pipeline that scans portals, generates tailored PDFs and tracks everything for you.',
  analogy: (
    <>
      &ldquo;It&apos;s like having a career coach for your job search, but{' '}
      {brand('without the cost')}.&rdquo;
    </>
  ),
  featAgnosticTitle: 'AI-Native & Agnostic',
  featAgnosticBody: (
    <>
      Works with any coding CLI — Claude Code, OpenCode, Codex, GitHub Copilot,
      and more. Built on the Open Agent Skill Standard.
    </>
  ),
  featApplyTitle: 'Drafts the open-ended answers.',
  featApplyBody1: (
    <>
      Greenhouse, Ashby and Lever forms ask &ldquo;Why this role?&rdquo; and
      &ldquo;Tell us about a project.&rdquo;{' '}
      <code className="font-mono text-brand">/career-ops apply</code> reads the
      form, drafts every answer from your CV and the JD, and hands them back
      paste-ready.
    </>
  ),
  featApplyBody2: 'You edit, you submit. The assistant never clicks for you.',
  featApplyCta: 'See how apply works',
  featScanTitle: '150+ company portals. Zero manual searching.',
  featScanBody: (
    <>
      Pre-configured scrapers check 150+ career pages across Greenhouse, Ashby
      and Lever on demand — zero API tokens spent. Run{' '}
      <code className="font-mono text-brand">/career-ops scan</code> and get a
      ranked list back in minutes.
    </>
  ),
  featScanCta: 'See all portals',
  featCommunityTitle: 'Shipped with the community.',
  featCommunityBody: (
    <>
      career-ops grows through pull requests from people running real job
      searches. Issues get triaged in Discord, fixes ship the same week. You
      don&apos;t just use the tool — you help shape what it becomes.
    </>
  ),
  joinDiscord: (n) => `Join ${n}+ builders in Discord`,
  openSourceTitle: '100% Open-Source.',
  starsWord: 'stars',
  forksWord: 'forks',
  repoOfDay: '#1 Repo of the Day',
  builtByDek: (
    <>
      Built by{' '}
      <a href="/about" rel="author" className="text-fd-foreground font-medium hover:underline">
        Santiago Fernández de Valderrama Aparicio
      </a>{' '}
      after evaluating 740 job listings.
      <br />
      The full scoring methodology is{' '}
      <a href="/methodology" className="text-fd-foreground hover:underline underline-offset-2">
        published
      </a>
      .
      <br />
      Now powered by the community.
    </>
  ),
  meetContributors: 'Meet our contributors →',
  faqHeading: 'Frequently asked',
  faq: [
    {
      q: 'How does career-ops score job listings?',
      a: (
        <>
          career-ops uses a rubric-guided LLM evaluation across five dimensions —
          match, north-star alignment, comp, cultural signals, red flags —
          producing a holistic 1.0–5.0 global score with citations to specific CV
          lines and JD requirements. Anything below 4.0 the agent recommends
          against applying. No closed-form formula, no spray-and-pray. The full
          rubric is published at{' '}
          <a href="/methodology" className="text-fd-foreground hover:underline underline-offset-2">
            career-ops.org/methodology
          </a>
          .
        </>
      ),
    },
    {
      q: 'Does career-ops apply to jobs for me?',
      a: (
        <>
          It prepares every application right up to the click: it scans roles,
          scores each against your CV, and tailors a resume. Then it hands the
          decision back to you. You review and send each one yourself. That is
          deliberate: mass auto-apply burns your standing with recruiters and ATS
          systems, so career-ops removes the busywork and keeps the choice yours.
          More in{' '}
          <a
            href="/blog/can-an-ai-agent-run-your-job-search"
            className="text-fd-foreground hover:underline underline-offset-2"
          >
            Can an AI agent run your whole job search?
          </a>
        </>
      ),
    },
    {
      q: 'Is career-ops free? What is the business model?',
      a: (
        <>
          career-ops is permanently free, MIT-licensed, and community-funded.
          There is no paid tier, no waitlist, no account, no telemetry, and no
          premium features. You clone the repo, configure your profile, and run
          the system locally with whichever AI coding CLI you already use.
          Sustainability comes from voluntary community patronage via GitHub
          Sponsors — not from premium tiers, paid features, or data. The
          maintainer has other paid work for income; sponsorship enables deeper
          focus on the project. See{' '}
          <a href="/sustain" className="text-fd-foreground hover:underline underline-offset-2">
            career-ops.org/sustain
          </a>{' '}
          for details.
        </>
      ),
    },
    {
      q: 'Where does my data live?',
      a: (
        <>
          On your own machine, in plain files you own: your CV, profile,
          pipeline, and reports are local Markdown and YAML. career-ops runs
          entirely locally through your AI CLI: no account, no telemetry, nothing
          uploaded to a career-ops server. System updates never touch your data
          layer; that separation is the Data Contract. The only data that leaves
          your computer is whatever your chosen AI CLI sends to its own provider.
        </>
      ),
    },
    {
      q: 'Who built career-ops?',
      a: (
        <>
          career-ops was built by{' '}
          <a href="/about" rel="author" className="text-fd-foreground hover:underline underline-offset-2">
            Santiago Fernández de Valderrama Aparicio
          </a>{' '}
          — an Applied AI Operator with 16+ years building products, founder and
          operator of a Spanish phone-repair business (2009–2025) before exiting,
          and currently Head of Applied AI at Zinkee. He created career-ops in
          early 2026 to manage his own AI-era job search — 740 listings
          evaluated, one Head of AI role landed — and open-sourced it under MIT
          once he no longer needed it.
        </>
      ),
    },
    {
      q: 'Is career-ops a Claude Code skill or a standalone tool?',
      a: (
        <>
          career-ops is CLI-agnostic. It works with Claude Code, OpenCode, Codex,
          GitHub Copilot, and more — whichever AI coding agent the user already
          pays for. The skill files (
          <code className="font-mono text-fd-foreground">modes/</code>) live in
          the repo as plain markdown prompts; any agent that supports skill
          loading can invoke them. There is no Anthropic-specific dependency.
          Claude Code happens to be the most common runtime because of its skill
          loader, but the same modes run unchanged in the other CLIs.
        </>
      ),
    },
    {
      q: 'How is career-ops different from resume checkers and auto-apply tools?',
      a: (
        <>
          career-ops is open source and MIT-licensed, runs locally on your own
          machine through whichever AI coding CLI you already use, and publishes
          its full evaluation rubric. A human stays in the loop on every
          application; it never auto-submits. There is no account, no telemetry,
          and no subscription to career-ops itself; the only recurring cost is the
          AI CLI you choose. For honest, side-by-side comparisons with specific
          tools, see{' '}
          <a href="/compare" className="text-fd-foreground hover:underline underline-offset-2">
            career-ops.org/compare
          </a>
          .
        </>
      ),
    },
    {
      q: 'What AI tools does career-ops work with?',
      a: (
        <>
          Claude Code, Codex, OpenCode, Antigravity CLI, Grok Build CLI, Qwen,
          Kimi, and GitHub Copilot CLI — eight first-class CLIs (Gemini CLI is a
          legacy wrapper). The same mode files run on all of them. Each user picks
          the CLI that fits their existing subscription and cost preferences —
          career-ops never locks you to one provider. A typical job search runs on
          Claude Pro at $20/month, but the choice is yours.
        </>
      ),
    },
  ],
  finalCta: 'Ready to filter offers, not get filtered?',
  yourTurn: 'Your turn',
  followWhatWeShip: 'Or follow what we ship.',
  releaseBlurb: (
    <>
      Release announcements and occasional updates.
      <br />
      Unsubscribe anytime.
    </>
  ),
};

export const homeEs: HomeDict = {
  heroHook: (
    <>
      Conseguiste el trabajo,
      <br />
      y no te costó {brand('nada')}.
    </>
  ),
  heroH1: (
    <>
      Búsqueda de empleo con IA, open source.
      <br />
      Se ejecuta en tu CLI. Tus datos, tu máquina.
    </>
  ),
  runItNow: 'Empezar ahora',
  viewSource: 'Ver el código',
  docsHref: '/es/docs',
  manifestoHref: '/es/manifesto',
  featuredIn: 'Apareció en',
  authorTagline: ', 16 años como operador y Head of Applied AI',
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
      150 portales de empresa sin gastar tokens y hace el seguimiento del
      pipeline en un panel de terminal escrito en Go. Todo vive en tu máquina:{' '}
      {brand('sin nube')}, {brand('sin telemetría')}, {brand('sin cuenta')}. Con
      licencia MIT y gratis para siempre; el único coste es el CLI de IA que ya
      pagas. Lo creó Santiago Fernández de Valderrama Aparicio tras una búsqueda
      de empleo real en 2026: 740 ofertas evaluadas, 68 candidaturas, 12
      entrevistas y una oferta.
    </>
  ),
  statsComment: 'estrellas · Open source · MIT',
  commandCenter: (
    <>
      Convierte cualquier CLI de IA en un {brand('centro de mando')} completo de
      búsqueda de empleo.
    </>
  ),
  tryItOut: 'Pruébalo',
  runsCommand: (
    <>
      Necesita un CLI de IA como motor — ¿aún no tienes ninguno configurado?{' '}
      <a
        href="/docs/free-ai-engine"
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
  featScanTitle: '150+ portales de empresa. Cero búsqueda manual.',
  featScanBody: (
    <>
      Scrapers preconfigurados revisan más de 150 páginas de empleo en
      Greenhouse, Ashby y Lever bajo demanda — cero tokens de API. Ejecuta{' '}
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
      tras evaluar 740 ofertas de empleo.
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
          Prepara cada candidatura hasta el clic: escanea puestos, puntúa cada uno
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
          sostenibilidad viene del mecenazgo voluntario de la comunidad vía GitHub
          Sponsors — no de planes premium, funciones de pago ni datos. El
          maintainer tiene otro trabajo remunerado; el patrocinio le permite
          dedicarle más foco. Detalles en{' '}
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
          En tu propia máquina, en archivos planos que son tuyos: tu CV, tu
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
          </a>{' '}
          — un Applied AI Operator con más de 16 años construyendo productos,
          fundador y operador de un negocio español de reparación de móviles
          (2009–2025) antes de su salida, y actualmente Head of Applied AI en
          Zinkee. Creó career-ops a principios de 2026 para gestionar su propia
          búsqueda de empleo en la era de la IA — 740 ofertas evaluadas, un puesto
          de Head of AI conseguido — y lo publicó bajo licencia MIT cuando dejó de
          necesitarlo.
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
          Claude Code, Codex, OpenCode, Antigravity CLI, Grok Build CLI, Qwen,
          Kimi y GitHub Copilot CLI — ocho CLIs de primera clase (Gemini CLI es un
          wrapper legacy). Los mismos archivos de modo funcionan en todos. Cada
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

// French home (French pilot, 2026-07-21). Same trunk, French copy. The thesis
// stays LITERAL English (no official French translation until venture-ops
// ratifies), so there is NO thesisTranslation and only the English blockquote
// renders. FAQ questions are transcreated to the measured French fan-out
// (search-ops fanout-fr-2026-W30): the killer "career-ops postule-t-il à ma
// place ?" and the privacy "Mes données restent-elles sur mon ordinateur ?".
export const homeFr: HomeDict = {
  heroHook: (
    <>
      Vous avez décroché le poste,
      <br />
      et ça ne vous a {brand('rien')} coûté.
    </>
  ),
  heroH1: (
    <>
      Recherche d’emploi par IA, open source.
      <br />
      Elle tourne dans votre CLI. Vos données, votre machine.
    </>
  ),
  runItNow: 'Commencer',
  viewSource: 'Voir le code',
  docsHref: '/fr/docs',
  manifestoHref: '/manifesto',
  featuredIn: 'Vu dans',
  authorTagline: ', 16 ans d’opérateur et Head of Applied AI',
  // No thesisTranslation for FR — the English thesis stands alone (venture-ops).
  nowSignedManifesto: <>Désormais un manifeste signé ·</>,
  readIt: 'À lire →',
  whatIsHeading: (
    <>
      <span className="text-landing-foreground dark:text-landing-foreground-dark">
        Qu’est-ce que
      </span>{' '}
      {brand('career-ops')}
    </>
  ),
  whatIsBody: (
    <>
      career-ops est un système open source de recherche d’emploi par IA qui
      tourne en local, sur votre propre machine, dans n’importe quel CLI de
      codage IA — Claude Code, OpenCode, Codex, GitHub Copilot et d’autres. Il
      évalue les offres face à votre CV avec une grille de cinq dimensions plus
      une note globale, de 1.0 à 5.0, génère des CV PDF optimisés pour les ATS et
      adaptés à chaque poste, rédige les réponses aux questions ouvertes des
      formulaires Greenhouse, Ashby et Lever, parcourt plus de 150 portails
      d’entreprise sans consommer de jetons et suit votre pipeline dans un
      tableau de bord en terminal écrit en Go. Tout vit sur votre machine :{' '}
      {brand('sans cloud')}, {brand('sans télémétrie')}, {brand('sans compte')}.
      Sous licence MIT et gratuit pour toujours ; le seul coût est le CLI d’IA
      que vous payez déjà. Créé par Santiago Fernández de Valderrama Aparicio
      après une vraie recherche d’emploi en 2026 : 740 offres évaluées, 68
      candidatures, 12 entretiens et une offre.
    </>
  ),
  statsComment: 'étoiles · Open source · MIT',
  commandCenter: (
    <>
      Transformez n’importe quel CLI d’IA en {brand('centre de commande')} complet
      pour votre recherche d’emploi.
    </>
  ),
  tryItOut: 'Essayez',
  runsCommand: (
    <>
      Il lui faut un CLI d’IA comme moteur — vous n’en avez pas encore configuré ?{' '}
      <a
        href="/fr/docs/free-ai-engine"
        className="text-fd-foreground underline underline-offset-2"
      >
        Obtenez-en un gratuitement
      </a>
      .
    </>
  ),
  mechanism:
    'Au lieu de suivre vos candidatures à la main dans un tableur, vous avez un pipeline IA qui parcourt les portails, génère des CV PDF adaptés et fait le suivi à votre place.',
  analogy: (
    <>
      &ldquo;C’est comme avoir un coach de carrière pour votre recherche
      d’emploi, mais {brand('sans le prix')}.&rdquo;
    </>
  ),
  featAgnosticTitle: 'Nativement IA et indépendant',
  featAgnosticBody: (
    <>
      Fonctionne avec n’importe quel CLI de codage IA — Claude Code, OpenCode,
      Codex, GitHub Copilot et d’autres. Construit sur l’Open Agent Skill
      Standard.
    </>
  ),
  featApplyTitle: 'Il rédige les réponses ouvertes.',
  featApplyBody1: (
    <>
      Les formulaires Greenhouse, Ashby et Lever demandent « pourquoi ce poste ? »
      et « parlez-nous d’un projet ».{' '}
      <code className="font-mono text-brand">/career-ops apply</code> lit le
      formulaire, rédige chaque réponse à partir de votre CV et de l’offre, et
      vous les rend prêtes à coller.
    </>
  ),
  featApplyBody2:
    'Vous éditez, vous envoyez. L’assistant ne clique jamais à votre place.',
  featApplyCta: 'Voir comment fonctionne apply',
  featScanTitle: '150+ portails d’entreprise. Zéro recherche manuelle.',
  featScanBody: (
    <>
      Des scrapers préconfigurés parcourent plus de 150 pages d’emploi sur
      Greenhouse, Ashby et Lever à la demande — zéro jeton d’API. Lancez{' '}
      <code className="font-mono text-brand">/career-ops scan</code> et recevez
      une liste priorisée en quelques minutes.
    </>
  ),
  featScanCta: 'Voir tous les portails',
  featCommunityTitle: 'Construit avec la communauté.',
  featCommunityBody: (
    <>
      career-ops grandit grâce aux pull requests de gens qui font de vraies
      recherches d’emploi. Les issues sont triées sur Discord et les correctifs
      sortent dans la semaine. Vous n’utilisez pas seulement l’outil — vous aidez
      à décider ce qu’il devient.
    </>
  ),
  joinDiscord: (n) => `Rejoignez ${n}+ builders sur Discord`,
  openSourceTitle: '100% Open-Source.',
  starsWord: 'étoiles',
  forksWord: 'forks',
  repoOfDay: 'Repo du jour nº1',
  builtByDek: (
    <>
      Créé par{' '}
      <a href="/about" rel="author" className="text-fd-foreground font-medium hover:underline">
        Santiago Fernández de Valderrama Aparicio
      </a>{' '}
      après avoir évalué 740 offres d’emploi.
      <br />
      La méthodologie de scoring complète est{' '}
      <a href="/methodology" className="text-fd-foreground hover:underline underline-offset-2">
        publiée
      </a>
      .
      <br />
      Désormais portée par la communauté.
    </>
  ),
  meetContributors: 'Rencontrez les contributeurs →',
  faqHeading: 'Questions fréquentes',
  faq: [
    {
      q: 'Comment career-ops évalue-t-il les offres d’emploi ?',
      a: (
        <>
          career-ops utilise une évaluation par LLM guidée par une grille sur
          cinq dimensions — adéquation, alignement avec votre cap, rémunération,
          signaux culturels et red flags — qui produit une note globale de 1.0 à
          5.0 avec des citations de lignes précises de votre CV et des exigences
          de l’offre. En dessous de 4.0, l’agent déconseille de postuler. Pas de
          formule fermée, pas de candidatures à l’aveugle. La grille complète est
          publiée sur{' '}
          <a href="/methodology" className="text-fd-foreground hover:underline underline-offset-2">
            career-ops.org/methodology
          </a>
          .
        </>
      ),
    },
    {
      q: 'career-ops postule-t-il à ma place ?',
      a: (
        <>
          Il prépare chaque candidature jusqu’au clic : il parcourt les offres,
          note chacune face à votre CV et adapte un CV. Puis il vous rend la
          décision. Vous relisez et envoyez chaque candidature vous-même. C’est
          délibéré : la candidature automatique de masse abîme votre réputation
          auprès des recruteurs et des ATS ; career-ops vous enlève le travail
          fastidieux, pas le jugement.
        </>
      ),
    },
    {
      q: 'Comment automatiser sa recherche d’emploi sans perdre le contrôle ?',
      a: (
        <>
          career-ops automatise le travail répétitif — il parcourt les offres,
          les évalue face à votre CV, adapte votre CV et prépare les réponses —
          mais vous gardez le dernier mot sur chaque envoi. L’agent prépare, vous
          décidez : rien n’est envoyé sans votre clic explicite. C’est le principe
          human-in-the-loop : vous récupérez le temps, pas le contrôle.
        </>
      ),
    },
    {
      q: 'career-ops est-il gratuit ? Quel est le modèle économique ?',
      a: (
        <>
          career-ops est gratuit pour toujours, sous licence MIT et financé par
          la communauté. Pas d’offre payante, pas de liste d’attente, pas de
          compte, pas de télémétrie, pas de fonctionnalités premium. Vous clonez
          le dépôt, configurez votre profil et lancez le système en local avec le
          CLI d’IA que vous utilisez déjà. La pérennité vient du mécénat
          volontaire de la communauté via GitHub Sponsors, pas d’offres premium,
          de fonctionnalités payantes ou de données. Le mainteneur a un autre
          travail rémunéré ; le parrainage lui permet de s’y consacrer davantage.
          Détails sur{' '}
          <a href="/sustain" className="text-fd-foreground hover:underline underline-offset-2">
            career-ops.org/sustain
          </a>
          .
        </>
      ),
    },
    {
      q: 'Mes données restent-elles sur mon ordinateur ? career-ops est-il privé ?',
      a: (
        <>
          Sur votre propre machine, dans des fichiers en clair qui vous
          appartiennent : votre CV, votre profil, votre pipeline et vos rapports
          sont du Markdown et du YAML locaux. career-ops tourne entièrement en
          local via votre CLI d’IA : pas de compte, pas de télémétrie, rien n’est
          envoyé à un serveur career-ops. Les mises à jour du système ne touchent
          jamais votre couche de données ; cette séparation est le Data Contract.
          Les seules données qui quittent votre machine sont celles que votre CLI
          d’IA envoie à son propre fournisseur.
        </>
      ),
    },
    {
      q: 'Qui a créé career-ops ?',
      a: (
        <>
          career-ops a été créé par{' '}
          <a href="/about" rel="author" className="text-fd-foreground hover:underline underline-offset-2">
            Santiago Fernández de Valderrama Aparicio
          </a>{' '}
          — un Applied AI Operator avec plus de 16 ans à construire des produits,
          fondateur et exploitant d’une entreprise espagnole de réparation de
          téléphones (2009–2025) avant sa revente, et actuellement Head of Applied
          AI chez Zinkee. Il a créé career-ops début 2026 pour gérer sa propre
          recherche d’emploi à l’ère de l’IA — 740 offres évaluées, un poste de
          Head of AI décroché — et l’a publié sous licence MIT une fois qu’il
          n’en avait plus besoin.
        </>
      ),
    },
    {
      q: 'career-ops est-il une skill de Claude Code ou un outil autonome ?',
      a: (
        <>
          career-ops est indépendant du CLI. Il fonctionne avec Claude Code,
          OpenCode, Codex, GitHub Copilot et d’autres — l’agent de codage IA que
          l’utilisateur paie déjà. Les fichiers de skill (
          <code className="font-mono text-fd-foreground">modes/</code>) vivent
          dans le dépôt sous forme de prompts markdown ; tout agent qui prend en
          charge le chargement de skills peut les invoquer. Aucune dépendance
          spécifique à Anthropic. Claude Code est le runtime le plus courant grâce
          à son chargeur de skills, mais les mêmes modes fonctionnent sans
          changement dans les autres CLIs.
        </>
      ),
    },
    {
      q: 'En quoi career-ops diffère-t-il des correcteurs de CV et des outils de candidature automatique ?',
      a: (
        <>
          career-ops est open source et sous licence MIT, tourne en local sur
          votre propre machine via le CLI de codage IA que vous utilisez déjà, et
          publie sa grille d’évaluation complète. Un humain garde la main sur
          chaque candidature ; il n’envoie jamais tout seul. Pas de compte, pas de
          télémétrie, pas d’abonnement à career-ops lui-même ; le seul coût
          récurrent est le CLI d’IA que vous choisissez. Pour des comparaisons
          honnêtes, côte à côte, avec des outils précis, voyez{' '}
          <a href="/compare" className="text-fd-foreground hover:underline underline-offset-2">
            career-ops.org/compare
          </a>
          .
        </>
      ),
    },
    {
      q: 'Avec quels outils d’IA career-ops fonctionne-t-il ?',
      a: (
        <>
          Claude Code, Codex, OpenCode, Antigravity CLI, Grok Build CLI, Qwen,
          Kimi et GitHub Copilot CLI — huit CLIs de premier plan (Gemini CLI est
          un wrapper legacy). Les mêmes fichiers de mode fonctionnent sur tous.
          Chacun choisit le CLI qui correspond à son abonnement et à ses
          préférences de coût — career-ops ne vous enferme jamais chez un seul
          fournisseur. Une recherche d’emploi typique tourne sur Claude Pro à
          20 $/mois, mais le choix vous appartient.
        </>
      ),
    },
  ],
  finalCta: 'C’est vous qui filtrez les offres, ou vous laissez-vous filtrer ?',
  yourTurn: 'À vous de jouer',
  followWhatWeShip: 'Ou suivez ce qu’on livre.',
  releaseBlurb: (
    <>
      Annonces de versions et nouvelles occasionnelles.
      <br />
      Désabonnement à tout moment.
    </>
  ),
};
