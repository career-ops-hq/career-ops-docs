import type { Metadata } from 'next';
import Link from 'next/link';
import { instrumentSerifRegular } from '@/lib/fonts';
import { methodologySchema } from '@/lib/schema';
import { MANIFESTO } from '@/lib/shared';

export const metadata: Metadata = {
  title: 'Methodology · career-ops',
  description:
    'How career-ops scores job listings: the 4.0/5.0 threshold, the five dimensions, the canonical evaluation prompt, edge cases, and what we explicitly do not do. Radical transparency, no closed-form math.',
  alternates: { canonical: 'https://career-ops.org/methodology' },
  openGraph: {
    type: 'article',
    url: 'https://career-ops.org/methodology',
    siteName: 'career-ops',
    title: 'Methodology · career-ops',
    description:
      'How career-ops scores job listings. Radical transparency: the rubric, the prompt structure, the limits.',
  },
  robots: { index: true, follow: true },
};

export default function MethodologyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(methodologySchema()) }}
      />
      <article className="mx-auto w-full max-w-3xl px-6 py-12 md:py-16">
        <header className="mb-12">
          <p className="text-sm text-fd-muted-foreground">
            By{' '}
            <a
              href="/about"
              className="text-fd-foreground underline underline-offset-2"
            >
              Santiago Fernández de Valderrama Aparicio
            </a>
            , Applied AI Operator · Last updated{' '}
            <time dateTime="2026-05-07">7 May 2026</time>
          </p>
          <h1
            className={`${instrumentSerifRegular.className} mt-4 text-fd-foreground text-3xl md:text-4xl xl:text-5xl tracking-tight`}
          >
            How career-ops scores job listings
          </h1>
          <p className="mt-6 text-fd-muted-foreground text-base lg:text-lg leading-relaxed">
            career-ops is a filter, not an amplifier. Most AI-powered job-search tools optimise
            for volume — apply faster, apply to more. The rubric below is designed to do the
            opposite: say no often, surface higher-conviction matches, deliver applications that
            respect both your time and the recruiter&rsquo;s.
          </p>
        </header>

        {/* Signature thesis — canonical home: /manifesto (The CareerOps
            Manifesto, since 2026-07-14). Kept verbatim here too; anchors
            the whole methodology to the asymmetry it exists to close. */}
        <figure className="mb-12 border-l-2 border-fd-foreground/25 pl-6">
          <blockquote
            cite="https://career-ops.org/manifesto"
            className={`${instrumentSerifRegular.className} text-fd-foreground text-2xl md:text-3xl leading-snug`}
          >
            &ldquo;{MANIFESTO}&rdquo;
          </blockquote>
          <figcaption className="mt-3 text-sm text-fd-muted-foreground">
            — Santiago Fernández de Valderrama Aparicio
          </figcaption>
        </figure>

        <div className="space-y-12 text-fd-foreground/90 leading-relaxed">
          <Section title="The 4.0 / 5.0 threshold">
            <p>
              Every evaluation produces a global score between 1.0 and 5.0. The recommendation
              tier is fixed:
            </p>
            <Table>
              <thead>
                <tr>
                  <Th>Score</Th>
                  <Th>Recommendation</Th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <Td>4.5+</Td>
                  <Td>Strong match. Apply immediately.</Td>
                </tr>
                <tr>
                  <Td>4.0 – 4.4</Td>
                  <Td>Good match. Worth applying.</Td>
                </tr>
                <tr>
                  <Td>3.5 – 3.9</Td>
                  <Td>Decent but not ideal. Apply only with a specific reason.</Td>
                </tr>
                <tr>
                  <Td>Below 3.5</Td>
                  <Td>Recommend against applying.</Td>
                </tr>
              </tbody>
            </Table>
            <p className="mt-4">
              <strong>4.0 is the apply / don&rsquo;t-apply line.</strong> The 3.5–3.9 band is an
              explicit override-only zone — the agent will say so, the user decides. This
              threshold is canonical: it lives in{' '}
              <a
                href="https://github.com/santifer/career-ops/blob/main/AGENTS.md"
                target="_blank"
                rel="noreferrer noopener"
                className="text-fd-foreground underline underline-offset-2"
              >
                AGENTS.md
              </a>{' '}
              as part of the project&rsquo;s ethical-use rules.
            </p>
          </Section>

          <Section title="The five dimensions and the global score">
            <p>
              A global score is the LLM&rsquo;s holistic judgement across five dimensions. The rubric is in{' '}
              <a
                href="https://github.com/santifer/career-ops/blob/main/modes/_shared.md"
                target="_blank"
                rel="noreferrer noopener"
                className="text-fd-foreground underline underline-offset-2"
              >
                modes/_shared.md
              </a>{' '}
              (canonical, System Layer).
            </p>
            <Table>
              <thead>
                <tr>
                  <Th>Dimension</Th>
                  <Th>What it measures</Th>
                  <Th>How it&rsquo;s computed</Th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <Td>
                    <Term>match</Term>
                  </Td>
                  <Td>Skills, experience, proof points alignment</Td>
                  <Td>LLM compares JD requirements to <code>cv.md</code> + <code>article-digest.md</code>, citing exact CV lines (Block&nbsp;B)</Td>
                </tr>
                <tr>
                  <Td>
                    <Term>north-star alignment</Term>
                  </Td>
                  <Td>How well the role fits the user&rsquo;s target archetypes</Td>
                  <Td>Detects archetype from JD, checks against the user&rsquo;s <code>_profile.md</code></Td>
                </tr>
                <tr>
                  <Td>
                    <Term>comp</Term>
                  </Td>
                  <Td>Salary versus market</Td>
                  <Td>Web search across Glassdoor / Levels.fyi / Blind. 5 = top quartile, 1 = well below</Td>
                </tr>
                <tr>
                  <Td>
                    <Term>cultural signals</Term>
                  </Td>
                  <Td>Culture, growth stage, stability, remote policy</Td>
                  <Td>Qualitative LLM judgement informed by JD plus targeted search</Td>
                </tr>
                <tr>
                  <Td>
                    <Term>red flags</Term>
                  </Td>
                  <Td>Blockers, warnings, risk signals</Td>
                  <Td>Negative-only adjustments — surfaced even when the rest of the score is high</Td>
                </tr>
                <tr>
                  <Td>
                    <Term>global</Term>
                  </Td>
                  <Td>Aggregate fit (the score that drives the apply / don&rsquo;t recommendation)</Td>
                  <Td>LLM-implicit weighting given the rubric and the five sub-dimensions above</Td>
                </tr>
              </tbody>
            </Table>
          </Section>

          <Section title="LLM judgement, not closed-form math">
            <p>
              <strong>There is no weighted-average formula in the code.</strong> The global score
              is the LLM&rsquo;s judgement of overall fit, given the rubric and the sub-dimensions.
              This is a deliberate design choice, for three reasons:
            </p>
            <ol className="mt-3 list-decimal space-y-2 pl-6">
              <li>
                <strong>JD context is heterogeneous.</strong> What &ldquo;comp&rdquo; means at an
                early-stage startup differs from a hyperscaler. Static weights would over-fit one
                context.
              </li>
              <li>
                <strong>User archetypes vary.</strong> Personalisation through{' '}
                <code>_profile.md</code> changes priorities; a fixed formula would fight that.
              </li>
              <li>
                <strong>Honesty.</strong> Pretending closed-form math when the underlying engine
                is an LLM is dishonest marketing. We choose to be transparent that this is
                rubric-guided judgement — and that two different LLMs may produce slightly
                different scores on the same input.
              </li>
            </ol>
            <p className="mt-3">
              The rubric is fully transparent (above). The judgement is auditable: every score
              comes with citations to specific CV lines and JD requirements. You can disagree and
              override.
            </p>
          </Section>

          <Section title="The canonical evaluation prompt">
            <p>
              The full evaluation runs as Block A through G, defined in{' '}
              <a
                href="https://github.com/santifer/career-ops/blob/main/modes/oferta.md"
                target="_blank"
                rel="noreferrer noopener"
                className="text-fd-foreground underline underline-offset-2"
              >
                modes/oferta.md
              </a>
              . The canonical version is in Spanish (the original implementation language); an
              English translation is in progress (
              <a
                href="https://github.com/santifer/career-ops/issues/363"
                target="_blank"
                rel="noreferrer noopener"
                className="text-fd-foreground underline underline-offset-2"
              >
                issue #363
              </a>
              ). Each block in summary:
            </p>
            <Table className="mt-4">
              <thead>
                <tr>
                  <Th className="w-20">Block</Th>
                  <Th>What the agent produces</Th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <Td>A — Role Summary</Td>
                  <Td>Table: archetype, domain, function, seniority, remote policy, team size, TL;DR. No score.</Td>
                </tr>
                <tr>
                  <Td>B — CV Match</Td>
                  <Td>Reads <code>cv.md</code>. Maps each JD requirement to specific CV lines. Identifies gaps with mitigation. Adapts focus to the detected archetype.</Td>
                </tr>
                <tr>
                  <Td>C — Level Strategy</Td>
                  <Td>Detected level vs. candidate&rsquo;s natural level. &ldquo;Sell senior without lying.&rdquo; Plan for downlevelling cases.</Td>
                </tr>
                <tr>
                  <Td>D — Comp &amp; Demand</Td>
                  <Td>Web search (Glassdoor / Levels.fyi / Blind). Cites sources. If no data, says so — never invents.</Td>
                </tr>
                <tr>
                  <Td>E — Personalisation Plan</Td>
                  <Td>Top 5 changes to the CV plus top 5 changes to LinkedIn for this specific role.</Td>
                </tr>
                <tr>
                  <Td>F — Interview Prep</Td>
                  <Td>6–10 STAR+R stories mapped to the JD. The Reflection column signals seniority — junior describes events, senior extracts lessons.</Td>
                </tr>
                <tr>
                  <Td>G — Posting Legitimacy</Td>
                  <Td>Three-tier assessment: High Confidence / Proceed with Caution / Suspicious. Separate from the 1–5 score; signals not accusations, with legitimate explanations always noted.</Td>
                </tr>
              </tbody>
            </Table>
            <Callout>
              The full Spanish prompt is the source of truth. Read it, fork it, audit it:{' '}
              <a
                href="https://github.com/santifer/career-ops/blob/main/modes/oferta.md"
                target="_blank"
                rel="noreferrer noopener"
                className="text-fd-foreground underline underline-offset-2"
              >
                modes/oferta.md
              </a>
              .
            </Callout>
          </Section>

          <Section title="Edge cases">
            <h3 className="text-fd-foreground font-medium mt-4">Incomplete job data</h3>
            <p className="mt-2">
              When compensation is missing, Block D explicitly says so — it does not invent
              numbers. The comp dimension reports as &ldquo;insufficient data, contributing low
              confidence to global&rdquo;. Vague JDs are flagged in Block G but never auto-
              classified Suspicious without evidence; startups, niche roles, and recruiter-sourced
              postings legitimately have less detail.
            </p>

            <h3 className="text-fd-foreground font-medium mt-6">Ambiguous or multi-fit roles</h3>
            <p className="mt-2">
              If a posting straddles two archetypes, Block A surfaces both. Block B then maps
              against each, with priority weight assigned by the dominant signal density in the
              JD. The user gets the full split rather than a hidden pick.
            </p>

            <h3 className="text-fd-foreground font-medium mt-6">Closed or expired listings</h3>
            <p className="mt-2">
              Liveness is checked separately from scoring (
              <code>check-liveness.mjs</code>). The liveness path looks at apply-button state,
              &ldquo;applications closed&rdquo; regex patterns, and posting age against a role-type
              -adjusted threshold. Recent improvements:{' '}
              <a
                href="https://github.com/santifer/career-ops/issues/374"
                target="_blank"
                rel="noreferrer noopener"
                className="text-fd-foreground underline underline-offset-2"
              >
                #374
              </a>{' '}
              tightened the regex set after false positives on multi-month-old jobs (
              <a
                href="https://github.com/santifer/career-ops/issues/373"
                target="_blank"
                rel="noreferrer noopener"
                className="text-fd-foreground underline underline-offset-2"
              >
                #373
              </a>
              ).
            </p>

            <h3 className="text-fd-foreground font-medium mt-6">Cost and token usage</h3>
            <p className="mt-2">
              A full Block A–G evaluation takes the order of 5–10 LLM calls plus 2–3 web searches
              (Block D and Block G). Exact cost depends on which CLI the user runs (Claude Code,
              Codex, OpenCode, Gemini CLI, Qwen, Copilot — whichever is configured). For users on
              metered API keys this matters; tracking the cost surface is open in{' '}
              <a
                href="https://github.com/santifer/career-ops/issues/273"
                target="_blank"
                rel="noreferrer noopener"
                className="text-fd-foreground underline underline-offset-2"
              >
                #273
              </a>
              .
            </p>
          </Section>

          <Section title="What career-ops explicitly does not do">
            <p>
              Anti-features are as load-bearing as features. From{' '}
              <a
                href="https://github.com/santifer/career-ops/blob/main/modes/_shared.md"
                target="_blank"
                rel="noreferrer noopener"
                className="text-fd-foreground underline underline-offset-2"
              >
                modes/_shared.md
              </a>{' '}
              and the rejected-PR record:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <strong>No spray-and-pray.</strong> The 4.0 threshold rejects most postings the
                user evaluates. By design.
              </li>
              <li>
                <strong>No auto-apply.</strong> Every application is a manual user decision.
                Nothing is submitted without approval.
              </li>
              <li>
                <strong>No invented experience or metrics.</strong> If it isn&rsquo;t in your CV
                or your article digest, the agent will not claim it.
              </li>
              <li>
                <strong>No CV modification.</strong> <code>cv.md</code> is yours. Personalised
                outputs go to a separate file; the source is never overwritten.
              </li>
              <li>
                <strong>No phone-number leaks.</strong> Phone numbers are intentionally never
                included in generated messages.
              </li>
              <li>
                <strong>No below-market comp recommendations.</strong> If the role pays badly,
                the agent says so.
              </li>
              <li>
                <strong>No anti-bot evasion.</strong> Patchright-style fingerprint masking was
                considered and rejected (
                <a
                  href="https://github.com/santifer/career-ops/pull/235"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-fd-foreground underline underline-offset-2"
                >
                  PR #235
                </a>
                ). Career-ops uses standard Playwright; a recruiter can see who&rsquo;s knocking.
              </li>
              <li>
                <strong>No LinkedIn scraping.</strong> Persistent-session LinkedIn scanning was
                approved in concept (
                <a
                  href="https://github.com/santifer/career-ops/issues/238"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-fd-foreground underline underline-offset-2"
                >
                  #238
                </a>
                ) but no implementation has shipped.
              </li>
              <li>
                <strong>No cloud data storage.</strong> career-ops itself is local code. The
                only cloud touch is whichever LLM CLI the user picked. Local-only Ollama is
                pending (
                <a
                  href="https://github.com/santifer/career-ops/pull/561"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-fd-foreground underline underline-offset-2"
                >
                  PR #561
                </a>
                ).
              </li>
              <li>
                <strong>No selling user data.</strong> The whole project is MIT, free, local-data.
                That is the model. There is no other.
              </li>
            </ul>
          </Section>

          <Section title="What&rsquo;s in flight">
            <p>
              Transparency requires acknowledging the work in progress. As of{' '}
              <time dateTime="2026-05-07">7 May 2026</time>:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <a
                  href="https://github.com/santifer/career-ops/issues/363"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-fd-foreground underline underline-offset-2"
                >
                  #363
                </a>{' '}
                — translating the canonical Spanish modes to English. Cluster of nine PRs open;
                merge policy still under review.
              </li>
              <li>
                <a
                  href="https://github.com/santifer/career-ops/pull/561"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-fd-foreground underline underline-offset-2"
                >
                  #561
                </a>{' '}
                — Ollama backend so the entire pipeline can run with a local LLM. RFC pending.
              </li>
              <li>
                <a
                  href="https://github.com/santifer/career-ops/issues/557"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-fd-foreground underline underline-offset-2"
                >
                  #557
                </a>{' '}
                — token-reduction work for CV-generation scripts. Issue open.
              </li>
              <li>
                <a
                  href="https://github.com/santifer/career-ops/pull/572"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-fd-foreground underline underline-offset-2"
                >
                  #572
                </a>{' '}
                — agent-agnostic instruction file. Merged{' '}
                <time dateTime="2026-05-05">5 May 2026</time>.{' '}
                <code>AGENTS.md</code> is now canonical (replacing per-CLI files).
              </li>
            </ul>
          </Section>

          <Section title="Frequently asked">
            <FaqItem question="How does career-ops actually score job listings?">
              career-ops uses a rubric-guided LLM evaluation across five dimensions (match,
              north-star alignment, comp, cultural signals, red flags) producing a holistic
              score from 1.0 to 5.0. Below 4.0 the agent recommends against applying. There is
              no closed-form weighting formula — the global score is the LLM&rsquo;s judgement
              given the rubric, with citations to specific CV lines and JD requirements.
            </FaqItem>

            <FaqItem question="Is career-ops free? What is the business model?">
              career-ops is permanently free, MIT-licensed, and community-funded. There is no
              paid tier, no waitlist, no account, no telemetry, and no premium features. You
              clone the repo, configure your profile, and run the system locally with
              whichever AI coding CLI you already use. Sustainability comes from voluntary
              community patronage via GitHub Sponsors &mdash; not from premium tiers, paid
              features, or data. The maintainer has other paid work for income; sponsorship
              enables deeper focus on the project. See{' '}
              <a
                href="/sustain"
                className="text-fd-foreground underline underline-offset-2"
              >
                career-ops.org/sustain
              </a>{' '}
              for details.
            </FaqItem>

            <FaqItem question="How is career-ops different from Indeed AI or LinkedIn AI?">
              Indeed and LinkedIn AI features sit on the recruiter side of the table — they help
              employers filter candidates faster. career-ops sits on the candidate side, helping
              a single person evaluate which roles deserve their attention. The rubric is
              published, the code is open source, and nothing is shared with employers or
              platforms.
            </FaqItem>

            <FaqItem question="Can companies use career-ops to filter candidates?">
              No. career-ops is built for individual job seekers and reads only data the
              candidate provides about themselves (CV, profile, target archetypes). It does not
              ingest candidate databases, parse resumes at scale, or score third parties.
              Repurposing it for employer-side filtering is technically possible but contrary to
              its design and stated intent.
            </FaqItem>

            <FaqItem question="What data does career-ops collect from users?">
              career-ops itself collects nothing. It is local code that runs on your machine.
              The only data leaving your computer is whatever your configured AI CLI sends to
              its provider — and that subset is whatever pieces of your CV and the public job
              postings you choose to evaluate. Local-only execution via Ollama is in flight
              (PR&nbsp;#561).
            </FaqItem>

            <FaqItem question="Who built career-ops? Why?">
              career-ops was built by{' '}
              <a
                href="/about"
                className="text-fd-foreground underline underline-offset-2"
              >
                Santiago Fernández de Valderrama Aparicio
              </a>
              , an Applied AI Operator with 16+ years building products. He created it to manage
              his own AI-era job search in early 2026 — 740 listings evaluated, one Head of AI
              role landed — and open-sourced it under MIT once he no longer needed it.
            </FaqItem>

            <FaqItem question="Does career-ops work with my ATS or job board?">
              career-ops scans Greenhouse, Ashby, and Lever via their public APIs (zero-token,
              no scraping). For other portals it can use Playwright through a configured AI CLI.
              It does not integrate with employer-side ATS, does not scrape LinkedIn (issue
              #238), and does not use anti-bot fingerprint masking (PR #235 rejected by design).
            </FaqItem>
          </Section>
        </div>

        <hr className="my-12 w-32 mx-auto border-t-2 border-fd-foreground/20 lg:w-40" />

        <p className="text-center text-xs text-fd-muted-foreground">
          Source of truth:{' '}
          <a
            href="https://github.com/santifer/career-ops/blob/main/modes/_shared.md"
            target="_blank"
            rel="noreferrer noopener"
            className="underline underline-offset-2"
          >
            modes/_shared.md
          </a>{' '}
          +{' '}
          <a
            href="https://github.com/santifer/career-ops/blob/main/modes/oferta.md"
            target="_blank"
            rel="noreferrer noopener"
            className="underline underline-offset-2"
          >
            modes/oferta.md
          </a>{' '}
          (System Layer per{' '}
          <a
            href="https://github.com/santifer/career-ops/blob/main/DATA_CONTRACT.md"
            target="_blank"
            rel="noreferrer noopener"
            className="underline underline-offset-2"
          >
            DATA_CONTRACT.md
          </a>
          ). Last updated <time dateTime="2026-05-07">7 May 2026</time>.
        </p>

        <div className="mt-10 text-center">
          <Link
            href="/docs/introduction/what-is-career-ops"
            className="text-fd-foreground text-base hover:underline underline-offset-4"
          >
            Read the user-facing intro →
          </Link>
        </div>
      </article>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-fd-foreground text-xl font-medium tracking-tight">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Table({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`mt-4 overflow-x-auto ${className ?? ''}`}>
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  );
}

function Th({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <th
      className={`border-b border-fd-border px-3 py-2 text-left text-fd-foreground font-medium ${className ?? ''}`}
    >
      {children}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return (
    <td className="border-b border-fd-border/50 px-3 py-2 align-top text-fd-foreground/90">
      {children}
    </td>
  );
}

// `<dfn>` carries the canonical lexicon term; DefinedTerm schema for these
// is added in a follow-up commit (Element 4).
function Term({ children }: { children: React.ReactNode }) {
  return <dfn className="not-italic font-medium text-fd-foreground">{children}</dfn>;
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 rounded-lg border border-fd-border bg-fd-secondary/40 p-4 text-sm text-fd-foreground/90">
      {children}
    </div>
  );
}

// Visible Q&A item that mirrors the FAQPage JSON-LD on this page —
// Google + LLMs prefer FAQ structured data backed by visible content.
function FaqItem({
  question,
  children,
}: {
  question: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6 first:mt-3">
      <h3 className="text-fd-foreground font-medium">{question}</h3>
      <p className="mt-2 text-fd-foreground/90 leading-relaxed">{children}</p>
    </div>
  );
}
