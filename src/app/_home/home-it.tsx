import { brand, heroLine, type HomeDict } from './home-dict';

// Italian home (2026-10-13), addressing the reader as "tu", as the core's
// modes/it does. Same trunk, transcreated from the English home with the
// search-ops native profile for Italian (F1, 13 Oct 2026): "annuncio" for a
// listing and "proposta di assunzione" for the final offer (in Italian
// "offerta di lavoro" is the listing), "AI" rather than "IA", and the category
// phrase "agente AI open source per la ricerca di lavoro". The core has no
// README.it, so the restriction line in the first passage is the site's own
// canon (search-ops, 13 Oct 2026); if a README.it ever ships, it carries this
// same line. Like FR, DE and PT, the thesis stays in LITERAL English with no
// thesisTranslation. The hero and the HITL lines were ratified by venture-ops (13 Oct 2026); the
// whole copy is pending native review.
export const homeIt: HomeDict = {
  heroHook: heroLine({
    more: 'Più candidature.',
    silencePre: 'Più ',
    silence: 'silenzio',
    silencePost: '.',
    stop: 'Smetti di tirare a indovinare.',
    startPre: 'Inizia a ',
    choose: 'scegliere',
    startPost: '.',
  }),
  heroH1: (
    <>
      career-ops: agente AI open source per la ricerca di{'\u00a0'}lavoro.
      <br />
      Gira nella tua CLI. I tuoi dati, il tuo computer.
      <br />
      Adatta il tuo curriculum e redige le tue risposte.{' '}
      <span className="inline-block">Sei tu a cliccare su Invia.</span>
    </>
  ),
  runItNow: 'Inizia subito',
  locale: 'it',
  docsHref: '/it/docs',
  manifestoHref: '/manifesto',
  heroFreeNote: 'Gratis per chi cerca lavoro, per sempre',
  featuredIn: 'Citato da',
  memberOf: 'Membro di',
  worthApplyingLabel: 'Come capire se vale la pena candidarsi a un’offerta di lavoro →',
  worthApplyingHref: '/it/docs/introduction/guides/is-this-job-worth-applying-to',
  authorTagline: ', titolare d\u2019azienda per 16 anni e creatore di career-ops',
  // No thesisTranslation for IT: the English thesis stands alone, as in FR, DE and PT.
  nowSignedManifesto: <>Ora un manifesto firmato ·</>,
  readIt: 'Leggi →',
  whatIsHeading: (
    <>
      <span className="text-landing-foreground dark:text-landing-foreground-dark">
        Che cos&rsquo;è
      </span>{' '}
      {brand('career-ops')}?
    </>
  ),
  whatIsBody: (
    <>
      career-ops è un agente AI open source per la ricerca di lavoro che gira in
      locale sul tuo computer, in qualsiasi CLI di programmazione AI: Claude
      Code, OpenCode, Codex, GitHub Copilot e altre. Redige e compila; non invia
      mai. Sei tu a cliccare su Invia. Valuta gli annunci rispetto al tuo curriculum
      con una griglia di valutazione a cinque dimensioni più un voto globale olistico da 1 a 5,
      genera curriculum in PDF ottimizzati per gli ATS e adattati a ogni
      annuncio, scrive le risposte alle domande aperte dei moduli di Greenhouse,
      Ashby e Lever, scansiona oltre 150 fonti di annunci senza consumare token e
      segue il funnel in una dashboard da terminale scritta in Go. Tutto resta sul
      tuo computer: {brand('niente cloud')}, {brand('niente telemetria')},{' '}
      {brand('niente account')}. Licenza MIT e gratis per sempre; l&rsquo;unica
      cosa che potresti pagare è il motore AI che scegli, e funzionano anche i modelli
      gratuiti e locali. Creato da Santiago
      Fernández de Valderrama Aparicio dopo una vera ricerca di lavoro nel 2026:
      740 annunci, 68 candidature, 12 colloqui e una proposta di assunzione.
    </>
  ),
  statsComment: 'stelle · Open source · MIT',
  commandCenter: (
    <>
      Trasforma qualsiasi CLI di programmazione AI nel tuo{' '}
      {brand('agente AI per la ricerca di lavoro')}.
    </>
  ),
  tryItOut: 'Provalo',
  runsCommand: (
    <>
      Ti serve una CLI di programmazione AI come motore. Non hai ancora
      configurato nessuna AI?{' '}
      <a
        href="/it/docs/free-ai-engine"
        className="text-fd-foreground underline underline-offset-2"
      >
        Configurane una gratis
      </a>
      .
    </>
  ),
  mechanism:
    'Invece di tenere traccia delle candidature a mano in un foglio di calcolo, hai un funnel con l’AI che scansiona i portali, genera PDF su misura e registra tutto per te.',
  analogy: (
    <>
      &ldquo;È come avere un career coach nella tua ricerca di lavoro, ma{' '}
      {brand('senza pagarlo')}.&rdquo;
    </>
  ),
  featAgnosticTitle: 'Nato per l’AI, indipendente dal fornitore',
  featAgnosticBody: (
    <>
      Funziona con qualsiasi CLI di programmazione: Claude Code, OpenCode, Codex,
      GitHub Copilot e altre. Basato sull&rsquo;Open Agent Skill Standard.
    </>
  ),
  featApplyTitle: 'Redige le risposte alle domande aperte.',
  featApplyBody1: (
    <>
      I moduli di Greenhouse, Ashby e Lever chiedono &ldquo;Perché questo
      ruolo?&rdquo; e &ldquo;Parlaci di un progetto.&rdquo;{' '}
      <code className="font-mono text-brand">/career-ops apply</code> legge il
      modulo, scrive ogni risposta a partire dal tuo curriculum e dalla
      descrizione dell&rsquo;annuncio e te la restituisce pronta da incollare.
    </>
  ),
  // Canon string (search-ops doctrine §20): transcreated, not calqued: like
  // the FR "à votre place" and the DE "an deiner Stelle", "al posto tuo"
  // instead of "per te". Proposed by search-ops (F1, 13 Oct 2026); ratified
  // by venture-ops with the hero.
  featApplyBody2: 'Modifichi tu, invii tu. L’assistente non clicca mai al posto tuo.',
  featApplyCta: 'Scopri come funziona apply',
  featScanTitle: 'Oltre 150 fonti di annunci. Zero ricerca manuale.',
  featScanBody: (
    <>
      Scraper preconfigurati controllano, quando vuoi tu,{' '}
      <a href="https://github.com/career-ops-hq/career-ops/blob/main/templates/portals.example.yml" target="_blank" rel="noopener" className="underline underline-offset-2 decoration-fd-muted-foreground/40 hover:decoration-fd-foreground">oltre 150 fonti di annunci</a>, tra cui
      Greenhouse, Ashby e Lever, senza consumare nessun token di API. Lancia{' '}
      <code className="font-mono text-brand">/career-ops scan</code> e ricevi una
      lista ordinata in pochi minuti.
    </>
  ),
  featScanCta: 'Vedi tutti i portali',
  featCommunityTitle: 'Costruito con la community.',
  featCommunityBody: (
    <>
      career-ops cresce con le pull request di persone che stanno cercando
      lavoro davvero. Le issue si gestiscono su Discord e le correzioni escono nella
      stessa settimana. Non usi solo lo strumento: aiuti a decidere cosa
      diventerà.
    </>
  ),
  joinDiscord: (n) => `Unisciti a oltre ${n} builder su Discord`,
  openSourceTitle: '100% open source.',
  starsWord: 'stelle',
  forksWord: 'fork',
  repoOfDay: 'Repo del giorno n. 1',
  builtByDek: (
    <>
      Creato da{' '}
      <a href="/about" rel="author" className="text-fd-foreground font-medium hover:underline">
        Santiago Fernández de Valderrama Aparicio
      </a>{' '}
      dopo aver valutato 740 annunci.
      <br />
      La metodologia di valutazione completa è{' '}
      <a href="/methodology" className="text-fd-foreground hover:underline underline-offset-2">
        pubblicata
      </a>
      .
      <br />
      Oggi mantenuto dalla community.
    </>
  ),
  meetContributors: 'Conosci chi contribuisce →',
  faqHeading: 'Domande frequenti',
  faq: [
    {
      q: 'Come valuta un annuncio career-ops?',
      a: (
        <>
          career-ops usa una valutazione con LLM guidata da una griglia di valutazione a cinque
          dimensioni (aderenza, allineamento con il tuo obiettivo di carriera,
          retribuzione, segnali culturali e campanelli d&rsquo;allarme) che produce
          un voto globale olistico da 1 a 5, con riferimenti a righe precise del
          tuo curriculum e a requisiti dell&rsquo;annuncio. Sotto 4,0,
          l&rsquo;agente consiglia di non candidarti. Nessuna formula fissa,
          nessuna candidatura di massa. La griglia di valutazione completa è pubblicata su{' '}
          <a href="/methodology" className="text-fd-foreground hover:underline underline-offset-2">
            career-ops.org/methodology
          </a>
          .
        </>
      ),
    },
    {
      q: 'career-ops si candida per me?',
      a: (
        <>
          No. career-ops prepara ogni candidatura fino all&rsquo;ultimo clic:
          scansiona gli annunci, valuta ciascuno rispetto al tuo curriculum e ne
          genera una versione su misura. Poi lascia a te la decisione. Redige e
          compila; non invia mai. Sei tu a cliccare su Invia. È una scelta voluta: le candidature
          di massa bruciano la tua reputazione con i recruiter e con i sistemi di
          selezione (ATS), quindi career-ops toglie il lavoro ripetitivo e lascia
          la scelta a te. Approfondisci in{' '}
          <a
            href="/blog/can-an-ai-agent-run-your-job-search"
            className="text-fd-foreground hover:underline underline-offset-2"
          >
            Can an AI agent run your whole job search?
          </a>{' '}
          (in inglese).
        </>
      ),
    },
    {
      q: 'career-ops è gratuito? Come si sostiene il progetto?',
      a: (
        <>
          career-ops è gratis per sempre, ha licenza MIT ed è finanziato dalla
          community. Non c&rsquo;è nessun piano a pagamento, lista d&rsquo;attesa,
          account, telemetria né funzionalità premium. Cloni il repository, configuri il
          tuo profilo e fai girare il sistema in locale con la CLI di
          programmazione AI che usi già. La sostenibilità viene dai contributi
          della community e dalle sponsorizzazioni di aziende tramite il collettivo
          del progetto su Open Collective, non da piani premium, funzioni a
          pagamento o dati. I fondi restano al fiscal host del progetto, l&rsquo;Open
          Source Collective, in un registro pubblico, e vanno a manutenzione,
          correzioni di sicurezza, release e documentazione. Dettagli su{' '}
          <a href="/sustain" className="text-fd-foreground hover:underline underline-offset-2">
            career-ops.org/sustain
          </a>
          .
        </>
      ),
    },
    {
      q: 'Dove finiscono i miei dati?',
      a: (
        <>
          career-ops conserva i tuoi dati sul tuo computer, in file semplici che
          sono tuoi: curriculum, profilo, funnel e report sono file locali in
          Markdown e YAML. career-ops gira interamente sul tuo computer, tramite la
          tua CLI AI: niente account, niente telemetria, niente viene inviato a un
          server di career-ops. Gli aggiornamenti del sistema non toccano mai il
          tuo livello dei dati; questa separazione è il Data Contract. Gli unici dati
          che lasciano il tuo computer sono quelli che la CLI AI che hai scelto
          invia al proprio provider.
        </>
      ),
    },
    {
      q: 'Chi ha creato career-ops?',
      a: (
        <>
          career-ops è stato creato da{' '}
          <a href="/about" rel="author" className="text-fd-foreground hover:underline underline-offset-2">
            Santiago Fernández de Valderrama Aparicio
          </a>
          , che ha passato oltre 16 anni a costruire prodotti. Ha fondato e diretto
          un&rsquo;azienda spagnola di riparazione di smartphone dal 2009 fino a
          venderla nel 2025. All&rsquo;inizio del 2026 ha creato career-ops per
          organizzare la propria ricerca di lavoro nell&rsquo;era dell&rsquo;AI e
          ne ha rilasciato il codice come open source, con licenza MIT, quando non gli serviva più. Fino
          ad allora ci aveva valutato 740 annunci e aveva ottenuto un ruolo di Head
          of Applied AI. Sei mesi dopo, ha lasciato quel ruolo per dedicarsi a
          career-ops a tempo pieno.
        </>
      ),
    },
    {
      q: 'career-ops è una skill di Claude Code o uno strumento indipendente?',
      a: (
        <>
          career-ops non dipende da una CLI specifica. Funziona con Claude Code,
          OpenCode, Codex, GitHub Copilot e altre: l&rsquo;agente di
          programmazione AI che paghi già. I file delle skill (
          <code className="font-mono text-fd-foreground">modes/</code>) stanno nel
          repository come semplici prompt in Markdown; qualsiasi agente che carichi
          skill può richiamarli. Non c&rsquo;è nessuna dipendenza specifica da
          Anthropic. Claude Code è l&rsquo;ambiente più comune grazie al suo
          caricatore di skill, ma le stesse modalità girano senza modifiche sulle
          altre CLI.
        </>
      ),
    },
    {
      q: 'Che differenza c’è tra career-ops e i correttori di curriculum o gli strumenti di candidatura automatica?',
      a: (
        <>
          career-ops è open source, ha licenza MIT, gira in locale sul tuo
          computer tramite la CLI di programmazione AI che usi già e pubblica la
          griglia di valutazione completa. Una persona decide ogni candidatura;
          career-ops non invia mai nulla da solo. Non c&rsquo;è account, telemetria né abbonamento
          di career-ops; l&rsquo;unico costo ricorrente è la CLI AI che scegli. Per
          confronti onesti, fianco a fianco, con strumenti specifici, vedi{' '}
          <a href="/compare" className="text-fd-foreground hover:underline underline-offset-2">
            career-ops.org/compare
          </a>
          .
        </>
      ),
    },
    {
      q: 'Con quali strumenti AI funziona career-ops?',
      a: (
        <>
          career-ops funziona con Claude Code, Cursor, Codex, OpenCode, Pi,
          Antigravity CLI, Grok Build CLI, Qwen, Kimi, Hermes Agent e GitHub
          Copilot CLI: undici CLI con pieno supporto (la Gemini CLI è un
          wrapper legacy). Gli stessi file delle modalità girano su tutte. Ognuno
          sceglie la CLI che si adatta all&rsquo;abbonamento che ha già e a quanto
          vuole spendere; career-ops non ti lega mai a un solo fornitore. Una
          ricerca di lavoro tipica gira con Claude Pro a 20 $ al mese, ma la
          scelta è tua.
        </>
      ),
    },
  ],
  finalCta: 'Pronto a filtrare gli annunci, invece di essere filtrato?',
  yourTurn: 'Tocca a te',
  followWhatWeShip: 'Oppure segui le nostre release.',
  releaseBlurb: (
    <>
      Annunci delle release e novità di tanto in tanto.
      <br />
      Puoi disiscriverti quando vuoi.
    </>
  ),
};
