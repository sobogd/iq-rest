// Germany Search campaign — same structure as Italy.
// Per-keyword bids = low_top_of_page × 1.10 (10% buffer), floor €0.20, rounded to €0.01.
// Ab €6,90/Monat pinned at HEADLINE_2. ENABLED on create. Aggressive negatives.
//
// Usage:
//   npx tsx scripts/create-germany-campaign.ts             — LIVE
//   npx tsx scripts/create-germany-campaign.ts --dry-run

import { GoogleAdsApi, enums } from "google-ads-api";
import { config } from "dotenv";
import * as path from "path";
import * as fs from "fs";

config({ path: path.join(process.cwd(), ".env") });

const DRY = process.argv.includes("--dry-run");

const CAMPAIGN_NAME = "DE — Search — QR Speisekarte (auto)";
const DAILY_BUDGET_EUR = 15;
const GERMANY_GEO = "geoTargetConstants/2276";
const GERMAN_LANG = "languageConstants/1001";
const LANDING_URL = "https://iq-rest.com/de";
const PRICE_HEADLINE = "Ab €6,90/Monat";
const PATH1 = "speisekarte";
const PATH2 = "restaurant";
const BUFFER = 1.10;
const FLOOR_EUR = 0.20;

// ── Load keyword research for per-keyword bids ────────────────────────────
const KW_DATA: Array<{ keyword: string; lowCpc: number | null }> = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "scripts/keyword-research-de.json"), "utf-8"),
);
const cpcMap = new Map<string, number>();
for (const r of KW_DATA) {
  if (r.lowCpc != null) cpcMap.set(r.keyword.toLowerCase().trim(), r.lowCpc);
}

function bidMicrosForKeyword(text: string, fallbackEur: number): number {
  const low = cpcMap.get(text.toLowerCase().trim());
  const base = low != null ? low * BUFFER : fallbackEur;
  const eur = Math.max(base, FLOOR_EUR);
  return Math.round((eur * 1_000_000) / 10_000) * 10_000;
}

// ── Ad groups ─────────────────────────────────────────────────────────────
type Match = "EXACT" | "PHRASE" | "BROAD";
interface KW {
  text: string;
  match: Match;
}
interface Group {
  name: string;
  defaultCpcEur: number;
  keywords: KW[];
}

const GROUPS: Group[] = [
  {
    name: "A — Erstellen Intent",
    defaultCpcEur: 1.0,
    keywords: [
      { text: "speisekarte erstellen", match: "EXACT" },
      { text: "speisekarte erstellen", match: "PHRASE" },
      { text: "menükarte erstellen", match: "PHRASE" },
      { text: "menukarte erstellen", match: "PHRASE" },
      { text: "getränkekarten erstellen", match: "PHRASE" },
      { text: "speisekarte designen", match: "PHRASE" },
      { text: "digitale speisekarte erstellen", match: "PHRASE" },
      { text: "qr speisekarte erstellen", match: "PHRASE" },
      { text: "erstellen einer speisekarte", match: "PHRASE" },
    ],
  },
  {
    name: "B — Digitale Speisekarte",
    defaultCpcEur: 1.5,
    keywords: [
      { text: "digitale speisekarte", match: "EXACT" },
      { text: "digitale speisekarte", match: "PHRASE" },
      { text: "speisekarte digital", match: "PHRASE" },
      { text: "elektronische speisekarte", match: "PHRASE" },
      { text: "digitale speisekarte restaurant", match: "PHRASE" },
      { text: "speisekarte online", match: "PHRASE" },
      { text: "digitales menü", match: "PHRASE" },
    ],
  },
  {
    name: "C — QR Speisekarte",
    defaultCpcEur: 1.0,
    keywords: [
      { text: "qr speisekarte", match: "PHRASE" },
      { text: "qr code speisekarte", match: "PHRASE" },
      { text: "speisekarte qr code", match: "PHRASE" },
      { text: "qr menü restaurant", match: "PHRASE" },
      { text: "qr menü", match: "PHRASE" },
      { text: "qr code menü", match: "PHRASE" },
    ],
  },
  {
    name: "D — Gastronomie / Verticals",
    defaultCpcEur: 0.9,
    keywords: [
      { text: "speisekarte gastronomie", match: "PHRASE" },
      { text: "speisekarte cafe", match: "PHRASE" },
      { text: "weinkarte digital", match: "PHRASE" },
      { text: "kassensystem speisekarte", match: "PHRASE" },
      { text: "menu app gastronomie", match: "PHRASE" },
    ],
  },
];

