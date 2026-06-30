// Shared lastmod resolution for sitemap + docs TechArticle dateModified.
// Runs at build time (SSG / ISR) where git history is available. Requires
// a full (non-shallow) clone for accurate dates — vercel.json's buildCommand
// runs `git fetch --unshallow` first so Vercel's default shallow clone does
// not collapse every older file to the build-checkout mtime.
import { execSync } from 'node:child_process';
import { statSync } from 'node:fs';
import path from 'node:path';

const REPO_ROOT = path.resolve(process.cwd());

/**
 * Real authored timestamp from git history, or null when unavailable
 * (shallow clone with no history for the file, or a non-git runtime).
 * Callers that must always have a value use {@link lastModFor}; callers
 * that prefer to omit a date rather than assert a fake one use this.
 */
export function gitLastMod(relPath: string): Date | null {
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
