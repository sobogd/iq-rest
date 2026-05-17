import { QrCode, Languages, CalendarCheck, Palette, Smartphone, ChefHat } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "sl", htmlDir: "ltr",
  meta: {
    title: "QR Jedilnik za Restavracije — Direktna Naročila, Brez Provizije | IQ Rest",
    description: "Konec papirnatih jedilnikov in provizij dostavnih aplikacij. QR jedilnik, direktna naročila, rezervacije in večjezična stran. 14 dni brezplačno, brez kartice.",
    canonical: "https://iq-rest.com/sl", ogLocale: "sl_SI",
    ogTitle: "QR Jedilnik za Restavracije — Direktna Naročila, Brez Provizije",
    ogDescription: "QR jedilnik, direktna naročila, rezervacije in AI prevod. Pripravljeno v 5 minutah. 14 dni brezplačno — brez kartice.",
  },
  ctaText: "Poskusi brezplačno",
  demoText: "Poglej demo", microcopy: "14 dni brezplačno · Brez kartice · Prekliči kadar koli",
  header: { navFeatures: "Funkcije", navHow: "Kako deluje", navPricing: "Cene", navFaq: "FAQ", signIn: "Prijava", cta: "Poskusi brezplačno" },
  hero: {
    verticals: ["Restavracije", "Kavarne", "Bari", "Hoteli", "Picerije"],
    headline: "QR meni v 5 minutah.",
    sub: "Pripravljena spletna stran za vašo restavracijo — brez programerjev. Neposredna naročila, rezervacije in analitika gostov v eni naročnini.",
    dynamicHeadlines: ["0% provizija.", "35 jezikov z UI.", "Spletna naročila.", "Rezervacije 24/7.", "Premium dizajn."],
    painBullets: ["0% provizija: Vsa naročila gredo neposredno vam.", "AI prevod: 35 jezikov za višjo porabo turistov.", "Rezervacije 24/7: Polna zasedenost brez odvečnih klicev.", "Prilagodljive cene: Posodobite meni v nekaj sekundah."],
    rating: "Več kot 500 restavracij v 30+ državah",
  },
  features: {
    heading: "Vse kar potrebuješ.", headingAccent: "Nič odvečnega.",
    sub: "Narejeno za restavracije. Uporabljeno za mizo.",
    items: [
      
      { Icon: QrCode, title: "Naročanje z mize", desc: "Naročila takoj prispejo v WhatsApp ali nadzorno ploščo s številko mize. Hitrejša postrežba.", tag: "Neposredna naročila", href: "/sl/spletni-sistem-narocanja-restavracija" },
      { Icon: Languages, title: "AI prevajalnik (35 jezikov)", desc: "Naš AI razume gastronomijo. Turisti naročijo 20 % več, ko razumejo sestavine jedi.", tag: "Prevod AI" },
      { Icon: CalendarCheck, title: "Rezervacija miz", desc: "Sistem sam sprejema rezervacije, ko ste v kuhinji. Nobena stranka ne bo izgubljena.", tag: "Rezervacije" },
      { Icon: Palette, title: "Modern dizajn", desc: "Video ozadja in privlačne fotografije. Vaš meni izgleda prestižno in vzbuja apetit.", tag: "Lasten dizajn" },
      { Icon: Smartphone, title: "Hitri urejevalnik", desc: "Upravljajte stop-listo in cene neposredno s telefona. Spremembe so gostom vidne takoj.", tag: "Urejevalnik menija" },
      { Icon: ChefHat, title: "Kmalu: Kuhinjski zaslon", desc: "Pozabite na papirnate lističe. Naročila iz dvorane gredo neposredno na kuharjev zaslon.", tag: "Kmalu" },
    
    ],
  },
  founder: {
    eyebrow: "Naredil gostinec",
    quoteStart: "Z ženo sva odprla kavarno in tedne iskala sistem, ki sprejema spletna naročila, rezervacije in zraven izgleda moderno. Vse, kar sva preizkusila, je bilo okorno, grdo ali pa je manjkala polovica funkcij —",
    quoteAccent: "zato sva zgradila tisto, kar bi sama hotela imeti.",
    sign: "Bogdan Sokolov · ustanovitelj, nekdanji lastnik kavarne",
    photoAlt: "Bogdan, ustanovitelj IQ Rest",
  },
  how: {
    heading: "V manj kot 5 minutah",
    sub: "Štirje kratki koraki. Brez namestitev, brez tehnične nastavitve.",
    steps: [
      { n: "1", t: "Tip in ime", d: "Izberi tip in vnesi ime." },
      { n: "2", t: "Shranjevanje", d: "Email ali prijava prek Googla." },
      { n: "3", t: "Meni", d: "Ustvari sam ali skeniraj papirnatega." },
      { n: "4", t: "Pripravljeno", d: "Oglej si, deli in sprejemaj naročila." },
    ],
  },
  pricing: {
    badge: "Brez provizije · Brez pogodb",
    heading: "En načrt.", headingAccent: "Vse vključeno.",
    sub: "QR jedilnik, naročila, AI prevod, spletna stran in rezervacije. Ena enostavna cena.",
    monthlyLabel: "Mesečno", yearlyLabel: "Letno", saveBadge: "Prihrani 25%", perMonth: "mesečno",
    billedAnnually: "Letno zaračunavanje {total}", youSave: "Prihraniš {amount}",
    trust: { secure: "Varno plačilo s Stripe", noCommitment: "Brez obveznosti", quick: "Aktivno v minutah", restaurants: "500+ restavracij" },
  },
  faq: {
    eyebrow: "Vprašanja?", heading: "Pogosta", headingAccent: "vprašanja.",
    sub: "Kaj gostinci sprašujejo pred registracijo. Ne vidiš svojega? Piši na WhatsApp — odgovarjajo pravi ljudje.",
    whatsappCta: "Vprašaj na WhatsApp", whatsappPrefill: "Pozdravljeni, imam vprašanje o IQ Rest",
    items: [
      { q: "Kaj vključuje preizkusno obdobje in kaj potem?", a: "14 dni polnega dostopa, brez kartice. Po 14 dneh se račun pavzira, če ne dodaš plačilne metode — nikoli ne zaračunamo samodejno. Dodaj plačilo kasneje za reaktivacijo. Prekliči z enim klikom." },
      { q: "Ali jemljete provizijo na naročila?", a: "Nič. Vsako naročilo iz tvojega QR jedilnika gre direktno tebi — brez našega deleža, brez Wolt / Glovo provizij. Ena fiksna mesečna cena, to je to." },
      { q: "Ali gostje potrebujejo aplikacijo? Potrebujem tehnično znanje?", a: "Brez aplikacij za goste — skenirajo QR s kamero, jedilnik se odpre v brskalniku. Brez tehničnih veščin za tebe — ves panel deluje na mobilcu, dotakni se za dodajanje, povleci za preurejanje, to je vsa krivulja." },
      { q: "Kako hitro spreminjam cene in dodajam jedi?", a: "Takoj. Spremeni ceno na telefonu, gostje vidijo v sekundah. Nova jed? Dotakni se, napiši, fotografija, končano — brez ponovnega tiskanja, brez čakanja na oblikovalca." },
      { q: "Koliko jezikov podpirate?", a: "35 jezikov z vgrajenim AI prevodom. En dotik prevede ves jedilnik in AI razume kulinarski kontekst — imena in opisi zvenijo naravno v vsakem jeziku. Turisti naročijo več, ko res razumejo." },
    ],
  },
  finalCta: { heading: "Pripravljeno v 5 minutah.", headingAccent: "Brezplačno 14 dni.", sub: "Brez kartice. Prekliči kadar koli. Pridruži se 500+ restavracijam že na IQ Rest." },
  scan: {
    heading: "Papirnati meni ali PDF?",
    headingAccent: "UI ga digitalizira v 60 sekundah.",
    sub: "Naloži — UI prepozna kategorije, jedi in cene.",
    cta: "Skeniraj meni →",
  },
  footer: {
    featureLinks: [
      { href: "/sl/spletni-sistem-narocanja-restavracija", label: "Spletni sistem naročanja" }, { href: "/sl/ai-translation", label: "AI prevod" },
      { href: "/sl/reservations", label: "Rezervacije" }, { href: "/sl/mobile-management", label: "Mobilno upravljanje" },
      { href: "/sl/easy-menu", label: "Urejevalnik jedilnika" }, { href: "/sl/custom-design", label: "Video in foto ozadja" },
      { href: "/sl/color-scheme", label: "Barve znamke" }, { href: "/sl/multilingual", label: "Večjezična stran" },
      { href: "/sl/ai-images", label: "AI optimizacija fotografij" }, { href: "/sl/analytics", label: "Analitika" },
      { href: "/sl/instant-setup", label: "Takojšnja namestitev" }, { href: "/sl/personal-support", label: "Osebna podpora" },
    ],
    navLinks: [
      { href: "#pricing", label: "Cene" }, { href: "#faq", label: "Vprašanja" },
      { href: "/sl/languages", label: "Spremeni jezik" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Vse pravice pridržane.",
  },
};
