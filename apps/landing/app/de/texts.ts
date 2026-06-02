import { CalendarCheck, ChefHat, Receipt, Monitor } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "de",
  htmlDir: "ltr",

  meta: {
    title: "QR-Speisekarte für Restaurants — Direkte Bestellungen ohne Provision | IQ Rest",
    description:
      "All-in-one-Plattform für Restaurants: digitale Speisekarte, QR-Bestellungen, Tischreservierung und Küchen-Display. Start in 5 Minuten. 14 Tage kostenlos, ohne Kreditkarte.",
    canonical: "https://iq-rest.com/de",
    ogLocale: "de_DE",
    ogTitle: "QR-Speisekarte für Restaurants — Direkte Bestellungen ohne Provision",
    ogDescription:
      "Digitale Speisekarte, QR-Bestellungen, Tischreservierung und KI-Übersetzung. Start in 5 Minuten. 14 Tage kostenlos.",
  },

  ctaText: "Kostenlos starten",
  homeCtaText: "Plattform aufbauen",
  demoText: "Demo ansehen",
  microcopy: "14 Tage kostenlos · Ohne Kreditkarte · Jederzeit kündbar",

  header: {
    navFeatures: "Funktionen",
    navHow: "So funktioniert es",
    navPricing: "Preise",
    navFaq: "FAQ",
    signIn: "Anmelden",
    viewFeatures: "Funktionen ansehen",
    cta: "Kostenlos starten",
  },

  hero: {
    verticals: ["Restaurants", "Cafés", "Bars", "Hotels", "Pizzerien"],
    headline: "Digitale Speisekarte für Restaurants. Start in 5 Minuten.",
    sub: "Digitale Speisekarte für Ihr Restaurant in 5 Minuten. Alles inklusive: No-Code-Editor, KI-Erkennung gedruckter Speisekarten, QR-Codes für Tische und direkte Bestellungen ohne Provision.",
    dynamicHeadlines: ["0 % Provision.", "35 KI-Sprachen.", "Online-Bestellungen.", "Reservierungen 24/7.", "Premium-Design."],
    painBullets: [
      "0 % Provision: Jede Bestellung geht direkt an Ihr Restaurant.",
      "KI-Übersetzung in 35 Sprachen — Touristen verstehen die Speisekarte und bestellen mehr.",
      "Reservierung 24/7: Gäste reservieren selbst Tische, ohne Anrufe in Stoßzeiten.",
      "Flexible Preise: Änderungen in der Speisekarte sind in Sekunden live.",
    ],
    rating: "Über 500 Restaurants in 30+ Ländern",
  },

  features: {
    heading: "Alles, was Sie brauchen.",
    headingAccent: "Nichts überflüssiges.",
    sub: "Entwickelt für Restaurants. Täglich genutzt am Tisch, in der Küche und im Service.",
    items: [
      { Icon: Monitor, title: "Digitale Speisekarte", desc: "Speisekarte im Browser mit Fotos, Preisen, Allergenen und Beschreibungen. Aktualisiert in Echtzeit vom Smartphone. Gäste sehen die Karte in ihrer Sprache; das Restaurant spart Druckkosten.", tag: "Digitale Speisekarte", href: "/de/digitale-speisekarte-restaurant" },
      { Icon: Receipt, title: "Bestellannahme: Gast und Servicekraft", desc: "QR-Code am Tisch für den Gast oder die Servicekraft nimmt die Bestellung vom Handy auf — beide landen direkt in der Küche oder auf WhatsApp. Ohne Provision, mit Tischnummer auf jedem Ticket.", tag: "Bestellannahme", href: "/de/restaurant-bestellsystem" },
      { Icon: CalendarCheck, title: "Tischreservierung 24/7", desc: "Gäste reservieren Tische selbst über die Website oder QR-Speisekarte, während Sie im Service beschäftigt sind. Tischkalender, automatische Bestätigungen und Erinnerungen. Kein verpasster Gast.", tag: "Reservierung", href: "/de/tisch-reservierung" },
      { Icon: ChefHat, title: "Küchen-Display (KDS)", desc: "Papierbons sind nicht mehr nötig. Bestellungen aus dem Service landen direkt auf dem Bildschirm des Kochs — Spalten „In Zubereitung / Fertig / Serviert“, Allergene und Notizen farblich hervorgehoben. Auf Tablet oder Smartphone.", tag: "KDS", href: "/de/kuechen-display" },
    ],
  },

  founder: {
    eyebrow: "Gebaut von Gastronomen",
    quoteStart:
      "Meine Frau und ich haben ein eigenes Café geführt und wissen aus erster Hand, wie ein Restaurantalltag wirklich aussieht — Bestellannahme, Reservierungen, Service- und Küchenablauf. Wir wollten ein einziges Werkzeug: modern, einfach zu starten und auf einen Blick verständlich —",
    quoteAccent: "so haben wir begonnen, die Plattform zu entwickeln, die wir nun für andere Gastronomen weiterentwickeln.",
    sign: "Bogdan Sokolov · Gründer, ehemaliger Café-Besitzer",
    photoAlt: "Bogdan Sokolov, Gründer von IQ Rest",
  },

  how: {
    heading: "Start in 5 Minuten",
    sub: "Vier kurze Schritte. Keine Installation, keine technische Einrichtung.",
    steps: [
      { n: "1", t: "Typ und Name", d: "Wählen Sie den Lokaltyp und geben Sie den Namen ein." },
      { n: "2", t: "Speichern", d: "E-Mail eingeben oder mit Google anmelden." },
      { n: "3", t: "Speisekarte", d: "Artikel manuell hinzufügen oder gedruckte Karte für KI-Erkennung hochladen." },
      { n: "4", t: "Fertig", d: "Link oder QR-Code teilen und Bestellungen entgegennehmen." },
    ],
  },

  pricing: {
    badge: "Keine Provision · Keine Verträge",
    heading: "Ein Tarif.",
    headingAccent: "Alles inklusive.",
    sub: "QR-Speisekarte, Bestellannahme, KI-Übersetzung, Restaurant-Website und Reservierung. Eine transparente monatliche Gebühr.",
    monthlyLabel: "Monatlich",
    yearlyLabel: "Jährlich",
    saveBadge: "25 % sparen",
    perMonth: "pro Monat",
    billedAnnually: "Jährliche Abrechnung: {total}",
    youSave: "Sie sparen {amount}",
    trust: { secure: "Sichere Stripe-Zahlung", noCommitment: "Keine Bindung", quick: "In Minuten aktiv", restaurants: "500+ Restaurants" },
  },

  faq: {
    eyebrow: "Noch Fragen?",
    heading: "Häufig gestellte",
    headingAccent: "Fragen.",
    sub: "Was Gastronomen vor der Anmeldung fragen. Frage nicht dabei? Schreiben Sie uns auf WhatsApp — echte Menschen antworten, kein Bot.",
    whatsappCta: "Auf WhatsApp fragen",
    whatsappPrefill: "Hallo, ich habe eine Frage zu IQ Rest",
    items: [
      { q: "Was umfasst die Testphase und was passiert danach?", a: "14 Tage voller Zugriff auf alle Funktionen, ohne Kreditkarte. Nach 14 Tagen wird das Konto pausiert, wenn keine Zahlungsmethode hinterlegt ist — wir berechnen nie automatisch. Sie können später eine Zahlung hinzufügen und genau dort weitermachen, wo Sie aufgehört haben. Kündigung jederzeit mit einem Klick." },
      { q: "Berechnen Sie Provision auf Bestellungen?", a: "Nein. Jede Bestellung aus der QR-Speisekarte geht direkt an das Restaurant — keine Prozente von unserer Seite, keine Aggregator-Gebühren. Eine feste monatliche Gebühr und sonst nichts." },
      { q: "Brauchen Gäste eine App, brauchen wir technische Kenntnisse?", a: "Gäste brauchen keine App — sie richten die Smartphone-Kamera auf den QR-Code und die Speisekarte öffnet sich im Browser. Restaurants brauchen ebenfalls keine technischen Kenntnisse: Das Admin-Panel läuft in jedem modernen Browser auf Smartphone, Tablet oder Laptop. Jede Aktion ist per Klick und Drag-and-Drop, ohne Code." },
      { q: "Wie schnell ändern sich Preise und erscheinen neue Gerichte?", a: "Sofort. Preis vom Handy ändern — Gäste sehen es binnen Sekunden. Ein neues Gericht erfordert nur ein paar Tipps: Name, Preis, Foto. Kein Nachdruck, kein Warten auf einen Designer." },
      { q: "Wie viele Sprachen werden unterstützt?", a: "35 Sprachen mit integrierter KI-Übersetzung. Ein Tipp und die gesamte Speisekarte ist übersetzt; die KI versteht den kulinarischen Kontext — Namen und Beschreibungen klingen in jeder Sprache natürlich. Touristen bestellen sicherer, wenn sie die Speisekarte wirklich verstehen." },
    ],
  },

  finalCta: {
    heading: "Start in 5 Minuten.",
    headingAccent: "14 Tage kostenlos.",
    sub: "Ohne Kreditkarte, jederzeit kündbar. Schließen Sie sich 500+ Restaurants an, die bereits mit IQ Rest arbeiten.",
  },

  scan: {
    heading: "Sie haben eine Papier-Speisekarte oder PDF?",
    headingAccent: "KI digitalisiert sie in 60 Sekunden.",
    sub: "Foto oder Dokument hochladen — KI erkennt automatisch Kategorien, Gerichte und Preise.",
    cta: "Speisekarte scannen →",
  },

  pricingHero: {
    chips: ["Keine Provision", "Keine Verträge", "14 Tage kostenlos"],
    heading: "Preise.",
    headingAccent: "Keine versteckten Gebühren.",
    sub: "Eine transparente monatliche Gebühr. Keine Prozente auf Bestellungen und keine Aggregator-Provisionen. Abo jederzeit kündbar.",
    popularBadge: "Beliebt",
    perMonthSuffix: "/Mon.",
    whenAnnualTemplate: "jährliche Abrechnung · {total} pro Jahr",
    orMonthlyTemplate: "oder {price}/Mon.",
    savingsTemplate: "Ersparnis {amount} pro Jahr",
    plans: {
      basic: {
        name: "Basic",
        tagline: "Speisekarte, QR-Bestellungen und KI-Übersetzung. Start in 5 Minuten.",
        features: [
          "QR-Speisekarte für jeden Tisch",
          "Digitale Speisekarte mit Fotos und Allergenen",
          "KI-Übersetzung in 35 Sprachen",
          "Bestellungen aus der Karte (optional)",
          "KI-Generierung von Gerichtsfotos",
          "Verwaltung von jedem Smartphone oder Tablet",
        ],
      },
      pro: {
        name: "Pro",
        tagline: "Volle Restaurantkontrolle: Küchen-Display und Reservierungen.",
        features: [
          "Alles aus Basic",
          "Küchen-Display (KDS)",
          "Online-Tischreservierung 24/7",
          "Priorisierter WhatsApp-Support",
        ],
      },
    },
  },

  footer: {
    featureLinks: [
      { href: "/de/digitale-speisekarte-restaurant", label: "Digitale Speisekarte" },
      { href: "/de/restaurant-bestellsystem", label: "Bestellannahme" },
      { href: "/de/tisch-reservierung", label: "Tischreservierung" },
      { href: "/de/kuechen-display", label: "Küchen-Display" },
    ],
    navLinks: [
      { href: "/de/preise", label: "Preise" },
      { href: "#faq", label: "FAQ" },
      { href: "/de/languages", label: "Sprache wechseln" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Alle Rechte vorbehalten.",
  },
};
