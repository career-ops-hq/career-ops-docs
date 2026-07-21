import { getLLMText, getPageMarkdownUrl, source } from '@/lib/source';
import { notFound } from 'next/navigation';

export const revalidate = false;

export async function GET(_req: Request, { params }: RouteContext<'/llms.mdx/docs/[[...slug]]'>) {
  const { slug } = await params;
  const page = source.getPage(slug?.slice(0, -1));
  if (!page) notFound();

  return new Response(await getLLMText(page), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      // The canonical, indexable representation is the HTML docs page. This
      // raw-markdown mirror (reached directly, via `<url>.md`, or via
      // `Accept: text/markdown`) is an alternate format for agents — keep it
      // out of search so it never dilutes the HTML page as duplicate content.
      // On-demand agent retrieval (ChatGPT-User, Claude-Web) is unaffected.
      'X-Robots-Tag': 'noindex',
    },
  });
}

export function generateStaticParams() {
  return source.getPages('en').map((page) => ({
    lang: page.locale,
    slug: getPageMarkdownUrl(page).segments,
  }));
}
