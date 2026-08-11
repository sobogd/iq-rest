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
  Rocket,
  MessagesSquare,
  ClipboardList,
  WheatOff,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import type { CroCopyV2 } from "@/app/_landing/templates/cro-home-template-v2";

export const CRO: CroCopyV2 = {
  hero: {
    verticals: ["Restaurants","Cafés","Bars","Pizzerien"],
    title: "Dein Restaurant, digital",
    titleAccent: "in 5 Min.",
    sub: "Digitale Speisekarte, Küchen-Display und Buchungen rund um die Uhr — alles fürs Restaurant, in 5 Minuten startklar.",
  },

  heroV2: {
    verticals: [
      { icon: "restaurant", label: "Restaurants" },
      { icon: "cafe", label: "Cafés" },
      { icon: "bar", label: "Bars" },
      { icon: "pizza", label: "Pizzerien" },
    ],
    title: "Alles, was Ihr",
    titleAccent: "Restaurant braucht!",
    sub: "Richten Sie Ihre Abläufe in 10 Minuten ein: Online-Speisekarte starten, Küche optimieren, Tischbelegung im Blick behalten.",
    primaryLabel: "Kostenlos starten",
    demoLabel: "Demo ansehen",
    mockups: {
      kds: { src: "/landing/hero-card-kds.webp", alt: "Tablet mit Küchendisplay: Bestellungen pro Tisch in Spalten mit Status" },
      reservations: { src: "/landing/hero-card-reservation.webp", alt: "Tablet mit Reservierungskalender: Monatsansicht und unbestätigte Reservierungen" },
      phone1: { src: "/landing/hero-card-menu.webp", alt: "Smartphone mit der Startseite einer Restaurant-Website: Foto, Reservierungen und Online-Speisekarte" },
      phone2: { src: "/landing/hero-card-dish.webp", alt: "Smartphone mit einer Gerichtseite: Foto, Preis und Allergen-Kennzeichnung" },
    },
  },

  heroCards: [
    { Icon: Rocket, title: "Startklar in 10 Minuten", sub: "Ohne teure Hardware und lange Einrichtung" },
    { Icon: MessagesSquare, title: "Schneller Support", sub: "Wir antworten im Chat innerhalb weniger Stunden" },
    { Icon: Globe, title: "Die Wahl von {count} Betrieben", sub: "Restaurants und Cafés in über 15 Ländern vertrauen uns" },
    { Icon: Palette, title: "100 % Ihre Marke", sub: "Design und Oberfläche passen wir an den Stil Ihres Lokals an" },
  ],

  menu: {
    heading: "Website und digitale Speisekarte",
    sub: {
      link: "Mehr als eine QR-Speisekarte!",
      rest: " Eine vollwertige Website mit eigenem Design, Kontaktseite und Tischreservierung.",
    },
    moreLabel: "Mehr erfahren",
    mockupAlt: "Zwei Smartphones: Startseite einer Restaurant-Website und eine Gerichtseite",
    bullets: [
      { Icon: Languages, title: "Automatische Übersetzung in 35 Sprachen", sub: "Bedienen Sie internationale Gäste ohne Sprachbarriere — die Übersetzung läuft automatisch" },
      { Icon: ClipboardList, title: "Bestellungen direkt vom Tisch", sub: "Entlasten Sie den Service: Bestellungen kommen direkt vom Tisch, schnell und ohne Kellner" },
      { Icon: WheatOff, title: "Allergene und Diäten", sub: "Kennzeichnen Sie Allergene und Vorlieben (vegan, scharf), damit Gäste sicher und einfach wählen" },
    ],
  },

  reservations: {
    heading: "Tischreservierung",
    sub: {
      link: "Intelligente Tischreservierung!",
      rest: " Ein automatisches Reservierungssystem, das freie Tische und Ihre Zeiten selbst im Blick behält.",
    },
    moreLabel: "Mehr erfahren",
    mockupAlt: "Tablet mit Reservierungskalender: Tische nach Tag und Zeitfenster",
    bullets: [
      { Icon: CalendarCheck, title: "Übersichtlicher Belegungsplan", sub: "Ein Raster nach Tagen und Tischen — freie Plätze auf einen Blick" },
      { Icon: SlidersHorizontal, title: "Flexible Einstellungen", sub: "Öffnungszeiten, Slot-Dauer und Tischfotos festlegen, Gästewünsche erfassen" },
      { Icon: Users, title: "Gästefluss steuern", sub: "Wählen Sie den passenden Reservierungsmodus und behalten Sie den Gästefluss im Griff" },
    ],
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
