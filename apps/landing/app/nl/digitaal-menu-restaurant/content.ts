import { Languages, ShieldAlert, Palette, ShoppingCart } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "nl",
  slug: "digitaal-menu-restaurant",
  trackPrefix: "l_nl_digital",

  meta: {
    title: "Digitaal menu voor restaurants | IQ Rest",
    description:
      "Digitaal menu voor restaurants: online kaart met foto's, allergenen, AI vertaling en live prijsupdates. 14 dagen gratis, geen kaart nodig.",
    canonical: "https://iq-rest.com/nl/digitaal-menu-restaurant",
    ogLocale: "nl_NL",
    ogTitle: "Digitaal menu voor restaurants",
    ogDescription:
      "Online versie van je papieren menu — foto's, allergenen, AI vertaling, realtime updates.",
    brandLine: "IQ Rest — Digitaal menu voor restaurants",
  },

  hero: {
    headline: "Digitaal menu voor restaurants.",
    sub: "Online versie van je papieren menu met foto's, allergenen, beschrijvingen en live prijsupdates. Gasten zien het menu in hun eigen taal; het restaurant bespaart op drukwerk.",
  },

  scan: {
    heading: "Heb je een papieren menu of PDF?",
    headingAccent: "AI digitaliseert het in 60 seconden.",
    sub: "Upload een foto of document — AI herkent automatisch categorieën, gerechten en prijzen.",
    cta: "Menu scannen",
  },

  subFeatures: [
    {
      icon: Languages,
      eyebrow: "35 AI-talen",
      heading: "35 AI-talen — elke gast leest het menu in zijn eigen taal.",
      body: "Eén QR code, 35 talen. De AI begrijpt de culinaire context — gerechtnamen en beschrijvingen klinken natuurlijk. Toeristen bestellen met meer vertrouwen en de gemiddelde bon stijgt zonder dat een kelner elk gerecht hoeft te vertalen.",
      bullets: [
        "35 talen inbegrepen in het abonnement, zonder meerkosten.",
        "AI met begrip van culinaire context, geen ruwe Google Translate.",
        "De gast wisselt van taal met één tik in het menu zelf.",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Twee gasten lezen hetzelfde digitale menu in verschillende talen op hun eigen telefoons" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Allergenen",
      heading: "Labels voor allergenen en diëten.",
      body: "Markeer gerechten voor gluten, lactose, noten, schaaldieren, veganistische en glutenvrije opties. Gasten filteren het menu op basis van hun dieetbehoeften en bestellen met meer vertrouwen.",
      bullets: [
        "14 standaard allergeencategorieën op elk gerecht.",
        "Veganistische, vegetarische en glutenvrije labels met één klik.",
        "Gasten filteren het menu op basis van hun dieetbeperkingen.",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Gast filtert het menu op allergenen op de telefoon terwijl de eigenaar de allergeenlijst bewerkt op een tablet" },
    },
    {
      icon: Palette,
      eyebrow: "Premium ontwerp",
      heading: "Premium ontwerp met videoachtergrond en contactpagina.",
      body: "Een video of foto op het welkomstscherm, restaurantbeschrijving, dedicated contactpagina met kaart, telefoonnummers en sociale profielen. Het digitale menu ziet eruit als een volledige restaurantwebsite, geen PDF achter een QR code.",
      bullets: [
        "Videoachtergrond of grote foto op het welkomstscherm.",
        "Restaurant- en categoriebeschrijvingen — vertel het verhaal van het concept.",
        "Contactpagina: kaart, telefoon, Instagram, WhatsApp.",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Twee telefoons op een cafétafel: menuhomescherm met videoachtergrond en contactpagina met kaart" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Bestellingen vanuit het menu · optioneel",
      heading: "Gasten plaatsen bestellingen direct vanuit het menu.",
      body: "Gasten bouwen een winkelwagen in het QR menu en sturen de bestelling — die komt aan bij de kelner op de vloer of op de keukentablet. De functie kan in de instellingen op elk moment worden in- of uitgeschakeld.",
      bullets: [
        "Winkelwagen, opmerkingen en bestellen verzenden met één tik.",
        "Bestelling komt direct aan in het beheerpaneel, WhatsApp of het keukenscherm.",
        "Functie wisselbaar in de instellingen.",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Twee telefoons op een tafel: winkelwagen met bestelling en bevestiging van verzonden bestelling" },
    },
  ],

  faq: {
    sub: "Wat restauranthouders vragen over het digitale menu in IQ Rest. Vind je je vraag niet? Stuur ons een bericht op WhatsApp.",
    items: [
      { q: "Heb ik technische vaardigheden of CMS-ervaring nodig?", a: "Nee, speciale vaardigheden zijn niet vereist. Elke actie in het beheerpaneel is met klikken en slepen — zonder code. Een item toevoegen aan het menu duurt enkele seconden: naam, prijs, foto. Een volledige menu-instelling duurt meestal 30 minuten tot een uur." },
      { q: "Wat is het digitale menu van IQ Rest?", a: "IQ Rest is een cloudplatform voor restaurants. Het digitale menu is de online versie van je menu, beschikbaar voor gasten via een QR code of directe link: gerechtfoto's, prijzen, allergenen, AI vertaling in 35 talen, realtime updates. Het menu wordt gehost op onze servers; je hoeft geen software te installeren of onderhouden — open gewoon een browser." },
      { q: "Hebben gasten een app of speciale hardware nodig?", a: "Nee. Gasten richten de telefooncamera op de QR code en het menu opent in de browser. Het beheerpaneel voor het restaurant werkt ook in elke moderne browser — telefoon, tablet of laptop. QR codes worden geprint op elke kantoorprinter." },
      { q: "Kan ik het menu hosten op mijn eigen domein?", a: "Ja. We ondersteunen een aangepast domein met SSL-certificaat — gasten zien het menu op het adres van je restaurant (bijv. menu.jouwrestaurant.nl). We helpen met de DNS-instelling; het duurt meestal 5–10 minuten." },
      { q: "Kan ik meerdere restaurants vanuit één account beheren?", a: "Ja, op verzoek. Eén account kan meerdere restaurants hosten: elke zaak met eigen menu, ontwerp, QR codes en analytics. Stuur ons een bericht op WhatsApp en we activeren de multi-restaurantmodus voor jouw groep." },
      { q: "Hoe moeilijk is het om het menu vanaf nul op te zetten?", a: "De opzet bestaat uit drie stappen: (1) maak categorieën aan; (2) voeg items toe met namen, prijzen en foto's; (3) print QR codes voor de tafels. Als je al een papieren menu of PDF hebt, upload het — de AI herkent categorieën, namen en prijzen en vult de kaarten automatisch in. Een basismenu kan in 5 minuten live zijn; de totale opzettijd hangt af van het aantal items." },
      { q: "Wat voor ondersteuning bieden jullie?", a: "We zijn beschikbaar op WhatsApp tijdens kantooruren en reageren snel via e-mail. We helpen met de initiële opzet, domeinconfiguratie, menu-ontwerp en alle niet-standaard situaties. Als je een demo of hands-on ondersteuning nodig hebt tijdens de lancering — stuur ons een bericht." },
    ],
  },
};
