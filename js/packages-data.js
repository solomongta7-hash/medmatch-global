/* ═══════════════════════════════════════════════════════════════
   MEDMATCH GLOBAL — CENTRAL PRICING & CONTENT DATA
   ⚡ THIS IS THE ONLY FILE YOU EDIT to change prices, hotels,
   nights, the coordination fee, WhatsApp number, or videos.
   Layout code never needs touching.
   ═══════════════════════════════════════════════════════════════ */

window.MM_DATA = {

  /* ── GLOBAL SETTINGS ─────────────────────────────────────────── */

  // EDIT HERE: your WhatsApp number, digits only, with country code
  whatsapp: "14375951735",

  // EDIT HERE: which currency is selected when the page loads
  defaultCurrency: "USD",

  // EDIT HERE: conversion rates FROM USD. All treatment/hotel prices
  // below are written in USD; CAD & GBP are auto-converted with these.
  rates: { USD: 1, CAD: 1.37, GBP: 0.79 },
  symbols: { USD: "$", CAD: "CA$", GBP: "£" },

  // EDIT HERE: your coordination fee, in USD (auto-converted).
  // To force exact amounts per currency instead, fill feeOverride,
  // e.g. { USD: 300, CAD: 400, GBP: 240 } — leave null to auto-convert.
  coordinationFee: 300,
  feeOverride: null,

  // EDIT HERE: the fee's display name (pick one, or write your own):
  //   "Patient Care & Coordination Fee"  (current)
  //   "Concierge Care Fee"
  //   "Treatment Coordination Service"
  feeName: "Patient Care & Coordination Fee",

  // EDIT HERE: hotel price per night in USD (breakfast included)
  hotel4PerNight: 55,
  hotel5PerNight: 95,

  city: "Antalya",

  /* ── PACKAGES ────────────────────────────────────────────────
     For each package:
       price   = treatment cost paid DIRECTLY to the clinic (USD)
       nights  = hotel nights included in the package
       visits  = number of trips to Türkiye
       days    = days needed in Antalya (shown to patient)
       includes = clinical inclusions list (edit freely)            */

  packages: [
    {
      id: "single-implant",
      name: "Single Dental Implant",
      tag: "Implants",
      desc: "One missing tooth, permanently restored — titanium implant, abutment and zirconia crown.",
      price: 550,            // EDIT HERE — paid directly to the clinic
      nights: 4,
      visits: 2,
      days: "3–4 days per visit",
      includes: [
        "Straumann or Nobel Biocare implant",
        "Zirconia crown included",
        "3D CT scan & panoramic X-ray",
        "2 visits, 8–10 weeks apart"
      ]
    },
    {
      id: "all-on-4",
      name: "All-on-4 Dental Implants",
      tag: "Implants",
      desc: "A full fixed arch on four implants — teeth in days, one jaw completely restored.",
      price: 4900,
      nights: 6,
      visits: 2,
      days: "5–6 days per visit",
      includes: [
        "4 premium implants (per jaw)",
        "Fixed temporary teeth same week",
        "Final zirconia bridge on visit 2",
        "3D CT scan & treatment simulation"
      ]
    },
    {
      id: "all-on-6",
      name: "All-on-6 Dental Implants",
      tag: "Implants",
      desc: "Six implants per jaw for maximum stability — the gold standard for full-arch restoration.",
      price: 6400,
      nights: 6,
      visits: 2,
      days: "5–6 days per visit",
      includes: [
        "6 premium implants (per jaw)",
        "Fixed temporary teeth same week",
        "Final zirconia bridge on visit 2",
        "3D CT scan & bone assessment"
      ]
    },
    {
      id: "full-mouth-implants",
      name: "Full Mouth Dental Implants",
      tag: "Implants",
      desc: "Both jaws fully restored — 8 implants with 24 zirconia crowns, a complete new smile.",
      price: 9100,
      nights: 7,
      visits: 2,
      days: "6–7 days per visit",
      includes: [
        "8 implants + 24 zirconia crowns",
        "Temporary teeth between visits",
        "3D CT scan, X-rays & lab work",
        "2 visits, 8–12 weeks apart"
      ]
    },
    {
      id: "emax-veneers",
      name: "E-max Veneers — Set of 20",
      tag: "Veneers",
      desc: "Ultra-thin, hand-layered E-max porcelain — the most natural-looking veneer made.",
      price: 6900,
      nights: 5,
      visits: 1,
      days: "5–7 days, single visit",
      includes: [
        "20 Ivoclar E-max veneers",
        "Digital smile design preview",
        "Shade-matched by master ceramist",
        "X-rays & try-in session included"
      ]
    },
    {
      id: "zirconia-crowns",
      name: "Zirconia Crowns — Full Set",
      tag: "Crowns",
      desc: "A complete set of premium zirconia crowns — strength and aesthetics for a full smile renewal.",
      price: 4400,
      nights: 5,
      visits: 1,
      days: "5–7 days, single visit",
      includes: [
        "20 premium zirconia crowns",
        "Digital smile design preview",
        "Temporary teeth while lab works",
        "X-rays & bite analysis included"
      ]
    },
    {
      id: "hollywood-smile",
      name: "Hollywood Smile Makeover",
      tag: "Smile Makeover",
      desc: "The complete transformation — crowns or veneers across your visible smile, designed to your face.",
      price: 4050,
      nights: 5,
      visits: 1,
      days: "5–7 days, single visit",
      includes: [
        "Full smile makeover (up to 20 teeth)",
        "Digital smile design preview",
        "Whitening of remaining teeth",
        "X-rays & aftercare kit included"
      ]
    },
    {
      id: "whitening",
      name: "Professional Teeth Whitening",
      tag: "Whitening",
      desc: "In-clinic laser whitening — several shades brighter in a single session.",
      price: 180,
      nights: 2,
      visits: 1,
      days: "1–2 days, single visit",
      includes: [
        "In-clinic laser whitening session",
        "Dental check-up & cleaning",
        "Take-home maintenance kit",
        "Perfect add-on to a holiday"
      ]
    }
  ],

  /* ── PATIENT STORY VIDEOS ────────────────────────────────────
     Paste the YouTube VIDEO ID (the part after v= or /shorts/).
     e.g. for youtube.com/shorts/AbCdEf12345 → videoId: "AbCdEf12345"
     Leave videoId "" until you have the real link — the card will
     show an elegant placeholder.                                   */

  videos: [
    { videoId: "m5Hog3mxFzk", name: "New smile, new beginning", flag: "", procedure: "Smile Design — Antalya" },
    { videoId: "UqyuXX1UIVM", name: "“Now my smile is gorgeous”", flag: "", procedure: "Smile Makeover" },
    { videoId: "KPmff8yt2A8", name: "Inga's new smile",          flag: "", procedure: "Smile Makeover" },
    { videoId: "t0z-Yte_zLY", name: "Shine like a star",         flag: "", procedure: "Smile Design" },
    { videoId: "OAxTq5Pl_pg", name: "Patient story",             flag: "", procedure: "Perla Dental Clinics" },
    { videoId: "9_qpYvqIOgM", name: "Patient story",             flag: "", procedure: "Perla Dental Clinics" }
  ],

  partnerClinic: "Perla Dental Clinics",

  /* ── PARTNERS — names & addresses (no website links by design) ── */

  partnersInfo: {
    perla: {
      name: "Perla Dental Clinics",
      type: "Dental Partner — Antalya",
      address: "Lara Caddesi, 1964. Sk. No:7, 07160 Muratpaşa / Antalya"
    },
    acibadem: {
      name: "Acıbadem Healthcare Group",
      type: "Partner Hospital Group — Istanbul",
      campuses: [
        { label: "Acıbadem Fulya Hospital — eye surgery", address: "Dikilitaş Mah. Hakkı Yeten Cad. Yeşilçimen Sok. No:23, 34349 Beşiktaş / Istanbul" },
        { label: "Acıbadem Kartal Hospital — hair transplantation", address: "Çavuşoğlu Mah. Sanayi Cad. No:1/1, Kartal / Istanbul" },
        { label: "Acıbadem Ataşehir Medical Center — hair transplantation", address: "Küçükbakkalköy Mah. Vedat Günyol Cad. No:36, Ataşehir / Istanbul" }
      ]
    },
    medicalpark: {
      name: "Medical Park Hospitals Group",
      type: "Partner Hospital Group — coming soon",
      address: ""   // EDIT HERE once the campus is confirmed with the price list
    }
  },

  /* ── ACIBADEM PRICE LIST ─────────────────────────────────────
     Official Acibadem international-patient rates, quoted in EUR
     and paid directly to the hospital. eurToUsd converts € to $
     for the approximate figures shown next to each price.
     EDIT HERE to update the rate or any price.                   */

  eurToUsd: 1.15,

  acibadem: {
    note: "Prices are quoted in euros (€) by the hospital and paid directly to Acıbadem. " +
          "Hotel nights are included only where stated. Our fixed Patient Care & Coordination Fee " +
          "is the only thing you ever pay MedMatch.",
    categories: [
      { title: "Breast", items: [
        { n: "Breast Augmentation + Lift (bilateral, implants included)", eur: 4300 },
        { n: "Breast Augmentation + Lift (bilateral)", eur: 4000 },
        { n: "Breast Reduction", eur: 4000 }
      ]},
      { title: "Face", items: [
        { n: "Rhinoplasty", eur: 3000 },
        { n: "Rhinoplasty — Complex", eur: 3500 },
        { n: "Bichectomy (buccal fat removal)", eur: 1600 },
        { n: "Otoplasty — bilateral (general anesthesia)", eur: 2200 },
        { n: "Otoplasty — bilateral (local anesthesia)", eur: 1900 },
        { n: "Blepharoplasty — bilateral upper eyelid", eur: 2200 },
        { n: "Blepharoplasty — bilateral lower eyelid", eur: 2000 },
        { n: "Blepharoplasty — upper + lower eyelids", eur: 3000 }
      ]},
      { title: "Body", items: [
        { n: "Gynecomastia (excisional)", eur: 3800 },
        { n: "Gynecomastia (with liposuction)", eur: 3000 },
        { n: "Labiaplasty / Nymphoplasty", eur: 2200 }
      ]},
      { title: "Filling & Lipofilling", items: [
        { n: "Filling", eur: 700 },
        { n: "Lipofilling — small (local anesthesia)", eur: 900 },
        { n: "Lipofilling — 2–3 regions (local anesthesia)", eur: 1100 },
        { n: "Lipofilling — 2–3 regions (general anesthesia)", eur: 1600 }
      ]},
      { title: "Liposuction", items: [
        { n: "Liposuction — 1 region", eur: 2200 },
        { n: "Liposuction — 2–3 regions", eur: 2750 },
        { n: "Liposuction — 4–5 regions", eur: 3300 },
        { n: "Laser Liposuction — 1 region", eur: 2200 },
        { n: "Laser Liposuction — 2–3 regions", eur: 3300 },
        { n: "Laser Liposuction — 5 regions", eur: 4000 }
      ]},
      { title: "Lifting", items: [
        { n: "Abdominoplasty (tummy tuck)", eur: 4000 },
        { n: "Abdominoplasty — Extended", eur: 4000 },
        { n: "Facelift — Midface", eur: 4300 },
        { n: "Facelift — Full face", eur: 5300 },
        { n: "Neck Lift", eur: 3500 },
        { n: "Endoscopic Brow Lift (J-Plasma)", eur: 2750 },
        { n: "Forehead Lift", eur: 5800 },
        { n: "Back Lift", eur: 3500 },
        { n: "360 Lifting", eur: 4400 },
        { n: "Arm Lift (Brachioplasty)", eur: 2750 },
        { n: "Thigh Lift", eur: 4000 },
        { n: "Buttock Lift", eur: 4000 }
      ]},
      { title: "Hair Transplantation — Kartal Hospital", items: [
        { n: "FUE Hair Transplant (2-night hotel included)", eur: 2500 },
        { n: "DHI Hair Transplant (2-night hotel included)", eur: 2700 }
      ]},
      { title: "Hair Transplantation — Ataşehir Medical Center", items: [
        { n: "FUE Hair Transplant", eur: 2300 },
        { n: "DHI Hair Transplant", eur: 2500 },
        { n: "FUE Hair Transplant (2-night hotel included)", eur: 2500 },
        { n: "DHI Hair Transplant (2-night hotel included)", eur: 2700 }
      ]},
      { title: "Health Check-Up", items: [
        { n: "Standard Check-Up", eur: 800 },
        { n: "Gold Check-Up", eur: 1200 },
        { n: "Premium Check-Up Package", eur: 2000 },
        { n: "Executive Check-Up (endoscopy + colonoscopy)", eur: 3800 },
        { n: "Executive Check-Up (full-body MRI)", eur: 3500 },
        { n: "Cardiac Check-Up", eur: 1700 },
        { n: "Lung Check-Up", eur: 1700 },
        { n: "Thyroid Package", eur: 400 },
        { n: "Women's Health Screening Package", eur: 300 },
        { n: "Breast Health Screening Panel (over 40)", eur: 350 },
        { n: "Breast Health Screening Panel (under 40)", eur: 250 }
      ]},
      { title: "Radiology & Imaging", items: [
        { n: "Brain MRI (3T, with or without contrast)", eur: 650 },
        { n: "Thorax MRI", eur: 650 },
        { n: "Leg MRI", eur: 650 },
        { n: "Knee MRI", eur: 650 },
        { n: "PET-CT", eur: 850 }
      ]},
      { title: "Eye Surgery — Fulya Hospital", items: [
        { n: "Pentacam (corneal tomography)", eur: 400 },
        { n: "iLASIK — both eyes", eur: 1500 },
        { n: "iLASIK — both eyes (2-night hotel included)", eur: 1700 },
        { n: "SMILE Laser — both eyes", eur: 2000 },
        { n: "SMILE Laser — both eyes (2-night hotel included)", eur: 2200 },
        { n: "Cataract Surgery (Phaco) — both eyes, lens included", eur: 5500 },
        { n: "Cataract Surgery (Phaco) — both eyes, lens included (5-night hotel)", eur: 6000 }
      ]},
      { title: "Weight Loss", items: [
        { n: "Gastric Balloon (endoscopic)", eur: 3500 },
        { n: "Gastric Balloon (swallowable)", eur: 3500 },
        { n: "Gastric Balloon removal", eur: 1500 },
        { n: "Gastric Botox", eur: 2000 },
        { n: "Gastric Sleeve (5-night hotel included)", eur: 5000 },
        { n: "Gastric Bypass (5-night hotel included)", eur: 6000 }
      ]}
    ]
  }
};
