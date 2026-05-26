import { LayoutGrid, Timer } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "de",
  slug: "kuechen-display",
  trackPrefix: "l_de_kds",

  meta: {
    title: "Küchen-Display (KDS) für Restaurants | IQ Rest",
    description:
      "Küchen-Display (KDS) für Restaurants: Bestellungen aus dem Service und der QR-Speisekarte landen sofort auf dem Bildschirm des Kochs. Spalten nach Tisch, Statuse Ausstehend / In Zubereitung / Fertig / Serviert, Zonen-Filter. Läuft auf Tablet oder Smartphone.",
    canonical: "https://iq-rest.com/de/kuechen-display",
    ogLocale: "de_DE",
    ogTitle: "Küchen-Display (KDS) — Bestellungen auf dem Bildschirm des Kochs",
    ogDescription:
      "Bestellungen aus dem Service auf dem Bildschirm des Kochs. Spalten nach Tisch, Statuse und Timer. Ein Tipp ändert den Status.",
    brandLine: "IQ Rest — Küchen-Display",
  },

  hero: {
    headline: "Küchen-Display: Bestellungen direkt auf den Bildschirm des Kochs.",
    cta: "Küchendisplay einrichten",
    sub: "Papierbons sind nicht mehr nötig. Bestellungen aus dem Service oder der QR-Speisekarte landen sofort auf dem Küchen-Bildschirm — mit Notizen, Allergenen und Timer. Ein Tipp ändert den Status. Funktioniert auf einem Tablet am Pass oder einem Smartphone in der Kochjacke.",
    imageSrc: "/landing/feature-kitchen.webp",
    imageAlt: "Profiküche mit einem Tablet auf einem Messingständer, das das Küchen-Display mit aktiven Bestellungen zeigt",
  },

  scan: {
    heading: "Küchen-Display einrichten",
    headingAccent: "in 5 Minuten.",
    sub: "Papier-Speisekarte oder PDF hochladen — KI erkennt Gerichte, Kategorien und Allergene. Tablet in der Küche anschließen und Bestellungen entgegennehmen.",
    cta: "Speisekarte scannen",
  },

  subFeatures: [
    {
      icon: LayoutGrid,
      eyebrow: "Steuerung und Filter",
      heading: "Mehrere Bildschirme nach Zone: Küche und Bar.",
      body: "Stellen Sie separate Tablets an der heißen Linie, der Bar oder der Patisserie auf — jeder Bildschirm zeigt nur die Gerichte, die dazugehören. Filter nach Status (Ausstehend / In Zubereitung / Fertig / Serviert) und Kategorie entfernen Lärm: Der Koch sieht nur, was für seinen Posten relevant ist.",
      bullets: [
        "Mehrere KDS-Bildschirme mit Kategoriefiltern.",
        "Statusfilter: zeige nur In Zubereitung und Fertig.",
        "Jede Zone sieht nur ihren eigenen Bestellfluss.",
      ],
      image: { src: "/landing/feature-kds-filters.webp", alt: "Tablet auf einem Messingständer am Küchenpass — KDS mit Statusfilter" },
    },
    {
      icon: Timer,
      eyebrow: "Karten und Timer",
      heading: "Ein Tipp ändert den Status. Notizen und Allergene farblich hervorgehoben.",
      body: "Die Gerichtskarte zeigt die gewählten Optionen (ohne Zwiebeln, durchgebraten), die Gastnotiz, die Allergene und einen Timer ab dem Moment, in dem die Bestellung aufgegeben wurde. Tippen auf die Karte schaltet den Status weiter: Ausstehend → In Zubereitung → Fertig → Serviert. Die Liste wird automatisch nach Priorität sortiert.",
      bullets: [
        "Tippen auf die Karte — sofortiger Statuswechsel.",
        "Optionen, Notizen und Allergene farblich hervorgehoben.",
        "Prioritätssortierung: länger wartende Artikel rücken nach oben.",
      ],
      image: { src: "/landing/feature-kds-cards.webp", alt: "Tablet auf einem Messingständer auf der Bartheke — KDS mit Bestellkarten nach Tisch" },
    },
  ],

  faq: {
    sub: "Was Gastronomen zum Küchen-Display in IQ Rest fragen. Frage nicht dabei? Schreiben Sie uns auf WhatsApp.",
    items: [
      { q: "Welche Gerichtsstatuse hat die Küche?", a: "Vier Statuse mit unterschiedlichen Kartenfarben: Ausstehend (grau) — die Bestellung ist angenommen und wartet; In Zubereitung (orange) — das Gericht wird zubereitet; Fertig (blau) — bereit zum Servieren; Serviert (grün) — an den Gast übergeben. Tippen auf die Karte schaltet sie in den nächsten Status, ohne Menüs oder Bestätigungen." },
      { q: "Kann ich mehrere KDS-Bildschirme in verschiedenen Zonen betreiben?", a: "Ja. Ein Tablet an der heißen Linie, ein weiteres an der Bar, ein drittes an der Patisserie — jeweils mit eigenem Kategoriefilter. Alle Bildschirme werden in Echtzeit synchronisiert: Ein auf einem Bildschirm geänderter Status aktualisiert sich überall." },
      { q: "Welche Hardware brauche ich für den KDS-Betrieb?", a: "KDS ist eine Webanwendung, die in jedem modernen Browser läuft. Große Küche — ein Tablet auf einem Messingständer am Pass oder ein TV an der Wand. Kleines Lokal — das Smartphone des Kochs. Keine spezielle Hardware, keine Installation: Link öffnen und im Konto anmelden." },
      { q: "Woher kommen die Bestellungen auf dem Küchen-Bildschirm?", a: "Aus allen Quellen: der Gast, der über die QR-Speisekarte am Tisch bestellt hat; die Servicekraft, die die Bestellung vom Smartphone aufgenommen hat; der Gast, der die Bestellung von der Website abgegeben hat. Alle landen auf dem KDS mit Quellenkennzeichnung und Tischnummer. Keine manuelle Übertragung aus einem POS." },
      { q: "Was wird auf einer Bestellkarte angezeigt?", a: "Gerichtsname, gewählte Modifikatoren (ohne Zwiebeln, durchgebraten, Sauce hinzufügen), Gastkommentar, hervorgehobene Allergene, Status (Ausstehend / In Zubereitung / Fertig / Serviert) und ein Timer, der anzeigt, wie lange das Gericht wartet. Karten sind nach Priorität sortiert: je länger die Wartezeit, desto höher in der Spalte." },
      { q: "Kann ich die Karten auf dem Bildschirm filtern?", a: "Ja. Zwei Filter: nach Status (z. B. nur Ausstehend und In Zubereitung anzeigen, Serviert ausblenden) und nach Kategorie (nur Getränke an der Bar, nur Hauptgerichte in der Küche). Die Einstellungen werden pro Gerät gespeichert — jede Zone behält ihr eigenes Set." },
    ],
  },
};
