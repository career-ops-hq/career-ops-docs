// Interface strings shared by components that render on every locale: the
// compare block and the subscribe form on the home, the copy button, the
// home's image alt text and the footer's verification line. Until 13 Oct they
// were hard-coded in English, so /es, /fr, /de and /pt showed them in English
// next to a translated page. Page copy lives in each home dictionary
// (src/app/_home/home-<loc>.tsx); this file is only for interface text.
//
// A new language adds one entry here. TypeScript fails the build until it
// does, because the record is keyed by every SiteLocale.
import type { SiteLocale } from '@/components/locale-root-provider';

export type UiStrings = {
  compareHeading: string;
  compareBody: string;
  compareAria: (name: string) => string;
  comparePause: string;
  compareResume: string;
  copy: string;
  copyCommand: string;
  copied: string;
  copiedToClipboard: string;
  honeypot: string;
  emailLabel: string;
  subscribe: string;
  subscribing: string;
  subscribeSent: string;
  subscribeRetry: string;
  subscribeFailed: string;
  heroImageAlt: string;
  starChartAlt: string;
  officialSite: string;
  agents: string;
};

export const UI: Record<SiteLocale, UiStrings> = {
  en: {
    compareHeading: 'Comparing tools?',
    compareBody:
      'Side-by-side honest comparisons. Feature matrix, pricing, the killer feature none of them ship.',
    compareAria: (name) => `career-ops vs ${name} comparison`,
    comparePause: 'Pause comparison slideshow',
    compareResume: 'Resume comparison slideshow',
    copy: 'Copy',
    copyCommand: 'Copy command',
    copied: 'Copied',
    copiedToClipboard: 'Copied to clipboard',
    honeypot: 'Leave this field empty',
    emailLabel: 'Email address',
    subscribe: 'Subscribe',
    subscribing: 'Subscribing…',
    subscribeSent: 'Check your inbox to confirm your subscription.',
    subscribeRetry: 'Please try again.',
    subscribeFailed: 'Something went wrong',
    heroImageAlt: 'career-ops terminal interface showing the job pipeline tracker',
    starChartAlt:
      'career-ops star history on Warpchart — 0 to 50K+ GitHub stars drawn from real timestamps',
    officialSite: 'Official site',
    agents: 'Agents',
  },
  es: {
    compareHeading: '¿Comparando herramientas?',
    compareBody:
      'Comparativas honestas, cara a cara: funciones, precios y lo que ninguna de ellas ofrece. En inglés.',
    compareAria: (name) => `Comparativa career-ops vs ${name} (en inglés)`,
    comparePause: 'Pausar la presentación de comparativas',
    compareResume: 'Reanudar la presentación de comparativas',
    copy: 'Copiar',
    copyCommand: 'Copiar comando',
    copied: 'Copiado',
    copiedToClipboard: 'Copiado al portapapeles',
    honeypot: 'Deja este campo vacío',
    emailLabel: 'Correo electrónico',
    subscribe: 'Suscribirme',
    subscribing: 'Suscribiendo…',
    subscribeSent: 'Revisa tu correo para confirmar la suscripción.',
    subscribeRetry: 'Inténtalo de nuevo.',
    subscribeFailed: 'Algo ha fallado',
    heroImageAlt: 'Interfaz de terminal de career-ops con el tracker de candidaturas',
    starChartAlt:
      'Historial de estrellas de career-ops en Warpchart: de 0 a más de 50K estrellas en GitHub, trazado con fechas reales',
    officialSite: 'Sitio oficial',
    agents: 'Agentes',
  },
  fr: {
    compareHeading: 'Vous comparez des outils ?',
    compareBody:
      'Des comparatifs honnêtes, côte à côte : fonctionnalités, prix et ce qu’aucun d’eux ne propose. En anglais.',
    compareAria: (name) => `Comparatif career-ops vs ${name} (en anglais)`,
    comparePause: 'Mettre en pause le diaporama des comparatifs',
    compareResume: 'Reprendre le diaporama des comparatifs',
    copy: 'Copier',
    copyCommand: 'Copier la commande',
    copied: 'Copié',
    copiedToClipboard: 'Copié dans le presse-papiers',
    honeypot: 'Laissez ce champ vide',
    emailLabel: 'Adresse e-mail',
    subscribe: 'S’abonner',
    subscribing: 'Abonnement…',
    subscribeSent: 'Consultez votre boîte de réception pour confirmer votre abonnement.',
    subscribeRetry: 'Veuillez réessayer.',
    subscribeFailed: 'Une erreur est survenue',
    heroImageAlt: 'Interface terminal de career-ops affichant le suivi des candidatures',
    starChartAlt:
      'Historique des étoiles de career-ops sur Warpchart : de 0 à plus de 50K étoiles GitHub, tracé à partir de dates réelles',
    officialSite: 'Site officiel',
    agents: 'Agents',
  },
  de: {
    compareHeading: 'Tools im Vergleich?',
    compareBody:
      'Ehrliche Vergleiche nebeneinander: Funktionen, Preise und das, was keins davon bietet. Auf Englisch.',
    compareAria: (name) => `Vergleich career-ops vs. ${name} (auf Englisch)`,
    comparePause: 'Vergleichs-Diashow pausieren',
    compareResume: 'Vergleichs-Diashow fortsetzen',
    copy: 'Kopieren',
    copyCommand: 'Befehl kopieren',
    copied: 'Kopiert',
    copiedToClipboard: 'In die Zwischenablage kopiert',
    honeypot: 'Dieses Feld leer lassen',
    emailLabel: 'E-Mail-Adresse',
    subscribe: 'Abonnieren',
    subscribing: 'Wird abonniert…',
    subscribeSent: 'Schau in dein Postfach, um das Abo zu bestätigen.',
    subscribeRetry: 'Bitte versuch es noch einmal.',
    subscribeFailed: 'Etwas ist schiefgelaufen',
    heroImageAlt: 'Terminal-Oberfläche von career-ops mit dem Bewerbungs-Tracker',
    starChartAlt:
      'Sterne-Verlauf von career-ops auf Warpchart: von 0 auf über 50K GitHub-Sterne, gezeichnet aus echten Zeitstempeln',
    officialSite: 'Offizielle Website',
    agents: 'Agenten',
  },
  pt: {
    compareHeading: 'Comparando ferramentas?',
    compareBody:
      'Comparações honestas, lado a lado: funcionalidades, preços e o que nenhuma delas oferece. Em inglês.',
    compareAria: (name) => `Comparação career-ops vs ${name} (em inglês)`,
    comparePause: 'Pausar a apresentação de comparações',
    compareResume: 'Retomar a apresentação de comparações',
    copy: 'Copiar',
    copyCommand: 'Copiar comando',
    copied: 'Copiado',
    copiedToClipboard: 'Copiado para a área de transferência',
    honeypot: 'Deixe este campo vazio',
    emailLabel: 'Endereço de e-mail',
    subscribe: 'Inscrever-se',
    subscribing: 'Inscrevendo…',
    subscribeSent: 'Confira seu e-mail para confirmar a inscrição.',
    subscribeRetry: 'Tente novamente.',
    subscribeFailed: 'Algo deu errado',
    heroImageAlt: 'Interface de terminal do career-ops mostrando o tracker de candidaturas',
    starChartAlt:
      'Histórico de estrelas do career-ops no Warpchart: de 0 a mais de 50 mil estrelas no GitHub, traçado com datas reais',
    officialSite: 'Site oficial',
    agents: 'Agentes',
  },
  it: {
    compareHeading: 'Stai confrontando strumenti?',
    compareBody:
      'Confronti onesti, fianco a fianco: funzionalità, prezzi e ciò che nessuno di loro offre. In inglese.',
    compareAria: (name) => `Confronto career-ops vs ${name} (in inglese)`,
    comparePause: 'Metti in pausa la rotazione dei confronti',
    compareResume: 'Riprendi la rotazione dei confronti',
    copy: 'Copia',
    copyCommand: 'Copia il comando',
    copied: 'Copiato',
    copiedToClipboard: 'Copiato negli appunti',
    honeypot: 'Lascia vuoto questo campo',
    emailLabel: 'Indirizzo email',
    subscribe: 'Iscriviti',
    subscribing: 'Iscrizione in corso…',
    subscribeSent: 'Controlla la tua email per confermare l\u2019iscrizione.',
    subscribeRetry: 'Riprova.',
    subscribeFailed: 'Qualcosa è andato storto',
    heroImageAlt: 'Interfaccia da terminale di career-ops con il tracker delle candidature',
    starChartAlt:
      'Storico delle stelle di career-ops su Warpchart: da 0 a oltre 50K stelle su GitHub, tracciato da date reali',
    officialSite: 'Sito ufficiale',
    agents: 'Agenti',
  },
};
