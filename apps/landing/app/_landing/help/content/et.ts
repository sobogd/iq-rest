import type { HelpDoc } from "../types";

// ET help guide.
export const et: HelpDoc = {
  metaTitle: "Kuidas kasutada IQ Resti — samm-sammuline juhend",
  metaDescription:
    "Täielik IQ Resti juhend: registreerimine, menüü, tellimused, broneeringud, kööginäidik ja seaded — restoranidele.",
  h1: "Abi",
  intro: "Üksikasjalik IQ Resti juhend — registreerimisest peenemate seadeteni.",
  banner: {
    title: "See on lihtsam, kui tundub",
    sub: "Samm-sammuline juhend: registreerimisest peenemate seadeteni — saab hakkama igaüks.",
    cta: "Kuidas kasutada",
  },
  tipLabel: "Nõuanne",
  noteLabel: "Oluline",
  sections: [
    {
      id: "start",
      title: "1. Alustamine",
      blocks: [
        { type: "h3", text: "Mis süsteem see on" },
        {
          type: "p",
          text: "IQ Rest on teenus restoranidele: loote QR-koodiga veebimenüü, võtate tellimusi ja lauabroneeringuid vastu otse külaliste telefonidest, köögis ja teenindajatel töötavad aga tahvelterminalid. Kõike hallatakse ühest halduspaneelist (töölaud).",
        },
        { type: "h3", text: "Registreerimine ja sisselogimine" },
        { type: "p", text: "Sisse saab logida kolmel viisil — valige sisselogimisekraanil ükskõik milline:" },
        {
          type: "list",
          items: [
            "Google'iga — klõpsake „Jätka Google'iga“ ja valige konto.",
            "Apple'iga — klõpsake „Jätka Apple'iga“.",
            "E-postiga — klõpsake „Jätka e-postiga“, sisestage aadress ja saadame 6-kohalise koodi. Sisestage see järgmisel ekraanil. Parooli pole vaja.",
          ],
        },
        {
          type: "note",
          text: "E-postiga saate ainult ühekordse sisselogimiskoodi — ei mingit rämpsposti ega uudiskirju.",
        },
        { type: "h3", text: "Restorani loomine (juurutamine)" },
        {
          type: "p",
          text: "Esimesel sisselogimisel juhatab süsteem teid läbi kiire seadistuse. Seejärel luuakse automaatselt restoran näidismenüü malliga, mille hiljem asendate omaga.",
        },
        {
          type: "steps",
          items: [
            "Sisestage restorani nimi.",
            "Valige köögi tüüp (see määrab algse menüümalli).",
            "Valmis: jõuate töölauale juba täidetud näidismenüüga.",
          ],
        },
        {
          type: "note",
          text: "Valuuta tuvastatakse automaatselt teie piirkonna järgi — alguses pole vaja seda valida. Hiljem muudate Seaded → Piirkond.",
        },
        { type: "h3", text: "Töölaua ülevaade" },
        {
          type: "p",
          text: "Navigeerimine sektsioonide vahel: arvutis ülariba, telefonis alariba. Sektsioonid: Menüü, Tellimused, Broneeringud, Köök, Analüütika ja Seaded.",
        },
        {
          type: "list",
          items: [
            "Restorani nime kõrval ülaribal on väike ühenduse indikaator: roheline punkt tähendab, et tellimused sünkroonitakse reaalajas.",
            "Lehel „Menüü“ üleval on nupp „Eelvaade“ — avab teie menüü nii, nagu külaline seda näeb.",
            "Kõrval nupp „Jaga“ — näitab QR-koodi ja menüü linki (kopeeri link, laadi QR alla või ava menüü).",
          ],
        },
        {
          type: "tip",
          text: "Vajutage pärast iga menüümuudatust „Eelvaade“ — näete kohe, kuidas see külalisele paistab.",
        },
      ],
    },
    {
      id: "menu",
      title: "2. Menüü",
      blocks: [
        {
          type: "p",
          text: "Sektsioon „Menüü“ on süsteemi süda. Siin ehitate struktuuri: kategooriad → toidud → valikud. Avage see navigeerimisest.",
        },
        { type: "h3", text: "Kategooriad ja alamkategooriad" },
        {
          type: "steps",
          items: [
            "Klõpsake „Lisa kategooria“ ja sisestage nimi (näiteks „Eelroad“).",
            "Kategooria muutmiseks — viige kursor selle peale ja klõpsake „Muuda kategooriat“.",
            "Kategooriate järjekorda muudate nuppudega „Üles“ / „Alla“ — täpselt selles järjekorras näeb neid külaline.",
            "Saate luua „Grupi“ (kaudu „Lisa grupp“) — sektsioonikategooria, mis sisaldab teisi kategooriaid.",
          ],
        },
        { type: "h3", text: "Toitude lisamine" },
        {
          type: "steps",
          items: [
            "Laiendage kategooria (nool vasakul) ja klõpsake „Lisa toit“.",
            "Täitke nimi, hind ja kirjeldus.",
            "Lisage foto: „Lisa foto“ — laadige enda oma üles või klõpsake „Genereeri“ ja kirjeldage toitu sõnadega, et TI looks pildi.",
            "Salvestage. Toit ilmub kategooriasse.",
          ],
        },
        {
          type: "tip",
          text: "Foto saab genereerida TI-ga: märkige nurk, valgustus või taust (näiteks „Pizza Margherita puidust lõikelaual, vaade ülalt“).",
        },
        { type: "h3", text: "Valikud ja variandid (modifikaatorid)" },
        {
          type: "p",
          text: "Valikud on valikud toidu sees: suurus, küpsusaste, lisakoostisosad. Igal valikul on variandid ja variandile saab lisada lisatasu (näiteks „+1.50 tükk“).",
        },
        {
          type: "list",
          items: [
            "Näide: valik „Suurus“ variantidega „Väike / Suur (+2.00)“.",
            "Näide: valik „Lisa“ mitme variandiga, millest külaline valib ühe või mitu.",
          ],
        },
        { type: "h3", text: "Allergeenid ja dieedid" },
        {
          type: "p",
          text: "Toidule saab märkida allergeenid (gluteen, pähklid jne) ja dieedimärgised (taimetoit, vegan). Külaline näeb neid ikoonidena avalikus menüüs.",
        },
        { type: "h3", text: "Toitude nähtavus" },
        {
          type: "p",
          text: "Nupp „Peida toit“ / „Näita toitu“ eemaldab kirje ajutiselt avalikust menüüst seda kustutamata — mugav, kui toit on otsas.",
        },
        { type: "h3", text: "Paberi menüü üleslaadimine (skannimine)" },
        {
          type: "p",
          text: "Kui teil on menüü juba fotona või PDF-ina — ärge sisestage seda käsitsi. Kasutage skannimist:",
        },
        {
          type: "steps",
          items: [
            "Klõpsake bännerit „Laadi menüü üles“ (või „Laadige oma paberimenüü üles“).",
            "Lisage kuni 5 faili (foto/skann, igaüks kuni 20 MB) ja klõpsake „Skanni“.",
            "Oodake kuni minut — TI tuvastab kategooriad ja toidud.",
            "Kontrollige tuvastatut, märkige soovitud kirjed ja klõpsake „Jätka“.",
            "Valige: asenda praegune menüü või lisa uued kirjed olemasolevale.",
          ],
        },
        {
          type: "note",
          text: "Algmalli näited eemaldatakse skannitud menüü salvestamisel — see on normaalne.",
        },
      ],
    },
    {
      id: "tables",
      title: "3. Lauad ja QR-koodid",
      blocks: [
        {
          type: "p",
          text: "Lauad on mõeldud tellimuste ja broneeringute sidumiseks konkreetsete kohtadega ning isiklike QR-koodide printimiseks. Sektsioon: Seaded → Lauad.",
        },
        { type: "h3", text: "Laudade loomine" },
        {
          type: "steps",
          items: [
            "Avage Seaded → Lauad ja klõpsake „Lisa laud“.",
            "Märkige laua number, kohtade arv ja (valikuliselt) nimi — näiteks „Aken“, „Baar“, „Terrass“.",
            "Lisage laua foto — külalised näevad seda ja mõistavad täpselt, kus nende laud on.",
            "Määrake laua värv — selle värviga tõstetakse laud esile köögis ja sektsioonis „Tellimused“, et personal leiaks selle kiiresti.",
            "Soovi korral lisage lühike kirjeldus.",
            "Salvestage.",
          ],
        },
        {
          type: "note",
          text: "Laua foto on külalistele (orientiir „kus on minu laud“). Värv on personalile (laua kiire visuaalne tähis köögis ja tellimustes).",
        },
        { type: "h3", text: "Laua QR-kood" },
        {
          type: "p",
          text: "Igal laual on oma QR-kood. Külaline skannib selle telefoniga ja satub otse selle laua menüüsse — tellimus seotakse automaatselt õige lauaga.",
        },
        {
          type: "steps",
          items: [
            "Klõpsake soovitud laua juures „Näita QR-koodi“.",
            "Klõpsake „Laadi QR alla“, et pilt salvestada.",
            "Printige see ja asetage lauale (alusele, menüüsse, kleebisele).",
          ],
        },
        {
          type: "tip",
          text: "„Laua link“ on sama link kui QR-is, kuid tekstina. Saate selle külalisele sõnumiga saata.",
        },
      ],
    },
    {
      id: "orders",
      title: "4. Tellimused",
      blocks: [
        { type: "h3", text: "Kuidas külaline tellib" },
        {
          type: "p",
          text: "Külaline skannib laual oleva QR-i → avaneb menüü → valib toidud, valikud ja koguse → esitab tellimuse. Tellimus ilmub kohe teie töölauale ja köögi-/teenindajaterminalile.",
        },
        {
          type: "note",
          text: "Et külalised saaksid tellida, peab Seaded → Tellimused olema sees „Võta tellimusi vastu“. Kui väljas, näeb külaline menüüd, kuid tellimisnuppu pole.",
        },
        { type: "h3", text: "Tellimustega töötamine töölaual" },
        {
          type: "p",
          text: "Sektsioon „Tellimused“ näitab saaliplaani. Hõivatud lauad on esile tõstetud ja näitavad aktiivsete tellimuste arvu. Puudutage lauda, et avada selle tellimused.",
        },
        {
          type: "steps",
          items: [
            "Puudutage lauda → „Alusta tellimust“ (või avage olemasolev).",
            "„Lisa kirje“ → valige kategooria → toit → valikud → vajadusel märkige kogus ja märkused (näiteks „ilma sibulata“).",
            "Klõpsake „Lisa“ — kirje läheb tellimusse.",
          ],
        },
        { type: "h3", text: "Kirjete olekud" },
        {
          type: "p",
          text: "Igal kirjel on olek: Ootel → Valmib → Valmis → Serveeritud. Puudutage kirjet, et olekut vahetada. Olekud sünkroonitakse köögiga reaalajas.",
        },
        { type: "h3", text: "Allahindlused, jagamine, laua vahetus" },
        {
          type: "list",
          items: [
            "Allahindlus: „Lisa allahindlus“ — protsent või fikseeritud summa, kogu tellimusele või ühele kirjele, põhjusega.",
            "Jaga tellimus: „Jaga tellimus“ — valige kirjed, mis lähevad uuele eraldi arvele.",
            "Vaheta laud: „Vaheta laud“ — liiguta tellimus teisele lauale.",
            "Dubleeri kirje: lisa kiiresti veel üks samasugune.",
          ],
        },
        { type: "h3", text: "Tellimuse lõpetamine" },
        {
          type: "steps",
          items: [
            "Kui kõik kirjed on serveeritud, klõpsake „Lõpeta tellimus“.",
            "Valige makseviis (kui viisid on seadistatud).",
            "Tellimus suletakse ja lahkub aktiivsete hulgast.",
          ],
        },
      ],
    },
    {
      id: "kitchen",
      title: "5. Köök (KDS)",
      blocks: [
        {
          type: "p",
          text: "Kööginäidik (KDS) on tahvelarvuti ekraan kokkadele. Uued tellimused saabuvad sellele reaalajas ja kokk märgib toidud valmiks.",
        },
        { type: "h3", text: "Mida ekraan näitab" },
        {
          type: "list",
          items: [
            "Tellimuskaardid kirjete, valikute ja „väljastuse“ ajaga.",
            "Värviline oleku tähis: mis valmib, mis on valmis.",
            "Helisignaal uue tellimuse saabumisel.",
          ],
        },
        { type: "h3", text: "Kuidas kasutada" },
        {
          type: "steps",
          items: [
            "Puudutage kirjet, et viia see järgmisse olekusse (Valmib → Valmis).",
            "Lülitage heli sisse nupuga „Lülita heli sisse“ — siis saabuvad uued tellimused helisignaaliga.",
            "Suumiga kohandage kaartide suurust tahvelarvutile.",
            "Filtritega saab näidata ainult vajalikke kategooriaid (näiteks ainult sooja liini).",
          ],
        },
        {
          type: "note",
          text: "Kui tahvelarvuti kaotab interneti, ilmub hoiatus „Ühendus puudub“. Ühendage Wi-Fi ja tellimused hakkavad taas saabuma.",
        },
      ],
    },
    {
      id: "reservations",
      title: "6. Broneeringud",
      blocks: [
        {
          type: "p",
          text: "Külalised saavad teie menüü kaudu laua broneerida ja teie haldate broneeringuid sektsioonis „Broneeringud“ (vaade „Kuu“ / „Päev“).",
        },
        { type: "h3", text: "Broneeringute seadistamine" },
        { type: "p", text: "Esmalt lülitage sisse ja seadistage broneeringud: Seaded → Broneeringud." },
        {
          type: "steps",
          items: [
            "Lülitage sisse „Luba broneeringud“.",
            "Valige kinnitusrežiim: „Automaatne“ (broneeringud kinnitatakse ise) või „Käsitsi“ (igaühe kinnitate teie).",
            "Määrake „Broneeringu kestus“ — kui kaua lauda külalisele hoitakse.",
            "Täitke „Nädalakava“: igale päevale — avatud/suletud, lahtiolekuajad ja vajadusel lõunapaus.",
          ],
        },
        {
          type: "note",
          text: "Broneeringute vastuvõtmiseks on vaja laudu. Kui neid pole, palub süsteem esmalt lauad lisada.",
        },
        { type: "h3", text: "Broneeringutega töötamine" },
        {
          type: "list",
          items: [
            "Uued otsust ootavad broneeringud on koondatud plokki „Ootab kinnitust“.",
            "Nupud „Kinnita“ / „Lükka tagasi“ — iga broneeringu jaoks.",
            "„Lõpeta“ — märgib, et külaline saabus ja broneering on täidetud.",
            "Vahetage „Kuu“ ja „Päev“ vahel, sirvige perioodi nuppudega „Tagasi“ / „Edasi“.",
          ],
        },
      ],
    },
    {
      id: "devices",
      title: "7. Seadmed (tahvelarvutid)",
      blocks: [
        {
          type: "p",
          text: "Köögi-, teenindaja- ja broneeringuterminalid on eraldi tahvelarvutid, mis ühenduvad teie kontoga koodiga. Sektsioon: Seaded → Seadmed.",
        },
        {
          type: "note",
          text: "Seadmed on saadaval tasulise paketiga või aktiivse prooviperioodi ajal.",
        },
        { type: "h3", text: "Tahvelarvuti ühendamine (sidumine)" },
        {
          type: "steps",
          items: [
            "Töölaual: Seaded → Seadmed → „Lisa seade“.",
            "Märkige nimi (näiteks „Köök — soe liin“) ja tüüp: Köök, Teenindaja või Broneeringud.",
            "Klõpsake „Genereeri kood“ — ilmub 6-kohaline kood (kehtib 2 minutit).",
            "Avage tahvelarvutis ühenduse ekraan ja sisestage see kood.",
            "Tahvelarvuti ühendub ja hakkab kohe töötama valitud rollis.",
          ],
        },
        { type: "tip", text: "Kui kood aegus — vajutage lihtsalt „Uus kood“ ja sisestage värske." },
        { type: "h3", text: "Seadmete haldamine" },
        {
          type: "list",
          items: [
            "Olekud: Võrgus / Võrguühenduseta / Ootab ühendust / Tühistatud.",
            "„Tühista“ — ühendab tahvelarvuti lahti (näiteks kui kadunud). Uuesti sisselogimiseks on vaja uut koodi.",
            "„Kustuta“ — eemaldab seadme nimekirjast jäädavalt.",
          ],
        },
      ],
    },
    {
      id: "analytics",
      title: "8. Analüütika",
      blocks: [
        {
          type: "p",
          text: "Sektsioon „Analüütika“ näitab asutuse põhinumbreid: käivet, tellimuste arvu ja nende jaotust (näiteks makseviisi ja kellaaja järgi). Kasutage seda, et mõista, mis ja millal kõige paremini müüb.",
        },
      ],
    },
    {
      id: "settings",
      title: "9. Seaded",
      blocks: [
        {
          type: "p",
          text: "Sektsioon „Seaded“ avaneb sektsioonikaartide komplektina. Üleval on aktiivse restorani vahetaja (kui teil on neid mitu). Selle all — iga kaart järjekorras.",
        },
        { type: "h3", text: "Veebisait" },
        {
          type: "list",
          items: [
            "Avaliku menüü URL — teie menüü unikaalne aadress (saate määrata oma lühikese slug-i ja kopeerida lingi).",
            "Asutuse nimi (pealkiri) avalikul veebisaidil.",
            "Rõhuvärv — nuppude ja esiletõstmiste põhivärv menüüs.",
            "Taust — pilt või video avalehel; laadige enda oma üles või genereerige taust TI-ga kirjelduse järgi.",
            "Menüü paigutus — kuidas toidud külalisele kuvatakse.",
          ],
        },
        { type: "h3", text: "Kontaktid ja aadress" },
        {
          type: "p",
          text: "Telefon, Instagram, WhatsApp ja kaardimärgis — kõik kuvatakse külalisele teie menüü kontaktilehel.",
        },
        { type: "h3", text: "Piirkond" },
        { type: "p", text: "Valuuta (kasutatakse kõigi hindade jaoks) ja asutuse ajavöönd." },
        { type: "h3", text: "Lauad" },
        { type: "p", text: "Saaliplaan, kohad ja laudade QR-koodid — üksikasjalikult 3. jaotises." },
        { type: "h3", text: "Seadmed" },
        {
          type: "p",
          text: "Tahvelarvutite ühendamine kööginäidikule ja teenindajaterminalidele — üksikasjalikult 7. jaotises.",
        },
        { type: "h3", text: "Tellimused" },
        {
          type: "list",
          items: [
            "„Võta tellimusi vastu“ — tellimuste vastuvõtmise põhilüliti.",
            "„Tellimisrežiim“ — Sisemine ja/või WhatsApp.",
            "„Kohustuslikud väljad“ — milliseid andmeid külaline peab esitama (Nimi, Telefon, Aadress).",
            "„Makseviisid“ — restorani maksesüsteemi integreerimiseks võtke ühendust toega.",
          ],
        },
        { type: "h3", text: "Broneeringud" },
        {
          type: "p",
          text: "Broneeringute sisselülitamine, automaatne või käsitsi kinnitamine, kestus ja lahtiolekuajad — üksikasjalikult 6. jaotises.",
        },
        { type: "h3", text: "Keeled" },
        {
          type: "steps",
          items: [
            "Avage Seaded → Keeled.",
            "Valige keeled, millesse avalik menüü tõlgitakse (puudutusega lisate/eemaldate).",
            "Määrake vaikekeel.",
            "Tekste tõlgitakse käsitsi või nupuga „Tõlgi TI-ga“ — süsteem tõlgib toitude nimed ja kirjeldused valitud keeltesse.",
          ],
        },
        { type: "h3", text: "Makse" },
        { type: "p", text: "Tellimuse pakett, prooviperioodi olek ja maksete haldamine." },
        {
          type: "list",
          items: [
            "Kuu- või aastapõhine arveldus (aastane on odavam).",
            "„Telli“ / „Vaheta“ — valige või vahetage pakett.",
            "„Halda“ — muutke makseviisi või tühistage tellimus.",
          ],
        },
        {
          type: "note",
          text: "Makse toimub EUR-is. Muus valuutas maksmiseks võtke ühendust toega.",
        },
        { type: "h3", text: "Tugi" },
        {
          type: "p",
          text: "Sisseehitatud vestlus meie meeskonnaga reaalajas. Kirjutage sõnum — vastame siinsamas.",
        },
        { type: "h3", text: "Restoranide vahetamine ja lisamine" },
        {
          type: "p",
          text: "Kui teil on mitu asutust, on restorani vahetaja sektsiooni „Seaded“ ülaosas.",
        },
        {
          type: "steps",
          items: [
            "Avage restoranide vahetaja „Seadete“ ülaosas.",
            "„Lisa restoran“ → sisestage nimi.",
            "Valige „Dubleeri praegune menüü ja seaded“ (kiire algus) või „Alusta nullist“ (tühi restoran).",
            "Looge see — ja vahetage restoranide vahel igal ajal siinsamas.",
          ],
        },
      ],
    },
    {
      id: "public-menu",
      title: "10. Avalik menüü külalistele",
      blocks: [
        {
          type: "p",
          text: "Avalik menüü on see, mida külaline näeb pärast QR-i skannimist. See koostatakse automaatselt teie menüüst, brändingust ja kontaktidest.",
        },
        {
          type: "list",
          items: [
            "Menüü aadress määratakse Seaded → Piirkond („Menüü link“).",
            "Üldise QR-koodi ja menüü lingi saate nupuga „Jaga“ lehel „Menüü“.",
            "Igal laual on oma eraldi QR (Seaded → Lauad), mis viib just selle laua menüüsse.",
            "Välimus (taust, rõhuvärv, paigutus) seadistatakse sektsioonis „Veebisait“.",
            "Nupp „Eelvaade“ avab menüü nii, nagu külaline seda näeb.",
          ],
        },
        {
          type: "tip",
          text: "Pärast iga menüü/seadete muudatust vajutage „Eelvaade“, et kontrollida, kuidas see külalisele paistab.",
        },
      ],
    },
    {
      id: "faq",
      title: "11. Korduma kippuvad küsimused ja nüansid",
      blocks: [
        { type: "h3", text: "Külaline ei saa tellimust esitada" },
        {
          type: "p",
          text: "Kontrollige Seaded → Tellimused → „Võta tellimusi vastu“ (peab olema sees) ja et valitud on vähemalt üks tellimisrežiim.",
        },
        { type: "h3", text: "Broneeringuid ei tule" },
        {
          type: "p",
          text: "Veenduge, et broneeringud on sees Seaded → Broneeringud, et lauad on lisatud ja et päev pole kavas märgitud kui „Suletud“.",
        },
        { type: "h3", text: "Tahvelarvuti ei ühendu" },
        {
          type: "p",
          text: "Kood kehtib 2 minutit. Kui aegus — genereerige uus Seaded → Seadmed. Kui seade tühistati — looge uus kood.",
        },
        { type: "h3", text: "Toit on otsas" },
        {
          type: "p",
          text: "Ärge kustutage seda — vajutage „Peida toit“. See kaob avalikust menüüst ja toote selle tagasi nupuga „Näita toitu“.",
        },
        { type: "h3", text: "Vajate seadmeid/terminale, aga neid pole" },
        {
          type: "p",
          text: "Sektsioon „Seadmed“ on saadaval tasulise paketiga või aktiivse prooviperioodi ajal. Kontrollige Seaded → Makse.",
        },
        { type: "h3", text: "On veel küsimusi" },
        {
          type: "p",
          text: "Kirjutage meile Seaded → Tugi — see on sisseehitatud vestlus meie meeskonnaga.",
        },
      ],
    },
  ],
};
