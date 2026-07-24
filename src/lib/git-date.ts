// Shared lastmod resolution for sitemap + docs TechArticle dateModified.
// Runs at build time (SSG / ISR) where git history is available. Requires
// a full (non-shallow) clone for accurate dates — vercel.json's buildCommand
// runs `git fetch --unshallow` first so Vercel's default shallow clone does
// not collapse every older file to the build-checkout mtime.
import { execSync } from 'node:child_process';
import { statSync } from 'node:fs';
import path from 'node:path';

const REPO_ROOT = path.resolve(process.cwd());

// In a SHALLOW clone (Vercel's default, when `git fetch --unshallow` fails),
// `git log -1 -- <file>` does NOT return null for old files: the grafted
// boundary commit appears to "create" every file that existed at that point,
// so all unchanged files collapse to the boundary commit's single date — 84
// URLs shared `2026-07-21T15:21:16Z` in prod. That's indistinguishable from
// fabricated, and Google distrusts it. So: if the repo is shallow, no git date
// is trustworthy → return null for everything and let callers omit lastmod.
// Checked once per build. (2026-07-24 audit, sitemap HIGH.)
let shallowState: boolean | null = null;
function repoIsShallow(): boolean {
  if (shallowState === null) {
    try {
      shallowState =
        execSync('git rev-parse --is-shallow-repository', {
          cwd: REPO_ROOT,
          encoding: 'utf8',
          stdio: ['ignore', 'pipe', 'ignore'],
        }).trim() === 'true';
    } catch {
      shallowState = false; // not a git runtime → treat as non-shallow
    }
  }
  return shallowState;
}

/**
 * Real authored timestamp from git history, or null when unavailable
 * (shallow clone, no history for the file, or a non-git runtime).
 * Callers that must always have a value use {@link lastModFor}; callers
 * that prefer to omit a date rather than assert a fake one use this.
 */
export function gitLastMod(relPath: string): Date | null {
  if (repoIsShallow()) return null; // boundary-commit dates are not trustworthy
  try {
    const iso = execSync(`git log -1 --format=%cI -- "${relPath}"`, {
      cwd: REPO_ROOT,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    if (iso) return new Date(iso);
  } catch {
    /* fall through */
  }
  return null;
}

/**
 * Best-effort lastmod: git history → fs mtime → build time. Never null,
 * because the sitemap needs a value for every entry.
 */
export function lastModFor(relPath: string): Date {
  const git = gitLastMod(relPath);
  if (git) return git;
  try {
    return statSync(path.join(REPO_ROOT, relPath)).mtime;
  } catch {
    return new Date();
  }
}
