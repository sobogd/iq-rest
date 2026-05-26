import type { HelpDoc } from "../types";

// NL help guide.
export const nl: HelpDoc = {
  metaTitle: "IQ Rest gebruiken — stapsgewijze handleiding",
  metaDescription:
    "Volledige IQ Rest-handleiding: registratie, menu, bestellingen, reserveringen, keukenscherm en instellingen — voor restaurants.",
  h1: "Hulp",
  intro: "Een gedetailleerde handleiding voor IQ Rest — van registratie tot de fijnere instellingen.",
  banner: {
    title: "Het is eenvoudiger dan het lijkt",
    sub: "Een stapsgewijze handleiding: van registratie tot de fijnere instellingen — iedereen kan het.",
    cta: "Hoe het werkt",
  },
  tipLabel: "Tip",
  noteLabel: "Belangrijk",
  sections: [
    {
      id: "start",
      title: "1. Aan de slag",
      blocks: [
        { type: "h3", text: "Wat is dit systeem" },
        {
          type: "p",
          text: "IQ Rest is een dienst voor restaurants: je maakt een online menu met QR-code, ontvangt bestellingen en tafelreserveringen rechtstreeks vanaf de telefoon van gasten, terwijl in de keuken en bij de bediening tablet-terminals draaien. Alles wordt beheerd vanuit één beheerpaneel (het dashboard).",
        },
        { type: "h3", text: "Registratie en inloggen" },
        { type: "p", text: "Je kunt op drie manieren inloggen — kies er een op het inlogscherm:" },
        {
          type: "list",
          items: [
            "Met Google — klik op “Doorgaan met Google” en kies je account.",
            "Met Apple — klik op “Doorgaan met Apple”.",
            "Per e-mail — klik op “Doorgaan met e-mail”, voer je adres in, en we sturen een 6-cijferige code. Voer die in op het volgende scherm. Geen wachtwoord nodig.",
          ],
        },
        {
          type: "note",
          text: "Per e-mail krijg je alleen een eenmalige inlogcode — geen spam, geen nieuwsbrieven.",
        },
        { type: "h3", text: "Restaurant aanmaken (onboarding)" },
        {
          type: "p",
          text: "Bij de eerste keer inloggen leidt het systeem je door een snelle configuratie. Daarna wordt automatisch een restaurant aangemaakt met een voorbeeldmenu dat je later door je eigen menu vervangt.",
        },
        {
          type: "steps",
          items: [
            "Geef de naam van het restaurant op.",
            "Kies het keukentype (dit bepaalt het startsjabloon van het menu).",
            "Klaar: je komt in het dashboard met een al ingevuld voorbeeldmenu.",
          ],
        },
        {
          type: "note",
          text: "De valuta wordt automatisch bepaald op basis van je regio — die hoef je bij de start niet te kiezen. Je kunt die later wijzigen in Instellingen → Regio.",
        },
        { type: "h3", text: "Overzicht van het dashboard" },
        {
          type: "p",
          text: "Navigatie tussen secties: op de computer is het een bovenbalk, op de telefoon een onderbalk. Secties: Menu, Bestellingen, Reserveringen, Keuken, Analyses en Instellingen.",
        },
        {
          type: "list",
          items: [
            "Naast de restaurantnaam in de bovenbalk staat een kleine verbindingsindicator: een groene stip betekent dat bestellingen in realtime synchroniseren.",
            "Op de pagina “Menu” bovenaan staat de knop “Voorbeeld” — die opent je menu zoals de gast het ziet.",
            "Daarnaast de knop “Delen” — die toont de QR-code en de link naar het menu (link kopiëren, QR downloaden of menu openen).",
          ],
        },
        {
          type: "tip",
          text: "Druk na elke menuwijziging op “Voorbeeld” — je ziet meteen hoe het er voor de gast uitziet.",
        },
      ],
    },
    {
      id: "menu",
      title: "2. Menu",
      blocks: [
        {
          type: "p",
          text: "De sectie “Menu” is het hart van het systeem. Hier bouw je de structuur op: categorieën → gerechten → opties. Open die via de navigatie.",
        },
        { type: "h3", text: "Categorieën en subcategorieën" },
        {
          type: "steps",
          items: [
            "Druk op “Categorie toevoegen” en voer een naam in (bijvoorbeeld “Voorgerechten”).",
            "Om een categorie te bewerken — beweeg eroverheen en druk op “Categorie bewerken”.",
            "De volgorde van categorieën wijzig je met de knoppen “Omhoog” / “Omlaag” — de gast ziet ze precies in die volgorde.",
            "Je kunt een “Groep” maken (via “Groep toevoegen”) — een sectie-categorie die andere categorieën bevat.",
          ],
        },
        { type: "h3", text: "Gerechten toevoegen" },
        {
          type: "steps",
          items: [
            "Klap een categorie open (pijl links) en druk op “Gerecht toevoegen”.",
            "Vul naam, prijs en beschrijving in.",
            "Voeg een foto toe: “Foto toevoegen” — upload je eigen, of druk op “Genereren” en beschrijf het gerecht in woorden zodat de AI een afbeelding maakt.",
            "Opslaan. Het gerecht verschijnt in de categorie.",
          ],
        },
        {
          type: "tip",
          text: "Een foto kan met AI worden gegenereerd: geef de hoek, belichting of achtergrond aan (bijvoorbeeld “Pizza Margherita op een houten plank, bovenaanzicht”).",
        },
        { type: "h3", text: "Opties en varianten (modifiers)" },
        {
          type: "p",
          text: "Opties zijn keuzes binnen een gerecht: maat, gaarheid, extra ingrediënten. Elke optie heeft varianten, en aan een variant kan een toeslag worden toegevoegd (bijvoorbeeld “+1.50 per stuk”).",
        },
        {
          type: "list",
          items: [
            "Voorbeeld: een optie “Maat” met varianten “Klein / Groot (+2.00)”.",
            "Voorbeeld: een optie “Extra” met meerdere varianten waaruit de gast er een of meer kiest.",
          ],
        },
        { type: "h3", text: "Allergenen en diëten" },
        {
          type: "p",
          text: "Bij een gerecht kun je allergenen (gluten, noten, enz.) en dieetlabels (vegetarisch, veganistisch) markeren. De gast ziet ze als pictogrammen in het openbare menu.",
        },
        { type: "h3", text: "Zichtbaarheid van gerechten" },
        {
          type: "p",
          text: "De knop “Gerecht verbergen” / “Gerecht tonen” haalt een item tijdelijk uit het openbare menu zonder het te verwijderen — handig als een gerecht op is.",
        },
        { type: "h3", text: "Een papieren menu uploaden (scan)" },
        {
          type: "p",
          text: "Heb je al een menu als foto of PDF — typ het niet met de hand. Gebruik scannen:",
        },
        {
          type: "steps",
          items: [
            "Druk op de banner “Menu uploaden” (of “Upload je papieren menu”).",
            "Voeg tot 5 bestanden toe (foto/scan, max 20 MB elk) en druk op “Scannen”.",
            "Wacht tot een minuut — de AI herkent categorieën en gerechten.",
            "Controleer het herkende, vink de gewenste items aan en druk op “Doorgaan”.",
            "Kies: het huidige menu vervangen of de nieuwe items aan het bestaande toevoegen.",
          ],
        },
        {
          type: "note",
          text: "De voorbeelden uit het startsjabloon worden verwijderd bij het opslaan van het gescande menu — dat is normaal.",
        },
      ],
    },
    {
      id: "tables",
      title: "3. Tafels en QR-codes",
      blocks: [
        {
          type: "p",
          text: "Tafels dienen om bestellingen en reserveringen aan specifieke plekken te koppelen en persoonlijke QR-codes af te drukken. Sectie: Instellingen → Tafels.",
        },
        { type: "h3", text: "Tafels aanmaken" },
        {
          type: "steps",
          items: [
            "Open Instellingen → Tafels en druk op “Tafel toevoegen”.",
            "Geef het tafelnummer, het aantal plaatsen en (optioneel) een naam op — bijvoorbeeld “Raam”, “Bar”, “Terras”.",
            "Voeg een foto van de tafel toe — gasten zien die en begrijpen precies waar hun tafel is.",
            "Stel een tafelkleur in — met die kleur wordt de tafel in de keuken en in de sectie “Bestellingen” gemarkeerd, zodat het personeel die snel vindt.",
            "Voeg eventueel een korte beschrijving toe.",
            "Opslaan.",
          ],
        },
        {
          type: "note",
          text: "De tafelfoto is voor gasten (oriëntatie “waar is mijn tafel”). De kleur is voor het personeel (een snelle visuele markering van de tafel in de keuken en bij bestellingen).",
        },
        { type: "h3", text: "QR-code van de tafel" },
        {
          type: "p",
          text: "Elke tafel heeft een eigen QR-code. De gast scant die met de telefoon en komt direct in het menu van die tafel — de bestelling wordt automatisch aan de juiste tafel gekoppeld.",
        },
        {
          type: "steps",
          items: [
            "Druk op “QR-code tonen” bij de gewenste tafel.",
            "Druk op “QR downloaden” om de afbeelding op te slaan.",
            "Druk die af en plaats die op de tafel (op een standaard, in het menu, op een sticker).",
          ],
        },
        {
          type: "tip",
          text: "De “Tafellink” is dezelfde link als de QR maar als tekst. Je kunt die de gast via een berichtenapp sturen.",
        },
      ],
    },
    {
      id: "orders",
      title: "4. Bestellingen",
      blocks: [
        { type: "h3", text: "Hoe de gast bestelt" },
        {
          type: "p",
          text: "De gast scant de QR op de tafel → het menu opent → kiest gerechten, opties en aantal → plaatst de bestelling. De bestelling verschijnt meteen in je dashboard en op de keuken-/bedieningsterminal.",
        },
        {
          type: "note",
          text: "Om gasten te laten bestellen, moet “Bestellingen accepteren” zijn ingeschakeld in Instellingen → Bestellingen. Staat het uit, dan ziet de gast het menu maar is er geen bestelknop.",
        },
        { type: "h3", text: "Bestellingen beheren in het dashboard" },
        {
          type: "p",
          text: "De sectie “Bestellingen” toont de plattegrond. Bezette tafels zijn gemarkeerd en tonen het aantal actieve bestellingen. Tik op een tafel om de bestellingen te openen.",
        },
        {
          type: "steps",
          items: [
            "Tik op een tafel → “Bestelling starten” (of open een bestaande).",
            "“Item toevoegen” → kies categorie → gerecht → opties → geef indien nodig aantal en notities op (bijvoorbeeld “zonder ui”).",
            "Druk op “Toevoegen” — het item komt in de bestelling.",
          ],
        },
        { type: "h3", text: "Statussen van items" },
        {
          type: "p",
          text: "Elk item heeft een status: In afwachting → In bereiding → Klaar → Geserveerd. Tik op een item om de status te wisselen. Statussen synchroniseren in realtime met de keuken.",
        },
        { type: "h3", text: "Kortingen, splitsen, tafel wisselen" },
        {
          type: "list",
          items: [
            "Korting: “Korting toevoegen” — percentage of vast bedrag, op de hele bestelling of een item, met reden.",
            "Bestelling splitsen: “Bestelling splitsen” — kies de items die naar een nieuwe, aparte rekening gaan.",
            "Tafel wisselen: “Tafel wisselen” — verplaats de bestelling naar een andere tafel.",
            "Item dupliceren: voeg snel nog een identiek item toe.",
          ],
        },
        { type: "h3", text: "Een bestelling afronden" },
        {
          type: "steps",
          items: [
            "Als alle items geserveerd zijn, druk je op “Bestelling afronden”.",
            "Kies een betaalmethode (als er methoden zijn ingesteld).",
            "De bestelling sluit en verlaat de lijst met actieve.",
          ],
        },
      ],
    },
    {
      id: "kitchen",
      title: "5. Keuken (KDS)",
      blocks: [
        {
          type: "p",
          text: "Het keukenscherm (KDS) is een scherm op een tablet voor de koks. Nieuwe bestellingen komen er in realtime op, en de kok markeert gerechten als klaar.",
        },
        { type: "h3", text: "Wat het scherm toont" },
        {
          type: "list",
          items: [
            "Bestelkaarten met items, opties en de tijd “aan de pas”.",
            "Kleurcodering van de status: wat in bereiding is, wat klaar is.",
            "Een geluidssignaal bij een nieuwe bestelling.",
          ],
        },
        { type: "h3", text: "Hoe het werkt" },
        {
          type: "steps",
          items: [
            "Tik op een item om het naar de volgende status te brengen (In bereiding → Klaar).",
            "Zet geluid aan met de knop “Geluid inschakelen” — dan komen nieuwe bestellingen met een geluidsmelding.",
            "Met zoom pas je de kaartgrootte aan de tablet aan.",
            "Met filters toon je alleen de gewenste categorieën (bijvoorbeeld alleen de warme lijn).",
          ],
        },
        {
          type: "note",
          text: "Als de tablet internet verliest, verschijnt de melding “Geen verbinding”. Verbind wifi en de bestellingen komen weer binnen.",
        },
      ],
    },
    {
      id: "reservations",
      title: "6. Reserveringen",
      blocks: [
        {
          type: "p",
          text: "Gasten kunnen via je menu een tafel reserveren, en jij beheert de reserveringen in de sectie “Reserveringen” (weergave “Maand” / “Dag”).",
        },
        { type: "h3", text: "Reserveringen instellen" },
        { type: "p", text: "Schakel reserveringen eerst in en configureer ze: Instellingen → Reserveringen." },
        {
          type: "steps",
          items: [
            "Schakel “Reserveringen inschakelen” in.",
            "Kies de bevestigingsmodus: “Automatisch” (reserveringen bevestigen zichzelf) of “Handmatig” (je bevestigt elke).",
            "Stel de “Reserveringsduur” in — hoelang de tafel voor de gast wordt vastgehouden.",
            "Vul het “Weekrooster” in: voor elke dag — open/gesloten, openingstijden en zo nodig de lunchpauze.",
          ],
        },
        {
          type: "note",
          text: "Voor reserveringen zijn tafels nodig. Zijn die er niet, dan vraagt het systeem om eerst tafels toe te voegen.",
        },
        { type: "h3", text: "Reserveringen beheren" },
        {
          type: "list",
          items: [
            "Nieuwe reserveringen die op een beslissing wachten staan in het blok “Wacht op bevestiging”.",
            "Knoppen “Bevestigen” / “Weigeren” — voor elke reservering.",
            "“Afronden” — markeert dat de gast is gekomen en de reservering is afgehandeld.",
            "Wissel tussen “Maand” en “Dag”, blader door de periode met “Vorige” / “Volgende”.",
          ],
        },
      ],
    },
    {
      id: "devices",
      title: "7. Apparaten (tablets)",
      blocks: [
        {
          type: "p",
          text: "De keuken-, bedienings- en reserveringsterminals zijn aparte tablets die met een code aan je account worden gekoppeld. Sectie: Instellingen → Apparaten.",
        },
        {
          type: "note",
          text: "Apparaten zijn beschikbaar met een betaald abonnement of tijdens een actieve proefperiode.",
        },
        { type: "h3", text: "Een tablet koppelen (pairing)" },
        {
          type: "steps",
          items: [
            "In het dashboard: Instellingen → Apparaten → “Apparaat toevoegen”.",
            "Geef een naam op (bijvoorbeeld “Keuken — warme lijn”) en een type: Keuken, Bediening of Reserveringen.",
            "Druk op “Code genereren” — een 6-cijferige code verschijnt (2 minuten geldig).",
            "Open op de tablet het koppelscherm en voer deze code in.",
            "De tablet koppelt en begint meteen te werken in de gekozen rol.",
          ],
        },
        { type: "tip", text: "Is de code verlopen — druk gewoon op “Nieuwe code” en voer de nieuwe in." },
        { type: "h3", text: "Apparaten beheren" },
        {
          type: "list",
          items: [
            "Statussen: Online / Offline / Wacht op koppeling / Ingetrokken.",
            "“Intrekken” — koppelt de tablet los (bijvoorbeeld bij verlies). Voor opnieuw inloggen is een nieuwe code nodig.",
            "“Verwijderen” — haalt het apparaat definitief uit de lijst.",
          ],
        },
      ],
    },
    {
      id: "analytics",
      title: "8. Analyses",
      blocks: [
        {
          type: "p",
          text: "De sectie “Analyses” toont de belangrijkste cijfers van de zaak: omzet, aantal bestellingen en de uitsplitsing daarvan (bijvoorbeeld per betaalmethode en per tijdstip). Gebruik die om te begrijpen wat het beste verkoopt en wanneer.",
        },
      ],
    },
    {
      id: "settings",
      title: "9. Instellingen",
      blocks: [
        {
          type: "p",
          text: "De sectie “Instellingen” opent als een set sectiekaarten. Bovenaan staat de schakelaar voor het actieve restaurant (als je er meer dan één hebt). Daaronder — elke kaart op volgorde.",
        },
        { type: "h3", text: "Website" },
        {
          type: "list",
          items: [
            "URL van het openbare menu — het unieke adres van je menu (je kunt een eigen korte slug instellen en de link kopiëren).",
            "De naam (titel) van de zaak op de openbare website.",
            "Accentkleur — de hoofdkleur van knoppen en accenten in het menu.",
            "Achtergrond — een afbeelding of video op de startpagina; upload je eigen of genereer een achtergrond met AI op basis van een beschrijving.",
            "Menu-indeling — hoe gerechten aan de gast worden getoond.",
          ],
        },
        { type: "h3", text: "Contacten en adres" },
        {
          type: "p",
          text: "Telefoon, Instagram, WhatsApp en een markering op de kaart — alles wordt de gast getoond op de contactpagina van je menu.",
        },
        { type: "h3", text: "Regio" },
        { type: "p", text: "Valuta (gebruikt voor alle prijzen) en tijdzone van de zaak." },
        { type: "h3", text: "Tafels" },
        { type: "p", text: "Plattegrond, plaatsen en QR-codes van tafels — in detail in sectie 3." },
        { type: "h3", text: "Apparaten" },
        {
          type: "p",
          text: "Tablets koppelen voor het keukenscherm en de bedieningsterminals — in detail in sectie 7.",
        },
        { type: "h3", text: "Bestellingen" },
        {
          type: "list",
          items: [
            "“Bestellingen accepteren” — de hoofdschakelaar voor het ontvangen van bestellingen.",
            "“Bestelmodus” — Intern en/of WhatsApp.",
            "“Verplichte velden” — welke gegevens de gast moet opgeven (Naam, Telefoon, Adres).",
            "“Betaalmethoden” — neem contact op met support om de betaalprovider van je restaurant te integreren.",
          ],
        },
        { type: "h3", text: "Reserveringen" },
        {
          type: "p",
          text: "Reserveringen inschakelen, automatische of handmatige bevestiging, duur en openingstijden — in detail in sectie 6.",
        },
        { type: "h3", text: "Talen" },
        {
          type: "steps",
          items: [
            "Open Instellingen → Talen.",
            "Kies de talen waarin het openbare menu wordt vertaald (tik om toe te voegen/te verwijderen).",
            "Stel de standaardtaal in.",
            "Teksten worden handmatig of met de knop “Vertalen met AI” vertaald — het systeem vertaalt de namen en beschrijvingen van gerechten naar de gekozen talen.",
          ],
        },
        { type: "h3", text: "Betaling" },
        { type: "p", text: "Abonnementspakket, status van de proefperiode en beheer van betalingen." },
        {
          type: "list",
          items: [
            "Maandelijkse of jaarlijkse facturering (jaarlijks is goedkoper).",
            "“Abonneren” / “Wisselen” — kies of wijzig een pakket.",
            "“Beheren” — wijzig de betaalmethode of zeg het abonnement op.",
          ],
        },
        {
          type: "note",
          text: "Betaling gebeurt in EUR. Neem voor betaling in een andere valuta contact op met support.",
        },
        { type: "h3", text: "Support" },
        {
          type: "p",
          text: "Een ingebouwde chat met ons team in realtime. Stuur een bericht — we antwoorden hier meteen.",
        },
        { type: "h3", text: "Restaurants wisselen en toevoegen" },
        {
          type: "p",
          text: "Heb je meerdere zaken, dan staat de restaurantschakelaar bovenaan de sectie “Instellingen”.",
        },
        {
          type: "steps",
          items: [
            "Open de restaurantschakelaar bovenaan de “Instellingen”.",
            "“Restaurant toevoegen” → voer een naam in.",
            "Kies “Huidig menu en instellingen dupliceren” (snelle start) of “Vanaf nul beginnen” (een leeg restaurant).",
            "Maak het aan — en wissel hier op elk moment tussen restaurants.",
          ],
        },
      ],
    },
    {
      id: "public-menu",
      title: "10. Het openbare menu voor gasten",
      blocks: [
        {
          type: "p",
          text: "Het openbare menu is wat de gast ziet na het scannen van de QR. Het wordt automatisch samengesteld uit je menu, je branding en je contacten.",
        },
        {
          type: "list",
          items: [
            "Het menuadres stel je in bij Instellingen → Regio (“Menulink”).",
            "De algemene QR-code en de menulink krijg je via de knop “Delen” op de pagina “Menu”.",
            "Elke tafel heeft een eigen aparte QR (Instellingen → Tafels) die naar het menu van precies die tafel leidt.",
            "Het uiterlijk (achtergrond, accentkleur, indeling) stel je in bij de sectie “Website”.",
            "De knop “Voorbeeld” opent het menu zoals de gast het ziet.",
          ],
        },
        {
          type: "tip",
          text: "Druk na elke wijziging aan menu/instellingen op “Voorbeeld” om te controleren hoe het er voor de gast uitziet.",
        },
      ],
    },
    {
      id: "faq",
      title: "11. Veelgestelde vragen en details",
      blocks: [
        { type: "h3", text: "De gast kan geen bestelling plaatsen" },
        {
          type: "p",
          text: "Controleer Instellingen → Bestellingen → “Bestellingen accepteren” (moet aan staan) en dat er minstens één bestelmodus is geselecteerd.",
        },
        { type: "h3", text: "Er komen geen reserveringen binnen" },
        {
          type: "p",
          text: "Zorg dat reserveringen zijn ingeschakeld in Instellingen → Reserveringen, dat er tafels zijn toegevoegd en dat de dag niet als “Gesloten” staat in het rooster.",
        },
        { type: "h3", text: "De tablet koppelt niet" },
        {
          type: "p",
          text: "De code is 2 minuten geldig. Is hij verlopen — genereer een nieuwe in Instellingen → Apparaten. Is het apparaat ingetrokken — maak een nieuwe code.",
        },
        { type: "h3", text: "Een gerecht is op" },
        {
          type: "p",
          text: "Verwijder het niet — druk op “Gerecht verbergen”. Het verdwijnt uit het openbare menu, en je haalt het terug met “Gerecht tonen”.",
        },
        { type: "h3", text: "Je hebt apparaten/terminals nodig maar hebt ze niet" },
        {
          type: "p",
          text: "De sectie “Apparaten” is beschikbaar met een betaald abonnement of tijdens een actieve proefperiode. Controleer Instellingen → Betaling.",
        },
        { type: "h3", text: "Nog vragen" },
        {
          type: "p",
          text: "Schrijf ons in Instellingen → Support — dat is een ingebouwde chat met ons team.",
        },
      ],
    },
  ],
};
