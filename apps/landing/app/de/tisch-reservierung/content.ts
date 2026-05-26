import { CalendarPlus, CalendarDays } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "de",
  slug: "tisch-reservierung",
  trackPrefix: "l_de_bookings",

  meta: {
    title: "Tischreservierung 24/7 für Restaurants | IQ Rest",
    description:
      "Tischreservierung 24/7 für Restaurants: Gäste reservieren selbst über die QR-Speisekarte oder Website. Tischkalender, automatische Bestätigungen und Erinnerungen. Kein verpasster Gast. 14 Tage kostenlos.",
    canonical: "https://iq-rest.com/de/tisch-reservierung",
    ogLocale: "de_DE",
    ogTitle: "Tischreservierung 24/7 — Gäste reservieren selbst",
    ogDescription:
      "Gäste reservieren Tische über die QR-Speisekarte oder Website. Kalender, automatische Bestätigungen, Erinnerungen. Kein verpasster Gast.",
    brandLine: "IQ Rest — Tischreservierung für Restaurants",
  },

  hero: {
    headline: "Tischreservierung 24/7 — Gäste reservieren selbst.",
    cta: "Tischreservierung einrichten",
    sub: "Gäste reservieren Tische über die QR-Speisekarte oder einen Direktlink. Tischkalender, automatische Bestätigungen und Erinnerungen. Kein verpasster Gast und keine Anrufe in Stoßzeiten.",
    imageSrc: "/landing/feature-reservation.webp",
    imageAlt: "Hostess verwaltet Reservierungen von einem Tablet am Restauranteingang",
  },

  scan: {
    heading: "Tischreservierung starten",
    headingAccent: "in 5 Minuten.",
    sub: "Kalender anschließen, Tische mit Fotos und Kapazität hinzufügen — Gäste beginnen noch am selben Tag mit Reservierungen.",
    cta: "Reservierung aktivieren",
  },

  subFeatures: [
    {
      icon: CalendarPlus,
      eyebrow: "Reservierungsformular",
      heading: "Gäste reservieren selbst — nach Datum, Uhrzeit und Personenzahl.",
      body: "Der Gast öffnet die QR-Speisekarte oder einen Direktlink, wählt Datum, Uhrzeit und Personenzahl — und sieht sofort die verfügbaren Tische, jeder mit Foto, Beschreibung (Terrasse, am Fenster, Bankette neben der Bar) und Kapazität. Die Bestätigung wird automatisch per E-Mail und WhatsApp gesendet.",
      bullets: [
        "Tischauswahl nach Foto, Beschreibung und Kapazität.",
        "Automatische Bestätigung und Erinnerung eine Stunde vor dem Besuch.",
        "Minimale Felder im Formular: Name, Telefon, Personenzahl.",
      ],
      image: { src: "/landing/feature-booking-form.webp", alt: "Gast reserviert einen Restauranttisch vom Smartphone: Datum, Uhrzeit, Personenzahl und Tischauswahl" },
    },
    {
      icon: CalendarDays,
      eyebrow: "Reservierungskalender",
      heading: "Kalender nach Tag und Tisch — alles auf einen Blick.",
      body: "Das Admin-Panel zeigt einen Kalender der Reservierungen, aufgeschlüsselt nach Tisch, Tag, Woche und Monat. Freie Slots, belegte Tische, bestätigte und unbestätigte Reservierungen auf einem einzigen Bildschirm. Funktioniert auf einem Tablet im Service und einem Laptop im Büro.",
      bullets: [
        "Tages-, Wochen- und Monatsansichten.",
        "Aufschlüsselung nach Tisch: wer, wann, wie viele Gäste.",
        "Verschieben, Stornieren oder Bestätigen einer Reservierung mit einem Tipp vom Smartphone.",
      ],
      image: { src: "/landing/feature-booking-calendar.webp", alt: "Reservierungskalender im IQ Rest Admin-Panel auf zwei Tablets: Tages-Gantt nach Tischen und Monatsansicht" },
    },
  ],

  faq: {
    sub: "Was Gastronomen zur Tischreservierung in IQ Rest fragen. Frage nicht dabei? Schreiben Sie uns auf WhatsApp.",
    items: [
      { q: "Kann ich auswählen, an welchen Tagen und Stunden Reservierungen möglich sind?", a: "Ja. Im Admin-Panel lassen sich Öffnungszeiten und verfügbare Wochentage festlegen — das System zeigt Gästen keine nicht verfügbaren Slots. Sie können ein bestimmtes Datum schließen (Firmenfeier, private Reservierung) oder den gesamten Kalender vorübergehend ausschalten." },
      { q: "Kann ich für jeden Tisch ein Foto hochladen?", a: "Ja. Jeder Tisch kann ein Foto, eine Beschreibung (Terrasse, am Fenster, Bankette neben der Bar) und eine Kapazität haben. Der Gast sieht genau den Tisch, den er reserviert, und trifft eine informierte Wahl — das reduziert nicht erfüllte Erwartungen." },
      { q: "Kann ich die Reservierung an bestimmten Tagen deaktivieren?", a: "Ja. Der Kalender erlaubt es, bestimmte Daten (Feiertage, private Veranstaltungen, Renovierung) oder ganze Wochentage zu schließen. An diesen Daten sehen Gäste die Meldung „Reservierung vorübergehend nicht verfügbar“." },
      { q: "Kann ich anpassen, welche Felder vom Gast erfasst werden?", a: "Ja. Standardsatz: Name, Telefon, E-Mail, Personenzahl. Sie können benutzerdefinierte Felder hinzufügen (Anlass, Allergien, besondere Wünsche) oder unnötige entfernen, um das Formular so kurz wie möglich zu halten." },
      { q: "Kann ich die Personenzahl pro Tisch begrenzen?", a: "Ja. Jeder Tisch hat eine Einstellung „Kapazität“ — das System lässt nicht zu, dass ein Zweiertisch für 6 reserviert wird. Bei größeren Tischen können Sie ein Minimum festlegen, damit kleine Gruppen den „Achtertisch“ nicht für größere Gesellschaften blockieren." },
      { q: "Wie schwer ist die Reservierungs-Einrichtung?", a: "Sie nimmt sehr wenig Zeit in Anspruch. Drei Schritte: (1) Tische mit Namen, Fotos und Kapazität hinzufügen, (2) Reservierungsmodus in den Einstellungen aktivieren, (3) Link oder QR-Code mit den Gästen teilen. Vollständiger Start in 5–10 Minuten." },
      { q: "Kann ich das Reservierungssystem auf meiner eigenen Domain nutzen?", a: "Ja. Wir unterstützen eine eigene Domain mit SSL-Zertifikat: Gäste reservieren unter der Adresse Ihres Restaurants (z. B. booking.ihrrestaurant.de). Wir helfen bei der DNS-Einrichtung; der Prozess dauert 5–10 Minuten." },
      { q: "Kann ich automatische oder manuelle Bestätigung konfigurieren?", a: "Ja, der Modus wird in den Einstellungen festgelegt. Bei automatischer Bestätigung erhält der Gast sofort nach dem Absenden des Formulars eine Bestätigung und die Reservierung gilt als angenommen. Bei manueller Bestätigung landet die Anfrage im Admin-Panel mit Status „wartet auf Bestätigung“ — der Manager prüft sie und bestätigt oder lehnt ab. Der manuelle Modus ist bei begrenzter Tischzahl oder strikten Gästerichtlinien nützlich." },
      { q: "Berechnen Sie Provision auf Reservierungen?", a: "Nein. Die Tischreservierung ist vollständig im Pro-Tarif enthalten — keine Prozente auf Gäste, keine Gebühr pro Slot, keine Aggregator-Provisionen. Eine feste monatliche Gebühr und unbegrenzte Reservierungen." },
    ],
  },
};
