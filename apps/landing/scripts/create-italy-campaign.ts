// Creates Italy Search campaign for IQ Rest QR menu landing.
// 4 ad groups, manual CPC, conservative bids, ENABLED on create per user request.
// Keywords + negatives + 3 RSAs per group + sitelinks + callouts.
//
// Pre-flight:
//   - Existing campaign with same name? Script aborts to avoid duplicates.
//   - Run with --dry-run to log what would happen without mutating.
//
// Usage:
//   npx tsx scripts/create-italy-campaign.ts             — creates LIVE campaign
//   npx tsx scripts/create-italy-campaign.ts --dry-run   — log only

import { GoogleAdsApi, enums } from "google-ads-api";
import { config } from "dotenv";
import * as path from "path";

config({ path: path.join(process.cwd(), ".env") });

const DRY = process.argv.includes("--dry-run");

const CAMPAIGN_NAME = "IT — Search — QR Menu (auto)";
const DAILY_BUDGET_EUR = 12;
const ITALY_GEO = "geoTargetConstants/2380";
const ITALIAN_LANG = "languageConstants/1004";
const LANDING_URL = "https://iq-rest.com/it";

// Final-URL paths (display URL only, click goes to LANDING_URL or anchor variant).
const PATH1 = "menu-digitale";
const PATH2 = "ristorante";

// ── Ad-group definitions ─────────────────────────────────────────────────
type Match = "EXACT" | "PHRASE" | "BROAD";
interface KW {
  text: string;
  match: Match;
}
interface Group {
  name: string;
  cpcEur: number;
  finalUrl: string;
  keywords: KW[];
}

const GROUPS: Group[] = [
  {
    name: "A — QR Intent",
    cpcEur: 2.5,
    finalUrl: LANDING_URL,
    keywords: [
      { text: "qr menu ristorante", match: "EXACT" },
      { text: "qr menu ristorante", match: "PHRASE" },
      { text: "qr code menu ristorante", match: "PHRASE" },
      { text: "menu con qr code", match: "PHRASE" },
      { text: "menu qr code", match: "PHRASE" },
      { text: "codice qr menu", match: "PHRASE" },
      { text: "qr code per menu", match: "PHRASE" },
      { text: "menu codice qr", match: "PHRASE" },
      { text: "menu con codice qr", match: "PHRASE" },
      { text: "qr ristorante", match: "PHRASE" },
      { text: "menu ristorante qr code", match: "PHRASE" },
    ],
  },
  {
    name: "B — Menu Digitale B2B",
    cpcEur: 2.0,
    finalUrl: LANDING_URL,
    keywords: [
      { text: "menu digitale ristorante", match: "EXACT" },
      { text: "menu digitale ristorante", match: "PHRASE" },
      { text: "menu digitale ristoranti", match: "PHRASE" },
      { text: "menu digitale per ristoranti", match: "PHRASE" },
      { text: "menu ristorante digitale", match: "PHRASE" },
      { text: "carta menu digitale", match: "PHRASE" },
      { text: "menu digitale qr code", match: "PHRASE" },
      { text: "menu digitale con qr code", match: "PHRASE" },
    ],
  },
  {
    name: "D — Create Intent",
    cpcEur: 2.0,
    finalUrl: LANDING_URL,
    keywords: [
      { text: "creare menu digitale", match: "PHRASE" },
      { text: "come creare un menu digitale", match: "PHRASE" },
      { text: "creare qr code menu ristorante", match: "PHRASE" },
      { text: "creare menu qr code", match: "PHRASE" },
      { text: "come creare un menu con qr code", match: "PHRASE" },
      { text: "come creare menu con qr code", match: "PHRASE" },
      { text: "come fare un menu con qr code", match: "PHRASE" },
      { text: "come fare menu con qr code", match: "PHRASE" },
    ],
  },
  {
    name: "E — Verticals",
    cpcEur: 1.5,
    finalUrl: LANDING_URL,
    keywords: [
      { text: "menu digitale bar", match: "PHRASE" },
      { text: "menu pizzeria qr", match: "PHRASE" },
      { text: "carta dei vini digitale", match: "PHRASE" },
      { text: "menu bar digitale", match: "PHRASE" },
      { text: "menu ristorante multilingua", match: "PHRASE" },
      { text: "menu ristorante traduzione", match: "PHRASE" },
    ],
  },
];

