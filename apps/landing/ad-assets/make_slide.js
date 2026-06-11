#!/usr/bin/env node
// make_slide.js — generate one Airbnb-style ad slide (1080x1080, dark warm theme)
//
// Usage:
//   node make_slide.js \
//     --img path/to/photo.jpg \
//     --l1 "First line" \
//     --l2 "Second line" \
//     --sub "Small subtitle text" \
//     --arrow          # optional: adds orange arrow after l2
//     --out assets/my_slide.jpg   # optional output path
//
// Examples:
//   node make_slide.js --img ../public/landing/feature-kitchen.webp --l1 "Kitchen" --l2 "in chaos?" --sub "Orders on screen, zero mistakes" --arrow
//   node make_slide.js --img owner_hero.png --l1 "Own a" --l2 "restaurant?" --sub "See how to run it from one app" --arrow --out assets/slide_hook.jpg

const sharp = require("sharp");
const fs = require("fs");

// ── theme ──────────────────────────────────────────────────────────────────
const W = 1080, H = 1080;
const BG      = "#211c17";
const INK     = "#f7f3ec";
const SUBINK  = "#a59c8f";
const ACC     = "#FF6229";
const FRAMECOL= "#e6ddcd";
const FONT    = "Futura";

// ── frame geometry ─────────────────────────────────────────────────────────
const PAD = 64, FRAME = 15;
const frameX = PAD, frameY = PAD;
const frameW = W - 2 * PAD, frameH = 668;
const innerX = frameX + FRAME, innerY = frameY + FRAME;
const innerW = frameW - 2 * FRAME, innerH = frameH - 2 * FRAME;
const R = 50, IR = R - FRAME;

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// ── parse args ─────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const get  = (flag) => { const i = args.indexOf(flag); return i !== -1 ? args[i + 1] : null; };
const has  = (flag) => args.includes(flag);

const imgSrc = get("--img");
const l1     = get("--l1") || "";
const l2     = get("--l2") || "";
const sub    = get("--sub") || "";
const arrow  = has("--arrow");
const out    = get("--out") || "assets/slide_out.jpg";

if (!imgSrc) { console.error("Usage: node make_slide.js --img <path> --l1 <text> --l2 <text> --sub <text> [--arrow] [--out path.jpg]"); process.exit(1); }
if (!fs.existsSync(imgSrc)) { console.error("Image not found:", imgSrc); process.exit(1); }

async function makePhoto() {
  const img = await sharp(imgSrc)
    .resize(innerW, innerH, { fit: "cover", position: "centre" })
    .png().toBuffer();
  const mask = Buffer.from(
    `<svg width="${innerW}" height="${innerH}" xmlns="http://www.w3.org/2000/svg">
       <rect width="${innerW}" height="${innerH}" rx="${IR}" ry="${IR}" fill="#fff"/></svg>`);
  return sharp(img).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
}

async function textWidth(txt, size) {
  try {
    const { info } = await sharp(Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="200">
         <text x="0" y="120" font-family="${FONT}" font-weight="bold" font-size="${size}">${esc(txt)}</text></svg>`
    )).trim().png().toBuffer({ resolveWithObject: true });
    return info.width;
  } catch { return 580; }
}

async function main() {
  fs.mkdirSync(require("path").dirname(out), { recursive: true });

  const shadow = await sharp(Buffer.from(
    `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
       <rect x="${frameX}" y="${frameY + 12}" width="${frameW}" height="${frameH}" rx="${R}" fill="rgba(0,0,0,0.35)"/></svg>`
  )).blur(26).png().toBuffer();

  const frameEl = Buffer.from(
    `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
       <rect x="${frameX}" y="${frameY}" width="${frameW}" height="${frameH}" rx="${R}" fill="${FRAMECOL}"/></svg>`);

  const ph = await makePhoto();

  const TX = PAD + 11;
  const Y1 = 858, Y2 = Y1 + 76;

  let arrowSvg = "";
  if (arrow) {
    const w = await textWidth(l2, 64);
    const textEnd = TX + w, rightEdge = frameX + frameW;
    const aLen = 84;
    let aStart = textEnd + 50;
    let aEnd = Math.min(aStart + aLen, rightEdge);
    aStart = aEnd - aLen;
    const ay = Y2 - 22;
    arrowSvg = `<g stroke="${ACC}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none">
         <line x1="${aStart}" y1="${ay}" x2="${aEnd}" y2="${ay}"/>
         <polyline points="${aEnd - 22},${ay - 18} ${aEnd},${ay} ${aEnd - 22},${ay + 18}"/></g>`;
  }

  const overlay = Buffer.from(
    `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
       <g font-family="${FONT}" font-weight="bold" fill="${INK}">
         <text x="${TX}" y="${Y1}" font-size="64">${esc(l1)}</text>
         <text x="${TX}" y="${Y2}" font-size="64">${esc(l2)}</text>
       </g>
       ${arrowSvg}
       <text x="${TX}" y="${Y2 + 62}" font-family="${FONT}" font-weight="medium" font-size="32"
             fill="${SUBINK}">${esc(sub)}</text>
     </svg>`);

  await sharp({ create: { width: W, height: H, channels: 3, background: BG } })
    .composite([
      { input: shadow,  top: 0, left: 0 },
      { input: frameEl, top: 0, left: 0 },
      { input: ph,      top: innerY, left: innerX },
      { input: overlay, top: 0, left: 0 },
    ])
    .jpeg({ quality: 92 })
    .toFile(out);

  console.log("done →", out);
}

main().catch((e) => { console.error(e); process.exit(1); });
