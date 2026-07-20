import { getPageMarkdownUrl, source } from '@/lib/source';
import type { InferPageType } from 'fumadocs-core/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from 'fumadocs-ui/layouts/docs/page';
import { getMDXComponents } from '@/components/mdx';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { gitConfig } from '@/lib/shared';
import { docsBreadcrumbSchema, docsTechArticleSchema } from '@/lib/schema';
import { gitLastMod } from '@/lib/git-date';
import { FAQ_ENTRIES } from '@/lib/faq-data';
import { GLOSSARY_TERMS } from '@/lib/glossary-data';

type DocsPageType = InferPageType<typeof source>;

// Two docs pages carry an extra structured-data layer beyond
// TechArticle: /docs/faq (FAQPage) and /docs/reference/glossary
// (DefinedTermSet). Data lives in src/lib/*-data.ts, mirrored with the
// MDX by convention — see the comment at the top of each data module.
function extraSchemaFor(slug: string[] | undefined): object | null {
  const key = (slug ?? []).join('/');
  if (key === 'faq') {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': 'https://career-ops.org/docs/faq#faq',
      mainEntity: FAQ_ENTRIES.map((e) => ({
        '@type': 'Question',
        name: e.question,
        acceptedAnswer: { '@type': 'Answer', text: e.answer },
      })),
    };
  }
  if (key === 'free-ai-engine') {
    // HowTo schema (Google favours it in AI Overviews) mirroring the
    // page's recommended Path 1 — OpenCode + a free provider. Steps kept
    // in sync with the MDX by convention. Fragment anchors omitted: the
    // page uses <Steps>, not id'd sections, so page-level url is honest.
    return {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      '@id': 'https://career-ops.org/docs/free-ai-engine#howto',
      name: 'How to run career-ops for free',
      description:
        'Run career-ops at $0 using a free AI engine — OpenCode with a free provider, a local model via Ollama, or the built-in OpenRouter runner. No Claude subscription required.',
      step: [
        {
          '@type': 'HowToStep',
          name: 'Install OpenCode',
          text: 'Install OpenCode, a free, open-source AI coding assistant that runs in your terminal like the other AI CLIs.',
          url: 'https://career-ops.org/docs/free-ai-engine',
        },
        {
          '@type': 'HowToStep',
          name: 'Pick a free provider',
          text: 'Sign up for any provider with a free tier — OpenRouter free models, Google AI Studio, or an OpenAI-compatible endpoint — and copy your API key.',
          url: 'https://career-ops.org/docs/free-ai-engine',
        },
        {
          '@type': 'HowToStep',
          name: 'Point OpenCode at it and run',
          text: 'Set your key and base URL as environment variables, open OpenCode inside the career-ops folder, and evaluate your first job listing at zero cost.',
          url: 'https://career-ops.org/docs/free-ai-engine',
        },
      ],
    };
  }
  if (key === 'reference/glossary') {
    return {
      '@context': 'https://schema.org',
      '@type': 'DefinedTermSet',
      '@id': 'https://career-ops.org/docs/reference/glossary#terms',
      name: 'career-ops glossary — AI-powered job search vocabulary',
      hasDefinedTerm: GLOSSARY_TERMS.map((t) => ({
        '@type': 'DefinedTerm',
        name: t.term,
        description: t.definition,
        inDefinedTermSet:
          'https://career-ops.org/docs/reference/glossary#terms',
      })),
    };
  }
  return null;
}

// Shared render for a resolved docs page — the SINGLE render trunk used by
// both /docs/** (EN) and /es/docs/** (ES). The route resolves the page in its
// own locale (getPage(slug) vs getPage(slug, 'es')) and hands it here; the
// chrome, schema, and MDX rendering are identical. `page.path` resolves to the
// locale's own file (.mdx or .es.mdx), so the git date and "edit on GitHub"
// link point at the right source per language.
export function DocsPageView({ page }: { page: DocsPageType }) {
  const MDX = page.data.body;
  const markdownUrl = getPageMarkdownUrl(page).url;
  const extraSchema = extraSchemaFor(page.slugs);

  // Real authored date from git (build time). Only surfaced when git can
  // resolve it — we never assert a synthetic "Updated" date.
  const gitDate = gitLastMod(`content/docs/${page.path}`);
  const dateModified = gitDate?.toISOString();
  const dateModifiedLabel = gitDate?.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            docsBreadcrumbSchema({ url: page.url, title: page.data.title }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            docsTechArticleSchema({
              url: page.url,
              title: page.data.title,
              description: page.data.description,
              dateModified,
            }),
          ),
        }}
      />
      {extraSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(extraSchema) }}
        />
      )}
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">{page.data.description}</DocsDescription>
      <div className="flex flex-row gap-2 items-center border-b pb-6">
        <MarkdownCopyButton markdownUrl={markdownUrl} />
        <ViewOptionsPopover
          markdownUrl={markdownUrl}
          githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/docs/${page.path}`}
        />
        {dateModifiedLabel && (
          <span className="ml-auto text-xs text-fd-muted-foreground">
            Updated{' '}
            <time dateTime={dateModified}>{dateModifiedLabel}</time>
          </span>
        )}
      </div>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}
