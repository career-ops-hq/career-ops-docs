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
  featuredIn: string;
  authorTagline: string;
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
      q: 'How is career-ops different from other AI job search tools?',
      a: (
        <>
          Most AI job search tools — Jobscan, Teal, Huntr, autoapply.ai — are
          cloud SaaS products that upload your resume and job data to their
          servers, charge $20–80/month, and keep their matching algorithm closed.
          career-ops is the inverse: open source, MIT-licensed, runs locally on
          your machine through whichever AI CLI you already use, and publishes the
          full evaluation rubric. The only recurring cost is your AI CLI
          subscription. Side-by-side comparisons at{' '}
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
          Claude Code, OpenCode, Antigravity CLI, Codex, Grok Build CLI, Qwen,
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
  featuredIn: 'Apareció en',
  authorTagline: ', 16 años como operador y Head of Applied AI',
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
      q: '¿En qué se diferencia career-ops de otras herramientas de búsqueda de empleo con IA?',
      a: (
        <>
          La mayoría de las herramientas de búsqueda de empleo con IA — Jobscan,
          Teal, Huntr, autoapply.ai — son productos SaaS en la nube que suben tu CV
          y tus datos a sus servidores, cobran 20–80 $/mes y mantienen su algoritmo
          de matching cerrado. career-ops es lo contrario: open source, con
          licencia MIT, se ejecuta en local en tu máquina a través del CLI de IA que
          ya uses, y publica la rúbrica de evaluación completa. El único coste
          recurrente es tu suscripción al CLI de IA. Comparativas lado a lado en{' '}
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
          Claude Code, OpenCode, Antigravity CLI, Codex, Grok Build CLI, Qwen,
          Kimi y GitHub Copilot CLI — ocho CLIs de primera clase (Gemini CLI es un
          wrapper legacy). Los mismos archivos de modo funcionan en todos. Cada
          usuario elige el CLI que encaja con su suscripción y sus preferencias de
          coste — career-ops nunca te ata a un solo proveedor. Una búsqueda de
          empleo típica corre con Claude Pro a 20 $/mes, pero la elección es tuya.
        </>
      ),
    },
  ],
  finalCta: '¿List@ para filtrar ofertas en vez de que te filtren a ti?',
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
