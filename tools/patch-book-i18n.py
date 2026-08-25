# -*- coding: utf-8 -*-
# Route book.html's JavaScript-built copy through MMi18n.t().
#
# The nine questions are built by script, so like the package catalogue before
# them they had no element to hang a hash on and never reached the dictionaries:
# a Spanish visitor got a Spanish site and then nine questions in English, on
# the page the whole funnel runs through.
#
# ONE THING MUST NOT BE TRANSLATED: transcript(). It builds the text that lands
# on the lead board, which Suleyman reads. It deliberately uses the raw English
# `def.title` and `opts[].t`, and this patch leaves it alone. That is why the
# wrapping happens at RENDER time and never in the data.
#
#   python tools/patch-book-i18n.py

import io, os, sys

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
SRC = os.path.join(ROOT, "book.html")
s = io.open(SRC, encoding="utf-8").read()

if "function T(" in s:
    print("Already patched - nothing to do.")
    sys.exit(0)

HELPER = '''/* Translation for copy this page builds in script. Keyed by the English
   sentence itself, because there is no element to hang a hash on. Falls back
   to English, so a missing key is never a blank question.
   NOTE: transcript() must keep using the raw English - it is what Suleyman
   reads on the lead board. */
function T(s) {
  return (window.MMi18n && window.MMi18n.t) ? window.MMi18n.t(s) : s;
}
function Tf(s, vals) {
  var out = T(s);
  for (var k in vals) out = out.split("{" + k + "}").join(vals[k]);
  return out;
}

var TREATMENTS = {'''

s = s.replace("var TREATMENTS = {", HELPER, 1)

PAIRS = [
    # ── the "away" help sentence ──────────────────────────────────────────
    ('''    help = "For " + TREATMENTS[t].label.toLowerCase() + ", plan on being in Türkiye " +
           TREATMENTS[t].stay + ". That is the clinic's schedule, not a sales figure.";''',
     '''    help = Tf("For {treatment}, plan on being in Türkiye {stay}. That is the clinic's schedule, not a sales figure.",
              { treatment: T(TREATMENTS[t].label).toLowerCase(), stay: T(TREATMENTS[t].stay) });'''),

    # ── the health question's extra option ────────────────────────────────
    ('''      .concat([{ v: "none", t: "None of these apply to me", s: "" }]);''',
     '''      .concat([{ v: "none", t: "None of these apply to me", s: "" }]);
    // translated at render below, like every other option'''),

    # ── question head ─────────────────────────────────────────────────────
    ('''      '<p class="q__count">Question ' + (n + 1) + ' of ' + order.length + '</p>' +
      '<h2 class="q__title">' + esc(def.title) + '</h2>' +
      (help ? '<p class="q__help">' + esc(help) + '</p>' : '');''',
     '''      '<p class="q__count">' + esc(Tf("Question {n} of {total}", { n: n + 1, total: order.length })) + '</p>' +
      '<h2 class="q__title">' + esc(T(def.title)) + '</h2>' +
      (help ? '<p class="q__help">' + esc(T(help)) + '</p>' : '');'''),

    # ── the contact form ──────────────────────────────────────────────────
    ('''      '<div class="field"><label for="f-name">Your name</label>' +
        '<input id="f-name" type="text" autocomplete="name" /></div>' +
      '<div class="field"><label for="f-email">Email</label>' +
        '<input id="f-email" type="email" autocomplete="email" /></div>' +
      '<div class="field"><label for="f-phone">Phone <span style="text-transform:none;letter-spacing:0">(optional)</span></label>' +
        '<input id="f-phone" type="tel" autocomplete="tel" />' +
        '<p class="field__hint">Only used if you ask us to call. We don\\'t cold-call applicants.</p></div>' +
      '<div class="field"><label for="f-note">Anything you want us to know <span style="text-transform:none;letter-spacing:0">(optional)</span></label>' +
        '<textarea id="f-note"></textarea></div>' ''',
     '''      '<div class="field"><label for="f-name">' + esc(T("Your name")) + '</label>' +
        '<input id="f-name" type="text" autocomplete="name" /></div>' +
      '<div class="field"><label for="f-email">' + esc(T("Email")) + '</label>' +
        '<input id="f-email" type="email" autocomplete="email" /></div>' +
      '<div class="field"><label for="f-phone">' + esc(T("Phone")) + ' <span style="text-transform:none;letter-spacing:0">(' + esc(T("optional")) + ')</span></label>' +
        '<input id="f-phone" type="tel" autocomplete="tel" />' +
        '<p class="field__hint">' + esc(T("Only used if you ask us to call. We don't cold-call applicants.")) + '</p></div>' +
      '<div class="field"><label for="f-note">' + esc(T("Anything you want us to know")) + ' <span style="text-transform:none;letter-spacing:0">(' + esc(T("optional")) + ')</span></label>' +
        '<textarea id="f-note"></textarea></div>' '''),

    # ── the options ───────────────────────────────────────────────────────
    ('''          '<span class="opt__body">' + esc(o.t) +
            (o.s ? '<span class="opt__sub">' + esc(o.s) + '</span>' : '') +''',
     '''          '<span class="opt__body">' + esc(T(o.t)) +
            (o.s ? '<span class="opt__sub">' + esc(T(o.s)) + '</span>' : '') +'''),

    # ── nav row ───────────────────────────────────────────────────────────
    ('''        (def.type === "form" ? 'See my answer' : 'Continue') + '</button>') +
      (n > 0 ? '<button class="back" id="back">← Back</button>' : '') +''',
     '''        esc(def.type === "form" ? T("See my answer") : T("Continue")) + '</button>') +
      (n > 0 ? '<button class="back" id="back">← ' + esc(T("Back")) + '</button>' : '') +'''),

    # ── the submit error ──────────────────────────────────────────────────
    ('''    msg.textContent = "We need a name and a working email to send your answer.";''',
     '''    msg.textContent = T("We need a name and a working email to send your answer.");'''),

    # ── the verdict head ──────────────────────────────────────────────────
    ('''  var c = COPY[v];
  var list = reasons(v).map(function (r) { return "<li>" + r + "</li>"; }).join("");''',
     '''  var c = COPY[v];
  var list = reasons(v).map(function (r) { return "<li>" + T(r) + "</li>"; }).join("");'''),
]

missing = []
for old, new in PAIRS:
    old = old.rstrip()
    new = new.rstrip()
    if old not in s:
        missing.append(old.strip().split("\n")[0][:72])
        continue
    s = s.replace(old, new, 1)

if missing:
    print("FAILED - these no longer match book.html:")
    for m in missing:
        print("  " + m)
    sys.exit(1)

io.open(SRC, "w", encoding="utf-8", newline="").write(s)
print("Patched book.html - %d replacements." % len(PAIRS))
