import { ScanLine, Languages, CalendarCheck, Palette, Smartphone, ChefHat } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "sr", htmlDir: "ltr",
  meta: {
    title: "QR Meni za Restorane — Direktne Porudžbine, Nula Provizija | IQ Rest",
    description: "Kraj papirnim menijima i provizijama dostavnih aplikacija. QR meni, direktne porudžbine, rezervacije i višejezični sajt. 14 dana besplatno, bez kartice.",
    canonical: "https://iq-rest.com/sr", ogLocale: "sr_RS",
    ogTitle: "QR Meni za Restorane — Direktne Porudžbine, Nula Provizija",
    ogDescription: "QR meni, direktne porudžbine, rezervacije i AI prevod. Spremno za 2 minuta. 14 dana besplatno — bez kartice.",
  },
  ctaText: "Probaj besplatno", ctaSite: "Napravi sajt",
  demoText: "Pogledaj demo", microcopy: "14 dana besplatno · Bez kartice · Otkaži kad god želiš",
  header: { navFeatures: "Funkcije", navHow: "Kako radi", navPricing: "Cene", navFaq: "FAQ", signIn: "Prijava", cta: "Probaj besplatno" },
  hero: {
    verticals: ["Restorani", "Kafići", "Barovi", "Hoteli", "Picerije"],
    qr: { headline: "QR jelovnik za 5 minuta.", sub: "Direktne porudžbine, rezervacije i 35 jezika. Bez provizije i programera." },
    web: { headline: "Veb-sajt za 5 minuta.", sub: "Direktne porudžbine, rezervacije i 35 jezika. Bez provizije i programera." },
    dynamicHeadlines: ["0% provizije.", "35 jezika (AI).", "Online porudžbine.", "Rezervacije 24/7.", "Premium dizajn."],
    painBullets: ["0% provizije: Sve porudžbine idu direktno vama.", "AI prevod: 35 jezika za veću potrošnju turista.", "Rezervacije 24/7: Puna sala bez suvišnih poziva.", "Fleksibilne cene: Ažurirajte jelovnik u par sekundi."],
    rating: "4,9 · preko 500 restorana u 30+ zemalja",
  },
  features: {
    heading: "Sve što ti treba.", headingAccent: "Ništa što ne treba.",
    sub: "Napravljeno za restorane. Korišćeno za stolom.",
    items: [
      
      { Icon: ScanLine, title: "Naručivanje sa stola", desc: "Porudžbine odmah stižu na WhatsApp ili panel sa brojem stola. Brža usluga, veća prodaja.", tag: "Директне поруџбине" },
      { Icon: Languages, title: "AI prevodilac (35 jezika)", desc: "Naš AI razume gastronomiju. Turisti naručuju 20% više kada razumeju sastav jela.", tag: "AI превод" },
      { Icon: CalendarCheck, title: "Rezervacija stolova", desc: "Sistem sam prima rezervacije dok ste vi u kuhinji. Nijedan izgubljeni gost.", tag: "Резервације" },
      { Icon: Palette, title: "Moderni dizajn", desc: "Video pozadine i privlačne fotografije. Vaš jelovnik izgleda luksuzno i budi apetit.", tag: "Сопствени дизајн" },
      { Icon: Smartphone, title: "Brzi urednik", desc: "Upravljajte stop-listom i cenama direktno sa mobilnog. Promene su odmah vidljive.", tag: "Уређивач менија" },
      { Icon: ChefHat, title: "Uskoro: Kuhinjski ekran", desc: "Zaboravite na papirne narudžbine. Porudžbine iz sale idu direktno na kuvarov ekran.", tag: "Ускоро" },
    
    ],
  },
  founder: {
    eyebrow: "Napravio ugostitelj",
    quoteStart: "Žena i ja smo otvorili kafić i nedeljama tražili sistem koji prima online porudžbine, rezervacije i izgleda moderno. Sve što smo probali bilo je nezgrapno, ružno ili je nedostajala polovina funkcija —",
    quoteAccent: "pa smo napravili onaj koji bismo sami želeli.",
    sign: "Bogdan Sokolov · osnivač, bivši vlasnik kafića",
    photoAlt: "Bogdan, osnivač IQ Rest",
  },
  how: {
    heading: "Uživo za manje od 2 minuta",
    sub: "Četiri kratka koraka. Bez instalacija, bez tehničkih podešavanja.",
    steps: [
      { n: "1", t: "Registruj se", d: "Email ili Google. Bez kartice. Gotovo za 10 sekundi." },
      { n: "2", t: "Ime restorana", d: "Samo upiši ime. Pojavljuje se na vrhu menija." },
      { n: "3", t: "Dodaj prvo jelo", d: "Kategorija, ime, cena, slika. To je to." },
      { n: "4", t: "Izaberi pozadinu i odštampaj QR", d: "Izaberi pozadinu. Uzmi QR. Zalepi na stolove." },
    ],
  },
  pricing: {
    badge: "Nula provizija · Bez ugovora",
    heading: "Jedan plan.", headingAccent: "Sve uključeno.",
    sub: "QR meni, porudžbine, AI prevod, sajt restorana i rezervacije. Jedna jednostavna cena.",
    monthlyLabel: "Mesečno", yearlyLabel: "Godišnje", saveBadge: "Uštedi 25%", perMonth: "mesečno",
    billedAnnually: "Godišnja naplata {total}", youSave: "Štediš {amount}",
    trust: { secure: "Sigurno plaćanje sa Stripe", noCommitment: "Bez obaveze", quick: "Aktivno za minute", restaurants: "500+ restorana" },
  },
  faq: {
    eyebrow: "Pitanja?", heading: "Često postavljana", headingAccent: "pitanja.",
    sub: "Šta ugostitelji pitaju pre registracije. Ne vidiš svoje? Piši na WhatsApp — odgovaraju pravi ljudi.",
    whatsappCta: "Pitaj na WhatsApp", whatsappPrefill: "Zdravo, imam pitanje o IQ Rest",
    items: [
      { q: "Šta uključuje besplatni probni period i šta posle?", a: "14 dana pun pristup, bez kartice. Posle 14 dana nalog se pauzira ako ne dodaš način plaćanja — nikad ne naplaćujemo automatski. Dodaj plaćanje kasnije za reaktivaciju. Otkaži jednim klikom." },
      { q: "Da li uzimate proviziju od porudžbina?", a: "Nulu. Svaka porudžbina sa tvog QR menija ide direktno tebi — bez našeg udela, bez Wolt / Glovo naknada. Jedna fiksna mesečna cena, to je sve." },
      { q: "Da li gostima treba aplikacija? Da li meni trebaju tehničke veštine?", a: "Bez aplikacija za goste — skeniraju QR kamerom, meni se otvara u pretraživaču. Bez tehničkih veština za tebe — ceo panel radi na mobilnom, dodirneš za dodavanje, prevučeš za preuređivanje, to je cela kriva." },
      { q: "Koliko brzo menjam cene i dodajem jela?", a: "Trenutno. Promeni cenu na telefonu, gosti vide u sekundama. Novo jelo? Dodirneš, napišeš, slika, gotovo — bez ponovnog štampanja, bez čekanja na dizajnera." },
      { q: "Koliko jezika podržavate?", a: "35 jezika sa ugrađenim AI prevodom. Jedan dodir prevodi ceo meni, AI razume kulinarni kontekst — imena i opisi zvuče prirodno na svakom jeziku. Turisti naručuju više kad zaista razumeju." },
    ],
  },
  finalCta: { heading: "Spremno za 2 minuta.", headingAccent: "Besplatno 14 dana.", sub: "Bez kartice. Otkaži kad god želiš. Pridruži se 500+ restorana već na IQ Rest." },
  scan: {
    heading: "Papirni meni ili PDF?",
    headingAccent: "VI ga digitalizuje za 60 sekundi.",
    sub: "Otpremi — VI prepoznaje kategorije, jela i cene.",
    cta: "Skeniraj meni →",
  },
  footer: {
    featureLinks: [
      { href: "/sr/online-orders", label: "Online porudžbine" }, { href: "/sr/ai-translation", label: "AI prevod" },
      { href: "/sr/reservations", label: "Rezervacije" }, { href: "/sr/mobile-management", label: "Mobilno upravljanje" },
      { href: "/sr/easy-menu", label: "Editor menija" }, { href: "/sr/custom-design", label: "Video i foto pozadine" },
      { href: "/sr/color-scheme", label: "Boje brenda" }, { href: "/sr/multilingual", label: "Višejezični sajt" },
      { href: "/sr/ai-images", label: "AI optimizacija slika" }, { href: "/sr/analytics", label: "Analitika" },
      { href: "/sr/instant-setup", label: "Trenutna postavka" }, { href: "/sr/personal-support", label: "Lična podrška" },
    ],
    navLinks: [
      { href: "#pricing", label: "Cene" }, { href: "#faq", label: "Pitanja" },
      { href: "/sr/languages", label: "Promeni jezik" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Sva prava zadržana.",
  },
};
