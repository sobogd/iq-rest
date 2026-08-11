import {
  Languages,
  ChefHat,
  CalendarCheck,
  Receipt,
  ScanLine,
  Globe,
  BarChart3,
  QrCode,
  Smartphone,
  Palette,
  Rocket,
  MessagesSquare,
  ClipboardList,
  WheatOff,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import type { CroCopyV2 } from "@/app/_landing/templates/cro-home-template-v2";

export const CRO: CroCopyV2 = {
  hero: {
    verticals: ["Restaurace","Kavárny","Bary","Pizzerie"],
    title: "Vaše restaurace, digitálně",
    titleAccent: "za 5 min",
    sub: "Digitální menu, kuchyňský displej a rezervace 24/7 — vše pro restauraci, hotové za 5 minut.",
  },

  heroV2: {
    verticals: [
      { icon: "restaurant", label: "Restaurace" },
      { icon: "cafe", label: "Kavárny" },
      { icon: "bar", label: "Bary" },
      { icon: "pizza", label: "Pizzerie" },
    ],
    title: "Vše, co vaše",
    titleAccent: "restaurace potřebuje!",
    sub: "Nastavte procesy za 10 minut: spusťte online menu, zefektivněte kuchyni a mějte přehled o obsazenosti stolů.",
    primaryLabel: "Začít zdarma",
    demoLabel: "Zobrazit demo",
    mockups: {
      kds: { src: "/landing/hero-card-kds.webp", alt: "Tablet s kuchyňským displejem: objednávky podle stolů ve sloupcích se stavy" },
      reservations: { src: "/landing/hero-card-reservation.webp", alt: "Tablet s kalendářem rezervací: měsíční přehled a rezervace čekající na potvrzení" },
      phone1: { src: "/landing/hero-card-menu.webp", alt: "Telefon s úvodní stránkou webu restaurace: fotka, rezervace a online menu" },
      phone2: { src: "/landing/hero-card-dish.webp", alt: "Telefon s kartou pokrmu: fotka, cena a štítky alergenů" },
    },
  },

  heroCards: [
    { Icon: Rocket, title: "Spuštění za 10 minut", sub: "Bez drahého vybavení a dlouhého nastavování" },
    { Icon: MessagesSquare, title: "Rychlá podpora", sub: "Na chatu odpovídáme během několika hodin" },
    { Icon: Globe, title: "Volba {count} podniků", sub: "Důvěřují nám restaurace a kavárny ve více než 15 zemích" },
    { Icon: Palette, title: "100% ve vašem stylu", sub: "Design i rozhraní přizpůsobíme stylu vašeho podniku" },
  ],

  menu: {
    heading: "Web a digitální menu",
    sub: {
      link: "Víc než QR menu!",
      rest: " Získejte plnohodnotný web s jedinečným designem, kontakty a rezervací stolů.",
    },
    moreLabel: "Zjistit více",
    mockupAlt: "Dva telefony: úvodní stránka webu restaurace a stránka pokrmu",
    bullets: [
      { Icon: Languages, title: "Automatický překlad do 35 jazyků", sub: "Obsluhujte zahraniční hosty bez jazykové bariéry — automatický překlad zařídí vše" },
      { Icon: ClipboardList, title: "Objednávky přímo od stolu", sub: "Zjednodušte obsluhu: přijímejte objednávky od stolů rychle a bez číšníka" },
      { Icon: WheatOff, title: "Alergeny a diety", sub: "Označujte alergeny a preference (veganské, pálivé), aby hosté vybírali snadno a bezpečně" },
    ],
  },

  reservations: {
    heading: "Rezervace stolů",
    sub: {
      link: "Chytrá rezervace stolů!",
      rest: " Automatický rezervační systém, který sám hlídá volné stoly a váš rozvrh.",
    },
    moreLabel: "Zjistit více",
    mockupAlt: "Tablet s kalendářem rezervací: stoly podle dnů a časových slotů",
    bullets: [
      { Icon: CalendarCheck, title: "Přehledná mapa rezervací", sub: "Názorný rozvrh podle dnů a stolů — volná místa vidíte na první pohled" },
      { Icon: SlidersHorizontal, title: "Flexibilní nastavení", sub: "Nastavte otevírací dobu, délku slotů, fotky stolů a sbírejte přání hostů" },
      { Icon: Users, title: "Řízení toku hostů", sub: "Zvolte si režim práce s rezervacemi a mějte tok hostů plně pod kontrolou" },
    ],
  },

  heroMicrocopy: "{count} restaurací · 14 dní zdarma · Bez karty",
  seeIncluded: "Co je v ceně",

  trust: [
    { kind: "num", value: 35, label: "Jazyků" },
    { kind: "text", value: "24/7", label: "Rezervace" },
    { kind: "num", value: 5, suffix: " min", label: "Spuštění" },
    { kind: "count", label: "Restaurací" },
  ],

  bundle: {
    heading: "Vše, na čem vaše restaurace běží.",
    headingAccent: "V jedné aplikaci.",
    sub: "Menu, kuchyně a rezervace na jednom místě — moderní, rychlé a vytvořené pro to, jak restaurace doopravdy fungují. Bez doplňků, bez platby za funkci.",
  },

  benefits: [
    { Icon: Languages, tag: "Digitální menu", title: "Menu, které prodává.", bullets: ["35 jazyků s AI","Prémiový design","Ceny ihned aktuální"], image: "/landing/feature-design.webp", imageAlt: "Dva telefony na stole v kavárně: úvodní obrazovka digitálního menu a kontaktní stránka s mapou" },
    { Icon: ChefHat, tag: "Kuchyňský displej", title: "Vařte rychleji, nic nezmeškáte.", bullets: ["Živě na obrazovce","Poznámky a alergeny","Tablet nebo telefon"], image: "/landing/feature-kds-cards.webp", imageAlt: "Tablet na baru zobrazuje kuchyňský displej s objednávkami podle stolů" },
    { Icon: CalendarCheck, tag: "Rezervace", title: "Rezervace na autopilota.", bullets: ["Samoobslužná rezervace","Automatické potvrzení","Kalendář podle stolů"], image: "/landing/feature-booking-calendar.webp", imageAlt: "Dva tablety zobrazují rezervační kalendář: denní pohled podle stolů a měsíční pohled" },
    { Icon: Receipt, tag: "Objednávky u stolu", title: "Objednávky rovnou do kuchyně.", bullets: ["Host nebo číšník","Rovnou do kuchyně","Zapněte kdykoli"], image: "/landing/feature-orders-map.webp", imageAlt: "Tablet s obrazovkou objednávek: seznam objednávek a plán sálu s barevně odlišenými stoly." },
  ],

  seeDetails: "Zobrazit detaily",

  extras: {
    heading: "A vše ostatní v ceně.",
    items: [
      { Icon: ScanLine, label: "AI digitalizuje vaše papírové menu za 60 sekund" },
      { Icon: QrCode, label: "Unikátní QR kód pro každý stůl" },
      { Icon: Smartphone, label: "Bez aplikace pro hosty — otevře se v prohlížeči" },
      { Icon: Globe, label: "Vlastní doména s SSL" },
      { Icon: BarChart3, label: "Analýza prodejů: tržby, top jídla, hodiny" },
      { Icon: Palette, label: "Štítky alergenů a diet pro filtrování" },
    ],
  },

  midCta: {
    heading: "Jedna aplikace místo pěti.",
    sub: "Žádné žonglování se samostatnými nástroji pro menu, kuchyni a rezervace — vše na jednom místě, na jakémkoli telefonu či tabletu, bez instalace.",
  },

  platform: {
    hardwareTitle: "Pracujte s vlastním hardwarem",
    hardwareSub: "Nikdy vás nenutíme kupovat hardware od nás. Použijte telefony, tablety a počítače, které už máte.",
    anywhereTitle: "Funguje všude",
    anywhereSub: "Mobil, tablet, notebook, PC. Android, iOS, Windows, Mac, Linux. Funguje v každém moderním prohlížeči, bez instalace.",
  },

  activities: {
    heading: "Jeden systém,",
    headingAccent: "celá vaše restaurace.",
    sub: "Rychlejší obsluha, klidnější kuchyně, nižší náklady a zážitek, který si host zapamatuje — vše na jedné platformě.",
    groups: [
      {
        Icon: Smartphone,
        tag: "U stolu — hosté",
        bullets: [
          "QR menu ve 35 jazycích",
          "Objednávka bez čekání na číšníka",
          "Přivolání číšníka nebo žádost o účet",
          "Rezervace stolu 24/7",
          "Unikátní QR kód pro každý stůl",
          "Bez aplikace pro hosty — otevře se v prohlížeči",
          "Štítky alergenů a diet pro filtrování",
        ],
      },
      {
        Icon: ChefHat,
        tag: "V kuchyni",
        bullets: [
          "Objednávky se objeví na obrazovce okamžitě",
          "Sloupce připravuje se / hotovo / podáno",
          "Alergeny a poznámky zvýrazněny",
          "Tablet nebo telefon — žádné papírové účtenky",
        ],
      },
      {
        Icon: BarChart3,
        tag: "Správa",
        bullets: [
          "Změny menu a cen okamžitě naživo",
          "Překlad pomocí AI na jedno kliknutí",
          "Analýzy prodeje a reporty",
          "Více restaurací na jednom účtu",
          "AI digitalizuje vaše papírové menu za 60 sekund",
          "Vlastní doména s SSL",
        ],
      },
    ],
  },
};
