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
    { videoId: "", name: "Sarah",   flag: "🇺🇸", procedure: "Hollywood Smile" },   // EDIT HERE — video 1
    { videoId: "", name: "Michael", flag: "🇨🇦", procedure: "All-on-4" },          // EDIT HERE — video 2
    { videoId: "", name: "Jennifer",flag: "🇺🇸", procedure: "E-max Veneers" },     // EDIT HERE — video 3
    { videoId: "", name: "David",   flag: "🇬🇧", procedure: "Full Mouth Implants"},// EDIT HERE — video 4
    { videoId: "", name: "Amanda",  flag: "🇨🇦", procedure: "Zirconia Crowns" },   // EDIT HERE — video 5
    { videoId: "", name: "Robert",  flag: "🇺🇸", procedure: "Single Implant" }     // EDIT HERE — video 6
  ],

  partnerClinic: "Perla Dental Clinics"
};
