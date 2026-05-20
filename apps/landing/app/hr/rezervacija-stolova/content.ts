import { CalendarPlus, CalendarDays } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "hr",
  slug: "rezervacija-stolova",
  trackPrefix: "l_hr_bookings",

  meta: {
    title: "Rezervacija stolova 24/7 za restorane | IQ Rest",
    description:
      "Rezervacija stolova 24/7 za restorane: gosti sami rezerviraju putem QR jelovnika ili web-stranice. Kalendar po stolu, automatske potvrde i podsjetnici. Niti jedan propušten gost. 14 dana besplatno.",
    canonical: "https://iq-rest.com/hr/rezervacija-stolova",
    ogLocale: "hr_HR",
    ogTitle: "Rezervacija stolova 24/7 — gosti sami rezerviraju",
    ogDescription:
      "Gosti rezerviraju stolove putem QR jelovnika ili web-stranice. Kalendar, automatske potvrde, podsjetnici. Niti jedan propušten gost.",
    brandLine: "IQ Rest — Rezervacija stolova za restorane",
  },

  hero: {
    headline: "Rezervacija stolova 24/7 — gosti sami rezerviraju.",
    sub: "Gosti rezerviraju stolove putem QR jelovnika ili izravnog linka. Kalendar po stolu, automatske potvrde i podsjetnici. Niti jedan propušten gost i bez poziva u špici.",
    imageSrc: "/landing/feature-reservation.webp",
    imageAlt: "Domaćica upravlja rezervacijama s tableta na ulazu u restoran",
  },

  scan: {
    heading: "Pokrenite rezervaciju stolova",
    headingAccent: "za 5 minuta.",
    sub: "Povežite kalendar, dodajte stolove s fotografijama i kapacitetom — gosti počinju rezervirati isti dan.",
    cta: "Aktiviraj rezervaciju",
  },

  subFeatures: [
    {
      icon: CalendarPlus,
      eyebrow: "Obrazac za rezervaciju",
      heading: "Gosti sami rezerviraju — prema datumu, vremenu i broju osoba.",
      body: "Gost otvara QR jelovnik ili izravan link, bira datum, vrijeme i broj osoba — i odmah vidi dostupne stolove, svaki s fotografijom, opisom (terasa, kraj prozora, kauč pored šanka) i kapacitetom. Potvrda se automatski šalje e-mailom i WhatsAppom.",
      bullets: [
        "Odabir stola po fotografiji, opisu i kapacitetu.",
        "Automatska potvrda i podsjetnik sat vremena prije posjeta.",
        "Minimalna polja u obrascu: ime, telefon, broj osoba.",
      ],
      image: { src: "/landing/feature-booking-form.webp", alt: "Gost rezervira restoranski stol s telefona: datum, vrijeme, broj osoba i odabir stola" },
    },
    {
      icon: CalendarDays,
      eyebrow: "Kalendar rezervacija",
      heading: "Kalendar po danu i stolu — sve jednim pogledom.",
      body: "Admin panel prikazuje kalendar rezervacija raspoređen po stolu, danu, tjednu i mjesecu. Slobodni termini, zauzeti stolovi, potvrđene i nepotvrđene rezervacije na jednom zaslonu. Radi na tabletu u sali i na laptopu u uredu.",
      bullets: [
        "Prikazi dana, tjedna i mjeseca.",
        "Raspored po stolu: tko, kada, koliko gostiju.",
        "Premještanje, otkazivanje ili potvrda rezervacije jednim dodirom s telefona.",
      ],
      image: { src: "/landing/feature-booking-calendar.webp", alt: "Kalendar rezervacija u admin panelu IQ Rest na dva tableta: dnevni Gantt po stolovima i mjesečni prikaz" },
    },
  ],

  faq: {
    sub: "Što restoratori pitaju o rezervaciji stolova u IQ Restu. Ne nalazite svoje pitanje? Pišite nam na WhatsApp.",
    items: [
      { q: "Mogu li odabrati u koje dane i sate je dostupna rezervacija?", a: "Da. Admin panel omogućuje postavljanje radnog vremena i dostupnih dana u tjednu — sustav neće prikazivati nedostupne termine gostima. Možete zatvoriti određeni datum (korporativni događaj, privatna rezervacija) ili privremeno isključiti cijeli kalendar." },
      { q: "Mogu li učitati fotografiju za svaki stol?", a: "Da. Svaki stol može imati fotografiju, opis (terasa, kraj prozora, kauč pored šanka) i kapacitet. Gost vidi točan stol koji rezervira i donosi informiranu odluku — to smanjuje neispunjena očekivanja." },
      { q: "Mogu li isključiti rezervacije na određene datume?", a: "Da. Kalendar omogućuje zatvaranje određenih datuma (praznici, privatni događaji, renovacija) ili cijelih dana u tjednu. Na te datume gosti vide poruku „rezervacija privremeno nedostupna“." },
      { q: "Mogu li prilagoditi koja se polja prikupljaju od gosta?", a: "Da. Zadani skup: ime, telefon, e-mail, broj osoba. Možete dodati prilagođena polja (povod, alergije, posebni zahtjevi) ili ukloniti nepotrebna kako bi obrazac bio što kraći." },
      { q: "Mogu li ograničiti broj gostiju po stolu?", a: "Da. Svaki stol ima postavku „kapacitet“ — sustav neće dopustiti rezervaciju stola za 2 za 6 osoba. Na većim stolovima možete postaviti minimum kako male grupe ne bi zauzimale „stol za osam“ većim društvima." },
      { q: "Koliko je teško postavljanje rezervacije?", a: "Traje vrlo malo vremena. Tri koraka: (1) dodajte stolove s nazivima, fotografijama i kapacitetom, (2) aktivirajte način rezervacije u postavkama, (3) podijelite link ili QR kod s gostima. Potpuno pokretanje za 5–10 minuta." },
      { q: "Mogu li koristiti sustav rezervacija na vlastitoj domeni?", a: "Da. Podržavamo prilagođenu domenu s SSL certifikatom: gosti rezerviraju na adresi vašeg restorana (npr. rezervacija.vasrestoran.hr). Pomažemo s postavljanjem DNS-a; postupak traje 5–10 minuta." },
      { q: "Mogu li konfigurirati automatsku ili ručnu potvrdu?", a: "Da, način se postavlja u postavkama. S automatskom potvrdom gost dobiva potvrdu odmah nakon slanja obrasca i rezervacija se smatra prihvaćenom. S ručnom potvrdom zahtjev stiže u admin panel sa statusom „čeka potvrdu“ — voditelj ga pregleda i potvrđuje ili odbija. Ručni način koristan je kod ograničenog broja stolova ili strogih politika gostiju." },
      { q: "Uzimate li proviziju na rezervacije?", a: "Ne. Rezervacija stolova u potpunosti je uključena u Pro paket — bez postotka na goste, bez naknade po terminu, bez provizija agregatora. Fiksna mjesečna naknada i neograničene rezervacije." },
    ],
  },
};
