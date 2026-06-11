// France Search campaign — same pattern as Italy/Germany.
// Per-keyword bids = low_top_of_page × 1.10 (10% buffer), floor €0.20.
// "À partir de 6,90€/mois" pinned at HEADLINE_2. ENABLED on create. Heavy negatives.

import { GoogleAdsApi, enums } from "google-ads-api";
import { config } from "dotenv";
import * as path from "path";
import * as fs from "fs";

config({ path: path.join(process.cwd(), ".env") });

const DRY = process.argv.includes("--dry-run");

const CAMPAIGN_NAME = "FR — Search — Menu QR (auto)";
const DAILY_BUDGET_EUR = 15;
const FRANCE_GEO = "geoTargetConstants/2250";
const FRENCH_LANG = "languageConstants/1002";
const LANDING_URL = "https://iq-rest.com/fr";
const PRICE_HEADLINE = "À partir de 6,90€/mois";
const PATH1 = "menu-digital";
const PATH2 = "restaurant";
const BUFFER = 1.10;
const FLOOR_EUR = 0.20;

// Per-keyword bid lookup
const KW_DATA: Array<{ keyword: string; lowCpc: number | null }> = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "scripts/keyword-research-fr.json"), "utf-8"),
);
const cpcMap = new Map<string, number>();
for (const r of KW_DATA) if (r.lowCpc != null) cpcMap.set(r.keyword.toLowerCase().trim(), r.lowCpc);

function bidMicrosForKeyword(text: string, fallbackEur: number): number {
  const low = cpcMap.get(text.toLowerCase().trim());
  const base = low != null ? low * BUFFER : fallbackEur;
  const eur = Math.max(base, FLOOR_EUR);
  return Math.round((eur * 1_000_000) / 10_000) * 10_000;
}

type Match = "EXACT" | "PHRASE" | "BROAD";
interface KW { text: string; match: Match; }
interface Group { name: string; defaultCpcEur: number; keywords: KW[]; }

const GROUPS: Group[] = [
  {
    name: "A — QR Intent",
    defaultCpcEur: 1.5,
    keywords: [
      { text: "qr code restaurant", match: "EXACT" },
      { text: "qr code restaurant", match: "PHRASE" },
      { text: "qr code resto", match: "PHRASE" },
      { text: "menu qr code", match: "PHRASE" },
      { text: "qr code menu restaurant", match: "PHRASE" },
      { text: "qr menu restaurant", match: "PHRASE" },
      { text: "menu restaurant qr code", match: "PHRASE" },
      { text: "menu qr code restaurant", match: "PHRASE" },
      { text: "qr menu", match: "PHRASE" },
      { text: "qr restaurant", match: "PHRASE" },
      { text: "carte restaurant qr code", match: "PHRASE" },
    ],
  },
  {
    name: "B — Menu Digital",
    defaultCpcEur: 1.2,
    keywords: [
      { text: "menu digital restaurant", match: "EXACT" },
      { text: "menu digital restaurant", match: "PHRASE" },
      { text: "menu digitalisé", match: "PHRASE" },
      { text: "menu numérique", match: "PHRASE" },
      { text: "menu numérique restaurant", match: "PHRASE" },
      { text: "carte digitale restaurant", match: "PHRASE" },
      { text: "carte numérique restaurant", match: "PHRASE" },
      { text: "menu en ligne restaurant", match: "PHRASE" },
      { text: "restaurant digital", match: "PHRASE" },
      { text: "menuboard digital", match: "PHRASE" },
    ],
  },
  {
    name: "C — Create Intent",
    defaultCpcEur: 1.0,
    keywords: [
      { text: "créer une carte de menu", match: "PHRASE" },
      { text: "creation carte restaurant", match: "PHRASE" },
      { text: "creer carte menu", match: "PHRASE" },
      { text: "creer une carte menu", match: "PHRASE" },
      { text: "créer carte restaurant", match: "PHRASE" },
      { text: "créer une carte restaurant", match: "PHRASE" },
      { text: "créer sa carte de restaurant", match: "PHRASE" },
      { text: "logiciel création menu", match: "PHRASE" },
      { text: "menu restaurant application", match: "PHRASE" },
      { text: "creer carte restaurant", match: "PHRASE" },
    ],
  },
  {
    name: "D — Verticals",
    defaultCpcEur: 1.0,
    keywords: [
      { text: "qr code table restaurant", match: "PHRASE" },
      { text: "qr code pour restaurant", match: "PHRASE" },
      { text: "qr code carte restaurant", match: "PHRASE" },
      { text: "carte des vins numérique", match: "PHRASE" },
      { text: "menu sans contact", match: "PHRASE" },
      { text: "exemple qr code restaurant", match: "PHRASE" },
    ],
  },
];

