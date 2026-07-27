/* ═══════════════════════════════════════════════════════════════
   TRUE COST CALCULATOR — pricing model
   ---------------------------------------------------------------
   The point of this file is the thing every other medical-travel
   calculator leaves out.

   A sticker-price calculator says "Türkiye $1,598, USA $7,600 —
   you save 79%". That number is not wrong, it is just not the
   number the patient actually pays. The real figure includes
   flights, hotel, meals, days not earning, the SECOND trip that
   implant work genuinely requires, and what it costs if something
   needs adjusting after you're home.

   That last item is why US dental patients choose Mexico over
   Türkiye: a $1,500 return flight for a 20-minute bite adjustment
   eats the saving. Hiding it wins the click and loses the patient
   at the moment they think it through. So we model it, out loud,
   and let the comparison stand on its own.

   All figures USD, indicative market rates — NOT MedMatch partner
   pricing, which is advisor-gated and must never appear here.
   ═══════════════════════════════════════════════════════════════ */

var FX = { USD: 1, CAD: 1.37, EUR: 0.92, GBP: 0.79 };
var SYM = { USD: "$", CAD: "CA$", EUR: "€", GBP: "£" };

/* Markets we compare against, per treatment. For hair the real
   alternative is not Mexico — it's Bangkok, which is where the
   researched, higher-budget patients have been going. */
var MARKETS = {
  turkiye: { label: "Türkiye",   short: "Türkiye", travel: true },
  usa:     { label: "United States", short: "USA",       travel: false },
  canada:  { label: "Canada",        short: "Canada",    travel: false },
  mexico:  { label: "Mexico",        short: "Mexico",    travel: true },
  thailand:{ label: "Thailand",      short: "Thailand",  travel: true }
};

/* ── Flights, return, per traveller ─────────────────────────── */
var REGIONS = {
  "us-east":    { label: "US — East Coast",  turkiye: [750, 1150], mexico: [200, 450], thailand: [1100, 1700] },
  "us-central": { label: "US — Midwest / South", turkiye: [800, 1250], mexico: [180, 420], thailand: [1150, 1750] },
  "us-west":    { label: "US — West Coast",  turkiye: [950, 1400], mexico: [150, 380], thailand: [900, 1500] },
  "ca-east":    { label: "Canada — Toronto / Montreal", turkiye: [780, 1200], mexico: [300, 600], thailand: [1200, 1800] },
  "ca-west":    { label: "Canada — Vancouver / Calgary", turkiye: [980, 1450], mexico: [280, 560], thailand: [1000, 1600] }
};

/* Nightly hotel + daily meals in each destination. Home markets
   cost nothing to stay in — that asymmetry is the whole point. */
var GROUND = {
  turkiye:  { hotel: 85, meals: 45 },
  mexico:   { hotel: 75, meals: 40 },
  thailand: { hotel: 65, meals: 35 },
  usa:      { hotel: 0,  meals: 0 },
  canada:   { hotel: 0,  meals: 0 }
};

/* ── Treatment catalogues ───────────────────────────────────── */

var DENTAL_IMPLANTS = [
  { id: "osstem",    label: "Osstem",          origin: "Korea",       note: "Widely used, strong osseointegration record, parts available worldwide.", price: { turkiye: 450, usa: 3400, canada: 2900, mexico: 1000 } },
  { id: "neodent",   label: "Neodent",         origin: "Brazil",      note: "Straumann-group system. Reliable, broad prosthetic range.",              price: { turkiye: 450, usa: 3400, canada: 2900, mexico: 1000 } },
  { id: "bego",      label: "BEGO",            origin: "Germany",     note: "German titanium engineering, well documented mid-premium option.",       price: { turkiye: 490, usa: 3600, canada: 3050, mexico: 1150 } },
  { id: "hiossen",   label: "Hiossen",         origin: "USA",         note: "US brand, advanced surface for faster healing. Easy to service at home.", price: { turkiye: 550, usa: 3500, canada: 3000, mexico: 1200 } },
  { id: "nobel",     label: "Nobel Biocare",   origin: "Switzerland", note: "50+ years of clinical documentation. A dentist anywhere will know it.",  price: { turkiye: 590, usa: 4200, canada: 3600, mexico: 1400 } },
  { id: "straumann", label: "Straumann BLX",   origin: "Switzerland", note: "Roxolid + SLActive. The reference standard, priced accordingly.",        price: { turkiye: 890, usa: 5000, canada: 4300, mexico: 1750 } }
];

