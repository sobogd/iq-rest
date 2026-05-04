import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Restaurant-Karten-Analytics — QR-Scans, Top-Gerichte, Touristensprachen",
    description:
      "Sieh genau, wie Gäste deine QR-Karte nutzen. Tägliche Scans, meistgesehene Gerichte, Sprachvorlieben, Stoßzeiten. Datenbasierte Entscheidungen für dein Restaurant.",
    canonical: "https://iq-rest.com/de/analytics",
    ogLocale: "de_DE",
    ogTitle: "Restaurant-Analytics — QR-Karten-Scans, Gerichte und Sprachen tracken",
    ogDescription:
      "Erfahre, welche Gerichte deine Gäste wirklich anschauen, wann Stoßzeiten sind und welche Touristennationalität heute Abend in deinem Speiseraum ist. 14 Tage gratis.",
  },

  hero: {
    title: "Hör auf zu raten. Wisse, was Gäste wirklich tun.",
    subtitle:
      "Sieh Restaurant-Karten-Analytics in Echtzeit — QR-Scans pro Stunde, Gerichte, bei denen Gäste verweilen, Sprachen, die Touristen nutzen, der schwächste Wochentag — und nutze diese Daten, um weniger Karten zu drucken, smarter zu planen und die richtigen Specials zu pushen.",
    trustLine: "4,9 · 500+ Restaurants in 30+ Ländern",
  },

  seo: {
    description:
      "Restaurant-Analytics, die kein Datenteam erfordern. IQ Rest trackt jeden Scan, View, Sprachwechsel und jede Bestellung über deine QR-Karte und bringt die Muster zum Vorschein, die zählen: meistgesehene Gerichte, Stoßzeiten der Scans, stärkster Wochentag, Sprachverteilung deiner Touristen. Triff datenbasierte Entscheidungen, ohne je eine Tabelle zu öffnen.",
    fullDescription:
      "Die meisten Restaurants laufen auf Bauchgefühl — 'gefühlt sind Dienstage flach', 'ich glaube die Pasta verkauft sich gut'. Bauchgefühl ist gut, Daten sind besser. IQ Rest trackt jede Interaktion mit deiner QR-Karte, damit du nicht raten musst: Wie oft wurde dein QR heute gescannt, welche Gerichte haben Gäste am längsten angeschaut, welche haben sie in den Warenkorb gelegt, aber nicht bestellt, welche Sprache haben Touristen verwendet.\n\nDas Analytics-Dashboard zeigt die Antworten in drei Ansichten: heute (Live-Scans, aktuelle Bestellungen, was gerade bestellt wird), diese Woche (Top 10 Gerichte, Stoßzeiten, Sprachverteilung, No-Shows bei Reservierungen) und Trends (Monat-über-Monat-Wachstum, Saisonalität, Wochentagsmuster). Du kannst in jedes Gericht eintauchen, um zu sehen, wie oft es im Vergleich zur Bestellrate angesehen wird (ein Gericht, das 200 Mal angesehen, aber nur 5 Mal bestellt wird, hat ein Copy- oder Foto-Problem) oder in jede Sprache, um zu sehen, welchen Touristenmix du tatsächlich bedienst.\n\nDas Ziel sind Entscheidungen, nicht Dashboards: 'nächster Dienstag ist historisch flach → Happy-Hour-Push', 'italienische Touristen bestellen 3x mehr Pasta als Locals → Pasta zuerst, wenn Sprache=it', 'dieses Gericht hat 90 % View-Rate, aber 5 % Bestellrate → Foto verbessern'. Echte Veränderungen, echter Umsatz, kein MBA nötig.",
    benefitsHeading: "Warum Restaurants die IQ Rest Analytics gegenüber Google Analytics lieben",
    benefits: [
      "Live-QR-Scan-Counter — sieh, wie sich dein Abend in Echtzeit füllt",
      "Meistgesehene und meistbestellte Gerichte — erkenne, was funktioniert",
      "Sprachverteilung — wisse, welche Touristen in deinem Speiseraum sind",
      "Stoßzeiten und Wochentagsmuster — smarter planen, smarter vorbereiten",
      "View-zu-Bestellung-Konversion pro Gericht — schlechte Fotos und schwache Beschreibungen fixen",
      "Reservierungs-Analytics — Buchungsquellen, No-Show-Rate, Personenanzahl-Mix",
    ],
  },

  pricing: {
    heading: "Ein Tarif.",
    headingAccent: "Volle Analytics inklusive.",
    sub: "Restaurant-Analytics, QR-Bestellung, KI-Übersetzung und Reservierungen — alles in einem festen Preis. Keine Premium-Stufe für Daten, niemals.",
  },

  faq: {
    sub: "Alles, was Gastronomen zur Karten-Analytics fragen. Deine Frage nicht dabei? Schreib uns auf WhatsApp — echte Menschen antworten.",
    items: [
      {
        q: "Was kann ich tatsächlich im Analytics-Dashboard sehen?",
        a: "Live-QR-Scans (heute, diese Woche, dieser Monat), meistgesehene Gerichte, meistbestellte Gerichte, View-zu-Bestellung-Konversion pro Gericht, Sprachverteilung der Gäste, Stoßzeiten nach Wochentag, durchschnittlicher Bestellwert, am stärksten ausgelastete Tische, Reservierungs-No-Show-Rate und Trends über Zeit. Alles auf einem Dashboard, keine Einrichtung nötig.",
      },
      {
        q: "Wie nutze ich das tatsächlich, um Umsatz zu steigern?",
        a: "Drei Muster funktionieren bei den meisten Restaurants: (1) Karte umsortieren, sodass die Top-Konvertierer-Gerichte zuerst erscheinen; (2) Foto oder Beschreibung bei Gerichten mit vielen Views, aber wenig Bestellungen verbessern; (3) Happy Hour oder Special an historisch flachen Wochentagen/Stunden pushen. Wir haben gesehen, wie Restaurants den Wochentagsumsatz allein durch diese drei Änderungen um 15–30 % gesteigert haben.",
      },
      {
        q: "Ist das anonym oder trackt ihr Einzelpersonen?",
        a: "Anonym und aggregiert. Wir tracken Karten-Views und Bestellungen pro Sitzung, nicht pro identifizierbarem Nutzer. Keine E-Mails, keine Telefonnummern, keine langfristig gespeicherten IP-Adressen. Das Dashboard zeigt dir Muster ('200 Scans am Freitag'), keine Personen. Voll DSGVO-konform by Design.",
      },
      {
        q: "Kann ich die Daten exportieren?",
        a: "Ja. Exportiere jede Ansicht als CSV (Top-Gerichte, tägliche Scans, stündliche Aufschlüsselung etc.) und öffne sie in Excel oder Google Sheets. Nützlich zum Teilen mit Investoren, Buchhaltern oder zum Kombinieren mit deinen Kassendaten.",
      },
      {
        q: "Brauche ich technische Einrichtung, um Analytics zu bekommen?",
        a: "Null. Analytics sind standardmäßig aktiviert, sobald deine QR-Karte live ist — jeder Scan, View und jede Bestellung wird automatisch getrackt. Das Dashboard ist Teil des Standard-Abos, kein Upsell, und du wirst innerhalb des ersten Tages nach Gäste-Scans nützliche Daten sehen.",
      },
    ],
  },

  finalCta: {
    heading: "Hör auf zu raten.",
    headingAccent: "Fang an zu messen.",
    sub: "Live-QR-Scan-Analytics, Top-Gerichte, Stoßzeiten, Touristen-Sprachverteilung. 14 Tage gratis, ohne Karte.",
  },
};
