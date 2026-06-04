import { CalendarCheck, ChefHat, Receipt, Monitor } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "hr",
  htmlDir: "ltr",

  meta: {
    title: "Digitalni jelovnik, kuhinjski zaslon i rezervacije — IQ Rest",
    description:
      "Vodite restoran iz jedne aplikacije: višejezični digitalni jelovnik, kuhinjski zaslon i rezervacije 24/7. Spremno za 5 minuta. 14 dana besplatno, bez kartice.",
    canonical: "https://iq-rest.com/hr",
    ogLocale: "hr_HR",
    ogTitle: "Digitalni jelovnik, kuhinjski zaslon i rezervacije",
    ogDescription:
      "Vodite restoran iz jedne aplikacije: višejezični digitalni jelovnik, kuhinjski zaslon i rezervacije 24/7. Spremno za 5 minuta. 14 dana besplatno, bez kartice.",
  },

  ctaText: "Započni besplatno",
  homeCtaText: "Izgradite svoju platformu",
  demoText: "Pogledajte demo",
  microcopy: "14 dana besplatno · Bez kartice · Otkažite bilo kada",

  header: {
    navFeatures: "Mogućnosti",
    navHow: "Kako funkcionira",
    navPricing: "Cijene",
    navFaq: "Česta pitanja",
    signIn: "Prijava",
    viewFeatures: "Pogledaj značajke",
    cta: "Započni besplatno",
  },

  hero: {
    verticals: ["Restorani", "Kafići", "Barovi", "Hoteli", "Pizzerije"],
    headline: "Digitalni jelovnik za restoran. Online za 5 minuta.",
    sub: "Digitalni jelovnik za vaš restoran za 5 minuta. Sve uključeno: editor bez kodiranja, AI prepoznavanje tiskanog jelovnika, QR kodovi za stolove i izravne narudžbe bez provizije.",
    dynamicHeadlines: ["0 % provizije.", "35 jezika s AI.", "Online narudžbe.", "Rezervacije 24/7.", "Premium dizajn."],
    painBullets: [
      "0 % provizije: svaka narudžba ide izravno u vaš restoran.",
      "AI prijevod na 35 jezika — turisti razumiju jelovnik i naručuju više.",
      "Rezervacije 24/7: gosti sami rezerviraju stolove, bez poziva u špici.",
      "Fleksibilne cijene: promjene jelovnika su online u sekundama.",
    ],
    rating: "Više od 500 restorana u više od 30 zemalja",
  },

  features: {
    heading: "Sve što vam treba.",
    headingAccent: "Ništa suvišno.",
    sub: "Napravljeno za restorane. Koristi se svaki dan za stolom, u kuhinji i u sali.",
    items: [
      { Icon: Monitor, title: "Digitalni jelovnik", desc: "Jelovnik u pregledniku s fotografijama, cijenama, alergenima i opisima. Ažurira se u stvarnom vremenu s telefona. Gosti vide jelovnik na svom jeziku; restoran štedi na tisku.", tag: "Digitalni jelovnik", href: "/hr/digitalni-jelovnik-restoran" },
      { Icon: Receipt, title: "Primanje narudžbi: gost i konobar", desc: "QR kod na stolu za gosta ili konobar prima narudžbu s telefona — oboje ide izravno u kuhinju ili na WhatsApp. Bez provizije, s brojem stola na svakoj računu.", tag: "Narudžbe", href: "/hr/sustav-narudzbi-restoran" },
      { Icon: CalendarCheck, title: "Rezervacija stolova 24/7", desc: "Gosti sami rezerviraju stolove putem web-stranice ili QR jelovnika dok ste zaposleni u sali. Kalendar po stolu, automatske potvrde i podsjetnici. Niti jedan propušten gost.", tag: "Rezervacije", href: "/hr/rezervacija-stolova" },
      { Icon: ChefHat, title: "Kuhinjski ekran (KDS)", desc: "Papirnati računi više nisu potrebni. Narudžbe iz sale idu izravno na ekran kuhara — stupci „priprema / spremno / posluženo“, alergeni i napomene istaknuti bojom. Na tabletu ili telefonu.", tag: "KDS", href: "/hr/kuhinjski-ekran" },
    ],
  },

  founder: {
    eyebrow: "Napravili restoratori",
    quoteStart:
      "Žena i ja vodili smo vlastiti kafić i iz prve ruke znamo kako zaista izgleda dan u restoranu — primanje narudžbi, rezervacije, tijek sale i kuhinje. Željeli smo jedan alat: moderan, lak za pokretanje i jasan na prvi pogled —",
    quoteAccent: "tako smo počeli graditi platformu koju sada razvijamo za druge restoratere.",
    sign: "Bogdan Sokolov · osnivač, bivši vlasnik kafića",
    photoAlt: "Bogdan Sokolov, osnivač IQ Rest",
  },

  how: {
    heading: "Online za 5 minuta",
    sub: "Četiri kratka koraka. Bez instalacija, bez tehničkih postavki.",
    steps: [
      { n: "1", t: "Vrsta i naziv", d: "Odaberite vrstu objekta i unesite naziv." },
      { n: "2", t: "Spremi", d: "Unesite e-mail ili se prijavite s Googleom." },
      { n: "3", t: "Jelovnik", d: "Dodajte stavke ručno ili učitajte tiskani jelovnik za AI skeniranje." },
      { n: "4", t: "Gotovo", d: "Podijelite link ili QR kod i počnite primati narudžbe." },
    ],
  },

  pricing: {
    badge: "Bez provizije · Bez ugovora",
    heading: "Jedan paket.",
    headingAccent: "Sve uključeno.",
    sub: "QR jelovnik, primanje narudžbi, AI prijevod, web-stranica restorana i rezervacija. Jedna transparentna mjesečna naknada.",
    monthlyLabel: "Mjesečno",
    yearlyLabel: "Godišnje",
    saveBadge: "Uštedite 25 %",
    perMonth: "mjesečno",
    billedAnnually: "Godišnje plaćanje: {total}",
    youSave: "Štedite {amount}",
    trust: { secure: "Sigurno plaćanje Stripeom", noCommitment: "Bez obveze", quick: "Aktivno u minutama", restaurants: "500+ restorana" },
  },

  faq: {
    eyebrow: "Imate pitanja?",
    heading: "Često postavljana",
    headingAccent: "pitanja.",
    sub: "Što restoratori pitaju prije registracije. Ne nalazite svoje pitanje? Pišite nam na WhatsApp — odgovaraju pravi ljudi, ne bot.",
    whatsappCta: "Pitajte na WhatsAppu",
    whatsappPrefill: "Bok, imam pitanje o IQ Restu",
    items: [
      { q: "Što uključuje probno razdoblje i što se događa nakon?", a: "Potpuni pristup svim mogućnostima 14 dana, bez kartice. Nakon 14 dana račun se pauzira ako se ne doda način plaćanja — nikada ne naplaćujemo automatski. Plaćanje možete dodati kasnije i nastaviti tamo gdje ste stali. Otkažite bilo kada jednim klikom." },
      { q: "Uzimate li proviziju na narudžbe?", a: "Ne. Svaka narudžba iz QR jelovnika ide izravno u restoran — bez postotka s naše strane, bez naknada agregatora. Jedna fiksna mjesečna naknada i ništa drugo." },
      { q: "Trebaju li gosti aplikaciju, trebamo li mi tehničke vještine?", a: "Gosti ne trebaju aplikaciju — usmjere kameru telefona na QR kod i jelovnik se otvori u pregledniku. Restorani također ne trebaju tehničke vještine: admin panel radi u svakom modernom pregledniku na telefonu, tabletu ili laptopu. Svaka radnja je klikom i povlačenjem, bez koda." },
      { q: "Koliko brzo se mijenjaju cijene i pojavljuju nova jela?", a: "Odmah. Promijenite cijenu s telefona — gosti je vide u sekundama. Novo jelo zahtijeva nekoliko dodira: naziv, cijena, fotografija. Bez ponovnog tiska, bez čekanja na dizajnera." },
      { q: "Koliko jezika je podržano?", a: "35 jezika s ugrađenim AI prijevodom. Jedan dodir i cijeli jelovnik je preveden; AI razumije kulinarski kontekst — nazivi i opisi zvuče prirodno na svakom jeziku. Turisti naručuju s većim povjerenjem kada stvarno razumiju jelovnik." },
    ],
  },

  finalCta: {
    heading: "Online za 5 minuta.",
    headingAccent: "14 dana besplatno.",
    sub: "Bez kartice, otkažite bilo kada. Pridružite se 500+ restorana koji već koriste IQ Rest.",
  },

  scan: {
    heading: "Imate jelovnik na papiru ili PDF?",
    headingAccent: "AI ga digitalizira u 60 sekundi.",
    sub: "Učitajte fotografiju ili dokument — AI automatski prepoznaje kategorije, jela i cijene.",
    cta: "Skeniraj jelovnik →",
  },

  pricingHero: {
    chips: ["Bez provizije", "Bez ugovora", "14 dana besplatno"],
    heading: "Cijene.",
    headingAccent: "Bez skrivenih naknada.",
    sub: "Jedna transparentna mjesečna naknada. Bez postotka na narudžbe i bez provizija agregatora. Otkažite pretplatu bilo kada.",
    popularBadge: "Popularno",
    perMonthSuffix: "/mj.",
    whenAnnualTemplate: "godišnje plaćanje · {total} godišnje",
    orMonthlyTemplate: "ili {price}/mj.",
    savingsTemplate: "uštedite {amount} godišnje",
    plans: {
      basic: {
        name: "Basic",
        tagline: "Jelovnik, QR narudžbe i AI prijevod. Online za 5 minuta.",
        features: [
          "QR jelovnik za svaki stol",
          "Digitalni jelovnik s fotografijama i alergenima",
          "AI prijevod na 35 jezika",
          "Narudžbe iz jelovnika (opcionalno)",
          "AI generiranje fotografija jela",
          "Upravljanje s bilo kojeg telefona ili tableta",
        ],
      },
      pro: {
        name: "Pro",
        tagline: "Potpuna kontrola restorana: kuhinjski ekran i rezervacije.",
        features: [
          "Sve iz Basica",
          "Kuhinjski ekran (KDS)",
          "Online rezervacija stolova 24/7",
          "Prioritetna WhatsApp podrška",
        ],
      },
    },
  },

  footer: {
    featureLinks: [
      { href: "/hr/digitalni-jelovnik-restoran", label: "Digitalni jelovnik" },
      { href: "/hr/sustav-narudzbi-restoran", label: "Narudžbe" },
      { href: "/hr/rezervacija-stolova", label: "Rezervacije" },
      { href: "/hr/kuhinjski-ekran", label: "Kuhinjski ekran" },
    ],
    navLinks: [
      { href: "/hr/cijene", label: "Cijene" },
      { href: "#faq", label: "Česta pitanja" },
      { href: "/hr/languages", label: "Promijeni jezik" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Sva prava pridržana.",
  },
};
