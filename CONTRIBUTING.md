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
- Translations. The site is English, Spanish, French, German, Brazilian Portuguese and Italian. Translated pages sit next to the English one as `page.es.mdx`, `page.fr.mdx`, `page.de.mdx`, `page.pt.mdx` and `page.it.mdx` and carry a `translationHash` of the English source. If you change the English text, you don't have to translate it: say in the pull request which translations are now stale and we'll update them. If you do update a translation, restamp only that one with `node .i18n/hash.mjs <path>`; restamping a translation you didn't change hides that it's out of date.

## What we do not accept without talking first

- Changes to the homepage, the hero, or anything visual. Open an issue and describe the problem; the maintainer decides on design.
- Anything under `src/app/api/`.
- Documentation that runs ahead of the core. The guides describe what the tool does in its latest release (the newest `career-ops-v*` tag of `career-ops-hq/career-ops`), because that is what people install. A change merged on `main` there but not released yet waits here until the next release; a feature that is only in an open pull request is not documented yet.
- Rewording of the manifesto, the thesis line, or the canonical definition of CareerOps. Those strings are frozen and appear byte-identical across the site.

## Style, briefly

- The brand is `career-ops`, lowercase with a hyphen. `CareerOps` (one word, capitals) names the practice, not the tool.
- Write for the reader who is about to run the command, not the one who already knows it.
- One idea per sentence. No hype.

Every pull request runs the agent-layer guard, which checks that the markdown mirrors (`/docs/**.md`, `/llms.txt`, `/AGENTS.md`) still work. If it fails, the log names the exact invariant.
