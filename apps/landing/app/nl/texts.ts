import { CalendarCheck, ChefHat, Receipt, Monitor } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "nl",
  htmlDir: "ltr",

  meta: {
    title: "QR menu voor restaurants — Directe bestellingen, nul commissie | IQ Rest",
    description:
      "Alles-in-één platform voor restaurants: digitaal menu, QR bestellingen, tafelreservering en keukenscherm. Live in 5 minuten. 14 dagen gratis, geen kaart nodig.",
    canonical: "https://iq-rest.com/nl",
    ogLocale: "nl_NL",
    ogTitle: "QR menu voor restaurants — Directe bestellingen, nul commissie",
    ogDescription:
      "Digitaal menu, QR bestellingen, tafelreservering en AI vertaling. Live in 5 minuten. 14 dagen gratis.",
  },

  ctaText: "Probeer gratis",
  demoText: "Bekijk demo",
  microcopy: "14 dagen gratis · Geen kaart · Op elk moment opzegbaar",

  header: {
    navFeatures: "Functies",
    navHow: "Hoe het werkt",
    navPricing: "Prijzen",
    navFaq: "FAQ",
    signIn: "Inloggen",
    cta: "Beginnen",
  },

  hero: {
    verticals: ["Restaurants", "Cafés", "Bars", "Hotels", "Pizzeria's"],
    headline: "Digitaal menu voor restaurants. Live in 5 minuten.",
    sub: "Digitaal menu voor jouw restaurant in 5 minuten. Alles inbegrepen: no-code editor, AI menuherkenning, QR codes voor tafels en directe bestellingen zonder commissie.",
    dynamicHeadlines: ["0% commissie.", "35 AI-talen.", "Online bestellingen.", "Reserveringen 24/7.", "Premium ontwerp."],
    painBullets: [
      "0% commissie: elke bestelling gaat direct naar jouw restaurant.",
      "AI vertaling in 35 talen — toeristen begrijpen het menu en bestellen meer.",
      "Reservering 24/7: gasten reserveren zelf tafels, zonder telefoontjes tijdens piekuren.",
      "Flexibele prijzen: menu-updates staan binnen seconden online.",
    ],
    rating: "Meer dan 500 restaurants in meer dan 30 landen",
  },

  features: {
    heading: "Alles wat je nodig hebt.",
    headingAccent: "Niets overbodigs.",
    sub: "Gebouwd voor restaurants. Elke dag gebruikt aan tafel, in de keuken en op de vloer.",
    items: [
      { Icon: Monitor, title: "Digitaal menu", desc: "Menu in de browser met foto's, prijzen, allergenen en beschrijvingen. Updates in realtime vanaf de telefoon. Gasten zien het menu in hun eigen taal; het restaurant bespaart op drukwerk.", tag: "Digitaal menu", href: "/nl/digitaal-menu-restaurant" },
      { Icon: Receipt, title: "Bestellingen aannemen: gast en kelner", desc: "Een QR code aan tafel voor de gast, of de kelner neemt de bestelling op vanaf de telefoon — beide gaan direct naar de keuken of WhatsApp. Geen commissie, met tafelnummer op elke bon.", tag: "Bestellingen", href: "/nl/bestelsysteem-restaurant" },
      { Icon: CalendarCheck, title: "Tafelreservering 24/7", desc: "Gasten reserveren zelf tafels via de website of QR menu terwijl jij druk bent op de vloer. Kalender per tafel, automatische bevestigingen en herinneringen. Geen enkele gemiste gast.", tag: "Reservering", href: "/nl/tafel-reserveren" },
      { Icon: ChefHat, title: "Keukenscherm (KDS)", desc: "Papieren bonnen zijn niet meer nodig. Bestellingen van de vloer gaan direct naar het scherm van de chef — kolommen „in bereiding / klaar / geserveerd“, allergenen en notities met kleur gemarkeerd. Op tablet of telefoon.", tag: "KDS", href: "/nl/keukenscherm" },
    ],
  },

  founder: {
    eyebrow: "Gebouwd door restauranthouders",
    quoteStart:
      "Mijn vrouw en ik runden ons eigen café en weten uit eerste hand hoe een restaurantdag er echt uitziet — bestellingen aannemen, reserveringen, vloer- en keukenstroom. We wilden één enkele tool: modern, makkelijk op te starten en in één oogopslag duidelijk —",
    quoteAccent: "zo begonnen we het platform te bouwen dat we nu ontwikkelen voor andere restauranthouders.",
    sign: "Bogdan Sokolov · oprichter, voormalig café-eigenaar",
    photoAlt: "Bogdan Sokolov, oprichter van IQ Rest",
  },

  how: {
    heading: "Live in 5 minuten",
    sub: "Vier korte stappen. Geen installaties, geen technische opstelling.",
    steps: [
      { n: "1", t: "Type en naam", d: "Kies het type zaak en voer de naam in." },
      { n: "2", t: "Opslaan", d: "Voer je e-mail in of log in met Google." },
      { n: "3", t: "Menu", d: "Voeg items handmatig toe of upload een gedrukt menu voor AI scanning." },
      { n: "4", t: "Klaar", d: "Deel een link of QR code en begin met het ontvangen van bestellingen." },
    ],
  },

  pricing: {
    badge: "Geen commissie · Geen contracten",
    heading: "Eén abonnement.",
    headingAccent: "Alles inbegrepen.",
    sub: "QR menu, bestellingen aannemen, AI vertaling, restaurantwebsite en reservering. Eén transparante maandelijkse vergoeding.",
    monthlyLabel: "Maandelijks",
    yearlyLabel: "Jaarlijks",
    saveBadge: "Bespaar 25%",
    perMonth: "per maand",
    billedAnnually: "Jaarlijkse facturering: {total}",
    youSave: "Je bespaart {amount}",
    trust: { secure: "Veilige Stripe-betaling", noCommitment: "Geen verplichting", quick: "Actief binnen minuten", restaurants: "500+ restaurants" },
  },

  faq: {
    eyebrow: "Heb je vragen?",
    heading: "Veelgestelde",
    headingAccent: "vragen.",
    sub: "Wat restauranthouders vragen voordat ze zich aanmelden. Vind je je vraag niet? Stuur ons een bericht op WhatsApp — echte mensen antwoorden, geen bot.",
    whatsappCta: "Vraag het op WhatsApp",
    whatsappPrefill: "Hoi, ik heb een vraag over IQ Rest",
    items: [
      { q: "Wat omvat de proefperiode en wat gebeurt erna?", a: "Volledige toegang tot alle functies gedurende 14 dagen, geen kaart nodig. Na 14 dagen wordt het account gepauzeerd als er geen betaalmethode is toegevoegd — we rekenen nooit automatisch. Je kunt later betaling toevoegen en doorgaan waar je was gebleven. Op elk moment opzegbaar met één klik." },
      { q: "Nemen jullie commissie op bestellingen?", a: "Nee. Elke bestelling vanuit het QR menu gaat direct naar het restaurant — geen percentage van onze kant, geen aggregatorkosten. Eén vaste maandelijkse vergoeding en niets anders." },
      { q: "Hebben gasten een app nodig, hebben wij technische vaardigheden nodig?", a: "Gasten hebben geen app nodig — ze richten de telefooncamera op de QR code en het menu opent in de browser. Restaurants hebben ook geen technische vaardigheden nodig: het beheerpaneel werkt in elke moderne browser op telefoon, tablet of laptop. Elke actie is met klikken en slepen, zonder code." },
      { q: "Hoe snel veranderen prijzen en verschijnen nieuwe gerechten?", a: "Direct. Verander een prijs vanaf je telefoon — gasten zien het binnen seconden. Een nieuw gerecht vereist een paar tikken: naam, prijs, foto. Geen herdruk, geen wachten op een ontwerper." },
      { q: "Hoeveel talen worden ondersteund?", a: "35 talen met ingebouwde AI vertaling. Eén tik en het hele menu is vertaald; de AI begrijpt de culinaire context — namen en beschrijvingen klinken natuurlijk in elke taal. Toeristen bestellen met meer vertrouwen wanneer ze het menu echt begrijpen." },
    ],
  },

  finalCta: {
    heading: "Live in 5 minuten.",
    headingAccent: "14 dagen gratis.",
    sub: "Geen kaart nodig, op elk moment opzegbaar. Sluit je aan bij 500+ restaurants die al IQ Rest gebruiken.",
  },

  scan: {
    heading: "Heb je een papieren menu of PDF?",
    headingAccent: "AI digitaliseert het in 60 seconden.",
    sub: "Upload een foto of document — AI herkent automatisch categorieën, gerechten en prijzen.",
    cta: "Menu scannen →",
  },

  pricingHero: {
    chips: ["Geen commissie", "Geen contracten", "14 dagen gratis"],
    heading: "Prijzen.",
    headingAccent: "Geen verborgen kosten.",
    sub: "Eén transparante maandelijkse vergoeding. Geen percentage op bestellingen en geen aggregatorcommissies. Zeg het abonnement op elk moment op.",
    popularBadge: "Populair",
    perMonthSuffix: "/mnd",
    whenAnnualTemplate: "jaarlijkse facturering · {total} € per jaar",
    orMonthlyTemplate: "of {price} €/mnd",
    savingsTemplate: "bespaar {amount} € per jaar",
    plans: {
      basic: {
        name: "Basic",
        tagline: "Menu, QR bestellingen en AI vertaling. Live in 5 minuten.",
        features: [
          "QR menu voor elke tafel",
          "Digitaal menu met foto's en allergenen",
          "AI vertaling in 35 talen",
          "Bestellingen vanuit het menu (optioneel)",
          "AI gerechtfoto-generatie",
          "Beheer vanaf elke telefoon of tablet",
        ],
      },
      pro: {
        name: "Pro",
        tagline: "Volledige restaurantcontrole: keukenscherm en reserveringen.",
        features: [
          "Alles in Basic",
          "Keukenscherm (KDS)",
          "Online tafelreservering 24/7",
          "Prioriteit WhatsApp ondersteuning",
        ],
      },
    },
  },

  footer: {
    featureLinks: [
      { href: "/nl/digitaal-menu-restaurant", label: "Digitaal menu" },
      { href: "/nl/bestelsysteem-restaurant", label: "Bestellingen" },
      { href: "/nl/tafel-reserveren", label: "Reservering" },
      { href: "/nl/keukenscherm", label: "Keukenscherm" },
    ],
    navLinks: [
      { href: "/nl/prijzen", label: "Prijzen" },
      { href: "#faq", label: "FAQ" },
      { href: "/nl/languages", label: "Taal wijzigen" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Alle rechten voorbehouden.",
  },
};
