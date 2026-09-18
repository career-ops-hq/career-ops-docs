#!/usr/bin/env node
// Guards the brand orange against silent drift.
//
// WHY THIS EXISTS (17 Sep 2026). The brand colour is published as a fact: /press
// states it, the BIMI logo encodes it, and a trademark policy will one day
// license it by value. Nothing held it. In August we fixed the value and not the
// mechanism, so the same drift could return the next afternoon.
//
// It already had. `const AMBER` carried TWO different colours: #DD7627 in the
// badge snippet, #e08a44 on four manifesto share surfaces. Same name, same
// intent, different colour, and nothing noticed.
//
// WHAT IT DOES NOT DO, and why that took a second attempt. The first version
// flagged every orange in the codebase by colour distance. It caught LazyApply's
// logo in the comparison rotator and a flag in the language bar, and it ranked
// the home page's shader closer to the brand than the actual drift. Proximity is
// not the signal: a competitor's orange is not our orange drifting, it is
// theirs, rendered correctly. Guarding by hue would have taught everyone to
// silence it.
//
// So it guards by ROLE. A hex only answers to this script when its own name
// claims to be the brand, or when it sits in a file whose whole job is to carry
// the mark. Art, flags and other people's logos are none of its business.
//
// The canonical value is DERIVED from --color-brand in global.css, not repeated
// here: a guard that hardcodes the number it guards only proves someone typed it
// twice.
import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const CSS = 'src/app/global.css';

function hslToHex(h, s, l) {
  const a = (s / 100) * Math.min(l / 100, 1 - l / 100);
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const c = l / 100 - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    return Math.round(255 * c).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

const css = readFileSync(CSS, 'utf8');
const decl = css.match(/--color-brand:\s*hsl\(\s*([\d.]+)[, ]+([\d.]+)%[, ]+([\d.]+)%\s*\)/);
if (!decl) {
  console.error(`✗ ${CSS} no longer declares --color-brand as hsl().`);
  console.error('  The canonical value cannot be derived, so this fails rather than guessing.');
  process.exit(1);
}
const BRAND = hslToHex(+decl[1], +decl[2], +decl[3]);

// The rest of the declared palette. A brand asset may legitimately use the
// darkened ink or the hover shade, and those are the token's own values rather
// than someone eyeballing a second orange, so they answer to global.css and not
// to this list.
const PALETTE = new Set(
  [...css.matchAll(/--color-brand[\w-]*:\s*hsl\(\s*([\d.]+)[, ]+([\d.]+)%[, ]+([\d.]+)%\s*\)/g)]
    .map((t) => hslToHex(+t[1], +t[2], +t[3])),
);

// Files that exist to carry the mark. Every brand-coloured hex in them is a
// claim about the brand, whatever it is called.
const BRAND_ASSETS = ['public/bimi-logo.svg', 'src/lib/badge-svg.ts'];

// Names that claim to be the brand wherever they appear.
const CLAIMS = /\b(AMBER|BRAND)\b[^=\n]*=\s*['"](#[0-9a-fA-F]{6})['"]/g;

// Known divergences: real, load-bearing, and NOT the canonical value. Listed so
// they are visible instead of silent. Fixing them changes what a reader sees,
// which is a person's call and not a sed's.
const KNOWN = new Map([
  ['#E08A44', 'four manifesto share surfaces. Matches no token in global.css. Predates this guard; needs a design decision, not a rename.'],
]);

const findings = new Map(); // hex -> Set(file)
function record(hex, file) {
  hex = hex.toUpperCase();
  if (!findings.has(hex)) findings.set(hex, new Set());
  findings.get(hex).add(file);
}

// 1. Identifiers that name themselves after the brand.
const src = execSync(
  "grep -rIn -E '(AMBER|BRAND)[^=]*=[[:space:]]*.#[0-9a-fA-F]{6}' src --include='*.ts' --include='*.tsx' --include='*.mjs' || true",
  { encoding: 'utf8' },
);
for (const line of src.split('\n').filter(Boolean)) {
  const file = line.slice(0, line.indexOf(':'));
  for (const m of line.matchAll(CLAIMS)) record(m[2], file);
}

// 2. Files whose whole purpose is the mark.
for (const f of BRAND_ASSETS) {
  let body;
  try { body = readFileSync(f, 'utf8'); } catch { continue; }
  for (const m of body.matchAll(/#[0-9a-fA-F]{6}/g)) {
    const hex = m[0].toUpperCase();
    // Inks and neutrals share these files; only the brand-hued one is a claim.
    // Only OTHER declared shades are skipped. Excluding the brand itself here
    // would stop the guard checking the one file that most needs it, and it
    // would still report green: the failure mode this whole script exists for.
    if (hex !== BRAND && PALETTE.has(hex)) continue;
    const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
    // r - b > 60 keeps creams and near-whites out: #F4EDE4 is warm but it is
    // paper, not the mark.
    if (r > 150 && r > g && g > b && r - b > 60) record(hex, f);
  }
}

console.log(`brand colour, derived from ${CSS}: ${BRAND}\n`);
let failed = false;
for (const [hex, files] of [...findings].sort()) {
  const where = [...files].sort().join(', ');
  if (hex === BRAND) {
    console.log(`  ✓ ${hex}  ${files.size} file(s)`);
  } else if (KNOWN.has(hex)) {
    console.log(`  · ${hex}  known divergence — ${KNOWN.get(hex)}`);
    console.log(`      ${where}`);
  } else {
    console.error(`  ✗ ${hex}  claims to be the brand but is not ${BRAND}`);
    console.error(`      ${where}`);
    console.error('      Use the --color-brand token, or list it above with the reason it differs.');
    failed = true;
  }
}

if (!findings.size) {
  console.error('✗ Nothing matched. The guard stopped looking rather than passing green.');
  process.exit(1);
}
if (failed) {
  console.error('\n✗ Brand colour guard: something claims to be the brand and is not.');
  process.exit(1);
}
console.log('\n✓ Brand colour guard passed.');
