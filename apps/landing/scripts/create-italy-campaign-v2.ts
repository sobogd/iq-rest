// Creates Italy Search campaign for IQ Rest QR/digital-menu landing (v2).
// Supersedes create-italy-campaign.ts (old: high bids, dead /it/lp URL, broken
// #how sitelink, PRESENCE_OR_INTEREST, no images, no pinned RSA). Built from IT
// conversion history: the IT paid subscription came via "creare qr code menu
// ristorante" / search "qr code per ristoranti". Every RSA pins HEADLINE_1 =
// intent, HEADLINE_2 = price; HEADLINE_3 unpinned (Google randomizes the rest).
//
// 4 ad groups, manual CPC, ENABLED on create. Geo Italy (2380), lang Italian
// (1004), PRESENCE targeting. Reuses the same branded image assets.
//
// Usage:
//   npx tsx scripts/create-italy-campaign-v2.ts             — creates LIVE campaign
//   npx tsx scripts/create-italy-campaign-v2.ts --dry-run   — log only

import { GoogleAdsApi, enums } from "google-ads-api";
import { config } from "dotenv";
import * as path from "path";

config({ path: path.join(process.cwd(), "..", "..", ".env") });
config({ path: path.join(process.cwd(), ".env") });

const DRY = process.argv.includes("--dry-run");

const CAMPAIGN_NAME = "IT — Search — Menu QR v2";
const DAILY_BUDGET_EUR = 7;
const IT_GEO = "geoTargetConstants/2380";
const IT_LANG = "languageConstants/1004";

const LP_DIGITAL = "https://iq-rest.com/it/menu-digitale-ristoranti";
const LP_QR = "https://iq-rest.com/it/menu-qr-code-ristoranti";
const LP_HOME = "https://iq-rest.com/it";
const LP_PREZZI = "https://iq-rest.com/it/prezzi";

const PATH1 = "menu-digitale";
const PATH2 = "ristorante";

// Same branded image assets used by other Google campaigns (no re-upload).
const IMG_SQUARE = "360846933084";    // iqrest_v2_square_1200x1200.jpg  (1:1)
const IMG_LANDSCAPE = "360773679043"; // iqrest_v2_landscape_1200x628.jpg (1.91:1)
const IMG_LOGO = "356984885322";      // IQ Rest Logo 400x400

// ── Types ────────────────────────────────────────────────────────────────
type Match = "EXACT" | "PHRASE" | "BROAD";
interface KW { text: string; match: Match }
interface RSA { pin1: string[]; pin2: string[]; free: string[]; descriptions: string[] }
interface Group { name: string; cpcEur: number; finalUrl: string; keywords: KW[]; ad: RSA }

const FREE_BENEFITS = [
  "Foto AI dei Piatti",
  "35 Lingue con IA",
  "Senza Commissioni",
  "Accetta Ordini e Prenotazioni",
  "Pronto in 5 Minuti",
  "Editor da Mobile",
];
const DESCRIPTIONS = [
  "Crea il menu digitale del tuo ristorante in 60 secondi. 14 giorni gratis, senza carta.",
  "Foto AI di ogni piatto. Aggiorna prezzi e disponibilità in un tocco.",
  "Ordini diretti via QR, senza commissioni. Multilingua per turisti in 35 lingue.",
  "Tutto in uno: menu, ordini, prenotazioni, sito. Supporto in italiano.",
];

