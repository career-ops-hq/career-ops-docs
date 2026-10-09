import { brand, heroLine, type HomeDict } from './home-dict';

// German home (2026-09-30). Germany is the #4 country by pageviews and Google
// clicks and the first non-English-speaking market. Same trunk, German copy,
// informal "du" as in German developer docs. Like FR, the thesis stays in
// LITERAL English with no thesisTranslation (no ratified German rendering).
// FAQ questions are transcreated to German search intent rather than calqued:
// "Bewirbt sich career-ops für mich?" (auto-apply, answered in the positive)
// and "Datenschutz" in the privacy question, the word German readers search.
// Pending native review, like the FR hero.
export const homeDe: HomeDict = {
  // "Funkstille" is the idiom for an employer who never answers.
  heroHook: heroLine({
    more: 'Mehr Bewerbungen.',
    silencePre: 'Mehr ',
    silence: 'Funkstille',
    silencePost: '.',
    stop: 'Nicht mehr raten.',
    startPre: 'Selbst ',
    choose: 'entscheiden',
    startPost: '.',
  }),
  heroH1: (
    <>
      career-ops: Open-Source-KI-Agent für die{' '}Jobsuche.
      <br />
      Läuft in deiner CLI. Deine Daten, dein{' '}Rechner.
      <br />
      Passt deinen Lebenslauf an und entwirft deine Antworten.{' '}
      <span className="inline-block">Du klickst auf Absenden.</span>
    </>
  ),
  runItNow: 'Loslegen',
  locale: 'de',
  docsHref: '/de/docs',
  manifestoHref: '/manifesto',
  heroFreeNote: 'Für Jobsuchende kostenlos, für immer',
  featuredIn: 'Bekannt aus',
  memberOf: 'Mitglied im',
  worthApplyingLabel: 'Woran du erkennst, ob sich eine Bewerbung lohnt →',
  worthApplyingHref: '/de/docs/introduction/guides/is-this-job-worth-applying-to',
  authorTagline: ', 16 Jahre lang Operator und Entwickler von career-ops',
  // No thesisTranslation for DE — the English thesis stands alone, as in FR.
  nowSignedManifesto: <>Jetzt ein unterzeichnetes Manifest ·</>,
  readIt: 'Lesen →',
  whatIsHeading: (
    <>
      <span className="text-landing-foreground dark:text-landing-foreground-dark">
        Was ist
      </span>{' '}
      {brand('career-ops')}?
    </>
  ),
  whatIsBody: (
    <>
      career-ops ist ein Open-Source-System für die Jobsuche mit KI, das lokal
      auf deinem Rechner läuft, in jeder KI-Coding-CLI: Claude Code, OpenCode,
      Codex, GitHub Copilot und weiteren. Es bewertet Stellenanzeigen anhand
      deines Lebenslaufs mit einem Raster aus fünf Dimensionen plus einer
      ganzheitlichen Gesamtnote von 1 bis 5, erstellt ATS-optimierte
      PDF-Lebensläufe für jede Stelle, entwirft Antworten auf die offenen Fragen
      in Formularen von Greenhouse, Ashby und Lever, durchsucht über 150
      Jobquellen ohne Token-Verbrauch und verfolgt deine Pipeline in einem
      Terminal-Dashboard, geschrieben in Go. Alles bleibt auf deinem Rechner:{' '}
      {brand('keine Cloud')}, {brand('keine Telemetrie')}, {brand('kein Konto')}.
      MIT-lizenziert und für immer kostenlos; du zahlst nur die KI-Coding-CLI,
      die du ohnehin nutzt. Entwickelt von Santiago Fernández de Valderrama
      Aparicio nach einer echten Jobsuche im Jahr 2026: 740 Stellenanzeigen, 68
      Bewerbungen, 12 Vorstellungsgespräche und ein Jobangebot.
    </>
  ),
  statsComment: 'Sterne · Open Source · MIT',
  commandCenter: (
    <>
      Mach aus jeder KI-Coding-CLI deinen {brand('KI-Agenten für die Jobsuche')}.
    </>
  ),
  tryItOut: 'Probier es aus',
  runsCommand: (
    <>
      Braucht eine KI-Coding-CLI als Motor. Noch keine KI eingerichtet?{' '}
      <a
        href="/de/docs/free-ai-engine"
        className="text-fd-foreground underline underline-offset-2"
      >
        Hol dir eine kostenlos
      </a>
      .
    </>
  ),
  mechanism:
    'Statt Bewerbungen von Hand in einer Tabelle zu verfolgen, bekommst du eine KI-Pipeline, die Portale durchsucht, zugeschnittene PDFs erstellt und alles für dich festhält.',
  analogy: (
    <>
      &bdquo;Als hättest du einen Karrierecoach für deine Jobsuche, nur{' '}
      {brand('ohne die Kosten')}.&ldquo;
    </>
  ),
  featAgnosticTitle: 'KI-nativ und anbieterunabhängig',
  featAgnosticBody: (
    <>
      Funktioniert mit jeder Coding-CLI: Claude Code, OpenCode, Codex, GitHub
      Copilot und weiteren. Basiert auf dem Open Agent Skill Standard.
    </>
  ),
  featApplyTitle: 'Entwirft die Antworten auf offene Fragen.',
  featApplyBody1: (
    <>
      Formulare von Greenhouse, Ashby und Lever fragen &bdquo;Warum diese
      Stelle?&ldquo; und &bdquo;Erzähl uns von einem Projekt.&ldquo;{' '}
      <code className="font-mono text-brand">/career-ops apply</code> liest das
      Formular, entwirft jede Antwort aus deinem Lebenslauf und der
      Stellenanzeige und gibt sie dir zum Einfügen fertig zurück.
    </>
  ),
  // Canon string (search-ops doctrine §20): transcreated, not calqued — like
  // the FR "à votre place", "an deiner Stelle" instead of "für dich".
  featApplyBody2: 'Du bearbeitest, du schickst ab. Der Assistent klickt nie an deiner Stelle.',
  featApplyCta: 'So funktioniert apply',
  featScanTitle: '150+ Jobquellen. Null manuelle Suche.',
  featScanBody: (
    <>
      Vorkonfigurierte Scraper prüfen auf Abruf{' '}
      <a href="https://github.com/career-ops-hq/career-ops/blob/main/templates/portals.example.yml" target="_blank" rel="noopener" className="underline underline-offset-2 decoration-fd-muted-foreground/40 hover:decoration-fd-foreground">über 150 Jobquellen</a>, darunter
      Greenhouse, Ashby und Lever, ohne einen einzigen API-Token zu verbrauchen.
      Starte <code className="font-mono text-brand">/career-ops scan</code> und
      du bekommst in wenigen Minuten eine sortierte Liste.
    </>
  ),
  featScanCta: 'Alle Portale ansehen',
  featCommunityTitle: 'Gemeinsam mit der Community gebaut.',
  featCommunityBody: (
    <>
      career-ops wächst durch Pull Requests von Menschen, die gerade selbst auf
      Jobsuche sind. Issues werden auf Discord sortiert, Fixes erscheinen in
      derselben Woche. Du nutzt das Tool nicht nur, du bestimmst mit, was daraus
      wird.
    </>
  ),
  joinDiscord: (n) => `Komm zu ${n}+ Buildern auf Discord`,
  openSourceTitle: '100 % Open Source.',
  starsWord: 'Sterne',
  forksWord: 'Forks',
  repoOfDay: 'Nr. 1 Repo des Tages',
  builtByDek: (
    <>
      Entwickelt von{' '}
      <a href="/about" rel="author" className="text-fd-foreground font-medium hover:underline">
        Santiago Fernández de Valderrama Aparicio
      </a>
      , nachdem er 740 Stellenanzeigen bewertet hatte.
      <br />
      Die vollständige Bewertungsmethodik ist{' '}
      <a href="/methodology" className="text-fd-foreground hover:underline underline-offset-2">
        veröffentlicht
      </a>
      .
      <br />
      Heute getragen von der Community.
    </>
  ),
  meetContributors: 'Lerne die Mitwirkenden kennen →',
  faqHeading: 'Häufige Fragen',
  faq: [
    {
      q: 'Wie bewertet career-ops Stellenanzeigen?',
      a: (
        <>
          career-ops nutzt eine LLM-Bewertung entlang eines Rasters aus fünf
          Dimensionen: Passung, Ausrichtung auf dein Karriereziel, Vergütung,
          kulturelle Signale und Warnsignale. Daraus entsteht eine ganzheitliche
          Gesamtnote von 1 bis 5 mit Verweisen auf konkrete Zeilen deines
          Lebenslaufs und Anforderungen der Stellenanzeige. Unter 4,0 rät der
          Agent von einer Bewerbung ab. Keine starre Formel, kein Bewerben nach
          dem Gießkannenprinzip. Das vollständige Raster ist veröffentlicht
          unter{' '}
          <a href="/methodology" className="text-fd-foreground hover:underline underline-offset-2">
            career-ops.org/methodology
          </a>
          .
        </>
      ),
    },
    {
      q: 'Bewirbt sich career-ops für mich?',
      a: (
        <>
          career-ops bereitet jede Bewerbung bis zum letzten Klick vor: Es
          durchsucht Stellen, bewertet jede anhand deines Lebenslaufs und passt
          einen Lebenslauf an. Dann gibt es die Entscheidung an dich zurück. Du
          prüfst und verschickst jede Bewerbung selbst. Das ist Absicht:
          Massenhaftes automatisches Bewerben ruiniert deinen Ruf bei Recruitern
          und ATS-Systemen. career-ops nimmt dir die Fleißarbeit ab, nicht die
          Entscheidung.
        </>
      ),
    },
    {
      q: 'Wie automatisiere ich meine Bewerbungen mit KI, ohne die Kontrolle zu verlieren?',
      a: (
        <>
          career-ops automatisiert die wiederkehrende Arbeit: Es durchsucht
          Stellen, bewertet sie anhand deines Lebenslaufs, passt deinen
          Lebenslauf an und bereitet die Antworten vor. Das letzte Wort über
          jede Bewerbung behältst du. Der Agent bereitet vor, du entscheidest:
          Nichts wird ohne deinen ausdrücklichen Klick verschickt. Das ist das
          Human-in-the-Loop-Prinzip: Du gewinnst Zeit, ohne die Kontrolle
          abzugeben.
        </>
      ),
    },
    {
      q: 'Ist career-ops kostenlos? Wie finanziert sich das Projekt?',
      a: (
        <>
          career-ops ist dauerhaft kostenlos, MIT-lizenziert und von der
          Community finanziert. Es gibt keinen kostenpflichtigen Tarif, keine
          Warteliste, kein Konto, keine Telemetrie und keine Premium-Funktionen.
          Du klonst das Repo, richtest dein Profil ein und startest das System
          lokal mit der KI-Coding-CLI, die du ohnehin nutzt. Getragen wird das
          Projekt von Beiträgen der Community und von Unternehmens-Sponsoring
          über das Collective des Projekts auf Open Collective, nicht von
          Premium-Tarifen, kostenpflichtigen Funktionen oder Daten. Die Mittel
          verwaltet der Fiscal Host des Projekts, Open Source Collective, in
          einem öffentlichen Kassenbuch; sie fließen in Wartung,
          Sicherheitsfixes, Releases und Dokumentation. Details unter{' '}
          <a href="/sustain" className="text-fd-foreground hover:underline underline-offset-2">
            career-ops.org/sustain
          </a>
          .
        </>
      ),
    },
    {
      q: 'Bleiben meine Daten auf meinem Rechner? Wie steht es um den Datenschutz?',
      a: (
        <>
          career-ops speichert deine Daten auf deinem eigenen Rechner, in
          einfachen Dateien, die dir gehören: Lebenslauf, Profil, Pipeline und
          Berichte sind lokale Markdown- und YAML-Dateien. career-ops läuft
          komplett lokal über deine KI-CLI: kein Konto, keine Telemetrie, nichts
          wird auf einen career-ops-Server hochgeladen. System-Updates fassen
          deine Datenebene nie an; diese Trennung ist der Data Contract. Die
          einzigen Daten, die deinen Rechner verlassen, sind die, die deine
          gewählte KI-CLI an ihren eigenen Anbieter schickt.
        </>
      ),
    },
    {
      q: 'Wer hat career-ops entwickelt?',
      a: (
        <>
          career-ops wurde von{' '}
          <a href="/about" rel="author" className="text-fd-foreground hover:underline underline-offset-2">
            Santiago Fernández de Valderrama Aparicio
          </a>{' '}
          entwickelt, der auf über 16 Jahre Erfahrung im Aufbau von Produkten
          zurückblickt. Er gründete 2009 ein spanisches Unternehmen für Handyreparaturen
          und führte es bis zum Verkauf im Jahr 2025. Er entwickelte career-ops Anfang
          2026, um seine eigene Jobsuche im KI-Zeitalter zu organisieren: 740
          Stellenanzeigen bewertet, eine Stelle als Head of Applied AI bekommen. Als er
          es nicht mehr brauchte, veröffentlichte er es unter MIT-Lizenz. Sechs Monate
          nach dem Einstieg verließ er diese Stelle, um sich ganz auf career-ops zu
          konzentrieren.
        </>
      ),
    },
    {
      q: 'Ist career-ops ein Claude-Code-Skill oder ein eigenständiges Tool?',
      a: (
        <>
          career-ops ist CLI-unabhängig. Es funktioniert mit Claude Code,
          OpenCode, Codex, GitHub Copilot und weiteren, also mit dem
          KI-Coding-Agenten, für den du ohnehin zahlst. Die Skill-Dateien (
          <code className="font-mono text-fd-foreground">modes/</code>) liegen
          als einfache Markdown-Prompts im Repo; jeder Agent, der Skills laden
          kann, kann sie aufrufen. Es gibt keine Abhängigkeit speziell von
          Anthropic. Claude Code ist wegen seines Skill-Loaders die häufigste
          Laufzeitumgebung, aber dieselben Modi laufen unverändert in den anderen
          CLIs.
        </>
      ),
    },
    {
      q: 'Was unterscheidet career-ops von Lebenslauf-Checkern und Tools für automatische Bewerbungen?',
      a: (
        <>
          career-ops ist Open Source und MIT-lizenziert, läuft lokal auf deinem
          eigenen Rechner über die KI-Coding-CLI, die du schon nutzt, und
          veröffentlicht sein vollständiges Bewertungsraster. Bei jeder
          Bewerbung entscheidet ein Mensch; es verschickt nie etwas von selbst.
          Kein Konto, keine Telemetrie und kein Abo für career-ops selbst; die
          einzigen laufenden Kosten sind die der KI-CLI, die du wählst. Ehrliche
          Vergleiche mit konkreten Tools, Seite an Seite, findest du unter{' '}
          <a href="/compare" className="text-fd-foreground hover:underline underline-offset-2">
            career-ops.org/compare
          </a>
          .
        </>
      ),
    },
    {
      q: 'Mit welchen KI-Tools funktioniert career-ops?',
      a: (
        <>
          career-ops funktioniert mit Claude Code, Cursor, Codex, OpenCode, Pi,
          Antigravity CLI, Grok Build CLI, Qwen, Kimi, Hermes Agent und GitHub
          Copilot CLI: elf vollwertig unterstützte CLIs (Gemini CLI ist ein
          Legacy-Wrapper). Dieselben Mode-Dateien laufen auf allen. Du wählst die
          CLI, die zu deinem Abo und deinem Budget passt; career-ops bindet dich
          nie an einen einzigen Anbieter. Eine typische Jobsuche läuft mit Claude
          Pro für 20 $ im Monat, aber die Wahl liegt bei dir.
        </>
      ),
    },
  ],
  finalCta: 'Bereit, Stellen zu filtern, statt gefiltert zu werden?',
  yourTurn: 'Du bist dran',
  followWhatWeShip: 'Oder verfolge, was wir ausliefern.',
  releaseBlurb: (
    <>
      Release-Ankündigungen und gelegentliche Updates.
      <br />
      Jederzeit abbestellbar.
    </>
  ),
};
