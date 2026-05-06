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
  ctaText: "Încearcă gratuit", ctaSite: "Creează site",
  demoText: "Vezi demo live", microcopy: "14 zile gratis · Fără card · Anulezi când vrei",
  header: { navFeatures: "Funcții", navHow: "Cum funcționează", navPricing: "Prețuri", navFaq: "Întrebări", signIn: "Conectare", cta: "Încearcă gratuit" },
  hero: {
    verticals: ["Restaurante", "Cafenele", "Baruri", "Hoteluri", "Pizzerii"],
    qr: { headline: "Meniu QR pentru restaurantul tău în 5 minute.", sub: "Comenzi directe, rezervări și 35 de limbi. Fără comisioane sau programatori." },
    web: { headline: "Site profesional pentru restaurant în 5 minute.", sub: "Comenzi directe, rezervări și 35 de limbi. Fără comisioane sau programatori." },
    painBullets: ["0% comision: Toate comenzile ajung direct la tine.", "Traducere AI: 35 de limbi pentru a crește consumul turiștilor.", "Rezervări 24/7: Sală plină fără apeluri inutile.", "Prețuri flexibile: Actualizează meniul în câteva secunde."],
    rating: "4,9 · peste 500 de restaurante în 30+ țări",
  },
  features: {
    heading: "Tot ce ai nevoie.", headingAccent: "Nimic în plus.",
    sub: "Făcut pentru restaurante. Folosit la masă.",
    items: [
      
      { Icon: ScanLine, title: "Comenzi de la masă", desc: "Comenzile ajung instant pe WhatsApp sau în panou cu numărul mesei. Servire mai rapidă.", tag: "Comenzi directe" },
      { Icon: Languages, title: "Traducător AI (35 de limbi)", desc: "AI-ul nostru înțelege gastronomia. Turiștii comandă cu 20% mai mult când înțeleg meniul.", tag: "Traducere AI" },
      { Icon: CalendarCheck, title: "Rezervare mese", desc: "Sistemul preia rezervările în timp ce ești în bucătărie. Niciun client pierdut.", tag: "Rezervări" },
      { Icon: Palette, title: "Design modern", desc: "Fundaluri video și fotografii apetisante. Meniul tău arată premium și atrage clienții.", tag: "Design personalizat" },
      { Icon: Smartphone, title: "Editor rapid", desc: "Gestionează stocurile și prețurile direct de pe telefon. Schimbările sunt live imediat.", tag: "Editor meniu" },
      { Icon: ChefHat, title: "În curând: Ecran bucătărie", desc: "Uită de bonurile de hârtie. Comenzile din sală merg direct pe ecranul bucătarului.", tag: "În curând" },
    
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
  scan: {
    heading: "Meniu pe hârtie sau PDF?",
    headingAccent: "AI îl digitizează în 60 de secunde.",
    sub: "Încarcă — AI extrage categorii, produse și prețuri.",
    cta: "Scanează meniul →",
  },
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
