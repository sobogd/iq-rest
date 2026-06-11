// Dump the raw shape of a keyword_view row so we can verify which key path
// (snake_case vs camelCase) the google-ads-api library actually returns for
// the quality_info subfields. The dashboard modal that reads
// /admin/google-ads/detail/keyword/:adGroupId/:critId comes back as "—" for
// every sub-score, and we need to know why.
import { GoogleAdsApi } from "google-ads-api";
import { config } from "dotenv";
config();

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

  const rows = await cust.query(`
    SELECT
      ad_group_criterion.criterion_id, ad_group_criterion.keyword.text,
      ad_group_criterion.quality_info.quality_score,
      ad_group_criterion.quality_info.creative_quality_score,
      ad_group_criterion.quality_info.post_click_quality_score,
      ad_group_criterion.quality_info.search_predicted_ctr,
      ad_group.id, campaign.id, campaign.name
    FROM keyword_view
    WHERE campaign.status = 'ENABLED'
      AND ad_group.status = 'ENABLED'
      AND ad_group_criterion.status = 'ENABLED'
      AND ad_group_criterion.keyword.text = 'carta digital restaurante'
  `);

  for (const r of rows) {
    console.log("\n=== RAW ROW ===");
    console.log(JSON.stringify(r, null, 2));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
