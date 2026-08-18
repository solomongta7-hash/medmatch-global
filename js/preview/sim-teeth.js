/* Dental preview — whitening and alignment.

   Two separate effects, deliberately kept on separate sliders because
   they are separate purchases: whitening is a cheap add-on, alignment
   means crowns or veneers. A patient who drags only the first slider
   and is happy has told us something useful about what they actually
   want.

   The alignment pass is the interesting one, and three things had to be
   true before it stopped looking like a sticker:

   - The arch is measured out of the classified pixels, not positioned
     from the lip landmarks, so it follows this smile's own curve.
   - It is relit by a heavily blurred copy of the patient's own mouth
     luminance, so it inherits their lighting instead of arriving flat.
   - The high-frequency part of their enamel is added back over the
     fill, so the surface keeps its grain rather than going plastic.

   Drop any one of them and it reads as edited. */

import { IDX, pt, dist, polygon, bounds, mouthOpenRatio } from "./face.js";
import { drawBlurred, blurInPlace } from "./blur.js";

/**
 * @param {CanvasRenderingContext2D} ctx  canvas already holding the photo
 * @param {Array} lm                      landmarks in pixel space
 * @param {{whiten:number, align:number}} opts  both 0..1
 */
export function applyTeeth(ctx, lm, opts) {
  const whiten = opts.whiten ?? 0;
  const align = opts.align ?? 0;
  if (whiten <= 0 && align <= 0) return { ok: true, applied: false };

  const open = mouthOpenRatio(lm);
  if (open < 0.06) {
    return { ok: false, reason: "closed" };
  }

  const inner = polygon(lm, IDX.lipsInner);
  const bb = bounds(inner, 6);
  const x0 = Math.max(0, Math.floor(bb.x0));
  const y0 = Math.max(0, Math.floor(bb.y0));
  const x1 = Math.min(ctx.canvas.width, Math.ceil(bb.x1));
  const y1 = Math.min(ctx.canvas.height, Math.ceil(bb.y1));
  const w = x1 - x0, h = y1 - y0;
  if (w < 8 || h < 6) return { ok: false, reason: "small" };

  /* ── 1. mouth-opening mask, feathered ──────────────────────────── */
  const mask = buildMask(inner, x0, y0, w, h);

  /* ── 2. classify which of those pixels are tooth ───────────────── */
  const region = ctx.getImageData(x0, y0, w, h);
  const tooth = classifyTeeth(region, mask, w, h);
  if (tooth.count < w * h * 0.02) {
    return { ok: false, reason: "no-teeth" };
  }

  /* ── 3. alignment: synthetic arch under the patient's own light ── */
  if (align > 0) {
    drawArch(region, tooth, mask, lm, x0, y0, w, h, align);
  }

  /* ── 4. whitening ──────────────────────────────────────────────── */
  if (whiten > 0) {
    whitenPixels(region, tooth, whiten);
  }

  ctx.putImageData(region, x0, y0);
  return { ok: true, applied: true };
}

/* Feathered coverage mask for the mouth opening, 0..1 per pixel.
   Drawn on an offscreen canvas so the browser's own polygon rasteriser
   and blur do the work. */
function buildMask(poly, ox, oy, w, h) {
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  const g = c.getContext("2d", { willReadFrequently: true });

  g.fillStyle = "#000";
  g.fillRect(0, 0, w, h);
  g.fillStyle = "#fff";
  g.beginPath();
  poly.forEach((p, i) => {
    const x = p.x - ox, y = p.y - oy;
    i ? g.lineTo(x, y) : g.moveTo(x, y);
  });
  g.closePath();
  g.fill();
  blurInPlace(c, Math.max(1, Math.round(Math.min(w, h) * 0.05)));

  const d = g.getImageData(0, 0, w, h).data;
  const m = new Float32Array(w * h);
  for (let i = 0; i < m.length; i++) m[i] = d[i << 2] / 255;
  return m;
}

/* Inside the mouth there are three things: teeth, gum, and the dark
   cavity behind them. Teeth are the brightest and least saturated, gum
   is the reddest. Rather than a fixed threshold — which fails on dark
   skin, warm indoor light, and phone auto-exposure alike — the cut is
   taken from the brightness distribution inside this particular mouth. */
