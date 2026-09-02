/* ═══════════════════════════════════════════════════════════════
   MEDMATCH GLOBAL — META PIXEL

   ⚡ TO TURN THIS ON: paste your Pixel ID below, or double-click
   "Set Meta Pixel ID.cmd" on the Desktop, which writes it here
   for you.

   Get the ID at https://business.facebook.com → Events Manager →
   Data sources. It's the 15–16 digit number under the dataset
   name. Public value, safe to commit — it appears in the page
   source of every site running a pixel. NEVER put a Conversions
   API access token here; that one is a secret and belongs on a
   server, not in a file the whole internet can read.

   Until the ID is filled in, this file does nothing at all.

   Modelled on js/analytics.js, deliberately: same single edit
   point, same localhost guard, same respect for browser opt-outs.

   ── WHAT THIS IS ALLOWED TO SEND ──────────────────────────────

   Five events, all of them parameterless. Nothing else, ever:

     PageView         which page was opened
     ViewContent      somebody opened the cost calculator
     CalcTripStep     they got as far as the trip questions
     InitiateCheckout they reached their own number
     Lead             they submitted the form

   The middle three are the funnel, added 2026-09-02. They exist
   because the Apps Script "Events" sheet has never recorded a
   single row (it was never created, so every write throws), which
   left the site with no drop-off data at all. The pixel is the one
   counter already installed that can be read back.

   They are STEP MARKERS AND NOTHING MORE. Each fires once per
   session, carries no payload, and says only how far somebody got
   through a form — never what they were asking about. A visitor
   who opens true-cost.html already sends PageView from that URL,
   so these reveal nothing about a person that Meta did not have.

   What it must never send, and does not:

     • the verdict (READY / CLINICAL REVIEW / OUT OF REGION …)
     • which treatment they picked
     • the readiness score
     • the estimate itself, as a value or in any other form
     • any answer, note, name, email or phone number

   Every one of those describes somebody's health or identity.
   Sending health data to an ad platform is what the large US
   hospital settlements were about. A Lead event with no payload
   tells Meta "optimise towards more of these" and tells it
   nothing about the person — which is the whole of what the ads
   need.

   autoConfig is switched off below for the same reason: left on,
   Meta's pixel reads form fields on the page by itself, and the
   forms on this site are where patients type their history.
   ═══════════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  /* ── EDIT HERE ────────────────────────────────────────────── */
  var PIXEL_ID = "1061035182968684";
  /* ─────────────────────────────────────────────────────────── */

  /* Local dev must not land in the ad account's data. serve.ps1
     runs on localhost:5581, and pages get opened straight off disk. */
  function isLocal() {
    var h = location.hostname;
    return (
      location.protocol === "file:" ||
      h === "" ||
      h === "localhost" ||
      h === "127.0.0.1" ||
      h === "::1" ||
      /^192\.168\./.test(h) ||
      /^10\./.test(h) ||
      /\.local$/.test(h)
    );
  }

  /* Global Privacy Control is legally binding under the CCPA for
     Californian visitors, and the right default everywhere given
     what this site is about. */
  function optedOut() {
    return (
      navigator.globalPrivacyControl === true ||
      navigator.doNotTrack === "1" ||
      window.doNotTrack === "1" ||
      navigator.msDoNotTrack === "1"
    );
  }

  /* Meta's official loader. */
  function loadPixel(id) {
    /* eslint-disable */
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    /* eslint-enable */

    /* Off before init, so it never applies: stops the pixel reading
       form fields on the page of its own accord. */
    window.fbq("set", "autoConfig", false, id);
    window.fbq("init", id);
    window.fbq("track", "PageView");
  }

  /* The one call the rest of the site is allowed to make.
     Defined whether or not the pixel loaded, so book.html can call
     it without knowing anything about any of this.

     No arguments on purpose. If you ever find yourself wanting to
     pass the verdict through here, read the block at the top again. */
  var alreadySent = false;
  window.mmLead = function () {
    if (alreadySent) return;          // a retried submit is one lead, not two
    alreadySent = true;
    if (window.fbq) window.fbq("track", "Lead");
  };

  /* Funnel steps. Same discipline as mmLead: a stage name from a
     fixed list and nothing else — no treatment, no configuration,
     no estimate. If you ever find yourself wanting to pass one of
     those through here, read the block at the top again.

     Mapped onto Meta's standard events where one fits, because
     standard events are readable straight out of ads reporting;
     the trip step has no honest standard equivalent, so it stays
     a custom event rather than being mislabelled as a shopping
     one on a site about surgery. */
  var STEP_EVENTS = {
    view:  ["track", "ViewContent"],
    step2: ["trackCustom", "CalcTripStep"],
    step3: ["track", "InitiateCheckout"]
  };
  var sentStep = {};
  /* Steps that arrived before the pixel had loaded. Holding them is
     the whole point: this file defines mmStep well before it calls
     loadPixel, and true-cost/app.js reports "step3" during init —
     early enough that fbq does not exist yet. Dropping those while
     still marking them sent lost the step permanently and made the
     funnel look like nobody ever reached their number. */
  var pending = [];
  window.mmStep = function (stage) {
    var ev = STEP_EVENTS[stage];
    if (!ev) return;                  // lead_submit/lead_ok/lead_fail: mmLead's job
    if (sentStep[stage]) return;      // a funnel counts people, not tab-flips
    sentStep[stage] = true;
    if (window.fbq) window.fbq(ev[0], ev[1]);
    else pending.push(ev);            // flushed right after loadPixel below
  };

  /* Steps recorded by pages that ran before this deferred file did. */
  (window.mmStepQueue || []).forEach(function (stage) { window.mmStep(stage); });
  window.mmStepQueue = { push: function (stage) { window.mmStep(stage); } };

  if (!PIXEL_ID) return;              // not configured yet — stay inert
  if (isLocal()) return;              // local dev
  if (optedOut()) return;             // visitor asked not to be tracked

  loadPixel(PIXEL_ID);

  /* fbq exists from here on — Meta's loader installs a queueing stub
     synchronously — so anything mmStep held can go now. If one of the
     guards above returned instead, pending is simply never flushed,
     which is the correct behaviour for a visitor who opted out. */
  while (pending.length) {
    var q = pending.shift();
    window.fbq(q[0], q[1]);
  }
})();
