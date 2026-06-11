// Wires the live Italy and Spain Search campaigns onto a single Portfolio
// Target CPA bid strategy (€25 tCPA, €2.20 Max CPC bid limit) backed by a
// shared €35/day budget. Both the portfolio strategy and the shared
// budget are idempotent: if a resource with the configured name already
// exists we reuse it instead of creating a duplicate.
//
// Usage:
//   npx tsx scripts/apply-eu-portfolio-tcpa.ts           # dry-run preview
//   npx tsx scripts/apply-eu-portfolio-tcpa.ts --apply   # write changes
//
// Required env (read from soqrmenuweb's .env via tsx):
//   GOOGLE_ADS_DEVELOPER_TOKEN
//   GOOGLE_ADS_CLIENT_ID
//   GOOGLE_ADS_CLIENT_SECRET
//   GOOGLE_ADS_REFRESH_TOKEN
//   GOOGLE_ADS_CUSTOMER_ID            // the operating account
//   GOOGLE_ADS_LOGIN_CUSTOMER_ID      // MCC login (optional)

import "dotenv/config";
import { GoogleAdsApi, enums } from "google-ads-api";

const TCPA_EUR = 25;
const MAX_CPC_EUR = 2.2;
const DAILY_BUDGET_EUR = 35;

const STRATEGY_NAME = "iqrest-tcpa-25";
const BUDGET_NAME = "IQRest EU — Shared Budget";

const CAMPAIGN_NAMES = ["IT", "ES"];

const APPLY = process.argv.includes("--apply");
const DRY = !APPLY;

function eur(n: number): string {
  return `€${n.toFixed(2)}`;
}

function micros(eurAmount: number): number {
  return Math.round(eurAmount * 1_000_000);
}

function log(msg: string): void {
  console.log(msg);
}

