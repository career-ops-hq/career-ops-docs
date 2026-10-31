#!/usr/bin/env node
// Regenerates the data blocks of /docs/reference/plugins and
// /docs/reference/commands from a checkout of the core repository, pinned to
// one commit. Nothing in those blocks is typed by hand: plugins come from
// plugins-registry/*.json, the job boards by country from providers/ (authors
// from the commit that added each file), and the commands from the Usage block
// of the core README.
//
// Why a snapshot and not a fetch at build time: the agent-facing .md mirror
// serves the raw MDX, so a table rendered by a component would be missing
// from it, and a reviewer could not read the published text in the diff. The
// date printed on the page is the date of the core commit the snapshot was
// read from, never the build date (stats.ts: a figure carries the date of the
// read that produced it).
//
// Usage:
//   GH_TOKEN=$(gh auth token) node scripts/community-snapshot.mjs <core-checkout>
//
// The checkout must be a git clone of career-ops-hq/career-ops at the commit
// you want to publish (normally main on the day of the PR). Put the printed
// sha in the commit message.
import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const CORE = process.argv[2];
if (!CORE) {
  console.error('usage: node scripts/community-snapshot.mjs <core-checkout>');
  process.exit(2);
}
const REPO_URL = 'https://github.com/career-ops-hq/career-ops';
const git = (...args) => execFileSync('git', ['-C', CORE, ...args], { encoding: 'utf8' }).trim();

const SHA = git('rev-parse', 'HEAD');
const SHORT = SHA.slice(0, 7);
const DATE = git('log', '-1', '--format=%cs', 'HEAD');
const fmtDate = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });

// GitHub login of the author of a commit. The commit author name is not a
// GitHub handle, so the API answers that; without a login the row goes without
// an author rather than with a guessed one.
async function loginOf(commit) {
  const headers = { Accept: 'application/vnd.github+json' };
  if (process.env.GH_TOKEN) headers.Authorization = `Bearer ${process.env.GH_TOKEN}`;
  const res = await fetch(`https://api.github.com/repos/career-ops-hq/career-ops/commits/${commit}`, { headers });
  if (!res.ok) return null;
  const body = await res.json();
  return body.author?.login ?? null;
}
const addedBy = async (path) => {
  const commits = git('log', '--diff-filter=A', '--format=%H %cs', '--', path).split('\n').filter(Boolean);
  if (!commits.length) return { login: null, date: null };
  const [commit, date] = commits.at(-1).split(' ');
  return { login: await loginOf(commit), date };
};
const person = (login) => (login ? `[@${login}](https://github.com/${login})` : '');
const cell = (s) => String(s).replace(/\|/g, '\\|').replace(/\s+/g, ' ').trim();
// Prose cells are MDX, where `{` opens an expression and `<` a tag: the README
// line for `cover` carries a literal `{slug}`. Code cells keep their braces.
const prose = (s) => cell(s).replace(/[{}<]/g, (c) => `\\${c}`);
// Registry descriptions are the authors' own words and are kept as written,
// with one exception: the site publishes no em dash (house style), so an
// em dash used as a separator becomes a colon.
const plain = (s) => prose(s).replace(/\s*\u2014\s*/g, ': ');
// Descriptions that cannot be published as written, by plugin id, each with
// its reason. Re-check them when the registry entry changes.
const DESCRIPTION_OVERRIDES = {
  // The site does not name that accelerator in public copy (venture-ops).
  'startup-boards': 'Opt-in scanner provider for startup job boards such as Getro and Consider.',
};

// ---------------------------------------------------------------- plugins
const regDir = join(CORE, 'plugins-registry');
const plugins = readdirSync(regDir)
  .filter((f) => f.endsWith('.json'))
  .sort()
  .map((f) => {
    const p = JSON.parse(readFileSync(join(regDir, f), 'utf8'));
    // The repo owner is the author when the entry has no `author` field: the
    // registry links the plugin's own repository, so its owner is who
    // publishes it.
    const owner = new URL(p.repo).pathname.split('/')[1];
    return { file: `plugins-registry/${f}`, ...p, author: p.author || owner };
  });
for (const p of plugins) {
  const commits = git('log', '--diff-filter=A', '--format=%cs', '--', p.file).split('\n').filter(Boolean);
  p.listed = commits.at(-1) ?? null;
}
const pluginAuthors = new Set(plugins.map((p) => p.author.toLowerCase()));

