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

  ctaText: "Gratis starten →",
  demoText: "Live demo bekijken",
  microcopy: "14 dagen gratis · Geen creditcard · Stop wanneer je wilt",

  header: {
    navFeatures: "Functies",
    navHow: "Hoe het werkt",
    navPricing: "Prijzen",
    navFaq: "FAQ",
    signIn: "Inloggen",
    cta: "Gratis starten →",
  },

  hero: {
    verticals: ["Restaurants", "Cafés", "Bars", "Hotels", "Pizzeria's"],
    variants: [
      {
        headline: "Geen menukaarten meer printen.",
        headlineAccent: "Geen 30% meer aan bezorgapps.",
        sub: "QR menukaart, directe bestellingen, reserveringen en meertalige website. Klaar in 2 minuten — geen creditcard.",
      },
      {
        headline: "Je restaurant verdient meer dan",
        headlineAccent: "papier en gemiste oproepen.",
        sub: "Directe bestellingen, directe menu-updates en reserveringen 24/7. Opgezet in 2 minuten.",
      },
      {
        headline: "Eén QR-code.",
        headlineAccent: "Nul commissie. Adieu papier.",
        sub: "QR menukaart, online bestellingen en reserveringen — alles op één plek. 14 dagen gratis, geen creditcard.",
      },
      {
        headline: "Krijg directe bestellingen.",
        headlineAccent: "Sla de commissie over.",
        sub: "Gasten scannen, bestellen en betalen — direct naar jou, zonder Thuisbezorgd-aandeel. Klaar in 2 minuten.",
      },
      {
        headline: "Meer bestellingen. Meer reserveringen.",
        headlineAccent: "Geen papier, geen apps.",
        sub: "QR menu + reserveringen + meertalige site op autopilot. 14 dagen gratis proberen.",
      },
      {
        headline: "Toeristen begrijpen je menu niet?",
        headlineAccent: "In 2 minuten geregeld.",
        sub: "AI vertaalt je hele menu in 35 talen. Plus QR-bestellingen en reserveringen inbegrepen.",
      },
      {
        headline: "Van papier naar QR-code,",
        headlineAccent: "voor je espresso koud is.",
        sub: "QR menu, directe bestellingen en reserveringen 24/7. Klaar in 2 minuten — geen creditcard.",
      },
      {
        headline: "Verfrissend simpele QR menukaart.",
        headlineAccent: "Stilletjes krachtig vanbinnen.",
        sub: "Directe bestellingen, AI-vertaling, reserveringen en website — alles met één tik op je telefoon.",
      },
    ],
    painBullets: [
      "Geen prints meer — wijzig prijzen direct",
      "Nul commissie — bestellingen direct naar jou",
      "Geen gemiste oproepen — reserveringen 24/7",
      "35 talen — verlies nooit meer een toerist",
    ],
    rating: "4,9 · meer dan 500 restaurants in 30+ landen",
  },

  features: {
    heading: "Alles wat je nodig hebt.",
    headingAccent: "Niets dat je niet nodig hebt.",
    sub: "Gemaakt voor restaurants. Gebruikt aan tafel.",
    items: [
      {
        Icon: ScanLine,
        title: "Houd 100% van elke bestelling",
        desc: "Gasten scannen, bestellen en betalen — direct naar jou. Geen apps downloaden, geen 30% bezorgkosten. Elke bestelling komt in real-time met tafelnummer in je dashboard.",
        tag: "Directe bestellingen",
      },
      {
        Icon: Languages,
        title: "Verkoop aan toeristen in hun taal",
        desc: "Eén tik vertaalt je hele menu in 35 talen. AI snapt de culinaire context — gasten bestellen meer als ze het gerecht echt begrijpen.",
        tag: "AI-vertaling",
      },
      {
        Icon: CalendarCheck,
        title: "Mis geen reservering meer terwijl je kookt",
        desc: "Gasten reserveren 24/7, geen telefoongesprekken. Auto- of handmatige bevestiging, e-mailherinneringen inbegrepen — minder no-shows, nul stress.",
        tag: "Reserveringen",
      },
      {
        Icon: Palette,
        title: "Onvergetelijk in 1 seconde",
        desc: "Plaats een keukenvideo of een mooie foto als achtergrond van je menu. Gasten stoppen met scrollen. Je merk blijft hangen.",
        tag: "Eigen ontwerp",
      },
      {
        Icon: Smartphone,
        title: "Update in seconden, niet in dagen",
        desc: "Wijzig prijzen, vervang foto's, voeg de daghap toe — vanaf je telefoon, tussen tafels door. Direct live voor gasten. Nooit meer printen.",
        tag: "Menu-editor",
      },
      {
        Icon: ChefHat,
        title: "Sneller serveren, elke shift",
        desc: "Bestellingen verschijnen op het keukenscherm zodra de gast bevestigt. Nul papier, nul geschreeuw, nul verloren bonnen — minder fouten, snellere service, meer couverts per avond.",
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
