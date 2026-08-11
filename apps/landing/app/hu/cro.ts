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
    verticals: ["Éttermek","Kávézók","Bárok","Pizzériák"],
    title: "Éttermed, digitálisan",
    titleAccent: "5 perc alatt",
    sub: "Digitális étlap, konyhai kijelző és 24/7 foglalás — minden, amire az éttermednek szüksége van, 5 perc alatt kész.",
  },

  heroV2: {
    verticals: [
      { icon: "restaurant", label: "Éttermek" },
      { icon: "cafe", label: "Kávézók" },
      { icon: "bar", label: "Bárok" },
      { icon: "pizza", label: "Pizzériák" },
    ],
    title: "Minden, ami az",
    titleAccent: "éttermének kell!",
    sub: "Állítsa be a folyamatokat 10 perc alatt: indítsa el az online étlapot, optimalizálja a konyhát, és kövesse az asztalfoglaltságot.",
    primaryLabel: "Kezdje ingyen",
    demoLabel: "Demó megtekintése",
    mockups: {
      kds: { src: "/landing/hero-card-kds.webp", alt: "Tablet konyhai kijelzővel: rendelések asztalonként, oszlopokban, státuszokkal" },
      reservations: { src: "/landing/hero-card-reservation.webp", alt: "Tablet foglalási naptárral: havi nézet és megerősítésre váró foglalások" },
      phone1: { src: "/landing/hero-card-menu.webp", alt: "Telefon egy étterem weboldalának főoldalával: fotó, foglalások és online étlap" },
      phone2: { src: "/landing/hero-card-dish.webp", alt: "Telefon egy étel oldalával: fotó, ár és allergénjelölések" },
    },
  },

  heroCards: [
    { Icon: Rocket, title: "Indulás 10 perc alatt", sub: "Drága eszközök és hosszú beállítás nélkül" },
    { Icon: MessagesSquare, title: "Gyors támogatás", sub: "Chaten néhány órán belül válaszolunk" },
    { Icon: Globe, title: "{count} vendéglátóhely választása", sub: "Több mint 15 ország éttermei és kávézói bíznak bennünk" },
    { Icon: Palette, title: "100%-ban az Ön márkája", sub: "A dizájnt és a felületet az Ön helyének stílusához igazítjuk" },
  ],

  menu: {
    heading: "Weboldal és digitális étlap",
    sub: {
      link: "Több mint egy QR-étlap!",
      rest: " Kapjon teljes értékű weboldalt egyedi dizájnnal, kapcsolat oldallal és asztalfoglalással.",
    },
    moreLabel: "Tudjon meg többet",
    mockupAlt: "Két telefon: egy étterem weboldalának főoldala és egy étel oldala",
    bullets: [
      { Icon: Languages, title: "Automatikus fordítás 35 nyelvre", sub: "Szolgálja ki a külföldi vendégeket nyelvi akadályok nélkül — az automatikus fordítás mindent elintéz" },
      { Icon: ClipboardList, title: "Rendelés közvetlenül az asztaltól", sub: "Egyszerűsítse a kiszolgálást: fogadja a rendeléseket az asztaloktól gyorsan, pincér nélkül" },
      { Icon: WheatOff, title: "Allergének és étrendek", sub: "Jelölje az allergéneket és a preferenciákat (vegán, csípős), hogy a vendégek könnyen és biztonságosan válasszanak" },
    ],
  },

  reservations: {
    heading: "Asztalfoglalás",
    sub: {
      link: "Okos asztalfoglalás!",
      rest: " Automatikus foglalási rendszer, amely magától követi a szabad asztalokat és az Ön beosztását.",
    },
    moreLabel: "Tudjon meg többet",
    mockupAlt: "Tablet foglalási naptárral: asztalok napok és idősávok szerint",
    bullets: [
      { Icon: CalendarCheck, title: "Átlátható foglalási térkép", sub: "Szemléletes beosztás napok és asztalok szerint — a szabad helyek azonnal látszanak" },
      { Icon: SlidersHorizontal, title: "Rugalmas beállítások", sub: "Állítsa be a nyitvatartást, az idősávok hosszát, az asztalok fotóit, és gyűjtse a vendégek kéréseit" },
      { Icon: Users, title: "Vendégforgalom kézben tartva", sub: "Válassza ki a foglalások kezelési módját, és tartsa teljes kontroll alatt a vendégforgalmat" },
    ],
  },

  heroMicrocopy: "{count} étterem · 14 nap ingyen · Kártya nélkül",
  seeIncluded: "Mit tartalmaz",

  trust: [
    { kind: "num", value: 35, label: "Nyelv" },
    { kind: "text", value: "24/7", label: "Foglalások" },
    { kind: "num", value: 5, suffix: " min", label: "Indítás" },
    { kind: "count", label: "Étterem" },
  ],

  bundle: {
    heading: "Minden, amin az éttermed működik.",
    headingAccent: "Egyetlen appban.",
    sub: "Menü, konyha és foglalások egy helyen — modern, gyors és arra szabva, ahogy az éttermek valójában működnek. Nincs kiegészítő, nincs funkciónkénti díj.",
  },

  benefits: [
    { Icon: Languages, tag: "Digitális menü", title: "Egy menü, ami elad.", bullets: ["35 nyelv MI-vel","Prémium dizájn","Azonnali árfrissítés"], image: "/landing/feature-design.webp", imageAlt: "Két telefon egy kávézó asztalán: a digitális menü üdvözlő képernyője és a kapcsolati oldal térképpel" },
    { Icon: ChefHat, tag: "Konyhai kijelző", title: "Főzz gyorsabban, ne maradj le semmiről.", bullets: ["Élőben a kijelzőn","Jegyzetek és allergének","Tablet vagy telefon"], image: "/landing/feature-kds-cards.webp", imageAlt: "Tablet a pultnál a konyhai kijelzőt mutatja asztalonkénti rendelésekkel" },
    { Icon: CalendarCheck, tag: "Foglalások", title: "Foglalások robotpilótán.", bullets: ["Önálló foglalás","Automatikus visszaigazolás","Naptár asztalonként"], image: "/landing/feature-booking-calendar.webp", imageAlt: "Két tablet a foglalási naptárat mutatja: napi nézet asztalonként és havi nézet" },
    { Icon: Receipt, tag: "Rendelés az asztalnál", title: "Rendelések egyenesen a konyhába.", bullets: ["Vendég vagy pincér","Egyenesen a konyhába","Bármikor be/ki"], image: "/landing/feature-orders-map.webp", imageAlt: "Tablet a rendelési képernyővel: rendeléslista és teremtérkép színkódolt asztalokkal." },
  ],

  seeDetails: "Részletek",

  extras: {
    heading: "És minden más is benne van.",
    items: [
      { Icon: ScanLine, label: "Az MI 60 másodperc alatt digitalizálja a papírmenüt" },
      { Icon: QrCode, label: "Egyedi QR-kód minden asztalhoz" },
      { Icon: Smartphone, label: "Nincs app a vendégeknek — böngészőben nyílik" },
      { Icon: Globe, label: "Saját domain SSL-lel" },
      { Icon: BarChart3, label: "Értékesítési analitika: bevétel, top ételek, órák" },
      { Icon: Palette, label: "Allergén- és diétacímkék szűréshez" },
    ],
  },

  midCta: {
    heading: "Egy app öt helyett.",
    sub: "Nincs több zsonglőrködés külön eszközökkel a menühöz, a konyhához és a foglalásokhoz — minden egy helyen, bármilyen telefonon vagy tableten, telepítés nélkül.",
  },

  platform: {
    hardwareTitle: "Dolgozz a saját eszközeiddel",
    hardwareSub: "Soha nem kényszerítünk arra, hogy tőlünk vásárolj hardvert. Használd a már meglévő telefonokat, tableteket és számítógépeket.",
    anywhereTitle: "Bárhol működik",
    anywhereSub: "Mobil, tablet, laptop, PC. Android, iOS, Windows, Mac, Linux. Minden modern böngészőben működik, telepítés nélkül.",
  },

  activities: {
    heading: "Egyetlen rendszer,",
    headingAccent: "az egész éttermed.",
    sub: "Gyorsabb kiszolgálás, nyugodtabb konyha, alacsonyabb költségek és emlékezetes vendégélmény — mindez egyetlen platformon.",
    groups: [
      {
        Icon: Smartphone,
        tag: "Az asztalnál — vendégek",
        bullets: [
          "QR-menü 35 nyelven",
          "Rendelés a pincér várása nélkül",
          "Pincér hívása vagy a számla kérése",
          "Asztalfoglalás a nap 24 órájában",
          "Egyedi QR-kód minden asztalhoz",
          "Nincs app a vendégeknek — böngészőben nyílik",
          "Allergén- és diétacímkék szűréshez",
        ],
      },
      {
        Icon: ChefHat,
        tag: "A konyhában",
        bullets: [
          "A rendelések azonnal a képernyőn",
          "Készül / kész / felszolgálva oszlopok",
          "Allergének és megjegyzések kiemelve",
          "Tablet vagy telefon — nincs papírcetli",
        ],
      },
      {
        Icon: BarChart3,
        tag: "Kezelés",
        bullets: [
          "Menü- és árváltozások azonnal élőben",
          "MI-fordítás egyetlen kattintással",
          "Értékesítési elemzések és jelentések",
          "Több étterem egyetlen fiókban",
          "Az MI 60 másodperc alatt digitalizálja a papírmenüt",
          "Saját domain SSL-lel",
        ],
      },
    ],
  },
};
