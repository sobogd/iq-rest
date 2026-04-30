import { ScanLine, Languages, CalendarCheck, Palette, Smartphone, ListPlus } from "lucide-react";
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
  ctaText: "Počni besplatno →", microcopy: "14 dana besplatno · Bez kartice · Otkaži kada želiš",
  header: { navFeatures: "Značajke", navHow: "Kako radi", navPricing: "Cijene", navFaq: "FAQ", signIn: "Prijava", cta: "Počni besplatno →" },
  hero: {
    verticals: ["Restorani", "Kafići", "Barovi", "Hoteli", "Pizzerije"],
    variants: [
      { headline: "Prestani tiskati jelovnike.", headlineAccent: "Prestani plaćati 30% aplikacijama za dostavu.", sub: "QR jelovnik, direktne narudžbe, rezervacije i višejezična stranica. Spremno u 2 minute — bez kartice." },
      { headline: "Tvoj restoran zaslužuje više od", headlineAccent: "papirnatih jelovnika i propuštenih poziva.", sub: "Direktne narudžbe, trenutna ažuriranja i rezervacije 24/7. Postavljeno u 2 minute." },
      { headline: "Jedan QR kod.", headlineAccent: "Nula provizije. Zbogom papiru.", sub: "QR jelovnik, online narudžbe i rezervacije — sve na jednom mjestu. 14 dana besplatno, bez kartice." },
      { headline: "Primaj direktne narudžbe.", headlineAccent: "Preskoči proviziju.", sub: "Gosti skeniraju, naručuju i plaćaju — direktno tebi, bez Wolt udjela. Spremno u 2 minute." },
      { headline: "Više narudžbi. Više rezervacija.", headlineAccent: "Bez papira, bez aplikacija.", sub: "QR jelovnik + rezervacije + višejezična stranica na autopilotu. 14 dana besplatne probe." },
      { headline: "Turisti ne razumiju jelovnik?", headlineAccent: "Riješeno u 2 minute.", sub: "AI prevodi cijeli jelovnik na 35 jezika. Plus QR narudžbe i rezervacije uključene." },
      { headline: "Od papirnatog jelovnika do QR koda,", headlineAccent: "prije nego se ohladi espresso.", sub: "QR jelovnik, direktne narudžbe i rezervacije 24/7. Spremno u 2 minute — bez kartice." },
      { headline: "Osvježavajuće jednostavan QR jelovnik.", headlineAccent: "Tiho moćan iznutra.", sub: "Direktne narudžbe, AI prijevod, rezervacije i web — sve jednim dodirom na telefonu." },
    ],
    painBullets: ["Bez ispisa — mijenjaj cijene odmah", "Nula provizije — narudžbe ravno tebi", "Bez propuštenih poziva — rezervacije 24/7", "35 jezika — nikad ne izgubiš turista"],
    rating: "4,9 · više od 500 restorana u 30+ zemalja",
  },
  features: {
    heading: "Sve što trebaš.", headingAccent: "Ništa što ne trebaš.",
    sub: "Napravljeno za restorane. Korišteno za stolom.",
    items: [
      { Icon: ScanLine, title: "Zadrži 100% svake narudžbe", desc: "Gosti skeniraju, naručuju i plaćaju — direktno tebi. Bez aplikacija za skidanje, bez 30% za dostavu. Svaka narudžba dolazi u stvarnom vremenu s brojem stola u panel." },
      { Icon: Languages, title: "Prodaj turistima na njihovom jeziku", desc: "Jedan dodir prevodi cijeli jelovnik na 35 jezika. AI razumije kulinarski kontekst — gosti naručuju više kad stvarno razumiju jelo." },
      { Icon: CalendarCheck, title: "Ne gubi rezervacije dok kuhaš", desc: "Gosti rezerviraju 24/7, bez poziva. Auto ili ručna potvrda, email podsjetnici — manje izostanaka, nula stresa." },
      { Icon: Palette, title: "Nezaboravno u 1 sekundi", desc: "Stavi video kuhinje ili glavnu fotku jela kao pozadinu jelovnika. Gosti prestaju skrolati. Tvoj brand ostaje." },
      { Icon: Smartphone, title: "Mijenjaj u sekundama, ne u danima", desc: "Cijene, fotke, dnevna ponuda — s telefona, između stolova. Uživo gostima odmah. Nikad više tiskanja." },
      { Icon: ListPlus, title: "Ako šalješ WhatsApp, znaš ovo koristiti", desc: "Dodirni za dodavanje jela. Povuci za preslagivanje. Isključi što je rasprodano. Bez priručnika, bez tutoriala, bez krivulje učenja." },
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
      { q: "Mogu li voditi više restorana s jednog računa?", a: "Da. Pro plan dopušta više restorana u istom računu — odvojeni jelovnici, odvojeni QR-ovi, odvojena statistika, jedan login. Prebacuj se s dva dodira." },
      { q: "Koliko brzo mijenjam cijene i dodajem jela?", a: "Trenutno. Promijeni cijenu na mobitelu, gosti vide u sekundama. Novo jelo? Dodirni, napiši, fotka, gotovo — bez ponovnog tiska, bez čekanja na dizajnera." },
      { q: "Koliko jezika podržavate?", a: "35 jezika s ugrađenim AI prijevodom. Jedan dodir prevodi cijeli jelovnik, AI razumije kulinarski kontekst — imena i opisi zvuče prirodno na svakom jeziku. Turisti naručuju više kad stvarno razumiju." },
    ],
  },
  finalCta: { heading: "Spremno u 2 minute.", headingAccent: "Besplatno 14 dana.", sub: "Bez kartice. Otkaži kad želiš. Pridruži se 500+ restorana već u IQ Rest." },
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
      { href: "/hr/contacts", label: "Kontakt" }, { href: "/hr/changelog", label: "Novosti" },
      { href: "/hr/languages", label: "Promijeni jezik" },
    ],
    legalLinks: [
      { href: "/hr/terms", label: "Uvjeti" }, { href: "/hr/privacy", label: "Privatnost" },
      { href: "/hr/cookies", label: "Kolačići" }, { href: "/sitemap.xml", label: "Sitemap" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Sva prava pridržana.",
  },
};
