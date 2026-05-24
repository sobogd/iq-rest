import { Languages, ShieldAlert, Palette, ShoppingCart } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "nl",
  slug: "qr-code-menukaart-restaurant",
  trackPrefix: "l_nl_qr",

  meta: {
    title: "QR-code menukaart voor restaurants | IQ Rest",
    description:
      "QR-code menukaart voor restaurants: de gast scant de QR op tafel, opent de kaart in de browser en bestelt in zijn eigen taal. 14 dagen gratis, zonder kaart.",
    canonical: "https://iq-rest.com/nl/qr-code-menukaart-restaurant",
    ogLocale: "nl_NL",
    ogTitle: "QR-code menukaart voor restaurants",
    ogDescription:
      "QR op tafel, kaart op de telefoon — foto's, allergenen, 35 talen en realtime updates.",
    brandLine: "IQ Rest — QR-code menukaart voor restaurants",
  },

  hero: {
    headline: "QR-code menukaart voor restaurants.",
    sub: "De gast richt de camera op de QR-code op tafel en de menukaart opent meteen in de browser van de telefoon: foto's van gerechten, allergenen, prijzen altijd actueel en automatische vertaling naar 35 talen. Geen apps downloaden, geen kaart opnieuw drukken bij elke prijswijziging.",
  },

  scan: {
    heading: "Heb je al een papieren of pdf-kaart?",
    headingAccent: "AI maakt er in 60 seconden een QR-kaart van.",
    sub: "Upload een foto van de kaart of de pdf — AI haalt categorieën, gerechten en prijzen eruit en koppelt ze meteen aan de QR-menukaart.",
    cta: "QR-menukaart maken",
  },

  subFeatures: [
    {
      icon: Languages,
      eyebrow: "Eén QR, 35 talen",
      heading: "Eén QR-code, de kaart in 35 talen.",
      body: "De gast scant de QR en kiest zijn taal: de vertaling wordt gedaan door een AI met culinair gevoel, geen generieke vertaler. Geen aparte kaarten meer voor toeristen en geen losse blaadjes op tafel.",
      bullets: [
        "Eén QR-afdruk dekt 35 talen, inbegrepen in het abonnement.",
        "De AI begrijpt de keukentaal — gerechtnamen klinken in elke taal natuurlijk.",
        "De gast wisselt van taal in de kaart, zonder de QR opnieuw te scannen.",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Twee gasten scannen dezelfde QR-code op tafel en lezen de kaart in verschillende talen" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Allergenen in de QR",
      heading: "Allergenen en dieetlabels in de QR-kaart.",
      body: "Elk gerecht op de aan de QR gekoppelde kaart kan labels dragen voor gluten, lactose, noten, schaal- en schelpdieren, veganistische en glutenvrije opties. De gast filtert vanaf de telefoon de gerechten die bij zijn beperkingen passen, zonder het personeel te vragen.",
      bullets: [
        "14 allergeencategorieën op gerechtniveau.",
        "Veganistisch-, vegetarisch- en glutenvrij-labels met één klik in het paneel.",
        "De gast filtert de QR-kaart op zijn eigen beperkingen.",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Gast filtert de QR-kaart op allergenen op de telefoon terwijl de eigenaar de lijst op een tablet bewerkt" },
    },
    {
      icon: Palette,
      eyebrow: "Meer dan alleen een QR",
      heading: "Een QR-kaart verzorgd als de website van het restaurant.",
      body: "Na het scannen belandt de gast niet bij een platte pdf: hij ziet een welkomstscherm met video of uitgelichte foto, de beschrijving van de zaak en een contactpagina met kaart, telefoonnummers en sociale media. De QR wordt de voordeur van het restaurant online.",
      bullets: [
        "Achtergrondvideo of uitgelichte foto op het startscherm van de QR-kaart.",
        "Ruimte om het concept van de zaak en van elke categorie te vertellen.",
        "Ingebouwde contactpagina: kaart, telefoon, Instagram, WhatsApp.",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Twee telefoons op een tafel: startscherm van de QR-kaart met achtergrondvideo en een contactpagina met kaart" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Bestellen via de QR · optioneel",
      heading: "Via de QR-code kan de gast ook bestellen.",
      body: "Naast het bekijken van de kaart kan de QR-kaart een bestelkanaal worden: de gast voegt gerechten toe aan het mandje en stuurt de aanvraag. De bestelling komt bij de ober in de zaal, op WhatsApp of op het keukenscherm. De functie wordt in de instellingen aan- of uitgezet wanneer nodig.",
      bullets: [
        "Mandje, opmerkingen en bestelling versturen direct vanuit de QR-scan.",
        "De bestelling komt meteen aan in de zaal, op WhatsApp of op het keukenscherm.",
        "Functie in te schakelen per tijdstip, zaal of specifiek restaurant.",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Twee telefoons op een tafel: een mandje gemaakt vanuit de QR-kaart en een bevestiging van verzonden bestelling" },
    },
  ],

  faq: {
    sub: "Wat restauranthouders vragen over de QR-code menukaart van IQ Rest. Staat je vraag er niet bij? Stuur ons een bericht op WhatsApp.",
    items: [
      { q: "Hoe werkt de QR-code menukaart van IQ Rest?", a: "Elke tafel heeft een gedrukte QR-code. De gast scant die met de telefooncamera en de browser opent de menukaart van het restaurant — foto's, beschrijvingen, allergenen en actuele prijzen. Geen app nodig, niet voor de gast en niet voor het personeel." },
      { q: "Heb ik technische kennis nodig om de QR-kaart te maken?", a: "Nee. Het paneel werkt met klikken en slepen, zonder code of ingewikkelde instellingen. Een gerecht toevoegen kost een paar seconden: naam, prijs, foto. De eerste inrichting duurt meestal 30 minuten tot een uur; heb je al een pdf-menu, dan zet de AI dat automatisch om." },
      { q: "Moeten gasten een app installeren om de QR te lezen?", a: "Nee. De ingebouwde camera van iPhone en Android herkent de QR-code in seconden en opent de kaart direct in de browser. Het beheerpaneel werkt ook vanuit elke moderne browser — telefoon, tablet of laptop." },
      { q: "Hoe worden de QR-codes voor de tafels gedrukt?", a: "De QR-codes worden automatisch in het paneel gegenereerd (één per tafel of één voor de hele zaak) en als printklare pdf gedownload. Je hebt alleen een kantoorprinter en een houder nodig: standaard, sticker of onderzetter." },
      { q: "Kan ik een eigen domein gebruiken voor de QR-kaart?", a: "Ja. We ondersteunen een restaurantdomein met SSL-certificaat (bijvoorbeeld kaart.jouwrestaurant.nl): als de gast de QR scant, ziet hij het adres van jouw restaurant in plaats van een generiek subdomein. De DNS-instelling duurt 5–10 minuten en we begeleiden je daarbij." },
      { q: "Kan ik de QR's van meerdere restaurants vanuit één account beheren?", a: "Ja, op aanvraag. Eén account kan meerdere zaken bundelen, elk met eigen QR-codes, kaart, ontwerp en statistieken. Stuur ons een bericht op WhatsApp en we zetten de multi-restaurantmodus aan." },
      { q: "Is het lastig om de QR-kaart vanaf nul te starten?", a: "Drie stappen: (1) maak de categorieën; (2) voeg de gerechten toe met naam, prijs en foto; (3) druk de QR's af en zet ze op de tafels. Heb je al een papieren of pdf-kaart, upload die dan — de AI herkent categorieën en prijzen en vult de kaarten in. Een basiskaart kan in 5 minuten online staan." },
    ],
  },
};
