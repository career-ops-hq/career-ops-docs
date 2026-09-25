// FAQPage JSON-LD for /docs/claude-code. The visible questions live in
// content/docs/claude-code.mdx; edit one, mirror it here, and vice versa. Same
// convention as faq-data.ts. Answers are checked against the core repo
// (docs/SUPPORTED_CLIS.md, modes/_shared.md), never written from memory.
import type { FaqEntry } from './faq-data';

export const CLAUDE_CODE_FAQ: FaqEntry[] = [
  {
    question: 'Can Claude Code search for jobs for me?',
    answer:
      'Yes, with career-ops. It scans company job boards, scores each listing against your CV and drafts the application material for the ones worth pursuing. You decide which applications to send.',
  },
  {
    question: 'Does it apply to jobs automatically?',
    answer:
      'No. career-ops never submits an application in your name. It prepares everything up to the click, and you review and send each application yourself.',
  },
  {
    question: 'Do I need Claude Pro?',
    answer:
      'To use Claude Code you need a paid Claude plan or an Anthropic API key. career-ops itself is free, and it also runs on free engines through OpenCode.',
  },
];
