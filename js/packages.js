/* ═══════════════════════════════════════════════════════════════
   MEDMATCH GLOBAL — packages, price breakdowns & patient stories
   Renders everything from js/packages-data.js (window.MM_DATA).
   No layout edits needed to change prices — edit the data file.
   ═══════════════════════════════════════════════════════════════ */

(function () {
  "use strict";
  var D = window.MM_DATA;
  if (!D) return;

  var cur = D.defaultCurrency || "USD";
  var hotelChoice = {};    // packageId → 4 or 5
  var openBreakdown = {};  // packageId → is the itemized breakdown open

  function fmt(usd) {
    var v = usd * (D.rates[cur] || 1);
    return D.symbols[cur] + Math.round(v).toLocaleString("en-US");
  }
  function fee() {
    if (D.feeOverride && D.feeOverride[cur] != null) return D.symbols[cur] + D.feeOverride[cur].toLocaleString("en-US");
    return fmt(D.coordinationFee);
  }
  function feeUsd() {
    if (D.feeOverride && D.feeOverride[cur] != null) return D.feeOverride[cur] / (D.rates[cur] || 1);
    return D.coordinationFee;
  }
  function waLink(pkgName) {
    var msg = "Hello MedMatch Global! I'm interested in the \"" + pkgName + "\" package. Could you send me my free treatment plan?";
    return "https://wa.me/" + D.whatsapp + "?text=" + encodeURIComponent(msg);
  }

  var WA_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.7.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.4-3c-.3-.4 0-.5.1-.7l.5-.6c.1-.2.1-.4 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1.1 2.7c.1.2 1.8 2.8 4.4 3.9 2.6 1.1 2.6.7 3.1.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.6-.3z"/></svg>';

  /* ── trust badge (reusable) ── */
  function badge() {
    return '<div class="tbadge"><i>✓</i> 100% Transparent Pricing — you pay the clinic directly; our fixed ' +
      '<b class="feeword">' + fee() + '</b> fee is the only thing you ever pay us.</div>';
  }

  /* ── package card ──
     Compact mode (homepage) leads with the total and tucks the itemized
     breakdown behind a disclosure, so the section costs ~0.6 screens per
     card instead of ~1.5. Full mode (packages.html) shows everything. ── */
  function cardHTML(p, compact) {
    var star = hotelChoice[p.id] || 4;
    // Some partner clinics absorb the hotel themselves — then there is no
    // 4★/5★ choice to make and the hotel line costs nothing.
    var freeHotel = !!p.hotelIncluded;
    var hotelUsd = freeHotel ? 0 : (star === 5 ? D.hotel5PerNight : D.hotel4PerNight) * p.nights;
    // price === null means the clinic has not quoted this package yet.
    var quoted = typeof p.price === "number";
    var totalUsd = quoted ? p.price + hotelUsd + feeUsd() : null;

    var detail =
      (freeHotel
        ? '<div class="pkg__free pkg__free--hotel"><span>🏨 Hotel, ' + p.nights +
            ' nights with breakfast — <b>FREE</b> <em>(covered by the clinic)</em></span></div>'
        : '<div class="pkg__hotel" role="group" aria-label="Hotel choice">' +
            '<button class="pkg__hbtn' + (star === 4 ? " is-on" : "") + '" data-star="4">4★ Hotel — ' + fmt(D.hotel4PerNight * p.nights) + '</button>' +
            '<button class="pkg__hbtn' + (star === 5 ? " is-on" : "") + '" data-star="5">5★ Hotel — ' + fmt(D.hotel5PerNight * p.nights) + '</button>' +
          '</div>' +
          '<p class="pkg__hnote">' + p.nights + ' nights, breakfast included</p>') +
      '<div class="pkg__free"><span>🚘 VIP Transfers — <b>FREE</b> <em>(airport ↔ hotel ↔ clinic, all appointments)</em></span>' +
        '<span>🩺 Online Consultation &amp; Treatment Plan — <b>FREE</b></span></div>' +
      '<table class="pkg__table"><tbody>' +
        '<tr><td>Treatment — paid directly to your doctor at the clinic</td><td>' +
          (quoted ? fmt(p.price) : "On request") + '</td></tr>' +
        (freeHotel
          ? '<tr><td>Hotel (' + p.nights + ' nights, breakfast)</td><td class="free">FREE</td></tr>'
          : '<tr><td>Hotel (' + star + '★, ' + p.nights + ' nights)</td><td>' + fmt(hotelUsd) + '</td></tr>') +
        '<tr><td>VIP airport &amp; clinic transfers</td><td class="free">FREE</td></tr>' +
        '<tr><td>Online consultation &amp; treatment plan</td><td class="free">FREE</td></tr>' +
        '<tr><td>' + D.feeName + ' <em>(our only charge)</em></td><td>' + fee() + '</td></tr>' +
      '</tbody></table>';

    return (
      '<article class="pkg' + (compact ? " pkg--compact" : "") + '" data-pkg="' + p.id + '">' +
        '<span class="pkg__tag">' + p.tag.toUpperCase() + '</span>' +
        (p.clinic ? '<span class="pkg__clinic">' + p.clinic + '</span>' : "") +
        '<h3 class="pkg__name">' + p.name + '</h3>' +
        '<p class="pkg__desc">' + p.desc + '</p>' +
        (compact
          ? '<p class="pkg__headline">' +
              (quoted
                ? '<em>Total, all in</em><strong>' + fmt(totalUsd) + '</strong>'
                : '<em>Total, all in</em><strong class="pkg__onreq">Price on request</strong>') +
              '<span>' + p.days + ' in ' + D.city + ' · ' +
              (freeHotel ? "hotel, transfers" : star + "★ hotel, transfers") +
              ' &amp; fee included</span></p>' +
            '<details class="pkg__more"><summary>See what’s included, itemized</summary>' +
              '<ul class="pkg__inc">' + p.includes.map(function (i) { return "<li>" + i + "</li>"; }).join("") +
                '<li>' + p.days + ' in ' + D.city + '</li></ul>' + detail +
            '</details>'
          : '<ul class="pkg__inc">' + p.includes.map(function (i) { return "<li>" + i + "</li>"; }).join("") +
              '<li>' + p.days + ' in ' + D.city + '</li></ul>' + detail +
            '<table class="pkg__table pkg__table--total"><tbody>' +
              '<tr class="total"><td>Total estimated cost</td><td>' +
                (quoted ? fmt(totalUsd) : '<span class="pkg__onreq">Price on request</span>') + '</td></tr>' +
            '</tbody></table>') +
        '<div class="pkg__ctas">' +
          '<a class="btn btn--gold pkg__cta" href="#invitation" data-scroll-to="#invitation"><span>Get My Free Treatment Plan</span></a>' +
          '<a class="btn btn--wa" href="' + waLink(p.name) + '" target="_blank" rel="noopener">' + WA_ICON + '<span>WhatsApp Us</span></a>' +
        '</div>' +
        '<p class="pkg__fine">Final treatment price is confirmed by your doctor after your free consultation and X-ray review.</p>' +
      '</article>'
    );
  }

  function renderPackages() {
    var grid = document.getElementById("pkgGrid");
    if (!grid) return;
    var compact = grid.hasAttribute("data-compact");
    var limit = parseInt(grid.getAttribute("data-limit"), 10);
    var list = limit > 0 ? D.packages.slice(0, limit) : D.packages;
    grid.innerHTML = list.map(function (p) { return cardHTML(p, compact); }).join("");
    var restCount = D.packages.length - list.length;
    var rest = document.getElementById("pkgRest");
    if (rest) {
      rest.innerHTML = restCount > 0
        ? '<a class="btn btn--outline" href="packages.html"><span>See all ' + D.packages.length +
          ' dental packages &amp; prices →</span></a>'
        : "";
    }
    var badgeSlot = document.getElementById("pkgBadge");
    if (badgeSlot) badgeSlot.innerHTML = badge();

    // an open breakdown must survive a hotel/currency re-render
    grid.querySelectorAll(".pkg__more").forEach(function (d) {
      var id = d.closest(".pkg").getAttribute("data-pkg");
      if (openBreakdown[id]) d.open = true;
      d.addEventListener("toggle", function () { openBreakdown[id] = d.open; });
    });

    grid.querySelectorAll(".pkg__hbtn").forEach(function (b) {
      b.addEventListener("click", function () {
        hotelChoice[b.closest(".pkg").getAttribute("data-pkg")] = +b.getAttribute("data-star");
        renderPackages();
      });
    });
    // re-bind smooth-scroll CTAs rendered after main.js (index page only)
    grid.querySelectorAll("[data-scroll-to]").forEach(function (a) {
      a.addEventListener("click", function (e) {
        var t = document.querySelector(a.getAttribute("data-scroll-to"));
        if (t) { e.preventDefault(); t.scrollIntoView({ behavior: "smooth" }); }
      });
    });
  }

  function renderBindings() { renderPackages(); }

  /* ── currency toggle ── */
  var curWrap = document.getElementById("pkgCurrency");
  if (curWrap) {
    curWrap.innerHTML = ["USD", "CAD", "GBP"].map(function (c) {
      return '<button class="currency__btn' + (c === cur ? " is-active" : "") + '" data-cur="' + c + '">' + c + " " + D.symbols[c].replace("CA$", "$") + "</button>";
    }).join("");
    curWrap.addEventListener("click", function (e) {
      var b = e.target.closest("[data-cur]");
      if (!b) return;
      cur = b.getAttribute("data-cur");
      curWrap.querySelectorAll(".currency__btn").forEach(function (x) {
        x.classList.toggle("is-active", x === b);
      });
      renderPackages();
    });
  }

  /* ── patient stories (shorts row) ── */
  function thumb(v) {
    return v.videoId
      ? '<img loading="lazy" src="https://img.youtube.com/vi/' + v.videoId + '/hqdefault.jpg" alt="' + v.name + " — " + v.procedure + '" onerror="this.remove()">'
      : "";
  }
  function renderStories() {
    var row = document.getElementById("storiesRow");
    if (!row) return;

    /* coming-soon mode: elegant placeholders, no videos yet (see packages-data.js) */
    if (D.videosComingSoon) {
      row.classList.add("stories__row--soon");
      row.innerHTML = D.videos.map(function (v) {
        return '<div class="story story--soon">' +
          '<div class="story__media"></div>' +
          '<div class="story__meta"><strong>COMING SOON</strong><span>' + v.procedure + '</span></div>' +
        '</div>';
      }).join("");
      return;
    }

    row.innerHTML = D.videos.map(function (v, i) {
      return '<button class="story" data-i="' + i + '" aria-label="Play ' + v.name + "'s story\">" +
        '<div class="story__media">' + thumb(v) + '<span class="story__play">▶</span></div>' +
        '<div class="story__meta"><strong>' + v.flag + " " + v.name + '</strong><span>' + v.procedure + '</span></div>' +
      '</button>';
    }).join("");

    row.addEventListener("click", function (e) {
      var card = e.target.closest(".story");
      if (!card) return;
      var v = D.videos[+card.getAttribute("data-i")];
      if (!v.videoId) return; // placeholder — no video yet
      openLightbox(v.videoId);
    });

    // arrow buttons
    document.querySelectorAll("[data-stories-nav]").forEach(function (b) {
      b.addEventListener("click", function () {
        row.scrollBy({ left: (b.getAttribute("data-stories-nav") === "next" ? 1 : -1) * 300, behavior: "smooth" });
      });
    });
  }

  function openLightbox(id) {
    var lb = document.getElementById("storyLightbox");
    lb.querySelector(".lightbox__frame").innerHTML =
      '<iframe src="https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0" title="Patient story" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>';
    lb.classList.add("is-open");
    document.documentElement.style.overflow = "hidden";
  }
  function closeLightbox() {
    var lb = document.getElementById("storyLightbox");
    lb.classList.remove("is-open");
    lb.querySelector(".lightbox__frame").innerHTML = "";
    document.documentElement.style.overflow = "";
  }
  var lb = document.getElementById("storyLightbox");
  if (lb) {
    lb.addEventListener("click", function (e) {
      if (e.target === lb || e.target.closest(".lightbox__close")) closeLightbox();
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeLightbox(); });
  }

  /* ── floating WhatsApp button ── */
  var floatBtn = document.getElementById("waFloat");
  if (floatBtn) {
    floatBtn.href = "https://wa.me/" + D.whatsapp + "?text=" +
      encodeURIComponent("Hello MedMatch Global! I'd like a free consultation.");
    floatBtn.innerHTML = WA_ICON;
  }

  renderPackages();
  renderStories();
})();
