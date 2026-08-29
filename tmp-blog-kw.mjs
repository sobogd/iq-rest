// Read-only blog keyword research via Google Ads KeywordPlanIdeaService.
// Multi-locale. No campaign mutations. Usage: node tmp-blog-kw.mjs [locale...]
import { GoogleAdsApi } from "google-ads-api";
import { config } from "dotenv";
import fs from "fs";
import path from "path";

config({ path: "/Users/sobogd/work/iq-rest/iq-rest/.env" });

const EN_SEEDS = [
  "restaurant menu engineering", "menu design tips restaurant", "menu pricing psychology",
  "how to increase table turnover restaurant", "restaurant upselling techniques",
  "restaurant loyalty program ideas", "restaurant google business profile",
  "how to get more restaurant reviews", "restaurant food cost calculation",
  "restaurant staff training checklist", "how to open a restaurant checklist",
  "restaurant marketing ideas", "restaurant instagram marketing",
  "restaurant wifi captive portal", "self order kiosk restaurant",
  "restaurant pos system comparison", "tips on qr code menu", "restaurant waste reduction",
  "seasonal menu planning restaurant", "restaurant email marketing",
  "restaurant customer feedback survey", "how to price a menu item",
  "restaurant table reservation software", "restaurant inventory management",
  "vegan menu labelling", "wine list digital", "restaurant menu photos tips",
  "bar menu ideas", "cafe menu board digital", "restaurant delivery commission fees",
  "restaurant whatsapp marketing", "restaurant qr code payments",
  "restaurant hygiene rating rules", "hotel restaurant menu qr", "food truck menu qr",
];