const NEGATIVES = [
  // Free-seekers (user wants out)
  "gratis", "gratuito", "gratuita", "gratuiti", "free",
  // Consumer intent (looking up actual menus)
  "consultare", "vedere", "scaricare", "scarica", "download",
  "pdf", "apk", "android", "iphone", "app store", "play store",
  // HR / employee menus
  "dipendenti", "personale", "lavoro", "assunzioni", "stipendio",
  // Competitor consumer searches
  "mcdonald", "mcdonalds", "burger king", "kfc", "domino", "starbucks",
  // Templates / printables
  "modello", "template", "fac simile", "stampabile", "word", "excel",
];

// ── Responsive Search Ads — 3 per group, custom per group ────────────────
const ADS: Record<string, { headlines: string[]; descriptions: string[] }[]> = {
  "A — QR Intent": [
    {
      headlines: [
        "QR Menu per Ristoranti",
        "Crea il Tuo QR Menu",
        "QR Menu in 60 Secondi",
        "Menu QR Senza Stampa",
        "IQ Rest — QR Menu",
        "14 Giorni di Prova",
        "Senza Carta di Credito",
        "Foto Piatti con AI",
        "Menu Sempre Aggiornato",
        "Setup in 2 Minuti",
        "Multilingua 35 Lingue",
        "QR Menu Professionale",
        "Niente Più Stampa",
        "QR Menu da Mobile",
        "Tutto in Un Tap",
      ],
      descriptions: [
        "Crea il QR menu del tuo ristorante in 60 secondi. 14 giorni gratis, nessuna carta richiesta.",
        "QR menu professionale con foto AI dei piatti. Aggiorna prezzi e disponibilità in un tap.",
        "Multilingua, ordini diretti, prenotazioni 24/7. Stop ai menu stampati e alle commissioni.",
        "Tutto in un tap dal telefono. Setup in 2 minuti, supporto in italiano incluso.",
      ],
    },
    {
      headlines: [
        "Menu QR per Ristorante",
        "Sostituisci i Menu Cartacei",
        "QR Menu Multilingua",
        "Aggiorna Menu in 1 Tap",
        "Foto AI di Ogni Piatto",
        "Ordini QR Diretti",
        "Senza App da Installare",
        "Menu Bello e Veloce",
        "Pronto in 60 Secondi",
        "Risparmia sulla Stampa",
        "Provalo Gratis 14 Giorni",
        "Ristoranti Italiani",
        "Menu Digitale Italiano",
        "Cambia Prezzi in 1 Sec",
        "Più Vendite di Piatti",
      ],
      descriptions: [
        "Sostituisci i menu cartacei con un QR menu professionale. Foto AI di ogni piatto in stile coerente.",
        "I clienti scansionano e ordinano direttamente. Niente commissioni di Uber Eats.",
        "Setup in 60 secondi dal tuo telefono. Provalo gratis per 14 giorni.",
        "Menu disponibile in 35 lingue grazie alla traduzione AI integrata.",
      ],
    },
    {
      headlines: [
        "QR Code Menu Italia",
        "Più Ordini, Meno Stampa",
        "Menu Veloce su Mobile",
        "Setup Gratuito in 60 Sec",
        "Sito Menu Multilingua",
        "QR Menu IQ Rest",
        "Pizzeria, Bar, Ristorante",
        "Ordini Senza Commissioni",
        "Foto Piatti AI Gratis",
        "Menu Digitale Pronto",
        "Provalo Subito Gratis",
        "Tradotto in 35 Lingue",
        "Menu da Cellulare",
        "Carta Vini Digitale",
        "Menu Sempre Online",
      ],
      descriptions: [
        "QR menu pronto in 60 secondi per pizzerie, bar, ristoranti. Foto piatti generate dall'AI.",
        "Ordini diretti dal QR, niente Uber Eats. Aggiorna prezzi e turistici in un tap dal cellulare.",
        "Funziona in 35 lingue per i tuoi clienti turisti. 14 giorni di prova gratuita.",
        "Tutto incluso: menu, ordini, prenotazioni, sito web. Supporto in italiano.",
      ],
    },
  ],
  "B — Menu Digitale B2B": [
    {
      headlines: [
        "Menu Digitale Ristorante",
        "Carta Menu Digitale",
        "Menu Digitale in 60 Sec",
        "IQ Rest Menu Digitale",
        "14 Giorni di Prova",
        "Senza Carta di Credito",
        "Foto Piatti AI Incluse",
        "Multilingua 35 Lingue",
        "Aggiorna Menu in 1 Tap",
        "Setup in 2 Minuti",
        "Menu Bello e Pratico",
        "Tutto da Cellulare",
        "Per Ristoranti e Bar",
        "Menu Sempre Aggiornato",
        "Niente Più Stampa",
      ],
      descriptions: [
        "Menu digitale professionale per il tuo ristorante. Setup in 60 secondi, foto AI incluse.",
        "Aggiorna prezzi e disponibilità dal cellulare in un tap. 14 giorni di prova senza carta.",
        "Tradotto in 35 lingue per i clienti turisti. Multilingua incluso.",
        "Tutto in uno: menu, ordini, prenotazioni, sito web. Supporto in italiano.",
      ],
    },
    {
      headlines: [
        "Carta Menu Digitale",
        "Menu Online Ristorante",
        "Menu Smart Ristorante",
        "Aggiorna in 1 Tap",
        "Foto AI dei Piatti",
        "Menu Multilingua",
        "Setup in 60 Secondi",
        "Provalo 14 Giorni",
        "Senza Stampa",
        "Risparmia Tempo e Soldi",
        "Menu Sempre in Linea",
        "Ordini Diretti via QR",
        "Niente App da Scaricare",
        "Menu Italiano Pro",
        "Pronto da Subito",
      ],
      descriptions: [
        "Carta menu digitale che si aggiorna in un tap. Foto AI di ogni piatto in stile coerente.",
        "Più ordini, meno commissioni. I clienti ordinano direttamente dal QR sul tavolo.",
        "Setup in 60 secondi, niente app da scaricare. Funziona in qualsiasi browser.",
        "14 giorni di prova senza carta di credito. Supporto in italiano sempre disponibile.",
      ],
    },
    {
      headlines: [
        "Menu Ristorante Digitale",
        "Sostituisci i Menu Stampati",
        "Menu Pratico e Veloce",
        "QR Code Incluso",
        "Foto Piatti Generate AI",
        "Cambia Prezzi in 1 Sec",
        "35 Lingue Tradotte",
        "14 Giorni di Test",
        "Niente Carta Richiesta",
        "Supporto in Italiano",
        "Tutto da Cellulare",
        "Setup in Pochi Click",
        "Per Ogni Tipo di Locale",
        "Menu IQ Rest",
        "Provalo Senza Impegno",
      ],
      descriptions: [
        "Sostituisci i menu stampati con un menu digitale professionale. Foto AI dei piatti incluse.",
        "Cambia prezzi e disponibilità in tempo reale dal tuo cellulare.",
        "Multilingua in 35 lingue automaticamente. Perfetto per le zone turistiche.",
        "Setup in 60 secondi, 14 giorni di prova gratuita, supporto in italiano.",
      ],
    },
  ],
  "D — Create Intent": [
    {
      headlines: [
        "Crea il Tuo Menu QR",
        "Crea Menu Digitale",
        "Setup in 60 Secondi",
        "Menu QR Pronto Subito",
        "14 Giorni di Prova",
        "Senza Carta di Credito",
        "Foto AI dei Piatti",
        "Multilingua Incluso",
        "Tutto da Cellulare",
        "Menu Professionale",
        "Crea il Tuo Menu Online",
        "QR Menu Facile",
        "Niente App da Scaricare",
        "IQ Rest Menu",
        "Provalo Subito",
      ],
      descriptions: [
        "Crea il QR menu del tuo ristorante in 60 secondi. Foto AI di ogni piatto incluse.",
        "Setup guidato in 3 step: cucina, nome, email. Pronto subito con esempi pre-caricati.",
        "Multilingua in 35 lingue, ordini diretti, prenotazioni. Tutto incluso.",
        "14 giorni di prova senza carta di credito. Supporto in italiano.",
      ],
    },
    {
      headlines: [
        "Come Creare Menu QR",
        "Menu QR in 3 Step",
        "Setup Veloce e Facile",
        "Crea Subito il Menu",
        "Foto Piatti AI",
        "Multilingua Automatico",
        "Pronto in 60 Sec",
        "Senza Sapere Codice",
        "Per Ristorante o Bar",
        "Menu Professionale",
        "Provalo 14 Giorni",
        "Niente Carta Richiesta",
        "Supporto Italiano",
        "Crea Menu in Cellulare",
        "QR Menu IQ Rest",
      ],
      descriptions: [
        "Crea un menu QR professionale in 3 step semplici. Non serve sapere niente di programmazione.",
        "Foto AI generate per ogni piatto. Multilingua in 35 lingue per turisti.",
        "Aggiorna in tempo reale dal cellulare. 14 giorni di prova gratuita.",
        "Setup guidato in italiano. Supporto sempre disponibile.",
      ],
    },
    {
      headlines: [
        "Crea Menu QR Code",
        "Menu Digitale Facile",
        "3 Click e Sei Pronto",
        "Foto AI Automatiche",
        "Setup in 1 Minuto",
        "Niente App, Tutto Web",
        "14 Giorni di Test",
        "Senza Costi Iniziali",
        "Carta Menu Pronta",
        "Multilingua 35 Lingue",
        "QR Menu Professionale",
        "Provalo Subito Online",
        "Per Ogni Locale",
        "Aggiorna in Tempo Reale",
        "IQ Rest Menu QR",
      ],
      descriptions: [
        "Crea il tuo menu QR in 3 click. Foto AI automatiche, multilingua in 35 lingue.",
        "Niente app da installare, tutto via web. Aggiorna prezzi e disponibilità in un tap.",
        "14 giorni di prova senza carta. Setup guidato in italiano.",
        "Pronto in meno di un minuto. Supporto incluso, sempre in italiano.",
      ],
    },
  ],
  "E — Verticals": [
    {
      headlines: [
        "Menu Digitale Bar",
        "Carta Vini Digitale",
        "Menu Pizzeria QR",
        "Menu Multilingua",
        "Setup in 60 Sec",
        "Foto AI dei Piatti",
        "14 Giorni di Prova",
        "Niente Carta Richiesta",
        "Multilingua 35 Lingue",
        "Pronto Subito",
        "Aggiorna in 1 Tap",
        "Menu IQ Rest",
        "Per Bar, Pizzeria, Locale",
        "Menu Professionale",
        "Provalo Subito",
      ],
      descriptions: [
        "Menu digitale per bar, pizzeria o locale. Setup in 60 secondi con foto AI.",
        "Carta vini digitale aggiornabile in tempo reale. Multilingua per turisti.",
        "14 giorni di prova senza carta di credito. Supporto in italiano incluso.",
        "Ordini diretti dal QR, niente commissioni. Tutto da cellulare.",
      ],
    },
    {
      headlines: [
        "Menu Bar Digitale",
        "Carta dei Vini in QR",
        "Menu Pizzeria Pro",
        "Tutti i Tuoi Locali",
        "Menu Sempre Online",
        "Foto AI Piatti",
        "Multilingua Automatico",
        "Setup Veloce",
        "Provalo Gratis",
        "14 Giorni di Test",
        "Niente Stampa",
        "Aggiorna in Tempo Reale",
        "Menu Smart Bar",
        "Carta Cocktail Digitale",
        "IQ Rest per Locali",
      ],
      descriptions: [
        "Menu bar digitale con QR code. Carta cocktail e vini sempre aggiornata.",
        "Setup in 60 secondi, foto AI incluse, supporto in italiano.",
        "14 giorni di prova senza carta di credito. Aggiorna prezzi al volo.",
        "Multilingua in 35 lingue automaticamente. Perfetto per i turisti.",
      ],
    },
    {
      headlines: [
        "QR Menu per Pizzeria",
        "Menu Digitale Locale",
        "Carta Vini con QR",
        "Menu Multilingua",
        "Foto AI dei Piatti",
        "Setup in 60 Secondi",
        "Senza Carta di Credito",
        "Provalo 14 Giorni",
        "Pronto Subito",
        "Aggiorna in 1 Tap",
        "Menu Smart Italiano",
        "IQ Rest Menu Pro",
        "Per Ogni Tipo di Locale",
        "Tutto da Cellulare",
        "Niente App",
      ],
      descriptions: [
        "QR menu per pizzeria con foto AI di ogni piatto. Multilingua in 35 lingue.",
        "Setup in 60 secondi, niente app da scaricare. Funziona in qualsiasi browser.",
        "14 giorni di prova senza carta di credito. Supporto in italiano sempre incluso.",
        "Aggiorna prezzi e disponibilità in tempo reale dal cellulare.",
      ],
    },
  ],
};

