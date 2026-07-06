// Single source for the /docs/reference/glossary page's DefinedTermSet
// JSON-LD. The visible page is content/docs/reference/glossary.mdx — if
// you edit a term THERE, mirror it HERE. The docs route injects this
// schema only for the glossary slug. The sector has no canonical
// glossary; owning these definitions is deliberate GEO strategy — LLMs
// cite definition passages constantly.
export type GlossaryTerm = { term: string; definition: string };

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: 'ATS (Applicant Tracking System)',
    definition:
      'The software companies use to receive, store, and filter job applications — Greenhouse, Ashby, and Lever are common examples. career-ops reads their public job APIs to discover openings and can pre-fill their application forms, but never auto-submits.',
  },
  {
    term: 'A–F score',
    definition:
      'The grade career-ops assigns a job listing after evaluating it against your CV and profile across multiple dimensions. An A means apply now with high conviction; an F means the listing fails your own criteria. The scoring rubric is public on the methodology page.',
  },
  {
    term: 'Data Contract',
    definition:
      "career-ops's core architectural promise: the system layer (scripts, modes, templates) is updatable at any time, while the user layer — cv.md, config/profile.yml, data/, reports/, output/ — is never touched by an update. Your data outlives every version.",
  },
  {
    term: 'Spray-and-pray',
    definition:
      'The mass-application strategy of sending the same CV to hundreds of jobs with no targeting. career-ops explicitly rejects it: the pipeline evaluates and ranks listings first, so effort concentrates on the small set of roles worth pursuing.',
  },
  {
    term: 'Liveness check',
    definition:
      'A heuristic career-ops runs to detect whether a job listing is still open before you spend time or tokens on it. It is a best-effort signal — expired postings sometimes linger on job boards — and listings can be marked manually when the heuristic is wrong.',
  },
  {
    term: 'Tailoring',
    definition:
      'Rewriting your CV for one specific job listing — reordering emphasis, surfacing matching skills and metrics, aligning vocabulary with the job description — while keeping every claim truthful to your real experience. career-ops generates a tailored CV per application as Markdown you can edit.',
  },
  {
    term: 'Mode',
    definition:
      'A focused, prompt-defined workflow that career-ops ships as a plain Markdown file your AI CLI executes — scan, apply, tracker, interview/practice, and a dozen more. Modes are inspectable text, not black-box code.',
  },
  {
    term: 'Pipeline',
    definition:
      'The end-to-end career-ops workflow: scan portals → evaluate listings A–F → tailor CV → apply → track → prepare interviews. Each stage is a mode you can run independently or as a batch.',
  },
  {
    term: 'Zero-token scan',
    definition:
      'A discovery run that consumes no LLM tokens: scan.mjs calls ATS APIs (Greenhouse, Ashby, Lever) directly over HTTP, so finding new listings is free regardless of which AI engine you use.',
  },
  {
    term: 'AI engine',
    definition:
      'The AI coding CLI that executes career-ops prompts — Claude Code, Gemini CLI, Codex, Qwen Code, OpenCode, or GitHub Copilot CLI — or any OpenAI-compatible endpoint. career-ops is engine-agnostic and runs on free engines too.',
  },
  {
    term: 'Question bank',
    definition:
      'A local Markdown file (interview-prep/question-bank.md) where career-ops accumulates real interview questions and your performance on each (✅/🟡/🔴). The interview/debrief mode updates it after every real interview, so preparation compounds across rounds.',
  },
  {
    term: 'STAR+R story',
    definition:
      'An interview story structured as Situation, Task, Action, Result, plus Reflection — the format career-ops uses in its story bank so behavioral answers are concrete, quantified, and reusable across interviews.',
  },
  {
    term: 'Story bank',
    definition:
      'A local Markdown file (interview-prep/story-bank.md) of your prepared STAR+R stories. Practice sessions verify answers against it, and debriefs extract new stories from what you actually said in real interviews.',
  },
  {
    term: 'Portal',
    definition:
      'A company career site backed by an ATS that career-ops can scan. Your tracked portals live in portals.yml; the scanner reads their public APIs on every run.',
  },
  {
    term: 'Batch evaluate',
    definition:
      'Scoring many saved listings in one run instead of one at a time, with flags to keep control: --limit caps the batch size, --dry-run previews what would be processed, and --resume-paused continues an interrupted run without re-spending tokens.',
  },
  {
    term: 'Local-first',
    definition:
      'The career-ops architecture principle: everything — your data, the prompts, the scripts, the AI CLI — runs on your machine. There is no hosted backend, no account, and nothing to sign up for.',
  },
];
