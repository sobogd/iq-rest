import type { HelpDoc } from "../types";

// DA help guide.
export const da: HelpDoc = {
  metaTitle: "Sådan bruger du IQ Rest — trin-for-trin-guide",
  metaDescription:
    "Komplet IQ Rest-guide: registrering, menu, bestillinger, reservationer, køkkenskærm og indstillinger — til restauranter.",
  h1: "Hjælp",
  intro: "En detaljeret guide til IQ Rest — fra registrering til de finere indstillinger.",
  banner: {
    title: "Det er nemmere, end det ser ud",
    sub: "En trin-for-trin-guide: fra registrering til de finere indstillinger — alle kan finde ud af det.",
    cta: "Sådan virker det",
  },
  tipLabel: "Tip",
  noteLabel: "Vigtigt",
  sections: [
    {
      id: "start",
      title: "1. Kom godt i gang",
      blocks: [
        { type: "h3", text: "Hvad er dette system" },
        {
          type: "p",
          text: "IQ Rest er en tjeneste til restauranter: du opretter en onlinemenu med QR-kode, modtager bestillinger og bordreservationer direkte fra gæsternes telefoner, mens køkkenet og tjenerne arbejder på tablet-terminaler. Alt styres fra ét adminpanel (dashboardet).",
        },
        { type: "h3", text: "Registrering og login" },
        { type: "p", text: "Du kan logge ind på tre måder — vælg en på loginskærmen:" },
        {
          type: "list",
          items: [
            "Med Google — klik på “Fortsæt med Google”, og vælg konto.",
            "Med Apple — klik på “Fortsæt med Apple”.",
            "Med e-mail — klik på “Fortsæt med e-mail”, indtast din adresse, så sender vi en 6-cifret kode. Indtast den på næste skærm. Ingen adgangskode nødvendig.",
          ],
        },
        {
          type: "note",
          text: "Via e-mail får du kun en engangskode til login — ingen spam, ingen nyhedsbreve.",
        },
        { type: "h3", text: "Opret restaurant (onboarding)" },
        {
          type: "p",
          text: "Ved første login guider systemet dig gennem en hurtig opsætning. Derefter oprettes der automatisk en restaurant med en eksempelmenu-skabelon, som du senere erstatter med din egen.",
        },
        {
          type: "steps",
          items: [
            "Angiv restaurantens navn.",
            "Vælg køkkentype (den bestemmer start-menuskabelonen).",
            "Færdig: du lander i dashboardet med en allerede udfyldt eksempelmenu.",
          ],
        },
        {
          type: "note",
          text: "Valutaen registreres automatisk ud fra din region — du behøver ikke vælge den i starten. Du kan ændre den senere i Indstillinger → Region.",
        },
        { type: "h3", text: "Overblik over dashboardet" },
        {
          type: "p",
          text: "Navigation mellem sektioner: på computeren en topbjælke, på telefonen en bundbjælke. Sektioner: Menu, Bestillinger, Reservationer, Køkken, Analyser og Indstillinger.",
        },
        {
          type: "list",
          items: [
            "Ved siden af restaurantnavnet i topbjælken er der en lille forbindelsesindikator: en grøn prik betyder, at bestillinger synkroniseres i realtid.",
            "På siden “Menu” øverst er der knappen “Forhåndsvis” — den åbner din menu, som gæsten ser den.",
            "Lige ved siden af knappen “Del” — den viser QR-koden og linket til menuen (kopiér link, download QR eller åbn menuen).",
          ],
        },
        {
          type: "tip",
          text: "Tryk på “Forhåndsvis” efter hver menuændring — du ser med det samme, hvordan det ser ud for gæsten.",
        },
      ],
    },
    {
      id: "menu",
      title: "2. Menu",
      blocks: [
        {
          type: "p",
          text: "Sektionen “Menu” er systemets hjerte. Her bygger du strukturen: kategorier → retter → tilvalg. Åbn den fra navigationen.",
        },
        { type: "h3", text: "Kategorier og underkategorier" },
        {
          type: "steps",
          items: [
            "Tryk på “Tilføj kategori”, og indtast et navn (for eksempel “Forretter”).",
            "For at redigere en kategori — hold musen over den, og tryk på “Rediger kategori”.",
            "Kategoriernes rækkefølge ændres med knapperne “Op” / “Ned” — præcis i den rækkefølge ser gæsten dem.",
            "Du kan oprette en “Gruppe” (via “Tilføj gruppe”) — en sektionskategori, der indeholder andre kategorier.",
          ],
        },
        { type: "h3", text: "Tilføj retter" },
        {
          type: "steps",
          items: [
            "Fold en kategori ud (pil til venstre), og tryk på “Tilføj ret”.",
            "Udfyld navn, pris og beskrivelse.",
            "Tilføj et foto: “Tilføj foto” — upload dit eget, eller tryk på “Generér”, og beskriv retten med ord, så AI laver et billede.",
            "Gem. Retten vises i kategorien.",
          ],
        },
        {
          type: "tip",
          text: "Et foto kan genereres med AI: angiv vinkel, lys eller baggrund (for eksempel “Pizza Margherita på et træbræt, set ovenfra”).",
        },
        { type: "h3", text: "Tilvalg og varianter (modifikatorer)" },
        {
          type: "p",
          text: "Tilvalg er valg inden i en ret: størrelse, stegning, ekstra ingredienser. Hvert tilvalg har varianter, og der kan tilføjes et tillæg til en variant (for eksempel “+1.50 pr. stk.”).",
        },
        {
          type: "list",
          items: [
            "Eksempel: et tilvalg “Størrelse” med varianterne “Lille / Stor (+2.00)”.",
            "Eksempel: et tilvalg “Ekstra” med flere varianter, hvor gæsten vælger en eller flere.",
          ],
        },
        { type: "h3", text: "Allergener og diæter" },
        {
          type: "p",
          text: "På en ret kan du markere allergener (gluten, nødder osv.) og kostmærker (vegetarisk, vegansk). Gæsten ser dem som ikoner i den offentlige menu.",
        },
        { type: "h3", text: "Retternes synlighed" },
        {
          type: "p",
          text: "Knappen “Skjul ret” / “Vis ret” fjerner midlertidigt en post fra den offentlige menu uden at slette den — praktisk, når en ret er udsolgt.",
        },
        { type: "h3", text: "Upload en papirmenu (scanning)" },
        {
          type: "p",
          text: "Har du allerede en menu som foto eller PDF — så indtast den ikke i hånden. Brug scanning:",
        },
        {
          type: "steps",
          items: [
            "Tryk på banneret “Upload menu” (eller “Upload din papirmenu”).",
            "Tilføj op til 5 filer (foto/scan, op til 20 MB hver), og tryk på “Scan”.",
            "Vent op til et minut — AI genkender kategorier og retter.",
            "Tjek det genkendte, marker de ønskede poster, og tryk på “Fortsæt”.",
            "Vælg: erstat den nuværende menu, eller tilføj de nye poster til den eksisterende.",
          ],
        },
        {
          type: "note",
          text: "Eksemplerne fra startskabelonen fjernes, når du gemmer den scannede menu — det er normalt.",
        },
      ],
    },
    {
      id: "tables",
      title: "3. Borde og QR-koder",
      blocks: [
        {
          type: "p",
          text: "Borde bruges til at knytte bestillinger og reservationer til bestemte pladser og til at printe personlige QR-koder. Sektion: Indstillinger → Borde.",
        },
        { type: "h3", text: "Opret borde" },
        {
          type: "steps",
          items: [
            "Åbn Indstillinger → Borde, og tryk på “Tilføj bord”.",
            "Angiv bordnummer, antal pladser og (valgfrit) et navn — for eksempel “Vindue”, “Bar”, “Terrasse”.",
            "Tilføj et bordfoto — gæsterne ser det og forstår præcis, hvor deres bord er.",
            "Angiv en bordfarve — med den farve fremhæves bordet i køkkenet og i sektionen “Bestillinger”, så personalet hurtigt finder det.",
            "Tilføj eventuelt en kort beskrivelse.",
            "Gem.",
          ],
        },
        {
          type: "note",
          text: "Bordfotoet er til gæsterne (orientering “hvor er mit bord”). Farven er til personalet (en hurtig visuel markering af bordet i køkkenet og i bestillingerne).",
        },
        { type: "h3", text: "Bordets QR-kode" },
        {
          type: "p",
          text: "Hvert bord har sin egen QR-kode. Gæsten scanner den med telefonen og lander direkte i det bords menu — bestillingen knyttes automatisk til det rigtige bord.",
        },
        {
          type: "steps",
          items: [
            "Tryk på “Vis QR-kode” ved det ønskede bord.",
            "Tryk på “Download QR” for at gemme billedet.",
            "Print den, og placer den på bordet (på en holder, i menuen, på et klistermærke).",
          ],
        },
        {
          type: "tip",
          text: "“Bordlinket” er det samme link som i QR’en, men som tekst. Du kan sende det til gæsten i en besked.",
        },
      ],
    },
    {
      id: "orders",
      title: "4. Bestillinger",
      blocks: [
        { type: "h3", text: "Sådan bestiller gæsten" },
        {
          type: "p",
          text: "Gæsten scanner QR’en på bordet → menuen åbnes → vælger retter, tilvalg og antal → afgiver bestillingen. Bestillingen vises straks i dit dashboard og på køkken-/tjenerterminalen.",
        },
        {
          type: "note",
          text: "For at gæster kan bestille, skal “Modtag bestillinger” være slået til i Indstillinger → Bestillinger. Er det fra, ser gæsten menuen, men der er ingen bestillingsknap.",
        },
        { type: "h3", text: "Håndter bestillinger i dashboardet" },
        {
          type: "p",
          text: "Sektionen “Bestillinger” viser planløsningen. Optagne borde er fremhævet og viser antallet af aktive bestillinger. Tryk på et bord for at åbne dets bestillinger.",
        },
        {
          type: "steps",
          items: [
            "Tryk på et bord → “Start bestilling” (eller åbn en eksisterende).",
            "“Tilføj vare” → vælg kategori → ret → tilvalg → angiv om nødvendigt antal og noter (for eksempel “uden løg”).",
            "Tryk på “Tilføj” — varen kommer i bestillingen.",
          ],
        },
        { type: "h3", text: "Varernes status" },
        {
          type: "p",
          text: "Hver vare har en status: Afventer → Tilberedes → Klar → Serveret. Tryk på en vare for at skifte status. Statusserne synkroniseres med køkkenet i realtid.",
        },
        { type: "h3", text: "Rabatter, opdeling, skift bord" },
        {
          type: "list",
          items: [
            "Rabat: “Tilføj rabat” — procent eller fast beløb, på hele bestillingen eller en vare, med begrundelse.",
            "Opdel bestilling: “Opdel bestilling” — vælg de varer, der skal på en ny separat regning.",
            "Skift bord: “Skift bord” — flyt bestillingen til et andet bord.",
            "Dupliker vare: tilføj hurtigt en mere af samme slags.",
          ],
        },
        { type: "h3", text: "Afslut en bestilling" },
        {
          type: "steps",
          items: [
            "Når alle varer er serveret, tryk på “Afslut bestilling”.",
            "Vælg en betalingsmetode (hvis metoder er konfigureret).",
            "Bestillingen lukkes og forlader listen over aktive.",
          ],
        },
      ],
    },
    {
      id: "kitchen",
      title: "5. Køkken (KDS)",
      blocks: [
        {
          type: "p",
          text: "Køkkenskærmen (KDS) er en skærm på en tablet til kokkene. Nye bestillinger lander på den i realtid, og kokken markerer retter som klar.",
        },
        { type: "h3", text: "Hvad skærmen viser" },
        {
          type: "list",
          items: [
            "Bestillingskort med varer, tilvalg og tiden “på passet”.",
            "Farvemarkering af status: hvad der tilberedes, hvad der er klar.",
            "Et lydsignal, når en ny bestilling kommer ind.",
          ],
        },
        { type: "h3", text: "Sådan bruges den" },
        {
          type: "steps",
          items: [
            "Tryk på en vare for at flytte den til næste status (Tilberedes → Klar).",
            "Slå lyd til med knappen “Slå lyd til” — så kommer nye bestillinger med et lydsignal.",
            "Med zoom justerer du kortstørrelsen til tabletten.",
            "Med filtre kan du vise kun de kategorier, du har brug for (for eksempel kun den varme linje).",
          ],
        },
        {
          type: "note",
          text: "Hvis tabletten mister internet, vises advarslen “Ingen forbindelse”. Tilslut Wi-Fi, så begynder bestillingerne at komme igen.",
        },
      ],
    },
    {
      id: "reservations",
      title: "6. Reservationer",
      blocks: [
        {
          type: "p",
          text: "Gæster kan reservere bord via din menu, og du håndterer reservationer i sektionen “Reservationer” (visning “Måned” / “Dag”).",
        },
        { type: "h3", text: "Opsæt reservationer" },
        { type: "p", text: "Slå reservationer til og konfigurer dem først: Indstillinger → Reservationer." },
        {
          type: "steps",
          items: [
            "Slå “Aktivér reservationer” til.",
            "Vælg bekræftelsestilstand: “Automatisk” (reservationer bekræftes selv) eller “Manuel” (du bekræfter hver enkelt).",
            "Angiv “Reservationens varighed” — hvor længe bordet holdes til gæsten.",
            "Udfyld “Ugeskemaet”: for hver dag — åben/lukket, åbningstider og om nødvendigt frokostpause.",
          ],
        },
        {
          type: "note",
          text: "For at modtage reservationer skal der være borde. Er der ingen, beder systemet dig først tilføje borde.",
        },
        { type: "h3", text: "Håndter reservationer" },
        {
          type: "list",
          items: [
            "Nye reservationer, der venter på en beslutning, er samlet i blokken “Afventer bekræftelse”.",
            "Knapperne “Bekræft” / “Afvis” — for hver reservation.",
            "“Afslut” — markerer, at gæsten er kommet, og reservationen er ekspederet.",
            "Skift mellem “Måned” og “Dag”, bladr gennem perioden med “Tilbage” / “Frem”.",
          ],
        },
      ],
    },
    {
      id: "devices",
      title: "7. Enheder (tablets)",
      blocks: [
        {
          type: "p",
          text: "Køkken-, tjener- og reservationsterminalerne er separate tablets, der forbindes til din konto med en kode. Sektion: Indstillinger → Enheder.",
        },
        {
          type: "note",
          text: "Enheder er tilgængelige med et betalt abonnement eller i en aktiv prøveperiode.",
        },
        { type: "h3", text: "Tilslut en tablet (parring)" },
        {
          type: "steps",
          items: [
            "I dashboardet: Indstillinger → Enheder → “Tilføj enhed”.",
            "Angiv et navn (for eksempel “Køkken — varm linje”) og en type: Køkken, Tjener eller Reservationer.",
            "Tryk på “Generér kode” — en 6-cifret kode vises (gyldig i 2 minutter).",
            "Åbn forbindelsesskærmen på tabletten, og indtast koden.",
            "Tabletten forbindes og begynder straks at arbejde i den valgte rolle.",
          ],
        },
        { type: "tip", text: "Hvis koden er udløbet — tryk blot på “Ny kode”, og indtast den friske." },
        { type: "h3", text: "Administrer enheder" },
        {
          type: "list",
          items: [
            "Statusser: Online / Offline / Afventer forbindelse / Tilbagekaldt.",
            "“Tilbagekald” — afbryder tabletten (for eksempel hvis den mistes). Der kræves en ny kode for at logge ind igen.",
            "“Slet” — fjerner enheden permanent fra listen.",
          ],
        },
      ],
    },
    {
      id: "analytics",
      title: "8. Analyser",
      blocks: [
        {
          type: "p",
          text: "Sektionen “Analyser” viser de vigtigste tal for stedet: omsætning, antal bestillinger og deres fordeling (for eksempel pr. betalingsmetode og tidspunkt). Brug den til at forstå, hvad der sælger bedst og hvornår.",
        },
      ],
    },
    {
      id: "settings",
      title: "9. Indstillinger",
      blocks: [
        {
          type: "p",
          text: "Sektionen “Indstillinger” åbner som et sæt sektionskort. Øverst er der en vælger for den aktive restaurant (hvis du har flere). Nedenunder — hvert kort i rækkefølge.",
        },
        { type: "h3", text: "Websted" },
        {
          type: "list",
          items: [
            "Den offentlige menus URL — din menus unikke adresse (du kan angive din egen korte slug og kopiere linket).",
            "Stedets navn (titel) på det offentlige websted.",
            "Accentfarve — hovedfarven på knapper og fremhævninger i menuen.",
            "Baggrund — et billede eller en video på forsiden; upload din egen eller generér en baggrund med AI ud fra en beskrivelse.",
            "Menulayout — hvordan retterne vises for gæsten.",
          ],
        },
        { type: "h3", text: "Kontakter og adresse" },
        {
          type: "p",
          text: "Telefon, Instagram, WhatsApp og en kortmarkør — alt vises for gæsten på din menus kontaktside.",
        },
        { type: "h3", text: "Region" },
        { type: "p", text: "Valuta (bruges til alle priser) og stedets tidszone." },
        { type: "h3", text: "Borde" },
        { type: "p", text: "Planløsning, pladser og bordenes QR-koder — i detaljer i sektion 3." },
        { type: "h3", text: "Enheder" },
        {
          type: "p",
          text: "Tilslut tablets til køkkenskærmen og tjenerterminalerne — i detaljer i sektion 7.",
        },
        { type: "h3", text: "Bestillinger" },
        {
          type: "list",
          items: [
            "“Modtag bestillinger” — hovedkontakten for at modtage bestillinger.",
            "“Bestillingstilstand” — Intern og/eller WhatsApp.",
            "“Obligatoriske felter” — hvilke oplysninger gæsten skal angive (Navn, Telefon, Adresse).",
            "“Betalingsmetoder” — kontakt supporten for at integrere restaurantens betalingssystem.",
          ],
        },
        { type: "h3", text: "Reservationer" },
        {
          type: "p",
          text: "Aktivér reservationer, automatisk eller manuel bekræftelse, varighed og åbningstider — i detaljer i sektion 6.",
        },
        { type: "h3", text: "Sprog" },
        {
          type: "steps",
          items: [
            "Åbn Indstillinger → Sprog.",
            "Vælg de sprog, den offentlige menu oversættes til (tryk for at tilføje/fjerne).",
            "Angiv standardsproget.",
            "Tekster oversættes manuelt eller med knappen “Oversæt med AI” — systemet oversætter retternes navne og beskrivelser til de valgte sprog.",
          ],
        },
        { type: "h3", text: "Betaling" },
        { type: "p", text: "Abonnementsplan, prøveperiodens status og styring af betalinger." },
        {
          type: "list",
          items: [
            "Månedlig eller årlig fakturering (årlig er billigere).",
            "“Abonnér” / “Skift” — vælg eller skift plan.",
            "“Administrer” — skift betalingsmetode eller opsig abonnementet.",
          ],
        },
        {
          type: "note",
          text: "Betaling sker i EUR. Kontakt supporten for at betale i en anden valuta.",
        },
        { type: "h3", text: "Support" },
        {
          type: "p",
          text: "En indbygget chat med vores team i realtid. Skriv en besked — vi svarer her med det samme.",
        },
        { type: "h3", text: "Skift og tilføj restauranter" },
        {
          type: "p",
          text: "Har du flere steder, er restaurantvælgeren øverst i sektionen “Indstillinger”.",
        },
        {
          type: "steps",
          items: [
            "Åbn restaurantvælgeren øverst i “Indstillinger”.",
            "“Tilføj restaurant” → indtast et navn.",
            "Vælg “Dupliker nuværende menu og indstillinger” (hurtig start) eller “Start fra bunden” (en tom restaurant).",
            "Opret den — og skift mellem restauranter når som helst lige her.",
          ],
        },
      ],
    },
    {
      id: "public-menu",
      title: "10. Den offentlige menu for gæster",
      blocks: [
        {
          type: "p",
          text: "Den offentlige menu er det, gæsten ser efter at have scannet QR’en. Den sammensættes automatisk af din menu, din branding og dine kontakter.",
        },
        {
          type: "list",
          items: [
            "Menuens adresse angives i Indstillinger → Region (“Menulink”).",
            "Den generelle QR-kode og menulinket får du via knappen “Del” på siden “Menu”.",
            "Hvert bord har sin egen separate QR (Indstillinger → Borde), der fører til netop det bords menu.",
            "Udseendet (baggrund, accentfarve, layout) konfigureres i sektionen “Websted”.",
            "Knappen “Forhåndsvis” åbner menuen, som gæsten ser den.",
          ],
        },
        {
          type: "tip",
          text: "Tryk på “Forhåndsvis” efter enhver menu-/indstillingsændring for at tjekke, hvordan det ser ud for gæsten.",
        },
      ],
    },
    {
      id: "faq",
      title: "11. Ofte stillede spørgsmål og detaljer",
      blocks: [
        { type: "h3", text: "Gæsten kan ikke afgive en bestilling" },
        {
          type: "p",
          text: "Tjek Indstillinger → Bestillinger → “Modtag bestillinger” (skal være slået til), og at mindst én bestillingstilstand er valgt.",
        },
        { type: "h3", text: "Der kommer ingen reservationer" },
        {
          type: "p",
          text: "Sørg for, at reservationer er slået til i Indstillinger → Reservationer, at der er tilføjet borde, og at dagen ikke er markeret som “Lukket” i skemaet.",
        },
        { type: "h3", text: "Tabletten forbinder ikke" },
        {
          type: "p",
          text: "Koden er gyldig i 2 minutter. Er den udløbet — generér en ny i Indstillinger → Enheder. Er enheden tilbagekaldt — opret en ny kode.",
        },
        { type: "h3", text: "En ret er udsolgt" },
        {
          type: "p",
          text: "Slet den ikke — tryk på “Skjul ret”. Den forsvinder fra den offentlige menu, og du henter den tilbage med “Vis ret”.",
        },
        { type: "h3", text: "Du har brug for enheder/terminaler, men har ingen" },
        {
          type: "p",
          text: "Sektionen “Enheder” er tilgængelig med et betalt abonnement eller i en aktiv prøveperiode. Tjek Indstillinger → Betaling.",
        },
        { type: "h3", text: "Har du flere spørgsmål" },
        {
          type: "p",
          text: "Skriv til os i Indstillinger → Support — det er en indbygget chat med vores team.",
        },
      ],
    },
  ],
};