// ── Sitelinks ─────────────────────────────────────────────────────────────
const SITELINKS = [
  { text: "Funzionalità", desc1: "Tutto ciò che serve", desc2: "in un'unica piattaforma", url: `${LANDING_URL}#features` },
  { text: "Come Funziona", desc1: "Setup in 60 secondi", desc2: "guidato passo passo", url: `${LANDING_URL}#how` },
  { text: "Prezzi", desc1: "Piani trasparenti", desc2: "14 giorni di prova", url: `${LANDING_URL}#pricing` },
  { text: "Domande Frequenti", desc1: "Tutte le risposte", desc2: "che cerchi", url: `${LANDING_URL}#faq` },
];

const CALLOUTS = [
  "Setup in 60 secondi",
  "14 giorni gratis",
  "Senza carta di credito",
  "Supporto in italiano",
  "35 lingue tradotte",
  "Foto piatti con AI",
  "Niente commissioni",
  "Tutto da cellulare",
];

// ── Helper logging ────────────────────────────────────────────────────────
function log(s: string) {
  console.log(s);
}
function dryRun(label: string, payload: any) {
  if (DRY) log(`[DRY] ${label}: ${JSON.stringify(payload, null, 2).slice(0, 300)}...`);
}

// ── Main ──────────────────────────────────────────────────────────────────
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

  log(`\n${DRY ? "DRY-RUN — no mutations" : "LIVE — will create campaign"}`);
  log(`Customer: ${process.env.GOOGLE_ADS_CUSTOMER_ID}\n`);

  // ── Pre-flight: check if campaign exists ─────────────────────────────
  log("Pre-flight: checking for existing campaign with same name...");
  const existing = await customer.query(
    `SELECT campaign.id, campaign.name FROM campaign WHERE campaign.name = '${CAMPAIGN_NAME.replace(/'/g, "\\'")}'`,
  );
  if (existing.length > 0) {
    log(`ABORT — campaign "${CAMPAIGN_NAME}" already exists (id=${(existing[0] as any).campaign.id})`);
    log("Delete it manually in Google Ads UI, or change CAMPAIGN_NAME constant in this script.");
    process.exit(1);
  }

  // ── 1. Budget ─────────────────────────────────────────────────────────
  log(`\n[1] Creating campaign budget €${DAILY_BUDGET_EUR}/day...`);
  let budgetResource: string;
  if (DRY) {
    budgetResource = "customers/X/campaignBudgets/dry";
    dryRun("budget", { name: `${CAMPAIGN_NAME} — Budget`, amount: DAILY_BUDGET_EUR });
  } else {
    const r = await customer.campaignBudgets.create([
      {
        name: `${CAMPAIGN_NAME} — Budget`,
        amount_micros: Math.round(DAILY_BUDGET_EUR * 1_000_000),
        delivery_method: enums.BudgetDeliveryMethod.STANDARD,
        explicitly_shared: false,
      },
    ]);
    budgetResource = r.results[0].resource_name;
    log(`  Budget created: ${budgetResource}`);
  }

  // ── 2. Campaign ───────────────────────────────────────────────────────
  log(`\n[2] Creating campaign "${CAMPAIGN_NAME}"...`);
  let campaignResource: string;
  if (DRY) {
    campaignResource = "customers/X/campaigns/dry";
  } else {
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
    log(`  Campaign created: ${campaignResource}`);
  }

  // ── 3. Campaign Criteria — geo, language, negatives, conversion ──────
  log(`\n[3] Adding campaign criteria — geo Italy, lang Italian, ${NEGATIVES.length} negatives...`);
  const campaignCriteriaOps: any[] = [
    { campaign: campaignResource, location: { geo_target_constant: ITALY_GEO } },
    { campaign: campaignResource, language: { language_constant: ITALIAN_LANG } },
  ];
  for (const neg of NEGATIVES) {
    campaignCriteriaOps.push({
      campaign: campaignResource,
      negative: true,
      keyword: { text: neg, match_type: enums.KeywordMatchType.PHRASE },
    });
  }
  if (DRY) {
    dryRun("campaign criteria", { count: campaignCriteriaOps.length });
  } else {
    await customer.campaignCriteria.create(campaignCriteriaOps);
    log(`  ${campaignCriteriaOps.length} criteria added`);
  }

  // ── 4. Ad Groups + Keywords + Ads ─────────────────────────────────────
  for (const group of GROUPS) {
    log(`\n[4] Creating ad group "${group.name}" (max CPC €${group.cpcEur})...`);
    let adGroupResource: string;
    if (DRY) {
      adGroupResource = `customers/X/adGroups/dry-${group.name}`;
    } else {
      const r = await customer.adGroups.create([
        {
          campaign: campaignResource,
          name: group.name,
          status: enums.AdGroupStatus.ENABLED,
          type: enums.AdGroupType.SEARCH_STANDARD,
          cpc_bid_micros: Math.round(group.cpcEur * 1_000_000),
        },
      ]);
      adGroupResource = r.results[0].resource_name;
      log(`  Ad group: ${adGroupResource}`);
    }

    // Keywords
    log(`  Adding ${group.keywords.length} keywords...`);
    const kwOps = group.keywords.map((kw) => ({
      ad_group: adGroupResource,
      status: enums.AdGroupCriterionStatus.ENABLED,
      keyword: {
        text: kw.text,
        match_type:
          kw.match === "EXACT"
            ? enums.KeywordMatchType.EXACT
            : kw.match === "PHRASE"
            ? enums.KeywordMatchType.PHRASE
            : enums.KeywordMatchType.BROAD,
      },
    }));
    if (DRY) {
      dryRun("keywords", { count: kwOps.length });
    } else {
      await customer.adGroupCriteria.create(kwOps);
      log(`    ${kwOps.length} keywords added`);
    }

    // 3 RSAs per group
    const rsas = ADS[group.name];
    log(`  Creating ${rsas.length} responsive search ads...`);
    const adOps = rsas.map((ad) => ({
      ad_group: adGroupResource,
      status: enums.AdGroupAdStatus.ENABLED,
      ad: {
        final_urls: [group.finalUrl],
        responsive_search_ad: {
          headlines: ad.headlines.slice(0, 15).map((h) => ({ text: h.slice(0, 30) })),
          descriptions: ad.descriptions.slice(0, 4).map((d) => ({ text: d.slice(0, 90) })),
          path1: PATH1.slice(0, 15),
          path2: PATH2.slice(0, 15),
        },
      },
    }));
    if (DRY) {
      dryRun("RSAs", { count: adOps.length });
    } else {
      await customer.adGroupAds.create(adOps);
      log(`    ${adOps.length} RSAs added`);
    }
  }

  // ── 5. Sitelinks (assets) + attach to campaign ───────────────────────
  log(`\n[5] Creating ${SITELINKS.length} sitelink assets + ${CALLOUTS.length} callouts...`);
  if (DRY) {
    dryRun("sitelinks", { count: SITELINKS.length });
    dryRun("callouts", { count: CALLOUTS.length });
  } else {
    // Sitelinks
    const sitelinkOps = SITELINKS.map((s) => ({
      sitelink_asset: {
        link_text: s.text.slice(0, 25),
        description1: s.desc1.slice(0, 35),
        description2: s.desc2.slice(0, 35),
      },
      final_urls: [s.url],
    }));
    const slRes = await customer.assets.create(sitelinkOps);
    const slCampaignOps = slRes.results.map((r: any) => ({
      campaign: campaignResource,
      asset: r.resource_name,
      field_type: enums.AssetFieldType.SITELINK,
    }));
    await customer.campaignAssets.create(slCampaignOps);
    log(`  ${SITELINKS.length} sitelinks attached`);

    // Callouts
    const calloutOps = CALLOUTS.map((c) => ({
      callout_asset: { callout_text: c.slice(0, 25) },
    }));
    const coRes = await customer.assets.create(calloutOps);
    const coCampaignOps = coRes.results.map((r: any) => ({
      campaign: campaignResource,
      asset: r.resource_name,
      field_type: enums.AssetFieldType.CALLOUT,
    }));
    await customer.campaignAssets.create(coCampaignOps);
    log(`  ${CALLOUTS.length} callouts attached`);
  }

  log(`\n✓ Done. Campaign "${CAMPAIGN_NAME}" is ${DRY ? "(dry-run)" : "LIVE"}.`);
  log(`  Manage in Google Ads UI: https://ads.google.com/aw/campaigns?ocid=${process.env.GOOGLE_ADS_CUSTOMER_ID}`);
}

main().catch((e) => {
  console.error("\nFAILED:", e);
  if (e?.errors) console.error("Errors:", JSON.stringify(e.errors, null, 2));
  process.exit(1);
});
