import { CalendarCheck, ChefHat, Receipt, Monitor } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "ro",
  htmlDir: "ltr",

  meta: {
    title: "Meniu QR pentru restaurante — Comenzi directe, zero comision | IQ Rest",
    description:
      "Platformă all-in-one pentru restaurante: meniu digital, comenzi QR, rezervare mese și display bucătărie. Lansare în 5 minute. 14 zile gratuit, fără card.",
    canonical: "https://iq-rest.com/ro",
    ogLocale: "ro_RO",
    ogTitle: "Meniu QR pentru restaurante — Comenzi directe, zero comision",
    ogDescription:
      "Meniu digital, comenzi QR, rezervare mese și traducere AI. Lansare în 5 minute. 14 zile gratuit.",
  },

  ctaText: "Începe gratuit",
  homeCtaText: "Creează-ți platforma",
  demoText: "Vizionați demo",
  microcopy: "14 zile gratuit · Fără card · Anulați oricând",

  header: {
    navFeatures: "Funcționalități",
    navHow: "Cum funcționează",
    navPricing: "Prețuri",
    navFaq: "Întrebări",
    signIn: "Autentificare",
    cta: "Începe gratuit",
  },

  hero: {
    verticals: ["Restaurante", "Cafenele", "Baruri", "Hoteluri", "Pizzerii"],
    headline: "Meniu digital pentru restaurant. Online în 5 minute.",
    sub: "Meniu digital pentru restaurantul dumneavoastră în 5 minute. Totul inclus: editor fără cod, recunoaștere AI a meniului tipărit, coduri QR pentru mese și comenzi directe fără comision.",
    dynamicHeadlines: ["0% comision.", "35 limbi AI.", "Comenzi online.", "Rezervări 24/7.", "Design premium."],
    painBullets: [
      "0% comision: fiecare comandă ajunge direct la restaurantul dumneavoastră.",
      "Traducere AI în 35 de limbi — turiștii înțeleg meniul și comandă mai mult.",
      "Rezervare 24/7: oaspeții își rezervă singuri mesele, fără apeluri în orele de vârf.",
      "Prețuri flexibile: actualizările meniului apar în câteva secunde.",
    ],
    rating: "Peste 500 de restaurante în peste 30 de țări",
  },

  features: {
    heading: "Tot ce aveți nevoie.",
    headingAccent: "Nimic în plus.",
    sub: "Construit pentru restaurante. Folosit zilnic la masă, în bucătărie și în sală.",
    items: [
      { Icon: Monitor, title: "Meniu digital", desc: "Meniu în browser cu fotografii, prețuri, alergeni și descrieri. Se actualizează în timp real de pe telefon. Oaspeții văd meniul în limba lor; restaurantul economisește la tipărire.", tag: "Meniu digital", href: "/ro/meniu-digital-restaurant" },
      { Icon: Receipt, title: "Preluare comenzi: oaspete și ospătar", desc: "Cod QR la masă pentru oaspete sau ospătarul preia comanda de pe telefon — ambele ajung direct la bucătărie sau pe WhatsApp. Fără comision, cu numărul mesei pe fiecare bon.", tag: "Comenzi", href: "/ro/sistem-comenzi-restaurant" },
      { Icon: CalendarCheck, title: "Rezervare mese 24/7", desc: "Oaspeții își rezervă singuri mesele prin site sau meniul QR în timp ce sunteți ocupat în sală. Calendar pe masă, confirmări și mementouri automate. Niciun oaspete pierdut.", tag: "Rezervare", href: "/ro/rezervare-mese" },
      { Icon: ChefHat, title: "Display bucătărie (KDS)", desc: "Bonurile de hârtie nu mai sunt necesare. Comenzile din sală ajung direct pe ecranul bucătarului — coloane „în pregătire / gata / servit“, alergenii și notițele evidențiate cu culoare. Pe tabletă sau telefon.", tag: "KDS", href: "/ro/display-bucatarie" },
    ],
  },

  founder: {
    eyebrow: "Construit de restauratori",
    quoteStart:
      "Cu soția mea am condus propria noastră cafenea și știm din experiență directă cum decurge o zi de restaurant — preluare comenzi, rezervări, fluxul sălii și al bucătăriei. Am dorit un singur instrument: modern, ușor de pornit și clar la prima vedere —",
    quoteAccent: "așa am început să construim platforma pe care o dezvoltăm acum pentru alți restauratori.",
    sign: "Bogdan Sokolov · fondator, fost proprietar de cafenea",
    photoAlt: "Bogdan Sokolov, fondator IQ Rest",
  },

  how: {
    heading: "Online în 5 minute",
    sub: "Patru pași scurți. Fără instalări, fără configurare tehnică.",
    steps: [
      { n: "1", t: "Tip și nume", d: "Alegeți tipul localului și introduceți numele." },
      { n: "2", t: "Salvați", d: "Introduceți e-mailul sau autentificați-vă cu Google." },
      { n: "3", t: "Meniu", d: "Adăugați articolele manual sau încărcați un meniu tipărit pentru scanare AI." },
      { n: "4", t: "Gata", d: "Distribuiți un link sau cod QR și începeți să primiți comenzi." },
    ],
  },

  pricing: {
    badge: "Fără comision · Fără contracte",
    heading: "Un singur plan.",
    headingAccent: "Totul inclus.",
    sub: "Meniu QR, preluare comenzi, traducere AI, site-ul restaurantului și rezervare. O singură taxă lunară transparentă.",
    monthlyLabel: "Lunar",
    yearlyLabel: "Anual",
    saveBadge: "Economisiți 25%",
    perMonth: "pe lună",
    billedAnnually: "Facturare anuală: {total}",
    youSave: "Economisiți {amount}",
    trust: { secure: "Plată sigură prin Stripe", noCommitment: "Fără angajament", quick: "Activ în câteva minute", restaurants: "500+ restaurante" },
  },

  faq: {
    eyebrow: "Aveți întrebări?",
    heading: "Întrebări",
    headingAccent: "frecvente.",
    sub: "Ce întreabă restauratorii înainte de înregistrare. Nu găsiți întrebarea dumneavoastră? Scrieți-ne pe WhatsApp — răspund oameni reali, nu un bot.",
    whatsappCta: "Întrebați pe WhatsApp",
    whatsappPrefill: "Bună ziua, am o întrebare despre IQ Rest",
    items: [
      { q: "Ce include perioada de probă și ce se întâmplă după?", a: "Acces complet la toate funcționalitățile timp de 14 zile, fără card. După 14 zile contul este suspendat dacă nu este adăugată o metodă de plată — nu percepem niciodată automat. Puteți adăuga plata mai târziu și continua de unde ați rămas. Anulați oricând cu un singur click." },
      { q: "Percepeți comision la comenzi?", a: "Nu. Fiecare comandă din meniul QR ajunge direct la restaurant — fără procente de la noi, fără comisioane de agregatori. O singură taxă lunară fixă și nimic altceva." },
      { q: "Oaspeții au nevoie de o aplicație, noi avem nevoie de abilități tehnice?", a: "Oaspeții nu au nevoie de aplicație — îndreaptă camera telefonului spre codul QR și meniul se deschide în browser. Nici restaurantele nu au nevoie de abilități tehnice: panoul de administrare rulează în orice browser modern pe telefon, tabletă sau laptop. Fiecare acțiune se face prin click și tragere, fără cod." },
      { q: "Cât de rapid se schimbă prețurile și apar preparate noi?", a: "Imediat. Schimbați un preț de pe telefon — oaspeții îl văd în câteva secunde. Un preparat nou necesită câteva atingeri: nume, preț, fotografie. Fără retipărire, fără așteptarea unui designer." },
      { q: "Câte limbi sunt suportate?", a: "35 de limbi cu traducere AI integrată. O atingere și întregul meniu este tradus; AI înțelege contextul culinar — numele și descrierile sună natural în orice limbă. Turiștii comandă cu mai multă încredere când înțeleg cu adevărat meniul." },
    ],
  },

  finalCta: {
    heading: "Online în 5 minute.",
    headingAccent: "14 zile gratuit.",
    sub: "Fără card, anulați oricând. Alăturați-vă la peste 500 de restaurante care folosesc deja IQ Rest.",
  },

  scan: {
    heading: "Aveți un meniu pe hârtie sau PDF?",
    headingAccent: "AI îl digitalizează în 60 de secunde.",
    sub: "Încărcați o fotografie sau un document — AI recunoaște categoriile, preparatele și prețurile automat.",
    cta: "Scanează meniu →",
  },

  pricingHero: {
    chips: ["Fără comision", "Fără contracte", "14 zile gratuit"],
    heading: "Prețuri.",
    headingAccent: "Fără costuri ascunse.",
    sub: "O singură taxă lunară transparentă. Fără procent din comenzi și fără comisioane de agregatori. Anulați abonamentul oricând.",
    popularBadge: "Popular",
    perMonthSuffix: "/lună",
    whenAnnualTemplate: "facturare anuală · {total} € pe an",
    orMonthlyTemplate: "sau {price} €/lună",
    savingsTemplate: "economisiți {amount} € pe an",
    plans: {
      basic: {
        name: "Basic",
        tagline: "Meniu, comenzi QR și traducere AI. Online în 5 minute.",
        features: [
          "Meniu QR pentru fiecare masă",
          "Meniu digital cu fotografii și alergeni",
          "Traducere AI în 35 de limbi",
          "Comenzi din meniu (opțional)",
          "Generare AI de fotografii ale preparatelor",
          "Gestionare de pe orice telefon sau tabletă",
        ],
      },
      pro: {
        name: "Pro",
        tagline: "Control complet al restaurantului: display bucătărie și rezervări.",
        features: [
          "Tot din Basic",
          "Display bucătărie (KDS)",
          "Rezervare mese online 24/7",
          "Suport WhatsApp prioritar",
        ],
      },
    },
  },

  footer: {
    featureLinks: [
      { href: "/ro/meniu-digital-restaurant", label: "Meniu digital" },
      { href: "/ro/sistem-comenzi-restaurant", label: "Comenzi" },
      { href: "/ro/rezervare-mese", label: "Rezervare" },
      { href: "/ro/display-bucatarie", label: "Display bucătărie" },
    ],
    navLinks: [
      { href: "/ro/preturi", label: "Prețuri" },
      { href: "#faq", label: "Întrebări" },
      { href: "/ro/languages", label: "Schimbă limba" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Toate drepturile rezervate.",
  },
};
