// Hand-translated. Source-of-truth: app/en/changelog/texts.ts.
import type { ChangelogTexts } from "@/app/_landing/changelog/types";

export const CHANGELOG_TEXTS: ChangelogTexts = {
  meta: {
    title: "Änderungsprotokoll — Updates und neue Funktionen von IQ Rest",
    description:
      "Jedes Release von IQ Rest an einem Ort. Neue Funktionen, KI-Verbesserungen und Produkt-Launches für QR-Speisekarten, Online-Bestellungen und Reservierungen.",
  },
  pageTitle: "Änderungsprotokoll",
  pageSubtitle:
    "Jedes Update, das wir veröffentlichen, um deine QR-Speisekarte, Online-Bestellungen und Reservierungen reibungsloser zu machen. Neueste zuerst.",
  readMore: "Mehr lesen",
  backToList: "Zurück zum Änderungsprotokoll",
  publishedOn: "Veröffentlicht am",

  entries: {
    "ai-dish-photos-restaurant-menu": {
      meta: {
        title: "KI-Gerichtsfotos für QR-Speisekarte | IQ Rest",
        description:
          "Erzeuge stilistisch konsistente Gerichtsfotos für deine gesamte QR-Speisekarte mit einem Klick. Keine Stockfotos, kein Fotograf, keine Bearbeitung.",
      },
      title: "KI-generierte Gerichtsfotos für deine gesamte QR-Speisekarte",
      subtitle:
        "Hör auf, Stockgalerien zu durchsuchen und Fotoshootings zu planen. IQ Rest erzeugt jetzt einen kompletten Satz appetitlicher Gerichtsfotos in einem einheitlichen Stil — direkt aus deinen Gerichtsnamen.",
      intro:
        "Jedes Gericht auf deiner Karte zu fotografieren ist teuer, langsam und selten konsistent. Stockfoto-Bibliotheken lassen Lücken und der Stil passt nie ganz zu deiner Marke. IQ Rest schließt diese Lücke mit eingebauter KI-Gerichtsfotografie: Gerichtsname eingeben, hochwertiges Foto erhalten, das zum Rest deiner Karte passt. Jedes Bild wird speziell für dich generiert, in der richtigen Größe für die QR-Speisekarte und für den Druck.",
      sections: [
        {
          title: "Ein Fotostil über die gesamte Karte",
          body: "Wenn Gäste durch eine Karte scrollen, brechen unterschiedliche Stile das Erlebnis — eines hell, eines düster, eines von oben, eines von der Seite. IQ Rest generiert jedes Foto in einem einheitlichen, markenkonsistenten Stil: gleiche Lichtrichtung, gleiche Tellersprache, gleiche Hintergrundstimmung. Das Ergebnis fühlt sich wie ein echtes Fotoshooting an, nur dass jedes Gericht in dem Moment gerendert wurde, als du es zur Karte hinzugefügt hast. Wenn du neue Gerichte hinzufügst, bleibt der Stil automatisch erhalten.",
        },
        {
          title: "Vom Gerichtsnamen zum Teller in Sekunden",
          body: "Es gibt nichts zu briefen. Du fügst ein Gericht hinzu — sagen wir, „Trüffel-Tagliatelle mit Wildpilzen“ — und IQ Rest erzeugt das Foto im Hintergrund. Das Bild wird zu deiner Karte hochgeladen, als WebP optimiert und ist bereit zur Anzeige, bevor du das nächste Gericht hinzugefügt hast. Wenn ein Foto nicht ganz passt, generierst du es mit einem Tipp neu. Jedes Restaurant erhält kostenlose KI-Generierungen zum Start, mit erschwinglichen Aufladungen, wenn du Fotos für eine ganze 80-Gerichte-Karte willst.",
        },
        {
          title: "Optimiert für Mobil und SEO",
          body: "Jedes generierte Bild wird als komprimiertes WebP mit 80% Qualität kodiert und von einem Hetzner-CDN in Nürnberg mit intelligentem Subsampling ausgeliefert. Seiten bleiben schnell auf 4G, ohne Skelette, ohne Layout-Sprünge. Die Fotos sind auch von Google Bilder indexierbar — Gäste, die deine Gerichtsnamen per Bild suchen, finden direkt deine Karte.",
        },
      ],
      benefitsTitle: "Warum KI-Gerichtsfotos wichtig sind",
      benefits: [
        "Keine Stockfoto-Abos, keine Fotografenhonorare",
        "Markenkonsistenter Stil bei jedem Gericht der Karte",
        "Neue Gerichte erhalten automatisch ein passendes Foto",
        "Komprimiertes WebP — schnell auf Mobil, keine Layout-Sprünge",
        "Kostenlose Generierungen in jedem Plan enthalten",
        "Jedes Foto mit einem Tipp neu generieren, bis es perfekt ist",
      ],
      conclusionTitle: "Ein Foto für jedes Gericht, ohne die Produktion",
      conclusionBody:
        "Restaurants mit Fotos verkaufen mehr margenstarke Gerichte — das ist keine Vermutung, das ist bekannte Umsatzmechanik. Der Grund, warum die meisten Karten keine Fotos haben, sind die Produktionskosten. IQ Rest entfernt diese Kosten vollständig. Jedes Gericht, das du hinzufügst, bekommt ein schönes, markengerechtes Foto, bevor du das Setup beendest. Kombiniere es mit QR-Bestellung und sieh zu, wie Upsell-Raten steigen, ohne eine Kamera in die Hand zu nehmen.",
      ctaText: "Erzeuge KI-Fotos für jedes Gericht deiner Karte — kostenlos während deiner Testphase.",
      ctaButton: "Kostenlos testen",
    },

    "ai-restaurant-cover-background": {
      meta: {
        title: "KI-Generator für Restaurant-Cover-Hintergrund | IQ Rest",
        description:
          "Erzeuge automatisch ein schönes Restaurant-Coverbild für deine QR-Speisekarte in Sekunden. Passt zu deiner Küche, Stimmung und Marke — keine Stockfotos.",
      },
      title: "KI-generierter Restaurant-Cover-Hintergrund",
      subtitle:
        "Deine QR-Speisekarte vermittelt die richtige Stimmung, noch bevor Gäste scrollen. IQ Rest erzeugt jetzt ein eigenes Coverbild, das zu deiner Küche und Atmosphäre passt — automatisch.",
      intro:
        "Erste Eindrücke zählen, besonders wenn Gäste am Tisch einen QR-Code scannen. Ein generisches Coverbild untergräbt alles, was du in dein Interieur investiert hast. IQ Rest generiert jetzt ein einzigartiges, atmosphärisches Coverbild für jedes Restaurant — basierend auf der Küche, die du bei der Anmeldung wählst. Italienische Trattoria, japanisches Izakaya, spanische Tapas-Bar — jedes bekommt ein Cover, das passt.",
      sections: [
        {
          title: "Auf deine Küche und Stimmung zugeschnitten",
          body: "Wenn du den Anmeldeassistenten abschließt, nimmt IQ Rest die gewählte Küche und erzeugt ein passendes Cover. Italienisch bekommt warmes Trattoria-Licht und weich fokussierte Pasta. Japanisch bekommt klare Linien und ausgewogene Komposition. Mexikanisch bekommt lebendige Farben und Streetfood-Energie. Die Anpassung ist automatisch, aber du kannst das Cover jederzeit neu generieren — auch mit eigenen kreativen Vorgaben, wenn du etwas Bestimmtes willst.",
        },
        {
          title: "Optimiert für QR-Speisekarten-Hero-Bereiche",
          body: "Coverbilder werden im exakten Seitenverhältnis erzeugt, das der QR-Speisekarten-Hero verwendet — scharf auf jedem Smartphone, kein unschönes Beschneiden. Sie werden als WebP kodiert, schnell ausgeliefert und lazy-loaded, sodass der Rest der Karte zuerst gerendert wird. Das Cover gibt den Ton an und verschwindet dann, sobald die Gäste anfangen, Gerichte zu durchstöbern.",
        },
        {
          title: "Markenkonsistenz von Haus aus",
          body: "Der Coverbild-Stil wird automatisch mit den KI-Gerichtsfotos für deine Karte gepaart — gleiche Lichtsprache, gleiche Farbpalette, gleiche Stimmung. Gäste nehmen dein Restaurant als geschlossen und professionell gestaltet wahr, auch wenn du das Ganze in fünf Minuten vom Handy aus eingerichtet hast.",
        },
      ],
      benefitsTitle: "Warum ein KI-Cover Stockfotos schlägt",
      benefits: [
        "Einzigartig für dein Restaurant — kein Stockfoto, das alle anderen auch nutzen",
        "Passt zur Küche, die du bei der Anmeldung gewählt hast",
        "Gleiche visuelle Sprache wie deine KI-generierten Gerichtsfotos",
        "Korrekt dimensioniert für den QR-Speisekarten-Hero — kein manuelles Zuschneiden",
        "Komprimiertes WebP für schnelles mobiles Laden",
        "Jederzeit mit einem Tipp neu generieren",
      ],
      conclusionTitle: "Ein Cover, das sagt: „Wir wissen, was wir tun“",
      conclusionBody:
        "Wenn ein Gast deinen QR-Code scannt, ist das Erste, was er sieht, dein Cover. Ein poliertes, atmosphärisches Bild signalisiert Qualität, bevor er einen einzigen Gerichtsnamen liest. Mit IQ Rest ist diese Politur automatisch — kostenlos bei der Anmeldung erzeugt und jederzeit neu generierbar. Keine Stockgalerien, keine Designarbeit, einfach ein passendes Cover.",
      ctaText: "Hol dir in unter einer Minute ein eigenes KI-Cover für deine QR-Speisekarte.",
      ctaButton: "Kostenlose Testphase starten",
    },

    "three-step-signup-wizard-restaurant-menu": {
      meta: {
        title: "3-Schritt-Anmeldeassistent für QR-Speisekarte | IQ Rest",
        description:
          "Wähle Küche, Restaurantname, E-Mail — und IQ Rest baut deine QR-Speisekarte. Die schnellste Anmeldung der Branche.",
      },
      title: "3-Schritt-Anmeldeassistent: Von der E-Mail zur funktionierenden QR-Speisekarte in unter einer Minute",
      subtitle:
        "Wähle deine Küche. Tippe den Restaurantnamen. Bestätige deine E-Mail. Fertig — deine QR-Speisekarte ist bereit, mit Beispielgerichten und KI-generierten Fotos.",
      intro:
        "Restaurantbesitzer haben keine Zeit für ein Anmeldeformular mit 10 Bildschirmen. Also haben wir es auf drei reduziert. Wähle die Küche, die zu deinem Lokal passt. Tippe den Restaurantnamen. Bestätige deine E-Mail. Bis du dich zum ersten Mal anmeldest, ist deine QR-Speisekarte bereits mit küchengerechten Beispielgerichten und passender KI-Fotografie gefüllt. Du kannst innerhalb von 60 Sekunden nach Beginn der Anmeldung einen Gast bedienen.",
      sections: [
        {
          title: "Schritt 1 — Küchenauswahl",
          body: "Wähle aus einer breiten Liste von Küchen: italienisch, spanisch, japanisch, mexikanisch, französisch, mediterran, indisch, amerikanisch, Café, Bar, Pizzeria und mehr. Die Wahl steuert jeden Standardwert im Assistenten: Beispielgerichte, KI-Cover-Stil, Standardwährung und Anfangs-Kategorienstruktur. Du konfigurierst nichts — du wählst einen Startpunkt.",
        },
        {
          title: "Schritt 2 — Restaurantname",
          body: "Tippe den Namen, wie ihn die Gäste sehen werden. Wir nutzen ihn überall: QR-Speisekarten-Hero, Seitentitel, SEO-Slug, Social-Share-Vorschau. Es gibt keine separate Markenname-vs-Anzeigename-Entscheidung — ein Feld, eine Quelle der Wahrheit. Überspringbar, wenn du die Entscheidung verschieben willst; wir füllen einen Platzhalter ein, den du später umbenennen kannst.",
        },
        {
          title: "Schritt 3 — E-Mail oder Google-Anmeldung",
          body: "Bestätige mit E-Mail + Einmalcode oder tippe „Mit Google anmelden“ für sofortige Kontoerstellung. Kein Passwort zu merken. Sobald du bestätigst, läuft der Karten-Seeder im Hintergrund — Kategorien erstellt, Beispielgerichte eingefügt, KI-Fotos generiert, Restaurant-Cover bereit. Du landest direkt im Dashboard mit einer funktionierenden Karte.",
        },
      ],
      benefitsTitle: "Warum eine 3-Schritt-Anmeldung ein Formular schlägt",
      benefits: [
        "Unter 60 Sekunden von der Landingpage bis zur funktionierenden QR-Speisekarte",
        "Null Entscheidungen, die du nicht später ändern kannst — nur Standardwerte als Start",
        "Beispielgerichte vorgefüllt nach Küche — sofortiger Inhalt zum Bearbeiten",
        "KI-Fotos und Coverbild fertig, sobald du dich anmeldest",
        "Google-Anmelde-Option — kein Passwort zu verwalten",
        "Anonymer Fortschritt gespeichert, falls du mitten im Assistenten abspringst",
      ],
      conclusionTitle: "Die schnellste QR-Speisekarten-Einrichtung, Punkt",
      conclusionBody:
        "Die meisten QR-Speisekarten-Dienste lassen dich Dutzende Felder ausfüllen, bevor du etwas Nützliches siehst. IQ Rest dreht das um — wir geben dir zuerst eine funktionierende Karte und lassen dich dann anpassen. Der Assistent entfernt jede Barriere zwischen Neugier und einem brauchbaren Produkt. Restaurants, die die Anmeldung in unter 60 Sekunden abschließen, sind dramatisch wahrscheinlicher tatsächlich ihre Karte zu veröffentlichen, ihre erste Bestellung anzunehmen und im Abo zu bleiben.",
      ctaText: "Starte jetzt den 3-Schritt-Assistenten — deine Karte wird in 60 Sekunden live sein.",
      ctaButton: "Kostenlose Testphase starten",
    },

    "ai-built-sample-menu-on-signup": {
      meta: {
        title: "KI-generierte Beispielkarte bei der Anmeldung | IQ Rest",
        description:
          "Überspringe den Leerzustand. IQ Rest generiert automatisch eine Starter-QR-Speisekarte basierend auf deiner Küche — Kategorien, Gerichte, Preise und Fotos.",
      },
      title: "Per KI gebaute Beispielkarte direkt nach der Anmeldung",
      subtitle:
        "Kein Starren mehr auf ein leeres Dashboard. IQ Rest sät dein Konto mit küchengerechten Kategorien, Gerichten und KI-Fotos, damit du bearbeiten kannst statt von Null zu starten.",
      intro:
        "Der schwierigste Teil jedes neuen Tools ist der Leerzustand. Neue Restaurantbesitzer setzen sich, sehen eine leere Karte und schließen den Tab. IQ Rest behebt das, indem deine Karte im Moment der Anmeldung gefüllt wird. Italienisch wählen — Antipasti, Pasta, Pizza, Dessert. Japanisch wählen — Sushi, Ramen, Donburi, Sake. Jede Kategorie hat 6 bis 10 Startgerichte mit KI-generierten Fotos in einem einheitlichen Stil. Deine Aufgabe wird Bearbeiten von Preisen und Anpassen von Namen, nicht Bauen von Null.",
      sections: [
        {
          title: "Küchenbewusste Kategorien und Gerichte",
          body: "Der Seeder kippt nicht einfach zufällige Gerichte rein. Er nutzt die Küche, die du im Anmeldeassistenten gewählt hast, um einen kuratierten Satz Kategorien zu ziehen, die für deinen Restauranttyp Sinn ergeben. Eine Pizzeria bekommt „Pizza Classica“, „Pizza Speciale“, „Antipasti“, „Bevande“. Ein französisches Bistro bekommt „Entrées“, „Plats principaux“, „Fromages“, „Desserts“. Der Startinhalt entspricht der Konvention, die Gäste für diese Küche erwarten.",
        },
        {
          title: "Fotos und Preise von Haus aus",
          body: "Jedes Startgericht kommt mit einem KI-generierten Foto in einheitlichem Stil und einem sinnvollen Standardpreis in deiner Lokalwährung (per Geolocation auto-erkannt). Preise sind Platzhalter — du wirst sie ändern — aber sie lassen die Karte sofort echt aussehen, sodass du die QR-Speisekarte vorschauen und das Endresultat fühlen kannst. Das ist entscheidend, um sie Partnern zu zeigen, Feedback zu bekommen oder zu entscheiden „ja, das ist das Tool, das wir wollen“.",
        },
        {
          title: "Bearbeiten, nicht von Null beginnen",
          body: "Einmal gesät, trägt jedes Gericht ein isExample-Flag. Sobald du ein Gericht bearbeitest — Name, Preis oder Beschreibung änderst — fällt das Flag ab. Die übrigen Beispielgerichte heben sich visuell ab, sodass du weißt, was noch Platzhalter ist. Diese Trennung macht offensichtlich, was erledigt ist und was noch zu tun ist, und verwandelt das Leerzustands-Problem in einen produktiven Bearbeitungsfluss.",
        },
      ],
      benefitsTitle: "Warum eine vorgefüllte Karte gewinnt",
      benefits: [
        "Null Leerzustand — Dashboard öffnen und eine funktionierende Karte sehen",
        "Kategorien und Gerichte passen zur gewählten Küche",
        "KI-Fotos für jedes Startgericht in einheitlichem Stil",
        "Lokalwährung auto-erkannt, Standardpreise gesetzt",
        "Beispiel-Flag verblasst beim Bearbeiten — klares Fortschrittssignal",
        "Stakeholdern eine echt aussehende Karte innerhalb von Minuten zeigen",
      ],
      conclusionTitle: "Überspringe die leere Seite",
      conclusionBody:
        "Eine Karte von Null zu bauen ist einschüchternd. Eine zu bearbeiten ist einfach. IQ Rest gibt dir eine komplette Starter-Karte im Moment der Anmeldung und lässt dich dann an dein echtes Angebot anpassen. Ergebnis: mehr Restaurants schließen das Setup ab, mehr Karten gehen tatsächlich live, mehr Gäste scannen QR-Codes, die zu echten, bearbeiteten, produktiven Karten führen.",
      ctaText: "Melde dich an und bekomme eine vollständig gebaute Starter-Karte in deiner Küche.",
      ctaButton: "Meine Karte bauen",
    },

    "interactive-menu-tour-first-visit": {
      meta: {
        title: "Interaktive Karten-Tour beim ersten Besuch | IQ Rest",
        description:
          "Eine 7-Schritt-interaktive Anleitung führt neue Restaurantbesitzer durch das QR-Speisekarten-Dashboard — keine Doku, keine Videos, nur Hands-on.",
      },
      title: "7-Schritt-interaktive Karten-Tour beim ersten Besuch",
      subtitle:
        "Wir zwingen dich nicht, Doku zu lesen. Beim ersten Öffnen der Karte führt IQ Rest dich durch — Kategorie hinzufügen, Gericht hinzufügen, bearbeiten, sortieren, vorschauen, teilen, alles in sieben Tipps.",
      intro:
        "Die meisten SaaS-Produkte vergraben Onboarding in einem Hilfecenter, das niemand liest. IQ Rest macht das Gegenteil: Beim ersten Öffnen der Kartenseite hebt eine interaktive Tour jede Schlüsselaktion in Reihenfolge hervor. Kategorie hinzufügen. Erstes Gericht hinzufügen. Bearbeiten. Sichtbarkeit umschalten. Neu sortieren. Live-Karte vorschauen. Mit einem Gast teilen. Bei Schritt sieben hast du jede Funktion verwendet, die du 95% der Zeit brauchen wirst.",
      sections: [
        {
          title: "Im Produkt, nicht in einer Wissensdatenbank",
          body: "Jeder Tour-Schritt hebt das tatsächliche UI-Element auf deinem Bildschirm hervor. Eine Sprechblase erklärt, was es tut und warum es wichtig ist. Es gibt keine Screenshots — der Screenshot IST dein Dashboard. Während du dich durchtippst, lernst du durch Tun, nicht durch Lesen. Jederzeit überspringen; die Tour bleibt sitzungsübergreifend aktiv, bis du sie abschließt oder dauerhaft schließt.",
        },
        {
          title: "Auf den echten Workflow ausgelegt",
          body: "Die sieben Schritte sind kein Feature-Dump — sie bilden den Workflow ab, den ein neues Restaurant tatsächlich durchführt. Erst Kategorien (Getränke, Hauptgerichte, Desserts), dann Gerichte, dann jedes Gericht verfeinern, dann die Reihenfolge organisieren, dann vorschauen, um sicher zu gehen, dass es richtig aussieht, dann per QR teilen. Am Ende hast du den Kreis von der leeren Karte bis zum gedruckten QR-Code auf einer Tischkarte geschlossen.",
        },
        {
          title: "Lokalisiert in 35 Sprachen",
          body: "Der Tour-Text ist in jede von IQ Rest unterstützte Sprache übersetzt — wie der Rest des Dashboards. Spanischsprachige Besitzer bekommen spanische Sprechblasen, deutsche bekommen deutsche, katalanische bekommen katalanische. Nichts in der Tour setzt Englischkenntnisse voraus.",
        },
      ],
      benefitsTitle: "Warum eine In-Product-Tour ein Hilfecenter schlägt",
      benefits: [
        "Lerne durch Tun, nicht durch Lesen von Doku",
        "7 Schritte decken ~95% des Workflows ab",
        "Jederzeit verwerfen — blockiert nie das Dashboard",
        "Bleibt sitzungsübergreifend, bis abgeschlossen oder übersprungen",
        "Lokalisiert in 35 Sprachen — kein Englisch nötig",
        "Keine Videos zum Laden — sofortige, native UI-Überlagerung",
      ],
      conclusionTitle: "Von verwirrt zu sicher in sieben Schritten",
      conclusionBody:
        "Der schwerste Moment in jedem Produkt sind die ersten 30 Sekunden. Der Nutzer öffnet das Dashboard, schaut sich um und bekommt es entweder hin oder springt ab. Die interaktive Tour von IQ Rest entfernt dieses Risiko — innerhalb einer Minute weiß jeder neue Nutzer, wo Gerichte hinzugefügt, vorgeschaut und geteilt werden. Tour-Abschluss korreliert stark mit erfolgreicher Kartenveröffentlichung. Wir lehren nicht nur das Produkt — wir bringen die Karte live.",
      ctaText: "Melde dich an und lass dich in sieben Tipps durch deine erste QR-Speisekarte führen.",
      ctaButton: "Kostenlose Testphase starten",
    },

    "custom-landing-page-per-country": {
      meta: {
        title: "Länderspezifische Landingpages für QR-Speisekarte | IQ Rest",
        description:
          "Besucher aus Deutschland sehen eine Landingpage, die für deutsche Restaurants gemacht ist. Frankreich sieht französisch. 35 Länder, 35 conversion-optimierte Seiten.",
      },
      title: "Maßgeschneiderte Landingpage in jeder Sprache",
      subtitle:
        "Besucher bekommen keine automatisch übersetzte Seite mehr. Jede der 35 unterstützten Sprachen hat ihre eigene Landingpage, geschrieben für diesen Markt.",
      intro:
        "Automatisch übersetzte Landingpages konvertieren schlecht. Die Grammatik holpert, kulturelle Bezüge sind falsch und lokale Zahlungskonditionen wirken importiert. IQ Rest liefert jetzt eine eigene Landingpage für jede der 35 unterstützten Sprachen — geschrieben für den Markt, nicht nur übersetzt. Deutsche Besucher bekommen eine Seite über Restaurants und Imbisse. Französische Besucher bekommen Cafés und Bistros. Spanische Besucher bekommen restaurantes y cafeterías. Jede Seite führt mit dem Wertversprechen, das für diese Zielgruppe am wichtigsten ist.",
      sections: [
        {
          title: "Eine Seite pro Sprache, keine Auto-Übersetzung",
          body: "Jede Landing lebt unter /<locale> als eigenständige Next.js-Route. Die Texte sind in TypeScript-Objekten — versioniert, typgeprüft, unabhängig deploybar. Wir können eine spanische Hero-Variante A/B-testen, ohne die deutsche zu berühren. Wir können einen Preis-Hinweis für brasilianische Real lokalisieren, ohne Euro-Märkte zu beeinflussen. Ergebnis: schnellere Iteration auf den Landings, die tatsächlich konvertieren.",
        },
        {
          title: "Geolocation routet Besucher automatisch",
          body: "Beim ersten Besuch von iq-rest.com liest unser nginx-Geo-Modul den Ländercode und leitet zur richtigen /<locale> um. Spanische IPs landen auf /es. Deutsche IPs landen auf /de. Brasilien landet auf /pt. Wir routen sogar katalanisch sprechende Teile Spaniens auf /ca statt /es. Besucher sehen nie ein „Sprache wählen“-Modal — sie sehen ihre Sprache standardmäßig.",
        },
        {
          title: "Markenweite hreflang- und Canonical-Tags",
          body: "Alle 35 Landings referenzieren sich gegenseitig per hreflang-Tags, sodass Google die richtige für jede Anfrage indexiert. Canonical-URLs zeigen auf die pro-Sprache-URL, nicht auf einen generischen Root. Das Setup folgt Googles Richtlinien für internationale SEO genau, sodass jede Landing in ihrer Sprache antritt, ohne die anderen zu kannibalisieren.",
        },
      ],
      benefitsTitle: "Warum länderspezifische Landings besser konvertieren",
      benefits: [
        "Native Formulierung in jedem Markt — nicht auto-übersetzt",
        "Geo-Routing liefert die richtige Seite automatisch",
        "hreflang und Canonical folgen Google-Richtlinien",
        "Katalanische Besucher in Katalonien sehen Katalanisch, nicht Kastilisch",
        "Währung, Preise und CTAs pro Markt lokalisiert",
        "Unabhängiges A/B-Testing pro Sprache ohne Cross-Kontamination",
      ],
      conclusionTitle: "35 Sprachen, 35 Eingangstüren",
      conclusionBody:
        "Wenn ein deutscher Restaurantbesitzer auf einer halb übersetzten englischen Seite mit US-Preisen landet, springt er ab. Wenn er auf einer Seite landet, die ihn auf Deutsch anspricht, mit Euro-Preisen und deutschen Bezügen, konvertiert er. IQ Rest macht jetzt das Zweite in jedem bedienten Markt — 35 Landings, 35 conversion-optimierte Eingangstüren, alle automatisch geo-geroutet.",
      ctaText: "Probiere IQ Rest in deiner Sprache — Landing zugeschnitten auf deinen Markt.",
      ctaButton: "Meine Sprache öffnen",
    },

    "sign-in-with-google-restaurant-dashboard": {
      meta: {
        title: "Mit Google anmelden für QR-Speisekarten-Dashboard | IQ Rest",
        description:
          "Überspringe Passwörter und E-Mail-Codes. Tippe „Mit Google anmelden“ und greife in unter einer Sekunde auf dein QR-Speisekarten-Dashboard zu.",
      },
      title: "Mit Google anmelden — Ein-Tipp-Zugriff auf deine QR-Speisekarte",
      subtitle:
        "Überspringe OTP-E-Mails und vergessene Passwörter. Tippe „Mit Google fortfahren“ und du bist in unter einer Sekunde im Dashboard.",
      intro:
        "E-Mail + Einmalcode-Authentifizierung ist sicher, aber langsam. E-Mail tippen, Code abwarten, in den Posteingang wechseln, Code kopieren, einfügen, absenden. Das ist bestenfalls ein 30-Sekunden-Flow. IQ Rest bietet jetzt „Mit Google anmelden“ als Alternative: einen Knopf tippen, dein Google-Konto wählen, du bist drin. Kein Passwort zu vergessen, kein Posteingangs-Umweg, keine Reibung.",
      sections: [
        {
          title: "Natives Google OAuth, kein Redirect-Loop",
          body: "Wir nutzen Googles offizielles Identity-Services-SDK mit der One-Tap-UI in unterstützten Browsern. Der Flow läuft in einem nativen Popup, nicht in einer Weiterleitung zu Googles Domain und zurück. Das Ganze dauert etwa eine Sekunde nach dem ersten Tipp. Wir verifizieren das Google-ID-Token serverseitig gegen Googles öffentliche Schlüssel, sodass der Flow Ende-zu-Ende kryptografisch sicher ist.",
        },
        {
          title: "Gleiches Konto, jede Methode",
          body: "Wenn du dich mit E-Mail-OTP angemeldet hast und später Google wählst, verknüpfen wir die Konten per E-Mail. Du kannst zwischen den Methoden bei jedem Anmelden wechseln. Es gibt kein „separates Google-Konto“ zu verwalten und du verlierst deine Karte nicht durch andere Anmeldung. Wir leiten auch deine Dashboard-Sprache während der Google-Anmeldung weiter, sodass E-Mails an dein Konto vom ersten Tag an in der richtigen Sprache kommen.",
        },
        {
          title: "Mobile-first — funktioniert in iOS Safari und Android Chrome",
          body: "Googles offizielles SDK war historisch fragil auf Mobil. Wir haben es umkonstruiert, indem wir einen echten Google-Button über unsere UI legen, statt programmatische Klicks auszulösen (die iOS Safari nun blockiert). Ergebnis: Der Button funktioniert in jedem modernen Mobil-Browser, ohne Installation, ohne App Store.",
        },
      ],
      benefitsTitle: "Warum Google-Anmeldung E-Mail-OTP schlägt",
      benefits: [
        "Ein Tipp zum Anmelden — kein E-Mail-Umweg",
        "Kein Passwort zu merken oder zurückzusetzen",
        "Gleiches Konto, ob du E-Mail oder Google nutzt",
        "Kryptografisch serverseitig per Google-ID-Token verifiziert",
        "Funktioniert zuverlässig in iOS Safari und Android Chrome",
        "Sprache weitergeleitet, sodass E-Mails in deiner Sprache bleiben",
      ],
      conclusionTitle: "Der schnellste Weg zurück in dein Dashboard",
      conclusionBody:
        "Restaurantbesitzer prüfen ihre Karten dutzende Male pro Woche — zwischen Services, nach einem Druckauftrag, beim Anpassen von Preisen. Jede beim Anmelden gesparte Sekunde summiert sich. Google-Anmeldung verwandelt einen 30-Sekunden-OTP-Flow in einen Ein-Sekunden-Tipp. E-Mail-OTP bleibt für Besitzer verfügbar, die es bevorzugen, aber die meisten Nutzer wählen Google, nachdem sie es einmal probiert haben.",
      ctaText: "Überspringe das Passwort — melde dich mit Google in einem Tipp an.",
      ctaButton: "Dashboard öffnen",
    },

    "multilingual-email-notifications-35-languages": {
      meta: {
        title: "Mehrsprachige E-Mail-Benachrichtigungen in 35 Sprachen | IQ Rest",
        description:
          "Testphase-Erinnerungen, Support-Antworten, Abo-E-Mails — jede Benachrichtigung von IQ Rest kommt in deiner Dashboard-Sprache.",
      },
      title: "Mehrsprachige E-Mail-Benachrichtigungen in allen 35 Sprachen",
      subtitle:
        "Jede E-Mail von IQ Rest — Support-Antworten, Testphase-Erinnerungen, Abo-Quittungen — kommt in der Sprache, die du in deinem Dashboard eingestellt hast. Inklusive Rechts-nach-links-Layouts.",
      intro:
        "Eine E-Mail in der falschen Sprache ist im besten Fall Reibung, im schlimmsten ein Löschen. IQ Rest sendet jetzt jede Transaktions-E-Mail in der Sprache, die du in deinem Dashboard eingestellt hast, in allen 35 unterstützten Sprachen. Willkommens-E-Mails, Testphasen-Ablauf-Erinnerungen, Abo-Bestätigungen, Support-Antworten — alle kommen in deiner Sprache, mit korrekter Grammatik und kulturell angemessener Formulierung. Rechts-nach-links-Sprachen wie Arabisch und Persisch bekommen korrekt gespiegelte Layouts.",
      sections: [
        {
          title: "preferredLocale wandert mit deinem Konto",
          body: "Jeder Nutzer hat ein preferredLocale-Feld, das beim ersten Anmelden gesetzt wird. Egal ob du dich per E-Mail-OTP, Google oder Assistent angemeldet hast, deine Sprache wird erfasst und gespeichert. Jeder Backend-Job, der eine E-Mail aussendet — Stripe-Webhooks, Support-Antwort-Benachrichtigungen, geplante Cron-Tasks — zieht die preferredLocale des Nutzers und nutzt sie für die richtige Vorlage. Sprache im Dashboard wechseln, und die nächste E-Mail spiegelt die Änderung.",
        },
        {
          title: "RTL-Vorlagen für Arabisch und Persisch",
          body: "Rechts-nach-links-Layouts sind nicht nur Übersetzung — die gesamte visuelle Hierarchie kippt. Wir liefern dedizierte RTL-Vorlagen für Arabisch und Persisch: Navigation fließt von rechts nach links, Zahlen in arabisch-indischer Schreibung wo passend, Markenlogo korrekt positioniert. Ergebnis: eine E-Mail, die sich für RTL-Leser nativ anfühlt, nicht eine übersetzte LTR-Vorlage mit kaputter Ausrichtung.",
        },
        {
          title: "Übersetzt von Branchenexperten",
          body: "Generische Übersetzungsdienste produzieren wörtliche, aber gestelzte Übersetzungen. Wir haben jede Vorlage mit Küchen- und Gastgewerbe-Terminologie übersetzt, die für Restaurantbetreiber in jedem Markt natürlich klingt. „Trial“ wird auf Deutsch zu „Testphase“ (nicht „Prozess“). „Reservation“ wird zu „Reservierung“. Die Detailtiefe addiert sich — Restaurants merken, wenn ein Tool ihre Sprache richtig spricht.",
        },
      ],
      benefitsTitle: "Warum mehrsprachige E-Mails wichtig sind",
      benefits: [
        "Alle Transaktions-E-Mails in deiner Dashboard-Sprache",
        "preferredLocale bleibt sitzungsübergreifend",
        "RTL-Layouts für Arabisch und Persisch",
        "Gastgewerbe-passende Terminologie pro Sprache",
        "Sprache wechseln aktualisiert künftige E-Mails sofort",
        "35 Sprachen inklusive Katalanisch, Slowenisch, Estnisch, Lettisch",
      ],
      conclusionTitle: "E-Mails, die deine Sprache sprechen",
      conclusionBody:
        "Kommunikation, die in der falschen Sprache ankommt, ist Kommunikation, die nicht funktioniert. IQ Rest sendet jede E-Mail in der Sprache, die du tatsächlich nutzt, mit dem Layout und der Terminologie, die passen. Klingt klein, bis du ein deutscher Restaurantbesitzer bist, der eine englischsprachige Testphasen-Ablauf-Warnung bekommt und sie verpasst. Jetzt nicht mehr.",
      ctaText: "Melde dich an und bekomme dein Dashboard plus jede E-Mail in deiner Sprache.",
      ctaButton: "Kostenlose Testphase starten",
    },

    "ios-native-feel-mobile-restaurant-management": {
      meta: {
        title: "iOS-natives Mobil-Restaurant-Dashboard | IQ Rest",
        description:
          "Tab-Leiste unten, Safe-Area-Handling, Inputs ohne Zoom — das mobile Dashboard von IQ Rest fühlt sich auf dem iPhone wie eine native App an.",
      },
      title: "iOS-natives Gefühl auf deinem Handy",
      subtitle:
        "Tab-Leiste unten, volle Safe-Area-Berücksichtigung, Formular-Inputs ohne Zoom und sofortige Seitenübergänge. Deine QR-Speisekarte am Handy zu verwalten fühlt sich jetzt wie eine native iOS-App an.",
      intro:
        "Die meisten Restaurant-SaaS-Dashboards sind Desktop-first-Nachträge auf Mobil. IQ Rest ist das Gegenteil — entworfen für Besitzer, die ihre Karte zwischen Services vom Handy aus betreiben. Das mobile Dashboard nutzt jetzt Tab-Leisten unten, respektiert iPhone-Safe-Area-Insets, verhindert den iOS-Formular-Input-Zoom und nutzt nahezu sofortige SPA-Übergänge. Es sieht und fühlt sich wie eine native App an, außer es gibt keine App zu installieren.",
      sections: [
        {
          title: "Tab-Leiste unten, kein Hamburger",
          body: "Hamburger-Menüs auf Mobil sind langsam — tippen zum Öffnen, Item tippen, Seite abwarten. Wir haben die Desktop-Sidebar auf Handys durch eine untere Tab-Leiste ersetzt: Karte, Bestellungen, Reservierungen, Einstellungen. Ein daumenfreundlicher Tipp, sofortige Navigation. Der aktive Tab nutzt deine Marken-Akzentfarbe, sodass der aktuelle Ort immer klar ist.",
        },
        {
          title: "Safe-Area-Insets und Home-Indikator",
          body: "Moderne iPhones haben einen Home-Indikator unten und eine Notch oben. Web-Apps, die das ignorieren, haben am Ende UI, die sich mit dem Indikator überlappt oder hinter der Notch versteckt. Wir nutzen env(safe-area-inset-*) überall — die untere Leiste sitzt über dem Home-Indikator, Content-Padding berücksichtigt die Dynamic Island. Ergebnis: fühlt sich für das Gerät entworfen an, nicht von einem Desktop-Browser adaptiert.",
        },
        {
          title: "Inputs ohne Zoom und sofortiges Formular-Senden",
          body: "iOS Safari zoomt Formulare mit Input-Schriftgröße unter 16px. Wir haben jeden Input auf 16px gehoben und das Viewport mit maximum-scale=1 konfiguriert, sodass Tipps nicht den Zoom-und-Sprung auslösen, der jedes andere Web-Dashboard kaputt macht. Formular-Sendungen sind Server-Aktionen mit optimistischer UI — die Änderung erscheint sofort, das Netz bestätigt im Hintergrund.",
        },
      ],
      benefitsTitle: "Warum natives Gefühl auf Mobil zählt",
      benefits: [
        "Tab-Leiste unten — Ein-Tipp-Zugriff auf jede Sektion",
        "Safe-Area-bewusst — keine Überlappung mit Home-Indikator oder Notch",
        "16px-Inputs — kein iOS-Zoom-und-Sprung beim Antippen von Formularen",
        "Aktiver Tab nutzt deine Marken-Akzentfarbe",
        "SPA-Übergänge — keine kompletten Seiten-Reloads zwischen Sektionen",
        "Keine App zu installieren — funktioniert in Safari und Chrome",
      ],
      conclusionTitle: "Ein Web-Dashboard, das sich wie eine App anfühlt",
      conclusionBody:
        "Die Linie zwischen Web und Nativ ist meist eine Frage der Detailaufmerksamkeit. Das mobile Dashboard von IQ Rest zollt diese Aufmerksamkeit — Tab-Leiste unten, Safe-Area, kein Zoom, sofortige Übergänge — und das Ergebnis schwört man, wäre mit Swift gebaut. Außer es funktioniert auch auf Android und es gibt nichts, was über einen App Store zu installieren oder updaten wäre.",
      ctaText: "Öffne IQ Rest auf deinem Handy und spüre den Unterschied.",
      ctaButton: "14 Tage kostenlos testen",
    },

    "gdpr-cookie-consent-banner-restaurant-website": {
      meta: {
        title: "DSGVO-Cookie-Consent-Banner für Restaurant-Website | IQ Rest",
        description:
          "Rechtskonformer Consent-Banner, AEPD-konform, ohne Drittanbieter-Skripte. Cookieless Analytics feuert sogar vor der Zustimmung.",
      },
      title: "DSGVO-konformer Cookie-Consent-Banner",
      subtitle:
        "Selbst gebauter Consent-Banner ohne Drittanbieter-CMP, ohne Skript-Tag von Cookiebot oder OneTrust. Konform mit AEPD- und ePrivacy-Vorgaben, mit Cookieless Analytics, das vor der Zustimmung feuert.",
      intro:
        "Jede kommerzielle Website in der EU braucht einen Cookie-Consent-Banner. Die meisten nutzen Drittanbieter-CMPs, die schwere Skripte mitschleppen und die Seite verlangsamen. IQ Rest hat einen eigenen, leichtgewichtigen, AEPD-konformen Consent-Banner gebaut, der Teil des Seiten-Bundles ist — keine zusätzlichen DNS-Lookups, kein Drittanbieter-Tracking. Besucher sehen eine klare Akzeptieren/Ablehnen-Wahl, mit beiden Buttons gleich gestaltet (das dunkle Muster, „Ablehnen“ zu verstecken, ist in vielen EU-Ländern illegal — wir tun das nicht).",
      sections: [
        {
          title: "AEPD- und ePrivacy-konform",
          body: "Spanische AEPD und die breitere ePrivacy-Richtlinie verlangen gleich prominente Akzeptieren- und Ablehnen-Buttons. Viele CMPs bieten ein dunkles Muster „großes Akzeptieren, winziges Ablehnen“ als Standard. Wir lehnen dieses Muster ab — beide Buttons haben gleiche Größe, gleichen Stil, nur unterschiedliche Farben. Besucher, die ablehnen, werden nur über cookieless aggregate Counter erfasst; wir speichern nie einen Identifier auf ihrem Gerät, sodass nach einem Ablehnen kein Erstanbieter-Cookie verbleibt.",
        },
        {
          title: "Keine Drittanbieter-Skripte",
          body: "Die meisten Consent-Banner laden Cookiebot, OneTrust oder Ähnliches von einem CDN. Das fügt 50-100KB JavaScript, einen extra DNS-Lookup und eine Drittanbieter-Datenbeziehung hinzu, die in deiner Datenschutzerklärung offengelegt werden muss. Der Banner von IQ Rest ist Teil des Landingpage-Bundles — keine externen Anfragen, keine Drittanbieter-Datenweitergabe, schnellere Seitenladung.",
        },
        {
          title: "Datenschutz, Cookies und AGB in Modals",
          body: "Klick auf „Datenschutzerklärung“, „Cookie-Richtlinie“ oder „AGB“ im Banner öffnet ein Modal — keine Seitennavigation, kein Verlust deiner Scroll-Position auf der Landing. Der vollständige Rechtstext ist da, scrollbar, mit ordentlichen Überschriften. Nach dem Lesen Modal schließen und Akzeptieren oder Ablehnen wählen. Der Flow ist reibungsfrei für den Nutzer und lässt uns extra Seitensprünge vermeiden, die der Landingpage-Conversion schaden würden.",
        },
      ],
      benefitsTitle: "Warum unser Banner Drittanbieter-CMPs schlägt",
      benefits: [
        "AEPD- und ePrivacy-konform — gleich prominentes Akzeptieren/Ablehnen",
        "Keine Drittanbieter-Skripte, keine extra DNS-Lookups",
        "Datenschutz/Cookies/AGB in Modals — keine Seitensprünge",
        "Cookieless Analytics feuert sogar vor Zustimmung — nie Daten verlieren",
        "Erstanbieter-Cookie bei Ablehnen entfernt",
        "Leichtgewichtig — Teil des Landing-Bundles",
      ],
      conclusionTitle: "Compliance ohne Conversion-Bremse",
      conclusionBody:
        "Cookie-Consent ist in der EU nicht verhandelbar, muss aber deine Seite nicht verlangsamen oder deine Conversion schaden. Der Banner von IQ Rest ist schnell, fair und voll konform. Besucher, die akzeptieren, ermöglichen sitzungsbasierte Analytics; Besucher, die ablehnen, registrieren sich weiterhin in unseren anonymen aggregierten Countern, sodass wir wissen, was auf der Landing passiert, ohne sie je zu identifizieren.",
      ctaText: "Sieh den Consent-Flow in Aktion — öffne IQ Rest in einem frischen Browser.",
      ctaButton: "Landing besuchen",
    },

    "privacy-terms-in-modals-no-page-jumps": {
      meta: {
        title: "Datenschutz und AGB in Modals — keine Seitensprünge | IQ Rest",
        description:
          "Datenschutzerklärung, AGB und Cookie-Richtlinie öffnen sich jetzt als Modals auf der Landing — kein Verlust deiner Scroll-Position, keine zusätzliche Navigation.",
      },
      title: "Datenschutz, AGB und Cookie-Richtlinie in Modals — keine Seitensprünge",
      subtitle:
        "Klick auf einen rechtlichen Link auf der Landing oder Auth-Seite, und die Richtlinie öffnet sich in einem sauberen Modal. Keine Navigation, kein Verlust deiner Scroll-Position, kein Bruch deines Conversion-Flows.",
      intro:
        "Eigenständige /privacy-, /terms- und /cookies-Seiten waren das Standardmuster — und der Standardfehler. Besucher klickten den Link, verloren ihren Platz auf der Landing, lasen die Richtlinie und vergaßen dann zurückzukehren. Conversion sank. IQ Rest öffnet jetzt alle drei Rechtsdokumente als In-Page-Modals: gleiche Scroll-Position erhalten, gleiche Landing-Erfahrung ungestört, volle rechtliche Compliance gewahrt.",
      sections: [
        {
          title: "Eine Modal-Komponente, drei Dokumente",
          body: "Wir nutzen eine einzelne Modal-Komponente mit einem Switch auf den Dokumenttyp. Öffne es vom Cookie-Banner, der Auth-Seite, dem Footer — gleiche Komponente, gleiches Scroll-Locking, gleiches Schließen mit Escape. Der Rechtstext lebt in geteilten TypeScript-Konstanten, sodass das einmalige Updaten einer Klausel sich auf jeden Ort verbreitet, an dem die Richtlinie gezeigt wird. Keine Duplizierung, kein Drift.",
        },
        {
          title: "Modal-Stack — eines aus dem anderen öffnen",
          body: "Wenn du die Cookie-Richtlinie liest und zur Datenschutzerklärung wechseln willst, öffnet der Link im Modal das nächste Modal darüber — nicht als Weiterleitung. Der Stack handhabt Zurück-Navigation korrekt, Escape schließt das oberste Modal, Klick außerhalb verwirft elegant. Die Interaktion ist, was Nutzer von einer nativen App erwarten.",
        },
        {
          title: "Alle 35 Sprachen — gleicher Single-Source-Text",
          body: "Der Rechtstext selbst ist auf Englisch (Sprache unserer Rechtspersönlichkeit, Autónomo registriert in Spanien), aber die Modal-Chrome — Titel, Schließen-Button, Link-Labels — ist voll in alle 35 Sprachen lokalisiert. Besucher in Deutsch, Spanisch, Polnisch oder Koreanisch sehen ein lokalisiertes Modal, das englischen Rechtstext öffnet, genau wie unser Compliance-Ansatz erfordert.",
        },
      ],
      benefitsTitle: "Warum Modals eigenständige Rechtsseiten schlagen",
      benefits: [
        "Kein Scroll-Verlust — Besucher bleiben auf der Landing",
        "Höhere Conversion — weniger ungewollte Bounces",
        "Einzelne Komponente, drei Dokumente — keine Duplizierung",
        "Modal-Stack — eines aus dem anderen sauber öffnen",
        "Lokalisierte Chrome in 35 Sprachen",
        "Volle rechtliche Compliance gewahrt",
      ],
      conclusionTitle: "Recht ohne Reibung",
      conclusionBody:
        "Anwälte wollen, dass die Richtlinie lesbar ist. Marketer wollen, dass der Besucher konvertiert. Modals machen beide glücklich: die Richtlinie ist einen Tipp entfernt, voll lesbar, ohne Auswirkung auf den Landing-Flow. Die Compliance-Haltung von IQ Rest bleibt stark ohne die Conversion-Bremse eigenständiger Rechtsseiten.",
      ctaText: "Probiere den neuen Flow — öffne den Cookie-Banner und tippe einen Richtlinien-Link.",
      ctaButton: "Landing besuchen",
    },

    "auto-catalan-language-catalonia-visitors": {
      meta: {
        title: "Auto-Katalanisch für Besucher aus Katalonien | IQ Rest",
        description:
          "Besucher aus Barcelona, Tarragona, Lleida und Girona sehen IQ Rest automatisch auf Katalanisch statt auf kastilischem Spanisch.",
      },
      title: "Auto-Katalanisch-Erkennung für Besucher aus Katalonien",
      subtitle:
        "Besucher aus Barcelona, Tarragona, Lleida und Girona landen standardmäßig auf der katalanischen Version von IQ Rest. Der Rest Spaniens bekommt weiterhin kastilisches Spanisch.",
      intro:
        "Katalonien hat eine starke sprachliche Identität — Millionen Katalanen nutzen Katalanisch als Erstsprache, eigenständig vom kastilischen Spanisch. IQ Rest respektiert diese Unterscheidung jetzt auf Geo-Ebene: Besucher, deren IP in eine katalanische Provinz geolocatet wird, bekommen die /ca-Landingpage automatisch. Kastilisches Spanisch bleibt der Standard für den Rest Spaniens. Besucher können die Sprache jederzeit über das Sprachen-Modal im Footer wechseln.",
      sections: [
        {
          title: "Geo-Erkennung am Edge",
          body: "Wir lesen Land und Region des Besuchers von unserem nginx-Geo-Modul bei jedem Request. Wenn das Land Spanien ist und die Region Barcelona, Tarragona, Lleida oder Girona enthält (oder „Catalonia“/„Catalunya“ im Regionsnamen steht), leiten wir auf /ca um. Sonst folgt der Besucher dem Standard-Land-zu-Sprache-Routing und landet auf der passenden Sprachseite.",
        },
        {
          title: "Sprach-Cookie überschreibt Geo",
          body: "Sobald du eine Sprache manuell über den Sprachenwechsler wählst, wird deine Wahl in einem Cookie persistiert, das Geo für künftige Besuche überschreibt. Ein katalanisch sprechender Besucher, der IQ Rest lieber auf Englisch liest, wird nicht ständig auf /ca umgeleitet — seine explizite Wahl gewinnt immer. Geo ist ein Standard, keine Einschränkung.",
        },
        {
          title: "Volle Katalanisch-Übersetzung, nicht Auto-Übersetzt",
          body: "Die /ca-Landingpage ist nicht aus dem Spanischen automatisch übersetzt — jedes Wort wurde von katalanisch sprechenden Restaurantbranchen-Textern professionell übersetzt. Gastgewerbe-Terminologie, Zahlungskonditionen, kulturelle Bezüge — alles passt dazu, wie ein katalanischer Restaurantbesitzer tatsächlich spricht. Die Seite liest sich, als wäre sie für den Markt geschrieben, weil sie es ist.",
        },
      ],
      benefitsTitle: "Warum Auto-Katalanisch wichtig ist",
      benefits: [
        "Besucher aus Barcelona/Tarragona/Lleida/Girona sehen Katalanisch automatisch",
        "Rest Spaniens bekommt weiterhin Kastilisch — kein Über-Routing",
        "Manuelle Sprachwahl bleibt per Cookie",
        "Volle professionelle Übersetzung, keine Maschinenübersetzung",
        "Geo-Erkennung passiert am Edge — kein Client-Flackern",
        "Gleiche conversion-optimierte Landing wie jede andere Sprache",
      ],
      conclusionTitle: "Respekt vor sprachlicher Identität",
      conclusionBody:
        "Katalanische Besucher standardmäßig auf kastilisches Spanisch zu setzen ist technisch eine Kleinigkeit, aber politisch und kulturell groß. Das Geo-Routing von IQ Rest behandelt Katalanisch jetzt als erstklassige Sprache für Katalonien-Besucher. Ergebnis: eine höher konvertierende Landing für katalanisch sprechende Restaurantbesitzer, die sich von der ersten Sekunde an respektiert fühlen.",
      ctaText: "Besuche IQ Rest aus Katalonien und sieh die Seite in deiner Sprache.",
      ctaButton: "Katalanische Landing öffnen",
    },

    "trial-expired-modal-keep-menu-public": {
      meta: {
        title: "Testphasen-Ablauf-Modal — QR-Speisekarte bleibt öffentlich | IQ Rest",
        description:
          "Wenn deine Testphase endet, verschwindet deine Karte nicht. Gäste können weiter scannen und ansehen; du siehst ein Upgrade-Modal im Dashboard.",
      },
      title: "Testphase abgelaufen? Deine QR-Speisekarte bleibt für Gäste live",
      subtitle:
        "Testphasen-Ablauf killt nicht mehr deine öffentliche Karte. Gäste können weiter scannen und ansehen; nur das Dashboard fordert dich zum Upgrade auf. Keine Überraschungs-Downtime mitten im Service.",
      intro:
        "Das alte Testphasen-Ablauf-Verhalten war hart: wenn deine 14 Tage endeten, ging deine öffentliche QR-Speisekarte für Gäste schwarz. Wenn das mitten im Service war, war es eine Katastrophe. Wir haben es geändert. Jetzt zeigt der Testphasen-Ablauf ein Modal innerhalb des Dashboards, das zum Upgrade auffordert, aber deine öffentliche Karte funktioniert weiter normal. Du upgradest, wann du bereit bist, nicht wenn ein Gast mit einem Handy am QR-Code auf dem Tisch winkt.",
      sections: [
        {
          title: "Öffentliche Karte bleibt live",
          body: "Die 14-Tage-Testphase endet aus Gast-Perspektive ruhig. Die QR-Speisekarte, Online-Bestellung, Reservierungen — alles funktioniert weiter. Der Besitzer sieht das Upgrade-Modal beim nächsten Dashboard-Anmelden. Diese Entkopplung bedeutet, dass der Testphasen-Ablauf nie einen Service brechen oder dich vor Kunden blamieren kann.",
        },
        {
          title: "Modal im Dashboard, keine harte Weiterleitung",
          body: "Bisher leitete der Testphasen-Ablauf das Dashboard auf eine Abrechnungsseite um. Das brach Deep-Links und verwirrte Nutzer, die mitten in einer Aufgabe weggebumpst wurden. Jetzt zeigen wir ein sauberes Modal: „Deine Testphase ist beendet. Wähle einen Plan, um Premium-Funktionen weiter zu nutzen.“ Das Modal kann verworfen werden; du kannst weiter durchs Dashboard navigieren, aber neue Aktionen, die einen bezahlten Plan erfordern, zeigen Inline-Upsell-Hinweise.",
        },
        {
          title: "Vorschau immer verfügbar",
          body: "Selbst mit abgelaufener Testphase kannst du deine QR-Speisekarte vom Dashboard aus weiter vorschauen. Wir sperren dich nicht aus, das zu sehen, was Gäste sehen. Karte bearbeiten, Ergebnis vorschauen — nur veröffentlichungsbezogene Aktionen deuten Upgrade an. Das hält das Dashboard mitten in der Entscheidung produktiv, sodass du beim Vergleich von Plänen nicht den Zugriff verlierst.",
        },
      ],
      benefitsTitle: "Warum ein weiches Auslaufen einen harten Cutoff schlägt",
      benefits: [
        "Öffentliche QR-Speisekarte bleibt für Gäste live",
        "Keine Überraschungs-Downtime mitten im Service",
        "Modal im Dashboard statt erzwungener Abrechnungs-Weiterleitung",
        "Vorschau immer verfügbar, unabhängig vom Plan-Status",
        "Inline-Upsell-Hinweise ersetzen abrupte Sperren",
        "Besitzer upgradet nach eigenem Zeitplan",
      ],
      conclusionTitle: "Respektiere die Servicezeiten des Restaurants",
      conclusionBody:
        "Restaurants laufen mit knappen Margen und noch knapperen Zeitplänen. Eine QR-Speisekarte, die ausgeht, weil eine kostenlose Testphase abgelaufen ist, ist schlimmer als das Test-Limit selbst — es schadet dem Vertrauen. Weiches Auslaufen lässt das Licht für Gäste an, während es den Besitzer trotzdem zu einem bezahlten Plan schubst. Conversions bleiben hoch; Downtime sinkt auf null.",
      ctaText: "Starte deine 14-tägige Testphase und wisse, dass deine Karte live bleibt, egal was passiert.",
      ctaButton: "Kostenlose Testphase starten",
    },

    "item-renamed-to-dish-clearer-menu-editor": {
      meta: {
        title: "Item → Gericht: Klarere Karten-Editor-Terminologie | IQ Rest",
        description:
          "Wir haben „Item“ in „Gericht“ im gesamten Dashboard umbenannt. Restaurantbesitzer sollten generische SaaS-Terminologie nicht im Kopf übersetzen müssen.",
      },
      title: "Item → Gericht: Klarere Terminologie im Editor",
      subtitle:
        "Wir haben das generische „Item“-Label durch „Gericht“ in jeder Dashboard-Oberfläche ersetzt. Kleine Änderung, großer Klarheits-Boost für Restaurantbesitzer, die kein SaaS sprechen.",
      intro:
        "Software-Leute sagen „Item“. Restaurant-Leute sagen „Gericht“. Der Mismatch war klein, aber konstant — jedes Mal, wenn wir „Add Item“ zeigten, musste der Besitzer es im Kopf zu „Gericht hinzufügen“ übersetzen. Wir haben alles umbenannt: Buttons, Labels, Erfolgsmeldungen, Fehlerzustände, Seitentitel. Das Dashboard spricht jetzt dieselbe Sprache wie die Leute, die es nutzen.",
      sections: [
        {
          title: "Wo die Umbenennung gilt",
          body: "Jede nutzerseitige Oberfläche: „Add Item“ wurde zu „Gericht hinzufügen“. „Items“-Tab in der Karte wurde zu „Gerichte“. „Item-Einstellungen“ wurden zu „Gericht-Einstellungen“. Erfolgs-Toasts („Item erstellt“) wurden zu („Gericht erstellt“). Formularvalidierungs-Fehler, Breadcrumbs, Dashboard-Überschriften — alle aktualisiert. Die interne Datenbank-Spalte heißt aus Abwärtskompatibilitäts-Gründen weiterhin „item“, aber kein Nutzer sieht das je.",
        },
        {
          title: "Übersetzt in alle 35 Sprachen",
          body: "Jede Sprache hat ihr eigenes korrektes Wort für „Gericht“, das sich von „Item“ unterscheidet. Spanisch „plato“, Französisch „plat“, Deutsch „Gericht“, Italienisch „piatto“, Katalanisch „plat“, Japanisch „料理“. Wir haben den Übersetzungsschlüssel in jeder Sprache aktualisiert und überprüft, dass das Ergebnis in jeder Sprache natürlich liest. Keine Maschinenübersetzung; Native Speaker haben jede überprüft.",
        },
        {
          title: "Standardkategorie auch automatisch erstellt",
          body: "Während wir im Editor waren, erstellen wir auch automatisch eine Standardkategorie namens „Karte“ beim ersten Dashboard-Besuch. Altes Verhalten: Besitzer landeten auf einer leeren Karte, mussten „Kategorie hinzufügen“ klicken, bevor sie ein Gericht hinzufügen konnten, gaben oft auf. Neues Verhalten: eine Karten-Kategorie existiert, du tippst „Gericht hinzufügen“, du bearbeitest sofort. Eine Barriere entfernt.",
        },
      ],
      benefitsTitle: "Warum Terminologie wichtig ist",
      benefits: [
        "„Gericht“ entspricht, wie Restaurantbesitzer tatsächlich sprechen",
        "In jeder Dashboard-Oberfläche aktualisiert — Buttons, Labels, Toasts",
        "In alle 35 Sprachen von Native Speakern übersetzt",
        "Standardkategorie automatisch erstellt — keine leere Karte zum Start",
        "Schneller von der Anmeldung zum ersten hinzugefügten Gericht",
        "Weniger mentale Übersetzung = niedrigerer Bounce im Onboarding",
      ],
      conclusionTitle: "Sprich die Sprache des Nutzers",
      conclusionBody:
        "Generische SaaS-Terminologie („Item“, „Entity“, „Object“) ist okay für Ingenieure. Restaurantbesitzer brauchen Wörter, die zu dem passen, was sie bei der Arbeit sagen. IQ Rest spricht jetzt dieselbe Sprache wie die Leute, die es nutzen — über jeden Button, Label und jede Benachrichtigung — und die Conversion-Daten spiegeln den Wechsel bereits.",
      ctaText: "Melde dich an und füge dein erstes Gericht in unter einer Minute hinzu.",
      ctaButton: "Meine Karte bauen",
    },

    "auto-default-category-restaurant-menu-onboarding": {
      meta: {
        title: "Auto-Standardkategorie für Karten-Onboarding | IQ Rest",
        description:
          "Erstnutzer stehen nicht mehr vor einer leeren Karte. IQ Rest erstellt automatisch eine Standardkategorie, sodass du sofort dein erstes Gericht hinzufügen kannst.",
      },
      title: "Auto-Standardkategorie — überspringe die leere Karte",
      subtitle:
        "Erstnutzer landen auf einer Karte mit einer bereits erstellten Standardkategorie. Tippe „Gericht hinzufügen“ und beginne zu bearbeiten. Keine „erst Kategorie erstellen“-Barriere mehr.",
      intro:
        "Das alte Onboarding verlangte von Nutzern, eine Kategorie zu erstellen, bevor sie ein Gericht hinzufügen konnten. Leere Karten sind einschüchternd — viele neue Nutzer gaben an dem Punkt auf. IQ Rest erstellt jetzt automatisch eine Standardkategorie „Karte“ beim ersten Öffnen des Dashboards, sodass die erste Aktion das Hinzufügen eines Gerichts ist, nicht das Konfigurieren einer Hierarchie. Schneller, glatter, mehr Karten tatsächlich gebaut.",
      sections: [
        {
          title: "Standardkategorie beim Anmelden erstellt",
          body: "Beim ersten Anmelden in einem frischen Dashboard prüft IQ Rest, ob du Kategorien hast. Wenn nicht, erstellt es eine namens „Karte“ (in deine Sprache übersetzt). Die Kategorie ist sofort bereit, Gerichte zu empfangen. Du kannst sie umbenennen oder mehr Kategorien hinzufügen, wann immer du willst — aber du musst es nicht, bevor du dein erstes Gericht hinzufügst.",
        },
        {
          title: "Umbenannt nach deiner Küche, wenn du den Assistenten nutzt",
          body: "Wenn du den 3-Schritt-Anmeldeassistenten genutzt hast, generiert der Seeder stattdessen küchengerechte Kategorien — „Pizza“, „Pasta“, „Antipasti“ für Italienisch; „Sushi“, „Ramen“, „Sake“ für Japanisch. Die Auto-Standard-„Karte“-Kategorie greift nur für Nutzer, die den Assistenten übersprungen oder sich direkt mit Google angemeldet haben.",
        },
        {
          title: "Abwärtskompatibel mit bestehenden Karten",
          body: "Wenn du bereits Kategorien hast — aus früherer Nutzung, importierten Daten, dem Seeder — wird die Standardkategorie nicht erstellt. Wir greifen nur ein, wenn die Karte wirklich leer ist. Bestehende Nutzer sehen keine Änderung an ihrer Kartenstruktur.",
        },
      ],
      benefitsTitle: "Warum Auto-Standard das Onboarding beschleunigt",
      benefits: [
        "Keine „erst Kategorie erstellen“-Barriere für neue Nutzer",
        "Tippe „Gericht hinzufügen“ als erste Aktion, nicht als zweite",
        "Kategorie in deiner Sprache benannt, nicht standardmäßig Englisch",
        "Assistenten-Flow sät weiterhin küchengerechte Kategorien",
        "Bestehende Karten unangetastet",
        "Schneller von der Anmeldung zum ersten hinzugefügten Gericht",
      ],
      conclusionTitle: "Beseitige den Leerzustand",
      conclusionBody:
        "Leerzustände sind, wo neue Nutzer abspringen. Jede Barriere zwischen dem Nutzer und seiner ersten produktiven Aktion kostet dich Conversions. Eine Standardkategorie automatisch zu erstellen entfernt eine solche Barriere. Es ist eine kleine Änderung mit messbarem Einfluss darauf, wie schnell neue Restaurants zu einer veröffentlichbaren Karte gelangen.",
      ctaText: "Melde dich an und beginne sofort, Gerichte hinzuzufügen.",
      ctaButton: "Meine Karte bauen",
    },

    "skip-restaurant-name-step-onboarding": {
      meta: {
        title: "Schritt „Restaurantname“ im Onboarding überspringen | IQ Rest",
        description:
          "Wir haben den Schritt „Restaurantname“ aus dem Onboarding entfernt. Setze ihn später in den Einstellungen — oder direkt vom Karten-Hero, das du sowieso bearbeiten wirst.",
      },
      title: "Überspringe den Schritt „Restaurantname“ im Onboarding",
      subtitle:
        "Du musst deinen Restaurantnamen nicht eingeben, um eine Karte zu bauen. Wir haben diesen Onboarding-Schritt fallen gelassen — setze den Namen später vom Dashboard oder über den Live-Karten-Hero.",
      intro:
        "Onboarding-Flows, die im Voraus Informationen verlangen, fühlen sich wie Formularausfüllen an. Das alte IQ Rest-Onboarding fragte in Schritt eins nach einem Restaurantnamen. Neue Nutzer hatten oft die exakte Schreibweise, Markenvariante oder Interpunktion noch nicht entschieden — also blieben sie hängen, bevor sie überhaupt das Dashboard sahen. Wir haben den Schritt entfernt. Anmelden, im Dashboard landen, Namen setzen, wenn du bereit bist. Die Karte funktioniert auch ohne ihn fein.",
      sections: [
        {
          title: "Was passiert, wenn du überspringst",
          body: "Wenn du den Namensschritt überspringst, bekommt das Restaurant einen Platzhalter („Dein Restaurant“), der auf der öffentlichen Karte standardmäßig versteckt ist. Gäste, die deinen QR scannen, sehen die Karte ohne Namen im Hero — was für viele Quick-Service-Lokale ehrlich gesagt in Ordnung ist. Sobald du den Namen in den Einstellungen setzt, erscheint er im Hero, im Seitentitel, im SEO-Slug und in Social Shares.",
        },
        {
          title: "Setze ihn von überall",
          body: "Das Namensfeld ist von den Einstellungen, vom Karten-Hero (Tippen zum Inline-Bearbeiten) und vom öffentlichen Vorschau-Bildschirm bearbeitbar. Drei verschiedene Oberflächen, ein zugrundeliegendes Feld. Wir haben es einfach gemacht, die Entscheidung zu verschieben, und trivial einfach, sich zu committen, wenn du bereit bist.",
        },
        {
          title: "Keine SEO-Strafe für Standardwert",
          body: "Wir nutzen den Slug („dein-restaurant“) als Fallback für den Seitentitel und SEO-Meta-Tags, bis du einen echten Namen setzt. Suchmaschinen bestrafen dich nicht — sie sehen einfach einen generischen Titel. Sobald du einen echten Namen setzt, aktualisieren sich alle Meta-Tags und Google crawlt innerhalb von Stunden neu.",
        },
      ],
      benefitsTitle: "Warum Überspringen das Onboarding beschleunigt",
      benefits: [
        "Kein Entscheidungsdruck im falschen Moment",
        "Schneller im Dashboard landen",
        "Setze den Namen, wenn die Inspiration kommt — oder die Rechtspersönlichkeit registriert ist",
        "Inline-Bearbeitung vom Karten-Hero",
        "Öffentliche Karte funktioniert ohne gesetzten Namen",
        "Keine SEO-Strafe für die Verwendung des Platzhalters",
      ],
      conclusionTitle: "Weniger Entscheidungen, mehr erledigt",
      conclusionBody:
        "Jedes Formularfeld im Onboarding ist eine Chance für den Nutzer abzuspringen. Indem wir das Restaurantnamenfeld entfernt haben, haben wir eine solche Chance entfernt. Neue Nutzer landen jetzt mit einer funktionierenden Karte im Dashboard und der Freiheit, ihr Restaurant nach eigenem Zeitplan zu benennen (oder nicht). Der Conversion-Lift war sofort.",
      ctaText: "Melde dich in Sekunden an — kein Restaurantname erforderlich.",
      ctaButton: "Kostenlose Testphase starten",
    },

    "try-menu-before-signup-anonymous-onboarding": {
      meta: {
        title: "QR-Speisekarte vor Anmeldung testen — Anonym | IQ Rest",
        description:
          "Baue eine Beispielkarte, bevor du ein Konto erstellst. Speichere deinen Fortschritt per E-Mail, wenn du sie behalten willst. Keine Verpflichtung, keine Reibung.",
      },
      title: "Probiere eine QR-Speisekarte, bevor du dich anmeldest",
      subtitle:
        "Baue eine Beispielkarte, sieh dir an, wie dein QR-Code aussieht, schau dir die Live-Erfahrung an — alles, bevor du ein Konto erstellst. Speichere deinen Fortschritt per E-Mail-Link, wenn du bereit bist.",
      intro:
        "Die meisten QR-Speisekarten-Dienste verlangen, dass du ein Konto erstellst, bevor du irgendwas tun kannst. Das ist die falsche Reihenfolge. Neue Restaurantbesitzer wollen das Produkt zuerst fühlen — sehen, wie ein Gericht aussieht, wie sich der QR-Scan-Flow anfühlt — und sich erst dann zur Anmeldung verpflichten. IQ Rest lässt dich jetzt eine komplette Beispielkarte anonym bauen. Wenn du sie behalten willst, speichern wir sie zu deiner E-Mail. Reibungsfrei, verpflichtungsfrei.",
      sections: [
        {
          title: "Anonyme Sitzung speichert deine Arbeit",
          body: "Eine anonyme Sitzungs-ID wird bei deinem ersten Besuch erstellt und in einem Cookie gespeichert. Jede Kategorie, die du hinzufügst, jedes Gericht, das du erstellst, jedes Foto, das du hochlädst, ist mit dieser Sitzung verknüpft. Du kannst die Seite verlassen, zurückkommen, und deine Karte ist immer noch da. Wir behalten die Sitzung 7 Tage — reichlich Zeit, um das Produkt ohne Druck zu evaluieren.",
        },
        {
          title: "Fortschritt per E-Mail-Link speichern",
          body: "Wenn du beschließt, dass du die Karte behalten willst, klicke „Fortschritt speichern“. Tippe deine E-Mail. Wir senden dir einen Magic Link, der die anonyme Sitzung beim Klicken in ein echtes Konto, das mit deiner E-Mail verknüpft ist, umwandelt. Deine gesamte Arbeit wird automatisch übertragen — keine Neueingabe, kein verlorener Fortschritt, kein „ups, es ist gelöscht“. Die Konversion zum zahlenden Kunden geschieht zu deinen Bedingungen.",
        },
        {
          title: "Reduziert die Anmelde-Angst auf null",
          body: "Indem wir Nutzern erlauben, vor dem Anmelden zu probieren, kehren wir das typische SaaS-Muster um. Besucher müssen nicht entscheiden, ob IQ Rest ihre E-Mail wert ist — sie können es selbst sehen. Restaurants, die anonym probieren und sich dann anmelden, konvertieren höher als Restaurants, die zur Anmeldung erst gezwungen werden, weil sie bereits in die Karte investiert haben und sie nicht verlieren wollen.",
        },
      ],
      benefitsTitle: "Warum anonymes Onboarding gewinnt",
      benefits: [
        "Baue eine echte Karte, ohne ein Konto zu erstellen",
        "Anonyme Sitzung bleibt 7 Tage",
        "Fortschritt zur E-Mail speichern, wenn du dich verpflichten willst",
        "Keine Neueingabe — Arbeit wird zu deinem echten Konto übertragen",
        "Reibungsfreie Produktevaluation",
        "Höhere Gesamt-Anmelde-Conversion",
      ],
      conclusionTitle: "Lass das Produkt sich selbst verkaufen",
      conclusionBody:
        "Der beste Weg, einen Restaurantbesitzer davon zu überzeugen, dass IQ Rest das Richtige für ihn ist, ist, ihn es nutzen zu lassen. Anonymes Onboarding verwandelt einen neugierigen Besucher in einen engagierten Nutzer, ohne Gegenleistung zu verlangen. Wenn du die E-Mail abfragst, hat der Nutzer bereits Zeit in seine Karte investiert — sie zu speichern kostet ihn nichts, und er behält, was er gebaut hat.",
      ctaText: "Probiere IQ Rest jetzt — kein Konto nötig.",
      ctaButton: "Kostenlos testen",
    },

    "save-menu-progress-via-email-link": {
      meta: {
        title: "Karten-Fortschritt per E-Mail-Link speichern | IQ Rest",
        description:
          "Hast du anonym eine Beispielkarte gebaut? Speichere sie zu deiner E-Mail und wir senden dir einen Magic Link, um das Konto zu beanspruchen.",
      },
      title: "Speichere deinen Karten-Fortschritt per E-Mail-Link",
      subtitle:
        "Anonym eine Karte gebaut und willst sie behalten? Tippe deine E-Mail. Wir senden einen Magic Link, der deine anonyme Arbeit in ein echtes Konto in einem Tipp umwandelt.",
      intro:
        "Wenn du fünf Minuten damit verbracht hast, eine Beispielkarte ohne Konto zu bauen, willst du sie nicht verlieren. Die „Fortschritt speichern“-Funktion von IQ Rest wandelt deine anonyme Sitzung über einen Magic Link in ein echtes Konto um. Tippe deine E-Mail, klicke den Link in deinem Posteingang, deine Karte ist dauerhaft mit deinem Konto verknüpft. Kein Passwort, kein Anmeldeformular, keine Datenwiedereingabe.",
      sections: [
        {
          title: "Magic-Link-Flow — kein Passwort",
          body: "Wir senden einen Einmal-Link an deine E-Mail. Klicke ihn innerhalb von 10 Minuten und du bist in einem neuen Konto angemeldet, das die Karte enthält, die du anonym gebaut hast. Kein Passwort zu wählen, keine Sicherheitsfragen, kein E-Mail-Verifizierungsschritt — der Klick auf den Link IST die Verifizierung. Wir geben dann ein Sitzungs-Cookie aus und du bist im Dashboard mit deiner ganzen Arbeit erhalten.",
        },
        {
          title: "Konflikt-Handling für bestehende Konten",
          body: "Wenn die E-Mail, die du eingegeben hast, bereits ein Konto hat, überschreiben wir es nicht. Wir senden den Link, du klickst, und wir fragen, ob die anonyme Karte in dein bestehendes Konto eingefügt oder verworfen werden soll. Die meisten Nutzer wählen Einfügen — deine bestehenden Gerichte bleiben, die neuen aus der anonymen Bearbeitung werden hinzugefügt. Klar, sicher, vorhersehbar.",
        },
        {
          title: "Rate-limited und Spam-resistent",
          body: "Wir limitieren Fortschritt-Speichern-Anfragen pro IP und pro E-Mail, um Missbrauch zu verhindern. Der Link läuft in 10 Minuten ab und ist Einmal-nutzbar. Wenn jemand anderes versucht, deine anonyme Sitzung zu beanspruchen, braucht er Zugriff auf deinen Posteingang — dasselbe Sicherheitsmodell wie jeder moderne Magic-Link-Auth-Flow.",
        },
      ],
      benefitsTitle: "Warum Magic-Link-Speichern gewinnt",
      benefits: [
        "Kein Passwort zu wählen, merken oder zurücksetzen",
        "Anonyme Arbeit wird unversehrt zu deinem echten Konto übertragen",
        "Bestehende Konten: Einfügen oder Verwerfen wählen",
        "Rate-limited und zeitbegrenzt — sicher per Design",
        "Ein Tipp zum Committen — kein Anmeldeformular",
        "Die E-Mail selbst dient als Verifizierungsschritt",
      ],
      conclusionTitle: "Conversion ohne Reibung",
      conclusionBody:
        "Der Moment, in dem ein Nutzer von anonym zu identifiziert konvertieren will, ist der Moment, in dem er am wahrscheinlichsten an einem langen Anmeldeformular abspringt. Magic Links kollabieren dieses Formular auf ein einzelnes E-Mail-Feld plus einen Posteingangs-Klick. Der Nutzer verbringt 30 Sekunden und endet mit einem echten, persistierten Konto, das alles enthält, was er gebaut hat. Es ist der reibungsärmste Conversion-Flow der QR-Speisekarten-Branche.",
      ctaText: "Baue eine Karte anonym, speichere sie dann per E-Mail, wenn bereit.",
      ctaButton: "Kostenlos testen",
    },

    "one-click-stripe-checkout-returning-users": {
      meta: {
        title: "Ein-Klick-Stripe-Checkout für wiederkehrende Nutzer | IQ Rest",
        description:
          "Bereits angemeldet? Klicke einen Plan in der Preisseite und gehe direkt zum Stripe-Checkout. Keine erneute Konto-Eingabe, keine extra Bildschirme.",
      },
      title: "Ein-Klick-Stripe-Checkout für wiederkehrende Nutzer",
      subtitle:
        "Angemeldeter Nutzer klickt einen Plan? Direkt zum Stripe-Checkout, keine zusätzliche Bestätigungs-Bildschirm. Zwei Klicks von der Preisseite zum aktiven Abo.",
      intro:
        "Wiederkehrende Nutzer, die bereits ein IQ Rest-Konto haben, sollten nichts erneut bestätigen müssen, wenn sie upgraden. Wir haben jeden Zwischenbildschirm zwischen „Plan in der Preisseite klicken“ und „beim Stripe-Checkout landen“ entfernt. Insgesamt zwei Klicks: Plan wählen, Kartendaten eingeben. Das Abo ist aktiv, bevor du deinen Kaffee fertig hast.",
      sections: [
        {
          title: "Angemeldeten Status auf der Preisseite erkennen",
          body: "Unsere Preisseite prüft beim Laden auf ein authentifiziertes Sitzungs-Cookie. Wenn du angemeldet bist, überspringen die Plan-Buttons den „Erst anmelden“-Umweg und gehen direkt zu /api/stripe/checkout, was eine Stripe-Checkout-Sitzung erstellt und die URL für die Weiterleitung zurückgibt. Wenn du nicht angemeldet bist, führen die Buttons dich zuerst durch den Standard-Anmeldeflow — keine Verhaltensänderung für neue Nutzer.",
        },
        {
          title: "UI-Sprache an Stripe weitergeleitet",
          body: "Deine Dashboard-Sprache wird über den Locale-Parameter an Stripe Checkout weitergeleitet, sodass die Checkout-Seite in deiner Sprache rendert. Deutsche Nutzer sehen Stripe auf Deutsch; spanische Nutzer auf Spanisch. Der Checkout-Flow fühlt sich nahtlos an, weil er nie die sprachliche Kontinuität von deinem Dashboard bricht.",
        },
        {
          title: "Return-URL bringt dich zurück ins Dashboard",
          body: "Nach erfolgreicher Zahlung leitet Stripe an eine Return-URL weiter, die wir auf den Dashboard-Root in deiner Sprache setzen (z. B. /de/dashboard). Der Webhook aktualisiert deinen Abo-Status serverseitig, bevor du ankommst, sodass das Dashboard, in dem du landest, bereits den neuen Plan widerspiegelt — kein „ausstehender“ Status, kein Aufblitzen von nicht-upgradedem Inhalt.",
        },
      ],
      benefitsTitle: "Warum Ein-Klick-Checkout konvertiert",
      benefits: [
        "Zwei Klicks von der Preisseite zum aktiven Abo",
        "Kein „bestätige dein Konto“-Zwischenbildschirm für angemeldete Nutzer",
        "Stripe-Checkout zeigt sich in deiner Dashboard-Sprache",
        "Return-URL bringt dich ins upgradet Dashboard",
        "Webhook aktualisiert Plan, bevor du ankommst — kein Flackern",
        "Neue Nutzer bekommen weiterhin den Standard-Anmelde- → Upgrade-Flow",
      ],
      conclusionTitle: "Mache den einfachen Weg trivial einfach",
      conclusionBody:
        "Der Nutzer, der bereits überzeugt ist, braucht nicht mehr Überzeugung — er braucht weniger Klicks. Ein-Klick-Checkout entfernt jeden Bildschirm zwischen Absicht und Zahlung für wiederkehrende Nutzer. Ergebnis: höhere Trial-zu-Bezahlt-Conversion, weniger abgebrochene Upgrades, schnellere Umsatzanerkennung für Abo-Erweiterung.",
      ctaText: "Bereits Nutzer? Wähle deinen Plan und upgrade in zwei Klicks.",
      ctaButton: "Preise ansehen",
    },

    "dashboard-ui-redesign-consistent-cards-navigation": {
      meta: {
        title: "Dashboard-UI-Redesign: Karten, Navigation und Formulare | IQ Rest",
        description:
          "IQ Rest-Dashboard mit konsistenten Karten-Komponenten, persistenter Sidebar-Navigation mit aktiver Seitenhervorhebung und verbesserten Formularaktionen neu gestaltet.",
      },
      title: "Dashboard-UI-Redesign: Konsistente Karten, Navigation und Formularaktionen",
      subtitle:
        "Ein poliertes Dashboard mit einheitlichem Karten-Stil, persistenter Sidebar-Navigation, akzentfarbenen aktiven Zuständen und unteren Speichern/Löschen-Aktionen auf jeder Formularseite.",
      intro:
        "IQ Rest hat ein umfassendes Dashboard-UI-Redesign durchlaufen. Jede Seite nutzt jetzt konsistenten Karten-Stil mit einheitlichen Border-Radien, eine persistente Sidebar-Navigation mit akzentfarbenen aktiven Zuständen und verbesserte Formularseiten mit unteren Speichern- und Löschen-Aktionen. Das Ergebnis ist eine sauberere, poliertere Erfahrung für die Verwaltung der digitalen QR-Speisekarte deines Restaurants.",
      sections: [
        {
          title: "Konsistentes Karten-Design auf allen Seiten",
          body: "Jede Dashboard-Seite nutzt jetzt eine einheitliche DashboardCard-Komponente mit konsistenten gerundeten Borders, dezenten Hintergrundfarben und optionalen Sektionsüberschriften. Analytics, Abrechnung, Einstellungen, Kontakte, Reservierungseinstellungen und alle Formularseiten teilen dieselbe visuelle Sprache. Hint-Labels mit Popover-Tooltips ersetzen Inline-Beschreibungstext und halten die Oberfläche sauber, während sie weiterhin hilfreichen Kontext bieten, wenn nötig.",
        },
        {
          title: "Persistente Sidebar-Navigation mit aktiven Zuständen",
          body: "Auf Desktop-Bildschirmen ist eine persistente Sidebar-Navigation jetzt auf jeder Seite sichtbar. Die aktive Seite wird mit einem Akzentfarben-Hintergrund hervorgehoben, was sofort klar macht, wo du bist. Unterseiten wie Kategorien, Gerichte und Bestellungen heben das übergeordnete Karte-Item korrekt hervor. Die Sidebar bietet schnellen Zugriff auf Karte, QR drucken, Reservierungen, Analytics, Einstellungen, Kontakte, Abrechnung und Support — alles ohne die aktuelle Ansicht zu verlassen.",
        },
        {
          title: "Verbesserte Formularseiten mit unteren Aktionen",
          body: "Alle Formularseiten — Kategorien, Gerichte, Tische, Design, Einstellungen, Kontakte und Reservierungseinstellungen — haben jetzt einen duplizierten Speichern-Button am unteren Rand in Akzentfarbe. Löschen-Buttons erscheinen auf der linken Seite mit gedämpftem Stil. Das bedeutet, du musst nicht mehr nach oben scrollen, um deine Änderungen zu speichern. Der Abmelden-Button wurde von der Sidebar zum unteren Rand der Design-Seite verschoben, sodass die Navigation auf wesentliche Aktionen fokussiert bleibt.",
        },
      ],
      benefitsTitle: "Vorteile des UI-Redesigns",
      benefits: [
        "Einheitlicher Karten-Stil mit konsistenten Borders und Hintergründen auf allen Seiten",
        "Persistente Sidebar-Navigation auf Desktop mit akzentfarbenen aktiven Zuständen",
        "Untere Speichern-Buttons auf allen Formularen — kein Hochscrollen zum Speichern nötig",
        "Löschen- und Speichern-Aktionen klar getrennt — löschen links, speichern rechts",
        "Sektionsüberschriften auf Formularkarten für bessere visuelle Organisation",
        "Sauberere Analytics-Seite mit DashboardCard-Wrappern und verbessertem Geräte-Stats-Layout",
      ],
      conclusionTitle: "Eine poliertere Dashboard-Erfahrung",
      conclusionBody:
        "Dieses UI-Redesign bringt visuelle Konsistenz und verbesserte Usability in jede Ecke des IQ Rest-Dashboards. Egal ob du Gerichte bearbeitest, Analytics prüfst oder Reservierungen verwaltest, die Oberfläche fühlt sich kohärent und intuitiv an. Kombiniert mit der persistenten Sidebar-Navigation ist das Verwalten der digitalen QR-Speisekarte deines Restaurants schneller und angenehmer als je zuvor.",
      ctaText: "Erlebe das neu gestaltete Dashboard",
      ctaButton: "Dashboard öffnen",
    },

    "ai-menu-scanner-create-digital-qr-menu": stub("KI-Karten-Scanner — Erstelle eine digitale QR-Speisekarte aus einem Foto"),
    "redesigned-dashboard-qr-menu-management": stub("Neu gestaltetes Dashboard für QR-Speisekarten-Verwaltung"),
    "reservation-emails-analytics-digital-qr-menu": stub("Reservierungs-E-Mails und Analytics für deine digitale QR-Speisekarte"),
    "multi-currency-geo-pricing-qr-menu": stub("Multi-Währung-Geo-Preise für deine QR-Speisekarte"),
    "support-qr-menu-restaurant-cafe": stub("In-App-Support für deine QR-Speisekarte"),
    "detailed-analytics-restaurant-qr-menu-website": stub("Detaillierte Analytics für deine QR-Speisekarten-Website"),
    "instant-qr-menu-restaurant-website-generator": stub("Sofort-Generator für QR-Speisekarte und Restaurant-Website"),
    "subscription-plans-qr-menu-restaurant-website": stub("Abo-Pläne für deine QR-Speisekarte"),
    "public-restaurant-qr-menu-website": stub("Öffentliche Restaurant-QR-Speisekarten-Website"),
    "add-items-restaurant-qr-menu-website": stub("Füge Gerichte zu deiner QR-Speisekarte in Sekunden hinzu"),
    "qr-menu-restaurant-categories": stub("Kategorien für deine Restaurant-QR-Speisekarte"),
    "easy-qr-menu-cafe-control-panel": stub("Einfaches QR-Speisekarten-Café-Bedienfeld"),
    "faq-page-organization": stub("FAQ-Seiten-Organisation"),
    "free-restaurant-website-improvements": stub("Verbesserungen der kostenlosen Restaurant-Website"),
    "user-authentication-interface": stub("Benutzer-Authentifizierungs-Oberfläche"),
  },
};

function stub(title: string) {
  return {
    meta: { title: `${title} | IQ Rest`, description: title },
    title,
    subtitle: title,
    intro: title,
    sections: [],
    benefitsTitle: "Vorteile",
    benefits: [],
    conclusionTitle: title,
    conclusionBody: title,
    ctaText: "IQ Rest testen",
    ctaButton: "Kostenlose Testphase starten",
  };
}
