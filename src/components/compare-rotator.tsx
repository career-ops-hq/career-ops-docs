'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CoMark } from '@/components/co-mark';
import { instrumentSerifRegular } from '@/lib/fonts';

// Eight competitor wordmarks with their canonical brand colors.
// Order matches the comparison pages shipped in /compare. The wordmark
// rotates every 3 seconds; the clickable name links to the specific
// /compare/career-ops-vs-<slug> page rather than the index.
const competitors = [
  { name: 'Jobscan', slug: 'jobscan', color: '#2eb6e2' },
  { name: 'Teal', slug: 'teal', color: '#0f766e' },
  { name: 'Huntr', slug: 'huntr', color: '#7c3aed' },
  { name: 'Simplify', slug: 'simplify', color: '#3b82f6' },
  { name: 'Final Round AI', slug: 'finalroundai', color: '#0a0a0a' },
  { name: 'LazyApply', slug: 'lazyapply', color: '#d97706' },
  { name: 'Loopcv', slug: 'loopcv', color: '#1e3a8a' },
  { name: 'JobHire.AI', slug: 'jobhire', color: '#0d9488' },
];

export function CompareRotator() {
  const [idx, setIdx] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    // Respect prefers-reduced-motion — visitors who opted out of
    // animation see the first competitor only and can browse the
    // full set via the link below.
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    if (mq.matches) return;
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % competitors.length);
    }, 5500);
    return () => clearInterval(t);
  }, []);

  const current = competitors[idx];

  return (
    <div className="w-full bg-[#efeeed] dark:bg-stone-900 mt-16 lg:mt-24 py-16 lg:py-24">
    <section className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
      <h2
        className={`${instrumentSerifRegular.className} text-center tracking-tight text-3xl md:text-4xl lg:text-5xl mb-6 lg:mb-8`}
      >
        Comparing tools?
      </h2>

      <p className="text-fd-muted-foreground text-center max-w-xl mx-auto mb-8 lg:mb-12">
        Side-by-side honest comparisons. Feature matrix, pricing, the
        killer feature none of them ship.
      </p>

      <div className="flex flex-col items-center gap-8">
        {/* Slideshow — all eight images render stacked, only the
            current one visible (opacity-100). Eager-loading ensures
            every image is in browser cache from the first paint, so
            the rotation is smooth even on the first cycle (no
            loading flash). CSS opacity transition is 700ms to match
            the picker wheel duration exactly — wordmark and image
            stay perfectly synced. */}
        <Link
          href={`/compare/career-ops-vs-${current.slug}`}
          className="relative block w-full max-w-5xl mx-auto aspect-[1200/630] overflow-hidden rounded-lg border border-fd-foreground/10 hover:border-fd-foreground/30 transition-colors"
          aria-label={`career-ops vs ${current.name} comparison`}
        >
          {competitors.map((c, i) => (
            <Image
              key={c.slug}
              src={`/og/compare/career-ops-vs-${c.slug}.jpg`}
              alt={`career-ops vs ${c.name}`}
              fill
              sizes="(min-width: 1024px) 1024px, 100vw"
              priority={i === 0}
              loading={i === 0 ? undefined : 'eager'}
              className={`absolute inset-0 object-cover transition-opacity duration-700 ${
                i === idx ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </Link>

        {/* Picker row — vs sits at the horizontal center of the row
            (same max-w-5xl container as the image, so the vs aligns
            with the image's vertical center axis). Grid 1fr auto 1fr
            keeps the vs glyph centered regardless of competitor
            wordmark width; the left and right gaps from vs are
            constant (pr-6 / pl-6). Competitor is justify-self-start
            inside the right 1fr column, so it grows rightward as the
            wordmark length varies, never pushing vs off-center. */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center w-full max-w-5xl mx-auto min-h-[60px]">
          <Link
            href="/compare"
            className="flex items-center gap-2 justify-self-end pr-6 transition-opacity hover:opacity-80"
            aria-label="career-ops"
          >
            <CoMark size={44} />
            <span
              className={`${instrumentSerifRegular.className} text-2xl md:text-3xl text-fd-foreground whitespace-nowrap`}
            >
              career-ops
            </span>
          </Link>
          <span
            className={`${instrumentSerifRegular.className} text-2xl md:text-3xl italic text-fd-muted-foreground`}
          >
            vs
          </span>
          {/* Competitor wordmark — left-justified inside its 1fr
              column with a fixed pl-6 from vs. Cylinder perspective
              on the stage; wordmark child does the picker-wheel roll. */}
          <div className="compare-picker-stage justify-self-start pl-6 flex items-center min-h-[48px]">
            <Link
              key={current.slug}
              href={`/compare/career-ops-vs-${current.slug}`}
              className={`${instrumentSerifRegular.className} text-2xl md:text-3xl whitespace-nowrap hover:opacity-80 ${reduced ? '' : 'compare-picker-in'}`}
              style={{ color: current.color }}
            >
              {current.name}
            </Link>
          </div>
        </div>

        <Link
          href="/compare"
          className="text-fd-foreground hover:underline underline-offset-2 text-sm"
        >
          See all 8 comparisons &rarr;
        </Link>
      </div>
    </section>
    </div>
  );
}
