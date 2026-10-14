import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

// Favicon: lowercase "co" — dual-meaning seed of the brand:
// "co" of career-ops (matches lowercase brand convention) and "co" of
// companies — the word the manifesto inverts ("…AI to choose
// companies"). Instrument Serif on brand orange so the favicon shares
// voice with the home hero.
export default async function Icon() {
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
          fontSize: 34,
          fontFamily: 'Instrument Serif',
          letterSpacing: '0.01em',
          paddingBottom: 3,
          WebkitTextStroke: '0.5px white',
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