// ── Negatives — heavy due to many German restaurant chain queries ─────────
const NEGATIVES = [
  // Free-seekers (user policy)
  "gratis", "kostenlos", "free", "umsonst",
  // DIY templates (different audience)
  "vorlage", "vorlagen", "template", "druckvorlage",
  "word", "excel", "pdf", "ausdrucken", "druckbar",
  // Restaurant chains / specific cafes (Top 50 from keyword research noise)
  "extrablatt", "extra blatt", "cafe del sol", "del sol", "redo xxl",
  "cafe buur", "café buur", "overkamp", "café central", "cafe central",
  "kneispermühle", "fischerstube", "freisinger hof", "kaffeesaurus",
  "zollenspieker", "waldcafe", "aposto", "kupferkanne", "hofcafé",
  "fähr café", "alte mühle", "café orchidee", "café herzstück",
  "gutshof", "heimathenhof", "kronenhof", "schlichte hof",
  "jadran stuben", "café auszeit", "café am see", "café am neuen see",
  "café in der alten scheune", "café peri", "robin pietsch",
  "schloss lieser", "sakura restaurant", "panda chinese",
  "entenwerder", "bonsberg", "höreth", "hofcafe schild",
  // Fast food chains
  "mcdonalds", "mcdonald", "burger king", "kfc", "subway", "nordsee",
  "starbucks", "domino", "pizza hut",
  // Cooking content (not restaurant ops)
  "rezept", "rezepte", "kochen", "kochbuch",
  // HR
  "stellenangebot", "ausbildung", "praktikum",
  // Consumer / film
  "the menu", "imdb", "netflix", "kinofilm",
];

