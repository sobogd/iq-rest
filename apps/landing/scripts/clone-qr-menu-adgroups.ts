// Add a new "QR Menu (LP)" ad group to the 6 EN regional campaigns + IT + ES.
// Each new group points at the matching /lp/qr-menu-* LP shipped in the
// same release and runs a single RSA + a handful of phrase/exact keywords
// scoped to the qr-menu intent. Existing ad groups stay untouched.

import { GoogleAdsApi, enums } from "google-ads-api";
import { config } from "dotenv";
import * as path from "path";
config({ path: path.join(process.cwd(), ".env") });

const DRY = process.argv.includes("--dry-run");

const CUSTOMER_ID = "6803239831";
const AG_NAME = "QR Menu (LP)";

interface Headline { text: string; pin?: number }
interface RSA {
  finalUrl: string;
  path1: string;
  path2: string;
  headlines: Headline[];
  descriptions: string[];
}

interface CampaignPlan {
  campaignName: string;
  cpcBidMicros: number;
  rsa: RSA;
  keywords: Array<{ text: string; match: "EXACT" | "PHRASE" }>;
}

const EN_RSA: RSA = {
  finalUrl: "https://iq-rest.com/en/lp/qr-menu-for-restaurants",
  path1: "qr-menu",
  path2: "restaurants",
  headlines: [
    { text: "QR Menu for Restaurants" },
    { text: "From €6.90/mo, All Included" },
    { text: "14 Days Free, No Card" },
    { text: "QR Menu Ready in 5 Min" },
    { text: "Printable QR for Tables" },
    { text: "Scan & Order, No App" },
    { text: "Direct Orders, 0 Fee" },
    { text: "Update from Mobile" },
    { text: "35 Languages, AI" },
    { text: "Unlimited QR Codes" },
    { text: "Print-Ready PDF + PNG" },
    { text: "iPhone & Android Ready" },
    { text: "Reservations 24/7" },
    { text: "For Restaurants & Cafés" },
    { text: "Try It Free Now" },
  ],
  descriptions: [
    "QR menu for restaurants. Printable QR at every table, no app to install.",
    "Customers scan with phone camera. Direct orders, zero delivery commissions.",
    "Update menu from mobile, QR stays the same. PDF/PNG ready to print.",
    "From €6.90/month, all included. 14 days free, no card required.",
  ],
};

const EN_KEYWORDS: CampaignPlan["keywords"] = [
  { text: "qr menu", match: "EXACT" },
  { text: "qr menu", match: "PHRASE" },
  { text: "qr menu for restaurants", match: "PHRASE" },
  { text: "qr menu restaurant", match: "PHRASE" },
  { text: "qr code menu", match: "PHRASE" },
  { text: "restaurant qr menu", match: "PHRASE" },
];

// Mirror the existing EN regional campaigns. CPC = 0.01 EUR is the placeholder
// inherited from the source EN campaign — user will tune in UI.
const EN_REGIONAL_CAMPAIGNS = [
  "EN Western",
  "EN Nordics",
  "EN Mediterranean",
  "EN Eastern Visegrad+",
  "EN Eastern Lower",
  "EN British Isles",
];

const IT_RSA: RSA = {
  finalUrl: "https://iq-rest.com/it/lp/menu-qr-code-online-per-ristoranti",
  path1: "menu-qr-code",
  path2: "online-ristoranti",
  headlines: [
    { text: "Menu QR Code per Ristoranti" },
    { text: "Da €6,90/mese, Tutto Incluso" },
    { text: "14 Giorni Gratis, No Carta" },
    { text: "Menu QR Code in 5 Minuti" },
    { text: "QR Code Stampabile" },
    { text: "Scansione Senza App" },
    { text: "Ordini Diretti, 0 Commissioni" },
    { text: "Aggiorni dal Telefono" },
    { text: "35 Lingue con IA" },
    { text: "QR Code Illimitati" },
    { text: "PDF e PNG Pronti" },
    { text: "iPhone e Android" },
    { text: "Prenotazioni 24/7" },
    { text: "Per Ristoranti e Bar" },
    { text: "Provalo Gratis Ora" },
  ],
  descriptions: [
    "Menu QR code per ristoranti. Codice QR stampabile su ogni tavolo, senza app.",
    "I clienti scansionano con la fotocamera. Ordini diretti, zero commissioni.",
    "Aggiorni il menu dal telefono, il QR code resta valido. PDF/PNG per stampa.",
    "Da €6,90/mese, tutto incluso. 14 giorni gratis, senza carta di credito.",
  ],
};

