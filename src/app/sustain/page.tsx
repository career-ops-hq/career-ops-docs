import type { Metadata } from 'next';
import { instrumentSerif, instrumentSerifRegular } from '@/lib/fonts';
import { sustainSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Sustain · career-ops',
  description:
    'career-ops is permanently free, MIT-licensed, and community-funded. Path 3 Sovereign Maintainer model — sponsorship buys time, not direction.',
  alternates: { canonical: 'https://career-ops.org/sustain' },
  openGraph: {
    type: 'website',
    url: 'https://career-ops.org/sustain',
    siteName: 'career-ops',
    title: 'Sustain · career-ops',
    description:
      'career-ops is permanently free, MIT-licensed, and community-funded. Sponsorship buys time, not direction.',
  },
  robots: { index: true, follow: true },
};

export default function SustainPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sustainSchema()) }}
      />
      <article className="mx-auto w-full max-w-2xl px-6 py-12 md:py-16">
        <header className="mb-12">
          <h1
            className={`${instrumentSerifRegular.className} text-fd-foreground text-3xl md:text-4xl xl:text-5xl tracking-tight leading-tight`}
          >
            career-ops is permanently free, MIT-licensed, and community-funded.
          </h1>
          <p className="mt-4 text-fd-muted-foreground text-base lg:text-lg leading-relaxed">
            Sponsorship funds maintenance, security fixes, releases, and documentation. It buys time, not direction.
          </p>
        </header>

        <div className="space-y-12 text-fd-foreground/90 leading-relaxed">
          <section>
            <p>
              career-ops is free software, MIT-licensed forever. Every mode, every portal
              scraper, the five-dimension rubric, the Block A&ndash;H evaluation prompt &mdash;
              they cost nothing to install, and they never will. But sustained craft costs
              time. Time to read 250 community issues and write thoughtful responses. Time
              to investigate the edge case in <code className="font-mono text-fd-foreground">/scan</code>{' '}
              that surfaces in 1 of 200 listings. Time to refuse the next
              &ldquo;auto-apply&rdquo; pull request with an explanation rather than silence.
              If career-ops saved you hours of spreadsheet work, surfaced a job interview,
              or just clarified what AI-augmented work looks like &mdash; and you have spare
              income &mdash; sustaining the maintainer is how you keep that work moving.
              Same five-star rubric. Same anti-spray-and-pray philosophy. Same MIT license.
              Just more depth.
            </p>
          </section>

          <section>
            <h2 className="text-fd-foreground text-xl font-medium tracking-tight">
              How to sustain
            </h2>
            <p className="mt-3">
              Become a sponsor on GitHub. Every tier carries the same description and
              the same terms: each one is a statement of support, and none of them gates a
              perk. That is deliberate. A tier that buys something is a tier that can be
              leaned on.
            </p>
            <p className="mt-5">
              <a
                href="https://github.com/sponsors/santifer"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex justify-center rounded-full bg-brand text-brand-foreground hover:bg-brand-200 font-medium tracking-tight transition-colors text-base px-8 py-3.5"
              >
                Sponsor on GitHub &rarr;
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-fd-foreground text-xl font-medium tracking-tight">
              What sponsorship doesn&rsquo;t get you
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <strong>No private support.</strong> Technical questions get answered in
                the open community, where the next person searching the same problem can
                find the answer.
              </li>
              <li>
                <strong>No early access.</strong> Release windows are the same for everyone.
              </li>
              <li>
                <strong>No priority support.</strong> The triage queue is the triage queue.
              </li>
              <li>
                <strong>No premium docs.</strong> Everything is at career-ops.org/docs,
                MIT-licensed, free.
              </li>
              <li>
                <strong>No roadmap influence.</strong> Direction is set by the maintainer in
                conversation with the community. Money cannot buy a feature.
              </li>
              <li>
                <strong>No data ownership.</strong> Your data never leaves your machine,
                sponsor or not.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-fd-foreground text-xl font-medium tracking-tight">
              Corporate sponsorship
            </h2>
            <p className="mt-3">
              Nothing on GitHub Sponsors buys placement, acknowledgment, or access, at any
              amount. Corporate logo sponsorship is handled directly instead: a small
              number of slots, each with a link that carries its own tag from the first
              day, and a monthly report of the clicks it actually produced rather than an
              estimate.
            </p>
            <p className="mt-3">
              If you represent a mission-aligned organization, an open-source program
              office, a developer-tooling company, or a hiring-side product that respects
              the data contract, write to{' '}
              <a
                href="mailto:sponsors@career-ops.org"
                className="text-fd-foreground underline underline-offset-2"
              >
                sponsors@career-ops.org
              </a>
              .
            </p>
            <p className="mt-3 text-fd-muted-foreground text-sm italic">
              Logos appear here only when real sponsors back the project. We don&rsquo;t
              render placeholders to look bigger than we are.
            </p>
          </section>

          {/* Kept separate from the paid section on purpose. Tools given through
              an open-source program are not sponsorship and must not read as a
              logo slot someone bought: mixing the two would make a real sponsor's
              placement look cheaper and a donated licence look purchased. Same
              vocabulary as the rest of the page — what it funds, never who it
              funds. */}
          <section>
            <h2 className="text-fd-foreground text-xl font-medium tracking-tight">
              In-kind support
            </h2>
            <p className="mt-3">
              Tooling provided to the maintainer through open source programs. It funds
              time, not direction, like everything else on this page.
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              {/* Deliberately unlinked. openai.com blocks automated checks, and the
                  one reachable candidate (developers.openai.com/codex/open-source)
                  documents Codex's open-source components, not the grant programme.
                  A wrong link on the line that credits a benefactor is worse than
                  none; name the programme and let the reader search it. */}
              <li>
                OpenAI, Codex for Open Source: six months of ChatGPT Pro, from
                August 2026.
              </li>
            </ul>
          </section>
        </div>

        <hr className="my-12 w-32 mx-auto border-t-2 border-fd-foreground/20 lg:w-40" />

        <p
          className={`${instrumentSerif.className} text-center text-xl md:text-2xl leading-snug text-fd-foreground/80`}
        >
          Don&rsquo;t sponsor if you&rsquo;re in debt. Don&rsquo;t sponsor if it stresses
          your rent. The project is free for a reason.
        </p>

        <p className="mt-16 text-center text-xs text-fd-muted-foreground">
          Last updated <time dateTime="2026-09-06">6 September 2026</time>
        </p>
      </article>
    </>
  );
}
