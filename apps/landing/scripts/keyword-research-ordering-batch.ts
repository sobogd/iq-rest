// Multi-locale keyword research for the "restaurant online ordering"
// feature page. For each locale: build seed list in the local language,
// call Google Ads KeywordPlanIdeaService, filter to B2B intent, write
// JSON. Print a summary table with the top-5 candidates per locale.
//
// Usage:
//   npx tsx scripts/keyword-research-ordering-batch.ts        — runs all
//   npx tsx scripts/keyword-research-ordering-batch.ts es it  — subset

import { GoogleAdsApi } from "google-ads-api";
import { config } from "dotenv";
import * as fs from "fs";
import * as path from "path";

config({ path: path.join(process.cwd(), ".env") });

type LocaleConfig = {
  locale: string;
  geo: string; // geoTargetConstants/XXXX
  lang: string; // languageConstants/XXXX
  seeds: string[];
  // Regex to drop consumer-/brand-/delivery-intent results.
  negative: RegExp;
  // Regex to keep only B2B-software-intent results.
  positive: RegExp;
};

const LOCALES: LocaleConfig[] = [
  {
    locale: "es",
    geo: "geoTargetConstants/2724",
    lang: "languageConstants/1003",
    seeds: [
      "sistema de pedidos online restaurante",
      "pedidos online restaurante sin comisiones",
      "pedidos qr restaurante",
      "comanda en mesa qr",
      "carta digital con pedidos",
      "qr menu para pedidos",
      "software de pedidos restaurante",
      "sistema de comandas restaurante",
      "pedidos por whatsapp restaurante",
      "menu qr pedidos",
      "comanda digital restaurante",
      "comandas restaurante app",
      "pedidos en mesa",
      "autopedido restaurante",
      "pantalla de cocina restaurante",
      "kds restaurante",
      "tableta pedidos restaurante",
      "pedido digital restaurante",
      "software pedidos en mesa",
      "comanda movil restaurante",
    ],
    negative:
      /\b(glovo|uber|just eat|deliveroo|wolt|domicilio|deliver|delivery|cerca de mi|reparto|comida a domicilio)\b/i,
    positive:
      /(qr|comanda|pedido|whatsapp|menu|kitchen|cocina|kds|tableta|tablet|software|sistema|plataforma|aplicacion|app|en mesa|sin comision|sin comisiones|autopedido|pantalla)/i,
  },
  {
    locale: "it",
    geo: "geoTargetConstants/2380",
    lang: "languageConstants/1004",
    seeds: [
      "sistema ordini online ristorante",
      "ordini online ristorante senza commissioni",
      "ordini qr ristorante",
      "comanda al tavolo qr",
      "menu digitale con ordini",
      "qr menu ordini",
      "software ordini ristorante",
      "ordini whatsapp ristorante",
      "menu digitale ordini",
      "ordini al tavolo",
      "comanda digitale ristorante",
      "ordinazioni online ristorante",
      "self ordering ristorante",
      "pannello cucina ordini",
      "kds ristorante",
      "tablet ordini ristorante",
      "ordini digitali ristorante",
      "software ordinazioni",
      "ordini diretti ristorante",
      "comanda tablet ristorante",
    ],
    negative:
      /\b(glovo|uber|just eat|deliveroo|wolt|domicilio|consegna|consegna a domicilio|cibo a domicilio|vicino a me|consegna ristoranti)\b/i,
    positive:
      /(qr|comanda|ordini|whatsapp|menu|kitchen|cucina|kds|tableta|tablet|software|sistema|piattaforma|app|al tavolo|senza commissioni|self|pannello|ordinazion)/i,
  },
  {
    locale: "fr",
    geo: "geoTargetConstants/2250",
    lang: "languageConstants/1002",
    seeds: [
      "systeme de commande en ligne restaurant",
      "commande en ligne restaurant sans commission",
      "commande qr restaurant",
      "commande a table qr",
      "carte digitale commande",
      "qr menu commande",
      "logiciel commande restaurant",
      "commande whatsapp restaurant",
      "menu numerique commande",
      "commande a table",
      "comptoir digital restaurant",
      "borne de commande restaurant",
      "self commande restaurant",
      "ecran cuisine restaurant",
      "kds restaurant",
      "tablette commande restaurant",
      "commande digitale restaurant",
      "logiciel commande table",
      "commande directe restaurant",
      "menu qr code commande",
    ],
    negative:
      /\b(uber|deliveroo|just eat|glovo|wolt|livraison|a domicile|pres de moi|repas a domicile|service de livraison)\b/i,
    positive:
      /(qr|commande|whatsapp|menu|kitchen|cuisine|kds|tablette|tablet|logiciel|systeme|plateforme|application|app|a table|sans commission|self|ecran|borne|comptoir)/i,
  },
  {
    locale: "de",
    geo: "geoTargetConstants/2276",
    lang: "languageConstants/1001",
    seeds: [
      "bestellsystem restaurant online",
      "online bestellsystem restaurant ohne provision",
      "qr bestellung restaurant",
      "tischbestellung qr",
      "digitale speisekarte mit bestellung",
      "qr menu bestellung",
      "bestellsoftware restaurant",
      "whatsapp bestellung restaurant",
      "digitales menu bestellung",
      "bestellung am tisch",
      "self ordering restaurant",
      "self bestellung restaurant",
      "kuechenmonitor restaurant",
      "kds restaurant",
      "tablet bestellung restaurant",
      "digitale bestellung restaurant",
      "bestellsoftware gastronomie",
      "direktbestellung restaurant",
      "qr code speisekarte bestellung",
      "gaeste bestellsystem",
    ],
    negative:
      /\b(lieferando|uber|wolt|wolt eats|lieferheld|takeaway|lieferdienst|lieferung|essen liefern|in der naehe|lieferservice)\b/i,
    positive:
      /(qr|bestell|whatsapp|speisekarte|menu|kueche|kitchen|kds|tablet|tablett|software|system|plattform|app|am tisch|ohne provision|self|monitor|bildschirm)/i,
  },
  {
    locale: "pt",
    geo: "geoTargetConstants/2620",
    lang: "languageConstants/1014",
    seeds: [
      "sistema de pedidos online restaurante",
      "pedidos online restaurante sem comissoes",
      "pedidos qr restaurante",
      "comanda na mesa qr",
      "menu digital com pedidos",
      "qr menu pedidos",
      "software de pedidos restaurante",
      "pedidos whatsapp restaurante",
      "menu digital pedidos",
      "pedidos na mesa",
      "self ordering restaurante",
      "ecra cozinha restaurante",
      "kds restaurante",
      "tablet pedidos restaurante",
      "pedidos digitais restaurante",
      "software comandas restaurante",
      "pedidos diretos restaurante",
      "qr code menu pedidos",
      "sistema comandas restaurante",
      "comanda mobile restaurante",
    ],
    negative:
      /\b(uber|glovo|just eat|bolt|domicilio|entrega|entrega ao domicilio|perto de mim|entrega restaurante)\b/i,
    positive:
      /(qr|comanda|pedido|whatsapp|menu|cozinha|kitchen|kds|tablet|software|sistema|plataforma|app|na mesa|sem comissao|sem comissoes|self|ecra)/i,
  },
];

