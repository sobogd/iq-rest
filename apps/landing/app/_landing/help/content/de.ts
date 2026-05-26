import type { HelpDoc } from "../types";

// DE help guide.
export const de: HelpDoc = {
  metaTitle: "IQ Rest verwenden — Schritt-für-Schritt-Anleitung",
  metaDescription:
    "Vollständige IQ-Rest-Anleitung: Registrierung, Menü, Bestellungen, Reservierungen, Küchendisplay und Einstellungen — für Restaurants.",
  h1: "Hilfe",
  intro: "Eine ausführliche Anleitung zu IQ Rest — von der Registrierung bis zu den feineren Einstellungen.",
  banner: {
    title: "Es ist einfacher, als es aussieht",
    sub: "Eine Schritt-für-Schritt-Anleitung: von der Registrierung bis zu den feineren Einstellungen — das schafft jeder.",
    cta: "So funktioniert's",
  },
  tipLabel: "Tipp",
  noteLabel: "Wichtig",
  sections: [
    {
      id: "start",
      title: "1. Erste Schritte",
      blocks: [
        { type: "h3", text: "Was ist dieses System" },
        {
          type: "p",
          text: "IQ Rest ist ein Dienst für Restaurants: Du erstellst ein Online-Menü mit QR-Code, nimmst Bestellungen und Tischreservierungen direkt vom Smartphone der Gäste entgegen, während in der Küche und beim Servicepersonal Tablet-Terminals laufen. Alles wird über ein einziges Admin-Panel (das Dashboard) verwaltet.",
        },
        { type: "h3", text: "Registrierung und Anmeldung" },
        { type: "p", text: "Du kannst dich auf drei Arten anmelden — wähle eine im Anmeldebildschirm:" },
        {
          type: "list",
          items: [
            "Mit Google — klicke auf „Mit Google fortfahren“ und wähle dein Konto.",
            "Mit Apple — klicke auf „Mit Apple fortfahren“.",
            "Per E-Mail — klicke auf „Mit E-Mail fortfahren“, gib deine Adresse ein, und wir senden dir einen 6-stelligen Code. Gib ihn im nächsten Bildschirm ein. Kein Passwort nötig.",
          ],
        },
        {
          type: "note",
          text: "Per E-Mail erhältst du nur einen einmaligen Anmeldecode — kein Spam, keine Newsletter.",
        },
        { type: "h3", text: "Restaurant anlegen (Onboarding)" },
        {
          type: "p",
          text: "Bei der ersten Anmeldung führt dich das System durch eine schnelle Einrichtung. Danach wird automatisch ein Restaurant mit einer Beispiel-Menüvorlage erstellt, die du später durch dein eigenes ersetzt.",
        },
        {
          type: "steps",
          items: [
            "Gib den Restaurantnamen ein.",
            "Wähle die Küchenart (sie bestimmt die Start-Menüvorlage).",
            "Fertig: Du landest im Dashboard mit einem bereits befüllten Beispiel-Menü.",
          ],
        },
        {
          type: "note",
          text: "Die Währung wird automatisch anhand deiner Region erkannt — du musst sie zu Beginn nicht wählen. Später kannst du sie in Einstellungen → Region ändern.",
        },
        { type: "h3", text: "Überblick über das Dashboard" },
        {
          type: "p",
          text: "Navigation zwischen den Bereichen: am Computer eine obere Leiste, am Telefon eine untere Leiste. Bereiche: Menü, Bestellungen, Reservierungen, Küche, Analysen und Einstellungen.",
        },
        {
          type: "list",
          items: [
            "Neben dem Restaurantnamen in der oberen Leiste ist ein kleiner Verbindungsindikator: Ein grüner Punkt bedeutet, dass Bestellungen in Echtzeit synchronisiert werden.",
            "Auf der Seite „Menü“ gibt es oben die Schaltfläche „Vorschau“ — sie öffnet dein Menü so, wie es der Gast sieht.",
            "Direkt daneben die Schaltfläche „Teilen“ — sie zeigt den QR-Code und den Link zum Menü (Link kopieren, QR herunterladen oder Menü öffnen).",
          ],
        },
        {
          type: "tip",
          text: "Drücke nach jeder Menü-Änderung auf „Vorschau“ — du siehst sofort, wie es für den Gast aussieht.",
        },
      ],
    },
    {
      id: "menu",
      title: "2. Menü",
      blocks: [
        {
          type: "p",
          text: "Der Bereich „Menü“ ist das Herzstück des Systems. Hier baust du die Struktur auf: Kategorien → Gerichte → Optionen. Öffne ihn über die Navigation.",
        },
        { type: "h3", text: "Kategorien und Unterkategorien" },
        {
          type: "steps",
          items: [
            "Drücke auf „Kategorie hinzufügen“ und gib einen Namen ein (zum Beispiel „Vorspeisen“).",
            "Um eine Kategorie zu bearbeiten — fahre darüber und drücke auf „Kategorie bearbeiten“.",
            "Die Reihenfolge der Kategorien änderst du mit den Schaltflächen „Hoch“ / „Runter“ — genau in dieser Reihenfolge sieht sie der Gast.",
            "Du kannst eine „Gruppe“ erstellen (über „Gruppe hinzufügen“) — eine Abschnitts-Kategorie, die andere Kategorien enthält.",
          ],
        },
        { type: "h3", text: "Gerichte hinzufügen" },
        {
          type: "steps",
          items: [
            "Klappe eine Kategorie auf (Pfeil links) und drücke auf „Gericht hinzufügen“.",
            "Fülle Name, Preis und Beschreibung aus.",
            "Füge ein Foto hinzu: „Foto hinzufügen“ — lade dein eigenes hoch oder drücke „Generieren“ und beschreibe das Gericht in Worten, damit die KI ein Bild erstellt.",
            "Speichern. Das Gericht erscheint in der Kategorie.",
          ],
        },
        {
          type: "tip",
          text: "Ein Foto kann per KI generiert werden: Gib Blickwinkel, Beleuchtung oder Hintergrund an (zum Beispiel „Pizza Margherita auf einem Holzbrett, Draufsicht“).",
        },
        { type: "h3", text: "Optionen und Varianten (Modifikatoren)" },
        {
          type: "p",
          text: "Optionen sind Auswahlmöglichkeiten innerhalb eines Gerichts: Größe, Garstufe, Extra-Zutaten. Jede Option hat Varianten, und einer Variante kann ein Aufpreis hinzugefügt werden (zum Beispiel „+1.50 je Stück“).",
        },
        {
          type: "list",
          items: [
            "Beispiel: eine Option „Größe“ mit den Varianten „Klein / Groß (+2.00)“.",
            "Beispiel: eine Option „Extra“ mit mehreren Varianten, von denen der Gast eine oder mehrere wählt.",
          ],
        },
        { type: "h3", text: "Allergene und Diäten" },
        {
          type: "p",
          text: "Für ein Gericht kannst du Allergene (Gluten, Nüsse usw.) und Ernährungskennzeichen (vegetarisch, vegan) markieren. Der Gast sieht sie als Symbole im öffentlichen Menü.",
        },
        { type: "h3", text: "Sichtbarkeit der Gerichte" },
        {
          type: "p",
          text: "Die Schaltfläche „Gericht ausblenden“ / „Gericht anzeigen“ entfernt einen Eintrag vorübergehend aus dem öffentlichen Menü, ohne ihn zu löschen — praktisch, wenn ein Gericht ausverkauft ist.",
        },
        { type: "h3", text: "Eine Papierkarte hochladen (Scan)" },
        {
          type: "p",
          text: "Wenn du bereits eine Karte als Foto oder PDF hast — tippe sie nicht von Hand ab. Nutze den Scan:",
        },
        {
          type: "steps",
          items: [
            "Drücke auf das Banner „Menü hochladen“ (oder „Lade deine Papierkarte hoch“).",
            "Füge bis zu 5 Dateien hinzu (Foto/Scan, je bis 20 MB) und drücke „Scannen“.",
            "Warte bis zu einer Minute — die KI erkennt Kategorien und Gerichte.",
            "Prüfe das Erkannte, markiere die gewünschten Einträge und drücke „Weiter“.",
            "Wähle: das aktuelle Menü ersetzen oder die neuen Einträge zum bestehenden hinzufügen.",
          ],
        },
        {
          type: "note",
          text: "Die Beispiele aus der Startvorlage werden beim Speichern des gescannten Menüs entfernt — das ist normal.",
        },
      ],
    },
    {
      id: "tables",
      title: "3. Tische und QR-Codes",
      blocks: [
        {
          type: "p",
          text: "Tische dienen dazu, Bestellungen und Reservierungen bestimmten Plätzen zuzuordnen und persönliche QR-Codes zu drucken. Bereich: Einstellungen → Tische.",
        },
        { type: "h3", text: "Tische anlegen" },
        {
          type: "steps",
          items: [
            "Öffne Einstellungen → Tische und drücke „Tisch hinzufügen“.",
            "Gib die Tischnummer, die Plätze und (optional) einen Namen an — zum Beispiel „Fenster“, „Bar“, „Terrasse“.",
            "Füge ein Tischfoto hinzu — Gäste sehen es und verstehen genau, wo ihr Tisch ist.",
            "Lege eine Tischfarbe fest — mit dieser Farbe wird der Tisch in der Küche und im Bereich „Bestellungen“ hervorgehoben, damit das Personal ihn schnell findet.",
            "Optional eine kurze Beschreibung hinzufügen.",
            "Speichern.",
          ],
        },
        {
          type: "note",
          text: "Das Tischfoto ist für Gäste (Orientierung „wo ist mein Tisch“). Die Farbe ist für das Personal (eine schnelle visuelle Markierung des Tisches in Küche und Bestellungen).",
        },
        { type: "h3", text: "Tisch-QR-Code" },
        {
          type: "p",
          text: "Jeder Tisch hat seinen eigenen QR-Code. Der Gast scannt ihn mit dem Telefon und landet direkt im Menü dieses Tisches — die Bestellung wird automatisch dem richtigen Tisch zugeordnet.",
        },
        {
          type: "steps",
          items: [
            "Drücke „QR-Code anzeigen“ beim gewünschten Tisch.",
            "Drücke „QR herunterladen“, um das Bild zu speichern.",
            "Drucke ihn und platziere ihn am Tisch (auf einem Aufsteller, in der Karte, als Aufkleber).",
          ],
        },
        {
          type: "tip",
          text: "Der „Tisch-Link“ ist derselbe Link wie im QR, nur als Text. Du kannst ihn dem Gast per Messenger senden.",
        },
      ],
    },
    {
      id: "orders",
      title: "4. Bestellungen",
      blocks: [
        { type: "h3", text: "Wie der Gast bestellt" },
        {
          type: "p",
          text: "Der Gast scannt den QR am Tisch → das Menü öffnet sich → er wählt Gerichte, Optionen und Menge → gibt die Bestellung auf. Die Bestellung erscheint sofort in deinem Dashboard und am Küchen-/Service-Terminal.",
        },
        {
          type: "note",
          text: "Damit Gäste bestellen können, muss in Einstellungen → Bestellungen „Bestellungen annehmen“ aktiviert sein. Ist es deaktiviert, sieht der Gast das Menü, aber es gibt keine Bestell-Schaltfläche.",
        },
        { type: "h3", text: "Bestellungen im Dashboard bearbeiten" },
        {
          type: "p",
          text: "Der Bereich „Bestellungen“ zeigt den Saalplan. Belegte Tische sind hervorgehoben und zeigen die Anzahl aktiver Bestellungen. Tippe auf einen Tisch, um seine Bestellungen zu öffnen.",
        },
        {
          type: "steps",
          items: [
            "Tippe auf einen Tisch → „Bestellung starten“ (oder öffne eine bestehende).",
            "„Position hinzufügen“ → wähle Kategorie → Gericht → Optionen → bei Bedarf Menge und Notizen angeben (zum Beispiel „ohne Zwiebeln“).",
            "Drücke „Hinzufügen“ — die Position kommt in die Bestellung.",
          ],
        },
        { type: "h3", text: "Status der Positionen" },
        {
          type: "p",
          text: "Jede Position hat einen Status: Ausstehend → In Zubereitung → Fertig → Serviert. Tippe auf eine Position, um den Status zu wechseln. Die Status werden in Echtzeit mit der Küche synchronisiert.",
        },
        { type: "h3", text: "Rabatte, Teilen, Tisch wechseln" },
        {
          type: "list",
          items: [
            "Rabatt: „Rabatt hinzufügen“ — Prozentsatz oder fester Betrag, auf die ganze Bestellung oder eine einzelne Position, mit Grund.",
            "Bestellung teilen: „Bestellung teilen“ — wähle die Positionen, die auf eine neue, separate Rechnung gehen.",
            "Tisch wechseln: „Tisch wechseln“ — verschiebe die Bestellung auf einen anderen Tisch.",
            "Position duplizieren: füge schnell eine weitere gleiche hinzu.",
          ],
        },
        { type: "h3", text: "Bestellung abschließen" },
        {
          type: "steps",
          items: [
            "Wenn alle Positionen serviert sind, drücke „Bestellung abschließen“.",
            "Wähle eine Zahlungsmethode (falls Zahlungsmethoden konfiguriert sind).",
            "Die Bestellung wird geschlossen und verlässt die Liste der aktiven.",
          ],
        },
      ],
    },
    {
      id: "kitchen",
      title: "5. Küche (KDS)",
      blocks: [
        {
          type: "p",
          text: "Das Küchendisplay (KDS) ist ein Bildschirm auf einem Tablet für die Köche. Neue Bestellungen erscheinen in Echtzeit, und der Koch markiert Gerichte als fertig.",
        },
        { type: "h3", text: "Was das Display zeigt" },
        {
          type: "list",
          items: [
            "Bestellkarten mit Positionen, Optionen und der Zeit „am Pass“.",
            "Farbliche Statusanzeige: was zubereitet wird, was fertig ist.",
            "Ein Tonsignal bei einer neuen Bestellung.",
          ],
        },
        { type: "h3", text: "So wird es genutzt" },
        {
          type: "steps",
          items: [
            "Tippe auf eine Position, um sie in den nächsten Status zu bringen (In Zubereitung → Fertig).",
            "Aktiviere den Ton mit der Schaltfläche „Ton aktivieren“ — dann kommen neue Bestellungen mit Tonsignal.",
            "Mit dem Zoom passt du die Kartengröße an das Tablet an.",
            "Mit Filtern kannst du nur die benötigten Kategorien anzeigen (zum Beispiel nur die heiße Linie).",
          ],
        },
        {
          type: "note",
          text: "Verliert das Tablet die Internetverbindung, erscheint die Warnung „Keine Verbindung“. Verbinde das WLAN, und die Bestellungen kommen wieder.",
        },
      ],
    },
    {
      id: "reservations",
      title: "6. Reservierungen",
      blocks: [
        {
          type: "p",
          text: "Gäste können über dein Menü einen Tisch reservieren, und du verwaltest die Reservierungen im Bereich „Reservierungen“ (Ansicht „Monat“ / „Tag“).",
        },
        { type: "h3", text: "Reservierungen einrichten" },
        { type: "p", text: "Aktiviere und konfiguriere zuerst die Reservierungen: Einstellungen → Reservierungen." },
        {
          type: "steps",
          items: [
            "Aktiviere „Reservierungen aktivieren“.",
            "Wähle den Bestätigungsmodus: „Automatisch“ (Reservierungen bestätigen sich selbst) oder „Manuell“ (du bestätigst jede einzeln).",
            "Lege die „Reservierungsdauer“ fest — wie lange der Tisch für den Gast gehalten wird.",
            "Fülle den „Wochenplan“ aus: für jeden Tag — offen/geschlossen, Öffnungszeiten und bei Bedarf eine Mittagspause.",
          ],
        },
        {
          type: "note",
          text: "Für Reservierungen werden Tische benötigt. Gibt es keine, fordert dich das System auf, zuerst Tische hinzuzufügen.",
        },
        { type: "h3", text: "Reservierungen bearbeiten" },
        {
          type: "list",
          items: [
            "Neue Reservierungen, die auf eine Entscheidung warten, sind im Block „Warten auf Bestätigung“ gesammelt.",
            "Schaltflächen „Bestätigen“ / „Ablehnen“ — für jede Reservierung.",
            "„Abschließen“ — markiert, dass der Gast gekommen und die Reservierung erledigt ist.",
            "Wechsle zwischen „Monat“ und „Tag“, blättere durch den Zeitraum mit „Zurück“ / „Weiter“.",
          ],
        },
      ],
    },
    {
      id: "devices",
      title: "7. Geräte (Tablets)",
      blocks: [
        {
          type: "p",
          text: "Die Küchen-, Service- und Reservierungs-Terminals sind separate Tablets, die sich per Code mit deinem Konto verbinden. Bereich: Einstellungen → Geräte.",
        },
        {
          type: "note",
          text: "Geräte sind im kostenpflichtigen Tarif oder während einer aktiven Testphase verfügbar.",
        },
        { type: "h3", text: "Tablet verbinden (Pairing)" },
        {
          type: "steps",
          items: [
            "Im Dashboard: Einstellungen → Geräte → „Gerät hinzufügen“.",
            "Gib einen Namen an (zum Beispiel „Küche — heiße Linie“) und einen Typ: Küche, Service oder Reservierungen.",
            "Drücke „Code generieren“ — ein 6-stelliger Code erscheint (2 Minuten gültig).",
            "Öffne am Tablet den Verbindungsbildschirm und gib diesen Code ein.",
            "Das Tablet verbindet sich und arbeitet sofort in der gewählten Rolle.",
          ],
        },
        { type: "tip", text: "Ist der Code abgelaufen — drücke einfach „Neuer Code“ und gib den frischen ein." },
        { type: "h3", text: "Geräte verwalten" },
        {
          type: "list",
          items: [
            "Status: Online / Offline / Warten auf Verbindung / Widerrufen.",
            "„Widerrufen“ — trennt das Tablet (zum Beispiel bei Verlust). Zum erneuten Anmelden ist ein neuer Code nötig.",
            "„Löschen“ — entfernt das Gerät dauerhaft aus der Liste.",
          ],
        },
      ],
    },
    {
      id: "analytics",
      title: "8. Analysen",
      blocks: [
        {
          type: "p",
          text: "Der Bereich „Analysen“ zeigt die wichtigsten Kennzahlen des Lokals: Umsatz, Anzahl der Bestellungen und deren Aufschlüsselung (zum Beispiel nach Zahlungsmethode und Uhrzeit). Nutze ihn, um zu verstehen, was sich wann am besten verkauft.",
        },
      ],
    },
    {
      id: "settings",
      title: "9. Einstellungen",
      blocks: [
        {
          type: "p",
          text: "Der Bereich „Einstellungen“ öffnet sich als Satz von Bereichs-Karten. Oben ist der Umschalter für das aktive Restaurant (wenn du mehr als eines hast). Darunter — jede Karte der Reihe nach.",
        },
        { type: "h3", text: "Website" },
        {
          type: "list",
          items: [
            "URL des öffentlichen Menüs — die eindeutige Adresse deines Menüs (du kannst deinen eigenen kurzen Slug festlegen und den Link kopieren).",
            "Der Name (Titel) des Lokals auf der öffentlichen Website.",
            "Akzentfarbe — die Hauptfarbe von Schaltflächen und Hervorhebungen im Menü.",
            "Hintergrund — ein Bild oder Video auf der Startseite; lade dein eigenes hoch oder generiere einen Hintergrund per KI aus einer Beschreibung.",
            "Menü-Layout — wie Gerichte dem Gast angezeigt werden.",
          ],
        },
        { type: "h3", text: "Kontakte und Adresse" },
        {
          type: "p",
          text: "Telefon, Instagram, WhatsApp und eine Kartenmarkierung — alles wird dem Gast auf der Kontaktseite deines Menüs angezeigt.",
        },
        { type: "h3", text: "Region" },
        { type: "p", text: "Währung (für alle Preise verwendet) und Zeitzone des Lokals." },
        { type: "h3", text: "Tische" },
        { type: "p", text: "Saalplan, Plätze und Tisch-QR-Codes — ausführlich in Abschnitt 3." },
        { type: "h3", text: "Geräte" },
        {
          type: "p",
          text: "Tablets für das Küchendisplay und die Service-Terminals verbinden — ausführlich in Abschnitt 7.",
        },
        { type: "h3", text: "Bestellungen" },
        {
          type: "list",
          items: [
            "„Bestellungen annehmen“ — der Hauptschalter für die Annahme von Bestellungen.",
            "„Bestellmodus“ — Intern und/oder WhatsApp.",
            "„Pflichtfelder“ — welche Daten der Gast angeben muss (Name, Telefon, Adresse).",
            "„Zahlungsmethoden“ — zur Integration des Zahlungsanbieters deines Restaurants wende dich an den Support.",
          ],
        },
        { type: "h3", text: "Reservierungen" },
        {
          type: "p",
          text: "Reservierungen aktivieren, automatische oder manuelle Bestätigung, Dauer und Öffnungszeiten — ausführlich in Abschnitt 6.",
        },
        { type: "h3", text: "Sprachen" },
        {
          type: "steps",
          items: [
            "Öffne Einstellungen → Sprachen.",
            "Wähle die Sprachen, in die das öffentliche Menü übersetzt wird (zum Hinzufügen/Entfernen antippen).",
            "Lege die Standardsprache fest.",
            "Texte werden manuell oder mit der Schaltfläche „Mit KI übersetzen“ übersetzt — das System übersetzt Namen und Beschreibungen der Gerichte in die gewählten Sprachen.",
          ],
        },
        { type: "h3", text: "Zahlung" },
        { type: "p", text: "Abo-Tarif, Status der Testphase und Zahlungsverwaltung." },
        {
          type: "list",
          items: [
            "Monatliche oder jährliche Abrechnung (jährlich ist günstiger).",
            "„Abonnieren“ / „Wechseln“ — Tarif wählen oder ändern.",
            "„Verwalten“ — Zahlungsmethode ändern oder Abo kündigen.",
          ],
        },
        {
          type: "note",
          text: "Die Zahlung erfolgt in EUR. Für Zahlungen in einer anderen Währung wende dich an den Support.",
        },
        { type: "h3", text: "Support" },
        {
          type: "p",
          text: "Ein integrierter Chat mit unserem Team in Echtzeit. Schreibe eine Nachricht — wir antworten direkt hier.",
        },
        { type: "h3", text: "Restaurants wechseln und hinzufügen" },
        {
          type: "p",
          text: "Wenn du mehrere Lokale hast, befindet sich der Restaurant-Umschalter oben im Bereich „Einstellungen“.",
        },
        {
          type: "steps",
          items: [
            "Öffne den Restaurant-Umschalter oben in den „Einstellungen“.",
            "„Restaurant hinzufügen“ → gib einen Namen ein.",
            "Wähle „Aktuelles Menü und Einstellungen duplizieren“ (Schnellstart) oder „Von Grund auf beginnen“ (ein leeres Restaurant).",
            "Erstelle es — und wechsle jederzeit genau hier zwischen den Restaurants.",
          ],
        },
      ],
    },
    {
      id: "public-menu",
      title: "10. Das öffentliche Menü für Gäste",
      blocks: [
        {
          type: "p",
          text: "Das öffentliche Menü ist das, was der Gast nach dem Scannen des QR sieht. Es wird automatisch aus deinem Menü, dem Branding und den Kontakten zusammengestellt.",
        },
        {
          type: "list",
          items: [
            "Die Menü-Adresse wird in Einstellungen → Region („Menü-Link“) festgelegt.",
            "Den allgemeinen QR-Code und den Menü-Link erhältst du über die Schaltfläche „Teilen“ auf der Seite „Menü“.",
            "Jeder Tisch hat seinen eigenen separaten QR (Einstellungen → Tische), der zum Menü genau dieses Tisches führt.",
            "Das Aussehen (Hintergrund, Akzentfarbe, Layout) wird im Bereich „Website“ konfiguriert.",
            "Die Schaltfläche „Vorschau“ öffnet das Menü so, wie es der Gast sieht.",
          ],
        },
        {
          type: "tip",
          text: "Drücke nach jeder Änderung an Menü/Einstellungen auf „Vorschau“, um zu prüfen, wie es für den Gast aussieht.",
        },
      ],
    },
    {
      id: "faq",
      title: "11. Häufige Fragen und Details",
      blocks: [
        { type: "h3", text: "Der Gast kann keine Bestellung aufgeben" },
        {
          type: "p",
          text: "Prüfe Einstellungen → Bestellungen → „Bestellungen annehmen“ (muss aktiv sein) und dass mindestens ein Bestellmodus ausgewählt ist.",
        },
        { type: "h3", text: "Es kommen keine Reservierungen an" },
        {
          type: "p",
          text: "Stelle sicher, dass Reservierungen in Einstellungen → Reservierungen aktiviert sind, Tische hinzugefügt wurden und der Tag im Plan nicht als „Geschlossen“ markiert ist.",
        },
        { type: "h3", text: "Das Tablet verbindet sich nicht" },
        {
          type: "p",
          text: "Der Code ist 2 Minuten gültig. Ist er abgelaufen — generiere einen neuen in Einstellungen → Geräte. Wurde das Gerät widerrufen — erstelle einen neuen Code.",
        },
        { type: "h3", text: "Ein Gericht ist ausverkauft" },
        {
          type: "p",
          text: "Lösche es nicht — drücke „Gericht ausblenden“. Es verschwindet aus dem öffentlichen Menü, und du holst es mit „Gericht anzeigen“ zurück.",
        },
        { type: "h3", text: "Du brauchst Geräte/Terminals, hast aber keine" },
        {
          type: "p",
          text: "Der Bereich „Geräte“ ist im kostenpflichtigen Tarif oder während einer aktiven Testphase verfügbar. Prüfe Einstellungen → Zahlung.",
        },
        { type: "h3", text: "Noch Fragen" },
        {
          type: "p",
          text: "Schreib uns in Einstellungen → Support — das ist ein integrierter Chat mit unserem Team.",
        },
      ],
    },
  ],
};
