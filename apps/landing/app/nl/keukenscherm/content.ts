import { LayoutGrid, Timer } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "nl",
  slug: "keukenscherm",
  trackPrefix: "l_nl_kds",

  meta: {
    title: "Keukenscherm (KDS) voor restaurants | IQ Rest",
    description:
      "Keukenscherm (KDS) voor restaurants: bestellingen vanuit de zaal en het QR menu komen direct op het scherm van de chef. Kolommen per tafel, statussen Wachten / In bereiding / Klaar / Geserveerd, zonefilters. Werkt op tablet of telefoon.",
    canonical: "https://iq-rest.com/nl/keukenscherm",
    ogLocale: "nl_NL",
    ogTitle: "Keukenscherm (KDS) — Bestellingen op het chef-scherm",
    ogDescription:
      "Bestellingen vanuit de zaal op het chef-scherm. Kolommen per tafel, statussen en timer. Eén tik wijzigt de status.",
    brandLine: "IQ Rest — Keukenscherm",
  },

  hero: {
    headline: "Keukenscherm: bestellingen direct naar het chef-scherm.",
    sub: "Papieren bonnen zijn niet meer nodig. Bestellingen vanuit de zaal of het QR menu komen direct op het keukenscherm — met notities, allergenen en timer. Eén tik wijzigt de status. Werkt op een tablet bij de doorgeefluik of een smartphone in de zak van de chef.",
    imageSrc: "/landing/feature-kitchen.webp",
    imageAlt: "Professionele keuken met een tablet op een messing standaard die het keukenscherm toont met actieve bestellingen",
  },

  scan: {
    heading: "Stel het keukenscherm in",
    headingAccent: "in 5 minuten.",
    sub: "Upload een papieren menu of PDF — AI herkent gerechten, categorieën en allergenen. Sluit een tablet aan in de keuken en begin met het ontvangen van bestellingen.",
    cta: "Menu scannen",
  },

  subFeatures: [
    {
      icon: LayoutGrid,
      eyebrow: "Bedieningen en filters",
      heading: "Meerdere schermen per zone: keuken en bar.",
      body: "Plaats aparte tablets bij de warme lijn, de bar of het patisseriestation — elk scherm toont alleen gerechten die bij hem horen. Filters per status (Wachten / In bereiding / Klaar / Geserveerd) en categorie verwijderen ruis: de chef ziet alleen wat relevant is voor zijn post.",
      bullets: [
        "Meerdere KDS-schermen met categoriefilters.",
        "Statusfilter: toon alleen In bereiding en Klaar.",
        "Elke zone ziet alleen zijn eigen bestelstroom.",
      ],
      image: { src: "/landing/feature-kds-filters.webp", alt: "Tablet op een messing standaard bij het keukendoorgeefluik — KDS met statusfilter" },
    },
    {
      icon: Timer,
      eyebrow: "Kaarten en timer",
      heading: "Eén tik wijzigt de status. Notities en allergenen met kleur gemarkeerd.",
      body: "De gerechtkaart toont de gekozen opties (zonder ui, doorbakken), de opmerking van de gast, allergenen en een timer vanaf het moment dat de bestelling is geplaatst. Tik op de kaart en de status gaat over naar de volgende: Wachten → In bereiding → Klaar → Geserveerd. De lijst wordt automatisch gesorteerd op prioriteit.",
      bullets: [
        "Tik op de kaart — directe statuswijziging.",
        "Opties, notities en allergenen met kleur gemarkeerd.",
        "Prioriteitssortering: items die langer wachten gaan naar boven.",
      ],
      image: { src: "/landing/feature-kds-cards.webp", alt: "Tablet op een messing standaard op de bartoog — KDS met bestelkaarten per tafel" },
    },
  ],

  faq: {
    sub: "Wat restauranthouders vragen over het keukenscherm in IQ Rest. Vind je je vraag niet? Stuur ons een bericht op WhatsApp.",
    items: [
      { q: "Welke gerechtstatussen zijn er in de keuken?", a: "Vier statussen met verschillende kaartkleuren: Wachten (grijs) — de bestelling is geaccepteerd en wacht; In bereiding (oranje) — het gerecht wordt bereid; Klaar (blauw) — klaar om te serveren; Geserveerd (groen) — afgegeven aan de gast. Op de kaart tikken verplaatst hem naar de volgende status, zonder menu's of bevestigingen." },
      { q: "Kan ik meerdere KDS-schermen draaien in verschillende zones?", a: "Ja. Eén tablet bij de warme lijn, een andere bij de bar, een derde bij de patisserie — elk met eigen categoriefilter. Alle schermen zijn realtime gesynchroniseerd: een status die op één scherm wordt gewijzigd, wordt overal bijgewerkt." },
      { q: "Welke hardware heb ik nodig om KDS te draaien?", a: "KDS is een webapp die in elke moderne browser draait. Grote keuken — een tablet op een messing standaard bij het doorgeefluik of een tv aan de muur. Kleine zaak — de smartphone van de chef. Geen speciale hardware, geen installatie: open een link en log in op het account." },
      { q: "Waar komen bestellingen op het keukenscherm vandaan?", a: "Vanuit alle bronnen: de gast die bestelde via het QR menu aan tafel; de kelner die de bestelling opnam vanaf zijn telefoon; de gast die de bestelling plaatste vanaf de website. Allemaal komen ze op het KDS met bronlabel en tafelnummer aan. Geen handmatige overdrachten vanuit een POS." },
      { q: "Wat wordt getoond op een bestelkaart?", a: "Gerechtnaam, geselecteerde modifiers (zonder ui, doorbakken, saus toevoegen), gastopmerking, gemarkeerde allergenen, status (Wachten / In bereiding / Klaar / Geserveerd) en een timer die laat zien hoe lang het gerecht heeft gewacht. Kaarten worden gesorteerd op prioriteit: hoe langer de wachttijd, hoe hoger in de kolom." },
      { q: "Kan ik de kaarten op het scherm filteren?", a: "Ja. Twee filters: op status (bijv. toon alleen Wachten en In bereiding, verberg Geserveerd) en op categorie (alleen drank bij de bar, alleen hoofdgerechten in de keuken). De instellingen worden per apparaat opgeslagen — elke zone houdt zijn eigen set." },
    ],
  },
};
