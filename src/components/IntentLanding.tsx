import { instrumentSerifRegular } from '@/lib/fonts';
import { intentLandingSchema } from '@/lib/schema';

type IntentLandingData = {
  slug: string;
  h1: string;
  primaryKeyword: string;
  supportingKeywords: string[];
  lastModified: string;
  tagline: string;
  introBlock: string;
  howItWorks: Array<{ step: string; body: string }>;
  proof: string[];
  faq: Array<{ q: string; a: string }>;
};

export default function IntentLanding({ data }: { data: IntentLandingData }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(intentLandingSchema(data)) }}
      />
      <article className="mx-auto w-full max-w-3xl px-6 py-12 md:py-16">
        <header className="mb-12">
          <p className="text-sm text-fd-muted-foreground">
            By{' '}
            <a
              href="/about"
              className="text-fd-foreground underline underline-offset-2"
            >
              Santiago Fernández de Valderrama
            </a>
            , Applied AI Operator · Last updated{' '}
            <time dateTime={data.lastModified}>{formatDate(data.lastModified)}</time>
          </p>
          <h1
            className={`${instrumentSerifRegular.className} mt-4 text-fd-foreground text-3xl md:text-4xl xl:text-5xl tracking-tight leading-tight`}
          >
            {data.h1}
          </h1>
          <p className="mt-6 text-fd-muted-foreground text-base lg:text-lg leading-relaxed">
            {data.tagline}
          </p>
        </header>

        <div className="space-y-12 text-fd-foreground/90 leading-relaxed">
          <section>
            <p>{data.introBlock}</p>
          </section>

          <section>
            <h2
              className={`${instrumentSerifRegular.className} text-2xl md:text-3xl tracking-tight text-fd-foreground`}
            >
              How it works
            </h2>
            <ol className="mt-6 space-y-6">
              {data.howItWorks.map((s, i) => (
                <li key={i}>
                  <p className="font-medium text-fd-foreground">{s.step}</p>
                  <p className="mt-2">{s.body}</p>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h2
              className={`${instrumentSerifRegular.className} text-2xl md:text-3xl tracking-tight text-fd-foreground`}
            >
              Proof &amp; signal
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              {data.proof.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2
              className={`${instrumentSerifRegular.className} text-2xl md:text-3xl tracking-tight text-fd-foreground`}
            >
              Frequently asked
            </h2>
            <dl className="mt-6 space-y-6">
              {data.faq.map((item, i) => (
                <div key={i}>
                  <dt className="font-medium text-fd-foreground">{item.q}</dt>
                  <dd className="mt-2 text-fd-foreground/85">{item.a}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="flex flex-wrap gap-3">
            <a
              href="https://github.com/santifer/career-ops"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex justify-center rounded-full bg-brand text-brand-foreground hover:bg-brand-200 font-medium tracking-tight transition-colors text-base px-8 py-3.5"
            >
              Run it now &rarr;
            </a>
            <a
              href="/compare"
              className="inline-flex justify-center rounded-full border border-fd-foreground/20 hover:border-fd-foreground/40 text-fd-foreground font-medium tracking-tight transition-colors text-base px-8 py-3.5"
            >
              Compare to alternatives
            </a>
          </section>
        </div>
      </article>
    </>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}
