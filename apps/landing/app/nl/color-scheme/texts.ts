import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Gebrand restaurantmenu — Aangepast kleurenschema en thema",
    description:
      "Match je restaurantmerk met aangepaste accentkleuren. Lichte en donkere thema's wisselen automatisch met de telefoon van de gast. Gebrand QR menu in seconden. 14 dagen proefperiode.",
    canonical: "https://iq-rest.com/nl/color-scheme",
    ogLocale: "nl_NL",
    ogTitle: "Aangepast kleurenschema — Gebrand restaurantmenu in seconden",
    ogDescription:
      "Kies je accentkleur, krijg een gebrand restaurantmenu. Auto licht/donker modus past zich aan elke gast's telefoon aan. Geen designtools nodig.",
  },

  hero: {
    title: "Jouw menu. Jouw kleuren. Jouw merk.",
    subtitle:
      "Kies een accentkleur, plaats je logo, en je QR menu ziet er direct uit als een echt merk in plaats van een template. Lichte en donkere thema's wisselen automatisch met elke gast's telefoon — je menu ziet er altijd doelbewust uit.",
    trustLine: "500+ restaurants in 30+ landen",
  },

  seo: {
    description:
      "Een aangepast kleurenschema is het verschil tussen een generiek QR menu en een gebrande restaurantervaring. IQ Rest laat je je exacte accentkleur kiezen (of een hex code uit je merkrichtlijnen plakken), je logo plaatsen, en het hele menu — knoppen, links, accenten, categorielabels — neemt je merkkleur over in seconden.",
    fullDescription:
      "De meeste QR menu builders geven je een vast kleurenschema: blauw of rood, take it or leave it. IQ Rest behandelt je merk alsof het ertoe doet — kies elke accentkleur uit een kleurpicker of plak je exacte hex code uit je merkrichtlijnen (dezelfde oranje als je bord, hetzelfde groen als je logo). Elk accent op het menu — primaire knoppen, links, categorie-accenten, de actieve status in je taalkiezer — neemt die kleur direct over.\n\nLichte en donkere modus worden automatisch afgehandeld. Wanneer een gast's telefoon in donkere modus staat (de meeste telefoons bij diner), toont je menu in donkere modus met je accentkleur opgeschroefd. Wanneer ze buiten in fel zonlicht in lichte modus zijn, past het menu zich aan. Jij kiest niet licht of donker — jij kiest een merkkleur, en het menu doet het juiste op elk apparaat.\n\nJe logo zit boven aan het menu, op de QR sticker print template, op de bestelbon en op de reserveringsbevestigings-e-mail. Elk gast-touchpoint voelt aan als hetzelfde merk omdat het hetzelfde merk is. Geen ontwerper vereist, geen Photoshop sessie, geen duur « restaurant branding pakket » — alleen een kleurpicker en een logo upload.",
    benefitsHeading: "Waarom een gebrand kleurenschema beter converteert dan een standaardthema",
    benefits: [
      "Kies elke accentkleur — kleurpicker of plak een hex code",
      "Auto licht/donker modus die zich aanpast aan elke gast's telefoon",
      "Logoplaatsing op menu, QR sticker, bonnen en e-mails",
      "Gebrande look vanaf de eerste minuut — geen Photoshop of ontwerper nodig",
      "Wissel kleuren op elk moment voor seizoenspromo's (Valentijnsdag rood, Kerstmis groen)",
      "Kleur blijft toegankelijk — contrastverhoudingen passen zich automatisch aan voor leesbaarheid",
    ],
  },

  pricing: {
    heading: "Eén plan.",
    headingAccent: "Jouw merkkleuren.",
    sub: "Aangepast kleurenschema plus QR menu, online bestellen, AI vertaling en reserveringen — alles in één vaste prijs. Branding zonder ontwerper.",
  },

  faq: {
    sub: "Alles wat restauranthouders vragen over het branden van het menu. Niet jouw vraag erbij? Stuur ons een bericht op WhatsApp — echte mensen antwoorden.",
    items: [
      {
        q: "Kan ik mijn exacte merkkleur uit mijn logo of bord matchen?",
        a: "Ja — plak je exacte hex code (bijv. #C24A2D) en het menu gebruikt die exacte kleur voor elk accent. We genereren automatisch een donkerdere tint voor hover-states en een lichtere tint voor achtergronden, zodat één merkkleur een complete UI-palet krijgt zonder dat jij iets doet.",
      },
      {
        q: "Ondersteunt het menu lichte en donkere modus?",
        a: "Ja, automatisch. Het menu detecteert het thema van elke gast's telefoon en wisselt tussen lichte en donkere modus in real-time. Je accentkleur blijft hetzelfde; de omringende UI keert om. De meeste restaurants stellen nooit licht vs donker in — ze kiezen een kleur en laten het menu zich aanpassen.",
      },
      {
        q: "Kan ik mijn kleurenschema later wijzigen?",
        a: "Op elk moment. Open de design-instellingen, kies een nieuwe kleur, sla op. Elke pagina in je QR menu, reserveringsflow en bestel-UI wordt binnen seconden bijgewerkt. Handig voor seizoensgebonden promoties (rood voor Valentijnsdag, groen voor Kerst, goud voor Nieuwjaar) — verander voor een week, verander terug.",
      },
      {
        q: "Waar verschijnt mijn logo?",
        a: "Boven aan je QR menu (naast je restaurantnaam), op de QR-code sticker print template (zodat de sticker op tafels matcht met je merk), op bestelbevestigingsbonnen, en in reserveringsbevestigings-e-mails. Upload het één keer in PNG of SVG, het wordt overal automatisch gebruikt.",
      },
      {
        q: "Wat als mijn merkkleur moeilijk leesbaar is tegen de menu-achtergrond?",
        a: "Het systeem controleert automatisch contrast en verdonkert of verlicht je kleur zachtjes voor tekst-use-cases (zodat een bleekgele merkkleur niet als onleesbare tekst verschijnt), terwijl het je exacte kleur behoudt voor accenten zoals knoppen en accenten. Je hoeft niet aan WCAG te denken — het menu doet het voor je.",
      },
    ],
  },

  finalCta: {
    heading: "Kies een kleur.",
    headingAccent: "Lijk op een echt merk.",
    sub: "Aangepast kleurenschema, gebrande bonnen, auto licht/donker modus. 14 dagen gratis proef, geen ontwerper, geen creditcard.",
  },
};
