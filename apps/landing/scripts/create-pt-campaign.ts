// Create PT Search campaign — clone of ES (24034810450) structure.
// Same budget (5€/day, Manual CPC), 1 ad group, phrase keywords in PT,
// PT-only negatives (Portuguese generics + brand exclusions), 1 RSA.
// Ad schedule 06:00–24:00 all 7 days on BOTH the new PT campaign AND ES.
// Everything created ENABLED (goes live immediately).

import { GoogleAdsApi, enums } from "google-ads-api";
import { config } from "dotenv";
import * as path from "path";

config({ path: path.join(process.cwd(), ".env") });

const CID = "6803239831";
const ES_CAMPAIGN = "24034810450";

const DAYS = [
  enums.DayOfWeek.MONDAY,
  enums.DayOfWeek.TUESDAY,
  enums.DayOfWeek.WEDNESDAY,
  enums.DayOfWeek.THURSDAY,
  enums.DayOfWeek.FRIDAY,
  enums.DayOfWeek.SATURDAY,
  enums.DayOfWeek.SUNDAY,
];

// PT phrase keywords (menu digital + ementa digital roots)
const KEYWORDS = [
  "menu digital",
  "menu digital para restaurantes",
  "menu digital restaurante",
  "ementa digital",
  "ementa digital para restaurantes",
  "ementa digital restaurante",
  "ementa digital restaurantes",
];

// PT negatives: Portuguese generic intents (with accents) + brand/software exclusions
const NEGATIVES = [
  // free / cheap intent
  "grátis", "gratis", "grátis online", "gratuito", "gratuita", "de graça",
  "sem custos", "barato",
  // template / example / print
  "exemplo", "exemplos", "modelo", "modelos", "template", "templates",
  "imprimir", "impressão", "imprimível", "ementa para imprimir", "ementa exemplo",
  // how-to / meaning / read
  "como funciona", "como fazer", "o que é", "significado", "como ler",
  "como digitalizar", "ler qr", "ler menu", "ver menu", "leitor qr", "leitor de qr",
  // jobs
  "emprego", "empregos", "vagas", "salário", "carreira", "currículo",
  "curriculo", "estágio",
  // food / delivery / eat out
  "comida", "comer", "ao domicílio", "entrega", "takeaway", "take away",
  "restaurante perto", "restaurante barato", "perto de mim", "onde comer",
  "melhores restaurantes",
  // courses / tutorials
  "curso", "cursos", "aula", "aulas", "tutorial", "tutoriais",
  // meals
  "almoço", "jantar", "pequeno-almoço",
  // recipe / cook
  "receita", "receitas", "cozinhar",
  // pos / cash
  "caixa registadora", "talão", "recibo", "lista de preços",
  // generic web junk
  "forum", "fórum", "blog", "wikipedia", "quora", "reddit", "youtube",
  // software / design tools
  "pdf", "excel", "word", "powerpoint", "canva", "figma", "photoshop",
  "illustrator", "indesign", "psd", "html", "css", "javascript", "python",
  "logo", "mockup", "generator", "crack", "hack", "torrent",
  // website builders / other saas
  "wordpress", "wix", "squarespace", "shopify", "vistaprint",
  // qr generic
  "qr generator", "qrcode generator",
  // food-delivery / booking platforms (brand exclusions)
  "uber eats", "ubereats", "glovo", "just eat", "deliveroo", "delivery",
  "the fork", "thefork", "tripadvisor", "quandoo", "covermanager",
  // fast-food brands
  "mcdonalds", "mcdonald", "burger king", "kfc",
  // competitor digital-menu products
  "menu tiger", "menutech", "menuu", "menubly", "mydigimenu", "olaclick",
  "qodeup", "qromo", "quickqr", "smartmenu", "scanmi", "flipdish", "tablecheck",
  // off-topic
  "facebook", "instagram", "tiktok", "imdb", "netflix", "wifi", "api",
  "pos", "nude", "porn",
];

const HEADLINES: { text: string; pin?: number }[] = [
  { text: "Menu Digital Restaurante", pin: enums.ServedAssetFieldType.HEADLINE_1 },
  { text: "Ementa Digital Restaurante", pin: enums.ServedAssetFieldType.HEADLINE_1 },
  { text: "Ementa Digital para Bares", pin: enums.ServedAssetFieldType.HEADLINE_1 },
  { text: "Menu Digital por 6,90€", pin: enums.ServedAssetFieldType.HEADLINE_2 },
  { text: "Desde 6,90€/mês · 14 Dias", pin: enums.ServedAssetFieldType.HEADLINE_2 },
  { text: "6,90€/mês · Teste 14 Dias", pin: enums.ServedAssetFieldType.HEADLINE_2 },
  { text: "Fotos IA dos Pratos" },
  { text: "35 Idiomas com IA" },
  { text: "Sem Comissões" },
  { text: "Aceita Pedidos e Reservas" },
  { text: "Pronto em 5 Minutos" },
  { text: "Editor pelo Telemóvel" },
];

