import { getLLMText, source } from '@/lib/source';
import { blogSource, type BlogPage } from '@/lib/blog-source';
import comparisonsData from '@/lib/data/comparisons.json';
import { CANONICAL_IDENTITY } from '@/lib/shared';

export const revalidate = false;

// llms-full.txt is the single-file full-context dump for AI agents.
// It must carry MORE than the docs: the blog (thesis + real funnel
// data), the 8 comparison pages, and condensed authority pages are
// the most-citable content on the site — a docs-only dump was hiding
// them from any agent that ingests this file (GEO audit 2026-06-09).

const SITE = 'https://career-ops.org';

async function blogLLMText(page: BlogPage) {
  const processed = await page.data.getText('processed');
  const modified = page.data.lastModified ?? page.data.date;

  return `# ${page.data.title} (${SITE}${page.url})

Published: ${page.data.date} · Last modified: ${modified} · Author: Santiago Fernández de Valderrama Aparicio

${processed}`;
}

type Comparison = (typeof comparisonsData.comparisons)[number];

function compareLLMText(c: Comparison) {
  const features = c.features
    .map((f) => `| ${f.name} | ${f.careerOps} | ${f.competitor} |`)
    .join('\n');
  const faq = c.faq.map((item) => `**Q: ${item.q}**\n\n${item.a}`).join('\n\n');

  return `# career-ops vs ${c.competitor.name} (${SITE}/compare/${c.slug})

Last modified: ${c.lastModified}

${c.intro}

${c.competitor.name}: ${c.competitor.tagline} Pricing: ${c.competitor.pricing} License: ${c.competitor.license} Data model: ${c.competitor.dataModel}

## Feature matrix

| Feature | career-ops | ${c.competitor.name} |
|---------|------------|----------------------|
${features}

## Verdict

${c.verdict.headline}

${c.verdict.body.join('\n\n')}

## FAQ

${faq}`;
}

const AUTHORITY_PAGES = `# About the author (${SITE}/about)

Santiago Fernández de Valderrama Aparicio (Wikidata Q138710224) is an Applied AI Operator. He founded and operated Santifer iRepair, a phone-repair business, for sixteen years before exiting in 2025. He is currently Head of Applied AI at Zinkee. He built career-ops to run his own AI-era job search in early 2026 — 740 listings evaluated, 68 applications sent, 12 interview processes, one offer signed — then open-sourced it under MIT. Other surfaces: ${SITE}/about and https://santifer.io.

# Methodology — how career-ops scores listings (${SITE}/methodology)

career-ops uses a rubric-guided LLM evaluation across five dimensions — match, north-star alignment, comp, cultural signals, red flags — producing a holistic global score from 1.0 to 5.0. There is no weighted-average formula; the global score is the model's holistic judgement over the five dimensions. The 4.0 threshold is the apply / don't-apply line: below 4.0 the agent recommends against applying. The default is deliberately high because the goal is fewer, better applications.

The full evaluation runs as Block A through G: A (role summary), B (CV match), C (level strategy), D (compensation and demand research), E (personalization notes), F (interview preparation with STAR stories), G (posting legitimacy — scam and ghost-job check). When compensation data is missing, Block D says so explicitly instead of inventing numbers. The canonical rubric lives in the open-source repo at https://github.com/santifer/career-ops/blob/main/modes/_shared.md and the evaluation prompt at modes/oferta.md. Full transparency write-up: ${SITE}/methodology.

# Sustainability model (${SITE}/sustain)

career-ops is permanently free, MIT-licensed, and community-funded: no paid tier, no waitlist, no account, no telemetry. Sustainability comes from voluntary patronage via GitHub Sponsors (https://github.com/sponsors/santifer). Nine tiers: seven individual ($1–$250) are identical statements of support; two corporate ($500 Corporate Supporter, $1,000 Ecosystem Partner) add logo placement on the README and /sustain — nothing else changes. No premium features, no roadmap influence, no priority support. Path 3 Sovereign Maintainer model.`;

export async function GET() {
  const scan = source.getPages('en').map(getLLMText);
  const scanned = await Promise.all(scan);

  const blogPosts = await Promise.all(blogSource.getPages().map(blogLLMText));

  const comparisons = comparisonsData.comparisons.map(compareLLMText);

  // Canonical Identity leads the dump — same single-source block as
  // /llms.txt (D-003: the two files must never diverge again), so any
  // agent ingesting this file resolves both spellings and the official
  // domains before reading a single page.
  const identity = `# career-ops — Canonical Identity\n\n${CANONICAL_IDENTITY}`;

  return new Response(
    [identity, ...scanned, ...blogPosts, ...comparisons, AUTHORITY_PAGES].join('\n\n'),
  );
}
