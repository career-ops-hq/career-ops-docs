#!/usr/bin/env bash
# OG image generator for /compare/[slug] pages.
#
# Produces the canonical "career-ops vs <Competitor>" 1200x630 split image
# with career-ops landing (dark mode) on the left and competitor landing
# on the right. Visible margins (50px each side per screenshot) ensure
# breathing room from the central dark/white split divider.
#
# This template is locked. Only three things change per comparison:
#   1. Competitor display name (the wordmark on the right panel)
#   2. Competitor tagline (the italic line under the wordmark, e.g.
#      "$49.95/mo · cloud SaaS")
#   3. Competitor screenshot (the right panel image)
#
# Everything else — dimensions, fonts, point sizes, positions, shadows,
# colors — stays identical for visual consistency across all comparison
# pages.
#
# ──────────────────────────────────────────────────────────────────────
#
# Prerequisites
# -------------
# 1. ImageMagick installed (`brew install imagemagick`)
# 2. Competitor screenshot captured at 1280x900 viewport, cookie banners
#    dismissed. Capture instructions in templates/README.md.
# 3. Run this script from the repo root.
#
# Usage
# -----
#   ./templates/og-compare-generator.sh \
#     <slug> \
#     <Competitor Display Name> \
#     <competitor screenshot path> \
#     <competitor tagline>
#
# Example (jobscan)
# -----------------
#   ./templates/og-compare-generator.sh \
#     jobscan \
#     Jobscan \
#     templates/assets/screenshots/jobscan-home-clean.png \
#     '$49.95/mo · cloud SaaS'
#
# Output
# ------
#   public/og/compare/career-ops-vs-<slug>.jpg  (1200x630, ~150KB JPEG)
#
# ──────────────────────────────────────────────────────────────────────

set -euo pipefail

if [[ $# -ne 4 ]]; then
  echo "Usage: $0 <slug> <CompetitorName> <competitor-screenshot-path> <competitor-tagline>"
  echo ""
  echo "Example:"
  echo "  $0 teal Teal templates/assets/screenshots/teal-home-clean.png '\$15/mo · cloud SaaS'"
  exit 1
fi

SLUG="$1"
COMPETITOR_NAME="$2"
COMPETITOR_SCREENSHOT="$3"
COMPETITOR_TAGLINE="$4"

# Canonical assets (do not move without updating this script)
REPO_ROOT="$(git rev-parse --show-toplevel)"
CAREER_OPS_SCREENSHOT="$REPO_ROOT/templates/assets/screenshots/career-ops-home-dark.png"
FONT_REGULAR="$REPO_ROOT/templates/assets/fonts/InstrumentSerif-Regular.ttf"
FONT_ITALIC="$REPO_ROOT/templates/assets/fonts/InstrumentSerif-Italic.ttf"

# Locked career-ops tagline (only changes if pricing model changes globally)
CAREER_OPS_TAGLINE='$0 · MIT · runs on your machine'

OUTPUT="$REPO_ROOT/public/og/compare/career-ops-vs-$SLUG.jpg"
mkdir -p "$(dirname "$OUTPUT")"

# Validate inputs
for f in "$CAREER_OPS_SCREENSHOT" "$COMPETITOR_SCREENSHOT" "$FONT_REGULAR" "$FONT_ITALIC"; do
  if [[ ! -f "$f" ]]; then
    echo "ERROR: missing required file: $f" >&2
    exit 1
  fi
done

# ──────────────────────────────────────────────────────────────────────
# Locked layout constants — do not edit per comparison.
# Visual specification documented in templates/README.md.
# ──────────────────────────────────────────────────────────────────────
CANVAS_W=1200
CANVAS_H=630
PANEL_W=600
SCREENSHOT_W=500          # 50px margin each side of each screenshot
SCREENSHOT_Y=200          # vertical position of screenshots
WORDMARK_SIZE=52
TAGLINE_SIZE=22
WORDMARK_Y=60
TAGLINE_Y=135
LEFT_X=50                 # wordmark + screenshot left edge on left panel
RIGHT_X=650               # wordmark + screenshot left edge on right panel
DARK_BG='#0a0a0a'
LIGHT_BG='#ffffff'
DARK_TEXT='#fafafa'
LIGHT_TEXT='#0a0a0a'

magick -size "${CANVAS_W}x${CANVAS_H}" "xc:${DARK_BG}" \
  \( -size "${PANEL_W}x${CANVAS_H}" "xc:${LIGHT_BG}" \) -geometry "+${PANEL_W}+0" -composite \
  \( "$CAREER_OPS_SCREENSHOT" -resize "${SCREENSHOT_W}x" \
     \( +clone -background '#000000cc' -shadow 50x14+0+8 \) +swap \
     -background none -layers merge +repage \) \
    -gravity northwest -geometry "+${LEFT_X}+${SCREENSHOT_Y}" -composite \
  \( "$COMPETITOR_SCREENSHOT" -resize "${SCREENSHOT_W}x" \
     \( +clone -background '#00000033' -shadow 50x14+0+8 \) +swap \
     -background none -layers merge +repage \) \
    -gravity northwest -geometry "+${RIGHT_X}+${SCREENSHOT_Y}" -composite \
  -font "$FONT_REGULAR" -pointsize "$WORDMARK_SIZE" -fill "$DARK_TEXT" \
    -gravity northwest -annotate "+${LEFT_X}+${WORDMARK_Y}" 'career-ops' \
  -font "$FONT_REGULAR" -pointsize "$WORDMARK_SIZE" -fill "$LIGHT_TEXT" \
    -gravity northwest -annotate "+${RIGHT_X}+${WORDMARK_Y}" "$COMPETITOR_NAME" \
  -font "$FONT_ITALIC" -pointsize "$TAGLINE_SIZE" -fill "${DARK_TEXT}bb" \
    -gravity northwest -annotate "+${LEFT_X}+${TAGLINE_Y}" "$CAREER_OPS_TAGLINE" \
  -font "$FONT_ITALIC" -pointsize "$TAGLINE_SIZE" -fill "${LIGHT_TEXT}bb" \
    -gravity northwest -annotate "+${RIGHT_X}+${TAGLINE_Y}" "$COMPETITOR_TAGLINE" \
  -quality 92 "$OUTPUT"

echo "✓ Generated $OUTPUT"
echo "  Dimensions: ${CANVAS_W}x${CANVAS_H}"
echo "  Filesize: $(du -h "$OUTPUT" | cut -f1)"