// --------------------------------------------------------- job boards
// Boards whose market the core's own SUPPORTED_JOB_BOARDS.md names. A board
// without a stated market is not placed in a country here (it stays in the
// full list linked from the page). Regions only where the core names a
// region, not a country.
// Per-tenant ATS platforms (PrevueAPS, HiringRoom) are not job boards even
// when the core names their market, so they stay out (venture-ops, 23 Oct).
const BOARDS = [
  // [group, board, providerPath, one line from the core's own description]
  ['Belgium', 'VDAB', 'providers/vdab.mjs', 'Public employment service of Flanders'],
  ['Brazil', 'Gupy', 'providers/gupy.mjs', 'Search across the thousands of employers hosted on the Gupy ATS'],
  ['Canada', 'Job Bank', 'providers/jobbankca.mjs', 'The federal job-search service'],
  ['Germany', 'Arbeitsagentur', 'providers/arbeitsagentur.mjs', 'The federal employment agency job search'],
  ['Germany', 'Interamt.de', 'scan-interamt.mjs', 'Federal, state and municipal public-sector jobs'],
  ['Mexico', 'OCC Mundial', 'providers/occ.mjs', 'The largest general job board in Mexico'],
  ['Poland', 'Just Join IT', 'providers/justjoin.mjs', 'Tech roles in Poland and the EU'],
  ['Poland', 'No Fluff Jobs', 'providers/nofluffjobs.mjs', 'Tech roles in Poland and the EU'],
  ['Senegal', 'Senjob', 'providers/senjob.mjs', 'Dakar and the regions'],
  ['Singapore', 'MyCareersFuture', 'providers/mycareersfuture.mjs', 'The national job bank'],
  ['Spain', 'getManfred', 'providers/manfred.mjs', 'Tech roles in Spain and the EU, with published salary ranges'],
  ['Sweden', 'Platsbanken', 'providers/platsbanken.mjs', 'The national public employment service'],
  ['Switzerland', 'joinup.ch', 'providers/joinup.mjs', 'Swiss startup jobs'],
  ['Switzerland', 'Remotli', 'providers/remotli.mjs', 'Remote roles at Swiss companies, paid in CHF'],
  ['Taiwan', 'Yourator', 'providers/yourator.mjs', 'Startup and digital roles'],
  ['United States', 'Built In', 'providers/builtin.mjs', 'Tech roles, with a board per city'],
  ['Vietnam', 'ITviec', 'providers/itviec.mjs', 'The largest IT job board in Vietnam'],
  ['Vietnam', 'CareerViet', 'providers/careerviet.mjs', 'Broad-coverage board'],
  ['Europe', 'Arbeitnow', 'providers/arbeitnow.mjs', 'EU and DACH roles, newest first'],
  ['Europe', 'Landing.jobs', 'providers/landingjobs.mjs', 'Tech roles in Europe'],
  ['Latin America', 'Get on Board', 'providers/getonbrd.mjs', 'Remote and Latin American tech roles'],
  ['Nordics', 'The Hub', 'providers/thehub.mjs', 'Nordic and EU startups'],
  ['South-East Asia', 'Kalibrr', 'providers/kalibrr.mjs', 'Mostly Indonesia, then the Philippines and Thailand'],
  ['South-East Asia', 'Tech in Asia', 'providers/techinasia.mjs', 'Startup roles, mostly Indonesia'],
  ['South-East Asia, Australia and New Zealand', 'Jobstreet and SEEK', 'providers/jobstreet.mjs', 'One provider for the Jobstreet and SEEK sites'],
];
const boards = [];
for (const [group, name, path, line] of BOARDS) {
  const { login } = await addedBy(path);
  if (!git('ls-files', path)) throw new Error(`${path} is not in the core at ${SHORT}`);
  boards.push({ group, name, path, line, login });
}

// Provider modules in the core: every non-helper .mjs in providers/, minus
// the ones the core's list marks as retired.
const supported = readFileSync(join(CORE, 'docs/SUPPORTED_JOB_BOARDS.md'), 'utf8');
const retired = (supported.match(/^\| [^|]+\| \*\*Retired/gm) || []).length;
const providerModules =
  readdirSync(join(CORE, 'providers')).filter((f) => f.endsWith('.mjs') && !f.startsWith('_')).length - retired;
// Public copy says "more than 100", never the exact count: providers/ and the
// supported list give two legitimate totals and both move with every merge
// (search-ops rule, 23 Oct). The exact number only goes to the log below.
if (providerModules <= 100) throw new Error(`${providerModules} providers: "more than 100" no longer holds, decide the wording first`);

