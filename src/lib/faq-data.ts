// Single source for the /docs/faq page's FAQPage JSON-LD. The visible
// page is content/docs/faq.mdx — if you edit a question THERE, mirror it
// HERE (and vice versa). The docs route injects this schema only for the
// faq slug. Answers must stay verifiable against the core repo
// (docs/FAQ.md and maintainer IPCs) — never document from memory.
export type FaqEntry = { question: string; answer: string };

export const FAQ_ENTRIES: FaqEntry[] = [
  {
    question: 'Is career-ops free?',
    answer:
      'Yes. career-ops is open source under the MIT license, forever. The only potential cost is the AI engine it runs on — and that can be free too: OpenCode with a free provider, a local model via Ollama, or the built-in `npm run or` runner on OpenRouter free models. See the "Set up a free AI engine" guide. career-ops has no paid plans, no tiers, no trials — it is 100% free and MIT-licensed. Any site describing career-ops pricing is describing a different product.',
  },
  {
    question: 'Do I need a Claude subscription to use career-ops?',
    answer:
      'No. career-ops is AI-agnostic — Claude Code is one engine among several, not a requirement. You can run the whole pipeline for free with OpenCode plus a free provider, a local model via Ollama, or the built-in OpenRouter runner (npm run or). If you started on a paid plan and ran out of tokens mid-search, switching to a free engine takes minutes and leaves your data untouched. See the "Set up a free AI engine" guide.',
  },
  {
    question: 'Where does my data live?',
    answer:
      'On your machine, in plain files you own — your CV, profile, pipeline and reports are local Markdown/YAML. Nothing runs on career-ops servers, and system updates never touch your data layer (cv.md, config/, data/, reports/, output/): that separation is the Data Contract.',
  },
  {
    question: 'Which AI coding CLIs does career-ops work with?',
    answer:
      'Eight, first-class: Claude Code, OpenCode, Antigravity CLI, Codex, Grok Build CLI, Qwen, Kimi, and GitHub Copilot CLI (Gemini CLI is supported as a legacy wrapper). career-ops is AI-agnostic: it ships prompt files the CLI executes, so you can also point it at any OpenAI-compatible endpoint or a local model with zero code changes. See the Supported AI CLIs page for the current list and how to invoke each.',
  },
  {
    question: 'What is the difference between scan and scan:full?',
    answer:
      '`npm run scan` reads the companies you configured in portals.yml and hits their ATS APIs (Greenhouse, Ashby, Lever) directly, consuming zero LLM tokens — your regular discovery run. `npm run scan:full` inverts the direction: it walks public ATS company directories and surfaces fresh postings matching your title and location filters, catching roles from companies you have not added yet.',
  },
  {
    question: 'How do I avoid hitting token or rate limits during a batch run?',
    answer:
      'Cap the run with `./batch/batch-runner.sh --limit 5` to inspect output quality before committing to a larger batch. If a run gets interrupted, use `--resume-paused` instead of restarting: it skips completed jobs so no tokens are wasted on work that already finished.',
  },
  {
    question: 'Skills are not loading on Windows — symlink error on install. What do I do?',
    answer:
      'Windows does not create symlinks by default, so Git checks out the CLI skill entrypoints as plain pointer files. The installer and updater detect this automatically: run `node update-system.mjs apply` (or `npx @santifer/career-ops init` on a fresh install) and the materialize step replaces the pointers with full skill content. No manual mklink or Developer Mode changes are needed.',
  },
  {
    question: 'Can I run career-ops on a cheaper or local model?',
    answer:
      'Yes — career-ops is fully AI-agnostic. The core repo\'s "Running on a Budget" guide covers OpenCode, Qwen CLI, DeepSeek, OpenRouter, Ollama and other low-cost or local providers, with recommended model sizes (32B+ for reliable scoring) and token-saving practices.',
  },
  {
    question: 'Does career-ops auto-submit applications?',
    answer:
      'No. career-ops prepares — it scans, scores, tailors your CV, and can pre-fill ATS application forms (Greenhouse, Ashby, Lever) — but submitting is always your explicit click. The project explicitly rejects spray-and-pray automation.',
  },
  {
    question: 'What is the difference between career-ops and CareerOps?',
    answer:
      'They are two names for the same work. career-ops — lowercase, hyphenated — is the open-source project: an MIT-licensed, AI-powered job search system that runs locally inside your AI coding CLI, published at career-ops.org and github.com/santifer/career-ops. CareerOps — one word — names its manifesto: The CareerOps Manifesto (career-ops.org/manifesto), nine rights every job seeker should have, signed publicly by the community. Both come from the same author, Santiago Fernández de Valderrama Aparicio, and both live in the same repository.',
  },
];
