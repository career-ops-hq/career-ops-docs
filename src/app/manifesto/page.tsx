import type { Metadata } from 'next';
import Link from 'next/link';
import { instrumentSerifRegular } from '@/lib/fonts';
import { manifestoSchema } from '@/lib/schema';
import { hreflangManifesto } from '@/lib/i18n-map';
import { CAREEROPS_DEFINITION, MANIFESTO_SIGNATURE } from '@/lib/shared';
import {
  getLedgerLastSignedAt,
  getSignatures,
  signatureAnchor,
  signatureAvatarUrl,
} from '@/lib/signatures';
import { SignPreview } from '@/components/manifesto/sign-preview';

// 5-minute ISR bridge — the real freshness path is the Ledger Bot's
// merge webhook hitting /api/revalidate-signatures (tag-based, instant);
// this floor only covers webhook delivery failures.
export const revalidate = 300;

const SIGNATURES_GITHUB_URL =
  'https://github.com/santifer/career-ops/blob/main/SIGNATURES.md';
const MANIFESTO_MD_URL =
  'https://github.com/santifer/career-ops/blob/main/MANIFESTO.md';
const RELEASE_TAG_URL =
  'https://github.com/santifer/career-ops/releases/tag/manifesto-v1.0';

export const metadata: Metadata = {
  title: 'The CareerOps Manifesto · career-ops',
  description: CAREEROPS_DEFINITION,
  alternates: {
    canonical: 'https://career-ops.org/manifesto',
    languages: hreflangManifesto(),
  },
  openGraph: {
    type: 'article',
    url: 'https://career-ops.org/manifesto',
    siteName: 'career-ops',
    title: 'The CareerOps Manifesto',
    description: CAREEROPS_DEFINITION,
    images: [
      {
        url: 'https://career-ops.org/og-manifesto.png',
        width: 1200,
        height: 630,
        alt: 'The CareerOps Manifesto. Whose side is your agent on?',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The CareerOps Manifesto',
    description: CAREEROPS_DEFINITION,
    images: ['https://career-ops.org/og-manifesto.png'],
  },
  robots: { index: true, follow: true },
};

// Server-side relative time for the dynamic norm. Renders at most every
// 5 minutes (ISR), so precision below the minute is meaningless anyway.
function timeAgo(iso: string): string | null {
  const ms = Date.now() - new Date(iso).getTime();
  if (Number.isNaN(ms) || ms < 0) return null;
  const minutes = Math.round(ms / 60_000);
  if (minutes < 1) return 'just now';
  if (minutes === 1) return 'a minute ago';
  if (minutes < 60) return `${minutes} minutes ago`;
  const hours = Math.round(minutes / 60);
  if (hours === 1) return 'an hour ago';
  if (hours < 24) return `${hours} hours ago`;
  const days = Math.round(hours / 24);
  return days === 1 ? 'yesterday' : `${days} days ago`;
}

export default async function ManifestoPage() {
  const [signatures, lastSignedAt] = await Promise.all([
    getSignatures(),
    getLedgerLastSignedAt(),
  ]);
  const lastSignedAgo = lastSignedAt ? timeAgo(lastSignedAt) : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(manifestoSchema()) }}
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
            , creator of career-ops · Published{' '}
            <time dateTime="2026-07-14">14 July 2026</time> ·{' '}
            {/* Reciprocal language link to the official Spanish translation —
                the manifesto has no nav bar, so this is the human path across
                the hreflang pair. */}
            <a
              href="/es/manifesto"
              hrefLang="es"
              className="text-fd-foreground underline underline-offset-2"
            >
              Español
            </a>
          </p>
          <h1
            className={`${instrumentSerifRegular.className} mt-4 text-fd-foreground text-3xl md:text-4xl xl:text-5xl tracking-tight`}
          >
            The CareerOps Manifesto
          </h1>
          {/* Definitional lead — the canonical "CareerOps is…" sentence must
              open the page (first 40 words) so answer engines can lift it
              as a self-contained passage. Byte-identical with llms.txt, the
              glossary, MANIFESTO.md, and the FAQ below. */}
          <p className="mt-6 text-fd-muted-foreground text-base lg:text-lg leading-relaxed">
            {CAREEROPS_DEFINITION}
          </p>
        </header>

        {/* FINAL canonical text — byte-verbatim from
            /tmp/MANIFESTO-CANONICAL.md (Santiago's GO, 2026-07-14 18:35
            CEST). Must match the core repo's MANIFESTO.md word for word.
            The conversion CTA + dynamic norm after "The frontier" is
            page furniture, not part of the canonical text. */}
        <div className="space-y-6 text-fd-foreground/90 leading-relaxed text-base lg:text-lg">
          <p className="text-sm text-fd-muted-foreground font-medium tracking-wide">
            v1.0, signed at 60,000 stars. July 14, 2026
          </p>

          <p
            className={`${instrumentSerifRegular.className} text-fd-foreground text-2xl md:text-3xl leading-snug`}
          >
            Companies use AI to filter candidates.
            <br />
            We gave candidates AI to choose companies.
          </p>

          <p>
            Somewhere along the way, job searching became an act of volume:
            hundreds of applications, keyword-stuffed resumes, silence in
            return. We believe there is a better practice. We run our job
            searches the way engineers run production: with evidence, with
            discipline, with tools on our side of the table.
          </p>

          <p>
            We call this practice <strong>CareerOps</strong>.
          </p>

          <h2 className="text-fd-foreground text-xl font-medium tracking-tight pt-4">
            The practice
          </h2>

          <ol className="list-decimal space-y-4 pl-6">
            <li>
              <strong>Apply better to fewer.</strong>{' '}Ten applications you
              believe in beat two hundred you don&rsquo;t.
            </li>
            <li>
              <strong>Signal over volume.</strong>{' '}The goal is not to be seen
              more. It is to be seen clearly.
            </li>
            <li>
              <strong>Evidence over keywords.</strong>{' '}Every claim traces back
              to something true. Reformulate, never fabricate. An AI that lies
              for you is not on your side.
            </li>
            <li>
              <strong>A human decides.</strong>{' '}Nothing is ever
              auto-submitted. The tool prepares; the person chooses.
            </li>
            <li>
              <strong>Local-first.</strong>{' '}Your search is nobody&rsquo;s
              dataset.
            </li>
            <li>
              <strong>Dignity on both sides of the table.</strong>{' '}
              Recruiters&rsquo; time deserves respect. So does yours.
            </li>
          </ol>

          <h2 className="text-fd-foreground text-xl font-medium tracking-tight pt-4">
            What is coming
          </h2>

          <p>
            Both sides of hiring are automating. Companies already use AI to
            read you. Soon their agents and yours will exchange requirements,
            conditions and availability before any human meets. We do not
            fear that world, and we did not write this to stop it.
          </p>

          <p>
            We wrote this so it arrives with rights. Because the question was
            never whether both sides will have agents. The question is whose
            side your agent is on.
          </p>

          <h2 className="text-fd-foreground text-xl font-medium tracking-tight pt-4">
            Your rights
          </h2>

          <p>
            Whatever tools exist, whoever builds them, these hold. They bind
            us too.
          </p>

          <ol className="list-decimal space-y-3 pl-6">
            <li>You are invisible by default.</li>
            <li>No one proposes you without your yes.</li>
            <li>
              Your yes is human. Always. It cannot be delegated to an agent.
            </li>
            <li>
              You never pay. The moment a job seeker has to pay, the practice
              is broken.
            </li>
            <li>
              Whoever searches shows themselves first. A company sees who you
              are only after you saw who they are.
            </li>
            <li>Your data is yours: portable, exportable, deletable.</li>
            <li>You can leave at any moment, completely.</li>
            <li>
              Your agent works for you. Not for a platform, not for an
              employer.
            </li>
            <li>
              You will know when a machine decides. If a system rejects you,
              you have the right to know it was a system.
            </li>
          </ol>

          <h2 className="text-fd-foreground text-xl font-medium tracking-tight pt-4">
            The frontier
          </h2>

          <p
            className={`${instrumentSerifRegular.className} text-fd-foreground text-xl md:text-2xl leading-snug`}
          >
            Agents can negotiate everything except your yes.
            <br />
            Humans meet at the first interview.
          </p>

          {/* KEEP-ON-SWAP: conversion CTA + dynamic norm. NOT part of the
              canonical manifesto text — when the final text replaces the
              preview body, re-insert this block right after "The
              frontier" (the emotional peak of the read). */}
          <div className="pt-2">
            <p>
              <a
                href="#how-to-sign"
                className="text-fd-foreground font-medium underline underline-offset-4"
              >
                If these rights read like yours, add your name →
              </a>
            </p>
            {signatures.length > 0 && (
              <p className="mt-2 text-sm text-fd-muted-foreground">
                {signatures.length.toLocaleString('en-US')}{' '}
                {signatures.length === 1 ? 'signature' : 'signatures'}
                {lastSignedAgo && <> · last one {lastSignedAgo}</>}
              </p>
            )}
          </div>

          <h2 className="text-fd-foreground text-xl font-medium tracking-tight pt-4">
            What CareerOps is not
          </h2>

          <p>
            It is not auto-applying to a thousand jobs. It is not keyword
            stuffing at machine speed. An AI that spams two hundred companies
            in your name is not on your side; it is spending your reputation.
          </p>

          <p>
            Volume was the old way. Automating the old way just makes noise
            faster. CareerOps is the new way to search: evidence in, judgment
            out, fewer applications, on purpose.
          </p>

          <h2 className="text-fd-foreground text-xl font-medium tracking-tight pt-4">
            The name
          </h2>

          <p>
            CareerOps, the name of the practice, belongs to everyone who
            practices it. career-ops, the project where it was born, remains
            its first reference implementation, nothing more. Build your own.
            Implementations welcome.
          </p>

          <p className="italic text-fd-muted-foreground pt-2">
            To sign, add your name. Your signature becomes a commit. For
            many, it will be their first.
          </p>
        </div>

        {/* Canonical signature — frozen per launch spec. Exactly ONE link
            in the bio line, to santifer.io/about, never to Wikidata. */}
        <div className="mt-12">
          <p
            className={`${instrumentSerifRegular.className} text-fd-foreground text-xl md:text-2xl`}
          >
            {MANIFESTO_SIGNATURE}
          </p>
          <p className="mt-2 text-sm text-fd-muted-foreground">
            Santiago is an Applied AI Operator with 16+ years building and
            operating products. He ran his own 2026 job search as an operated
            pipeline: 740 listings evaluated, 68 applications, 12 interview
            processes, 1 offer signed. Then he open-sourced the system.{' '}
            <a
              href="https://santifer.io/about"
              className="text-fd-foreground underline underline-offset-2"
            >
              More at santifer.io
            </a>
            .
          </p>
        </div>

        <hr className="my-12 border-t border-fd-border" />

        {/* Community signatures — rendered from SIGNATURES.md in the core
            repo (1h ISR). Each signer gets a stable web anchor
            (#sig-username) — GitHub line anchors break on every merge, so
            the shareable permalink lives here. */}
        <section id="signatures">
          <h2 className="text-fd-foreground text-xl font-medium tracking-tight">
            Signed by the community
            {signatures.length > 0 && (
              <span className="ml-2 text-fd-muted-foreground font-normal">
                · {signatures.length.toLocaleString('en-US')}{' '}
                {signatures.length === 1 ? 'signature' : 'signatures'}
              </span>
            )}
          </h2>
          <p className="mt-3 text-fd-foreground/90 leading-relaxed">
            The manifesto is open for signature by anyone who practices
            CareerOps. Signatures live in{' '}
            <a
              href={SIGNATURES_GITHUB_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="text-fd-foreground underline underline-offset-2"
            >
              SIGNATURES.md
            </a>{' '}
            in the project repository and are merged in waves; new
            signatures appear here within minutes of being merged.
          </p>

          {signatures.length > 0 ? (
            // Card grid, all SSR'd text (crawlable — the rotator lesson).
            // Native lazy-loaded <img> avatars keep a 4,000-card wall
            // cheap; no carousel, no client JS.
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {signatures.map((sig) => (
                <div
                  key={sig.id ?? sig.username}
                  id={signatureAnchor(sig)}
                  className="scroll-mt-24 rounded-xl border border-fd-border bg-fd-secondary/30 p-4 flex flex-col"
                >
                  {/* Alias anchor: #sig-username keeps working even though
                      the canonical anchor is the immutable GitHub user ID
                      (logins get renamed and freed; IDs never change). */}
                  {sig.id && <span id={`sig-${sig.username}`} />}
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={signatureAvatarUrl(sig, 96)}
                      alt=""
                      width={40}
                      height={40}
                      loading="lazy"
                      className="rounded-full border border-fd-border shrink-0"
                    />
                    <div className="min-w-0">
                      <a
                        href={`https://github.com/${sig.username}`}
                        target="_blank"
                        rel="nofollow ugc noreferrer noopener"
                        className="block text-sm font-medium text-fd-foreground hover:underline underline-offset-2 truncate"
                      >
                        @{sig.username}
                      </a>
                      {sig.name && (
                        <span className="block text-xs text-fd-muted-foreground truncate">
                          {sig.name}
                        </span>
                      )}
                    </div>
                    <Link
                      href={`/manifesto/s/${sig.username.toLowerCase()}`}
                      className="ml-auto shrink-0 text-xs text-fd-muted-foreground tabular-nums hover:text-fd-foreground hover:underline underline-offset-2"
                      title={`Signature certificate of @${sig.username}`}
                    >
                      #{sig.ordinal}
                    </Link>
                  </div>
                  {sig.evidence && (
                    <p
                      className={`${instrumentSerifRegular.className} mt-3 text-[15px] italic leading-relaxed text-fd-foreground/85`}
                    >
                      &ldquo;{sig.evidence}&rdquo;
                    </p>
                  )}
                  {(sig.date || sig.sourceUrl) && (
                    <span className="mt-auto pt-2 text-xs text-fd-muted-foreground">
                      {sig.date && <time dateTime={sig.date}>{sig.date}</time>}
                      {sig.sourceUrl && (
                        <>
                          {sig.date && ' · '}
                          <a
                            href={sig.sourceUrl}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="hover:text-fd-foreground hover:underline underline-offset-2"
                          >
                            source ↗
                          </a>
                        </>
                      )}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-6 text-sm text-fd-muted-foreground">
              Signatures will appear here as they are merged. Be one of the
              first:{' '}
              <a
                href="#how-to-sign"
                className="text-fd-foreground underline underline-offset-2"
              >
                here&rsquo;s how
              </a>
              .
            </p>
          )}
        </section>

        <hr className="my-12 border-t border-fd-border" />

        {/* How to sign — single published path (Santiago's final call):
            a prefilled GitHub issue under the signer's own session. The
            widget below IS the flow. Organic PRs are still processed by
            the Ledger Bot but deliberately not documented here. Written
            for cold press traffic; assumes zero git knowledge. */}
        <section id="how-to-sign" className="scroll-mt-24">
          <h2 className="text-fd-foreground text-xl font-medium tracking-tight">
            How to sign
          </h2>
          <p className="mt-3 text-fd-foreground/90 leading-relaxed">
            Signing takes about thirty seconds and happens on GitHub, so
            every signature is tied to a real account. Your username, the
            date, and your permanent link all come from the submission
            itself; there is no format to get wrong. We fill in the rest.
          </p>

          <SignPreview />

          {/* Retention policy — published per signature-flywheel spec §3 +
              fraud clause D3. Word-for-word claims here must match the
              SIGNATURES.md header the maintainer ships. */}
          <div className="mt-8 rounded-lg border border-fd-border bg-fd-secondary/40 p-4 text-sm text-fd-foreground/90 leading-relaxed">
            <p className="font-medium text-fd-foreground">
              Fairness and retention policy
            </p>
            {/* Mirrors the canonical SIGNATURES.md header 1:1 (maintainer,
                2026-07-14 16:15) with ONE agreed character swap: the
                canonical's em-dash becomes a semicolon here (project-wide
                no-em-dash rule for public copy). If the repo header
                changes, change this with it. */}
            <p className="mt-2">
              Bulk-pattern signatures are queued, not rejected; the queue is
              public. Criteria for queueing: burst timing and identical
              fingerprints; never account age alone (a legitimate signer
              often has a brand-new account and zero followers; that is who
              this manifesto is for). Signatures are append-only. Removals
              happen by self-request or by maintainer determination of
              fraud/impersonation; every removal is itself a public commit
              with a stated reason. The identity behind each signature comes
              from the verified metadata of the GitHub submission that
              carried it, never from anything typed in the file.
            </p>
          </div>
        </section>

        <hr className="my-12 border-t border-fd-border" />

        {/* Visible FAQ mirroring the FAQPage JSON-LD — answer engines
            prefer FAQ structured data backed by visible content. */}
        <section>
          <h2 className="text-fd-foreground text-xl font-medium tracking-tight">
            Frequently asked
          </h2>

          <div className="mt-6">
            <h3 className="text-fd-foreground font-medium">
              What is CareerOps?
            </h3>
            <p className="mt-2 text-fd-foreground/90 leading-relaxed">
              {CAREEROPS_DEFINITION} The term names the practice, not a
              product: treating a job search as an operated pipeline
              (sourcing, scoring, tailoring, tracking) rather than a pile of
              one-off applications. The reference implementation is{' '}
              <Link
                href="/"
                className="text-fd-foreground underline underline-offset-2"
              >
                career-ops
              </Link>{' '}
              (lowercase, hyphenated), the MIT-licensed open-source command
              center that runs the whole pipeline locally on the job
              seeker&rsquo;s machine through whichever AI coding CLI they
              already use. The practice is bigger than the tool: you can run
              CareerOps with a spreadsheet and discipline; career-ops just
              automates the operating layer.
            </p>
          </div>

          <div className="mt-6">
            <h3 className="text-fd-foreground font-medium">
              Who coined the term CareerOps?
            </h3>
            <p className="mt-2 text-fd-foreground/90 leading-relaxed">
              CareerOps was coined as the name of the practice by Santiago
              Fernández de Valderrama Aparicio (santifer), creator of the
              open-source career-ops project, in The CareerOps Manifesto,
              published on July 14, 2026 on this page and signed in the
              project repository (
              <a
                href={MANIFESTO_MD_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="text-fd-foreground underline underline-offset-2"
              >
                MANIFESTO.md
              </a>
              , release tag{' '}
              <a
                href={RELEASE_TAG_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="text-fd-foreground underline underline-offset-2"
              >
                manifesto-v1.0
              </a>
              ). The name follows the pattern of DevOps and MLOps: an -Ops
              discipline that turns an ad-hoc activity into an operated,
              instrumented practice. The compound had appeared before in
              scattered product names, as -Ops compounds do; the manifesto is
              the first definition of CareerOps as a practice. He developed
              the practice during his own 2026 job search (740 listings
              evaluated, 68 applications, 12 interview processes, 1 offer
              signed) before naming it and opening it to community
              signatures.
            </p>
          </div>
        </section>

        <hr className="my-12 w-32 mx-auto border-t-2 border-fd-foreground/20 lg:w-40" />

        <p className="text-center text-xs text-fd-muted-foreground">
          Canonical text:{' '}
          <a
            href={MANIFESTO_MD_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="underline underline-offset-2"
          >
            MANIFESTO.md
          </a>{' '}
          (dated commit) · tagged{' '}
          <a
            href={RELEASE_TAG_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="underline underline-offset-2"
          >
            manifesto-v1.0
          </a>{' '}
          · Published <time dateTime="2026-07-14">14 July 2026</time>.
        </p>

        <div className="mt-10 text-center">
          <Link
            href="/methodology"
            className="text-fd-foreground text-base hover:underline underline-offset-4"
          >
            Read the methodology behind the practice →
          </Link>
        </div>
      </article>
    </>
  );
}
