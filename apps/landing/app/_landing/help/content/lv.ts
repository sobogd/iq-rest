import type { HelpDoc } from "../types";

// LV help guide.
export const lv: HelpDoc = {
  metaTitle: "Kā lietot IQ Rest — soli pa solim ceļvedis",
  metaDescription:
    "Pilns IQ Rest ceļvedis: reģistrācija, ēdienkarte, pasūtījumi, rezervācijas, virtuves ekrāns un iestatījumi — restorāniem.",
  h1: "Palīdzība",
  intro: "Detalizēts IQ Rest ceļvedis — no reģistrācijas līdz smalkiem iestatījumiem.",
  banner: {
    title: "Tas ir vienkāršāk, nekā šķiet",
    sub: "Soli pa solim ceļvedis: no reģistrācijas līdz smalkiem iestatījumiem — tiks galā ikviens.",
    cta: "Kā lietot",
  },
  tipLabel: "Padoms",
  noteLabel: "Svarīgi",
  sections: [
    {
      id: "start",
      title: "1. Sākums",
      blocks: [
        { type: "h3", text: "Kas ir šī sistēma" },
        {
          type: "p",
          text: "IQ Rest ir pakalpojums restorāniem: izveidojat tiešsaistes ēdienkarti ar QR kodu, pieņemat pasūtījumus un galdiņu rezervācijas tieši no viesu tālruņiem, bet virtuvē un pie viesmīļiem darbojas planšetes-termināļi. Visu pārvalda no vienas administrēšanas paneļa (informācijas paneļa).",
        },
        { type: "h3", text: "Reģistrācija un pieteikšanās" },
        { type: "p", text: "Pieteikties var trīs veidos — izvēlieties jebkuru pieteikšanās ekrānā:" },
        {
          type: "list",
          items: [
            "Ar Google — noklikšķiniet „Turpināt ar Google“ un izvēlieties kontu.",
            "Ar Apple — noklikšķiniet „Turpināt ar Apple“.",
            "Ar e-pastu — noklikšķiniet „Turpināt ar e-pastu“, ievadiet adresi, un mēs nosūtīsim 6 ciparu kodu. Ievadiet to nākamajā ekrānā. Parole nav nepieciešama.",
          ],
        },
        {
          type: "note",
          text: "Ar e-pastu saņemat tikai vienreizēju pieteikšanās kodu — bez surogātpasta, bez jaunumu vēstulēm.",
        },
        { type: "h3", text: "Restorāna izveide (ievadīšana)" },
        {
          type: "p",
          text: "Pirmajā pieteikšanās reizē sistēma izvada jūs cauri ātrai iestatīšanai. Pēc tam automātiski tiek izveidots restorāns ar parauga ēdienkartes veidni, ko vēlāk aizstāsiet ar savu.",
        },
        {
          type: "steps",
          items: [
            "Norādiet restorāna nosaukumu.",
            "Izvēlieties virtuves veidu (tas nosaka sākotnējo ēdienkartes veidni).",
            "Gatavs: nonākat informācijas panelī ar jau aizpildītu parauga ēdienkarti.",
          ],
        },
        {
          type: "note",
          text: "Valūta tiek noteikta automātiski pēc jūsu reģiona — sākumā tā nav jāizvēlas. Vēlāk mainīsiet Iestatījumi → Reģions.",
        },
        { type: "h3", text: "Informācijas paneļa pārskats" },
        {
          type: "p",
          text: "Navigācija starp sadaļām: datorā augšējā josla, tālrunī apakšējā josla. Sadaļas: Ēdienkarte, Pasūtījumi, Rezervācijas, Virtuve, Analītika un Iestatījumi.",
        },
        {
          type: "list",
          items: [
            "Blakus restorāna nosaukumam augšējā joslā ir mazs savienojuma indikators: zaļš punkts nozīmē, ka pasūtījumi sinhronizējas reāllaikā.",
            "Lapā „Ēdienkarte“ augšā ir poga „Priekšskatījums“ — atver jūsu ēdienkarti tā, kā to redz viesis.",
            "Blakus poga „Kopīgot“ — parāda QR kodu un saiti uz ēdienkarti (kopēt saiti, lejupielādēt QR vai atvērt ēdienkarti).",
          ],
        },
        {
          type: "tip",
          text: "Pēc katras ēdienkartes izmaiņas nospiediet „Priekšskatījums“ — uzreiz redzat, kā tas izskatās viesim.",
        },
      ],
    },
    {
      id: "menu",
      title: "2. Ēdienkarte",
      blocks: [
        {
          type: "p",
          text: "Sadaļa „Ēdienkarte“ ir sistēmas sirds. Šeit veidojat struktūru: kategorijas → ēdieni → opcijas. Atveriet to no navigācijas.",
        },
        { type: "h3", text: "Kategorijas un apakškategorijas" },
        {
          type: "steps",
          items: [
            "Nospiediet „Pievienot kategoriju“ un ievadiet nosaukumu (piemēram „Uzkodas“).",
            "Lai rediģētu kategoriju — uzvirziet uz tās un nospiediet „Rediģēt kategoriju“.",
            "Kategoriju secību maina ar pogām „Augšup“ / „Lejup“ — tieši šādā secībā tās redz viesis.",
            "Var izveidot „Grupu“ (caur „Pievienot grupu“) — sadaļas kategoriju, kurā ir citas kategorijas.",
          ],
        },
        { type: "h3", text: "Ēdienu pievienošana" },
        {
          type: "steps",
          items: [
            "Izvērsiet kategoriju (bultiņa pa kreisi) un nospiediet „Pievienot ēdienu“.",
            "Aizpildiet nosaukumu, cenu un aprakstu.",
            "Pievienojiet fotoattēlu: „Pievienot fotoattēlu“ — augšupielādējiet savu vai nospiediet „Ģenerēt“ un aprakstiet ēdienu vārdos, lai MI izveido attēlu.",
            "Saglabājiet. Ēdiens parādās kategorijā.",
          ],
        },
        {
          type: "tip",
          text: "Fotoattēlu var ģenerēt ar MI: norādiet leņķi, apgaismojumu vai fonu (piemēram „Pica Margherita uz koka dēlīša, skats no augšas“).",
        },
        { type: "h3", text: "Opcijas un varianti (modifikatori)" },
        {
          type: "p",
          text: "Opcijas ir izvēles ēdiena ietvaros: izmērs, gatavības pakāpe, papildu sastāvdaļas. Katrai opcijai ir varianti, un variantam var pievienot piemaksu (piemēram „+1.50 par gabalu“).",
        },
        {
          type: "list",
          items: [
            "Piemērs: opcija „Izmērs“ ar variantiem „Maza / Liela (+2.00)“.",
            "Piemērs: opcija „Papildu“ ar vairākiem variantiem, no kuriem viesis izvēlas vienu vai vairākus.",
          ],
        },
        { type: "h3", text: "Alergēni un diētas" },
        {
          type: "p",
          text: "Ēdienam var atzīmēt alergēnus (lipeklis, rieksti utt.) un diētas marķējumus (veģetārs, vegāns). Viesis tos redz kā ikonas publiskajā ēdienkartē.",
        },
        { type: "h3", text: "Ēdienu redzamība" },
        {
          type: "p",
          text: "Poga „Slēpt ēdienu“ / „Rādīt ēdienu“ uz laiku noņem pozīciju no publiskās ēdienkartes, to nedzēšot — ērti, kad ēdiens beidzies.",
        },
        { type: "h3", text: "Papīra ēdienkartes augšupielāde (skenēšana)" },
        {
          type: "p",
          text: "Ja jums jau ir ēdienkarte kā fotoattēls vai PDF — neievadiet to manuāli. Izmantojiet skenēšanu:",
        },
        {
          type: "steps",
          items: [
            "Nospiediet baneri „Augšupielādēt ēdienkarti“ (vai „Augšupielādējiet savu papīra ēdienkarti“).",
            "Pievienojiet līdz 5 failiem (foto/skens, katrs līdz 20 MB) un nospiediet „Skenēt“.",
            "Pagaidiet līdz minūtei — MI atpazīst kategorijas un ēdienus.",
            "Pārbaudiet atpazīto, atzīmējiet vēlamās pozīcijas un nospiediet „Turpināt“.",
            "Izvēlieties: aizstāt pašreizējo ēdienkarti vai pievienot jaunās pozīcijas esošajai.",
          ],
        },
        {
          type: "note",
          text: "Sākuma veidnes paraugi tiek noņemti, saglabājot skenēto ēdienkarti — tas ir normāli.",
        },
      ],
    },
    {
      id: "tables",
      title: "3. Galdiņi un QR kodi",
      blocks: [
        {
          type: "p",
          text: "Galdiņi kalpo, lai sasaistītu pasūtījumus un rezervācijas ar konkrētām vietām un drukātu personīgos QR kodus. Sadaļa: Iestatījumi → Galdiņi.",
        },
        { type: "h3", text: "Galdiņu izveide" },
        {
          type: "steps",
          items: [
            "Atveriet Iestatījumi → Galdiņi un nospiediet „Pievienot galdiņu“.",
            "Norādiet galdiņa numuru, vietu skaitu un (pēc izvēles) nosaukumu — piemēram „Logs“, „Bārs“, „Terase“.",
            "Pievienojiet galdiņa fotoattēlu — viesi to redz un saprot, kur tieši ir viņu galdiņš.",
            "Iestatiet galdiņa krāsu — ar šo krāsu galdiņš tiek izcelts virtuvē un sadaļā „Pasūtījumi“, lai personāls to ātri atrastu.",
            "Ja vēlaties, pievienojiet īsu aprakstu.",
            "Saglabājiet.",
          ],
        },
        {
          type: "note",
          text: "Galdiņa fotoattēls ir viesiem (orientieris „kur ir mans galdiņš“). Krāsa ir personālam (ātrs galdiņa vizuāls marķējums virtuvē un pasūtījumos).",
        },
        { type: "h3", text: "Galdiņa QR kods" },
        {
          type: "p",
          text: "Katram galdiņam ir savs QR kods. Viesis to skenē ar tālruni un nonāk tieši šī galdiņa ēdienkartē — pasūtījums automātiski sasaistās ar pareizo galdiņu.",
        },
        {
          type: "steps",
          items: [
            "Nospiediet „Rādīt QR kodu“ pie vēlamā galdiņa.",
            "Nospiediet „Lejupielādēt QR“, lai saglabātu attēlu.",
            "Izdrukājiet to un novietojiet uz galdiņa (uz statīva, ēdienkartē, uz uzlīmes).",
          ],
        },
        {
          type: "tip",
          text: "„Galdiņa saite“ ir tā pati saite kā QR, tikai kā teksts. Varat to nosūtīt viesim ziņojumā.",
        },
      ],
    },
    {
      id: "orders",
      title: "4. Pasūtījumi",
      blocks: [
        { type: "h3", text: "Kā viesis pasūta" },
        {
          type: "p",
          text: "Viesis skenē QR uz galdiņa → atveras ēdienkarte → izvēlas ēdienus, opcijas un daudzumu → iesniedz pasūtījumu. Pasūtījums uzreiz parādās jūsu informācijas panelī un virtuves/viesmīļa terminālī.",
        },
        {
          type: "note",
          text: "Lai viesi varētu pasūtīt, Iestatījumi → Pasūtījumi jābūt ieslēgtam „Pieņemt pasūtījumus“. Ja izslēgts, viesis redz ēdienkarti, bet pasūtījuma pogas nav.",
        },
        { type: "h3", text: "Darbs ar pasūtījumiem informācijas panelī" },
        {
          type: "p",
          text: "Sadaļa „Pasūtījumi“ rāda zāles plānu. Aizņemtie galdiņi ir izcelti un rāda aktīvo pasūtījumu skaitu. Pieskarieties galdiņam, lai atvērtu tā pasūtījumus.",
        },
        {
          type: "steps",
          items: [
            "Pieskarieties galdiņam → „Sākt pasūtījumu“ (vai atveriet esošu).",
            "„Pievienot pozīciju“ → izvēlieties kategoriju → ēdienu → opcijas → vajadzības gadījumā norādiet daudzumu un piezīmes (piemēram „bez sīpoliem“).",
            "Nospiediet „Pievienot“ — pozīcija nonāk pasūtījumā.",
          ],
        },
        { type: "h3", text: "Pozīciju statusi" },
        {
          type: "p",
          text: "Katrai pozīcijai ir statuss: Gaida → Gatavojas → Gatavs → Pasniegts. Pieskarieties pozīcijai, lai pārslēgtu statusu. Statusi sinhronizējas ar virtuvi reāllaikā.",
        },
        { type: "h3", text: "Atlaides, sadalīšana, galdiņa maiņa" },
        {
          type: "list",
          items: [
            "Atlaide: „Pievienot atlaidi“ — procents vai fiksēta summa, visam pasūtījumam vai vienai pozīcijai, ar iemeslu.",
            "Sadalīt pasūtījumu: „Sadalīt pasūtījumu“ — izvēlieties pozīcijas, kas dosies uz jaunu atsevišķu rēķinu.",
            "Mainīt galdiņu: „Mainīt galdiņu“ — pārvietojiet pasūtījumu uz citu galdiņu.",
            "Dublēt pozīciju: ātri pievienojiet vēl vienu tādu pašu.",
          ],
        },
        { type: "h3", text: "Pasūtījuma pabeigšana" },
        {
          type: "steps",
          items: [
            "Kad visas pozīcijas pasniegtas, nospiediet „Pabeigt pasūtījumu“.",
            "Izvēlieties maksājuma veidu (ja veidi konfigurēti).",
            "Pasūtījums tiek aizvērts un pamet aktīvos.",
          ],
        },
      ],
    },
    {
      id: "kitchen",
      title: "5. Virtuve (KDS)",
      blocks: [
        {
          type: "p",
          text: "Virtuves ekrāns (KDS) ir ekrāns uz planšetes pavāriem. Jaunie pasūtījumi uz tā nonāk reāllaikā, un pavārs atzīmē ēdienus kā gatavus.",
        },
        { type: "h3", text: "Ko rāda ekrāns" },
        {
          type: "list",
          items: [
            "Pasūtījumu kartītes ar pozīcijām, opcijām un laiku „uz izsniegšanas“.",
            "Krāsains statusa apzīmējums: kas gatavojas, kas gatavs.",
            "Skaņas signāls, pienākot jaunam pasūtījumam.",
          ],
        },
        { type: "h3", text: "Kā lietot" },
        {
          type: "steps",
          items: [
            "Pieskarieties pozīcijai, lai pārvietotu to uz nākamo statusu (Gatavojas → Gatavs).",
            "Ieslēdziet skaņu ar pogu „Ieslēgt skaņu“ — tad jaunie pasūtījumi pienāk ar skaņas signālu.",
            "Ar tālummaiņu pielāgojiet kartīšu izmēru planšetei.",
            "Ar filtriem var rādīt tikai vajadzīgās kategorijas (piemēram, tikai silto līniju).",
          ],
        },
        {
          type: "note",
          text: "Ja planšete zaudē internetu, parādās brīdinājums „Nav savienojuma“. Pievienojiet Wi-Fi, un pasūtījumi atkal sāks pienākt.",
        },
      ],
    },
    {
      id: "reservations",
      title: "6. Rezervācijas",
      blocks: [
        {
          type: "p",
          text: "Viesi var rezervēt galdiņu caur jūsu ēdienkarti, bet jūs pārvaldāt rezervācijas sadaļā „Rezervācijas“ (skats „Mēnesis“ / „Diena“).",
        },
        { type: "h3", text: "Rezervāciju iestatīšana" },
        { type: "p", text: "Vispirms ieslēdziet un konfigurējiet rezervācijas: Iestatījumi → Rezervācijas." },
        {
          type: "steps",
          items: [
            "Ieslēdziet „Iespējot rezervācijas“.",
            "Izvēlieties apstiprināšanas režīmu: „Automātisks“ (rezervācijas apstiprinās pašas) vai „Manuāls“ (katru apstiprināt jūs).",
            "Iestatiet „Rezervācijas ilgumu“ — cik ilgi galdiņš tiek turēts viesim.",
            "Aizpildiet „Nedēļas grafiku“: katrai dienai — atvērts/slēgts, darba laiks un vajadzības gadījumā pusdienu pārtraukums.",
          ],
        },
        {
          type: "note",
          text: "Lai pieņemtu rezervācijas, vajadzīgi galdiņi. Ja to nav, sistēma lūgs vispirms pievienot galdiņus.",
        },
        { type: "h3", text: "Darbs ar rezervācijām" },
        {
          type: "list",
          items: [
            "Jaunās rezervācijas, kas gaida lēmumu, ir apkopotas blokā „Gaida apstiprinājumu“.",
            "Pogas „Apstiprināt“ / „Noraidīt“ — katrai rezervācijai.",
            "„Pabeigt“ — atzīmē, ka viesis ieradies un rezervācija izpildīta.",
            "Pārslēdzieties starp „Mēnesis“ un „Diena“, pārlapojiet periodu ar pogām „Atpakaļ“ / „Uz priekšu“.",
          ],
        },
      ],
    },
    {
      id: "devices",
      title: "7. Ierīces (planšetes)",
      blocks: [
        {
          type: "p",
          text: "Virtuves, viesmīļa un rezervāciju termināļi ir atsevišķas planšetes, kas pieslēdzas jūsu kontam ar kodu. Sadaļa: Iestatījumi → Ierīces.",
        },
        {
          type: "note",
          text: "Ierīces pieejamas ar maksas plānu vai aktīva izmēģinājuma laikā.",
        },
        { type: "h3", text: "Planšetes pieslēgšana (savienošana)" },
        {
          type: "steps",
          items: [
            "Informācijas panelī: Iestatījumi → Ierīces → „Pievienot ierīci“.",
            "Norādiet nosaukumu (piemēram „Virtuve — siltā līnija“) un veidu: Virtuve, Viesmīlis vai Rezervācijas.",
            "Nospiediet „Ģenerēt kodu“ — parādās 6 ciparu kods (derīgs 2 minūtes).",
            "Planšetē atveriet pieslēgšanas ekrānu un ievadiet šo kodu.",
            "Planšete pieslēdzas un uzreiz sāk darboties izvēlētajā lomā.",
          ],
        },
        { type: "tip", text: "Ja kods beidzies — vienkārši nospiediet „Jauns kods“ un ievadiet svaigo." },
        { type: "h3", text: "Ierīču pārvaldība" },
        {
          type: "list",
          items: [
            "Statusi: Tiešsaistē / Bezsaistē / Gaida pieslēgšanu / Atsaukts.",
            "„Atsaukt“ — atvieno planšeti (piemēram, ja pazaudēta). Atkārtotai pieteikšanās nepieciešams jauns kods.",
            "„Dzēst“ — neatgriezeniski noņem ierīci no saraksta.",
          ],
        },
      ],
    },
    {
      id: "analytics",
      title: "8. Analītika",
      blocks: [
        {
          type: "p",
          text: "Sadaļa „Analītika“ rāda iestādes galvenos skaitļus: ieņēmumus, pasūtījumu skaitu un to sadalījumu (piemēram, pēc maksājuma veida un laika). Izmantojiet to, lai saprastu, kas un kad pārdodas vislabāk.",
        },
      ],
    },
    {
      id: "settings",
      title: "9. Iestatījumi",
      blocks: [
        {
          type: "p",
          text: "Sadaļa „Iestatījumi“ atveras kā sadaļu kartīšu kopa. Augšā ir aktīvā restorāna pārslēdzējs (ja jums to ir vairāki). Zem tā — katra kartīte pēc kārtas.",
        },
        { type: "h3", text: "Vietne" },
        {
          type: "list",
          items: [
            "Publiskās ēdienkartes URL — jūsu ēdienkartes unikālā adrese (varat iestatīt savu īso slug un kopēt saiti).",
            "Iestādes nosaukums (virsraksts) publiskajā vietnē.",
            "Akcenta krāsa — pogu un izcēlumu galvenā krāsa ēdienkartē.",
            "Fons — attēls vai video sākumlapā; augšupielādējiet savu vai ģenerējiet fonu ar MI no apraksta.",
            "Ēdienkartes izkārtojums — kā ēdieni tiek rādīti viesim.",
          ],
        },
        { type: "h3", text: "Kontakti un adrese" },
        {
          type: "p",
          text: "Tālrunis, Instagram, WhatsApp un atzīme kartē — viss tiek rādīts viesim jūsu ēdienkartes kontaktu lapā.",
        },
        { type: "h3", text: "Reģions" },
        { type: "p", text: "Valūta (izmantota visām cenām) un iestādes laika josla." },
        { type: "h3", text: "Galdiņi" },
        { type: "p", text: "Zāles plāns, vietas un galdiņu QR kodi — sīkāk 3. sadaļā." },
        { type: "h3", text: "Ierīces" },
        {
          type: "p",
          text: "Planšešu pieslēgšana virtuves ekrānam un viesmīļu termināļiem — sīkāk 7. sadaļā.",
        },
        { type: "h3", text: "Pasūtījumi" },
        {
          type: "list",
          items: [
            "„Pieņemt pasūtījumus“ — galvenais pasūtījumu pieņemšanas slēdzis.",
            "„Pasūtījumu režīms“ — Iekšējais un/vai WhatsApp.",
            "„Obligātie lauki“ — kādus datus viesim jānorāda (Vārds, Tālrunis, Adrese).",
            "„Maksājuma veidi“ — restorāna maksājumu sistēmas integrācijai sazinieties ar atbalstu.",
          ],
        },
        { type: "h3", text: "Rezervācijas" },
        {
          type: "p",
          text: "Rezervāciju ieslēgšana, automātiska vai manuāla apstiprināšana, ilgums un darba laiks — sīkāk 6. sadaļā.",
        },
        { type: "h3", text: "Valodas" },
        {
          type: "steps",
          items: [
            "Atveriet Iestatījumi → Valodas.",
            "Izvēlieties valodas, kurās tiek tulkota publiskā ēdienkarte (pieskaroties pievienojat/noņemat).",
            "Iestatiet noklusējuma valodu.",
            "Tekstus tulko manuāli vai ar pogu „Tulkot ar MI“ — sistēma tulko ēdienu nosaukumus un aprakstus izvēlētajās valodās.",
          ],
        },
        { type: "h3", text: "Maksājums" },
        { type: "p", text: "Abonementa plāns, izmēģinājuma statuss un maksājumu pārvaldība." },
        {
          type: "list",
          items: [
            "Ikmēneša vai ikgadēja norēķināšanās (ikgadējā lētāka).",
            "„Abonēt“ / „Pārslēgt“ — izvēlieties vai mainiet plānu.",
            "„Pārvaldīt“ — mainiet maksājuma veidu vai atceliet abonementu.",
          ],
        },
        {
          type: "note",
          text: "Maksājums notiek EUR. Lai maksātu citā valūtā, sazinieties ar atbalstu.",
        },
        { type: "h3", text: "Atbalsts" },
        {
          type: "p",
          text: "Iebūvēta tērzēšana ar mūsu komandu reāllaikā. Uzrakstiet ziņojumu — atbildam tieši šeit.",
        },
        { type: "h3", text: "Restorānu pārslēgšana un pievienošana" },
        {
          type: "p",
          text: "Ja jums ir vairākas iestādes, restorāna pārslēdzējs ir sadaļas „Iestatījumi“ augšā.",
        },
        {
          type: "steps",
          items: [
            "Atveriet restorānu pārslēdzēju „Iestatījumu“ augšā.",
            "„Pievienot restorānu“ → ievadiet nosaukumu.",
            "Izvēlieties „Dublēt pašreizējo ēdienkarti un iestatījumus“ (ātrs sākums) vai „Sākt no nulles“ (tukšs restorāns).",
            "Izveidojiet to — un jebkurā brīdī pārslēdzieties starp restorāniem tieši šeit.",
          ],
        },
      ],
    },
    {
      id: "public-menu",
      title: "10. Publiskā ēdienkarte viesiem",
      blocks: [
        {
          type: "p",
          text: "Publiskā ēdienkarte ir tas, ko viesis redz pēc QR skenēšanas. Tā automātiski tiek izveidota no jūsu ēdienkartes, zīmola un kontaktiem.",
        },
        {
          type: "list",
          items: [
            "Ēdienkartes adrese tiek iestatīta Iestatījumi → Reģions („Ēdienkartes saite“).",
            "Vispārējo QR kodu un ēdienkartes saiti iegūstat ar pogu „Kopīgot“ lapā „Ēdienkarte“.",
            "Katram galdiņam ir savs atsevišķs QR (Iestatījumi → Galdiņi), kas ved uz tieši šī galdiņa ēdienkarti.",
            "Izskats (fons, akcenta krāsa, izkārtojums) tiek konfigurēts sadaļā „Vietne“.",
            "Poga „Priekšskatījums“ atver ēdienkarti tā, kā to redz viesis.",
          ],
        },
        {
          type: "tip",
          text: "Pēc jebkuras ēdienkartes/iestatījumu izmaiņas nospiediet „Priekšskatījums“, lai pārbaudītu, kā tas izskatās viesim.",
        },
      ],
    },
    {
      id: "faq",
      title: "11. Biežākie jautājumi un nianses",
      blocks: [
        { type: "h3", text: "Viesis nevar veikt pasūtījumu" },
        {
          type: "p",
          text: "Pārbaudiet Iestatījumi → Pasūtījumi → „Pieņemt pasūtījumus“ (jābūt ieslēgtam) un ka izvēlēts vismaz viens pasūtījumu režīms.",
        },
        { type: "h3", text: "Nepienāk rezervācijas" },
        {
          type: "p",
          text: "Pārliecinieties, ka rezervācijas ieslēgtas Iestatījumi → Rezervācijas, ka pievienoti galdiņi un ka diena grafikā nav atzīmēta kā „Slēgts“.",
        },
        { type: "h3", text: "Planšete nepieslēdzas" },
        {
          type: "p",
          text: "Kods derīgs 2 minūtes. Ja beidzies — ģenerējiet jaunu Iestatījumi → Ierīces. Ja ierīce atsaukta — izveidojiet jaunu kodu.",
        },
        { type: "h3", text: "Ēdiens beidzies" },
        {
          type: "p",
          text: "Nedzēsiet to — nospiediet „Slēpt ēdienu“. Tas pazūd no publiskās ēdienkartes, un to atgriežat ar pogu „Rādīt ēdienu“.",
        },
        { type: "h3", text: "Vajadzīgas ierīces/termināļi, bet to nav" },
        {
          type: "p",
          text: "Sadaļa „Ierīces“ pieejama ar maksas plānu vai aktīva izmēģinājuma laikā. Pārbaudiet Iestatījumi → Maksājums.",
        },
        { type: "h3", text: "Ir vēl jautājumi" },
        {
          type: "p",
          text: "Rakstiet mums Iestatījumi → Atbalsts — tā ir iebūvēta tērzēšana ar mūsu komandu.",
        },
      ],
    },
  ],
};
