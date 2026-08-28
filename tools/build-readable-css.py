# -*- coding: utf-8 -*-
"""
Generate css/readable.css.

Every font size on this site is written in px, so there is no single scale to
turn up. Instead we read the stylesheets, find every declaration below the
readable floor, and emit one override per selector at a larger size — plus a
second, opt-in tier for readers who want more.

Bands (patients here are typically 50-70; 9px and 10px text is not readable
for that audience, and most of it is the label telling them what a price is):
      <= 10.5px  ->  12.5px
   11 - 11.5px   ->  13px
   12 - 12.5px   ->  14px
   13 - 13.5px   ->  15px
The 'larger text' tier adds roughly 18% on top of everything.
"""
import re, os, glob

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSS = os.path.join(ROOT, "css")
OUT = os.path.join(CSS, "readable.css")

FLOOR = 14.0
def band(v):
    if v <= 10.5: return 12.5
    if v <= 11.5: return 13.0
    if v <= 12.5: return 14.0
    return 15.0

RULE = re.compile(r"([^{}]+)\{([^{}]*)\}", re.S)
FS = re.compile(r"font-size:\s*([0-9.]+)px", re.I)
LS = re.compile(r"letter-spacing:\s*([0-9.]+)em", re.I)

def collect():
    """selector -> (new size, original size, source file). Later files win, as they would in the cascade."""
    found = {}
    sources = [p for p in sorted(glob.glob(os.path.join(CSS, "*.css")))
               if os.path.basename(p) != "readable.css"]
    # Six pages keep their CSS in an inline <style> block rather than a file —
    # ask, book, book-call, hub-login, hub-portal and privacy. Missing those
    # left 29 pieces of sub-12px text on the ask page alone.
    inline = []
    for path in sorted(glob.glob(os.path.join(ROOT, "**", "*.html"), recursive=True)):
        rel = os.path.relpath(path, ROOT)
        if "_archive" in rel or "vendor" in rel:
            continue
        html = open(path, encoding="utf-8").read()
        for block in re.findall(r"(?is)<style[^>]*>(.*?)</style>", html):
            inline.append(block)

    for path in sources + inline:
        is_file = path in sources
        src = open(path, encoding="utf-8").read() if is_file else path
        src = re.sub(r"/\*.*?\*/", "", src, flags=re.S)
        # drop @media/@supports wrappers but keep the rules inside them
        src = re.sub(r"@(media|supports)[^{]*\{", "", src)
        for m in RULE.finditer(src):
            sel, body = m.group(1).strip(), m.group(2)
            if not sel or sel.startswith("@") or "%" in sel.split("{")[0][:4]:
                continue
            fs = FS.search(body)
            if not fs:
                continue
            v = float(fs.group(1))
            if v >= FLOOR:
                continue
            ls = LS.search(body)
            sel = " ".join(sel.split())
            found[sel] = (band(v), v,
                          os.path.basename(path) if is_file else "inline <style>",
                          float(ls.group(1)) if ls else None)
    return found

