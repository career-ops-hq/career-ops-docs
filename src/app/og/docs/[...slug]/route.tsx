import { getPageImage, source } from '@/lib/source';
import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';
import { generate as DefaultImage } from 'fumadocs-ui/og';
import { appName } from '@/lib/shared';

export const revalidate = false;

export async function GET(_req: Request, { params }: RouteContext<'/og/docs/[...slug]'>) {
  const { slug } = await params;
  const file = slug.at(-1) ?? '';
  const locale = /^image\.(es|fr)\.png$/.exec(file)?.[1];
  if (!locale && file !== 'image.png') notFound();
  const page = source.getPage(slug.slice(0, -1), locale);
  if (!page) notFound();

  return new ImageResponse(
    <DefaultImage title={page.data.title} description={page.data.description} site={appName} />,
    {
      width: 1200,
      height: 630,
    },
  );
}

export function generateStaticParams() {
  // Spanish and French docs had no og:image at all: 62 pages shared with no
  // card. They now get one each, in their own language.
  return (['en', 'es', 'fr'] as const).flatMap((lang) =>
    source.getPages(lang).map((page) => ({
      lang: page.locale,
      slug: getPageImage(page).segments,
    })),
  );
}
