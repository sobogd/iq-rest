import { CalendarPlus, CalendarDays } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "sr",
  slug: "rezervacija-stolova",
  trackPrefix: "l_sr_bookings",

  meta: {
    title: "Rezervacija stolova 24/7 za restorane | IQ Rest",
    description:
      "Rezervacija stolova 24/7 za restorane: gosti sami rezervišu preko QR menija ili sajta. Kalendar po stolu, automatske potvrde i podsetnici. Nijedan izgubljen gost. 14 dana besplatno.",
    canonical: "https://iq-rest.com/sr/rezervacija-stolova",
    ogLocale: "sr_RS",
    ogTitle: "Rezervacija stolova 24/7 — gosti rezervišu sami",
    ogDescription:
      "Gosti rezervišu stolove preko QR menija ili sajta. Kalendar, automatske potvrde, podsetnici. Nijedan izgubljen gost.",
    brandLine: "IQ Rest — Rezervacija stolova za restorane",
  },

  hero: {
    headline: "Rezervacija stolova 24/7 — gosti rezervišu sami.",
    cta: "Подеси резервације столова",
    sub: "Gosti rezervišu stolove preko QR menija ili direktnog linka. Kalendar po stolu, automatske potvrde i podsetnici. Nijedan izgubljen gost i bez poziva u vrhuncu.",
    imageSrc: "/landing/feature-reservation.webp",
    imageAlt: "Domaćica upravlja rezervacijama sa tableta na ulazu u restoran",
  },

  scan: {
    heading: "Pokrenite rezervaciju stolova",
    headingAccent: "za 5 minuta.",
    sub: "Povežite kalendar, dodajte stolove sa fotografijama i kapacitetom — gosti počinju da rezervišu istog dana.",
    cta: "Aktiviraj rezervaciju",
  },

  subFeatures: [
    {
      icon: CalendarPlus,
      eyebrow: "Obrazac za rezervaciju",
      heading: "Gosti sami rezervišu — po datumu, vremenu i broju osoba.",
      body: "Gost otvara QR meni ili direktan link, bira datum, vreme i broj osoba — i odmah vidi dostupne stolove, svaki sa fotografijom, opisom (terasa, kraj prozora, kauč pored bara) i kapacitetom. Potvrda se šalje automatski e-mailom i preko WhatsApp.",
      bullets: [
        "Izbor stola po fotografiji, opisu i kapacitetu.",
        "Automatska potvrda i podsetnik sat vremena pre posete.",
        "Minimalna polja u obrascu: ime, telefon, broj osoba.",
      ],
      image: { src: "/landing/feature-booking-form.webp", alt: "Gost rezerviše sto u restoranu sa telefona: datum, vreme, broj osoba i izbor stola" },
    },
    {
      icon: CalendarDays,
      eyebrow: "Kalendar rezervacija",
      heading: "Kalendar po danu i stolu — sve jednim pogledom.",
      body: "Administrativni panel prikazuje kalendar rezervacija razdvojen po stolu, danu, sedmici i mesecu. Slobodni termini, zauzeti stolovi, potvrđene i nepotvrđene rezervacije na jednom ekranu. Radi na tabletu u sali i na laptopu u kancelariji.",
      bullets: [
        "Prikazi dana, sedmice i meseca.",
        "Razdvajanje po stolu: ko, kada, koliko gostiju.",
        "Premeštanje, otkazivanje ili potvrda rezervacije jednim dodirom sa telefona.",
      ],
      image: { src: "/landing/feature-booking-calendar.webp", alt: "Kalendar rezervacija u administrativnom panelu IQ Rest na dva tableta: dnevni Gantt po stolovima i mesečni prikaz" },
    },
  ],

  faq: {
    sub: "Šta restorateri pitaju o rezervaciji stolova u IQ Rest. Ne nalazite svoje pitanje? Pišite nam na WhatsApp.",
    items: [
      { q: "Mogu li izabrati u koje dane i sate je dostupna rezervacija?", a: "Da. Administrativni panel omogućava postavljanje radnog vremena i dostupnih dana u sedmici — sistem neće prikazivati nedostupne termine gostima. Možete zatvoriti određeni datum (korporativni događaj, privatna rezervacija) ili privremeno isključiti ceo kalendar." },
      { q: "Mogu li otpremiti fotografiju za svaki sto?", a: "Da. Svaki sto može imati fotografiju, opis (terasa, kraj prozora, kauč pored bara) i kapacitet. Gost vidi tačan sto koji rezerviše i donosi informisanu odluku — to smanjuje neispunjena očekivanja." },
      { q: "Mogu li onemogućiti rezervacije na određene datume?", a: "Da. Kalendar omogućava zatvaranje određenih datuma (praznici, privatni događaji, renoviranje) ili celih dana u sedmici. Na ovim datumima gosti vide poruku „rezervacija privremeno nedostupna“." },
      { q: "Mogu li prilagoditi koja polja se prikupljaju od gosta?", a: "Da. Podrazumevan skup: ime, telefon, e-mail, broj osoba. Možete dodati prilagođena polja (povod, alergije, posebne zahteve) ili ukloniti nepotrebne kako bi obrazac bio što kraći." },
      { q: "Mogu li ograničiti broj gostiju po stolu?", a: "Da. Svaki sto ima podešavanje „kapacitet“ — sistem neće dozvoliti rezervaciju stola za 2 osobe za 6. Na većim stolovima možete postaviti minimum da male grupe ne zauzimaju „sto za osam“ od većih društava." },
      { q: "Koliko je teško podešavanje rezervacije?", a: "Traje veoma kratko. Tri koraka: (1) dodajte stolove sa imenima, fotografijama i kapacitetom, (2) aktivirajte režim rezervacije u podešavanjima, (3) podelite link ili QR kod sa gostima. Potpuno pokretanje za 5–10 minuta." },
      { q: "Mogu li koristiti sistem rezervacija na sopstvenom domenu?", a: "Da. Podržavamo prilagođeni domen sa SSL sertifikatom: gosti rezervišu na adresi vašeg restorana (npr. rezervacija.vasrestoran.rs). Pomažemo sa podešavanjem DNS-a; proces traje 5–10 minuta." },
      { q: "Mogu li konfigurisati automatsku ili ručnu potvrdu?", a: "Da, režim se postavlja u podešavanjima. Sa automatskom potvrdom gost dobija potvrdu odmah nakon slanja obrasca i rezervacija se smatra prihvaćenom. Sa ručnom potvrdom zahtev stiže u administrativni panel sa statusom „čeka potvrdu“ — menadžer ga pregleda i potvrđuje ili odbija. Ručni režim je koristan kod ograničenog broja stolova ili strogih politika za goste." },
      { q: "Da li uzimate proviziju od rezervacija?", a: "Ne. Rezervacija stolova je u potpunosti uključena u paket Pro — bez procenta od gostiju, bez naknade po terminu, bez provizija agregatora. Fiksna mesečna naknada i neograničene rezervacije." },
    ],
  },
};
