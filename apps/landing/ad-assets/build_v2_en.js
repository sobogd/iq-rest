// IG Feed 4:5 (1080x1350) editorial layout with:
//   - IQ Rest brand top-left
//   - Stronger headline
//   - Dark readable subhead
//   - 4-photo editorial collage with QR-menu as HERO
//   - Amber CTA pill at bottom
// Output: ad_v2_en.jpg
const sharp = require("sharp");
const W = 1080, H = 1350;
const BG = "#fbf7f1";
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// COPY
const h = ["Run your restaurant.", "From one app."];
const f = "Website · Digital menu · Reservations · Kitchen display";
const cta = "All-in-one  ·  14 days free  →";

// Geometry of the photo block (between subhead and CTA)
//   y range: 470 .. 1180  (height ~710)
//   x range: 60  .. 1020  (width  ~960)
//
//   HERO (QR menu, portrait): left side, large
//   reservation tablet (landscape): top-right
//   kitchen KDS (portrait): mid/bottom right, overlapping under reservation
//   two phones (landscape): bottom center, overlapping menu+kitchen

async function shot(file, w, hh, rot) {
  // Crop cover to target w×hh, then rotate with transparent background.
  return sharp(file)
    .resize(w, hh, { fit: "cover", position: "centre" })
    .rotate(rot, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
}

async function main() {
  // Base canvas
  const base = sharp({ create: { width: W, height: H, channels: 3, background: BG } });

  // 4 photos with subtle editorial rotation
  const hero    = await shot("c2_menu.png",    480, 600, -3);  // QR menu HERO
  const reserve = await shot("c2_reserve.webp",460, 340,  3);  // reservation tablet
  const kitchen = await shot("c2_kitchen.jpg", 380, 500, -2);  // kitchen KDS
  const phones  = await shot("c2_phones.webp", 440, 300,  4);  // two phones

  // Drop-shadow helper (cheap: a slightly larger dark blurred copy under each)
  const shadowOf = async (buf, blur = 18, opacity = 0.18) => {
    const meta = await sharp(buf).metadata();
    return sharp({
      create: { width: meta.width, height: meta.height, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
    })
      .composite([{ input: buf, blend: "dest-in" }])
      .png()
      .toBuffer()
      .then((mask) =>
        sharp({
          create: {
            width: meta.width,
            height: meta.height,
            channels: 4,
            background: { r: 0, g: 0, b: 0, alpha: opacity },
          },
        })
          .composite([{ input: mask, blend: "dest-in" }])
          .blur(blur)
          .png()
          .toBuffer()
      );
  };

  const heroSh = await shadowOf(hero);
  const reserveSh = await shadowOf(reserve);
  const kitchenSh = await shadowOf(kitchen);
  const phonesSh = await shadowOf(phones);

  // Brand tile
  const tile = await sharp("iq_tile.png").resize(80, 80).png().toBuffer();

  // Text + CTA overlay
  const overlay = Buffer.from(
    `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="acc" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"  stop-color="#FF4929"/>
          <stop offset="100%" stop-color="#F99E1F"/>
        </linearGradient>
      </defs>

      <!-- brand wordmark, sits to the right of the iq_tile (which is composited separately) -->
      <text x="166" y="138" font-family="Lato" font-weight="900" font-size="48" fill="#0a0a0a">Rest</text>

      <!-- headline, left aligned, two lines -->
      <g font-family="Lato" font-weight="900" fill="#0a0a0a">
        <text x="60" y="270" font-size="76">${esc(h[0])}</text>
        <text x="60" y="354" font-size="76">${esc(h[1])}</text>
      </g>

      <!-- amber accent under headline -->
      <rect x="60" y="384" width="120" height="8" rx="4" fill="url(#acc)"/>

      <!-- subhead — DARK, readable -->
      <text x="60" y="442" font-family="Lato" font-weight="600" font-size="28" fill="#3a3a3a">${esc(f)}</text>

      <!-- CTA pill — full-width, centered -->
      <g>
        <rect x="60" y="1208" width="960" height="86" rx="43" fill="url(#acc)"/>
        <text x="540" y="1262" font-family="Lato" font-weight="800" font-size="32" fill="#fff" text-anchor="middle">${esc(cta)}</text>
      </g>

      <!-- small trust line under the pill -->
      <text x="540" y="1320" font-family="Lato" font-weight="600" font-size="20" fill="#7a7a7a" text-anchor="middle">No credit card · Cancel anytime</text>
    </svg>`
  );

  await base
    .composite([
      // brand tile (top-left)
      { input: tile, top: 90, left: 60 },

      // hero (QR menu) — biggest, top-left
      { input: heroSh, top: 478 + 8, left: 50 + 6 },
      { input: hero,   top: 478,     left: 50 },

      // reservation tablet — top-right
      { input: reserveSh, top: 478 + 6, left: 560 + 4 },
      { input: reserve,   top: 478,     left: 560 },

      // kitchen KDS — bottom-right (no overlap with reserve)
      { input: kitchenSh, top: 800 + 8, left: 620 + 6 },
      { input: kitchen,   top: 800,     left: 620 },

      // two phones — bottom-left, overlapping the menu
      { input: phonesSh, top: 840 + 6, left: 140 + 4 },
      { input: phones,   top: 840,     left: 140 },

      // text + CTA last so it's on top of everything
      { input: overlay, top: 0, left: 0 },
    ])
    .jpeg({ quality: 92 })
    .toFile("ad_v2_en.jpg");

  console.log("done ad_v2_en.jpg");
}

main().catch((e) => { console.error(e); process.exit(1); });
