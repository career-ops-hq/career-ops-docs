import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName } from './shared';
import { CoMark } from '@/components/co-mark';
import { LanguageBar } from '@/components/language-bar';
import { instrumentSerifRegular } from './fonts';
import { GitHubStar, starHeaderClass } from '@/components/github-star';

type Options = {
  // Drops the brand suffix — used by the docs layout where Fumadocs
  // renders the title in the narrow sidebar and the full home-style
  // branding wraps awkwardly.
  compact?: boolean;
  // Picks the language of the brand suffix. The language control itself is
  // the self-detecting <LanguageBar/>, which reads the locale from the URL.
  locale?: 'en' | 'es' | 'fr';
};

// Brand suffix next to the wordmark: the same category the home H1 names
// ("open-source AI job search agent"), in each page's language. It used to
// read "your career operations hub", in English on every locale.
const TAGLINE = {
  en: ', your AI job search agent',
  es: ', tu agente de búsqueda de empleo con IA',
  fr: ', votre agent de recherche d\u2019emploi par IA',
} as const;

export function baseOptions({ compact = false, locale = 'en' }: Options = {}): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="inline-flex items-center gap-2.5">
          <CoMark size={32} />
          <span className={`${instrumentSerifRegular.className} font-normal text-2xl tracking-tight relative -top-[1px]`}>
            {appName}
            {!compact && (
              <span className="hidden md:inline text-brand">
                {TAGLINE[locale]}
              </span>
            )}
          </span>
        </span>
      ),
      transparentMode: 'top',
      enabled: true,
    },
    // Language button + browser-detection suggestion, both in the header.
    // Then "Star on GitHub · N" to the FLAGSHIP repo, in the place Fumadocs'
    // GitHub icon used to take (its `githubUrl` icon forces rel="noreferrer").
    // The docs layouts are compact and put the same button in the sidebar
    // footer instead, next to where the icon sat.
    links: [
      { type: 'custom', secondary: true, children: <LanguageBar /> },
      ...(compact
        ? []
        : [
            {
              type: 'custom' as const,
              secondary: true,
              children: <GitHubStar placement="header" locale={locale} className={starHeaderClass} />,
            },
          ]),
    ],
  };
}
