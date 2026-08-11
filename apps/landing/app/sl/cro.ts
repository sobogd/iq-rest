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
    verticals: ["Restavracije","Kavarne","Bari","Picerije"],
    title: "Vaša restavracija, digitalno",
    titleAccent: "v 5 min",
    sub: "Digitalni meni, kuhinjski zaslon in rezervacije 24/7 — vse za restavracijo, pripravljeno v 5 minutah.",
  },

  heroV2: {
    verticals: [
      { icon: "restaurant", label: "Restavracije" },
      { icon: "cafe", label: "Kavarne" },
      { icon: "bar", label: "Bari" },
      { icon: "pizza", label: "Picerije" },
    ],
    title: "Vse, kar vaša",
    titleAccent: "restavracija potrebuje!",
    sub: "Nastavite procese v 10 minutah: zaženite spletni meni, optimizirajte kuhinjo in spremljajte zasedenost miz.",
    primaryLabel: "Začnite brezplačno",
    demoLabel: "Oglejte si demo",
    mockups: {
      kds: { src: "/landing/hero-card-kds.webp", alt: "Tablica s kuhinjskim zaslonom: naročila po mizah v stolpcih s statusi" },
      reservations: { src: "/landing/hero-card-reservation.webp", alt: "Tablica s koledarjem rezervacij: mesečni pogled in rezervacije, ki čakajo na potrditev" },
      phone1: { src: "/landing/hero-card-menu.webp", alt: "Telefon z domačo stranjo spletne strani restavracije: fotografija, rezervacije in spletni meni" },
      phone2: { src: "/landing/hero-card-dish.webp", alt: "Telefon s stranjo jedi: fotografija, cena in oznake alergenov" },
    },
  },

  heroCards: [
    { Icon: Rocket, title: "Zagon v 10 minutah", sub: "Brez drage opreme in dolgega nastavljanja" },
    { Icon: MessagesSquare, title: "Hitra podpora", sub: "V klepetu odgovorimo v nekaj urah" },
    { Icon: Globe, title: "Izbira {count} lokalov", sub: "Zaupajo nam restavracije in kavarne v več kot 15 državah" },
    { Icon: Palette, title: "100 % vaša znamka", sub: "Oblikovanje in vmesnik prilagodimo slogu vašega lokala" },
  ],

  menu: {
    heading: "Spletna stran in digitalni meni",
    sub: {
      link: "Več kot QR-meni!",
      rest: " Dobite popolno spletno stran z edinstvenim dizajnom, kontakti in rezervacijo miz.",
    },
    moreLabel: "Izvedite več",
    mockupAlt: "Dva telefona: domača stran spletne strani restavracije in stran jedi",
    bullets: [
      { Icon: Languages, title: "Samodejno prevajanje v 35 jezikov", sub: "Postrezite tujim gostom brez jezikovnih ovir — samodejno prevajanje uredi vse" },
      { Icon: ClipboardList, title: "Naročila neposredno z mize", sub: "Poenostavite strežbo: sprejemajte naročila z miz hitro in brez natakarja" },
      { Icon: WheatOff, title: "Alergeni in diete", sub: "Označite alergene in preference (vegansko, pekoče), da gostje izbirajo enostavno in varno" },
    ],
  },

  reservations: {
    heading: "Rezervacija miz",
    sub: {
      link: "Pametna rezervacija miz!",
      rest: " Samodejni sistem rezervacij, ki sam spremlja proste mize in vaš urnik.",
    },
    moreLabel: "Izvedite več",
    mockupAlt: "Tablica s koledarjem rezervacij: mize po dnevih in časovnih terminih",
    bullets: [
      { Icon: CalendarCheck, title: "Pregleden zemljevid rezervacij", sub: "Nazoren razpored po dnevih in mizah — prosta mesta so vidna takoj" },
      { Icon: SlidersHorizontal, title: "Prilagodljive nastavitve", sub: "Nastavite delovni čas, dolžino terminov, fotografije miz in zbirajte želje gostov" },
      { Icon: Users, title: "Nadzor nad tokom gostov", sub: "Izberite način dela z rezervacijami in imejte tok gostov povsem pod nadzorom" },
    ],
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
