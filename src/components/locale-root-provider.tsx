'use client';

import type { Translations } from 'fumadocs-ui/contexts/i18n';
import { RootProvider } from 'fumadocs-ui/provider/next';
import type { ReactNode } from 'react';

// Fumadocs' ⌘K search dialog reads the active locale from its I18nProvider and
// sends it to /api/search, which keeps one index per language. The root layout
// used to be shared by every locale, so the dialog sent no locale and /de, /es
// and /fr searched the English index. Each root layout now passes its own
// locale (see root-shell.tsx). Only `locale` and the UI labels are passed: a
// `locales` list would make Fumadocs render its own language picker next to
// ours.
type Loc = 'es' | 'fr' | 'de';
export type SiteLocale = 'en' | Loc;

const translations = {
  es: {
    search: 'Buscar',
    searchNoResult: 'No hay resultados',
    toc: 'En esta página',
    tocNoHeadings: 'Sin encabezados',
    lastUpdate: 'Última actualización:',
    chooseLanguage: 'Elige un idioma',
    nextPage: 'Página siguiente',
    previousPage: 'Página anterior',
    chooseTheme: 'Tema',
    editOnGithub: 'Editar en GitHub',
  },
  fr: {
    search: 'Rechercher',
    searchNoResult: 'Aucun résultat',
    toc: 'Sur cette page',
    tocNoHeadings: 'Aucun titre',
    lastUpdate: 'Dernière mise à jour :',
    chooseLanguage: 'Choisir une langue',
    nextPage: 'Page suivante',
    previousPage: 'Page précédente',
    chooseTheme: 'Thème',
    editOnGithub: 'Modifier sur GitHub',
  },
  de: {
    search: 'Suchen',
    searchNoResult: 'Keine Ergebnisse',
    toc: 'Auf dieser Seite',
    tocNoHeadings: 'Keine Überschriften',
    lastUpdate: 'Zuletzt aktualisiert:',
    chooseLanguage: 'Sprache wählen',
    nextPage: 'Nächste Seite',
    previousPage: 'Vorherige Seite',
    chooseTheme: 'Design',
    editOnGithub: 'Auf GitHub bearbeiten',
  },
} satisfies Record<Loc, Translations>;

export function LocaleRootProvider({ locale, children }: { locale: SiteLocale; children: ReactNode }) {
  return (
    <RootProvider
      i18n={{
        locale,
        translations: locale === 'en' ? undefined : translations[locale],
      }}
    >
      {children}
    </RootProvider>
  );
}
