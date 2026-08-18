/* Hair — hairline design, not a fake result.

   This started as a filter that drew hair onto the forehead. Three
   rewrites in, it still produced either a comb of drawn lines or a
   translucent smudge, and on a man who was not balding it invented a
   recession and then filled it. Convincing hair synthesis needs a
   trained generative model; procedural drawing does not get there, and
   a bad hair filter in an advert costs more trust than it wins.

   So this does the thing a surgeon does at a consultation instead: it
   finds where the hairline sits now, draws where it could be moved to,
   and estimates the grafts needed to cover the difference. It is
   obviously a plan rather than a photograph of a result, which makes it
   both honest and more useful — the patient can send it to a clinic and
   ask whether the number is right.

   Detection still uses the skull and hair masks from the earlier
   attempt, because knowing where hair actually is was the part that
   worked. */

import { IDX, pt, dist, faceScale, polygon } from "./face.js";

const FILL_RECESSION = 0.85;   // how much of a receded temple gets filled
const UNIFORM_DROP = 0.10;     // extra lowering, as a fraction of eye-to-eye

/* Outer canthal distance — eye outer corner to eye outer corner —
   averages about 90mm in adults. It is the only real-world ruler a
   single photo offers, and every millimetre figure below is derived
   from it, so all of them are approximations and are labelled as such
   wherever they reach the patient. */
const OUTER_CANTHAL_MM = 90;

/* Grafts per square centimetre a surgeon will typically place in the
   hairline zone. Quoted as a range because it is one. */
const GRAFTS_PER_CM2 = [40, 50];

/**
 * @param {CanvasRenderingContext2D} ctx  canvas holding the photo
 * @param {Array} lm
 * @param {{hairline:number}} opts  0..1
 * @returns {{ok:boolean, reason?:string, applied?:boolean, grafts?:[number,number], areaCm2?:number}}
 */
export function applyHair(ctx, lm, opts) {
  const advance = opts.hairline ?? 0;

  const S = faceScale(lm);
  const cw = ctx.canvas.width, ch = ctx.canvas.height;
  const mmPerPx = OUTER_CANTHAL_MM / S;

  const browY = Math.min(
    ...IDX.browL.map(i => pt(lm, i).y),
    ...IDX.browR.map(i => pt(lm, i).y)
  );
  const templeL = pt(lm, IDX.templeL), templeR = pt(lm, IDX.templeR);
  const arcTop = Math.min(...polygon(lm, IDX.hairlineArc).map(p => p.y));

  const headCx = (templeL.x + templeR.x) / 2;
  const headRx = (dist(templeL, templeR) / 2) * 1.12;
  const skullTop = arcTop - S * 0.62;
  const headCy = browY;
  const headRy = headCy - skullTop;

  if (skullTop < 2) return { ok: false, reason: "cropped" };
  if (headRx < 12 || headRy < 12) return { ok: false, reason: "framing" };

  const x0 = Math.max(0, Math.floor(headCx - headRx - S * 0.1));
  const y0 = Math.max(0, Math.floor(skullTop - S * 0.1));
  const x1 = Math.min(cw, Math.ceil(headCx + headRx + S * 0.1));
  const y1 = Math.min(ch, Math.ceil(browY + S * 0.12));
  const w = x1 - x0, h = y1 - y0;
  if (w < 24 || h < 24) return { ok: false, reason: "framing" };

  const region = ctx.getImageData(x0, y0, w, h);
  const d = region.data;

  const skin = medianPatch(d, w, h, headCx - x0, (browY - y0) - S * 0.14, S * 0.20);
  const hair = medianPatch(d, w, h, headCx - x0, (arcTop - y0) - S * 0.34, S * 0.18);
  if (!skin || !hair) return { ok: false, reason: "framing" };
  if (colourDist(skin, hair) < 22) return { ok: false, reason: "no-hair" };

  const skull = ellipseMask(w, h, headCx - x0, headCy - y0, headRx, headRy);
  const hairMask = classifyHair(d, w, h, skin, hair, skull);

  /* Only the frontal hairline is of interest, and only the frontal
     hairline is measurable from this angle. Tracing the full head width
     followed the hair down the side of the skull to the sideburns and
     reported a hairline level with the eyebrows. */
  const tx0 = Math.max(0, Math.round(templeL.x - x0));
  const tx1 = Math.min(w - 1, Math.round(templeR.x - x0));
  /* A frontal hairline cannot sit lower than this; anything below is
     side hair, a fringe hanging forward, or an eyebrow. */
  const maxY = (browY - y0) - S * 0.30;

  const line = traceHairline(hairMask, w, h, tx0, tx1, maxY);

  /* ── proposed hairline ─────────────────────────────────────────── */
  const centre = [];
  for (let x = Math.round(w * 0.35); x < Math.round(w * 0.65); x++) {
    if (line[x] >= 0) centre.push(line[x]);
  }
  if (centre.length < 4) return { ok: false, reason: "no-hair" };
  centre.sort((a, b) => a - b);
  const midY = centre[centre.length >> 1];

  const browLocal = browY - y0;
  const target = new Float32Array(w).fill(-1);
  let areaPx = 0;

  for (let x = 0; x < w; x++) {
    if (line[x] < 0) continue;
    /* A receded temple sits higher up the head — smaller y. */
    const recession = Math.max(0, midY - line[x]);
    const drop = advance * (recession * FILL_RECESSION + S * UNIFORM_DROP);
    /* Never past the brow, never past a plausible hairline height. */
    const limit = Math.min(browLocal - S * 0.28, line[x] + S * 0.34);
    target[x] = Math.min(line[x] + drop, limit);
    if (target[x] > line[x]) areaPx += target[x] - line[x];
  }

  /* ── draw the design ───────────────────────────────────────────── */
  const g = ctx;
  g.save();
  g.translate(x0, y0);

  /* Coverage zone: the area that would need grafting. */
  if (areaPx > 0) {
    g.beginPath();
    let started = false;
    for (let x = 0; x < w; x++) {
      if (line[x] < 0) continue;
      if (!started) { g.moveTo(x, line[x]); started = true; }
      else g.lineTo(x, line[x]);
    }
    for (let x = w - 1; x >= 0; x--) {
      if (target[x] < 0) continue;
      g.lineTo(x, target[x]);
    }
    g.closePath();
    g.fillStyle = "rgba(47,169,164,0.28)";
    g.fill();
  }

  /* Current hairline — dashed, the way it gets marked before surgery. */
  strokeCurve(g, line, w, "rgba(255,255,255,0.85)", Math.max(1.2, S * 0.012), [6, 5]);
  /* Proposed hairline — solid. */
  if (areaPx > 0) {
    strokeCurve(g, target, w, "rgba(47,169,164,1)", Math.max(1.6, S * 0.016), []);
  }

  g.restore();

  /* ── graft estimate ────────────────────────────────────────────── */
  const areaCm2 = (areaPx * mmPerPx * mmPerPx) / 100;
  const grafts = [
    Math.round(areaCm2 * GRAFTS_PER_CM2[0] / 50) * 50,
    Math.round(areaCm2 * GRAFTS_PER_CM2[1] / 50) * 50
  ];

  return { ok: true, applied: areaPx > 0, areaCm2, grafts };
}

