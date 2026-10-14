import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

// Apple touch icon (180x180) — same "co" mark scaled up for iOS bookmarks
// and Android home-screen pins. Slight rounded radius via inner div +
// padding so the OS-applied mask doesn't crop the glyph.
export default async function AppleIcon() {
  // Read from disk, not fonts.gstatic.com: a network fetch at build time
  // timed out on Vercel twice (14-oct) and failed the whole deploy. Same
  // file Google served (Instrument Serif v5), so the icon is unchanged.
  const buf = await readFile(join(process.cwd(), 'src/app/_fonts/InstrumentSerif-Regular-v5.ttf'));
  const fontData = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);

  return new ImageResponse(
    (
      <div
        style={{
          background: 'hsl(26, 73%, 51%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: 170,
          fontFamily: 'Instrument Serif',
          letterSpacing: '0.01em',
          paddingBottom: 18,
          WebkitTextStroke: '2.5px white',
        }}
      >
        co
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Instrument Serif',
          data: fontData,
          style: 'normal',
          weight: 400,
        },
      ],
    },
  );
}