// ------------------------------------------------------------- commands
const readme = readFileSync(join(CORE, 'README.md'), 'utf8');
const usage = readme.split(/^## Usage$/m)[1]?.split(/^## /m)[0] ?? '';
const block = usage.match(/```\n([\s\S]*?)```/)?.[1] ?? '';
const commands = block
  .split('\n')
  .map((l) => l.match(/^(\/career-ops(?: \S+)?)\s+→\s+(.+)$/))
  .filter(Boolean)
  .map(([, cmd, what]) => ({ cmd: cmd.trim(), what: what.trim() }));
if (commands.length < 10) throw new Error(`only ${commands.length} commands parsed from the README Usage block`);

// Commands with their own reference page on this site.
const MODE_PAGES = {
  '/career-ops {JD}': 'auto-pipeline',
  '/career-ops pipeline': 'pipeline',
  '/career-ops apply': 'apply',
  '/career-ops oferta': 'oferta',
  '/career-ops ofertas': 'ofertas',
  '/career-ops contacto': 'contacto',
  '/career-ops deep': 'deep',
  '/career-ops interview-prep': 'interview-prep',
  '/career-ops pdf': 'pdf',
  '/career-ops training': 'training',
  '/career-ops project': 'project',
  '/career-ops tracker': 'tracker',
  '/career-ops patterns': 'patterns',
  '/career-ops followup': 'followup',
};
for (const c of commands) c.page = MODE_PAGES[c.cmd] ?? null;
const missingPages = Object.keys(MODE_PAGES).filter((k) => !commands.some((c) => c.cmd === k));
if (missingPages.length) throw new Error(`mode pages whose command left the README: ${missingPages.join(', ')}`);

// --------------------------------------------------------------- render
const asOf = `as of ${fmtDate(DATE)}, core commit [${SHORT}](${REPO_URL}/tree/${SHA})`;

const numbers = [
  `**By the numbers** (${asOf}):`,
  `${plugins.length} community plugins in the registry, by ${pluginAuthors.size} authors;`,
  'more than 100 job source providers in the core scanner.',
].join(' ');

const pluginRows = plugins.map(
  (p) =>
    `| [${cell(p.id)}](${p.repo}) | ${person(p.author)} | ${plain(DESCRIPTION_OVERRIDES[p.id] ?? p.description)} | ${p.hooks.map((h) => `\`${h}\``).join(', ')} | ${p.listed ? fmtDate(p.listed) : ''} |`,
);
const pluginTable = [
  '| Plugin | Author | What it does | Hooks | Listed |',
  '| --- | --- | --- | --- | --- |',
  ...pluginRows,
].join('\n');

const groups = [...new Set(boards.map((b) => b.group))];
const boardTable = [
  '| Market | Board | What it covers | Added by |',
  '| --- | --- | --- | --- |',
  ...groups.flatMap((g) =>
    boards
      .filter((b) => b.group === g)
      .map((b) => `| ${g} | [${cell(b.name)}](${REPO_URL}/blob/${SHA}/${b.path}) | ${prose(b.line)} | ${person(b.login)} |`),
  ),
].join('\n');

const commandTable = [
  '| Command | What it does | Reference |',
  '| --- | --- | --- |',
  ...commands.map(
    (c) =>
      `| \`${cell(c.cmd)}\` | ${prose(c.what)} | ${c.page ? `[${c.page}](/docs/reference/modes/${c.page})` : ''} |`,
  ),
].join('\n');

function replaceBlock(file, name, body) {
  const text = readFileSync(file, 'utf8');
  const re = new RegExp(`(\\{/\\* generated:${name}:start[^*]*\\*/\\}\\n)[\\s\\S]*?(\\{/\\* generated:${name}:end \\*/\\})`);
  if (!re.test(text)) throw new Error(`${file}: no generated:${name} block`);
  writeFileSync(file, text.replace(re, `$1${body}\n$2`));
}

const PLUGINS = 'content/docs/reference/plugins.mdx';
const COMMANDS = 'content/docs/reference/commands.mdx';
replaceBlock(PLUGINS, 'numbers', numbers);
replaceBlock(PLUGINS, 'plugins', pluginTable);
replaceBlock(PLUGINS, 'boards', boardTable);
replaceBlock(COMMANDS, 'source', `The list below is the Usage block of the core README (${asOf}).`);
replaceBlock(COMMANDS, 'commands', commandTable);

const noAuthor = boards.filter((b) => !b.login).map((b) => b.name);
console.log(`core ${SHORT} (${DATE}): ${plugins.length} plugins, ${pluginAuthors.size} authors, ${providerModules} providers, ${boards.length} boards, ${commands.length} commands`);
if (noAuthor.length) console.log(`boards without a verified author: ${noAuthor.join(', ')}`);