const SEEDS = {
  en: EN_SEEDS,
  es: [
    "ingenieria de menu restaurante", "diseno de carta restaurante", "psicologia de precios carta",
    "rotacion de mesas restaurante", "tecnicas de venta sugerida restaurante",
    "programa de fidelizacion restaurante", "ficha de google restaurante",
    "conseguir resenas restaurante", "escandallo restaurante", "coste de comida restaurante",
    "formacion camareros", "abrir un restaurante requisitos", "ideas marketing restaurante",
    "instagram para restaurantes", "kiosco autopedido restaurante", "tpv restaurante comparativa",
    "propinas con qr", "reducir desperdicio alimentario restaurante", "carta de temporada",
    "email marketing restaurante", "encuesta satisfaccion cliente restaurante",
    "como poner precios carta", "software reservas restaurante", "gestion inventario restaurante",
    "carta vegana alergenos", "carta de vinos digital", "fotos de platos carta",
    "carta de bar ideas", "comisiones glovo restaurante", "whatsapp para restaurantes",
    "pago con qr restaurante", "menu food truck qr",
  ],
  it: [
    "menu engineering ristorante", "come progettare il menu ristorante", "psicologia dei prezzi menu",
    "rotazione tavoli ristorante", "tecniche di upselling ristorante",
    "programma fedelta ristorante", "scheda google ristorante", "come ottenere recensioni ristorante",
    "food cost ristorante", "formazione personale sala", "aprire un ristorante requisiti",
    "idee marketing ristorante", "instagram per ristoranti", "chiosco self order ristorante",
    "cassa ristorante confronto", "mance con qr code", "ridurre sprechi alimentari ristorante",
    "menu stagionale", "email marketing ristorante", "questionario soddisfazione clienti ristorante",
    "come fissare i prezzi del menu", "software prenotazioni ristorante", "gestione magazzino ristorante",
    "menu vegano allergeni", "carta dei vini digitale", "foto piatti menu",
    "menu bar idee", "commissioni glovo ristorante", "whatsapp per ristoranti",
    "pagamento con qr ristorante",
  ],
  fr: [
    "ingenierie de menu restaurant", "conception carte restaurant", "psychologie des prix menu",
    "rotation des tables restaurant", "techniques de vente additionnelle restaurant",
    "programme de fidelite restaurant", "fiche google restaurant", "obtenir des avis restaurant",
    "food cost restaurant", "formation du personnel de salle", "ouvrir un restaurant demarches",
    "idees marketing restaurant", "instagram pour restaurants", "borne de commande restaurant",
    "caisse enregistreuse restaurant comparatif", "pourboire par qr code",
    "reduire le gaspillage alimentaire restaurant", "carte de saison", "email marketing restaurant",
    "questionnaire satisfaction client restaurant", "comment fixer les prix de la carte",
    "logiciel de reservation restaurant", "gestion des stocks restaurant", "menu vegan allergenes",
    "carte des vins numerique", "photos de plats carte", "carte de bar idees",
    "commissions uber eats restaurant", "whatsapp pour restaurants", "paiement par qr restaurant",
  ],
  de: [
    "menu engineering gastronomie", "speisekarte gestalten tipps", "preispsychologie speisekarte",
    "tischauslastung erhoehen restaurant", "zusatzverkauf restaurant",
    "treueprogramm restaurant", "google unternehmensprofil restaurant", "mehr bewertungen restaurant",
    "wareneinsatz berechnen gastronomie", "mitarbeiterschulung gastronomie",
    "restaurant eroeffnen checkliste", "marketing ideen restaurant", "instagram fuer restaurants",
    "selbstbedienungsterminal restaurant", "kassensystem gastronomie vergleich",
    "trinkgeld per qr code", "lebensmittelverschwendung reduzieren gastronomie",
    "saisonale speisekarte", "e mail marketing restaurant", "gaestebefragung restaurant",
    "speisekarte preise kalkulieren", "reservierungssystem restaurant", "warenwirtschaft gastronomie",
    "vegane speisekarte allergene", "digitale weinkarte", "food fotografie speisekarte",
    "barkarte ideen", "lieferando provision restaurant", "whatsapp fuer restaurants",
    "bezahlen per qr code restaurant",
  ],
  pt: [
    "engenharia de menu restaurante", "como criar a carta do restaurante", "psicologia de precos menu",
    "rotatividade de mesas restaurante", "tecnicas de upselling restaurante",
    "programa de fidelizacao restaurante", "perfil google restaurante", "conseguir avaliacoes restaurante",
    "food cost restaurante", "formacao de empregados de mesa", "abrir restaurante requisitos",
    "ideias marketing restaurante", "instagram para restaurantes", "quiosque de pedidos restaurante",
    "software pos restaurante", "gorjeta por qr code", "reduzir desperdicio alimentar restaurante",
    "menu sazonal", "email marketing restaurante", "inquerito satisfacao cliente restaurante",
    "como definir precos do menu", "software de reservas restaurante", "gestao de stocks restaurante",
    "menu vegano alergenios", "carta de vinhos digital", "fotos de pratos menu",
    "comissoes uber eats restaurante", "whatsapp para restaurantes", "pagamento por qr restaurante",
  ],
  nl: [
    "menu engineering restaurant", "menukaart ontwerpen tips", "prijspsychologie menukaart",
    "tafelrotatie restaurant verhogen", "upselling technieken restaurant",
    "loyaliteitsprogramma restaurant", "google bedrijfsprofiel restaurant", "meer reviews restaurant",
    "food cost berekenen horeca", "personeelstraining horeca", "restaurant beginnen checklist",
    "marketing ideeen restaurant", "instagram voor restaurants", "bestelzuil restaurant",
    "kassasysteem horeca vergelijken", "fooi via qr code", "voedselverspilling verminderen horeca",
    "seizoensmenu", "e mail marketing restaurant", "klanttevredenheidsonderzoek restaurant",
    "menuprijzen berekenen", "reserveringssysteem restaurant", "voorraadbeheer horeca",
    "veganistisch menu allergenen", "digitale wijnkaart", "foto van gerechten menukaart",
    "thuisbezorgd commissie restaurant", "whatsapp voor restaurants", "betalen met qr restaurant",
  ],
  pl: [
    "inzynieria menu restauracja", "projektowanie karty menu", "psychologia cen w menu",
    "rotacja stolikow restauracja", "techniki sprzedazy w restauracji",
    "program lojalnosciowy restauracja", "wizytowka google restauracja", "jak zdobyc opinie restauracja",
    "food cost restauracja", "szkolenie kelnerow", "otwarcie restauracji krok po kroku",
    "pomysly na marketing restauracji", "instagram dla restauracji", "kiosk samoobslugowy restauracja",
    "system pos restauracja", "napiwek przez kod qr", "ograniczenie marnowania zywnosci restauracja",
    "menu sezonowe", "email marketing restauracja", "ankieta satysfakcji klienta restauracja",
    "jak ustalac ceny w menu", "system rezerwacji restauracja", "zarzadzanie magazynem restauracja",
    "menu weganskie alergeny", "cyfrowa karta win", "zdjecia potraw do menu",
    "prowizja pyszne pl restauracja", "whatsapp dla restauracji", "platnosc kodem qr restauracja",
  ],
};

