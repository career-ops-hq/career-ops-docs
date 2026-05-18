# Templates — reusable scaffolding for career-ops.org

This directory holds the locked patterns for content that repeats across the site. The point is consistency: every comparison page looks identical structurally, every OG image is composed the same way, every blog post follows the same frontmatter shape.

Changing a template is a deliberate act. Adding a new entry that uses an existing template is a one-line act.

## Current templates

### `og-compare-generator.sh`

Generates the canonical 1200×630 split image for every `/compare/[slug]` page. Career-ops landing (dark mode) on the left, competitor landing on the right, dark/white split with 50px margins everywhere for breathing room.

**The locked specification** (do not change per comparison):
- Canvas: 1200 × 630 (Open Graph standard)
- Left panel: 0–600px, background `#0a0a0a`
- Right panel: 600–1200px, background `#ffffff`
- Screenshots: 500px wide each, 50px margins on all sides relative to their panels (visible breathing room at the central split)
- Wordmark: Instrument Serif Regular 52pt, white on left / black on right
- Tagline: Instrument Serif Italic 22pt, 70% opacity
- Career-ops tagline (locked): `$0 · MIT · runs on your machine`
- Sutil shadow: 50×14+0+8 with translucent black

**Three things change per comparison:**
1. Competitor display name (right wordmark)
2. Competitor tagline (italic line under wordmark)
3. Competitor screenshot (right panel image)

**Usage:**
```bash
./templates/og-compare-generator.sh \
  <slug> \
  <CompetitorName> \
  <competitor-screenshot-path> \
  '<competitor-tagline>'
```

Output: `public/og/compare/career-ops-vs-<slug>.jpg`.

### Capturing competitor screenshots

All competitor screenshots must match `templates/assets/screenshots/career-ops-home-dark.png` in viewport and orientation for visual parity.

**Required capture spec:**
- Viewport: **1280 × 900** (matches the career-ops capture)
- Browser: any Chromium-based; Playwright recommended for reproducibility
- Cookie banners and overlays: **dismissed before screenshot**
- Format: PNG, full viewport (not full page)

**Playwright workflow** (the one we use in this repo via the playwright MCP):
```
browser_resize 1280x900
browser_navigate https://competitor.example.com/
browser_click "Accept cookies" (or equivalent)
browser_wait_for 2s
browser_take_screenshot competitor-home-clean.png
```

Save the resulting PNG to `templates/assets/screenshots/<competitor>-home-clean.png` so future regenerations work from a stable asset.

## Workflow for a new comparison page

1. Capture competitor screenshot per the spec above → save to `templates/assets/screenshots/`
2. Append a new object to `src/lib/data/comparisons.json` with: `slug`, `competitor` block, `intro`, `features`, `verdict`, `faq`. Use the existing `career-ops-vs-jobscan` entry as the structural reference.
3. Run the OG generator:
   ```bash
   ./templates/og-compare-generator.sh <slug> <Name> <screenshot-path> '<tagline>'
   ```
4. Append the new URL to `.github/workflows/indexnow.yml` `urlList`.
5. Build, typecheck, push.
6. Sitemap auto-includes the new entry (driven by `comparisons.json`). Sustain page schema auto-handles the comparison schema (driven by the data).

## Content quality

Every new comparison page passes through `/tech-translate` skill before commit. The intro, verdict, FAQ answers, and verdict headline all need the same builder-silencioso tone as the existing jobscan entry. Avoid hype verbs ("transform", "10x"), avoid passive-aggressive framing, keep the matrix honest (acknowledge what the competitor does well).

## Assets

- `assets/fonts/InstrumentSerif-Regular.ttf` — wordmark font
- `assets/fonts/InstrumentSerif-Italic.ttf` — tagline font
- `assets/screenshots/career-ops-home-dark.png` — canonical career-ops landing, 1280×900, dark mode
- `assets/screenshots/<competitor>-home-clean.png` — each competitor's clean landing capture
