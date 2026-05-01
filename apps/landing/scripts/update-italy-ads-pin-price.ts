// Replaces RSAs in IT campaign with new ones that pin "Da €6,90/mese" at HEADLINE_2.
// Removes old RSAs, creates new ones with price headline pinned to position 2 + price baked
// into descriptions. Idempotent — safe to re-run.

import { GoogleAdsApi, enums } from "google-ads-api";
import { config } from "dotenv";
import * as path from "path";

config({ path: path.join(process.cwd(), ".env") });

const CAMPAIGN_NAME = "IT — Search — QR Menu (auto)";
const PRICE_HEADLINE = "Da €6,90/mese";
const LANDING_URL = "https://iq-rest.com/it";
const PATH1 = "menu-digitale";
const PATH2 = "ristorante";

// Re-build RSAs per group, all with PRICE_HEADLINE pinned to HEADLINE_2.
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
        "QR menu professionale da €6,90 al mese. Foto AI, multilingua, 14 giorni gratis.",
        "Crea il QR menu del tuo ristorante in 60 secondi. Da €6,90/mese, prova 14 giorni gratis.",
        "Multilingua, ordini diretti, prenotazioni 24/7. Da €6,90/mese, niente carta richiesta.",
        "Tutto in un tap. Setup in 2 minuti, supporto in italiano. Da €6,90 al mese.",
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
        "Pronto in 60 Secondi",
        "Risparmia sulla Stampa",
        "Provalo Gratis 14 Giorni",
        "Ristoranti Italiani",
        "Menu Digitale Italiano",
        "Più Vendite di Piatti",
        "QR Menu IQ Rest",
      ],
      descriptions: [
        "Sostituisci i menu cartacei. QR menu professionale da €6,90 al mese, foto AI incluse.",
        "I clienti scansionano e ordinano. Niente commissioni Uber Eats. Da €6,90/mese.",
        "Setup in 60 secondi dal tuo telefono. 14 giorni gratis, poi solo €6,90 al mese.",
        "Menu in 35 lingue grazie alla traduzione AI. Da €6,90/mese, supporto in italiano.",
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
        "Foto Piatti AI Incluse",
        "Menu Digitale Pronto",
        "Provalo Subito",
        "Tradotto in 35 Lingue",
        "Menu da Cellulare",
        "Carta Vini Digitale",
      ],
      descriptions: [
        "QR menu pronto in 60 secondi per pizzerie, bar, ristoranti. Da €6,90 al mese.",
        "Ordini diretti dal QR, niente Uber Eats. Aggiorna prezzi al volo. Da €6,90/mese.",
        "Funziona in 35 lingue per i tuoi clienti turisti. 14 giorni gratis, poi €6,90/mese.",
        "Tutto incluso: menu, ordini, prenotazioni, sito web. Solo €6,90 al mese.",
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
        "Menu digitale professionale per ristorante. Da €6,90 al mese, foto AI incluse.",
        "Aggiorna prezzi e disponibilità in un tap. 14 giorni di prova, poi €6,90/mese.",
        "Tradotto in 35 lingue per i clienti turisti. Solo €6,90 al mese.",
        "Tutto in uno: menu, ordini, prenotazioni, sito web. Da €6,90/mese.",
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
        "Pronto da Subito",
      ],
      descriptions: [
        "Carta menu digitale che si aggiorna in un tap. Da €6,90 al mese, foto AI incluse.",
        "Più ordini, meno commissioni. Da €6,90/mese, niente carta di credito per provare.",
        "Setup in 60 secondi, niente app. Da €6,90 al mese, supporto in italiano.",
        "14 giorni di prova senza carta. Poi solo €6,90 al mese, supporto in italiano.",
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
      ],
      descriptions: [
        "Sostituisci i menu stampati con un menu digitale professionale. Da €6,90 al mese.",
        "Cambia prezzi in tempo reale dal cellulare. 14 giorni di prova, poi €6,90/mese.",
        "Multilingua in 35 lingue automaticamente. Solo €6,90 al mese, tutto incluso.",
        "Setup in 60 secondi, supporto in italiano sempre disponibile. Da €6,90/mese.",
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
        "Crea il QR menu del tuo ristorante in 60 secondi. Da €6,90 al mese, foto AI incluse.",
        "Setup guidato in 3 step. Pronto subito. Da €6,90/mese, 14 giorni di prova gratis.",
        "Multilingua in 35 lingue, ordini diretti, prenotazioni. Tutto incluso da €6,90/mese.",
        "14 giorni di prova senza carta. Poi solo €6,90 al mese, supporto in italiano.",
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
        "Supporto Italiano",
        "Crea Menu in Cellulare",
        "QR Menu IQ Rest",
      ],
      descriptions: [
        "Crea un menu QR professionale in 3 step semplici. Da €6,90 al mese.",
        "Foto AI generate per ogni piatto. Multilingua. Da €6,90/mese.",
        "Aggiorna in tempo reale dal cellulare. 14 giorni di prova, poi €6,90/mese.",
        "Setup guidato in italiano. Supporto sempre disponibile. Da €6,90/mese.",
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
      ],
      descriptions: [
        "Crea il tuo menu QR in 3 click. Da €6,90 al mese, foto AI incluse.",
        "Niente app da installare, tutto via web. Aggiorna in un tap. Da €6,90/mese.",
        "14 giorni di prova senza carta. Poi solo €6,90 al mese, supporto in italiano.",
        "Pronto in meno di un minuto. Da €6,90 al mese, tutto incluso.",
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
        "Multilingua 35 Lingue",
        "Pronto Subito",
        "Aggiorna in 1 Tap",
        "Menu IQ Rest",
        "Per Bar, Pizzeria, Locale",
        "Menu Professionale",
        "Provalo Subito",
      ],
      descriptions: [
        "Menu digitale per bar, pizzeria o locale. Setup in 60 secondi. Da €6,90 al mese.",
        "Carta vini digitale aggiornabile in tempo reale. Da €6,90/mese, 14 giorni gratis.",
        "Multilingua, foto AI dei piatti incluse. Solo €6,90 al mese, tutto incluso.",
        "Ordini diretti dal QR, niente commissioni. Da €6,90 al mese, supporto in italiano.",
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
        "14 Giorni di Test",
        "Niente Stampa",
        "Aggiorna in Tempo Reale",
        "Menu Smart Bar",
        "Carta Cocktail Digitale",
        "IQ Rest per Locali",
      ],
      descriptions: [
        "Menu bar digitale con QR code. Carta cocktail e vini sempre aggiornata. Da €6,90/mese.",
        "Setup in 60 secondi, foto AI incluse, supporto in italiano. Solo €6,90 al mese.",
        "14 giorni di prova senza carta. Poi €6,90/mese, aggiornamenti illimitati.",
        "Multilingua in 35 lingue automaticamente. Da €6,90 al mese, tutto incluso.",
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
      ],
      descriptions: [
        "QR menu per pizzeria con foto AI di ogni piatto. Da €6,90 al mese, multilingua incluso.",
        "Setup in 60 secondi, niente app da scaricare. Da €6,90/mese, supporto in italiano.",
        "14 giorni di prova senza carta di credito. Solo €6,90 al mese, tutto incluso.",
        "Aggiorna in tempo reale dal cellulare. Da €6,90 al mese, foto AI dei piatti.",
      ],
    },
  ],
};

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

  console.log(`Fetching campaign "${CAMPAIGN_NAME}"...`);
  const campaigns = await customer.query(
    `SELECT campaign.id, campaign.resource_name FROM campaign WHERE campaign.name = '${CAMPAIGN_NAME.replace(/'/g, "\\'")}'`,
  );
  if (campaigns.length === 0) {
    console.error(`Campaign "${CAMPAIGN_NAME}" not found.`);
    process.exit(1);
  }
  const campaignId = (campaigns[0] as any).campaign.id;
  console.log(`  Campaign ID: ${campaignId}`);

  console.log(`Fetching ad groups...`);
  const adGroupsRows = await customer.query(
    `SELECT ad_group.id, ad_group.name, ad_group.resource_name
     FROM ad_group
     WHERE campaign.id = ${campaignId} AND ad_group.status != 'REMOVED'`,
  );
  const adGroups = adGroupsRows.map((r: any) => r.ad_group);
  console.log(`  Found ${adGroups.length} ad groups`);

  for (const ag of adGroups) {
    console.log(`\n→ Ad group "${ag.name}" (${ag.resource_name})`);
    const adsForGroup = ADS[ag.name];
    if (!adsForGroup) {
      console.log(`  No ad template for this group — skipping`);
      continue;
    }

    // Fetch existing RSAs in this ad group
    const existingAdsRows = await customer.query(
      `SELECT ad_group_ad.resource_name, ad_group_ad.ad.type
       FROM ad_group_ad
       WHERE ad_group.id = ${ag.id} AND ad_group_ad.status != 'REMOVED'`,
    );
    const existingAds = existingAdsRows.map((r: any) => r.ad_group_ad);
    console.log(`  Existing ads: ${existingAds.length}`);

    // Remove old RSAs
    if (existingAds.length > 0) {
      const removeOps = existingAds.map((a: any) => a.resource_name);
      await customer.adGroupAds.remove(removeOps);
      console.log(`  Removed ${existingAds.length} old ads`);
    }

    // Create new RSAs with price headline pinned at HEADLINE_2
    const newAdOps = adsForGroup.map((ad) => ({
      ad_group: ag.resource_name,
      status: enums.AdGroupAdStatus.ENABLED,
      ad: {
        final_urls: [LANDING_URL],
        responsive_search_ad: {
          headlines: [
            // First headline (varies per RSA — picks the strongest USP)
            { text: ad.headlines[0].slice(0, 30) },
            // PIN price to position 2 — always shown
            {
              text: PRICE_HEADLINE.slice(0, 30),
              pinned_field: enums.ServedAssetFieldType.HEADLINE_2,
            },
            // Remaining headlines (rotate)
            ...ad.headlines.slice(1).map((h) => ({ text: h.slice(0, 30) })),
          ].slice(0, 15),
          descriptions: ad.descriptions.slice(0, 4).map((d) => ({ text: d.slice(0, 90) })),
          path1: PATH1.slice(0, 15),
          path2: PATH2.slice(0, 15),
        },
      },
    }));

    await customer.adGroupAds.create(newAdOps);
    console.log(`  Created ${newAdOps.length} new ads with "${PRICE_HEADLINE}" pinned at HEADLINE_2`);
  }

  console.log(`\n✓ Done. All RSAs updated with price headline pinned at position 2.`);
}

main().catch((e) => {
  console.error("FAILED:", e);
  if (e?.errors) console.error("Errors:", JSON.stringify(e.errors, null, 2));
  process.exit(1);
});
