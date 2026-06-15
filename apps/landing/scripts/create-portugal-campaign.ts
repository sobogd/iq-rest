// Creates Portugal Search campaign for IQ Rest QR/digital-menu landing.
// Built from PT conversion history: the only EU paid subscription from PT Search
// came through a lean RSA with PRICE pinned high + an intent headline. So every
// RSA here pins HEADLINE_1 = intent (per group), HEADLINE_2 = price; HEADLINE_3
// is left unpinned (rarely shown — let Google randomize the rest).
//
// 4 ad groups, manual CPC, conservative bids, ENABLED on create.
// Geo Portugal (2620), language Portuguese (1014), PRESENCE targeting
// (PT and BR share the language — PRESENCE keeps Brazil out).
//
// Usage:
//   npx tsx scripts/create-portugal-campaign.ts             — creates LIVE campaign
//   npx tsx scripts/create-portugal-campaign.ts --dry-run   — log only

import { GoogleAdsApi, enums } from "google-ads-api";
import { config } from "dotenv";
import * as path from "path";

// root mono .env holds GOOGLE_ADS_* keys (script lives under apps/landing)
config({ path: path.join(process.cwd(), "..", "..", ".env") });
config({ path: path.join(process.cwd(), ".env") }); // fallback if run from landing root

const DRY = process.argv.includes("--dry-run");

const CAMPAIGN_NAME = "PT — Search — Ementa QR";
const DAILY_BUDGET_EUR = 7;
const PT_GEO = "geoTargetConstants/2620";
const PT_LANG = "languageConstants/1014";

const LP_DIGITAL = "https://iq-rest.com/pt/menu-digital-restaurantes";
const LP_QR = "https://iq-rest.com/pt/qr-code-menu-restaurantes";
const LP_HOME = "https://iq-rest.com/pt";
const LP_PRECOS = "https://iq-rest.com/pt/precos";

const PATH1 = "ementa-digital";
const PATH2 = "restaurante";

// Reuse the same branded image assets other Google campaigns use (no re-upload).
// field MARKETING_IMAGE = Search image extension (square 1:1 + landscape 1.91:1),
// field BUSINESS_LOGO = logo. Asset IDs verified present in account 6803239831.
const IMG_SQUARE = "360846933084";    // iqrest_v2_square_1200x1200.jpg  (1:1)
const IMG_LANDSCAPE = "360773679043"; // iqrest_v2_landscape_1200x628.jpg (1.91:1)
const IMG_LOGO = "356984885322";      // IQ Rest Logo (white IQ + orange Rest) 400x400

// ── Types ────────────────────────────────────────────────────────────────
type Match = "EXACT" | "PHRASE" | "BROAD";
interface KW { text: string; match: Match }
interface RSA { pin1: string[]; pin2: string[]; free: string[]; descriptions: string[] }
interface Group { name: string; cpcEur: number; finalUrl: string; keywords: KW[]; ad: RSA }

// Shared free-headline + description pools (benefits) — reused across groups.
const FREE_BENEFITS = [
  "Fotos AI dos Pratos",
  "35 Idiomas com IA",
  "Sem Comissões · Sem App",
  "Aceite Pedidos e Reservas",
  "Pronto em 5 Minutos",
  "Editor Móvel · Sem App",
];
const DESCRIPTIONS = [
  "Crie a ementa digital do seu restaurante em 60 segundos. 14 dias grátis, sem cartão.",
  "Fotos AI de cada prato. Atualize preços e disponibilidade num só toque.",
  "Pedidos diretos via QR, sem comissões. Multilingue para turistas em 35 idiomas.",
  "Tudo num só: ementa, pedidos, reservas, site. Suporte em português.",
];