// ── RSAs (3 per group) — German with €6,90/Monat pinned at HEADLINE_2 ────
const ADS: Record<string, { headlines: string[]; descriptions: string[] }[]> = {
  "A — Erstellen Intent": [
    {
      headlines: [
        "Speisekarte Erstellen",
        "QR Menü in 60 Sekunden",
        "Digitale Speisekarte",
        "Setup in 2 Minuten",
        "14 Tage Testphase",
        "Foto-AI für Gerichte",
        "35 Sprachen Übersetzt",
        "Ohne Kreditkarte",
        "Speisekarte Designen",
        "Tap und Fertig",
        "Menükarte Online",
        "IQ Rest Speisekarte",
        "Sofort Einsetzbar",
        "Restaurant Spezial",
      ],
      descriptions: [
        "Erstelle deine digitale Speisekarte ab €6,90/Monat. Foto-AI inklusive.",
        "Setup in 60 Sekunden. 14 Tage Testphase, keine Kreditkarte erforderlich.",
        "Multilingual in 35 Sprachen. Ab €6,90/Monat — alles inklusive.",
        "Speisekarte vom Smartphone aus aktualisieren. Ab €6,90/Monat.",
      ],
    },
    {
      headlines: [
        "Menü Karte Erstellen",
        "Getränkekarte Online",
        "Digitale Speisekarte",
        "Speisekarte in 1 Tap",
        "Foto-AI Inklusive",
        "Multilingual 35 Sprachen",
        "Setup in 60 Sekunden",
        "14 Tage Testen",
        "Ohne Kreditkarte",
        "Direkt Einsatzbereit",
        "Vom Handy Aktualisiert",
        "Profi-Speisekarte",
        "QR-Code Inklusive",
        "Restaurant Tools",
      ],
      descriptions: [
        "Erstelle Menükarte und Getränkekarte digital. Ab €6,90/Monat.",
        "Foto-AI generiert Bilder für jedes Gericht. Ab €6,90/Monat, 14 Tage gratis.",
        "Aktualisiere Preise in einem Tap vom Handy. Ab €6,90 pro Monat.",
        "Keine App, kein Programmieren. Setup in Minuten — ab €6,90/Monat.",
      ],
    },
    {
      headlines: [
        "Erstellen Speisekarte",
        "Designe Deine Karte",
        "Digital und Praktisch",
        "QR Menu in Sekunden",
        "AI Foto Gerichte",
        "Mehrsprachig Online",
        "Setup ohne Code",
        "Direkt Online Stellen",
        "Mobile Updates",
        "Profi für Gastronomie",
        "Kein Druck Mehr Nötig",
        "Trial 14 Tage",
        "Ohne Karte Testen",
        "IQ Rest Italien",
      ],
      descriptions: [
        "Designe deine Speisekarte online. AI-Fotos, multilingual. Ab €6,90/Monat.",
        "Direkt online ohne Stress. 14 Tage Testphase. Ab €6,90 pro Monat.",
        "Updates vom Handy aus, jederzeit. Profi-Tools — ab €6,90/Monat.",
        "Erstellt in Minuten, sieht wie ein Profi-Job aus. Ab €6,90/Monat.",
      ],
    },
  ],
  "B — Digitale Speisekarte": [
    {
      headlines: [
        "Digitale Speisekarte",
        "Restaurant Speisekarte",
        "Speisekarte Digital",
        "Setup in 60 Sek",
        "Foto-AI Gerichte",
        "14 Tage Testphase",
        "35 Sprachen Inklusive",
        "Tap und Aktualisiert",
        "Ohne Kreditkarte",
        "Profi Lösung",
        "QR-Code Inklusive",
        "Vom Smartphone",
        "Niemals Drucken",
        "IQ Rest Restaurant",
      ],
      descriptions: [
        "Digitale Speisekarte fürs Restaurant. Ab €6,90/Monat, Foto-AI inklusive.",
        "Setup in 60 Sekunden, mehrsprachig. Ab €6,90 pro Monat — alles inklusive.",
        "14 Tage Testphase, ohne Kreditkarte. Ab €6,90/Monat.",
        "Aktualisiere Preise vom Handy in Echtzeit. Ab €6,90 pro Monat.",
      ],
    },
    {
      headlines: [
        "Speisekarte Online",
        "Elektronische Karte",
        "Digital Menu Restaurant",
        "QR-Code für Gäste",
        "Speisekarte Gastronomie",
        "Setup ohne Stress",
        "Profi-Look in 60 Sek",
        "14 Tage Gratis Test",
        "Foto-AI Inklusive",
        "Multilingual 35 Lang",
        "Mobile Verwaltung",
        "Ohne App Download",
        "Direkt Aktualisiert",
        "Restaurant Pro",
      ],
      descriptions: [
        "Speisekarte online — Profi-Look in 60 Sekunden. Ab €6,90/Monat.",
        "Foto-AI für jedes Gericht. Multilingual, mobil. Ab €6,90 pro Monat.",
        "Keine App-Installation, alles im Browser. Ab €6,90/Monat.",
        "14 Tage gratis testen, dann ab €6,90/Monat. Mit deutscher Hilfe.",
      ],
    },
    {
      headlines: [
        "Speisekarte 100% Digital",
        "Restaurant Online Karte",
        "Mehrsprachige Karte",
        "QR Menü Schnell",
        "Foto-AI Generiert",
        "Setup in 1 Minute",
        "Ohne Bankdaten Testen",
        "14 Tage Testphase",
        "Profi-Speisekarte",
        "Aktualisiert in 1 Tap",
        "Vom Handy Aus",
        "Restaurant für Gäste",
        "IQ Rest DE",
        "Profi Look",
      ],
      descriptions: [
        "100% digital. Foto-AI, mehrsprachig, mobil. Ab €6,90/Monat.",
        "Setup in 60 Sekunden. 14 Tage gratis. Dann ab €6,90 pro Monat.",
        "Profi-Speisekarte direkt vom Handy. Alles inklusive ab €6,90/Monat.",
        "Mehrsprachig in 35 Sprachen für Touristen. Ab €6,90 pro Monat.",
      ],
    },
  ],
  "C — QR Speisekarte": [
    {
      headlines: [
        "QR Speisekarte",
        "QR Code Menü Restaurant",
        "Speisekarte QR Code",
        "QR Menü in 60 Sek",
        "Foto-AI Gerichte",
        "14 Tage Testphase",
        "Multilingual Menu",
        "Ohne Kreditkarte",
        "Setup Schnell",
        "Tap und Online",
        "Direkt Bestellen",
        "Mobile Aktualisierung",
        "QR Menu Profi",
        "IQ Rest QR Menu",
      ],
      descriptions: [
        "QR Speisekarte fürs Restaurant. Setup in 60 Sek. Ab €6,90/Monat.",
        "Gäste scannen, sehen Karte, bestellen direkt. Ab €6,90 pro Monat.",
        "Foto-AI für jedes Gericht inklusive. Ab €6,90/Monat, 14 Tage gratis.",
        "Mehrsprachig 35 Sprachen, mobile Updates. Ab €6,90/Monat.",
      ],
    },
    {
      headlines: [
        "QR Code Speisekarte",
        "QR Menu für Gäste",
        "Speisekarte Mit QR",
        "Setup in 60 Sek",
        "Foto-AI Gerichte",
        "Multilingual",
        "14 Tage Testen",
        "Ohne App Erforderlich",
        "Direkt im Browser",
        "QR Code Generiert",
        "Mobile Verwaltung",
        "Speisekarte Italien",
        "Gastro Profi",
        "Restaurant Pro",
      ],
      descriptions: [
        "QR Code Speisekarte — Gäste scannen und bestellen. Ab €6,90/Monat.",
        "Keine App nötig, alles im Browser. Ab €6,90 pro Monat.",
        "Multilingual und mit Foto-AI. Setup in 60 Sek. Ab €6,90/Monat.",
        "14 Tage Testphase ohne Karte. Dann ab €6,90 pro Monat.",
      ],
    },
    {
      headlines: [
        "QR Menü Restaurant",
        "Menü Mit QR Code",
        "Digitales QR Menü",
        "Speisekarte Per QR",
        "Foto-AI Gerichte",
        "Multilingual 35 Lang",
        "Setup Sofort",
        "14 Tage Gratis Test",
        "Ohne Kreditkarte",
        "Mobile Updates",
        "Direkt Im Browser",
        "Restaurant Pro",
        "IQ Rest QR",
        "Schnell Und Einfach",
      ],
      descriptions: [
        "QR Menu professionell aufgesetzt. Ab €6,90/Monat, alles inklusive.",
        "Foto-AI Gerichte, mehrsprachig in 35 Sprachen. Ab €6,90/Monat.",
        "14 Tage Testen ohne Karte. Dann ab €6,90 pro Monat.",
        "Aktualisierung vom Smartphone in Sekunden. Ab €6,90/Monat.",
      ],
    },
  ],
  "D — Gastronomie / Verticals": [
    {
      headlines: [
        "Speisekarte Gastronomie",
        "Speisekarte Cafe",
        "Weinkarte Digital",
        "QR Menü Restaurant",
        "Foto-AI Gerichte",
        "14 Tage Testen",
        "Setup in 60 Sek",
        "Ohne Kreditkarte",
        "Multilingual 35 Lang",
        "Profi für Gastro",
        "Mobile Aktualisierung",
        "Tap und Online",
        "IQ Rest Gastro",
        "Cafe Bar Restaurant",
      ],
      descriptions: [
        "Speisekarte für Gastronomie, Cafe oder Bar. Ab €6,90/Monat.",
        "Weinkarte digital aktualisierbar. Foto-AI inklusive. Ab €6,90/Monat.",
        "Setup in 60 Sekunden, 14 Tage Testphase. Ab €6,90 pro Monat.",
        "Multilingual in 35 Sprachen für Touristen. Ab €6,90 pro Monat.",
      ],
    },
    {
      headlines: [
        "Cafe Speisekarte",
        "Weinkarte Online",
        "Bar Speisekarte",
        "Restaurant Karte Digital",
        "Foto-AI Generiert",
        "Setup Schnell",
        "14 Tage Testphase",
        "Ohne Bankdaten",
        "Mehrsprachig 35 Lang",
        "QR Code Inklusive",
        "Mobile Updates",
        "Profi Gastronomie",
        "IQ Rest Pro",
        "Cocktail Karte Digital",
      ],
      descriptions: [
        "Cafe und Bar Speisekarte digital. Cocktail- und Weinkarte aktualisierbar.",
        "Setup in 60 Sekunden, Foto-AI inklusive. Ab €6,90/Monat.",
        "14 Tage Testphase ohne Karte. Ab €6,90 pro Monat — alles inklusive.",
        "Multilingual für Touristen. Mobile Updates. Ab €6,90/Monat.",
      ],
    },
    {
      headlines: [
        "Restaurant Speisekarte",
        "Cafe Bar Karte Digital",
        "Weinkarte Mit QR",
        "Mehrsprachige Karte",
        "Foto-AI Inklusive",
        "Setup Sofort",
        "14 Tage Gratis Test",
        "Ohne Kreditkarte Testen",
        "Mobile Verwaltung",
        "Direkt Online Stellen",
        "Profi Gastro Tool",
        "Tap Und Aktualisiert",
        "QR Code Generiert",
        "Multilingual 35 Lang",
      ],
      descriptions: [
        "Speisekarte für jedes Restaurant. Ab €6,90/Monat, Foto-AI inklusive.",
        "Cafe, Bar, Pizzeria — alles unterstützt. Setup in Minuten. Ab €6,90/Monat.",
        "14 Tage Testen ohne Karte. Dann ab €6,90 pro Monat.",
        "Aktualisierung vom Handy in Echtzeit. Multilingual. Ab €6,90/Monat.",
      ],
    },
  ],
};

