// Deep dump of ONE campaign: settings, targeting, ads, keywords, negatives,
// plus per-date segments. Settings/criteria are CURRENT values (change_event
// only reaches 30 days back); metrics are exact for the given date.
//
// Usage:
//   npx tsx scripts/deep-campaign.ts 23583300840 2026-04-20

import { GoogleAdsApi } from "google-ads-api";
import { config } from "dotenv";
config();

const CID = process.argv[2];
const DATE = process.argv[3];
if (!CID || !DATE) {
  console.error("Usage: npx tsx scripts/deep-campaign.ts <campaignId> <YYYY-MM-DD>");
  process.exit(1);
}

const micros = (n: unknown) => Number(n ?? 0) / 1_000_000;
const fmt = (n: unknown) => `€${micros(n).toFixed(2)}`;
const pct = (n: unknown) => `${(Number(n ?? 0) * 100).toFixed(1)}%`;
const MATCH: Record<number, string> = { 0: "?", 1: "?", 2: "EXACT", 3: "PHRASE", 4: "BROAD" };
const STAT: Record<number, string> = { 0: "?", 1: "?", 2: "ENABLED", 3: "PAUSED", 4: "REMOVED" };
const DEV: Record<number, string> = { 0: "?", 1: "?", 2: "MOBILE", 3: "TABLET", 4: "DESKTOP", 5: "CONNECTED_TV", 6: "OTHER" };

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
  const W = `campaign.id = ${CID}`;

  console.log(`\n##### CAMPAIGN ${CID} — deep dump (settings CURRENT, metrics for ${DATE}) #####`);

  // ---------- CAMPAIGN SETTINGS ----------
  console.log("\n===== CAMPAIGN SETTINGS =====");
  const cs = await cust.query(`
    SELECT campaign.id, campaign.name, campaign.status,
           campaign.advertising_channel_type, campaign.advertising_channel_sub_type,
           campaign.bidding_strategy_type, campaign.bidding_strategy,
           campaign.manual_cpc.enhanced_cpc_enabled,
           campaign.maximize_conversions.target_cpa_micros,
           campaign.network_settings.target_google_search,
           campaign.network_settings.target_search_network,
           campaign.network_settings.target_content_network,
           campaign.network_settings.target_partner_search_network,
           campaign_budget.id, campaign_budget.name, campaign_budget.amount_micros,
           campaign_budget.explicitly_shared, campaign_budget.delivery_method
    FROM campaign WHERE ${W}
  `);
  for (const r of cs) {
    const c2: any = r.campaign ?? {}; const b: any = r.campaign_budget ?? {};
    console.log(JSON.stringify({ campaign: c2, budget: b }, null, 2));
  }

  // ---------- LOCATIONS ----------
  console.log("\n===== GEO TARGETS (location criteria) =====");
  const loc = await cust.query(`
    SELECT campaign_criterion.location.geo_target_constant,
           campaign_criterion.negative, campaign_criterion.bid_modifier,
           campaign_criterion.status
    FROM campaign_criterion
    WHERE ${W} AND campaign_criterion.type = 'LOCATION'
  `);
  if (!loc.length) console.log("  (none / using account default)");
  for (const r of loc) {
    const cc: any = r.campaign_criterion ?? {};
    console.log(`  ${cc.negative ? "NEG " : "+ "}${cc.location?.geo_target_constant}  mod=${cc.bid_modifier ?? "-"} ${STAT[Number(cc.status)] ?? cc.status}`);
  }

  // ---------- LANGUAGES ----------
  console.log("\n===== LANGUAGE TARGETS =====");
  const lng = await cust.query(`
    SELECT campaign_criterion.language.language_constant, campaign_criterion.status
    FROM campaign_criterion WHERE ${W} AND campaign_criterion.type = 'LANGUAGE'
  `);
  if (!lng.length) console.log("  (none / all)");
  for (const r of lng) console.log(`  ${r.campaign_criterion?.language?.language_constant} ${STAT[Number(r.campaign_criterion?.status)] ?? ""}`);

  // ---------- AD SCHEDULE + DEVICE modifiers ----------
  console.log("\n===== AD SCHEDULE / DEVICE / other campaign criteria =====");
  const oth = await cust.query(`
    SELECT campaign_criterion.type, campaign_criterion.negative,
           campaign_criterion.bid_modifier, campaign_criterion.status,
           campaign_criterion.ad_schedule.day_of_week,
           campaign_criterion.ad_schedule.start_hour, campaign_criterion.ad_schedule.end_hour,
           campaign_criterion.device.type, campaign_criterion.keyword.text,
           campaign_criterion.keyword.match_type
    FROM campaign_criterion
    WHERE ${W} AND campaign_criterion.type IN ('AD_SCHEDULE','DEVICE','KEYWORD')
  `);
  if (!oth.length) console.log("  (none)");
  for (const r of oth) {
    const cc: any = r.campaign_criterion ?? {};
    if (cc.type === 8 || cc.ad_schedule?.day_of_week) console.log(`  SCHEDULE ${cc.ad_schedule?.day_of_week} ${cc.ad_schedule?.start_hour}-${cc.ad_schedule?.end_hour} mod=${cc.bid_modifier}`);
    else if (cc.device?.type) console.log(`  DEVICE ${DEV[Number(cc.device.type)]} mod=${cc.bid_modifier}`);
    else if (cc.keyword?.text) console.log(`  CAMPAIGN ${cc.negative ? "NEGATIVE" : "+"} KW "${cc.keyword.text}" [${MATCH[Number(cc.keyword.match_type)]}]`);
    else console.log(`  type=${cc.type} neg=${cc.negative} mod=${cc.bid_modifier}`);
  }

  // ---------- AD GROUPS ----------
  console.log("\n===== AD GROUPS =====");
  const ags = await cust.query(`
    SELECT ad_group.id, ad_group.name, ad_group.status, ad_group.type,
           ad_group.cpc_bid_micros, ad_group.cpm_bid_micros,
           ad_group.effective_target_cpa_micros
    FROM ad_group WHERE ${W}
  `);
  for (const r of ags) {
    const a: any = r.ad_group ?? {};
    console.log(`  [${a.id}] "${a.name}" ${STAT[Number(a.status)]} | cpc_bid ${fmt(a.cpc_bid_micros)} | type=${a.type}`);
  }

  // ---------- ADS ----------
  console.log("\n===== ADS (creatives) =====");
  const ads = await cust.query(`
    SELECT ad_group.name, ad_group_ad.status, ad_group_ad.ad.id,
           ad_group_ad.ad.type, ad_group_ad.ad.final_urls,
           ad_group_ad.ad.responsive_search_ad.headlines,
           ad_group_ad.ad.responsive_search_ad.descriptions,
           ad_group_ad.ad.responsive_search_ad.path1,
           ad_group_ad.ad.responsive_search_ad.path2,
           ad_group_ad.ad.expanded_text_ad.headline_part1,
           ad_group_ad.ad.expanded_text_ad.headline_part2,
           ad_group_ad.ad.expanded_text_ad.description
    FROM ad_group_ad WHERE ${W}
  `);
  if (!ads.length) console.log("  (no ads)");
  for (const r of ads) {
    const ad: any = r.ad_group_ad?.ad ?? {};
    console.log(`\n  AdGroup "${r.ad_group?.name}" | ad ${ad.id} type=${ad.type} ${STAT[Number(r.ad_group_ad?.status)]}`);
    console.log(`  final_urls: ${JSON.stringify(ad.final_urls)}`);
    if (ad.responsive_search_ad) {
      const rsa: any = ad.responsive_search_ad;
      console.log(`  path: /${rsa.path1 ?? ""}/${rsa.path2 ?? ""}`);
      console.log(`  HEADLINES:`);
      for (const h of rsa.headlines ?? []) console.log(`    - ${h.text}${h.pinned_field ? ` [pin ${h.pinned_field}]` : ""}`);
      console.log(`  DESCRIPTIONS:`);
      for (const d of rsa.descriptions ?? []) console.log(`    - ${d.text}${d.pinned_field ? ` [pin ${d.pinned_field}]` : ""}`);
    }
    if (ad.expanded_text_ad?.headline_part1) {
      const e: any = ad.expanded_text_ad;
      console.log(`  ETA: ${e.headline_part1} | ${e.headline_part2}`);
      console.log(`  desc: ${e.description}`);
    }
  }

  // ---------- KEYWORDS (positive) ----------
  console.log("\n===== KEYWORDS (positive) =====");
  const kws = await cust.query(`
    SELECT ad_group.name, ad_group_criterion.criterion_id,
           ad_group_criterion.keyword.text, ad_group_criterion.keyword.match_type,
           ad_group_criterion.status, ad_group_criterion.cpc_bid_micros,
           ad_group_criterion.effective_cpc_bid_micros,
           ad_group_criterion.quality_info.quality_score,
           ad_group_criterion.final_urls
    FROM ad_group_criterion
    WHERE ${W} AND ad_group_criterion.type = 'KEYWORD' AND ad_group_criterion.negative = false
  `);
  for (const r of kws) {
    const k: any = r.ad_group_criterion ?? {};
    console.log(`  ${r.ad_group?.name} › "${k.keyword?.text}" [${MATCH[Number(k.keyword?.match_type)]}] ${STAT[Number(k.status)]} | cpc_bid ${fmt(k.cpc_bid_micros)} eff ${fmt(k.effective_cpc_bid_micros)} | QS ${k.quality_info?.quality_score ?? "-"} | urls ${JSON.stringify(k.final_urls ?? [])}`);
  }

  // ---------- AD-GROUP NEGATIVE KEYWORDS ----------
  console.log("\n===== AD-GROUP NEGATIVE KEYWORDS =====");
  const negAg = await cust.query(`
    SELECT ad_group.name, ad_group_criterion.keyword.text, ad_group_criterion.keyword.match_type
    FROM ad_group_criterion
    WHERE ${W} AND ad_group_criterion.type = 'KEYWORD' AND ad_group_criterion.negative = true
  `);
  if (!negAg.length) console.log("  (none)");
  for (const r of negAg) console.log(`  ${r.ad_group?.name} › "${r.ad_group_criterion?.keyword?.text}" [${MATCH[Number(r.ad_group_criterion?.keyword?.match_type)]}]`);

  // ---------- SHARED NEGATIVE SETS attached ----------
  console.log("\n===== SHARED SETS attached to campaign =====");
  const ss = await cust.query(`
    SELECT shared_set.id, shared_set.name, shared_set.type, shared_set.status
    FROM campaign_shared_set WHERE ${W}
  `);
  if (!ss.length) console.log("  (none)");
  const setIds: string[] = [];
  for (const r of ss) {
    const s: any = r.shared_set ?? {};
    setIds.push(String(s.id));
    console.log(`  [${s.id}] "${s.name}" type=${s.type} status=${s.status}`);
  }
  for (const sid of setIds) {
    const items = await cust.query(`
      SELECT shared_criterion.keyword.text, shared_criterion.keyword.match_type
      FROM shared_criterion WHERE shared_set.id = ${sid}
    `);
    console.log(`    -- set ${sid} items (${items.length}):`);
    for (const it of items) console.log(`       "${it.shared_criterion?.keyword?.text}" [${MATCH[Number(it.shared_criterion?.keyword?.match_type)]}]`);
  }

  // ---------- SEGMENTS for the date ----------
  console.log(`\n===== SEGMENTS on ${DATE} =====`);
  console.log("  -- by device --");
  const byDev = await cust.query(`
    SELECT segments.device, metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.average_cpc, metrics.ctr
    FROM campaign WHERE ${W} AND segments.date = '${DATE}'
  `);
  for (const r of byDev) {
    const m: any = r.metrics ?? {};
    console.log(`    ${DEV[Number((r as any).segments?.device)] ?? (r as any).segments?.device}: imp ${m.impressions ?? 0} clk ${m.clicks ?? 0} CTR ${pct(m.ctr)} avgCPC ${fmt(m.average_cpc)} cost ${fmt(m.cost_micros)}`);
  }
  console.log("  -- by search term --");
  const st = await cust.query(`
    SELECT search_term_view.search_term, segments.keyword.info.text,
           metrics.impressions, metrics.clicks, metrics.cost_micros
    FROM search_term_view WHERE ${W} AND segments.date = '${DATE}'
    ORDER BY metrics.impressions DESC
  `);
  if (!st.length) console.log("    (no search-term rows; >30d may be unavailable)");
  for (const r of st) {
    const m: any = r.metrics ?? {};
    console.log(`    "${r.search_term_view?.search_term}" ← kw "${(r as any).segments?.keyword?.info?.text}" | imp ${m.impressions ?? 0} clk ${m.clicks ?? 0} cost ${fmt(m.cost_micros)}`);
  }

  console.log("");
}

main().catch((e) => { console.error(e); process.exit(1); });