// ── Ad groups ─────────────────────────────────────────────────────────────
const GROUPS: Group[] = [
  {
    name: "A — Ementa/Cardapio Digital",
    cpcEur: 1.4,
    finalUrl: LP_DIGITAL,
    keywords: [
      { text: "cardapio digital", match: "EXACT" },        // ⭐⭐ paid sub
      { text: "cardapio digital", match: "PHRASE" },
      { text: "menu digital restaurante", match: "EXACT" },// ⭐⭐ paid sub
      { text: "menu digital restaurante", match: "PHRASE" },
      { text: "ementa digital", match: "PHRASE" },
      { text: "ementa digital restaurante", match: "PHRASE" },
      { text: "cardapio digital restaurante", match: "PHRASE" }, // ⭐
      { text: "carta digital restaurante", match: "PHRASE" },
      { text: "menu digital", match: "PHRASE" },
    ],
    ad: {
      pin1: ["Ementa Digital Restaurantes", "Cardápio Digital Restaurante", "Menu Digital Restaurante"],
      pin2: ["Ementa Digital desde 6,9€", "Cardápio Digital desde 6,9€", "6,9€/mês · 14 Dias Grátis"],
      free: FREE_BENEFITS,
      descriptions: DESCRIPTIONS,
    },
  },
  {
    name: "B — QR Intent",
    cpcEur: 1.4,
    finalUrl: LP_QR,
    keywords: [
      { text: "ementa qr code", match: "PHRASE" },         // ⭐
      { text: "menu qr", match: "PHRASE" },                // ⭐
      { text: "qr code menu restaurante", match: "PHRASE" },
      { text: "qr code ementa", match: "PHRASE" },
      { text: "codigo qr menu", match: "PHRASE" },
      { text: "menu qr code", match: "PHRASE" },
    ],
    ad: {
      pin1: ["Ementa Digital com QR Code", "Menu QR para Restaurantes", "QR Code para a sua Ementa"],
      pin2: ["Ementa QR desde 6,9€", "6,9€/mês · 14 Dias Grátis"],
      free: FREE_BENEFITS,
      descriptions: DESCRIPTIONS,
    },
  },
  {
    name: "D — Create Intent",
    cpcEur: 1.2,
    finalUrl: LP_DIGITAL,
    keywords: [
      { text: "criar cardapio", match: "EXACT" },          // ⭐
      { text: "criar cardapio", match: "PHRASE" },
      { text: "cardapio online restaurante", match: "PHRASE" }, // ⭐
      { text: "criar ementa", match: "PHRASE" },
      { text: "criar ementa digital", match: "PHRASE" },
      { text: "criar menu digital", match: "PHRASE" },
      { text: "como criar ementa digital", match: "PHRASE" },
    ],
    ad: {
      pin1: ["Crie a sua Ementa QR · 5min", "Criar Cardápio Online", "Crie o seu Menu Digital"],
      pin2: ["Desde 6,9€/mês", "6,9€/mês · 14 Dias Grátis"],
      free: FREE_BENEFITS,
      descriptions: DESCRIPTIONS,
    },
  },
  {
    name: "E — Verticals",
    cpcEur: 1.0,
    finalUrl: LP_HOME,
    keywords: [
      { text: "ementa bar", match: "PHRASE" },
      { text: "menu pizzaria qr", match: "PHRASE" },
      { text: "carta de vinhos digital", match: "PHRASE" },
      { text: "ementa multilingue", match: "PHRASE" },
    ],
    ad: {
      pin1: ["Ementa Digital para Bar", "Menu QR Pizzaria", "Carta de Vinhos Digital"],
      pin2: ["Desde 6,9€/mês", "6,9€/mês · 14 Dias Grátis"],
      free: FREE_BENEFITS,
      descriptions: DESCRIPTIONS,
    },
  },
];

