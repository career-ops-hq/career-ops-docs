#!/usr/bin/env python3
"""Rebuild the Chinese font the /zh docs share cards render with.

The cards (src/app/og/docs/[...slug]/route.tsx) are drawn at build time by
next/og, whose only bundled font is Latin. For Han characters next/og would
fetch Noto Sans SC from Google Fonts while prerendering; that kind of fetch
timed out on Vercel and aborted two deploys (#190), and when it fails the card
ships with empty boxes and no error. So the glyphs ship in the repo instead:
Noto Sans SC Regular, cut down to GB2312 level 1 (the 3,755 most common
Simplified characters) plus every character the Chinese pages and home use
today, plus ASCII and CJK punctuation.

Run it again only if a Chinese title gains a character outside that set (the
build would then fall back to the network fetch for that one character):

  pip install fonttools
  curl -LO 'https://github.com/google/fonts/raw/main/ofl/notosanssc/NotoSansSC%5Bwght%5D.ttf'
  python3 scripts/subset-zh-og-font.py 'NotoSansSC[wght].ttf'

Licence: SIL Open Font License 1.1 (src/app/_fonts/og-zh/OFL.txt). The reserved
font name is "Source", which this file does not use.
"""
import glob
import sys

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

OUT = 'src/app/_fonts/og-zh/NotoSansSC-Regular-og.ttf'


def gb2312_level1():
    chars = set()
    for hi in range(0xB0, 0xD8):
        for lo in range(0xA1, 0xFF):
            try:
                chars.add(bytes([hi, lo]).decode('gb2312'))
            except UnicodeDecodeError:
                pass
    return chars


def used_chars():
    chars = set()
    files = glob.glob('content/docs/**/*.zh.mdx', recursive=True) + glob.glob('content/docs/**/meta.zh.json', recursive=True)
    files += ['src/app/_home/home-zh.tsx', 'src/app/zh/(home)/page.tsx']
    for f in files:
        with open(f, encoding='utf-8') as fh:
            chars.update(fh.read())
    return {c for c in chars if ord(c) >= 0x20}


def main(src):
    text = gb2312_level1() | used_chars()
    text |= {chr(c) for c in range(0x20, 0x7F)}            # ASCII
    text |= {chr(c) for c in range(0x3000, 0x3040)}         # CJK punctuation
    text |= {chr(c) for c in range(0xFF01, 0xFF5F)}         # full-width forms
    text |= set('“”‘’…—–·•→←×÷°')
    font = TTFont(src)
    if 'fvar' in font:
        font = instancer.instantiateVariableFont(font, {'wght': 400}, updateFontNames=True)
    opts = subset.Options()
    opts.layout_features = ['*']
    opts.name_IDs = ['*']
    opts.notdef_outline = True
    sub = subset.Subsetter(opts)
    sub.populate(text=''.join(sorted(text)))
    sub.subset(font)
    # Keep the source's timestamp, so a rerun with the same characters writes
    # the same bytes (no churn in git).
    font.recalcTimestamp = False
    font.save(OUT)
    print(f'{OUT}: {len(font.getGlyphOrder())} glyphs')


if __name__ == '__main__':
    main(sys.argv[1])
