#!/usr/bin/env node
// Canonical content-hash for i18n drift detection (contract with search-ops,
// 2026-07-20). A translation's frontmatter carries `translationHash` = the
// hash of the EN source page it was translated from, computed by THIS script.
// The Phase-2 GitHub Action recomputes the EN hash and compares: mismatch =>
// the translation is stale => open an issue / draft PR.
//
// TRANSCREATION model (search-ops amendment, 2026-07-20): each language serves
// the same INFORMATION but LOCALIZES its FRAMING (headings, FAQ questions,
// seoTitle, liftable opener) to that language's search fan-out. So the hash
// must cover the RESPONSE layer only, never the framing — otherwise a
// deliberately-localized heading would fire false drift.
//
// The hash is of the NORMALIZED EN RESPONSE BODY:
//   - frontmatter (the first --- ... --- block) is EXCLUDED — metadata and the
//     framing fields (title, seoTitle, description) never affect the hash;
//   - markdown heading lines (# .. ######) are EXCLUDED — headings are framing,
//     localized per language, and diverge by design;
//   - all whitespace runs collapse to a single space and the result is trimmed,
//     so reflow / re-wrapping never triggers false drift.
// It answers exactly one question: "which semantic version of the EN response
// prose is this translation of?" — nothing about how each language frames it.
//
// Usage:
//   node .i18n/hash.mjs content/docs/introduction/what-is-career-ops.mdx
//   -> prints the 16-hex-char hash to stdout
//
// Keep this algorithm STABLE. Changing it invalidates every stored
// translationHash at once. If it must change, do it in a dedicated PR that
// re-stamps all translations in the same commit.

import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

/** Strip the leading YAML frontmatter block, if present. */
function stripFrontmatter(raw) {
  if (!raw.startsWith('---')) return raw;
  const end = raw.indexOf('\n---', 3);
  if (end === -1) return raw;
  // Skip past the closing '---' line.
  const after = raw.indexOf('\n', end + 1);
  return after === -1 ? '' : raw.slice(after + 1);
}

// Strip everything that is FRAMING or SCAFFOLDING, leaving only response prose.
// search-ops hardening (2026-07-20) — "exclude framing" is not just headings:
//   (1a) FAQ questions/labels are framing but rarely `## headings` — they ride
//        as component props (<Faq q="…">) or bold. Two escape hatches: authors
//        keep them as frontmatter data (excluded by construction), OR wrap any
//        inline framing in {/* framing:start */} … {/* framing:end */} markers,
//        which this function removes whole. Removing all JSX/HTML tags also
//        drops framing props carried on opening tags (title="…", q="…").
//   (1b) MDX scaffolding (imports, comments, self-closing tags) is normalized
//        out, so a global prettier/format pass never re-triggers translation.
function stripFraming(body) {
  return (
    body
      // explicit inline-framing blocks (whole block, markers included)
      .replace(/\{\/\*\s*framing:start\s*\*\/\}[\s\S]*?\{\/\*\s*framing:end\s*\*\/\}/g, ' ')
      // MDX + HTML comments
      .replace(/\{\/\*[\s\S]*?\*\/\}/g, ' ')
      .replace(/<!--[\s\S]*?-->/g, ' ')
      // import/export scaffolding lines
      .replace(/^\s*(import|export)\s.*$/gm, ' ')
      // all JSX/HTML tags — drops opening-tag framing props, closing + self-closing tags,
      // leaves the inner prose (Callout body stays; its title="…" goes)
      .replace(/<[^>]+>/g, ' ')
      // markdown ATX heading lines
      .split('\n')
      .filter((line) => !/^\s{0,3}#{1,6}(\s|$)/.test(line))
      .join('\n')
  );
}

/** The canonical hash of an EN .mdx file's RESPONSE body (framing + scaffolding excluded). */
export function contentHash(raw) {
  const body = stripFraming(stripFrontmatter(raw)).replace(/\s+/g, ' ').trim();
  return createHash('sha256').update(body, 'utf8').digest('hex').slice(0, 16);
}

// CLI entry point.
const file = process.argv[2];
if (file) {
  process.stdout.write(contentHash(readFileSync(file, 'utf8')) + '\n');
}
