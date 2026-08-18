/* Canvas blur, with a fallback for browsers that lack ctx.filter.

   Safari only shipped CanvasRenderingContext2D.filter in 16.4 (March
   2023), and assigning to it on an older build fails silently rather
   than throwing. Every blur in the dental simulation would simply not
   happen: the mouth mask would have a hard edge, and the lighting
   envelope the synthetic teeth are relit by would be raw per-pixel
   noise instead of a smooth gradient. The teeth would render, and they
   would look wrong, on an iPhone that is only a couple of years old.

   So blurs go through here. Modern browsers take the native path; older
   ones get a three-pass box blur, which approximates a Gaussian closely
   enough for a mask and costs little on the small regions we use it on. */

export const HAS_CTX_FILTER = (() => {
  try {
    const c = document.createElement("canvas").getContext("2d");
    if (!c || !("filter" in c)) return false;
    /* Present but ignored on some builds — check it actually sticks. */
    c.filter = "blur(1px)";
    return c.filter === "blur(1px)";
  } catch (e) {
    return false;
  }
})();

/** Draw `src` into `dstCtx` with a blur of `radius` px. */
export function drawBlurred(dstCtx, src, radius) {
  const r = Math.max(0, radius);
  if (r < 0.5) { dstCtx.drawImage(src, 0, 0); return; }

  if (HAS_CTX_FILTER) {
    dstCtx.filter = `blur(${r}px)`;
    dstCtx.drawImage(src, 0, 0);
    dstCtx.filter = "none";
    return;
  }

  const w = dstCtx.canvas.width, h = dstCtx.canvas.height;
  dstCtx.clearRect(0, 0, w, h);
  dstCtx.drawImage(src, 0, 0);
  const img = dstCtx.getImageData(0, 0, w, h);
  boxBlur(img.data, w, h, r);
  dstCtx.putImageData(img, 0, 0);
}

/** Blur whatever is already on a canvas, in place. */
export function blurInPlace(canvas, radius) {
  const r = Math.max(0, radius);
  if (r < 0.5) return;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });

  if (HAS_CTX_FILTER) {
    const tmp = document.createElement("canvas");
    tmp.width = canvas.width; tmp.height = canvas.height;
    tmp.getContext("2d").drawImage(canvas, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.filter = `blur(${r}px)`;
    ctx.drawImage(tmp, 0, 0);
    ctx.filter = "none";
    return;
  }

  const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
  boxBlur(img.data, canvas.width, canvas.height, r);
  ctx.putImageData(img, 0, 0);
}

/* Three passes of a moving-average box blur ≈ a Gaussian. Runs on all
   four channels so alpha masks blur along with colour.
   Exported so it can be tested without a DOM. */
export function boxBlur(data, w, h, radius) {
  const r = Math.max(1, Math.round(radius * 0.57));   // match Gaussian sigma
  const tmp = new Uint8ClampedArray(data.length);
  for (let pass = 0; pass < 3; pass++) {
    boxPass(data, tmp, w, h, r, true);
    boxPass(tmp, data, w, h, r, false);
  }
}

function boxPass(src, dst, w, h, r, horizontal) {
  const outer = horizontal ? h : w;
  const inner = horizontal ? w : h;
  const stepIn = horizontal ? 4 : w * 4;
  const stepOut = horizontal ? w * 4 : 4;
  const win = r * 2 + 1;

  for (let o = 0; o < outer; o++) {
    const base = o * stepOut;
    let a0 = 0, a1 = 0, a2 = 0, a3 = 0;

    /* Prime the window, clamping at the edge. */
    for (let k = -r; k <= r; k++) {
      const i = base + Math.min(inner - 1, Math.max(0, k)) * stepIn;
      a0 += src[i]; a1 += src[i + 1]; a2 += src[i + 2]; a3 += src[i + 3];
    }

    for (let p = 0; p < inner; p++) {
      const out = base + p * stepIn;
      dst[out]     = a0 / win;
      dst[out + 1] = a1 / win;
      dst[out + 2] = a2 / win;
      dst[out + 3] = a3 / win;

      const addIdx = base + Math.min(inner - 1, p + r + 1) * stepIn;
      const subIdx = base + Math.max(0, p - r) * stepIn;
      a0 += src[addIdx]     - src[subIdx];
      a1 += src[addIdx + 1] - src[subIdx + 1];
      a2 += src[addIdx + 2] - src[subIdx + 2];
      a3 += src[addIdx + 3] - src[subIdx + 3];
    }
  }
}
