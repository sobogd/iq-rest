// Creates a "QR Code" ad group in each of the 3 live SEARCH campaigns
// (IT/ES/PT on customer 6803239831) to target the QR-code-menu phrase
// landings (companion to the May-2026 digital-menu ad groups).
//
// Each ad group gets:
//   - 1 broad-match keyword (the campaign's target QR-code phrase)
//   - 1 RSA mirroring the sibling Digital ad: 3 headlines pinned to slots
//     1/2/3, but the first headline + both descriptions + final URL +
//     display paths are swapped to the new QR-code landing.
//
// Pre-flight: aborts if a "QR Code" ad group already exists in any of the
// target campaigns (re-runs would duplicate).
//
// Usage:
//   npx tsx scripts/create-qr-ad-groups.ts             — LIVE
//   npx tsx scripts/create-qr-ad-groups.ts --dry-run   — log only

import { GoogleAdsApi, enums } from "google-ads-api";
import { config } from "dotenv";
import * as path from "path";

config({ path: path.join(process.cwd(), ".env") });

const DRY = process.argv.includes("--dry-run");

const AD_GROUP_NAME = "QR Code";

interface GroupSpec {
  locale: "it" | "es" | "pt";
  campaignId: string;
  cpcEur: number;
  keyword: string;
  finalUrl: string;
  path1: string;
  path2: string;
  headlines: { text: string; pin: 1 | 2 | 3 }[];
  descriptions: string[];
}

const GROUPS: GroupSpec[] = [
  {
    locale: "it",
    campaignId: "23815769905",
    cpcEur: 3.0,
    keyword: "menu qr code",
    finalUrl: "https://iq-rest.com/it/menu-qr-code-ristoranti",
    path1: "menu-qr-code",
    path2: "ristoranti",
    headlines: [
      { text: "Menù QR Code Per Ristoranti", pin: 1 },
      { text: "Da 6,90€ Al Mese", pin: 2 },
      { text: "14 Giorni Gratis", pin: 3 },
    ],
    descriptions: [
      "Menù QR code per il tuo ristorante. Gli ospiti scansionano e ordinano nella loro lingua.",
      "Codice QR sul tavolo, menu nel browser. Aggiornamenti in tempo reale, niente app.",
    ],
  },
  {
    locale: "es",
    campaignId: "23816420290",
    cpcEur: 2.37,
    keyword: "codigo qr restaurante",
    finalUrl: "https://iq-rest.com/es/codigo-qr-restaurante",
    path1: "codigo-qr",
    path2: "restaurante",
    headlines: [
      { text: "Código QR Para Restaurantes", pin: 1 },
      { text: "Desde 6,90€/Mes", pin: 2 },
      { text: "14 Días Gratis", pin: 3 },
    ],
    descriptions: [
      "Código QR en la mesa, carta en el móvil. Pedidos, alérgenos y multi-idioma incluidos.",
      "Actualiza la carta al instante desde el móvil. Sin app, sin reimprimir.",
    ],
  },
  {
    locale: "pt",
    campaignId: "23869785814",
    cpcEur: 2.1,
    keyword: "qr code menu",
    finalUrl: "https://iq-rest.com/pt/qr-code-menu-restaurantes",
    path1: "qr-code-menu",
    path2: "restaurantes",
    headlines: [
      { text: "QR Code Menu Para Restaurantes", pin: 1 },
      { text: "Desde 6,90€/Mês", pin: 2 },
      { text: "14 Dias Grátis", pin: 3 },
    ],
    descriptions: [
      "QR code menu para o teu restaurante. Os clientes leem o QR e veem a carta na sua língua.",
      "Atualizações em tempo real, sem app, sem reimprimir. Alergénios e multi-idioma incluídos.",
    ],
  },
];

const CUSTOMER_ID = process.env.GOOGLE_ADS_CUSTOMER_ID!;

function log(s: string) {
  console.log(s);
}

function pinEnum(slot: 1 | 2 | 3) {
  return slot === 1
    ? enums.ServedAssetFieldType.HEADLINE_1
    : slot === 2
    ? enums.ServedAssetFieldType.HEADLINE_2
    : enums.ServedAssetFieldType.HEADLINE_3;
}

function lengthCheck(g: GroupSpec): string[] {
  const errs: string[] = [];
  g.headlines.forEach((h, i) => {
    if (h.text.length > 30) errs.push(`${g.locale} H${i + 1} "${h.text}" = ${h.text.length} > 30`);
  });
  g.descriptions.forEach((d, i) => {
    if (d.length > 90) errs.push(`${g.locale} D${i + 1} "${d}" = ${d.length} > 90`);
  });
  if (g.path1.length > 15) errs.push(`${g.locale} path1 "${g.path1}" = ${g.path1.length} > 15`);
  if (g.path2.length > 15) errs.push(`${g.locale} path2 "${g.path2}" = ${g.path2.length} > 15`);
  return errs;
}

