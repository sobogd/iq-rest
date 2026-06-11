// One-off: generate feature-orders-map.webp via Gemini 3 Pro Image.
// One tablet on waiter station — Orders list + restaurant map.
//
//   node scripts/gen-feature-orders-map.mjs
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
if (!API_KEY) { console.error("GEMINI_API_KEY missing"); process.exit(1); }

const SCREEN_PATH = "/Users/sobogd/Downloads/localhost_8129_en_dashboard_kitchen(iPad Mini) (4).png";
const OUT_PNG = join(repoRoot, "public", "landing", "feature-orders-map.png");
const OUT_WEBP = join(repoRoot, "public", "landing", "feature-orders-map.webp");

const screenB64 = readFileSync(SCREEN_PATH).toString("base64");

const PROMPT = `Cinematic, atmospheric, magazine-quality photograph for a restaurant SaaS landing page.

Scene: A warm restaurant front-of-house — a wooden waiter station / pass with brass accents, soft Edison bulbs and a row of wine bottles bokeh in the background. Golden-hour warm light from a side window.

Foreground: a modern tablet (iPad-like) standing on a small brass tablet stand on the wooden waiter station, screen facing the camera and clearly visible. The tablet is the hero — large in frame, screen sharp and perfectly readable. Camera angle: 3/4 view at eye level with the tablet. A small notepad and a pen rest beside the stand.

The tablet's screen displays the reference image exactly: a dark "Orders" dashboard (Noir & Ember header, top nav with Orders selected) titled "Orders" / subtitle "Tap a table on the map to see or start an order." Left half — a dark grid restaurant floor map with circular table markers labelled 1–5 in DIFFERENT colors (some red/crimson, some green/emerald) with small orange notification badges showing item counts. Right half — vertical list of order cards: "Order #1 · In progress · €99.50", "Order #2 · In progress · €77.50", "Order #3 · In progress · €101.50", "Order #4 · In progress · €23.50", "Order #5 · In progress · €72.00", "Order #6 · In progress · €48.00". Dark UI.

Screen content must match the reference image exactly. Screen perfectly legible.

Atmosphere: warm cinematic light, brass + dark wood + soft bokeh. NO people, NO hands, NO faces.

Output: a single landscape photograph, ratio 4:3, high resolution. Tablet dominant in frame, screen clearly readable.`;

const body = { contents: [{ parts: [{ text: PROMPT }, { inline_data: { mime_type: "image/png", data: screenB64 } }] }] };
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent?key=${API_KEY}`;

console.log("calling Gemini …");
const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
if (!res.ok) { console.error("API error", res.status, await res.text()); process.exit(1); }

const json = await res.json();
const parts = json?.candidates?.[0]?.content?.parts ?? [];
const imagePart = parts.find((p) => p.inlineData || p.inline_data);
if (!imagePart) { console.error("no image", JSON.stringify(json, null, 2)); process.exit(1); }

const inline = imagePart.inlineData || imagePart.inline_data;
const png = Buffer.from(inline.data, "base64");
writeFileSync(OUT_PNG, png);
console.log("png saved →", OUT_PNG, png.length, "bytes");
await sharp(png).resize(1600, 1200, { fit: "cover" }).webp({ quality: 80 }).toFile(OUT_WEBP);
console.log("webp saved →", OUT_WEBP);