const GROUPS: Group[] = [
  {
    name: "A — Menu Digitale",
    cpcEur: 1.6,
    finalUrl: LP_DIGITAL,
    keywords: [
      { text: "menu digitale per ristoranti", match: "PHRASE" }, // ⭐
      { text: "menu digitale ristorante", match: "EXACT" },      // ⭐
      { text: "menu digitale ristorante", match: "PHRASE" },
      { text: "menu digitale ristoranti", match: "PHRASE" },
      { text: "menu digitale online", match: "PHRASE" },         // ⭐
      { text: "menu digitali", match: "PHRASE" },                // ⭐
      { text: "menu interattivo", match: "PHRASE" },             // ⭐
      { text: "menu ristoranti online", match: "PHRASE" },       // ⭐
      { text: "carta digitale ristorante", match: "PHRASE" },
    ],
    ad: {
      pin1: ["Menu Digitale Ristoranti", "Menu Digitale Ristorante", "Carta Digitale Ristorante"],
      pin2: ["Menu Digitale da 6,90€", "Da 6,90€/mese · 14 Giorni", "6,90€/mese · 14 Giorni Prova"],
      free: FREE_BENEFITS,
      descriptions: DESCRIPTIONS,
    },
  },
  {
    name: "B — QR Intent",
    cpcEur: 1.8,
    finalUrl: LP_QR,
    keywords: [
      { text: "qr code per ristoranti", match: "EXACT" },        // ⭐⭐ paid sub
      { text: "qr code per ristoranti", match: "PHRASE" },
      { text: "qr code menu ristorante", match: "PHRASE" },      // ⭐
      { text: "menu qr code ristorante", match: "PHRASE" },      // ⭐
      { text: "menu qrcode", match: "PHRASE" },                  // ⭐
      { text: "qr menu ristorante", match: "PHRASE" },
      { text: "menu con qr code", match: "PHRASE" },
      { text: "qr menu", match: "PHRASE" },                      // ⭐
    ],
    ad: {
      pin1: ["QR Menu per Ristoranti", "Menu QR per Ristorante", "QR Code per il Menu"],
      pin2: ["QR Menu da 6,90€/mese", "Da 6,90€/mese · 14 Giorni"],
      free: FREE_BENEFITS,
      descriptions: DESCRIPTIONS,
    },
  },
  {
    name: "D — Create Intent",
    cpcEur: 1.8,
    finalUrl: LP_DIGITAL,
    keywords: [
      { text: "creare qr code menu ristorante", match: "EXACT" }, // ⭐⭐ paid sub
      { text: "creare qr code menu ristorante", match: "PHRASE" },
      { text: "creare menu digitale", match: "PHRASE" },          // ⭐
      { text: "creare menu ristorante", match: "PHRASE" },        // ⭐
      { text: "come creare un menu con qr code", match: "PHRASE" },
      { text: "come creare menu digitale", match: "PHRASE" },
    ],
    ad: {
      pin1: ["Crea il Tuo Menu QR · 5min", "Creare Menu Digitale", "Crea il Menu del Ristorante"],
      pin2: ["Da 6,90€/mese", "6,90€/mese · 14 Giorni Prova"],
      free: FREE_BENEFITS,
      descriptions: DESCRIPTIONS,
    },
  },
  {
    name: "E — Verticals",
    cpcEur: 1.2,
    finalUrl: LP_HOME,
    keywords: [
      { text: "menu digitale bar", match: "PHRASE" },
      { text: "menu pizzeria qr", match: "PHRASE" },
      { text: "carta dei vini digitale", match: "PHRASE" },
      { text: "menu ristorante multilingua", match: "PHRASE" },
    ],
    ad: {
      pin1: ["Menu Digitale per Bar", "Menu QR Pizzeria", "Carta dei Vini Digitale"],
      pin2: ["Da 6,90€/mese", "6,90€/mese · 14 Giorni Prova"],
      free: FREE_BENEFITS,
      descriptions: DESCRIPTIONS,
    },
  },
];

