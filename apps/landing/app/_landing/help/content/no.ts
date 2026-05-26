import type { HelpDoc } from "../types";

// NO help guide.
export const no: HelpDoc = {
  metaTitle: "Slik bruker du IQ Rest — trinn-for-trinn-guide",
  metaDescription:
    "Komplett IQ Rest-guide: registrering, meny, bestillinger, reservasjoner, kjøkkenskjerm og innstillinger — for restauranter.",
  h1: "Hjelp",
  intro: "En detaljert guide til IQ Rest — fra registrering til de finere innstillingene.",
  banner: {
    title: "Det er enklere enn det ser ut",
    sub: "En trinn-for-trinn-guide: fra registrering til de finere innstillingene — alle får det til.",
    cta: "Slik fungerer det",
  },
  tipLabel: "Tips",
  noteLabel: "Viktig",
  sections: [
    {
      id: "start",
      title: "1. Kom i gang",
      blocks: [
        { type: "h3", text: "Hva er dette systemet" },
        {
          type: "p",
          text: "IQ Rest er en tjeneste for restauranter: du lager en nettmeny med QR-kode, mottar bestillinger og bordreservasjoner rett fra gjestenes telefoner, mens kjøkkenet og servitørene jobber på nettbrett-terminaler. Alt styres fra ett adminpanel (dashbordet).",
        },
        { type: "h3", text: "Registrering og innlogging" },
        { type: "p", text: "Du kan logge inn på tre måter — velg én på innloggingsskjermen:" },
        {
          type: "list",
          items: [
            "Med Google — klikk på «Fortsett med Google», og velg konto.",
            "Med Apple — klikk på «Fortsett med Apple».",
            "Med e-post — klikk på «Fortsett med e-post», skriv inn adressen din, så sender vi en 6-sifret kode. Skriv den inn på neste skjerm. Ingen passord nødvendig.",
          ],
        },
        {
          type: "note",
          text: "Via e-post får du bare en engangskode for innlogging — ingen spam, ingen nyhetsbrev.",
        },
        { type: "h3", text: "Opprett restaurant (onboarding)" },
        {
          type: "p",
          text: "Ved første innlogging leder systemet deg gjennom et raskt oppsett. Deretter opprettes det automatisk en restaurant med en eksempelmeny-mal som du senere bytter ut med din egen.",
        },
        {
          type: "steps",
          items: [
            "Oppgi restaurantens navn.",
            "Velg kjøkkentype (den bestemmer start-menymalen).",
            "Ferdig: du havner i dashbordet med en allerede utfylt eksempelmeny.",
          ],
        },
        {
          type: "note",
          text: "Valutaen oppdages automatisk ut fra regionen din — du trenger ikke velge den i starten. Du kan endre den senere i Innstillinger → Region.",
        },
        { type: "h3", text: "Oversikt over dashbordet" },
        {
          type: "p",
          text: "Navigering mellom seksjoner: på datamaskinen en topplinje, på telefonen en bunnlinje. Seksjoner: Meny, Bestillinger, Reservasjoner, Kjøkken, Analyser og Innstillinger.",
        },
        {
          type: "list",
          items: [
            "Ved siden av restaurantnavnet i topplinjen er det en liten tilkoblingsindikator: en grønn prikk betyr at bestillinger synkroniseres i sanntid.",
            "På siden «Meny» øverst er det knappen «Forhåndsvis» — den åpner menyen din slik gjesten ser den.",
            "Rett ved siden av knappen «Del» — den viser QR-koden og lenken til menyen (kopier lenken, last ned QR eller åpne menyen).",
          ],
        },
        {
          type: "tip",
          text: "Trykk på «Forhåndsvis» etter hver menyendring — du ser med en gang hvordan det ser ut for gjesten.",
        },
      ],
    },
    {
      id: "menu",
      title: "2. Meny",
      blocks: [
        {
          type: "p",
          text: "Seksjonen «Meny» er hjertet i systemet. Her bygger du strukturen: kategorier → retter → valg. Åpne den fra navigasjonen.",
        },
        { type: "h3", text: "Kategorier og underkategorier" },
        {
          type: "steps",
          items: [
            "Trykk på «Legg til kategori», og skriv inn et navn (for eksempel «Forretter»).",
            "For å redigere en kategori — hold over den, og trykk på «Rediger kategori».",
            "Rekkefølgen på kategoriene endrer du med knappene «Opp» / «Ned» — i nøyaktig den rekkefølgen ser gjesten dem.",
            "Du kan opprette en «Gruppe» (via «Legg til gruppe») — en seksjonskategori som inneholder andre kategorier.",
          ],
        },
        { type: "h3", text: "Legge til retter" },
        {
          type: "steps",
          items: [
            "Fold ut en kategori (pil til venstre), og trykk på «Legg til rett».",
            "Fyll ut navn, pris og beskrivelse.",
            "Legg til et bilde: «Legg til bilde» — last opp ditt eget, eller trykk på «Generer», og beskriv retten med ord så AI lager et bilde.",
            "Lagre. Retten vises i kategorien.",
          ],
        },
        {
          type: "tip",
          text: "Et bilde kan genereres med AI: oppgi vinkel, lys eller bakgrunn (for eksempel «Pizza Margherita på en trefjøl, sett ovenfra»).",
        },
        { type: "h3", text: "Valg og varianter (modifikatorer)" },
        {
          type: "p",
          text: "Valg er valgmuligheter inni en rett: størrelse, steking, ekstra ingredienser. Hvert valg har varianter, og et tillegg kan legges til en variant (for eksempel «+1.50 per stk.»).",
        },
        {
          type: "list",
          items: [
            "Eksempel: et valg «Størrelse» med variantene «Liten / Stor (+2.00)».",
            "Eksempel: et valg «Ekstra» med flere varianter der gjesten velger én eller flere.",
          ],
        },
        { type: "h3", text: "Allergener og dietter" },
        {
          type: "p",
          text: "På en rett kan du merke allergener (gluten, nøtter osv.) og kostmerker (vegetarisk, vegansk). Gjesten ser dem som ikoner i den offentlige menyen.",
        },
        { type: "h3", text: "Rettenes synlighet" },
        {
          type: "p",
          text: "Knappen «Skjul rett» / «Vis rett» fjerner midlertidig en post fra den offentlige menyen uten å slette den — praktisk når en rett er utsolgt.",
        },
        { type: "h3", text: "Last opp en papirmeny (skanning)" },
        {
          type: "p",
          text: "Har du allerede en meny som bilde eller PDF — ikke skriv den inn for hånd. Bruk skanning:",
        },
        {
          type: "steps",
          items: [
            "Trykk på banneret «Last opp meny» (eller «Last opp papirmenyen din»).",
            "Legg til opptil 5 filer (bilde/skann, opptil 20 MB hver), og trykk på «Skann».",
            "Vent opptil ett minutt — AI gjenkjenner kategorier og retter.",
            "Sjekk det gjenkjente, merk ønskede poster, og trykk på «Fortsett».",
            "Velg: erstatt den nåværende menyen, eller legg de nye postene til den eksisterende.",
          ],
        },
        {
          type: "note",
          text: "Eksemplene fra startmalen fjernes når du lagrer den skannede menyen — det er normalt.",
        },
      ],
    },
    {
      id: "tables",
      title: "3. Bord og QR-koder",
      blocks: [
        {
          type: "p",
          text: "Bord brukes til å knytte bestillinger og reservasjoner til bestemte plasser og til å skrive ut personlige QR-koder. Seksjon: Innstillinger → Bord.",
        },
        { type: "h3", text: "Opprette bord" },
        {
          type: "steps",
          items: [
            "Åpne Innstillinger → Bord, og trykk på «Legg til bord».",
            "Oppgi bordnummer, antall plasser og (valgfritt) et navn — for eksempel «Vindu», «Bar», «Terrasse».",
            "Legg til et bordbilde — gjestene ser det og forstår nøyaktig hvor bordet deres er.",
            "Angi en bordfarge — med den fargen fremheves bordet på kjøkkenet og i seksjonen «Bestillinger», så personalet finner det raskt.",
            "Legg eventuelt til en kort beskrivelse.",
            "Lagre.",
          ],
        },
        {
          type: "note",
          text: "Bordbildet er for gjestene (orientering «hvor er bordet mitt»). Fargen er for personalet (en rask visuell markering av bordet på kjøkkenet og i bestillingene).",
        },
        { type: "h3", text: "Bordets QR-kode" },
        {
          type: "p",
          text: "Hvert bord har sin egen QR-kode. Gjesten skanner den med telefonen og havner rett i det bordets meny — bestillingen knyttes automatisk til riktig bord.",
        },
        {
          type: "steps",
          items: [
            "Trykk på «Vis QR-kode» ved ønsket bord.",
            "Trykk på «Last ned QR» for å lagre bildet.",
            "Skriv den ut, og plasser den på bordet (på en holder, i menyen, på et klistremerke).",
          ],
        },
        {
          type: "tip",
          text: "«Bordlenken» er samme lenke som i QR-en, men som tekst. Du kan sende den til gjesten i en melding.",
        },
      ],
    },
    {
      id: "orders",
      title: "4. Bestillinger",
      blocks: [
        { type: "h3", text: "Slik bestiller gjesten" },
        {
          type: "p",
          text: "Gjesten skanner QR-en på bordet → menyen åpnes → velger retter, valg og antall → legger inn bestillingen. Bestillingen vises umiddelbart i dashbordet ditt og på kjøkken-/servitørterminalen.",
        },
        {
          type: "note",
          text: "For at gjester skal kunne bestille, må «Ta imot bestillinger» være slått på i Innstillinger → Bestillinger. Er det av, ser gjesten menyen, men det finnes ingen bestillingsknapp.",
        },
        { type: "h3", text: "Håndtere bestillinger i dashbordet" },
        {
          type: "p",
          text: "Seksjonen «Bestillinger» viser planløsningen. Opptatte bord er fremhevet og viser antall aktive bestillinger. Trykk på et bord for å åpne bestillingene.",
        },
        {
          type: "steps",
          items: [
            "Trykk på et bord → «Start bestilling» (eller åpne en eksisterende).",
            "«Legg til vare» → velg kategori → rett → valg → oppgi om nødvendig antall og notater (for eksempel «uten løk»).",
            "Trykk på «Legg til» — varen kommer i bestillingen.",
          ],
        },
        { type: "h3", text: "Varenes status" },
        {
          type: "p",
          text: "Hver vare har en status: Venter → Tilberedes → Klar → Servert. Trykk på en vare for å bytte status. Statusene synkroniseres med kjøkkenet i sanntid.",
        },
        { type: "h3", text: "Rabatter, deling, bytte bord" },
        {
          type: "list",
          items: [
            "Rabatt: «Legg til rabatt» — prosent eller fast beløp, på hele bestillingen eller en vare, med begrunnelse.",
            "Del bestilling: «Del bestilling» — velg varene som skal på en ny separat regning.",
            "Bytt bord: «Bytt bord» — flytt bestillingen til et annet bord.",
            "Dupliser vare: legg raskt til en til av samme.",
          ],
        },
        { type: "h3", text: "Fullføre en bestilling" },
        {
          type: "steps",
          items: [
            "Når alle varer er servert, trykk på «Fullfør bestilling».",
            "Velg en betalingsmetode (hvis metoder er konfigurert).",
            "Bestillingen lukkes og forlater listen over aktive.",
          ],
        },
      ],
    },
    {
      id: "kitchen",
      title: "5. Kjøkken (KDS)",
      blocks: [
        {
          type: "p",
          text: "Kjøkkenskjermen (KDS) er en skjerm på et nettbrett for kokkene. Nye bestillinger lander på den i sanntid, og kokken merker retter som klare.",
        },
        { type: "h3", text: "Hva skjermen viser" },
        {
          type: "list",
          items: [
            "Bestillingskort med varer, valg og tiden «på passet».",
            "Fargemarkering av status: hva som tilberedes, hva som er klart.",
            "Et lydsignal når en ny bestilling kommer inn.",
          ],
        },
        { type: "h3", text: "Slik brukes den" },
        {
          type: "steps",
          items: [
            "Trykk på en vare for å flytte den til neste status (Tilberedes → Klar).",
            "Slå på lyd med knappen «Slå på lyd» — da kommer nye bestillinger med et lydsignal.",
            "Med zoom justerer du kortstørrelsen til nettbrettet.",
            "Med filtre kan du vise kun kategoriene du trenger (for eksempel kun den varme linjen).",
          ],
        },
        {
          type: "note",
          text: "Hvis nettbrettet mister internett, vises advarselen «Ingen tilkobling». Koble til Wi-Fi, så begynner bestillingene å komme igjen.",
        },
      ],
    },
    {
      id: "reservations",
      title: "6. Reservasjoner",
      blocks: [
        {
          type: "p",
          text: "Gjester kan reservere bord via menyen din, og du håndterer reservasjoner i seksjonen «Reservasjoner» (visning «Måned» / «Dag»).",
        },
        { type: "h3", text: "Sette opp reservasjoner" },
        { type: "p", text: "Slå på og konfigurer reservasjoner først: Innstillinger → Reservasjoner." },
        {
          type: "steps",
          items: [
            "Slå på «Aktiver reservasjoner».",
            "Velg bekreftelsesmodus: «Automatisk» (reservasjoner bekreftes av seg selv) eller «Manuell» (du bekrefter hver enkelt).",
            "Angi «Reservasjonens varighet» — hvor lenge bordet holdes for gjesten.",
            "Fyll ut «Ukeplanen»: for hver dag — åpent/stengt, åpningstider og om nødvendig lunsjpause.",
          ],
        },
        {
          type: "note",
          text: "For å ta imot reservasjoner trengs bord. Finnes ingen, ber systemet deg legge til bord først.",
        },
        { type: "h3", text: "Håndtere reservasjoner" },
        {
          type: "list",
          items: [
            "Nye reservasjoner som venter på en beslutning, er samlet i blokken «Venter på bekreftelse».",
            "Knappene «Bekreft» / «Avslå» — for hver reservasjon.",
            "«Fullfør» — markerer at gjesten har kommet og reservasjonen er ekspedert.",
            "Bytt mellom «Måned» og «Dag», bla gjennom perioden med «Tilbake» / «Frem».",
          ],
        },
      ],
    },
    {
      id: "devices",
      title: "7. Enheter (nettbrett)",
      blocks: [
        {
          type: "p",
          text: "Kjøkken-, servitør- og reservasjonsterminalene er separate nettbrett som kobles til kontoen din med en kode. Seksjon: Innstillinger → Enheter.",
        },
        {
          type: "note",
          text: "Enheter er tilgjengelige med et betalt abonnement eller i en aktiv prøveperiode.",
        },
        { type: "h3", text: "Koble til et nettbrett (paring)" },
        {
          type: "steps",
          items: [
            "I dashbordet: Innstillinger → Enheter → «Legg til enhet».",
            "Oppgi et navn (for eksempel «Kjøkken — varm linje») og en type: Kjøkken, Servitør eller Reservasjoner.",
            "Trykk på «Generer kode» — en 6-sifret kode vises (gyldig i 2 minutter).",
            "Åpne tilkoblingsskjermen på nettbrettet, og skriv inn koden.",
            "Nettbrettet kobles til og begynner straks å jobbe i den valgte rollen.",
          ],
        },
        { type: "tip", text: "Hvis koden er utløpt — trykk bare på «Ny kode», og skriv inn den ferske." },
        { type: "h3", text: "Administrere enheter" },
        {
          type: "list",
          items: [
            "Statuser: Online / Offline / Venter på tilkobling / Tilbakekalt.",
            "«Tilbakekall» — kobler fra nettbrettet (for eksempel ved tap). En ny kode trengs for å logge inn igjen.",
            "«Slett» — fjerner enheten permanent fra listen.",
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
          text: "Seksjonen «Analyser» viser de viktigste tallene for stedet: omsetning, antall bestillinger og fordelingen av dem (for eksempel per betalingsmetode og tidspunkt). Bruk den til å forstå hva som selger best og når.",
        },
      ],
    },
    {
      id: "settings",
      title: "9. Innstillinger",
      blocks: [
        {
          type: "p",
          text: "Seksjonen «Innstillinger» åpnes som et sett med seksjonskort. Øverst er det en velger for aktiv restaurant (hvis du har flere). Under den — hvert kort i rekkefølge.",
        },
        { type: "h3", text: "Nettsted" },
        {
          type: "list",
          items: [
            "Den offentlige menyens URL — menyens unike adresse (du kan angi din egen korte slug og kopiere lenken).",
            "Stedets navn (tittel) på det offentlige nettstedet.",
            "Aksentfarge — hovedfargen på knapper og fremhevinger i menyen.",
            "Bakgrunn — et bilde eller en video på forsiden; last opp ditt eget eller generer en bakgrunn med AI ut fra en beskrivelse.",
            "Menyoppsett — hvordan rettene vises for gjesten.",
          ],
        },
        { type: "h3", text: "Kontakter og adresse" },
        {
          type: "p",
          text: "Telefon, Instagram, WhatsApp og en kartmarkør — alt vises for gjesten på menyens kontaktside.",
        },
        { type: "h3", text: "Region" },
        { type: "p", text: "Valuta (brukes til alle priser) og stedets tidssone." },
        { type: "h3", text: "Bord" },
        { type: "p", text: "Planløsning, plasser og bordenes QR-koder — i detalj i seksjon 3." },
        { type: "h3", text: "Enheter" },
        {
          type: "p",
          text: "Koble til nettbrett for kjøkkenskjermen og servitørterminalene — i detalj i seksjon 7.",
        },
        { type: "h3", text: "Bestillinger" },
        {
          type: "list",
          items: [
            "«Ta imot bestillinger» — hovedbryteren for å motta bestillinger.",
            "«Bestillingsmodus» — Intern og/eller WhatsApp.",
            "«Obligatoriske felt» — hvilke opplysninger gjesten må oppgi (Navn, Telefon, Adresse).",
            "«Betalingsmetoder» — kontakt support for å integrere restaurantens betalingssystem.",
          ],
        },
        { type: "h3", text: "Reservasjoner" },
        {
          type: "p",
          text: "Aktiver reservasjoner, automatisk eller manuell bekreftelse, varighet og åpningstider — i detalj i seksjon 6.",
        },
        { type: "h3", text: "Språk" },
        {
          type: "steps",
          items: [
            "Åpne Innstillinger → Språk.",
            "Velg språkene den offentlige menyen oversettes til (trykk for å legge til/fjerne).",
            "Angi standardspråk.",
            "Tekster oversettes manuelt eller med knappen «Oversett med AI» — systemet oversetter rettenes navn og beskrivelser til de valgte språkene.",
          ],
        },
        { type: "h3", text: "Betaling" },
        { type: "p", text: "Abonnementsplan, prøveperiodens status og administrasjon av betalinger." },
        {
          type: "list",
          items: [
            "Månedlig eller årlig fakturering (årlig er billigere).",
            "«Abonner» / «Bytt» — velg eller bytt plan.",
            "«Administrer» — bytt betalingsmetode eller si opp abonnementet.",
          ],
        },
        {
          type: "note",
          text: "Betaling skjer i EUR. Kontakt support for å betale i en annen valuta.",
        },
        { type: "h3", text: "Support" },
        {
          type: "p",
          text: "En innebygd chat med teamet vårt i sanntid. Skriv en melding — vi svarer rett her.",
        },
        { type: "h3", text: "Bytte og legge til restauranter" },
        {
          type: "p",
          text: "Har du flere steder, er restaurantvelgeren øverst i seksjonen «Innstillinger».",
        },
        {
          type: "steps",
          items: [
            "Åpne restaurantvelgeren øverst i «Innstillinger».",
            "«Legg til restaurant» → skriv inn et navn.",
            "Velg «Dupliser nåværende meny og innstillinger» (rask start) eller «Start fra bunnen» (en tom restaurant).",
            "Opprett den — og bytt mellom restauranter når som helst her.",
          ],
        },
      ],
    },
    {
      id: "public-menu",
      title: "10. Den offentlige menyen for gjester",
      blocks: [
        {
          type: "p",
          text: "Den offentlige menyen er det gjesten ser etter å ha skannet QR-en. Den settes sammen automatisk av menyen din, brandingen og kontaktene dine.",
        },
        {
          type: "list",
          items: [
            "Menyens adresse angis i Innstillinger → Region («Menylenke»).",
            "Den generelle QR-koden og menylenken får du via knappen «Del» på siden «Meny».",
            "Hvert bord har sin egen separate QR (Innstillinger → Bord) som fører til nettopp det bordets meny.",
            "Utseendet (bakgrunn, aksentfarge, oppsett) konfigureres i seksjonen «Nettsted».",
            "Knappen «Forhåndsvis» åpner menyen slik gjesten ser den.",
          ],
        },
        {
          type: "tip",
          text: "Trykk på «Forhåndsvis» etter enhver meny-/innstillingsendring for å sjekke hvordan det ser ut for gjesten.",
        },
      ],
    },
    {
      id: "faq",
      title: "11. Ofte stilte spørsmål og detaljer",
      blocks: [
        { type: "h3", text: "Gjesten kan ikke legge inn en bestilling" },
        {
          type: "p",
          text: "Sjekk Innstillinger → Bestillinger → «Ta imot bestillinger» (må være på), og at minst én bestillingsmodus er valgt.",
        },
        { type: "h3", text: "Det kommer ingen reservasjoner" },
        {
          type: "p",
          text: "Sørg for at reservasjoner er slått på i Innstillinger → Reservasjoner, at bord er lagt til, og at dagen ikke er markert som «Stengt» i planen.",
        },
        { type: "h3", text: "Nettbrettet kobler ikke til" },
        {
          type: "p",
          text: "Koden er gyldig i 2 minutter. Er den utløpt — generer en ny i Innstillinger → Enheter. Er enheten tilbakekalt — opprett en ny kode.",
        },
        { type: "h3", text: "En rett er utsolgt" },
        {
          type: "p",
          text: "Ikke slett den — trykk på «Skjul rett». Den forsvinner fra den offentlige menyen, og du henter den tilbake med «Vis rett».",
        },
        { type: "h3", text: "Du trenger enheter/terminaler, men har ingen" },
        {
          type: "p",
          text: "Seksjonen «Enheter» er tilgjengelig med et betalt abonnement eller i en aktiv prøveperiode. Sjekk Innstillinger → Betaling.",
        },
        { type: "h3", text: "Har du flere spørsmål" },
        {
          type: "p",
          text: "Skriv til oss i Innstillinger → Support — det er en innebygd chat med teamet vårt.",
        },
      ],
    },
  ],
};
