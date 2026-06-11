// Square 1:1 (1080x1080). 2x2 grid of square cards. Logo + all text CENTERED.
// Output: ad_v2_sq4c.jpg
const sharp = require("sharp");

const W = 1080, H = 1080;
const BG = "#fbf7f1";
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const h = ["Run your restaurant.", "From one app."];
const f = "Website · Digital menu · Reservations · Kitchen display";
const cta = "All-in-one  ·  14 days free  →";

// 2x2 SQUARE cards
const CARD_GAP  = 16;
const CARD_W    = 220;
const CARD_H    = CARD_W;
const CARD_R    = 16;
const BLOCK_W   = 2 * CARD_W + CARD_GAP;         // 456
const BLOCK_H   = 2 * CARD_H + CARD_GAP;         // 456
const BLOCK_X   = Math.round((W - BLOCK_W) / 2); // 312
const BLOCK_Y   = 478;                            // top of photo block
const STROKE    = "rgba(0,0,0,0.08)";

async function card(file, position = "centre") {
  const img = await sharp(file)
    .resize(CARD_W, CARD_H, { fit: "cover", position })
    .png()
    .toBuffer();

  const mask = Buffer.from(
    `<svg width="${CARD_W}" height="${CARD_H}" xmlns="http://www.w3.org/2000/svg">
       <rect width="${CARD_W}" height="${CARD_H}" rx="${CARD_R}" ry="${CARD_R}" fill="#fff"/>
     </svg>`
  );
  const rounded = await sharp(img)
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();

  const border = Buffer.from(
    `<svg width="${CARD_W}" height="${CARD_H}" xmlns="http://www.w3.org/2000/svg">
       <rect x="0.5" y="0.5" width="${CARD_W - 1}" height="${CARD_H - 1}"
             rx="${CARD_R}" ry="${CARD_R}" fill="none" stroke="${STROKE}" stroke-width="1"/>
     </svg>`
  );
  return sharp(rounded).composite([{ input: border }]).png().toBuffer();
}

async function main() {
  const base = sharp({ create: { width: W, height: H, channels: 3, background: BG } });

  // 4 cards in 2x2: TL=menu, TR=reserve, BL=phones, BR=kitchen
  const cTL = await card("c2_menu.png",     "centre");
  const cTR = await card("c2_reserve.webp", "east");
  const cBL = await card("c2_phones.webp",  "centre");
  const cBR = await card("c2_kitchen.jpg",  "centre");

  // brand mark: tile + "Rest" centered as a unit
  // approx widths: tile=80, gap=16, "Rest" wordmark at Lato 900 48px ≈ 122
  const REST_W   = 122;
  const TILE_W   = 80;
  const LOGO_GAP = 16;
  const LOGO_TOTAL = TILE_W + LOGO_GAP + REST_W;            // 218
  const TILE_X   = Math.round((W - LOGO_TOTAL) / 2);        // ≈ 431
  const REST_X   = TILE_X + TILE_W + LOGO_GAP;              // start of "Rest" text
  const TILE_Y   = 78;
  const REST_BASELINE = TILE_Y + 60;                        // visual center align

  const tile = await sharp("iq_tile.png").resize(TILE_W, TILE_W).png().toBuffer();

  const overlay = Buffer.from(
    `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="acc" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"  stop-color="#FF4929"/>
          <stop offset="100%" stop-color="#F99E1F"/>
        </linearGradient>
      </defs>

      <!-- wordmark "Rest" (tile composited separately) -->
      <text x="${REST_X}" y="${REST_BASELINE}" font-family="Lato" font-weight="900" font-size="48" fill="#0a0a0a">Rest</text>

      <!-- headline (centered) -->
      <g font-family="Lato" font-weight="900" fill="#0a0a0a" text-anchor="middle">
        <text x="540" y="270" font-size="76">${esc(h[0])}</text>
        <text x="540" y="354" font-size="76">${esc(h[1])}</text>
      </g>

      <!-- amber accent (centered) -->
      <rect x="480" y="384" width="120" height="8" rx="4" fill="url(#acc)"/>

      <!-- subhead (centered, dark) -->
      <text x="540" y="442" font-family="Lato" font-weight="600" font-size="28" fill="#3a3a3a" text-anchor="middle">${esc(f)}</text>

      <!-- CTA pill (centered, full-width) -->
      <g>
        <rect x="60" y="956" width="960" height="80" rx="40" fill="url(#acc)"/>
        <text x="540" y="1008" font-family="Lato" font-weight="800" font-size="32" fill="#fff" text-anchor="middle">${esc(cta)}</text>
      </g>

      <!-- trust line (centered) -->
      <text x="540" y="1060" font-family="Lato" font-weight="600" font-size="18" fill="#7a7a7a" text-anchor="middle">No credit card · Cancel anytime</text>
    </svg>`
  );

  const colX = (c) => BLOCK_X + c * (CARD_W + CARD_GAP);
  const rowY = (r) => BLOCK_Y + r * (CARD_H + CARD_GAP);

  await base
    .composite([
      { input: tile, top: TILE_Y, left: TILE_X },
      { input: cTL, top: rowY(0), left: colX(0) },
      { input: cTR, top: rowY(0), left: colX(1) },
      { input: cBL, top: rowY(1), left: colX(0) },
      { input: cBR, top: rowY(1), left: colX(1) },
      { input: overlay, top: 0, left: 0 },
    ])
    .jpeg({ quality: 92 })
    .toFile("ad_v2_sq4c.jpg");

  console.log(`done ad_v2_sq4c.jpg  (2x2 ${CARD_W}x${CARD_H}, centered)`);
}

main().catch((e) => { console.error(e); process.exit(1); });
