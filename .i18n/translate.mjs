#!/usr/bin/env node
// Auto-translation pipeline (Phase 2 core) — runs on `claude -p` (the Claude
// subscription you already pay for), NOT an API key. For each EN .mdx passed as
// an argument it produces a sibling .es.mdx: a faithful, natural Spanish (Spain)
// transcreation that preserves all code, commands, MDX structure, and the
// canonical non-translatables, and stamps the drift-tracking translationHash.
//
// Usage:
//   node .i18n/translate.mjs [--lang es|fr|de|pt|it|zh] content/docs/reference/modes/pdf.mdx [more.mdx ...]
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
  // DE added 2026-09-30: Germany is the #4 country by pageviews and Google
  // clicks (after US, IN, CA) and the first non-English-speaking market.
  // Informal "du" is the norm in German developer docs (GitHub, Docker).
  de: {
    suffix: 'de',
    name: 'natural German (Germany), addressing the reader informally as "du" (lowercase, as in modern German developer documentation). Use German typographic quotes „…“ in prose. Job-search vocabulary: Stelle / Stellenanzeige (job listing), Jobangebot (the final job offer; never a bare Angebot for a listing), Bewerbung (application), Bewerbungsunterlagen (the application documents), Lebenslauf (CV — the file cv.md keeps its name), Anschreiben (cover letter), Vorstellungsgespräch (interview), Einladungen zum Vorstellungsgespräch bekommen (to get interviews). Write KI, not AI, except in proper names. For whether a listing is trustworthy the native word is seriös; never promise to detect fraud. In titles and headings say STAR-Methode, not STAR-Geschichten (the body may say Geschichten). Phrase FAQ questions the way German readers search, not as calques of the English (search-ops native profile for German, 1 Oct 2026)',
  },
  // PT added 2026-10-13: Brazil is ~87% of Portuguese-language clicks, and the
  // core already ships modes/pt in Brazilian Portuguese. "Para o tradutor"
  // block from the search-ops native profile for Portuguese (F1, 9 Oct 2026).
  pt: {
    suffix: 'pt',
    name: 'natural Brazilian Portuguese (pt-BR), addressing the reader as "você" (never "tu" or "o senhor/a senhora"). Use Brazilian, not European, vocabulary: arquivo (not ficheiro), tela (not ecrã), usuário (not utilizador), equipe (not equipa), registro (not registo), celular (not telemóvel). Job-search vocabulary, as in the core modes/pt: vaga (job listing), proposta (de trabalho) (the final job offer received). NEVER use "oferta" for either one, because in Brazil "oferta de emprego" means the listing. The funnel reads exactly "740 vagas avaliadas → 68 candidaturas → 12 entrevistas → 1 proposta". Also: candidatura / candidatar-se, currículo (not "CV" in prose; the file cv.md keeps its name), carta de apresentação, processo seletivo, sistemas de triagem (ATS), entrevista comportamental, método STAR, recrutador. Write IA, not AI, except in proper names. Category noun: "agente de IA de código aberto para busca de emprego"; verb: "procurar emprego" (never "procura de emprego", which is European). The score scale is named "de 1 a 5"; score values use a decimal comma (4,0 and 4,5, "4,2/5"). The human-in-the-loop promise is "O career-ops nunca se candidata em seu nome." Never present "candidatura automática" as something career-ops does, and never promise to get past the ATS. Phrase headings and FAQ questions the way Brazilian readers search, not as calques of the English (search-ops native profile for Portuguese, 9 Oct 2026)',
  },
  it: {
    suffix: 'it',
    name: 'natural Italian (it-IT), addressing the reader as "tu" (never "Lei" or "voi"). Job-search vocabulary, as in the core modes/it: annuncio (job listing), proposta di assunzione (the final job offer received). NEVER use "offerta" for the final offer; "offerta di lavoro" is only allowed where it means the listing, in headings that copy how Italians search ("Come capire se vale la pena candidarsi a un\'offerta di lavoro"). The funnel reads exactly "740 annunci valutati → 68 candidature → 12 colloqui → 1 proposta di assunzione". Also: candidatura / candidarsi, curriculum in prose ("CV" only where the English means the file; cv.md keeps its name), lettera di presentazione, colloquio di lavoro, risposte comportamentali, metodo STAR, recruiter. Write AI, not IA ("strumenti AI"). Category noun: "agente AI open source per la ricerca di lavoro"; verb: "cercare lavoro". The score scale is named "da 1 a 5"; score values use a decimal comma (4,0 and 4,5, "4,2/5"); the threshold is "sotto 4,0". The human-in-the-loop restriction is exactly "Redige e compila; non invia mai. Sei tu a cliccare su Invia." and the promise is exactly "career-ops non si candida mai a tuo nome." Never present "candidatura automatica" as something career-ops does, and never promise to get past the ATS. Phrase headings and FAQ questions the way Italian readers search, not as calques of the English (search-ops native profile for Italian, 13 Oct 2026)',
  },
  zh: {
    suffix: 'zh',
    name: 'natural Simplified Chinese (zh-Hans, mainland conventions, as in the core README.cn.md and modes/zh), addressing the reader as "你" (NEVER "您"). Never use Traditional characters or Taiwan vocabulary: 软件 not 软体, 程序 not 程式, 默认 not 预设, 支持 not 支援, 界面 not 介面, 文件 not 档案, 网络 not 网路, 登录 not 登入. Typography: full-width punctuation in prose (，。：；？！「」 or “”), and ONE half-width space between Han characters and any Latin letters, digits or inline code ("开源的 AI 求职智能体", "68 个已投递", "运行 `npm install` 即可"), but no space next to full-width punctuation. Keep "career-ops" in Latin and lowercase. Job-search vocabulary: 求职 / 找工作 (job search), 简历 (CV in prose; the file cv.md keeps its name), 求职信 (cover letter), 面试 (interview), 职位 (job listing), offer in Latin (the final job offer received; NEVER 录用通知 or 工作邀约 for it), 智能体 (agent; NEVER 代理, which reads as proxy), 开源 (open source), AI in Latin (NEVER 人工智能). To apply for a job is 申请 ("这个职位值得申请吗？"); keep 投递 only for applications sent in the funnel. The funnel reads exactly "740 个职位已评估 → 68 个已投递 → 12 次面试 → 1 份 offer" (README.cn line 36, with arrows where the English uses arrows); NEVER "投递了740份简历". The score scale keeps the English "1-5" with a decimal point (4.0, 4.5, "4.2/5"); a threshold reads "低于 4.0". Category noun: "开源的 AI 求职智能体". The human-in-the-loop restriction, wherever the English says "It drafts and fills; it never submits. You press Submit.", is exactly "它起草、填写，但从不提交。由你点击提交。" (README.cn); where the English promises "It never applies in your name", write "career-ops 从不替你提交申请。". Never present 自动投递 or 自动申请 as something career-ops does, and never promise to get past the ATS. Never write 数据不会离开你的电脑 or 都留在本地: your CV is sent to the AI provider you chose; say files are 默认保存在本地 and translate the English data sentence faithfully. Qwen, Kimi and DeepSeek are models career-ops works with (支持), never partners. Phrase headings, the seoTitle and FAQ questions the way Chinese readers search, not as calques of the English: what-is "career-ops 是什么？", free-ai-engine "开源的 AI 求职智能体", is-this-job-worth-applying-to "这个职位值得申请吗？", prepare-star-stories "用 STAR 法则准备面试故事", claude-code "用 Claude Code 找工作" (search-ops native profile for Chinese, 15 Oct 2026)',
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
   Also keep verbatim: the brand "career-ops" / "CareerOps", the name "Santiago Fernández de Valderrama Aparicio" (with Aparicio), mode ids (apply, scan, pipeline, auto-pipeline, oferta, ofertas, contacto, deep, followup, interview-prep, pdf, project, patterns, tracker), CLI names (Claude Code, Codex, OpenCode, Antigravity CLI, Grok, Qwen, Kimi, GitHub Copilot, Gemini CLI), portals (Greenhouse, Ashby, Lever, Wellfound), technical terms (MIT, ATS, CLI, Open Agent Skill Standard), and domains. Terms that are the de-facto standard in the target language's tech speech stay in English (open source, commit, pull request, script, tracker). NEVER use @ or x as inclusive-gender marks.
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
