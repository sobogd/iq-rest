import { CalendarCheck, ChefHat, Receipt, Monitor } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "cs",
  htmlDir: "ltr",

  meta: {
    title: "Digitální menu, kuchyňský displej a rezervace — IQ Rest",
    description:
      "Řiďte restauraci z jedné aplikace: vícejazyčné digitální menu, kuchyňský displej a rezervace 24/7. Hotovo za 5 minut. 14 dní zdarma, bez karty.",
    canonical: "https://iq-rest.com/cs",
    ogLocale: "cs_CZ",
    ogTitle: "Digitální menu, kuchyňský displej a rezervace",
    ogDescription:
      "Řiďte restauraci z jedné aplikace: vícejazyčné digitální menu, kuchyňský displej a rezervace 24/7. Hotovo za 5 minut. 14 dní zdarma, bez karty.",
  },

  ctaText: "Začít zdarma",
  homeCtaText: "Vytvořte si platformu",
  demoText: "Sledovat demo",
  microcopy: "14 dní zdarma · Bez karty · Zrušení kdykoli",

  header: {
    navFeatures: "Funkce",
    navHow: "Jak to funguje",
    navPricing: "Ceny",
    navFaq: "Časté dotazy",
    signIn: "Přihlásit se",
    viewFeatures: "Zobrazit funkce",
    cta: "Začít zdarma",
  },

  hero: {
    verticals: ["Restaurace", "Kavárny", "Bary", "Hotely", "Pizzerie"],
    headline: "Digitální menu pro restauraci. Online za 5 minut.",
    sub: "Digitální menu pro vaši restauraci za 5 minut. Vše v ceně: editor bez kódu, AI rozpoznání tištěného menu, QR kódy ke stolům a přímé objednávky bez provizí.",
    dynamicHeadlines: ["0 % provize.", "35 jazyků s AI.", "Online objednávky.", "Rezervace 24/7.", "Prémiový design."],
    painBullets: [
      "0 % provize: každá objednávka jde přímo do vaší restaurace.",
      "Překlad AI ve 35 jazycích — turisté rozumí menu a objednávají víc.",
      "Rezervace 24/7: hosté si rezervují stoly sami, bez telefonátů ve špičce.",
      "Flexibilní ceny: úpravy v menu jsou online během několika sekund.",
    ],
    rating: "Více než 500 restaurací ve více než 30 zemích",
  },

  features: {
    heading: "Vše, co potřebujete.",
    headingAccent: "Nic navíc.",
    sub: "Vytvořeno pro restaurace. Používá se denně u stolu, v kuchyni i v sále.",
    items: [
      { Icon: Monitor, title: "Digitální menu", desc: "Menu v prohlížeči s fotkami, cenami, alergeny a popisy. Aktualizuje se v reálném čase z telefonu. Hosté vidí menu ve svém jazyce; restaurace šetří za tisk.", tag: "Digitální menu", href: "/cs/digitalni-menu-restaurace" },
      { Icon: Receipt, title: "Příjem objednávek: host a číšník", desc: "QR kód na stole pro hosta, nebo číšník přijímá objednávku z telefonu — obojí jde přímo do kuchyně nebo na WhatsApp. Bez provizí, s číslem stolu na každém lístku.", tag: "Objednávky", href: "/cs/objednavkovy-system-restaurace" },
      { Icon: CalendarCheck, title: "Rezervace stolů 24/7", desc: "Hosté si rezervují stoly sami přes web nebo QR menu, zatímco vy máte plno v sále. Kalendář podle stolu, automatická potvrzení a připomínky. Ani jeden zmeškaný host.", tag: "Rezervace", href: "/cs/rezervace-stolu" },
      { Icon: ChefHat, title: "Kuchyňský displej (KDS)", desc: "Papírové lístky už nepotřebujete. Objednávky ze sálu jdou rovnou na obrazovku šéfkuchaře — sloupce „připravuje se / hotovo / vydáno“, alergeny a poznámky barevně zvýrazněné. Na tabletu nebo telefonu.", tag: "KDS", href: "/cs/kuchynsky-displej" },
    ],
  },

  founder: {
    eyebrow: "Postaveno restauratéry",
    quoteStart:
      "S manželkou jsme vedli vlastní kavárnu a víme z první ruky, jak doopravdy vypadá den v restauraci — příjem objednávek, rezervace, provoz sálu i kuchyně. Chtěli jsme jediný nástroj: moderní, snadný na spuštění a srozumitelný na první pohled —",
    quoteAccent: "tak jsme začali budovat platformu, kterou teď vyvíjíme pro ostatní restauratéry.",
    sign: "Bogdan Sokolov · zakladatel, dříve majitel kavárny",
    photoAlt: "Bogdan Sokolov, zakladatel IQ Rest",
  },

  how: {
    heading: "Online za 5 minut",
    sub: "Čtyři krátké kroky. Bez instalací, bez technického nastavení.",
    steps: [
      { n: "1", t: "Typ a název", d: "Vyberte typ podniku a zadejte název." },
      { n: "2", t: "Uložit", d: "Zadejte e-mail nebo se přihlaste přes Google." },
      { n: "3", t: "Menu", d: "Přidejte položky ručně nebo nahrajte tištěné menu pro AI rozpoznání." },
      { n: "4", t: "Hotovo", d: "Sdílejte odkaz nebo QR kód a začněte přijímat objednávky." },
    ],
  },

  pricing: {
    badge: "Bez provizí · Bez smluv",
    heading: "Jeden tarif.",
    headingAccent: "Vše v ceně.",
    sub: "QR menu, příjem objednávek, AI překlad, web restaurace a rezervace. Jeden transparentní měsíční poplatek.",
    monthlyLabel: "Měsíčně",
    yearlyLabel: "Ročně",
    saveBadge: "Ušetřete 25 %",
    perMonth: "měsíčně",
    billedAnnually: "Roční platba: {total}",
    youSave: "Ušetříte {amount}",
    trust: { secure: "Bezpečná platba přes Stripe", noCommitment: "Bez závazku", quick: "Aktivní během minut", restaurants: "500+ restaurací" },
  },

  faq: {
    eyebrow: "Máte otázky?",
    heading: "Časté",
    headingAccent: "dotazy.",
    sub: "Co se restauratéři ptají před registrací. Nenašli jste svůj dotaz? Napište nám na WhatsApp — odpovídají skuteční lidé, ne bot.",
    whatsappCta: "Zeptat se na WhatsAppu",
    whatsappPrefill: "Dobrý den, mám dotaz ohledně IQ Rest",
    items: [
      { q: "Co zahrnuje zkušební doba a co se stane potom?", a: "Plný přístup ke všem funkcím na 14 dní, bez karty. Po 14 dnech se účet pozastaví, pokud nepřidáte způsob platby — nikdy nestrháváme automaticky. Platbu můžete přidat později a pokračovat tam, kde jste přestali. Zrušení kdykoli jedním kliknutím." },
      { q: "Berete provizi z objednávek?", a: "Ne. Každá objednávka z QR menu jde přímo do restaurace — žádné procento z naší strany, žádné poplatky agregátorů. Jeden pevný měsíční poplatek a nic víc." },
      { q: "Potřebují hosté aplikaci, potřebujeme my technické znalosti?", a: "Hosté nepotřebují aplikaci — namíří kameru telefonu na QR kód a menu se otevře v prohlížeči. Restaurace také nepotřebuje technické znalosti: administrační panel běží v jakémkoli moderním prohlížeči na telefonu, tabletu nebo notebooku. Každá akce je klikem a tažením, bez kódu." },
      { q: "Jak rychle se mění ceny a objevují nová jídla?", a: "Okamžitě. Změňte cenu z telefonu — hosté ji vidí během několika sekund. Nové jídlo zabere pár ťuknutí: název, cena, fotka. Bez dotisku, bez čekání na grafika." },
      { q: "Kolik jazyků je podporováno?", a: "35 jazyků s vestavěným AI překladem. Jedno ťuknutí a celé menu je přeloženo; AI rozumí kulinářskému kontextu — názvy a popisy znějí přirozeně v jakémkoli jazyce. Turisté objednávají s větší jistotou, když menu opravdu rozumí." },
    ],
  },

  finalCta: {
    heading: "Online za 5 minut.",
    headingAccent: "14 dní zdarma.",
    sub: "Bez karty, zrušení kdykoli. Připojte se k více než 500 restauracím, které už používají IQ Rest.",
  },

  scan: {
    heading: "Máte papírové menu nebo PDF?",
    headingAccent: "AI ho zdigitalizuje za 60 sekund.",
    sub: "Nahrajte fotku nebo dokument — AI rozpozná kategorie, jídla a ceny automaticky.",
    cta: "Skenovat menu →",
  },

  pricingHero: {
    chips: ["Bez provizí", "Bez smluv", "14 dní zdarma"],
    heading: "Ceny.",
    headingAccent: "Žádné skryté poplatky.",
    sub: "Jeden transparentní měsíční poplatek. Žádné procento z objednávek ani provize agregátorů. Zrušte předplatné kdykoli.",
    popularBadge: "Oblíbený",
    perMonthSuffix: "/měs.",
    whenAnnualTemplate: "roční platba · {total} ročně",
    orMonthlyTemplate: "nebo {price}/měs.",
    savingsTemplate: "ušetřete {amount} ročně",
    plans: {
      basic: {
        name: "Basic",
        tagline: "Menu, QR objednávky a AI překlad. Online za 5 minut.",
        features: [
          "QR menu pro každý stůl",
          "Digitální menu s fotkami a alergeny",
          "AI překlad do 35 jazyků",
          "Objednávky z menu (volitelné)",
          "AI generování fotek jídel",
          "Správa z jakéhokoli telefonu nebo tabletu",
        ],
      },
      pro: {
        name: "Pro",
        tagline: "Plná kontrola nad restaurací: kuchyňský displej a rezervace.",
        features: [
          "Vše z Basic",
          "Kuchyňský displej (KDS)",
          "Online rezervace stolů 24/7",
          "Prioritní WhatsApp podpora",
        ],
      },
    },
  },

  footer: {
    featureLinks: [
      { href: "/cs/digitalni-menu-restaurace", label: "Digitální menu" },
      { href: "/cs/objednavkovy-system-restaurace", label: "Objednávky" },
      { href: "/cs/rezervace-stolu", label: "Rezervace" },
      { href: "/cs/kuchynsky-displej", label: "Kuchyňský displej" },
    ],
    navLinks: [
      { href: "/cs/ceny", label: "Ceny" },
      { href: "#faq", label: "Časté dotazy" },
      { href: "/cs/languages", label: "Změnit jazyk" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Všechna práva vyhrazena.",
  },
};