function classifyTeeth(img, mask, w, h) {
  const d = img.data;
  const lum = new Float32Array(w * h);
  const samples = [];

  for (let i = 0; i < w * h; i++) {
    const o = i << 2;
    const r = d[o], g = d[o + 1], b = d[o + 2];
    const L = 0.299 * r + 0.587 * g + 0.114 * b;
    lum[i] = L;
    if (mask[i] > 0.5) samples.push(L);
  }
  if (!samples.length) return { weight: new Float32Array(w * h), count: 0, lum };

  samples.sort((a, b) => a - b);
  /* Split at the upper-middle of the in-mouth brightness range. The
     cavity and the gum sit below it in every lighting condition we
     tested against; the incisal edges sit well above. */
  const lo = samples[Math.floor(samples.length * 0.45)];
  const hi = samples[Math.floor(samples.length * 0.92)];
  const span = Math.max(hi - lo, 12);

  const weight = new Float32Array(w * h);
  let count = 0;

  for (let i = 0; i < w * h; i++) {
    if (mask[i] < 0.05) continue;
    const o = i << 2;
    const r = d[o], g = d[o + 1], b = d[o + 2];

    /* brightness term */
    let t = (lum[i] - lo) / span;
    t = t < 0 ? 0 : t > 1 ? 1 : t;

    /* redness term — pushes gum and inner lip out of the set */
    const red = (r - (g + b) / 2) / (r + 1);
    const notGum = red > 0.28 ? 0 : red < 0.16 ? 1 : (0.28 - red) / 0.12;

    const wgt = t * t * (3 - 2 * t) * notGum * mask[i];
    weight[i] = wgt;
    if (wgt > 0.35) count++;
  }
  return { weight, count, lum };
}

/* Shift tooth pixels toward a lighter, less yellow shade.

   Yellowness in a tooth is mostly a blue deficit, so the correction is
   mostly a blue lift with a smaller green one — pushing all three
   channels equally just blows the highlights out and gives the
   denture-white look that makes these tools embarrassing. The lift is
   also capped relative to the pixel's own headroom so incisal edges
   that are already near white do not clip to flat grey. */
function whitenPixels(img, tooth, amount) {
  const d = img.data, W = tooth.weight;
  const a = amount * 0.85;

  for (let i = 0; i < W.length; i++) {
    const k = W[i];
    if (k < 0.02) continue;
    const o = i << 2;
    const r = d[o], g = d[o + 1], b = d[o + 2];
    const f = k * a;

    /* neutralise the yellow cast */
    const target = Math.max(r, g);
    const nb = b + (target - b) * 0.75;
    const ng = g + (target - g) * 0.25;

    /* lift luminance into the remaining headroom */
    const head = 255 - Math.max(r, ng, nb);
    const lift = head * 0.45;

    d[o]     = r  + ((r  + lift) - r)  * f;
    d[o + 1] = g  + ((ng + lift) - g)  * f;
    d[o + 2] = b  + ((nb + lift) - b)  * f;
  }
}

/* Find the band occupied by the upper teeth, column by column.

   This replaced an earlier version that positioned the arch from the
   lip landmarks. That approach put a rectangular block of teeth into a
   curved smile, and the result was unmistakably a row of piano keys.
   Reading the band out of the classified pixels instead means the arch
   automatically follows this particular smile — its curve, its height,
   and how much tooth is actually showing at each point. */
function upperBand(tooth, w, h) {
  const W = tooth.weight;
  const top = new Float32Array(w).fill(-1);
  const bot = new Float32Array(w).fill(-1);

  for (let x = 0; x < w; x++) {
    let y = 0;
    while (y < h && W[y * w + x] < 0.4) y++;
    if (y >= h) continue;
    const t = y;
    /* Walk down to the first sustained break. That break is the gap
       between the upper and lower arch; anything past it belongs to the
       lower teeth, which we deliberately leave alone. */
    let gap = 0;
    while (y < h) {
      if (W[y * w + x] < 0.25) { gap++; if (gap > 2) break; }
      else gap = 0;
      y++;
    }
    if (y - gap - t < 2) continue;
    top[x] = t;
    bot[x] = y - gap;
  }
  return { top, bot };
}

