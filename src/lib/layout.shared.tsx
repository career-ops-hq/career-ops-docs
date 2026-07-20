import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';
import { CoMark } from '@/components/co-mark';
import { instrumentSerifRegular } from './fonts';

type Options = {
  // Drops the brand suffix — used by the docs layout where Fumadocs
  // renders the title in the narrow sidebar and the full home-style
  // branding wraps awkwardly.
  compact?: boolean;
  // Language of the current surface. Adds the language switcher link:
  // EN surfaces link to the Spanish home, ES surfaces link back to EN.
  // The switcher is the discoverable entry to the /es version.
  locale?: 'en' | 'es';
};

export function baseOptions({
  compact = false,
  locale = 'en',
}: Options = {}): BaseLayoutProps {
  const languageLink =
    locale === 'es'
      ? { text: 'English', url: '/', external: false }
      : { text: 'Español', url: '/es', external: false };
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
    links: [languageLink],
  };
}
