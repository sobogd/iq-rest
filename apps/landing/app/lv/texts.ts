import { ScanLine, Languages, CalendarCheck, Palette, Smartphone, ChefHat } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "lv", htmlDir: "ltr",
  meta: {
    title: "QR Ēdienkarte Restorāniem — Tiešie Pasūtījumi, Nulle Komisijas | IQ Rest",
    description: "Nē papīra ēdienkartēm un piegādes lietotņu komisijām. QR ēdienkarte, tiešie pasūtījumi, rezervācijas un daudzvalodu vietne. 14 dienas bez maksas, bez kartes.",
    canonical: "https://iq-rest.com/lv", ogLocale: "lv_LV",
    ogTitle: "QR Ēdienkarte Restorāniem — Tiešie Pasūtījumi, Nulle Komisijas",
    ogDescription: "QR ēdienkarte, tiešie pasūtījumi, rezervācijas un AI tulkojums. Gatavs 2 minūtēs. 14 dienas bez maksas — bez kartes.",
  },
  ctaText: "Sāc bez maksas →",
  demoText: "Skatīt demo", microcopy: "14 dienas bez maksas · Bez kartes · Atcelties jebkurā brīdī",
  header: { navFeatures: "Funkcijas", navHow: "Kā tas darbojas", navPricing: "Cenas", navFaq: "FAQ", signIn: "Pieslēgties", cta: "Sāc bez maksas →" },
  hero: {
    verticals: ["Restorāni", "Kafejnīcas", "Bāri", "Viesnīcas", "Picērijas"],
    variants: [
      { headline: "Beidz drukāt ēdienkartes.", headlineAccent: "Beidz dot 30% piegādes lietotnēm.", sub: "QR ēdienkarte, tiešie pasūtījumi, rezervācijas un daudzvalodu vietne. Gatavs 2 minūtēs — bez kartes." },
      { headline: "Tavs restorāns ir pelnījis vairāk nekā", headlineAccent: "papīra ēdienkartes un nokavētus zvanus.", sub: "Tiešie pasūtījumi, momentāni atjauninājumi un rezervācijas 24/7. Iestatīts 2 minūtēs." },
      { headline: "Viens QR kods.", headlineAccent: "Nulle komisijas. Ardievu papīram.", sub: "QR ēdienkarte, tiešsaistes pasūtījumi un rezervācijas — viss vienā vietā. 14 dienas bez maksas, bez kartes." },
      { headline: "Saņem tiešos pasūtījumus.", headlineAccent: "Izlaid komisiju.", sub: "Viesi skenē, pasūta un maksā — tieši tev, bez Wolt daļas. Gatavs 2 minūtēs." },
      { headline: "Vairāk pasūtījumu. Vairāk rezervāciju.", headlineAccent: "Bez papīra, bez lietotnēm.", sub: "QR ēdienkarte + rezervācijas + daudzvalodu vietne autopilotā. 14 dienu bezmaksas izmēģinājums." },
      { headline: "Tūristi nesaprot ēdienkarti?", headlineAccent: "Atrisināts 2 minūtēs.", sub: "AI tulko visu ēdienkarti 35 valodās. Plus QR pasūtījumi un rezervācijas iekļauti." },
      { headline: "No papīra ēdienkartes uz QR kodu,", headlineAccent: "pirms espreso atdziest.", sub: "QR ēdienkarte, tiešie pasūtījumi un rezervācijas 24/7. Gatavs 2 minūtēs — bez kartes." },
      { headline: "Atspirdzinoši vienkārša QR ēdienkarte.", headlineAccent: "Klusi spēcīga iekšpusē.", sub: "Tiešie pasūtījumi, AI tulkojums, rezervācijas un vietne — viss ar vienu pieskārienu telefonā." },
    ],
    painBullets: ["Bez drukas — maini cenas tūlīt", "Nulle komisijas — pasūtījumi tieši tev", "Bez nokavētiem zvaniem — rezervācijas 24/7", "35 valodas — nezaudē tūristu"],
    rating: "4,9 · vairāk nekā 500 restorānu 30+ valstīs",
  },
  features: {
    heading: "Viss, kas tev vajadzīgs.", headingAccent: "Nekā lieka.",
    sub: "Veidots restorāniem. Lietots pie galda.",
    items: [
      { Icon: ScanLine, title: "Paturi 100% no katra pasūtījuma", desc: "Viesi skenē, pasūta un maksā — tieši tev. Bez lietotņu lejupielādes, bez 30% piegādes. Katrs pasūtījums nonāk reālajā laikā ar galda numuru panelī.", tag: "Tiešie pasūtījumi" },
      { Icon: Languages, title: "Pārdod tūristiem viņu valodā", desc: "Viens pieskāriens iztulko visu ēdienkarti 35 valodās. AI saprot kulināro kontekstu — viesi pasūta vairāk, kad patiešām saprot ēdienu.", tag: "AI tulkojums" },
      { Icon: CalendarCheck, title: "Nezaudē rezervācijas, kamēr gatavo", desc: "Viesi rezervē 24/7, bez zvaniem. Auto vai manuāla apstiprināšana, e-pasta atgādinājumi — mazāk neierašanos, nulle stresa.", tag: "Rezervācijas" },
      { Icon: Palette, title: "Neaizmirstams 1 sekundē", desc: "Ievieto virtuves video vai ēdiena foto kā ēdienkartes fonu. Viesi pārstāj ritināt. Tavs zīmols paliek.", tag: "Pielāgots dizains" },
      { Icon: Smartphone, title: "Maini sekundēs, ne dienās", desc: "Cenas, fotogrāfijas, dienas piedāvājums — no telefona, starp galdiem. Tiešsaistē viesiem uzreiz. Nekad vairs druka.", tag: "Ēdienkartes redaktors" },
      { Icon: ChefHat, title: "Apkalpo ātrāk katrā maiņā", desc: "Pasūtījumi nonāk virtuves ekrānā brīdī, kad viesis apstiprina. Nulle papīra, nulle kliegšanas, nulle pazaudētu pasūtījumu — mazāk kļūdu, ātrāka apkalpošana, vairāk apmeklētāju vakarā.", tag: "Drīzumā" },
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
    heading: "Tiešraidē mazāk kā 2 minūtēs",
    sub: "Četri īsi soļi. Bez instalēšanas, bez tehniskas konfigurācijas.",
    steps: [
      { n: "1", t: "Reģistrējies", d: "E-pasts vai Google. Bez kartes. Gatavs 10 sekundēs." },
      { n: "2", t: "Restorāna nosaukums", d: "Vienkārši ievadi nosaukumu. Parādās ēdienkartes augšpusē." },
      { n: "3", t: "Pievieno pirmo ēdienu", d: "Kategorija, nosaukums, cena, foto. Tas arī viss." },
      { n: "4", t: "Izvēlies fonu un izdrukā QR", d: "Izvēlies fonu. Paņem QR. Pielīmē uz galdiem." },
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
  finalCta: { heading: "Gatavs 2 minūtēs.", headingAccent: "Bez maksas 14 dienas.", sub: "Bez kartes. Atceltu jebkurā brīdī. Pievienojies 500+ restorāniem jau IQ Rest." },
  footer: {
    featureLinks: [
      { href: "/lv/online-orders", label: "Tiešsaistes pasūtījumi" }, { href: "/lv/ai-translation", label: "AI tulkojums" },
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
