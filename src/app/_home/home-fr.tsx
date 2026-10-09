import { brand, heroLine, type HomeDict } from './home-dict';

// French home (French pilot, 2026-07-21). Same trunk, French copy. The thesis
// stays LITERAL English (no official French translation until venture-ops
// ratifies), so there is NO thesisTranslation and only the English blockquote
// renders. FAQ questions are transcreated to the measured French fan-out
// (search-ops fanout-fr-2026-W30): the killer "career-ops postule-t-il à ma
// place ?" and the privacy "Mes données restent-elles sur mon ordinateur ?".
export const homeFr: HomeDict = {
  // FR pending native review (venture-ops): "Plus de silence" alone reads
  // as "no more silence", hence "Encore plus de".
  heroHook: heroLine({
    more: 'Plus de candidatures.',
    silencePre: 'Encore plus de\u00a0',
    silence: 'silence',
    silencePost: '.',
    stop: 'Arrêtez de deviner.',
    startPre: 'Commencez à\u00a0',
    choose: 'choisir',
    startPost: '.',
  }),
  heroH1: (
    <>
      career-ops{'\u202f'}: agent open source de recherche d’emploi par{'\u00a0'}IA.
      <br />
      Il tourne dans votre CLI. Vos données, votre{'\u00a0'}machine.
      <br />
      Il adapte votre CV et rédige vos réponses.{' '}
      <span className="inline-block">Vous cliquez sur Envoyer.</span>
    </>
  ),
  runItNow: 'Commencer',
  locale: 'fr',
  docsHref: '/fr/docs',
  manifestoHref: '/manifesto',
  // Provisional, pending native review (venture-ops, 30-sep).
  heroFreeNote: 'Gratuit pour les candidats, pour toujours',
  featuredIn: 'Vu dans',
  memberOf: 'Membre de',
  worthApplyingLabel: 'Comment savoir si une offre mérite votre candidature →',
  worthApplyingHref: '/fr/docs/introduction/guides/is-this-job-worth-applying-to',
  authorTagline: ', opérateur pendant 16 ans et créateur de career-ops',
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
      une note globale, de 1 à 5, génère des CV PDF optimisés pour les ATS et
      adaptés à chaque poste, rédige les réponses aux questions ouvertes des
      formulaires Greenhouse, Ashby et Lever, parcourt plus de 150 sources
      d’emploi sans consommer de jetons et suit votre pipeline dans un
      tableau de bord en terminal écrit en Go. Tout vit sur votre machine :{' '}
      {brand('sans cloud')}, {brand('sans télémétrie')}, {brand('sans compte')}.
      Sous licence MIT et gratuit pour toujours ; le seul coût est le CLI d’IA
      que vous payez déjà. Créé par Santiago Fernández de Valderrama Aparicio
      après une vraie recherche d’emploi en 2026 : 740 annonces évaluées, 68
      candidatures, 12 entretiens et une offre.
    </>
  ),
  statsComment: 'étoiles · Open source · MIT',
  commandCenter: (
    <>
      Transformez n’importe quel CLI de code IA en votre{' '}
      {brand('agent de recherche d’emploi par IA')}.
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
  featScanTitle: '150+ sources d’emploi. Zéro recherche manuelle.',
  featScanBody: (
    <>
      Des scrapers préconfigurés parcourent{' '}
      <a href="https://github.com/career-ops-hq/career-ops/blob/main/templates/portals.example.yml" target="_blank" rel="noopener" className="underline underline-offset-2 decoration-fd-muted-foreground/40 hover:decoration-fd-foreground">plus de 150 sources d’emploi</a> à la demande, dont
      Greenhouse, Ashby et Lever — zéro jeton d’API. Lancez{' '}
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
      après avoir évalué 740 annonces.
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
          career-ops prépare chaque candidature jusqu’au clic : il parcourt les offres,
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
          CLI d’IA que vous utilisez déjà. La pérennité vient des contributions
          de la communauté et du parrainage d’entreprises, via le collectif du
          projet sur Open Collective, et non d’offres premium, de fonctionnalités
          payantes ou de données. Les fonds sont détenus par l’hôte fiscal du projet, Open Source
          Collective, avec chaque contribution et chaque dépense dans un registre
          public, et financent la maintenance, les correctifs de sécurité, les
          nouvelles versions et la documentation. Détails sur{' '}
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
          career-ops garde vos données sur votre propre machine, dans des fichiers en clair qui vous
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
          </a>
          , qui construit des produits depuis plus de 16 ans. Il a fondé et dirigé une
          entreprise espagnole de réparation de téléphones de 2009 jusqu’à sa revente en
          2025. Début 2026, il a conçu career-ops pour gérer sa propre recherche
          d’emploi à l’ère de l’IA et l’a publié sous licence MIT une fois qu’il n’en
          avait plus besoin. Il s’en était déjà servi pour évaluer 740 annonces et avait
          obtenu un poste de Head of Applied AI. Six mois après l’avoir décroché, il a
          quitté ce poste pour se consacrer à plein temps au développement de
          career-ops.
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
          career-ops fonctionne avec Claude Code, Cursor, Codex, OpenCode,
          Antigravity CLI, Grok Build CLI, Qwen, Kimi, Hermes Agent et GitHub
          Copilot CLI — dix CLIs de premier plan (Gemini CLI est un wrapper
          legacy). Les mêmes fichiers de mode fonctionnent sur tous.
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