var DENTAL_CROWNS = [
  { id: "none",      label: "No crowns yet",   origin: "",            note: "Implants only — restore later, possibly at home.",                       price: { turkiye: 0, usa: 0, canada: 0, mexico: 0 } },
  { id: "cadcam",    label: "CAD/CAM zirconia",origin: "",            note: "Durable, natural-looking, the standard choice.",                          price: { turkiye: 140, usa: 1250, canada: 1100, mexico: 350 } },
  { id: "layered",   label: "Layered zirconia",origin: "",            note: "Better translucency and light transmission than monolithic.",             price: { turkiye: 175, usa: 1450, canada: 1250, mexico: 420 } },
  { id: "straumann3d",label: "Straumann 3D multilayer", origin: "",   note: "Latest multilayer zirconium, enhanced fit and shade matching.",           price: { turkiye: 200, usa: 1600, canada: 1400, mexico: 500 } },
  { id: "emax",      label: "Ivoclar e.max",   origin: "",            note: "Lithium disilicate. Best aesthetics, front teeth especially.",            price: { turkiye: 220, usa: 1700, canada: 1500, mexico: 550 } }
];

var DENTAL_ADDONS = [
  { id: "sedation", label: "Sedation / general anaesthesia", price: { turkiye: 550, usa: 900, canada: 800, mexico: 420 } },
  { id: "graft",    label: "Bone graft (per site)",          price: { turkiye: 350, usa: 800, canada: 700, mexico: 400 } },
  { id: "sinus",    label: "Sinus lift",                     price: { turkiye: 700, usa: 2200, canada: 1900, mexico: 900 } },
  { id: "cbct",     label: "CBCT 3D scan",                   price: { turkiye: 90,  usa: 350, canada: 300, mexico: 80 } }
];

var HAIR_TECH = [
  { id: "fue", label: "Sapphire FUE", note: "Follicles extracted individually, incisions made with sapphire blades.", perGraft: { turkiye: 1.10, usa: 6.00, canada: 5.50, thailand: 2.40 } },
  { id: "dhi", label: "DHI",          note: "Implanter-pen placement. Denser packing, no pre-made incisions.",        perGraft: { turkiye: 1.30, usa: 7.00, canada: 6.30, thailand: 2.90 } }
];

var NOSE_TYPE = [
  { id: "primary", label: "Primary rhinoplasty", note: "First operation on an un-operated nose.",              price: { turkiye: 3300, usa: 11500, canada: 10000, mexico: 4500 } },
  { id: "septo",   label: "Septorhinoplasty",    note: "Appearance plus septum and breathing corrected together.", price: { turkiye: 3850, usa: 14000, canada: 12000, mexico: 5400 } },
  { id: "revision",label: "Revision rhinoplasty",note: "Correcting a previous operation. Harder, and priced that way.", price: { turkiye: 5200, usa: 18500, canada: 16000, mexico: 7500 } }
];

var KNEE_PROC = [
  { id: "arthro",   label: "Arthroscopy / meniscus", nights: 5,  price: { turkiye: 3800,  usa: 12500, canada: 10500, mexico: 6000 } },
  { id: "partial",  label: "Partial knee replacement", nights: 12, price: { turkiye: 8200,  usa: 26000, canada: 22000, mexico: 13000 } },
  { id: "total",    label: "Total knee replacement",  nights: 14, price: { turkiye: 10200, usa: 40000, canada: 33000, mexico: 17000 } },
  { id: "bilateral",label: "Bilateral (both knees)",  nights: 18, price: { turkiye: 17500, usa: 72000, canada: 60000, mexico: 30000 } }
];

