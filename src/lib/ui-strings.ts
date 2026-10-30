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
  compareSeeAll: string;
  vercelOssAria: string;
  languageMenu: (name: string) => string;
  languageNav: string;
  dismiss: string;
  xFormerlyTwitter: string;
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
    compareSeeAll: 'See all 8 comparisons',
    vercelOssAria: 'Member of the Vercel Open Source Program, Summer 2026 cohort',
    languageMenu: (name) => `Language: ${name}`,
    languageNav: 'Language',
    dismiss: 'Dismiss',
    xFormerlyTwitter: 'X (formerly Twitter)',
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
    compareSeeAll: 'Ver las 8 comparativas',
    vercelOssAria: 'Miembro del Vercel Open Source Program, cohorte Summer 2026',
    languageMenu: (name) => `Idioma: ${name}`,
    languageNav: 'Idioma',
    dismiss: 'Cerrar',
    xFormerlyTwitter: 'X (antes Twitter)',
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
    compareSeeAll: 'Voir les 8 comparatifs',
    vercelOssAria: 'Membre du Vercel Open Source Program, promotion Summer 2026',
    languageMenu: (name) => `Langue\u00a0: ${name}`,
    languageNav: 'Langue',
    dismiss: 'Fermer',
    xFormerlyTwitter: 'X (anciennement Twitter)',
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
    compareSeeAll: 'Alle 8 Vergleiche ansehen',
    vercelOssAria: 'Mitglied im Vercel Open Source Program, Kohorte Summer 2026',
    languageMenu: (name) => `Sprache: ${name}`,
    languageNav: 'Sprache',
    dismiss: 'Schließen',
    xFormerlyTwitter: 'X (ehemals Twitter)',
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
    compareSeeAll: 'Ver as 8 comparações',
    vercelOssAria: 'Membro do Vercel Open Source Program, turma Summer 2026',
    languageMenu: (name) => `Idioma: ${name}`,
    languageNav: 'Idioma',
    dismiss: 'Fechar',
    xFormerlyTwitter: 'X (antigo Twitter)',
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
    compareSeeAll: 'Vedi tutti gli 8 confronti',
    vercelOssAria: 'Membro del Vercel Open Source Program, coorte Summer 2026',
    languageMenu: (name) => `Lingua: ${name}`,
    languageNav: 'Lingua',
    dismiss: 'Chiudi',
    xFormerlyTwitter: 'X (ex Twitter)',
  },
  zh: {
    compareHeading: '在比较工具？',
    compareBody: '诚实的并排对比：功能、价格，以及它们都没有的那个关键功能。对比页面为英文。',
    compareAria: (name) => `career-ops 与 ${name} 的对比（英文）`,
    comparePause: '暂停对比轮播',
    compareResume: '继续对比轮播',
    copy: '复制',
    copyCommand: '复制命令',
    copied: '已复制',
    copiedToClipboard: '已复制到剪贴板',
    honeypot: '此字段请留空',
    emailLabel: '电子邮箱地址',
    subscribe: '订阅',
    subscribing: '正在订阅…',
    subscribeSent: '请查收邮件，确认你的订阅。',
    subscribeRetry: '请重试。',
    subscribeFailed: '出了点问题',
    heroImageAlt: 'career-ops 的终端界面，显示求职申请 tracker',
    starChartAlt: 'career-ops 在 Warpchart 上的 GitHub star 历史：从 0 到 50K+，按真实时间绘制',
    officialSite: '官方网站',
    agents: '智能体',
    compareSeeAll: '查看全部 8 个对比',
    vercelOssAria: 'Vercel Open Source Program 成员，Summer 2026 届',
    languageMenu: (name) => `语言：${name}`,
    languageNav: '语言',
    dismiss: '关闭',
    xFormerlyTwitter: 'X（原 Twitter）',
  },
  tr: {
    compareHeading: 'Araçları mı karşılaştırıyorsun?',
    compareBody:
      'Dürüst, yan yana karşılaştırmalar: özellikler, fiyatlar ve hiçbirinin sunmadığı şey. İngilizce.',
    compareAria: (name) => `career-ops ve ${name} karşılaştırması (İngilizce)`,
    comparePause: 'Karşılaştırma döngüsünü duraklat',
    compareResume: 'Karşılaştırma döngüsünü sürdür',
    copy: 'Kopyala',
    copyCommand: 'Komutu kopyala',
    copied: 'Kopyalandı',
    copiedToClipboard: 'Panoya kopyalandı',
    honeypot: 'Bu alanı boş bırak',
    emailLabel: 'E-posta adresi',
    subscribe: 'Abone ol',
    subscribing: 'Abone olunuyor…',
    subscribeSent: 'Aboneliğini onaylamak için e-postanı kontrol et.',
    subscribeRetry: 'Tekrar dene.',
    subscribeFailed: 'Bir şeyler ters gitti',
    heroImageAlt: 'Başvuru takip ekranını gösteren career-ops terminal arayüzü',
    starChartAlt:
      'Warpchart\u2019ta career-ops yıldız geçmişi: gerçek tarihlerden çizilmiş, 0\u2019dan 50K+ GitHub yıldızına',
    officialSite: 'Resmî site',
    agents: 'Ajanlar',
    compareSeeAll: '8 karşılaştırmanın tümünü gör',
    vercelOssAria: 'Vercel Open Source Program üyesi, Yaz 2026 grubu',
    languageMenu: (name) => `Dil: ${name}`,
    languageNav: 'Dil',
    dismiss: 'Kapat',
    xFormerlyTwitter: 'X (eski adıyla Twitter)',
  },
};