// Heavy negatives — France has many specific restaurant names + free-seekers + PDF/template intent
const NEGATIVES = [
  // Free seekers (user policy)
  "gratuit", "gratuite", "gratuité", "free",
  // Templates / PDF / customize
  "pdf", "personnaliser", "modèle", "modele", "template", "word", "excel",
  // Specific restaurant chains / individual places (top noise from research)
  "pedra alta", "restaurant 786", "acte 2", "saint bonnet le froid",
  "tonton pizza", "big fernand", "g la dalle", "clichy sous bois",
  "216 district", "grasse", "buffalo grill",
  // Fast food consumer
  "mcdo", "mcdonalds", "mcdonald", "burger king", "kfc", "tacos",
  "subway", "domino", "pizza hut", "quick", "starbucks",
  // Cooking / recipes (not restaurant ops)
  "recette", "recettes", "cuisiner", "cuisine maison",
  // Generic noise
  "menu boisson", "menu enfant", "fast food",
];

const ADS: Record<string, { headlines: string[]; descriptions: string[] }[]> = {
  "A — QR Intent": [
    {
      headlines: [
        "QR Code Menu Restaurant",
        "Créez Votre QR Menu",
        "Menu QR en 60 Secondes",
        "Sans Imprimer",
        "IQ Rest QR Menu",
        "14 Jours Gratuits",
        "Sans Carte Bancaire",
        "Photos AI des Plats",
        "Menu Multilingue",
        "Setup en 2 Minutes",
        "Mise à Jour en 1 Tap",
        "Sans Application",
        "QR Menu Pro",
        "Pour Tous Restaurants",
      ],
      descriptions: [
        "Menu QR professionnel à partir de 6,90€/mois. Photos AI des plats incluses.",
        "Créez votre menu QR en 60 secondes. À partir de 6,90€/mois, 14 jours d'essai.",
        "Multilingue 35 langues, commandes directes. À partir de 6,90€/mois.",
        "Tout en un tap depuis le téléphone. À partir de 6,90€ par mois.",
      ],
    },
    {
      headlines: [
        "Menu QR Restaurant",
        "Remplacez les Menus Papier",
        "QR Menu Multilingue",
        "Photos AI des Plats",
        "Commandes Directes QR",
        "Sans Application",
        "Setup en 60 Sec",
        "Économisez sur Impression",
        "Restaurants Français",
        "Menu Digital Pro",
        "QR Menu IQ Rest",
        "Pizzeria Bar Restaurant",
        "Sans Commission UberEats",
        "Mise à Jour Mobile",
      ],
      descriptions: [
        "Remplacez les menus papier. Menu QR pro à partir de 6,90€/mois.",
        "Les clients scannent et commandent. Sans commission. À partir de 6,90€/mois.",
        "Setup en 60 secondes depuis votre téléphone. À partir de 6,90€/mois.",
        "Menu en 35 langues grâce à l'AI. À partir de 6,90€/mois, support en français.",
      ],
    },
    {
      headlines: [
        "QR Code Menu France",
        "Plus de Commandes",
        "Menu Mobile Rapide",
        "Setup Gratuit 60 Sec",
        "Menu Site Multilingue",
        "QR Menu IQ Rest",
        "Pizzeria, Bar, Resto",
        "Sans Commissions",
        "Photos AI Incluses",
        "Menu Digital Prêt",
        "Essayez Maintenant",
        "Traduit en 35 Langues",
        "Menu Depuis Mobile",
        "Carte des Vins Digital",
      ],
      descriptions: [
        "QR menu prêt en 60 secondes pour pizzeria, bar, restaurant. À partir de 6,90€/mois.",
        "Commandes directes QR, sans Uber Eats. À partir de 6,90€/mois.",
        "35 langues pour vos clients touristes. 14 jours gratuits, puis 6,90€/mois.",
        "Tout inclus: menu, commandes, réservations. À partir de 6,90€/mois.",
      ],
    },
  ],
  "B — Menu Digital": [
    {
      headlines: [
        "Menu Digital Restaurant",
        "Carte Menu Digital",
        "Menu Numérique en 60 Sec",
        "IQ Rest Menu Digital",
        "14 Jours d'Essai",
        "Sans Carte Bancaire",
        "Photos AI Incluses",
        "Multilingue 35 Langues",
        "Mise à Jour en 1 Tap",
        "Setup en 2 Minutes",
        "Menu Pro et Beau",
        "Tout Depuis Mobile",
        "Pour Restaurants et Bars",
        "Toujours à Jour",
      ],
      descriptions: [
        "Menu digital pro pour restaurant. À partir de 6,90€/mois, photos AI incluses.",
        "Mise à jour des prix en 1 tap. 14 jours d'essai, puis 6,90€/mois.",
        "Traduit en 35 langues pour les touristes. À partir de 6,90€/mois.",
        "Tout en un: menu, commandes, réservations, site. À partir de 6,90€/mois.",
      ],
    },
    {
      headlines: [
        "Menu Numérique Restaurant",
        "Carte Restaurant Online",
        "Restaurant Smart",
        "Mise à Jour 1 Tap",
        "Photos AI des Plats",
        "Menu Multilingue",
        "Setup en 60 Sec",
        "Essayez 14 Jours",
        "Sans Impression",
        "Économise Temps Argent",
        "Toujours en Ligne",
        "Commandes QR Direct",
        "Sans App à Télécharger",
        "Menu France Pro",
      ],
      descriptions: [
        "Carte menu numérique mise à jour en 1 tap. À partir de 6,90€/mois.",
        "Plus de commandes, moins de commission. À partir de 6,90€/mois.",
        "Setup en 60 secondes, sans app. À partir de 6,90€/mois, support en français.",
        "14 jours d'essai sans carte. Puis 6,90€/mois, support FR toujours dispo.",
      ],
    },
    {
      headlines: [
        "Menu Restaurant Digital",
        "Remplacer Menus Imprimés",
        "Menu Pratique et Rapide",
        "QR Code Inclus",
        "Photos AI Générées",
        "Changer Prix en 1 Sec",
        "35 Langues Traduites",
        "14 Jours d'Essai",
        "Sans Carte Bancaire",
        "Support Français",
        "Tout Depuis Mobile",
        "Setup en Quelques Clics",
        "Pour Tous Locaux",
        "Menu IQ Rest",
      ],
      descriptions: [
        "Remplacez les menus imprimés par menu digital pro. À partir de 6,90€/mois.",
        "Changez prix et dispo en temps réel depuis mobile.",
        "Multilingue 35 langues automatique. Parfait zones touristiques.",
        "Setup 60 secondes, 14 jours d'essai, support en français.",
      ],
    },
  ],
  "C — Create Intent": [
    {
      headlines: [
        "Créez Votre Carte Menu",
        "Création Carte Restaurant",
        "Setup en 60 Secondes",
        "Menu QR Prêt Vite",
        "14 Jours d'Essai",
        "Sans Carte Bancaire",
        "Photos AI des Plats",
        "Multilingue Inclus",
        "Tout Depuis Mobile",
        "Menu Professionnel",
        "Créer Carte en Ligne",
        "QR Menu Facile",
        "Sans App",
        "IQ Rest Menu",
      ],
      descriptions: [
        "Créez votre carte menu en 60 secondes. À partir de 6,90€/mois, photos AI.",
        "Setup guidé en 3 étapes. Prêt immédiat. À partir de 6,90€/mois, 14 jours gratuits.",
        "Multilingue 35 langues, commandes directes. Tout inclus à partir de 6,90€/mois.",
        "14 jours d'essai sans carte. Puis 6,90€/mois, support en français.",
      ],
    },
    {
      headlines: [
        "Comment Créer Menu QR",
        "Menu QR en 3 Étapes",
        "Setup Rapide et Facile",
        "Créer Menu Tout de Suite",
        "Photos Plats AI",
        "Multilingue Auto",
        "Prêt en 60 Sec",
        "Sans Savoir Coder",
        "Pour Restaurant ou Bar",
        "Menu Pro",
        "Essayez 14 Jours",
        "Support Français",
        "Créer Menu Mobile",
        "QR Menu IQ Rest",
      ],
      descriptions: [
        "Créez un menu QR pro en 3 étapes simples. À partir de 6,90€/mois.",
        "Photos AI générées pour chaque plat. Multilingue. À partir de 6,90€/mois.",
        "Mise à jour temps réel mobile. 14 jours d'essai, puis 6,90€/mois.",
        "Setup guidé en français. Support FR toujours dispo. À partir de 6,90€/mois.",
      ],
    },
    {
      headlines: [
        "Créer Menu QR Code",
        "Menu Digital Facile",
        "3 Clics et C'est Prêt",
        "Photos AI Auto",
        "Setup en 1 Minute",
        "Sans App, Tout Web",
        "14 Jours d'Essai",
        "Sans Frais Initial",
        "Carte Menu Prête",
        "Multilingue 35 Langues",
        "QR Menu Pro",
        "Essayez Online",
        "Pour Tous Locaux",
        "MAJ Temps Réel",
      ],
      descriptions: [
        "Créez votre menu QR en 3 clics. À partir de 6,90€/mois, photos AI incluses.",
        "Sans app à installer, tout via web. MAJ en un tap. À partir de 6,90€/mois.",
        "14 jours d'essai sans carte. Puis 6,90€/mois, support en français.",
        "Prêt en moins d'une minute. À partir de 6,90€/mois, tout inclus.",
      ],
    },
  ],
  "D — Verticals": [
    {
      headlines: [
        "QR Code Table Restaurant",
        "Carte Vins Numérique",
        "Menu Sans Contact",
        "QR Code Pour Restaurant",
        "Photos AI des Plats",
        "Setup en 60 Sec",
        "14 Jours d'Essai",
        "Sans Carte Bancaire",
        "Multilingue 35 Lang",
        "Menu Pro Restaurant",
        "Mise à Jour Mobile",
        "Tap et Online",
        "IQ Rest QR",
        "Pour Tous Locaux",
      ],
      descriptions: [
        "QR code table restaurant. Setup en 60 secondes. À partir de 6,90€/mois.",
        "Carte des vins numérique mise à jour en temps réel. À partir de 6,90€/mois.",
        "Multilingue, photos AI incluses. À partir de 6,90€/mois, support FR.",
        "Commandes directes QR, sans commission. À partir de 6,90€/mois.",
      ],
    },
    {
      headlines: [
        "Menu Sans Contact",
        "QR Code Pour Resto",
        "Carte Vins QR",
        "Menu Digital Pro",
        "Sans Stress",
        "Setup Rapide",
        "14 Jours Gratuits",
        "Sans Carte Bancaire",
        "Multilingue Auto",
        "Photos AI Plats",
        "MAJ Mobile",
        "Menu Restaurant Pro",
        "Cocktail Carte Digital",
        "IQ Rest Locaux",
      ],
      descriptions: [
        "Menu sans contact pour restaurant, bar, café. À partir de 6,90€/mois.",
        "Setup 60 sec, photos AI, support FR. À partir de 6,90€/mois.",
        "14 jours d'essai sans carte. Puis 6,90€/mois, MAJ illimitées.",
        "Multilingue 35 langues automatique. À partir de 6,90€/mois.",
      ],
    },
    {
      headlines: [
        "QR Menu Pour Pizzeria",
        "Menu Digital Local",
        "Carte Vins QR",
        "Menu Multilingue",
        "Photos AI des Plats",
        "Setup en 60 Sec",
        "Sans Carte Bancaire",
        "Essayez 14 Jours",
        "Prêt de Suite",
        "MAJ en 1 Tap",
        "Menu Smart France",
        "IQ Rest Menu Pro",
        "Tous Types Locaux",
        "Tout Depuis Mobile",
      ],
      descriptions: [
        "QR menu avec photos AI pour pizzeria. À partir de 6,90€/mois, multilingue.",
        "Setup 60 sec, sans app. À partir de 6,90€/mois, support en français.",
        "14 jours d'essai sans carte. À partir de 6,90€/mois, tout inclus.",
        "MAJ temps réel depuis mobile. À partir de 6,90€/mois, photos AI.",
      ],
    },
  ],
};