async function main(): Promise<void> {
  if (DRY) log("[DRY-RUN] No writes. Add --apply to actually push changes.\n");

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

  // ── 1. Locate the live campaigns ────────────────────────────────────
  const nameList = CAMPAIGN_NAMES.map((n) => `'${n.replace(/'/g, "\\'")}'`).join(",");
  const campaigns = await customer.query(
    `SELECT campaign.id, campaign.resource_name, campaign.name,
            campaign.status, campaign.bidding_strategy_type
       FROM campaign
      WHERE campaign.name IN (${nameList})
        AND campaign.status = 'ENABLED'`,
  );
  const found = campaigns.map((r: any) => r.campaign);
  log(`[1] Active campaigns matched: ${found.length}/${CAMPAIGN_NAMES.length}`);
  for (const c of found) {
    log(`    · ${c.name} [${c.status}] bidding=${c.bidding_strategy_type} ${c.resource_name}`);
  }
  if (found.length !== CAMPAIGN_NAMES.length) {
    log("ABORT — expected one ENABLED campaign per name. Adjust CAMPAIGN_NAMES.");
    process.exit(1);
  }

  // ── 2. Shared budget (€35/day) ──────────────────────────────────────
  log(`\n[2] Shared budget "${BUDGET_NAME}" (${eur(DAILY_BUDGET_EUR)}/day)`);
  const existingBudgets = await customer.query(
    `SELECT campaign_budget.id, campaign_budget.resource_name,
            campaign_budget.amount_micros, campaign_budget.explicitly_shared
       FROM campaign_budget
      WHERE campaign_budget.name = '${BUDGET_NAME.replace(/'/g, "\\'")}'`,
  );
  let budgetResource: string;
  if (existingBudgets.length > 0) {
    const b: any = existingBudgets[0].campaign_budget;
    budgetResource = b.resource_name;
    log(`    Reusing existing budget ${budgetResource} (current ${eur(b.amount_micros / 1_000_000)}, shared=${b.explicitly_shared})`);
    if (b.amount_micros !== micros(DAILY_BUDGET_EUR) || !b.explicitly_shared) {
      if (DRY) {
        log(`    [DRY] would update amount → ${eur(DAILY_BUDGET_EUR)}, explicitly_shared=true`);
      } else {
        await customer.campaignBudgets.update([
          {
            resource_name: budgetResource,
            amount_micros: micros(DAILY_BUDGET_EUR),
            explicitly_shared: true,
          },
        ]);
        log("    Updated amount + shared flag.");
      }
    }
  } else if (DRY) {
    budgetResource = "customers/X/campaignBudgets/dry";
    log(`    [DRY] would create shared budget ${eur(DAILY_BUDGET_EUR)}/day`);
  } else {
    const r = await customer.campaignBudgets.create([
      {
        name: BUDGET_NAME,
        amount_micros: micros(DAILY_BUDGET_EUR),
        delivery_method: enums.BudgetDeliveryMethod.STANDARD,
        explicitly_shared: true,
      },
    ]);
    budgetResource = r.results[0].resource_name;
    log(`    Created budget ${budgetResource}`);
  }

  // ── 3. Portfolio Target CPA strategy ────────────────────────────────
  log(`\n[3] Portfolio strategy "${STRATEGY_NAME}" (tCPA ${eur(TCPA_EUR)}, Max CPC ${eur(MAX_CPC_EUR)})`);
  const existingStrats = await customer.query(
    `SELECT bidding_strategy.id, bidding_strategy.resource_name,
            bidding_strategy.type, bidding_strategy.target_cpa.target_cpa_micros,
            bidding_strategy.target_cpa.cpc_bid_ceiling_micros
       FROM bidding_strategy
      WHERE bidding_strategy.name = '${STRATEGY_NAME.replace(/'/g, "\\'")}'
        AND bidding_strategy.status != 'REMOVED'`,
  );
  let strategyResource: string;
  if (existingStrats.length > 0) {
    const s: any = existingStrats[0].bidding_strategy;
    strategyResource = s.resource_name;
    log(`    Reusing existing strategy ${strategyResource} (type=${s.type}, tCPA=${eur((s.target_cpa?.target_cpa_micros ?? 0) / 1_000_000)}, cap=${eur((s.target_cpa?.cpc_bid_ceiling_micros ?? 0) / 1_000_000)})`);
    const needsUpdate =
      s.target_cpa?.target_cpa_micros !== micros(TCPA_EUR) ||
      s.target_cpa?.cpc_bid_ceiling_micros !== micros(MAX_CPC_EUR);
    if (needsUpdate) {
      if (DRY) {
        log(`    [DRY] would update tCPA → ${eur(TCPA_EUR)}, cap → ${eur(MAX_CPC_EUR)}`);
      } else {
        await customer.biddingStrategies.update([
          {
            resource_name: strategyResource,
            target_cpa: {
              target_cpa_micros: micros(TCPA_EUR),
              cpc_bid_ceiling_micros: micros(MAX_CPC_EUR),
            },
          },
        ]);
        log("    Updated tCPA + cap.");
      }
    }
  } else if (DRY) {
    strategyResource = "customers/X/biddingStrategies/dry";
    log(`    [DRY] would create portfolio Target CPA strategy`);
  } else {
    const r = await customer.biddingStrategies.create([
      {
        name: STRATEGY_NAME,
        target_cpa: {
          target_cpa_micros: micros(TCPA_EUR),
          cpc_bid_ceiling_micros: micros(MAX_CPC_EUR),
        },
      },
    ]);
    strategyResource = r.results[0].resource_name;
    log(`    Created strategy ${strategyResource}`);
  }

  // ── 4. Point each campaign at the portfolio + shared budget ─────────
  log(`\n[4] Wiring campaigns onto portfolio + shared budget`);
  for (const c of found) {
    log(`    · ${c.name}`);
    if (DRY) {
      log(`      [DRY] would set bidding_strategy=${strategyResource}, campaign_budget=${budgetResource}`);
      continue;
    }
    await customer.campaigns.update([
      {
        resource_name: c.resource_name,
        bidding_strategy: strategyResource,
        campaign_budget: budgetResource,
      },
    ]);
    log(`      Updated.`);
  }

  log(`\nDone${DRY ? " (dry-run — nothing actually changed)" : ""}.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
