import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

// Chinese has no spaces between words, and Orama ships no Chinese tokenizer:
// Fumadocs would pass language 'zh' to Orama, which throws
// LANGUAGE_NOT_SUPPORTED while building the index, and every locale's search
// shares that build, so ⌘K would fail in all eight languages. The English
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

// Vietnamese is the same story: no Orama stemmer for it, so 'vi' would throw
// LANGUAGE_NOT_SUPPORTED. Vietnamese is space-separated (syllables), so a
// Unicode-aware split is enough. Diacritics are folded (NFD, marks stripped,
// đ -> d) at index and query time alike, so "tim viec" finds "tìm việc".
const viTokenizer = {
  language: 'vietnamese',
  normalizationCache: new Map<string, string>(),
  tokenize: (raw: string) =>
    String(raw ?? '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .split(/[^\p{L}\p{N}]+/u)
      .filter(Boolean),
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
    vi: { language: undefined, tokenizer: viTokenizer },
  },
});
