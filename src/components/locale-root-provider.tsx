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
type Loc = 'es' | 'fr' | 'de' | 'pt' | 'it' | 'zh' | 'vi';
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
  pt: {
    search: 'Pesquisar',
    searchNoResult: 'Nenhum resultado',
    toc: 'Nesta página',
    tocNoHeadings: 'Sem títulos',
    lastUpdate: 'Última atualização:',
    chooseLanguage: 'Escolha um idioma',
    nextPage: 'Próxima página',
    previousPage: 'Página anterior',
    chooseTheme: 'Tema',
    editOnGithub: 'Editar no GitHub',
  },
  it: {
    search: 'Cerca',
    searchNoResult: 'Nessun risultato',
    toc: 'In questa pagina',
    tocNoHeadings: 'Nessun titolo',
    lastUpdate: 'Ultimo aggiornamento:',
    chooseLanguage: 'Scegli una lingua',
    nextPage: 'Pagina successiva',
    previousPage: 'Pagina precedente',
    chooseTheme: 'Tema',
    editOnGithub: 'Modifica su GitHub',
  },
  zh: {
    search: '搜索',
    searchNoResult: '没有找到结果',
    toc: '本页内容',
    tocNoHeadings: '没有标题',
    lastUpdate: '最后更新：',
    chooseLanguage: '选择语言',
    nextPage: '下一页',
    previousPage: '上一页',
    chooseTheme: '主题',
    editOnGithub: '在 GitHub 上编辑',
  },
  vi: {
    search: 'Tìm kiếm',
    searchNoResult: 'Không có kết quả',
    toc: 'Trong trang này',
    tocNoHeadings: 'Không có tiêu đề',
    lastUpdate: 'Cập nhật lần cuối:',
    chooseLanguage: 'Chọn ngôn ngữ',
    nextPage: 'Trang tiếp theo',
    previousPage: 'Trang trước',
    chooseTheme: 'Giao diện',
    editOnGithub: 'Sửa trên GitHub',
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
