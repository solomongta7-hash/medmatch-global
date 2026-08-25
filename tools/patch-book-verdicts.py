# -*- coding: utf-8 -*-
# Second pass on book.html: the verdict buttons and closing asides.
#
# The first pass covered the nine questions, the form and the reasons list.
# This one covers what a visitor sees *after* answering — the part that asks
# them to do something, which is the worst place to fall back to English.
#
# Long prose with inline links becomes one key each, with {placeholders} for
# the URLs so a translator never has to touch an href. The dictionaries
# already hold markup, so <strong> and <a> inside a value is normal here.
#
#   python tools/patch-book-verdicts.py

import io, os, sys

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
SRC = os.path.join(ROOT, "book.html")
s = io.open(SRC, encoding="utf-8").read()

if 'T("Book anyway' in s:
    print("Already patched - nothing to do.")
    sys.exit(0)

PAIRS = [
# ── close ────────────────────────────────────────────────────────────────
("""      '<a class="btn btn--gold" href="' + CONFIG.calendarPage + '">Book anyway — it\\'s still free</a>' +
      '<a class="btn btn--ghost" href="' + CONFIG.whatsapp + '" target="_blank" rel="noopener">Ask a question first</a>';
    extra =
      '<div class="aside"><strong>We meant it about booking anyway.</strong> The list above is what we\\'d ' +
      'want you to have in hand, not a hurdle. If you\\'d rather talk it through now, take a slot — we just ' +
      'won\\'t pretend the quote is final until those pieces are in place.</div>';""",
 """      '<a class="btn btn--gold" href="' + CONFIG.calendarPage + '">' + esc(T("Book anyway — it's still free")) + '</a>' +
      '<a class="btn btn--ghost" href="' + CONFIG.whatsapp + '" target="_blank" rel="noopener">' + esc(T("Ask a question first")) + '</a>';
    extra =
      '<div class="aside">' + T("<strong>We meant it about booking anyway.</strong> The list above is what we'd want you to have in hand, not a hurdle. If you'd rather talk it through now, take a slot — we just won't pretend the quote is final until those pieces are in place.") + '</div>';"""),

# ── early ────────────────────────────────────────────────────────────────
("""      '<a class="btn btn--gold" href="/true-cost.html">See what it really costs</a>' +
      '<a class="btn btn--ghost" href="' + CONFIG.whatsapp + '" target="_blank" rel="noopener">Message us on WhatsApp</a>';
    extra =
      '<div class="aside">Three things worth your time before any call: the ' +
      '<a href="/true-cost.html">true-cost estimate</a> (flights, hotel and the second trip included), ' +
      '<a href="/vetting.html">how we vet a hospital</a>, and the ' +
      '<a href="/blog/">patient guides</a> for your treatment. ' +
      '<strong>No sales sequence, no follow-up you didn\\'t ask for.</strong> ' +
      'When you have a date or a quote in hand, come back and finish this in thirty seconds.</div>';""",
 """      '<a class="btn btn--gold" href="/true-cost.html">' + esc(T("See what it really costs")) + '</a>' +
      '<a class="btn btn--ghost" href="' + CONFIG.whatsapp + '" target="_blank" rel="noopener">' + esc(T("Message us on WhatsApp")) + '</a>';
    extra =
      '<div class="aside">' + T("Three things worth your time before any call: the <a href=\\"/true-cost.html\\">true-cost estimate</a> (flights, hotel and the second trip included), <a href=\\"/vetting.html\\">how we vet a hospital</a>, and the <a href=\\"/blog/\\">patient guides</a> for your treatment. <strong>No sales sequence, no follow-up you didn't ask for.</strong> When you have a date or a quote in hand, come back and finish this in thirty seconds.") + '</div>';"""),

# ── clinic ───────────────────────────────────────────────────────────────
("""      '<a class="btn btn--gold" href="' + CONFIG.whatsapp + '" target="_blank" rel="noopener">Send your records securely</a>' +
      '<a class="btn btn--ghost" href="mailto:' + CONFIG.email + '">Email us instead</a>';
    extra =
      '<div class="aside"><strong>What happens next.</strong> A patient advisor comes back to you within one ' +
      'business day with exactly which records the surgeon needs — usually a medication list, a recent blood ' +
      'panel, and any imaging. A clinician reviews it. Only then does anyone talk to you about price or dates. ' +
      'If the answer is that you shouldn\\'t travel for this, we will tell you that too.</div>';""",
 """      '<a class="btn btn--gold" href="' + CONFIG.whatsapp + '" target="_blank" rel="noopener">' + esc(T("Send your records securely")) + '</a>' +
      '<a class="btn btn--ghost" href="mailto:' + CONFIG.email + '">' + esc(T("Email us instead")) + '</a>';
    extra =
      '<div class="aside">' + T("<strong>What happens next.</strong> A patient advisor comes back to you within one business day with exactly which records the surgeon needs — usually a medication list, a recent blood panel, and any imaging. A clinician reviews it. Only then does anyone talk to you about price or dates. If the answer is that you shouldn't travel for this, we will tell you that too.") + '</div>';"""),
]

missing = []
for old, new in PAIRS:
    if old not in s:
        missing.append(old.strip().split("\n")[0][:70])
        continue
    s = s.replace(old, new, 1)

if missing:
    print("NOT MATCHED - book.html has changed shape:")
    for m in missing:
        print("  " + m)
    sys.exit(1)

io.open(SRC, "w", encoding="utf-8", newline="").write(s)
print("Patched %d verdict blocks." % len(PAIRS))
