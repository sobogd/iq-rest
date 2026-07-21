// Make ES campaign mirror BG: Maximize Conversions strategy, €7/day budget,
// keywords reduced to 2 BROAD (carta digital, menú digital), and copy BG's
// campaign-level negative keywords into ES.
//
// Dry-run by default. Apply with:  npx tsx scripts/set-es-like-bg.ts --apply

import { GoogleAdsApi, enums } from "google-ads-api";
import { config } from "dotenv";
import * as path from "path";

config({ path: path.join(process.cwd(), ".env") });

const APPLY = process.argv.includes("--apply");
const CID = process.env.GOOGLE_ADS_CUSTOMER_ID!;
const ES = "24034810450";
const BG = "24029577480";
const BUDGET_EUR = 7;
const BROAD_KEYWORDS = ["carta digital", "menú digital"];

const MATCH: Record<number, string> = { 2: "EXACT", 3: "PHRASE", 4: "BROAD" };
const tag = APPLY ? "APPLY" : "DRY  ";

async function main() {
  const client = new GoogleAdsApi({
    client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
    client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
    developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
  });
  const cust = client.Customer({
    customer_id: CID,
    login_customer_id: process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID,
    refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
  });

  console.log(`\n### ES ← BG mirror  [${tag}]  (customer ${CID})\n`);

  // ---------- 1. BUDGET → €7 ----------
  const budRows = await cust.query(`
    SELECT campaign_budget.resource_name, campaign_budget.amount_micros
    FROM campaign WHERE campaign.id = ${ES}`);
  const budRn = (budRows[0] as any).campaign_budget.resource_name;
  const curBud = Number((budRows[0] as any).campaign_budget.amount_micros) / 1e6;
  console.log(`[budget] €${curBud.toFixed(2)} → €${BUDGET_EUR.toFixed(2)}  (${budRn})`);
  if (APPLY) {
    await cust.campaignBudgets.update([{ resource_name: budRn, amount_micros: BUDGET_EUR * 1e6 }]);
  }

  // ---------- 2. STRATEGY → Maximize Conversions ----------
  const campRn = `customers/${CID}/campaigns/${ES}`;
  console.log(`[strategy] MANUAL_CPC → MAXIMIZE_CONVERSIONS  (${campRn})`);
  if (APPLY) {
    await cust.campaigns.update([{ resource_name: campRn, maximize_conversions: { target_cpa_micros: 0 } }]);
  }

  // ---------- 3. KEYWORDS → 2 BROAD ----------
  const kwRows = await cust.query(`
    SELECT ad_group_criterion.resource_name, ad_group_criterion.keyword.text,
           ad_group_criterion.keyword.match_type, ad_group.resource_name
    FROM ad_group_criterion
    WHERE campaign.id = ${ES} AND ad_group_criterion.type = 'KEYWORD'
      AND ad_group_criterion.negative = false
      AND ad_group_criterion.status != 'REMOVED'`);
  const adGroupRn = (kwRows[0] as any).ad_group.resource_name;

  // remove everything that isn't one of our target broad keywords
  const keepSet = new Set(BROAD_KEYWORDS.map((k) => k.toLowerCase()));
  const toRemove: string[] = [];
  const alreadyBroad = new Set<string>();
  for (const r of kwRows as any[]) {
    const t = r.ad_group_criterion.keyword.text;
    const mt = Number(r.ad_group_criterion.keyword.match_type);
    if (mt === 4 && keepSet.has(String(t).toLowerCase())) {
      alreadyBroad.add(String(t).toLowerCase());
      console.log(`[kw keep] "${t}" [BROAD]`);
    } else {
      toRemove.push(r.ad_group_criterion.resource_name);
      console.log(`[kw remove] "${t}" [${MATCH[mt] ?? mt}]`);
    }
  }
  const toAdd = BROAD_KEYWORDS.filter((k) => !alreadyBroad.has(k.toLowerCase()));
  for (const k of toAdd) console.log(`[kw add] "${k}" [BROAD]`);

  if (APPLY) {
    if (toAdd.length) {
      await cust.adGroupCriteria.create(
        toAdd.map((text) => ({
          ad_group: adGroupRn,
          status: enums.AdGroupCriterionStatus.ENABLED,
          keyword: { text, match_type: enums.KeywordMatchType.BROAD },
        })),
      );
    }
    if (toRemove.length) await cust.adGroupCriteria.remove(toRemove);
  }

  // ---------- 4. NEGATIVE KEYWORDS from BG → ES ----------
  const bgNeg = await cust.query(`
    SELECT campaign_criterion.keyword.text, campaign_criterion.keyword.match_type
    FROM campaign_criterion
    WHERE campaign.id = ${BG} AND campaign_criterion.type = 'KEYWORD'
      AND campaign_criterion.negative = true`);
  const esNeg = await cust.query(`
    SELECT campaign_criterion.keyword.text
    FROM campaign_criterion
    WHERE campaign.id = ${ES} AND campaign_criterion.type = 'KEYWORD'
      AND campaign_criterion.negative = true`);
  const esNegSet = new Set((esNeg as any[]).map((r) => String(r.campaign_criterion.keyword.text).toLowerCase()));
  const negOps = (bgNeg as any[])
    .filter((r) => !esNegSet.has(String(r.campaign_criterion.keyword.text).toLowerCase()))
    .map((r) => ({
      campaign: campRn,
      negative: true,
      keyword: { text: r.campaign_criterion.keyword.text, match_type: r.campaign_criterion.keyword.match_type },
    }));
  console.log(`[negatives] BG has ${bgNeg.length}, ES has ${esNeg.length}, adding ${negOps.length} to ES`);
  if (APPLY && negOps.length) {
    for (let i = 0; i < negOps.length; i += 1000) {
      await cust.campaignCriteria.create(negOps.slice(i, i + 1000));
    }
  }

  console.log(`\n### done [${tag}] — ES status left as-is (PAUSED); enable manually when ready.\n`);
}

main().catch((e) => { console.error(e); process.exit(1); });
