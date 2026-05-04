import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "QR-menu onlinebestilling — restaurantbestillinger uden provision",
    description:
      "Modtag direkte bestillinger fra din QR-menu. Nul provision, ingen Wolt- eller Uber Eats-andel. Gæster scanner, bestiller, betaler — direkte til dig. 14 dages gratis prøveperiode.",
    canonical: "https://iq-rest.com/da/online-orders",
    ogLocale: "da_DK",
    ogTitle: "Onlinebestilling uden provision — direkte bestillinger fra din QR-menu",
    ogDescription:
      "Skift 30 % leveringsappsprovisioner ud med direkte bestillinger. Gæster scanner din QR, bestiller, betaler — hver krone går til dig. 14 dages gratis prøveperiode, intet kort.",
  },

  hero: {
    title: "Direkte bestillinger. Nul provision. Direkte til køkkenet.",
    subtitle:
      "Stop med at betale 30 % til Uber Eats, Glovo og Wolt. Med IQ Rest scanner dine gæster QR-koden, bygger deres bestilling på telefonen, og kvitteringen lander i dit køkken — hver krone bliver hos dig.",
    trustLine: "4,9 · 500+ restauranter i 30+ lande",
  },

  seo: {
    description:
      "Forvandl din QR-menu til et fuldt onlinebestillingssystem uden at give 30 % væk til leveringsapps. Gæster scanner QR-koden, bladrer i menuen på deres sprog, bygger en kurv, sender bestillingen — og du modtager den med bordnummer, øjeblikkeligt. Ingen app-downloads, ingen provisioner, ingen tredjepart mellem dig og din gæst.",
    fullDescription:
      "De fleste restauranter taber penge, før maden overhovedet forlader køkkenet — Uber Eats tager 30 %, Glovo tager 30 %, Wolt tager 30 %. Onlinebestilling gennem IQ Rest fungerer helt anderledes. Bestillingen går direkte fra gæstens telefon til dit dashboard, og hele marginen er din.\n\nBestillingsoplevelsen er bygget specifikt til brug i restauranten: gæster vælger et bord, bladrer i menuen, lægger varer i kurven, efterlader en kommentar til køkkenet og sender. Du ser nye bestillinger i realtid på din telefon eller køkkenskærm, med bordnummer, varer, tilvalg og noter. Marker retter som klar — bordet ser status, og du sparer tjenerne for tiere af ture pr. vagt.\n\nDet virker også til takeaway og afhentning: gæster scanner QR-klistermærket ved døren, afgiver en bestilling og betaler — du behøver ingen separat bestillings-app, ingen separat hjemmeside og intet Stripe-integrationsprojekt.",
    benefitsHeading: "Hvorfor direkte bestilling via IQ Rest slår leveringsappene",
    benefits: [
      "Nul provision på hver bestilling — behold 100 % af omsætningen",
      "Bestillinger flyver til dit dashboard med bordnummer i realtid",
      "Ingen app til gæsterne — de scanner QR og bestiller i browseren",
      "Tilvalg, kommentarer, kostnoter — alt fanges rent",
      "Virker til spise-her, takeaway og afhentning — én menu, tre flows",
      "Indbyggede mersalgsforslag øger gennemsnitsbestillingen",
    ],
  },

  pricing: {
    heading: "Én plan.",
    headingAccent: "Nul provision.",
    sub: "Direkte bestilling, QR-menu, restaurantwebsted og reservationer — alt inkluderet. Ingen gebyrer pr. ordre, intet Stripe-integrationsprojekt.",
  },

  faq: {
    sub: "Alt det restaurantejere spørger om onlinebestilling. Mangler dit spørgsmål? Skriv til os på WhatsApp — rigtige mennesker svarer.",
    items: [
      {
        q: "Tager I provision på bestillingerne?",
        a: "Nul. Hver bestilling fra din QR-menu går direkte til dig — ingen andel til os, ingen Glovo- eller Uber Eats-gebyrer. Ét fast månedsabonnement, det er det. Regnestykket er enkelt: hvis du tager 37.500 kr./md. ind via leveringsapps, taber du 11.250. Skift til direkte bestilling, og de 11.250 bliver i lommen.",
      },
      {
        q: "Hvordan bestiller gæsterne — har de brug for en app?",
        a: "Ingen app. Gæsterne scanner din QR-kode med telefonens kamera, menuen åbner i browseren, de vælger bord, bladrer, lægger i kurv og sender. Hele flowet er to tryk efter scanningen. Ingen App Store-søgning, ingen tilmelding, ingen friktion.",
      },
      {
        q: "Hvordan modtager jeg bestillinger i køkkenet?",
        a: "Bestillinger dukker straks op i dit dashboard, med bordnummer, varer, tilvalg og eventuelle noter. Se dem på telefonen, på en tablet ved passet eller på en køkkenskærm. Marker varer som klar — bordet ser status, færre 'kommer maden snart?' og hurtigere omsætning.",
      },
      {
        q: "Kan gæsterne betale via QR-menuen, eller kun ved bordet?",
        a: "Begge dele. De kan sende bestillingen og betale kontant eller med kort ved bordet på klassisk vis, eller betale online via Stripe direkte gennem menuen. Du bestemmer, hvad der er aktiveret. Onlinebetaling sikres af Stripe — IQ Rest holder aldrig pengene, de går direkte til din Stripe-konto.",
      },
      {
        q: "Virker det til takeaway og afhentning, ikke kun spise-her?",
        a: "Ja. Sæt et QR-klistermærke ved indgangen til takeaway, eller del menulinket på Instagram og WhatsApp. Gæster vælger 'afhentning', bestiller, betaler — du forbereder, de henter. Samme system, tre forskellige bestillingsflows: spise-her, takeaway, afhentning.",
      },
    ],
  },

  finalCta: {
    heading: "Stop med at fodre leveringsappene.",
    headingAccent: "Behold 100 %.",
    sub: "Skift dine 30 % provisioner ud med et fast månedsgebyr. 14 dages gratis prøveperiode. Intet kreditkort. Annuller når som helst.",
  },
};
