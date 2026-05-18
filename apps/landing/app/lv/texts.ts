import { QrCode, Languages, CalendarCheck, Palette, Smartphone, ChefHat } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "lv", htmlDir: "ltr",
  meta: {
    title: "QR Ēdienkarte Restorāniem — Tiešie Pasūtījumi, Nulle Komisijas | IQ Rest",
    description: "Nē papīra ēdienkartēm un piegādes lietotņu komisijām. QR ēdienkarte, tiešie pasūtījumi, rezervācijas un daudzvalodu vietne. 14 dienas bez maksas, bez kartes.",
    canonical: "https://iq-rest.com/lv", ogLocale: "lv_LV",
    ogTitle: "QR Ēdienkarte Restorāniem — Tiešie Pasūtījumi, Nulle Komisijas",
    ogDescription: "QR ēdienkarte, tiešie pasūtījumi, rezervācijas un AI tulkojums. Gatavs 5 minūtēs. 14 dienas bez maksas — bez kartes.",
  },
  ctaText: "Izmēģināt bez maksas",
  demoText: "Skatīt demo", microcopy: "14 dienas bez maksas · Bez kartes · Atcelties jebkurā brīdī",
  header: { navFeatures: "Funkcijas", navHow: "Kā tas darbojas", navPricing: "Cenas", navFaq: "FAQ", signIn: "Pieslēgties", cta: "Sākt" },
  hero: {
    verticals: ["Restorāni", "Kafejnīcas", "Bāri", "Viesnīcas", "Picērijas"],
    headline: "QR ēdienkarte 5 minūtēs.",
    sub: "Gatava jūsu restorāna mājaslapa — bez programmētājiem un apakšuzņēmējiem. Tieši pasūtījumi, rezervācijas un viesu analītika vienā abonementā.",
    dynamicHeadlines: ["0% komisija.", "35 valodas ar MI.", "Tiešsaistes pasūtījumi.", "Rezervācijas 24/7.", "Premium dizains."],
    painBullets: ["0% komisija: Visi pasūtījumi nonāk tieši pie jums.", "AI tulkojums: 35 valodas tūristu pirkumu palielināšanai.", "Rezervācijas 24/7: Pilna zāle bez liekiem zvaniem.", "Elastīgas cenas: Atjauniniet ēdienkarti dažu sekunžu laikā."],
    rating: "Vairāk nekā 500 restorānu 30+ valstīs",
  },
  features: {
    heading: "Viss, kas tev vajadzīgs.", headingAccent: "Nekā lieka.",
    sub: "Veidots restorāniem. Lietots pie galda.",
    items: [
      
      { Icon: QrCode, title: "Pasūtīšana no galdiņa", desc: "Pasūtījumi uzreiz nonāk WhatsApp vai panelī ar galdiņa numuru. Ātrāka apkalpošana.", tag: "Tiešie pasūtījumi", href: "/lv/tiessaistes-pasutijumu-sistema-restoranam" },
      { Icon: Languages, title: "AI tulkotājs (35 valodas)", desc: "Mūsu AI pārzina gastronomiju. Tūristi pasūta par 20% vairāk, kad saprot ēdienu sastāvu.", tag: "AI tulkojums" },
      { Icon: CalendarCheck, title: "Galdiņu rezervēšana", desc: "Sistēma pati pieņem rezervācijas, kamēr jūs esat virtuvē. Neviens pazaudēts klients.", tag: "Rezervācijas" },
      { Icon: Palette, title: "Moderns dizains", desc: "Video foni un kārdinošas foto. Jūsu ēdienkarte izskatās dārgi un rosina apetīti.", tag: "Pielāgots dizains" },
      { Icon: Smartphone, title: "Ātrais redaktors", desc: "Pārvaldiet stop-listi un cenas tieši no viedtālruņa. Izmaiņas viesiem redzamas uzreiz.", tag: "Ēdienkartes redaktors" },
      { Icon: ChefHat, title: "Virtuves displejs", desc: "Aizmirstiet par papīra čekiem. Pasūtījumi no zāles nonāk tieši pie pavāra ekrānā.", tag: "Virtuves displejs" },
    
    ],
  },
  founder: {
    eyebrow: "Veidoja restorāna īpašnieks",
    quoteStart: "Mēs ar sievu atvērām kafejnīcu un nedēļām meklējām sistēmu, kas pieņem tiešsaistes pasūtījumus, rezervācijas un izskatās moderna. Viss, ko izmēģinājām, bija neveikls, neglīts vai pietrūka pus funkciju —",
    quoteAccent: "tāpēc mēs uzbūvējām to, ko paši būtu vēlējušies.",
    sign: "Bogdans Sokolovs · dibinātājs, bijušais kafejnīcas īpašnieks",
    photoAlt: "Bogdans, IQ Rest dibinātājs",
  },
  how: {
    heading: "Tiešraidē mazāk kā 5 minūtēs",
    sub: "Četri īsi soļi. Bez instalēšanas, bez tehniskas konfigurācijas.",
    steps: [
      { n: "1", t: "Tips un nosaukums", d: "Izvēlies tipu un ievadi nosaukumu." },
      { n: "2", t: "Saglabāšana", d: "E-pasts vai pieteikšanās ar Google." },
      { n: "3", t: "Ēdienkarte", d: "Izveido pats vai skenē papīra." },
      { n: "4", t: "Gatavs", d: "Skaties, dalies un saņem pasūtījumus." },
    ],
  },
  pricing: {
    badge: "Nulle komisijas · Bez līgumiem",
    heading: "Viens plāns.", headingAccent: "Viss iekļauts.",
    sub: "QR ēdienkarte, pasūtījumi, AI tulkojums, restorāna vietne un rezervācijas. Viena vienkārša cena.",
    monthlyLabel: "Mēnesī", yearlyLabel: "Gadā", saveBadge: "Ietaupi 25%", perMonth: "mēnesī",
    billedAnnually: "Gada rēķins {total}", youSave: "Ietaupi {amount}",
    trust: { secure: "Droša maksa ar Stripe", noCommitment: "Bez saistībām", quick: "Aktīvs minūtēs", restaurants: "500+ restorāni" },
  },
  faq: {
    eyebrow: "Jautājumi?", heading: "Bieži uzdotie", headingAccent: "jautājumi.",
    sub: "Ko restorānu īpašnieki jautā pirms reģistrēšanās. Neredzi savu? Raksti uz WhatsApp — atbild īsti cilvēki.",
    whatsappCta: "Jautā WhatsApp", whatsappPrefill: "Sveiki, man ir jautājums par IQ Rest",
    items: [
      { q: "Ko ietver bezmaksas izmēģinājuma periods un kas notiek pēc?", a: "14 dienas pilna piekļuve, bez kartes. Pēc 14 dienām konts pauzē, ja nepievieno maksājuma metodi — mēs nekad neapmaksājam automātiski. Pievieno maksājumu vēlāk, lai atjauninātu. Atceltu ar vienu klikšķi." },
      { q: "Vai ņemat komisiju no pasūtījumiem?", a: "Nulli. Katrs pasūtījums no tavas QR ēdienkartes iet tieši tev — bez mūsu daļas, bez Wolt / Bolt Food maksām. Viena fiksēta mēneša cena, tas arī viss." },
      { q: "Vai viesiem vajag aplikāciju? Vai man vajag tehniskas prasmes?", a: "Bez aplikācijas viesiem — skenē QR ar kameru, ēdienkarte atveras pārlūkā. Bez tehniskām prasmēm tev — viss panelis darbojas telefonā, pieskaries, lai pievienotu, velc, lai pārkārtotu, tāda ir visa līkne." },
      { q: "Cik ātri varu mainīt cenas un pievienot ēdienus?", a: "Uzreiz. Maini cenu telefonā, viesi redz sekundēs. Jauns ēdiens? Pieskaries, raksti, foto, gatavs — bez atkārtotas drukas, bez gaidīšanas uz dizaineri." },
      { q: "Cik valodu atbalstāt?", a: "35 valodas ar iebūvētu AI tulkojumu. Viens pieskāriens iztulko visu ēdienkarti, AI saprot kulināro kontekstu — nosaukumi un apraksti skan dabiski katrā valodā. Tūristi pasūta vairāk, kad patiešām saprot." },
    ],
  },
  finalCta: { heading: "Gatavs 5 minūtēs.", headingAccent: "Bez maksas 14 dienas.", sub: "Bez kartes. Atceltu jebkurā brīdī. Pievienojies 500+ restorāniem jau IQ Rest." },
  scan: {
    heading: "Papīra ēdienkarte vai PDF?",
    headingAccent: "MI to digitalizē 60 sekundēs.",
    sub: "Augšupielādē — MI atpazīst kategorijas, ēdienus un cenas.",
    cta: "Skenēt ēdienkarti →",
  },
  footer: {
    featureLinks: [
      { href: "/lv/tiessaistes-pasutijumu-sistema-restoranam", label: "Tiešsaistes pasūtījumu sistēma" }, { href: "/lv/ai-translation", label: "AI tulkojums" },
      { href: "/lv/reservations", label: "Rezervācijas" }, { href: "/lv/mobile-management", label: "Mobilā pārvaldība" },
      { href: "/lv/easy-menu", label: "Ēdienkartes redaktors" }, { href: "/lv/custom-design", label: "Video un foto foni" },
      { href: "/lv/color-scheme", label: "Zīmola krāsas" }, { href: "/lv/multilingual", label: "Daudzvalodu vietne" },
      { href: "/lv/ai-images", label: "AI foto optimizācija" }, { href: "/lv/analytics", label: "Statistika" },
      { href: "/lv/instant-setup", label: "Tūlītēja iestatīšana" }, { href: "/lv/personal-support", label: "Personīgs atbalsts" },
    ],
    navLinks: [
      { href: "#pricing", label: "Cenas" }, { href: "#faq", label: "Jautājumi" },
      { href: "/lv/languages", label: "Mainīt valodu" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Visas tiesības rezervētas.",
  },
};
