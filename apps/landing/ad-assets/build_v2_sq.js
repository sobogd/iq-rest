// Square 1:1 (1080x1080). Same brand/text/CTA as build_v2_en.js, but the
// 4 photos are a clean row of equal rounded-corner cards with small gaps.
// Output: ad_v2_sq.jpg
const sharp = require("sharp");

const W = 1080, H = 1080;
const BG = "#fbf7f1";
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const h = ["Run your restaurant.", "From one app."];
const f = "Website · Digital menu · Reservations · Kitchen display";
const cta = "All-in-one  ·  14 days free  →";

// Photo card geometry: 4 cards in one row, equal size, gap 16, side margin 60
const CARD_GAP = 16;
const CARD_SIDE = 60;
const CARD_W = Math.floor((W - 2 * CARD_SIDE - 3 * CARD_GAP) / 4); // 228
const CARD_H = Math.round(CARD_W * 5 / 4);                          // 285  (4:5)
const CARD_R = 14;                                                  // corner radius
const CARD_Y = 510;                                                 // top of row
const STROKE = "rgba(0,0,0,0.08)";

async function card(file, position = "centre") {
  // 1) cover-crop to card size
  const img = await sharp(file)
    .resize(CARD_W, CARD_H, { fit: "cover", position })
    .png()
    .toBuffer();

  // 2) round corners via alpha mask
  const mask = Buffer.from(
    `<svg width="${CARD_W}" height="${CARD_H}" xmlns="http://www.w3.org/2000/svg">
       <rect width="${CARD_W}" height="${CARD_H}" rx="${CARD_R}" ry="${CARD_R}" fill="#fff"/>
     </svg>`
  );
  const rounded = await sharp(img)
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();

  // 3) thin inner stroke
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

  // 4 cards in order, picking smart crop positions where the source is landscape
  const c1 = await card("c2_menu.png",    "centre");   // QR menu  (portrait → fits)
  const c2 = await card("c2_reserve.webp","east");     // reservation tablet (crop towards the tablet on the right)
  const c3 = await card("c2_phones.webp", "centre");   // two phones — keep both
  const c4 = await card("c2_kitchen.jpg", "centre");   // kitchen KDS (portrait → fits)

  const tile = await sharp("iq_tile.png").resize(80, 80).png().toBuffer();

  const overlay = Buffer.from(
    `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="acc" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"  stop-color="#FF4929"/>
          <stop offset="100%" stop-color="#F99E1F"/>
        </linearGradient>
      </defs>

      <!-- brand wordmark next to the iq_tile (tile composited separately) -->
      <text x="166" y="138" font-family="Lato" font-weight="900" font-size="48" fill="#0a0a0a">Rest</text>

      <!-- headline, two lines -->
      <g font-family="Lato" font-weight="900" fill="#0a0a0a">
        <text x="60" y="270" font-size="76">${esc(h[0])}</text>
        <text x="60" y="354" font-size="76">${esc(h[1])}</text>
      </g>

      <!-- amber accent under headline -->
      <rect x="60" y="384" width="120" height="8" rx="4" fill="url(#acc)"/>

      <!-- subhead (dark, readable) -->
      <text x="60" y="442" font-family="Lato" font-weight="600" font-size="28" fill="#3a3a3a">${esc(f)}</text>

      <!-- CTA pill (full width) -->
      <g>
        <rect x="60" y="846" width="960" height="86" rx="43" fill="url(#acc)"/>
        <text x="540" y="900" font-family="Lato" font-weight="800" font-size="32" fill="#fff" text-anchor="middle">${esc(cta)}</text>
      </g>

      <!-- trust line -->
      <text x="540" y="978" font-family="Lato" font-weight="600" font-size="20" fill="#7a7a7a" text-anchor="middle">No credit card · Cancel anytime</text>
    </svg>`
  );

  const cardX = (i) => CARD_SIDE + i * (CARD_W + CARD_GAP);

  await base
    .composite([
      { input: tile, top: 90, left: 60 },
      { input: c1, top: CARD_Y, left: cardX(0) },
      { input: c2, top: CARD_Y, left: cardX(1) },
      { input: c3, top: CARD_Y, left: cardX(2) },
      { input: c4, top: CARD_Y, left: cardX(3) },
      { input: overlay, top: 0, left: 0 },
    ])
    .jpeg({ quality: 92 })
    .toFile("ad_v2_sq.jpg");

  console.log(`done ad_v2_sq.jpg   (cards ${CARD_W}x${CARD_H}, gap ${CARD_GAP}, r${CARD_R})`);
}

main().catch((e) => { console.error(e); process.exit(1); });
