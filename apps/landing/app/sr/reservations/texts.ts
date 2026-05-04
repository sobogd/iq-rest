import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Sistem rezervacija za restoran — 24/7 rezervacije stolova, bez telefonskih poziva",
    description:
      "Primajte rezervacije stolova restorana 24/7 sa svog QR menija i sajta. Beli-label vidžet za rezervacije, email podsetnici, manje neodzivanja. 14-dnevna besplatna proba.",
    canonical: "https://iq-rest.com/sr/reservations",
    ogLocale: "sr_RS",
    ogTitle: "Restoranske rezervacije — sistem rezervacija stolova 24/7 za restorane",
    ogDescription:
      "Prestanite propuštati rezervacije dok kuvate. Gosti rezervišu 24/7 sa vašeg QR menija, dobijaju email podsetnike, a vi smanjujete neodzivanja. 14-dnevna besplatna proba.",
  },

  hero: {
    title: "Prestanite propuštati rezervacije dok kuvate.",
    subtitle:
      "Primajte rezervacije stolova restorana 24/7 — direktno sa svog QR menija, sajta i Instagrama. Gosti biraju datum, vreme i broj osoba, vi potvrđujete jednim tapom, email podsetnici idu automatski. Manje telefonskih poziva, manje neodzivanja, više pokrivanja po večeri.",
    trustLine: "4.9 · 500+ restorana u 30+ zemalja",
  },

  seo: {
    description:
      "Kompletan sistem rezervacija za restorane ugrađen u vaš QR meni. Gosti rezervišu sto sa vašeg menija, sajta, link u biografiji Instagrama ili Google Maps dugmeta — bilo kad, danju ili noću. Vidite nove rezervacije u realnom vremenu, potvrđujete ili odbijate jednim tapom, a sistem šalje email podsetnike koji drastično smanjuju neodzivanja. Bez OpenTable isečka, bez provizije po pokrivanju, bez ugovora.",
    fullDescription:
      "Telefonske rezervacije izumiru. Turisti neće zvati (drugačiji pozivni broj, jezička barijera), milenijalci neće zvati (generacija koja prvo piše poruke), a vi gubite polovinu rezervacija tokom servisa kada niko ne diže slušalicu. IQ Rest rezervacije žive tamo gde su vaši gosti već: na vašem meniju, u pretraživaču njihovog telefona, na link biografije Instagrama.\n\nTok rezervacije su dva ekrana — izaberite datum i broj osoba, ostavite ime i telefon, opciono dodajte napomenu ('rođendan', 'alergija: orašasti plodovi', 'visoka stolica molim'). Rezervaciju primate odmah sa potvrdom/odbijanjem jednim tapom. Potvrđeni gosti dobijaju automatski email podsetnik 24h pre, što samo po sebi smanjuje neodzivanja za ~30%. Možete takođe postaviti maksimalan broj osoba po terminu, dane bez rezervacija i koji su stolovi rezervabilni naspram samo za gostujuće.\n\nZa razliku od OpenTable ili TheFork, nema provizije po pokrivanju, nema zasebne aplikacije za preuzimanje, i nema treće strane između vas i gosta. Rezervacija je vaša, podaci su vaši, a sistem je deo vaše pretplate — ne porez po rezervaciji.",
    benefitsHeading: "Zašto restorani napuštaju OpenTable za IQ Rest rezervacije",
    benefits: [
      "24/7 rezervacije sa QR menija, sajta, Instagrama, Google Maps dugmeta",
      "Bez provizije po pokrivanju — fiksna pretplata, zadržite 100% prihoda",
      "Automatski email podsetnici smanjuju neodzivanja za ~30% u proseku",
      "Potvrda/odbijanje jednim tapom sa telefona, bez čekaonice",
      "Maks-pokrivanja-po-terminu, dani bez rezervacija, pravila rezervacija na nivou stola",
      "Posebni zahtevi (alergije, rođendani) uhvaćeni čisto sa svakom rezervacijom",
    ],
  },

  pricing: {
    heading: "Jedan paket.",
    headingAccent: "Neograničene rezervacije.",
    sub: "Rezervacije, QR meni, onlajn poručivanje i AI prevod — sve u jednoj fiksnoj ceni. Bez taksi po pokrivanju, bez provizije, bez ugovora.",
  },

  faq: {
    sub: "Sve što vlasnici restorana pitaju o onlajn rezervacijama. Ne vidite svoje pitanje? Pošaljite nam poruku na WhatsApp — odgovaraju pravi ljudi.",
    items: [
      {
        q: "Da li uzimate proviziju po rezervaciji kao OpenTable ili TheFork?",
        a: "Nula. Rezervacije su deo vaše fiksne mesečne pretplate — rezervišete 10 osoba dnevno ili 1.000, cena je identična. Bez naknade po pokrivanju, bez poreza po rezervaciji, bez uzimanja iz vašeg prihoda. U poređenju sa OpenTable-ovih 1–2,50 € po pokrivanju, restoran sa 50 pokrivanja dnevno štedi 1.500–3.750 € mesečno.",
      },
      {
        q: "Kako gosti rezervišu — da li treba da preuzmu aplikaciju?",
        a: "Bez aplikacije. Skeniraju vaš QR ili kliknu link za rezervaciju — datum, vreme, broj osoba, ime, telefon, opciona napomena. Gotovo. Ceo tok je ispod 30 sekundi i radi u svakom pretraživaču. Možete takođe ugraditi obrazac za rezervacije direktno na svoj sajt ili podeliti čisti URL za rezervacije na Instagramu.",
      },
      {
        q: "Mogu li ručno potvrđivati rezervacije ili se automatski potvrđuju?",
        a: "Oba režima — vaš izbor po terminu ili po danu. Automatska potvrda ako verujete u svoju dostupnost i želite da izgledate odzivno 24/7. Ručna potvrda ako želite da proveravate rezervacije (zauzeti vikendi, posebni događaji). Rezervaciju primate odmah i potvrđujete jednim tapom sa telefona.",
      },
      {
        q: "Kako sistem rukuje neodzivanjima?",
        a: "Automatski email podsetnici idu 24h i (opciono) 2h pre rezervacije — ovo samo po sebi smanjuje neodzivanja za ~30% u poređenju sa pozivima ili sistemima bez podsetnika. Možete takođe zahtevati broj telefona, označiti goste kao 'neodzivane' u kontrolnoj tabli, a vremenom sistem označava ponavljajuće prekršioce.",
      },
      {
        q: "Mogu li ograničiti koliko pokrivanja primam po večeri?",
        a: "Da. Postavite maks pokrivanja po vremenskom terminu, maks pokrivanja po danu i dane bez rezervacija (zatvaranja, privatni događaji). Možete čak označiti specifične stolove kao 'rezervabilne' naspram 'samo za gostujuće', tako da vaši najbolji stolovi pored prozora ostanu slobodni za slučajnost. Turisti i lokalci rezervišu iz istog sistema bez ikada gaženja po vašem rasporedu.",
      },
    ],
  },

  finalCta: {
    heading: "Rezervacije dok kuvate.",
    headingAccent: "Podsetnici da bi došli.",
    sub: "Primajte rezervacije 24/7 sa svog QR menija, sajta i Instagrama. 14-dnevna besplatna proba, bez kreditne kartice, bez provizije po pokrivanju.",
  },
};
