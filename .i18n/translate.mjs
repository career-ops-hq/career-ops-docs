#!/usr/bin/env node
// Auto-translation pipeline (Phase 2 core) — runs on `claude -p` (the Claude
// subscription you already pay for), NOT an API key. For each EN .mdx passed as
// an argument it produces a sibling .es.mdx: a faithful, natural Spanish (Spain)
// transcreation that preserves all code, commands, MDX structure, and the
// canonical non-translatables, and stamps the drift-tracking translationHash.
//
// Usage:
//   node .i18n/translate.mjs [--lang es|fr] content/docs/reference/modes/pdf.mdx [more.mdx ...]
//   (--lang defaults to es for back-compat; the output suffix follows the lang)
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

// Target languages. `name` is injected into the prompt; `suffix` names the
// output file (page.<suffix>.mdx). ES is neutral-panhispanic per search-ops
// doctrine (2026-07-21): avoid strong Iberian-only tells. Add a language here
// + its defineI18n entry + its /<suffix> route group to grow to N languages.
const LANGS = {
  es: {
    suffix: 'es',
    name: 'natural, neutral panhispanic Spanish (Spanish understood across Spain and Latin America). Avoid strong Iberian-only tells: write "archivo" not "fichero", "equipo" or "máquina" not "ordenador"; address the reader as "tú" (never vosotros or usted)',
  },
  fr: {
    suffix: 'fr',
    name: 'natural French (France), addressing the reader as "vous"',
  },
};

/** content/docs/<rel>.mdx  ->  /docs/<rel>  (index -> parent, so /docs). */
function docsUrl(path) {
  let rel = path.replace(/^.*content\/docs\//, '').replace(/\.mdx$/, '');
  rel = rel.replace(/(^|\/)index$/, '');
  return '/docs' + (rel ? '/' + rel : '');
}

function buildPrompt(en, langName) {
  return `You are translating one page of the career-ops documentation from English into ${langName}. Output ONLY the translated .mdx file — start directly with the frontmatter \`---\` line, no preamble, no commentary, and do NOT wrap the whole file in a code fence.

RULES
1. Translate into fluent, ${langName}. Translate the prose, the headings, and the frontmatter fields \`title\`, \`description\` and \`seoTitle\`. Keep every other frontmatter key (icon, date, etc.) exactly as-is.
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

// --lang <code> (default es); everything else is a file path.
const args = process.argv.slice(2);
let lang = 'es';
const files = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--lang') lang = args[++i];
  else files.push(args[i]);
}
const spec = LANGS[lang];
if (!spec) {
  console.error(`unknown --lang ${lang} (known: ${Object.keys(LANGS).join(', ')})`);
  process.exit(1);
}

for (const enPath of files) {
  const outPath = enPath.replace(/\.mdx$/, `.${spec.suffix}.mdx`);
  const enRaw = readFileSync(enPath, 'utf8');
  process.stdout.write(`→ [${lang}] ${enPath} … `);
  const res = spawnSync('claude', ['-p', buildPrompt(enRaw, spec.name)], {
    encoding: 'utf8',
    maxBuffer: 20 * 1024 * 1024,
    timeout: 300000,
  });
  if (res.status !== 0 || !res.stdout) {
    console.log(`FAIL (status ${res.status}) ${(res.stderr || '').slice(0, 200)}`);
    continue;
  }
  try {
    const out = stampFrontmatter(res.stdout, enPath, enRaw);
    writeFileSync(outPath, out);
    console.log(`ok → ${outPath}`);
  } catch (e) {
    console.log(`POST-FAIL ${e.message}`);
  }
}
