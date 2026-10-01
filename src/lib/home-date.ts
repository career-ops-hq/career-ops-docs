// The real last-change date of each home, for both the sitemap lastmod and the
// home's WebPage dateModified, so the two can never disagree. What a reader of a
// home sees is built from its route file plus the shared trunk and dictionary,
// so its date is the newest of those files. It only moves when one of them
// changes in git: a rebuild with no content change leaves it where it was.
// Undefined in a shallow clone (see git-date.ts): omit the date, never guess.
import { gitLastMod } from '@/lib/git-date';

const HOME_CONTENT = [
  'src/app/(home)/home-dict.tsx',
  'src/app/(home)/home-content.tsx',
  'src/app/(home)/page.client.tsx',
];

const HOME_ROUTE = {
  en: 'src/app/(home)/page.tsx',
  es: 'src/app/es/(home)/page.tsx',
  fr: 'src/app/fr/(home)/page.tsx',
  de: 'src/app/de/(home)/page.tsx',
} as const;

export function homeLastModified(locale: keyof typeof HOME_ROUTE): Date | undefined {
  const dates = [HOME_ROUTE[locale], ...HOME_CONTENT]
    .map((p) => gitLastMod(p))
    .filter((d): d is Date => d != null);
  return dates.length ? new Date(Math.max(...dates.map((d) => d.getTime()))) : undefined;
}
