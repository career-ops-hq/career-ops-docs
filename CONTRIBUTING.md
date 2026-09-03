# Contributing to career-ops.org

This repository is the documentation site for [career-ops](https://github.com/career-ops-hq/career-ops). The tool itself lives in the core repo; this is where its guides, reference pages and landing pages are written.

## Run it locally

```bash
npm ci          # postinstall runs fumadocs-mdx (first-party, generates the content index)
npm run dev     # http://localhost:3000
```

Before opening a pull request:

```bash
npm run types:check
npm run build
```

The build is the real check: a page that renders in `dev` can still fail the production build.

## What we accept

- Fixes to guides and reference pages when the core has changed and the docs did not.
- Typos, broken links, clearer wording, missing steps.
- Translations. The site is English, Spanish and French. Translated pages sit next to the English one as `page.es.mdx` and `page.fr.mdx` and carry a `translationHash` of the English source; if you change the English text, restamp it with `node .i18n/hash.mjs <path>` in the same pull request or say the translations are now stale.

## What we do not accept without talking first

- Changes to the homepage, the hero, or anything visual. Open an issue and describe the problem; the maintainer decides on design.
- Anything under `src/app/api/`.
- Documentation that runs ahead of the core. The guides describe what the tool does today, as shipped on `main` of `career-ops-hq/career-ops`; a feature that is only in an open pull request there is not documented here yet.
- Rewording of the manifesto, the thesis line, or the canonical definition of CareerOps. Those strings are frozen and appear byte-identical across the site.

## Style, briefly

- The brand is `career-ops`, lowercase with a hyphen. `CareerOps` (one word, capitals) names the practice, not the tool.
- Write for the reader who is about to run the command, not the one who already knows it.
- One idea per sentence. No hype.

Every pull request runs the agent-layer guard, which checks that the markdown mirrors (`/docs/**.md`, `/llms.txt`, `/AGENTS.md`) still work. If it fails, the log names the exact invariant.