// Curated intent-safe negatives (multilingual) + IT-specific tail. Nothing here
// shares a token with our keywords (menu/digitale/qr/code/creare/ristorante/
// carta/bar/vini/interattivo/pizzeria), so no real query is blocked. PHRASE.
const NEGATIVES = [
  // free-seekers
  "gratis", "grátis", "gratuito", "gratuita", "gratuiti", "gratis online", "free",
  "gratuit", "kostenlos", "darmowe", "besplatno", "bedava", "ücretsiz", "umsonst",
  "senza costi", "a costo zero", "0 euro", "ohne anmeldung",
  // templates / examples / editables
  "modello", "modelli", "modelo", "template", "templates", "esempio", "esempi",
  "ejemplo", "exemplo", "beispiel", "muster", "vorlage", "fac simile", "da compilare",
  "sample", "samples", "formato", "formati", "da editare", "editabile", "editable",
  // file formats / DIY tools
  "pdf", "word", "excel", "powerpoint", "psd", "canva",
  // print / physical menu
  "stampa", "stampare", "stampabile", "stampabili", "da stampare", "imprimir",
  "drucken", "porta menu", "portamenu", "cavalletto", "espositore", "targhetta",
  "plastificato", "cartoncino", "cartello", "adesivo", "vetrofania", "tovaglietta",
  "volantino", "vistaprint", "tipografia",
  // QR generators / scanners / readers (consumer / DIY)
  "generatore", "generator", "qr generator", "qrcode generator", "scanner",
  "scanner qr", "scanner codice qr", "lettore qr", "leggere menu", "leggi menu",
  "leggere qr", "leggi qr", "leggimenu", "come scannerizzare", "come leggere",
  "scannerizzare", "qr lesen", "ler qr", "leer qr",
  // info / meaning / how-it-works / research
  "significato", "cosa significa", "cos'è", "come funziona", "che cos'è", "meaning",
  "what is", "definizione", "wikipedia", "quora", "reddit", "blog", "forum",
  // consumer "view a restaurant menu" / local diner
  "vedere menu", "guarda menu", "visualizzare menu", "consultare menu", "il menu di",
  "ristoranti vicino", "ristorante vicino", "vicino a me", "ristorante economico",
  "migliori ristoranti", "dove mangiare",
  // delivery / aggregators
  "consegna", "domicilio", "asporto", "delivery", "glovo", "just eat", "deliveroo",
  "uber eats", "ubereats", "thefork", "the fork", "tripadvisor", "quandoo",
  // competitor menu-SaaS brands
  "menutech", "menudigitale", "leggimenu it", "digitavolo", "menu tiger", "menusubito",
  "menubly", "flipdish", "olaclick", "smartmenu", "qodeup", "scanmi", "qromo",
  "mydigimenu", "quickqr", "menuya", "menuu", "covermanager", "tablecheck",
  // jobs / HR
  "lavoro", "assunzioni", "assunzione", "stipendio", "offerte lavoro", "curriculum",
  "carriera", "career", "jobs", "stage", "tirocinio", "personale",
  // education / courses
  "corso", "corsi", "scuola", "università", "tutorial", "tutoriais", "course", "lezioni",
  // POS / cash register / other software
  "registratore di cassa", "registratore", "cassa", "scontrino", "comande",
  "comandero", "gestionale", "listino prezzi", "pos", "terminale", "fatturazione",
  // dev / design tools
  "html", "css", "javascript", "python", "wordpress", "wix", "shopify", "squarespace",
  "figma", "photoshop", "illustrator", "indesign", "adobe", "github", "api",
  "sviluppatore", "mockup", "clipart", "icona", "vettoriale", "logo", "grafica",
  // food chains (consumer)
  "mcdonald", "mcdonalds", "burger king", "kfc", "starbucks", "old wild west",
  "rossopomodoro", "spontini", "alice pizza",
  // recipes / cooking / food
  "ricetta", "ricette", "cucinare", "mangiare", "pranzo", "cena", "colazione",
  "receita", "recipe", "comida",
  // junk / entertainment / piracy
  "porn", "nude", "netflix", "youtube", "tiktok", "instagram", "facebook", "imdb",
  "il film", "crack", "hack", "torrent", "wifi",
];

const SITELINKS = [
  { text: "Funzionalità", desc1: "Tutto ciò che serve", desc2: "in un'unica piattaforma", url: `${LP_HOME}#features` },
  { text: "Come Funziona", desc1: "Menu QR in 5 minuti", desc2: "passo dopo passo", url: LP_QR },
  { text: "Prezzi", desc1: "Piani trasparenti", desc2: "14 giorni di prova", url: LP_PREZZI },
  { text: "Domande Frequenti", desc1: "Tutte le risposte", desc2: "che cerchi", url: `${LP_HOME}#faq` },
];

const CALLOUTS = [
  "Pronto in 60 secondi",
  "14 giorni gratis",
  "Senza carta di credito",
  "Supporto in italiano",
  "35 lingue con IA",
  "Foto piatti con AI",
  "Senza commissioni",
  "Tutto da cellulare",
];

// ── Helpers ────────────────────────────────────────────────────────────────
const log = (s: string) => console.log(s);
const dryRun = (label: string, payload: any) => { if (DRY) log(`[DRY] ${label}: ${JSON.stringify(payload).slice(0, 240)}`); };
const cap30 = (s: string) => s.slice(0, 30);
const cap90 = (s: string) => s.slice(0, 90);

