import { ScanLine, Languages, CalendarCheck, Palette, Smartphone, ChefHat } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "nl",
  htmlDir: "ltr",

  meta: {
    title: "QR Menukaart voor Restaurants — Directe Bestellingen, Nul Commissie | IQ Rest",
    description:
      "Geen papieren menukaarten of bezorgapp-commissies meer. QR menukaart, directe bestellingen, reserveringen en meertalige website. 14 dagen gratis, geen creditcard.",
    canonical: "https://iq-rest.com/nl",
    ogLocale: "nl_NL",
    ogTitle: "QR Menukaart voor Restaurants — Directe Bestellingen, Nul Commissie",
    ogDescription:
      "QR menukaart, directe bestellingen, reserveringen en AI-vertaling. Klaar in 2 minuten. 14 dagen gratis — geen creditcard.",
  },

  ctaText: "Gratis proberen", ctaSite: "Website maken",
  demoText: "Live demo bekijken",
  microcopy: "14 dagen gratis · Geen creditcard · Stop wanneer je wilt",

  header: {
    navFeatures: "Functies",
    navHow: "Hoe het werkt",
    navPricing: "Prijzen",
    navFaq: "FAQ",
    signIn: "Inloggen",
    cta: "Gratis proberen",
  },

  hero: {
    verticals: ["Restaurants", "Cafés", "Bars", "Hotels", "Pizzeria's"],
    qr: { headline: "QR-menu in 5 minuten.", sub: "Kant-en-klare restaurantwebsite — zonder ontwikkelaars of aannemers. Directe bestellingen, reserveringen en gastanalyses in één abonnement." },
    web: { headline: "Restaurant-site in 5 min.", sub: "Kant-en-klare restaurantwebsite — zonder ontwikkelaars of aannemers. Directe bestellingen, reserveringen en gastanalyses in één abonnement." },
    dynamicHeadlines: ["0% commissie.", "35 talen met AI.", "Online bestellen.", "Reserveren 24/7.", "Premium design."],
    painBullets: ["0% commissie: Alle bestellingen gaan direct naar jou.", "AI-vertaling: 35 talen om de omzet van toeristen te verhogen.", "Reserveren 24/7: Volle bak zonder extra telefoontjes.", "Flexibele prijzen: Update je menu in een paar seconden."],
    rating: "4,9 · meer dan 500 restaurants in 30+ landen",
  },

  features: {
    heading: "Alles wat je nodig hebt.",
    headingAccent: "Niets dat je niet nodig hebt.",
    sub: "Gemaakt voor restaurants. Gebruikt aan tafel.",
    items: [
      
      {
        Icon: ScanLine,
        title: "Bestellen aan tafel",
        desc: "Bestellingen komen direct binnen via WhatsApp of het dashboard met tafelnummer. Snellere service.",
        tag: "Directe bestellingen",
      },
      {
        Icon: Languages,
        title: "AI-vertaler (35 talen)",
        desc: "Onze AI begrijpt gastronomie. Toeristen bestellen 20% meer als ze de kaart echt begrijpen.",
        tag: "AI-vertaling",
      },
      {
        Icon: CalendarCheck,
        title: "Tafelreserveringen",
        desc: "Het systeem neemt boekingen aan terwijl jij in de keuken staat. Geen klant meer missen.",
        tag: "Reserveringen",
      },
      {
        Icon: Palette,
        title: "Modern design",
        desc: "Video-achtergronden en smakelijke foto's. Je menu ziet er premium uit en wekt direct de eetlust.",
        tag: "Eigen ontwerp",
      },
      {
        Icon: Smartphone,
        title: "Snel-editor",
        desc: "Beheer stop-lijsten en prijzen direct vanaf je telefoon. Wijzigingen zijn meteen live voor gasten.",
        tag: "Menu-editor",
      },
      {
        Icon: ChefHat,
        title: "Binnenkort: Keukendisplay",
        desc: "Vergeet papieren bonnetjes. Bestellingen van de vloer gaan direct naar het scherm van de chef.",
        tag: "Binnenkort",
      },
    
    ],
  },

  founder: {
    eyebrow: "Gemaakt door een horecaondernemer",
    quoteStart:
      "Mijn vrouw en ik openden een café en zochten weken naar een systeem dat online bestellingen, reserveringen en een modern uiterlijk kon bieden. Alles wat we probeerden was log, lelijk of miste de helft van de functies —",
    quoteAccent: "dus bouwden we wat we zelf wilden hebben.",
    sign: "Bogdan Sokolov · oprichter, ex-cafébaas",
    photoAlt: "Bogdan, oprichter van IQ Rest",
  },

  how: {
    heading: "Live in minder dan 2 minuten",
    sub: "Vier korte stappen. Geen installatie, geen technische setup.",
    steps: [
      { n: "1", t: "Meld je aan", d: "E-mail of Google. Geen creditcard. Klaar in 10 seconden." },
      { n: "2", t: "Naam van je restaurant", d: "Typ de naam. Verschijnt bovenaan je menu." },
      { n: "3", t: "Voeg je eerste gerecht toe", d: "Categorie, naam, prijs, foto. Dat is alles." },
      { n: "4", t: "Kies een achtergrond en print je QR", d: "Kies een achtergrond. Pak je QR. Plak op tafels." },
    ],
  },

  pricing: {
    badge: "Geen commissie · Geen contracten",
    heading: "Eén plan.",
    headingAccent: "Alles inbegrepen.",
    sub: "QR menukaart, bestellingen, AI-vertaling, restaurantwebsite en reserveringen. Eén simpele prijs.",
    monthlyLabel: "Maandelijks",
    yearlyLabel: "Jaarlijks",
    saveBadge: "Bespaar 25%",
    perMonth: "per maand",
    billedAnnually: "Jaarlijkse facturatie {total}",
    youSave: "Je bespaart {amount}",
    trust: {
      secure: "Veilig betalen met Stripe",
      noCommitment: "Geen verplichtingen",
      quick: "Actief in minuten",
      restaurants: "500+ restaurants",
    },
  },

  faq: {
    eyebrow: "Vragen?",
    heading: "Veelgestelde",
    headingAccent: "vragen.",
    sub: "Wat horecaondernemers vragen voor ze zich aanmelden. Staat de jouwe er niet bij? App ons via WhatsApp — echte mensen antwoorden.",
    whatsappCta: "Vraag op WhatsApp",
    whatsappPrefill: "Hi, ik heb een vraag over IQ Rest",
    items: [
      {
        q: "Wat zit er in de gratis proefperiode en wat gebeurt erna?",
        a: "14 dagen, volledige toegang, geen creditcard nodig. Na 14 dagen pauzeert je account als je geen betaalmethode toevoegt — we incasseren nooit automatisch. Voeg later betaalgegevens toe om te reactiveren. Stop met één klik wanneer je wilt.",
      },
      {
        q: "Nemen jullie commissie op bestellingen?",
        a: "Nul. Elke bestelling van je QR menu gaat direct naar jou — geen aandeel voor ons, geen Thuisbezorgd / Uber Eats kosten. Eén vaste maandprijs, dat is het.",
      },
      {
        q: "Hebben gasten een app nodig? Heb ik tech-skills nodig?",
        a: "Nul apps voor gasten — ze scannen de QR met de camera, het menu opent in de browser. Nul technische skills voor jou — het hele dashboard werkt op je telefoon, tikken om toe te voegen, slepen om te ordenen, dat is alles.",
      },
      {
        q: "Hoe snel verander ik prijzen of voeg ik gerechten toe?",
        a: "Direct. Verander een prijs op je telefoon, gasten zien het binnen seconden. Nieuw gerecht? Tik, typ, foto, klaar — geen herdrukken, geen wachten op de designer.",
      },
      {
        q: "Hoeveel talen worden ondersteund?",
        a: "35 talen met ingebouwde AI-vertaling. Eén tik vertaalt je hele menu, en de AI snapt culinaire context — namen en beschrijvingen klinken natuurlijk in elke taal. Toeristen bestellen meer als ze het echt begrijpen.",
      },
    ],
  },

  finalCta: {
    heading: "Klaar in 2 minuten.",
    headingAccent: "Gratis voor 14 dagen.",
    sub: "Geen creditcard. Stop wanneer je wilt. Sluit je aan bij 500+ restaurants op IQ Rest.",
  },

  scan: {
    heading: "Papieren menu of PDF?",
    headingAccent: "AI digitaliseert het in 60 seconden.",
    sub: "Upload — AI haalt categorieën, gerechten en prijzen eruit.",
    cta: "Scan mijn menu →",
  },
  footer: {
    featureLinks: [
      { href: "/nl/online-orders", label: "Online bestellingen" },
      { href: "/nl/ai-translation", label: "AI-vertaling" },
      { href: "/nl/reservations", label: "Reserveringen" },
      { href: "/nl/mobile-management", label: "Beheer op mobiel" },
      { href: "/nl/easy-menu", label: "Menu-editor" },
      { href: "/nl/custom-design", label: "Video- en foto-achtergronden" },
      { href: "/nl/color-scheme", label: "Merkkleuren" },
      { href: "/nl/multilingual", label: "Meertalige website" },
      { href: "/nl/ai-images", label: "AI-foto-optimalisatie" },
      { href: "/nl/analytics", label: "Statistieken" },
      { href: "/nl/instant-setup", label: "Direct opzetten" },
      { href: "/nl/personal-support", label: "Persoonlijke support" },
    ],
    navLinks: [
      { href: "#pricing", label: "Prijzen" },
      { href: "#faq", label: "Vragen" },
      { href: "/nl/changelog", label: "Updates" },
      { href: "/nl/languages", label: "Taal wijzigen" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Alle rechten voorbehouden.",
  },
};