const IT_KEYWORDS: CampaignPlan["keywords"] = [
  { text: "qr code menu", match: "PHRASE" },
  { text: "menu qr code", match: "PHRASE" },
  { text: "menu qrcode", match: "PHRASE" },
  { text: "qrcode ristorante", match: "PHRASE" },
  { text: "qr menu", match: "PHRASE" },
  { text: "qr meny", match: "PHRASE" },
  { text: "menu con qrcode", match: "PHRASE" },
  { text: "qr menu restaurant", match: "PHRASE" },
  { text: "menu online qr code", match: "PHRASE" },
];

const ES_RSA: RSA = {
  finalUrl: "https://iq-rest.com/es/lp/codigo-qr-carta-restaurante",
  path1: "codigo-qr",
  path2: "carta-restaurante",
  headlines: [
    { text: "Código QR para Restaurantes" },
    { text: "Carta QR para Restaurantes" },
    { text: "Desde 6,90€/mes, Todo Incluido" },
    { text: "14 Días Gratis, Sin Tarjeta" },
    { text: "Código QR en 5 Minutos" },
    { text: "QR Imprimible para Mesas" },
    { text: "Escanea Sin App" },
    { text: "Pedidos Directos, 0% Comisión" },
    { text: "Actualiza desde el Móvil" },
    { text: "35 Idiomas con IA" },
    { text: "Carta Digital con QR" },
    { text: "PDF y PNG Listos" },
    { text: "iPhone y Android" },
    { text: "Reservas 24/7" },
    { text: "Pruébalo Gratis Ahora" },
  ],
  descriptions: [
    "Código QR para la carta de tu restaurante. Imprimible en cada mesa, sin app.",
    "Los clientes escanean con la cámara. Pedidos directos, cero comisiones.",
    "Actualiza la carta desde el móvil, el QR sigue válido. PDF/PNG listos.",
    "Desde 6,90€/mes, todo incluido. 14 días gratis, sin tarjeta de crédito.",
  ],
};

const ES_KEYWORDS: CampaignPlan["keywords"] = [
  { text: "codigo qr restaurante", match: "PHRASE" },
  { text: "codigos qr restaurante", match: "PHRASE" },
  { text: "carta qr", match: "PHRASE" },
  { text: "qr carta", match: "PHRASE" },
  { text: "qr carta restaurante", match: "PHRASE" },
  { text: "carta qr restaurante", match: "PHRASE" },
  { text: "menu qr", match: "PHRASE" },
  { text: "qr restaurante", match: "PHRASE" },
];

function plansEN(): CampaignPlan[] {
  return EN_REGIONAL_CAMPAIGNS.map((name) => ({
    campaignName: name,
    // Match the existing ad-group CPC in the EN regionals (0.01 EUR) — user
    // will tune manually post-launch. Keeping consistent so this group does
    // not stand out.
    cpcBidMicros: 10000,
    rsa: EN_RSA,
    keywords: EN_KEYWORDS,
  }));
}

const PLANS: CampaignPlan[] = [
  ...plansEN(),
  { campaignName: "IT", cpcBidMicros: 2_000_000, rsa: IT_RSA, keywords: IT_KEYWORDS },
  { campaignName: "ES", cpcBidMicros: 800_000, rsa: ES_RSA, keywords: ES_KEYWORDS },
];

