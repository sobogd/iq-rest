import { Languages, ShieldAlert, Palette, ShoppingCart } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "de",
  slug: "digitale-speisekarte-restaurant",
  trackPrefix: "l_de_digital",

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
    headline: "Digitale Speisekarte für Restaurants.",
    cta: "Digitale Speisekarte erstellen",
    sub: "Online-Version Ihrer Papier-Speisekarte mit Fotos, Allergenen, Beschreibungen und Live-Preisaktualisierungen. Gäste sehen die Karte in ihrer Sprache; das Restaurant spart Druckkosten.",
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
      eyebrow: "35 KI-Sprachen",
      heading: "35 KI-Sprachen — jeder Gast liest die Speisekarte in seiner eigenen.",
      body: "Ein QR-Code, 35 Sprachen. Die KI versteht den kulinarischen Kontext — Gerichtsnamen und Beschreibungen klingen natürlich. Touristen bestellen sicherer und der Durchschnittsbon steigt, ohne dass die Servicekraft jedes Gericht übersetzen muss.",
      bullets: [
        "35 Sprachen im Abo enthalten, kein Aufpreis.",
        "Kulinarisch bewusste KI, kein roher Google Translate.",
        "Gast wechselt die Sprache mit einem Tipp direkt in der Speisekarte.",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Zwei Gäste lesen dieselbe digitale Speisekarte in verschiedenen Sprachen auf ihren eigenen Smartphones" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Allergene",
      heading: "Allergen- und Ernährungs-Tags.",
      body: "Markieren Sie Gerichte für Gluten, Laktose, Nüsse, Meeresfrüchte, vegane und glutenfreie Optionen. Gäste filtern die Speisekarte nach ihren Ernährungsbedürfnissen und bestellen mit mehr Sicherheit.",
      bullets: [
        "14 Standard-Allergen-Kategorien für jedes Gericht.",
        "Tags für vegan, vegetarisch und glutenfrei mit einem Klick.",
        "Gäste filtern die Speisekarte nach ihren Ernährungseinschränkungen.",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Gast filtert die Speisekarte am Smartphone nach Allergenen, während der Inhaber die Allergenliste auf einem Tablet bearbeitet" },
    },
    {
      icon: Palette,
      eyebrow: "Premium-Design",
      heading: "Premium-Design mit Video-Hintergrund und Kontaktseite.",
      body: "Ein Video oder Foto auf dem Begrüßungsbildschirm, Restaurantbeschreibung, eigene Kontaktseite mit Karte, Telefonnummern und Social-Profilen. Die digitale Speisekarte wirkt wie eine vollständige Restaurant-Website, nicht wie ein PDF hinter einem QR-Code.",
      bullets: [
        "Video-Hintergrund oder großes Foto auf dem Begrüßungsbildschirm.",
        "Restaurant- und Kategoriebeschreibungen — erzählen Sie die Geschichte des Konzepts.",
        "Kontaktseite: Karte, Telefon, Instagram, WhatsApp.",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Zwei Smartphones auf einem Café-Tisch: Startbildschirm der Speisekarte mit Video-Hintergrund und Kontaktseite mit Karte" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Bestellungen aus der Karte · optional",
      heading: "Gäste bestellen direkt aus der Speisekarte.",
      body: "Gäste füllen den Warenkorb in der QR-Speisekarte und senden die Bestellung — sie landet bei der Servicekraft im Service oder auf dem Küchentablet. Die Funktion lässt sich in den Einstellungen jederzeit aktivieren oder deaktivieren.",
      bullets: [
        "Warenkorb, Kommentare und Bestellung senden mit einem Tipp.",
        "Bestellung landet sofort im Admin-Panel, auf WhatsApp oder dem Küchen-Display.",
        "Funktion in den Einstellungen umschaltbar.",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Zwei Smartphones auf einem Tisch: Warenkorb mit Bestellung und Bestätigung der abgeschickten Bestellung" },
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
