import { ScanLine, Languages, CalendarCheck, Palette, Smartphone, ChefHat } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "hr", htmlDir: "ltr",
  meta: {
    title: "QR Jelovnik za Restorane — Direktne Narudžbe, Nula Provizije | IQ Rest",
    description: "Kraj papirnatih jelovnika i provizija aplikacija za dostavu. QR jelovnik, direktne narudžbe, rezervacije i višejezična stranica. 14 dana besplatno, bez kartice.",
    canonical: "https://iq-rest.com/hr", ogLocale: "hr_HR",
    ogTitle: "QR Jelovnik za Restorane — Direktne Narudžbe, Nula Provizije",
    ogDescription: "QR jelovnik, direktne narudžbe, rezervacije i AI prijevod. Spremno u 2 minute. 14 dana besplatno — bez kartice.",
  },
  ctaText: "Isprobaj besplatno", ctaSite: "Izradi web",
  demoText: "Pogledaj live demo", microcopy: "14 dana besplatno · Bez kartice · Otkaži kada želiš",
  header: { navFeatures: "Značajke", navHow: "Kako radi", navPricing: "Cijene", navFaq: "FAQ", signIn: "Prijava", cta: "Isprobaj besplatno" },
  hero: {
    verticals: ["Restorani", "Kafići", "Barovi", "Hoteli", "Pizzerije"],
    qr: { headline: "QR jelovnik za 5 minuta.", sub: "Gotova web stranica za vaš restoran — bez programera i izvođača. Izravne narudžbe, rezervacije i analitika gostiju u jednoj pretplati." },
    web: { headline: "Web restorana za 5 minuta.", sub: "Gotova web stranica za vaš restoran — bez programera i izvođača. Izravne narudžbe, rezervacije i analitika gostiju u jednoj pretplati." },
    dynamicHeadlines: ["0% provizije.", "35 jezika uz AI.", "Online narudžbe.", "Rezervacije 24/7.", "Premium dizajn."],
    painBullets: ["0% provizije: Sve narudžbe idu izravno vama.", "AI prijevod: 35 jezika za veću potrošnju turista.", "Rezervacije 24/7: Puna sala bez suvišnih poziva.", "Fleksibilne cijene: Ažurirajte jelovnik u par sekundi."],
    rating: "4,9 · više od 500 restorana u 30+ zemalja",
  },
  features: {
    heading: "Sve što trebaš.", headingAccent: "Ništa što ne trebaš.",
    sub: "Napravljeno za restorane. Korišteno za stolom.",
    items: [
      
      { Icon: ScanLine, title: "Naručivanje sa stola", desc: "Narudžbe odmah stižu na WhatsApp ili panel s brojem stola. Brža usluga, veća prodaja.", tag: "Izravne narudžbe" },
      { Icon: Languages, title: "AI prevoditelj (35 jezika)", desc: "Naš AI razumije gastronomiju. Turisti naručuju 20% više kada razumiju sastav jela.", tag: "AI prijevod" },
      { Icon: CalendarCheck, title: "Rezervacija stolova", desc: "Sustav sam prima rezervacije dok ste vi u kuhinji. Nijedan izgubljeni gost.", tag: "Rezervacije" },
      { Icon: Palette, title: "Moderni dizajn", desc: "Video pozadine i privlačne fotografije. Vaš jelovnik izgleda luksuzno i budi apetit.", tag: "Vlastiti dizajn" },
      { Icon: Smartphone, title: "Brzi urednik", desc: "Upravljajte stop-listom i cijenama izravno s mobitela. Promjene su odmah vidljive.", tag: "Uređivač menija" },
      { Icon: ChefHat, title: "Uskoro: Kuhinjski zaslon", desc: "Zaboravite na papirnate narudžbe. Narudžbe iz sale idu izravno na kuharov ekran.", tag: "Uskoro" },
    
    ],
  },
  founder: {
    eyebrow: "Napravio ugostitelj",
    quoteStart: "Žena i ja otvorili smo kafić i tjednima tražili sustav koji prima online narudžbe, rezervacije i izgleda moderno. Sve što smo probali bilo je trapavo, ružno ili je nedostajala polovica funkcija —",
    quoteAccent: "pa smo izgradili onaj koji bismo sami htjeli imati.",
    sign: "Bogdan Sokolov · osnivač, bivši vlasnik kafića",
    photoAlt: "Bogdan, osnivač IQ Rest",
  },
  how: {
    heading: "Uživo za manje od 2 minute",
    sub: "Četiri kratka koraka. Bez instalacija, bez tehničkih postavki.",
    steps: [
      { n: "1", t: "Registriraj se", d: "Email ili Google. Bez kartice. Gotovo u 10 sekundi." },
      { n: "2", t: "Ime restorana", d: "Upiši ime. Pojavi se na vrhu jelovnika." },
      { n: "3", t: "Dodaj prvo jelo", d: "Kategorija, ime, cijena, fotka. To je to." },
      { n: "4", t: "Odaberi pozadinu i ispiši QR", d: "Odaberi pozadinu. Uzmi QR. Zalijepi na stolove." },
    ],
  },
  pricing: {
    badge: "Nula provizije · Bez ugovora",
    heading: "Jedan plan.", headingAccent: "Sve uključeno.",
    sub: "QR jelovnik, narudžbe, AI prijevod, web restorana i rezervacije. Jedna jednostavna cijena.",
    monthlyLabel: "Mjesečno", yearlyLabel: "Godišnje", saveBadge: "Uštedi 25%", perMonth: "mjesečno",
    billedAnnually: "Godišnja naplata {total}", youSave: "Štediš {amount}",
    trust: { secure: "Sigurno plaćanje sa Stripe", noCommitment: "Bez obveze", quick: "Aktivno u minutama", restaurants: "500+ restorana" },
  },
  faq: {
    eyebrow: "Pitanja?", heading: "Često postavljana", headingAccent: "pitanja.",
    sub: "Što ugostitelji pitaju prije registracije. Ne vidiš svoje? Piši na WhatsApp — odgovaraju pravi ljudi.",
    whatsappCta: "Pitaj na WhatsApp", whatsappPrefill: "Bok, imam pitanje o IQ Rest",
    items: [
      { q: "Što uključuje besplatno probno razdoblje i što nakon?", a: "14 dana puni pristup, bez kartice. Nakon 14 dana račun se pauzira ako ne dodaš način plaćanja — nikad ne naplaćujemo automatski. Dodaj plaćanje kasnije za reaktivaciju. Otkaži s jednim klikom." },
      { q: "Uzimate li proviziju na narudžbe?", a: "Nulu. Svaka narudžba s tvog QR jelovnika ide direktno tebi — bez našeg udjela, bez Wolt / Glovo naknada. Jedna fiksna mjesečna cijena, to je to." },
      { q: "Trebaju li gosti aplikaciju? Trebam li ja tehničke vještine?", a: "Bez aplikacija za goste — skeniraju QR kamerom, jelovnik se otvara u pregledniku. Bez tehničkih vještina za tebe — cijeli panel radi na mobitelu, dodirni za dodavanje, povuci za preslagivanje, to je cijela krivulja." },
      { q: "Koliko brzo mijenjam cijene i dodajem jela?", a: "Trenutno. Promijeni cijenu na mobitelu, gosti vide u sekundama. Novo jelo? Dodirni, napiši, fotka, gotovo — bez ponovnog tiska, bez čekanja na dizajnera." },
      { q: "Koliko jezika podržavate?", a: "35 jezika s ugrađenim AI prijevodom. Jedan dodir prevodi cijeli jelovnik, AI razumije kulinarski kontekst — imena i opisi zvuče prirodno na svakom jeziku. Turisti naručuju više kad stvarno razumiju." },
    ],
  },
  finalCta: { heading: "Spremno u 2 minute.", headingAccent: "Besplatno 14 dana.", sub: "Bez kartice. Otkaži kad želiš. Pridruži se 500+ restorana već u IQ Rest." },
  scan: {
    heading: "Papirnati jelovnik ili PDF?",
    headingAccent: "AI ga digitalizira u 60 sekundi.",
    sub: "Učitaj — AI prepoznaje kategorije, jela i cijene.",
    cta: "Skeniraj jelovnik →",
  },
  footer: {
    featureLinks: [
      { href: "/hr/online-orders", label: "Online narudžbe" }, { href: "/hr/ai-translation", label: "AI prijevod" },
      { href: "/hr/reservations", label: "Rezervacije" }, { href: "/hr/mobile-management", label: "Mobilno upravljanje" },
      { href: "/hr/easy-menu", label: "Editor jelovnika" }, { href: "/hr/custom-design", label: "Video i foto pozadine" },
      { href: "/hr/color-scheme", label: "Boje brenda" }, { href: "/hr/multilingual", label: "Višejezična stranica" },
      { href: "/hr/ai-images", label: "AI optimizacija fotki" }, { href: "/hr/analytics", label: "Analitika" },
      { href: "/hr/instant-setup", label: "Trenutna postava" }, { href: "/hr/personal-support", label: "Osobna podrška" },
    ],
    navLinks: [
      { href: "#pricing", label: "Cijene" }, { href: "#faq", label: "Pitanja" },
      { href: "/hr/languages", label: "Promijeni jezik" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Sva prava pridržana.",
  },
};
