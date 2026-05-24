import { Languages, ShieldAlert, Palette, ShoppingCart } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "de",
  slug: "qr-code-speisekarte-restaurant",
  trackPrefix: "l_de_qr",

  meta: {
    title: "QR-Code-Speisekarte für Restaurants | IQ Rest",
    description:
      "QR-Code-Speisekarte für Restaurants: Der Gast scannt den QR-Code am Tisch, öffnet die Karte im Browser und bestellt in seiner Sprache. 14 Tage gratis, ohne Karte.",
    canonical: "https://iq-rest.com/de/qr-code-speisekarte-restaurant",
    ogLocale: "de_DE",
    ogTitle: "QR-Code-Speisekarte für Restaurants",
    ogDescription:
      "QR am Tisch, Karte auf dem Handy — Fotos, Allergene, 35 Sprachen und Updates in Echtzeit.",
    brandLine: "IQ Rest — QR-Code-Speisekarte für Restaurants",
  },

  hero: {
    headline: "QR-Code-Speisekarte für Restaurants.",
    sub: "Der Gast richtet die Kamera auf den QR-Code am Tisch und die Speisekarte öffnet sich sofort im Handy-Browser: Gerichtsfotos, Allergene, stets aktuelle Preise und automatische Übersetzung in 35 Sprachen. Keine App-Downloads, kein Nachdrucken der Karte bei jeder Preisänderung.",
  },

  scan: {
    heading: "Schon eine Papier- oder PDF-Karte?",
    headingAccent: "Die KI macht daraus in 60 Sekunden eine QR-Karte.",
    sub: "Lade ein Foto der Karte oder das PDF hoch — die KI erkennt Kategorien, Gerichte und Preise und verknüpft sie sofort mit der QR-Speisekarte.",
    cta: "QR-Speisekarte erstellen",
  },

  subFeatures: [
    {
      icon: Languages,
      eyebrow: "Ein QR, 35 Sprachen",
      heading: "Ein einziger QR-Code, die Karte in 35 Sprachen.",
      body: "Der Gast scannt den QR und wählt seine Sprache: Die Übersetzung übernimmt eine KI mit gastronomischem Gespür, kein generischer Übersetzer. Schluss mit getrennten Karten für Touristen und losen Zetteln auf dem Tisch.",
      bullets: [
        "Ein einziger QR-Druck deckt 35 Sprachen ab, im Abo enthalten.",
        "Die KI versteht die Küchensprache — Gerichtsnamen klingen in jeder Sprache natürlich.",
        "Der Gast wechselt die Sprache in der Karte, ohne den QR erneut zu scannen.",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Zwei Gäste scannen denselben QR-Code am Tisch und lesen die Karte in verschiedenen Sprachen" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Allergene im QR",
      heading: "Allergene und Diät-Kennzeichnungen in der QR-Karte.",
      body: "Jedes Gericht der mit dem QR verknüpften Karte kann Kennzeichnungen für Gluten, Laktose, Nüsse, Meeresfrüchte sowie vegane und glutenfreie Optionen tragen. Der Gast filtert direkt am Handy die Gerichte, die zu seinen Einschränkungen passen, ohne das Personal zu fragen.",
      bullets: [
        "14 Allergen-Kategorien auf Gerichtsebene.",
        "Vegan-, Vegetarisch- und Glutenfrei-Kennzeichnungen mit einem Klick im Panel.",
        "Der Gast filtert die QR-Karte nach seinen Einschränkungen.",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Gast filtert die QR-Karte am Handy nach Allergenen, während der Inhaber die Liste am Tablet bearbeitet" },
    },
    {
      icon: Palette,
      eyebrow: "Mehr als nur ein QR",
      heading: "Eine QR-Karte, gepflegt wie die Website des Restaurants.",
      body: "Nach dem Scannen landet der Gast nicht bei einem flachen PDF: Er sieht einen Begrüßungsbildschirm mit Video oder Titelfoto, die Beschreibung des Lokals und eine Kontaktseite mit Karte, Telefonnummern und Social-Media-Links. Der QR wird zur Eingangstür des Restaurants im Netz.",
      bullets: [
        "Hintergrundvideo oder Titelfoto auf dem Startbildschirm der QR-Karte.",
        "Platz, um das Konzept des Lokals und jeder Kategorie zu erzählen.",
        "Integrierte Kontaktseite: Karte, Telefon, Instagram, WhatsApp.",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Zwei Handys auf einem Tisch: Startbildschirm der QR-Karte mit Hintergrundvideo und eine Kontaktseite mit Karte" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Bestellen per QR · optional",
      heading: "Über den QR-Code kann der Gast auch bestellen.",
      body: "Neben dem Ansehen der Karte kann die QR-Karte zum Bestellkanal werden: Der Gast legt Gerichte in den Warenkorb und sendet die Bestellung. Sie erreicht den Kellner im Service, WhatsApp oder den Küchenbildschirm. Die Funktion lässt sich in den Einstellungen bei Bedarf ein- oder ausschalten.",
      bullets: [
        "Warenkorb, Anmerkungen und Bestellversand direkt aus dem QR-Scan.",
        "Die Bestellung kommt sofort im Service, bei WhatsApp oder am Küchenbildschirm an.",
        "Funktion nach Uhrzeiten, Räumen oder einzelnen Restaurants aktivierbar.",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Zwei Handys auf einem Tisch: ein aus der QR-Karte erstellter Warenkorb und eine Bestellbestätigung" },
    },
  ],

  faq: {
    sub: "Was Gastronomen über die QR-Code-Speisekarte von IQ Rest fragen. Deine Frage ist nicht dabei? Schreib uns per WhatsApp.",
    items: [
      { q: "Wie funktioniert die QR-Code-Speisekarte von IQ Rest?", a: "Jeder Tisch trägt einen gedruckten QR-Code. Der Gast scannt ihn mit der Handykamera und der Browser öffnet die Restaurantkarte — Fotos, Beschreibungen, Allergene und aktuelle Preise. Keine App nötig, weder für den Gast noch für das Personal." },
      { q: "Brauche ich technische Kenntnisse, um die QR-Karte zu erstellen?", a: "Nein. Das Panel funktioniert per Klick und Drag-and-drop, ohne Code oder komplizierte Einstellungen. Ein Gericht hinzuzufügen dauert ein paar Sekunden: Name, Preis, Foto. Die Ersteinrichtung dauert meist 30 Minuten bis eine Stunde; hast du bereits ein PDF-Menü, wandelt die KI es automatisch um." },
      { q: "Müssen Gäste eine App installieren, um den QR zu lesen?", a: "Nein. Die native Kamera von iPhone und Android erkennt den QR-Code in Sekunden und öffnet die Karte direkt im Browser. Auch das Admin-Panel läuft in jedem modernen Browser — Handy, Tablet oder Laptop." },
      { q: "Wie werden die QR-Codes für die Tische gedruckt?", a: "Die QR-Codes werden im Panel automatisch erzeugt (einer pro Tisch oder einer für das ganze Lokal) und als druckfertige PDFs heruntergeladen. Es genügen ein Bürodrucker und ein Aufsteller: Tischständer, Aufkleber oder Untersetzer." },
      { q: "Kann ich eine eigene Domain für die QR-Karte nutzen?", a: "Ja. Wir unterstützen eine Restaurant-Domain mit SSL-Zertifikat (zum Beispiel karte.deinrestaurant.de): Scannt der Gast den QR, sieht er die Adresse deines Restaurants statt einer generischen Subdomain. Die DNS-Einrichtung dauert 5–10 Minuten und wir begleiten dich dabei." },
      { q: "Kann ich die QR-Codes mehrerer Restaurants über ein Konto verwalten?", a: "Ja, auf Anfrage. Ein Konto kann mehrere Lokale bündeln, jedes mit eigenen QR-Codes, eigener Karte, eigenem Design und eigener Analyse. Schreib uns per WhatsApp und wir aktivieren den Multi-Restaurant-Modus." },
      { q: "Ist es schwierig, die QR-Karte von Grund auf zu starten?", a: "Drei Schritte: (1) Kategorien anlegen; (2) Gerichte mit Name, Preis und Foto hinzufügen; (3) QRs drucken und auf die Tische stellen. Hast du bereits eine Papier- oder PDF-Karte, lade sie hoch — die KI erkennt Kategorien und Preise und füllt die Karten aus. Eine einfache Karte kann in 5 Minuten online sein." },
    ],
  },
};
