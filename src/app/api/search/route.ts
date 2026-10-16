import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

// Chinese has no spaces between words, and Orama ships no Chinese tokenizer:
// Fumadocs would pass language 'zh' to Orama, which throws
// LANGUAGE_NOT_SUPPORTED while building the index, and every locale's search
// shares that build, so ⌘K would fail in all seven languages. The English
// tokenizer instead drops Han characters (0 hits for 提交). Intl.Segmenter
// splits Chinese into words with the ICU dictionary that ships with Node, so
// no extra dependency. Latin words (career-ops, npm, Playwright) come out
// whole, as with the English tokenizer.
const zhSegmenter = new Intl.Segmenter('zh', { granularity: 'word' });
const zhTokenizer = {
  language: 'chinese',
  normalizationCache: new Map<string, string>(),
  tokenize: (raw: string) =>
    Array.from(zhSegmenter.segment(String(raw ?? '').toLowerCase()))
      .filter((s) => s.isWordLike)
      .map((s) => s.segment),
};

export const { GET } = createFromSource(source, {
  // https://docs.orama.com/docs/orama-js/supported-languages
  language: 'english',
  localeMap: {
    // `language: undefined` overrides the 'english' above: Orama refuses a
    // language option next to a custom tokenizer. No typo tolerance
    // (tolerance 0): on one- and two-character words it matches almost
    // anything. Threshold stays at Orama's default (1), as in the other
    // locales: with threshold 0, Orama drops a paragraph whenever one query
    // word also prefix-matches a longer word in it ("code" -> "codex"), so
    // "claude code" missed the Claude Code page itself.
    zh: { language: undefined, tokenizer: zhTokenizer, search: { tolerance: 0 } },
  },
});
