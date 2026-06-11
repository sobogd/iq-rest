// Square 1:1 (1080x1080). Full-bleed photo background (c2_menu.png).
// No photo cards. Logo + text + CTA centered on top of the photo with a scrim.
// Output: ad_v2_bg.jpg
const sharp = require("sharp");

const W = 1080, H = 1080;
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const h = ["Run your restaurant.", "From one app."];
const f = "Website · Digital menu · Reservations · Kitchen display";
const cta = "All-in-one  ·  14 days free  →";

async function main() {
  // Background: cover-fit the menu shot to the square canvas
  const bg = await sharp("c2_menu.png")
    .resize(W, H, { fit: "cover", position: "centre" })
    .png()
    .toBuffer();

  // Scrim: uniform darkening + a slight vertical gradient (darker top & bottom)
  // so the headline at the top and the CTA at the bottom both stay legible.
  const scrim = Buffer.from(
    `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
       <defs>
         <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
           <stop offset="0%"  stop-color="#000" stop-opacity="0.62"/>
           <stop offset="40%" stop-color="#000" stop-opacity="0.48"/>
           <stop offset="60%" stop-color="#000" stop-opacity="0.48"/>
           <stop offset="100%" stop-color="#000" stop-opacity="0.65"/>
         </linearGradient>
       </defs>
       <rect width="${W}" height="${H}" fill="url(#g)"/>
     </svg>`
  );

  // Brand mark — tile + "Rest" centered as a unit
  const REST_W     = 122;
  const TILE_W     = 80;
  const LOGO_GAP   = 16;
  const LOGO_TOTAL = TILE_W + LOGO_GAP + REST_W;
  const TILE_X     = Math.round((W - LOGO_TOTAL) / 2);
  const REST_X     = TILE_X + TILE_W + LOGO_GAP;
  const TILE_Y     = 88;
  const REST_BASE  = TILE_Y + 60;

  const tile = await sharp("iq_tile.png").resize(TILE_W, TILE_W).png().toBuffer();

  const overlay = Buffer.from(
    `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="acc" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"  stop-color="#FF4929"/>
          <stop offset="100%" stop-color="#F99E1F"/>
        </linearGradient>
        <filter id="sh" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="8" flood-color="#000" flood-opacity="0.55"/>
        </filter>
      </defs>

      <text x="${REST_X}" y="${REST_BASE}" font-family="Lato" font-weight="900" font-size="48" fill="#fff" filter="url(#sh)">Rest</text>

      <g font-family="Lato" font-weight="900" fill="#fff" text-anchor="middle" filter="url(#sh)">
        <text x="540" y="430" font-size="86">${esc(h[0])}</text>
        <text x="540" y="528" font-size="86">${esc(h[1])}</text>
      </g>

      <rect x="480" y="562" width="120" height="10" rx="5" fill="url(#acc)"/>

      <text x="540" y="632" font-family="Lato" font-weight="600" font-size="30" fill="#ece7e1" text-anchor="middle" filter="url(#sh)">${esc(f)}</text>

      <g>
        <rect x="60" y="876" width="960" height="86" rx="43" fill="url(#acc)"/>
        <text x="540" y="930" font-family="Lato" font-weight="800" font-size="32" fill="#fff" text-anchor="middle">${esc(cta)}</text>
      </g>

      <text x="540" y="1006" font-family="Lato" font-weight="600" font-size="20" fill="#dad3c9" text-anchor="middle" filter="url(#sh)">No credit card · Cancel anytime</text>
    </svg>`
  );

  await sharp(bg)
    .composite([
      { input: scrim, top: 0, left: 0 },
      { input: tile, top: TILE_Y, left: TILE_X },
      { input: overlay, top: 0, left: 0 },
    ])
    .jpeg({ quality: 92 })
    .toFile("ad_v2_bg.jpg");

  console.log("done ad_v2_bg.jpg  (full-bleed bg = c2_menu.png)");
}

main().catch((e) => { console.error(e); process.exit(1); });
