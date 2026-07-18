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
            The maintainer has other paid work. Sponsorship buys time, not direction.
          </p>
        </header>

        <div className="space-y-12 text-fd-foreground/90 leading-relaxed">
          <section>
            <p>
              career-ops is free software, MIT-licensed forever. The 14 modes, 45+ portal
              scrapers, the five-dimension rubric, the Block A&ndash;G evaluation prompt &mdash;
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
              Become a sponsor on GitHub. Nine tiers from $1 to $1,000 per month. The
              seven individual tiers ($1, $5, $10, $20, $50, $100, $250) are identical
              statements of support &mdash; no perks gated. The two corporate tiers ($500
              and $1,000) add logo placement on the README and this page as public
              acknowledgment; nothing else changes.
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
              What corporate tiers get
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <strong>$500 Corporate Supporter.</strong>{' '}
                Logo placement on the README and this page. Acknowledgment in major
                release notes.
              </li>
              <li>
                <strong>$1,000 Ecosystem Partner.</strong>{' '}
                Prominent logo placement on the README and this page. Acknowledgment in
                major releases. Invitation to private architectural discussions on
                protocol design &mdash; input welcome, no roadmap influence.
              </li>
            </ul>
            <p className="mt-4 text-fd-foreground/90">
              The only differentiation between individual and corporate tiers is
              acknowledgment. No premium features. No roadmap influence. The same MIT
              license, the same anti-spray-and-pray philosophy, the same open community.
            </p>
          </section>

          <section>
            <h2 className="text-fd-foreground text-xl font-medium tracking-tight">
              Ecosystem partners
            </h2>
            <p className="mt-3">
              Two corporate sponsorship tiers exist on GitHub Sponsors. The $500 Corporate
              Supporter tier and the $1,000 Ecosystem Partner tier each grant logo
              placement on the project README and this page as public acknowledgment.
            </p>
            <p className="mt-3">
              If you represent a mission-aligned organization &mdash; an open-source program
              office, a developer-tooling company, or a hiring-side product that respects
              the data contract &mdash; the easiest path is the GitHub Sponsors self-serve
              tier. For custom enterprise arrangements or larger commitments, reach out
              via{' '}
              <a
                href="mailto:hi@career-ops.org"
                className="text-fd-foreground underline underline-offset-2"
              >
                hi@career-ops.org
              </a>
              .
            </p>
            <p className="mt-3 text-fd-muted-foreground text-sm italic">
              Logos appear here only when real sponsors back the project. We don&rsquo;t
              render placeholders to look bigger than we are.
            </p>
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
          Last updated <time dateTime="2026-05-16">16 May 2026</time>
        </p>
      </article>
    </>
  );
}