/* Smooth a per-column curve across the gaps where no tooth was found. */
function smoothCurve(src, w, radius) {
  const out = new Float32Array(w).fill(-1);
  for (let x = 0; x < w; x++) {
    let sum = 0, n = 0;
    for (let k = -radius; k <= radius; k++) {
      const j = x + k;
      if (j < 0 || j >= w || src[j] < 0) continue;
      const wt = 1 - Math.abs(k) / (radius + 1);
      sum += src[j] * wt; n += wt;
    }
    if (n > 0) out[x] = sum / n;
  }
  return out;
}

/* Redraw the upper arch inside the band the real teeth occupy.

   "Alignment" is the difference between the measured band and a
   smoothed version of it: a jagged incisal edge becomes an even curve,
   uneven tooth heights level out, and the separations land on a regular
   spacing instead of wherever they happen to be. Everything stays
   inside the patient's own smile, which is why it does not read as a
   sticker.

   The base colour is sampled from their own teeth rather than fixed at
   white — shade is the whitening slider's job, and an arch that always
   arrived bright white would make the two sliders do the same thing. */
function drawArch(img, tooth, mask, lm, ox, oy, w, h, amount) {
  const mouthW = dist(pt(lm, IDX.mouthL), pt(lm, IDX.mouthR));
  const band = upperBand(tooth, w, h);

  const radius = Math.max(3, Math.round(mouthW * 0.10));
  const sTop = smoothCurve(band.top, w, radius);
  const sBot = smoothCurve(band.bot, w, radius);

  /* Columns where a band was actually measured, and thick enough to be
     real tooth rather than a stray bright pixel in the corner shadow.
     Without the thickness test the arch runs all the way into the
     commissure and paints teeth over the dark corner of the mouth. */
  let maxTh = 0;
  for (let x = 0; x < w; x++) {
    if (band.top[x] >= 0) maxTh = Math.max(maxTh, band.bot[x] - band.top[x]);
  }
  const minTh = maxTh * 0.28;

  let first = -1, last = -1;
  for (let x = 0; x < w; x++) {
    if (band.top[x] >= 0 && band.bot[x] - band.top[x] >= minTh) {
      if (first < 0) first = x;
      last = x;
    }
  }
  if (first < 0 || last - first < 8) return;

  /* Base tooth colour: the brighter half of their own enamel, so the
     redraw inherits their natural shade and warmth. */
  const base = medianToothColour(img, tooth, w, h);

  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  const g = c.getContext("2d", { willReadFrequently: true });

  /* Tooth boundaries: centrals widest, tapering to the corners. The
     midline is placed at the centre of the measured band rather than at
     the mouth centre, so an off-centre smile stays off-centre. */
  const mid = (first + last) / 2;
  const half = (last - first) / 2;
  const span = last - first;
  const rel = [0.34, 0.42, 0.50, 0.62, 0.62, 0.50, 0.42, 0.34];
  const total = rel.reduce((a, b) => a + b, 0);
  const edges = [first];
  let acc = 0;
  for (const r of rel) { acc += r; edges.push(first + (acc / total) * (last - first)); }

  /* Per-tooth shape, centre outward and mirrored. A row of equal
     rectangles is the thing that makes a redrawn smile look drawn, and
     almost all of that read comes from a dead-straight incisal edge.
     Real proportions: centrals are the longest, laterals sit noticeably
     shorter, canines drop back down again, premolars shorter still. The
     gum line scallops the opposite way. */
  const SHORT = [0.15, 0.03, 0.11, 0.00, 0.00, 0.11, 0.03, 0.15]; // incisal
  const GUM   = [0.10, 0.02, 0.07, 0.00, 0.00, 0.07, 0.02, 0.10]; // gingival
  /* Small per-tooth brightness offsets so no two are identical. */
  const TONE  = [0.97, 1.00, 0.985, 1.01, 1.0, 0.99, 1.005, 0.975];

  /* Fill the band column by column, so the arch takes the exact shape
     of the smile. */
  for (let x = first; x <= last; x++) {
    if (sTop[x] < 0 || sBot[x] < 0) continue;

    /* Blend measured toward smoothed by the slider amount. */
    const t0 = band.top[x] >= 0 ? band.top[x] : sTop[x];
    const b0 = band.bot[x] >= 0 ? band.bot[x] : sBot[x];
    let ty = t0 + (sTop[x] - t0) * amount;
    let by = b0 + (sBot[x] - b0) * amount;
    const bandH = by - ty;
    if (bandH < 2) continue;

    /* Which tooth is this column in, and how far across it? */
    let ti = 0;
    while (ti < edges.length - 2 && x >= edges[ti + 1]) ti++;
    const u = (x - edges[ti]) / Math.max(1, edges[ti + 1] - edges[ti]);

    /* Rounded mesial and distal corners: zero in the middle of a tooth,
       rising toward each contact point. */
    const corner = Math.max(0, 1 - 4 * u * (1 - u));
    const round = corner * corner * 0.13;

    by -= bandH * (SHORT[ti] + round) * amount;
    ty += bandH * GUM[ti] * amount * 0.6;
    const th = by - ty;
    if (th < 2) continue;

    /* Slight vignette toward the corners — teeth further back sit in
       shadow, and without this the arch reads as flat. */
    const off = Math.abs(x - mid) / (half || 1);
    const depth = (1 - 0.14 * off * off) * TONE[ti];

    /* Fade out over the last stretch at each end, so the arch dissolves
       into the corner of the mouth instead of stopping on a hard edge. */
    const fade = Math.min(1, (x - first) / (span * 0.16), (last - x) / (span * 0.16));
    g.globalAlpha = Math.max(0, fade);

    const grad = g.createLinearGradient(0, ty, 0, by);
    grad.addColorStop(0,    rgb(base, 0.86 * depth));   // gum line
    grad.addColorStop(0.22, rgb(base, 1.02 * depth));
    grad.addColorStop(0.78, rgb(base, 1.08 * depth));   // body catches light
    grad.addColorStop(0.93, rgb(base, 1.00 * depth));
    grad.addColorStop(1,    rgb(base, 0.88 * depth));   // translucent edge
    g.fillStyle = grad;
    g.fillRect(x, ty, 1.02, th);
  }
  g.globalAlpha = 1;

  /* Contact lines between teeth. Real ones are thin, soft and only
     slightly darker than the enamel either side — the black gaps an
     earlier version drew were most of what made it look artificial. */
  g.globalCompositeOperation = "source-atop";
  const lineW = Math.max(0.7, mouthW * 0.004);
  for (let i = 1; i < edges.length - 1; i++) {
    const x = edges[i];
    const xi = Math.round(x);
    if (xi < first || xi > last || sTop[xi] < 0) continue;
    const ty = sTop[xi], by = sBot[xi];
    const grad = g.createLinearGradient(0, ty, 0, by);
    grad.addColorStop(0,   "rgba(0,0,0,0.11)");
    grad.addColorStop(0.7, "rgba(0,0,0,0.06)");
    grad.addColorStop(1,   "rgba(0,0,0,0)");   // fades out before the edge
    g.fillStyle = grad;
    g.fillRect(x - lineW / 2, ty, lineW, by - ty);
  }
  g.globalCompositeOperation = "source-over";

  /* Soften, so nothing has a drawn edge. */
  const soft = document.createElement("canvas");
  soft.width = w; soft.height = h;
  const sg = soft.getContext("2d", { willReadFrequently: true });
  drawBlurred(sg, c, Math.max(0.5, mouthW * 0.005));
  const arch = sg.getImageData(0, 0, w, h).data;

  /* Relight with the mouth's own shading. */
  const env = luminanceEnvelope(tooth.lum, mask, w, h);

  /* Enamel is not a flat colour — it has grain, faint vertical striation
     and small highlights, and a fill that drops all of it reads as
     plastic no matter how good the shape is. So the high-frequency part
     of the original is measured here and added back over the fill. The
     shape comes from the redraw, the surface stays theirs. */
  const detail = highFrequency(tooth.lum, w, h);

  const d = img.data, W = tooth.weight;
  for (let i = 0; i < W.length; i++) {
    const o = i << 2;
    const aA = arch[o + 3] / 255;
    if (aA < 0.02) continue;

    const k = W[i] * aA * amount;
    if (k < 0.02) continue;

    const shade = env[i];
    const grain = detail[i] * 0.65 * k;

    d[o]     += (arch[o]     * shade + grain - d[o])     * k;
    d[o + 1] += (arch[o + 1] * shade + grain - d[o + 1]) * k;
    d[o + 2] += (arch[o + 2] * shade + grain - d[o + 2]) * k;
  }
}