function buildHeadlines(ad: RSA) {
  const H1 = enums.ServedAssetFieldType.HEADLINE_1;
  const H2 = enums.ServedAssetFieldType.HEADLINE_2;
  return [
    ...ad.pin1.map((t) => ({ text: cap30(t), pinned_field: H1 })),
    ...ad.pin2.map((t) => ({ text: cap30(t), pinned_field: H2 })),
    ...ad.free.map((t) => ({ text: cap30(t) })),
  ].slice(0, 15);
}

async function main() {
  const client = new GoogleAdsApi({
    client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
    client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
    developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
  });
  const customer = client.Customer({
    customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID!,
    login_customer_id: process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID,
    refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
  });

  log(`\n${DRY ? "DRY-RUN — no mutations" : "LIVE — will create campaign"}`);
  log(`Customer: ${process.env.GOOGLE_ADS_CUSTOMER_ID}\n`);

  log("Pre-flight: checking for existing campaign with same name...");
  const existing = await customer.query(
    `SELECT campaign.id, campaign.name FROM campaign WHERE campaign.name = '${CAMPAIGN_NAME.replace(/'/g, "\\'")}'`,
  );
  if (existing.length > 0) {
    log(`ABORT — campaign "${CAMPAIGN_NAME}" already exists (id=${(existing[0] as any).campaign.id})`);
    process.exit(1);
  }

  log(`\n[1] Creating campaign budget €${DAILY_BUDGET_EUR}/day...`);
  let budgetResource = "customers/X/campaignBudgets/dry";
  if (!DRY) {
    const r = await customer.campaignBudgets.create([{
      name: `${CAMPAIGN_NAME} — Budget`,
      amount_micros: Math.round(DAILY_BUDGET_EUR * 1_000_000),
      delivery_method: enums.BudgetDeliveryMethod.STANDARD,
      explicitly_shared: false,
    }]);
    budgetResource = r.results[0].resource_name;
    log(`  Budget: ${budgetResource}`);
  } else dryRun("budget", { amount: DAILY_BUDGET_EUR });

  log(`\n[2] Creating campaign "${CAMPAIGN_NAME}"...`);
  let campaignResource = "customers/X/campaigns/dry";
  if (!DRY) {
    const r = await customer.campaigns.create([{
      name: CAMPAIGN_NAME,
      status: enums.CampaignStatus.ENABLED,
      advertising_channel_type: enums.AdvertisingChannelType.SEARCH,
      manual_cpc: { enhanced_cpc_enabled: false },
      campaign_budget: budgetResource,
      network_settings: {
        target_google_search: true,
        target_search_network: false,
        target_content_network: false,
        target_partner_search_network: false,
      },
      geo_target_type_setting: {
        positive_geo_target_type: enums.PositiveGeoTargetType.PRESENCE,
        negative_geo_target_type: enums.NegativeGeoTargetType.PRESENCE,
      },
      contains_eu_political_advertising:
        enums.EuPoliticalAdvertisingStatus.DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING,
    }]);
    campaignResource = r.results[0].resource_name;
    log(`  Campaign: ${campaignResource}`);
  }

  log(`\n[3] geo Italy + lang Italian + ${NEGATIVES.length} negatives...`);
  const critOps: any[] = [
    { campaign: campaignResource, location: { geo_target_constant: IT_GEO } },
    { campaign: campaignResource, language: { language_constant: IT_LANG } },
  ];
  for (const neg of NEGATIVES)
    critOps.push({ campaign: campaignResource, negative: true, keyword: { text: neg, match_type: enums.KeywordMatchType.PHRASE } });
  if (!DRY) { await customer.campaignCriteria.create(critOps); log(`  ${critOps.length} criteria added`); }
  else dryRun("criteria", { count: critOps.length });

  for (const g of GROUPS) {
    log(`\n[4] Ad group "${g.name}" (max CPC €${g.cpcEur}, ${g.keywords.length} kw)...`);
    let adGroupResource = `customers/X/adGroups/dry-${g.name}`;
    if (!DRY) {
      const r = await customer.adGroups.create([{
        campaign: campaignResource,
        name: g.name,
        status: enums.AdGroupStatus.ENABLED,
        type: enums.AdGroupType.SEARCH_STANDARD,
        cpc_bid_micros: Math.round(g.cpcEur * 1_000_000),
      }]);
      adGroupResource = r.results[0].resource_name;
    }

    const kwOps = g.keywords.map((kw) => ({
      ad_group: adGroupResource,
      status: enums.AdGroupCriterionStatus.ENABLED,
      keyword: {
        text: kw.text,
        match_type: kw.match === "EXACT" ? enums.KeywordMatchType.EXACT
          : kw.match === "PHRASE" ? enums.KeywordMatchType.PHRASE
          : enums.KeywordMatchType.BROAD,
      },
    }));
    if (!DRY) { await customer.adGroupCriteria.create(kwOps); log(`  ${kwOps.length} keywords`); }
    else dryRun("keywords", g.keywords.map((k) => `${k.text} [${k.match}]`));

    const headlines = buildHeadlines(g.ad);
    const adOp = {
      ad_group: adGroupResource,
      status: enums.AdGroupAdStatus.ENABLED,
      ad: {
        final_urls: [g.finalUrl],
        responsive_search_ad: {
          headlines,
          descriptions: g.ad.descriptions.slice(0, 4).map((d) => ({ text: cap90(d) })),
          path1: PATH1.slice(0, 15),
          path2: PATH2.slice(0, 15),
        },
      },
    };
    if (!DRY) { await customer.adGroupAds.create([adOp]); log(`  RSA created (${headlines.length} headlines: H1×${g.ad.pin1.length} pinned, H2×${g.ad.pin2.length} pinned, ${g.ad.free.length} free)`); }
    else { log(`  RSA headlines:`); for (const h of headlines) log(`    ${(h as any).pinned_field ? "PIN:" + (h as any).pinned_field : "(free)"} | "${h.text}"`); }
  }

  log(`\n[5] ${SITELINKS.length} sitelinks + ${CALLOUTS.length} callouts...`);
  if (!DRY) {
    const slRes = await customer.assets.create(SITELINKS.map((s) => ({
      sitelink_asset: { link_text: s.text.slice(0, 25), description1: s.desc1.slice(0, 35), description2: s.desc2.slice(0, 35) },
      final_urls: [s.url],
    })));
    await customer.campaignAssets.create(slRes.results.map((r: any) => ({
      campaign: campaignResource, asset: r.resource_name, field_type: enums.AssetFieldType.SITELINK,
    })));
    const coRes = await customer.assets.create(CALLOUTS.map((c) => ({ callout_asset: { callout_text: c.slice(0, 25) } })));
    await customer.campaignAssets.create(coRes.results.map((r: any) => ({
      campaign: campaignResource, asset: r.resource_name, field_type: enums.AssetFieldType.CALLOUT,
    })));
    log(`  attached`);
  } else dryRun("assets", { sitelinks: SITELINKS.length, callouts: CALLOUTS.length });

  log(`\n[6] Attaching image assets (square 1:1 + landscape 1.91:1 + logo)...`);
  const cid = process.env.GOOGLE_ADS_CUSTOMER_ID!;
  const imgOps = [
    { campaign: campaignResource, asset: `customers/${cid}/assets/${IMG_SQUARE}`, field_type: enums.AssetFieldType.AD_IMAGE },
    { campaign: campaignResource, asset: `customers/${cid}/assets/${IMG_LANDSCAPE}`, field_type: enums.AssetFieldType.AD_IMAGE },
    { campaign: campaignResource, asset: `customers/${cid}/assets/${IMG_LOGO}`, field_type: enums.AssetFieldType.BUSINESS_LOGO },
  ];
  if (!DRY) { await customer.campaignAssets.create(imgOps); log(`  ${imgOps.length} image/logo assets attached`); }
  else { log(`  AD_IMAGE enum=${enums.AssetFieldType.AD_IMAGE}, BUSINESS_LOGO enum=${enums.AssetFieldType.BUSINESS_LOGO}`); dryRun("images", imgOps.map((o) => o.asset)); }

  log(`\n✓ Done. Campaign "${CAMPAIGN_NAME}" is ${DRY ? "(dry-run)" : "LIVE"}.`);
  log(`  Manage: https://ads.google.com/aw/campaigns?ocid=${process.env.GOOGLE_ADS_CUSTOMER_ID}`);
}

main().catch((e) => {
  console.error("\nFAILED:", e?.errors ?? e);
  process.exit(1);
});
