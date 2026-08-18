/* Branded before/after card.

   The disclaimer is drawn into the pixels rather than shown next to
   them. Anything a patient can save, they can forward — to a partner,
   to a group chat, to a clinic — and the caption never travels with it.
   By the third share the only thing left is the image, so the image has
   to carry the warning itself. */

const CARD_W = 1080;
const CARD_H = 1350;   // 4:5, the tallest thing Instagram will show in feed

/**
 * @param {HTMLCanvasElement} beforeCanvas
 * @param {HTMLCanvasElement} afterCanvas
 * @param {string} treatmentLabel
 * @param {string} afterTag
 * @param {{cx:number, cy:number, w:number}} [focus]
 *   Where to crop, in source pixels. A whole-portrait pair puts the one
 *   thing the card exists to show — the difference — at about eighty
 *   pixels across, so both halves are cropped to the treatment area.
 * @param {{service:string, detail:string, packageName:string,
 *          priceLabel:string, note:string, idle:boolean}} [summary]
 *   What was simulated and what it costs, so the saved image can stand
 *   on its own once it has been forwarded away from this page.
 */
export function buildCard(beforeCanvas, afterCanvas, treatmentLabel, afterTag, focus, summary) {
  const c = document.createElement("canvas");
  c.width = CARD_W; c.height = CARD_H;
  const g = c.getContext("2d");

  g.fillStyle = "#F4FAF9";
  g.fillRect(0, 0, CARD_W, CARD_H);

  /* header */
  g.fillStyle = "#06333B";
  g.fillRect(0, 0, CARD_W, 132);
  g.fillStyle = "#FFFFFF";
  g.font = "600 44px 'Cormorant Garamond', Georgia, serif";
  g.textBaseline = "middle";
  g.fillText("MedMatch", 56, 66);
  const mw = g.measureText("MedMatch").width;
  g.fillStyle = "rgba(255,255,255,.62)";
  g.font = "300 44px 'Cormorant Garamond', Georgia, serif";
  g.fillText(" Global", 56 + mw, 66);

  g.fillStyle = "#8FD6D0";
  g.font = "500 20px 'Jost', 'Segoe UI', sans-serif";
  g.textAlign = "right";
  g.fillText(treatmentLabel.toUpperCase(), CARD_W - 56, 66);
  g.textAlign = "left";

  /* image pair */
  const padX = 56, top = 176;
  const halfW = (CARD_W - padX * 2 - 16) / 2;
  /* Sized so the description, the package and the price all fit between
     the photos and the disclaimer, which is pinned to the bottom. */
  const imgH = 620;

  const crop = cropRect(beforeCanvas, focus, halfW / imgH);
  drawFitted(g, beforeCanvas, padX, top, halfW, imgH, crop);
  drawFitted(g, afterCanvas, padX + halfW + 16, top, halfW, imgH, crop);

  /* labels */
  const labelY = top + imgH - 44;
  pill(g, "TODAY", padX + 18, labelY, "rgba(0,0,0,.55)", "#fff");
  pill(g, (afterTag || "Illustration").toUpperCase(),
       padX + halfW + 34, labelY, "rgba(47,169,164,.92)", "#04282E");

  /* What was simulated, and what it would cost.

     This replaced a two-line "A picture of a goal / Not a promise."
     The line was nice and said nothing: someone who saves the image and
     shows it to their partner a week later cannot tell what treatment it
     was, and there is no price and nowhere to go next. The honesty is
     not lost — it moved into the disclaimer block below, which is the
     part that actually has to survive being forwarded. */
  const innerW = CARD_W - padX * 2;
  let y = top + imgH + 66;

  if (summary && !summary.idle) {
    g.fillStyle = "#0C2B30";
    g.font = "500 46px 'Cormorant Garamond', Georgia, serif";
    y = wrap(g, summary.service, padX, y, innerW, 52);

    if (summary.detail) {
      g.fillStyle = "#4E6A6D";
      g.font = "400 22px 'Jost', 'Segoe UI', sans-serif";
      y = wrap(g, summary.detail, padX, y + 44, innerW, 30);
    }

    if (summary.fromUsd) {
      y += 34;
      g.fillStyle = "#12707B";
      g.font = "500 18px 'Jost', 'Segoe UI', sans-serif";
      g.fillText("CLOSEST PACKAGE", padX, y);

      y += 34;
      g.fillStyle = "#0C2B30";
      g.font = "400 26px 'Jost', 'Segoe UI', sans-serif";
      g.fillText(summary.packageName || summary.service, padX, y);

      g.font = "600 40px 'Cormorant Garamond', Georgia, serif";
      g.textAlign = "right";
      g.fillText("from " + summary.priceLabel, CARD_W - padX, y + 4);
      g.textAlign = "left";

      if (summary.note) {
        y += 30;
        g.fillStyle = "#4E6A6D";
        g.font = "400 19px 'Jost', 'Segoe UI', sans-serif";
        g.fillText(summary.note, padX, y);
      }
    }
  } else {
    g.fillStyle = "#0C2B30";
    g.font = "400 46px 'Cormorant Garamond', Georgia, serif";
    y = wrap(g, "A picture of a goal, not a promise.", padX, y, innerW, 52);
  }

  /* Disclaimer follows the text but never rides higher than a floor
     (which would leave a hole under the photos) and never lower than the
     footer allows. Card height is fixed, description length is not. */
  const discH = 138;
  const FLOOR = 1000, CEIL = CARD_H - 74 - discH - 46;
  const dy = Math.min(CEIL, Math.max(y + 52, FLOOR));
  g.fillStyle = "rgba(154,100,16,.09)";
  roundRect(g, padX, dy, innerW, discH, 18);
  g.fill();

  g.fillStyle = "#6d4a10";
  g.font = "500 22px 'Jost', 'Segoe UI', sans-serif";
  g.fillText("Simulated image — not a medical opinion", padX + 28, dy + 38);

  g.font = "400 20px 'Jost', 'Segoe UI', sans-serif";
  wrap(g,
    "Generated by a photo filter on a phone. No doctor has reviewed it, and the " +
    "price is an estimate, not your quote.",
    padX + 28, dy + 74, innerW - 56, 28);

  /* footer — where to actually get the number */
  g.fillStyle = "#0C2B30";
  g.font = "500 24px 'Jost', 'Segoe UI', sans-serif";
  g.fillText("Free written quote:", padX, CARD_H - 46);
  const lead = g.measureText("Free written quote: ").width;
  g.fillStyle = "#12707B";
  g.fillText("medmatchglobal.info/book.html", padX + lead, CARD_H - 46);

  return c;
}

