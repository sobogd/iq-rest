import { QrCode, MessageCircle, ChefHat, Settings2, Languages, BarChart3 } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

// /de/restaurant-bestellsystem targets the broad-match German keyword
// "restaurant bestellsystem" (40/mo, MEDIUM competition). NOT a
// delivery-aggregator competitor: the order goes from the guest's QR
// menu to your kitchen tablet or to your restaurant's WhatsApp number.
// Online card payment is opt-in custom integration, not enabled by
// default.
export const TEXTS: LandingTexts = {
  htmlLang: "de",
  htmlDir: "ltr",

  meta: {
    title: "Restaurant Bestellsystem — QR & WhatsApp | IQ Rest",
    description:
      "Restaurant Bestellsystem: Gast scannt den QR am Tisch, bestellt, die Bestellung landet direkt auf deinem Küchen-Tablet oder WhatsApp. Keine Provision, Tischnummer auf jedem Bon. 14 Tage gratis.",
    canonical: "https://iq-rest.com/de/restaurant-bestellsystem",
    ogLocale: "de_DE",
    ogTitle: "Restaurant Bestellsystem — Direkt in die Küche",
    ogDescription:
      "Der Gast scannt den QR am Tisch, baut die Bestellung und sie landet auf deinem Tablet oder WhatsApp — kein Aggregator, keine Provision, echte Tischnummer auf jedem Bon.",
  },

  ctaText: "Meine Bestellungen aktivieren",
  demoText: "Live-Demo ansehen",
  microcopy: "Ab 6,90€/Monat · 14 Tage gratis · Jederzeit kündbar",

  header: {
    navFeatures: "Funktionen",
    navHow: "So funktioniert's",
    navPricing: "Preise",
    navFaq: "FAQ",
    signIn: "Anmelden",
    cta: "Kostenlos testen",
  },

  hero: {
    verticals: ["Restaurants", "Cafés", "Bistros", "Pizzerien", "Bars", "Brauereigaststätten"],
    headline: "Restaurant Bestellsystem.",
    sub: "Der Gast scannt den QR an seinem Tisch, baut die Bestellung am Handy und der Bon landet direkt auf deinem Küchen-Tablet oder deinem WhatsApp. Kein Aggregator, keine Provision, echte Tischnummer auf jedem Bon.",
    dynamicHeadlines: [
      "Bestellung am Tisch.",
      "Direkt aufs Küchen-Tablet.",
      "Oder direkt zu WhatsApp.",
      "Keine Provision.",
      "Mit Tischnummer.",
    ],
    painBullets: [
      "Restaurant Bestellsystem, das dem Restaurant wirklich gehört — kein Mittelsmann, keine Provision.",
      "Bestellungen landen auf dem Küchen- oder Manager-Tablet mit Tischnummer, Modifikatoren, Allergenen und Notizen.",
      "Oder direkt an die WhatsApp-Nummer des Restaurants — ideal für To-Go oder kleine Teams.",
      "QR pro Tisch (oder einer für den ganzen Laden) wird automatisch generiert.",
    ],
    rating: "+500 Restaurants in 30+ Ländern",
  },

  features: {
    heading: "Ein Bestellsystem,",
    headingAccent: "gebaut für den Tisch.",
    sub: "Echte Funktionen — kein Klon eines Lieferaggregators.",
    items: [
      {
        Icon: QrCode,
        title: "QR-Speisekarte mit Warenkorb an jedem Tisch",
        desc: "Der Gast scannt den QR am Tisch, blättert die Karte in seiner Sprache, fügt Gerichte mit Modifikatoren hinzu, hinterlässt eine Notiz für die Küche und sendet. Keine App nötig.",
        tag: "QR-Bestellung",
      },
      {
        Icon: ChefHat,
        title: "Bestellungen auf deinem Küchen-Tablet",
        desc: "Jede neue Bestellung erscheint im Küche-Tab des Dashboards — auf dem Tablet am Pass — mit Tischnummer, Gerichten, Varianten, Allergenen und Gästekommentar. Mit einem Tap von in Arbeit zu fertig.",
        tag: "Küchenansicht",
      },
      {
        Icon: MessageCircle,
        title: "Oder Bestellungen an WhatsApp",
        desc: "Stell das Restaurant in den WhatsApp-Modus (oder beide gleichzeitig) und jede Bestellung kommt als formatierte Nachricht an die WhatsApp-Nummer des Lokals — perfekt für To-Go, kleine Teams oder wenn der Manager nicht vor Ort ist.",
        tag: "WhatsApp-Modus",
      },
      {
        Icon: Settings2,
        title: "Modifikatoren, Varianten und Allergene",
        desc: "Jedes Gericht hat seine Variantengruppen (Größe, Garstufe, Add-ons) mit Preisaufschlag, Allergen-Tags und freier Beschreibung. Der Warenkorb respektiert alles — der Bon auf dem Tablet ist eindeutig.",
        tag: "Echter Warenkorb",
      },
      {
        Icon: Languages,
        title: "Mehrsprachiger Checkout",
        desc: "Der ganze Bestellfluss — Warenkorb, Modifikatoren, Kommentar, Bestätigung — ist in 35 Sprachen übersetzt und passt sich automatisch der Sprache des Gäste-Handys an. Touristen bestellen mit Vertrauen.",
        tag: "35 Sprachen",
      },
      {
        Icon: BarChart3,
        title: "Tägliche Nummerierung und Bestelllog",
        desc: "Jede Bestellung bekommt eine Tages-Nummer für die Küche, landet in einem Log mit Summen und Zeitstempeln und füttert die Analytik. Stornierungen sind soft-deleted — die Reports bleiben sauber.",
        tag: "Bestelllog",
      },
    ],
  },

  founder: {
    eyebrow: "Gebaut von einem Café-Inhaber, nicht von einer Lieferstartup",
    quoteStart:
      "Meine Frau und ich haben ein Café eröffnet und wochenlang nach einem Weg gesucht, Bestellungen am Tisch aufzunehmen, ohne 30% an einen Aggregator abzugeben oder ein 1500€-Kassensystem zu brauchen. Alles war überladen, teuer oder hatte die Basics nicht —",
    quoteAccent: "also haben wir das Bestellsystem gebaut, das wir gerne gehabt hätten.",
    sign: "Bogdan Sokolov · Gründer, ehemaliger Café-Inhaber",
    photoAlt: "Bogdan, Gründer von IQ Rest",
  },

  how: {
    heading: "Aktiviere dein Bestellsystem",
    headingAccent: "in 4 Schritten",
    sub: "Keine Installation, kein Integrator, kein IT-Anruf. Nur dein Handy und 5 Minuten.",
    steps: [
      { n: "1", t: "Restaurant anlegen", d: "Anmeldung per E-Mail oder Google — 30 Sekunden." },
      { n: "2", t: "Karte hinzufügen", d: "Drag-and-drop oder Papier-Karte per KI scannen." },
      { n: "3", t: "Kanal wählen", d: "Küchen-Tablet, WhatsApp oder beides." },
      { n: "4", t: "QR drucken", d: "Ein QR pro Tisch — Gäste bestellen sofort." },
    ],
  },

  pricing: {
    badge: "Unbegrenzte Bestellungen · Null Provision",
    heading: "Ein Plan.",
    headingAccent: "Keine Gebühr pro Bestellung.",
    sub: "Online-Bestellungen, QR-Speisekarte, WhatsApp-Modus, mehrsprachiger Checkout und Analytik — alles in einem Abo. Kein Prozentsatz pro Transaktion.",
    monthlyLabel: "Monatlich",
    yearlyLabel: "Jährlich",
    saveBadge: "Spare 25%",
    perMonth: "pro Monat",
    billedAnnually: "Jährlich abgerechnet {total}",
    youSave: "Du sparst {amount}",
    trust: {
      secure: "Abo über Stripe abgerechnet",
      noCommitment: "Ohne Bindung",
      quick: "In Minuten live",
      restaurants: "+500 Restaurants",
    },
  },

  faq: {
    eyebrow: "Bestellsystem — häufige Fragen",
    heading: "Zum Restaurant",
    headingAccent: "Bestellsystem.",
    sub: "Was Gastronomen vor der Aktivierung der Online-Bestellungen mit IQ Rest fragen. Deine Frage fehlt? Schreib uns auf WhatsApp — echte Menschen antworten.",
    whatsappCta: "Auf WhatsApp fragen",
    whatsappPrefill: "Hallo, ich habe eine Frage zu den IQ Rest Bestellungen",
    items: [
      {
        q: "Ist das eine Lieferplattform wie Lieferando oder Uber Eats?",
        a: "Nein, und genau das ist der Punkt. IQ Rest ist der eigene Bestellkanal des Restaurants — der Gast bestellt von deinem QR, der Bon landet auf deinem Tablet oder WhatsApp, du servierst. Kein Marktplatz, kein Aggregator-Katalog, und wir nehmen nie einen Anteil von der Rechnung.",
      },
      {
        q: "Wo erscheinen die Bestellungen genau?",
        a: "Im Küche-Tab des IQ Rest Dashboards, auf jedem Tablet oder Handy am Pass oder an der Bar. Jede Bestellung zeigt Tischnummer, Gerichte mit Varianten und Allergenen, den Gästekommentar und die Tages-Bestellnummer. Per Tap: neu → in Arbeit → fertig.",
      },
      {
        q: "Kann ich die Bestellung stattdessen per WhatsApp empfangen?",
        a: "Ja. Jedes Restaurant hat drei Modi: intern (nur Küchen-Tablet), WhatsApp (die Bestellung kommt als formatierte Nachricht an die WhatsApp-Nummer) oder beides gleichzeitig. Der Modus ist ein einzelner Schalter im Dashboard — jederzeit umstellbar.",
      },
      {
        q: "Was enthält eine Bestellung — nur die Gerichte?",
        a: "Gerichte mit Varianten und Add-ons (inkl. Preisaufschlag), Allergene, Tischnummer, freier Gästekommentar und — wenn aktiviert — Name, Telefon und Adresse. Reicht, um einen To-Go-Fahrer zu schicken oder den Tisch wegen eines Allergens zurückzurufen.",
      },
      {
        q: "Können Gäste online aus der Karte bezahlen?",
        a: "Nicht standardmäßig. IQ Rest ist auf Bezahlung am Tisch ausgelegt — der Gast bestellt, du bringst die Rechnung, er zahlt wie immer. Wenn du Online-Kartenzahlung brauchst (typisch für To-Go), kann eine Stripe-Connect-Integration auf Anfrage eingerichtet werden — schreib uns auf WhatsApp.",
      },
      {
        q: "Brauche ich ein spezielles Tablet, Drucker oder Kassen-Hardware?",
        a: "Nein. Jedes Tablet, jeder Laptop oder jedes Handy mit Browser funktioniert — Dashboard öffnen, einloggen, Küche-Tab offen lassen. Wenn du schon ein POS hast, läuft IQ Rest daneben; wir ersetzen deine Kasse nicht.",
      },
      {
        q: "Wie weiß der Gast, dass die Bestellung angekommen ist?",
        a: "Er sieht im Browser eine Bestätigung mit der Tages-Bestellnummer. Der Küche-Tab auf deiner Seite aktualisiert sich in Echtzeit — markierst du in Arbeit oder fertig, sieht der Gast den Status ohne Neuladen.",
      },
      {
        q: "Kann ich die Bestellungen in einem Lokal deaktivieren und nur die Karte behalten?",
        a: "Ja. Jedes Restaurant hat einen Schalter Bestellungen aktiv. Schaltest du ihn aus, funktioniert die Karte weiter — durchblättern, Allergene filtern, Sprache wechseln — aber der Warenkorb verschwindet. Gut für Lokale, die nur die QR-Karte ohne Bestellfluss wollen.",
      },
      {
        q: "Was passiert nach den 14 kostenlosen Tagen?",
        a: "Ohne Zahlungsmethode wird das Konto pausiert — wir buchen nie automatisch ab. Karte, Bestellungen und Einstellungen bleiben gespeichert; jederzeit Karte hinzufügen, um zu reaktivieren. Kündigung per Klick, keine Bindung.",
      },
    ],
  },

  finalCta: {
    heading: "Aktiviere dein Bestellsystem.",
    headingAccent: "Live in 5 Minuten.",
    sub: "14 Tage gratis, ohne Karte. Jederzeit kündbar. Schließe dich 500+ Restaurants an, die ihre eigenen Online-Bestellungen mit IQ Rest fahren.",
  },

  scan: {
    heading: "Vom Papier zum Bestellsystem",
    headingAccent: "in 60 Sekunden",
    sub: "Lade ein Foto deiner Karte hoch — die KI extrahiert Kategorien, Gerichte und Preise direkt in den Editor. Warenkorb und QR sind dann einen Klick entfernt.",
    cta: "Karte scannen →",
  },

  footer: {
    featureLinks: [
      { href: "/de/ai-translation", label: "KI-Übersetzung" },
      { href: "/de/reservations", label: "Reservierungen" },
      { href: "/de/mobile-management", label: "Mobile Verwaltung" },
      { href: "/de/easy-menu", label: "Karten-Editor" },
      { href: "/de/custom-design", label: "Video- und Foto-Hintergründe" },
      { href: "/de/color-scheme", label: "Markenfarben" },
      { href: "/de/multilingual", label: "Mehrsprachige Karte" },
      { href: "/de/ai-images", label: "KI-Bildoptimierung" },
      { href: "/de/analytics", label: "Analytik" },
      { href: "/de/instant-setup", label: "Sofort-Setup" },
      { href: "/de/personal-support", label: "Persönlicher Support" },
    ],
    navLinks: [
      { href: "#pricing", label: "Preise" },
      { href: "#faq", label: "Fragen" },
      { href: "/de/changelog", label: "Neuigkeiten" },
      { href: "/de/languages", label: "Sprache ändern" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Alle Rechte vorbehalten.",
  },
};
