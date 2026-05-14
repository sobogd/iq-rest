import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Restaurant vom Handy aus managen — Mobiles Restaurant-Dashboard",
    description:
      "Gerichte hinzufügen, Preise ändern, Fotos hochladen, Bestellungen ansehen — alles vom Handy. Das ganze IQ Rest Dashboard ist mobile-first. Kein Computer nötig, niemals.",
    canonical: "https://iq-rest.com/de/mobile-management",
    ogLocale: "de_DE",
    ogTitle: "Mobiles Restaurant-Management — Verwalte deine Karte vom Handy",
    ogDescription:
      "Aktualisiere Preise zwischen Tischen. Lade Fotos aus der Kamera. Sieh Live-Bestellungen am Pass. Das ganze IQ Rest Dashboard läuft auf deinem Handy.",
  },

  hero: {
    title: "Führe dein Restaurant vom Handy. Zwischen den Tischen.",
    subtitle:
      "Das ganze IQ Rest Dashboard ist mobile-first gebaut — füge Gerichte hinzu, tausche Fotos, ändere Preise und lies Live-Bestellungen vom selben Handy in deiner Schürzentasche. Kein Laptop, kein Backoffice-Computer, keine Ausreden.",
    trustLine: "500+ Restaurants in 30+ Ländern",
  },

  seo: {
    description:
      "Restaurantbesitzer sitzen nicht am Schreibtisch — sie stehen hinter der Bar, in der Küche, im Service. IQ Rest ist für diese Realität gebaut. Jede Dashboard-Funktion, vom Hinzufügen neuer Gerichte bis zum Anzeigen von Live-Bestellungen, wurde zuerst für Daumen und kleine Bildschirme entworfen. Wenn du Instagram benutzen kannst, kannst du dein ganzes Restaurant von IQ Rest auf dem Handy aus führen.",
    fullDescription:
      "Die meiste Restaurant-Management-Software ist Desktop-first mit einer 'mobilen Version' als Notlösung dazu — winzige Buttons, kaputte Layouts und Funktionen drei Menüs tief versteckt. IQ Rest wurde umgekehrt designt: Jeder Screen funktioniert perfekt auf dem Handy, und die Desktop-Version ist nur dieselbe UI nach oben skaliert.\n\nWas das in der Praxis bedeutet: Mach mit der Handykamera ein Foto vom Tagesangebot und lade es direkt in die Karte. Tippfehler in einer Gerichtsbeschreibung beim Tisch abräumen entdeckt? Korrigiere ihn vor Ort, die Änderung ist in Sekunden live. Koch geht überraschend? Nimm das Gericht vom Handy aus offline, bevor der nächste Gast deinen QR scannt. Neues Gericht aus der Küche? Tippen, schreiben, fotografieren, Preis setzen — Gäste können es 30 Sekunden später bestellen.\n\nDasselbe gilt für Bestellungen, Reservierungen, Analytics und Übersetzungen. Die Live-Bestellliste aktualisiert in Echtzeit. Reservierungsbestätigungen sind Ein-Tipp. Tagesumsatz, Top-Gerichte und Stoßzeiten passen auf einen Handybildschirm. Du musst nie wieder ins Backoffice gehen, um irgendetwas zu verwalten.",
    benefitsHeading: "Warum Mobile-First-Management alles ändert",
    benefits: [
      "Voller Dashboard-Zugriff auf jedem Smartphone oder Tablet — keine App zu installieren",
      "Gerichtsfotos direkt aus der Handykamera in zwei Tipps hochladen",
      "Preise, Beschreibungen, Öffnungszeiten von überall aktualisieren",
      "Touch-freundliches Drag-and-Drop für Kategorien und Gerichte",
      "Live-Bestellungen, Reservierungen und Analytics auf einem Handybildschirm",
      "Offline-tolerant — fertig editieren, synchronisiert beim Wiederverbinden",
    ],
  },

  pricing: {
    heading: "Ein Tarif.",
    headingAccent: "Vom Handy aus betrieben.",
    sub: "Mobile-first Dashboard plus QR-Karte, Online-Bestellung, KI-Übersetzung und Reservierungen — alles in einem festen Preis.",
  },

  faq: {
    sub: "Alles, was Gastronomen zum mobilen Management fragen. Deine Frage nicht dabei? Schreib uns auf WhatsApp — echte Menschen antworten.",
    items: [
      {
        q: "Muss ich eine mobile App installieren?",
        a: "Nein. IQ Rest läuft im Browser deines Handys — Safari, Chrome, was du eh schon nutzt. Du kannst es zum Homescreen hinzufügen für Ein-Tipp-Zugriff (es fühlt sich wie eine native App an), aber es gibt nichts aus dem App Store herunterzuladen, keine Berechtigungen zu erteilen, keine Versions-Updates zu betreuen.",
      },
      {
        q: "Kann ich Karten-Fotos wirklich direkt vom Handy hochladen?",
        a: "Ja — das ist der ganze Sinn. Tippe 'Foto hinzufügen' bei einem Gericht, die Handykamera öffnet sich, Foto machen oder aus der Galerie wählen, hochladen drücken. Das Bild wird automatisch skaliert, fürs Web optimiert und ist in Sekunden live in deiner Karte. Kein Lightroom, keine Dateiübertragung an einen Computer, kein SFTP.",
      },
      {
        q: "Funktioniert es auf Tablets und am Empfang?",
        a: "Ja. Das Dashboard ist für Handys, Tablets und Desktop-Computer optimiert — gleiche UI, gleiche Shortcuts, gleiche Geschwindigkeit. Viele Restaurants haben ein iPad am Empfang für Reservierungen, ein Handy in der Tasche des Chefs für Bestellungen und einen Laptop im Backoffice für Rechnungen — alles mit demselben Login.",
      },
      {
        q: "Was ist mit Preisaktualisierungen während eines vollen Service?",
        a: "Dafür gemacht. Tippe ein Gericht an, ändere den Preis, speichere — Gäste sehen den neuen Preis innerhalb von Sekunden ohne neu zu laden. Kein erneutes Veröffentlichen, kein Neubau, keine Sync-Verzögerung. Genauso für 'ausverkauft' (das Gericht wird sofort auf der Karte ausgegraut) oder ein Tagesangebot zwischen den Stoßzeiten hinzufügen.",
      },
      {
        q: "Was, wenn mein Handy mitten in der Bearbeitung stirbt?",
        a: "Bearbeitungen werden pro Feld beim Tippen gespeichert — wenn dein Handy stirbt oder die Verbindung abbricht, findest du deine Änderungen beim erneuten Anmelden auf jedem Gerät wieder. Keine verlorene Arbeit.",
      },
    ],
  },

  finalCta: {
    heading: "Aus der Schürzentasche steuern.",
    headingAccent: "Backoffice ade.",
    sub: "Das ganze Dashboard passt auf dein Handy. 14 Tage gratis, ohne Karte, ohne App-Installation.",
  },
};
