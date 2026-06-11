// Pause DE and PL campaigns; pause IT WEB / ES WEB / PT WEB ad groups.
// Reversible: status PAUSED, not REMOVED.

import { GoogleAdsApi, enums } from "google-ads-api";
import { config } from "dotenv";
config();

const CAMPAIGNS_TO_PAUSE = [
  { id: "23805977166", name: "DE" },
  { id: "23812981575", name: "PL" },
];
const AD_GROUPS_TO_PAUSE = [
  { id: "200070023710", name: "IT WEB" },
  { id: "193459458462", name: "ES WEB" },
  { id: "199309748107", name: "PT WEB" },
];

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

  for (const c2 of CAMPAIGNS_TO_PAUSE) {
    try {
      const res = await cust.campaigns.update([
        {
          resource_name: `customers/${process.env.GOOGLE_ADS_CUSTOMER_ID}/campaigns/${c2.id}`,
          status: enums.CampaignStatus.PAUSED,
        },
      ]);
      console.log(`✓ campaign ${c2.name} (${c2.id}) → PAUSED`, res.results?.[0]?.resource_name ?? "");
    } catch (err) {
      console.error(`✗ failed to pause campaign ${c2.name}`, err);
    }
  }

  for (const ag of AD_GROUPS_TO_PAUSE) {
    try {
      const res = await cust.adGroups.update([
        {
          resource_name: `customers/${process.env.GOOGLE_ADS_CUSTOMER_ID}/adGroups/${ag.id}`,
          status: enums.AdGroupStatus.PAUSED,
        },
      ]);
      console.log(`✓ ad group ${ag.name} (${ag.id}) → PAUSED`, res.results?.[0]?.resource_name ?? "");
    } catch (err) {
      console.error(`✗ failed to pause ad group ${ag.name}`, err);
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
