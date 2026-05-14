import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Analitika restoranskog menija — QR skeniranja, najbolja jela, jezici turista",
    description:
      "Vidite tačno kako gosti koriste vaš QR meni. Dnevna skeniranja, najgledanija jela, jezičke preferencije, najprometniji sati. Odluke vođene podacima za vaš restoran.",
    canonical: "https://iq-rest.com/sr/analytics",
    ogLocale: "sr_RS",
    ogTitle: "Analitika restorana — pratite skeniranja QR menija, jela i jezike",
    ogDescription:
      "Saznajte koja jela vaši gosti zaista gledaju, kada su najprometniji sati i koja turistička nacionalnost je u vašoj trpezariji večeras. 14-dnevna besplatna proba.",
  },

  hero: {
    title: "Prestanite nagađati. Saznajte šta gosti zaista rade.",
    subtitle:
      "Vidite analitiku restoranskog menija u realnom vremenu — QR skeniranja po satu, jela na kojima se gosti zadržavaju, jezike koje turisti koriste, najsporiji radni dan — i koristite te podatke da štampate manje menija, pametnije rasporedite, gurnete prave specijalitete.",
    trustLine: "500+ restorana u 30+ zemalja",
  },

  seo: {
    description:
      "Restoranska analitika koja ne zahteva tim za podatke. IQ Rest prati svako skeniranje, pregled, prebacivanje jezika i narudžbinu sa vašeg QR menija, i ističe obrasce koji su važni: najgledanija jela, najprometniji sati skeniranja, najprometniji dan u nedelji, jezičku raščlanu vaše turističke gomile. Donosite odluke vođene podacima bez ikada otvaranja tabele.",
    fullDescription:
      "Većina restorana radi na instinktu — 'osećamo da su utorci spori', 'mislim da se pasta dobro prodaje'. Instinkt je dobar, ali su podaci bolji. IQ Rest prati svaku interakciju sa vašim QR menijem da ne biste morali da nagađate: koliko puta je vaš QR skeniran danas, koja jela su gosti gledali najduže, koja jela su dodali u korpu ali nisu naručili, koji jezik su turisti koristili.\n\nAnalitička kontrolna tabla ističe odgovore u tri prikaza: danas (žive skenirane stavke, trenutne narudžbine, šta se naručuje upravo sada), ova nedelja (top 10 jela, prometni sati, jezička raščlana, neodzivanja na rezervacijama) i trendovi (rast iz meseca u mesec, sezonalnost, obrasci radnih dana). Možete da uđete u bilo koje jelo da vidite koliko često se gleda u poređenju sa naručivanjem (jelo gledano 200 puta ali naručeno 5 puta ima problem sa opisom ili fotografijom), ili u bilo koji jezik da vidite koji turistički miks zaista uslužujete.\n\nCilj su odluke, a ne kontrolne table: 'sledeći utorak je istorijski spor → pokrenite happy hour push notifikaciju', 'italijanski turisti naručuju pastu 3x više od lokalaca → stavite pastu prvu kada je language=it', 'ovo jelo ima 90% stope pregleda ali 5% stopu narudžbine → poboljšajte fotografiju'. Prave promene, pravi prihod, bez potrebe za MBA.",
    benefitsHeading: "Zašto restorani vole IQ Rest analitiku više od Google Analytics",
    benefits: [
      "Živi brojač QR skeniranja — gledajte kako vam se veče puni u realnom vremenu",
      "Najgledanija i najnaručivanija jela — uočite šta funkcioniše i šta ne",
      "Jezička raščlana — saznajte koji turisti su u vašoj trpezariji",
      "Najprometniji sati i obrasci radnih dana — pametnije rasporedite, pametnije pripremite",
      "Konverzija pregled-u-narudžbinu po jelu — popravite loše fotografije i slabe opise",
      "Analitika rezervacija — izvori rezervacija, stopa neodzivanja, miks veličina društava",
    ],
  },

  pricing: {
    heading: "Jedan paket.",
    headingAccent: "Puna analitika uključena.",
    sub: "Restoranska analitika, QR poručivanje, AI prevod i rezervacije — sve u jednoj fiksnoj ceni. Bez premium nivoa za podatke, nikada.",
  },

  faq: {
    sub: "Sve što vlasnici restorana pitaju o analitici menija. Ne vidite svoje pitanje? Pošaljite nam poruku na WhatsApp — odgovaraju pravi ljudi.",
    items: [
      {
        q: "Šta zapravo mogu da vidim u analitičkoj kontrolnoj tabli?",
        a: "Žive QR skeniranja (danas, ova nedelja, ovaj mesec), najgledanija jela, najnaručivanija jela, konverzija pregled-u-narudžbinu po jelu, jezička raščlana gostiju, najprometniji sati po danu u nedelji, prosečna vrednost narudžbine, najprometniji stolovi, stopa neodzivanja na rezervacijama i trendovi tokom vremena. Sve na jednoj kontrolnoj tabli, bez potrebe za podešavanjem.",
      },
      {
        q: "Kako da koristim ovo da zapravo povećam prihod?",
        a: "Tri obrasca rade za većinu restorana: (1) preuredite meni tako da se najbolje konvertujuća jela pojavljuju prva; (2) popravite fotografiju ili opis na jelima sa visokim pregledima ali niskim narudžbinama; (3) gurnite happy-hour ili specijalitet na istorijski spore radne dane/sate. Videli smo restorane koji su povećali prihod radnog dana za 15–30% samo od ove tri promene.",
      },
      {
        q: "Da li je ovo anonimno ili pratite pojedince?",
        a: "Anonimno i agregirano. Pratimo preglede menija i narudžbine po sesiji, ne po identifikovanom korisniku. Bez emailova, bez telefonskih brojeva, bez dugoročno čuvanih IP adresa. Kontrolna tabla vam pokazuje obrasce ('200 skeniranja u petak'), ne ljude. Potpuno GDPR usaglašeno po dizajnu.",
      },
      {
        q: "Mogu li izvesti podatke?",
        a: "Da. Izvezite bilo koji prikaz kao CSV (najbolja jela, dnevna skeniranja, satna raščlana, itd.) i otvorite u Excel-u ili Google Sheets-u. Korisno za deljenje sa investitorima, računovođama ili za kombinovanje sa podacima vašeg POS-a.",
      },
      {
        q: "Da li mi treba bilo kakvo tehničko podešavanje da bih dobio analitiku?",
        a: "Nula. Analitika je uključena podrazumevano u trenutku kada je vaš QR meni uživo — svako skeniranje, pregled i narudžbina se automatski prati. Kontrolna tabla je deo standardne pretplate, ne doplata, i videćete korisne podatke u prvom danu skeniranja gostiju.",
      },
    ],
  },

  finalCta: {
    heading: "Prestanite nagađati.",
    headingAccent: "Počnite meriti.",
    sub: "Živa analitika QR skeniranja, najbolja jela, najprometniji sati, jezička raščlana turista. 14-dnevna besplatna proba, bez kreditne kartice.",
  },
};
