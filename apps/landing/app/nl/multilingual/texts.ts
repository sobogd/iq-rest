import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Meertalig restaurantmenu — 35 talen, één tap om te wisselen",
    description:
      "Bedien internationale gasten in hun taal. Restaurantmenu in 35 talen met één-tap wisselen. RTL ondersteuning voor Arabisch en Perzisch. 14 dagen gratis proefperiode.",
    canonical: "https://iq-rest.com/nl/multilingual",
    ogLocale: "nl_NL",
    ogTitle: "Meertalige restaurantmenu website — 35 talen ingebouwd",
    ogDescription:
      "Toeristen scannen, zien je menu in hun taal automatisch. 35 talen, RTL ondersteuning, auto-detect uit telefooninstellingen. 14 dagen gratis proefperiode.",
  },

  hero: {
    title: "Je menu spreekt de taal van elke toerist.",
    subtitle:
      "Een meertalig restaurantmenu zou geen project moeten zijn. Met IQ Rest detecteert je QR menu automatisch de taal van elke gast's telefoon en serveert het in een van de 35 talen — inclusief Arabisch en Perzisch met juiste rechts-naar-links weergave.",
    trustLine: "4.9 · 500+ restaurants in 30+ landen",
  },

  seo: {
    description:
      "Bouw je menu één keer, serveer het in 35 talen. IQ Rest detecteert automatisch de taal van elke gast's telefoon en geeft het menu weer in hun taal — geen vlaggen tikken, geen taalbarrière, geen ongemakkelijke Google Translate-momenten. Van Spaans en Duits tot Japans, Arabisch en Mandarijn, je gasten zien je restaurant zoals het bedoeld is om gezien te worden.",
    fullDescription:
      "De meeste « meertalige » menu's zijn PDF's van kapotte Google Translate, één keer geprint en nooit bijgewerkt. De meertalige restaurantwebsite van IQ Rest is echte i18n: elke taal heeft zijn eigen correct vertaalde kopie, eigen URL-slug, eigen meta-tags voor Google-indexering en eigen routing in de menu-app.\n\nWanneer een toerist met een Franstalige iPhone je QR code scant, opent het menu automatisch in het Frans — geen taps, geen beslissingen. Ze kunnen overschakelen naar elke andere taal met de taalselector bovenaan, maar de meeste hebben dat nooit nodig. Hetzelfde geldt voor dieetlabels (« vegan » wordt « vegano » / « vegetarisch » / « ヴィーガン » afhankelijk van taal), voor foutmeldingen, voor « toevoegen aan winkelmandje » knoppen, voor bonnen. Elke UI-string in 35 talen, niet alleen menu-inhoud.\n\nVoor RTL-talen — Arabisch en Persisch — keert de hele lay-out correct om: tekst lijnt rechts uit, menu's openen vanaf rechts, prijzen verschijnen na de gerechtnaam zoals verwacht. Dit is geen CSS-truc, het is volledige RTL-ondersteuning die Arabische en Perzische gasten zich bediend laat voelen, niet achteraf aangepast.",
    benefitsHeading: "Waarom een echt meertalig menu beter is dan een PDF-vertaling",
    benefits: [
      "35 talen met juiste UI-vertaling — niet alleen menu-items",
      "Detecteert automatisch de taal van de telefoon van de gast — geen taps vereist",
      "Handmatige taalwisselaar voor gasten die een andere taal verkiezen",
      "Volledige RTL-ondersteuning voor Arabisch en Perzisch — geen CSS-truc",
      "Elke taal heeft een eigen URL — Google indexeert 35 versies van je site",
      "Wijzig een gerechtbeschrijving in je moedertaal — vertalingen volgen",
    ],
  },

  pricing: {
    heading: "Eén plan.",
    headingAccent: "Alle 35 talen inbegrepen.",
    sub: "Meertalig menu, AI vertaling, QR bestellen en reserveringen — alles in één vaste prijs. Geen kosten per taal, geen extra's voor RTL.",
  },

  faq: {
    sub: "Alles wat restauranthouders vragen over een meertalig menu. Niet jouw vraag erbij? Stuur ons een bericht op WhatsApp — echte mensen antwoorden.",
    items: [
      {
        q: "Hoeveel talen ondersteunt het menu?",
        a: "35 talen waaronder Engels, Spaans, Duits, Frans, Italiaans, Portugees, Nederlands, Pools, Tsjechisch, Slowaaks, Hongaars, Roemeens, Bulgaars, Kroatisch, Servisch, Sloveens, Grieks, Turks, Russisch, Oekraïens, Litouws, Lets, Ests, Fins, Zweeds, Noors, Deens, IJslands, Catalaans, Iers Gaelisch, Arabisch, Perzisch, Japans, Koreaans en Chinees. UI-strings worden voor elk professioneel vertaald.",
      },
      {
        q: "Hoe wisselen klanten van taal?",
        a: "Twee manieren: automatisch (het menu opent in de taal van hun telefoon) en handmatig (een taalselector bovenaan het menu). 80% van de toeristen raakt nooit de handmatige selector aan — auto-detect werkt gewoon omdat hun telefoon hun taal al weet.",
      },
      {
        q: "Ondersteunen jullie rechts-naar-links talen zoals Arabisch en Perzisch?",
        a: "Ja, met volledige RTL-lay-out. Het hele menu keert om: tekst lijnt naar rechts uit, kolommen keren om, navigatieladen openen vanaf de rechterkant, prijzen verschijnen na gerechtnamen. Dit is echte RTL-ondersteuning geïmplementeerd op lay-outniveau, niet alleen CSS-richtingstrucs.",
      },
      {
        q: "Indexeert Google mijn menu in alle 35 talen?",
        a: "Ja. Elke taal heeft zijn eigen URL-slug (bijv. /es, /fr, /de), juiste hreflang-tags, gelokaliseerde meta-titels en -beschrijvingen, en taalspecifieke gestructureerde data. Google behandelt elke taal als een aparte pagina voor die locale, wat betekent dat toeristen die je restaurant in hun taal zoeken meer kans hebben om je te vinden.",
      },
      {
        q: "Wat als ik niet alle 35 talen wil — alleen mijn hoofdmarkten?",
        a: "Kies welke talen actief zijn. Als je een strandrestaurant in Griekenland bent dat voornamelijk Britse, Duitse en Italiaanse toeristen bedient, schakel alleen Engels, Duits en Italiaans in — de rest verschijnt niet in de taalselector of auto-detect. Je kunt later altijd meer inschakelen naarmate je toeristenmix verandert.",
      },
    ],
  },

  finalCta: {
    heading: "De taal van elke toerist's telefoon.",
    headingAccent: "Al ondersteund.",
    sub: "Bedien een meertalig menu in 35 talen, inclusief RTL Arabisch en Perzisch. 14 dagen gratis proef, geen creditcard, geen kosten per taal.",
  },
};
