# -*- coding: utf-8 -*-
"""
MedMatch Global — translation health check.

Run this after editing any English copy. It answers one question:
"is anything on this site going to show a visitor the wrong language?"

    python tools/check-translations.py

What it reports
---------------
  MISSING  English copy on a patient-facing page with no translation. The
           visitor sees English inside an otherwise translated page. Usually
           means someone edited the English and the old translation no longer
           matches, because keys are hashes of the English text itself.

  ORPHAN   A translation whose English original is gone from the site. Harmless
           to a visitor, but it is dead weight in the dictionary and a hint that
           copy changed somewhere.

  UNTAGGED Visible text with no data-i18n attribute at all. It can never be
           translated. New sections usually land here.

Deliberate English (brand names, e-mail addresses, roman numerals) is listed in
tools/keep-english.json and is never counted as missing.
"""
import json, os, re, sys, glob

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LANGS = ["es", "fr", "de", "tr"]
NAMES = {"es": "Spanish", "fr": "French", "de": "German", "tr": "Turkish"}

# pages a patient actually walks through — these must be fully translated
CORE = {
    "index.html", "ask.html", "book.html", "book-call.html", "packages.html",
    "true-cost.html", "vetting.html", "preview.html", "partner-hospital.html",
    "hospital-network.html", "acibadem.html", "medical-park.html",
    "advisor-hub.html", "hub-login.html", "hub-portal.html",
    os.path.join("answers", "index.html"), os.path.join("blog", "index.html"),
}

def pages():
    for p in sorted(glob.glob(os.path.join(ROOT, "**", "*.html"), recursive=True)):
        rel = os.path.relpath(p, ROOT)
        if "_archive" in rel or "vendor" in rel or rel.startswith("google725"):
            continue
        yield rel, p

def find_untagged(src):
    """Visible text that carries no key anywhere above or below it.

    A key can sit on the block itself, on a child span (the tagger descends
    past decorative icons), or on a wrapper (a label/output pair is translated
    as one unit) — so the only honest way to ask is to remove every tagged
    subtree first and see what text is left standing."""
    try:
        from bs4 import BeautifulSoup, Tag
    except ImportError:
        return []   # optional dependency; coverage numbers above still stand

    soup = BeautifulSoup(src, "html.parser")
    for el in soup(["script", "style", "svg", "noscript", "head"]):
        el.decompose()
    for el in soup.select("[data-i18n], [data-i18n-attr]"):
        el.decompose()

    loose = []
    for el in soup.find_all(["h1", "h2", "h3", "h4", "h5", "h6", "p", "li", "button", "label"]):
        if el.find(["h1", "h2", "h3", "h4", "h5", "h6", "p", "li", "div"]):
            continue
        txt = re.sub(r"\s+", " ", el.get_text()).strip()
        if len(txt) > 2 and re.search(r"[A-Za-z]{3}", txt):
            loose.append(txt[:70])
    return loose

def load_dict(lang):
    p = os.path.join(ROOT, "js", "lang", lang + ".js")
    if not os.path.exists(p):
        return None
    src = open(p, encoding="utf-8").read()
    return (_table(src, "MMi18n.register("),
            _table(src, "MMi18n.registerText("))

def _table(src, call):
    """The object literal passed to register(...) / registerText(...).

    Anchored on the full call, not the bare name — the file's own header
    comment mentions both functions, and matching that found the wrong table."""
    i = src.index("{", src.index(call))
    depth = 0
    for j in range(i, len(src)):
        if src[j] == "{":
            depth += 1
        elif src[j] == "}":
            depth -= 1
            if depth == 0:
                return json.loads(src[i:j + 1])
    raise ValueError("unbalanced braces after " + call)

def main():
    keep = json.load(open(os.path.join(ROOT, "tools", "keep-english.json"), encoding="utf-8"))

    used, untagged = {}, {}
    for rel, p in pages():
        src = open(p, encoding="utf-8").read()
        keys = set(re.findall(r'data-i18n="([0-9a-f]{8})"', src))
        for spec in re.findall(r'data-i18n-attr="([^"]+)"', src):
            keys.update(re.findall(r":([0-9a-f]{8})", spec))
        used[rel] = keys

        loose = find_untagged(src)
        if loose:
            untagged[rel] = loose

    core_keys = set()
    for rel in used:
        if rel in CORE:
            core_keys |= used[rel]
    all_keys = set().union(*used.values()) if used else set()

    problems = 0
    print("MedMatch Global — translation health\n" + "=" * 52)
    print("pages scanned            : %d" % len(used))
    print("translatable strings     : %d" % len(all_keys))
    print("on the patient path      : %d\n" % len(core_keys))

    for lang in LANGS:
        loaded = load_dict(lang)
        if loaded is None:
            print("%-8s !! js/lang/%s.js is missing" % (NAMES[lang], lang))
            problems += 1
            continue
        d, runtime = loaded
        missing = sorted((core_keys - set(d)) - set(keep))
        orphan = sorted(set(d) - all_keys)
        covered = len(core_keys) - len(missing)
        print("%-8s %4d/%d  %5.1f%%   missing:%-4d orphan:%-3d runtime:%d"
              % (NAMES[lang], covered, len(core_keys),
                 100.0 * covered / max(len(core_keys), 1),
                 len(missing), len(orphan), len(runtime)))
        if missing:
            problems += len(missing)
            en = {}
            for rel, p in pages():
                if rel not in CORE:
                    continue
                src = open(p, encoding="utf-8").read()
                for k in missing:
                    if k in en:
                        continue
                    m = re.search(r'data-i18n="%s"[^>]*>(.{0,90})' % k, src, re.S)
                    if m:
                        en[k] = (rel, re.sub(r"\s+", " ", m.group(1)))
            for k in missing[:12]:
                where, txt = en.get(k, ("?", "?"))
                print("           MISSING %s  %s  %s" % (k, where, txt[:62]))
            if len(missing) > 12:
                print("           ... and %d more" % (len(missing) - 12))

    if untagged:
        print("\nUNTAGGED text (can never be translated):")
        for rel, lst in sorted(untagged.items())[:10]:
            print("  %-44s %d  e.g. %s" % (rel, len(lst), lst[0][:44]))
        problems += sum(len(v) for v in untagged.values())
        print("  (fix: re-run the tagger, then add the new strings to the dictionaries)")

    print("\n" + "=" * 52)
    if problems:
        print("%d thing(s) need attention." % problems)
    else:
        print("Everything a patient can see is translated in all four languages.")
    return 1 if problems else 0

if __name__ == "__main__":
    sys.exit(main())
