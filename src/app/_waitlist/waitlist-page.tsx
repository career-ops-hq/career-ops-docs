import type { Metadata } from 'next';
import Link from 'next/link';
import { instrumentSerifRegular } from '@/lib/fonts';
import { WaitlistForm, type WaitlistFormCopy } from '@/components/waitlist-form';
import { WAITLIST_LOCALES, type WaitlistLocale } from '@/lib/waitlist';

// Web version waitlist (Santiago, 30 Oct 2026; copy by narrative-ops, approved by
// venture-ops). It announces a version that doesn't exist yet, so it describes no
// feature, gives no date and names no operator. noindex and out of the sitemap,
// llms.txt and the .md mirror; no hreflang, visible links join the languages
// (search-ops, 30 Oct 2026).
type Copy = {
  title: string;
  sentence: string;
  footer: string;
  footerLink: string;
  docsHref: string;
  form: WaitlistFormCopy;
};

const mail = (
  <a href="mailto:hi@career-ops.org" className="text-fd-foreground underline underline-offset-2">
    hi@career-ops.org
  </a>
);

const LANGUAGE_NAMES: Record<WaitlistLocale, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  pt: 'Português',
  it: 'Italiano',
  zh: '中文',
};

const pagePath = (locale: WaitlistLocale) => (locale === 'en' ? '/waitlist' : `/${locale}/waitlist`);

