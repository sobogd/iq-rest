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
    titleAccent: "teljesen digitálisan 5 perc alatt.",
    sub: "A teljes platform egy modern étterem működtetéséhez — szép, minden egy helyen, technikai tudás nélkül.",
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
    { Icon: Languages, tag: "Digitális menü", title: "Egy menü, ami weboldalra hasonlít, nem PDF-re.", bullets: ["35 nyelv MI-vel","Prémium dizájn","Azonnali árfrissítés"], image: "/landing/feature-design.webp", imageAlt: "Két telefon egy kávézó asztalán: a digitális menü üdvözlő képernyője és a kapcsolati oldal térképpel" },
    { Icon: ChefHat, tag: "Konyhai kijelző", title: "A konyha végre papírmentes.", bullets: ["Élőben a kijelzőn","Jegyzetek és allergének","Tablet vagy telefon"], image: "/landing/feature-kds-cards.webp", imageAlt: "Tablet a pultnál a konyhai kijelzőt mutatja asztalonkénti rendelésekkel" },
    { Icon: CalendarCheck, tag: "Foglalások", title: "Asztalok, amelyek maguktól foglalódnak, 24/7.", bullets: ["Önálló foglalás","Automatikus visszaigazolás","Naptár asztalonként"], image: "/landing/feature-booking-calendar.webp", imageAlt: "Két tablet a foglalási naptárat mutatja: napi nézet asztalonként és havi nézet" },
    { Icon: Receipt, tag: "Rendelés az asztalnál", title: "Vegyél fel rendelést jegyzettömb nélkül — opcionális.", bullets: ["Vendég vagy pincér","Egyenesen a konyhába","Bármikor be/ki"], image: "/landing/feature-orders.webp", imageAlt: "Pincér rendelést vesz fel az asztalnál telefonon, az a konyhai kijelzőre kerül" },
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

  how: {
    heading: "Kész 5 perc alatt",
    sub: "Négy lépés. Nincs telepítés, nincs technikai beállítás, nincs kártya.",
    steps: [
      { n: "1", t: "Típus és név", d: "A hely típusa és neve — ennyi az egész regisztráció." },
      { n: "2", t: "Bejelentkezés", d: "E-mail vagy Google. Kártya nélkül." },
      { n: "3", t: "Add hozzá a menüt", d: "Írd be, vagy hagyd, hogy az MI beolvassa a papírmenüt." },
      { n: "4", t: "Élesben vagy", d: "Menü, konyha és foglalások — készen." },
    ],
  },
};
