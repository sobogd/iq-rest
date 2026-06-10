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
    titleAccent: "in 5 Minuten digital.",
    sub: "Eine schöne digitale Speisekarte, ein Küchendisplay und Reservierungen rund um die Uhr — die komplette Plattform fürs moderne Restaurant.",
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

  platform: {
    hardwareTitle: "Mit eigener Hardware arbeiten",
    hardwareSub: "Wir zwingen Sie nie, Hardware bei uns zu kaufen. Nutzen Sie die Handys, Tablets und Computer, die Sie bereits haben.",
    anywhereTitle: "Läuft überall",
    anywhereSub: "Handy, Tablet, Laptop, PC. Android, iOS, Windows, Mac, Linux. Funktioniert in jedem modernen Browser, ohne Installation.",
  },

  activities: {
    heading: "Ein System,",
    headingAccent: "Ihr ganzes Restaurant.",
    sub: "Schnellerer Service, eine ruhigere Küche, geringere Kosten und ein Gästeerlebnis, das in Erinnerung bleibt — alles in einer Plattform.",
    groups: [
      {
        Icon: Smartphone,
        tag: "Am Tisch — Gäste",
        bullets: [
          "QR-Menü in 35 Sprachen",
          "Bestellen ohne auf die Bedienung zu warten",
          "Bedienung rufen oder Rechnung anfordern",
          "Tisch rund um die Uhr reservieren",
          "Ein eigener QR-Code für jeden Tisch",
          "Keine App für Gäste — öffnet im Browser",
          "Allergen- und Diät-Tags zum Filtern",
        ],
      },
      {
        Icon: ChefHat,
        tag: "In der Küche",
        bullets: [
          "Bestellungen erscheinen sofort am Bildschirm",
          "Spalten in Zubereitung / fertig / serviert",
          "Allergene und Hinweise hervorgehoben",
          "Tablet oder Handy — keine Papierbons",
        ],
      },
      {
        Icon: BarChart3,
        tag: "Verwaltung",
        bullets: [
          "Menü- und Preisänderungen sofort live",
          "KI-Übersetzung mit einem Klick",
          "Verkaufsanalysen und Berichte",
          "Mehrere Restaurants in einem Konto",
          "KI digitalisiert deine Papierkarte in 60 Sekunden",
          "Eigene Domain mit SSL",
        ],
      },
    ],
  },
};
