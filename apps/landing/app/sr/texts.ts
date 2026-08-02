import { CalendarCheck, ChefHat, Receipt, Monitor } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "sr",
  htmlDir: "ltr",

  meta: {
    title: "Дигитални мени, кухињски екран и резервације — IQ Rest",
    description:
      "Управљајте рестораном из једне апликације: вишејезични дигитални мени, кухињски екран и резервације 24/7. Спремно за 5 минута. 14 дана бесплатно, без картице.",
    canonical: "https://iq-rest.com/sr",
    ogLocale: "sr_RS",
    ogTitle: "Дигитални мени, кухињски екран и резервације",
    ogDescription:
      "Управљајте рестораном из једне апликације: вишејезични дигитални мени, кухињски екран и резервације 24/7. Спремно за 5 минута. 14 дана бесплатно, без картице.",
  },

  ctaText: "Испробајте бесплатно",
  homeCtaText: "Испробајте бесплатно",
  trust: [
    { kind: "num", value: 35, label: "Jezika menija" },
    { kind: "text", value: "24/7", label: "Onlajn rezervacije" },
    { kind: "num", value: 5, suffix: " min", label: "Do pokretanja" },
    { kind: "count", label: "Restorana sa nama" },
  ],
  demoText: "Pogledajte demo",
  microcopy: "14 dana besplatno · Bez kartice · Otkažite bilo kada",

  header: {
    navFeatures: "Funkcije",
    navHow: "Kako funkcioniše",
    navPricing: "Cene",
    navFaq: "Česta pitanja",
    signIn: "Prijava",
    viewFeatures: "Погледајте функције",
    cta: "Испробајте бесплатно",
  },

  hero: {
    verticals: ["Restorani", "Kafići", "Barovi", "Hoteli", "Picerije"],
    headline: "Digitalni meni za restoran.\nOnlajn za 5 minuta.",
    sub: "Digitalni meni za vaš restoran za 5 minuta. Sve uključeno: editor bez koda, AI prepoznavanje štampanog menija, QR kodovi za stolove i direktne porudžbine bez provizije.",
    dynamicHeadlines: ["0% provizije.", "35 jezika sa AI.", "Onlajn porudžbine.", "Rezervacije 24/7.", "Premijum dizajn."],
    painBullets: [
      "0% provizije: svaka porudžbina ide direktno u vaš restoran.",
      "AI prevod na 35 jezika — turisti razumeju meni i poručuju više.",
      "Rezervacije 24/7: gosti sami rezervišu stolove, bez poziva u vrhuncu.",
      "Fleksibilne cene: promene menija su onlajn za nekoliko sekundi.",
    ],
    rating: "Više od 500 restorana u više od 30 zemalja",
  },

  features: {
    heading: "Sve što vam treba.",
    headingAccent: "Ništa suvišno.",
    sub: "Napravljeno za restorane. Koristi se svaki dan za stolom, u kuhinji i u sali.",
    items: [
      { Icon: Monitor, title: "Digitalni meni", desc: "Meni u pretraživaču sa fotografijama, cenama, alergenima i opisima. Ažurira se u realnom vremenu sa telefona. Gosti vide meni na svom jeziku; restoran štedi na štampi.", tag: "Digitalni meni", href: "/sr/digitalni-meni-restoran" },
      { Icon: Receipt, title: "Primanje porudžbina: gost i konobar", desc: "QR kod na stolu za gosta ili konobar prima porudžbinu sa telefona — oba idu direktno u kuhinju ili na WhatsApp. Bez provizije, sa brojem stola na svakom računu.", tag: "Porudžbine", href: "/sr/sistem-porudzbina-restoran" },
      { Icon: CalendarCheck, title: "Rezervacija stolova 24/7", desc: "Gosti sami rezervišu stolove putem sajta ili QR menija dok ste zauzeti u sali. Kalendar po stolu, automatske potvrde i podsetnici. Nijedan izgubljen gost.", tag: "Rezervacije", href: "/sr/rezervacija-stolova" },
      { Icon: ChefHat, title: "Kuhinjski ekran (KDS)", desc: "Papirni računi više nisu potrebni. Porudžbine iz sale idu direktno na ekran kuvara — kolone „priprema / spremno / poslužen“, alergeni i napomene istaknuti bojom. Na tabletu ili telefonu.", tag: "KDS", href: "/sr/kuhinjski-ekran" },
    ],
  },

  founder: {
    eyebrow: "Napravili restorateri",
    quoteStart:
      "Sa ženom sam vodio sopstveni kafić i iz prve ruke znamo kako stvarno izgleda dan u restoranu — primanje porudžbina, rezervacije, tok sale i kuhinje. Hteli smo jedan alat: moderan, lak za pokretanje i jasan na prvi pogled —",
    quoteAccent: "tako smo počeli da gradimo platformu koju sada razvijamo za druge restoratere.",
    sign: "Bogdan Sokolov · osnivač, bivši vlasnik kafića",
    photoAlt: "Bogdan Sokolov, osnivač IQ Rest",
  },

  how: {
    heading: "Onlajn za 5 minuta",
    sub: "Četiri kratka koraka. Bez instalacija, bez tehničkih podešavanja.",
    steps: [
      { n: "1", t: "Tip i naziv", d: "Izaberite tip lokala i unesite naziv." },
      { n: "2", t: "Sačuvaj", d: "Unesite e-mail ili se prijavite preko Google-a." },
      { n: "3", t: "Meni", d: "Dodajte stavke ručno ili otpremite štampan meni za AI skeniranje." },
      { n: "4", t: "Gotovo", d: "Podelite link ili QR kod i počnite da primate porudžbine." },
    ],
  },

  pricing: {
    badge: "Bez provizije · Bez ugovora",
    heading: "Jedan paket.",
    headingAccent: "Sve uključeno.",
    sub: "QR meni, primanje porudžbina, AI prevod, sajt restorana i rezervacija. Jedna transparentna mesečna naknada.",
    monthlyLabel: "Mesečno",
    yearlyLabel: "Godišnje",
    saveBadge: "Uštedite 25%",
    perMonth: "mesečno",
    billedAnnually: "Godišnji obračun: {total}",
    youSave: "Štedite {amount}",
    trust: { secure: "Bezbedno plaćanje preko Stripe-a", noCommitment: "Bez obaveze", quick: "Aktivno za nekoliko minuta", restaurants: "500+ restorana" },
  },

  faq: {
    eyebrow: "Imate pitanja?",
    heading: "Često postavljana",
    headingAccent: "pitanja.",
    sub: "Šta restorateri pitaju pre registracije. Ne nalazite svoje pitanje? Pišite nam na WhatsApp — odgovaraju pravi ljudi, ne bot.",
    whatsappCta: "Pitajte na WhatsApp",
    whatsappPrefill: "Zdravo, imam pitanje o IQ Rest",
    items: [
      { q: "Šta uključuje probni period i šta se dešava posle?", a: "Pun pristup svim funkcijama 14 dana, bez kartice. Posle 14 dana nalog se pauzira ako nije dodat način plaćanja — nikada ne naplaćujemo automatski. Možete dodati plaćanje kasnije i nastaviti odakle ste stali. Otkažite bilo kada jednim klikom." },
      { q: "Da li uzimate proviziju od porudžbina?", a: "Ne. Svaka porudžbina iz QR menija ide direktno u restoran — bez procenta sa naše strane, bez naknada agregatora. Jedna fiksna mesečna naknada i ništa drugo." },
      { q: "Da li gostima treba aplikacija, da li nama trebaju tehničke veštine?", a: "Gostima ne treba aplikacija — usmere kameru telefona ka QR kodu i meni se otvara u pretraživaču. Restoranima takođe ne trebaju tehničke veštine: administrativni panel radi u svakom modernom pretraživaču na telefonu, tabletu ili laptopu. Svaka radnja je klikom i prevlačenjem, bez koda." },
      { q: "Koliko brzo se menjaju cene i pojavljuju nova jela?", a: "Odmah. Promenite cenu sa telefona — gosti je vide za nekoliko sekundi. Novo jelo zahteva nekoliko dodira: ime, cena, fotografija. Bez ponovnog štampanja, bez čekanja na dizajnera." },
      { q: "Koliko jezika je podržano?", a: "35 jezika sa ugrađenim AI prevodom. Jedan dodir i ceo meni je preveden; AI razume kulinarski kontekst — imena i opisi zvuče prirodno na svakom jeziku. Turisti poručuju sa većom sigurnošću kada zaista razumeju meni." },
    ],
  },

  finalCta: {
    heading: "Onlajn za 5 minuta.",
    headingAccent: "14 dana besplatno.",
    sub: "Bez kartice, otkažite bilo kada. Pridružite se 500+ restoranima koji već koriste IQ Rest.",
  },

  featureHighlights: {
    heading: "Све укључено",
    sub: "Функције које госте претварају у поруџбине — у сваком плану, без доплата.",
  },

  scan: {
    heading: "Imate papirni meni ili PDF?",
    headingAccent: "AI ga digitalizuje za 60 sekundi.",
    sub: "Otpremite fotografiju ili dokument — AI automatski prepoznaje kategorije, jela i cene.",
    cta: "Skeniraj meni →",
  },

  pricingQuiz: {
    heading: "Napravite svoj plan",
    sub: "Plaćate samo ono što koristite. Počnite sa menijem i dodajte šta vam treba.",
    billingLabel: "Naplata:",
    monthly: "Mesečno",
    yearly: "Godišnje",
    restaurantsLabel: "Restorani:",
    fewerAria: "Manje restorana",
    moreAria: "Više restorana",
    menuTitle: "Digitalni meni",
    menuHint: "Uvek uključeno",
    reservationsTitle: "Rezervacije",
    reservationsHint: "Rezervacije stolova",
    kdsTitle: "Kuhinjski ekran",
    kdsHint: "Porudžbine na kuhinjskom ekranu",
    domainTitle: "Sopstveni domen",
    domainHint: "Vaša sopstvena veb adresa",
    perMonthSuffix: "/mes.",
    perYearSuffix: "/god.",
    perMonthLongSuffix: "/mesec",
    saveYearlyTemplate: "Uštedite {amount} godišnje uz godišnju naplatu",
    volumeDiscountTemplate: "{percent}% popusta na količinu · {count} restorana",
    saveUpToHint: "Uštedite do 50% sa 5+ restorana",
    billedYearly: "Naplaćuje se jednom godišnje",
    billedMonthly: "Naplaćuje se mesečno",
    enterprisePre: "Potreban vam je prilagođeni plan ili više restorana?",
    enterpriseCta: "Pišite nam",
    enterprisePost: "i prilagodićemo ga za vas.",
    enterpriseWa: "Zdravo! Želeo bih prilagođeni plan za svoje restorane.",
  },

  pricingCta: {
    heading: "Jednostavne, fleksibilne cene",
    sub: "Plaćate samo funkcije koje vam trebaju — napravite sopstveni plan za minut.",
    fromTemplate: "od {price}/mes.",
    button: "Izračunajte svoj plan",
  },

  footer: {
    featureLinks: [
      { href: "/sr/digitalni-meni-restoran", label: "Digitalni meni" },
      { href: "/sr/sistem-porudzbina-restoran", label: "Porudžbine" },
      { href: "/sr/rezervacija-stolova", label: "Rezervacije" },
      { href: "/sr/kuhinjski-ekran", label: "Kuhinjski ekran" },
    ],
    navLinks: [
      { href: "/sr/cene", label: "Cene" },
      { href: "#faq", label: "Česta pitanja" },
      { href: "/sr/languages", label: "Promeni jezik" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Sva prava zadržana.",
  },
};
