import { ScanLine, Languages, CalendarCheck, Palette, Smartphone, ListPlus } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "sl", htmlDir: "ltr",
  meta: {
    title: "QR Jedilnik za Restavracije — Direktna Naročila, Brez Provizije | IQ Rest",
    description: "Konec papirnatih jedilnikov in provizij dostavnih aplikacij. QR jedilnik, direktna naročila, rezervacije in večjezična stran. 14 dni brezplačno, brez kartice.",
    canonical: "https://iq-rest.com/sl", ogLocale: "sl_SI",
    ogTitle: "QR Jedilnik za Restavracije — Direktna Naročila, Brez Provizije",
    ogDescription: "QR jedilnik, direktna naročila, rezervacije in AI prevod. Pripravljeno v 2 minutah. 14 dni brezplačno — brez kartice.",
  },
  ctaText: "Začni brezplačno →",
  demoText: "Poglej demo", microcopy: "14 dni brezplačno · Brez kartice · Prekliči kadar koli",
  header: { navFeatures: "Funkcije", navHow: "Kako deluje", navPricing: "Cene", navFaq: "FAQ", signIn: "Prijava", cta: "Začni brezplačno →" },
  hero: {
    verticals: ["Restavracije", "Kavarne", "Bari", "Hoteli", "Picerije"],
    variants: [
      { headline: "Prenehaj tiskati jedilnike.", headlineAccent: "Prenehaj plačevati 30% dostavnim aplikacijam.", sub: "QR jedilnik, direktna naročila, rezervacije in večjezična stran. Pripravljeno v 2 minutah — brez kartice." },
      { headline: "Tvoja restavracija si zasluži več kot", headlineAccent: "papirnate jedilnike in zamujene klice.", sub: "Direktna naročila, takojšnje posodobitve in rezervacije 24/7. Postavljeno v 2 minutah." },
      { headline: "Ena QR koda.", headlineAccent: "Brez provizije. Zbogom papirju.", sub: "QR jedilnik, spletna naročila in rezervacije — vse na enem mestu. 14 dni brezplačno, brez kartice." },
      { headline: "Sprejmi direktna naročila.", headlineAccent: "Preskoči provizijo.", sub: "Gostje skenirajo, naročijo in plačajo — direktno tebi, brez Wolt deleža. Pripravljeno v 2 minutah." },
      { headline: "Več naročil. Več rezervacij.", headlineAccent: "Brez papirja, brez aplikacij.", sub: "QR jedilnik + rezervacije + večjezična stran na avtopilotu. 14-dnevni brezplačni preizkus." },
      { headline: "Turisti ne berejo jedilnika?", headlineAccent: "Rešeno v 2 minutah.", sub: "AI prevede ves jedilnik v 35 jezikov. Plus QR naročila in rezervacije vključeni." },
      { headline: "Iz papirnatega jedilnika v QR kodo,", headlineAccent: "preden se ohladi espresso.", sub: "QR jedilnik, direktna naročila in rezervacije 24/7. Pripravljeno v 2 minutah — brez kartice." },
      { headline: "Osvežujoče preprost QR jedilnik.", headlineAccent: "Tiho zmogljiv znotraj.", sub: "Direktna naročila, AI prevod, rezervacije in spletna stran — vse z enim dotikom na telefonu." },
    ],
    painBullets: ["Brez tiska — spreminjaj cene takoj", "Brez provizije — naročila direktno k tebi", "Brez zamujenih klicev — rezervacije 24/7", "35 jezikov — nikoli ne izgubiš turista"],
    rating: "4,9 · več kot 500 restavracij v 30+ državah",
  },
  features: {
    heading: "Vse kar potrebuješ.", headingAccent: "Nič odvečnega.",
    sub: "Narejeno za restavracije. Uporabljeno za mizo.",
    items: [
      { Icon: ScanLine, title: "Obdrži 100% vsakega naročila", desc: "Gostje skenirajo, naročijo in plačajo — direktno tebi. Brez aplikacij za prenos, brez 30% dostavnega deleža. Vsako naročilo prispe v realnem času s številko mize v panelu." },
      { Icon: Languages, title: "Prodajaj turistom v njihovem jeziku", desc: "En dotik prevede ves jedilnik v 35 jezikov. AI razume kulinarski kontekst — gostje naročijo več, ko jed res razumejo." },
      { Icon: CalendarCheck, title: "Ne izgubi rezervacij med kuhanjem", desc: "Gostje rezervirajo 24/7, brez klicev. Avto- ali ročna potrditev, e-poštni opomniki — manj odpovedi, brez stresa." },
      { Icon: Palette, title: "Nepozabno v 1 sekundi", desc: "Postavi video kuhinje ali fotografijo jedi za ozadje jedilnika. Gostje nehajo drsati. Tvoja blagovna znamka ostane." },
      { Icon: Smartphone, title: "Spreminjaj v sekundah, ne v dneh", desc: "Cene, fotografije, dnevna ponudba — s telefona, med mizami. Naživo gostom takoj. Nikoli več tiskanja." },
      { Icon: ListPlus, title: "Če pošlješ WhatsApp, znaš to uporabljati", desc: "Dotakni se, da dodaš jed. Povleci, da preuredi. Izklopi, kar je razprodano. Brez priročnikov, brez vodičev, brez krivulje učenja." },
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
    heading: "V manj kot 2 minutah",
    sub: "Štirje kratki koraki. Brez namestitev, brez tehnične nastavitve.",
    steps: [
      { n: "1", t: "Registriraj se", d: "E-pošta ali Google. Brez kartice. V 10 sekundah." },
      { n: "2", t: "Ime restavracije", d: "Vpiši ime. Pojavi se na vrhu jedilnika." },
      { n: "3", t: "Dodaj prvo jed", d: "Kategorija, ime, cena, fotografija. To je vse." },
      { n: "4", t: "Izberi ozadje in natisni QR", d: "Izberi ozadje. Vzemi QR. Nalepi na mize." },
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
      { q: "Lahko upravljam več restavracij iz enega računa?", a: "Da. Pro načrt omogoča več restavracij v istem računu — ločeni jedilniki, ločeni QR-ji, ločena statistika, ena prijava. Preklopi z dvema dotikoma." },
      { q: "Kako hitro spreminjam cene in dodajam jedi?", a: "Takoj. Spremeni ceno na telefonu, gostje vidijo v sekundah. Nova jed? Dotakni se, napiši, fotografija, končano — brez ponovnega tiskanja, brez čakanja na oblikovalca." },
      { q: "Koliko jezikov podpirate?", a: "35 jezikov z vgrajenim AI prevodom. En dotik prevede ves jedilnik in AI razume kulinarski kontekst — imena in opisi zvenijo naravno v vsakem jeziku. Turisti naročijo več, ko res razumejo." },
    ],
  },
  finalCta: { heading: "Pripravljeno v 2 minutah.", headingAccent: "Brezplačno 14 dni.", sub: "Brez kartice. Prekliči kadar koli. Pridruži se 500+ restavracijam že na IQ Rest." },
  footer: {
    featureLinks: [
      { href: "/sl/online-orders", label: "Spletna naročila" }, { href: "/sl/ai-translation", label: "AI prevod" },
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