const DESCRIPTIONS = [
  "Cria a ementa digital do teu restaurante em 60 segundos. 14 dias grátis, sem cartão.",
  "Fotos IA de cada prato. Atualiza preços e disponibilidade num toque.",
  "Pedidos diretos por QR, sem comissões. Multilingue para turistas em 35 idiomas.",
  "Tudo num só: menu, pedidos, reservas, site. Suporte em português.",
];

function today(): string {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}`;
}

async function main() {
  const client = new GoogleAdsApi({
    client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
    client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
    developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
  });
  const customer = client.Customer({
    customer_id: CID,
    login_customer_id: process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID,
    refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
  });

  const schedule = (campaign: string) =>
    DAYS.map((day_of_week) => ({
      campaign,
      ad_schedule: {
        day_of_week,
        start_hour: 6,
        start_minute: enums.MinuteOfHour.ZERO,
        end_hour: 24,
        end_minute: enums.MinuteOfHour.ZERO,
      },
    }));

  // 1. Budget (reuse if already created on a prior failed run)
  const REUSE_BUDGET = process.env.REUSE_BUDGET;
  let budget: string;
  if (REUSE_BUDGET) {
    budget = REUSE_BUDGET;
  } else {
    const budgetRes = await customer.campaignBudgets.create([
      {
        name: `PT budget ${today()}`,
        amount_micros: 5_000_000,
        delivery_method: enums.BudgetDeliveryMethod.STANDARD,
        explicitly_shared: false,
      },
    ]);
    budget = budgetRes.results[0].resource_name!;
  }
  console.log("budget:", budget);

  // 2. Campaign (Search, Manual CPC, ENABLED)
  const campRes = await customer.campaigns.create([
    {
      name: "PT",
      advertising_channel_type: enums.AdvertisingChannelType.SEARCH,
      status: enums.CampaignStatus.ENABLED,
      manual_cpc: { enhanced_cpc_enabled: false },
      campaign_budget: budget,
      start_date: today(),
      contains_eu_political_advertising:
        enums.EuPoliticalAdvertisingStatus
          .DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING,
      network_settings: {
        target_google_search: true,
        target_search_network: false,
        target_content_network: false,
        target_partner_search_network: false,
      },
    },
  ]);
  const campaign = campRes.results[0].resource_name!;
  const campaignId = campaign.split("/").pop();
  console.log("campaign:", campaign, "id:", campaignId);

  // 3. Ad schedule on PT campaign
  const schedPt = await customer.campaignCriteria.create(schedule(campaign));
  console.log("PT ad schedule criteria:", schedPt.results.length);

  // 4. Negatives on PT campaign (phrase)
  const negRes = await customer.campaignCriteria.create(
    NEGATIVES.map((text) => ({
      campaign,
      negative: true,
      keyword: { text, match_type: enums.KeywordMatchType.PHRASE },
    })),
  );
  console.log("PT negatives:", negRes.results.length);

  // 5. Ad group
  const agRes = await customer.adGroups.create([
    {
      name: "Ementa Digital",
      campaign,
      status: enums.AdGroupStatus.ENABLED,
      type: enums.AdGroupType.SEARCH_STANDARD,
      cpc_bid_micros: 1_600_000,
    },
  ]);
  const adGroup = agRes.results[0].resource_name!;
  console.log("ad group:", adGroup);

  // 6. Keywords (phrase)
  const kwRes = await customer.adGroupCriteria.create(
    KEYWORDS.map((text) => ({
      ad_group: adGroup,
      status: enums.AdGroupCriterionStatus.ENABLED,
      keyword: { text, match_type: enums.KeywordMatchType.PHRASE },
    })),
  );
  console.log("keywords:", kwRes.results.length);

  // 7. RSA
  const adRes = await customer.adGroupAds.create([
    {
      ad_group: adGroup,
      status: enums.AdGroupAdStatus.ENABLED,
      ad: {
        final_urls: ["https://iq-rest.com/pt/menu-digital-restaurantes"],
        responsive_search_ad: {
          path1: "ementa-digital",
          path2: "restaurante",
          headlines: HEADLINES.map((h) => ({
            text: h.text,
            ...(h.pin ? { pinned_field: h.pin } : {}),
          })),
          descriptions: DESCRIPTIONS.map((text) => ({ text })),
        },
      },
    },
  ]);
  console.log("ad:", adRes.results[0].resource_name);

  // 8. Ad schedule on ES campaign too
  const schedEs = await customer.campaignCriteria.create(
    schedule(`customers/${CID}/campaigns/${ES_CAMPAIGN}`),
  );
  console.log("ES ad schedule criteria:", schedEs.results.length);

  console.log("\nDONE. PT campaign id:", campaignId);
}

main().catch((e) => {
  console.error("FAILED:", JSON.stringify(e?.errors ?? e, null, 2));
  process.exit(1);
});