def main():
    found = collect()
    lines = []
    add = lines.append

    add("/* ═══════════════════════════════════════════════════════════════════════")
    add("   MEDMATCH GLOBAL — readability layer")
    add("   ───────────────────────────────────────────────────────────────────────")
    add("   Our patients are mostly between fifty and seventy and are reading about")
    add("   surgery, often on a phone. This file does three things:")
    add("")
    add("     1. Puts a floor under the type. Nothing that carries meaning is")
    add("        allowed below 12.5px; the site had text at 9px.")
    add("     2. Makes everything you can tap at least 44px tall.")
    add("     3. Gives keyboard and screen-reader users a focus ring they can see.")
    add("")
    add("   The design itself is untouched — same fonts, same colours, same layout.")
    add("   Sizes below were generated from the existing stylesheets, so a rule here")
    add("   exists only where the original was genuinely too small to read.")
    add("")
    add("   Load LAST, after every other stylesheet.")
    add("   ═══════════════════════════════════════════════════════════════════════ */")
    add("")
    add("/* ───────── 1. a floor under the type ───────── */")
    add("")

    by_size = {}
    for sel, (new, old, src, ls) in found.items():
        by_size.setdefault((old, new), []).append((sel, src))

    for (old, new) in sorted(by_size, key=lambda k: k[0]):
        sels = sorted(s for s, _ in by_size[(old, new)])
        add("/* was %gpx */" % old)
        add(",\n".join(sels) + " { font-size: %gpx; }" % new)
        add("")

    # letter-spacing: the brand's wide tracking is lovely at display size and
    # genuinely hard to read on a small all-caps label. Ease it only there.
    wide = sorted(sel for sel, (n, o, s, ls) in found.items() if ls and ls >= 0.3)
    if wide:
        add("/* ───────── 2. tracking on small capitals ─────────")
        add("   0.42em between letters reads as separate letters, not a word, once")
        add("   the type is this small. Eased, not removed — it is still the brand. */")
        add(",\n".join(wide) + " { letter-spacing: 0.26em; }")
        add("")

    add("""/* ───────── 3. anything you can tap is at least 44px ─────────
   Apple's and Google's own floor. Several nav links and chips were 31px,
   which is a real miss for anyone whose hands are less steady. */

.nav__links a,
.nav__brand,
.mmenu a,
.footer a,
.jump__chip,
.chat-chip,
.chat-panel__close,
.spotlight__cta,
.currency__btn,
.pkg__hbtn,
.tpanel__link,
.partner__link,
.btn:not(.nav__cta),
button:not(.u-bare):not(.nav__burger):not(.jump__menu),
select,
input[type="submit"],
input[type="button"] {
  min-height: 44px;
  display: inline-flex;
  align-items: center;
}
/* Three controls are deliberately hidden at some widths by the layout: the
   header CTA below 740px (the sticky bottom bar carries it there), the burger
   above 1400px, and the jump-bar burger above 900px. Because this file loads
   last, the blanket `display: inline-flex` above was outranking their own
   `display: none` and putting all three back on screen — on a phone that
   squeezed the real menu button to zero width and pushed it off the right
   edge, so the menu could not be opened at all. They are excluded above and
   given their height here, which leaves the layout's own display rule to win. */
.nav__cta { min-height: 44px; align-items: center; }
.jump__menu { min-height: 44px; }
/* and wherever the burger is on screen it keeps its full 44px — it is never
   the element that gives way when the row runs short of room */
.nav__burger { min-height: 44px; min-width: 44px; flex: 0 0 auto; }
/* The chat chips wrap their own padding and landed at 43px — one pixel short
   of the floor is still short. */
.chat-chip, .chat-panel__close { min-height: 44px; padding-block: 10px; }
.chat-panel__close { min-width: 44px; justify-content: center; }

/* Inline links inside a paragraph must NOT become 44px blocks — that would
   break the line box. They are exempt; the rule above is for standalone controls. */
p a, li a, .prose a, .answer a, td a, .i18n-notice a {
  min-height: 0;
  display: inline;
}

/* Form fields: room to hit, and 16px so iOS does not zoom the page on focus. */
input:not([type="checkbox"]):not([type="radio"]):not([type="range"]),
textarea,
select {
  min-height: 46px;
  font-size: 16px;
}
textarea { min-height: 92px; }

/* ───────── 4. a focus ring you can actually see ─────────
   Only nine focus rules existed across seven stylesheets. Someone navigating
   by keyboard could not tell where they were. */

:focus-visible {
  outline: 3px solid var(--turquoise, #2FA9A4);
  outline-offset: 3px;
  border-radius: 4px;
}
.btn:focus-visible,
button:focus-visible {
  outline: 3px solid var(--sea-deep, #06333B);
  outline-offset: 3px;
}

/* Skip link — the first thing a screen reader meets, invisible to everyone else. */
.skip-link {
  position: absolute; left: -9999px; top: 0; z-index: 10000;
  background: var(--sea-deep, #06333B); color: #fff;
  padding: 14px 22px; border-radius: 0 0 8px 0;
  font: 600 16px/1 var(--sans, system-ui, sans-serif);
}
.skip-link:focus { left: 0; }

/* ───────── 5. the reader's own choice ─────────
   Set by the A/A+ control in the header and remembered on this device.
   Layout is not touched, only type, so nothing can overflow. */

html.text-larger body { font-size: 18px; line-height: 1.7; }
html.text-larger p,
html.text-larger li,
html.text-larger td,
html.text-larger label,
html.text-larger .prose,
html.text-larger .answer p { font-size: 1.06em; line-height: 1.75; }
html.text-larger .hero__sub { font-size: 19px; }
""")

    # the opt-in tier, generated from the same table
    add("/* every size raised above, raised once more for the 'Larger' setting */")
    for (old, new) in sorted(by_size, key=lambda k: k[0]):
        sels = sorted("html.text-larger " + s for s, _ in by_size[(old, new)])
        add(",\n".join(sels) + " { font-size: %gpx; }" % round(new * 1.18, 1))
        add("")

    # Sections 4-6 are written by hand rather than derived from the stylesheets:
    # they are the layout consequences of everything above (raising type and
    # growing tap targets makes rows that used to fit stop fitting), plus the
    # overflow that `body { overflow-x: hidden }` had been hiding. They live in
    # tools/_readable_tail.css so that regenerating this file keeps them instead
    # of silently dropping them. Verify with: node tools/mobile-audit.mjs
    tail_path = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                             "_readable_tail.css")
    if os.path.exists(tail_path):
        add(open(tail_path, encoding="utf-8").read().rstrip("\n"))
    else:
        print("WARNING: %s is missing - the mobile layout fixes were NOT emitted"
              % tail_path)

    # CRLF, because that is what the committed file uses — writing LF here would
    # make every regeneration look like a rewrite of all 900 lines.
    open(OUT, "w", encoding="utf-8", newline="\r\n").write("\n".join(lines) + "\n")
    print("wrote %s" % OUT)
    print("selectors raised: %d" % len(found))
    from collections import Counter
    c = Counter(o for (o, n) in by_size for _ in by_size[(o, n)])
    for size in sorted(c):
        print("   %gpx -> %gpx   (%d selectors)" % (size, band(size), c[size]))
    print("size: %.1f KB" % (os.path.getsize(OUT) / 1024))

if __name__ == "__main__":
    main()
