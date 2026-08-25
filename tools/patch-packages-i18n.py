# Route every visitor-facing sentence in js/packages.js through MMi18n.t().
#
# Written as a one-shot patcher rather than done by hand so the change is
# reviewable and repeatable: it refuses to run twice, and it fails loudly if
# any single replacement no longer matches the file.
#
#   python tools/patch-packages-i18n.py

import io, sys, os

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
SRC = os.path.join(ROOT, "js", "packages.js")

s = io.open(SRC, encoding="utf-8").read()

if "function T(" in s:
    print("Already patched - nothing to do.")
    sys.exit(0)

# The helper. Falls back to the English it was given, so the catalogue still
# renders if i18n.js is missing or a key has no translation yet.
HELPER = '''  /* Translation for text this script builds. MMi18n.t() is keyed by the
     English sentence itself, because there is no element to hang a hash on.
     Falls back to English, so a missing key is never a blank card. */
  function T(s) {
    return (window.MMi18n && window.MMi18n.t) ? window.MMi18n.t(s) : s;
  }
  /* Same, with {placeholders} filled in after translation, so a translator
     can move the number to wherever their language wants it. */
  function Tf(s, vals) {
    var out = T(s);
    for (var k in vals) out = out.split("{" + k + "}").join(vals[k]);
    return out;
  }

'''

s = s.replace('  var cur = D.defaultCurrency || "USD";', HELPER + '  var cur = D.defaultCurrency || "USD";', 1)

