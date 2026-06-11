import { Languages, ShieldAlert, Palette, ShoppingCart } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "cs",
  slug: "digitalni-menu-restaurace",
  trackPrefix: "l_cs_digital",

  meta: {
    title: "Digitální menu pro restaurace | IQ Rest",
    description:
      "Digitální menu pro restaurace: online jídelní lístek s fotkami, alergeny, AI překladem a okamžitými aktualizacemi cen. 14 dní zdarma, bez karty.",
    canonical: "https://iq-rest.com/cs/digitalni-menu-restaurace",
    ogLocale: "cs_CZ",
    ogTitle: "Digitální menu pro restaurace",
    ogDescription:
      "Online verze papírového menu — fotky, alergeny, AI překlad, aktualizace v reálném čase.",
    brandLine: "IQ Rest — Digitální menu pro restaurace",
  },

  hero: {
    headline: "Digitální menu pro restaurace.",
    cta: "Vytvořit digitální menu",
    sub: "Online verze vašeho papírového menu s fotkami, alergeny, popisy a okamžitými aktualizacemi cen. Hosté vidí menu ve svém vlastním jazyce; restaurace šetří za tisk.",
  },

  scan: {
    heading: "Máte papírové menu nebo PDF?",
    headingAccent: "AI ho zdigitalizuje za 60 sekund.",
    sub: "Nahrajte fotku nebo dokument — AI rozpozná kategorie, jídla a ceny automaticky.",
    cta: "Skenovat menu",
  },

  subFeatures: [
    {
      icon: Languages,
      eyebrow: "35 jazyků s AI",
      heading: "35 jazyků s AI — každý host čte menu ve svém.",
      body: "Jeden QR kód, 35 jazyků. AI zvládá kulinářský kontext — názvy jídel a popisy zní přirozeně. Turisté objednávají s větší jistotou a průměrný účet roste, aniž by číšník překládal každou položku.",
      bullets: [
        "35 jazyků zahrnutých v předplatném, bez doplatků.",
        "AI s pochopením kulinářského kontextu, ne pouhý Google Translate.",
        "Host přepíná jazyk jedním ťuknutím přímo v menu.",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Dva hosté čtou stejné digitální menu v různých jazycích na svých telefonech" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Alergeny",
      heading: "Štítky alergenů a stravovacích režimů.",
      body: "Označte jídla pro lepek, laktózu, ořechy, mořské plody, veganské a bezlepkové varianty. Hosté filtrují menu podle svých dietních potřeb a objednávají s větší jistotou.",
      bullets: [
        "14 standardních kategorií alergenů u každého jídla.",
        "Štítky vegan, vegetariánské a bezlepkové jedním klikem.",
        "Hosté filtrují menu podle svých dietních omezení.",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Host filtruje menu podle alergenů na telefonu, zatímco majitel upravuje seznam alergenů na tabletu" },
    },
    {
      icon: Palette,
      eyebrow: "Prémiový design",
      heading: "Prémiový design s video pozadím a kontaktní stránkou.",
      body: "Video nebo foto na uvítací obrazovce, popis restaurace, vlastní kontaktní stránka s mapou, telefony a sociálními profily. Digitální menu vypadá jako plnohodnotný web restaurace, ne jako PDF za QR kódem.",
      bullets: [
        "Video pozadí nebo velká fotka na uvítací obrazovce.",
        "Popisy restaurace a kategorií — vyprávějte příběh konceptu.",
        "Kontaktní stránka: mapa, telefon, Instagram, WhatsApp.",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Dva telefony na stole v kavárně: domovská obrazovka menu s video pozadím a kontaktní stránka s mapou" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Objednávky z menu · volitelné",
      heading: "Hosté objednávají rovnou z menu.",
      body: "Hosté si v QR menu skládají košík a odesílají objednávku — dorazí číšníkovi v sále nebo na tablet v kuchyni. Funkci lze v nastavení kdykoli zapnout nebo vypnout.",
      bullets: [
        "Košík, komentáře a odeslání objednávky jedním ťuknutím.",
        "Objednávka dorazí okamžitě do administračního panelu, na WhatsApp nebo na kuchyňský displej.",
        "Funkce se přepíná v nastavení.",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Dva telefony na stole: košík s objednávkou a potvrzení o odeslání objednávky" },
    },
  ],

  faq: {
    sub: "Co se restauratéři ptají na digitální menu v IQ Rest. Nenašli jste svůj dotaz? Napište nám na WhatsApp.",
    items: [
      { q: "Potřebuji technické znalosti nebo zkušenost s CMS?", a: "Ne, žádné speciální znalosti nejsou nutné. Každá akce v administračním panelu je klikem a tažením — bez kódu. Přidání položky do menu zabere několik sekund: název, cena, fotka. Plné nastavení menu obvykle trvá 30 minut až hodinu." },
      { q: "Co je digitální menu IQ Rest?", a: "IQ Rest je cloudová platforma pro restaurace. Digitální menu je online verze vašeho jídelního lístku, dostupná hostům přes QR kód nebo přímý odkaz: fotky jídel, ceny, alergeny, AI překlad do 35 jazyků, aktualizace v reálném čase. Menu hostujeme na našich serverech; nemusíte nic instalovat ani udržovat — stačí otevřít prohlížeč." },
      { q: "Potřebují hosté aplikaci nebo speciální hardware?", a: "Ne. Hosté namíří kameru telefonu na QR kód a menu se otevře v prohlížeči. Administrační panel pro restauraci běží také v jakémkoli moderním prohlížeči — telefon, tablet nebo notebook. QR kódy se tisknou na jakékoli kancelářské tiskárně." },
      { q: "Můžu menu hostovat na vlastní doméně?", a: "Ano. Podporujeme vlastní doménu s SSL certifikátem — hosté vidí menu na adrese vaší restaurace (např. menu.vaserestaurace.cz). Pomáháme s nastavením DNS; obvykle to trvá 5–10 minut." },
      { q: "Můžu spravovat víc restaurací z jednoho účtu?", a: "Ano, na vyžádání. Jeden účet může hostit více restaurací: každý podnik s vlastním menu, designem, QR kódy a analytikou. Napište nám na WhatsApp a aktivujeme režim více restaurací pro vaši skupinu." },
      { q: "Jak těžké je nastavit menu od nuly?", a: "Nastavení má tři kroky: (1) vytvořit kategorie; (2) přidat položky s názvy, cenami a fotkami; (3) vytisknout QR kódy ke stolům. Pokud už máte papírové menu nebo PDF, nahrajte ho — AI rozpozná kategorie, názvy a ceny a karty vyplní automaticky. Základní menu může být online za 5 minut; celkový čas závisí na počtu položek." },
      { q: "Jakou podporu nabízíte?", a: "Jsme dostupní na WhatsAppu v pracovní době a rychle odpovídáme e-mailem. Pomáháme s prvním nastavením, konfigurací domény, designem menu a všemi nestandardními situacemi. Pokud potřebujete demo nebo praktickou pomoc při spuštění — napište nám." },
    ],
  },
};
