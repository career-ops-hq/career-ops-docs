import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { getPageImage, source } from '@/lib/source';
import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';
import { generate as DefaultImage } from 'fumadocs-ui/og';
import { appName } from '@/lib/shared';

export const revalidate = false;

export async function GET(_req: Request, { params }: RouteContext<'/og/docs/[...slug]'>) {
  const { slug } = await params;
  const file = slug.at(-1) ?? '';
  const locale = /^image\.(es|fr|de|pt|it|zh|tr)\.png$/.exec(file)?.[1];
  if (!locale && file !== 'image.png') notFound();
  const page = source.getPage(slug.slice(0, -1), locale);
  if (!page) notFound();

  return new ImageResponse(
    <DefaultImage title={page.data.title} description={page.data.description} site={appName} />,
    {
      width: 1200,
      height: 630,
      fonts: locale === 'zh' ? await zhFonts() : undefined,
    },
  );
}

// next/og bundles a Latin font only. For Han characters it would fetch Noto
// Sans SC from Google Fonts while prerendering: a build-time fetch of that kind
// timed out on Vercel and aborted two deploys (#190), and a failed one ships
// the card with empty boxes and no error. So the Chinese cards read a cut-down
// Noto Sans SC from disk (scripts/subset-zh-og-font.py; OFL, see the folder).
// It replaces the default font for these cards, Latin included.
let zhFont: Promise<ArrayBuffer> | undefined;
async function zhFonts() {
  zhFont ??= readFile(join(process.cwd(), 'src/app/_fonts/og-zh/NotoSansSC-Regular-og.ttf')).then(
    (buf) => buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer,
  );
  return [{ name: 'Noto Sans SC', data: await zhFont, weight: 400 as const, style: 'normal' as const }];
}

export function generateStaticParams() {
  // Spanish and French docs had no og:image at all: 62 pages shared with no
  // card. They now get one each, in their own language (German too).
  return (['en', 'es', 'fr', 'de', 'pt', 'it', 'zh', 'tr'] as const).flatMap((lang) =>
    source.getPages(lang).map((page) => ({
      lang: page.locale,
      slug: getPageImage(page).segments,
    })),
  );
}