PAIRS = [
    # WhatsApp opener
    ('''    var msg = "Hello MedMatch Global! I'm interested in the \\"" + pkgName + "\\" package. Could you send me my free treatment plan?";''',
     '''    var msg = Tf("Hello MedMatch Global! I'm interested in the \\"{pkg}\\" package. Could you send me my free treatment plan?", { pkg: T(pkgName) });'''),

    # trust badge
    ('''    return '<div class="tbadge"><i>✓</i> 100% Transparent Pricing — your treatment is paid directly to the ' +
      'clinic, never marked up. Our care and coordination is a flat ' +
      '<b class="feeword">' + fee() + '</b> for your whole journey.</div>';''',
     '''    return '<div class="tbadge"><i>✓</i> ' +
      Tf('100% Transparent Pricing — your treatment is paid directly to the clinic, never marked up. ' +
         'Our care and coordination is a flat {fee} for your whole journey.',
         { fee: '<b class="feeword">' + fee() + '</b>' }) + '</div>';'''),

    # free hotel line
    ('''        ? '<div class="pkg__free pkg__free--hotel"><span>\U0001F3E8 Hotel, ' + p.nights +
            ' nights with breakfast — <b>FREE</b> <em>(covered by the clinic)</em></span></div>' ''',
     '''        ? '<div class="pkg__free pkg__free--hotel"><span>\U0001F3E8 ' +
            Tf('Hotel, {n} nights with breakfast', { n: p.nights }) +
            ' — <b>' + T("FREE") + '</b> <em>(' + T("covered by the clinic") + ')</em></span></div>' '''),

    # hotel choice buttons
    ('''        : '<div class="pkg__hotel" role="group" aria-label="Hotel choice">' +
            '<button class="pkg__hbtn' + (star === 4 ? " is-on" : "") + '" data-star="4">4★ Hotel — ' + fmt(D.hotel4PerNight * p.nights) + '</button>' +
            '<button class="pkg__hbtn' + (star === 5 ? " is-on" : "") + '" data-star="5">5★ Hotel — ' + fmt(D.hotel5PerNight * p.nights) + '</button>' +
          '</div>' +
          '<p class="pkg__hnote">' + p.nights + ' nights, breakfast included</p>') +''',
     '''        : '<div class="pkg__hotel" role="group" aria-label="' + T("Hotel choice") + '">' +
            '<button class="pkg__hbtn' + (star === 4 ? " is-on" : "") + '" data-star="4">4★ ' + T("Hotel") + ' — ' + fmt(D.hotel4PerNight * p.nights) + '</button>' +
            '<button class="pkg__hbtn' + (star === 5 ? " is-on" : "") + '" data-star="5">5★ ' + T("Hotel") + ' — ' + fmt(D.hotel5PerNight * p.nights) + '</button>' +
          '</div>' +
          '<p class="pkg__hnote">' + Tf("{n} nights, breakfast included", { n: p.nights }) + '</p>') +'''),

    # free inclusions strip
    ('''      '<div class="pkg__free"><span>\U0001F698 VIP Transfers — <b>FREE</b> <em>(airport ↔ hotel ↔ clinic, all appointments)</em></span>' +
        '<span>\U0001FA7A Online Consultation &amp; Treatment Plan — <b>FREE</b></span></div>' +''',
     '''      '<div class="pkg__free"><span>\U0001F698 ' + T("VIP Transfers") + ' — <b>' + T("FREE") + '</b> <em>(' +
        T("airport ↔ hotel ↔ clinic, all appointments") + ')</em></span>' +
        '<span>\U0001FA7A ' + T("Online Consultation &amp; Treatment Plan") + ' — <b>' + T("FREE") + '</b></span></div>' +'''),

    # breakdown table
    ('''        '<tr><td>Treatment — paid directly to your doctor at the clinic</td><td>' +
          (quoted ? fmt(p.price) : "On request") + '</td></tr>' +
        (freeHotel
          ? '<tr><td>Hotel (' + p.nights + ' nights, breakfast)</td><td class="free">FREE</td></tr>'
          : '<tr><td>Hotel (' + star + '★, ' + p.nights + ' nights)</td><td>' + fmt(hotelUsd) + '</td></tr>') +
        '<tr><td>VIP airport &amp; clinic transfers</td><td class="free">FREE</td></tr>' +
        '<tr><td>Online consultation &amp; treatment plan</td><td class="free">FREE</td></tr>' +
        '<tr><td>' + D.feeName + '</td><td>' + fee() + '</td></tr>' +''',
     '''        '<tr><td>' + T("Treatment — paid directly to your doctor at the clinic") + '</td><td>' +
          (quoted ? fmt(p.price) : T("On request")) + '</td></tr>' +
        (freeHotel
          ? '<tr><td>' + Tf("Hotel ({n} nights, breakfast)", { n: p.nights }) + '</td><td class="free">' + T("FREE") + '</td></tr>'
          : '<tr><td>' + Tf("Hotel ({star}★, {n} nights)", { star: star, n: p.nights }) + '</td><td>' + fmt(hotelUsd) + '</td></tr>') +
        '<tr><td>' + T("VIP airport &amp; clinic transfers") + '</td><td class="free">' + T("FREE") + '</td></tr>' +
        '<tr><td>' + T("Online consultation &amp; treatment plan") + '</td><td class="free">' + T("FREE") + '</td></tr>' +
        '<tr><td>' + T(D.feeName) + '</td><td>' + fee() + '</td></tr>' +'''),

    # card head
    ('''        '<span class="pkg__tag">' + p.tag.toUpperCase() + '</span>' +''',
     '''        '<span class="pkg__tag">' + T(p.tag).toUpperCase() + '</span>' +'''),
    ('''        '<h3 class="pkg__name">' + p.name + '</h3>' +
        '<p class="pkg__desc">' + p.desc + '</p>' +''',
     '''        '<h3 class="pkg__name">' + T(p.name) + '</h3>' +
        '<p class="pkg__desc">' + T(p.desc) + '</p>' +'''),

    # compact headline
    ('''              (quoted
                ? '<em>Estimated total, all in</em><strong>from ' + fmt(totalUsd) + '</strong>'
                : '<em>Estimated total, all in</em><strong class="pkg__onreq">Price on request</strong>') +
              '<span>' + p.days + ' in ' + D.city + ' · ' +
              (freeHotel ? "hotel, transfers" : star + "★ hotel, transfers") +
              ' &amp; fee included</span></p>' +
            '<details class="pkg__more"><summary>See what’s included, itemized</summary>' +
              '<ul class="pkg__inc">' + p.includes.map(function (i) { return "<li>" + i + "</li>"; }).join("") +
                '<li>' + p.days + ' in ' + D.city + '</li></ul>' + detail +
            '</details>' ''',
     '''              (quoted
                ? '<em>' + T("Estimated total, all in") + '</em><strong>' + Tf("from {total}", { total: fmt(totalUsd) }) + '</strong>'
                : '<em>' + T("Estimated total, all in") + '</em><strong class="pkg__onreq">' + T("Price on request") + '</strong>') +
              '<span>' + Tf("{days} in {city}", { days: T(p.days), city: T(D.city) }) + ' · ' +
              (freeHotel ? T("hotel, transfers") : Tf("{star}★ hotel, transfers", { star: star })) +
              ' ' + T("&amp; fee included") + '</span></p>' +
            '<details class="pkg__more"><summary>' + T("See what’s included, itemized") + '</summary>' +
              '<ul class="pkg__inc">' + p.includes.map(function (i) { return "<li>" + T(i) + "</li>"; }).join("") +
                '<li>' + Tf("{days} in {city}", { days: T(p.days), city: T(D.city) }) + '</li></ul>' + detail +
            '</details>' '''),

    # full mode
    ('''          : '<ul class="pkg__inc">' + p.includes.map(function (i) { return "<li>" + i + "</li>"; }).join("") +
              '<li>' + p.days + ' in ' + D.city + '</li></ul>' + detail +
            '<table class="pkg__table pkg__table--total"><tbody>' +
              '<tr class="total"><td>Total estimated cost</td><td>' +
                (quoted ? "from " + fmt(totalUsd) : '<span class="pkg__onreq">Price on request</span>') + '</td></tr>' +''',
     '''          : '<ul class="pkg__inc">' + p.includes.map(function (i) { return "<li>" + T(i) + "</li>"; }).join("") +
              '<li>' + Tf("{days} in {city}", { days: T(p.days), city: T(D.city) }) + '</li></ul>' + detail +
            '<table class="pkg__table pkg__table--total"><tbody>' +
              '<tr class="total"><td>' + T("Total estimated cost") + '</td><td>' +
                (quoted ? Tf("from {total}", { total: fmt(totalUsd) }) : '<span class="pkg__onreq">' + T("Price on request") + '</span>') + '</td></tr>' +'''),

    # CTAs + fine print
    ('''          '<a class="btn btn--gold pkg__cta" href="#invitation" data-scroll-to="#invitation"><span>Get My Free Treatment Plan</span></a>' +
          '<a class="btn btn--wa" href="' + waLink(p.name) + '" target="_blank" rel="noopener">' + WA_ICON + '<span>WhatsApp Us</span></a>' +
        '</div>' +
        '<p class="pkg__fine">Final treatment price is confirmed by your doctor after your free consultation and X-ray review.</p>' +''',
     '''          '<a class="btn btn--gold pkg__cta" href="#invitation" data-scroll-to="#invitation"><span>' + T("Get My Free Treatment Plan") + '</span></a>' +
          '<a class="btn btn--wa" href="' + waLink(p.name) + '" target="_blank" rel="noopener">' + WA_ICON + '<span>' + T("WhatsApp Us") + '</span></a>' +
        '</div>' +
        '<p class="pkg__fine">' + T("Final treatment price is confirmed by your doctor after your free consultation and X-ray review.") + '</p>' +'''),

    # see-all button
    ('''        ? '<a class="btn btn--outline" href="packages.html"><span>See all ' + D.packages.length +
          ' dental packages &amp; prices →</span></a>' ''',
     '''        ? '<a class="btn btn--outline" href="packages.html"><span>' +
          Tf("See all {n} dental packages &amp; prices →", { n: D.packages.length }) + '</span></a>' '''),
]

missing = []
for old, new in PAIRS:
    old = old.rstrip()          # tolerate the trailing space used to close a python literal
    new = new.rstrip()
    if old not in s:
        missing.append(old.strip().split("\n")[0][:70])
        continue
    s = s.replace(old, new, 1)

if missing:
    print("FAILED - these no longer match js/packages.js:")
    for m in missing:
        print("  " + m)
    sys.exit(1)

io.open(SRC, "w", encoding="utf-8", newline="").write(s)
print("Patched js/packages.js - %d replacements." % len(PAIRS))
