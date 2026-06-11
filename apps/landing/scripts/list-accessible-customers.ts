// Lists every Google Ads customer the OAuth refresh-token has access to.
// Useful when CUSTOMER_ID env vars are stale or pointing at a deactivated account.

import { GoogleAdsApi } from "google-ads-api";
import { config } from "dotenv";
import * as path from "path";

config({ path: path.join(process.cwd(), ".env") });

async function main() {
  const client = new GoogleAdsApi({
    client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
    client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
    developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
  });

  console.log("Calling listAccessibleCustomers...");
  const result = await client.listAccessibleCustomers(process.env.GOOGLE_ADS_REFRESH_TOKEN!);
  console.log(`Found ${result.resource_names.length} accessible customer(s):`);
  for (const r of result.resource_names) console.log(`  ${r}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