/* Original luminance minus a small blur of itself — the surface texture,
   with the overall shading removed. */
function highFrequency(lum, w, h) {
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  const g = c.getContext("2d", { willReadFrequently: true });
  const img = g.createImageData(w, h);
  for (let i = 0; i < lum.length; i++) {
    const o = i << 2;
    img.data[o] = img.data[o + 1] = img.data[o + 2] = lum[i];
    img.data[o + 3] = 255;
  }
  g.putImageData(img, 0, 0);

  const b = document.createElement("canvas");
  b.width = w; b.height = h;
  const bg = b.getContext("2d", { willReadFrequently: true });
  drawBlurred(bg, c, Math.max(1, Math.round(Math.min(w, h) * 0.03)));
  const bd = bg.getImageData(0, 0, w, h).data;

  const out = new Float32Array(w * h);
  for (let i = 0; i < out.length; i++) {
    /* Clamped, or a bright specular in the original would punch a hole
       through the fill. */
    const v = lum[i] - bd[i << 2];
    out[i] = v < -26 ? -26 : v > 26 ? 26 : v;
  }
  return out;
}

const rgb = (c, k) => `rgb(${Math.min(255, c.r * k) | 0},${Math.min(255, c.g * k) | 0},${Math.min(255, c.b * k) | 0})`;

