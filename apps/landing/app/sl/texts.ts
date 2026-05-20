import { CalendarCheck, ChefHat, Receipt, Monitor } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "sl",
  htmlDir: "ltr",

  meta: {
    title: "QR jedilnik za restavracije — Neposredna naročila brez provizije | IQ Rest",
    description:
      "Vse-v-enem platforma za restavracije: digitalni jedilnik, QR naročila, rezervacija miz in kuhinjski zaslon. Zagon v 5 minutah. 14 dni brezplačno, brez kartice.",
    canonical: "https://iq-rest.com/sl",
    ogLocale: "sl_SI",
    ogTitle: "QR jedilnik za restavracije — Neposredna naročila brez provizije",
    ogDescription:
      "Digitalni jedilnik, QR naročila, rezervacija miz in AI prevod. Zagon v 5 minutah. 14 dni brezplačno.",
  },

  ctaText: "Preizkusite brezplačno",
  demoText: "Oglejte si demo",
  microcopy: "14 dni brezplačno · Brez kartice · Prekličete kadar koli",

  header: {
    navFeatures: "Funkcije",
    navHow: "Kako deluje",
    navPricing: "Cene",
    navFaq: "Pogosta vprašanja",
    signIn: "Prijava",
    cta: "Začnite",
  },

  hero: {
    verticals: ["Restavracije", "Kavarne", "Bari", "Hoteli", "Picerije"],
    headline: "Digitalni jedilnik za restavracijo. Na spletu v 5 minutah.",
    sub: "Digitalni jedilnik za vašo restavracijo v 5 minutah. Vse vključeno: urejevalnik brez kode, AI prepoznavanje natisnjenega jedilnika, QR kode za mize in neposredna naročila brez provizije.",
    dynamicHeadlines: ["0 % provizije.", "35 AI jezikov.", "Spletna naročila.", "Rezervacije 24/7.", "Premium oblika."],
    painBullets: [
      "0 % provizije: vsako naročilo gre neposredno v vašo restavracijo.",
      "AI prevod v 35 jezikov — turisti razumejo jedilnik in naročajo več.",
      "Rezervacija 24/7: gostje sami rezervirajo mize, brez klicev v konicah.",
      "Prilagodljive cene: spremembe jedilnika so na spletu v nekaj sekundah.",
    ],
    rating: "Več kot 500 restavracij v več kot 30 državah",
  },

  features: {
    heading: "Vse, kar potrebujete.",
    headingAccent: "Nič odvečnega.",
    sub: "Zgrajeno za restavracije. Uporablja se vsak dan pri mizi, v kuhinji in v dvorani.",
    items: [
      { Icon: Monitor, title: "Digitalni jedilnik", desc: "Jedilnik v brskalniku s fotografijami, cenami, alergeni in opisi. Posodablja se v realnem času s telefona. Gostje vidijo jedilnik v svojem jeziku; restavracija prihrani pri tisku.", tag: "Digitalni jedilnik", href: "/sl/digitalni-jedilnik-restavracija" },
      { Icon: Receipt, title: "Sprejemanje naročil: gost in natakar", desc: "QR koda na mizi za gosta ali natakar sprejme naročilo s telefona — oba gresta neposredno v kuhinjo ali na WhatsApp. Brez provizije, s številko mize na vsakem računu.", tag: "Naročila", href: "/sl/sistem-narocanja-restavracija" },
      { Icon: CalendarCheck, title: "Rezervacija miz 24/7", desc: "Gostje sami rezervirajo mize prek spletne strani ali QR jedilnika, medtem ko ste zasedeni v dvorani. Koledar po mizi, samodejne potrditve in opomniki. Niti enega izgubljenega gosta.", tag: "Rezervacija", href: "/sl/rezervacija-miz" },
      { Icon: ChefHat, title: "Kuhinjski zaslon (KDS)", desc: "Papirnati listki niso več potrebni. Naročila iz dvorane gredo neposredno na zaslon kuharja — stolpci „pripravlja se / pripravljeno / postreženo“, alergeni in opombe poudarjene z barvo. Na tablici ali telefonu.", tag: "KDS", href: "/sl/kuhinjski-zaslon" },
    ],
  },

  founder: {
    eyebrow: "Zgradili gostinci",
    quoteStart:
      "Z ženo sva vodila svojo lastno kavarno in iz prve roke vemo, kako v resnici poteka dan v restavraciji — sprejemanje naročil, rezervacije, pretok dvorane in kuhinje. Želela sva eno orodje: sodobno, enostavno za zagon in jasno na prvi pogled —",
    quoteAccent: "tako sva začela graditi platformo, ki jo zdaj razvijamo za druge gostince.",
    sign: "Bogdan Sokolov · ustanovitelj, nekdanji lastnik kavarne",
    photoAlt: "Bogdan Sokolov, ustanovitelj IQ Rest",
  },

  how: {
    heading: "Na spletu v 5 minutah",
    sub: "Štirje kratki koraki. Brez namestitev, brez tehničnih nastavitev.",
    steps: [
      { n: "1", t: "Tip in ime", d: "Izberite vrsto lokala in vnesite ime." },
      { n: "2", t: "Shrani", d: "Vnesite e-poštni naslov ali se prijavite z Googlom." },
      { n: "3", t: "Jedilnik", d: "Dodajte izdelke ročno ali naložite natisnjen jedilnik za AI skeniranje." },
      { n: "4", t: "Končano", d: "Delite povezavo ali QR kodo in začnite sprejemati naročila." },
    ],
  },

  pricing: {
    badge: "Brez provizije · Brez pogodb",
    heading: "En paket.",
    headingAccent: "Vse vključeno.",
    sub: "QR jedilnik, sprejemanje naročil, AI prevod, spletna stran restavracije in rezervacija. Ena pregledna mesečna naročnina.",
    monthlyLabel: "Mesečno",
    yearlyLabel: "Letno",
    saveBadge: "Prihranite 25 %",
    perMonth: "na mesec",
    billedAnnually: "Letno zaračunavanje: {total}",
    youSave: "Prihranite {amount}",
    trust: { secure: "Varno plačilo prek Stripe", noCommitment: "Brez obveznosti", quick: "Aktivno v minutah", restaurants: "500+ restavracij" },
  },

  faq: {
    eyebrow: "Imate vprašanja?",
    heading: "Pogosto zastavljena",
    headingAccent: "vprašanja.",
    sub: "Kaj gostinci vprašajo pred registracijo. Ne najdete svojega vprašanja? Pišite nam na WhatsApp — odgovarjajo pravi ljudje, ne bot.",
    whatsappCta: "Vprašajte na WhatsApp",
    whatsappPrefill: "Pozdravljeni, imam vprašanje glede IQ Rest",
    items: [
      { q: "Kaj vključuje preizkusno obdobje in kaj se zgodi po njem?", a: "Polni dostop do vseh funkcij 14 dni, brez kartice. Po 14 dneh se račun zaustavi, če ni dodanega načina plačila — nikoli ne zaračunamo samodejno. Plačilo lahko dodate pozneje in nadaljujete tam, kjer ste končali. Prekličete kadar koli z enim klikom." },
      { q: "Ali pobirate provizijo od naročil?", a: "Ne. Vsako naročilo iz QR jedilnika gre neposredno v restavracijo — brez odstotkov z naše strani, brez provizij agregatorjev. Ena fiksna mesečna naročnina in nič drugega." },
      { q: "Ali gostje potrebujejo aplikacijo, ali mi potrebujemo tehnične veščine?", a: "Gostje ne potrebujejo aplikacije — kamero telefona usmerijo v QR kodo in jedilnik se odpre v brskalniku. Tudi restavracije ne potrebujejo tehničnih veščin: skrbniška plošča deluje v vsakem sodobnem brskalniku na telefonu, tablici ali prenosniku. Vsako dejanje je s klikom in povleci-in-spusti, brez kode." },
      { q: "Kako hitro se spreminjajo cene in pojavljajo nove jedi?", a: "Takoj. Spremenite ceno s telefona — gostje jo vidijo v nekaj sekundah. Nova jed traja nekaj dotikov: ime, cena, fotografija. Brez ponovnega tiskanja, brez čakanja na oblikovalca." },
      { q: "Koliko jezikov je podprtih?", a: "35 jezikov z vgrajenim AI prevodom. En dotik in celoten jedilnik je preveden; AI razume kulinarični kontekst — imena in opisi zvenijo naravno v vsakem jeziku. Turisti naročajo z večjo gotovostjo, ko resnično razumejo jedilnik." },
    ],
  },

  finalCta: {
    heading: "Na spletu v 5 minutah.",
    headingAccent: "14 dni brezplačno.",
    sub: "Brez kartice, prekličete kadar koli. Pridružite se 500+ restavracijam, ki že uporabljajo IQ Rest.",
  },

  scan: {
    heading: "Imate papirnati jedilnik ali PDF?",
    headingAccent: "AI ga digitalizira v 60 sekundah.",
    sub: "Naložite fotografijo ali dokument — AI samodejno prepozna kategorije, jedi in cene.",
    cta: "Skeniraj jedilnik →",
  },

  pricingHero: {
    chips: ["Brez provizije", "Brez pogodb", "14 dni brezplačno"],
    heading: "Cene.",
    headingAccent: "Brez skritih stroškov.",
    sub: "Ena pregledna mesečna naročnina. Brez odstotka od naročil in brez provizij agregatorjev. Prekličete naročnino kadar koli.",
    popularBadge: "Priljubljeno",
    perMonthSuffix: "/mes.",
    whenAnnualTemplate: "letno zaračunavanje · {total} € letno",
    orMonthlyTemplate: "ali {price} €/mes.",
    savingsTemplate: "prihranite {amount} € letno",
    plans: {
      basic: {
        name: "Basic",
        tagline: "Jedilnik, QR naročila in AI prevod. Na spletu v 5 minutah.",
        features: [
          "QR jedilnik za vsako mizo",
          "Digitalni jedilnik s fotografijami in alergeni",
          "AI prevod v 35 jezikov",
          "Naročila iz jedilnika (izbirno)",
          "AI generiranje fotografij jedi",
          "Upravljanje s katerega koli telefona ali tablice",
        ],
      },
      pro: {
        name: "Pro",
        tagline: "Popoln nadzor restavracije: kuhinjski zaslon in rezervacije.",
        features: [
          "Vse iz Basic",
          "Kuhinjski zaslon (KDS)",
          "Spletna rezervacija miz 24/7",
          "Prednostna WhatsApp podpora",
        ],
      },
    },
  },

  footer: {
    featureLinks: [
      { href: "/sl/digitalni-jedilnik-restavracija", label: "Digitalni jedilnik" },
      { href: "/sl/sistem-narocanja-restavracija", label: "Naročila" },
      { href: "/sl/rezervacija-miz", label: "Rezervacija" },
      { href: "/sl/kuhinjski-zaslon", label: "Kuhinjski zaslon" },
    ],
    navLinks: [
      { href: "/sl/cene", label: "Cene" },
      { href: "#faq", label: "Pogosta vprašanja" },
      { href: "/sl/languages", label: "Spremeni jezik" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Vse pravice pridržane.",
  },
};
