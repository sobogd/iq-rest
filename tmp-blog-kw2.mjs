// Pass 2: broad short seeds per locale + URL seed. Read-only.
import { GoogleAdsApi } from "google-ads-api";
import { config } from "dotenv";
import fs from "fs";
config({ path: "/Users/sobogd/work/iq-rest/iq-rest/.env" });

const SEEDS = {
  en: ["restaurant", "restaurant software", "menu", "qr menu", "restaurant management", "cafe business", "restaurant owner", "waiter", "kitchen", "food cost", "restaurant reviews", "restaurant marketing", "table booking", "restaurant tips", "restaurant staff", "hospitality business", "bar management", "restaurant profit", "restaurant costs", "restaurant technology"],
  es: ["restaurante", "software restaurante", "carta restaurante", "menu qr", "gestion restaurante", "hosteleria", "camarero", "cocina restaurante", "escandallo", "resenas restaurante", "marketing restaurante", "reservas restaurante", "propinas", "personal restaurante", "bar gestion", "rentabilidad restaurante", "costes restaurante", "tpv hosteleria", "delivery restaurante", "digitalizacion hosteleria"],
  it: ["ristorante", "software ristorante", "menu ristorante", "menu qr", "gestione ristorante", "ristorazione", "cameriere", "cucina ristorante", "food cost", "recensioni ristorante", "marketing ristorante", "prenotazioni ristorante", "mance", "personale ristorante", "gestione bar", "redditivita ristorante", "costi ristorante", "cassa ristorante", "delivery ristorante", "digitalizzazione ristorazione"],
  fr: ["restaurant", "logiciel restaurant", "carte restaurant", "menu qr", "gestion restaurant", "restauration", "serveur", "cuisine restaurant", "food cost", "avis restaurant", "marketing restaurant", "reservation restaurant", "pourboire", "personnel restaurant", "gestion bar", "rentabilite restaurant", "couts restaurant", "caisse restaurant", "livraison restaurant", "digitalisation restauration"],
  de: ["restaurant", "gastronomie software", "speisekarte", "qr menü", "restaurant management", "gastronomie", "kellner", "restaurant küche", "wareneinsatz", "restaurant bewertungen", "restaurant marketing", "tischreservierung", "trinkgeld", "gastronomie personal", "bar management", "restaurant rentabilität", "restaurant kosten", "kassensystem", "lieferdienst restaurant", "digitalisierung gastronomie"],
  pt: ["restaurante", "software restaurante", "menu restaurante", "menu qr", "gestao restaurante", "restauracao", "empregado de mesa", "cozinha restaurante", "food cost", "avaliacoes restaurante", "marketing restaurante", "reservas restaurante", "gorjeta", "pessoal restaurante", "gestao de bar", "rentabilidade restaurante", "custos restaurante", "pos restaurante", "entregas restaurante", "digitalizacao restauracao"],
  nl: ["restaurant", "horeca software", "menukaart", "qr menu", "restaurant management", "horeca", "ober", "restaurant keuken", "food cost", "restaurant reviews", "restaurant marketing", "tafel reserveren", "fooi", "horeca personeel", "bar management", "restaurant rendement", "horeca kosten", "kassasysteem horeca", "bezorging restaurant", "digitalisering horeca"],
  pl: ["restauracja", "oprogramowanie dla restauracji", "karta menu", "menu qr", "zarzadzanie restauracja", "gastronomia", "kelner", "kuchnia restauracyjna", "food cost", "opinie o restauracji", "marketing restauracji", "rezerwacja stolika", "napiwki", "personel restauracji", "zarzadzanie barem", "rentownosc restauracji", "koszty restauracji", "system pos gastronomia", "dostawa jedzenia restauracja", "cyfryzacja gastronomii"],
  tr: ["restoran", "restoran yazilimi", "menu", "qr menu", "restoran yonetimi", "kafe isletme", "garson", "restoran mutfagi", "maliyet hesaplama restoran", "restoran yorumlari", "restoran pazarlama", "masa rezervasyon", "bahsis", "restoran personeli", "bar yonetimi", "restoran karlilik", "restoran maliyetleri", "pos sistemi restoran", "paket servis restoran", "restoran dijitallesme"],
  ro: ["restaurant", "software restaurant", "meniu restaurant", "meniu qr", "management restaurant", "horeca", "ospatar", "bucatarie restaurant", "food cost", "recenzii restaurant", "marketing restaurant", "rezervari restaurant", "bacsis", "personal restaurant", "administrare bar", "profitabilitate restaurant", "costuri restaurant", "casa de marcat restaurant", "livrare restaurant", "digitalizare horeca"],
  el: ["εστιατοριο", "λογισμικο εστιατοριου", "μενου εστιατοριου", "qr menu", "διαχειριση εστιατοριου", "σερβιτορος", "κουζινα εστιατοριου", "κοστολογηση εστιατοριου", "κριτικες εστιατοριου", "μαρκετινγκ εστιατοριου", "κρατησεις εστιατοριου", "φιλοδωρημα", "προσωπικο εστιατοριου", "διαχειριση μπαρ", "κερδοφορια εστιατοριου"],
};
const LOC = {
  en: { geo: ["geoTargetConstants/2840","geoTargetConstants/2826","geoTargetConstants/2372","geoTargetConstants/2036"], lang: "languageConstants/1000" },
  es: { geo: ["geoTargetConstants/2724","geoTargetConstants/2484","geoTargetConstants/2032"], lang: "languageConstants/1003" },
  it: { geo: ["geoTargetConstants/2380"], lang: "languageConstants/1004" },
  fr: { geo: ["geoTargetConstants/2250","geoTargetConstants/2056"], lang: "languageConstants/1002" },
  de: { geo: ["geoTargetConstants/2276","geoTargetConstants/2040","geoTargetConstants/2756"], lang: "languageConstants/1001" },
  pt: { geo: ["geoTargetConstants/2620","geoTargetConstants/2076"], lang: "languageConstants/1014" },
  nl: { geo: ["geoTargetConstants/2528","geoTargetConstants/2056"], lang: "languageConstants/1010" },
  pl: { geo: ["geoTargetConstants/2616"], lang: "languageConstants/1030" },
  tr: { geo: ["geoTargetConstants/2792"], lang: "languageConstants/1037" },
  ro: { geo: ["geoTargetConstants/2642"], lang: "languageConstants/1032" },
  el: { geo: ["geoTargetConstants/2300","geoTargetConstants/2196"], lang: "languageConstants/1022" },
};
const client = new GoogleAdsApi({ client_id: process.env.GOOGLE_ADS_CLIENT_ID, client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET, developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN });
const customer = client.Customer({ customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID, login_customer_id: process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID, refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN });
const out = {};
for (const [loc, seeds] of Object.entries(SEEDS)) {
  const cfg = LOC[loc]; const map = new Map();
  for (let i = 0; i < seeds.length; i += 10) {
    const batch = seeds.slice(i, i + 10);
    try {
      const ideas = await customer.keywordPlanIdeas.generateKeywordIdeas({ customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID, geo_target_constants: cfg.geo, language: cfg.lang, keyword_plan_network: "GOOGLE_SEARCH", keyword_seed: { keywords: batch }, include_adult_keywords: false, page_size: 1000 });
      for (const idea of ideas) { const m = idea.keyword_idea_metrics || {}; const kw = idea.text || ""; if (!kw || map.has(kw)) continue; map.set(kw, { keyword: kw, searches: Number(m.avg_monthly_searches || 0), competition: m.competition || "?", lowCpc: m.low_top_of_page_bid_micros ? Number(m.low_top_of_page_bid_micros)/1e6 : null }); }
    } catch (e) { console.error(`[${loc}] ${e.message || e}`); }
  }
  out[loc] = [...map.values()].sort((a,b)=>b.searches-a.searches);
  console.error(`[${loc}] ${out[loc].length}`);
}
fs.writeFileSync("/tmp/blog-kw2.json", JSON.stringify(out, null, 1));
