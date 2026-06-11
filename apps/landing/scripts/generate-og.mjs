#!/usr/bin/env node
// Pre-generate Open Graph image for a keyword-targeted landing page.
//
// Usage:
//   node scripts/generate-og.mjs --headline "Menu Digitale per Ristoranti" \
//                                 --subline "Online in 5 minuti" \
//                                 --out menu-digitale
//
// Output: public/og/<out>.png (1200x630, ~PNG, edge-cached as static asset).
//
// Run locally once per page, commit the PNG. Production never executes this.

import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const { values } = parseArgs({
  options: {
    headline: { type: "string" },
    subline: { type: "string" },
    out: { type: "string" },
  },
});

const headline = values.headline;
const subline = values.subline ?? "";
const outName = values.out;

if (!headline || !outName) {
  console.error(
    "usage: node scripts/generate-og.mjs --headline '<KW phrase>' [--subline '<supporting>'] --out <slug>",
  );
  process.exit(1);
}

const WIDTH = 1200;
const HEIGHT = 630;
const BG = "#0a0a0a";
const ACCENT = "#FF5722";
const FG = "#FFFFFF";
const MUTED = "#A3A3A3";

const PAD_X = 80;
const LOGO_H = 88;
const LOGO_RATIO = 525 / 113;
const LOGO_W = Math.round(LOGO_H * LOGO_RATIO);
const LOGO_Y = 80;

const ACCENT_Y = LOGO_Y + LOGO_H + 60;

const logoB64 = fs
  .readFileSync(path.join(ROOT, "public/iq-rest-logo.png"))
  .toString("base64");

const esc = (s) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

// Auto-fit headline font size so long phrases (28+ chars) still fit on one line.
// Helvetica-bold avg char width ≈ 0.55 × font-size; available width = WIDTH - 2*PAD_X.
function fitHeadlineFontSize(text) {
  const maxWidth = WIDTH - 2 * PAD_X;
  const avgWidthPerSize = 0.55;
  const ideal = Math.floor(maxWidth / (text.length * avgWidthPerSize));
  return Math.min(80, Math.max(48, ideal));
}

const HEADLINE_SIZE = fitHeadlineFontSize(headline);
const HEADLINE_Y = ACCENT_Y + HEADLINE_SIZE + 40;
const SUBLINE_SIZE = 38;
const SUBLINE_Y = HEADLINE_Y + 60;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${BG}"/>
  <image href="data:image/png;base64,${logoB64}" x="${PAD_X}" y="${LOGO_Y}" width="${LOGO_W}" height="${LOGO_H}"/>
  <line x1="${PAD_X}" y1="${ACCENT_Y}" x2="${PAD_X + 240}" y2="${ACCENT_Y}" stroke="${ACCENT}" stroke-width="5" stroke-linecap="round"/>
  <text x="${PAD_X}" y="${HEADLINE_Y}" font-family="Helvetica, Arial, sans-serif" font-size="${HEADLINE_SIZE}" font-weight="800" fill="${FG}">${esc(headline)}</text>
  ${subline ? `<text x="${PAD_X}" y="${SUBLINE_Y}" font-family="Helvetica, Arial, sans-serif" font-size="${SUBLINE_SIZE}" font-weight="400" fill="${MUTED}">${esc(subline)}</text>` : ""}
  <text x="${PAD_X}" y="${HEIGHT - 60}" font-family="Helvetica, Arial, sans-serif" font-size="28" font-weight="600" fill="${ACCENT}">iq-rest.com</text>
</svg>`;

const outDir = path.join(ROOT, "public/og");
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, `${outName}.png`);

await sharp(Buffer.from(svg))
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .toFile(outPath);

console.log(`Wrote ${outPath} (${WIDTH}×${HEIGHT}, headline ${HEADLINE_SIZE}px)`);
