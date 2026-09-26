#!/usr/bin/env bash
# Give the build the full git history, or say loudly that it could not.
#
# Every page date on this site comes from git: the sitemap's <lastmod>, the
# visible "Updated" line on docs pages, and the dateModified in their schema.
# src/lib/git-date.ts refuses to read dates from a shallow clone, because a
# shallow clone makes every old file look as if it was created at the grafted
# boundary commit, and a fabricated date is worse than none. So a shallow build
# does not produce wrong dates. It produces no dates at all.
#
# Vercel clones shallow and leaves no remote configured. The previous build
# command ran `git fetch --unshallow || true`: with no remote, git prints
# nothing and exits, the `|| true` swallows the rest, and the build carried on.
# For weeks the sitemap shipped <lastmod> on 15 of 116 URLs, every one of them
# from a hand-written date, none from git, and nothing anywhere said so.
#
# Two fixes. Fetch from an explicit URL, built from Vercel's own system
# variables so the next repository transfer cannot silently break it again. And
# report the outcome either way. It does not fail the build: dates are worth
# having, but not worth a failed deploy when GitHub is slow. It makes the
# failure impossible to miss in the log instead.
set -u
# Never wait for credentials: a prompt in a build container hangs the deploy.
export GIT_TERMINAL_PROMPT=0

if [ "$(git rev-parse --is-shallow-repository 2>/dev/null)" != "true" ]; then
  echo "[git-history] full history already present"
  exit 0
fi

owner="${VERCEL_GIT_REPO_OWNER:-career-ops-hq}"
slug="${VERCEL_GIT_REPO_SLUG:-career-ops-docs}"
url="https://github.com/${owner}/${slug}.git"

if git fetch --quiet --unshallow "$url" 2>&1; then
  :
fi

if [ "$(git rev-parse --is-shallow-repository 2>/dev/null)" = "true" ]; then
  echo "[git-history] WARNING: still shallow after fetching ${url}."
  echo "[git-history] WARNING: every git-derived page date will be omitted from this build."
else
  echo "[git-history] full history fetched from ${url} ($(git rev-list --count HEAD) commits)"
fi
exit 0
