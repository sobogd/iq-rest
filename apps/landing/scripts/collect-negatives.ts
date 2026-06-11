// Collect EVERY negative keyword across the whole account (campaign-level,
// ad-group-level, shared negative sets), dedupe by (text, match_type), and add
// the ones missing as CAMPAIGN-level negatives to the target campaign.
//
// Usage:
//   npx tsx scripts/collect-negatives.ts            (dry run)
//   npx tsx scripts/collect-negatives.ts --apply

import { GoogleAdsApi } from "google-ads-api";
import { config } from "dotenv";
config();

const TARGET = "23927315038"; // clone campaign
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

  // key = `${text}␟${matchType}`
  const all = new Map<string, { text: string; mt: number }>();
  const add = (text?: string, mt?: number) => {
    if (!text || mt == null) return;
    all.set(`${text.toLowerCase()}␟${mt}`, { text, mt });
  };

  // 1. campaign-level negatives (ALL campaigns)
  const camp = await cust.query(`
    SELECT campaign.id, campaign_criterion.keyword.text, campaign_criterion.keyword.match_type
    FROM campaign_criterion
    WHERE campaign_criterion.type = 'KEYWORD' AND campaign_criterion.negative = true`);
  for (const r of camp as any[]) add(r.campaign_criterion.keyword.text, r.campaign_criterion.keyword.match_type);
  const campCount = (camp as any[]).length;

  // 2. ad-group-level negatives (ALL ad groups)
  const ag = await cust.query(`
    SELECT ad_group_criterion.keyword.text, ad_group_criterion.keyword.match_type
    FROM ad_group_criterion
    WHERE ad_group_criterion.type = 'KEYWORD' AND ad_group_criterion.negative = true`);
  for (const r of ag as any[]) add(r.ad_group_criterion.keyword.text, r.ad_group_criterion.keyword.match_type);
  const agCount = (ag as any[]).length;

  // 3. shared negative keyword sets
  const sc = await cust.query(`
    SELECT shared_criterion.keyword.text, shared_criterion.keyword.match_type, shared_set.type, shared_set.name
    FROM shared_criterion WHERE shared_criterion.type = 'KEYWORD'`);
  for (const r of sc as any[]) add(r.shared_criterion.keyword.text, r.shared_criterion.keyword.match_type);
  const scCount = (sc as any[]).length;

  // existing negatives already on the target campaign
  const existing = new Set<string>();
  const ex = await cust.query(`
    SELECT campaign_criterion.keyword.text, campaign_criterion.keyword.match_type
    FROM campaign_criterion
    WHERE campaign.id = ${TARGET} AND campaign_criterion.type = 'KEYWORD' AND campaign_criterion.negative = true`);
  for (const r of ex as any[]) existing.add(`${r.campaign_criterion.keyword.text.toLowerCase()}␟${r.campaign_criterion.keyword.match_type}`);

  const missing = [...all.entries()].filter(([k]) => !existing.has(k)).map(([, v]) => v);

  console.log(`\n=== NEGATIVE COLLECTION ===`);
  console.log(`raw counts → campaign:${campCount}  ad-group:${agCount}  shared-set:${scCount}`);
  console.log(`unique across account: ${all.size}`);
  console.log(`already on target campaign ${TARGET}: ${existing.size}`);
  console.log(`MISSING to add: ${missing.length}`);
  const byMt: Record<string, number> = {};
  for (const m of missing) byMt[MATCH[m.mt] ?? m.mt] = (byMt[MATCH[m.mt] ?? m.mt] ?? 0) + 1;
  console.log(`  by match type:`, byMt);

  if (!APPLY) {
    console.log(`\nsample (first 40):`, missing.slice(0, 40).map((m) => `"${m.text}"[${MATCH[m.mt]}]`).join(", "));
    console.log(`\n(dry run — pass --apply to add)\n`);
    return;
  }

  const campRes = `customers/${process.env.GOOGLE_ADS_CUSTOMER_ID}/campaigns/${TARGET}`;
  const ops = missing.map((m) => ({ campaign: campRes, negative: true, keyword: { text: m.text, match_type: m.mt } }));
  for (let i = 0; i < ops.length; i += 1000) {
    await cust.campaignCriteria.create(ops.slice(i, i + 1000));
    console.log(`added ${Math.min(i + 1000, ops.length)}/${ops.length}`);
  }

  const after = await cust.query(`
    SELECT campaign_criterion.keyword.text FROM campaign_criterion
    WHERE campaign.id = ${TARGET} AND campaign_criterion.type = 'KEYWORD' AND campaign_criterion.negative = true`);
  console.log(`\nDONE. Target campaign now has ${(after as any[]).length} campaign-level negatives.`);
}

main().catch((e) => { console.error(JSON.stringify(e, null, 2)); process.exit(1); });