async function main() {
  const client = new GoogleAdsApi({
    client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
    client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
    developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
  });

  const customer = client.Customer({
    customer_id: CUSTOMER_ID,
    login_customer_id: process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID,
    refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
  });

  log(`\n${DRY ? "DRY-RUN — no mutations" : "LIVE — will create ad groups + keywords + RSAs"}`);
  log(`Customer: ${CUSTOMER_ID}\n`);

  // Length pre-flight before doing anything irreversible.
  const allErrs = GROUPS.flatMap(lengthCheck);
  if (allErrs.length) {
    log("ABORT — content length violations:");
    allErrs.forEach((e) => log(`  - ${e}`));
    process.exit(1);
  }
  log("✓ All headlines/descriptions/paths within limits.\n");

  // Pre-flight: ensure no "QR Code" ad group already exists in the 3 campaigns.
  log("Pre-flight: checking for existing QR Code ad groups...");
  const campaignIds = GROUPS.map((g) => g.campaignId).join(",");
  const existing = await customer.query(
    `SELECT ad_group.id, ad_group.name, campaign.id FROM ad_group WHERE campaign.id IN (${campaignIds}) AND ad_group.name = '${AD_GROUP_NAME}'`,
  );
  if (existing.length > 0) {
    log(`ABORT — ${existing.length} existing ad group(s) named "${AD_GROUP_NAME}":`);
    existing.forEach((row: any) =>
      log(`  - campaign ${row.campaign.id}, ad_group ${row.ad_group.id}`),
    );
    log("Rename or delete them in the UI, or change AD_GROUP_NAME constant.");
    process.exit(1);
  }
  log("✓ No conflicting ad groups.\n");

  for (const g of GROUPS) {
    log(`── ${g.locale.toUpperCase()} (campaign ${g.campaignId}) ──`);
    const campaignResource = `customers/${CUSTOMER_ID}/campaigns/${g.campaignId}`;

    // 1) Ad group
    let adGroupResource: string;
    if (DRY) {
      adGroupResource = `customers/${CUSTOMER_ID}/adGroups/dry-${g.locale}`;
      log(`  [DRY] ad_group create: name="${AD_GROUP_NAME}" cpc=€${g.cpcEur}`);
    } else {
      const r = await customer.adGroups.create([
        {
          campaign: campaignResource,
          name: AD_GROUP_NAME,
          status: enums.AdGroupStatus.ENABLED,
          type: enums.AdGroupType.SEARCH_STANDARD,
          cpc_bid_micros: Math.round(g.cpcEur * 1_000_000),
        },
      ]);
      adGroupResource = r.results[0].resource_name;
      log(`  ✓ ad_group: ${adGroupResource}`);
    }

    // 2) Single broad-match keyword
    if (DRY) {
      log(`  [DRY] keyword: "${g.keyword}" BROAD cpc=€${g.cpcEur}`);
    } else {
      await customer.adGroupCriteria.create([
        {
          ad_group: adGroupResource,
          status: enums.AdGroupCriterionStatus.ENABLED,
          keyword: {
            text: g.keyword,
            match_type: enums.KeywordMatchType.BROAD,
          },
          cpc_bid_micros: Math.round(g.cpcEur * 1_000_000),
        },
      ]);
      log(`  ✓ keyword: "${g.keyword}" BROAD`);
    }

    // 3) RSA — 3 pinned headlines + 2 descriptions
    const adPayload = {
      ad_group: adGroupResource,
      status: enums.AdGroupAdStatus.ENABLED,
      ad: {
        final_urls: [g.finalUrl],
        responsive_search_ad: {
          headlines: g.headlines.map((h) => ({
            text: h.text,
            pinned_field: pinEnum(h.pin),
          })),
          descriptions: g.descriptions.map((d) => ({ text: d })),
          path1: g.path1,
          path2: g.path2,
        },
      },
    };
    if (DRY) {
      log(`  [DRY] RSA: H1(pin1)="${g.headlines[0].text}"`);
      log(`        H2(pin2)="${g.headlines[1].text}"`);
      log(`        H3(pin3)="${g.headlines[2].text}"`);
      g.descriptions.forEach((d, i) => log(`        D${i + 1}="${d}"`));
      log(`        url=${g.finalUrl}`);
      log(`        path=/${g.path1}/${g.path2}`);
    } else {
      const r = await customer.adGroupAds.create([adPayload]);
      log(`  ✓ RSA: ${r.results[0].resource_name}`);
    }

    log("");
  }

  log(`✓ Done. ${DRY ? "(dry-run — no mutations)" : `Created ${GROUPS.length} ad groups + ${GROUPS.length} keywords + ${GROUPS.length} RSAs.`}`);
  log(`  Manage in Google Ads UI: https://ads.google.com/aw/campaigns?ocid=${CUSTOMER_ID}`);
}

main().catch((e) => {
  console.error("\nFAILED:", e);
  if (e?.errors) console.error("Errors:", JSON.stringify(e.errors, null, 2));
  process.exit(1);
});