const COPY: Record<WaitlistLocale, Copy> = {
  en: {
    title: 'career-ops, without the terminal.',
    sentence:
      "A web version of career-ops for people who don't use a coding CLI, free for candidates. Leave your email and we'll write to you once, when it's ready.",
    footer: 'The local version stays as it is. Open source. Local. In the AI CLI you already use.',
    footerLink: 'Install it →',
    docsHref: '/docs',
    form: {
      email: 'Email',
      country: 'Country',
      countryPlaceholder: 'Choose your country',
      assistants: 'Which AI assistants do you already use?',
      assistantsHint: 'Pick all that apply.',
      assistantLabels: { chatgpt: 'ChatGPT', gemini: 'Gemini', claude: 'Claude', other: 'Other', none: 'None' },
      assistantsRequired: 'Pick at least one option.',
      submit: 'Join the waitlist',
      submitting: 'Joining…',
      privacy: (
        <>
          We&rsquo;ll use your email for this one message and nothing else, and we won&rsquo;t share it.
          Your country and answer only count toward totals. To have your data deleted, write to {mail}.
        </>
      ),
      sent: "You're on the list. We'll write once, when it's ready.",
    },
  },
  es: {
    title: 'career-ops, sin terminal.',
    sentence:
      'Una versión web de career-ops para quien no usa un CLI de programación, gratis para el candidato. Déjanos tu email y te escribiremos una vez, cuando esté lista.',
    footer: 'La versión local sigue igual. Open source. En local. En el CLI de IA que ya usas.',
    footerLink: 'Instálala →',
    docsHref: '/es/docs',
    form: {
      email: 'Email',
      country: 'País',
      countryPlaceholder: 'Elige tu país',
      assistants: '¿Qué asistentes de IA usas ya?',
      assistantsHint: 'Marca todos los que uses.',
      assistantLabels: { chatgpt: 'ChatGPT', gemini: 'Gemini', claude: 'Claude', other: 'Otro', none: 'Ninguno' },
      assistantsRequired: 'Marca al menos una opción.',
      submit: 'Apuntarme a la lista',
      submitting: 'Apuntándote…',
      privacy: (
        <>
          Usaremos tu email solo para ese aviso y no se lo daremos a nadie. Tu país y tu respuesta solo
          cuentan en los totales. Si quieres que borremos tus datos, escribe a {mail}.
        </>
      ),
      sent: 'Ya estás en la lista. Te escribiremos una vez, cuando esté lista.',
    },
  },
  fr: {
    title: 'career-ops, sans le terminal.',
    sentence:
      'Une version web de career-ops pour les personnes qui n’utilisent pas de CLI de code, gratuite pour les candidats. Laissez votre e-mail et nous vous écrirons une seule fois, quand elle sera prête.',
    footer: 'La version locale ne change pas. Open source. En local. Dans le CLI d’IA que vous utilisez déjà.',
    footerLink: 'Installez-la →',
    docsHref: '/fr/docs',
    form: {
      email: 'E-mail',
      country: 'Pays',
      countryPlaceholder: 'Choisissez votre pays',
      assistants: 'Quels assistants d’IA utilisez-vous déjà\u00a0?',
      assistantsHint: 'Cochez tous ceux que vous utilisez.',
      assistantLabels: { chatgpt: 'ChatGPT', gemini: 'Gemini', claude: 'Claude', other: 'Autre', none: 'Aucun' },
      assistantsRequired: 'Cochez au moins une option.',
      submit: 'Rejoindre la liste d’attente',
      submitting: 'Inscription…',
      privacy: (
        <>
          Nous n’utiliserons votre e-mail que pour ce message, et nous ne le partagerons pas. Votre pays
          et votre réponse ne servent qu’aux totaux. Pour faire supprimer vos données, écrivez à {mail}.
        </>
      ),
      sent: 'Vous êtes sur la liste. Nous vous écrirons une seule fois, quand elle sera prête.',
    },
  },
  de: {
    title: 'career-ops, ohne Terminal.',
    sentence:
      'Eine Webversion von career-ops für alle, die keine Coding-CLI nutzen, für Jobsuchende kostenlos. Hinterlass deine E-Mail-Adresse, und wir schreiben dir einmal, sobald sie fertig ist.',
    footer: 'Die lokale Version bleibt, wie sie ist. Open Source. Lokal. In der KI-CLI, die du schon nutzt.',
    footerLink: 'Jetzt installieren →',
    docsHref: '/de/docs',
    form: {
      email: 'E-Mail',
      country: 'Land',
      countryPlaceholder: 'Wähle dein Land',
      assistants: 'Welche KI-Assistenten nutzt du bereits?',
      assistantsHint: 'Wähle alle aus, die du nutzt.',
      assistantLabels: { chatgpt: 'ChatGPT', gemini: 'Gemini', claude: 'Claude', other: 'Andere', none: 'Keine' },
      assistantsRequired: 'Wähle mindestens eine Option aus.',
      submit: 'Auf die Warteliste',
      submitting: 'Wird eingetragen…',
      privacy: (
        <>
          Wir nutzen deine E-Mail-Adresse nur für diese eine Nachricht und geben sie nicht weiter. Dein
          Land und deine Antwort fließen nur in Gesamtzahlen ein. Wenn wir deine Daten löschen sollen,
          schreib an {mail}.
        </>
      ),
      sent: 'Du stehst auf der Liste. Wir schreiben dir einmal, sobald sie fertig ist.',
    },
  },
  pt: {
    title: 'career-ops, sem terminal.',
    sentence:
      'Uma versão web do career-ops para quem não usa uma CLI de programação, gratuita para candidatos. Deixe seu e-mail e escreveremos para você uma vez, quando ela estiver pronta.',
    footer: 'A versão local continua igual. Open source. Local. Na CLI de IA que você já usa.',
    footerLink: 'Instale →',
    docsHref: '/pt/docs',
    form: {
      email: 'E-mail',
      country: 'País',
      countryPlaceholder: 'Escolha seu país',
      assistants: 'Quais assistentes de IA você já usa?',
      assistantsHint: 'Marque todos os que você usa.',
      assistantLabels: { chatgpt: 'ChatGPT', gemini: 'Gemini', claude: 'Claude', other: 'Outro', none: 'Nenhum' },
      assistantsRequired: 'Marque pelo menos uma opção.',
      submit: 'Entrar na lista de espera',
      submitting: 'Entrando…',
      privacy: (
        <>
          Usaremos seu e-mail só para essa mensagem e não vamos compartilhá-lo. Seu país e sua resposta
          só entram nos totais. Para pedir a exclusão dos seus dados, escreva para {mail}.
        </>
      ),
      sent: 'Você está na lista. Escreveremos uma vez, quando ela estiver pronta.',
    },
  },
  it: {
    title: 'career-ops, senza terminale.',
    sentence:
      'Una versione web di career-ops per chi non usa una CLI di programmazione, gratis per chi cerca lavoro. Lasciaci la tua email e ti scriveremo una sola volta, quando sarà pronta.',
    footer: 'La versione locale resta com’è. Open source. In locale. Nella CLI AI che usi già.',
    footerLink: 'Installala →',
    docsHref: '/it/docs',
    form: {
      email: 'Email',
      country: 'Paese',
      countryPlaceholder: 'Scegli il tuo paese',
      assistants: 'Quali assistenti AI usi già?',
      assistantsHint: 'Seleziona tutti quelli che usi.',
      assistantLabels: { chatgpt: 'ChatGPT', gemini: 'Gemini', claude: 'Claude', other: 'Altro', none: 'Nessuno' },
      assistantsRequired: 'Seleziona almeno un’opzione.',
      submit: 'Iscriviti alla lista d’attesa',
      submitting: 'Iscrizione…',
      privacy: (
        <>
          Useremo la tua email solo per questo messaggio e non la condivideremo. Il tuo paese e la tua
          risposta contano solo nei totali. Per far cancellare i tuoi dati, scrivi a {mail}.
        </>
      ),
      sent: 'Sei in lista. Ti scriveremo una sola volta, quando sarà pronta.',
    },
  },
  zh: {
    title: 'career-ops，无需终端。',
    sentence:
      'career-ops 的网页版，面向不使用编程 CLI 的人，对求职者免费。留下你的邮箱，等它准备好时，我们会给你写一封信，只写这一次。',
    footer: '本地版保持不变。开源。在本地运行。就在你已经在用的 AI CLI 里。',
    footerLink: '安装 →',
    docsHref: '/zh/docs',
    form: {
      email: '邮箱',
      country: '国家或地区',
      countryPlaceholder: '选择你的国家或地区',
      assistants: '你已经在用哪些 AI 助手？',
      assistantsHint: '可多选。',
      assistantLabels: { chatgpt: 'ChatGPT', gemini: 'Gemini', claude: 'Claude', other: '其他', none: '都没有' },
      assistantsRequired: '请至少选择一项。',
      submit: '加入候补名单',
      submitting: '正在加入…',
      privacy: (
        <>
          你的邮箱只用于这一封通知，我们不会分享给任何人。你的国家或地区和回答只计入总数。如需删除你的数据，请写信至 {mail}。
        </>
      ),
      sent: '你已加入名单。等它准备好时，我们会写信给你，只写这一次。',
    },
  },
};

