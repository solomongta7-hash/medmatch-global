# -*- coding: utf-8 -*-
"""
MedMatch i18n tagger.

Finds every translatable leaf block on a page and injects a content-addressed
data-i18n key.  Injection is done by byte offset into the raw source, so the
file is byte-identical apart from the attributes we add.

Key = 8 hex chars of md5(normalised English).  Identical copy anywhere on the
site therefore shares one key -- nav and footer collapse to a single entry
instead of 38 copies.
"""
import re, os, sys, json, hashlib
from bs4 import BeautifulSoup, NavigableString, Comment, Tag

SKIP_ANCESTORS = {"script", "style", "svg", "code", "pre", "noscript", "template", "title"}
BLOCK_TAGS = {"h1","h2","h3","h4","h5","h6","p","ul","ol","li","div","section","article",
              "header","footer","nav","aside","main","table","thead","tbody","tfoot","tr",
              "td","th","form","figure","figcaption","blockquote","details","summary",
              "dl","dt","dd","select","fieldset","picture","video","canvas","iframe"}
TEXT_TAGS = {"h1","h2","h3","h4","h5","h6","p","li","a","span","strong","em","b","i","u",
             "button","label","td","th","figcaption","blockquote","summary","dt","dd",
             "small","div","legend","caption","cite","q","address","abbr","time","mark"}
ATTR_NAMES = ("placeholder", "aria-label", "title", "alt")

HAS_LETTER = re.compile(r"[A-Za-z]")
# strings that are only numbers / currency / punctuation carry no language
NUM_ONLY = re.compile(r"^[\s\d\W_]*$")

def norm(s):
    return re.sub(r"\s+", " ", s).strip()

def key_of(s):
    return hashlib.md5(norm(s).encode("utf-8")).hexdigest()[:8]

def text_of(el):
    out = []
    for d in el.descendants:
        if isinstance(d, Comment):
            continue
        if isinstance(d, NavigableString):
            if d.parent.name in SKIP_ANCESTORS:
                continue
            out.append(str(d))
    return "".join(out)

def in_skip(el):
    return any(p.name in SKIP_ANCESTORS for p in el.parents)

def has_block_child(el):
    """True if a block element sits anywhere below, not just one level down.

    Checking only direct children let a <div> wrapping two <a> cards swallow
    the whole card block into one 786-character string. Looking all the way
    down makes the tagger descend to the headings and paragraphs instead."""
    return any(isinstance(c, Tag) and c.name in BLOCK_TAGS for c in el.descendants)

def direct_text(el):
    return any(isinstance(c, NavigableString) and not isinstance(c, Comment) and c.strip()
               for c in el.children)

def targets(el, depth=0):
    """Deepest elements that wrap a contiguous run of translatable text."""
    if depth > 8:
        return [el]
    kids = [c for c in el.children
            if isinstance(c, Tag) and c.name not in SKIP_ANCESTORS and text_of(c).strip()]
    if not direct_text(el):
        # decoration-only siblings (svg, img, icons) fall away here
        if len(kids) == 1 and kids[0].name in TEXT_TAGS and not has_block_child(kids[0]):
            return targets(kids[0], depth + 1)
        if len(kids) > 1 and all(k.name in TEXT_TAGS and not has_block_child(k) for k in kids):
            out = []
            for k in kids:
                out.extend(targets(k, depth + 1))
            return out
    return [el]

def collect(path):
    src = open(path, encoding="utf-8").read()
    soup = BeautifulSoup(src, "html.parser")

    picked, claimed = [], set()
    for el in soup.find_all(True):
        if el.name not in TEXT_TAGS or in_skip(el):
            continue
        if has_block_child(el):
            continue
        if any(id(p) in claimed for p in el.parents):
            continue
        if not text_of(el).strip():
            continue
        for t in targets(el):
            if id(t) in claimed or any(id(p) in claimed for p in t.parents):
                continue
            txt = text_of(t)
            if not txt.strip() or not HAS_LETTER.search(txt) or NUM_ONLY.match(txt):
                continue
            if t.sourceline is None:
                continue
            # never translate the language menu itself
            if t.name == "option" and t.find_parent(id="langSelect"):
                continue
            claimed.add(id(t))
            picked.append({"el": t, "html": t.decode_contents(),
                           "line": t.sourceline, "pos": t.sourcepos})

    attrs = []
    for el in soup.find_all(True):
        if in_skip(el) or el.sourceline is None:
            continue
        for a in ATTR_NAMES:
            v = el.get(a)
            if isinstance(v, list):
                v = " ".join(v)
            if v and HAS_LETTER.search(v) and len(v.strip()) > 2 and not NUM_ONLY.match(v):
                attrs.append({"el": el, "attr": a, "val": v.strip(),
                              "line": el.sourceline, "pos": el.sourcepos})
    return src, picked, attrs

def line_offsets(src):
    offs, run = [], 0
    for ln in src.split("\n"):
        offs.append(run)
        run += len(ln) + 1
    return offs

def apply_tags(path, write=False):
    src, picked, attrs = collect(path)
    offs = line_offsets(src)

    edits = []   # (abs_pos_of_tag_open, attribute_string)
    strings = {}

    for p in picked:
        k = key_of(p["html"])
        strings[k] = norm(p["html"])
        edits.append((offs[p["line"] - 1] + p["pos"], p["el"].name, ' data-i18n="%s"' % k))

    attr_map = {}
    for a in attrs:
        k = key_of(a["val"])
        strings[k] = norm(a["val"])
        attr_map.setdefault((a["line"], a["pos"], a["el"].name), []).append((a["attr"], k))
    for (line, pos, name), lst in attr_map.items():
        spec = ",".join("%s:%s" % (at, kk) for at, kk in lst)
        edits.append((offs[line - 1] + pos, name, ' data-i18n-attr="%s"' % spec))

    # apply from the end so earlier offsets stay valid
    out = src
    for pos, name, add in sorted(edits, key=lambda e: -e[0]):
        # pos points at '<'; insert straight after the tag name
        at = pos + 1 + len(name)
        if out[pos] != "<" or out[pos + 1:at] != name:
            raise SystemExit("offset mismatch in %s at %d (%r)" % (path, pos, out[pos:pos + 20]))
        if "data-i18n" in out[at:out.index(">", at)] and "data-i18n-attr" not in add:
            continue
        out = out[:at] + add + out[at:]

    if write:
        open(path, "w", encoding="utf-8", newline="").write(out)
    return strings, len(picked), len(attrs), out

if __name__ == "__main__":
    args = [a for a in sys.argv[1:] if not a.startswith("-")]
    write = "--write" in sys.argv
    allstr = {}
    for path in args:
        strings, np, na, _ = apply_tags(path, write=write)
        allstr.update(strings)
        print("%-46s text:%-4d attrs:%-3d" % (os.path.basename(path), np, na))
    print("unique strings:", len(allstr))