function strokeCurve(g, arr, w, colour, width, dash) {
  g.save();
  g.setLineDash(dash);
  g.strokeStyle = colour;
  g.lineWidth = width;
  g.lineJoin = "round";
  g.lineCap = "round";
  g.beginPath();
  let started = false;
  for (let x = 0; x < w; x++) {
    if (arr[x] < 0) { started = false; continue; }
    if (!started) { g.moveTo(x, arr[x]); started = true; }
    else g.lineTo(x, arr[x]);
  }
  g.stroke();
  g.restore();
}

/* Soft-edged ellipse coverage, 0..1. */
function ellipseMask(w, h, cx, cy, rx, ry) {
  const m = new Float32Array(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const dx = (x - cx) / rx, dy = (y - cy) / ry;
      const r = Math.sqrt(dx * dx + dy * dy);
      m[y * w + x] = r >= 1 ? 0 : r <= 0.92 ? 1 : (1 - r) / 0.08;
    }
  }
  return m;
}

/* Hair pixels: inside the skull, and closer to the hair sample than to
   the skin sample. */
function classifyHair(d, w, h, skin, hair, skull) {
  const m = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) {
    if (skull[i] < 0.5) continue;
    const o = i << 2;
    const c = { r: d[o], g: d[o + 1], b: d[o + 2] };
    if (colourDist(c, hair) < colourDist(c, skin)) m[i] = 1;
  }
  return m;
}

/* Walk DOWN each column: skip anything above the head, find where hair
   starts, follow it, record where it ends. A column with no hair run at
   all is left invalid rather than guessed at. */
function traceHairline(hairMask, w, h, tx0, tx1, maxY) {
  const raw = new Float32Array(w).fill(-1);
  const stop = Math.min(h, Math.max(4, Math.floor(maxY)));

  for (let x = tx0; x <= tx1; x++) {
    let y = 0;
    while (y < stop && !hairMask[y * w + x]) y++;
    if (y >= stop) continue;            // no hair above the cut-off

    let gap = 0, end = y;
    while (y < stop) {
      if (hairMask[y * w + x]) { end = y; gap = 0; }
      else if (++gap > Math.max(2, h * 0.03)) break;
      y++;
    }
    raw[x] = end;
  }

  const r = Math.max(3, Math.round((tx1 - tx0) * 0.06));
  const out = new Float32Array(w).fill(-1);
  for (let i = tx0; i <= tx1; i++) {
    if (raw[i] < 0) continue;
    let s = 0, n = 0;
    for (let k = -r; k <= r; k++) {
      const j = i + k;
      if (j < tx0 || j > tx1 || raw[j] < 0) continue;
      s += raw[j]; n++;
    }
    if (n) out[i] = s / n;
  }
  return out;
}

function medianPatch(d, w, h, cx, cy, rad) {
  const R = [], G = [], B = [];
  const xa = Math.max(0, cx - rad | 0), xb = Math.min(w - 1, cx + rad | 0);
  const ya = Math.max(0, cy - rad | 0), yb = Math.min(h - 1, cy + rad | 0);
  for (let y = ya; y <= yb; y += 2) {
    for (let x = xa; x <= xb; x += 2) {
      const o = (y * w + x) << 2;
      R.push(d[o]); G.push(d[o + 1]); B.push(d[o + 2]);
    }
  }
  if (R.length < 6) return null;
  const med = a => { a.sort((p, q) => p - q); return a[a.length >> 1]; };
  const r = med(R), g = med(G), b = med(B);
  return { r, g, b };
}

const colourDist = (a, b) =>
  a && b ? Math.hypot(a.r - b.r, a.g - b.g, a.b - b.b) : 999;