export function waitlistMetadata(locale: WaitlistLocale): Metadata {
  const { title, sentence } = COPY[locale];
  return {
    metadataBase: new URL('https://career-ops.org'),
    title,
    description: sentence,
    alternates: { canonical: pagePath(locale) },
    robots: { index: false, follow: true },
  };
}

export function WaitlistPage({ locale }: { locale: WaitlistLocale }) {
  const copy = COPY[locale];
  return (
    <main className="mx-auto flex w-full max-w-xl flex-col gap-8 px-6 py-16 md:py-24">
      <header className="flex flex-col gap-4">
        <h1 className={`${instrumentSerifRegular.className} text-5xl leading-[1.05] tracking-tight text-fd-foreground`}>
          {copy.title}
        </h1>
        <p className="text-fd-muted-foreground text-base leading-relaxed">{copy.sentence}</p>
      </header>

      <WaitlistForm locale={locale} copy={copy.form} />

      <footer className="flex flex-col gap-3 border-t pt-6 text-sm text-fd-muted-foreground">
        <p>
          {copy.footer}{' '}
          <Link href={copy.docsHref} className="text-fd-foreground underline underline-offset-2">
            {copy.footerLink}
          </Link>
        </p>
        <p className="flex flex-wrap gap-x-4 gap-y-1">
          {WAITLIST_LOCALES.filter((other) => other !== locale).map((other) => (
            <Link key={other} href={pagePath(other)} lang={other} className="hover:underline">
              {LANGUAGE_NAMES[other]}
            </Link>
          ))}
        </p>
      </footer>
    </main>
  );
}
