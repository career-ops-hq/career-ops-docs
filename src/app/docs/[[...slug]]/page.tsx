import { getPageImage, getPageMarkdownUrl, source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from 'fumadocs-ui/layouts/docs/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/components/mdx';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { gitConfig } from '@/lib/shared';
import { docsBreadcrumbSchema, docsTechArticleSchema } from '@/lib/schema';
import { gitLastMod } from '@/lib/git-date';
import { FAQ_ENTRIES } from '@/lib/faq-data';
import { GLOSSARY_TERMS } from '@/lib/glossary-data';

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

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const markdownUrl = getPageMarkdownUrl(page).url;
  const extraSchema = extraSchemaFor(params.slug);

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

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps<'/docs/[[...slug]]'>): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    alternates: { canonical: `https://career-ops.org${page.url}` },
    robots: { index: true, follow: true },
    openGraph: {
      images: getPageImage(page).url,
    },
  };
}
