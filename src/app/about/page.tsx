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

// Social and entity links. Two rel conventions per cv-santiago consultation:
// - rel="me noreferrer noopener" for sites that link out to Santiago's own
//   profiles where he posts/identifies (LinkedIn, X, GitHub, ORCID).
// - rel="author noreferrer noopener" for santifer.io (different domain, same
//   person — author rather than "me" per IndieAuth norms).
// - rel="noreferrer noopener" for indices (Wikidata) where the entry is not
//   self-edited.
const LINKS: { label: string; href: string; rel: string }[] = [
  { label: 'Personal site', href: 'https://santifer.io', rel: 'author noreferrer noopener' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/santifer', rel: 'me noreferrer noopener' },
  { label: 'GitHub', href: 'https://github.com/santifer', rel: 'me noreferrer noopener' },
  { label: 'X', href: 'https://x.com/santifer', rel: 'me noreferrer noopener' },
  { label: 'YouTube', href: 'https://www.youtube.com/@santifer_io', rel: 'me noreferrer noopener' },
  { label: 'ORCID', href: 'https://orcid.org/0009-0006-2192-7210', rel: 'me noreferrer noopener' },
  { label: 'Wikidata', href: 'https://www.wikidata.org/wiki/Q138710224', rel: 'noreferrer noopener' },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: 'Why did you build career-ops?',
    a: 'I needed it. In early 2026 I ran a structured job search across 740 listings to land my next role. I built career-ops along the way because manually scoring each posting against a six-dimension rubric inside a spreadsheet was slower than letting Claude Code do it. When I no longer needed the system I open-sourced it under MIT.',
  },
  {
    q: 'Why open source instead of a SaaS?',
    a: 'Two reasons. First, the data is the candidate’s: a CV, an application history, the reasons you turned down a role. None of that should live on someone else’s server. Second, I would rather the tool outlast my attention. MIT plus a Sovereign Maintainer funding model decouples its survival from my own continued involvement.',
  },
  {
    q: 'Do you take feature requests?',
    a: 'Yes — via GitHub issues and Discord. Triage is open. The pace is what one maintainer can sustain alongside a full-time role; release notes are honest about what shipped and what got cut.',
  },
  {
    q: 'Are you for hire?',
    a: 'I am Head of Applied AI at Zinkee. I am not available for full-time roles. I occasionally take advisory engagements in the Applied AI / multi-agent space — reach me on email or LinkedIn if the fit is concrete.',
  },
  {
    q: 'Can I sponsor the project?',
    a: 'Yes — via GitHub Sponsors. There are nine tiers; the corporate ones add a logo on /sustain and the README. No premium features, no roadmap influence. The full model lives at /sustain.',
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
          <p className="mt-2 text-fd-muted-foreground text-base">
            Applied AI Operator · creator of career-ops
          </p>
        </header>

        {/* Bio — three short paragraphs focused on the creator role (not the
            full transversal persona which lives at santifer.io). Density vs
            prose length traded toward facts: operator history, current role,
            why career-ops exists. Manifesto blockquote sits between the
            history paragraph and the proof paragraph so the philosophy
            is anchored by both. */}
        <div className="mt-12 space-y-6 text-fd-foreground/90 leading-relaxed">
          <p>
            Spanish tech entrepreneur with 16+ years building and selling products. Founded{' '}
            <a
              href="https://www.wikidata.org/wiki/Q138778364"
              target="_blank"
              rel="noreferrer noopener"
              className="text-fd-foreground underline underline-offset-2 decoration-fd-muted-foreground/40 hover:decoration-fd-foreground"
            >
              Santifer iRepair
            </a>{' '}
            in 2009, the largest mobile repair chain in southern Spain, automating it to 90%
            self-service before selling in 2025. Now Head of Applied AI at{' '}
            <a
              href="https://zinkee.com"
              target="_blank"
              rel="noreferrer noopener"
              className="text-fd-foreground underline underline-offset-2 decoration-fd-muted-foreground/40 hover:decoration-fd-foreground"
            >
              Zinkee
            </a>{' '}
            — designing the AI layer of an operations platform used by thousands of independent
            shops across Spain.
          </p>
          <p>
            career-ops grew out of a personal job search in early 2026. After the exit, instead
            of spraying applications, he wrote a structured evaluator: six dimensions, a 1.0–5.0
            score, and a hard floor at 4.0 below which the system refuses to recommend applying.
            740 listings evaluated, 68 applications sent, 12 interview processes, one offer
            signed. The funnel data lives at{' '}
            <Link
              href="/blog/job-search-data-from-740-listings"
              className="text-fd-foreground underline underline-offset-2 decoration-fd-muted-foreground/40 hover:decoration-fd-foreground"
            >
              /blog/job-search-data-from-740-listings
            </Link>
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
            When the search ended he open-sourced the system under MIT. career-ops crossed 46,000
            GitHub stars in its first month, was picked up by{' '}
            <a
              href="https://www.businessinsider.com/how-i-built-tool-filter-job-listings-landed-head-ai-2026-4"
              target="_blank"
              rel="noreferrer noopener"
              className="text-fd-foreground underline underline-offset-2 decoration-fd-muted-foreground/40 hover:decoration-fd-foreground"
            >
              Business Insider
            </a>{' '}
            and{' '}
            <a
              href="https://wired.com.gr/article/to-ai-ergaleio-pou-fernei-epanastasi-ston-tropo-pou-psachnoume-douleia/"
              target="_blank"
              rel="noreferrer noopener"
              className="text-fd-foreground underline underline-offset-2 decoration-fd-muted-foreground/40 hover:decoration-fd-foreground"
            >
              WIRED Greece
            </a>
            , and is sustained as a sovereign-maintainer project — Santiago has other paid work
            for income; sponsorship enables deeper focus on the code. The maintenance system
            itself — a fleet of Claude Code agents handling triage, tests, review briefs and
            releases in about four hours a week — is documented end to end in{' '}
            <a
              href="https://santifer.io/ai-agent-fleet"
              target="_blank"
              rel="noreferrer noopener"
              className="text-fd-foreground underline underline-offset-2 decoration-fd-muted-foreground/40 hover:decoration-fd-foreground"
            >
              the AI agent fleet playbook
            </a>{' '}
            on santifer.io.
          </p>
          <p>
            Certified by Anthropic and Airtable. Teaching Fellow at the AI Product Academy
            (Maven, with Dr. Marily Nika of Google). For Santiago&rsquo;s other work and writing,
            see{' '}
            <a
              href="https://santifer.io"
              target="_blank"
              rel="author noreferrer noopener"
              className="text-fd-foreground underline underline-offset-2 decoration-fd-muted-foreground/40 hover:decoration-fd-foreground"
            >
              santifer.io
            </a>
            .
          </p>
        </div>

        {/* Canonical identity — added 2026-05-25 against the typosquat
            careerops.org (no hyphen, registered 2026-04-06, GoDaddy). One
            self-contained ~140-word passage that AI engines can extract
            verbatim for "what is career-ops" queries. Names the canonical
            domain, the Wikidata entity, the GitHub repo, and disambiguates
            from impersonators without naming them (reads as identification,
            not as defense). Anchor `canonical-identity` makes it linkable
            from external surfaces (Reddit, blog citations). */}
        <section id="canonical-identity" className="mt-12">
          <h2 className="text-fd-foreground text-xl font-medium tracking-tight">
            About this site
          </h2>
          <p className="mt-3 text-fd-foreground/90 leading-relaxed">
            The canonical home of career-ops is{' '}
            <a
              href="https://career-ops.org"
              rel="me noreferrer noopener"
              className="text-fd-foreground underline underline-offset-2 decoration-fd-muted-foreground/40 hover:decoration-fd-foreground"
            >
              career-ops.org
            </a>{' '}
            (hyphenated). The project is maintained by Santiago Fern&aacute;ndez de Valderrama
            (Wikidata{' '}
            <a
              href="https://www.wikidata.org/wiki/Q138710224"
              target="_blank"
              rel="noreferrer noopener"
              className="text-fd-foreground underline underline-offset-2 decoration-fd-muted-foreground/40 hover:decoration-fd-foreground"
            >
              Q138710224
            </a>
            ) and the software itself is registered as Wikidata{' '}
            <a
              href="https://www.wikidata.org/wiki/Q139007988"
              target="_blank"
              rel="noreferrer noopener"
              className="text-fd-foreground underline underline-offset-2 decoration-fd-muted-foreground/40 hover:decoration-fd-foreground"
            >
              Q139007988
            </a>
            . The canonical source repository is{' '}
            <a
              href="https://github.com/santifer/career-ops"
              rel="me noreferrer noopener"
              className="text-fd-foreground underline underline-offset-2 decoration-fd-muted-foreground/40 hover:decoration-fd-foreground"
            >
              github.com/santifer/career-ops
            </a>
            . There is no commercial company behind the project, no signup wall, and no other
            domain. If you landed here through a different URL claiming to be career-ops, this
            one is the official site &mdash; verify via the GitHub repository above.
          </p>
        </section>

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

        {/* Press — kept as the existing date+outlet+headline list (more compact
            than the card pattern santifer.io uses, and keeps the focus on the
            article titles themselves). rel="nofollow" added per cv-santiago
            consultation: no need to pass link juice to large publishers. */}
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
                    rel="noreferrer noopener nofollow"
                    className="text-fd-foreground underline underline-offset-2 decoration-fd-muted-foreground/40 hover:decoration-fd-foreground"
                  >
                    {item.headline}
                  </a>
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ — creator-specific Q&A. Five questions answer the predictable
            visitor curiosities: motivation, license choice, contributions
            policy, hireability, sponsorship. Plain dl, no schema FAQ (Google
            restricted FAQ rich snippets to gov/healthcare since Aug 2023;
            structured data adds no rich result for this site type). */}
        <section className="mt-12">
          <h2 className="text-fd-foreground text-xl font-medium tracking-tight">
            Frequently asked
          </h2>
          <dl className="mt-4 space-y-5">
            {FAQ.map(({ q, a }) => (
              <div key={q}>
                <dt className="font-medium text-fd-foreground">{q}</dt>
                <dd className="mt-1 text-fd-foreground/85 leading-relaxed">{a}</dd>
              </div>
            ))}
          </dl>
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

        {/* Connect — primary mailto CTA + social/entity link grid. Email is
            project-scoped (hi@career-ops.org via Cloudflare routing to
            hi@santifer.io) so a stranger writes "to the project" rather than
            "to Santi personally" — keeps boundary clean. Grid renders 2-col
            mobile, 3-col tablet+, monochrome under-styled (per cv-santiago
            "no brand logos clutter" rule). */}
        <section className="mt-12">
          <h2 className="text-fd-foreground text-xl font-medium tracking-tight">Connect</h2>
          <a
            href="mailto:hi@career-ops.org"
            className="mt-4 inline-flex items-center gap-2 rounded-md bg-fd-foreground text-fd-background px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            hi@career-ops.org
          </a>
          <p className="mt-3 text-sm text-fd-muted-foreground">
            For sponsorship, advisory, or anything that doesn&rsquo;t fit in a GitHub issue.
          </p>
          <ul className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-2">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel={link.rel}
                  className="block rounded-md border border-fd-foreground/15 px-3 py-2 text-sm text-fd-foreground hover:border-fd-foreground/40 transition-colors"
                >
                  {link.label} →
                </a>
              </li>
            ))}
          </ul>
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
          Last updated <time dateTime="2026-05-25">25 May 2026</time>
        </p>
      </article>
    </>
  );
}