const SITELINKS = [
  { text: "Funktionen", desc1: "Alles was du brauchst", desc2: "in einer Plattform", url: `${LANDING_URL}#features` },
  { text: "Wie es Funktioniert", desc1: "Setup in 60 Sekunden", desc2: "Schritt für Schritt", url: `${LANDING_URL}#how` },
  { text: "Preise", desc1: "Ab €6,90 pro Monat", desc2: "14 Tage Testphase", url: `${LANDING_URL}#pricing` },
  { text: "Häufige Fragen", desc1: "Antworten auf alles", desc2: "was du wissen willst", url: `${LANDING_URL}#faq` },
];

const CALLOUTS = [
  "Setup in 60 Sekunden",
  "Ab €6,90/Monat",
  "14 Tage gratis testen",
  "Ohne Kreditkarte",
  "Deutscher Support",
  "35 Sprachen übersetzt",
  "Foto-AI für Gerichte",
  "Mobile Updates",
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

  console.log(`\n${DRY ? "DRY-RUN" : "LIVE"} — Germany campaign`);
  console.log(`Customer: ${process.env.GOOGLE_ADS_CUSTOMER_ID}\n`);

  // Pre-flight
  const existing = await customer.query(
    `SELECT campaign.id FROM campaign WHERE campaign.name = '${CAMPAIGN_NAME.replace(/'/g, "\\'")}'`,
  );
  if (existing.length > 0) {
    console.error(`ABORT — campaign "${CAMPAIGN_NAME}" exists`);
    process.exit(1);
  }

  // Budget
  console.log(`[1] Budget €${DAILY_BUDGET_EUR}/day`);
  let budgetResource = "customers/X/dry";
  if (!DRY) {
    const r = await customer.campaignBudgets.create([
      {
        name: `${CAMPAIGN_NAME} — Budget`,
        amount_micros: Math.round(DAILY_BUDGET_EUR * 1_000_000),
        delivery_method: enums.BudgetDeliveryMethod.STANDARD,
        explicitly_shared: false,
      },
    ]);
    budgetResource = r.results[0].resource_name;
  }
  console.log(`  ${budgetResource}`);

  // Campaign
  console.log(`\n[2] Campaign`);
  let campaignResource = "customers/X/dry";
  if (!DRY) {
    const r = await customer.campaigns.create([
      {
        name: CAMPAIGN_NAME,
        status: enums.CampaignStatus.ENABLED,
        advertising_channel_type: enums.AdvertisingChannelType.SEARCH,
        manual_cpc: { enhanced_cpc_enabled: false },
        campaign_budget: budgetResource,
        network_settings: {
          target_google_search: true,
          target_search_network: false,
          target_content_network: false,
          target_partner_search_network: false,
        },
        geo_target_type_setting: {
          positive_geo_target_type: enums.PositiveGeoTargetType.PRESENCE_OR_INTEREST,
          negative_geo_target_type: enums.NegativeGeoTargetType.PRESENCE,
        },
        contains_eu_political_advertising:
          enums.EuPoliticalAdvertisingStatus.DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING,
      },
    ]);
    campaignResource = r.results[0].resource_name;
  }
  console.log(`  ${campaignResource}`);

  // Campaign criteria — geo, language, negatives
  console.log(`\n[3] Geo + lang + ${NEGATIVES.length} negatives`);
  const campaignCriteriaOps: any[] = [
    { campaign: campaignResource, location: { geo_target_constant: GERMANY_GEO } },
    { campaign: campaignResource, language: { language_constant: GERMAN_LANG } },
  ];
  for (const neg of NEGATIVES) {
    campaignCriteriaOps.push({
      campaign: campaignResource,
      negative: true,
      keyword: { text: neg, match_type: enums.KeywordMatchType.PHRASE },
    });
  }
  if (!DRY) await customer.campaignCriteria.create(campaignCriteriaOps);

  // Ad groups + per-keyword bids + RSAs
  for (const group of GROUPS) {
    console.log(`\n[4] Ad group "${group.name}" (default €${group.defaultCpcEur})`);
    let adGroupResource = "customers/X/dry";
    if (!DRY) {
      const r = await customer.adGroups.create([
        {
          campaign: campaignResource,
          name: group.name,
          status: enums.AdGroupStatus.ENABLED,
          type: enums.AdGroupType.SEARCH_STANDARD,
          cpc_bid_micros: Math.round(group.defaultCpcEur * 1_000_000),
        },
      ]);
      adGroupResource = r.results[0].resource_name;
    }

    // Keywords with per-keyword bids
    const kwOps: any[] = [];
    for (const kw of group.keywords) {
      const bidMicros = bidMicrosForKeyword(kw.text, group.defaultCpcEur);
      const eur = bidMicros / 1_000_000;
      console.log(`  + "${kw.text}" [${kw.match}] €${eur.toFixed(2)}`);
      kwOps.push({
        ad_group: adGroupResource,
        status: enums.AdGroupCriterionStatus.ENABLED,
        cpc_bid_micros: bidMicros,
        keyword: {
          text: kw.text,
          match_type:
            kw.match === "EXACT"
              ? enums.KeywordMatchType.EXACT
              : kw.match === "PHRASE"
              ? enums.KeywordMatchType.PHRASE
              : enums.KeywordMatchType.BROAD,
        },
      });
    }
    if (!DRY) await customer.adGroupCriteria.create(kwOps);

    // 3 RSAs
    const rsas = ADS[group.name];
    const adOps = rsas.map((ad) => ({
      ad_group: adGroupResource,
      status: enums.AdGroupAdStatus.ENABLED,
      ad: {
        final_urls: [LANDING_URL],
        responsive_search_ad: {
          headlines: [
            { text: ad.headlines[0].slice(0, 30) },
            { text: PRICE_HEADLINE.slice(0, 30), pinned_field: enums.ServedAssetFieldType.HEADLINE_2 },
            ...ad.headlines.slice(1).map((h) => ({ text: h.slice(0, 30) })),
          ].slice(0, 15),
          descriptions: ad.descriptions.slice(0, 4).map((d) => ({ text: d.slice(0, 90) })),
          path1: PATH1.slice(0, 15),
          path2: PATH2.slice(0, 15),
        },
      },
    }));
    if (!DRY) await customer.adGroupAds.create(adOps);
    console.log(`  + ${adOps.length} RSAs with "${PRICE_HEADLINE}" pinned`);
  }

  // Sitelinks + Callouts
  console.log(`\n[5] ${SITELINKS.length} sitelinks + ${CALLOUTS.length} callouts`);
  if (!DRY) {
    const slRes = await customer.assets.create(
      SITELINKS.map((s) => ({
        sitelink_asset: {
          link_text: s.text.slice(0, 25),
          description1: s.desc1.slice(0, 35),
          description2: s.desc2.slice(0, 35),
        },
        final_urls: [s.url],
      })),
    );
    await customer.campaignAssets.create(
      slRes.results.map((r: any) => ({
        campaign: campaignResource,
        asset: r.resource_name,
        field_type: enums.AssetFieldType.SITELINK,
      })),
    );
    const coRes = await customer.assets.create(CALLOUTS.map((c) => ({ callout_asset: { callout_text: c.slice(0, 25) } })));
    await customer.campaignAssets.create(
      coRes.results.map((r: any) => ({
        campaign: campaignResource,
        asset: r.resource_name,
        field_type: enums.AssetFieldType.CALLOUT,
      })),
    );
  }

  console.log(`\n✓ Done. ${DRY ? "DRY" : "LIVE"} — campaign "${CAMPAIGN_NAME}"`);
  console.log(`  https://ads.google.com/aw/campaigns?ocid=${process.env.GOOGLE_ADS_CUSTOMER_ID}`);
}

main().catch((e) => {
  console.error("FAILED:", e);
  if (e?.errors) console.error(JSON.stringify(e.errors, null, 2));
  process.exit(1);
});
