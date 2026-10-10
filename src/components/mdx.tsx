import defaultMdxComponents from 'fumadocs-ui/mdx';
import * as TabsComponents from 'fumadocs-ui/components/tabs';
import * as StepsComponents from 'fumadocs-ui/components/steps';
import * as AccordionComponents from 'fumadocs-ui/components/accordion';
import type { MDXComponents } from 'mdx/types';
import { GitHubStar } from '@/components/github-star';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    ...TabsComponents,
    ...StepsComponents,
    ...AccordionComponents,
    // End of the Quick Start only (plan-estrellas). Self-closing with string
    // props, so it does not move the EN translation hash, and stripJsx drops
    // it from the agent-facing markdown.
    StarOnGitHub: ({ locale }: { locale?: string }) => (
      <div className="not-prose my-6">
        <GitHubStar
          placement="quickstart"
          locale={locale}
          className="inline-flex items-center gap-2 rounded-full border bg-fd-secondary px-5 py-3 font-medium tracking-tight text-fd-secondary-foreground transition-colors hover:bg-fd-accent"
        />
      </div>
    ),
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
