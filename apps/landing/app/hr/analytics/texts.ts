import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Analitika Jelovnika Restorana — QR Skeniranja, Najbolja Jela, Jezici Turista",
    description:
      "Vidite točno kako gosti koriste vaš QR jelovnik. Dnevna skeniranja, najpregledanija jela, jezične preferencije, vršni sati. Odluke vođene podacima za vaš restoran.",
    canonical: "https://iq-rest.com/hr/analytics",
    ogLocale: "hr_HR",
    ogTitle: "Analitika Restorana — Pratite Skeniranja QR Jelovnika, Jela i Jezike",
    ogDescription:
      "Znajte koja jela vaši gosti zapravo gledaju, kada su vršni sati, i koja je nacionalnost turista u vašoj blagovaonici večeras. 14-dnevna besplatna proba.",
  },

  hero: {
    title: "Prestanite nagađati. Znajte što gosti zapravo rade.",
    subtitle:
      "Vidite analitiku jelovnika restorana u stvarnom vremenu — QR skeniranja po satu, jela na kojima se gosti zadržavaju, jezike koje turisti koriste, najsporiji radni dan — i koristite te podatke za ispis manje jelovnika, pametnije rasporeda, gurajte prave specijalitete.",
    trustLine: "4.9 · 500+ restorana u 30+ zemalja",
  },

  seo: {
    description:
      "Analitika restorana koja ne zahtijeva tim za podatke. IQ Rest prati svako skeniranje, pregled, promjenu jezika i narudžbu s vašeg QR jelovnika i ističe obrasce koji su važni: najpregledanija jela, vršni sati skeniranja, najprometniji dan u tjednu, jezični raspored vaše turističke gomile. Donosite odluke vođene podacima a da nikad ne otvorite spreadsheet.",
    fullDescription:
      "Većina restorana radi na instinktu — 'osjećamo da su utorci spori', 'mislim da se tjestenina dobro prodaje'. Instinkt je dobar, ali podaci su bolji. IQ Rest prati svaku interakciju s vašim QR jelovnikom tako da ne morate nagađati: koliko puta je vaš QR skeniran danas, koja jela su gosti najduže gledali, koja jela su dodali u košaricu ali nisu naručili, koji jezik su turisti koristili.\n\nKontrolna ploča analitike ističe odgovore u tri prikaza: danas (skeniranja uživo, trenutne narudžbe, što se sad naručuje), ovaj tjedan (top 10 jela, prometni sati, jezični raspored, no-shows na rezervacijama), i trendovi (rast iz mjeseca u mjesec, sezonalnost, obrasci radnih dana). Možete uroniti u bilo koje jelo da vidite koliko često se pregledava vs naručuje (jelo pregledano 200 puta ali naručeno 5 puta ima problem s tekstom ili fotografijom), ili u bilo koji jezik da vidite kakvu mješavinu turista zapravo poslužujete.\n\nCilj su odluke, ne nadzorne ploče: 'sljedeći utorak je povijesno spor → pokrenite happy hour push obavijest', 'talijanski turisti naručuju tjesteninu 3x više od lokalaca → stavite tjesteninu prvu kad je language=it', 'ovo jelo ima 90% stope pregleda ali 5% stope narudžbe → poboljšajte fotografiju'. Prave promjene, pravi prihod, bez potrebe za MBA.",
    benefitsHeading: "Zašto restorani vole IQ Rest analitiku iznad Google Analyticsa",
    benefits: [
      "Brojač skeniranja QR-a uživo — gledajte kako se vaša večer puni u stvarnom vremenu",
      "Najpregledanija i najnaručenija jela — uočite što radi a što ne",
      "Jezični raspored — znajte koji su turisti u vašoj blagovaonici",
      "Vršni sati i obrasci radnih dana — pametnije rasporedite, pametnije pripremite",
      "Konverzija pregled-u-narudžbu po jelu — popravite loše fotografije i slabe opise",
      "Analitika rezervacija — izvori rezervacija, stopa no-show, mješavina veličine društva",
    ],
  },

  pricing: {
    heading: "Jedan plan.",
    headingAccent: "Puna analitika uključena.",
    sub: "Analitika restorana, QR naručivanje, AI prijevod i rezervacije — sve u jednoj ravnoj cijeni. Bez premium tier za podatke, ikada.",
  },

  faq: {
    sub: "Sve što vlasnici restorana pitaju o analitici jelovnika. Ne vidite svoje? Pošaljite nam poruku na WhatsApp — odgovaraju pravi ljudi.",
    items: [
      {
        q: "Što zapravo mogu vidjeti u kontrolnoj ploči analitike?",
        a: "QR skeniranja uživo (danas, ovaj tjedan, ovaj mjesec), najpregledanija jela, najnaručenija jela, konverzija pregled-u-narudžbu po jelu, jezični raspored gostiju, vršni sati po danu u tjednu, prosječna vrijednost narudžbe, najprometniji stolovi, stopa no-show rezervacija i trendovi tijekom vremena. Sve na jednoj kontrolnoj ploči, bez postavljanja.",
      },
      {
        q: "Kako koristim ovo da zapravo povećam prihod?",
        a: "Tri obrasca rade za većinu restorana: (1) preuredite jelovnik tako da jela s najboljom konverzijom dolaze prva; (2) popravite fotografiju ili opis na jelima s visokim pregledima ali niskim narudžbama; (3) gurajte happy-hour ili specijal na povijesno sporim radnim danima/satima. Vidjeli smo restorane kako povećavaju prihod radnih dana za 15–30% samo od ove tri promjene.",
      },
      {
        q: "Je li ovo anonimno ili pratite pojedince?",
        a: "Anonimno i agregirano. Pratimo preglede jelovnika i narudžbe po sesiji, ne po identificiranom korisniku. Bez emailova, bez telefonskih brojeva, bez IP adresa pohranjenih dugoročno. Kontrolna ploča pokazuje obrasce ('200 skeniranja u petak'), ne ljude. Potpuno usklađeno s GDPR-om po dizajnu.",
      },
      {
        q: "Mogu li izvesti podatke?",
        a: "Da. Izvezite bilo koji prikaz kao CSV (najbolja jela, dnevna skeniranja, satni raspored, itd.) i otvorite u Excelu ili Google Sheetsu. Korisno za dijeljenje s investitorima, računovođama, ili za kombiniranje s vašim POS podacima.",
      },
      {
        q: "Trebam li tehničko postavljanje za dobivanje analitike?",
        a: "Nikakvo. Analitika je uključena prema zadanim postavkama u trenutku kad je vaš QR jelovnik uživo — svako skeniranje, pregled i narudžba se automatski prati. Kontrolna ploča je dio standardne pretplate, ne upsell, i vidjet ćete korisne podatke unutar prvog dana skeniranja gostiju.",
      },
    ],
  },

  finalCta: {
    heading: "Prestanite nagađati.",
    headingAccent: "Počnite mjeriti.",
    sub: "Analitika QR skeniranja uživo, najbolja jela, vršni sati, jezični raspored turista. 14-dnevna besplatna proba, bez kreditne kartice.",
  },
};
