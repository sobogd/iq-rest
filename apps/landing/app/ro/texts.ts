import { ScanLine, Languages, CalendarCheck, Palette, Smartphone, ChefHat } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "ro", htmlDir: "ltr",
  meta: {
    title: "Meniu QR pentru Restaurante — Comenzi Directe, Zero Comision | IQ Rest",
    description: "Gata cu meniurile pe hârtie și comisioanele aplicațiilor de livrare. Meniu QR, comenzi directe, rezervări și site multilingv. 14 zile gratis, fără card.",
    canonical: "https://iq-rest.com/ro", ogLocale: "ro_RO",
    ogTitle: "Meniu QR pentru Restaurante — Comenzi Directe, Zero Comision",
    ogDescription: "Meniu QR, comenzi directe, rezervări și traducere AI. Gata în 2 minute. 14 zile gratis — fără card.",
  },
  ctaText: "Începe gratis →",
  demoText: "Vezi demo live", microcopy: "14 zile gratis · Fără card · Anulezi când vrei",
  header: { navFeatures: "Funcții", navHow: "Cum funcționează", navPricing: "Prețuri", navFaq: "Întrebări", signIn: "Conectare", cta: "Începe gratis →" },
  hero: {
    verticals: ["Restaurante", "Cafenele", "Baruri", "Hoteluri", "Pizzerii"],
    variants: [
      { headline: "Nu mai imprima meniuri.", headlineAccent: "Nu mai plăti 30% aplicațiilor de livrare.", sub: "Meniu QR, comenzi directe, rezervări și site multilingv. Gata în 2 minute — fără card." },
      { headline: "Restaurantul tău merită mai mult decât", headlineAccent: "meniuri pe hârtie și apeluri pierdute.", sub: "Comenzi directe, actualizări instantanee și rezervări 24/7. Configurat în 2 minute." },
      { headline: "Un cod QR.", headlineAccent: "Zero comision. Adio hârtiei.", sub: "Meniu QR, comenzi online și rezervări — totul într-un loc. 14 zile gratis, fără card." },
      { headline: "Primește comenzi directe.", headlineAccent: "Sari peste comision.", sub: "Clienții scanează, comandă și plătesc — direct la tine, fără partea Glovo. Gata în 2 minute." },
      { headline: "Mai multe comenzi. Mai multe rezervări.", headlineAccent: "Fără hârtie, fără aplicații.", sub: "Meniu QR + rezervări + site multilingv pe pilot automat. 14 zile probă gratuită." },
      { headline: "Turiștii nu citesc meniul?", headlineAccent: "Rezolvat în 2 minute.", sub: "AI traduce tot meniul în 35 de limbi. Plus comenzi QR și rezervări incluse." },
      { headline: "De la meniu pe hârtie la cod QR,", headlineAccent: "înainte să se răcească espresso-ul.", sub: "Meniu QR, comenzi directe și rezervări 24/7. Gata în 2 minute — fără card." },
      { headline: "Meniu QR uimitor de simplu.", headlineAccent: "Tăcut puternic înăuntru.", sub: "Comenzi directe, traducere AI, rezervări și site web — totul cu un tap pe telefon." },
    ],
    painBullets: ["Fără tipărituri — schimbă prețuri instant", "Zero comision — comenzi direct la tine", "Fără apeluri pierdute — rezervări 24/7", "35 de limbi — nu mai pierzi niciun turist"],
    rating: "4,9 · peste 500 de restaurante în 30+ țări",
  },
  features: {
    heading: "Tot ce ai nevoie.", headingAccent: "Nimic în plus.",
    sub: "Făcut pentru restaurante. Folosit la masă.",
    items: [
      { Icon: ScanLine, title: "Păstrezi 100% din fiecare comandă", desc: "Clienții scanează, comandă și plătesc — direct la tine. Fără aplicații de descărcat, fără 30% comision livrare. Fiecare comandă ajunge în timp real cu numărul mesei în panou.", tag: "Comenzi directe" },
      { Icon: Languages, title: "Vinde turiștilor în limba lor", desc: "Un tap traduce tot meniul în 35 de limbi. AI prinde contextul culinar — clienții comandă mai mult când chiar înțeleg preparatul.", tag: "Traducere AI" },
      { Icon: CalendarCheck, title: "Nu mai pierzi rezervări la cuptor", desc: "Clienții rezervă 24/7, fără apeluri. Confirmare auto sau manuală, mementouri pe email — mai puține absențe, zero stres.", tag: "Rezervări" },
      { Icon: Palette, title: "De neuitat în 1 secundă", desc: "Pune un video din bucătărie sau o foto cu un fel ca fundal. Clienții se opresc din scroll. Brandul rămâne.", tag: "Design personalizat" },
      { Icon: Smartphone, title: "Modifică în secunde, nu în zile", desc: "Schimbă prețuri, schimbă fotografii, adaugă felul zilei — de pe telefon, între mese. Live pentru clienți instant. Niciodată reimprimări.", tag: "Editor meniu" },
      { Icon: ChefHat, title: "Servește mai rapid la fiecare tură", desc: "Comenzile zboară pe ecranul din bucătărie în momentul în care clientul confirmă. Zero hârtie, zero strigăte, zero comenzi pierdute — mai puține greșeli, servire mai rapidă, mai mulți clienți pe seară.", tag: "În curând" },
    ],
  },
  founder: {
    eyebrow: "Construit de un restaurator",
    quoteStart: "Cu soția mea am deschis o cafenea și am căutat săptămâni un sistem care să gestioneze comenzi online, rezervări și să arate modern. Tot ce am încercat era greoi, urât sau lipsea jumătate din funcții —",
    quoteAccent: "așa că l-am construit pe cel pe care l-am fi vrut.",
    sign: "Bogdan Sokolov · fondator, fost proprietar de cafenea",
    photoAlt: "Bogdan, fondatorul IQ Rest",
  },
  how: {
    heading: "Live în mai puțin de 2 minute",
    sub: "Patru pași scurți. Fără instalări, fără configurări tehnice.",
    steps: [
      { n: "1", t: "Înregistrează-te", d: "Email sau Google. Fără card. Gata în 10 secunde." },
      { n: "2", t: "Numele restaurantului", d: "Scrie numele. Apare sus pe meniu." },
      { n: "3", t: "Adaugă primul preparat", d: "Categorie, nume, preț, foto. Atât." },
      { n: "4", t: "Alege fundalul și printează QR", d: "Alege fundalul. Ia QR-ul. Lipește pe mese." },
    ],
  },
  pricing: {
    badge: "Zero comision · Fără contracte",
    heading: "Un singur plan.", headingAccent: "Tot inclus.",
    sub: "Meniu QR, comenzi, traducere AI, site restaurant și rezervări. Un preț simplu.",
    monthlyLabel: "Lunar", yearlyLabel: "Anual", saveBadge: "Economisești 25%", perMonth: "pe lună",
    billedAnnually: "Facturare anuală {total}", youSave: "Economisești {amount}",
    trust: { secure: "Plată sigură cu Stripe", noCommitment: "Fără angajamente", quick: "Activ în câteva minute", restaurants: "500+ restaurante" },
  },
  faq: {
    eyebrow: "Întrebări?", heading: "Întrebări", headingAccent: "frecvente.",
    sub: "Ce întreabă restauratorii înainte să se înscrie. Nu o vezi pe a ta? Scrie-ne pe WhatsApp — răspund oameni reali.",
    whatsappCta: "Întreabă pe WhatsApp", whatsappPrefill: "Salut, am o întrebare despre IQ Rest",
    items: [
      { q: "Ce include perioada de probă și ce se întâmplă după?", a: "14 zile acces complet, fără card. După 14 zile contul se pune pe pauză dacă nu adaugi metoda de plată — nu retragem niciodată automat. Adaugi mai târziu pentru reactivare. Anulezi cu un click." },
      { q: "Luați comision la comenzi?", a: "Zero. Fiecare comandă din meniul QR ajunge direct la tine — fără partea noastră, fără taxe Glovo / Tazz. Un singur preț lunar fix, atât." },
      { q: "Clienții au nevoie de aplicație? Eu am nevoie de cunoștințe tehnice?", a: "Zero aplicații pentru clienți — scanează QR cu camera, meniul se deschide în browser. Zero tehnică pentru tine — tot panoul merge pe telefon, tap pentru a adăuga, glisează pentru a reordona, atât." },
      { q: "Cât de repede schimb prețurile și adaug preparate?", a: "Instant. Schimbi prețul pe telefon, clienții văd în secunde. Preparat nou? Tap, scrii, foto, gata — fără reimprimări, fără să aștepți designerul." },
      { q: "Câte limbi suportați?", a: "35 de limbi cu traducere AI încorporată. Un tap traduce tot meniul, AI înțelege contextul culinar — numele și descrierile sună natural în fiecare limbă. Turiștii comandă mai mult când chiar înțeleg." },
    ],
  },
  finalCta: { heading: "Gata în 2 minute.", headingAccent: "Gratis 14 zile.", sub: "Fără card. Anulezi când vrei. Alătură-te celor 500+ restaurante deja pe IQ Rest." },
  footer: {
    featureLinks: [
      { href: "/ro/online-orders", label: "Comenzi online" }, { href: "/ro/ai-translation", label: "Traducere AI" },
      { href: "/ro/reservations", label: "Rezervări" }, { href: "/ro/mobile-management", label: "Gestiune mobilă" },
      { href: "/ro/easy-menu", label: "Editor de meniu" }, { href: "/ro/custom-design", label: "Fundal video și foto" },
      { href: "/ro/color-scheme", label: "Culori brand" }, { href: "/ro/multilingual", label: "Site multilingv" },
      { href: "/ro/ai-images", label: "Optimizare foto AI" }, { href: "/ro/analytics", label: "Analitică" },
      { href: "/ro/instant-setup", label: "Configurare instant" }, { href: "/ro/personal-support", label: "Suport personal" },
    ],
    navLinks: [
      { href: "#pricing", label: "Prețuri" }, { href: "#faq", label: "Întrebări" },
      { href: "/ro/languages", label: "Schimbă limba" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Toate drepturile rezervate.",
  },
};
