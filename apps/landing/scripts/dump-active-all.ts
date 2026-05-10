// Dump everything ACTIVE: customers, campaigns (+ bidding strategy), ad groups,
// ads, keywords, negative keywords (ad-group + campaign level).
// Output: JSON to stdout.

import { GoogleAdsApi } from "google-ads-api";
import { config } from "dotenv";
import * as path from "path";

config({ path: path.join(process.cwd(), ".env") });

const ENABLED = 2;

async function main() {
  const client = new GoogleAdsApi({
    client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
    client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
    developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
  });

  const refresh = process.env.GOOGLE_ADS_REFRESH_TOKEN!;
  const loginCid = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID;

  // 1. accessible customers
  const acc = await client.listAccessibleCustomers(refresh);
  const accessible = acc.resource_names.map((r) => r.split("/")[1]);

  // 2. resolve which are real (non-manager) accounts under MCC
  const accounts: { id: string; descriptive_name?: string; currency?: string; tz?: string; manager?: boolean }[] = [];
  if (loginCid) {
    const mcc = client.Customer({ customer_id: loginCid, login_customer_id: loginCid, refresh_token: refresh });
    const rows = await mcc.query(
      `SELECT customer_client.id, customer_client.descriptive_name, customer_client.currency_code, customer_client.time_zone, customer_client.manager, customer_client.status FROM customer_client WHERE customer_client.status = 'ENABLED'`,
    );
    for (const r of rows) {
      const c = r.customer_client!;
      accounts.push({
        id: String(c.id),
        descriptive_name: c.descriptive_name ?? undefined,
        currency: c.currency_code ?? undefined,
        tz: c.time_zone ?? undefined,
        manager: c.manager ?? undefined,
      });
    }
  } else {
    for (const id of accessible) accounts.push({ id });
  }

  const result: any = { accessible, accounts: [] as any[] };

  for (const acct of accounts) {
    if (acct.manager) {
      result.accounts.push({ ...acct, skipped: "manager account" });
      continue;
    }
    const cust = client.Customer({
      customer_id: acct.id,
      login_customer_id: loginCid,
      refresh_token: refresh,
    });

    // campaigns + bidding
    const campaigns = await cust.query(`
      SELECT
        campaign.id, campaign.name, campaign.status, campaign.advertising_channel_type,
        campaign.bidding_strategy_type, campaign.bidding_strategy,
        campaign.manual_cpc.enhanced_cpc_enabled,
        campaign.target_cpa.target_cpa_micros,
        campaign.target_roas.target_roas,
        campaign.maximize_conversions.target_cpa_micros,
        campaign.maximize_conversion_value.target_roas,
        campaign.target_spend.cpc_bid_ceiling_micros,
        campaign.target_impression_share.location,
        campaign.target_impression_share.location_fraction_micros,
        campaign.target_impression_share.cpc_bid_ceiling_micros,
        campaign_budget.amount_micros, campaign_budget.delivery_method
      FROM campaign
      WHERE campaign.status = 'ENABLED'
    `);

    // ad groups
    const adGroups = await cust.query(`
      SELECT ad_group.id, ad_group.name, ad_group.status, ad_group.type,
             ad_group.cpc_bid_micros, ad_group.cpm_bid_micros, ad_group.target_cpa_micros, ad_group.target_roas,
             campaign.id
      FROM ad_group
      WHERE ad_group.status = 'ENABLED' AND campaign.status = 'ENABLED'
    `);

    // ads
    const ads = await cust.query(`
      SELECT ad_group_ad.ad.id, ad_group_ad.ad.name, ad_group_ad.ad.type, ad_group_ad.status,
             ad_group_ad.ad.final_urls,
             ad_group_ad.ad.responsive_search_ad.headlines,
             ad_group_ad.ad.responsive_search_ad.descriptions,
             ad_group_ad.ad.responsive_search_ad.path1,
             ad_group_ad.ad.responsive_search_ad.path2,
             ad_group_ad.ad.expanded_text_ad.headline_part1,
             ad_group_ad.ad.expanded_text_ad.headline_part2,
             ad_group_ad.ad.expanded_text_ad.headline_part3,
             ad_group_ad.ad.expanded_text_ad.description,
             ad_group_ad.ad.expanded_text_ad.description2,
             ad_group.id, campaign.id
      FROM ad_group_ad
      WHERE ad_group_ad.status = 'ENABLED' AND ad_group.status = 'ENABLED' AND campaign.status = 'ENABLED'
    `);

    // positive keywords
    const keywords = await cust.query(`
      SELECT ad_group_criterion.criterion_id, ad_group_criterion.keyword.text, ad_group_criterion.keyword.match_type,
             ad_group_criterion.status, ad_group_criterion.cpc_bid_micros, ad_group_criterion.effective_cpc_bid_micros,
             ad_group.id, campaign.id
      FROM ad_group_criterion
      WHERE ad_group_criterion.type = 'KEYWORD'
        AND ad_group_criterion.negative = FALSE
        AND ad_group_criterion.status = 'ENABLED'
        AND ad_group.status = 'ENABLED'
        AND campaign.status = 'ENABLED'
    `);

    // ad-group negative keywords
    const adGroupNegatives = await cust.query(`
      SELECT ad_group_criterion.criterion_id, ad_group_criterion.keyword.text, ad_group_criterion.keyword.match_type,
             ad_group.id, campaign.id
      FROM ad_group_criterion
      WHERE ad_group_criterion.type = 'KEYWORD'
        AND ad_group_criterion.negative = TRUE
        AND ad_group.status = 'ENABLED'
        AND campaign.status = 'ENABLED'
    `);

    // campaign-level negative keywords
    const campaignNegatives = await cust.query(`
      SELECT campaign_criterion.criterion_id, campaign_criterion.keyword.text, campaign_criterion.keyword.match_type,
             campaign.id
      FROM campaign_criterion
      WHERE campaign_criterion.type = 'KEYWORD'
        AND campaign_criterion.negative = TRUE
        AND campaign.status = 'ENABLED'
    `);

    // shared negative keyword lists attached to campaigns
    const sharedSets = await cust.query(`
      SELECT campaign_shared_set.campaign, campaign_shared_set.shared_set, campaign_shared_set.status,
             shared_set.id, shared_set.name, shared_set.type, shared_set.status
      FROM campaign_shared_set
      WHERE campaign_shared_set.status = 'ENABLED' AND shared_set.status = 'ENABLED'
    `);

    const sharedSetItems = await cust.query(`
      SELECT shared_criterion.criterion_id, shared_criterion.type, shared_criterion.keyword.text, shared_criterion.keyword.match_type,
             shared_set.id, shared_set.name
      FROM shared_criterion
      WHERE shared_set.status = 'ENABLED'
    `);

    result.accounts.push({
      ...acct,
      campaigns,
      ad_groups: adGroups,
      ads,
      keywords,
      ad_group_negatives: adGroupNegatives,
      campaign_negatives: campaignNegatives,
      campaign_shared_sets: sharedSets,
      shared_set_items: sharedSetItems,
    });
  }

  process.stdout.write(JSON.stringify(result, null, 2));
}

main().catch((e) => {
  console.error(e?.errors ?? e);
  process.exit(1);
});