const LOCALES = {
  en: { geo: ["geoTargetConstants/2840", "geoTargetConstants/2826", "geoTargetConstants/2372"], lang: "languageConstants/1000" },
  es: { geo: ["geoTargetConstants/2724"], lang: "languageConstants/1003" },
  it: { geo: ["geoTargetConstants/2380"], lang: "languageConstants/1004" },
  fr: { geo: ["geoTargetConstants/2250"], lang: "languageConstants/1002" },
  de: { geo: ["geoTargetConstants/2276", "geoTargetConstants/2040", "geoTargetConstants/2756"], lang: "languageConstants/1001" },
  pt: { geo: ["geoTargetConstants/2620"], lang: "languageConstants/1014" },
  nl: { geo: ["geoTargetConstants/2528", "geoTargetConstants/2056"], lang: "languageConstants/1010" },
  pl: { geo: ["geoTargetConstants/2616"], lang: "languageConstants/1030" },
};

const chunk = (a, n) => a.reduce((acc, x, i) => (i % n ? acc[acc.length - 1].push(x) : acc.push([x]), acc), []);

const client = new GoogleAdsApi({
  client_id: process.env.GOOGLE_ADS_CLIENT_ID,
  client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET,
  developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN,
});
const customer = client.Customer({
  customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID,
  login_customer_id: process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID,
  refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN,
});

const want = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const targets = want.length ? want : Object.keys(LOCALES);
const out = {};

for (const loc of targets) {
  const cfg = LOCALES[loc];
  const seeds = SEEDS[loc];
  const map = new Map();
  for (const batch of chunk(seeds, 20)) {
    let ideas;
    try {
      ideas = await customer.keywordPlanIdeas.generateKeywordIdeas({
        customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID,
        geo_target_constants: cfg.geo,
        language: cfg.lang,
        keyword_plan_network: "GOOGLE_SEARCH",
        keyword_seed: { keywords: batch },
        include_adult_keywords: false,
        page_size: 1000,
      });
    } catch (e) {
      console.error(`[${loc}] batch failed: ${e.message || e}`);
      continue;
    }
    for (const idea of ideas) {
      const m = idea.keyword_idea_metrics || {};
      const kw = idea.text || "";
      if (!kw || map.has(kw)) continue;
      map.set(kw, {
        keyword: kw,
        searches: Number(m.avg_monthly_searches || 0),
        competition: m.competition || "UNSPECIFIED",
        lowCpc: m.low_top_of_page_bid_micros ? Number(m.low_top_of_page_bid_micros) / 1e6 : null,
        highCpc: m.high_top_of_page_bid_micros ? Number(m.high_top_of_page_bid_micros) / 1e6 : null,
      });
    }
  }
  const rows = [...map.values()].sort((a, b) => b.searches - a.searches);
  out[loc] = rows;
  console.error(`[${loc}] ${rows.length} ideas`);
}

fs.writeFileSync("/tmp/blog-kw.json", JSON.stringify(out, null, 1));
console.error("written /tmp/blog-kw.json");
