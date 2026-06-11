import { CalendarPlus, CalendarDays } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "nl",
  slug: "tafel-reserveren",
  trackPrefix: "l_nl_bookings",

  meta: {
    title: "Tafelreservering 24/7 voor restaurants | IQ Rest",
    description:
      "Tafelreservering 24/7 voor restaurants: gasten reserveren zelf via het QR menu of de website. Kalender per tafel, automatische bevestigingen en herinneringen. Geen enkele gemiste gast. 14 dagen gratis.",
    canonical: "https://iq-rest.com/nl/tafel-reserveren",
    ogLocale: "nl_NL",
    ogTitle: "Tafelreservering 24/7 — gasten reserveren zelf",
    ogDescription:
      "Gasten reserveren tafels via het QR menu of de website. Kalender, automatische bevestigingen, herinneringen. Geen enkele gemiste gast.",
    brandLine: "IQ Rest — Tafelreservering voor restaurants",
  },

  hero: {
    headline: "Tafelreservering 24/7 — gasten reserveren zelf.",
    cta: "Tafelreservering instellen",
    sub: "Gasten reserveren tafels via het QR menu of een directe link. Kalender per tafel, automatische bevestigingen en herinneringen. Geen enkele gemiste gast en geen telefoontjes tijdens piekuren.",
    imageSrc: "/landing/feature-reservation.webp",
    imageAlt: "Gastvrouw beheert reserveringen vanaf een tablet bij de ingang van het restaurant",
  },

  scan: {
    heading: "Start tafelreservering",
    headingAccent: "in 5 minuten.",
    sub: "Koppel de kalender, voeg tafels toe met foto's en capaciteit — gasten beginnen dezelfde dag met reserveren.",
    cta: "Reservering activeren",
  },

  subFeatures: [
    {
      icon: CalendarPlus,
      eyebrow: "Reserveringsformulier",
      heading: "Gasten reserveren zelf — op datum, tijd en aantal personen.",
      body: "De gast opent het QR menu of een directe link, kiest datum, tijd en aantal personen — en ziet direct beschikbare tafels, elk met foto, beschrijving (terras, bij het raam, bank naast de bar) en capaciteit. De bevestiging wordt automatisch verzonden per e-mail en WhatsApp.",
      bullets: [
        "Tafelkeuze op foto, beschrijving en capaciteit.",
        "Automatische bevestiging en herinnering een uur voor het bezoek.",
        "Minimale velden in het formulier: naam, telefoon, aantal personen.",
      ],
      image: { src: "/landing/feature-booking-form.webp", alt: "Gast reserveert een restauranttafel vanaf een telefoon: datum, tijd, aantal personen en tafelkiezer" },
    },
    {
      icon: CalendarDays,
      eyebrow: "Reserveringskalender",
      heading: "Kalender per dag en tafel — alles in één oogopslag.",
      body: "Het beheerpaneel toont een reserveringskalender uitgesplitst per tafel, dag, week en maand. Vrije slots, bezette tafels, bevestigde en niet-bevestigde reserveringen op één scherm. Werkt op een tablet in de zaal en een laptop op kantoor.",
      bullets: [
        "Dag-, week- en maandweergaves.",
        "Uitsplitsing per tafel: wie, wanneer, hoeveel gasten.",
        "Verplaatsen, annuleren of bevestigen van een reservering met één tik vanaf de telefoon.",
      ],
      image: { src: "/landing/feature-booking-calendar.webp", alt: "Reserveringskalender in het IQ Rest beheerpaneel op twee tablets: dagelijkse Gantt per tafels en maandweergave" },
    },
  ],

  faq: {
    sub: "Wat restauranthouders vragen over tafelreservering in IQ Rest. Vind je je vraag niet? Stuur ons een bericht op WhatsApp.",
    items: [
      { q: "Kan ik kiezen op welke dagen en uren reservering beschikbaar is?", a: "Ja. Het beheerpaneel laat je openingstijden en beschikbare weekdagen instellen — het systeem toont gasten geen niet-beschikbare slots. Je kunt een specifieke datum sluiten (bedrijfsevenement, privéreservering) of tijdelijk de hele kalender uitschakelen." },
      { q: "Kan ik een foto uploaden voor elke tafel?", a: "Ja. Elke tafel kan een foto, beschrijving (terras, bij het raam, bank naast de bar) en capaciteit hebben. De gast ziet de exacte tafel die hij reserveert en maakt een geïnformeerde keuze — dit vermindert onvervulde verwachtingen." },
      { q: "Kan ik reserveringen uitschakelen op specifieke datums?", a: "Ja. De kalender laat je specifieke datums sluiten (feestdagen, privéevenementen, renovatie) of hele weekdagen. Op deze datums zien gasten een bericht „reservering tijdelijk niet beschikbaar“." },
      { q: "Kan ik aanpassen welke velden van de gast worden verzameld?", a: "Ja. Standaardset: naam, telefoon, e-mail, aantal personen. Je kunt aangepaste velden toevoegen (gelegenheid, allergieën, speciale verzoeken) of overbodige verwijderen om het formulier zo kort mogelijk te houden." },
      { q: "Kan ik het aantal gasten per tafel beperken?", a: "Ja. Elke tafel heeft een „capaciteit“ instelling — het systeem laat geen tafel voor 2 reserveren voor 6 personen. Bij grotere tafels kun je een minimum instellen zodat kleine groepen niet de „tafel voor acht“ wegnemen van grotere gezelschappen." },
      { q: "Hoe moeilijk is de reserveringsinstelling?", a: "Het duurt heel weinig tijd. Drie stappen: (1) voeg tafels toe met namen, foto's en capaciteit, (2) activeer de reserveringsmodus in de instellingen, (3) deel de link of QR code met gasten. Volledige lancering in 5–10 minuten." },
      { q: "Kan ik het reserveringssysteem op mijn eigen domein gebruiken?", a: "Ja. We ondersteunen een aangepast domein met SSL-certificaat: gasten reserveren op het adres van je restaurant (bijv. reservering.jouwrestaurant.nl). We helpen met de DNS-instelling; het proces duurt 5–10 minuten." },
      { q: "Kan ik automatische of handmatige bevestiging configureren?", a: "Ja, de modus wordt ingesteld in de instellingen. Met automatische bevestiging krijgt de gast direct na het indienen van het formulier een bevestiging en wordt de reservering als geaccepteerd beschouwd. Met handmatige bevestiging komt het verzoek in het beheerpaneel met status „wacht op bevestiging“ — de manager beoordeelt en bevestigt of weigert. Handmatige modus is handig bij beperkt aantal tafels of strikte gastbeleid." },
      { q: "Nemen jullie commissie op reserveringen?", a: "Nee. Tafelreservering is volledig inbegrepen in het Pro-abonnement — geen percentage op gasten, geen kosten per slot, geen aggregatorcommissies. Vaste maandelijkse vergoeding en onbeperkte reserveringen." },
    ],
  },
};
