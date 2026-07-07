import {
  Languages,
  ShieldAlert,
  Palette,
  ShoppingCart,
  MonitorSmartphone,
  BadgePercent,
  Globe,
  LayoutTemplate,
  Contact,
  MessageCircle,
  CalendarCheck,
} from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "nl",
  slug: "digitaal-menu-restaurant",
  trackPrefix: "l_nl_digital",
  hideFeatureHeading: true,

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
    headline: "Een digitaal menu\ndat alles heeft",
    cta: "Digitaal menu maken",
    sub: "Foto's, allergenen en vertaling in 35 talen. Plus bestellingen, WhatsApp en tafelreservering — alles in één IQ Rest.",
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
      heading: "35 talen die elke gast leest",
      body: "Eén QR, 35 talen. De AI vertaalt met culinaire context, elk gerecht klinkt natuurlijk. Toeristen bestellen zelfverzekerd.",
      bullets: [
        "35 talen in je abonnement",
        "Culinaire AI, geen Google",
        "Taal wisselen met één tik",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Twee gasten lezen hetzelfde digitale menu in verschillende talen op hun eigen telefoons" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Allergenen",
      heading: "Allergenen en diëten per gerecht",
      body: "Markeer gluten, lactose, noten, veganistisch en glutenvrij. Gasten filteren het menu op hun dieet en bestellen moeiteloos.",
      bullets: [
        "14 allergeencategorieën",
        "Veganistische en glutenvrije labels",
        "Filteren op dieet",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Gast filtert het menu op allergenen op de telefoon terwijl de eigenaar de allergeenlijst bewerkt op een tablet" },
    },
    {
      icon: MonitorSmartphone,
      eyebrow: "Elk apparaat",
      heading: "Beheer het op elk apparaat",
      body: "Het paneel draait in de browser — bewerk menu, prijzen en foto's waar je ook bent. Niets te installeren.",
      bullets: [
        "Draait in elke browser",
        "Telefoon, tablet of pc",
        "Niets te installeren",
      ],
    },
    {
      icon: BadgePercent,
      eyebrow: "Geen commissie",
      heading: "Nul commissie, geen extra's",
      body: "Eén transparant abonnement. We nemen geen deel van je omzet en verbergen geen kosten — alles blijft bij het restaurant.",
      bullets: [
        "Nul procent op bestellingen",
        "Geen verborgen extra's",
        "Eén vaste prijs",
      ],
    },
    {
      icon: Globe,
      eyebrow: "Eigen domein",
      heading: "Menu op je eigen domein",
      body: "We koppelen je domein met SSL — gasten zien het menu op het adres van je restaurant. We helpen met DNS in 10 minuten.",
      bullets: [
        "Je domein met SSL",
        "menu.jouwrestaurant.nl",
        "We helpen met DNS",
      ],
    },
    {
      icon: LayoutTemplate,
      eyebrow: "Jouw ontwerp",
      heading: "Flexibel ontwerp op maat",
      body: "Meerdere kant-en-klare lay-outs en stijlen — kies de cover, kleuren en presentatie die bij je zaak passen.",
      bullets: [
        "Meerdere kant-en-klare lay-outs",
        "Je eigen cover en kleuren",
        "Restylen in enkele klikken",
      ],
    },
    {
      icon: Contact,
      eyebrow: "Contact",
      heading: "Contact en socials in het menu",
      body: "Een pagina met kaart, telefoon en links naar Instagram en WhatsApp — gasten vinden je met één tik.",
      bullets: [
        "Kaart, telefoon en adres",
        "Instagram en WhatsApp",
        "Bereik je in één tik",
      ],
    },
    {
      icon: MessageCircle,
      eyebrow: "WhatsApp-bestellingen",
      heading: "Bestellingen via WhatsApp",
      body: "Gasten vullen een winkelwagen en sturen de bestelling recht naar je WhatsApp — geen aparte app, in de chat die ze al gebruiken.",
      bullets: [
        "Bestelling naar je WhatsApp",
        "Geen aparte app",
        "Chatten zoals altijd",
      ],
    },
    {
      icon: CalendarCheck,
      eyebrow: "Reserveringen",
      heading: "Tafel reserveren zonder bellen",
      body: "Gasten reserveren zelf een tafel via het menu of een link, jij ziet de kalender per tafel en bevestigt auto of handmatig.",
      bullets: [
        "Reserveren 24/7, zonder bellen",
        "Kalender per tafel",
        "Auto- of handbevestiging",
      ],
    },
    {
      icon: Palette,
      eyebrow: "Premium ontwerp",
      heading: "Lijkt een site, geen PDF",
      body: "Videoachtergrond op het welkomstscherm, je concept beschreven en een aparte contactpagina met kaart en socials.",
      bullets: [
        "Video op het startscherm",
        "Concept en gerechten beschreven",
        "Aparte contactpagina",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Twee telefoons op een cafétafel: menuhomescherm met videoachtergrond en contactpagina met kaart" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Bestellingen · optioneel",
      heading: "Bestellingen direct uit het menu",
      body: "Gasten vullen een winkelwagen en sturen de bestelling — die komt in de zaal, WhatsApp of het keukenscherm. Optioneel.",
      bullets: [
        "Winkelwagen en versturen in een tik",
        "Zaal, WhatsApp of keuken",
        "Zet het aan in de instellingen",
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