async function runOne(client: GoogleAdsApi, cfg: LocaleConfig) {
  const customer = client.Customer({
    customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID!,
    login_customer_id: process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID,
    refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
  });

  const ideas = await customer.keywordPlanIdeas.generateKeywordIdeas({
    customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID!,
    geo_target_constants: [cfg.geo],
    language: cfg.lang,
    keyword_plan_network: 2,
    keyword_seed: { keywords: cfg.seeds.slice(0, 20) },
    include_adult_keywords: false,
  });

  const raw = ideas.map((r) => {
    const m = r.keyword_idea_metrics;
    return {
      keyword: r.text ?? "",
      avgMonthlySearches: Number(m?.avg_monthly_searches ?? 0),
      competition: m?.competition,
      competitionIndex: Number(m?.competition_index ?? 0),
      lowTopBidMicros: Number(m?.low_top_of_page_bid_micros ?? 0),
      highTopBidMicros: Number(m?.high_top_of_page_bid_micros ?? 0),
    };
  });

  const filtered = raw.filter(
    (r) =>
      r.keyword &&
      !cfg.negative.test(r.keyword) &&
      cfg.positive.test(r.keyword),
  );
  filtered.sort((a, b) => b.avgMonthlySearches - a.avgMonthlySearches);

  const outPath = path.join(
    process.cwd(),
    `scripts/keyword-research-ordering-${cfg.locale}.json`,
  );
  fs.writeFileSync(outPath, JSON.stringify(filtered, null, 2));

  console.log(
    `\n=== ${cfg.locale.toUpperCase()} — ${filtered.length} filtered / ${raw.length} raw ===`,
  );
  console.log(
    "kw".padEnd(50) +
      "  vol".padStart(7) +
      "  comp".padStart(7) +
      "  idx".padStart(5),
  );
  for (const r of filtered.slice(0, 10)) {
    console.log(
      String(r.keyword).padEnd(50).slice(0, 50) +
        "  " +
        String(r.avgMonthlySearches).padStart(5) +
        "  " +
        String(r.competition ?? "").padStart(5) +
        "  " +
        String(r.competitionIndex).padStart(3),
    );
  }
}

async function main() {
  for (const k of [
    "GOOGLE_ADS_CLIENT_ID",
    "GOOGLE_ADS_CLIENT_SECRET",
    "GOOGLE_ADS_REFRESH_TOKEN",
    "GOOGLE_ADS_DEVELOPER_TOKEN",
    "GOOGLE_ADS_CUSTOMER_ID",
  ]) {
    if (!process.env[k]) {
      console.error(`Missing ${k} in .env`);
      process.exit(1);
    }
  }

  const client = new GoogleAdsApi({
    client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
    client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
    developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
  });

  const want = process.argv.slice(2);
  const targets = want.length
    ? LOCALES.filter((l) => want.includes(l.locale))
    : LOCALES;

  for (const cfg of targets) {
    try {
      await runOne(client, cfg);
    } catch (e) {
      console.error(`[${cfg.locale}] failed:`, e instanceof Error ? e.message : e);
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
