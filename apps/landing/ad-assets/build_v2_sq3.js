// Square 1:1 (1080x1080) variant WITHOUT the phones photo.
// 3 square cards (bigger than the 4-card version), same brand/text/CTA.
// Output: ad_v2_sq3.jpg
const sharp = require("sharp");

const W = 1080, H = 1080;
const BG = "#fbf7f1";
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const h = ["Run your restaurant.", "From one app."];
const f = "Website · Digital menu · Reservations · Kitchen display";
const cta = "All-in-one  ·  14 days free  →";

// 3 SQUARE cards, equal size, gap 16, side margin 59
const CARD_GAP  = 16;
const CARD_SIDE = 59;
const CARD_W    = Math.floor((W - 2 * CARD_SIDE - 2 * CARD_GAP) / 3); // 310
const CARD_H    = CARD_W;                                              // square
const CARD_R    = 16;
const CARD_Y    = 490;
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

  // 3 cards — phones dropped
  const c1 = await card("c2_menu.png",     "centre"); // QR menu (digital menu)
  const c2 = await card("c2_reserve.webp", "east");   // reservation tablet
  const c3 = await card("c2_kitchen.jpg",  "centre"); // kitchen KDS

  const tile = await sharp("iq_tile.png").resize(80, 80).png().toBuffer();

  const overlay = Buffer.from(
    `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="acc" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"  stop-color="#FF4929"/>
          <stop offset="100%" stop-color="#F99E1F"/>
        </linearGradient>
      </defs>

      <text x="166" y="138" font-family="Lato" font-weight="900" font-size="48" fill="#0a0a0a">Rest</text>

      <g font-family="Lato" font-weight="900" fill="#0a0a0a">
        <text x="60" y="270" font-size="76">${esc(h[0])}</text>
        <text x="60" y="354" font-size="76">${esc(h[1])}</text>
      </g>

      <rect x="60" y="384" width="120" height="8" rx="4" fill="url(#acc)"/>

      <text x="60" y="442" font-family="Lato" font-weight="600" font-size="28" fill="#3a3a3a">${esc(f)}</text>

      <g>
        <rect x="60" y="858" width="960" height="86" rx="43" fill="url(#acc)"/>
        <text x="540" y="912" font-family="Lato" font-weight="800" font-size="32" fill="#fff" text-anchor="middle">${esc(cta)}</text>
      </g>

      <text x="540" y="990" font-family="Lato" font-weight="600" font-size="20" fill="#7a7a7a" text-anchor="middle">No credit card · Cancel anytime</text>
    </svg>`
  );

  const cardX = (i) => CARD_SIDE + i * (CARD_W + CARD_GAP);

  await base
    .composite([
      { input: tile, top: 90, left: 60 },
      { input: c1, top: CARD_Y, left: cardX(0) },
      { input: c2, top: CARD_Y, left: cardX(1) },
      { input: c3, top: CARD_Y, left: cardX(2) },
      { input: overlay, top: 0, left: 0 },
    ])
    .jpeg({ quality: 92 })
    .toFile("ad_v2_sq3.jpg");

  console.log(`done ad_v2_sq3.jpg   (3 cards ${CARD_W}x${CARD_H}, gap ${CARD_GAP}, r${CARD_R})`);
}

main().catch((e) => { console.error(e); process.exit(1); });
