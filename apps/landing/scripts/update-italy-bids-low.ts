// Lowers max CPC bids in IT campaign to "low top-of-page" range.
// Old bids targeted top-1 placement (€2.00-2.50). New bids target page-1
// lower positions (€0.80-1.20) — 3x cheaper clicks, more volume per €12/day.

import { GoogleAdsApi } from "google-ads-api";
import { config } from "dotenv";
import * as path from "path";

config({ path: path.join(process.cwd(), ".env") });

const CAMPAIGN_NAME = "IT — Search — QR Menu (auto)";

// New bids — aligned with "low top-of-page bid" from Keyword Planner
const NEW_BIDS: Record<string, number> = {
  "A — QR Intent": 1.0,            // was 2.50, low-bid range €0.75-1.00
  "B — Menu Digitale B2B": 1.2,    // was 2.00, low-bid range €0.96-1.20
  "D — Create Intent": 1.2,        // was 2.00, low-bid range €0.79-1.20
  "E — Verticals": 0.9,            // was 1.50, low-bid range €0.61-0.90
};

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

  const campaigns = await customer.query(
    `SELECT campaign.id FROM campaign WHERE campaign.name = '${CAMPAIGN_NAME.replace(/'/g, "\\'")}'`,
  );
  if (!campaigns.length) {
    console.error(`Campaign "${CAMPAIGN_NAME}" not found`);
    process.exit(1);
  }
  const campaignId = (campaigns[0] as any).campaign.id;

  const adGroups = await customer.query(
    `SELECT ad_group.id, ad_group.name, ad_group.resource_name, ad_group.cpc_bid_micros
     FROM ad_group
     WHERE campaign.id = ${campaignId} AND ad_group.status != 'REMOVED'`,
  );

  const updates: any[] = [];
  for (const r of adGroups) {
    const ag = (r as any).ad_group;
    const newBid = NEW_BIDS[ag.name];
    if (newBid == null) {
      console.log(`  skip "${ag.name}" — no new bid defined`);
      continue;
    }
    const oldEur = Number(ag.cpc_bid_micros) / 1_000_000;
    console.log(`  "${ag.name}": €${oldEur.toFixed(2)} → €${newBid.toFixed(2)}`);
    updates.push({
      resource_name: ag.resource_name,
      cpc_bid_micros: Math.round(newBid * 1_000_000),
    });
  }

  await customer.adGroups.update(updates);
  console.log(`\n✓ Updated ${updates.length} ad group bids.`);
}

main().catch((e) => {
  console.error(e);
  if (e?.errors) console.error(JSON.stringify(e.errors, null, 2));
  process.exit(1);
});