// Curated from the account's 1195 historical negatives across all past
// campaigns (PT/ES/IT/DE/FR/PL/EN). Only intent-safe terms kept: NOTHING here
// shares a token with our keywords (menu/ementa/cardapio/carta/digital/qr/code/
// criar/restaurante/online/bar/pizzaria/vinhos/reservas/pedidos/fazer/sistema),
// so none of these can block a real digital-menu / QR / create query.
// PHRASE match. ~230 terms.
const NEGATIVES = [
  // ── Free-seekers (PT + multilingual) ──
  "gratis", "grátis", "gratuito", "gratuita", "gratuitos", "gratuitamente", "free",
  "gratuit", "gratuite", "kostenlos", "kostenlose", "darmowe", "za darmo",
  "besplatno", "bedava", "ücretsiz", "parasız", "umsonst", "sem custos",
  "senza costi", "0 euro", "ohne anmeldung",
  // ── Templates / examples / editables ──
  "modelo", "modelos", "modello", "modelli", "template", "templates", "plantilla",
  "plantillas", "exemplo", "exemplos", "esempio", "esempi", "ejemplo", "ejemplos",
  "exemple", "beispiel", "muster", "vorlage", "vorlagen", "szablon", "szablony",
  "wzór", "fac simile", "da compilare", "sample", "samples", "formato", "formatos",
  "para editar", "para preencher", "editavel", "editável",
  // ── File formats / tools to make one yourself ──
  "pdf", "word", "excel", "powerpoint", "psd", "canva",
  // ── Print / physical menu (paper, holders, signage) ──
  "imprimir", "imprimível", "imprimer", "stampare", "stampabile", "drucken",
  "druck", "druckvorlage", "ausdrucken", "autocolante", "autocolantes", "adesivo",
  "placa", "cavalete", "expositor", "plastificado", "laminowanie", "acrílico",
  "cartaz", "porta menu", "papel", "gráfica", "vistaprint", "flyer", "ulotki",
  "wydruk", "naklejki",
  // ── QR generators / scanners / readers (consumer & DIY) ──
  "gerador", "generator", "generatore", "qr generator", "qrcode generator",
  "free generator", "scanner", "qr scanner", "qr code scanner", "scanner qr",
  "leitor", "ler qr", "ler menu", "ler o menu", "ler código qr", "leer qr",
  "escaner", "escáner", "escaner qr", "leggere menu", "leggi menu", "lire qr",
  "scanneur", "qr lesen", "qr code lesen", "okuma", "okutma", "como digitalizar",
  // ── Info / meaning / how-it-works / research ──
  "significado", "o que é", "o que significa", "como funciona", "meaning",
  "what is", "definition", "wikipedia", "quora", "reddit", "blog", "forum",
  // ── Consumer "view a restaurant's menu" / local diner search ──
  "consultar menu", "ver menu", "ver o menu", "ver ementa", "ver carta",
  "visualizar menu", "voir menu", "ver el menu", "perto de mim", "restaurantes perto",
  "cerca de mi", "vicino a me", "in der nähe",
  // ── Delivery / ordering aggregators (consumer + competitor) ──
  "delivery", "domicílio", "entrega", "takeaway", "take away", "asporto",
  "livraison", "dowóz", "glovo", "uber eats", "ubereats", "deliveroo", "just eat",
  "doordash", "grubhub", "lieferando", "wolt", "bolt food", "ifood", "the fork",
  "thefork", "quandoo", "tripadvisor", "yelp",
  // ── Competitor menu-SaaS brand names ──
  "menutech", "menubly", "flipdish", "olaclick", "ola click", "holaclick",
  "goomer", "anota ai", "tucartaonline", "menudigitale", "leggimenu", "smartmenu",
  "agorapos", "foodyt", "waitry", "qodeup", "zmenu", "menumaker", "menupix",
  "menupages", "mydigimenu", "qrcarta", "quickqr", "scanmi", "dishcovery",
  "covermanager", "octotable", "storyous",
  // ── Jobs / HR / careers ──
  "emprego", "empregos", "vagas", "trabalho", "salário", "ordenado", "carreira",
  "career", "careers", "cv", "job", "jobs", "hiring", "recrutamento", "currículo",
  "lavoro", "stipendio",
  // ── Education / courses ──
  "curso", "cursos", "escola", "universidade", "tutorial", "tutoriais", "course",
  "training", "students",
  // ── POS / cash register / other restaurant software ──
  "caixa", "caixa registadora", "caixa registradora", "registratore di cassa",
  "kasa fiskalna", "cash register", "pos system", "pos software", "tpv",
  "punto de venta", "erp", "kassensystem", "facturação", "faturação", "gestionale",
  "terminal",
  // ── Dev / design tools (DIY builders) ──
  "html", "css", "javascript", "python", "wordpress", "wix", "shopify",
  "squarespace", "figma", "photoshop", "illustrator", "indesign", "adobe",
  "github", "npm", "api", "developer", "coding", "mockup", "clipart", "icon",
  "icons", "vector", "logo", "logotipo", "webdesign",
  // ── Food chains (consumer looking up their menu) ──
  "mcdonald", "mcdonalds", "mcdo", "burger king", "kfc", "starbucks", "subway",
  "dominos", "telepizza", "vapiano", "roadhouse",
  // ── Recipes / cooking / food ──
  "receita", "receitas", "receta", "recipe", "recipes", "cozinhar", "cocinar",
  "comer", "comida", "mangiare", "jedzenie", "almoçar", "jantar",
  // ── Junk / entertainment / piracy ──
  "porn", "nude", "netflix", "youtube", "tiktok", "instagram", "facebook",
  "imdb", "crack", "hack", "torrent", "wifi",
];

