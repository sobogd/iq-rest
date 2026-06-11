import type { HelpDoc } from "../types";

// SL help guide.
export const sl: HelpDoc = {
  metaTitle: "Kako uporabljati IQ Rest — vodnik korak za korakom",
  metaDescription:
    "Popoln vodnik po IQ Rest: registracija, meni, naročila, rezervacije, kuhinjski zaslon in nastavitve — za restavracije.",
  h1: "Pomoč",
  intro: "Podroben vodnik po IQ Rest — od registracije do natančnih nastavitev.",
  banner: {
    title: "Lažje je, kot se zdi",
    sub: "Vodnik korak za korakom: od registracije do natančnih nastavitev — zmore vsak.",
    cta: "Kako deluje",
  },
  tipLabel: "Namig",
  noteLabel: "Pomembno",
  sections: [
    {
      id: "start",
      title: "1. Začetek",
      blocks: [
        { type: "h3", text: "Kaj je ta sistem" },
        {
          type: "p",
          text: "IQ Rest je storitev za restavracije: ustvarite spletni meni s QR-kodo, sprejemate naročila in rezervacije miz neposredno s telefonov gostov, v kuhinji in pri natakarjih pa delujejo tablični terminali. Vse upravljate iz ene skrbniške plošče (nadzorne plošče).",
        },
        { type: "h3", text: "Registracija in prijava" },
        { type: "p", text: "Prijavite se lahko na tri načine — izberite katerega koli na prijavnem zaslonu:" },
        {
          type: "list",
          items: [
            "Z Googlom — kliknite »Nadaljuj z Googlom« in izberite račun.",
            "Z Applom — kliknite »Nadaljuj z Applom«.",
            "Po e-pošti — kliknite »Nadaljuj z e-pošto«, vnesite naslov, mi pa pošljemo 6-mestno kodo. Vnesite jo na naslednjem zaslonu. Gesla ni treba.",
          ],
        },
        {
          type: "note",
          text: "Po e-pošti dobite le enkratno kodo za prijavo — brez neželene pošte, brez novic.",
        },
        { type: "h3", text: "Ustvarjanje restavracije (uvajanje)" },
        {
          type: "p",
          text: "Ob prvi prijavi vas sistem popelje skozi hitro nastavitev. Nato se samodejno ustvari restavracija s primerno predlogo menija, ki jo pozneje zamenjate s svojo.",
        },
        {
          type: "steps",
          items: [
            "Vnesite ime restavracije.",
            "Izberite vrsto kuhinje (določa začetno predlogo menija).",
            "Končano: pristanete v nadzorni plošči z že izpolnjenim primernim menijem.",
          ],
        },
        {
          type: "note",
          text: "Valuta se samodejno zazna glede na vašo regijo — na začetku je ni treba izbrati. Pozneje jo spremenite v Nastavitve → Regija.",
        },
        { type: "h3", text: "Pregled nadzorne plošče" },
        {
          type: "p",
          text: "Navigacija med razdelki: na računalniku zgornja vrstica, na telefonu spodnja vrstica. Razdelki: Meni, Naročila, Rezervacije, Kuhinja, Analitika in Nastavitve.",
        },
        {
          type: "list",
          items: [
            "Poleg imena restavracije v zgornji vrstici je majhen indikator povezave: zelena pika pomeni, da se naročila sinhronizirajo v realnem času.",
            "Na strani »Meni« zgoraj je gumb »Predogled« — odpre vaš meni tako, kot ga vidi gost.",
            "Tik zraven gumb »Deli« — prikaže QR-kodo in povezavo do menija (kopiraj povezavo, prenesi QR ali odpri meni).",
          ],
        },
        {
          type: "tip",
          text: "Po vsaki spremembi menija pritisnite »Predogled« — takoj vidite, kako je videti za gosta.",
        },
      ],
    },
    {
      id: "menu",
      title: "2. Meni",
      blocks: [
        {
          type: "p",
          text: "Razdelek »Meni« je srce sistema. Tu zgradite strukturo: kategorije → jedi → možnosti. Odprite ga iz navigacije.",
        },
        { type: "h3", text: "Kategorije in podkategorije" },
        {
          type: "steps",
          items: [
            "Kliknite »Dodaj kategorijo« in vnesite ime (na primer »Predjedi«).",
            "Za urejanje kategorije — pojdite nanjo in kliknite »Uredi kategorijo«.",
            "Vrstni red kategorij spremenite z gumboma »Gor« / »Dol« — točno v tem vrstnem redu jih vidi gost.",
            "Ustvarite lahko »Skupino« (prek »Dodaj skupino«) — kategorijo-razdelek, ki vsebuje druge kategorije.",
          ],
        },
        { type: "h3", text: "Dodajanje jedi" },
        {
          type: "steps",
          items: [
            "Razširite kategorijo (puščica levo) in kliknite »Dodaj jed«.",
            "Izpolnite ime, ceno in opis.",
            "Dodajte fotografijo: »Dodaj fotografijo« — naložite svojo ali kliknite »Ustvari« in jed opišite z besedami, da UI ustvari sliko.",
            "Shranite. Jed se prikaže v kategoriji.",
          ],
        },
        {
          type: "tip",
          text: "Fotografijo lahko ustvari UI: navedite kot, osvetlitev ali ozadje (na primer »Pica Margherita na leseni deski, pogled od zgoraj«).",
        },
        { type: "h3", text: "Možnosti in različice (modifikatorji)" },
        {
          type: "p",
          text: "Možnosti so izbire znotraj jedi: velikost, pečenost, dodatne sestavine. Vsaka možnost ima različice, različici pa lahko dodate doplačilo (na primer »+1.50 na kos«).",
        },
        {
          type: "list",
          items: [
            "Primer: možnost »Velikost« z različicama »Majhna / Velika (+2.00)«.",
            "Primer: možnost »Dodatki« z več različicami, med katerimi gost izbere eno ali več.",
          ],
        },
        { type: "h3", text: "Alergeni in diete" },
        {
          type: "p",
          text: "Pri jedi lahko označite alergene (gluten, oreščki itd.) in dietne oznake (vegetarijansko, vegansko). Gost jih vidi kot ikone v javnem meniju.",
        },
        { type: "h3", text: "Vidnost jedi" },
        {
          type: "p",
          text: "Gumb »Skrij jed« / »Pokaži jed« začasno odstrani postavko iz javnega menija, ne da bi jo izbrisal — priročno, ko jedi zmanjka.",
        },
        { type: "h3", text: "Nalaganje papirnatega menija (skeniranje)" },
        {
          type: "p",
          text: "Če že imate meni kot fotografijo ali PDF — ne vnašajte ga ročno. Uporabite skeniranje:",
        },
        {
          type: "steps",
          items: [
            "Kliknite pasico »Naloži meni« (ali »Naložite svoj papirnati meni«).",
            "Dodajte do 5 datotek (fotografija/skena, vsaka do 20 MB) in kliknite »Skeniraj«.",
            "Počakajte do minute — UI prepozna kategorije in jedi.",
            "Preverite prepoznano, označite želene postavke in kliknite »Nadaljuj«.",
            "Izberite: zamenjaj trenutni meni ali dodaj nove postavke k obstoječemu.",
          ],
        },
        {
          type: "note",
          text: "Primeri iz začetne predloge se ob shranjevanju skeniranega menija odstranijo — to je normalno.",
        },
      ],
    },
    {
      id: "tables",
      title: "3. Mize in QR-kode",
      blocks: [
        {
          type: "p",
          text: "Mize služijo za povezovanje naročil in rezervacij z določenimi mesti ter za tiskanje osebnih QR-kod. Razdelek: Nastavitve → Mize.",
        },
        { type: "h3", text: "Ustvarjanje miz" },
        {
          type: "steps",
          items: [
            "Odprite Nastavitve → Mize in kliknite »Dodaj mizo«.",
            "Navedite številko mize, število sedežev in (neobvezno) ime — na primer »Okno«, »Bar«, »Terasa«.",
            "Dodajte fotografijo mize — gostje jo vidijo in razumejo, kje točno je njihova miza.",
            "Nastavite barvo mize — s to barvo je miza poudarjena v kuhinji in v razdelku »Naročila«, da jo osebje hitro najde.",
            "Po želji dodajte kratek opis.",
            "Shranite.",
          ],
        },
        {
          type: "note",
          text: "Fotografija mize je za goste (usmeritev »kje je moja miza«). Barva je za osebje (hitra vizualna oznaka mize v kuhinji in naročilih).",
        },
        { type: "h3", text: "QR-koda mize" },
        {
          type: "p",
          text: "Vsaka miza ima svojo QR-kodo. Gost jo skenira s telefonom in pristane neposredno v meniju te mize — naročilo se samodejno poveže s pravo mizo.",
        },
        {
          type: "steps",
          items: [
            "Kliknite »Pokaži QR-kodo« pri želeni mizi.",
            "Kliknite »Prenesi QR«, da shranite sliko.",
            "Natisnite jo in postavite na mizo (na stojalo, v meni, na nalepko).",
          ],
        },
        {
          type: "tip",
          text: "»Povezava mize« je ista povezava kot v QR, le kot besedilo. Lahko jo gostu pošljete v sporočilu.",
        },
      ],
    },
    {
      id: "orders",
      title: "4. Naročila",
      blocks: [
        { type: "h3", text: "Kako gost naroči" },
        {
          type: "p",
          text: "Gost skenira QR na mizi → odpre se meni → izbere jedi, možnosti in količino → odda naročilo. Naročilo se takoj prikaže v vaši nadzorni plošči in na terminalu kuhinje/natakarja.",
        },
        {
          type: "note",
          text: "Da lahko gostje naročajo, mora biti v Nastavitve → Naročila vklopljeno »Sprejemaj naročila«. Če je izklopljeno, gost vidi meni, a gumba za naročilo ni.",
        },
        { type: "h3", text: "Delo z naročili v nadzorni plošči" },
        {
          type: "p",
          text: "Razdelek »Naročila« prikazuje tloris. Zasedene mize so poudarjene in prikazujejo število aktivnih naročil. Tapnite mizo, da odprete njena naročila.",
        },
        {
          type: "steps",
          items: [
            "Tapnite mizo → »Začni naročilo« (ali odprite obstoječe).",
            "»Dodaj postavko« → izberite kategorijo → jed → možnosti → po potrebi navedite količino in opombe (na primer »brez čebule«).",
            "Kliknite »Dodaj« — postavka pride v naročilo.",
          ],
        },
        { type: "h3", text: "Statusi postavk" },
        {
          type: "p",
          text: "Vsaka postavka ima status: Čaka → Se pripravlja → Pripravljeno → Postreženo. Tapnite postavko, da preklopite status. Statusi se sinhronizirajo s kuhinjo v realnem času.",
        },
        { type: "h3", text: "Popusti, delitev, menjava mize" },
        {
          type: "list",
          items: [
            "Popust: »Dodaj popust« — odstotek ali fiksni znesek, na celotno naročilo ali eno postavko, z razlogom.",
            "Razdeli naročilo: »Razdeli naročilo« — izberite postavke, ki gredo na nov ločen račun.",
            "Zamenjaj mizo: »Zamenjaj mizo« — premaknite naročilo na drugo mizo.",
            "Podvoji postavko: hitro dodajte še eno enako.",
          ],
        },
        { type: "h3", text: "Zaključek naročila" },
        {
          type: "steps",
          items: [
            "Ko so vse postavke postrežene, kliknite »Zaključi naročilo«.",
            "Izberite način plačila (če so načini nastavljeni).",
            "Naročilo se zapre in zapusti aktivna.",
          ],
        },
      ],
    },
    {
      id: "kitchen",
      title: "5. Kuhinja (KDS)",
      blocks: [
        {
          type: "p",
          text: "Kuhinjski zaslon (KDS) je zaslon na tablici za kuharje. Nova naročila prihajajo nanj v realnem času, kuhar pa jedi označi kot pripravljene.",
        },
        { type: "h3", text: "Kaj prikazuje zaslon" },
        {
          type: "list",
          items: [
            "Kartice naročil s postavkami, možnostmi in časom »na izdaji«.",
            "Barvna oznaka statusa: kaj se pripravlja, kaj je pripravljeno.",
            "Zvočni signal ob prihodu novega naročila.",
          ],
        },
        { type: "h3", text: "Kako se uporablja" },
        {
          type: "steps",
          items: [
            "Tapnite postavko, da jo premaknete v naslednji status (Se pripravlja → Pripravljeno).",
            "Vklopite zvok z gumbom »Vklopi zvok« — takrat nova naročila prihajajo z zvočnim signalom.",
            "Z zoomom prilagodite velikost kartic tablici.",
            "S filtri lahko prikažete le potrebne kategorije (na primer le toplo linijo).",
          ],
        },
        {
          type: "note",
          text: "Če tablica izgubi internet, se prikaže opozorilo »Ni povezave«. Povežite Wi-Fi in naročila bodo spet prihajala.",
        },
      ],
    },
    {
      id: "reservations",
      title: "6. Rezervacije",
      blocks: [
        {
          type: "p",
          text: "Gostje lahko prek vašega menija rezervirajo mizo, vi pa upravljate rezervacije v razdelku »Rezervacije« (pogled »Mesec« / »Dan«).",
        },
        { type: "h3", text: "Nastavitev rezervacij" },
        { type: "p", text: "Najprej vklopite in nastavite rezervacije: Nastavitve → Rezervacije." },
        {
          type: "steps",
          items: [
            "Vklopite »Omogoči rezervacije«.",
            "Izberite način potrjevanja: »Samodejno« (rezervacije se potrdijo same) ali »Ročno« (vsako potrdite vi).",
            "Nastavite »Trajanje rezervacije« — kako dolgo se miza drži za gosta.",
            "Izpolnite »Tedenski urnik«: za vsak dan — odprto/zaprto, delovni čas in po potrebi opoldanski premor.",
          ],
        },
        {
          type: "note",
          text: "Za sprejemanje rezervacij potrebujete mize. Če jih ni, sistem zahteva, da jih najprej dodate.",
        },
        { type: "h3", text: "Delo z rezervacijami" },
        {
          type: "list",
          items: [
            "Nove rezervacije, ki čakajo na odločitev, so zbrane v bloku »Čakajo na potrditev«.",
            "Gumba »Potrdi« / »Zavrni« — za vsako rezervacijo.",
            "»Zaključi« — označi, da je gost prišel in je rezervacija opravljena.",
            "Preklapljajte med »Mesec« in »Dan«, listajte obdobje z gumboma »Nazaj« / »Naprej«.",
          ],
        },
      ],
    },
    {
      id: "devices",
      title: "7. Naprave (tablice)",
      blocks: [
        {
          type: "p",
          text: "Terminali kuhinje, natakarja in rezervacij so ločene tablice, ki se z vašim računom povežejo s kodo. Razdelek: Nastavitve → Naprave.",
        },
        {
          type: "note",
          text: "Naprave so na voljo na plačljivem paketu ali med aktivnim poskusnim obdobjem.",
        },
        { type: "h3", text: "Povezovanje tablice (seznanjanje)" },
        {
          type: "steps",
          items: [
            "V nadzorni plošči: Nastavitve → Naprave → »Dodaj napravo«.",
            "Navedite ime (na primer »Kuhinja — topla linija«) in vrsto: Kuhinja, Natakar ali Rezervacije.",
            "Kliknite »Ustvari kodo« — pojavi se 6-mestna koda (veljavna 2 minuti).",
            "Na tablici odprite zaslon za povezavo in vnesite to kodo.",
            "Tablica se poveže in takoj začne delovati v izbrani vlogi.",
          ],
        },
        { type: "tip", text: "Če je koda potekla — kliknite »Nova koda« in vnesite svežo." },
        { type: "h3", text: "Upravljanje naprav" },
        {
          type: "list",
          items: [
            "Statusi: Na spletu / Brez povezave / Čaka na povezavo / Preklicano.",
            "»Prekliči« — odklopi tablico (na primer ob izgubi). Za ponovno prijavo je potrebna nova koda.",
            "»Izbriši« — trajno odstrani napravo s seznama.",
          ],
        },
      ],
    },
    {
      id: "analytics",
      title: "8. Analitika",
      blocks: [
        {
          type: "p",
          text: "Razdelek »Analitika« prikazuje ključne številke lokala: promet, število naročil in njihovo razčlenitev (na primer po načinu plačila in času). Uporabite jo, da razumete, kaj in kdaj se najbolje prodaja.",
        },
      ],
    },
    {
      id: "settings",
      title: "9. Nastavitve",
      blocks: [
        {
          type: "p",
          text: "Razdelek »Nastavitve« se odpre kot niz kartic-razdelkov. Zgoraj je preklopnik aktivne restavracije (če jih imate več). Pod njim — vsaka kartica po vrsti.",
        },
        { type: "h3", text: "Spletno mesto" },
        {
          type: "list",
          items: [
            "URL javnega menija — edinstven naslov vašega menija (nastavite lahko svoj kratek slug in kopirate povezavo).",
            "Ime (naslov) lokala na javnem spletnem mestu.",
            "Poudarna barva — glavna barva gumbov in poudarkov v meniju.",
            "Ozadje — slika ali video na začetni strani; naložite svoje ali ustvarite ozadje z UI iz opisa.",
            "Postavitev menija — kako so jedi prikazane gostu.",
          ],
        },
        { type: "h3", text: "Stiki in naslov" },
        {
          type: "p",
          text: "Telefon, Instagram, WhatsApp in oznaka na zemljevidu — vse je gostu prikazano na strani s stiki vašega menija.",
        },
        { type: "h3", text: "Regija" },
        { type: "p", text: "Valuta (uporabljena za vse cene) in časovni pas lokala." },
        { type: "h3", text: "Mize" },
        { type: "p", text: "Tloris, sedeži in QR-kode miz — podrobno v razdelku 3." },
        { type: "h3", text: "Naprave" },
        {
          type: "p",
          text: "Povezovanje tablic za kuhinjski zaslon in terminale natakarjev — podrobno v razdelku 7.",
        },
        { type: "h3", text: "Naročila" },
        {
          type: "list",
          items: [
            "»Sprejemaj naročila« — glavno stikalo za sprejemanje naročil.",
            "»Način naročil« — Interni in/ali WhatsApp.",
            "»Obvezna polja« — katere podatke mora gost navesti (Ime, Telefon, Naslov).",
            "»Načini plačila« — za integracijo plačilnega sistema restavracije se obrnite na podporo.",
          ],
        },
        { type: "h3", text: "Rezervacije" },
        {
          type: "p",
          text: "Vklop rezervacij, samodejna ali ročna potrditev, trajanje in delovni čas — podrobno v razdelku 6.",
        },
        { type: "h3", text: "Jeziki" },
        {
          type: "steps",
          items: [
            "Odprite Nastavitve → Jeziki.",
            "Izberite jezike, v katere se prevaja javni meni (tapnite za dodajanje/odstranjevanje).",
            "Nastavite privzeti jezik.",
            "Besedila se prevajajo ročno ali z gumbom »Prevedi z UI« — sistem prevede imena in opise jedi v izbrane jezike.",
          ],
        },
        { type: "h3", text: "Plačilo" },
        { type: "p", text: "Naročniški paket, status poskusnega obdobja in upravljanje plačil." },
        {
          type: "list",
          items: [
            "Mesečno ali letno obračunavanje (letno je ceneje).",
            "»Naroči se« / »Preklopi« — izberite ali zamenjajte paket.",
            "»Upravljaj« — spremenite način plačila ali prekličite naročnino.",
          ],
        },
        {
          type: "note",
          text: "Plačilo poteka v EUR. Za plačilo v drugi valuti se obrnite na podporo.",
        },
        { type: "h3", text: "Podpora" },
        {
          type: "p",
          text: "Vgrajen klepet z našo ekipo v realnem času. Napišite sporočilo — odgovorimo kar tukaj.",
        },
        { type: "h3", text: "Preklapljanje in dodajanje restavracij" },
        {
          type: "p",
          text: "Če imate več lokalov, je preklopnik restavracije na vrhu razdelka »Nastavitve«.",
        },
        {
          type: "steps",
          items: [
            "Odprite preklopnik restavracij na vrhu »Nastavitev«.",
            "»Dodaj restavracijo« → vnesite ime.",
            "Izberite »Podvoji trenutni meni in nastavitve« (hiter začetek) ali »Začni iz nič« (prazna restavracija).",
            "Ustvarite jo — in kadar koli preklapljajte med restavracijami kar tukaj.",
          ],
        },
      ],
    },
    {
      id: "public-menu",
      title: "10. Javni meni za goste",
      blocks: [
        {
          type: "p",
          text: "Javni meni je tisto, kar gost vidi po skeniranju QR. Samodejno se sestavi iz vašega menija, znamčenja in stikov.",
        },
        {
          type: "list",
          items: [
            "Naslov menija se nastavi v Nastavitve → Regija (»Povezava do menija«).",
            "Splošno QR-kodo in povezavo do menija dobite z gumbom »Deli« na strani »Meni«.",
            "Vsaka miza ima svojo ločeno QR (Nastavitve → Mize), ki vodi v meni točno te mize.",
            "Videz (ozadje, poudarna barva, postavitev) se nastavi v razdelku »Spletno mesto«.",
            "Gumb »Predogled« odpre meni tako, kot ga vidi gost.",
          ],
        },
        {
          type: "tip",
          text: "Po vsaki spremembi menija/nastavitev pritisnite »Predogled«, da preverite, kako je videti za gosta.",
        },
      ],
    },
    {
      id: "faq",
      title: "11. Pogosta vprašanja in podrobnosti",
      blocks: [
        { type: "h3", text: "Gost ne more oddati naročila" },
        {
          type: "p",
          text: "Preverite Nastavitve → Naročila → »Sprejemaj naročila« (mora biti vklopljeno) in da je izbran vsaj en način naročil.",
        },
        { type: "h3", text: "Rezervacije ne prihajajo" },
        {
          type: "p",
          text: "Poskrbite, da so rezervacije vklopljene v Nastavitve → Rezervacije, da so dodane mize in da dan v urniku ni označen kot »Zaprto«.",
        },
        { type: "h3", text: "Tablica se ne poveže" },
        {
          type: "p",
          text: "Koda velja 2 minuti. Če je potekla — ustvarite novo v Nastavitve → Naprave. Če je bila naprava preklicana — ustvarite novo kodo.",
        },
        { type: "h3", text: "Jedi je zmanjkalo" },
        {
          type: "p",
          text: "Ne brišite je — kliknite »Skrij jed«. Izgine iz javnega menija, vrnete pa jo z gumbom »Pokaži jed«.",
        },
        { type: "h3", text: "Potrebujete naprave/terminale, a jih nimate" },
        {
          type: "p",
          text: "Razdelek »Naprave« je na voljo na plačljivem paketu ali med aktivnim poskusnim obdobjem. Preverite Nastavitve → Plačilo.",
        },
        { type: "h3", text: "Imate še vprašanja" },
        {
          type: "p",
          text: "Pišite nam v Nastavitve → Podpora — to je vgrajen klepet z našo ekipo.",
        },
      ],
    },
  ],
};
