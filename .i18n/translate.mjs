#!/usr/bin/env node
// Auto-translation pipeline (Phase 2 core) — runs on `claude -p` (the Claude
// subscription you already pay for), NOT an API key. For each EN .mdx passed as
// an argument it produces a sibling .es.mdx: a faithful, natural Spanish (Spain)
// transcreation that preserves all code, commands, MDX structure, and the
// canonical non-translatables, and stamps the drift-tracking translationHash.
//
// Usage:
//   node .i18n/translate.mjs content/docs/reference/modes/pdf.mdx [more.mdx ...]
//
// It calls `claude -p` once per file (a headless one-shot), captures the
// translated file on stdout, injects the i18n frontmatter contract fields, and
// writes <name>.es.mdx next to the source. Glossary of non-translatables is read
// from .i18n/nontranslatables.yml (owner: search-ops) and injected into every
// prompt. Content-hash algorithm is shared with .i18n/hash.mjs.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { contentHash } from './hash.mjs';

const GLOSSARY = readFileSync(new URL('./nontranslatables.yml', import.meta.url), 'utf8');

/** content/docs/<rel>.mdx  ->  /docs/<rel>  (index -> parent, so /docs). */
function docsUrl(path) {
  let rel = path.replace(/^.*content\/docs\//, '').replace(/\.mdx$/, '');
  rel = rel.replace(/(^|\/)index$/, '');
  return '/docs' + (rel ? '/' + rel : '');
}

function buildPrompt(en) {
  return `You are translating one page of the career-ops documentation from English into natural Spanish (Spain). Output ONLY the translated .mdx file — start directly with the frontmatter \`---\` line, no preamble, no commentary, and do NOT wrap the whole file in a code fence.

RULES
1. Translate into fluent, natural Spanish of Spain. Translate the prose, the headings, and the frontmatter fields \`title\`, \`description\` and \`seoTitle\`. Keep every other frontmatter key (icon, date, etc.) exactly as-is.
2. PRESERVE EXACTLY — never translate: fenced code blocks and their contents, inline \`code\`, shell commands, file names and paths (cv.md, DATA_CONTRACT.md, reports/, output/, config/profile.yml, data/applications.md, AGENTS.md, package names, npm/npx commands), and all URLs. In markdown links translate the visible text but keep the URL. In MDX component tags (<Tabs>, <Tab>, <Callout>, <Steps>, <Step>, <Accordions>, <Accordion>, <details>, <summary>, raw <div>…) keep the tag names and the identifier attributes (value="…", items order) unchanged; you MAY translate human-visible attribute text such as title="…". Keep heading levels and the overall MDX structure identical.
3. NON-TRANSLATABLES — keep verbatim (this list is authoritative):
${GLOSSARY}
   Also keep verbatim: the brand "career-ops" / "CareerOps", the name "Santiago Fernández de Valderrama Aparicio" (with Aparicio), mode ids (apply, scan, pipeline, auto-pipeline, oferta, ofertas, contacto, deep, followup, interview-prep, pdf, project, patterns, tracker), CLI names (Claude Code, Codex, OpenCode, Antigravity CLI, Grok, Qwen, Kimi, GitHub Copilot, Gemini CLI), portals (Greenhouse, Ashby, Lever, Wellfound), technical terms (MIT, ATS, CLI, Open Agent Skill Standard), and domains. Terms that are the de-facto standard in Spanish tech speech stay in English (open source, commit, pull request, script, tracker). NEVER use @ or x as inclusive-gender marks.
4. CANONICAL FACTS — never alter: the funnel is 740 evaluated → 68 applied → 12 interviews → 1 offer (NEVER 631 or 122; those are prohibited). Scoring is FIVE dimensions plus a holistic global score (NEVER six). The signature thesis "Companies use AI to filter candidates. I just gave candidates AI to choose companies." stays in LITERAL ENGLISH — never translate or reword it.
5. The result must be a valid .mdx beginning with a \`---\` frontmatter block.

ENGLISH FILE TO TRANSLATE:
${en}`;
}

/** Insert the i18n contract fields into the model's frontmatter block. */
function stampFrontmatter(es, enPath, enRaw) {
  const hash = contentHash(enRaw);
  const from = docsUrl(enPath);
  const contract = `translationHash: ${hash}\nlocalized: true\ntranslatedFrom: ${from}`;
  // strip an accidental wrapping code fence
  es = es.replace(/^\s*```[a-z]*\n/, '').replace(/\n```\s*$/, '').trim();
  const m = es.match(/^---\n([\s\S]*?)\n---/);
  if (!m) throw new Error(`no frontmatter in translation of ${enPath}`);
  const fm = m[1]
    .split('\n')
    .filter((l) => !/^(translationHash|localized|translatedFrom):/.test(l))
    .join('\n');
  return es.replace(m[0], `---\n${fm}\n${contract}\n---`);
}

for (const enPath of process.argv.slice(2)) {
  const esPath = enPath.replace(/\.mdx$/, '.es.mdx');
  const enRaw = readFileSync(enPath, 'utf8');
  process.stdout.write(`→ ${enPath} … `);
  const res = spawnSync('claude', ['-p', buildPrompt(enRaw)], {
    encoding: 'utf8',
    maxBuffer: 20 * 1024 * 1024,
    timeout: 300000,
  });
  if (res.status !== 0 || !res.stdout) {
    console.log(`FAIL (status ${res.status}) ${(res.stderr || '').slice(0, 200)}`);
    continue;
  }
  try {
    const es = stampFrontmatter(res.stdout, enPath, enRaw);
    writeFileSync(esPath, es);
    console.log(`ok → ${esPath}`);
  } catch (e) {
    console.log(`POST-FAIL ${e.message}`);
  }
}
