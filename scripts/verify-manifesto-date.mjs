#!/usr/bin/env node
// Guards the manifesto's published date against silent drift.
//
// The manifesto's DefinedTermSet uses `datePublished` as its version, on
// purpose: a manifesto is amended by publishing, not by bumping a counter
// nobody would look up, and a date is verifiable against the commit history.
//
// But a date has a failure mode a version number does not: it can sit still
// while the text changes underneath it. If someone amends a paragraph and
// leaves the date alone, everyone who cited the manifesto before is citing
// something that no longer says the same thing, with no signal that it moved.
// (search-ops, 2026-08-14.)
//
// So the canonical strings are hashed and the hash is pinned next to the date.
// Change the text without changing the date and this fails. Same contract as
// .i18n/hash.mjs for translations, which is already the repo's idiom.
//
// Usage:
//   node scripts/verify-manifesto-date.mjs          → check
//   node scripts/verify-manifesto-date.mjs --probe  → prove the check can fail
//   node scripts/verify-manifesto-date.mjs --update → re-pin after a real edit

import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SHARED = path.join(ROOT, 'src/lib/shared.ts');
const PIN = path.join(ROOT, 'src/lib/manifesto-pin.json');

/** Pull an exported string (or string-array) literal out of shared.ts. */
function extract(src, name) {
  const re = new RegExp(`export const ${name}\\s*=\\s*([\\s\\S]*?);\\n`, 'm');
  const m = src.match(re);
  if (!m) throw new Error(`no encuentro ${name} en shared.ts`);
  return m[1].trim();
}

// Every string a third party could be citing when they cite the manifesto.
// Adding one here is deliberate: it widens what counts as "the text changed".
const TRACKED = [
  'CAREEROPS_DEFINITION',
  'MANIFESTO_WHAT_IT_IS_NOT',
  'MANIFESTO_THE_NAME',
  'MANIFESTO_SIGNATURE',
];

function currentHash(mutate = false) {
  const src = readFileSync(SHARED, 'utf8');
  let body = TRACKED.map((n) => `${n}=${extract(src, n)}`).join('\n');
  if (mutate) body += '\nPROBE';
  return createHash('sha256').update(body).digest('hex').slice(0, 16);
}

const probe = process.argv.includes('--probe');
const update = process.argv.includes('--update');
const hash = currentHash(probe);
const pinned = JSON.parse(readFileSync(PIN, 'utf8'));

if (update) {
  console.log(`Re-pin a mano: pon "${hash}" en ${path.relative(ROOT, PIN)} y`);
  console.log('actualiza datePublished en src/lib/schema.ts en el MISMO commit.');
  process.exit(0);
}

if (hash === pinned.textHash) {
  if (probe) {
    console.error('❌ SONDA FALLIDA: el texto mutado dio el mismo hash.');
    console.error('   El guardián no está mirando. Arréglalo antes de confiar en su verde.');
    process.exit(1);
  }
  console.log(`✅ manifiesto sin cambios desde ${pinned.datePublished} (${hash})`);
  process.exit(0);
}

if (probe) {
  console.log('✅ sonda OK: el guardián detecta un cambio de texto.');
  process.exit(0);
}

console.error('❌ El texto del manifiesto cambió y datePublished NO.');
console.error(`   pinned : ${pinned.textHash}  (${pinned.datePublished})`);
console.error(`   actual : ${hash}`);
console.error('');
console.error('   Un tercero que citara el manifiesto antes de este cambio está');
console.error('   citando algo que ya no dice lo mismo, y sin señal de que se movió.');
console.error('');
console.error('   Si el cambio es real: sube datePublished en src/lib/schema.ts');
console.error('   y el hash en src/lib/manifesto-pin.json, en el MISMO commit.');
process.exit(1);
