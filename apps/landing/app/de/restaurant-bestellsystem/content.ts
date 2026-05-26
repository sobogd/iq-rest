import { Map, ClipboardList, Receipt, Smartphone } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "de",
  slug: "restaurant-bestellsystem",
  trackPrefix: "l_de_orders",

  meta: {
    title: "Restaurant-Bestellsystem — Gast und Servicekraft | IQ Rest",
    description:
      "Restaurant-Bestellungen vom Smartphone oder Tablet: Tischplan, Rechnungsteilung, Statuse, Optionen und Notizen. Gäste bestellen am Tisch; die Servicekraft nimmt Bestellungen von jedem Gerät auf. 14 Tage kostenlos.",
    canonical: "https://iq-rest.com/de/restaurant-bestellsystem",
    ogLocale: "de_DE",
    ogTitle: "Restaurant-Bestellsystem — Gast und Servicekraft",
    ogDescription:
      "Gast am Tisch oder Servicekraft mit dem Handy — die Bestellung landet sofort in der Küche. Tischplan, Rechnungsteilung, Statuse, Optionen und Notizen.",
    brandLine: "IQ Rest — Restaurant-Bestellsystem",
  },

  hero: {
    headline: "Bestellannahme: Gast und Servicekraft — direkt in die Küche.",
    cta: "Online-Bestellung einrichten",
    sub: "Gäste bestellen über die QR-Speisekarte am Tisch oder die Servicekraft nimmt die Bestellung vom Smartphone oder Tablet auf — die Bestellung erscheint binnen Sekunden auf dem Küchen-Display. Tischplan mit farblich markierten Tischen, Rechnungsteilung, flexible Optionen und Kommentare. Keine Notizblöcke, kein Hin und Her zur Bar.",
    imageSrc: "/landing/feature-orders.webp",
    imageAlt: "Servicekraft nimmt eine Bestellung am Tisch vom Smartphone auf — die Bestellung landet auf dem Küchen-Display",
  },

  scan: {
    heading: "Bestellsystem einrichten",
    headingAccent: "in 5 Minuten.",
    sub: "Papier-Speisekarte oder PDF hochladen — KI erkennt Gerichte, Preise und Kategorien. Tablet im Service anschließen und Bestellungen an den Tischen entgegennehmen.",
    cta: "Speisekarte scannen",
  },

  subFeatures: [
    {
      icon: Map,
      eyebrow: "Liste und Tischplan",
      heading: "Bestellliste neben dem Tischplan.",
      body: "Alle aktiven Bestellungen rechts: Status, Summe, Zeit, Artikelanzahl. Links — der Tischplan: Tische farblich nach Status markiert — frei, besetzt, Aufmerksamkeit nötig. Tippen auf einen Tisch öffnet oder erstellt eine Bestellung; Tippen auf eine Karte öffnet die Detailansicht. Kein Bildschirmwechsel.",
      bullets: [
        "Tischplan: Tische farblich nach Bestellstatus markiert.",
        "Bestellliste daneben — Summe, Zeit, Artikelanzahl.",
        "Tisch antippen, um eine Bestellung zu öffnen oder zu erstellen.",
      ],
      image: { src: "/landing/feature-orders-map.webp", alt: "Tablet an der Service-Station: Bestellliste und Tischplan mit farblich markierten Tischen" },
    },
    {
      icon: ClipboardList,
      eyebrow: "Bestellkarte",
      heading: "Bestellkarte: Statuse, Duplizieren, Löschen — ein Tipp.",
      body: "Jeder Artikel hat seinen eigenen Status (Ausstehend / In Zubereitung / Fertig / Serviert) — Küche und Servicekraft sehen dasselbe Bild in Echtzeit. Tippen auf den Punkt öffnet das Aktionsmenü: Status ändern, Artikel mit gleichen Modifikatoren und Optionen duplizieren, löschen. Alles innerhalb der Karte.",
      bullets: [
        "Status pro Artikel: Ausstehend / In Zubereitung / Fertig / Serviert.",
        "Artikel mit einem Tipp und denselben Optionen duplizieren.",
        "Artikel direkt aus der Karte löschen.",
      ],
      image: { src: "/landing/feature-orders-detail.webp", alt: "Tablet mit der Bestelldetailkarte: Artikelstatuse, Aktionen zum Duplizieren und Löschen" },
    },
    {
      icon: Receipt,
      eyebrow: "Rechnung teilen",
      heading: "Rechnung teilen, wenn Gäste getrennt zahlen.",
      body: "Gäste haben sich für getrennte Zahlung entschieden — Artikel ankreuzen, die auf einen neuen Beleg gehen; der Rest bleibt auf dem aktuellen. Das System zeigt sofort beide Summen. Ein Tipp auf „Bestellung teilen“ und Sie haben zwei eigenständige Bestellungen mit korrekten Summen, beide weiterhin den Tischen zugeordnet.",
      bullets: [
        "Artikel zum Teilen mit Häkchen auswählen.",
        "Beide Summen werden sofort angezeigt.",
        "Ein Tipp und die Bestellung ist geteilt, ohne manuelles Rechnen.",
      ],
      image: { src: "/landing/feature-orders-split.webp", alt: "Tablet auf einem Restauranttisch: Dialog zum Aufteilen der Rechnung zwischen Gästen" },
    },
    {
      icon: Smartphone,
      eyebrow: "Mobiler Hinzufüge-Flow",
      heading: "Artikel vom Smartphone hinzufügen — in drei Aktionen.",
      body: "Die Servicekraft ist nicht an ein Gerät gebunden: Bestellannahme auf dem eigenen Smartphone öffnen und Artikel in drei Schritten hinzufügen — Kategorie, Gericht, Optionen (Größe, Gargrad, Extra-Sauce oder -Zutat). Der Preis wird automatisch neu berechnet. Die Notiz für die Küche kommt im letzten Schritt.",
      bullets: [
        "Drei Schritte: Kategorie → Gericht → Optionen.",
        "Optionen (Größe, Add-ons, Extras) preislich mit einem Klick.",
        "Notizfeld im letzten Schritt.",
      ],
      image: { src: "/landing/feature-orders-mobile.webp", alt: "Vier Smartphones mit den Schritten zum Hinzufügen eines Bestellartikels: Kategorie, Gericht, Größe, Kommentar" },
    },
  ],

  faq: {
    sub: "Was Gastronomen zur Bestellannahme in IQ Rest fragen. Frage nicht dabei? Schreiben Sie uns auf WhatsApp.",
    items: [
      { q: "Können mehrere Servicekräfte gleichzeitig von verschiedenen Geräten arbeiten?", a: "Ja. Jede Servicekraft meldet sich vom eigenen Smartphone oder Tablet im gemeinsamen Restaurant-Konto an — alle sehen dieselben Tische, Bestellungen und Statuse in Echtzeit. Änderungen einer Servicekraft erscheinen sofort bei den anderen, ohne Konflikte oder Sperren." },
      { q: "Können Servicekräfte ihre eigenen Geräte nutzen (BYOD)?", a: "Ja. Es ist eine Browser-Webanwendung — nichts zu installieren. Die Servicekraft öffnet einen Link, meldet sich vom eigenen iPhone, Android oder persönlichen Tablet im Restaurant-Konto an und beginnt zu arbeiten. Am Schichtende einfach ausloggen." },
      { q: "Können Pflichtoptionen zu Gerichten hinzugefügt werden (Größe, Gargrad usw.)?", a: "Ja. Jedes Gericht kann beliebig viele Optionsgruppen haben — Pflicht (z. B. „Größe“: Klein / Mittel / Groß) und optional („Gargrad“: blutig / medium / durch). Optionen können den Preis ändern (+1,00 €). Ist eine Gruppe Pflicht, lässt das System Gast oder Servicekraft das Gericht nicht ohne Auswahl hinzufügen." },
      { q: "Können Gäste Notizen oder Extras zu einem Gericht hinzufügen (Brot, Sauce)?", a: "Ja. Der letzte Schritt beim Hinzufügen hat ein freies Notizfeld („ohne Zwiebeln“, „durchgebraten“, „allergisch gegen Nüsse“). Extras sind separate preisrelevante Modifikatoren („+ BBQ-Sauce +1,50 €“, „+ Brot +2,00 €“). Notizen werden auf dem Küchen-Display farblich hervorgehoben." },
      { q: "Gibt es eine Bestellstatistik?", a: "Ja. Der Analytik-Bereich zeigt: Umsatz nach Tag und Stunde, Durchschnittsbon, Top-Gerichte, Konversion Gast → Bestellung, Servicegeschwindigkeit (Zeit von Ausstehend bis Serviert). Das hilft bei Schichtplanung, Einkauf und beim Erkennen schwach laufender Gerichte." },
      { q: "Können Bestellungen geteilt oder zwischen Tischen verschoben werden?", a: "Ja, beide Szenarien werden unterstützt. Zum Teilen — Artikel ankreuzen, die auf einen neuen Beleg gehen (für Gäste mit getrennter Zahlung). Zum Verschieben — Bestellkarte öffnen, neuen Tisch wählen; die gesamte Bestellung wird dorthin verschoben. Kein manuelles Rechnen, kein Verlassen des Panels." },
    ],
  },
};
