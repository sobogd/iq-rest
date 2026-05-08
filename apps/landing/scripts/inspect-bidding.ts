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

  console.log("\n========== CAMPAIGN BIDDING (active) ==========");
  const camps = await cust.query(`
    SELECT campaign.id, campaign.name,
           campaign.bidding_strategy, campaign.bidding_strategy_type,
           campaign.bidding_strategy_system_status,
           campaign.maximize_conversions.target_cpa_micros,
           campaign.maximize_conversion_value.target_roas,
           campaign.target_cpa.target_cpa_micros,
           campaign.target_roas.target_roas,
           campaign.manual_cpc.enhanced_cpc_enabled
    FROM campaign
    WHERE campaign.status = 'ENABLED'
  `);
  for (const r of camps) {
    const c2 = r.campaign ?? {};
    console.log(`\n${c2.name} (${c2.id})`);
    console.log(`  bidding_strategy_type:   ${c2.bidding_strategy_type}`);
    console.log(`  bidding_strategy (portfolio resource): ${c2.bidding_strategy ?? "—"}`);
    console.log(`  system status:           ${c2.bidding_strategy_system_status}`);
    console.log(`  manual_cpc.enhanced:     ${c2.manual_cpc?.enhanced_cpc_enabled}`);
    console.log(`  target_cpa.target:       ${c2.target_cpa?.target_cpa_micros}`);
    console.log(`  target_roas.target:      ${c2.target_roas?.target_roas}`);
    console.log(`  max_conv.target_cpa:     ${c2.maximize_conversions?.target_cpa_micros}`);
    console.log(`  max_conv_value.target_roas: ${c2.maximize_conversion_value?.target_roas}`);
  }

  console.log("\n\n========== PORTFOLIO STRATEGIES ==========");
  const ports = await cust.query(`
    SELECT bidding_strategy.id, bidding_strategy.name, bidding_strategy.resource_name,
           bidding_strategy.type, bidding_strategy.status,
           bidding_strategy.target_cpa.target_cpa_micros,
           bidding_strategy.target_roas.target_roas,
           bidding_strategy.maximize_conversions.target_cpa_micros,
           bidding_strategy.maximize_conversion_value.target_roas,
           bidding_strategy.campaign_count
    FROM bidding_strategy
    WHERE bidding_strategy.status != 'REMOVED'
  `);
  for (const r of ports) {
    const b = r.bidding_strategy ?? {};
    console.log(`\n  ${b.name} (id ${b.id}, resource ${b.resource_name})`);
    console.log(`    type:                  ${b.type}`);
    console.log(`    status:                ${b.status}`);
    console.log(`    campaign_count:        ${b.campaign_count}`);
    console.log(`    target_cpa.target:     ${b.target_cpa?.target_cpa_micros}`);
    console.log(`    target_roas.target:    ${b.target_roas?.target_roas}`);
    console.log(`    max_conv.target_cpa:   ${b.maximize_conversions?.target_cpa_micros}`);
    console.log(`    max_conv_val.target_roas: ${b.maximize_conversion_value?.target_roas}`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
