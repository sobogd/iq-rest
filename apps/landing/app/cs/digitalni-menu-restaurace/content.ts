import {
  Languages,
  ShieldAlert,
  Palette,
  ShoppingCart,
  MonitorSmartphone,
  BadgePercent,
  Globe,
  LayoutTemplate,
  Contact,
  MessageCircle,
  CalendarCheck,
} from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "cs",
  slug: "digitalni-menu-restaurace",
  trackPrefix: "l_cs_digital",
  hideFeatureHeading: true,

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
    headline: "Digitální menu,\nkteré umí vše",
    cta: "Vytvořit digitální menu",
    sub: "Fotky, alergeny a překlad do 35 jazyků. Plus objednávky, WhatsApp a rezervace stolů — vše v jednom IQ Rest.",
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
      heading: "35 jazyků pro každého hosta",
      body: "Jeden QR, 35 jazyků. AI překládá s kulinářským kontextem, takže každé jídlo zní přirozeně. Turisté objednávají s jistotou.",
      bullets: [
        "35 jazyků v tarifu",
        "Kulinářská AI, ne Google",
        "Změna jazyka jedním ťuknutím",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Dva hosté čtou stejné digitální menu v různých jazycích na svých telefonech" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Alergeny",
      heading: "Alergeny a diety u každého jídla",
      body: "Označte lepek, laktózu, ořechy, vegan i bezlepek. Hosté si menu vyfiltrují podle diety a objednávají bez starostí.",
      bullets: [
        "14 kategorií alergenů",
        "Štítky vegan a bezlepek",
        "Hosté filtrují podle diety",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Host filtruje menu podle alergenů na telefonu, zatímco majitel upravuje seznam alergenů na tabletu" },
    },
    {
      icon: MonitorSmartphone,
      eyebrow: "Jakékoli zařízení",
      heading: "Spravujte z jakéhokoli zařízení",
      body: "Administrace běží v prohlížeči — upravujte menu, ceny i fotky odkudkoli. Není třeba nic instalovat.",
      bullets: [
        "Běží v každém prohlížeči",
        "Telefon, tablet nebo PC",
        "Nic k instalaci",
      ],
    },
    {
      icon: BadgePercent,
      eyebrow: "Bez provize",
      heading: "Nulová provize, žádné příplatky",
      body: "Jedno transparentní předplatné. Nebereme podíl z vašich tržeb a neskrýváme poplatky — vše zůstává restauraci.",
      bullets: [
        "Nula procent z objednávek",
        "Žádné skryté příplatky",
        "Jedna pevná cena",
      ],
    },
    {
      icon: Globe,
      eyebrow: "Vlastní doména",
      heading: "Menu na vaší vlastní doméně",
      body: "Připojíme vaši doménu s SSL — hosté vidí menu na adrese restaurace. S nastavením DNS pomůžeme za 10 minut.",
      bullets: [
        "Vaše doména s SSL",
        "menu.vaserestaurace.com",
        "Pomůžeme s nastavením DNS",
      ],
    },
    {
      icon: LayoutTemplate,
      eyebrow: "Váš design",
      heading: "Flexibilní design podle vás",
      body: "Několik hotových šablon a stylů — vyberte si obálku, barvy a způsob prezentace jídel, které sedí vašemu podniku.",
      bullets: [
        "Několik hotových šablon",
        "Vaše obálka a barvy",
        "Změna na pár kliknutí",
      ],
    },
    {
      icon: Contact,
      eyebrow: "Kontakty",
      heading: "Kontakty a sítě přímo v menu",
      body: "Samostatná stránka s mapou, telefonem a odkazy na Instagram a WhatsApp — hosté vás najdou jedním ťuknutím.",
      bullets: [
        "Mapa, telefon a adresa",
        "Instagram a WhatsApp",
        "Spojení jedním ťuknutím",
      ],
    },
    {
      icon: MessageCircle,
      eyebrow: "Objednávky přes WhatsApp",
      heading: "Přijímejte objednávky přes WhatsApp",
      body: "Hosté sestaví košík a pošlou objednávku rovnou na váš WhatsApp — bez zvláštní aplikace, v chatu, který už používají.",
      bullets: [
        "Objednávka na váš WhatsApp",
        "Žádná zvláštní aplikace",
        "Chat jako obvykle",
      ],
    },
    {
      icon: CalendarCheck,
      eyebrow: "Rezervace",
      heading: "Rezervace stolů bez telefonů",
      body: "Hosté si rezervují stůl sami přes menu nebo odkaz, vy vidíte kalendář po stolech a potvrdíte automaticky či ručně.",
      bullets: [
        "Rezervace 24/7 bez volání",
        "Kalendář po stolech",
        "Auto i ruční potvrzení",
      ],
    },
    {
      icon: Palette,
      eyebrow: "Prémiový design",
      heading: "Vypadá jako web, ne jako PDF",
      body: "Video pozadí na úvodní obrazovce, popsaný koncept a samostatná kontaktní stránka s mapou a sociálními sítěmi.",
      bullets: [
        "Video na úvodní obrazovce",
        "Popsaný koncept i jídla",
        "Samostatná kontaktní stránka",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Dva telefony na stole v kavárně: domovská obrazovka menu s video pozadím a kontaktní stránka s mapou" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Objednávky · volitelné",
      heading: "Objednávky přímo z menu",
      body: "Hosté sestaví košík a pošlou objednávku — dorazí do sálu, na WhatsApp nebo na kuchyňskou obrazovku. Volitelné.",
      bullets: [
        "Košík a odeslání ťuknutím",
        "Do sálu, WhatsApp či kuchyně",
        "Přepnete v nastavení",
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