const SITELINKS = [
  { text: "Fonctionnalités", desc1: "Tout ce qu'il vous faut", desc2: "en une plateforme", url: `${LANDING_URL}#features` },
  { text: "Comment Ça Marche", desc1: "Setup en 60 secondes", desc2: "guidé étape par étape", url: `${LANDING_URL}#how` },
  { text: "Tarifs", desc1: "À partir de 6,90€/mois", desc2: "14 jours d'essai", url: `${LANDING_URL}#pricing` },
  { text: "Questions Fréquentes", desc1: "Toutes les réponses", desc2: "que vous cherchez", url: `${LANDING_URL}#faq` },
];

const CALLOUTS = [
  "Setup en 60 secondes",
  "À partir de 6,90€/mois",
  "14 jours d'essai gratuit",
  "Sans carte bancaire",
  "Support en français",
  "35 langues traduites",
  "Photos AI des plats",
  "Tout depuis mobile",
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

  console.log(`\n${DRY ? "DRY-RUN" : "LIVE"} — France campaign\n`);

  const existing = await customer.query(
    `SELECT campaign.id FROM campaign WHERE campaign.name = '${CAMPAIGN_NAME.replace(/'/g, "\\'")}'`,
  );
  if (existing.length > 0) {
    console.error(`ABORT — campaign "${CAMPAIGN_NAME}" exists`);
    process.exit(1);
  }

  console.log(`[1] Budget €${DAILY_BUDGET_EUR}/day`);
  let budgetResource = "customers/X/dry";
  if (!DRY) {
    const r = await customer.campaignBudgets.create([{
      name: `${CAMPAIGN_NAME} — Budget`,
      amount_micros: Math.round(DAILY_BUDGET_EUR * 1_000_000),
      delivery_method: enums.BudgetDeliveryMethod.STANDARD,
      explicitly_shared: false,
    }]);
    budgetResource = r.results[0].resource_name as string;
  }
  console.log(`  ${budgetResource}`);

  console.log(`\n[2] Campaign`);
  let campaignResource = "customers/X/dry";
  if (!DRY) {
    const r = await customer.campaigns.create([{
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
    }]);
    campaignResource = r.results[0].resource_name as string;
  }
  console.log(`  ${campaignResource}`);

  console.log(`\n[3] Geo + lang + ${NEGATIVES.length} negatives`);
  const campaignCriteriaOps: any[] = [
    { campaign: campaignResource, location: { geo_target_constant: FRANCE_GEO } },
    { campaign: campaignResource, language: { language_constant: FRENCH_LANG } },
  ];
  for (const neg of NEGATIVES) {
    campaignCriteriaOps.push({
      campaign: campaignResource,
      negative: true,
      keyword: { text: neg, match_type: enums.KeywordMatchType.PHRASE },
    });
  }
  if (!DRY) await customer.campaignCriteria.create(campaignCriteriaOps);

  for (const group of GROUPS) {
    console.log(`\n[4] Ad group "${group.name}" (default €${group.defaultCpcEur})`);
    let adGroupResource = "customers/X/dry";
    if (!DRY) {
      const r = await customer.adGroups.create([{
        campaign: campaignResource,
        name: group.name,
        status: enums.AdGroupStatus.ENABLED,
        type: enums.AdGroupType.SEARCH_STANDARD,
        cpc_bid_micros: Math.round(group.defaultCpcEur * 1_000_000),
      }]);
      adGroupResource = r.results[0].resource_name as string;
    }

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
            kw.match === "EXACT" ? enums.KeywordMatchType.EXACT
            : kw.match === "PHRASE" ? enums.KeywordMatchType.PHRASE
            : enums.KeywordMatchType.BROAD,
        },
      });
    }
    if (!DRY) await customer.adGroupCriteria.create(kwOps);

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