async function main() {
  const client = new GoogleAdsApi({
    client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
    client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
    developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
  });
  const customer = client.Customer({
    customer_id: CUSTOMER_ID,
    login_customer_id: process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID,
    refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
  });

  console.log(`Mode: ${DRY ? "DRY-RUN" : "LIVE"}\n`);

  for (const plan of PLANS) {
    const cs = await customer.query(
      `SELECT campaign.id, campaign.resource_name FROM campaign WHERE campaign.name = '${plan.campaignName.replace(/'/g, "\\'")}' AND campaign.status != 'REMOVED'`,
    );
    const camp = cs[0]?.campaign;
    if (!camp) {
      console.error(`  SKIP: campaign "${plan.campaignName}" not found`);
      continue;
    }
    console.log(`=== ${plan.campaignName} (id ${camp.id}) ===`);

    const existing = await customer.query(
      `SELECT ad_group.id, ad_group.name FROM ad_group WHERE campaign.id = ${camp.id} AND ad_group.name = '${AG_NAME}' AND ad_group.status != 'REMOVED'`,
    );
    if (existing.length) {
      console.log(`  SKIP: ad group "${AG_NAME}" already exists (id ${existing[0].ad_group?.id})`);
      continue;
    }

    let agResource = `customers/${CUSTOMER_ID}/adGroups/DRY`;
    if (!DRY) {
      const r = await customer.adGroups.create([{
        campaign: camp.resource_name as string,
        name: AG_NAME,
        status: enums.AdGroupStatus.ENABLED,
        type: enums.AdGroupType.SEARCH_STANDARD,
        cpc_bid_micros: plan.cpcBidMicros,
      }]);
      agResource = r.results[0].resource_name as string;
    }
    console.log(`  [+] AG ${AG_NAME} cpc=${plan.cpcBidMicros / 1e6} EUR → ${agResource}`);

    // Positive keywords
    if (!DRY) {
      await customer.adGroupCriteria.create(
        plan.keywords.map((k) => ({
          ad_group: agResource,
          status: enums.AdGroupCriterionStatus.ENABLED,
          keyword: {
            text: k.text,
            match_type:
              k.match === "EXACT" ? enums.KeywordMatchType.EXACT :
              enums.KeywordMatchType.PHRASE,
          },
        })),
      );
    }
    console.log(`  [+] ${plan.keywords.length} keywords`);

    // RSA
    if (!DRY) {
      await customer.adGroupAds.create([{
        ad_group: agResource,
        status: enums.AdGroupAdStatus.ENABLED,
        ad: {
          final_urls: [plan.rsa.finalUrl],
          responsive_search_ad: {
            headlines: plan.rsa.headlines.map((h) => ({
              text: h.text.slice(0, 30),
              ...(h.pin
                ? {
                    pinned_field:
                      h.pin === 1 ? enums.ServedAssetFieldType.HEADLINE_1 :
                      h.pin === 2 ? enums.ServedAssetFieldType.HEADLINE_2 :
                      enums.ServedAssetFieldType.HEADLINE_3,
                  }
                : {}),
            })),
            descriptions: plan.rsa.descriptions.map((d) => ({ text: d.slice(0, 90) })),
            path1: plan.rsa.path1.slice(0, 15),
            path2: plan.rsa.path2.slice(0, 15),
          },
        },
      }]);
    }
    console.log(`  [+] RSA → ${plan.rsa.finalUrl}`);
  }

  console.log(`\n✓ Done. ${DRY ? "DRY-RUN" : "LIVE"} — created QR Menu (LP) ad groups in ${PLANS.length} campaigns.`);
}

main().catch((e) => {
  console.error("FAILED:", e);
  if (e?.errors) console.error(JSON.stringify(e.errors, null, 2));
  process.exit(1);
});
