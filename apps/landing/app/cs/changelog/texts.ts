import type { ChangelogTexts } from "@/app/_landing/changelog/types";

export const CHANGELOG_TEXTS: ChangelogTexts = {
  meta: {
    title: "Seznam změn — Aktualizace a nové funkce IQ Rest",
    description:
      "Každé vydání IQ Rest na jednom místě. Nové funkce, vylepšení AI a uvedení produktu pro QR menu restaurací, online objednávky a rezervace.",
  },
  pageTitle: "Seznam změn",
  pageSubtitle:
    "Každá aktualizace, kterou vydáváme, aby vaše QR menu restaurace, online objednávky a rezervace byly plynulejší. Nejnovější jako první.",
  readMore: "Číst více",
  backToList: "Zpět na seznam změn",
  publishedOn: "Publikováno",

  entries: {
    "ai-dish-photos-restaurant-menu": {
      meta: {
        title: "AI fotografie jídel pro QR menu restaurace | IQ Rest",
        description:
          "Vygenerujte stylisticky konzistentní fotografie jídel pro celé vaše QR menu jedním kliknutím. Žádné stock fotografie, žádný fotograf, žádné úpravy.",
      },
      title: "AI generované fotografie jídel pro celé vaše QR menu",
      subtitle:
        "Přestaňte hledat ve stockových galeriích a plánovat fotografování. IQ Rest nyní generuje kompletní sadu lákavých fotografií jídel v jednotném, konzistentním stylu — přímo z názvů vašich jídel.",
      intro:
        "Fotografování každého jídla v menu je drahé, pomalé a málokdy konzistentní. Stockové fotobanky zanechávají mezery a styl nikdy přesně neodpovídá vaší značce. IQ Rest tuto mezeru zaplňuje vestavěnou AI fotografií jídel: zadejte název jídla, získejte vysoce kvalitní fotografii odpovídající vzhledu zbytku vašeho menu. Každý obrázek je generován speciálně pro vás, ve velikosti pro QR menu i pro tisk.",
      sections: [
        {
          title: "Jeden styl fotografií napříč celým menu",
          body: "Když si hosté procházejí menu, neodpovídající styly narušují zážitek — jeden jasný, jeden ponurý, jeden shora, jeden ze strany. IQ Rest generuje každou fotografii v jednotném stylu odpovídajícím značce: stejný směr osvětlení, stejný jazyk talířů, stejná atmosféra pozadí. Výsledek působí jako skutečné fotografování, jen s tím rozdílem, že každé jídlo bylo vykresleno v okamžiku přidání do menu. Při přidávání nových jídel se styl automaticky zachovává.",
        },
        {
          title: "Z názvu jídla na talíř za vteřiny",
          body: "Není co briefovat. Přidáte jídlo — řekněme „Tagliatelle s lanýži a lesními houbami“ — a IQ Rest na pozadí vytvoří fotografii. Obrázek se nahraje do vašeho menu, optimalizuje se jako WebP a je připraven k zobrazení dříve, než stihnete přidat další jídlo. Pokud fotografie přesně neodpovídá vaší představě, regenerujte ji jedním klepnutím. Každá restaurace dostává bezplatné AI generování pro začátek, s dostupnými dobíjecími balíčky, pokud chcete fotografie pro celé 80položkové menu.",
        },
        {
          title: "Optimalizováno pro mobil a SEO",
          body: "Každý vygenerovaný obrázek je kódován jako komprimovaný WebP s 80% kvalitou, poté servírován z Hetzner CDN v Norimberku s chytrým subsamplingem. Stránky zůstávají rychlé na 4G, žádné kostry, žádné posuny rozložení. Fotografie jsou také indexovatelné Google Images — hosté hledající názvy vašich jídel podle obrázku mohou vaše menu najít přímo.",
        },
      ],
      benefitsTitle: "Proč jsou AI fotografie jídel důležité",
      benefits: [
        "Žádné předplatné stock fotek a žádné poplatky fotografům",
        "Styl odpovídající značce pro každé jídlo v menu",
        "Nová jídla automaticky dostávají odpovídající fotografii",
        "Komprimovaný WebP — rychlý na mobilu, žádné posuny rozložení",
        "Bezplatná generování zahrnutá v každém tarifu",
        "Regenerujte jakoukoli fotografii jedním klepnutím, dokud nebude perfektní",
      ],
      conclusionTitle: "Fotografie pro každé jídlo, bez produkce",
      conclusionBody:
        "Restaurace, které mají fotografie, prodávají více vysokomaržových jídel — to není odhad, to je dobře známá mechanika příjmů. Důvodem, proč většina menu nemá fotografie, jsou náklady na produkci. IQ Rest tyto náklady úplně eliminuje. Každé jídlo, které přidáte, získá krásnou, ke značce sladěnou fotografii dříve, než dokončíte nastavení. Spojte to s QR objednáváním a sledujte, jak rostou míry upsell, aniž byste zvedli kameru.",
      ctaText: "Vygenerujte AI fotografie pro každé jídlo ve vašem menu — zdarma během zkušební doby.",
      ctaButton: "Vyzkoušet zdarma",
    },

    "ai-restaurant-cover-background": {
      meta: {
        title: "AI generátor pozadí obálky restaurace | IQ Rest",
        description:
          "Automaticky vygenerujte krásný obrázek obálky restaurace pro vaše QR menu za vteřiny. Odpovídá vaší kuchyni, atmosféře a značce — žádné stock fotky.",
      },
      title: "AI generované pozadí obálky restaurace",
      subtitle:
        "Vaše QR menu se otevírá se správnou atmosférou ještě dříve, než hosté začnou rolovat. IQ Rest nyní generuje vlastní pozadí obálky odpovídající vaší kuchyni a atmosféře — automaticky.",
      intro:
        "První dojmy jsou důležité, zejména když hosté skenují QR kód u stolu. Obecný obrázek obálky podkopává vše, co jste utratili za interiérový design. IQ Rest nyní generuje jedinečný atmosférický obrázek obálky pro každou restauraci — na základě kuchyně, kterou vyberete při registraci. Italská tratorie, japonské izakaya, španělský tapas bar — každá dostane obálku, která působí správně.",
      sections: [
        {
          title: "Přizpůsobené vaší kuchyni a atmosféře",
          body: "Když dokončíte průvodce registrací, IQ Rest vezme vámi vybranou kuchyni a vygeneruje obálku, která ji doplňuje. Italská dostane teplé osvětlení tratorie a těstoviny v měkkém ostření. Japonská dostane čisté linie a vyváženou kompozici. Mexická dostane živé barvy a energii pouličního jídla. Spojení je automatické, ale obálku můžete kdykoli regenerovat s vlastním kreativním směrem, pokud chcete něco konkrétního.",
        },
        {
          title: "Optimalizováno pro hero sekce QR menu",
          body: "Obrázky obálek jsou generovány v přesném poměru stran používaném hero sekcí QR menu — ostré na každém telefonu, žádné nepříjemné oříznutí. Jsou kódovány jako WebP, servírovány rychle a načítány líně, takže zbytek menu se vykreslí jako první. Obálka udává tón, pak zmizí, jakmile hosté začnou procházet jídla.",
        },
        {
          title: "Konzistence značky hned po vybalení",
          body: "Styl obrázku obálky je automaticky spárován s AI fotografiemi jídel generovanými pro vaše menu — stejný jazyk osvětlení, stejná barevná paleta, stejná atmosféra. Hosté vnímají vaši restauraci jako soudržnou a profesionálně navrženou, i když jste vše nastavili za pět minut z telefonu.",
        },
      ],
      benefitsTitle: "Proč AI obálka překonává stockové",
      benefits: [
        "Jedinečné pro vaši restauraci — ne stock fotka, kterou používá každé jiné místo",
        "Odpovídá kuchyni, kterou jste vybrali při registraci",
        "Stejný vizuální jazyk jako vaše AI generované fotografie jídel",
        "Správně dimenzované pro hero QR menu — žádné ruční oříznutí",
        "Komprimovaný WebP pro rychlé mobilní načítání",
        "Regenerujte kdykoli jedním klepnutím",
      ],
      conclusionTitle: "Obálka, která říká „Víme, co děláme“",
      conclusionBody:
        "Když host naskenuje váš QR kód, první věc, kterou vidí, je vaše obálka. Vyleštěný, atmosférický obrázek signalizuje kvalitu dříve, než přečte jediný název jídla. S IQ Rest je tato leštěnost automatická — vygenerovaná zdarma během registrace a regenerovatelná kdykoli změníte názor. Žádné stockové galerie, žádná designová práce, jen obálka, která sedí.",
      ctaText: "Získejte vlastní AI obálku pro vaše QR menu za méně než minutu.",
      ctaButton: "Začít bezplatnou zkušební verzi",
    },

    "three-step-signup-wizard-restaurant-menu": {
      meta: {
        title: "Třístupňový průvodce registrací pro QR menu | IQ Rest",
        description:
          "Vyberte kuchyni, název restaurace, e-mail — a IQ Rest postaví vaše QR menu. Nejrychlejší registrace v odvětví QR menu.",
      },
      title: "Třístupňový průvodce registrací: Z e-mailu na funkční QR menu za méně než minutu",
      subtitle:
        "Vyberte si kuchyni. Zadejte název restaurace. Potvrďte e-mail. Hotovo — vaše QR menu je připraveno, s ukázkovými jídly a AI generovanými fotografiemi.",
      intro:
        "Majitelé restaurací nemají čas na registrační formulář o 10 obrazovkách. Tak jsme ho zkrátili na tři. Vyberte kuchyni, která odpovídá vašemu místu. Zadejte název restaurace. Potvrďte e-mail. Než se přihlásíte poprvé, vaše QR menu je již zaplněno ukázkovými jídly odpovídajícími kuchyni a vhodnou AI fotografií. Můžete obsloužit hosta do 60 sekund od zahájení registrace.",
      sections: [
        {
          title: "Krok 1 — Výběr kuchyně",
          body: "Vyberte si ze širokého seznamu kuchyní: italská, španělská, japonská, mexická, francouzská, středomořská, indická, americká, kavárna, bar, pizzerie a další. Volba řídí každé výchozí nastavení v průvodci: ukázková jídla, styl AI obálky, výchozí měna a počáteční struktura kategorií. Nic nekonfigurujete — vybíráte výchozí bod.",
        },
        {
          title: "Krok 2 — Název restaurace",
          body: "Zadejte název tak, jak ho budou vidět hosté. Používáme ho všude: hero QR menu, název stránky, SEO slug, náhled sociálního sdílení. Žádné samostatné rozhodnutí o názvu značky vs. zobrazovaném názvu — jedno pole, jeden zdroj pravdy. Lze přeskočit, pokud chcete rozhodnutí odložit; vyplníme placeholder, který můžete přejmenovat později.",
        },
        {
          title: "Krok 3 — E-mail nebo přihlášení Googlem",
          body: "Potvrďte e-mailem + jednorázovým kódem, nebo klepněte na „Přihlásit se s Google“ pro okamžité vytvoření účtu. Žádné heslo k zapamatování. V okamžiku potvrzení průvodce na pozadí spustí seeder menu — kategorie se vytvoří, ukázková jídla se vloží, AI fotografie se vygenerují, obálka restaurace je připravena. Přistanete přímo v dashboardu s funkčním menu.",
        },
      ],
      benefitsTitle: "Proč třístupňová registrace překonává formulář",
      benefits: [
        "Méně než 60 sekund od landing page k funkčnímu QR menu",
        "Nula rozhodnutí, která nelze později změnit — jen výchozí hodnoty pro start",
        "Ukázková jídla předvyplněná podle kuchyně — okamžitý obsah k editaci",
        "AI fotografie a obálka připravené, než se přihlásíte",
        "Možnost přihlášení Googlem — žádné heslo ke správě",
        "Anonymní pokrok uložen, pokud opustíte uprostřed průvodce",
      ],
      conclusionTitle: "Nejrychlejší nastavení QR menu, tečka",
      conclusionBody:
        "Většina služeb QR menu vás nutí vyplnit desítky polí, než uvidíte něco užitečného. IQ Rest to obrací — dáváme vám funkční menu nejprve, pak vám umožníme přizpůsobit. Průvodce odstraňuje každou bariéru mezi zvědavostí a použitelným produktem. Restaurace, které dokončí registraci za méně než 60 sekund, mají dramaticky vyšší pravděpodobnost, že své menu skutečně publikují, přijmou první objednávku a zůstanou předplaceny.",
      ctaText: "Spusťte třístupňového průvodce nyní — vaše menu bude online za 60 sekund.",
      ctaButton: "Začít bezplatnou zkušební verzi",
    },

    "ai-built-sample-menu-on-signup": {
      meta: {
        title: "AI generované ukázkové menu při registraci | IQ Rest",
        description:
          "Přeskočte prázdný stav. IQ Rest automaticky generuje počáteční QR menu na základě vaší kuchyně — kategorie, jídla, ceny a fotografie.",
      },
      title: "AI postavené ukázkové menu hned po registraci",
      subtitle:
        "Konec zírání na prázdný dashboard. IQ Rest vysazuje váš účet kategoriemi, jídly a AI fotografiemi odpovídajícími kuchyni, takže můžete editovat, nikoli začínat od nuly.",
      intro:
        "Nejtěžší část každého nového nástroje je prázdný stav. Noví majitelé restaurací si sednou, uvidí prázdné menu a zavřou kartu. IQ Rest to napravuje tím, že vaše menu zaplňuje v okamžiku registrace. Vyberte italskou — získáte antipasti, těstoviny, pizzu, dezert. Vyberte japonskou — získáte sushi, ramen, donburi, sake. Každá kategorie má 6 až 10 počátečních jídel s AI generovanými fotografiemi v konzistentním stylu. Vaší prací se stává úprava cen a doladění názvů, ne stavění od nuly.",
      sections: [
        {
          title: "Kategorie a jídla povědomí o kuchyni",
          body: "Seeder neházi náhodná jídla. Používá kuchyni, kterou jste vybrali v průvodci registrací, k vytažení kurátorské sady kategorií, které mají smysl pro váš styl restaurace. Pizzerie dostane „Pizza Classica“, „Pizza Speciale“, „Antipasti“, „Bevande“. Francouzský bistro dostane „Entrées“, „Plats principaux“, „Fromages“, „Desserts“. Počáteční obsah odpovídá konvencím, které strávníci pro tu kuchyni očekávají.",
        },
        {
          title: "Fotografie a ceny hned po vybalení",
          body: "Každé počáteční jídlo přichází s AI generovanou fotografií v konzistentním stylu a rozumnou výchozí cenou v místní měně (automaticky detekované geolokací). Ceny jsou zástupné — změníte je — ale dělají menu okamžitě skutečným, takže můžete náhled QR menu a cítit, jak bude vypadat finální výsledek. To je kritické pro předvádění partnerům, získávání zpětné vazby nebo prosté rozhodování „ano, tohle je nástroj, který chceme používat“.",
        },
        {
          title: "Editujte, nezačínejte od nuly",
          body: "Po nasazení každé jídlo nese flag isExample. Jakmile editujete jídlo — změníte jeho název, cenu nebo popis — flag spadne. Zbývající ukázková jídla vizuálně vyniknou, takže víte, co je stále zástupný obsah. Toto oddělení činí zřejmým, co je hotové a co je třeba dodělat, převádí problém prázdného stavu na produktivní editační tok.",
        },
      ],
      benefitsTitle: "Proč předem postavené menu vyhrává",
      benefits: [
        "Nulový prázdný stav — otevřete dashboard a uvidíte funkční menu",
        "Kategorie a jídla odpovídají vámi vybrané kuchyni",
        "AI fotografie pro každé počáteční jídlo v jednotném stylu",
        "Místní měna automaticky detekována, výchozí ceny na místě",
        "Flag příkladu vybledne, když editujete — jasný signál pokroku",
        "Ukažte partnerům reálně vypadající menu během minut",
      ],
      conclusionTitle: "Přeskočte prázdnou stránku",
      conclusionBody:
        "Stavění menu od nuly je zastrašující. Editace je snadná. IQ Rest vám dává kompletní počáteční menu v okamžiku registrace, pak vám umožňuje upravit ho tak, aby odpovídalo vaší skutečné nabídce. Výsledek: více restaurací dokončí nastavení, více menu skutečně jde živě, více hostů skenuje QR kódy vedoucí na skutečná, upravená produkční menu.",
      ctaText: "Zaregistrujte se a získejte plně postavené počáteční menu ve vaší kuchyni.",
      ctaButton: "Postavit moje menu",
    },

    "interactive-menu-tour-first-visit": {
      meta: {
        title: "Interaktivní prohlídka menu pro nové uživatele | IQ Rest",
        description:
          "Sedmikroková interaktivní příručka provede nové majitele restaurací dashboardem QR menu — žádné dokumenty, žádná videa, jen praktická akce.",
      },
      title: "Sedmikroková interaktivní prohlídka menu při první návštěvě",
      subtitle:
        "Nenutíme vás číst dokumentaci. Při prvním otevření menu vás IQ Rest provede — přidat kategorii, přidat jídlo, editovat, řadit, náhled, sdílet, vše v sedmi klepnutích.",
      intro:
        "Většina SaaS produktů pohřbí onboarding do centra nápovědy, které nikdo nečte. IQ Rest jde opačnou cestou: při první návštěvě nového uživatele na stránce menu interaktivní prohlídka v sekvenci osvětlí každou klíčovou akci. Přidejte kategorii. Přidejte první jídlo. Upravte ho. Přepněte viditelnost. Přeuspořádejte. Náhled živého menu. Sdílejte s hostem. Do sedmého kroku jste použili každou funkci, kterou budete potřebovat v 95 % případů.",
      sections: [
        {
          title: "V produktu, ne v databázi znalostí",
          body: "Každý krok prohlídky osvětlí skutečný UI prvek na vaší obrazovce. Bublina vysvětlí, co prvek dělá a proč je důležitý. Žádné screenshoty — screenshot JE váš dashboard. Jak klepáte, učíte se děláním, ne čtením. Přeskočte kdykoli; prohlídka přetrvává napříč relacemi, dokud ji nedokončíte nebo trvale nezamítnete.",
        },
        {
          title: "Navrženo kolem skutečného workflow",
          body: "Sedm kroků není výpis funkcí — mapují workflow, který nová restaurace skutečně provádí. Přidejte nejprve kategorie (nápoje, hlavní jídla, dezerty), pak jídla, pak vylepšete každé jídlo, pak organizujte pořadí, ve kterém se zobrazují, pak náhled, abyste se ujistili, že vypadá správně, pak sdílejte přes QR. Na konci jste dokončili smyčku od prázdného menu k QR kódu na vytištěné stolní kartě.",
        },
        {
          title: "Lokalizováno do 35 jazyků",
          body: "Text prohlídky je přeložen do každého jazyka, který IQ Rest podporuje — stejně jako zbytek dashboardu. Španělsky mluvící majitelé dostávají španělské bubliny, němečtí majitelé dostávají němčinu, katalánští majitelé dostávají katalánštinu. Nic v prohlídce nepředpokládá znalost angličtiny.",
        },
      ],
      benefitsTitle: "Proč prohlídka v produktu překonává centrum nápovědy",
      benefits: [
        "Učte se děláním, ne čtením dokumentů",
        "7 kroků pokrývá ~95 % workflow",
        "Zamítněte kdykoli — nikdy neblokuje dashboard",
        "Přetrvává napříč relacemi, dokud není dokončena nebo přeskočena",
        "Lokalizováno do 35 jazyků — angličtina není potřeba",
        "Žádná videa k načítání — okamžitý nativní UI overlay",
      ],
      conclusionTitle: "Z zmateného k sebejistému v sedmi krocích",
      conclusionBody:
        "Nejtěžší okamžik v každém produktu je prvních 30 sekund. Uživatel otevře dashboard, rozhlédne se a buď to pochopí, nebo odejde. Interaktivní prohlídka IQ Rest toto riziko odstraňuje — během minuty každý nový uživatel ví, kde přidat jídlo, jak zobrazit náhled, jak sdílet. Dokončení prohlídky silně koreluje s úspěšným publikováním menu. Neučíme jen produkt — dostáváme menu živě.",
      ctaText: "Zaregistrujte se a nechte se provést svým prvním QR menu v sedmi klepnutích.",
      ctaButton: "Začít bezplatnou zkušební verzi",
    },

    "custom-landing-page-per-country": {
      meta: {
        title: "Landing stránky specifické pro zemi pro QR menu | IQ Rest",
        description:
          "Návštěvníci ze Španělska vidí landing stránku přizpůsobenou španělským restauracím. Francie vidí francouzskou. 35 zemí, 35 stránek vyladěných pro konverzi.",
      },
      title: "Vlastní landing stránka v každém jazyce",
      subtitle:
        "Návštěvníci už nedostávají automaticky přeloženou stránku. Každý z 35 podporovaných jazyků má vlastní landing stránku, napsanou pro daný trh.",
      intro:
        "Automaticky přeložené landing stránky konvertují špatně. Gramatika je špatná, kulturní odkazy jsou špatné a místní platební podmínky působí importovaně. IQ Rest nyní dodává jedinečnou landing stránku pro každý z 35 podporovaných jazyků — napsanou pro trh, ne jen přeloženou. Španělští návštěvníci dostávají stránku o restaurantes y cafeterías. Francouzští návštěvníci dostávají cafés et bistrots. Němečtí návštěvníci dostávají Restaurants und Imbisse. Každá stránka vede s hodnotovou nabídkou, která pro danou audienci nejvíce záleží.",
      sections: [
        {
          title: "Jedna stránka na jazyk, ne automatický překlad",
          body: "Každý landing žije na /<locale> jako samostatná Next.js cesta. Texty jsou v TypeScript objektech — verzované, typově kontrolované, samostatně nasaditelné. Můžeme A/B testovat španělskou hero variantu bez dotyku německé. Můžeme lokalizovat cenovou výzvu pro brazilský real bez ovlivnění eurozónových trhů. Výsledkem je rychlejší iterace landingů, které řídí skutečnou konverzi.",
        },
        {
          title: "Geolokace automaticky směruje návštěvníky",
          body: "Při prvním přistání návštěvníka na iq-rest.com náš nginx geo modul přečte jeho kód země a přesměruje na správný /<locale>. Španělské IP přistávají na /es. Německé na /de. Brazílie na /pt. Dokonce směrujeme katalánsky mluvící části Španělska na /ca místo /es. Návštěvníci nikdy nevidí modal „vyberte si jazyk“ — vidí svůj jazyk ve výchozím nastavení.",
        },
        {
          title: "Hreflang a kanonické značky pro celou značku",
          body: "Všech 35 landingů na sebe odkazuje pomocí hreflang značek, takže Google indexuje správnou pro každý dotaz. Kanonické URL ukazují na URL pro daný locale, ne na obecný kořen. Nastavení přesně sleduje mezinárodní SEO pokyny Googlu, takže každý landing soutěží ve svém vlastním jazyce, aniž by kanibalizoval ostatní.",
        },
      ],
      benefitsTitle: "Proč landingy podle země konvertují lépe",
      benefits: [
        "Nativní formulace na každém trhu — ne automatický překlad",
        "Geo-směrování automaticky podává správnou stránku",
        "Hreflang a kanonické značky sledují pokyny Googlu",
        "Katalánští návštěvníci v Katalánsku vidí katalánštinu, ne kastilštinu",
        "Měna, ceny a CTA lokalizovány pro každý trh",
        "Nezávislé A/B testování pro každý locale bez křížové kontaminace",
      ],
      conclusionTitle: "35 jazyků, 35 vstupních dveří",
      conclusionBody:
        "Pokud španělský majitel restaurace přistane na napůl přeložené anglické stránce s americkým stylem cen, odejde. Pokud přistane na stránce, která mu mluví španělsky, s eurovými cenami a španělskými odkazy, konvertuje. IQ Rest nyní dělá tu druhou věc na každém trhu, který obsluhujeme — 35 landingů, 35 vstupních dveří vyladěných pro konverzi, všechny automaticky geo-směrované.",
      ctaText: "Vyzkoušejte IQ Rest ve svém jazyce — landing přizpůsobený vašemu trhu.",
      ctaButton: "Otevřít můj jazyk",
    },

    "sign-in-with-google-restaurant-dashboard": {
      meta: {
        title: "Přihlášení Googlem pro dashboard QR menu restaurace | IQ Rest",
        description:
          "Přeskočte hesla a e-mailové kódy. Klepněte na „Přihlásit se s Google“ pro přístup k dashboardu QR menu vaší restaurace za vteřinu.",
      },
      title: "Přihlášení Googlem — Přístup jedním klepnutím k vašemu QR menu",
      subtitle:
        "Přeskočte OTP e-maily a zapomenutá hesla. Klepněte „Pokračovat s Google“ a jste uvnitř dashboardu za méně než vteřinu.",
      intro:
        "E-mail + jednorázový kód autentizace je bezpečná, ale pomalá. Zadejte e-mail, čekejte na kód, přepněte do schránky, zkopírujte kód, vložte, odešlete. To je v nejlepším případě 30sekundový tok. IQ Rest nyní nabízí Přihlášení Googlem jako alternativu: klepněte na jedno tlačítko, vyberte Google účet, jste uvnitř. Žádné heslo k zapomenutí, žádný okruh schránkou, žádné tření.",
      sections: [
        {
          title: "Nativní Google OAuth, ne smyčka přesměrování",
          body: "Používáme oficiální Google Identity Services SDK s One Tap UI na podporovaných prohlížečích. Tok probíhá v nativním popupu, ne přesměrováním na doménu Googlu a zpět. Celá věc trvá asi vteřinu po prvním klepnutí. Server-side ověřujeme Google ID token proti veřejným klíčům Googlu, takže tok je end-to-end kryptograficky zabezpečený.",
        },
        {
          title: "Stejný účet, kterákoli metoda",
          body: "Pokud jste se zaregistrovali e-mail-OTP a později si vyberete Google, propojíme účty podle e-mailu. Můžete přepínat mezi metodami při každém přihlášení. Není „samostatný Google účet“ ke správě a neztratíte své menu jiným přihlášením. Také předáváme locale dashboardu při přihlášení Googlem, takže e-maily na váš účet jdou ve správném jazyce od prvního dne.",
        },
        {
          title: "Mobile-First — Funguje na iOS Safari a Android Chrome",
          body: "Oficiální SDK Googlu byla historicky na mobilu křehká. Obešli jsme to překrytím skutečného Google tlačítka přes naše UI místo spouštění programových kliknutí (které iOS Safari nyní blokuje). Výsledek: tlačítko funguje na každém moderním prohlížeči telefonu, žádná instalace, žádný app store.",
        },
      ],
      benefitsTitle: "Proč Google přihlášení překonává e-mail OTP",
      benefits: [
        "Jedno klepnutí pro přihlášení — žádný okruh e-mailem",
        "Žádné heslo k zapamatování nebo resetu",
        "Stejný účet, ať použijete e-mail nebo Google",
        "Kryptograficky ověřeno na serveru přes Google ID token",
        "Spolehlivě funguje na iOS Safari a Android Chrome",
        "Locale předán, takže e-maily zůstávají ve vašem jazyce",
      ],
      conclusionTitle: "Nejrychlejší cesta zpět do vašeho dashboardu",
      conclusionBody:
        "Majitelé restaurací kontrolují svá menu desítkykrát týdně — mezi servisy, po tisku, při úpravě cen. Každá vteřina ušetřená při přihlášení se sčítá. Přihlášení Googlem mění 30sekundový OTP tok v jedno klepnutí. E-mail-OTP zůstává dostupné pro majitele, kteří ho preferují, ale většina uživatelů zvolí Google poté, co ho jednou vyzkouší.",
      ctaText: "Přeskočte heslo — přihlaste se Googlem jedním klepnutím.",
      ctaButton: "Otevřít dashboard",
    },

    "multilingual-email-notifications-35-languages": {
      meta: {
        title: "Vícejazyčné e-mailové notifikace v 35 jazycích | IQ Rest",
        description:
          "Připomínky zkušební verze, odpovědi podpory, e-maily o předplatném — každá notifikace, kterou IQ Rest pošle, přichází v jazyce vašeho dashboardu.",
      },
      title: "Vícejazyčné e-mailové notifikace ve všech 35 jazycích",
      subtitle:
        "Každý e-mail, který IQ Rest pošle — odpovědi podpory, připomínky zkušební verze, účtenky předplatného — přichází v jazyce, který jste nastavili v dashboardu. Včetně rozložení zprava doleva.",
      intro:
        "E-mail ve špatném jazyce je v nejlepším případě tření, v nejhorším smazání. IQ Rest nyní posílá každý transakční e-mail v jazyce, který jste nastavili v dashboardu, ve všech 35 podporovaných locales. Uvítací e-maily, připomínky vypršení zkušební verze, potvrzení předplatného, odpovědi podpory — všechny přicházejí ve vašem jazyce, se správnou gramatikou a kulturně vhodnou formulací. Jazyky zprava doleva jako arabština a perština dostávají správně zrcadlená rozložení.",
      sections: [
        {
          title: "preferredLocale cestuje s vaším účtem",
          body: "Každý uživatel má pole preferredLocale nastavené při prvním přihlášení. Ať jste se zaregistrovali přes e-mail-OTP, Google nebo průvodce, váš locale je zachycen a perzistentní. Každá backend úloha, která emituje e-mail — Stripe webhooky, notifikace odpovědi podpory, plánované cron úlohy — vytáhne preferredLocale uživatele a použije ho k výběru správné šablony. Přepněte locale v dashboardu a další e-mail změnu odráží.",
        },
        {
          title: "RTL šablony pro arabštinu a perštinu",
          body: "Rozložení zprava doleva nejsou jen překlad — celá vizuální hierarchie se otáčí. Dodáváme vyhrazené RTL šablony pro arabštinu a perštinu: navigace plyne zprava doleva, čísla v arabsko-indickém kde je to vhodné, logo značky umístěno správně. Výsledkem je e-mail, který působí nativně pro RTL čtenáře, ne přeložená LTR šablona se zlomeným zarovnáním.",
        },
        {
          title: "Přeloženo experty z restauračního průmyslu",
          body: "Obecné překladatelské služby produkují doslovné, ale strnulé překlady. Přeložili jsme každou šablonu pomocí kuchyňské a pohostinské terminologie, která zní přirozeně provozovatelům restaurací na každém trhu. „Trial“ se stává „período de prueba“ ve španělštině (ne „juicio“). „Reservation“ se stává „Reservierung“ v němčině (ne „Reservation“). Úroveň detailu se sčítá — restaurace si všímají, když nástroj mluví jejich jazykem správně.",
        },
      ],
      benefitsTitle: "Proč jsou vícejazyčné e-maily důležité",
      benefits: [
        "Všechny transakční e-maily v jazyce vašeho dashboardu",
        "preferredLocale přetrvává napříč přihlášeními",
        "RTL rozložení pro arabštinu a perštinu",
        "Pohostinství vhodná terminologie pro každý jazyk",
        "Přepnutí locale aktualizuje budoucí e-maily okamžitě",
        "35 jazyků včetně katalánštiny, slovinštiny, estonštiny, lotyštiny",
      ],
      conclusionTitle: "E-maily, které mluví vaším jazykem",
      conclusionBody:
        "Komunikace, která přistane ve špatném jazyce, je komunikace, která nefunguje. IQ Rest posílá každý e-mail v jazyce, který skutečně používáte, s rozložením a terminologií, která sedí. Zní to malé, dokud nejste španělský majitel restaurace, který dostává upozornění na vypršení zkušební verze pouze v angličtině a propasete ho. Teď ne.",
      ctaText: "Zaregistrujte se a získejte dashboard plus každý e-mail ve svém jazyce.",
      ctaButton: "Začít bezplatnou zkušební verzi",
    },

    "ios-native-feel-mobile-restaurant-management": {
      meta: {
        title: "iOS-nativní pocit pro mobilní dashboard restaurace | IQ Rest",
        description:
          "Spodní záložková navigace, zacházení s bezpečnou oblastí, vstupy bez zoomu — mobilní dashboard IQ Rest působí jako nativní aplikace na iPhonu.",
      },
      title: "iOS-nativní pocit na vašem telefonu",
      subtitle:
        "Spodní záložková navigace, plné povědomí o bezpečné oblasti, formulářové vstupy bez zoomu a okamžité přechody stránek. Správa vašeho QR menu na telefonu nyní působí jako používání nativní iOS aplikace.",
      intro:
        "Většina SaaS dashboardů restaurací jsou na mobilu desktop-first dodatečné myšlenky. IQ Rest je opak — navržen pro majitele, kteří provozují své menu z telefonu mezi servisy. Mobilní dashboard nyní používá spodní záložkovou navigaci, respektuje insety bezpečné oblasti iPhone, brání iOS zoomu vstupů formuláře a používá téměř okamžité SPA přechody. Vypadá a působí jako nativní aplikace, jen není žádná aplikace k instalaci.",
      sections: [
        {
          title: "Spodní záložková navigace, ne hamburger",
          body: "Hamburger menu na mobilu jsou pomalá — klepněte pro otevření, klepněte na položku, čekejte na stránku. Nahradili jsme desktopový sidebar spodní záložkovou lištou na telefonech: Menu, Objednávky, Rezervace, Nastavení. Jedno palecky-přívětivé klepnutí, okamžitá navigace. Aktivní záložka používá akcentovou barvu vaší značky, takže současné umístění je vždy zřejmé.",
        },
        {
          title: "Insety bezpečné oblasti a Home indikátor",
          body: "Moderní iPhony mají Home indikátor dole a notch nahoře. Webové aplikace, které to ignorují, končí s UI překrývajícím indikátor nebo skrytým za notchem. Používáme env(safe-area-inset-*) všude — spodní nav sedí nad Home indikátorem, padding obsahu počítá s dynamic island. Výsledek působí navržený pro zařízení, ne adaptovaný z desktopového prohlížeče.",
        },
        {
          title: "Vstupy bez zoomu a okamžité odeslání formuláře",
          body: "iOS Safari zoomuje formuláře s velikostí písma vstupu pod 16px. Zvedli jsme každý vstup na 16px a nakonfigurovali viewport s maximum-scale=1, takže klepnutí nespouští zoom-a-skok, který rozbíjí každý jiný webový dashboard. Odeslání formuláře jsou server actions s optimistic UI — změna se objeví okamžitě, síť potvrzuje na pozadí.",
        },
      ],
      benefitsTitle: "Proč nativní pocit záleží na mobilu",
      benefits: [
        "Spodní záložková nav — přístup jedním klepnutím ke každé sekci",
        "Povědomí o bezpečné oblasti — žádné překrývání s Home indikátorem nebo notchem",
        "16px vstupy — žádný iOS zoom-a-skok při klepnutí na formulář",
        "Aktivní záložka používá akcentovou barvu vaší značky",
        "SPA přechody — žádné plné znovunačtení stránky mezi sekcemi",
        "Žádná aplikace k instalaci — funguje v Safari a Chrome",
      ],
      conclusionTitle: "Webový dashboard, který působí jako aplikace",
      conclusionBody:
        "Hranice mezi webem a nativním je převážně otázkou pozornosti k detailu. Mobilní dashboard IQ Rest tuto pozornost platí — spodní nav, bezpečná oblast, žádný zoom, okamžité přechody — a výsledkem je něco, o čem byste přísahali, že to bylo postaveno se Swiftem. Až na to, že to funguje i na Androidu, a není nic k instalaci nebo aktualizaci přes app store.",
      ctaText: "Otevřete IQ Rest na svém telefonu a pociťte rozdíl.",
      ctaButton: "Vyzkoušet zdarma na 14 dní",
    },

    "gdpr-cookie-consent-banner-restaurant-website": {
      meta: {
        title: "GDPR cookie consent banner pro web restaurace | IQ Rest",
        description:
          "Zákonný consent banner, sladěný s AEPD, bez skriptů třetích stran. Cookieless analytika se spouští i před souhlasem.",
      },
      title: "GDPR-kompatibilní cookie consent banner",
      subtitle:
        "Vlastní consent banner bez CMP třetí strany, bez script tagu z Cookiebot nebo OneTrust. Sladěný s pokyny AEPD a ePrivacy, s cookieless analytikou, která se spouští před souhlasem.",
      intro:
        "Každý komerční web v EU potřebuje cookie consent banner. Většina používá CMP třetích stran, které tahají těžké skripty a zpomalují stránku. IQ Rest postavil vlastní lehký AEPD-sladěný consent banner, který je součástí balíčku stránky — žádné extra DNS lookupy, žádné sledování třetí stranou. Návštěvníci vidí jasnou volbu Přijmout / Odmítnout, s oběma tlačítky stejně stylizovanými (temný vzor skrývání „odmítnout“ je v mnoha zemích EU nezákonný — to neděláme).",
      sections: [
        {
          title: "Sladěno s AEPD a ePrivacy",
          body: "Španělský AEPD a širší směrnice ePrivacy vyžadují tlačítka Přijmout a Odmítnout se stejnou prominencí. Mnoho CMP nabízí default temného vzoru „obrovské přijmout, malé odmítnout“. Tento vzor odmítáme — obě tlačítka mají stejnou velikost, stejný styl, jen jiné barvy. Návštěvníci, kteří odmítnou, jsou sledováni pouze přes cookieless agregované čítače; nikdy neukládáme identifikátor na jejich zařízení, takže po odmítnutí nezůstává žádná first-party cookie.",
        },
        {
          title: "Žádné skripty třetích stran",
          body: "Většina consent bannerů načítá Cookiebot, OneTrust nebo podobné z CDN. To přidává 50-100KB JavaScriptu, extra DNS lookup a vztah sdílení dat třetí straně k odhalení v zásadách ochrany osobních údajů. Banner IQ Rest je součástí balíčku landing stránky — žádné externí požadavky, žádné sdílení dat třetí strany, rychlejší načítání stránky.",
        },
        {
          title: "Soukromí, Cookies a Podmínky v modálech",
          body: "Klepnutí na „Zásady ochrany osobních údajů“, „Zásady cookies“ nebo „Podmínky“ v banneru otevře modál — žádná navigace stránky, žádná ztráta pozice scrollu na landingu. Plný právní text je tam, scrollovatelný, se správnými nadpisy. Po přečtení zavřete modál a vyberte Přijmout nebo Odmítnout. Tok je bez tření pro uživatele a umožňuje nám vyhnout se extra skokům stránek, které by ublížily konverzi landingu.",
        },
      ],
      benefitsTitle: "Proč náš banner překonává CMP třetích stran",
      benefits: [
        "Sladěno s AEPD a ePrivacy — Přijmout/Odmítnout se stejnou prominencí",
        "Žádné skripty třetích stran, žádné extra DNS lookupy",
        "Soukromí/Cookies/Podmínky v modálech — žádné skoky stránek",
        "Cookieless analytika se spouští i před souhlasem — nikdy neztratíte data",
        "First-party cookie odstraněna při Odmítnutí",
        "Lehký — součást landing balíčku",
      ],
      conclusionTitle: "Compliance bez tahání konverze",
      conclusionBody:
        "Cookie souhlas je v EU nesjednatelný, ale nemusí zpomalovat vaši stránku ani škodit konverzi. Banner IQ Rest je rychlý, spravedlivý a plně kompatibilní. Návštěvníci, kteří přijmou, povolí per-session analytiku; návštěvníci, kteří odmítnou, se stále registrují v našich anonymních agregovaných čítačích, takže víme, co se na landingu děje, aniž bychom je kdy identifikovali.",
      ctaText: "Podívejte se na consent tok v akci — otevřete IQ Rest v čerstvém prohlížeči.",
      ctaButton: "Navštívit landing",
    },

    "privacy-terms-in-modals-no-page-jumps": {
      meta: {
        title: "Soukromí a Podmínky v modálech — žádné skoky stránek | IQ Rest",
        description:
          "Zásady ochrany osobních údajů, Podmínky služby a Zásady cookies se nyní otevírají v modálech na landingu — žádná ztráta scrollu, žádná extra navigace.",
      },
      title: "Soukromí, Podmínky a Zásady cookies v modálech — žádné skoky stránek",
      subtitle:
        "Klepněte na jakýkoli právní odkaz na landing nebo auth stránce a zásady se otevřou v čistém modálu. Žádná navigace, žádná ztráta pozice scrollu, žádné lámání vašeho konverzního toku.",
      intro:
        "Samostatné stránky /privacy, /terms a /cookies byly standardním vzorem — a standardní chybou. Návštěvníci klikli na odkaz, ztratili své místo na landingu, přečetli zásady, pak zapomněli vrátit. Konverze klesala. IQ Rest nyní otevírá všechny tři právní dokumenty jako modály na stránce: stejná pozice scrollu zachována, stejný landing zážitek nepřerušený, plná právní kompatibilita zachována.",
      sections: [
        {
          title: "Jeden Modal komponent, tři dokumenty",
          body: "Používáme jeden Modal komponent s přepínačem na typu dokumentu. Otevřete ho z cookie banneru, auth stránky, footeru — stejný komponent, stejné zámknutí scrollu, stejné zavření na escape. Právní text žije ve sdílených TypeScript konstantách, takže aktualizace klauzule jednou se propaguje na každé místo, kde se zásady zobrazují. Žádná duplikace, žádná odchylka.",
        },
        {
          title: "Stack modálů — otevřete jeden zevnitř druhého",
          body: "Pokud čtete Zásady cookies a chcete přepnout na Zásady ochrany osobních údajů, odkaz uvnitř modálu otevře další modál nahoru — ne jako přesměrování. Stack zachází se zpětnou navigací správně, escape zavře horní modál, klepnutí mimo elegantně zamítne. Interakce je to, co uživatelé od nativní aplikace očekávají.",
        },
        {
          title: "Všech 35 locales — stejný text z jediného zdroje",
          body: "Samotný právní text je v angličtině (jazyk naší právní entity, autónomo registrované ve Španělsku), ale chrome modálu — názvy, tlačítko zavření, popisky odkazů — je plně lokalizován do všech 35 jazyků. Návštěvníci ve španělštině, němčině, polštině nebo korejštině vidí lokalizovaný modál, který otevírá anglický právní text, přesně jak vyžaduje náš přístup ke kompatibilitě.",
        },
      ],
      benefitsTitle: "Proč modály překonávají samostatné právní stránky",
      benefits: [
        "Žádná ztráta scrollu — návštěvníci zůstávají na landingu",
        "Vyšší konverze — méně neúmyslných odchodů",
        "Jeden komponent, tři dokumenty — žádná duplikace",
        "Stack modálů — otevřete jeden zevnitř druhého čistě",
        "Lokalizovaný chrome v 35 jazycích",
        "Zachována plná právní kompatibilita",
      ],
      conclusionTitle: "Právní bez tření",
      conclusionBody:
        "Právníci chtějí, aby zásady byly čitelné. Marketéři chtějí, aby návštěvník konvertoval. Modály dělají oba šťastnými: zásady jsou na klepnutí daleko, plně čitelné, bez dopadu na landing tok. Compliance pozice IQ Rest zůstává silná bez tahání konverze samostatných právních stránek.",
      ctaText: "Vyzkoušejte nový tok — otevřete cookie banner a klepněte na jakýkoli odkaz zásad.",
      ctaButton: "Navštívit landing",
    },

    "auto-catalan-language-catalonia-visitors": {
      meta: {
        title: "Auto-katalánština pro návštěvníky z Katalánska | IQ Rest",
        description:
          "Návštěvníci z Barcelony, Tarragony, Lleidy a Girony vidí IQ Rest automaticky v katalánštině místo kastilské španělštiny.",
      },
      title: "Automatická detekce katalánštiny pro návštěvníky z Katalánska",
      subtitle:
        "Návštěvníci z Barcelony, Tarragony, Lleidy a Girony přistávají na katalánské verzi IQ Rest jako výchozí. Zbytek Španělska stále dostává kastilskou španělštinu.",
      intro:
        "Katalánsko má silnou jazykovou identitu — miliony Katalánců používají katalánštinu jako svůj první jazyk, odlišný od kastilské španělštiny. IQ Rest nyní toto rozlišení respektuje na geo úrovni: návštěvníci, jejichž IP geolokalizuje do katalánské provincie, dostávají landing /ca automaticky. Kastilská španělština zůstává výchozí pro zbytek Španělska. Návštěvníci mohou kdykoli přepnout jazyk přes jazykový modál v footeru.",
      sections: [
        {
          title: "Geo-detekce na okraji",
          body: "Čteme zemi a oblast návštěvníka z našeho nginx geo modulu při každé žádosti. Pokud je země Španělsko a oblast odpovídá Barceloně, Tarragoně, Lleidě nebo Gironě (nebo obsahuje „Catalonia“ / „Catalunya“ v názvu oblasti), přesměrujeme je na /ca. Jinak návštěvník následuje standardní směrování země-na-locale a přistává na příslušné jazykové stránce.",
        },
        {
          title: "Cookie locale přepisuje geo",
          body: "Jakmile si vyberete jazyk ručně přes přepínač jazyků, vaše volba je perzistentní v cookie, která přepisuje geo pro budoucí návštěvy. Katalánsky mluvící návštěvník, který preferuje čtení IQ Rest v angličtině, nebude stále přesměrováván na /ca — jeho explicitní volba vždy vyhrává. Geo je výchozí, ne omezení.",
        },
        {
          title: "Plný katalánský překlad, ne automatický překlad",
          body: "Landing stránka /ca není automaticky přeložena ze španělštiny — každé slovo je profesionálně přeloženo katalánsky mluvícími copywritery z restauračního průmyslu. Pohostinská terminologie, platební podmínky, kulturní odkazy vše odpovídá tomu, jak katalánský majitel restaurace skutečně mluví. Stránka se čte, jako by byla napsána pro trh, protože byla.",
        },
      ],
      benefitsTitle: "Proč auto-katalánština záleží",
      benefits: [
        "Návštěvníci z Barcelony/Tarragony/Lleidy/Girony vidí katalánštinu automaticky",
        "Zbytek Španělska stále dostává kastilskou španělštinu — žádné nadměrné směrování",
        "Ruční volba jazyka přetrvává přes cookie",
        "Plný profesionální překlad, ne strojový překlad",
        "Geo-detekce probíhá na okraji — žádné blikání na klientu",
        "Stejný konverzí vyladěný landing jako každý jiný locale",
      ],
      conclusionTitle: "Respektování jazykové identity",
      conclusionBody:
        "Defaultování katalánských návštěvníků na kastilskou španělštinu je technicky malá věc, ale politicky a kulturně velká věc. Geo-směrování IQ Rest nyní zachází s katalánštinou jako s prvotřídním jazykem pro návštěvníky z Katalánska. Výsledek: vyšší konverzní landing pro katalánsky mluvící majitele restaurací, kteří se cítí respektováni od první sekundy, kdy vidí náš web.",
      ctaText: "Navštivte IQ Rest z Katalánska a uvidíte stránku ve svém jazyce.",
      ctaButton: "Otevřít katalánský landing",
    },

    "trial-expired-modal-keep-menu-public": {
      meta: {
        title: "Modál zkušební vypršela — QR menu zůstává veřejné | IQ Rest",
        description:
          "Když vaše zkušební doba skončí, vaše menu nezmizí. Hosté mohou stále skenovat a prohlížet; vidíte upgrade modál v dashboardu.",
      },
      title: "Zkušební vypršela? Vaše QR menu zůstává živé pro hosty",
      subtitle:
        "Vypršení zkušební doby již nezabíjí vaše veřejné menu. Hosté mohou stále skenovat a prohlížet; jen váš dashboard vás vyzývá k upgrade. Žádné překvapivé výpadky uprostřed servisu.",
      intro:
        "Staré chování vypršení zkušební doby bylo drsné: když vašich 14 dní skončilo, vaše veřejné QR menu zhaslo pro hosty. Pokud jste náhodou byli uprostřed servisu, byla to katastrofa. Změnili jsme to. Nyní vám vypršení zkušební doby ukáže modál uvnitř dashboardu vyzývající k upgrade, ale vaše veřejné menu pokračuje v normální obsluze hostů. Upgradujete, když jste připraveni, ne když host mává telefonem na QR kód na stole.",
      sections: [
        {
          title: "Veřejné menu zůstává živé",
          body: "14denní zkušební doba končí tiše z perspektivy hosta. QR menu, online objednávání, rezervace — vše pokračuje v práci. Majitel vidí upgrade modál při dalším přihlášení k dashboardu. Toto oddělení znamená, že vypršení zkušební doby nikdy nemůže rozbít servis nebo vás zahanbit před zákazníky.",
        },
        {
          title: "Modál v dashboardu, ne tvrdé přesměrování",
          body: "Dříve vypršení zkušební doby přesměrovalo dashboard na fakturační stránku. To rozbíjelo hluboké odkazy a matoucí uživatele, kteří byli odraženi uprostřed úkolu. Nyní zobrazujeme čistý modál: „Vaše zkušební doba skončila. Vyberte tarif pro pokračování v používání pokročilých funkcí.“ Modál lze zamítnout; můžete pokračovat v navigaci dashboardem, ale nové akce vyžadující placený tarif zobrazují inline upsell výzvy.",
        },
        {
          title: "Náhled vždy dostupný",
          body: "Dokonce s vypršenou zkušební dobou můžete stále zobrazit náhled vašeho QR menu z dashboardu. Nezamykáme vás před viděním toho, co vidí hosté. Editujte menu, zobrazte náhled výsledku — pouze publikační akce naznačují upgrade. To udržuje dashboard produktivní i uprostřed rozhodnutí, takže neztratíte přístup, zatímco porovnáváte tarify.",
        },
      ],
      benefitsTitle: "Proč měkké vypršení překonává tvrdé useknutí",
      benefits: [
        "Veřejné QR menu zůstává živé pro hosty",
        "Žádné překvapivé výpadky uprostřed servisu",
        "Modál v dashboardu místo nuceného přesměrování na fakturaci",
        "Náhled vždy dostupný bez ohledu na stav tarifu",
        "Inline upsell náznaky nahrazují prudké blokády",
        "Majitel upgraduje podle vlastního rozvrhu",
      ],
      conclusionTitle: "Respektujte provozní hodiny restaurace",
      conclusionBody:
        "Restaurace běží na úzkých maržích a ještě užších rozvrzích. QR menu, které spadne, protože bezplatná zkušební doba vypršela, je horší než samotný limit zkušební doby — poškozuje důvěru. Měkké vypršení udržuje světla zapnutá pro hosty, zatímco stále tlačí majitele směrem k placenému tarifu. Konverze zůstávají vysoké; výpadek klesá na nulu.",
      ctaText: "Začněte 14denní zkušební dobu s vědomím, že vaše menu zůstává živé bez ohledu na cokoli.",
      ctaButton: "Začít bezplatnou zkušební verzi",
    },

    "item-renamed-to-dish-clearer-menu-editor": {
      meta: {
        title: "Item → Dish: Jasnější terminologie editoru menu | IQ Rest",
        description:
          "Přejmenovali jsme „Item“ na „Dish“ napříč dashboardem. Majitelé restaurací by neměli muset překládat generickou SaaS terminologii v hlavě.",
      },
      title: "Item → Dish: Jasnější terminologie napříč editorem",
      subtitle:
        "Nahradili jsme generický štítek „Item“ s „Dish“ na každém povrchu dashboardu. Malá změna, velký nárůst jasnosti pro majitele restaurací, kteří nemluví SaaS.",
      intro:
        "Lidé od softwaru říkají „item“. Lidé z restaurací říkají „dish“ (jídlo). Nesoulad byl malý, ale konstantní — pokaždé, když jsme zobrazovali „Add Item“, majitel to musel v hlavě překládat na „Add Dish“. Přejmenovali jsme vše: tlačítka, štítky, zprávy o úspěchu, chybové stavy, názvy stránek. Dashboard nyní mluví stejným jazykem jako lidé, kteří ho používají.",
      sections: [
        {
          title: "Kde se přejmenování aplikuje",
          body: "Každý uživatelský povrch: „Add Item“ se stalo „Add Dish“. Záložka „Items“ v menu se stala „Dishes“. „Item Settings“ se staly „Dish Settings“. Toasty úspěchu („Item created“) se staly („Dish created“). Chyby validace formuláře, breadcrumbs, nadpisy dashboardu — vše aktualizováno. Interní sloupec databáze se stále jmenuje „item“ pro zpětnou kompatibilitu, ale žádný uživatel to nikdy nevidí.",
        },
        {
          title: "Přeloženo do všech 35 jazyků",
          body: "Každý jazyk má své správné slovo pro „dish“, které je odlišné od „item“. Španělsky „plato“, francouzsky „plat“, německy „Gericht“, italsky „piatto“, katalánsky „plat“, japonsky „料理“. Aktualizovali jsme překladový klíč v každém locale a ověřili, že výsledek čte přirozeně v každém jazyce. Žádný strojový překlad; rodilí mluvčí přezkoumali každý.",
        },
        {
          title: "Výchozí kategorie také automaticky vytvořená",
          body: "Zatímco jsme byli v editoru, také jsme automaticky vytvořili výchozí kategorii s názvem „Menu“ při první návštěvě dashboardu. Staré chování: majitelé přistávali na prázdné menu, museli klepnout „Add Category“, než mohli přidat jídlo, často to vzdali. Nové chování: kategorie Menu existuje, klepnete „Add Dish“, editujete okamžitě. Jedna bariera odstraněna.",
        },
      ],
      benefitsTitle: "Proč terminologie záleží",
      benefits: [
        "„Dish“ odpovídá tomu, jak majitelé restaurací skutečně mluví",
        "Aktualizováno na každém povrchu dashboardu — tlačítka, štítky, toasty",
        "Přeloženo do všech 35 jazyků rodilými recenzenty",
        "Výchozí kategorie automaticky vytvořená — žádné prázdné menu pro start",
        "Rychleji od registrace k prvnímu přidanému jídlu",
        "Méně mentálního překladu = nižší odchod v onboardingu",
      ],
      conclusionTitle: "Mluvte jazykem uživatele",
      conclusionBody:
        "Generická SaaS terminologie („item“, „entity“, „object“) je v pořádku pro inženýry. Majitelé restaurací potřebují slova, která odpovídají tomu, co říkají v práci. IQ Rest nyní mluví stejným jazykem jako lidé, kteří ho používají — napříč každým tlačítkem, štítkem a notifikací — a konverzní data již změnu odrážejí.",
      ctaText: "Zaregistrujte se a přidejte své první jídlo za méně než minutu.",
      ctaButton: "Postavit moje menu",
    },

    "auto-default-category-restaurant-menu-onboarding": {
      meta: {
        title: "Auto-výchozí kategorie pro onboarding menu restaurace | IQ Rest",
        description:
          "Uživatelé poprvé již nečelí prázdnému menu. IQ Rest automaticky vytvoří výchozí kategorii, takže můžete přidat své první jídlo okamžitě.",
      },
      title: "Auto-výchozí kategorie — Přeskočte prázdné menu",
      subtitle:
        "Uživatelé poprvé přistávají na menu s jednou výchozí kategorií již vytvořenou. Klepněte „Add Dish“ a začněte editovat. Žádná bariera „nejdřív vytvořit kategorii“.",
      intro:
        "Starý onboarding vyžadoval, aby uživatelé vytvořili kategorii, než mohli přidat jídlo. Prázdná menu jsou zastrašující — mnoho nových uživatelů to v tom bodě vzdalo. IQ Rest nyní automaticky vytváří výchozí kategorii „Menu“ při prvním otevření dashboardu, takže první akce, kterou provedete, je přidání jídla, ne konfigurace hierarchie. Rychlejší, plynulejší, více skutečně postavených menu.",
      sections: [
        {
          title: "Výchozí kategorie vytvořena při přihlášení",
          body: "Při prvním přihlášení do čerstvého dashboardu IQ Rest zkontroluje, zda máte nějaké kategorie. Pokud ne, vytvoří jednu s názvem „Menu“ (přeloženou do vašeho locale). Kategorie je okamžitě připravena přijímat jídla. Můžete ji kdykoli přejmenovat nebo přidat další kategorie — ale nemusíte před přidáním svého prvního jídla.",
        },
        {
          title: "Přejmenováno tak, aby odpovídalo vaší kuchyni, když používáte průvodce",
          body: "Pokud jste použili třístupňového průvodce registrací, seeder místo toho generuje kategorie odpovídající kuchyni — „Pizza“, „Pasta“, „Antipasti“ pro italskou; „Sushi“, „Ramen“, „Sake“ pro japonskou. Auto-výchozí kategorie „Menu“ se aktivuje pouze pro uživatele, kteří přeskočili průvodce nebo se zaregistrovali přes Google přímo.",
        },
        {
          title: "Zpětně kompatibilní s existujícími menu",
          body: "Pokud již máte kategorie — z minulého použití, z importovaných dat, ze seeder — výchozí se nevytvoří. Zasahujeme pouze tehdy, když je menu skutečně prázdné. Stávající uživatelé nevidí žádnou změnu ve struktuře svého menu.",
        },
      ],
      benefitsTitle: "Proč auto-výchozí urychluje onboarding",
      benefits: [
        "Žádná bariera „nejdřív vytvořit kategorii“ pro nové uživatele",
        "Klepněte „Add Dish“ jako první akci, ne druhou",
        "Kategorie pojmenovaná ve vašem locale, ne anglicky výchozí",
        "Tok průvodce stále zasévá kategorie odpovídající kuchyni",
        "Existující menu nedotčená",
        "Rychleji od přihlášení k prvnímu přidanému jídlu",
      ],
      conclusionTitle: "Eliminujte prázdný stav",
      conclusionBody:
        "Prázdné stavy jsou tam, kde noví uživatelé odcházejí. Každá bariera mezi uživatelem a jeho první produktivní akcí vás stojí konverze. Auto-vytváření výchozí kategorie odstraňuje takovou bariéru. Je to malá změna s měřitelným dopadem na to, jak rychle se nové restaurace dostanou k publikovatelnému menu.",
      ctaText: "Zaregistrujte se a začněte přidávat jídla okamžitě.",
      ctaButton: "Postavit moje menu",
    },

    "skip-restaurant-name-step-onboarding": {
      meta: {
        title: "Přeskočte krok názvu restaurace v onboardingu | IQ Rest",
        description:
          "Vypustili jsme krok „název restaurace“ z onboardingu. Nastavte ho později v nastavení — nebo přímo z hero menu, které stejně budete editovat.",
      },
      title: "Přeskočte krok názvu restaurace v onboardingu",
      subtitle:
        "Nemusíte zadávat název restaurace, abyste začali budovat menu. Vypustili jsme tento onboarding krok — nastavte název později z dashboardu nebo přes hero živého menu.",
      intro:
        "Onboarding toky, které vyžadují informace předem, působí jako vyplňování formulářů. Starý IQ Rest onboarding se v prvním kroku ptal na název restaurace. Noví uživatelé často nerozhodli o přesném pravopise, variantě značky nebo interpunkci — takže se zasekli ještě před viděním dashboardu. Krok jsme odstranili. Zaregistrujte se, přistaňte v dashboardu, nastavte název, když jste připraveni. Menu stále funguje dobře bez něj.",
      sections: [
        {
          title: "Co se stane, když přeskočíte",
          body: "Pokud přeskočíte krok názvu, restaurace dostane zástupné jméno („Your Restaurant“), které je ve výchozím nastavení skryté na veřejném menu. Hosté skenující váš QR vidí menu bez názvu v hero — což je upřímně v pořádku pro mnoho míst rychlého občerstvení. Jakmile nastavíte název v nastavení, objeví se v hero, názvu stránky, SEO slug a sociálních sdíleních.",
        },
        {
          title: "Nastavte ho odkudkoli",
          body: "Pole názvu je editovatelné z nastavení, z hero menu (klepněte pro inline editaci) a z obrazovky veřejného náhledu. Tři různé povrchy, jedno podkladové pole. Udělali jsme jednoduchým odkládat rozhodnutí a triviálně jednoduchým zavázat se, když jste připraveni.",
        },
        {
          title: "Žádný SEO postih za defaultování",
          body: "Slug („your-restaurant“) používáme jako fallback pro název stránky a SEO meta tagy, dokud nenastavíte skutečný název. Vyhledávače vás netrestají — jen vidí generický název. V okamžiku, kdy nastavíte skutečný název, každý meta tag se aktualizuje a Google znovu prohledává během hodin.",
        },
      ],
      benefitsTitle: "Proč přeskočení urychluje onboarding",
      benefits: [
        "Žádný tlak na rozhodnutí ve špatný moment",
        "Přistaňte v dashboardu rychleji",
        "Nastavte název, když přijde inspirace — nebo když je registrována právní entita",
        "Inline editace z hero menu",
        "Veřejné menu funguje dobře bez nastaveného názvu",
        "Žádný SEO postih za používání zástupce",
      ],
      conclusionTitle: "Méně rozhodnutí, více hotovo",
      conclusionBody:
        "Každé pole formuláře v onboardingu je šance pro uživatele odejít. Odstraněním pole názvu restaurace jsme jednu takovou šanci odstranili. Noví uživatelé nyní přistávají v dashboardu s funkčním menu a svobodou pojmenovat (nebo nepojmenovat) svou restauraci podle vlastního rozvrhu. Konverzní zvýšení bylo okamžité.",
      ctaText: "Zaregistrujte se za vteřiny — žádný název restaurace nepotřeba.",
      ctaButton: "Začít bezplatnou zkušební verzi",
    },

    "try-menu-before-signup-anonymous-onboarding": {
      meta: {
        title: "Vyzkoušejte QR menu restaurace před registrací — anonymně | IQ Rest",
        description:
          "Postavte ukázkové menu před vytvořením účtu. Uložte svůj pokrok do e-mailu, když ho chcete uchovat. Žádný závazek, žádné tření.",
      },
      title: "Vyzkoušejte QR menu před registrací",
      subtitle:
        "Postavte ukázkové menu, podívejte se, jak vypadá váš QR kód, zobrazte náhled živého zážitku — vše před vytvořením účtu. Uložte svůj pokrok přes e-mailový odkaz, když jste připraveni.",
      intro:
        "Většina služeb QR menu vyžaduje, abyste si vytvořili účet, než cokoli můžete dělat. To je špatné pořadí. Noví majitelé restaurací chtějí nejprve cítit produkt — vidět, jak vypadá jídlo, jak se cítí tok skenování QR — a teprve potom se zavázat k registraci. IQ Rest vám nyní umožňuje postavit kompletní ukázkové menu anonymně. Když ho chcete uchovat, uložíme ho do vašeho e-mailu. Bez tření, bez závazku.",
      sections: [
        {
          title: "Anonymní relace ukládá vaši práci",
          body: "ID anonymní relace se vytvoří při vaší první návštěvě a uloží se v cookie. Každá kategorie, kterou přidáte, každé jídlo, které vytvoříte, každá fotografie, kterou nahrajete, je spojena s touto relací. Můžete opustit stránku, vrátit se a vaše menu je stále tam. Relaci uchováváme po dobu 7 dnů — dost času na vyhodnocení produktu bez tlaku.",
        },
        {
          title: "Uložte pokrok přes e-mailový odkaz",
          body: "Když se rozhodnete, že chcete uchovat menu, klepněte „Save Progress“. Zadejte svůj e-mail. Pošleme vám magický odkaz, který po klepnutí převede anonymní relaci na skutečný účet spojený s vaším e-mailem. Veškerá vaše práce se přenese automaticky — žádné opětovné zadávání, žádný ztracený pokrok, žádné „ups, smazalo se“. Konverze na placeného zákazníka se děje za vašich podmínek.",
        },
        {
          title: "Snižuje úzkost z registrace na nulu",
          body: "Tím, že umožníme uživatelům vyzkoušet před registrací, obracíme typický SaaS vzor. Návštěvníci se nemusí rozhodovat, zda IQ Rest stojí za jejich e-mail — mohou si to vidět sami. Restaurace, které vyzkoušejí anonymně a poté se zaregistrují, konvertují výše než restaurace nucené registrovat se nejprve, protože už investovali do menu a nechtějí ho ztratit.",
        },
      ],
      benefitsTitle: "Proč anonymní onboarding vyhrává",
      benefits: [
        "Postavte skutečné menu bez vytvoření účtu",
        "Anonymní relace přetrvává 7 dnů",
        "Uložte pokrok do e-mailu, když se rozhodnete zavázat",
        "Žádné opětovné zadávání — práce se přenese do vašeho skutečného účtu",
        "Vyhodnocení produktu bez tření",
        "Vyšší celková konverze registrací",
      ],
      conclusionTitle: "Nechte produkt, aby se prodal sám",
      conclusionBody:
        "Nejlepší způsob, jak přesvědčit majitele restaurace, že IQ Rest je pro něj správný, je nechat ho ho použít. Anonymní onboarding mění zvědavého návštěvníka v zapojeného uživatele bez požádání o cokoli na oplátku. Než požádáte o e-mail, uživatel již investoval čas do svého menu — uložení ho nestojí nic, a uchovají si to, co postavili.",
      ctaText: "Vyzkoušejte IQ Rest nyní — žádný účet nepotřebný.",
      ctaButton: "Vyzkoušet zdarma",
    },

    "save-menu-progress-via-email-link": {
      meta: {
        title: "Uložte pokrok menu restaurace přes e-mailový odkaz | IQ Rest",
        description:
          "Postavili jste ukázkové menu anonymně? Uložte ho do svého e-mailu a pošleme vám magický odkaz pro převzetí účtu.",
      },
      title: "Uložte pokrok svého menu přes e-mailový odkaz",
      subtitle:
        "Postavili jste menu anonymně a chcete ho uchovat? Zadejte svůj e-mail. Pošleme magický odkaz, který převede vaši anonymní práci na skutečný účet jedním klepnutím.",
      intro:
        "Když jste strávili pět minut budováním ukázkového menu bez účtu, nechcete ho ztratit. Funkce „Save Progress“ IQ Rest převádí vaši anonymní relaci na skutečný účet přes magický odkaz. Zadejte svůj e-mail, klepněte na odkaz ve schránce, vaše menu je trvale spojeno s vaším účtem. Žádné heslo, žádný registrační formulář, žádné opětovné zadávání jakýchkoli dat.",
      sections: [
        {
          title: "Tok magického odkazu — žádné heslo",
          body: "Pošleme jednorázový odkaz na váš e-mail. Klepněte na něj do 10 minut a jste přihlášeni do nového účtu, který obsahuje menu, které jste postavili anonymně. Žádné heslo k volbě, žádné bezpečnostní otázky, žádný krok ověření e-mailu — klepnutí na odkaz JE ověření. Pak vystavíme session cookie a jste uvnitř dashboardu se vší vaší prací zachovanou.",
        },
        {
          title: "Zacházení s konflikty pro existující účty",
          body: "Pokud e-mail, který jste zadali, již má účet, nepřepisujeme ho. Pošleme odkaz, klepnete a zeptáme se, zda sloučit anonymní menu do vašeho stávajícího účtu nebo zahodit. Většina uživatelů zvolí sloučení — vaše stávající jídla zůstávají, nová z anonymní editace se přidávají. Jasné, bezpečné, předvídatelné.",
        },
        {
          title: "Rychlostně omezené a odolné vůči spamu",
          body: "Rychlostně omezujeme save-progress požadavky na IP a na e-mail, abychom zabránili zneužití. Odkaz vyprší za 10 minut a je jednorázový. Pokud se někdo jiný pokusí převzít vaši anonymní relaci, potřebuje přístup ke schránce — stejný bezpečnostní model jako každý moderní magic-link auth tok.",
        },
      ],
      benefitsTitle: "Proč ukládání magickým odkazem vyhrává",
      benefits: [
        "Žádné heslo k volbě, zapamatování nebo resetu",
        "Anonymní práce se přenese netknutá do vašeho skutečného účtu",
        "Existující účty: vyberte sloučit nebo zahodit",
        "Rychlostně omezené a časově ohraničené — bezpečné podle designu",
        "Jedno klepnutí pro závazek — žádný registrační formulář",
        "E-mail sám o sobě funguje jako krok ověření",
      ],
      conclusionTitle: "Konverze bez tření",
      conclusionBody:
        "Okamžik, kdy uživatel chce konvertovat z anonymního na identifikovaného, je okamžik, kdy je nejpravděpodobnější odejít na dlouhém registračním formuláři. Magické odkazy skládají tento formulář na jediné e-mailové pole plus klepnutí ve schránce. Uživatel stráví 30 sekund a skončí se skutečným, perzistentním účtem, který obsahuje vše, co postavil. Je to konverzní tok s nejnižším třením v odvětví QR menu.",
      ctaText: "Postavte menu anonymně, pak ho uložte přes e-mail, když jste připraveni.",
      ctaButton: "Vyzkoušet zdarma",
    },

    "one-click-stripe-checkout-returning-users": {
      meta: {
        title: "Stripe checkout jedním klepnutím pro vracející se uživatele | IQ Rest",
        description:
          "Již přihlášeni? Klepněte na tarif v cenách a jděte přímo do Stripe checkoutu. Žádné opětovné zadávání informací o účtu, žádné extra obrazovky.",
      },
      title: "Stripe checkout jedním klepnutím pro vracející se uživatele",
      subtitle:
        "Přihlášený uživatel klepne na tarif? Přímo do Stripe checkoutu, žádná extra obrazovka potvrzení. Dvě klepnutí od stránky cen k aktivnímu předplatnému.",
      intro:
        "Vracející se uživatelé, kteří již mají IQ Rest účet, by neměli muset cokoli znovu potvrzovat při upgradování. Odstranili jsme každou mezikrokovou obrazovku mezi „klepnout na tarif v cenách“ a „přistát na Stripe checkoutu“. Dvě klepnutí celkem: vyberte tarif, zadejte detaily karty. Předplatné je aktivní, než dopijete kávu.",
      sections: [
        {
          title: "Detekce přihlášeného stavu na cenách",
          body: "Naše stránka cen kontroluje autentizovanou session cookie při načtení. Pokud jste přihlášeni, tlačítka tarifu přeskočí odbočku „nejprve se zaregistrujte“ a jdou přímo na /api/stripe/checkout, který vytvoří Stripe Checkout Session a vrátí URL pro přesměrování. Pokud nejste přihlášeni, tlačítka vás vezmou nejprve standardním registračním tokem — žádná behaviorální změna pro nové uživatele.",
        },
        {
          title: "UI locale předán do Stripe",
          body: "Locale vašeho dashboardu je předán do Stripe Checkout přes locale parametr, takže checkout stránka se renderuje ve vašem jazyce. Španělští uživatelé vidí Stripe ve španělštině; němečtí uživatelé vidí Stripe v němčině. Checkout tok působí bezešvě, protože nikdy nezlomí jazykovou kontinuitu z vašeho dashboardu.",
        },
        {
          title: "Návratová URL vás přivede zpět do dashboardu",
          body: "Po úspěšné platbě Stripe přesměruje na návratovou URL, kterou nastavíme na kořen dashboardu ve vašem locale (např. /es/dashboard). Webhook aktualizuje váš stav předplatného na serveru před vaším příchodem, takže dashboard, na který přistanete, již odráží nový tarif — žádný stav „čeká“, žádné bliknutí neupgradovaného obsahu.",
        },
      ],
      benefitsTitle: "Proč checkout jedním klepnutím konvertuje",
      benefits: [
        "Dvě klepnutí od cen k aktivnímu předplatnému",
        "Žádné mezikrokové „potvrďte svůj účet“ pro přihlášené uživatele",
        "Stripe checkout se zobrazuje v jazyce vašeho dashboardu",
        "Návratová URL vás přivede do upgradovaného dashboardu",
        "Webhook aktualizuje tarif před vaším příchodem — žádné blikání",
        "Noví uživatelé stále dostávají standardní registrace → upgrade tok",
      ],
      conclusionTitle: "Udělejte snadnou cestu triviálně snadnou",
      conclusionBody:
        "Uživatel, který je již přesvědčen, nepotřebuje další přesvědčování — potřebuje méně klepnutí. Checkout jedním klepnutím odstraňuje každou obrazovku mezi záměrem a platbou pro vracející se uživatele. Výsledek: vyšší konverze trial-na-placené, méně opuštěných upgradů, rychlejší uznání příjmů pro rozšíření předplatného.",
      ctaText: "Již uživatel? Vyberte svůj tarif a upgradujte ve dvou klepnutích.",
      ctaButton: "Zobrazit ceny",
    },

    "dashboard-ui-redesign-consistent-cards-navigation": {
      meta: {
        title: "Redesign UI dashboardu: Karty, Navigace a Formuláře | IQ Rest",
        description:
          "Dashboard IQ Rest přepracován s konzistentními kartovými komponenty, perzistentní navigací sidebar s zvýrazněním aktivní stránky a vylepšenými akcemi formulářů.",
      },
      title: "Redesign UI dashboardu: Konzistentní karty, navigace a akce formulářů",
      subtitle:
        "Vyleštěný dashboard se sjednoceným stylem karet, perzistentní navigací sidebar, akcentově zbarvenými aktivními stavy a spodními akcemi uložit/smazat na každé stránce formuláře.",
      intro:
        "IQ Rest prošel komplexním redesignem UI dashboardu. Každá stránka nyní používá konzistentní styl karet se sjednocenými poloměry okrajů, perzistentní navigaci sidebar s akcentově zbarvenými aktivními stavy a vylepšené stránky formulářů se spodními akcemi uložit a smazat. Výsledek je čistší, vyleštěnější zážitek pro správu digitálního QR menu vaší restaurace.",
      sections: [
        {
          title: "Konzistentní design karet napříč všemi stránkami",
          body: "Každá stránka dashboardu nyní používá sjednocený DashboardCard komponent s konzistentními zaoblenými okraji, jemnými barvami pozadí a volitelnými nadpisy sekcí. Analytika, fakturace, nastavení, kontakty, nastavení rezervací a všechny stránky formulářů sdílí stejný vizuální jazyk. Štítky tipů s popover tooltipy nahrazují inline popisný text, udržují rozhraní čisté, zatímco stále poskytují užitečný kontext, když je potřeba.",
        },
        {
          title: "Perzistentní navigace sidebar s aktivními stavy",
          body: "Na desktop obrazovkách je perzistentní navigace sidebar nyní viditelná na každé stránce. Aktivní stránka je zvýrazněna akcentově zbarveným pozadím, díky čemuž je okamžitě jasné, kde jste. Podstránky jako kategorie, položky a objednávky správně zvýrazňují nadřazenou položku Menu. Sidebar zahrnuje rychlý přístup k Menu, Tisk QR, Rezervace, Analytika, Nastavení, Kontakty, Fakturace a Podpora — vše bez opuštění aktuálního pohledu.",
        },
        {
          title: "Vylepšené stránky formulářů se spodními akcemi",
          body: "Všechny stránky formulářů — kategorie, položky, stoly, design, nastavení, kontakty a nastavení rezervací — nyní obsahují duplicitní tlačítko uložit dole v akcentové barvě. Tlačítka smazat se zobrazují na levé straně s tlumeným stylem. To znamená, že už nemusíte rolovat zpět nahoru pro uložení změn. Tlačítko odhlášení se přesunulo ze sidebar dolů na stránku designu, udržuje navigaci zaměřenou na essenciální akce.",
        },
      ],
      benefitsTitle: "Výhody redesignu UI",
      benefits: [
        "Sjednocený styl karet s konzistentními okraji a pozadími napříč všemi stránkami",
        "Perzistentní navigace sidebar na desktopu s akcentově zbarvenými aktivními stavy",
        "Spodní tlačítka uložit na všech formulářích — žádná potřeba rolovat nahoru pro uložení",
        "Akce smazat a uložit jasně oddělené — smazat vlevo, uložit vpravo",
        "Nadpisy sekcí na kartách formulářů pro lepší vizuální organizaci",
        "Čistší stránka analytiky s DashboardCard obaly a vylepšeným rozložením statistik zařízení",
      ],
      conclusionTitle: "Vyleštěnější zážitek dashboardu",
      conclusionBody:
        "Tento UI redesign přináší vizuální konzistenci a vylepšenou použitelnost do každého rohu dashboardu IQ Rest. Ať editujete položky menu, kontrolujete analytiku nebo spravujete rezervace, rozhraní působí soudržně a intuitivně. V kombinaci s perzistentní navigací sidebar je správa digitálního QR menu vaší restaurace rychlejší a příjemnější než kdy dříve.",
      ctaText: "Zažijte přepracovaný dashboard",
      ctaButton: "Otevřít dashboard",
    },

    "ai-menu-scanner-create-digital-qr-menu": stub("AI skener menu — Vytvořte digitální QR menu z jedné fotografie"),
    "redesigned-dashboard-qr-menu-management": stub("Přepracovaný dashboard pro správu QR menu"),
    "reservation-emails-analytics-digital-qr-menu": stub("E-maily rezervací a analytika pro vaše digitální QR menu"),
    "multi-currency-geo-pricing-qr-menu": stub("Multi-měnové geo-ceny pro vaše QR menu"),
    "support-qr-menu-restaurant-cafe": stub("In-app podpora pro vaše QR menu"),
    "detailed-analytics-restaurant-qr-menu-website": stub("Detailní analytika pro váš web QR menu"),
    "instant-qr-menu-restaurant-website-generator": stub("Instantní generátor QR menu a webu restaurace"),
    "subscription-plans-qr-menu-restaurant-website": stub("Plány předplatného pro vaše QR menu"),
    "public-restaurant-qr-menu-website": stub("Veřejný web QR menu restaurace"),
    "add-items-restaurant-qr-menu-website": stub("Přidejte položky do vašeho QR menu za vteřiny"),
    "qr-menu-restaurant-categories": stub("Kategorie pro QR menu restaurace"),
    "easy-qr-menu-cafe-control-panel": stub("Snadný ovládací panel QR menu kavárny"),
    "faq-page-organization": stub("Organizace FAQ stránky"),
    "free-restaurant-website-improvements": stub("Bezplatná vylepšení webu restaurace"),
    "user-authentication-interface": stub("Rozhraní autentizace uživatele"),
  },
};

function stub(title: string) {
  return {
    meta: { title: `${title} | IQ Rest`, description: title },
    title,
    subtitle: title,
    intro: title,
    sections: [],
    benefitsTitle: "Výhody",
    benefits: [],
    conclusionTitle: title,
    conclusionBody: title,
    ctaText: "Vyzkoušejte IQ Rest",
    ctaButton: "Začít bezplatnou zkušební verzi",
  };
}
