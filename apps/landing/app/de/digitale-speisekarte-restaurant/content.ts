import {
  Languages,
  ShieldAlert,
  Palette,
  ShoppingCart,
  CalendarCheck,
  MonitorSmartphone,
} from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "de",
  slug: "digitale-speisekarte-restaurant",
  trackPrefix: "l_de_digital",
  featureHeading: {
    heading: "Mehr als eine Speisekarte",
    sub: "Alles, was aus einer QR-Speisekarte einen Service für Ihren Gastraum und Ihre Küche macht.",
  },

  meta: {
    title: "Digitale Speisekarte für Restaurants | IQ Rest",
    description:
      "Digitale Speisekarte für Restaurants: Online-Karte mit Fotos, Allergenen, KI-Übersetzung und Live-Preisaktualisierungen. 14 Tage kostenlos, ohne Kreditkarte.",
    canonical: "https://iq-rest.com/de/digitale-speisekarte-restaurant",
    ogLocale: "de_DE",
    ogTitle: "Digitale Speisekarte für Restaurants",
    ogDescription:
      "Online-Version Ihrer Papier-Speisekarte — Fotos, Allergene, KI-Übersetzung, Echtzeit-Updates.",
    brandLine: "IQ Rest — Digitale Speisekarte für Restaurants",
  },

  hero: {
    headline: "Eine digitale Karte,\ndie alles kann",
    cta: "Digitale Speisekarte erstellen",
    sub: "Fotos, Allergene und Übersetzung in 35 Sprachen. Plus Bestellungen, WhatsApp und Tischreservierung — alles in einem IQ Rest.",
  },

  scan: {
    heading: "Sie haben eine Papier-Speisekarte oder PDF?",
    headingAccent: "KI digitalisiert sie in 60 Sekunden.",
    sub: "Foto oder Dokument hochladen — KI erkennt automatisch Kategorien, Gerichte und Preise.",
    cta: "Speisekarte scannen",
  },

  subFeatures: [
    {
      icon: Languages,
      eyebrow: "KI-Übersetzung",
      heading: "Speisekarte in 35 Sprachen",
      body: "Ein QR, 35 Sprachen. Die KI übersetzt mit kulinarischem Kontext, jedes Gericht klingt natürlich. Touristen bestellen sicher.",
      bullets: [
        "35 Sprachen im Tarif",
        "Kulinarische KI, kein Google",
        "Sprachwechsel per Tipp",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Zwei Gäste lesen dieselbe digitale Speisekarte in verschiedenen Sprachen auf ihren eigenen Smartphones" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Allergene",
      heading: "Allergene und Diäten je Gericht",
      body: "Markiere Gluten, Laktose, Nüsse, vegan und glutenfrei. Gäste filtern die Karte nach ihrer Ernährung und bestellen bequem.",
      bullets: [
        "14 Allergen-Kategorien",
        "Vegan- und Glutenfrei-Tags",
        "Gäste filtern nach Diät",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Gast filtert die Speisekarte am Smartphone nach Allergenen, während der Inhaber die Allergenliste auf einem Tablet bearbeitet" },
    },
    {
      icon: Palette,
      eyebrow: "Design & Marke",
      heading: "Premium-Karte auf eigener Domain",
      body: "Video-Startbildschirm, dein eigenes Design und eine Kontaktseite mit Karte und Social — auf eigener Domain, kein PDF.",
      bullets: [
        "Video und Premium-Design",
        "Deine Domain mit SSL",
        "Kontakte, Karte und Social",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Zwei Smartphones auf einem Café-Tisch: Startbildschirm der Speisekarte mit Video-Hintergrund und Kontaktseite mit Karte" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Bestellungen",
      heading: "Online-Bestellungen, null Provision",
      body: "Gäste bestellen aus der Karte oder direkt an dein WhatsApp — es landet im Service oder in der Küche, 0% vom Umsatz.",
      bullets: [
        "Aus der Karte oder WhatsApp",
        "In Service oder Küche, 0%",
        "In den Einstellungen umschalten",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Zwei Smartphones auf einem Tisch: Warenkorb mit Bestellung und Bestätigung der abgeschickten Bestellung" },
    },
    {
      icon: CalendarCheck,
      eyebrow: "Reservierungen",
      heading: "Tisch buchen, 24/7",
      body: "Gäste buchen den Tisch selbst per Karte oder Link, du siehst den Kalender je Tisch und bestätigst auto oder manuell.",
      bullets: [
        "Gäste buchen selbst",
        "Kalender über alle Tische",
        "Auto- und Handbestätigung",
      ],
    },
    {
      icon: MonitorSmartphone,
      eyebrow: "Verwaltung",
      heading: "Steuern von überall",
      body: "Das Admin-Panel läuft in jedem Browser — Handy, Tablet oder PC. Nichts zu installieren, Basis-Karte in Minuten live.",
      bullets: [
        "Jedes Gerät, jeder Browser",
        "Nichts zu installieren",
        "In Minuten live",
      ],
    },
  ],

  faq: {
    sub: "Was Gastronomen zur digitalen Speisekarte in IQ Rest fragen. Frage nicht dabei? Schreiben Sie uns auf WhatsApp.",
    items: [
      { q: "Brauche ich technische Kenntnisse oder CMS-Erfahrung?", a: "Nein, spezielle Kenntnisse sind nicht erforderlich. Jede Aktion im Admin-Panel ist per Klick und Drag-and-Drop — ohne Code. Einen Artikel hinzuzufügen dauert wenige Sekunden: Name, Preis, Foto. Eine komplette Speisekarten-Einrichtung dauert meist 30 Minuten bis eine Stunde." },
      { q: "Was ist die digitale Speisekarte von IQ Rest?", a: "IQ Rest ist eine Cloud-Plattform für Restaurants. Die digitale Speisekarte ist die Online-Version Ihrer Karte, für Gäste über QR-Code oder Direktlink verfügbar: Gerichtsfotos, Preise, Allergene, KI-Übersetzung in 35 Sprachen, Echtzeit-Updates. Die Speisekarte wird auf unseren Servern gehostet; Sie müssen keine Software installieren oder warten — einfach den Browser öffnen." },
      { q: "Brauchen Gäste eine App oder spezielle Hardware?", a: "Nein. Gäste richten die Smartphone-Kamera auf den QR-Code und die Speisekarte öffnet sich im Browser. Das Admin-Panel für das Restaurant läuft ebenfalls in jedem modernen Browser — Tablet oder Laptop. QR-Codes lassen sich auf jedem Bürodrucker ausdrucken." },
      { q: "Kann ich die Speisekarte auf meiner eigenen Domain hosten?", a: "Ja. Wir unterstützen eine eigene Domain mit SSL-Zertifikat — Gäste sehen die Speisekarte unter der Adresse Ihres Restaurants (z. B. menu.ihrrestaurant.de). Wir helfen bei der DNS-Einrichtung; das dauert meist 5–10 Minuten." },
      { q: "Kann ich mehrere Restaurants aus einem Konto verwalten?", a: "Ja, auf Anfrage. Ein Konto kann mehrere Restaurants hosten: jedes Lokal mit eigener Speisekarte, eigenem Design, eigenen QR-Codes und eigener Analytik. Schreiben Sie uns auf WhatsApp und wir aktivieren den Multi-Restaurant-Modus für Ihre Gruppe." },
      { q: "Wie schwer ist es, die Speisekarte von Grund auf einzurichten?", a: "Die Einrichtung besteht aus drei Schritten: (1) Kategorien anlegen; (2) Artikel mit Namen, Preisen und Fotos hinzufügen; (3) QR-Codes für die Tische drucken. Wenn Sie bereits eine Papier-Speisekarte oder PDF haben, laden Sie sie hoch — die KI erkennt Kategorien, Namen und Preise und füllt die Karten automatisch aus. Eine Basis-Speisekarte ist in 5 Minuten online; die gesamte Einrichtungszeit hängt von der Artikelanzahl ab." },
      { q: "Welche Art von Support bieten Sie an?", a: "Wir sind während der Geschäftszeiten auf WhatsApp erreichbar und antworten schnell per E-Mail. Wir helfen bei der Erst-Einrichtung, Domain-Konfiguration, Speisekarten-Design und allen ungewöhnlichen Situationen. Wenn Sie eine Demo oder Hands-on-Unterstützung beim Start brauchen — schreiben Sie uns." },
    ],
  },
};
