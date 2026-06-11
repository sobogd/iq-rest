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
    verticals: ["Restavracije","Kavarne","Bari","Picerije"],
    title: "Vaša restavracija,",
    titleAccent: "digitalna v 5 minutah.",
    sub: "Lep digitalni meni, kuhinjski zaslon in rezervacije 24/7 — popolna platforma za sodobno restavracijo.",
  },

  heroMicrocopy: "{count} restavracij · 14 dni brezplačno · Brez kartice",
  seeIncluded: "Kaj je vključeno",

  trust: [
    { kind: "num", value: 35, label: "Jezikov" },
    { kind: "text", value: "24/7", label: "Rezervacije" },
    { kind: "num", value: 5, suffix: " min", label: "Zagon" },
    { kind: "count", label: "Restavracij" },
  ],

  bundle: {
    heading: "Vse, na čemer temelji vaša restavracija.",
    headingAccent: "V eni aplikaciji.",
    sub: "Meni, kuhinja in rezervacije na enem mestu — sodobno, hitro in zasnovano za to, kako restavracije resnično delujejo. Brez dodatkov, brez plačila po funkciji.",
  },

  benefits: [
    { Icon: Languages, tag: "Digitalni meni", title: "Meni, ki prodaja.", bullets: ["35 jezikov z UI","Premium oblikovanje","Cene takoj posodobljene"], image: "/landing/feature-design.webp", imageAlt: "Dva telefona na mizi v kavarni: pozdravni zaslon digitalnega menija in kontaktna stran z zemljevidom" },
    { Icon: ChefHat, tag: "Kuhinjski zaslon", title: "Kuhajte hitreje, brez spregledov.", bullets: ["V živo na zaslonu","Opombe in alergeni","Tablica ali telefon"], image: "/landing/feature-kds-cards.webp", imageAlt: "Tablica na pultu prikazuje kuhinjski zaslon z naročili po mizah" },
    { Icon: CalendarCheck, tag: "Rezervacije", title: "Rezervacije na samodejnem pilotu.", bullets: ["Samopostrežna rezervacija","Samodejna potrditev","Koledar po mizah"], image: "/landing/feature-booking-calendar.webp", imageAlt: "Dve tablici prikazujeta koledar rezervacij: dnevni pogled po mizah in mesečni pogled" },
    { Icon: Receipt, tag: "Naročila pri mizi", title: "Naročila naravnost v kuhinjo.", bullets: ["Gost ali natakar","Naravnost v kuhinjo","Vklop/izklop kadarkoli"], image: "/landing/feature-orders-map.webp", imageAlt: "Tablica z zaslonom naročil: seznam naročil in tloris z barvno označenimi mizami." },
  ],

  seeDetails: "Podrobnosti",

  extras: {
    heading: "In vse ostalo je vključeno.",
    items: [
      { Icon: ScanLine, label: "UI digitalizira vaš papirnati meni v 60 sekundah" },
      { Icon: QrCode, label: "Edinstvena QR koda za vsako mizo" },
      { Icon: Smartphone, label: "Brez aplikacije za goste — odpre se v brskalniku" },
      { Icon: Globe, label: "Lastna domena s SSL" },
      { Icon: BarChart3, label: "Analitika prodaje: prihodki, najboljše jedi, ure" },
      { Icon: Palette, label: "Oznake alergenov in diet za filtriranje" },
    ],
  },

  midCta: {
    heading: "Ena aplikacija namesto petih.",
    sub: "Brez žongliranja z ločenimi orodji za meni, kuhinjo in rezervacije — vse na enem mestu, na katerem koli telefonu ali tablici, brez namestitve.",
  },

  platform: {
    hardwareTitle: "Delajte z lastno opremo",
    hardwareSub: "Nikoli vas ne silimo k nakupu opreme pri nas. Uporabite telefone, tablice in računalnike, ki jih že imate.",
    anywhereTitle: "Deluje povsod",
    anywhereSub: "Telefon, tablica, prenosnik, PC. Android, iOS, Windows, Mac, Linux. Deluje v vsakem sodobnem brskalniku, brez namestitve.",
  },

  activities: {
    heading: "En sistem,",
    headingAccent: "vaša celotna restavracija.",
    sub: "Hitrejša postrežba, mirnejša kuhinja, nižji stroški in izkušnja, ki si jo gost zapomni — vse na eni platformi.",
    groups: [
      {
        Icon: Smartphone,
        tag: "Za mizo — gostje",
        bullets: [
          "QR meni v 35 jezikih",
          "Naročanje brez čakanja na natakarja",
          "Klic natakarja ali prošnja za račun",
          "Rezervacija mize 24/7",
          "Edinstvena QR koda za vsako mizo",
          "Brez aplikacije za goste — odpre se v brskalniku",
          "Oznake alergenov in diet za filtriranje",
        ],
      },
      {
        Icon: ChefHat,
        tag: "V kuhinji",
        bullets: [
          "Naročila se takoj prikažejo na zaslonu",
          "Stolpci v pripravi / pripravljeno / postreženo",
          "Alergeni in opombe poudarjeni",
          "Tablica ali telefon — brez papirnatih listkov",
        ],
      },
      {
        Icon: BarChart3,
        tag: "Upravljanje",
        bullets: [
          "Spremembe menija in cen takoj v živo",
          "Prevod z UI z enim klikom",
          "Analitika prodaje in poročila",
          "Več restavracij na enem računu",
          "UI digitalizira vaš papirnati meni v 60 sekundah",
          "Lastna domena s SSL",
        ],
      },
    ],
  },
};
