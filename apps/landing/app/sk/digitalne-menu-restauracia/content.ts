import { Languages, ShieldAlert, Palette, LayoutList, Smartphone, ShoppingCart } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "sk",
  slug: "digitalne-menu-restauracia",
  trackPrefix: "l_sk_digital",

  meta: {
    title: "Digitálne menu pre reštaurácie | IQ Rest",
    description:
      "Digitálne menu pre reštaurácie: online jedálny lístok s fotografiami, alergénmi, AI prekladom a okamžitými aktualizáciami cien. 14 dní zadarmo, bez karty.",
    canonical: "https://iq-rest.com/sk/digitalne-menu-restauracia",
    ogLocale: "sk_SK",
    ogTitle: "Digitálne menu pre reštaurácie",
    ogDescription:
      "Online verzia papierového menu — fotografie, alergény, AI preklad, aktualizácie v reálnom čase.",
    brandLine: "IQ Rest — Digitálne menu pre reštaurácie",
  },

  hero: {
    headline: "Digitálne menu pre reštaurácie.",
    sub: "Online verzia vášho papierového menu s fotografiami, alergénmi, popismi a okamžitými aktualizáciami cien. Hostia vidia menu vo svojom vlastnom jazyku; reštaurácia šetrí na tlači.",
  },

  scan: {
    heading: "Máte papierové menu alebo PDF?",
    headingAccent: "AI ho digitalizuje za 60 sekúnd.",
    sub: "Nahrajte fotografiu alebo dokument — AI rozpozná kategórie, jedlá a ceny automaticky.",
    cta: "Skenovať menu",
  },

  subFeatures: [
    {
      icon: LayoutList,
      eyebrow: "Menu bez fotografií",
      heading: "Menu bez fotografií vyzerá rovnako dobre.",
      body: "Niektoré položky nemusia mať fotografie — a to je úplne v poriadku. IQ Rest zobrazuje karty s obrázkami aj bez nich konzistentne: typografia, alergény a ceny si zachovávajú prémiový vzhľad. Mix položiek s fotografiami aj bez nich zostáva celistvý.",
      bullets: [
        "Karty bez fotografií nevyzerajú prázdne.",
        "Typografia sa prispôsobuje obsahu karty.",
        "Konzistentný štýl pre položky s obrázkami aj bez nich.",
      ],
      image: { src: "/landing/feature-photos-optional.webp", alt: "Dva telefóny na stole: menu s fotografiami jedál a menu iba s textom" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Alergény",
      heading: "Štítky alergénov a stravovacích režimov.",
      body: "Označte jedlá pre lepok, laktózu, orechy, morské plody, vegánske a bezlepkové možnosti. Hostia filtrujú menu podľa svojich diétnych potrieb a objednávajú s väčšou istotou.",
      bullets: [
        "14 štandardných kategórií alergénov pri každom jedle.",
        "Štítky vegan, vegetariánske a bezlepkové jedným kliknutím.",
        "Hostia filtrujú menu podľa svojich diétnych obmedzení.",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Hosť filtruje menu podľa alergénov na telefóne, zatiaľ čo majiteľ upravuje zoznam alergénov na tablete" },
    },
    {
      icon: Palette,
      eyebrow: "Prémiový dizajn",
      heading: "Prémiový dizajn s videopozadím a kontaktnou stránkou.",
      body: "Video alebo fotografia na uvítacej obrazovke, popis reštaurácie, vlastná kontaktná stránka s mapou, telefónnymi číslami a sociálnymi profilmi. Digitálne menu vyzerá ako plnohodnotný web reštaurácie, nie ako PDF za QR kódom.",
      bullets: [
        "Videopozadie alebo veľká fotografia na uvítacej obrazovke.",
        "Popisy reštaurácie a kategórií — rozprávajte príbeh konceptu.",
        "Kontaktná stránka: mapa, telefón, Instagram, WhatsApp.",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Dva telefóny na stole v kaviarni: domovská obrazovka menu s videopozadím a kontaktná stránka s mapou" },
    },
    {
      icon: Languages,
      eyebrow: "35 jazykov s AI",
      heading: "35 jazykov s AI — každý hosť číta menu vo svojom.",
      body: "Jeden QR kód, 35 jazykov. AI zvláda kulinársky kontext — názvy jedál a popisy znejú prirodzene. Turisti objednávajú s väčšou istotou a priemerný účet rastie, bez toho aby čašník musel prekladať každú položku.",
      bullets: [
        "35 jazykov zahrnutých v predplatnom, bez doplatkov.",
        "AI s porozumením kulinárskeho kontextu, nie iba Google Translate.",
        "Hosť mení jazyk jedným ťuknutím priamo v menu.",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Dvaja hostia čítajú rovnaké digitálne menu v rôznych jazykoch na svojich telefónoch" },
    },
    {
      icon: Smartphone,
      eyebrow: "Spravujte z akéhokoľvek zariadenia",
      heading: "Spravujte menu z akéhokoľvek zariadenia.",
      body: "Jeden panel sa otvorí v prehliadači na telefóne, tablete alebo notebooku. Zmeňte cenu, dajte jedlo na stop list alebo pridajte špecialitu — hostia uvidia zmenu za pár sekúnd. Bez inštalácií, bez integrácií.",
      bullets: [
        "Žiadna aplikácia na inštaláciu — otvorte prehliadač a ste vnútri.",
        "Ceny, fotografie a stop list — pár ťuknutí z telefónu.",
        "Spravujte menu odkiaľkoľvek, aj z prevádzky sály.",
      ],
      image: { src: "/landing/feature-mobile.webp", alt: "Notebook a telefón na stole v kaviarni upravujú rovnakú položku menu na oboch zariadeniach" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Objednávky z menu · voliteľné",
      heading: "Hostia objednávajú priamo z menu.",
      body: "Hostia si v QR menu skladajú košík a odosielajú objednávku — dorazí čašníkovi v sále alebo na tablet v kuchyni. Funkciu je možné v nastaveniach kedykoľvek zapnúť alebo vypnúť.",
      bullets: [
        "Košík, komentáre a odoslanie objednávky jedným ťuknutím.",
        "Objednávka dorazí okamžite do administračného panela, na WhatsApp alebo na kuchynský displej.",
        "Funkcia sa prepína v nastaveniach.",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Dva telefóny na stole: košík s objednávkou a potvrdenie o odoslaní objednávky" },
    },
  ],

  faq: {
    sub: "Čo sa reštaurátori pýtajú o digitálnom menu v IQ Rest. Nenašli ste svoju otázku? Napíšte nám na WhatsApp.",
    items: [
      { q: "Potrebujem technické znalosti alebo skúsenosti s CMS?", a: "Nie, žiadne špeciálne znalosti nie sú potrebné. Každá akcia v administračnom paneli je klikom a presúvaním — bez kódu. Pridanie položky do menu trvá pár sekúnd: názov, cena, fotografia. Plné nastavenie menu zvyčajne trvá 30 minút až hodinu." },
      { q: "Čo je digitálne menu IQ Rest?", a: "IQ Rest je cloudová platforma pre reštaurácie. Digitálne menu je online verzia vášho menu, dostupná hosťom cez QR kód alebo priamy odkaz: fotografie jedál, ceny, alergény, AI preklad do 35 jazykov, aktualizácie v reálnom čase. Menu je hostované na našich serveroch; nemusíte nič inštalovať ani udržiavať — stačí otvoriť prehliadač." },
      { q: "Potrebujú hostia aplikáciu alebo špeciálny hardvér?", a: "Nie. Hostia namieria kameru telefónu na QR kód a menu sa otvorí v prehliadači. Administračný panel pre reštauráciu tiež beží v ľubovoľnom modernom prehliadači — telefón, tablet alebo notebook. QR kódy sa tlačia na akejkoľvek kancelárskej tlačiarni." },
      { q: "Môžem hostovať menu na vlastnej doméne?", a: "Áno. Podporujeme vlastnú doménu s SSL certifikátom — hostia vidia menu na adrese vašej reštaurácie (napr. menu.vasarestauracia.sk). Pomáhame s nastavením DNS; zvyčajne to trvá 5–10 minút." },
      { q: "Môžem spravovať viac reštaurácií z jedného účtu?", a: "Áno, na požiadanie. Jeden účet môže hostovať viac reštaurácií: každá prevádzka s vlastným menu, dizajnom, QR kódmi a analytikou. Napíšte nám na WhatsApp a aktivujeme režim viacerých reštaurácií pre vašu skupinu." },
      { q: "Ako ťažké je nastaviť menu od nuly?", a: "Nastavenie má tri kroky: (1) vytvoriť kategórie; (2) pridať položky s názvami, cenami a fotografiami; (3) vytlačiť QR kódy pre stoly. Ak už máte papierové menu alebo PDF, nahrajte ho — AI rozpozná kategórie, názvy a ceny a vyplní karty automaticky. Základné menu môže byť online za 5 minút; celkový čas závisí od počtu položiek." },
      { q: "Akú podporu ponúkate?", a: "Sme dostupní na WhatsAppe v pracovných hodinách a rýchlo odpovedáme e-mailom. Pomáhame s prvotným nastavením, konfiguráciou domény, dizajnom menu a všetkými neštandardnými situáciami. Ak potrebujete demo alebo praktickú pomoc pri spustení — napíšte nám." },
    ],
  },
};
