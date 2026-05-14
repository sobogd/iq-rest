import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Restaurant-Reservierungssystem — Tischbuchungen 24/7, ohne Anrufe",
    description:
      "Nimm Tischreservierungen 24/7 über QR-Karte und Webseite an. White-Label-Buchungs-Widget, E-Mail-Erinnerungen, weniger No-Shows. 14 Tage gratis.",
    canonical: "https://iq-rest.com/de/reservations",
    ogLocale: "de_DE",
    ogTitle: "Restaurant-Reservierungen — 24/7 Tischbuchungssystem für Restaurants",
    ogDescription:
      "Verpasse keine Buchung mehr während du kochst. Gäste buchen 24/7 über deine QR-Karte, bekommen E-Mail-Erinnerungen, du reduzierst No-Shows. 14 Tage gratis.",
  },

  hero: {
    title: "Verpasse keine Buchungen mehr, während du kochst.",
    subtitle:
      "Nimm Tischreservierungen 24/7 entgegen — direkt über QR-Karte, Webseite und Instagram. Gäste wählen Datum, Uhrzeit und Personenanzahl, du bestätigst mit einem Tipp, E-Mail-Erinnerungen gehen automatisch raus. Weniger Anrufe, weniger No-Shows, mehr Gedecke pro Abend.",
    trustLine: "500+ Restaurants in 30+ Ländern",
  },

  seo: {
    description:
      "Ein vollwertiges Restaurant-Reservierungssystem in deiner QR-Karte eingebaut. Gäste buchen einen Tisch über deine Karte, deine Webseite, deinen Instagram-Bio-Link oder einen Google-Maps-Button — jederzeit, Tag und Nacht. Du siehst neue Buchungen in Echtzeit, bestätigst oder lehnst mit einem Tipp ab, und das System verschickt E-Mail-Erinnerungen, die No-Shows drastisch senken. Kein OpenTable-Abzug, keine Provision pro Gedeck, kein Vertrag.",
    fullDescription:
      "Telefonreservierungen sterben aus. Touristen rufen nicht an (anderes Ländervorwahl, Sprachbarriere), Millennials rufen nicht an (Text-First-Generation), und du verlierst die Hälfte der Buchungen während des Service, wenn niemand abnimmt. IQ Rest Reservierungen leben dort, wo deine Gäste sowieso sind: auf deiner Karte, im Browser ihres Handys, auf deinem Instagram-Bio-Link.\n\nDer Buchungs-Flow sind zwei Screens — Datum und Personenanzahl wählen, Name und Telefon hinterlassen, optional eine Notiz ('Geburtstag', 'Allergie: Nüsse', 'Hochstuhl bitte'). Du bekommst die Buchung sofort mit einem Ein-Tipp-Bestätigen/Ablehnen. Bestätigte Gäste erhalten automatisch eine E-Mail-Erinnerung 24 h vorher, was allein No-Shows um ~30 % senkt. Du kannst auch Maximalgedecke pro Slot, Sperrtage und buchbare vs. Walk-in-Tische festlegen.\n\nAnders als bei OpenTable oder TheFork gibt es keine Provision pro Gedeck, keine separate App zum Herunterladen und keinen Dritten zwischen dir und dem Gast. Die Buchung gehört dir, die Daten gehören dir und das System ist Teil deines Abos — keine Reservierungssteuer.",
    benefitsHeading: "Warum Restaurants OpenTable für IQ Rest Reservierungen aufgeben",
    benefits: [
      "24/7 Buchungen über QR-Karte, Webseite, Instagram, Google-Maps-Button",
      "Keine Provision pro Gedeck — fester Tarif, behalte 100 % des Umsatzes",
      "Automatische E-Mail-Erinnerungen senken No-Shows um ~30 %",
      "Bestätigen / Ablehnen mit einem Tipp vom Handy, kein Wartebereich",
      "Maximalgedecke pro Slot, Sperrtage, tischspezifische Buchungsregeln",
      "Sonderwünsche (Allergien, Geburtstage) sauber bei jeder Buchung erfasst",
    ],
  },

  pricing: {
    heading: "Ein Tarif.",
    headingAccent: "Unbegrenzte Buchungen.",
    sub: "Reservierungen, QR-Karte, Online-Bestellung und KI-Übersetzung — alles in einem festen Preis. Keine Gebühr pro Gedeck, keine Provision, kein Vertrag.",
  },

  faq: {
    sub: "Alles, was Gastronomen zu Online-Reservierungen fragen. Deine Frage nicht dabei? Schreib uns auf WhatsApp — echte Menschen antworten.",
    items: [
      {
        q: "Nehmt ihr Provision pro Buchung wie OpenTable oder TheFork?",
        a: "Null. Reservierungen sind Teil deines festen Monatsabos — buche 10 Gedecke am Tag oder 1.000, der Preis ist identisch. Keine Gebühr pro Gedeck, keine Reservierungssteuer, kein Abzug von deinem Umsatz. Im Vergleich zu OpenTables 1–2,50 € pro Gedeck spart ein Restaurant mit 50 Gedecken pro Tag 1.500–3.750 € im Monat.",
      },
      {
        q: "Wie buchen Gäste — brauchen sie eine App?",
        a: "Keine App. Sie scannen deinen QR oder klicken deinen Buchungs-Link — Datum, Uhrzeit, Personenanzahl, Name, Telefon, optionale Notiz. Fertig. Der ganze Flow dauert unter 30 Sekunden und funktioniert in jedem Browser. Du kannst das Buchungsformular auch direkt in deine Webseite einbetten oder eine saubere Buchungs-URL auf Instagram teilen.",
      },
      {
        q: "Kann ich Buchungen manuell bestätigen oder bestätigen sie sich automatisch?",
        a: "Beide Modi — du wählst pro Slot oder pro Tag. Auto-Bestätigung, wenn du deiner Auslastung vertraust und 24/7 reaktiv wirken willst. Manuelle Bestätigung, wenn du Buchungen prüfen willst (volle Wochenenden, Sonderveranstaltungen). Du erhältst die Buchung sofort und bestätigst mit einem Tipp vom Handy.",
      },
      {
        q: "Wie geht das System mit No-Shows um?",
        a: "Automatische E-Mail-Erinnerungen werden 24 h und (optional) 2 h vor der Buchung verschickt — das allein senkt No-Shows um ~30 % gegenüber Anrufen oder Systemen ohne Erinnerung. Du kannst auch eine Telefonnummer verlangen, Gäste im Dashboard als 'No-Show' markieren, und über Zeit kennzeichnet das System Wiederholungstäter.",
      },
      {
        q: "Kann ich begrenzen, wie viele Gedecke ich pro Abend annehme?",
        a: "Ja. Setze Maximalgedecke pro Zeitslot, pro Tag und Sperrtage (Schließungen, private Veranstaltungen). Du kannst sogar bestimmte Tische als 'buchbar' vs. 'nur Walk-in' markieren, sodass deine besten Fensterplätze frei für spontane Gäste bleiben. Touristen und Locals buchen über dasselbe System, ohne deinen Sitzplan zu sprengen.",
      },
    ],
  },

  finalCta: {
    heading: "Buchungen, während du kochst.",
    headingAccent: "Erinnerungen, damit sie kommen.",
    sub: "Nimm Reservierungen 24/7 über QR-Karte, Webseite und Instagram an. 14 Tage gratis, ohne Karte, ohne Gedeck-Provision.",
  },
};
