import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy · career-ops',
  description:
    'How career-ops.org handles personal data — applies only to the mailing list. GDPR-compliant, no tracking, minimal data.',
  alternates: { canonical: 'https://career-ops.org/privacy' },
  openGraph: {
    type: 'website',
    url: 'https://career-ops.org/privacy',
    siteName: 'career-ops',
    title: 'Privacy · career-ops',
    description:
      'How career-ops.org handles personal data. Applies only to the mailing list signup. GDPR-compliant.',
  },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-12 md:py-16">
      <header className="mb-10">
        <h1 className="text-fd-foreground text-3xl font-medium tracking-tight md:text-4xl">
          Privacy Policy
        </h1>
        <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-fd-muted-foreground">
          <div className="flex gap-2">
            <dt>Effective:</dt>
            <dd className="text-fd-foreground">
              <time dateTime="2026-05-07">7 May 2026</time>
            </dd>
          </div>
          <div className="flex gap-2">
            <dt>Version:</dt>
            <dd className="text-fd-foreground">1.0</dd>
          </div>
        </dl>
      </header>

      <div className="space-y-8 text-fd-foreground/90 leading-relaxed">
        <p>
          This policy explains what data career-ops.org collects through its mailing list signup,
          why, and how. It applies only to the email subscription form on career-ops.org. The
          website itself collects no other personal data beyond what's described below.
        </p>

        <Section title="1. Data Controller">
          <p>
            <strong className="text-fd-foreground">
              Santiago Fernández de Valderrama Aparicio
            </strong>
            , individual, based in Sevilla, Spain. Contact for any privacy matter:{' '}
            <a
              href="mailto:privacy@career-ops.org"
              className="text-fd-foreground underline underline-offset-2"
            >
              privacy@career-ops.org
            </a>
            .
          </p>
        </Section>

        <Section title="2. What data we collect">
          <p>When you subscribe to the mailing list, we collect and process:</p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              <strong className="text-fd-foreground">Your email address</strong> — to send you the
              announcements you signed up for.
            </li>
            <li>
              <strong className="text-fd-foreground">The IP address</strong> that submitted the
              form — captured automatically by our hosting provider's request logs, retained briefly
              for abuse-prevention and to demonstrate consent if required by a supervisory
              authority.
            </li>
            <li>
              <strong className="text-fd-foreground">The timestamp</strong> of your submission and
              confirmation — captured automatically by our email service provider.
            </li>
          </ul>
          <p className="mt-3">
            We do not collect names, account passwords, payment details, or any profile data. The
            website does not require accounts.
          </p>
        </Section>

        <Section title="3. Lawful basis for processing">
          <p>
            We process your data on the basis of your{' '}
            <strong className="text-fd-foreground">explicit consent</strong> (Article 6(1)(a) of
            the GDPR), which you give by submitting the subscribe form and confirming your address
            via the link we email you (double opt-in). You can withdraw consent at any time — see
            section 7.
          </p>
        </Section>

        <Section title="4. Purpose and limits">
          <p>
            Your email is used <strong className="text-fd-foreground">only</strong> to send
            career-ops product announcements: new releases, occasional milestone updates, and
            security-relevant communications. We do not send promotional content for third
            parties, do not run advertising campaigns, and do not profile or score subscribers.
          </p>
          <p className="mt-3">Frequency target: 1–2 emails per month at most, often less.</p>
        </Section>

        <Section title="5. Retention">
          <p>
            We retain your email and consent metadata for as long as you remain subscribed. After
            you unsubscribe or withdraw consent:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Your address is removed from active sending within 24 hours.</li>
            <li>
              Audit data (timestamp of subscription, timestamp of unsubscribe, IP at submission) is
              retained for <strong className="text-fd-foreground">30 days</strong> to satisfy
              demonstration-of-consent obligations, then deleted.
            </li>
          </ul>
          <p className="mt-3">
            Hosting request logs are retained per our hosting provider's standard schedule (see
            section 8).
          </p>
        </Section>

        <Section title="6. Your rights">
          <p>Under the GDPR you can ask us, free of charge, to:</p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              <strong className="text-fd-foreground">Access</strong> the data we hold about you
              (Art. 15)
            </li>
            <li>
              <strong className="text-fd-foreground">Correct</strong> inaccurate data (Art. 16)
            </li>
            <li>
              <strong className="text-fd-foreground">Delete</strong> your data (Art. 17)
            </li>
            <li>
              <strong className="text-fd-foreground">Restrict</strong> processing of your data
              (Art. 18)
            </li>
            <li>
              <strong className="text-fd-foreground">Receive</strong> a copy in a portable format
              (Art. 20)
            </li>
            <li>
              <strong className="text-fd-foreground">Object</strong> to processing (Art. 21)
            </li>
            <li>
              <strong className="text-fd-foreground">Withdraw</strong> consent at any time without
              giving a reason (Art. 7(3))
            </li>
          </ul>
          <p className="mt-3">
            Send any of these requests to{' '}
            <a
              href="mailto:privacy@career-ops.org"
              className="text-fd-foreground underline underline-offset-2"
            >
              privacy@career-ops.org
            </a>
            . We respond within 30 days, in line with Art. 12(3).
          </p>
        </Section>

        <Section title="7. How to withdraw consent / unsubscribe">
          <p>
            Every email we send includes a one-click unsubscribe link. You can also email{' '}
            <a
              href="mailto:privacy@career-ops.org"
              className="text-fd-foreground underline underline-offset-2"
            >
              privacy@career-ops.org
            </a>{' '}
            with the words "unsubscribe" or "delete me" — we will action it the same business day.
          </p>
          <p className="mt-3">
            Withdrawing consent does not affect the lawfulness of any processing already carried
            out before the withdrawal.
          </p>
        </Section>

        <Section title="8. Third parties (data processors)">
          <p>
            We use the following processors. Each is bound by a data processing agreement (DPA)
            and processes your data only on our instructions.
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              <strong className="text-fd-foreground">Resend Inc.</strong> (United States) —
              transactional email and audience management. Subscriber emails are stored in their EU
              region (eu-west-1, Ireland). DPA:{' '}
              <a
                href="https://resend.com/legal/dpa"
                rel="noreferrer noopener"
                className="text-fd-foreground underline underline-offset-2"
              >
                resend.com/legal/dpa
              </a>
            </li>
            <li>
              <strong className="text-fd-foreground">Vercel Inc.</strong> (United States) — website
              hosting. Captures request IP and timestamps in standard server logs for
              abuse-prevention. DPA:{' '}
              <a
                href="https://vercel.com/legal/dpa"
                rel="noreferrer noopener"
                className="text-fd-foreground underline underline-offset-2"
              >
                vercel.com/legal/dpa
              </a>
            </li>
            <li>
              <strong className="text-fd-foreground">Cloudflare Inc.</strong> (United States) — DNS
              provider. Processes DNS lookup requests; does not store subscriber data.
            </li>
          </ul>
          <p className="mt-3">
            We do not share your data with any other third party. We do not sell your data.
          </p>
        </Section>

        <Section title="9. International transfers">
          <p>
            Some processors are based in the United States. Where data is transferred outside the
            European Economic Area, we rely on the{' '}
            <strong className="text-fd-foreground">Standard Contractual Clauses</strong> approved
            by the European Commission, in line with Article 46(2)(c) GDPR following the Schrems II
            ruling.
          </p>
        </Section>

        <Section title="10. Cookies and analytics">
          <p>
            career-ops.org uses minimal first-party cookies for theme preference and site
            functionality. We use Vercel Analytics and Speed Insights to measure aggregate traffic
            and performance — these are configured to collect anonymous, aggregated metrics and do
            not identify individual visitors. We do not use third-party advertising cookies,
            behavioral profiling, or remarketing pixels.
          </p>
        </Section>

        <Section title="11. Complaints">
          <p>
            If you believe we are processing your data unlawfully, you have the right to lodge a
            complaint with a supervisory authority. In Spain that is the{' '}
            <strong className="text-fd-foreground">Agencia Española de Protección de Datos</strong>{' '}
            (AEPD),{' '}
            <a
              href="https://www.aepd.es"
              rel="noreferrer noopener"
              className="text-fd-foreground underline underline-offset-2"
            >
              aepd.es
            </a>
            . EU residents in other countries may complain to their national data protection
            authority.
          </p>
          <p className="mt-3">
            We would, however, appreciate the chance to address any concerns directly first —
            please email{' '}
            <a
              href="mailto:privacy@career-ops.org"
              className="text-fd-foreground underline underline-offset-2"
            >
              privacy@career-ops.org
            </a>
            .
          </p>
        </Section>

        <Section title="12. Changes to this policy">
          <p>When we make material changes to this policy we will:</p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Update the effective date and version number at the top.</li>
            <li>Notify active subscribers by email at least 14 days before the changes take effect.</li>
            <li>Keep the previous version available on request.</li>
          </ul>
          <p className="mt-3">
            Editorial corrections (typo fixes, clarifications without substantive change) are made
            silently.
          </p>
        </Section>

      </div>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-fd-foreground text-xl font-medium tracking-tight">{title}</h2>
      <div className="mt-3 space-y-1">{children}</div>
    </section>
  );
}
