// Switches IT campaign to per-keyword bidding.
// Each keyword's CPC = its low_top_of_page_bid × 1.10 (10% buffer).
// Floor: €0.20. Keywords with no CPC data keep ad-group default.

import { GoogleAdsApi } from "google-ads-api";
import { config } from "dotenv";
import * as path from "path";
import * as fs from "fs";

config({ path: path.join(process.cwd(), ".env") });

const CAMPAIGN_NAME = "IT — Search — QR Menu (auto)";
const RESEARCH_PATH = "scripts/keyword-research-it.json";
const BUFFER = 1.10;
const FLOOR_EUR = 0.20;

async function main() {
  const research: Array<{ keyword: string; lowCpc: number | null }> = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), RESEARCH_PATH), "utf-8"),
  );
  const cpcMap = new Map<string, number>();
  for (const r of research) {
    if (r.lowCpc != null) cpcMap.set(r.keyword.toLowerCase().trim(), r.lowCpc);
  }
  console.log(`Loaded ${cpcMap.size} keyword CPCs from research`);

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

  const campaigns = await customer.query(
    `SELECT campaign.id FROM campaign WHERE campaign.name = '${CAMPAIGN_NAME.replace(/'/g, "\\'")}'`,
  );
  if (!campaigns.length) {
    console.error(`Campaign not found`);
    process.exit(1);
  }
  const campaignId = (campaigns[0] as any).campaign.id;

  // Fetch keyword criteria in this campaign (positive only, exclude negatives)
  const criteria = await customer.query(
    `SELECT ad_group_criterion.resource_name,
            ad_group_criterion.keyword.text,
            ad_group_criterion.keyword.match_type,
            ad_group_criterion.cpc_bid_micros,
            ad_group.name
     FROM ad_group_criterion
     WHERE campaign.id = ${campaignId}
       AND ad_group_criterion.type = 'KEYWORD'
       AND ad_group_criterion.negative = FALSE
       AND ad_group_criterion.status != 'REMOVED'`,
  );

  const updates: any[] = [];
  let matched = 0,
    unmatched = 0;
  for (const r of criteria) {
    const c = (r as any).ad_group_criterion;
    const text = c.keyword.text.toLowerCase().trim();
    const lowCpc = cpcMap.get(text);
    const oldBid = c.cpc_bid_micros ? Number(c.cpc_bid_micros) / 1_000_000 : null;
    if (lowCpc != null) {
      const newBid = Math.max(lowCpc * BUFFER, FLOOR_EUR);
      // EUR billable unit = 10_000 micros (€0.01). Round to that grid.
      const newMicros = Math.round((newBid * 1_000_000) / 10_000) * 10_000;
      console.log(
        `  [${(r as any).ad_group.name.slice(0, 20).padEnd(20)}] "${text}" — €${oldBid?.toFixed(2) ?? "—"} → €${newBid.toFixed(2)} (low €${lowCpc.toFixed(2)})`,
      );
      updates.push({ resource_name: c.resource_name, cpc_bid_micros: newMicros });
      matched++;
    } else {
      console.log(`  [${(r as any).ad_group.name.slice(0, 20).padEnd(20)}] "${text}" — no CPC data, keeps group default`);
      unmatched++;
    }
  }

  console.log(`\n${matched} matched, ${unmatched} unmatched`);
  if (updates.length === 0) {
    console.log("Nothing to update");
    return;
  }

  // adGroupCriteria.update accepts partial updates
  await customer.adGroupCriteria.update(updates);
  console.log(`✓ Updated ${updates.length} keyword bids`);
}

main().catch((e) => {
  console.error(e);
  if (e?.errors) console.error(JSON.stringify(e.errors, null, 2));
  process.exit(1);
});
