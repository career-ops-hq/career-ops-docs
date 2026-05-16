import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { instrumentSerif, instrumentSerifRegular } from '@/lib/fonts';
import { aboutSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Santiago Fernández de Valderrama · career-ops',
  description:
    'Applied AI Operator. Built career-ops after evaluating 740 listings. 16+ years building products. Currently Head of Applied AI at Zinkee. Featured in WIRED, Business Insider.',
  alternates: { canonical: 'https://career-ops.org/about' },
  openGraph: {
    type: 'profile',
    url: 'https://career-ops.org/about',
    siteName: 'career-ops',
    title: 'Santiago Fernández de Valderrama · career-ops',
    description:
      'Applied AI Operator. Built career-ops after evaluating 740 listings. Featured in WIRED, Business Insider.',
  },
  robots: { index: true, follow: true },
};

const PRESS = [
  {
    outlet: 'Business Insider',
    date: '2026-04-28',
    dateLabel: '28 Apr 2026',
    headline: 'How I built a tool to filter job listings — and landed Head of AI',
    url: 'https://www.businessinsider.com/how-i-built-tool-filter-job-listings-landed-head-ai-2026-4',
  },
  {
    outlet: 'Business Insider Deutschland',
    date: '2026-04-28',
    dateLabel: '28 Apr 2026',
    headline: 'Mein KI-Tool scannt 700 Job-Anzeigen — so half es mir, Karriere zu machen',
    url: 'https://www.businessinsider.de/karriere/bewerbung/mein-ki-tool-scannt-700-job-anzeigen-so-half-es-mir-karriere-zu-machen/',
  },
  {
    outlet: 'WIRED Greece',
    date: '2026-04-17',
    dateLabel: '17 Apr 2026',
    headline: 'Το AI εργαλείο που φέρνει επανάσταση στον τρόπο που ψάχνουμε δουλειά',
    url: 'https://wired.com.gr/article/to-ai-ergaleio-pou-fernei-epanastasi-ston-tropo-pou-psachnoume-douleia/',
  },
  {
    outlet: 'Create OS Lounge',
    date: '2026-04-15',
    dateLabel: '15 Apr 2026',
    headline: 'Conversation with Eric — career-ops origins, multi-agent orchestration',
    url: 'https://www.youtube.com/watch?v=pDkAe5JbREk',
  },
  {
    outlet: 'Diario de Sevilla',
    date: '2014-06-19',
    dateLabel: '19 Jun 2014',
    headline: 'Salir de compras en busca de la solución exprés del teléfono',
    url: 'https://www.diariodesevilla.es/vivirensevilla/Salir-compras-solucion-expres-telefono_0_817718799.html',
  },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema()) }}
      />
      <article className="mx-auto w-full max-w-2xl px-6 py-12 md:py-16">
        <header className="flex flex-col items-center text-center">
          <Image
            src="https://santifer.io/foto-avatar.png"
            alt="Santiago Fernández de Valderrama"
            width={96}
            height={96}
            className="rounded-full mb-6"
            priority
            unoptimized
          />
          <h1
            className={`${instrumentSerifRegular.className} text-fd-foreground text-3xl md:text-4xl tracking-tight`}
          >
            Santiago Fernández de Valderrama
          </h1>
          <p className="mt-2 text-fd-muted-foreground text-base">Applied AI Operator</p>
        </header>

        <div className="mt-12 space-y-6 text-fd-foreground/90 leading-relaxed">
          <p>
            Spanish tech entrepreneur with 16+ years building products. Founded and exited a
            phone repair business (2009–2025), where he automated to 90% self-service before
            selling. Currently Head of Applied AI at{' '}
            <a
              href="https://zinkee.com"
              target="_blank"
              rel="noreferrer noopener"
              className="text-fd-foreground underline underline-offset-2"
            >
              Zinkee
            </a>
            .
          </p>
          <p>
            career-ops emerged from his own AI-era job search in early 2026 — 740 listings
            evaluated, one Head of Applied AI role landed. He open-sourced it under MIT when he
            no longer needed it. An extended case study — timeline, metrics, decisions — lives
            at{' '}
            <a
              href="https://santifer.io/career-ops"
              target="_blank"
              rel="noreferrer noopener"
              className="text-fd-foreground underline underline-offset-2"
            >
              santifer.io/career-ops
            </a>
            .
          </p>
          <blockquote
            cite="https://career-ops.org/methodology"
            className="not-italic border-l-2 border-fd-foreground/20 pl-5 my-2"
          >
            <p
              className={`${instrumentSerif.className} text-xl md:text-2xl leading-snug text-fd-foreground`}
            >
              &ldquo;Companies use AI to filter candidates. I just gave candidates AI to choose
              companies.&rdquo;
            </p>
          </blockquote>
          <p>
            Featured in{' '}
            <a
              href="https://www.businessinsider.com/how-i-built-tool-filter-job-listings-landed-head-ai-2026-4"
              target="_blank"
              rel="noreferrer noopener"
              className="text-fd-foreground underline underline-offset-2"
            >
              Business Insider
            </a>{' '}
            and{' '}
            <a
              href="https://wired.com.gr/article/to-ai-ergaleio-pou-fernei-epanastasi-ston-tropo-pou-psachnoume-douleia/"
              target="_blank"
              rel="noreferrer noopener"
              className="text-fd-foreground underline underline-offset-2"
            >
              WIRED Greece
            </a>
            . Teaching Fellow at the AI Product Academy (Maven, with Dr. Marily Nika of Google).
          </p>
          <p className="text-fd-muted-foreground">
            For Santiago&rsquo;s other work and technical writing, see{' '}
            <a
              href="https://santifer.io"
              target="_blank"
              rel="me author noreferrer noopener"
              className="text-fd-foreground underline underline-offset-2"
            >
              santifer.io
            </a>
            .
          </p>
        </div>

        <section className="mt-12">
          <h2 className="text-fd-foreground text-xl font-medium tracking-tight">Stack</h2>
          <p className="mt-3 text-fd-foreground/90 leading-relaxed">
            TypeScript + Python + Go for production systems. Multi-agent orchestration via
            Claude Code (5+ parallel agents, IPC via JSON, Haiku-summarized memory). Airtable
            as headless CMS. n8n for visual workflows. Langfuse for LLMOps observability.
            Supabase pgvector for agentic RAG.
          </p>
          <h2 className="mt-8 text-fd-foreground text-xl font-medium tracking-tight">Convictions</h2>
          <p className="mt-3 text-fd-foreground/90 leading-relaxed">
            HITL by default for critical decisions. MIT-only for OSS. Local-first when
            ergonomic. Evals as production gates. No vendor lock-in design.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-fd-foreground text-xl font-medium tracking-tight">Press</h2>
          <ul className="mt-4 space-y-3">
            {PRESS.map((item) => (
              <li key={item.url} className="flex flex-col gap-1 sm:flex-row sm:gap-3">
                <span className="shrink-0 text-fd-muted-foreground text-sm tabular-nums sm:w-32">
                  <time dateTime={item.date}>{item.dateLabel}</time>
                </span>
                <span className="flex-1">
                  <span className="text-fd-foreground font-medium">{item.outlet}</span>
                  <span className="text-fd-muted-foreground"> — </span>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-fd-foreground underline underline-offset-2 decoration-fd-muted-foreground/40 hover:decoration-fd-foreground"
                  >
                    {item.headline}
                  </a>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-fd-foreground text-xl font-medium tracking-tight">
            Sustaining the work
          </h2>
          <p className="mt-3 text-fd-foreground/90 leading-relaxed">
            career-ops is permanently free, MIT-licensed, and community-funded. If the
            project has been useful to you and you have spare income,{' '}
            <Link
              href="/sustain"
              className="text-fd-foreground underline underline-offset-2"
            >
              sustaining the maintainer
            </Link>{' '}
            keeps the work moving.
          </p>
        </section>

        <hr className="my-12 w-32 mx-auto border-t-2 border-fd-foreground/20 lg:w-40" />

        <div className="text-center">
          <Link
            href="/methodology"
            className="text-fd-foreground text-base hover:underline underline-offset-4"
          >
            Read why career-ops →
          </Link>
        </div>

        <p className="mt-16 text-center text-xs text-fd-muted-foreground">
          Last updated <time dateTime="2026-05-07">7 May 2026</time>
        </p>
      </article>
    </>
  );
}
