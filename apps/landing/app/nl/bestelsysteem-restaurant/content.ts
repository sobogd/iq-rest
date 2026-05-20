import { Map, ClipboardList, Receipt, Smartphone } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "nl",
  slug: "bestelsysteem-restaurant",
  trackPrefix: "l_nl_orders",

  meta: {
    title: "Bestelsysteem voor restaurant — gast en kelner | IQ Rest",
    description:
      "Restaurantbestellingen vanaf telefoon of tablet: vloerplan, rekening splitsen, statussen, opties en notities. Gasten bestellen aan tafel; de kelner neemt bestellingen op vanaf elk apparaat. 14 dagen gratis.",
    canonical: "https://iq-rest.com/nl/bestelsysteem-restaurant",
    ogLocale: "nl_NL",
    ogTitle: "Bestelsysteem voor restaurant — gast en kelner",
    ogDescription:
      "Gast aan tafel of kelner op de telefoon — de bestelling komt direct in de keuken. Vloerplan, rekening splitsen, statussen, opties en notities.",
    brandLine: "IQ Rest — Bestelsysteem voor restaurant",
  },

  hero: {
    headline: "Bestellingen aannemen: gast en kelner — direct naar de keuken.",
    sub: "Gasten bestellen via het QR menu aan tafel of de kelner neemt de bestelling op vanaf een telefoon of tablet — de bestelling komt binnen seconden op het keukenscherm. Vloerplan met kleurgecodeerde tafels, rekening splitsen, flexibele opties en opmerkingen. Geen notitieboeken, geen heen en weer naar de bar.",
    imageSrc: "/landing/feature-orders.webp",
    imageAlt: "Kelner neemt een bestelling op aan tafel vanaf een smartphone — de bestelling komt op het keukenscherm",
  },

  scan: {
    heading: "Stel het bestelsysteem in",
    headingAccent: "in 5 minuten.",
    sub: "Upload een papieren menu of PDF — AI herkent gerechten, prijzen en categorieën. Sluit een tablet aan in de zaal en begin met het opnemen van bestellingen aan de tafels.",
    cta: "Menu scannen",
  },

  subFeatures: [
    {
      icon: Map,
      eyebrow: "Lijst en vloerplan",
      heading: "Bestellijst naast het vloerplan.",
      body: "Alle actieve bestellingen aan de rechterkant: status, totaal, tijd, aantal items. Aan de linkerkant — het vloerplan: tafels gekleurd op status — leeg, bezet, vereist aandacht. Tik op een tafel om een bestelling te openen of aan te maken; tik op een kaart om de detailweergave te openen. Geen schermwissels.",
      bullets: [
        "Vloerplan: tafels gekleurd op bestelstatus.",
        "Bestellijst ernaast — totaal, tijd, aantal items.",
        "Tik op een tafel om een bestelling te openen of aan te maken.",
      ],
      image: { src: "/landing/feature-orders-map.webp", alt: "Tablet bij het kelnerstation: bestellijst en vloerplan met gekleurde tafels" },
    },
    {
      icon: ClipboardList,
      eyebrow: "Bestelkaart",
      heading: "Bestelkaart: statussen, dupliceren, verwijderen — één tik.",
      body: "Elk item heeft zijn eigen status (Wachten / In bereiding / Klaar / Geserveerd) — keuken en kelner zien hetzelfde beeld in realtime. Op de stip tikken opent het actiemenu: status wijzigen, item dupliceren met dezelfde modifiers en opties, verwijderen. Alles binnen de kaart.",
      bullets: [
        "Status per item: Wachten / In bereiding / Klaar / Geserveerd.",
        "Dupliceer een item met één tik met dezelfde opties.",
        "Verwijder een item direct vanaf de kaart.",
      ],
      image: { src: "/landing/feature-orders-detail.webp", alt: "Tablet met de bestelkaart in detail: itemstatussen, dupliceer- en verwijderacties" },
    },
    {
      icon: Receipt,
      eyebrow: "Rekening splitsen",
      heading: "Splits de rekening wanneer gasten apart betalen.",
      body: "Gasten besloten te splitsen — vink de items aan die naar een nieuwe bon gaan; de rest blijft op de huidige. Het systeem toont direct beide totalen. Eén tik op „Bestelling splitsen“ en je hebt twee onafhankelijke bestellingen met correcte totalen, beide nog steeds gekoppeld aan hun tafels.",
      bullets: [
        "Kies items om te splitsen met selectievakjes.",
        "Beide totalen worden direct weergegeven.",
        "Eén tik en de bestelling is gesplitst zonder handmatig rekenen.",
      ],
      image: { src: "/landing/feature-orders-split.webp", alt: "Tablet op een restauranttafel: modal voor rekening splitsen tussen gasten" },
    },
    {
      icon: Smartphone,
      eyebrow: "Toevoegen vanaf mobiel",
      heading: "Voeg items toe vanaf een telefoon — in drie acties.",
      body: "De kelner is niet vastgebonden aan één apparaat: opent het bestellen op zijn telefoon en voegt een item toe in drie stappen — categorie, gerecht, opties (maat, gaarheid, extra saus of ingrediënt). De prijs wordt automatisch herberekend. De notitie voor de keuken komt in de laatste stap.",
      bullets: [
        "Drie stappen: categorie → gerecht → opties.",
        "Opties (maat, toevoegingen, extra's) geprijsd met één klik.",
        "Notitieveld in de laatste stap.",
      ],
      image: { src: "/landing/feature-orders-mobile.webp", alt: "Vier telefoons met de stappen voor het toevoegen van een bestelitem: categorie, gerecht, maat, opmerking" },
    },
  ],

  faq: {
    sub: "Wat restauranthouders vragen over het opnemen van bestellingen in IQ Rest. Vind je je vraag niet? Stuur ons een bericht op WhatsApp.",
    items: [
      { q: "Kunnen meerdere kelners tegelijk werken vanaf verschillende apparaten?", a: "Ja. Elke kelner logt in op het gedeelde restaurantaccount vanaf zijn eigen telefoon of tablet — iedereen ziet dezelfde tafels, bestellingen en statussen in realtime. Wijzigingen door één kelner verschijnen direct bij de anderen, zonder conflicten of vergrendelingen." },
      { q: "Kunnen kelners hun eigen apparaten gebruiken (BYOD)?", a: "Ja. Het is een webapp in de browser — niets te installeren. De kelner opent een link, logt in op het restaurantaccount vanaf zijn iPhone, Android of persoonlijke tablet en begint te werken. Aan het einde van de dienst logt hij gewoon uit." },
      { q: "Kunnen verplichte opties worden toegevoegd aan gerechten (maat, gaarheid, enz.)?", a: "Ja. Elk gerecht kan een willekeurig aantal optiegroepen hebben — verplicht (bijv. „Maat“: Klein / Middel / Groot) en optioneel („Gaarheid“: rauw / medium / doorbakken). Opties kunnen de prijs wijzigen (+1,00 €). Als een groep verplicht is, laat het systeem de gast of kelner het gerecht niet toevoegen zonder een keuze." },
      { q: "Kunnen gasten notities of extra's toevoegen aan een gerecht (brood, saus)?", a: "Ja. De laatste stap van toevoegen heeft een vrij notitieveld („zonder ui“, „doorbakken“, „allergisch voor noten“). Extra's zijn aparte geprijsde modifiers („+ BBQ saus +1,50 €“, „+ Brood +2,00 €“). Notities verschijnen op het keukenscherm, gemarkeerd met kleur." },
      { q: "Zijn er bestelstatistieken?", a: "Ja. De analyticssectie toont: omzet per dag en uur, gemiddelde rekening, topgerechten, gast → bestelling conversie, servicesnelheid (tijd van Wachten tot Geserveerd). Dit helpt bij het plannen van diensten, inkopen en het identificeren van slecht presterende gerechten." },
      { q: "Kunnen bestellingen worden gesplitst of verplaatst tussen tafels?", a: "Ja, beide scenario's worden ondersteund. Splitsen — vink de items aan die naar een nieuwe bon gaan (voor gasten die apart betalen). Verplaatsen — open de bestelkaart, kies een nieuwe tafel; de hele bestelling verhuist daarheen. Geen handmatig rekenen, geen paneel verlaten." },
    ],
  },
};
