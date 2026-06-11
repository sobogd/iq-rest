// One-off: generate feature-orders-mobile.webp via Gemini 3 Pro Image.
// 4 phones top-down flat-lay — order item add flow.
//
//   node scripts/gen-feature-orders-mobile.mjs
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

const A_PATH = "/Users/sobogd/Downloads/localhost_8129_en_dashboard_kitchen(iPhone SE).png";       // Select category
const B_PATH = "/Users/sobogd/Downloads/localhost_8129_en_dashboard_kitchen(iPhone SE) (1).png";   // Select item
const C_PATH = "/Users/sobogd/Downloads/localhost_8129_en_dashboard_orders(iPhone SE).png";       // Select size
const D_PATH = "/Users/sobogd/Downloads/localhost_8129_en_dashboard_orders(iPhone SE) (1).png";   // Comment + Add
const OUT_PNG = join(repoRoot, "public", "landing", "feature-orders-mobile.png");
const OUT_WEBP = join(repoRoot, "public", "landing", "feature-orders-mobile.webp");

const aB64 = readFileSync(A_PATH).toString("base64");
const bB64 = readFileSync(B_PATH).toString("base64");
const cB64 = readFileSync(C_PATH).toString("base64");
const dB64 = readFileSync(D_PATH).toString("base64");

const PROMPT = `Tight close-up, cinematic, magazine-quality photograph for a restaurant SaaS landing page.

Composition: TOP-DOWN FLAT-LAY shot — camera directly overhead (90° / bird's-eye view) shooting straight down at the table. FOUR smartphones fill MOST of the frame, all four screens facing the camera perfectly parallel to the lens. Screens appear as clean rectangles. The wood table grain runs across the entire frame as the only background, with subtle warm light glow from one edge.

Foreground: FOUR modern smartphones laying flat (face-up) on a rustic wood cafe table, arranged in a 2×2 grid with small natural gaps between them. NO hands, NO people, NO body parts visible.

Each phone displays one of the four reference images EXACTLY — same Spanish/English text, same dark UI, same orange accent button. The four phones together tell the four-step order-add story:

1. TOP-LEFT phone (reference 1): "Select category" modal — Entrantes, Principales, Burgers y Sandwiches, Guarniciones, Cócteles de Autor, Vinos y Champagne, Postres. Dark UI.
2. TOP-RIGHT phone (reference 2): "Select item" modal — Steak Tartar de Buey €18.50, Burrata con Trufa Negra €16.00, Tataki de Atún Rojo €19.00, Pulpo a la Brasa €22.00, Croquetas de Jamón Ibérico €12.00. Dark UI.
3. BOTTOM-LEFT phone (reference 3): "Select Size" modal — Small / Medium +1.00 / Big +2.00. Dark UI.
4. BOTTOM-RIGHT phone (reference 4): "Comment" modal — "Steak Tartar de Buey · €19.50 · Medium +€1.00", Notes textarea ("Notes: e.g. no onions, well done"), orange "Add · €19.50" button at bottom. Dark UI.

Screens must be perfectly legible.

Atmosphere: warm golden-hour light glow from one edge, wood texture visible around the four devices. Light, airy, warm, cinematic. NO people.

Output: a single landscape photograph, ratio 4:3, high resolution. Four phones dominant in frame in a clean 2×2 arrangement, all screens clearly readable.`;

const body = {
  contents: [
    {
      parts: [
        { text: PROMPT },
        { inline_data: { mime_type: "image/png", data: aB64 } },
        { inline_data: { mime_type: "image/png", data: bB64 } },
        { inline_data: { mime_type: "image/png", data: cB64 } },
        { inline_data: { mime_type: "image/png", data: dB64 } },
      ],
    },
  ],
};

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
