import { QrCode, Languages, CalendarCheck, Palette, Smartphone, ChefHat } from "lucide-react";
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
      "QR-Speisekarte, Direktbestellungen, Reservierungen & KI-Übersetzung. In 5 Minuten startklar. 14 Tage gratis — ohne Kreditkarte.",
  },

  ctaText: "Kostenlos testen",
  demoText: "Live-Demo ansehen",
  microcopy: "14 Tage gratis · Keine Kreditkarte · Jederzeit kündbar",

  header: {
    navFeatures: "Funktionen",
    navHow: "So geht's",
    navPricing: "Preise",
    navFaq: "FAQ",
    signIn: "Anmelden",
    cta: "Starten",
  },

  hero: {
    verticals: ["Restaurants", "Cafés", "Bars", "Hotels", "Pizzerien"],
    headline: "QR-Karte in 5 Minuten.",
    sub: "Fertige Restaurant-Website — ohne Entwickler und Auftragnehmer. Direktbestellungen, Reservierungen und Gast-Analysen in einem Abo.",
    dynamicHeadlines: ["0% Provision.", "35 Sprachen mit KI.", "Online-Bestellung.", "Reservierung 24/7.", "Premium-Design."],
    painBullets: ["0% Provision: Alle Bestellungen gehen direkt an Sie.", "KI-Übersetzung: 35 Sprachen für mehr Umsatz durch Touristen.", "Reservierung 24/7: Volle Auslastung ohne Telefonstress.", "Flexible Preise: Menü in Sekundenschnelle aktualisieren."],
    rating: "Über 500 Restaurants in 30+ Ländern",
  },

  features: {
    heading: "Alles, was du brauchst.",
    headingAccent: "Nichts, was du nicht brauchst.",
    sub: "Für Restaurants gemacht. Am Tisch eingesetzt.",
    items: [
      
      {
        Icon: QrCode,
        title: "Restaurant Bestellsystem am Tisch",
        desc: "Der Gast scannt den QR am Tisch, baut die Bestellung und sie landet auf deinem Küchen-Tablet oder WhatsApp. Null Provision, mit Tischnummer.",
        tag: "QR-Bestellung",
        href: "/de/restaurant-bestellsystem",
      },
      {
        Icon: Languages,
        title: "KI-Übersetzer (35 Sprachen)",
        desc: "Unsere KI versteht Gastronomie. Touristen bestellen 20% mehr, wenn sie die Gerichte verstehen.",
        tag: "KI-Übersetzung",
      },
      {
        Icon: CalendarCheck,
        title: "Tischreservierung",
        desc: "Das System nimmt Reservierungen an, während Sie in der Küche stehen. Kein Gast geht verloren.",
        tag: "Reservierungen",
      },
      {
        Icon: Palette,
        title: "Modernes Design",
        desc: "Video-Hintergründe und appetitliche Fotos. Ihre Karte wirkt hochwertig und einladend.",
        tag: "Eigenes Design",
      },
      {
        Icon: Smartphone,
        title: "Schnell-Editor",
        desc: "Verwalten Sie Stop-Listen und Preise direkt vom Smartphone. Änderungen sind sofort live.",
        tag: "Menü-Editor",
      },
      {
        Icon: ChefHat,
        title: "Demnächst: Küchendisplay",
        desc: "Schluss mit Zettelwirtschaft. Bestellungen gehen direkt auf den Bildschirm des Kochs.",
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
    heading: "In unter 5 Minuten online",
    sub: "Vier kurze Schritte. Kein Setup, keine Installation.",
    steps: [
      { n: "1", t: "Art und Name", d: "Wähle den Typ und gib den Namen ein." },
      { n: "2", t: "Speichern", d: "E-Mail eingeben oder mit Google anmelden." },
      { n: "3", t: "Menü", d: "Selbst erstellen oder die Speisekarte scannen." },
      { n: "4", t: "Fertig", d: "Anschauen, teilen und Bestellungen annehmen." },
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
    heading: "In 5 Minuten startklar.",
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
      { href: "/de/restaurant-bestellsystem", label: "Restaurant Bestellsystem" },
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
