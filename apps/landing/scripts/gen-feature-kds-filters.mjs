// One-off: generate feature-kds-filters.webp via Gemini 3 Pro Image.
// One tablet on brass stand at restaurant kitchen pass.
//
//   node scripts/gen-feature-kds-filters.mjs
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..");
const envFile = join(repoRoot, ".env");

function readEnv(key) {
  if (process.env[key]) return process.env[key];
  if (!existsSync(envFile)) return undefined;
  const txt = readFileSync(envFile, "utf8");
  for (const line of txt.split(/\r?\n/)) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m && m[1] === key) {
      let v = m[2].trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
        v = v.slice(1, -1);
      }
      return v;
    }
  }
  return undefined;
}

const API_KEY = readEnv("GEMINI_API_KEY");
if (!API_KEY) {
  console.error("GEMINI_API_KEY missing");
  process.exit(1);
}

const SCREEN_PATH = "/Users/sobogd/Downloads/localhost_8129_en_dashboard_kitchen(iPad Mini) (2).png";
const OUT_PNG = join(repoRoot, "public", "landing", "feature-kds-filters.png");
const OUT_WEBP = join(repoRoot, "public", "landing", "feature-kds-filters.webp");

const screenB64 = readFileSync(SCREEN_PATH).toString("base64");

const PROMPT = `Cinematic, atmospheric, magazine-quality photograph for a restaurant SaaS landing page.

Scene: A professional restaurant kitchen pass — stainless steel counter, brass-coloured warming lamps softly glowing above, slight haze of steam, a finished plate slightly out of focus on the side, copper pans hanging in the deeper background as soft bokeh. Warm golden hour ambient light from the side.

Foreground: a modern tablet (iPad-like) standing on a small brass tablet stand on the stainless steel pass, screen facing the camera and clearly visible. The tablet is the hero — large in frame, screen sharp and perfectly readable. Camera angle: 3/4 view at eye level with the tablet, with the kitchen pass forming the surface.

The tablet's screen displays the reference image exactly: a dark KDS dashboard (Noir & Ember header, Menu / Bookings / Orders / Kitchen / Analytics / Settings nav, "Kitchen" selected) with a "Status" filter modal popped open in the center showing checkboxes Pending / Cooking / Ready / Served and Reset / Apply (orange) buttons. Behind the modal, the table-grid kitchen board with order cards is partially visible. Dark UI.

CRITICAL: order card status badge colors MUST be exactly:
- PENDING = SLATE GREY (muted grey dot)
- COOKING = AMBER / ORANGE (warm orange dot)
- READY = BLUE (sky/cobalt blue dot, NOT green)
- SERVED = EMERALD GREEN (NOT grey)
Do not invent other colors. Match these badge colors precisely on every visible card.

The screen content must match the reference image exactly — same English text, same checkboxes, same modal layout, same dark dashboard UI. The tablet screen must be perfectly legible — large enough that the user can read the modal items.

Atmosphere: warm cinematic light, slightly humid kitchen air, brass + stainless steel + soft golden bokeh. NO people, NO hands, NO faces. Professional working kitchen, end-of-service mood.

Output: a single landscape photograph, ratio 4:3, high resolution. Tablet dominant in frame, screen clearly readable.`;

const body = {
  contents: [
    {
      parts: [
        { text: PROMPT },
        { inline_data: { mime_type: "image/png", data: screenB64 } },
      ],
    },
  ],
};

const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent?key=${API_KEY}`;

console.log("calling Gemini …");
const res = await fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

if (!res.ok) {
  console.error("API error", res.status, await res.text());
  process.exit(1);
}

const json = await res.json();
const parts = json?.candidates?.[0]?.content?.parts ?? [];
const imagePart = parts.find((p) => p.inlineData || p.inline_data);
if (!imagePart) {
  console.error("no image", JSON.stringify(json, null, 2));
  process.exit(1);
}

const inline = imagePart.inlineData || imagePart.inline_data;
const png = Buffer.from(inline.data, "base64");
writeFileSync(OUT_PNG, png);
console.log("png saved →", OUT_PNG, png.length, "bytes");

await sharp(png).resize(1600, 1200, { fit: "cover" }).webp({ quality: 80 }).toFile(OUT_WEBP);
console.log("webp saved →", OUT_WEBP);
