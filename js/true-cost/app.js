/* ═══════════════════════════════════════════════════════════════
   TRUE COST CALCULATOR — controller
   ═══════════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  /* Google Apps Script web app from lead-system/ — the same endpoint the
     live site posts to, so estimates land in the same Leads sheet and get
     the same owner notification and patient auto-reply.
     Empty this string to fall back to a pre-filled email instead. */
  var ENDPOINT = "https://script.google.com/macros/s/AKfycbx8G_Drl8SkJfAqJ1YTjOl-muJqLssAkdtyqZyGFobQ2SDt0ompH-jK2ciq_UL5uB4B/exec";
  var OWNER_EMAIL = "suleymansuleymanoglu@medmatchglobal.info";

  /* ═══════════════════════════════════════════════════════════
     CAMPAIGN ENTRY — URL pre-fill + attribution
     -----------------------------------------------------------
     The ad's own question is step 1 of the funnel. "How many implants
     have you been quoted for?" links to ?t=dental&n=4, and this opens
     already configured, on step 2. The click IS the answer, so we learn
     the segment even from people who never reach the result.

     Everything below is untrusted query-string input. Every value is
     checked against the real catalogues and silently dropped if it
     doesn't match — a mistyped or tampered link must never be able to
     produce a wrong price. Nothing here can introduce a treatment,
     brand, region or number that the UI couldn't have produced itself.
     ═══════════════════════════════════════════════════════════ */

  /* Readable aliases so ad URLs can be written by hand:
     ?t=hair-transplant and ?t=hair are the same link. */
  var TREATMENT_ALIASES = {
    dental: "dental", teeth: "dental", tooth: "dental", implants: "dental",
    implant: "dental", dentist: "dental", dentalimplants: "dental", fullarch: "dental",
    hair: "hair", hairtransplant: "hair", hairtransplants: "hair", grafts: "hair",
    nose: "nose", rhinoplasty: "nose", nosejob: "nose", septoplasty: "nose",
    knee: "knee", knees: "knee", kneereplacement: "knee", kneesurgery: "knee"
  };

  /* Click IDs from the ad networks, kept so a lead can be matched back to
     a click in the platform's own reporting. */
  var ATTRIB_KEYS = [
    "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term",
    "ad", "src", "gclid", "fbclid", "ttclid", "rdt_cid"
  ];
  var ATTRIB_STORE = "tcc_attrib";

  var ENTRY = { step: 1, filled: [], attrib: {}, referrer: "" };

  function slug(v) { return String(v == null ? "" : v).toLowerCase().replace(/[^a-z0-9]/g, ""); }
  function ids(list) { return list.map(function (x) { return x.id; }); }

  function queryMap() {
    var out = {}, s = location.search.replace(/^\?/, "");
    if (!s) return out;
    s.split("&").forEach(function (pair) {
      if (!pair) return;
      var i = pair.indexOf("=");
      var rawK = i < 0 ? pair : pair.slice(0, i);
      var rawV = i < 0 ? "" : pair.slice(i + 1);
      try {
        var k = decodeURIComponent(rawK.replace(/\+/g, " ")).toLowerCase().trim();
        if (k) out[k] = decodeURIComponent(rawV.replace(/\+/g, " ")).trim();
      } catch (e) { /* malformed %-escape: drop this pair, keep the rest */ }
    });
    return out;
  }

  /* Returns the matching id or null. Never a default — an unrecognised
     value has to leave the existing setting alone, not reset it. */
  function pickEnum(raw, allowed) {
    if (!raw) return null;
    var want = slug(raw), hit = null;
    allowed.forEach(function (a) { if (slug(a) === want) hit = a; });
    return hit;
  }

  function pickInt(raw, min, max, stepTo) {
    if (raw == null || raw === "") return null;
    var n = parseInt(String(raw).replace(/[^0-9-]/g, ""), 10);
    if (!isFinite(n)) return null;
    if (stepTo) n = Math.round(n / stepTo) * stepTo;
    return Math.max(min, Math.min(max, n));
  }

  function readEntry() {
    var q = queryMap();
    var took = function (k) { ENTRY.filled.push(k); };

    /* attribution — first touch in a session wins, so that navigating
       around the tool doesn't overwrite the campaign that brought them */
    var fresh = {};
    ATTRIB_KEYS.forEach(function (k) { if (q[k]) fresh[k] = q[k].slice(0, 60); });
    var stored = null;
    try { stored = JSON.parse(sessionStorage.getItem(ATTRIB_STORE) || "null"); } catch (e) {}
    if (Object.keys(fresh).length) {
      ENTRY.attrib = fresh;
      try { sessionStorage.setItem(ATTRIB_STORE, JSON.stringify(fresh)); } catch (e) {}
    } else if (stored && typeof stored === "object") {
      ENTRY.attrib = stored;
    }
    /* Organic Reddit and forum posts carry no utm, so the referring host
       is the only signal there is. Host only — never the full URL. */
    try {
      if (document.referrer) {
        var h = document.referrer.split("/")[2] || "";
        if (h && h.indexOf(location.hostname) < 0) ENTRY.referrer = h.slice(0, 60);
      }
    } catch (e) {}

    /* treatment */
    var t = TREATMENT_ALIASES[slug(q.t || q.treatment)];
    if (t) { cfg.treatment = t; took("t"); }

    /* the friendly "n" means whatever the chosen treatment counts in */
    var n = q.n;

    if (cfg.treatment === "dental") {
      var imp = pickInt(q.imp != null ? q.imp : n, 0, 32);
      if (imp != null) {
        cfg.implants = imp;
        /* An ad answer of "4 implants" means four teeth restored, so crowns
           follow unless the link says otherwise — same as the 2/2 default. */
        cfg.crowns = Math.min(32, imp);
        took("implants");
      }
      var cr = pickInt(q.cr, 0, 32);
      if (cr != null) { cfg.crowns = cr; took("crowns"); }
      var ib = pickEnum(q.ib, ids(DENTAL_IMPLANTS));
      if (ib) { cfg.implantBrand = ib; took("implantBrand"); }
      var cb = pickEnum(q.cb, ids(DENTAL_CROWNS));
      if (cb) { cfg.crownBrand = cb; took("crownBrand"); }
    }

    if (cfg.treatment === "hair") {
      /* stepper moves in 250s — snap so the counter stays coherent */
      var g = pickInt(q.g != null ? q.g : n, 500, 6000, 250);
      if (g != null) { cfg.grafts = g; took("grafts"); }
      var ht = pickEnum(q.ht, ids(HAIR_TECH));
      if (ht) { cfg.hairTech = ht; took("hairTech"); }
    }

    if (cfg.treatment === "nose") {
      var nt = pickEnum(q.nt, ids(NOSE_TYPE));
      if (nt) { cfg.noseType = nt; took("noseType"); }
    }

    if (cfg.treatment === "knee") {
      var kp = pickEnum(q.kp, ids(KNEE_PROC));
      if (kp) { cfg.kneeProc = kp; took("kneeProc"); }
      var w = pickInt(q.w != null ? q.w : n, 0, 26);
      if (w != null) { cfg.physioWeeks = w; took("physioWeeks"); }
    }

    /* trip */
    var r = pickEnum(q.r || q.region, Object.keys(REGIONS));
    if (r) { cfg.region = r; took("region"); }

    if (q.comp != null && q.comp !== "") {
      cfg.companion = /^(1|true|yes|y)$/.test(slug(q.comp)) ;
      took("companion");
    }
    var cur = pickEnum(q.c || q.currency, Object.keys(SYM));
    if (cur) { currency = cur; took("currency"); }

    /* Day rate is typed in the displayed currency; cfg stores USD. */
    var rate = pickInt(q.rate, 0, 100000);
    if (rate != null) { cfg.dayRate = rate / (FX[currency] || 1); took("dayRate"); }

    /* If the link answered anything about the treatment, the patient has
       already done step 1 — drop them on "your trip" rather than making
       them confirm what they just clicked. Explicit ?step= wins.
       Rejected rather than clamped: a junk ?step= must not round up to 3
       and skip the trip questions the honest number depends on. */
    var explicit = pickEnum(q.step != null ? q.step : q.go, ["1", "2", "3"]);
    ENTRY.step = explicit ? +explicit : (ENTRY.filled.length ? 2 : 1);
  }

  /* Push the pre-filled config into the controls that hold their own
     DOM state (the grids re-render from cfg on their own). */
  function applyEntryToDom() {
    $$("#fx-toggle button").forEach(function (b) {
      b.classList.toggle("is-on", b.dataset.c === currency);
    });
    $("#opt-alone").classList.toggle("is-on", !cfg.companion);
    $("#opt-companion").classList.toggle("is-on", cfg.companion);
    if (cfg.dayRate) $("#day-rate").value = Math.round(cfg.dayRate * (FX[currency] || 1));
    syncTreatmentBox();
    renderAll();
    if (ENTRY.step !== 1) goto(ENTRY.step);
  }

  /* Compact provenance for the Leads sheet. Code.gs has no campaign
     columns and adding a `source` key would be dropped silently, so this
     rides along inside `page` — the one field the sheet does read. */
  function attributionLine() {
    var bits = [];
    var short = {
      utm_source: "src", utm_medium: "med", utm_campaign: "cmp",
      utm_content: "ad", utm_term: "kw", ad: "ad", src: "src"
    };
    Object.keys(ENTRY.attrib).forEach(function (k) {
      bits.push((short[k] || k) + "=" + ENTRY.attrib[k]);
    });
    if (!bits.length && ENTRY.referrer) bits.push("ref=" + ENTRY.referrer);
    if (ENTRY.filled.length) bits.push("prefill=" + ENTRY.filled.join("+"));
    return bits.length ? " · " + bits.join(" · ") : "";
  }

  /* ═══════════════════════════════════════════════════════════
     STEP TRACKING
     -----------------------------------------------------------
     A $100 ad test that can't say where people dropped out has
     bought nothing. "40 clicks, 2 leads" is not a finding; "40 saw
     step 1, 31 answered the trip questions, 6 reached the number,
     2 asked for a check" tells you which sentence to rewrite.

     Fail-safe by construction: an event carries no name and no
     email, and the CURRENT Code.gs rejects any payload missing
     those two with "missing fields" — no row written, no email
     sent. So this is inert, not broken, until the patch in
     ../lead-system/apps-script/EVENTS-PATCH.gs is pasted in.

     Privacy: a random session id in sessionStorage, the step
     reached, and the campaign. No cookies, no fingerprinting, no
     third party, and never anything the patient typed — so it
     needs no consent banner and puts no health detail anywhere
     except the sheet the lead was always going to land in.
     ═══════════════════════════════════════════════════════════ */

  var SESSION_KEY = "tcc_sid";
  var fired = {};

  function sessionId() {
    var id = null;
    try { id = sessionStorage.getItem(SESSION_KEY); } catch (e) {}
    if (!id) {
      id = "s" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
      try { sessionStorage.setItem(SESSION_KEY, id); } catch (e) {}
    }
    return id;
  }

  function trackingEnabled() {
    if (!ENDPOINT) return false;
    var h = location.hostname;
    var local = !h || h === "localhost" || h === "127.0.0.1" || location.protocol === "file:";
    if (!local) return true;
    /* Local runs must never pollute the live sheet. To exercise the
       wiring from a local server: sessionStorage.tcc_track_test = "1" */
    try { return sessionStorage.getItem("tcc_track_test") === "1"; } catch (e) { return false; }
  }

  function track(event, extra) {
    if (!trackingEnabled()) return;
    /* Once per session: a funnel counts people, not bounces between tabs. */
    if (fired[event]) return;
    fired[event] = true;

    var payload = {
      action: "event",
      event: event,
      session: sessionId(),
      treatment: TREATMENT_LABELS[cfg.treatment].t,
      page: ("True Cost Calculator · " + (location.pathname || "/")
             + attributionLine()).slice(0, 400)
    };
    if (extra) Object.keys(extra).forEach(function (k) { payload[k] = extra[k]; });

    try {
      /* keepalive so an event fired as they navigate away still lands.
         No headers, same reason as the lead POST — this has to stay a
         simple request. Errors are swallowed: analytics must never
         show a patient a failure message. */
      fetch(ENDPOINT, { method: "POST", body: JSON.stringify(payload), keepalive: true })
        .catch(function () {});
    } catch (e) {}
  }

  var TREATMENT_LABELS = {
    dental: { t: "Dental", b: "Implants, crowns, full arch" },
    hair:   { t: "Hair transplant", b: "FUE / DHI grafts" },
    nose:   { t: "Rhinoplasty", b: "Nose reshaping, septum" },
    knee:   { t: "Knee surgery", b: "Replacement, meniscus" }
  };

  var cfg = {
    treatment: "dental",
    implantBrand: "osstem", implants: 2,
    crownBrand: "cadcam",   crowns: 2,
    addons: [],
    hairTech: "fue", grafts: 2500,
    noseType: "primary",
    kneeProc: "total", physioWeeks: 8,
    region: "us-east", companion: false, dayRate: 0
  };
  var currency = "USD";
  var step = 1;

  var $ = function (s) { return document.querySelector(s); };
  var $$ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };
  function el(tag, cls, txt) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (txt != null) n.textContent = txt;
    return n;
  }
  var m = function (usd) { return money(usd, currency); };

  /* ── Option card builder (shared by every grid) ───────────── */
  function optionCard(o) {
    var b = el("button", "opt" + (o.on ? " is-on" : ""));
    b.type = "button";
    b.appendChild(el("span", "opt__dot"));
    var body = el("div", "opt__body");
    var t = el("span", "opt__t", o.title);
    if (o.sub) { t.appendChild(document.createTextNode(" ")); t.appendChild(el("small", null, o.sub)); }
    body.appendChild(t);
    if (o.note) body.appendChild(el("span", "opt__b", o.note));
    b.appendChild(body);
    if (o.price != null) b.appendChild(el("span", "opt__p", o.price));
    b.addEventListener("click", o.onPick);
    return b;
  }

  function fillGrid(sel, list) {
    var g = $(sel);
    g.textContent = "";
    list.forEach(function (o) { g.appendChild(optionCard(o)); });
  }

  /* ── Renderers for each configurator ─────────────────────── */

  function renderTreatments() {
    fillGrid("#treatment-grid", Object.keys(TREATMENT_LABELS).map(function (k) {
      return {
        title: TREATMENT_LABELS[k].t, note: TREATMENT_LABELS[k].b, on: cfg.treatment === k,
        onPick: function () { cfg.treatment = k; syncTreatmentBox(); renderAll(); }
      };
    }));
  }

  function syncTreatmentBox() {
    $$(".tbox").forEach(function (n) {
      n.classList.toggle("is-hidden", n.dataset.t !== cfg.treatment);
    });
  }

  function renderDental() {
    fillGrid("#implant-grid", DENTAL_IMPLANTS.map(function (b) {
      return {
        title: b.label, sub: b.origin, note: b.note, on: cfg.implantBrand === b.id,
        price: m(b.price.turkiye) + " ea",
        onPick: function () { cfg.implantBrand = b.id; renderAll(); }
      };
    }));
    fillGrid("#crown-grid", DENTAL_CROWNS.map(function (b) {
      return {
        title: b.label, note: b.note, on: cfg.crownBrand === b.id,
        price: b.price.turkiye ? m(b.price.turkiye) + " ea" : "—",
        onPick: function () { cfg.crownBrand = b.id; renderAll(); }
      };
    }));

    var box = $("#addon-list");
    box.textContent = "";
    DENTAL_ADDONS.forEach(function (a) {
      var lab = el("label", "addon");
      var cb = document.createElement("input");
      cb.type = "checkbox";
      cb.checked = cfg.addons.indexOf(a.id) > -1;
      cb.addEventListener("change", function () {
        var i = cfg.addons.indexOf(a.id);
        if (cb.checked && i < 0) cfg.addons.push(a.id);
        if (!cb.checked && i > -1) cfg.addons.splice(i, 1);
        renderAll();
      });
      lab.appendChild(cb);
      lab.appendChild(el("span", null, a.label));
      lab.appendChild(el("b", null, "+" + m(a.price.turkiye)));
      box.appendChild(lab);
    });
  }

  function renderHair() {
    fillGrid("#hair-grid", HAIR_TECH.map(function (t) {
      return {
        title: t.label, note: t.note, on: cfg.hairTech === t.id,
        price: m(t.perGraft.turkiye) + " / graft",
        onPick: function () { cfg.hairTech = t.id; renderAll(); }
      };
    }));
  }

  function renderNose() {
    fillGrid("#nose-grid", NOSE_TYPE.map(function (n) {
      return {
        title: n.label, note: n.note, on: cfg.noseType === n.id,
        price: m(n.price.turkiye),
        onPick: function () { cfg.noseType = n.id; renderAll(); }
      };
    }));
  }

  function renderKnee() {
    fillGrid("#knee-grid", KNEE_PROC.map(function (k) {
      return {
        title: k.label, note: k.nights + " nights in Türkiye", on: cfg.kneeProc === k.id,
        price: m(k.price.turkiye),
        onPick: function () { cfg.kneeProc = k.id; renderAll(); }
      };
    }));
  }

  function renderRegions() {
    fillGrid("#region-grid", Object.keys(REGIONS).map(function (k) {
      var r = REGIONS[k];
      return {
        title: r.label, on: cfg.region === k,
        note: "Return flight to Türkiye about " + m(mid(r.turkiye)),
        onPick: function () { cfg.region = k; renderAll(); }
      };
    }));
  }

  /* ── Counters ─────────────────────────────────────────────── */

  function wireCounters() {
    $$(".counter").forEach(function (c) {
      var key = c.dataset.count;
      c.querySelectorAll("button").forEach(function (b) {
        b.addEventListener("click", function () {
          var d = +b.dataset.d;
          var min = key === "grafts" ? 500 : 0;
          var max = key === "grafts" ? 6000 : (key === "physioWeeks" ? 26 : 32);
          cfg[key] = Math.max(min, Math.min(max, cfg[key] + d));
          renderAll();
        });
      });
    });
  }

  function syncCounters() {
    ["implants", "crowns", "grafts", "physioWeeks"].forEach(function (k) {
      var n = document.getElementById("n-" + k);
      if (n) n.textContent = cfg[k].toLocaleString("en-US");
    });
    var imp = DENTAL_IMPLANTS.filter(function (b) { return b.id === cfg.implantBrand; })[0];
    var crn = DENTAL_CROWNS.filter(function (b) { return b.id === cfg.crownBrand; })[0];
    setChip("sub-implants", imp ? imp.price.turkiye * cfg.implants : 0);
    setChip("sub-crowns", crn ? crn.price.turkiye * cfg.crowns : 0);
    var tech = HAIR_TECH.filter(function (x) { return x.id === cfg.hairTech; })[0];
    setChip("sub-grafts", tech ? tech.perGraft.turkiye * cfg.grafts : 0);
    setChip("sub-physioWeeks", 380 * cfg.physioWeeks);
  }

  function setChip(id, usd) {
    var n = document.getElementById(id);
    if (n) n.textContent = m(usd) + " subtotal";
  }

  /* ── Sticky bar ───────────────────────────────────────────── */

  function syncBar() {
    var tr = marketCost(cfg, "turkiye");
    $("#bar-fig").textContent = m(tr.total);
    $("#bar-label").textContent = "Türkiye — everything in";
    var bits = [];
    bits.push(tr.trips === 2 ? "two trips" : "one trip");
    bits.push(m(tr.treatment) + " treatment");
    if (tr.flights) bits.push(m(tr.flights + tr.hotel + tr.secondTrip) + " travel");
    if (tr.timeOff) bits.push(m(tr.timeOff) + " time off");
    $("#bar-sub").textContent = bits.join(" · ");
  }

  /* ── The reveal ───────────────────────────────────────────── */

  function renderResult() {
    var c = compare(cfg);
    var tr = c.turkiye;
    var box = $("#result");
    box.textContent = "";

    /* headline */
    var head = el("div", "head");
    var h = el("h2", "head__t");
    h.appendChild(document.createTextNode("Türkiye, all in: "));
    h.appendChild(el("em", null, m(tr.total)));
    head.appendChild(h);
    head.appendChild(el("p", "head__s",
      c.saveVsHome > 0
        ? "That is " + m(c.saveVsHome) + " less than " + MARKETS[c.homeRef.market].label
          + " — a " + c.savePct + "% saving once flights, hotel"
          + (cfg.dayRate ? ", days off work" : "") + (tr.trips === 2 ? " and the second trip" : "") + " are counted."
        : "Once travel is counted, treating this at home works out cheaper. That happens, and you should know it before you book anything."));
    box.appendChild(head);

    /* ledger */
    box.appendChild(ledger(tr));

    /* comparison */
    box.appendChild(comparisonTable(c));

    /* the return-trip reality */
    box.appendChild(returnTripCallout(c));

    /* second trip explainer */
    if (tr.trips === 2) box.appendChild(secondTripCallout(tr));

    box.appendChild(el("p", "foot-note",
      "Treatment figures are researched market averages for each country, not partner "
      + "pricing and not an offer. Flights and hotels are mid-range and move with season. "
      + "Everything here is an estimate to think with — not a quote."));
  }

  function ledger(tr) {
    var L = el("div", "ledger");
    var h = el("div", "ledger__h");
    h.appendChild(el("h3", null, "What you'd actually pay"));
    h.appendChild(el("span", null, tr.trips === 2 ? "Two trips to Türkiye" : "One trip to Türkiye"));
    L.appendChild(h);

    var rows = [
      ["Treatment", null, tr.treatment],
      ["Flights", (cfg.companion ? "Two travellers, return" : "One traveller, return"), tr.flights],
      ["Hotel", TRIP[cfg.treatment].nights + " nights", tr.hotel]
    ];
    if (tr.secondTrip) rows.push(["Second trip", "Flights and hotel again — see below", tr.secondTrip, "flag"]);
    if (tr.timeOff) rows.push(["Days not earning", tr.daysOff + " days at " + m(cfg.dayRate), tr.timeOff]);

    rows.forEach(function (r) {
      if (!r[2]) return;
      var line = el("div", "line" + (r[3] === "flag" ? " line--flag" : ""));
      var l = el("div", "line__l");
      l.appendChild(el("b", null, r[0]));
      if (r[1]) l.appendChild(el("small", null, r[1]));
      line.appendChild(l);
      line.appendChild(el("div", "line__v", m(r[2])));
      L.appendChild(line);
    });

    var tot = el("div", "line line--tot");
    var tl = el("div", "line__l");
    tl.appendChild(el("b", null, "Total"));
    tot.appendChild(tl);
    tot.appendChild(el("div", "line__v", m(tr.total)));
    L.appendChild(tot);
    return L;
  }

  function comparisonTable(c) {
    var wrapEl = el("section", "cmp");
    var head = el("div", "head");
    head.appendChild(el("h2", "head__t", "Against the alternatives"));
    head.appendChild(el("p", "head__s",
      "Same treatment, same configuration, each country costed the same way. "
      + "Home options carry no flights or hotel — which is exactly why the gap is "
      + "smaller than a sticker-price comparison makes it look."));
    wrapEl.appendChild(head);

    var t = document.createElement("table");
    var thead = document.createElement("thead");
    var hr = document.createElement("tr");
    ["", "Treatment", "Travel & stay", "Time off", "Total", "+ one trip back"].forEach(function (x) {
      hr.appendChild(el("th", null, x));
    });
    thead.appendChild(hr);
    t.appendChild(thead);

    var best = Math.min.apply(null, c.rows.map(function (r) { return r.total; }));
    var tb = document.createElement("tbody");
    c.rows.forEach(function (r) {
      var tr2 = el("tr", r.market === "turkiye" ? "row-tr" : null);
      tr2.appendChild(el("td", null, MARKETS[r.market].label + (r.trips === 2 ? " (2 trips)" : "")));
      tr2.appendChild(el("td", null, m(r.treatment)));
      tr2.appendChild(el("td", null, m(r.flights + r.hotel + r.secondTrip)));
      tr2.appendChild(el("td", null, r.timeOff ? m(r.timeOff) : "—"));
      var totCell = el("td", r.total === best ? "is-best" : null, m(r.total));
      tr2.appendChild(totCell);
      tr2.appendChild(el("td", null, m(r.withOneReturn)));
      tb.appendChild(tr2);
    });
    t.appendChild(tb);
    wrapEl.appendChild(t);
    return wrapEl;
  }

  function returnTripCallout(c) {
    var tr = c.turkiye;
    var rt = tr.returnTrip;
    var box = el("div", "callout callout--warn");
    box.appendChild(el("h3", null, "The number most calculators leave out"));

    var p1 = el("p");
    p1.appendChild(document.createTextNode("If anything needs adjusting after you're home — a bite that isn't quite right, a crown that needs reseating, a revision — going back to Türkiye costs about "));
    p1.appendChild(el("strong", null, m(rt.total)));
    p1.appendChild(document.createTextNode(" (" + m(rt.flights) + " flights, " + rt.nights + " nights, "
      + (cfg.dayRate ? m(rt.timeOff) + " in lost days" : "plus your time") + ")."));
    box.appendChild(p1);

    var rivalName = c.rival ? MARKETS[c.rival.market].label : "";

    /* Flights move by more than a few hundred dollars between seasons, so a
       margin inside that is noise. Declaring a winner on it would be the same
       false precision this tool is meant to strip out of other people's numbers. */
    var tooCloseToCall = Math.abs(c.rivalGapWithReturn) < 400;

    if (c.rivalVerdict === "flips") {
      var p2 = el("p");
      p2.appendChild(document.createTextNode("This is the number that decides it. Türkiye is cheaper up front — but add one trip back and "));
      if (tooCloseToCall) {
        p2.appendChild(el("strong", null, "the two are level, within " + m(Math.abs(c.rivalGapWithReturn)) + " of each other"));
        p2.appendChild(document.createTextNode(" — which is less than the difference between booking your flights in March and booking them in July. Treat this as a tie on price and decide on everything else: who is operating, what the revision policy covers, and how far you're willing to fly twice."));
      } else {
        p2.appendChild(el("strong", null, rivalName + " comes out ahead by " + m(-c.rivalGapWithReturn)));
        p2.appendChild(document.createTextNode(", because getting there again costs a fraction as much. It is the most common reason North American patients choose "
          + rivalName + " over Türkiye, and an advisor who doesn't raise it is selling, not advising."));
      }
      box.appendChild(p2);

    } else if (c.rivalVerdict === "behind") {
      var p3 = el("p");
      p3.appendChild(document.createTextNode("Worth saying plainly: on this particular plan "));
      p3.appendChild(el("strong", null, rivalName + " already works out " + m(-c.rivalGap) + " cheaper than Türkiye"));
      p3.appendChild(document.createTextNode(" before anyone flies back at all. The treatment saving here is too small to absorb "
        + (needsSecondTrip(cfg) ? "two sets of" : "") + " long-haul flights. Türkiye earns its advantage on bigger cases — full arches, "
        + "larger graft counts, joint replacement — where the treatment gap is wide enough to carry the airfare. On a case this size, "
        + "we'd tell you to look closer to home."));
      box.appendChild(p3);

    } else if (c.rivalVerdict === "ahead") {
      var p4a = el("p");
      p4a.appendChild(document.createTextNode("Even with one trip back Türkiye stays ahead of " + rivalName
        + " on this plan, by "));
      p4a.appendChild(el("strong", null, m(c.rivalGapWithReturn) + " after a return trip"));
      p4a.appendChild(document.createTextNode(". That holds because the treatment gap here is wide enough to carry the airfare — "
        + "it reverses quickly on smaller cases."));
      box.appendChild(p4a);
    }

    var p4 = el("p");
    p4.appendChild(document.createTextNode("So the question to put to any clinic, anywhere, is this: "));
    p4.appendChild(el("strong", null, "if this needs revising, who pays — and does that include the flights?"));
    p4.appendChild(document.createTextNode(" Get the answer in writing before you pay a deposit. A revision policy that covers the surgery but not the travel has covered the cheap part."));
    box.appendChild(p4);
    return box;
  }

  function secondTripCallout(tr) {
    var box = el("div", "callout callout--good");
    box.appendChild(el("h3", null, "Why this is costed as two trips"));
    var p = el("p");
    p.appendChild(document.createTextNode("Implants have to fuse to the bone — osseointegration — before a permanent crown or bridge is loaded onto them. That takes months, not days. So an implants-and-crowns plan is genuinely "));
    p.appendChild(el("strong", null, "two trips, or one very long stay"));
    p.appendChild(document.createTextNode(". We've costed the second trip at " + m(tr.secondTrip) + " rather than leaving it out."));
    box.appendChild(p);
    var p2 = el("p");
    p2.appendChild(document.createTextNode("If a clinic quotes you \"new teeth in three days\", they are either loading a permanent bridge onto unhealed implants, or selling you a temporary as though it were final. Ask which."));
    box.appendChild(p2);
    return box;
  }

  /* ── Steps ────────────────────────────────────────────────── */

  function goto(n) {
    step = n;
    [1, 2, 3].forEach(function (i) {
      $("#pane-" + i).classList.toggle("is-hidden", i !== n);
    });
    $$(".steps__b").forEach(function (b) {
      var i = +b.dataset.go;
      b.classList.toggle("is-on", i === n);
      b.classList.toggle("is-done", i < n);
    });
    if (n === 3) renderResult();
    if (n > 1) track("step" + n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ── Lead capture ─────────────────────────────────────────── */

  function summary() {
    var c = compare(cfg);
    var tr = c.turkiye;
    var lines = [
      "Treatment: " + TREATMENT_LABELS[cfg.treatment].t,
      "Configuration: " + configLine(),
      "Flying from: " + REGIONS[cfg.region].label + (cfg.companion ? " with a companion" : ""),
      "",
      "Türkiye all-in estimate: " + m(tr.total) + (tr.trips === 2 ? " (two trips)" : ""),
      "  treatment " + m(tr.treatment) + ", travel " + m(tr.flights + tr.hotel + tr.secondTrip)
        + (tr.timeOff ? ", time off " + m(tr.timeOff) : ""),
      "Versus " + MARKETS[c.homeRef.market].label + ": " + m(c.homeRef.total)
        + (c.saveVsHome > 0 ? "  (saving " + m(c.saveVsHome) + ", " + c.savePct + "%)" : ""),
      "One trip back would add: " + m(tr.returnTrip.total)
    ];
    return lines.join("\n");
  }

  function configLine() {
    if (cfg.treatment === "dental") {
      var i = DENTAL_IMPLANTS.filter(function (b) { return b.id === cfg.implantBrand; })[0];
      var cr = DENTAL_CROWNS.filter(function (b) { return b.id === cfg.crownBrand; })[0];
      return cfg.implants + " × " + i.label + " implants, " + cfg.crowns + " × " + cr.label
        + (cfg.addons.length ? ", plus " + cfg.addons.join(", ") : "");
    }
    if (cfg.treatment === "hair") {
      return cfg.grafts.toLocaleString("en-US") + " grafts, "
        + HAIR_TECH.filter(function (x) { return x.id === cfg.hairTech; })[0].label;
    }
    if (cfg.treatment === "nose") {
      return NOSE_TYPE.filter(function (x) { return x.id === cfg.noseType; })[0].label;
    }
    return KNEE_PROC.filter(function (x) { return x.id === cfg.kneeProc; })[0].label
      + ", " + cfg.physioWeeks + " weeks physio";
  }

  function wireForm() {
    $("#cta-form").addEventListener("submit", function (e) {
      e.preventDefault();
      if ($("#f-honey").value) return;
      var msg = $("#cta-msg");
      var name = $("#f-name").value.trim();
      var email = $("#f-email").value.trim();
      var phone = $("#f-phone").value.trim();
      if (!name || !email || email.indexOf("@") < 1) {
        msg.className = "msg is-bad";
        msg.textContent = "Please add your name and a valid email.";
        return;
      }
      /* Field names must match Code.gs exactly: it reads name, email, phone,
         treatment, message, page and _honey. There is no "source" column —
         the tool identifies itself through `page`. */
      var payload = {
        name: name, email: email, phone: phone,
        treatment: TREATMENT_LABELS[cfg.treatment].t,
        page: ("True Cost Calculator · " + (location.pathname || "/")
                + attributionLine()).slice(0, 400),
        message: summary(),
        _honey: ""
      };
      var btn = $("#f-submit");
      btn.disabled = true;
      track("lead_submit");

      if (ENDPOINT) {
        /* No headers: Apps Script web apps don't answer CORS preflight, so this
           has to stay a "simple request". And the script answers 200 even when
           it rejects the lead, so success is `data.ok`, never `res.ok`. */
        fetch(ENDPOINT, { method: "POST", body: JSON.stringify(payload) })
          .then(function (res) { return res.json(); })
          .then(function (data) {
            if (!data || !data.ok) throw new Error(data && data.error || "rejected");
            track("lead_ok");
            btn.disabled = true;
            msg.className = "msg is-ok";
            msg.textContent = "Sent. Suleyman will come back to you personally, usually the same day.";
            $("#cta-form").reset();
          })
          .catch(function () {
            track("lead_fail");
            btn.disabled = false;
            msg.className = "msg is-bad";
            msg.textContent = "That didn't send. Email " + OWNER_EMAIL + " and we'll pick it up.";
          });
        return;
      }

      window.location.href = "mailto:" + OWNER_EMAIL
        + "?subject=" + encodeURIComponent("True Cost estimate — " + TREATMENT_LABELS[cfg.treatment].t + " (" + name + ")")
        + "&body=" + encodeURIComponent("Name: " + name + "\nEmail: " + email
            + "\nWhatsApp: " + (phone || "—") + "\n\n" + summary() + "\n");
      btn.disabled = false;
      msg.className = "msg is-ok";
      msg.textContent = "Your email app should be opening with the estimate filled in — just hit send.";
    });
  }

  /* ── Boot ─────────────────────────────────────────────────── */

  function renderAll() {
    renderTreatments();
    renderDental(); renderHair(); renderNose(); renderKnee();
    renderRegions();
    syncCounters();
    syncBar();
    $("#rate-sym").textContent = SYM[currency];
    if (step === 3) renderResult();
  }

  function init() {
    readEntry();          // mutates cfg + currency before anything renders
    syncTreatmentBox();
    wireCounters();
    wireForm();
    renderAll();

    $$("[data-go]").forEach(function (b) {
      if (b.classList.contains("steps__b") || b.classList.contains("btn")) {
        b.addEventListener("click", function () { goto(+b.dataset.go); });
      }
    });

    $("#fx-toggle").addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (!b) return;
      currency = b.dataset.c;
      $$("#fx-toggle button").forEach(function (x) { x.classList.toggle("is-on", x === b); });
      renderAll();
    });

    $("#opt-alone").addEventListener("click", function () { setCompanion(false); });
    $("#opt-companion").addEventListener("click", function () { setCompanion(true); });
    $("#day-rate").addEventListener("input", function () {
      // The field is entered in the displayed currency; store USD.
      var shown = +this.value || 0;
      cfg.dayRate = shown / (FX[currency] || 1);
      syncBar();
      if (step === 3) renderResult();
    });
    $("#btn-print").addEventListener("click", function () { window.print(); });

    /* Before applyEntryToDom: a pre-filled link jumps straight to step 2,
       and firing that first would put "step2" above "view" in the sheet. */
    track("view");
    applyEntryToDom();    // last: needs every control wired first
  }

  function setCompanion(v) {
    cfg.companion = v;
    $("#opt-alone").classList.toggle("is-on", !v);
    $("#opt-companion").classList.toggle("is-on", v);
    renderAll();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
