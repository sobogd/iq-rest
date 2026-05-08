import { GoogleAdsApi } from "google-ads-api";
import { config } from "dotenv";
config();
const STATUS: Record<number, string> = {1: "UNKNOWN", 2: "ENABLED", 3: "PAUSED", 4: "REMOVED"};
async function main() {
  const c = new GoogleAdsApi({client_id: process.env.GOOGLE_ADS_CLIENT_ID!, client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!, developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN!});
  const cust = c.Customer({customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID!, login_customer_id: process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID, refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!});
  const rows = await cust.query(`SELECT campaign.id, campaign.name, campaign.status FROM campaign ORDER BY campaign.status, campaign.name`);
  for (const r of rows) { const k = r.campaign!; console.log(`${(STATUS[k.status as number] || k.status).padEnd(8)}\t${String(k.name).padEnd(40)}\t${k.id}`); }
}
main().catch((e) => { console.error(e); process.exit(1); });
