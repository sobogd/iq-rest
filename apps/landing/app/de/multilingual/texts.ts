import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Mehrsprachige Restaurantkarte — 35 Sprachen, ein Tipp zum Wechseln",
    description:
      "Bediene internationale Gäste in ihrer Sprache. Restaurantkarte in 35 Sprachen mit Ein-Tipp-Wechsel. RTL-Unterstützung für Arabisch und Persisch. 14 Tage gratis.",
    canonical: "https://iq-rest.com/de/multilingual",
    ogLocale: "de_DE",
    ogTitle: "Mehrsprachige Restaurantkarten-Webseite — 35 Sprachen integriert",
    ogDescription:
      "Touristen scannen, sehen deine Karte automatisch in ihrer Sprache. 35 Sprachen, RTL-Support, Auto-Erkennung aus Handy-Einstellungen. 14 Tage gratis.",
  },

  hero: {
    title: "Deine Karte spricht jede Touristensprache.",
    subtitle:
      "Eine mehrsprachige Restaurantkarte sollte kein Projekt sein. Mit IQ Rest erkennt deine QR-Karte automatisch die Handysprache jedes Gastes und liefert sie in einer von 35 Sprachen — inklusive Arabisch und Persisch mit korrektem Rechts-nach-Links-Rendering.",
    trustLine: "500+ Restaurants in 30+ Ländern",
  },

  seo: {
    description:
      "Baue deine Karte einmal, serviere sie in 35 Sprachen. IQ Rest erkennt automatisch die Handysprache jedes Gastes und rendert die Karte in seiner Sprache — kein Flaggen-Tippen, keine Sprachbarriere, keine peinlichen Google-Translate-Momente. Von Spanisch und Deutsch bis Japanisch, Arabisch und Mandarin sehen deine Gäste dein Restaurant so, wie es gemeint war.",
    fullDescription:
      "Die meisten 'mehrsprachigen' Karten sind PDFs aus kaputtem Google Translate, einmal gedruckt und nie aktualisiert. Die mehrsprachige Restaurant-Webseite von IQ Rest ist echtes i18n: Jede Sprache hat eine richtig übersetzte Kopie, einen eigenen URL-Slug, eigene Meta-Tags für Google zur Indexierung und eigenes Routing innerhalb der Karten-App.\n\nWenn ein Tourist mit französisch eingestelltem iPhone deinen QR-Code scannt, öffnet sich die Karte automatisch auf Französisch — keine Tipps, keine Entscheidungen. Sie können mit dem Sprachwähler oben jede andere Sprache wählen, aber die meisten brauchen es nie. Dasselbe gilt für Diät-Tags ('vegan' wird zu 'vegano' / 'vegetarisch' / 'ヴィーガン' je nach Sprache), für Fehlermeldungen, für 'In den Warenkorb'-Buttons, für Belege. Jeder UI-String in 35 Sprachen, nicht nur der Karteninhalt.\n\nFür RTL-Sprachen — Arabisch und Persisch — wird das gesamte Layout korrekt gespiegelt: Text richtet sich rechts aus, Menüs öffnen sich von rechts, Preise erscheinen wie erwartet nach dem Gerichtsnamen. Das ist kein CSS-Hack, sondern voller RTL-Support, der arabische und persische Gäste fühlen lässt, dass sie bedient werden, nicht nachgerüstet.",
    benefitsHeading: "Warum eine echte mehrsprachige Karte ein PDF schlägt",
    benefits: [
      "35 Sprachen mit korrekter UI-Übersetzung — nicht nur Karteneinträge",
      "Erkennt automatisch die Handysprache des Gastes — keine Tipps nötig",
      "Manueller Sprachwähler für Gäste, die eine andere Sprache bevorzugen",
      "Voller RTL-Support für Arabisch und Persisch — kein CSS-Hack",
      "Jede Sprache hat eine eigene URL — Google indexiert 35 Versionen deiner Seite",
      "Ändere eine Gerichtsbeschreibung in deiner Muttersprache — Übersetzungen folgen",
    ],
  },

  pricing: {
    heading: "Ein Tarif.",
    headingAccent: "Alle 35 Sprachen inklusive.",
    sub: "Mehrsprachige Karte, KI-Übersetzung, QR-Bestellung und Reservierungen — alles in einem festen Preis. Keine Gebühren pro Sprache, keine Extras für RTL.",
  },

  faq: {
    sub: "Alles, was Gastronomen zur mehrsprachigen Karte fragen. Deine Frage nicht dabei? Schreib uns auf WhatsApp — echte Menschen antworten.",
    items: [
      {
        q: "Wie viele Sprachen unterstützt die Karte?",
        a: "35 Sprachen: Englisch, Spanisch, Deutsch, Französisch, Italienisch, Portugiesisch, Niederländisch, Polnisch, Tschechisch, Slowakisch, Ungarisch, Rumänisch, Bulgarisch, Kroatisch, Serbisch, Slowenisch, Griechisch, Türkisch, Russisch, Ukrainisch, Litauisch, Lettisch, Estnisch, Finnisch, Schwedisch, Norwegisch, Dänisch, Isländisch, Katalanisch, Irisch-Gälisch, Arabisch, Persisch, Japanisch, Koreanisch und Chinesisch. UI-Strings sind professionell für jede übersetzt.",
      },
      {
        q: "Wie wechseln Gäste die Sprache?",
        a: "Auf zwei Arten: automatisch (die Karte öffnet sich in der Handysprache) und manuell (ein Sprachwähler oben auf der Karte). 80 % der Touristen tippen den manuellen Wähler nie an — die Auto-Erkennung funktioniert einfach, weil ihr Handy ihre Sprache schon kennt.",
      },
      {
        q: "Unterstützt ihr Rechts-nach-Links-Sprachen wie Arabisch und Persisch?",
        a: "Ja, mit vollem RTL-Layout. Die ganze Karte wird gespiegelt: Text richtet sich rechts aus, Spalten kehren sich um, Navigationsschubladen öffnen sich von der rechten Seite, Preise erscheinen nach Gerichtsnamen. Das ist echter RTL-Support auf Layout-Ebene implementiert, nicht nur CSS-Direction-Tricks.",
      },
      {
        q: "Wird Google meine Karte in allen 35 Sprachen indexieren?",
        a: "Ja. Jede Sprache hat einen eigenen URL-Slug (z. B. /es, /fr, /de), korrekte hreflang-Tags, lokalisierte Meta-Titel und -Beschreibungen und sprachspezifische strukturierte Daten. Google behandelt jede Sprache als separate Seite für diese Locale, was bedeutet, dass Touristen, die in ihrer Sprache nach deinem Restaurant suchen, dich eher finden.",
      },
      {
        q: "Was, wenn ich nicht alle 35 Sprachen will — nur meine Hauptmärkte?",
        a: "Wähle, welche Sprachen aktiv sind. Wenn du ein Strandrestaurant in Griechenland bist und meist britische, deutsche und italienische Touristen bedienst, aktiviere nur Englisch, Deutsch und Italienisch — der Rest erscheint nicht im Sprachwähler oder in der Auto-Erkennung. Du kannst später jederzeit mehr aktivieren, wenn sich dein Touristenmix ändert.",
      },
    ],
  },

  finalCta: {
    heading: "Jede Touristen-Handysprache.",
    headingAccent: "Schon unterstützt.",
    sub: "Serviere eine mehrsprachige Karte in 35 Sprachen, inklusive RTL-Arabisch und -Persisch. 14 Tage gratis, ohne Karte, ohne Gebühren pro Sprache.",
  },
};
