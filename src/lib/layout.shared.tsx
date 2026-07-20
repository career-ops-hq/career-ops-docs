import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';
import { CoMark } from '@/components/co-mark';
import { LanguageBar } from '@/components/language-bar';
import { instrumentSerifRegular } from './fonts';

type Options = {
  // Drops the brand suffix — used by the docs layout where Fumadocs
  // renders the title in the narrow sidebar and the full home-style
  // branding wraps awkwardly.
  compact?: boolean;
  // Accepted for backward-compat with the call sites; the language control is
  // now the self-detecting <LanguageBar/>, which reads the locale from the URL.
  locale?: 'en' | 'es';
};

export function baseOptions({ compact = false }: Options = {}): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="inline-flex items-center gap-2.5">
          <CoMark size={32} />
          <span className={`${instrumentSerifRegular.className} font-normal text-2xl tracking-tight relative -top-[1px]`}>
            {appName}
            {!compact && (
              <span className="hidden md:inline text-brand">
                {', your career operations hub'}
              </span>
            )}
          </span>
        </span>
      ),
      transparentMode: 'top',
      enabled: true,
    },
    // Navbar GitHub icon → the FLAGSHIP repo (the 60K-star project the
    // visitor came for), NOT gitConfig.repo: that one is the docs repo
    // and exists only for the per-page "edit on GitHub" links.
    githubUrl: `https://github.com/${gitConfig.user}/career-ops`,
    // Language button + browser-detection suggestion, both in the header.
    links: [{ type: 'custom', secondary: true, children: <LanguageBar /> }],
  };
}