/* ── Trip shapes ────────────────────────────────────────────
   nights = nights in the destination for the main trip.
   Home markets get zero travel days but the treatment still
   takes time off work, so daysOff is tracked separately.       */
var TRIP = {
  dental: { nights: 7,  homeDaysOff: 3, secondTripNights: 7 },
  hair:   { nights: 3,  homeDaysOff: 2, secondTripNights: 0 },
  nose:   { nights: 8,  homeDaysOff: 7, secondTripNights: 0 },
  knee:   { nights: 14, homeDaysOff: 14, secondTripNights: 0 }
};

var COMPARE = {
  dental: ["turkiye", "usa", "canada", "mexico"],
  hair:   ["turkiye", "usa", "canada", "thailand"],
  nose:   ["turkiye", "usa", "canada", "mexico"],
  knee:   ["turkiye", "usa", "canada", "mexico"]
};

var COMPLICATION_INSURANCE = 180;   // 12-month policy, indicative

/* ── Treatment cost in a given market ───────────────────────── */

function treatmentCost(cfg, market) {
  var t = cfg.treatment, sum = 0;

  if (t === "dental") {
    var imp = DENTAL_IMPLANTS.filter(function (b) { return b.id === cfg.implantBrand; })[0];
    var crn = DENTAL_CROWNS.filter(function (b) { return b.id === cfg.crownBrand; })[0];
    if (imp) sum += (imp.price[market] || 0) * cfg.implants;
    if (crn) sum += (crn.price[market] || 0) * cfg.crowns;
    DENTAL_ADDONS.forEach(function (a) {
      if (cfg.addons.indexOf(a.id) > -1) sum += (a.price[market] || 0);
    });
  }

  if (t === "hair") {
    var tech = HAIR_TECH.filter(function (x) { return x.id === cfg.hairTech; })[0];
    if (tech) sum += (tech.perGraft[market] || 0) * cfg.grafts;
  }

  if (t === "nose") {
    var n = NOSE_TYPE.filter(function (x) { return x.id === cfg.noseType; })[0];
    if (n) sum += (n.price[market] || 0);
  }

  if (t === "knee") {
    var k = KNEE_PROC.filter(function (x) { return x.id === cfg.kneeProc; })[0];
    if (k) sum += (k.price[market] || 0);
    sum += (market === "turkiye" ? 380 : market === "mexico" ? 450 : 1600) * cfg.physioWeeks;
  }

  return sum;
}

/* ── Does this plan genuinely need a second trip? ───────────
   Dental implants must osseointegrate — fuse to bone — before a
   permanent crown or bridge is loaded. That takes months. So an
   implants-AND-crowns plan is two trips, or one very long stay.
   "New teeth in three days" is the marketing version of skipping
   this, and it is the single most expensive thing a dental
   calculator can quietly leave out.                            */
function needsSecondTrip(cfg) {
  return cfg.treatment === "dental" && cfg.implants > 0 && cfg.crowns > 0;
}

function mid(range) { return (range[0] + range[1]) / 2; }

/* ── Full cost of one market ────────────────────────────────── */

