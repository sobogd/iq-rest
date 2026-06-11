// Clone an existing Search campaign 1:1 into a new PAUSED campaign.
// Reads source criteria/ad/keywords LIVE and recreates them so nothing is
// lost in transcription. New campaign = PAUSED; ad group / ad / keywords = ENABLED.
//
// Usage:
//   npx tsx scripts/clone-campaign.ts            (dry run — prints what it will create)
//   npx tsx scripts/clone-campaign.ts --apply    (actually creates)

import { GoogleAdsApi, enums } from "google-ads-api";
import { config } from "dotenv";
config();

const SRC = "23583300840";          // source campaign "English"
const NEW_NAME = "English";          // requested name (duplicate is OK)
const FINAL_URL = "https://iq-rest.com/d";
const APPLY = process.argv.includes("--apply");

const MATCH: Record<number, string> = { 2: "EXACT", 3: "PHRASE", 4: "BROAD" };

async function main() {
  const c = new GoogleAdsApi({
    client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
    client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
    developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
  });
  const cust = c.Customer({
    customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID!,
    login_customer_id: process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID,
    refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
  });

  // ---- READ SOURCE ----
  const locs = await cust.query(`
    SELECT campaign_criterion.location.geo_target_constant, campaign_criterion.negative
    FROM campaign_criterion WHERE campaign.id = ${SRC} AND campaign_criterion.type = 'LOCATION'`);
  const langs = await cust.query(`
    SELECT campaign_criterion.language.language_constant
    FROM campaign_criterion WHERE campaign.id = ${SRC} AND campaign_criterion.type = 'LANGUAGE'`);
  const devs = await cust.query(`
    SELECT campaign_criterion.device.type, campaign_criterion.bid_modifier
    FROM campaign_criterion WHERE campaign.id = ${SRC} AND campaign_criterion.type = 'DEVICE'`);
  const cnegs = await cust.query(`
    SELECT campaign_criterion.keyword.text, campaign_criterion.keyword.match_type
    FROM campaign_criterion WHERE campaign.id = ${SRC} AND campaign_criterion.type = 'KEYWORD' AND campaign_criterion.negative = true`);
  const kws = await cust.query(`
    SELECT ad_group_criterion.keyword.text, ad_group_criterion.keyword.match_type, ad_group_criterion.cpc_bid_micros
    FROM ad_group_criterion WHERE campaign.id = ${SRC} AND ad_group_criterion.type = 'KEYWORD'
      AND ad_group_criterion.negative = false AND ad_group_criterion.status = 'ENABLED'`);

  const headlines = ["All-in-One QR Menu & Website", "Online Booking & Easy Orders", "Smart AI & Custom Branding"];
  const descriptions = [
    "24/7 Table booking & QR menu. No apps needed. Manage everything from your phone.",
    "AI translates menu into 35 languages. Custom colors & dark theme for your brand.",
  ];

  console.log(`\n=== CLONE PLAN (source ${SRC}) ===`);
  console.log(`new campaign name: "${NEW_NAME}"  status: PAUSED`);
  console.log(`budget: EUR 6.00/day, standard, not shared`);
  console.log(`bidding: MANUAL_CPC, enhanced OFF`);
  console.log(`network: Google Search only`);
  console.log(`locations: ${locs.length} (neg: ${locs.filter((r:any)=>r.campaign_criterion.negative).length})`);
  console.log(`languages: ${langs.length}`);
  console.log(`device criteria: ${devs.length} (${devs.map((r:any)=>`type${r.campaign_criterion.device?.type}:mod${r.campaign_criterion.bid_modifier}`).join(", ")})`);
  console.log(`campaign negative keywords: ${cnegs.length}`);
  console.log(`ad group: "English" ENABLED, cpc_bid EUR 1.00`);
  console.log(`ad: RSA ENABLED, final_url ${FINAL_URL}, path /qr-code/menu, ${headlines.length} headlines, ${descriptions.length} desc`);
  console.log(`keywords (ENABLED): ${kws.length} → ${kws.map((r:any)=>`"${r.ad_group_criterion.keyword.text}"[${MATCH[r.ad_group_criterion.keyword.match_type]}]`).join(", ")}`);

  if (!APPLY) { console.log("\n(dry run — pass --apply to create)\n"); return; }

  // ---- CREATE BUDGET (or reuse one from a previous partial run) ----
  let budgetRes: string;
  if (process.env.REUSE_BUDGET) {
    budgetRes = process.env.REUSE_BUDGET;
    console.log(`budget reused: ${budgetRes}`);
  } else {
    const bud = await cust.campaignBudgets.create([{
      name: `English clone ${Date.now()}`,
      amount_micros: 6_000_000,
      delivery_method: enums.BudgetDeliveryMethod.STANDARD,
      explicitly_shared: false,
    }]);
    budgetRes = bud.results![0].resource_name!;
    console.log(`budget created: ${budgetRes}`);
  }

  // ---- CREATE CAMPAIGN ----
  const camp = await cust.campaigns.create([{
    name: NEW_NAME,
    status: enums.CampaignStatus.PAUSED,
    advertising_channel_type: enums.AdvertisingChannelType.SEARCH,
    manual_cpc: { enhanced_cpc_enabled: false },
    campaign_budget: budgetRes,
    contains_eu_political_advertising:
      enums.CampaignContainsEuPoliticalAdvertising?.DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING ?? 3,
    network_settings: {
      target_google_search: true,
      target_search_network: false,
      target_content_network: false,
      target_partner_search_network: false,
    },
  }]);
  const campRes = camp.results![0].resource_name!;
  console.log(`campaign created: ${campRes}`);

  // ---- CAMPAIGN CRITERIA (locations, languages, device, negatives) ----
  const critOps: any[] = [];
  for (const r of locs as any[]) critOps.push({
    campaign: campRes, negative: !!r.campaign_criterion.negative,
    location: { geo_target_constant: r.campaign_criterion.location.geo_target_constant },
  });
  for (const r of langs as any[]) critOps.push({
    campaign: campRes,
    language: { language_constant: r.campaign_criterion.language.language_constant },
  });
  for (const r of devs as any[]) critOps.push({
    campaign: campRes,
    device: { type: r.campaign_criterion.device.type },
    bid_modifier: r.campaign_criterion.bid_modifier ?? undefined,
  });
  for (const r of cnegs as any[]) critOps.push({
    campaign: campRes, negative: true,
    keyword: { text: r.campaign_criterion.keyword.text, match_type: r.campaign_criterion.keyword.match_type },
  });
  // batch to be safe
  for (let i = 0; i < critOps.length; i += 1000) {
    await cust.campaignCriteria.create(critOps.slice(i, i + 1000));
  }
  console.log(`campaign criteria created: ${critOps.length}`);

  // ---- AD GROUP ----
  const ag = await cust.adGroups.create([{
    name: "English",
    campaign: campRes,
    status: enums.AdGroupStatus.ENABLED,
    type: enums.AdGroupType.SEARCH_STANDARD,
    cpc_bid_micros: 1_000_000,
  }]);
  const agRes = ag.results![0].resource_name!;
  console.log(`ad group created: ${agRes}`);

  // ---- RSA ----
  await cust.adGroupAds.create([{
    ad_group: agRes,
    status: enums.AdGroupAdStatus.ENABLED,
    ad: {
      final_urls: [FINAL_URL],
      responsive_search_ad: {
        headlines: headlines.map((t) => ({ text: t })),
        descriptions: descriptions.map((t) => ({ text: t })),
        path1: "qr-code",
        path2: "menu",
      },
    },
  }]);
  console.log(`RSA created`);

  // ---- KEYWORDS ----
  const kwOps = (kws as any[]).map((r) => ({
    ad_group: agRes,
    status: enums.AdGroupCriterionStatus.ENABLED,
    keyword: { text: r.ad_group_criterion.keyword.text, match_type: r.ad_group_criterion.keyword.match_type },
  }));
  await cust.adGroupCriteria.create(kwOps);
  console.log(`keywords created: ${kwOps.length}`);

  console.log(`\nDONE. New campaign ${campRes} (PAUSED).`);
}

main().catch((e) => { console.error(JSON.stringify(e, null, 2)); process.exit(1); });
