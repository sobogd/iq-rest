import {
  Languages,
  ChefHat,
  CalendarCheck,
  Receipt,
  ScanLine,
  Globe,
  BarChart3,
  QrCode,
  Smartphone,
  Palette,
} from "lucide-react";
import type { CroCopy } from "@/app/_landing/templates/cro-home-template";

export const CRO: CroCopy = {
  hero: {
    verticals: ["Restaurants","Cafés","Bars","Pizzerien"],
    title: "Dein Restaurant,",
    titleAccent: "in 5 Minuten komplett digital.",
    sub: "Eine schöne digitale Speisekarte, ein Küchendisplay und Reservierungen rund um die Uhr — die komplette Plattform für ein modernes Restaurant.",
  },

  heroMicrocopy: "{count} Restaurants · 14 Tage gratis · Keine Karte",
  seeIncluded: "Was drin ist",

  trust: [
    { kind: "num", value: 35, label: "Sprachen" },
    { kind: "text", value: "24/7", label: "Reservierungen" },
    { kind: "num", value: 5, suffix: " min", label: "Einrichtung" },
    { kind: "count", label: "Restaurants" },
  ],

  bundle: {
    heading: "Alles, was dein Restaurant braucht.",
    headingAccent: "In einer App.",
    sub: "Speisekarte, Küche und Reservierungen an einem Ort — modern, schnell und gemacht für den echten Restaurantalltag. Keine Add-ons, kein Preis pro Funktion.",
  },

  benefits: [
    { Icon: Languages, tag: "Digitale Speisekarte", title: "Eine Karte, die verkauft.", bullets: ["35 KI-Sprachen","Premium-Design","Preise sofort aktuell"], image: "/landing/feature-design.webp", imageAlt: "Zwei Handys auf einem Café-Tisch: der Startbildschirm der digitalen Karte und die Kontaktseite mit Karte" },
    { Icon: ChefHat, tag: "Küchendisplay", title: "Schneller kochen, nichts verpassen.", bullets: ["Live am Bildschirm","Notizen & Allergene","Tablet oder Handy"], image: "/landing/feature-kds-cards.webp", imageAlt: "Tablet am Tresen zeigt das Küchendisplay mit Bestellungen pro Tisch" },
    { Icon: CalendarCheck, tag: "Reservierungen", title: "Reservierungen auf Autopilot.", bullets: ["Selbst buchen","Automatische Bestätigung","Kalender pro Tisch"], image: "/landing/feature-booking-calendar.webp", imageAlt: "Zwei Tablets zeigen den Reservierungskalender: Tagesansicht pro Tisch und Monatsansicht" },
    { Icon: Receipt, tag: "Bestellen am Tisch", title: "Bestellungen direkt in die Küche.", bullets: ["Gast oder Kellner","Direkt in die Küche","Jederzeit an/aus"], image: "/landing/feature-orders-map.webp", imageAlt: "Tablet mit der Bestellübersicht: Bestellliste und Saalplan mit farblich markierten Tischen." },
  ],

  seeDetails: "Details ansehen",

  extras: {
    heading: "Und alles andere inklusive.",
    items: [
      { Icon: ScanLine, label: "KI digitalisiert deine Papierkarte in 60 Sekunden" },
      { Icon: QrCode, label: "Ein eigener QR-Code für jeden Tisch" },
      { Icon: Smartphone, label: "Keine App für Gäste — öffnet im Browser" },
      { Icon: Globe, label: "Eigene Domain mit SSL" },
      { Icon: BarChart3, label: "Verkaufsanalysen: Umsatz, Top-Gerichte, Stunden" },
      { Icon: Palette, label: "Allergen- und Diät-Tags zum Filtern" },
    ],
  },

  midCta: {
    heading: "Eine App statt fünf.",
    sub: "Kein Jonglieren mit getrennten Tools für Karte, Küche und Reservierungen — alles an einem Ort, auf jedem Handy oder Tablet, ohne Installation.",
  },

  how: {
    heading: "In 5 Minuten startklar",
    sub: "Vier Schritte. Keine Installation, keine technische Einrichtung, keine Karte.",
    steps: [
      { n: "1", t: "Typ & Name", d: "Lokaltyp und Name — das ist die ganze Anmeldung." },
      { n: "2", t: "Anmelden", d: "E-Mail oder Google. Keine Karte." },
      { n: "3", t: "Karte hinzufügen", d: "Eintippen oder die KI deine Papierkarte scannen lassen." },
      { n: "4", t: "Fertig", d: "Karte, Küche und Reservierungen — bereit." },
    ],
  },
};
