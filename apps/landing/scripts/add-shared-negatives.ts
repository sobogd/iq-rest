// Adds shared negative keywords to all running Search campaigns.
// Idempotent — checks existing negatives, only adds missing ones.
//
// Use after spotting wasted-spend queries in Google Ads "Search Terms" report.

import { GoogleAdsApi, enums } from "google-ads-api";
import { config } from "dotenv";
import * as path from "path";

config({ path: path.join(process.cwd(), ".env") });

const CAMPAIGN_NAMES = [
  "IT — Search — QR Menu (auto)",
  "DE — Search — QR Speisekarte (auto)",
  "FR — Search — Menu QR (auto)",
  "ES — Search — Carta QR (auto)",
];

// Negatives observed wasting clicks across campaigns. Phrase match unless noted.
const NEW_NEGATIVES = [
  // Free seekers — PHRASE match doesn't morph; add every form
  "gratuitement",     // FR adverb form (escaped past "gratuit")
  "gratuitemente",    // IT adverb form
  "gratuitamente",    // ES/IT adverb form
  "kostenlose",       // DE feminine
  "kostenloses",      // DE neuter
  "kostenlosen",      // DE accusative

  // German restaurants spotted in search-terms report
  "gasthof rose", "flachslanden",
  "großharthau", "grossharthau", "kyffhäuser", "kyffhauser",
  "haxenhaus", "tegel",
  "epoque pliezhausen", "pliezhausen", "l epoque",
  "osteria ingolstadt", "l osteria", "l'osteria",
  "arlinger", "arlinger restaurant",

  // Italian consumer intent ("read menu")
  "leggi menu", "leggi il menu", "guarda menu",

  // Spanish consumer ("ver carta")
  "ver carta", "ver el menu",

  // French consumer ("voir menu")
  "voir menu", "voir le menu", "consulter menu",

  // Generic chains likely to appear later
  "vapiano", "hans im glück", "block house",
  "pho", "asia", "asiatisch",
];

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

  console.log(`Adding ${NEW_NEGATIVES.length} shared negatives to ${CAMPAIGN_NAMES.length} campaigns\n`);

  for (const name of CAMPAIGN_NAMES) {
    const campaigns = await customer.query(
      `SELECT campaign.id, campaign.resource_name FROM campaign WHERE campaign.name = '${name.replace(/'/g, "\\'")}'`,
    );
    if (campaigns.length === 0) {
      console.log(`  skip "${name}" — not found`);
      continue;
    }
    const cId = (campaigns[0] as any).campaign.id;
    const cResource = (campaigns[0] as any).campaign.resource_name;

    // Existing negative keywords on the campaign
    const existing = await customer.query(
      `SELECT campaign_criterion.keyword.text
       FROM campaign_criterion
       WHERE campaign.id = ${cId}
         AND campaign_criterion.negative = TRUE
         AND campaign_criterion.type = 'KEYWORD'`,
    );
    const existingSet = new Set(
      existing.map((r: any) => (r.campaign_criterion?.keyword?.text || "").toLowerCase().trim()),
    );

    const toAdd = NEW_NEGATIVES.filter((n) => !existingSet.has(n.toLowerCase().trim()));
    console.log(`\n→ "${name}"`);
    console.log(`  existing: ${existingSet.size}, will add: ${toAdd.length}`);

    if (toAdd.length === 0) {
      console.log(`  nothing new`);
      continue;
    }

    const ops = toAdd.map((neg) => ({
      campaign: cResource,
      negative: true,
      keyword: { text: neg, match_type: enums.KeywordMatchType.PHRASE },
    }));
    await customer.campaignCriteria.create(ops);
    console.log(`  ✓ added: ${toAdd.join(", ")}`);
  }

  console.log(`\n✓ Done.`);
}

main().catch((e) => {
  console.error("FAILED:", e);
  if (e?.errors) console.error(JSON.stringify(e.errors, null, 2));
  process.exit(1);
});