/* Source rectangle at the card tile's aspect, centred on the treatment
   area and clamped inside the photo. Falls back to the whole frame when
   no focus point is supplied. */
function cropRect(src, focus, aspect) {
  if (!focus) return { sx: 0, sy: 0, sw: src.width, sh: src.height };

  let sw = Math.min(focus.w, src.width);
  let sh = sw / aspect;
  if (sh > src.height) { sh = src.height; sw = sh * aspect; }

  let sx = focus.cx - sw / 2;
  let sy = focus.cy - sh / 2;
  sx = Math.max(0, Math.min(src.width - sw, sx));
  sy = Math.max(0, Math.min(src.height - sh, sy));
  return { sx, sy, sw, sh };
}

function drawFitted(g, src, x, y, w, h, crop) {
  g.save();
  roundRect(g, x, y, w, h, 18);
  g.clip();
  g.fillStyle = "#0a1a1d";
  g.fillRect(x, y, w, h);

  const c = crop || { sx: 0, sy: 0, sw: src.width, sh: src.height };
  const s = Math.max(w / c.sw, h / c.sh);
  const dw = c.sw * s, dh = c.sh * s;
  g.drawImage(src, c.sx, c.sy, c.sw, c.sh,
              x + (w - dw) / 2, y + (h - dh) / 2, dw, dh);
  g.restore();
}

function pill(g, text, x, y, bg, fg) {
  g.font = "500 19px 'Jost', 'Segoe UI', sans-serif";
  const tw = g.measureText(text).width;
  g.fillStyle = bg;
  roundRect(g, x, y, tw + 32, 38, 19);
  g.fill();
  g.fillStyle = fg;
  g.fillText(text, x + 16, y + 20);
}

/* Draws wrapped text and returns the baseline of the last line, so
   callers can keep flowing down the card instead of guessing offsets. */
function wrap(g, text, x, y, maxW, lh) {
  const words = String(text || "").split(" ");
  let line = "", cy = y;
  for (const word of words) {
    const test = line ? line + " " + word : word;
    if (g.measureText(test).width > maxW && line) {
      g.fillText(line, x, cy);
      line = word; cy += lh;
    } else {
      line = test;
    }
  }
  if (line) g.fillText(line, x, cy);
  return cy;
}

function roundRect(g, x, y, w, h, r) {
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
}

/* Save the card.

   This must stay SYNCHRONOUS up to the navigator.share() call. Safari
   only allows share() while the page still holds "transient user
   activation" from the tap, and an `await` gives that up — the earlier
   version awaited canvas.toBlob() first, so on iPhone share() threw
   NotAllowedError every time. It then fell through to an <a download>,
   which iOS Safari does not honour for blob URLs either, so the button
   did nothing at all and said nothing about it.

   toDataURL() is synchronous, so the blob is built from that instead and
   share() is reached inside the same task as the click.

   Called directly from the click handler — do not await anything before
   this function. */
export function saveCard(canvas, filename) {
  let blob;
  try {
    blob = dataURLToBlob(canvas.toDataURL("image/jpeg", 0.92));
  } catch (e) {
    return Promise.resolve({ ok: false, how: "encode-failed" });
  }

  const file = new File([blob], filename, { type: "image/jpeg" });

  /* 1. The share sheet — the only route that reliably reaches an
        iPhone's camera roll. Still inside the user gesture here. */
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    return navigator.share({ files: [file] })
      .then(() => ({ ok: true, how: "share" }))
      .catch(e => {
        if (e && e.name === "AbortError") return { ok: true, how: "cancelled" };
        return downloadOrShow(blob, filename);
      });
  }

  return Promise.resolve(downloadOrShow(blob, filename));
}

/* 2. A normal download, which is what desktop and Android want. If the
      browser ignores the download attribute — iOS Safari does — the
      caller falls back to showing the image so it can be long-pressed,
      which is how saving a picture works on an iPhone anyway. */
function downloadOrShow(blob, filename) {
  const a = document.createElement("a");
  if (typeof a.download === "undefined" || isIOS()) {
    return { ok: true, how: "longpress", blob };
  }
  const url = URL.createObjectURL(blob);
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 8000);
  return { ok: true, how: "download" };
}

function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    /* iPadOS 13+ reports itself as a Mac; the touch points give it away. */
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

function dataURLToBlob(dataURL) {
  const [head, b64] = dataURL.split(",");
  const mime = /:(.*?);/.exec(head)[1];
  const bin = atob(b64);
  const buf = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i);
  return new Blob([buf], { type: mime });
}