/* Median colour of the brighter tooth pixels — the patient's own enamel
   shade, with shadowed edges and stains excluded. */
function medianToothColour(img, tooth, w, h) {
  const d = img.data, W = tooth.weight;
  const R = [], G = [], B = [];
  for (let i = 0; i < W.length; i++) {
    if (W[i] < 0.6) continue;
    const o = i << 2;
    R.push(d[o]); G.push(d[o + 1]); B.push(d[o + 2]);
  }
  if (R.length < 12) return { r: 232, g: 230, b: 224 };
  const med = a => { a.sort((p, q) => p - q); return a[Math.floor(a.length * 0.6)]; };
  return { r: med(R), g: med(G), b: med(B) };
}

/* Blurred, normalised luminance of the mouth region — the lighting the
   synthetic teeth inherit. Clamped so a very dark photo does not drive
   the arch to black. */
function luminanceEnvelope(lum, mask, w, h) {
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  const g = c.getContext("2d", { willReadFrequently: true });
  const tmp = g.createImageData(w, h);

  /* Fill masked-out pixels with the in-mouth mean so the blur does not
     drag lip-dark values into the arch region. */
  let sum = 0, n = 0;
  for (let i = 0; i < lum.length; i++) if (mask[i] > 0.5) { sum += lum[i]; n++; }
  const mean = n ? sum / n : 128;

  for (let i = 0; i < lum.length; i++) {
    const v = mask[i] > 0.3 ? lum[i] : mean;
    const o = i << 2;
    tmp.data[o] = tmp.data[o + 1] = tmp.data[o + 2] = v;
    tmp.data[o + 3] = 255;
  }
  g.putImageData(tmp, 0, 0);

  const blur = document.createElement("canvas");
  blur.width = w; blur.height = h;
  const bg = blur.getContext("2d", { willReadFrequently: true });
  drawBlurred(bg, c, Math.max(2, Math.round(Math.min(w, h) * 0.22)));

  const bd = bg.getImageData(0, 0, w, h).data;
  const env = new Float32Array(w * h);
  const norm = Math.max(mean, 40);
  for (let i = 0; i < env.length; i++) {
    /* Ratio to the mean, held inside a range that keeps contrast
       without letting a hotspot turn the arch into a white blob. */
    const v = bd[i << 2] / norm;
    env[i] = v < 0.72 ? 0.72 : v > 1.14 ? 1.14 : v;
  }
  return env;
}
