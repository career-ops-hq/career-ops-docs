// Home copy dictionary — the translatable strings of the home page,
// extracted for i18n (search-ops ES project, 2026-07-20). The EN values
// are the source of truth; a per-locale sibling (home-dict.es.ts) holds
// the translations with IDENTICAL keys.
//
// NOT included here (stay hardcoded in the component, never translated):
//   - the thesis signature ("Companies use AI to filter candidates…") —
//     canonical, literal, English on every surface
//   - "career-ops" / "CareerOps" (brand spellings)
//   - "Santiago Fernández de Valderrama Aparicio" (canonical name)
//   - mode identifiers (apply, oferta, …) and command strings
//
// DRIFT NOTE: faqCliAnswer / faqAiTools / featureAgnosticBody below carry
// the stale 6-CLI list ("…Gemini CLI, Qwen CLI, GitHub Copilot"). The EN
// must be corrected to the canonical 8 (+ Gemini legacy) before/with the
// ES translation, so the Spanish doesn't inherit the drift.

export type HomeDict = typeof homeEn;

export const homeEn = {
  heroHookLine1: 'You got the job,',
  heroHookLine2: "and it didn't cost you a thing.",
  heroH1: 'Open source AI-powered job search. Runs in your CLI. Your data, your machine.',
  ctaRunItNow: 'Run it now',
  ctaViewSource: 'View source',
  pressFeaturedIn: 'Featured in',
  authorTagline: ', 16-year operator and Head of Applied AI',
  readItArrow: 'Read it →',
  whatIsLabel: 'What is',
  whatIsBody:
    'career-ops is open-source, no cloud, no telemetry, no account. MIT-licensed and free forever; the only cost is whichever AI coding CLI you already pay for. Built by Santiago Fernández de Valderrama Aparicio after a real 2026 job search of 740 listings, 68 applications, 12 interviews, and one offer.',
  statsSuffix: 'stars · Open source · MIT',
  ctaTryItOut: 'Try it out',
  ctaGetOneFree: 'Get one free',
  valueProp:
    'Instead of manually tracking applications in a spreadsheet, you get an AI-powered pipeline that scans portals, generates tailored PDFs and tracks everything for you.',
  featureAgnosticTitle: 'AI-Native & Agnostic',
  featureAgnosticBody:
    'Works with any coding CLI — Claude Code, Codex, OpenCode, Gemini CLI, Qwen CLI, GitHub Copilot. Built on the Open Agent Skill Standard.',
  featureApplyTitle: 'Drafts the open-ended answers.',
  featureApplyBody1:
    'Greenhouse, Ashby and Lever forms ask "Why this role?" and "Tell us about a project." career-ops reads the form, drafts every answer from your CV and the JD, and hands them back paste-ready.',
  featureApplyBody2: 'You edit, you submit. The assistant never clicks for you.',
  featureApplyCta: 'See how apply works',
  featureScanTitle: '150+ company portals. Zero manual searching.',
  featureScanBody:
    'Pre-configured scrapers check 150+ career pages across Greenhouse, Ashby and Lever on demand — zero API tokens spent. Run scan and get a ranked list back in minutes.',
  featureScanCta: 'See all portals',
  communityTitle: 'Shipped with the community.',
  communityBody:
    "career-ops grows through pull requests from people running real job searches. Issues get triaged in Discord, fixes ship the same week. You don't just use the tool — you help shape what it becomes.",
  communityStat: '100% Open-Source.',
  communityPoweredBy: 'Now powered by the community.',
  communityCta: 'Meet our contributors →',
  faqHeading: 'Frequently asked',
  faqScoreQ: 'How does career-ops score job listings?',
  faqFreeQ: 'Is career-ops free? What is the business model?',
  faqWhoQ: 'Who built career-ops?',
  faqSkillQ: 'Is career-ops a Claude Code skill or a standalone tool?',
  faqSkillA:
    'career-ops is CLI-agnostic. It works with Claude Code, Codex, OpenCode, Gemini CLI, Qwen, and Copilot — whichever AI coding agent the user already pays for. The skill files (modes/) live in the repo as plain markdown prompts; any agent that supports skill loading can invoke them. There is no Anthropic-specific dependency. Claude Code happens to be the most common runtime because of its skill loader, but the same modes run unchanged in the other CLIs.',
  faqDiffQ: 'How is career-ops different from other AI job search tools?',
  faqToolsQ: 'What AI tools does career-ops work with?',
  faqToolsA:
    'Claude Code (primary), Codex (OpenAI), OpenCode, Gemini CLI (Google), Qwen, and GitHub Copilot. The same mode files run on all six. Each user picks the CLI that fits their existing subscription and cost preferences — career-ops never locks you to one provider. A typical job search runs on Claude Pro at $20/month, but the choice is yours.',
  finalCtaTitle: 'Ready to filter offers, not get filtered?',
  finalCtaYourTurn: 'Your turn',
  subscribeFollow: 'Or follow what we ship.',
  subscribeBlurb: 'Release announcements and occasional updates.',
  subscribeUnsub: 'Unsubscribe anytime.',
} as const;
