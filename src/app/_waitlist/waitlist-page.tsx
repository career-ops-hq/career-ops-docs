import type { Metadata } from 'next';
import Link from 'next/link';
import { instrumentSerifRegular } from '@/lib/fonts';
import { WaitlistForm, type WaitlistFormCopy } from '@/components/waitlist-form';
import type { WaitlistLocale } from '@/lib/waitlist';

// Web version waitlist (Santiago, 30 Oct 2026; copy by narrative-ops, approved by
// venture-ops). It announces a version that doesn't exist yet, so it describes no
// feature, gives no date and names no operator. noindex and out of the sitemap,
// llms.txt and the .md mirror; no hreflang, a visible link joins EN and ES
// (search-ops, 30 Oct 2026).
type Copy = {
  title: string;
  sentence: string;
  footer: string;
  footerLink: string;
  docsHref: string;
  otherLanguage: { label: string; href: string; lang: string };
  form: WaitlistFormCopy;
};

const mail = (
  <a href="mailto:hi@career-ops.org" className="text-fd-foreground underline underline-offset-2">
    hi@career-ops.org
  </a>
);

const COPY: Record<WaitlistLocale, Copy> = {
  en: {
    title: 'career-ops, without the terminal.',
    sentence:
      "A web version of career-ops for people who don't use a coding CLI, free for candidates. Leave your email and we'll write to you once, when it's ready.",
    footer: 'The local version stays as it is. Open source. Local. In the AI CLI you already use.',
    footerLink: 'Install it →',
    docsHref: '/docs',
    otherLanguage: { label: 'Leer en español', href: '/es/waitlist', lang: 'es' },
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
    otherLanguage: { label: 'Read in English', href: '/waitlist', lang: 'en' },
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
};

export function waitlistMetadata(locale: WaitlistLocale): Metadata {
  const { title, sentence } = COPY[locale];
  return {
    metadataBase: new URL('https://career-ops.org'),
    title,
    description: sentence,
    alternates: { canonical: locale === 'en' ? '/waitlist' : `/${locale}/waitlist` },
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
        <p>
          <Link href={copy.otherLanguage.href} lang={copy.otherLanguage.lang} className="hover:underline">
            {copy.otherLanguage.label}
          </Link>
        </p>
      </footer>
    </main>
  );
}
