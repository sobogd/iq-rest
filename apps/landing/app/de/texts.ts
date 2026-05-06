import { ScanLine, Languages, CalendarCheck, Palette, Smartphone, ChefHat } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "de",
  htmlDir: "ltr",

  meta: {
    title: "QR-Speisekarte für Restaurants — Direktbestellungen, 0% Provision | IQ Rest",
    description:
      "Schluss mit gedruckten Speisekarten und Provisionen der Lieferdienste. QR-Speisekarte, Direktbestellungen, Reservierungen & mehrsprachige Webseite. 14 Tage gratis testen, ohne Kreditkarte.",
    canonical: "https://iq-rest.com/de",
    ogLocale: "de_DE",
    ogTitle: "QR-Speisekarte für Restaurants — Direktbestellungen, 0% Provision",
    ogDescription:
      "QR-Speisekarte, Direktbestellungen, Reservierungen & KI-Übersetzung. In 2 Minuten startklar. 14 Tage gratis — ohne Kreditkarte.",
  },

  ctaText: "Kostenlos starten →",
  demoText: "Live-Demo ansehen",
  microcopy: "14 Tage gratis · Keine Kreditkarte · Jederzeit kündbar",

  header: {
    navFeatures: "Funktionen",
    navHow: "So geht's",
    navPricing: "Preise",
    navFaq: "FAQ",
    signIn: "Anmelden",
    cta: "Kostenlos starten →",
  },

  hero: {
    verticals: ["Restaurants", "Cafés", "Bars", "Hotels", "Pizzerien"],
    variants: [
      {
        headline: "Schluss mit dem Nachdrucken.",
        headlineAccent: "Schluss mit 30% an Lieferdienste.",
        sub: "QR-Speisekarte, Direktbestellungen, Reservierungen & mehrsprachige Webseite. In 2 Minuten startklar — ohne Kreditkarte.",
      },
      {
        headline: "Dein Restaurant verdient mehr als",
        headlineAccent: "Papier und verpasste Anrufe.",
        sub: "Direktbestellungen, sofortige Karten-Updates und Reservierungen rund um die Uhr. In 2 Minuten eingerichtet.",
      },
      {
        headline: "Ein QR-Code.",
        headlineAccent: "Null Provision. Schluss mit Papierkarten.",
        sub: "QR-Speisekarte, Online-Bestellungen und Reservierungen — alles an einem Ort. 14 Tage gratis, keine Kreditkarte.",
      },
      {
        headline: "Direktbestellungen kassieren.",
        headlineAccent: "Provisionen sparen.",
        sub: "Gäste scannen, bestellen und zahlen — direkt zu dir, ohne Wolt-Schnitt. In 2 Minuten startklar.",
      },
      {
        headline: "Mehr Bestellungen. Mehr Reservierungen.",
        headlineAccent: "Kein Papier, keine Apps.",
        sub: "QR-Speisekarte + Reservierungen + mehrsprachige Webseite auf Autopilot. 14 Tage gratis testen.",
      },
      {
        headline: "Touristen verstehen die Karte nicht?",
        headlineAccent: "In 2 Minuten gelöst.",
        sub: "Die KI übersetzt deine ganze Karte in 35 Sprachen. Plus QR-Bestellungen und Reservierungen inklusive.",
      },
      {
        headline: "Von Papierkarte zum QR-Code,",
        headlineAccent: "bevor der Espresso kalt ist.",
        sub: "QR-Speisekarte, Direktbestellungen und Reservierungen rund um die Uhr. In 2 Minuten — ohne Kreditkarte.",
      },
      {
        headline: "Erfrischend einfache QR-Karte.",
        headlineAccent: "Innen leise mächtig.",
        sub: "Direktbestellungen, KI-Übersetzung, Reservierungen und Webseite — alles mit einem Tipp am Handy.",
      },
    ],
    painBullets: [
      "Keine Druckkosten — Preise sofort ändern",
      "Keine Provisionen — Bestellungen direkt zu dir",
      "Keine verpassten Anrufe — Reservierungen 24/7",
      "35 Sprachen — kein Tourist geht verloren",
    ],
    rating: "4,9 · über 500 Restaurants in 30+ Ländern",
  },

  features: {
    heading: "Alles, was du brauchst.",
    headingAccent: "Nichts, was du nicht brauchst.",
    sub: "Für Restaurants gemacht. Am Tisch eingesetzt.",
    items: [
      {
        Icon: ScanLine,
        title: "100% jeder Bestellung behalten",
        desc: "Gäste scannen, bestellen und zahlen — direkt an dich. Keine App-Downloads, keine 30% an Lieferdienste. Jede Bestellung landet in Echtzeit mit Tischnummer im Dashboard.",
        tag: "Direktbestellung",
      },
      {
        Icon: Languages,
        title: "An Touristen in ihrer Sprache verkaufen",
        desc: "Ein Tipp übersetzt die ganze Karte in 35 Sprachen. Die KI versteht den kulinarischen Kontext — Gäste bestellen mehr, wenn sie das Gericht wirklich verstehen.",
        tag: "KI-Übersetzung",
      },
      {
        Icon: CalendarCheck,
        title: "Keine Reservierung mehr verpassen",
        desc: "Gäste reservieren rund um die Uhr, keine Anrufe. Auto- oder manuelle Bestätigung, E-Mail-Erinnerungen inklusive — weniger No-Shows, null Stress.",
        tag: "Reservierungen",
      },
      {
        Icon: Palette,
        title: "In 1 Sekunde unvergesslich",
        desc: "Lege ein Video aus deiner Küche oder ein Hero-Foto als Karten-Hintergrund ein. Gäste scrollen weniger. Deine Marke bleibt hängen.",
        tag: "Eigenes Design",
      },
      {
        Icon: Smartphone,
        title: "In Sekunden ändern, nicht in Tagen",
        desc: "Preise ändern, Fotos tauschen, Tagesgericht ergänzen — vom Handy, zwischen den Tischen. Sofort live für Gäste. Nie wieder nachdrucken.",
        tag: "Menü-Editor",
      },
      {
        Icon: ChefHat,
        title: "Jede Schicht schneller servieren",
        desc: "Bestellungen landen sofort auf dem Küchenbildschirm, sobald der Gast absendet. Null Papier, null Geschrei, null verlorene Bons — weniger Fehler, schnellerer Service, mehr Gedecke pro Abend.",
        tag: "Demnächst",
      },
    ],
  },

  founder: {
    eyebrow: "Von einem Gastronomen gebaut",
    quoteStart:
      "Meine Frau und ich haben ein Café eröffnet und wochenlang nach einem System gesucht, das Online-Bestellungen, Reservierungen und obendrauf modernes Design kann. Alles, was wir testeten, war klobig, hässlich oder es fehlte die Hälfte —",
    quoteAccent: "also haben wir das gebaut, das wir uns gewünscht hätten.",
    sign: "Bogdan Sokolov · Gründer, Ex-Café-Inhaber",
    photoAlt: "Bogdan, Gründer von IQ Rest",
  },

  how: {
    heading: "In unter 2 Minuten online",
    sub: "Vier kurze Schritte. Kein Setup, keine Installation.",
    steps: [
      { n: "1", t: "Registrieren", d: "E-Mail oder Google. Keine Kreditkarte. In 10 Sekunden fertig." },
      { n: "2", t: "Restaurantname eingeben", d: "Einfach den Namen tippen. Erscheint oben auf deiner Karte." },
      { n: "3", t: "Erstes Gericht hinzufügen", d: "Kategorie, Name, Preis, Foto. Das war's." },
      { n: "4", t: "Hintergrund wählen & QR drucken", d: "Hintergrund auswählen. QR holen. Auf die Tische kleben." },
    ],
  },

  pricing: {
    badge: "Keine Provisionen · Keine Verträge",
    heading: "Ein Plan.",
    headingAccent: "Alles inklusive.",
    sub: "QR-Speisekarte, Bestellungen, KI-Übersetzung, Restaurant-Webseite & Reservierungen. Ein einfacher Preis.",
    monthlyLabel: "Monatlich",
    yearlyLabel: "Jährlich",
    saveBadge: "25% sparen",
    perMonth: "pro Monat",
    billedAnnually: "Jährliche Abrechnung {total}",
    youSave: "Du sparst {amount}",
    trust: {
      secure: "Sichere Zahlung mit Stripe",
      noCommitment: "Keine Bindung",
      quick: "In Minuten aktiv",
      restaurants: "500+ Restaurants",
    },
  },

  faq: {
    eyebrow: "Fragen?",
    heading: "Häufig gestellte",
    headingAccent: "Fragen.",
    sub: "Was Gastronomen vor der Anmeldung wissen wollen. Deine Frage fehlt? Schreib uns auf WhatsApp — echte Menschen antworten.",
    whatsappCta: "Auf WhatsApp fragen",
    whatsappPrefill: "Hallo, ich habe eine Frage zu IQ Rest",
    items: [
      {
        q: "Was beinhaltet die Testphase und was passiert danach?",
        a: "14 Tage voller Zugang, keine Kreditkarte. Nach 14 Tagen pausiert dein Account, falls du keine Zahlungsmethode hinzufügst — wir buchen niemals automatisch ab. Zahlungsdaten jederzeit später ergänzen, um zu reaktivieren. Kündigung mit einem Klick.",
      },
      {
        q: "Nehmt ihr Provision auf Bestellungen?",
        a: "Null. Jede Bestellung von deiner QR-Karte geht direkt an dich — kein Anteil für uns, keine Wolt- oder Lieferando-Gebühren. Ein fester Monatspreis, mehr nicht.",
      },
      {
        q: "Brauchen Gäste eine App? Brauche ich Tech-Kenntnisse?",
        a: "Null Apps für Gäste — sie scannen den QR mit der Kamera, die Karte öffnet sich im Browser. Null Tech-Kenntnisse für dich — das ganze Dashboard läuft am Handy, tippen, ziehen, fertig — das ist die ganze Lernkurve.",
      },
      {
        q: "Wie schnell kann ich Preise und neue Gerichte ändern?",
        a: "Sofort. Preis am Handy ändern, Gäste sehen es in Sekunden. Neues Gericht? Tippen, schreiben, Foto hochladen, fertig — kein Nachdruck, kein Designer.",
      },
      {
        q: "Wie viele Sprachen werden unterstützt?",
        a: "35 Sprachen mit integrierter KI-Übersetzung. Ein Tipp übersetzt die ganze Karte, und die KI versteht kulinarischen Kontext — Namen und Beschreibungen klingen in jeder Sprache natürlich. Touristen bestellen mehr, wenn sie das Menü wirklich verstehen.",
      },
    ],
  },

  finalCta: {
    heading: "In 2 Minuten startklar.",
    headingAccent: "14 Tage gratis.",
    sub: "Keine Kreditkarte. Jederzeit kündbar. Mach mit bei 500+ Restaurants, die schon IQ Rest nutzen.",
  },

  scan: {
    heading: "Papierkarte oder PDF?",
    headingAccent: "KI digitalisiert sie in 60 Sekunden.",
    sub: "Hochladen — KI erkennt Kategorien, Gerichte und Preise.",
    cta: "Karte scannen →",
  },
  footer: {
    featureLinks: [
      { href: "/de/online-orders", label: "Online-Bestellungen" },
      { href: "/de/ai-translation", label: "KI-Übersetzung" },
      { href: "/de/reservations", label: "Reservierungen" },
      { href: "/de/mobile-management", label: "Verwaltung am Handy" },
      { href: "/de/easy-menu", label: "Karten-Editor" },
      { href: "/de/custom-design", label: "Video- & Foto-Hintergründe" },
      { href: "/de/color-scheme", label: "Markenfarben" },
      { href: "/de/multilingual", label: "Mehrsprachige Webseite" },
      { href: "/de/ai-images", label: "KI-Bildoptimierung" },
      { href: "/de/analytics", label: "Statistiken" },
      { href: "/de/instant-setup", label: "Sofort-Setup" },
      { href: "/de/personal-support", label: "Persönlicher Support" },
    ],
    navLinks: [
      { href: "#pricing", label: "Preise" },
      { href: "#faq", label: "Fragen" },
      { href: "/de/changelog", label: "Neuigkeiten" },
      { href: "/de/languages", label: "Sprache wechseln" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Alle Rechte vorbehalten.",
  },
};