// Only real targets: #features/#faq exist on the home template; #how does NOT
// (the Italy script had a broken #how). "Como Funciona" → the QR feature page,
// "Preços" → the dedicated /pt/precos page.
const SITELINKS = [
  { text: "Funcionalidades", desc1: "Tudo o que precisa", desc2: "numa só plataforma", url: `${LP_HOME}#features` },
  { text: "Como Funciona", desc1: "Ementa QR em 5 minutos", desc2: "passo a passo", url: LP_QR },
  { text: "Preços", desc1: "Planos transparentes", desc2: "14 dias grátis", url: LP_PRECOS },
  { text: "Perguntas Frequentes", desc1: "Todas as respostas", desc2: "que procura", url: `${LP_HOME}#faq` },
];

const CALLOUTS = [
  "Pronto em 60 segundos",
  "14 dias grátis",
  "Sem cartão de crédito",
  "Suporte em português",
  "35 idiomas com IA",
  "Fotos AI dos pratos",
  "Sem comissões",
  "Tudo no telemóvel",
];

// ── Helpers ────────────────────────────────────────────────────────────────
const log = (s: string) => console.log(s);
const dryRun = (label: string, payload: any) => { if (DRY) log(`[DRY] ${label}: ${JSON.stringify(payload).slice(0, 240)}`); };
const cap30 = (s: string) => s.slice(0, 30);
const cap90 = (s: string) => s.slice(0, 90);

function buildHeadlines(ad: RSA) {
  const H1 = enums.ServedAssetFieldType.HEADLINE_1;
  const H2 = enums.ServedAssetFieldType.HEADLINE_2;
  const hs = [
    ...ad.pin1.map((t) => ({ text: cap30(t), pinned_field: H1 })),
    ...ad.pin2.map((t) => ({ text: cap30(t), pinned_field: H2 })),
    ...ad.free.map((t) => ({ text: cap30(t) })),
  ];
  return hs.slice(0, 15);
}

// ── Main ────────────────────────────────────────────────────────────────────
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

  // Pre-flight: duplicate guard
  log("Pre-flight: checking for existing campaign with same name...");
  const existing = await customer.query(
    `SELECT campaign.id, campaign.name FROM campaign WHERE campaign.name = '${CAMPAIGN_NAME.replace(/'/g, "\\'")}'`,
  );
  if (existing.length > 0) {
    log(`ABORT — campaign "${CAMPAIGN_NAME}" already exists (id=${(existing[0] as any).campaign.id})`);
    process.exit(1);
  }

  // 1. Budget
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

  // 2. Campaign
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

  // 3. Campaign criteria — geo, language, negatives
  log(`\n[3] geo Portugal + lang Portuguese + ${NEGATIVES.length} negatives...`);
  const critOps: any[] = [
    { campaign: campaignResource, location: { geo_target_constant: PT_GEO } },
    { campaign: campaignResource, language: { language_constant: PT_LANG } },
  ];
  for (const neg of NEGATIVES)
    critOps.push({ campaign: campaignResource, negative: true, keyword: { text: neg, match_type: enums.KeywordMatchType.PHRASE } });
  if (!DRY) { await customer.campaignCriteria.create(critOps); log(`  ${critOps.length} criteria added`); }
  else dryRun("criteria", { count: critOps.length });

  // 4. Ad groups + keywords + 1 pinned RSA each
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
    else {
      log(`  RSA headlines:`);
      for (const h of headlines) log(`    ${(h as any).pinned_field ? "PIN:" + (h as any).pinned_field : "(free)"} | "${h.text}"`);
    }
  }

  // 5. Sitelinks + callouts
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

  // 6. Image extensions + logo — reuse existing branded assets
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
