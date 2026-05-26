import type { HelpDoc } from "../types";

// CS help guide.
export const cs: HelpDoc = {
  metaTitle: "Jak používat IQ Rest — průvodce krok za krokem",
  metaDescription:
    "Kompletní průvodce IQ Rest: registrace, menu, objednávky, rezervace, kuchyňský displej a nastavení — pro restaurace.",
  h1: "Nápověda",
  intro: "Podrobný průvodce IQ Rest — od registrace po jemná nastavení.",
  banner: {
    title: "Je to jednodušší, než se zdá",
    sub: "Průvodce krok za krokem: od registrace po jemná nastavení — zvládne to každý.",
    cta: "Jak to funguje",
  },
  tipLabel: "Tip",
  noteLabel: "Důležité",
  sections: [
    {
      id: "start",
      title: "1. Začínáme",
      blocks: [
        { type: "h3", text: "Co je tento systém" },
        {
          type: "p",
          text: "IQ Rest je služba pro restaurace: vytvoříte online menu s QR kódem, přijímáte objednávky a rezervace stolů přímo z telefonů hostů, zatímco v kuchyni a u číšníků běží tablety-terminály. Vše se spravuje z jednoho administračního panelu (dashboardu).",
        },
        { type: "h3", text: "Registrace a přihlášení" },
        { type: "p", text: "Přihlásit se můžete třemi způsoby — vyberte si na přihlašovací obrazovce:" },
        {
          type: "list",
          items: [
            "Přes Google — klikněte na „Pokračovat s Google“ a vyberte účet.",
            "Přes Apple — klikněte na „Pokračovat s Apple“.",
            "E-mailem — klikněte na „Pokračovat e-mailem“, zadejte adresu a pošleme vám 6místný kód. Zadejte ho na další obrazovce. Heslo není potřeba.",
          ],
        },
        {
          type: "note",
          text: "E-mailem přijde jen jednorázový přihlašovací kód — žádný spam, žádné newslettery.",
        },
        { type: "h3", text: "Vytvoření restaurace (onboarding)" },
        {
          type: "p",
          text: "Při prvním přihlášení vás systém provede rychlým nastavením. Poté se automaticky vytvoří restaurace s ukázkovou šablonou menu, kterou později nahradíte vlastní.",
        },
        {
          type: "steps",
          items: [
            "Zadejte název restaurace.",
            "Vyberte typ kuchyně (určuje výchozí šablonu menu).",
            "Hotovo: ocitnete se v dashboardu s již vyplněným ukázkovým menu.",
          ],
        },
        {
          type: "note",
          text: "Měna se zjistí automaticky podle vašeho regionu — na začátku ji vybírat nemusíte. Později ji změníte v Nastavení → Region.",
        },
        { type: "h3", text: "Přehled dashboardu" },
        {
          type: "p",
          text: "Navigace mezi sekcemi: na počítači horní lišta, na telefonu spodní lišta. Sekce: Menu, Objednávky, Rezervace, Kuchyně, Analytika a Nastavení.",
        },
        {
          type: "list",
          items: [
            "Vedle názvu restaurace v horní liště je malý indikátor připojení: zelená tečka znamená, že se objednávky synchronizují v reálném čase.",
            "Na stránce „Menu“ nahoře je tlačítko „Náhled“ — otevře vaše menu tak, jak ho vidí host.",
            "Hned vedle tlačítko „Sdílet“ — zobrazí QR kód a odkaz na menu (zkopírovat odkaz, stáhnout QR nebo otevřít menu).",
          ],
        },
        {
          type: "tip",
          text: "Po každé změně menu klikněte na „Náhled“ — okamžitě vidíte, jak to vypadá pro hosta.",
        },
      ],
    },
    {
      id: "menu",
      title: "2. Menu",
      blocks: [
        {
          type: "p",
          text: "Sekce „Menu“ je srdcem systému. Tady stavíte strukturu: kategorie → jídla → možnosti. Otevřete ji z navigace.",
        },
        { type: "h3", text: "Kategorie a podkategorie" },
        {
          type: "steps",
          items: [
            "Klikněte na „Přidat kategorii“ a zadejte název (například „Předkrmy“).",
            "Pro úpravu kategorie — najeďte na ni a klikněte na „Upravit kategorii“.",
            "Pořadí kategorií změníte tlačítky „Nahoru“ / „Dolů“ — přesně v tomto pořadí je host uvidí.",
            "Můžete vytvořit „Skupinu“ (přes „Přidat skupinu“) — kategorii-sekci, která obsahuje další kategorie.",
          ],
        },
        { type: "h3", text: "Přidávání jídel" },
        {
          type: "steps",
          items: [
            "Rozbalte kategorii (šipka vlevo) a klikněte na „Přidat jídlo“.",
            "Vyplňte název, cenu a popis.",
            "Přidejte fotku: „Přidat fotku“ — nahrajte vlastní, nebo klikněte na „Vygenerovat“ a popište jídlo slovy, ať AI vytvoří obrázek.",
            "Uložte. Jídlo se objeví v kategorii.",
          ],
        },
        {
          type: "tip",
          text: "Fotku lze vygenerovat AI: uveďte úhel, osvětlení nebo pozadí (například „Pizza Margherita na dřevěném prkénku, pohled shora“).",
        },
        { type: "h3", text: "Možnosti a varianty (modifikátory)" },
        {
          type: "p",
          text: "Možnosti jsou volby v rámci jídla: velikost, propečení, extra ingredience. Každá možnost má varianty a k variantě lze přidat příplatek (například „+1.50 za kus“).",
        },
        {
          type: "list",
          items: [
            "Příklad: možnost „Velikost“ s variantami „Malá / Velká (+2.00)“.",
            "Příklad: možnost „Extra“ s několika variantami, z nichž host vybere jednu nebo více.",
          ],
        },
        { type: "h3", text: "Alergeny a diety" },
        {
          type: "p",
          text: "U jídla můžete označit alergeny (lepek, ořechy atd.) a dietní štítky (vegetariánské, veganské). Host je uvidí jako ikony ve veřejném menu.",
        },
        { type: "h3", text: "Viditelnost jídel" },
        {
          type: "p",
          text: "Tlačítko „Skrýt jídlo“ / „Zobrazit jídlo“ dočasně odebere položku z veřejného menu, aniž ji smaže — užitečné, když jídlo došlo.",
        },
        { type: "h3", text: "Nahrání papírového menu (sken)" },
        {
          type: "p",
          text: "Pokud už máte menu jako foto nebo PDF — nezadávejte ho ručně. Použijte skenování:",
        },
        {
          type: "steps",
          items: [
            "Klikněte na banner „Nahrát menu“ (nebo „Nahrajte papírové menu“).",
            "Přidejte až 5 souborů (foto/sken, každý do 20 MB) a klikněte na „Skenovat“.",
            "Počkejte až minutu — AI rozpozná kategorie a jídla.",
            "Zkontrolujte rozpoznané, zaškrtněte požadované položky a klikněte na „Pokračovat“.",
            "Vyberte: nahradit aktuální menu, nebo přidat nové položky ke stávajícímu.",
          ],
        },
        {
          type: "note",
          text: "Příklady z úvodní šablony se při uložení naskenovaného menu odstraní — to je v pořádku.",
        },
      ],
    },
    {
      id: "tables",
      title: "3. Stoly a QR kódy",
      blocks: [
        {
          type: "p",
          text: "Stoly slouží k navázání objednávek a rezervací na konkrétní místa a k tisku osobních QR kódů. Sekce: Nastavení → Stoly.",
        },
        { type: "h3", text: "Vytváření stolů" },
        {
          type: "steps",
          items: [
            "Otevřete Nastavení → Stoly a klikněte na „Přidat stůl“.",
            "Zadejte číslo stolu, počet míst a (volitelně) název — například „Okno“, „Bar“, „Terasa“.",
            "Přidejte fotku stolu — hosté ji vidí a chápou, kde přesně je jejich stůl.",
            "Nastavte barvu stolu — touto barvou je stůl zvýrazněn v kuchyni a v sekci „Objednávky“, aby ho personál rychle našel.",
            "Volitelně přidejte krátký popis.",
            "Uložte.",
          ],
        },
        {
          type: "note",
          text: "Fotka stolu je pro hosty (orientace „kde je můj stůl“). Barva je pro personál (rychlé vizuální označení stolu v kuchyni a v objednávkách).",
        },
        { type: "h3", text: "QR kód stolu" },
        {
          type: "p",
          text: "Každý stůl má vlastní QR kód. Host ho naskenuje telefonem a rovnou se dostane do menu tohoto stolu — objednávka se automaticky naváže na správný stůl.",
        },
        {
          type: "steps",
          items: [
            "Klikněte na „Zobrazit QR kód“ u požadovaného stolu.",
            "Klikněte na „Stáhnout QR“ pro uložení obrázku.",
            "Vytiskněte ho a umístěte na stůl (na stojánek, do menu, na nálepku).",
          ],
        },
        {
          type: "tip",
          text: "„Odkaz stolu“ je stejný odkaz jako v QR, ale jako text. Můžete ho hostovi poslat ve zprávách.",
        },
      ],
    },
    {
      id: "orders",
      title: "4. Objednávky",
      blocks: [
        { type: "h3", text: "Jak host objednává" },
        {
          type: "p",
          text: "Host naskenuje QR na stole → otevře se menu → vybere jídla, možnosti a počet → odešle objednávku. Objednávka se okamžitě objeví ve vašem dashboardu a na terminálu kuchyně/číšníka.",
        },
        {
          type: "note",
          text: "Aby hosté mohli objednávat, musí být v Nastavení → Objednávky zapnuto „Přijímat objednávky“. Pokud je vypnuto, host vidí menu, ale tlačítko objednávky chybí.",
        },
        { type: "h3", text: "Práce s objednávkami v dashboardu" },
        {
          type: "p",
          text: "Sekce „Objednávky“ ukazuje plán sálu. Obsazené stoly jsou zvýrazněné a ukazují počet aktivních objednávek. Klepnutím na stůl otevřete jeho objednávky.",
        },
        {
          type: "steps",
          items: [
            "Klepněte na stůl → „Začít objednávku“ (nebo otevřete existující).",
            "„Přidat položku“ → vyberte kategorii → jídlo → možnosti → v případě potřeby zadejte počet a poznámky (například „bez cibule“).",
            "Klikněte na „Přidat“ — položka se dostane do objednávky.",
          ],
        },
        { type: "h3", text: "Stavy položek" },
        {
          type: "p",
          text: "Každá položka má stav: Čeká → Připravuje se → Hotovo → Podáno. Klepnutím na položku přepnete stav. Stavy se synchronizují s kuchyní v reálném čase.",
        },
        { type: "h3", text: "Slevy, rozdělení, změna stolu" },
        {
          type: "list",
          items: [
            "Sleva: „Přidat slevu“ — procento nebo pevná částka, na celou objednávku nebo jednu položku, s důvodem.",
            "Rozdělit objednávku: „Rozdělit objednávku“ — vyberte položky, které půjdou na nový samostatný účet.",
            "Změnit stůl: „Změnit stůl“ — přesuňte objednávku na jiný stůl.",
            "Duplikovat položku: rychle přidejte další stejnou.",
          ],
        },
        { type: "h3", text: "Dokončení objednávky" },
        {
          type: "steps",
          items: [
            "Když jsou všechny položky podány, klikněte na „Dokončit objednávku“.",
            "Vyberte způsob platby (pokud jsou způsoby nastaveny).",
            "Objednávka se uzavře a zmizí z aktivních.",
          ],
        },
      ],
    },
    {
      id: "kitchen",
      title: "5. Kuchyně (KDS)",
      blocks: [
        {
          type: "p",
          text: "Kuchyňský displej (KDS) je obrazovka na tabletu pro kuchaře. Nové objednávky na něj padají v reálném čase a kuchař označuje jídla jako hotová.",
        },
        { type: "h3", text: "Co displej ukazuje" },
        {
          type: "list",
          items: [
            "Karty objednávek s položkami, možnostmi a časem „na výdeji“.",
            "Barevné označení stavu: co se připravuje, co je hotové.",
            "Zvukový signál při příchodu nové objednávky.",
          ],
        },
        { type: "h3", text: "Jak se používá" },
        {
          type: "steps",
          items: [
            "Klepněte na položku, abyste ji posunuli do dalšího stavu (Připravuje se → Hotovo).",
            "Zapněte zvuk tlačítkem „Zapnout zvuk“ — nové objednávky pak přijdou se zvukovým signálem.",
            "Zoomem upravte velikost karet podle tabletu.",
            "Filtry zobrazíte jen potřebné kategorie (například jen teplou linku).",
          ],
        },
        {
          type: "note",
          text: "Pokud tablet ztratí internet, objeví se upozornění „Bez připojení“. Připojte Wi-Fi a objednávky začnou znovu chodit.",
        },
      ],
    },
    {
      id: "reservations",
      title: "6. Rezervace",
      blocks: [
        {
          type: "p",
          text: "Hosté mohou přes vaše menu rezervovat stůl a vy spravujete rezervace v sekci „Rezervace“ (zobrazení „Měsíc“ / „Den“).",
        },
        { type: "h3", text: "Nastavení rezervací" },
        { type: "p", text: "Nejprve zapněte a nastavte rezervace: Nastavení → Rezervace." },
        {
          type: "steps",
          items: [
            "Zapněte „Povolit rezervace“.",
            "Vyberte režim potvrzování: „Automatický“ (rezervace se potvrzují samy) nebo „Ruční“ (každou potvrzujete vy).",
            "Nastavte „Délku rezervace“ — jak dlouho se stůl drží pro hosta.",
            "Vyplňte „Týdenní rozvrh“: pro každý den — otevřeno/zavřeno, otevírací doba a případně polední pauza.",
          ],
        },
        {
          type: "note",
          text: "K přijímání rezervací jsou potřeba stoly. Pokud žádné nejsou, systém vás požádá, abyste je nejprve přidali.",
        },
        { type: "h3", text: "Práce s rezervacemi" },
        {
          type: "list",
          items: [
            "Nové rezervace čekající na rozhodnutí jsou v bloku „Čekají na potvrzení“.",
            "Tlačítka „Potvrdit“ / „Odmítnout“ — pro každou rezervaci.",
            "„Dokončit“ — označí, že host přišel a rezervace je vyřízena.",
            "Přepínejte mezi „Měsíc“ a „Den“, listujte obdobím tlačítky „Zpět“ / „Vpřed“.",
          ],
        },
      ],
    },
    {
      id: "devices",
      title: "7. Zařízení (tablety)",
      blocks: [
        {
          type: "p",
          text: "Terminály kuchyně, číšníka a rezervací jsou samostatné tablety, které se připojují k vašemu účtu pomocí kódu. Sekce: Nastavení → Zařízení.",
        },
        {
          type: "note",
          text: "Zařízení jsou dostupná v placeném tarifu nebo během aktivní zkušební doby.",
        },
        { type: "h3", text: "Připojení tabletu (párování)" },
        {
          type: "steps",
          items: [
            "V dashboardu: Nastavení → Zařízení → „Přidat zařízení“.",
            "Zadejte název (například „Kuchyně — teplá linka“) a typ: Kuchyně, Číšník nebo Rezervace.",
            "Klikněte na „Vygenerovat kód“ — objeví se 6místný kód (platný 2 minuty).",
            "Na tabletu otevřete obrazovku připojení a zadejte tento kód.",
            "Tablet se připojí a okamžitě začne pracovat ve zvolené roli.",
          ],
        },
        { type: "tip", text: "Pokud kód vypršel — stačí kliknout na „Nový kód“ a zadat čerstvý." },
        { type: "h3", text: "Správa zařízení" },
        {
          type: "list",
          items: [
            "Stavy: Online / Offline / Čeká na připojení / Odvoláno.",
            "„Odvolat“ — odpojí tablet (například při ztrátě). K opětovnému přihlášení je potřeba nový kód.",
            "„Smazat“ — trvale odebere zařízení ze seznamu.",
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
          text: "Sekce „Analytika“ ukazuje klíčová čísla podniku: tržby, počet objednávek a jejich rozpad (například podle způsobu platby a času). Použijte ji, abyste věděli, co a kdy se prodává nejlépe.",
        },
      ],
    },
    {
      id: "settings",
      title: "9. Nastavení",
      blocks: [
        {
          type: "p",
          text: "Sekce „Nastavení“ se otevře jako sada karet-sekcí. Nahoře je přepínač aktivní restaurace (pokud jich máte víc). Pod ním — každá karta po pořadí.",
        },
        { type: "h3", text: "Web" },
        {
          type: "list",
          items: [
            "URL veřejného menu — jedinečná adresa vašeho menu (můžete nastavit vlastní krátký slug a zkopírovat odkaz).",
            "Název (titulek) podniku na veřejném webu.",
            "Akcentní barva — hlavní barva tlačítek a zvýraznění v menu.",
            "Pozadí — obrázek nebo video na úvodní stránce; nahrajte vlastní nebo vygenerujte pozadí pomocí AI z popisu.",
            "Rozvržení menu — jak se jídla zobrazují hostovi.",
          ],
        },
        { type: "h3", text: "Kontakty a adresa" },
        {
          type: "p",
          text: "Telefon, Instagram, WhatsApp a značka na mapě — vše se hostovi zobrazí na stránce kontaktů vašeho menu.",
        },
        { type: "h3", text: "Region" },
        { type: "p", text: "Měna (použitá pro všechny ceny) a časové pásmo podniku." },
        { type: "h3", text: "Stoly" },
        { type: "p", text: "Plán sálu, místa a QR kódy stolů — podrobně v sekci 3." },
        { type: "h3", text: "Zařízení" },
        {
          type: "p",
          text: "Připojení tabletů pro kuchyňský displej a terminály číšníků — podrobně v sekci 7.",
        },
        { type: "h3", text: "Objednávky" },
        {
          type: "list",
          items: [
            "„Přijímat objednávky“ — hlavní spínač přijímání objednávek.",
            "„Režim objednávek“ — Interní a/nebo WhatsApp.",
            "„Povinná pole“ — jaké údaje musí host uvést (Jméno, Telefon, Adresa).",
            "„Způsoby platby“ — pro integraci platebního systému restaurace kontaktujte podporu.",
          ],
        },
        { type: "h3", text: "Rezervace" },
        {
          type: "p",
          text: "Zapnutí rezervací, automatické nebo ruční potvrzování, délka a otevírací doba — podrobně v sekci 6.",
        },
        { type: "h3", text: "Jazyky" },
        {
          type: "steps",
          items: [
            "Otevřete Nastavení → Jazyky.",
            "Vyberte jazyky, do kterých se veřejné menu překládá (klepnutím přidáte/odeberete).",
            "Nastavte výchozí jazyk.",
            "Texty se překládají ručně nebo tlačítkem „Přeložit pomocí AI“ — systém přeloží názvy a popisy jídel do zvolených jazyků.",
          ],
        },
        { type: "h3", text: "Platba" },
        { type: "p", text: "Tarif předplatného, stav zkušební doby a správa plateb." },
        {
          type: "list",
          items: [
            "Měsíční nebo roční fakturace (roční je levnější).",
            "„Předplatit“ / „Přepnout“ — vyberte nebo změňte tarif.",
            "„Spravovat“ — změňte způsob platby nebo zrušte předplatné.",
          ],
        },
        {
          type: "note",
          text: "Platba probíhá v EUR. Pro platbu v jiné měně kontaktujte podporu.",
        },
        { type: "h3", text: "Podpora" },
        {
          type: "p",
          text: "Vestavěný chat s naším týmem v reálném čase. Napište zprávu — odpovíme přímo tady.",
        },
        { type: "h3", text: "Přepínání a přidávání restaurací" },
        {
          type: "p",
          text: "Pokud máte více podniků, přepínač restaurace je nahoře v sekci „Nastavení“.",
        },
        {
          type: "steps",
          items: [
            "Otevřete přepínač restaurací nahoře v „Nastavení“.",
            "„Přidat restauraci“ → zadejte název.",
            "Vyberte „Duplikovat aktuální menu a nastavení“ (rychlý start) nebo „Začít od nuly“ (prázdná restaurace).",
            "Vytvořte ji — a přepínejte mezi restauracemi kdykoli přímo tady.",
          ],
        },
      ],
    },
    {
      id: "public-menu",
      title: "10. Veřejné menu pro hosty",
      blocks: [
        {
          type: "p",
          text: "Veřejné menu je to, co host vidí po naskenování QR. Sestaví se automaticky z vašeho menu, brandingu a kontaktů.",
        },
        {
          type: "list",
          items: [
            "Adresa menu se nastavuje v Nastavení → Region („Odkaz na menu“).",
            "Obecný QR kód a odkaz na menu získáte tlačítkem „Sdílet“ na stránce „Menu“.",
            "Každý stůl má vlastní samostatný QR (Nastavení → Stoly), který vede do menu právě toho stolu.",
            "Vzhled (pozadí, akcentní barva, rozvržení) se nastavuje v sekci „Web“.",
            "Tlačítko „Náhled“ otevře menu tak, jak ho vidí host.",
          ],
        },
        {
          type: "tip",
          text: "Po každé změně menu/nastavení klikněte na „Náhled“, abyste zkontrolovali, jak to vypadá pro hosta.",
        },
      ],
    },
    {
      id: "faq",
      title: "11. Časté dotazy a detaily",
      blocks: [
        { type: "h3", text: "Host nemůže objednat" },
        {
          type: "p",
          text: "Zkontrolujte Nastavení → Objednávky → „Přijímat objednávky“ (musí být zapnuto) a že je vybrán alespoň jeden režim objednávek.",
        },
        { type: "h3", text: "Nechodí rezervace" },
        {
          type: "p",
          text: "Ujistěte se, že jsou rezervace zapnuté v Nastavení → Rezervace, že jsou přidané stoly a že den není v rozvrhu označen jako „Zavřeno“.",
        },
        { type: "h3", text: "Tablet se nepřipojuje" },
        {
          type: "p",
          text: "Kód platí 2 minuty. Pokud vypršel — vygenerujte nový v Nastavení → Zařízení. Pokud bylo zařízení odvoláno — vytvořte nový kód.",
        },
        { type: "h3", text: "Jídlo došlo" },
        {
          type: "p",
          text: "Nemažte ho — klikněte na „Skrýt jídlo“. Zmizí z veřejného menu a vrátíte ho tlačítkem „Zobrazit jídlo“.",
        },
        { type: "h3", text: "Potřebujete zařízení/terminály, ale nemáte je" },
        {
          type: "p",
          text: "Sekce „Zařízení“ je dostupná v placeném tarifu nebo během aktivní zkušební doby. Zkontrolujte Nastavení → Platba.",
        },
        { type: "h3", text: "Máte další dotazy" },
        {
          type: "p",
          text: "Napište nám v Nastavení → Podpora — je to vestavěný chat s naším týmem.",
        },
      ],
    },
  ],
};
