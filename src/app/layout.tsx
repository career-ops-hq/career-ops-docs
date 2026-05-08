import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { siteSchema } from '@/lib/schema';
import { CoMark } from '@/components/co-mark';
import { instrumentSerifRegular } from '@/lib/fonts';

const inter = Inter({
  subsets: ['latin'],
});

export default async function Layout({ children }: LayoutProps<'/'>) {
  const schema = await siteSchema();
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="framework relative flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <RootProvider>{children}</RootProvider>
        <footer className={`${instrumentSerifRegular.className} border-t text-lg text-fd-muted-foreground`}>
          <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12">
            <div className="flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-2.5">
                <CoMark size={28} />
                <p>
                  Built by{' '}
                  <a
                    href="/about"
                    rel="author"
                    className="text-fd-foreground hover:underline"
                  >
                    Santiago Fernández de Valderrama
                  </a>{' '}
                  · Open source · MIT
                </p>
              </div>
              <nav className={`${inter.className} flex flex-row flex-wrap gap-x-5 gap-y-2 text-sm`}>
                <a href="/docs" className="hover:text-fd-foreground hover:underline">
                  Docs
                </a>
                <a href="/methodology" className="hover:text-fd-foreground hover:underline">
                  Methodology
                </a>
                <a href="/about" className="hover:text-fd-foreground hover:underline">
                  About
                </a>
                <a
                  href="https://github.com/santifer/career-ops"
                  rel="noreferrer noopener"
                  className="hover:text-fd-foreground hover:underline"
                >
                  GitHub
                </a>
                <a
                  href="https://discord.gg/8pRpHETxa4"
                  rel="noreferrer noopener"
                  className="hover:text-fd-foreground hover:underline"
                >
                  Discord
                </a>
                <a
                  href="https://www.linkedin.com/in/santifer/"
                  rel="me noreferrer noopener"
                  className="hover:text-fd-foreground hover:underline"
                >
                  LinkedIn
                </a>
                <a
                  href="https://x.com/santifer"
                  rel="me noreferrer noopener"
                  className="hover:text-fd-foreground hover:underline"
                >
                  X
                </a>
                <a href="/privacy" className="hover:text-fd-foreground hover:underline">
                  Privacy
                </a>
              </nav>
            </div>
          </div>
        </footer>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
