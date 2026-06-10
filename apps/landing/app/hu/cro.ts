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
} from "lucide-react";
import type { CroCopy } from "@/app/_landing/templates/cro-home-template";

export const CRO: CroCopy = {
  hero: {
    verticals: ["Éttermek","Kávézók","Bárok","Pizzériák"],
    title: "Az éttermed,",
    titleAccent: "digitálisan 5 perc alatt.",
    sub: "Egy szép digitális menü, egy konyhai kijelző és éjjel-nappali foglalások — a teljes platform egy modern étteremhez.",
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
        ],
      },
    ],
  },
};
