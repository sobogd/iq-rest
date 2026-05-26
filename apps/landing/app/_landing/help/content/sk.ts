import type { HelpDoc } from "../types";

// SK help guide.
export const sk: HelpDoc = {
  metaTitle: "Ako používať IQ Rest — návod krok za krokom",
  metaDescription:
    "Kompletný návod na IQ Rest: registrácia, menu, objednávky, rezervácie, kuchynský displej a nastavenia — pre reštaurácie.",
  h1: "Pomoc",
  intro: "Podrobný návod na IQ Rest — od registrácie po jemné nastavenia.",
  banner: {
    title: "Je to jednoduchšie, než to vyzerá",
    sub: "Návod krok za krokom: od registrácie po jemné nastavenia — zvládne to každý.",
    cta: "Ako to funguje",
  },
  tipLabel: "Tip",
  noteLabel: "Dôležité",
  sections: [
    {
      id: "start",
      title: "1. Začíname",
      blocks: [
        { type: "h3", text: "Čo je tento systém" },
        {
          type: "p",
          text: "IQ Rest je služba pre reštaurácie: vytvoríte online menu s QR kódom, prijímate objednávky a rezervácie stolov priamo z telefónov hostí, zatiaľ čo v kuchyni a u čašníkov bežia tablety-terminály. Všetko sa spravuje z jedného administračného panela (dashboardu).",
        },
        { type: "h3", text: "Registrácia a prihlásenie" },
        { type: "p", text: "Prihlásiť sa môžete tromi spôsobmi — vyberte si na prihlasovacej obrazovke:" },
        {
          type: "list",
          items: [
            "Cez Google — kliknite na „Pokračovať s Google“ a vyberte účet.",
            "Cez Apple — kliknite na „Pokračovať s Apple“.",
            "E-mailom — kliknite na „Pokračovať e-mailom“, zadajte adresu a pošleme vám 6-miestny kód. Zadajte ho na ďalšej obrazovke. Heslo nie je potrebné.",
          ],
        },
        {
          type: "note",
          text: "E-mailom príde len jednorazový prihlasovací kód — žiadny spam, žiadne newslettery.",
        },
        { type: "h3", text: "Vytvorenie reštaurácie (onboarding)" },
        {
          type: "p",
          text: "Pri prvom prihlásení vás systém prevedie rýchlym nastavením. Potom sa automaticky vytvorí reštaurácia s ukážkovou šablónou menu, ktorú neskôr nahradíte vlastnou.",
        },
        {
          type: "steps",
          items: [
            "Zadajte názov reštaurácie.",
            "Vyberte typ kuchyne (určuje východiskovú šablónu menu).",
            "Hotovo: ocitnete sa v dashboarde s už vyplneným ukážkovým menu.",
          ],
        },
        {
          type: "note",
          text: "Mena sa zistí automaticky podľa vášho regiónu — na začiatku ju vyberať nemusíte. Neskôr ju zmeníte v Nastavenia → Región.",
        },
        { type: "h3", text: "Prehľad dashboardu" },
        {
          type: "p",
          text: "Navigácia medzi sekciami: na počítači horná lišta, na telefóne spodná lišta. Sekcie: Menu, Objednávky, Rezervácie, Kuchyňa, Analytika a Nastavenia.",
        },
        {
          type: "list",
          items: [
            "Vedľa názvu reštaurácie v hornej lište je malý indikátor pripojenia: zelená bodka znamená, že sa objednávky synchronizujú v reálnom čase.",
            "Na stránke „Menu“ hore je tlačidlo „Náhľad“ — otvorí vaše menu tak, ako ho vidí hosť.",
            "Hneď vedľa tlačidlo „Zdieľať“ — zobrazí QR kód a odkaz na menu (skopírovať odkaz, stiahnuť QR alebo otvoriť menu).",
          ],
        },
        {
          type: "tip",
          text: "Po každej zmene menu kliknite na „Náhľad“ — okamžite vidíte, ako to vyzerá pre hosťa.",
        },
      ],
    },
    {
      id: "menu",
      title: "2. Menu",
      blocks: [
        {
          type: "p",
          text: "Sekcia „Menu“ je srdcom systému. Tu staviate štruktúru: kategórie → jedlá → možnosti. Otvorte ju z navigácie.",
        },
        { type: "h3", text: "Kategórie a podkategórie" },
        {
          type: "steps",
          items: [
            "Kliknite na „Pridať kategóriu“ a zadajte názov (napríklad „Predjedlá“).",
            "Na úpravu kategórie — prejdite na ňu a kliknite na „Upraviť kategóriu“.",
            "Poradie kategórií zmeníte tlačidlami „Hore“ / „Dole“ — presne v tomto poradí ich hosť uvidí.",
            "Môžete vytvoriť „Skupinu“ (cez „Pridať skupinu“) — kategóriu-sekciu, ktorá obsahuje ďalšie kategórie.",
          ],
        },
        { type: "h3", text: "Pridávanie jedál" },
        {
          type: "steps",
          items: [
            "Rozbaľte kategóriu (šípka vľavo) a kliknite na „Pridať jedlo“.",
            "Vyplňte názov, cenu a popis.",
            "Pridajte fotku: „Pridať fotku“ — nahrajte vlastnú, alebo kliknite na „Vygenerovať“ a popíšte jedlo slovami, nech AI vytvorí obrázok.",
            "Uložte. Jedlo sa objaví v kategórii.",
          ],
        },
        {
          type: "tip",
          text: "Fotku možno vygenerovať AI: uveďte uhol, osvetlenie alebo pozadie (napríklad „Pizza Margherita na drevenej doske, pohľad zhora“).",
        },
        { type: "h3", text: "Možnosti a varianty (modifikátory)" },
        {
          type: "p",
          text: "Možnosti sú voľby v rámci jedla: veľkosť, prepečenie, extra ingrediencie. Každá možnosť má varianty a k variantu možno pridať príplatok (napríklad „+1.50 za kus“).",
        },
        {
          type: "list",
          items: [
            "Príklad: možnosť „Veľkosť“ s variantmi „Malá / Veľká (+2.00)“.",
            "Príklad: možnosť „Extra“ s viacerými variantmi, z ktorých hosť vyberie jeden alebo viac.",
          ],
        },
        { type: "h3", text: "Alergény a diéty" },
        {
          type: "p",
          text: "Pri jedle môžete označiť alergény (lepok, orechy atď.) a diétne štítky (vegetariánske, vegánske). Hosť ich uvidí ako ikony vo verejnom menu.",
        },
        { type: "h3", text: "Viditeľnosť jedál" },
        {
          type: "p",
          text: "Tlačidlo „Skryť jedlo“ / „Zobraziť jedlo“ dočasne odoberie položku z verejného menu bez jej odstránenia — užitočné, keď jedlo došlo.",
        },
        { type: "h3", text: "Nahranie papierového menu (sken)" },
        {
          type: "p",
          text: "Ak už máte menu ako foto alebo PDF — nezadávajte ho ručne. Použite skenovanie:",
        },
        {
          type: "steps",
          items: [
            "Kliknite na banner „Nahrať menu“ (alebo „Nahrajte papierové menu“).",
            "Pridajte až 5 súborov (foto/sken, každý do 20 MB) a kliknite na „Skenovať“.",
            "Počkajte až minútu — AI rozpozná kategórie a jedlá.",
            "Skontrolujte rozpoznané, zaškrtnite požadované položky a kliknite na „Pokračovať“.",
            "Vyberte: nahradiť aktuálne menu, alebo pridať nové položky k existujúcemu.",
          ],
        },
        {
          type: "note",
          text: "Príklady z úvodnej šablóny sa pri uložení naskenovaného menu odstránia — to je v poriadku.",
        },
      ],
    },
    {
      id: "tables",
      title: "3. Stoly a QR kódy",
      blocks: [
        {
          type: "p",
          text: "Stoly slúžia na priradenie objednávok a rezervácií ku konkrétnym miestam a na tlač osobných QR kódov. Sekcia: Nastavenia → Stoly.",
        },
        { type: "h3", text: "Vytváranie stolov" },
        {
          type: "steps",
          items: [
            "Otvorte Nastavenia → Stoly a kliknite na „Pridať stôl“.",
            "Zadajte číslo stola, počet miest a (voliteľne) názov — napríklad „Okno“, „Bar“, „Terasa“.",
            "Pridajte fotku stola — hostia ju vidia a chápu, kde presne je ich stôl.",
            "Nastavte farbu stola — touto farbou je stôl zvýraznený v kuchyni a v sekcii „Objednávky“, aby ho personál rýchlo našiel.",
            "Voliteľne pridajte krátky popis.",
            "Uložte.",
          ],
        },
        {
          type: "note",
          text: "Fotka stola je pre hostí (orientácia „kde je môj stôl“). Farba je pre personál (rýchle vizuálne označenie stola v kuchyni a v objednávkach).",
        },
        { type: "h3", text: "QR kód stola" },
        {
          type: "p",
          text: "Každý stôl má vlastný QR kód. Hosť ho naskenuje telefónom a rovno sa dostane do menu tohto stola — objednávka sa automaticky priradí k správnemu stolu.",
        },
        {
          type: "steps",
          items: [
            "Kliknite na „Zobraziť QR kód“ pri požadovanom stole.",
            "Kliknite na „Stiahnuť QR“ na uloženie obrázka.",
            "Vytlačte ho a umiestnite na stôl (na stojan, do menu, na nálepku).",
          ],
        },
        {
          type: "tip",
          text: "„Odkaz stola“ je rovnaký odkaz ako v QR, ale ako text. Môžete ho hosťovi poslať v správach.",
        },
      ],
    },
    {
      id: "orders",
      title: "4. Objednávky",
      blocks: [
        { type: "h3", text: "Ako hosť objednáva" },
        {
          type: "p",
          text: "Hosť naskenuje QR na stole → otvorí sa menu → vyberie jedlá, možnosti a počet → odošle objednávku. Objednávka sa okamžite objaví vo vašom dashboarde a na termináli kuchyne/čašníka.",
        },
        {
          type: "note",
          text: "Aby hostia mohli objednávať, v Nastavenia → Objednávky musí byť zapnuté „Prijímať objednávky“. Ak je vypnuté, hosť vidí menu, ale tlačidlo objednávky chýba.",
        },
        { type: "h3", text: "Práca s objednávkami v dashboarde" },
        {
          type: "p",
          text: "Sekcia „Objednávky“ ukazuje plán sály. Obsadené stoly sú zvýraznené a ukazujú počet aktívnych objednávok. Klepnutím na stôl otvoríte jeho objednávky.",
        },
        {
          type: "steps",
          items: [
            "Klepnite na stôl → „Začať objednávku“ (alebo otvorte existujúcu).",
            "„Pridať položku“ → vyberte kategóriu → jedlo → možnosti → v prípade potreby zadajte počet a poznámky (napríklad „bez cibule“).",
            "Kliknite na „Pridať“ — položka sa dostane do objednávky.",
          ],
        },
        { type: "h3", text: "Stavy položiek" },
        {
          type: "p",
          text: "Každá položka má stav: Čaká → Pripravuje sa → Hotové → Podané. Klepnutím na položku prepnete stav. Stavy sa synchronizujú s kuchyňou v reálnom čase.",
        },
        { type: "h3", text: "Zľavy, rozdelenie, zmena stola" },
        {
          type: "list",
          items: [
            "Zľava: „Pridať zľavu“ — percento alebo pevná suma, na celú objednávku alebo jednu položku, s dôvodom.",
            "Rozdeliť objednávku: „Rozdeliť objednávku“ — vyberte položky, ktoré pôjdu na nový samostatný účet.",
            "Zmeniť stôl: „Zmeniť stôl“ — presuňte objednávku na iný stôl.",
            "Duplikovať položku: rýchlo pridajte ďalšiu rovnakú.",
          ],
        },
        { type: "h3", text: "Dokončenie objednávky" },
        {
          type: "steps",
          items: [
            "Keď sú všetky položky podané, kliknite na „Dokončiť objednávku“.",
            "Vyberte spôsob platby (ak sú spôsoby nastavené).",
            "Objednávka sa uzavrie a zmizne z aktívnych.",
          ],
        },
      ],
    },
    {
      id: "kitchen",
      title: "5. Kuchyňa (KDS)",
      blocks: [
        {
          type: "p",
          text: "Kuchynský displej (KDS) je obrazovka na tablete pre kuchárov. Nové objednávky naň padajú v reálnom čase a kuchár označuje jedlá ako hotové.",
        },
        { type: "h3", text: "Čo displej ukazuje" },
        {
          type: "list",
          items: [
            "Karty objednávok s položkami, možnosťami a časom „na výdaji“.",
            "Farebné označenie stavu: čo sa pripravuje, čo je hotové.",
            "Zvukový signál pri príchode novej objednávky.",
          ],
        },
        { type: "h3", text: "Ako sa používa" },
        {
          type: "steps",
          items: [
            "Klepnite na položku, aby ste ju posunuli do ďalšieho stavu (Pripravuje sa → Hotové).",
            "Zapnite zvuk tlačidlom „Zapnúť zvuk“ — nové objednávky potom prídu so zvukovým signálom.",
            "Zoomom upravte veľkosť kariet podľa tabletu.",
            "Filtrami zobrazíte len potrebné kategórie (napríklad len teplú linku).",
          ],
        },
        {
          type: "note",
          text: "Ak tablet stratí internet, objaví sa upozornenie „Bez pripojenia“. Pripojte Wi-Fi a objednávky začnú znova chodiť.",
        },
      ],
    },
    {
      id: "reservations",
      title: "6. Rezervácie",
      blocks: [
        {
          type: "p",
          text: "Hostia môžu cez vaše menu rezervovať stôl a vy spravujete rezervácie v sekcii „Rezervácie“ (zobrazenie „Mesiac“ / „Deň“).",
        },
        { type: "h3", text: "Nastavenie rezervácií" },
        { type: "p", text: "Najprv zapnite a nastavte rezervácie: Nastavenia → Rezervácie." },
        {
          type: "steps",
          items: [
            "Zapnite „Povoliť rezervácie“.",
            "Vyberte režim potvrdzovania: „Automatický“ (rezervácie sa potvrdzujú samy) alebo „Ručný“ (každú potvrdzujete vy).",
            "Nastavte „Dĺžku rezervácie“ — ako dlho sa stôl drží pre hosťa.",
            "Vyplňte „Týždenný rozvrh“: pre každý deň — otvorené/zatvorené, otváracie hodiny a prípadne obedňajšiu prestávku.",
          ],
        },
        {
          type: "note",
          text: "Na prijímanie rezervácií sú potrebné stoly. Ak žiadne nie sú, systém vás požiada, aby ste ich najprv pridali.",
        },
        { type: "h3", text: "Práca s rezerváciami" },
        {
          type: "list",
          items: [
            "Nové rezervácie čakajúce na rozhodnutie sú v bloku „Čakajú na potvrdenie“.",
            "Tlačidlá „Potvrdiť“ / „Odmietnuť“ — pre každú rezerváciu.",
            "„Dokončiť“ — označí, že hosť prišiel a rezervácia je vybavená.",
            "Prepínajte medzi „Mesiac“ a „Deň“, listujte obdobím tlačidlami „Späť“ / „Vpred“.",
          ],
        },
      ],
    },
    {
      id: "devices",
      title: "7. Zariadenia (tablety)",
      blocks: [
        {
          type: "p",
          text: "Terminály kuchyne, čašníka a rezervácií sú samostatné tablety, ktoré sa pripájajú k vášmu účtu pomocou kódu. Sekcia: Nastavenia → Zariadenia.",
        },
        {
          type: "note",
          text: "Zariadenia sú dostupné v platenom tarife alebo počas aktívneho skúšobného obdobia.",
        },
        { type: "h3", text: "Pripojenie tabletu (párovanie)" },
        {
          type: "steps",
          items: [
            "V dashboarde: Nastavenia → Zariadenia → „Pridať zariadenie“.",
            "Zadajte názov (napríklad „Kuchyňa — teplá linka“) a typ: Kuchyňa, Čašník alebo Rezervácie.",
            "Kliknite na „Vygenerovať kód“ — objaví sa 6-miestny kód (platný 2 minúty).",
            "Na tablete otvorte obrazovku pripojenia a zadajte tento kód.",
            "Tablet sa pripojí a okamžite začne pracovať vo zvolenej roli.",
          ],
        },
        { type: "tip", text: "Ak kód vypršal — stačí kliknúť na „Nový kód“ a zadať čerstvý." },
        { type: "h3", text: "Správa zariadení" },
        {
          type: "list",
          items: [
            "Stavy: Online / Offline / Čaká na pripojenie / Odvolané.",
            "„Odvolať“ — odpojí tablet (napríklad pri strate). Na opätovné prihlásenie je potrebný nový kód.",
            "„Odstrániť“ — natrvalo odoberie zariadenie zo zoznamu.",
          ],
        },
      ],
    },
    {
      id: "analytics",
      title: "8. Analytika",
      blocks: [
        {
          type: "p",
          text: "Sekcia „Analytika“ ukazuje kľúčové čísla podniku: tržby, počet objednávok a ich rozdelenie (napríklad podľa spôsobu platby a času). Použite ju, aby ste vedeli, čo a kedy sa predáva najlepšie.",
        },
      ],
    },
    {
      id: "settings",
      title: "9. Nastavenia",
      blocks: [
        {
          type: "p",
          text: "Sekcia „Nastavenia“ sa otvorí ako sada kariet-sekcií. Hore je prepínač aktívnej reštaurácie (ak ich máte viac). Pod ním — každá karta po poradí.",
        },
        { type: "h3", text: "Web" },
        {
          type: "list",
          items: [
            "URL verejného menu — jedinečná adresa vášho menu (môžete nastaviť vlastný krátky slug a skopírovať odkaz).",
            "Názov (titulok) podniku na verejnom webe.",
            "Akcentová farba — hlavná farba tlačidiel a zvýraznení v menu.",
            "Pozadie — obrázok alebo video na úvodnej stránke; nahrajte vlastné alebo vygenerujte pozadie pomocou AI z popisu.",
            "Rozloženie menu — ako sa jedlá zobrazujú hosťovi.",
          ],
        },
        { type: "h3", text: "Kontakty a adresa" },
        {
          type: "p",
          text: "Telefón, Instagram, WhatsApp a značka na mape — všetko sa hosťovi zobrazí na stránke kontaktov vášho menu.",
        },
        { type: "h3", text: "Región" },
        { type: "p", text: "Mena (použitá pre všetky ceny) a časové pásmo podniku." },
        { type: "h3", text: "Stoly" },
        { type: "p", text: "Plán sály, miesta a QR kódy stolov — podrobne v sekcii 3." },
        { type: "h3", text: "Zariadenia" },
        {
          type: "p",
          text: "Pripojenie tabletov pre kuchynský displej a terminály čašníkov — podrobne v sekcii 7.",
        },
        { type: "h3", text: "Objednávky" },
        {
          type: "list",
          items: [
            "„Prijímať objednávky“ — hlavný spínač prijímania objednávok.",
            "„Režim objednávok“ — Interný a/alebo WhatsApp.",
            "„Povinné polia“ — aké údaje musí hosť uviesť (Meno, Telefón, Adresa).",
            "„Spôsoby platby“ — na integráciu platobného systému reštaurácie kontaktujte podporu.",
          ],
        },
        { type: "h3", text: "Rezervácie" },
        {
          type: "p",
          text: "Zapnutie rezervácií, automatické alebo ručné potvrdzovanie, dĺžka a otváracie hodiny — podrobne v sekcii 6.",
        },
        { type: "h3", text: "Jazyky" },
        {
          type: "steps",
          items: [
            "Otvorte Nastavenia → Jazyky.",
            "Vyberte jazyky, do ktorých sa verejné menu prekladá (klepnutím pridáte/odoberiete).",
            "Nastavte predvolený jazyk.",
            "Texty sa prekladajú ručne alebo tlačidlom „Preložiť pomocou AI“ — systém preloží názvy a popisy jedál do zvolených jazykov.",
          ],
        },
        { type: "h3", text: "Platba" },
        { type: "p", text: "Tarif predplatného, stav skúšobného obdobia a správa platieb." },
        {
          type: "list",
          items: [
            "Mesačná alebo ročná fakturácia (ročná je lacnejšia).",
            "„Predplatiť“ / „Prepnúť“ — vyberte alebo zmeňte tarif.",
            "„Spravovať“ — zmeňte spôsob platby alebo zrušte predplatné.",
          ],
        },
        {
          type: "note",
          text: "Platba prebieha v EUR. Pre platbu v inej mene kontaktujte podporu.",
        },
        { type: "h3", text: "Podpora" },
        {
          type: "p",
          text: "Vstavaný chat s naším tímom v reálnom čase. Napíšte správu — odpovieme priamo tu.",
        },
        { type: "h3", text: "Prepínanie a pridávanie reštaurácií" },
        {
          type: "p",
          text: "Ak máte viac podnikov, prepínač reštaurácie je hore v sekcii „Nastavenia“.",
        },
        {
          type: "steps",
          items: [
            "Otvorte prepínač reštaurácií hore v „Nastaveniach“.",
            "„Pridať reštauráciu“ → zadajte názov.",
            "Vyberte „Duplikovať aktuálne menu a nastavenia“ (rýchly štart) alebo „Začať od nuly“ (prázdna reštaurácia).",
            "Vytvorte ju — a prepínajte medzi reštauráciami kedykoľvek priamo tu.",
          ],
        },
      ],
    },
    {
      id: "public-menu",
      title: "10. Verejné menu pre hostí",
      blocks: [
        {
          type: "p",
          text: "Verejné menu je to, čo hosť vidí po naskenovaní QR. Zostaví sa automaticky z vášho menu, brandingu a kontaktov.",
        },
        {
          type: "list",
          items: [
            "Adresa menu sa nastavuje v Nastavenia → Región („Odkaz na menu“).",
            "Všeobecný QR kód a odkaz na menu získate tlačidlom „Zdieľať“ na stránke „Menu“.",
            "Každý stôl má vlastný samostatný QR (Nastavenia → Stoly), ktorý vedie do menu práve toho stola.",
            "Vzhľad (pozadie, akcentová farba, rozloženie) sa nastavuje v sekcii „Web“.",
            "Tlačidlo „Náhľad“ otvorí menu tak, ako ho vidí hosť.",
          ],
        },
        {
          type: "tip",
          text: "Po každej zmene menu/nastavení kliknite na „Náhľad“, aby ste skontrolovali, ako to vyzerá pre hosťa.",
        },
      ],
    },
    {
      id: "faq",
      title: "11. Časté otázky a detaily",
      blocks: [
        { type: "h3", text: "Hosť nemôže objednať" },
        {
          type: "p",
          text: "Skontrolujte Nastavenia → Objednávky → „Prijímať objednávky“ (musí byť zapnuté) a že je vybraný aspoň jeden režim objednávok.",
        },
        { type: "h3", text: "Nechodia rezervácie" },
        {
          type: "p",
          text: "Uistite sa, že sú rezervácie zapnuté v Nastavenia → Rezervácie, že sú pridané stoly a že deň nie je v rozvrhu označený ako „Zatvorené“.",
        },
        { type: "h3", text: "Tablet sa nepripája" },
        {
          type: "p",
          text: "Kód platí 2 minúty. Ak vypršal — vygenerujte nový v Nastavenia → Zariadenia. Ak bolo zariadenie odvolané — vytvorte nový kód.",
        },
        { type: "h3", text: "Jedlo došlo" },
        {
          type: "p",
          text: "Neodstraňujte ho — kliknite na „Skryť jedlo“. Zmizne z verejného menu a vrátite ho tlačidlom „Zobraziť jedlo“.",
        },
        { type: "h3", text: "Potrebujete zariadenia/terminály, ale nemáte ich" },
        {
          type: "p",
          text: "Sekcia „Zariadenia“ je dostupná v platenom tarife alebo počas aktívneho skúšobného obdobia. Skontrolujte Nastavenia → Platba.",
        },
        { type: "h3", text: "Máte ďalšie otázky" },
        {
          type: "p",
          text: "Napíšte nám v Nastavenia → Podpora — je to vstavaný chat s naším tímom.",
        },
      ],
    },
  ],
};