function marketCost(cfg, market) {
  var trip = TRIP[cfg.treatment];
  var m = MARKETS[market];
  var travellers = cfg.companion ? 2 : 1;
  var rate = cfg.dayRate || 0;

  var out = {
    market: market,
    treatment: treatmentCost(cfg, market),
    flights: 0, hotel: 0, meals: 0, insurance: 0,
    secondTrip: 0, daysOff: 0, timeOff: 0,
    trips: 1
  };

  if (!m.travel) {
    // Treated at home: no flights, no hotel, but still time off work.
    out.daysOff = trip.homeDaysOff;
    out.timeOff = out.daysOff * rate;
    out.total = out.treatment + out.timeOff;
    return out;
  }

  var region = REGIONS[cfg.region];
  var flightEach = mid(region[market] || region.turkiye);
  var g = GROUND[market];
  var nights = trip.nights;

  out.flights = flightEach * travellers;
  out.hotel   = g.hotel * nights;
  out.meals   = g.meals * (nights + 1) * travellers;
  out.daysOff = nights + 2;

  if (cfg.insurance && market === "turkiye") out.insurance = COMPLICATION_INSURANCE;

  // The second trip, priced honestly rather than hidden.
  if (needsSecondTrip(cfg) && trip.secondTripNights) {
    var n2 = trip.secondTripNights;
    out.secondTrip = flightEach * travellers + g.hotel * n2 + g.meals * (n2 + 1) * travellers;
    out.daysOff += n2 + 2;
    out.trips = 2;
  }

  out.timeOff = out.daysOff * rate;
  out.total = out.treatment + out.flights + out.hotel + out.meals
            + out.insurance + out.secondTrip + out.timeOff;
  return out;
}

/* ── What one follow-up trip back would cost ────────────────
   Presented as a scenario, never as a probability. We have no
   defensible failure rate to quote, and inventing one would be
   exactly the sort of number this tool exists to expose.       */
function returnTripCost(cfg, market) {
  var m = MARKETS[market];
  if (!m.travel) return { flights: 0, stay: 0, timeOff: 0, total: 0, nights: 0 };

  var region = REGIONS[cfg.region];
  var g = GROUND[market];
  var nights = cfg.treatment === "dental" ? 4 : 5;
  var flights = mid(region[market] || region.turkiye);   // one traveller for a fix-up
  var stay = g.hotel * nights + g.meals * (nights + 1);
  var timeOff = (nights + 2) * (cfg.dayRate || 0);
  return { flights: flights, stay: stay, timeOff: timeOff, total: flights + stay + timeOff, nights: nights };
}

function compare(cfg) {
  var rows = COMPARE[cfg.treatment].map(function (mk) {
    var c = marketCost(cfg, mk);
    c.returnTrip = returnTripCost(cfg, mk);
    c.withOneReturn = c.total + c.returnTrip.total;
    return c;
  });

  var tr = rows.filter(function (r) { return r.market === "turkiye"; })[0];
  var home = rows.filter(function (r) { return r.market === "usa" || r.market === "canada"; });
  var homeRef = cfg.region.indexOf("ca-") === 0
    ? rows.filter(function (r) { return r.market === "canada"; })[0]
    : rows.filter(function (r) { return r.market === "usa"; })[0];
  var rival = rows.filter(function (r) {
    return r.market === "mexico" || r.market === "thailand";
  })[0];

  var cheapest = rows.slice().sort(function (a, b) { return a.total - b.total; })[0];

  return {
    rows: rows, turkiye: tr, home: home, homeRef: homeRef, rival: rival,
    cheapest: cheapest,
    saveVsHome: Math.max(homeRef.total - tr.total, 0),
    savePct: homeRef.total > 0 ? Math.round(Math.max(homeRef.total - tr.total, 0) / homeRef.total * 100) : 0,

    /* Three genuinely different situations against the nearby rival, and
       the copy has to say which one it is. Collapsing them into a boolean
       is how a calculator ends up claiming Türkiye "stays ahead" on a
       plan where the table right above it shows otherwise.
         "ahead"  — cheaper before and after a trip back
         "flips"  — cheaper up front, dearer once you go back once
         "behind" — already dearer, before anyone goes anywhere        */
    rivalVerdict: !rival ? "none"
      : (tr.total >= rival.total ? "behind"
        : (tr.withOneReturn > rival.withOneReturn ? "flips" : "ahead")),
    rivalGap: rival ? rival.total - tr.total : 0,
    rivalGapWithReturn: rival ? rival.withOneReturn - tr.withOneReturn : 0
  };
}

function fx(usd, currency) { return usd * (FX[currency] || 1); }

function money(usd, currency) {
  var v = fx(usd, currency);
  return (SYM[currency] || "$") + Math.round(v).toLocaleString("en-US");
}
