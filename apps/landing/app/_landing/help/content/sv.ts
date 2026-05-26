import type { HelpDoc } from "../types";

// SV help guide.
export const sv: HelpDoc = {
  metaTitle: "Så använder du IQ Rest — steg-för-steg-guide",
  metaDescription:
    "Komplett IQ Rest-guide: registrering, meny, beställningar, bokningar, köksskärm och inställningar — för restauranger.",
  h1: "Hjälp",
  intro: "En detaljerad guide till IQ Rest — från registrering till de finare inställningarna.",
  banner: {
    title: "Det är enklare än det ser ut",
    sub: "En steg-för-steg-guide: från registrering till de finare inställningarna — vem som helst klarar det.",
    cta: "Så funkar det",
  },
  tipLabel: "Tips",
  noteLabel: "Viktigt",
  sections: [
    {
      id: "start",
      title: "1. Kom igång",
      blocks: [
        { type: "h3", text: "Vad är det här systemet" },
        {
          type: "p",
          text: "IQ Rest är en tjänst för restauranger: du skapar en onlinemeny med QR-kod, tar emot beställningar och bordsbokningar direkt från gästernas telefoner, medan köket och servitörerna jobbar på surfplatte-terminaler. Allt hanteras från en enda adminpanel (dashboarden).",
        },
        { type: "h3", text: "Registrering och inloggning" },
        { type: "p", text: "Du kan logga in på tre sätt — välj valfritt på inloggningsskärmen:" },
        {
          type: "list",
          items: [
            "Med Google — klicka på ”Fortsätt med Google” och välj konto.",
            "Med Apple — klicka på ”Fortsätt med Apple”.",
            "Med e-post — klicka på ”Fortsätt med e-post”, ange din adress, så skickar vi en 6-siffrig kod. Ange den på nästa skärm. Inget lösenord behövs.",
          ],
        },
        {
          type: "note",
          text: "Via e-post får du bara en engångskod för inloggning — ingen spam, inga nyhetsbrev.",
        },
        { type: "h3", text: "Skapa restaurang (onboarding)" },
        {
          type: "p",
          text: "Vid första inloggningen leder systemet dig genom en snabb konfiguration. Sedan skapas automatiskt en restaurang med en exempelmeny-mall som du senare ersätter med din egen.",
        },
        {
          type: "steps",
          items: [
            "Ange restaurangens namn.",
            "Välj kökstyp (den bestämmer startmenymallen).",
            "Klart: du hamnar i dashboarden med en redan ifylld exempelmeny.",
          ],
        },
        {
          type: "note",
          text: "Valutan känns igen automatiskt utifrån din region — du behöver inte välja den i början. Du kan ändra den senare i Inställningar → Region.",
        },
        { type: "h3", text: "Översikt av dashboarden" },
        {
          type: "p",
          text: "Navigering mellan sektioner: på datorn en topplist, på telefonen en bottenlist. Sektioner: Meny, Beställningar, Bokningar, Kök, Analys och Inställningar.",
        },
        {
          type: "list",
          items: [
            "Bredvid restaurangnamnet i topplisten finns en liten anslutningsindikator: en grön prick betyder att beställningar synkroniseras i realtid.",
            "På sidan ”Meny” högst upp finns knappen ”Förhandsvisa” — den öppnar din meny som gästen ser den.",
            "Där bredvid knappen ”Dela” — den visar QR-koden och länken till menyn (kopiera länken, ladda ner QR eller öppna menyn).",
          ],
        },
        {
          type: "tip",
          text: "Tryck på ”Förhandsvisa” efter varje menyändring — du ser direkt hur det ser ut för gästen.",
        },
      ],
    },
    {
      id: "menu",
      title: "2. Meny",
      blocks: [
        {
          type: "p",
          text: "Sektionen ”Meny” är systemets hjärta. Här bygger du strukturen: kategorier → rätter → alternativ. Öppna den från navigeringen.",
        },
        { type: "h3", text: "Kategorier och underkategorier" },
        {
          type: "steps",
          items: [
            "Tryck på ”Lägg till kategori” och ange ett namn (till exempel ”Förrätter”).",
            "För att redigera en kategori — håll muspekaren över den och tryck på ”Redigera kategori”.",
            "Kategoriernas ordning ändrar du med knapparna ”Upp” / ”Ner” — exakt i den ordningen ser gästen dem.",
            "Du kan skapa en ”Grupp” (via ”Lägg till grupp”) — en sektionskategori som innehåller andra kategorier.",
          ],
        },
        { type: "h3", text: "Lägga till rätter" },
        {
          type: "steps",
          items: [
            "Fäll ut en kategori (pil till vänster) och tryck på ”Lägg till rätt”.",
            "Fyll i namn, pris och beskrivning.",
            "Lägg till ett foto: ”Lägg till foto” — ladda upp ditt eget, eller tryck på ”Generera” och beskriv rätten i ord så att AI skapar en bild.",
            "Spara. Rätten visas i kategorin.",
          ],
        },
        {
          type: "tip",
          text: "Ett foto kan genereras med AI: ange vinkel, ljus eller bakgrund (till exempel ”Pizza Margherita på en träbricka, ovanifrån”).",
        },
        { type: "h3", text: "Alternativ och varianter (modifierare)" },
        {
          type: "p",
          text: "Alternativ är val inom en rätt: storlek, stekning, extra ingredienser. Varje alternativ har varianter, och ett tillägg kan läggas till en variant (till exempel ”+1.50 styck”).",
        },
        {
          type: "list",
          items: [
            "Exempel: ett alternativ ”Storlek” med varianterna ”Liten / Stor (+2.00)”.",
            "Exempel: ett alternativ ”Extra” med flera varianter där gästen väljer en eller flera.",
          ],
        },
        { type: "h3", text: "Allergener och dieter" },
        {
          type: "p",
          text: "På en rätt kan du markera allergener (gluten, nötter osv.) och kostmärkningar (vegetarisk, vegansk). Gästen ser dem som ikoner i den publika menyn.",
        },
        { type: "h3", text: "Rätternas synlighet" },
        {
          type: "p",
          text: "Knappen ”Dölj rätt” / ”Visa rätt” tar tillfälligt bort en post från den publika menyn utan att radera den — praktiskt när en rätt har tagit slut.",
        },
        { type: "h3", text: "Ladda upp en pappersmeny (skanning)" },
        {
          type: "p",
          text: "Har du redan en meny som foto eller PDF — skriv inte in den för hand. Använd skanning:",
        },
        {
          type: "steps",
          items: [
            "Tryck på bannern ”Ladda upp meny” (eller ”Ladda upp din pappersmeny”).",
            "Lägg till upp till 5 filer (foto/skanning, upp till 20 MB var) och tryck på ”Skanna”.",
            "Vänta upp till en minut — AI känner igen kategorier och rätter.",
            "Granska det igenkända, kryssa i önskade poster och tryck på ”Fortsätt”.",
            "Välj: ersätt den aktuella menyn eller lägg till de nya posterna i den befintliga.",
          ],
        },
        {
          type: "note",
          text: "Exemplen från startmallen tas bort när du sparar den skannade menyn — det är normalt.",
        },
      ],
    },
    {
      id: "tables",
      title: "3. Bord och QR-koder",
      blocks: [
        {
          type: "p",
          text: "Bord används för att knyta beställningar och bokningar till specifika platser och för att skriva ut personliga QR-koder. Sektion: Inställningar → Bord.",
        },
        { type: "h3", text: "Skapa bord" },
        {
          type: "steps",
          items: [
            "Öppna Inställningar → Bord och tryck på ”Lägg till bord”.",
            "Ange bordsnummer, antal platser och (valfritt) ett namn — till exempel ”Fönster”, ”Bar”, ”Uteservering”.",
            "Lägg till ett bordsfoto — gästerna ser det och förstår exakt var deras bord är.",
            "Ange en bordsfärg — med den färgen markeras bordet i köket och i sektionen ”Beställningar” så att personalen hittar det snabbt.",
            "Lägg eventuellt till en kort beskrivning.",
            "Spara.",
          ],
        },
        {
          type: "note",
          text: "Bordsfotot är för gästerna (vägvisning ”var är mitt bord”). Färgen är för personalen (en snabb visuell markering av bordet i köket och i beställningarna).",
        },
        { type: "h3", text: "Bordets QR-kod" },
        {
          type: "p",
          text: "Varje bord har sin egen QR-kod. Gästen skannar den med telefonen och hamnar direkt i det bordets meny — beställningen knyts automatiskt till rätt bord.",
        },
        {
          type: "steps",
          items: [
            "Tryck på ”Visa QR-kod” vid önskat bord.",
            "Tryck på ”Ladda ner QR” för att spara bilden.",
            "Skriv ut den och placera den på bordet (på ett ställ, i menyn, på en dekal).",
          ],
        },
        {
          type: "tip",
          text: "”Bordslänken” är samma länk som i QR men som text. Du kan skicka den till gästen via meddelande.",
        },
      ],
    },
    {
      id: "orders",
      title: "4. Beställningar",
      blocks: [
        { type: "h3", text: "Hur gästen beställer" },
        {
          type: "p",
          text: "Gästen skannar QR-koden på bordet → menyn öppnas → väljer rätter, alternativ och antal → lägger beställningen. Beställningen visas direkt i din dashboard och på köks-/servitörsterminalen.",
        },
        {
          type: "note",
          text: "För att gäster ska kunna beställa måste ”Ta emot beställningar” vara aktiverat i Inställningar → Beställningar. Är det av ser gästen menyn men det finns ingen beställningsknapp.",
        },
        { type: "h3", text: "Hantera beställningar i dashboarden" },
        {
          type: "p",
          text: "Sektionen ”Beställningar” visar planlösningen. Upptagna bord är markerade och visar antalet aktiva beställningar. Tryck på ett bord för att öppna dess beställningar.",
        },
        {
          type: "steps",
          items: [
            "Tryck på ett bord → ”Starta beställning” (eller öppna en befintlig).",
            "”Lägg till post” → välj kategori → rätt → alternativ → ange vid behov antal och anteckningar (till exempel ”utan lök”).",
            "Tryck på ”Lägg till” — posten hamnar i beställningen.",
          ],
        },
        { type: "h3", text: "Posternas status" },
        {
          type: "p",
          text: "Varje post har en status: Väntar → Tillagas → Klar → Serverad. Tryck på en post för att byta status. Statusarna synkroniseras med köket i realtid.",
        },
        { type: "h3", text: "Rabatter, dela, byta bord" },
        {
          type: "list",
          items: [
            "Rabatt: ”Lägg till rabatt” — procent eller fast belopp, på hela beställningen eller en post, med anledning.",
            "Dela beställning: ”Dela beställning” — välj posterna som går till en ny separat nota.",
            "Byta bord: ”Byt bord” — flytta beställningen till ett annat bord.",
            "Duplicera post: lägg snabbt till en till likadan.",
          ],
        },
        { type: "h3", text: "Avsluta en beställning" },
        {
          type: "steps",
          items: [
            "När alla poster är serverade trycker du på ”Avsluta beställning”.",
            "Välj en betalmetod (om betalmetoder är konfigurerade).",
            "Beställningen stängs och lämnar listan över aktiva.",
          ],
        },
      ],
    },
    {
      id: "kitchen",
      title: "5. Kök (KDS)",
      blocks: [
        {
          type: "p",
          text: "Köksskärmen (KDS) är en skärm på en surfplatta för kockarna. Nya beställningar landar på den i realtid och kocken markerar rätter som klara.",
        },
        { type: "h3", text: "Vad skärmen visar" },
        {
          type: "list",
          items: [
            "Beställningskort med poster, alternativ och tiden ”vid passet”.",
            "Färgmarkering av status: vad som tillagas, vad som är klart.",
            "En ljudsignal när en ny beställning kommer in.",
          ],
        },
        { type: "h3", text: "Så används den" },
        {
          type: "steps",
          items: [
            "Tryck på en post för att flytta den till nästa status (Tillagas → Klar).",
            "Slå på ljudet med knappen ”Slå på ljud” — då kommer nya beställningar med en ljudsignal.",
            "Med zoom justerar du kortstorleken efter surfplattan.",
            "Med filter kan du visa bara de kategorier du behöver (till exempel bara varma linjen).",
          ],
        },
        {
          type: "note",
          text: "Om surfplattan tappar internet visas varningen ”Ingen anslutning”. Anslut Wi-Fi så börjar beställningarna komma igen.",
        },
      ],
    },
    {
      id: "reservations",
      title: "6. Bokningar",
      blocks: [
        {
          type: "p",
          text: "Gäster kan boka bord via din meny, och du hanterar bokningar i sektionen ”Bokningar” (vy ”Månad” / ”Dag”).",
        },
        { type: "h3", text: "Ställa in bokningar" },
        { type: "p", text: "Aktivera och konfigurera bokningar först: Inställningar → Bokningar." },
        {
          type: "steps",
          items: [
            "Slå på ”Aktivera bokningar”.",
            "Välj bekräftelseläge: ”Automatiskt” (bokningar bekräftas av sig själva) eller ”Manuellt” (du bekräftar varje).",
            "Ange ”Bokningens längd” — hur länge bordet hålls för gästen.",
            "Fyll i ”Veckoschemat”: för varje dag — öppet/stängt, öppettider och vid behov lunchpaus.",
          ],
        },
        {
          type: "note",
          text: "För att ta emot bokningar behövs bord. Finns inga ber systemet dig lägga till bord först.",
        },
        { type: "h3", text: "Hantera bokningar" },
        {
          type: "list",
          items: [
            "Nya bokningar som väntar på beslut samlas i blocket ”Väntar på bekräftelse”.",
            "Knapparna ”Bekräfta” / ”Avböj” — för varje bokning.",
            "”Slutför” — markerar att gästen kommit och bokningen är klar.",
            "Växla mellan ”Månad” och ”Dag”, bläddra genom perioden med ”Bakåt” / ”Framåt”.",
          ],
        },
      ],
    },
    {
      id: "devices",
      title: "7. Enheter (surfplattor)",
      blocks: [
        {
          type: "p",
          text: "Köks-, servitörs- och bokningsterminalerna är separata surfplattor som ansluts till ditt konto med en kod. Sektion: Inställningar → Enheter.",
        },
        {
          type: "note",
          text: "Enheter är tillgängliga med ett betalt abonnemang eller under en aktiv provperiod.",
        },
        { type: "h3", text: "Ansluta en surfplatta (parkoppling)" },
        {
          type: "steps",
          items: [
            "I dashboarden: Inställningar → Enheter → ”Lägg till enhet”.",
            "Ange ett namn (till exempel ”Kök — varma linjen”) och en typ: Kök, Servitör eller Bokningar.",
            "Tryck på ”Generera kod” — en 6-siffrig kod visas (giltig i 2 minuter).",
            "Öppna anslutningsskärmen på surfplattan och ange koden.",
            "Surfplattan ansluts och börjar genast jobba i den valda rollen.",
          ],
        },
        { type: "tip", text: "Om koden gått ut — tryck bara på ”Ny kod” och ange den nya." },
        { type: "h3", text: "Hantera enheter" },
        {
          type: "list",
          items: [
            "Status: Online / Offline / Väntar på anslutning / Återkallad.",
            "”Återkalla” — kopplar bort surfplattan (till exempel om den tappats bort). En ny kod behövs för att logga in igen.",
            "”Ta bort” — tar bort enheten från listan permanent.",
          ],
        },
      ],
    },
    {
      id: "analytics",
      title: "8. Analys",
      blocks: [
        {
          type: "p",
          text: "Sektionen ”Analys” visar de viktigaste siffrorna för verksamheten: omsättning, antal beställningar och deras fördelning (till exempel per betalmetod och tid). Använd den för att förstå vad som säljer bäst och när.",
        },
      ],
    },
    {
      id: "settings",
      title: "9. Inställningar",
      blocks: [
        {
          type: "p",
          text: "Sektionen ”Inställningar” öppnas som en uppsättning sektionskort. Högst upp finns växlaren för aktiv restaurang (om du har flera). Under den — varje kort i tur och ordning.",
        },
        { type: "h3", text: "Webbplats" },
        {
          type: "list",
          items: [
            "Den publika menyns URL — din menys unika adress (du kan ange en egen kort slug och kopiera länken).",
            "Verksamhetens namn (rubrik) på den publika webbplatsen.",
            "Accentfärg — huvudfärgen för knappar och markeringar i menyn.",
            "Bakgrund — en bild eller video på startsidan; ladda upp din egen eller generera en bakgrund med AI utifrån en beskrivning.",
            "Menylayout — hur rätterna visas för gästen.",
          ],
        },
        { type: "h3", text: "Kontakter och adress" },
        {
          type: "p",
          text: "Telefon, Instagram, WhatsApp och en kartmarkör — allt visas för gästen på din menys kontaktsida.",
        },
        { type: "h3", text: "Region" },
        { type: "p", text: "Valuta (används för alla priser) och verksamhetens tidszon." },
        { type: "h3", text: "Bord" },
        { type: "p", text: "Planlösning, platser och bordens QR-koder — i detalj i sektion 3." },
        { type: "h3", text: "Enheter" },
        {
          type: "p",
          text: "Ansluta surfplattor för köksskärmen och servitörsterminalerna — i detalj i sektion 7.",
        },
        { type: "h3", text: "Beställningar" },
        {
          type: "list",
          items: [
            "”Ta emot beställningar” — huvudströmbrytaren för att ta emot beställningar.",
            "”Beställningsläge” — Internt och/eller WhatsApp.",
            "”Obligatoriska fält” — vilka uppgifter gästen måste ange (Namn, Telefon, Adress).",
            "”Betalmetoder” — kontakta supporten för att integrera restaurangens betalsystem.",
          ],
        },
        { type: "h3", text: "Bokningar" },
        {
          type: "p",
          text: "Aktivera bokningar, automatisk eller manuell bekräftelse, längd och öppettider — i detalj i sektion 6.",
        },
        { type: "h3", text: "Språk" },
        {
          type: "steps",
          items: [
            "Öppna Inställningar → Språk.",
            "Välj de språk som den publika menyn översätts till (tryck för att lägga till/ta bort).",
            "Ange standardspråk.",
            "Texter översätts manuellt eller med knappen ”Översätt med AI” — systemet översätter rätternas namn och beskrivningar till de valda språken.",
          ],
        },
        { type: "h3", text: "Betalning" },
        { type: "p", text: "Abonnemangsplan, provperiodens status och hantering av betalningar." },
        {
          type: "list",
          items: [
            "Månads- eller årsfakturering (årsvis är billigare).",
            "”Prenumerera” / ”Byt” — välj eller byt plan.",
            "”Hantera” — byt betalmetod eller säg upp abonnemanget.",
          ],
        },
        {
          type: "note",
          text: "Betalning sker i EUR. Kontakta supporten för att betala i en annan valuta.",
        },
        { type: "h3", text: "Support" },
        {
          type: "p",
          text: "En inbyggd chatt med vårt team i realtid. Skriv ett meddelande — vi svarar direkt här.",
        },
        { type: "h3", text: "Byta och lägga till restauranger" },
        {
          type: "p",
          text: "Har du flera verksamheter finns restaurangväxlaren högst upp i sektionen ”Inställningar”.",
        },
        {
          type: "steps",
          items: [
            "Öppna restaurangväxlaren högst upp i ”Inställningar”.",
            "”Lägg till restaurang” → ange ett namn.",
            "Välj ”Duplicera aktuell meny och inställningar” (snabbstart) eller ”Börja från noll” (en tom restaurang).",
            "Skapa den — och växla mellan restauranger när som helst här.",
          ],
        },
      ],
    },
    {
      id: "public-menu",
      title: "10. Den publika menyn för gäster",
      blocks: [
        {
          type: "p",
          text: "Den publika menyn är det gästen ser efter att ha skannat QR-koden. Den sätts ihop automatiskt av din meny, din branding och dina kontakter.",
        },
        {
          type: "list",
          items: [
            "Menyns adress ställs in i Inställningar → Region (”Menylänk”).",
            "Den allmänna QR-koden och menylänken får du via knappen ”Dela” på sidan ”Meny”.",
            "Varje bord har en egen separat QR (Inställningar → Bord) som leder till just det bordets meny.",
            "Utseendet (bakgrund, accentfärg, layout) ställs in i sektionen ”Webbplats”.",
            "Knappen ”Förhandsvisa” öppnar menyn som gästen ser den.",
          ],
        },
        {
          type: "tip",
          text: "Tryck på ”Förhandsvisa” efter varje meny-/inställningsändring för att kontrollera hur det ser ut för gästen.",
        },
      ],
    },
    {
      id: "faq",
      title: "11. Vanliga frågor och detaljer",
      blocks: [
        { type: "h3", text: "Gästen kan inte lägga en beställning" },
        {
          type: "p",
          text: "Kontrollera Inställningar → Beställningar → ”Ta emot beställningar” (måste vara på) och att minst ett beställningsläge är valt.",
        },
        { type: "h3", text: "Inga bokningar kommer in" },
        {
          type: "p",
          text: "Se till att bokningar är aktiverade i Inställningar → Bokningar, att bord är tillagda och att dagen inte är markerad som ”Stängt” i schemat.",
        },
        { type: "h3", text: "Surfplattan ansluter inte" },
        {
          type: "p",
          text: "Koden gäller i 2 minuter. Har den gått ut — generera en ny i Inställningar → Enheter. Har enheten återkallats — skapa en ny kod.",
        },
        { type: "h3", text: "En rätt har tagit slut" },
        {
          type: "p",
          text: "Radera den inte — tryck på ”Dölj rätt”. Den försvinner från den publika menyn, och du tar tillbaka den med ”Visa rätt”.",
        },
        { type: "h3", text: "Du behöver enheter/terminaler men har inga" },
        {
          type: "p",
          text: "Sektionen ”Enheter” är tillgänglig med ett betalt abonnemang eller under en aktiv provperiod. Kontrollera Inställningar → Betalning.",
        },
        { type: "h3", text: "Har du fler frågor" },
        {
          type: "p",
          text: "Skriv till oss i Inställningar → Support — det är en inbyggd chatt med vårt team.",
        },
      ],
    },
  ],
};
