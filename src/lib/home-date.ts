// The real last-change date of each home, for both the sitemap lastmod and the
// home's WebPage dateModified, so the two can never disagree. What a reader of a
// home sees is built from its route file, the shared trunk and its own
// language's dictionary, so its date is the newest of those files. It only
// moves when one of them changes in git: a rebuild with no content change leaves
// it where it was. Each language has its own dictionary file, so editing the
// French home no longer moves the English one (until October 2026 all four
// shared home-dict.tsx, and any edit moved every home).
// Undefined in a shallow clone (see git-date.ts): omit the date, never guess.
import { gitLastMod } from '@/lib/git-date';

const HOME_TRUNK = [
  'src/app/_home/home-dict.tsx',
  'src/app/_home/home-content.tsx',
  'src/app/_home/page.client.tsx',
];

const HOME_ROUTE = {
  en: ['src/app/(en)/(home)/page.tsx', 'src/app/_home/home-en.tsx'],
  es: ['src/app/es/(home)/page.tsx', 'src/app/_home/home-es.tsx'],
  fr: ['src/app/fr/(home)/page.tsx', 'src/app/_home/home-fr.tsx'],
  de: ['src/app/de/(home)/page.tsx', 'src/app/_home/home-de.tsx'],
} as const;

export function homeLastModified(locale: keyof typeof HOME_ROUTE): Date | undefined {
  const dates = [...HOME_ROUTE[locale], ...HOME_TRUNK]
    .map((p) => gitLastMod(p))
    .filter((d): d is Date => d != null);
  return dates.length ? new Date(Math.max(...dates.map((d) => d.getTime()))) : undefined;
}
