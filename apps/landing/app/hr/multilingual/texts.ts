import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Višejezični Jelovnik Restorana — 35 Jezika, Jedan Dodir za Promjenu",
    description:
      "Poslužite međunarodne goste na njihovom jeziku. Jelovnik restorana na 35 jezika s promjenom jednim dodirom. RTL podrška za arapski i perzijski. 14-dnevna besplatna proba.",
    canonical: "https://iq-rest.com/hr/multilingual",
    ogLocale: "hr_HR",
    ogTitle: "Web Stranica Višejezičnog Jelovnika Restorana — 35 Jezika Ugrađeno",
    ogDescription:
      "Turisti skeniraju, vide vaš jelovnik na svom jeziku automatski. 35 jezika, RTL podrška, automatsko otkrivanje iz postavki telefona. 14-dnevna besplatna proba.",
  },

  hero: {
    title: "Vaš jelovnik govori jezik svakog turista.",
    subtitle:
      "Višejezični jelovnik restorana ne bi trebao biti projekt. S IQ Rest, vaš QR jelovnik automatski otkriva jezik telefona svakog gosta i poslužuje ga na bilo kojem od 35 jezika — uključujući arapski i perzijski s pravilnim prikazom s desna na lijevo.",
    trustLine: "4.9 · 500+ restorana u 30+ zemalja",
  },

  seo: {
    description:
      "Izgradite svoj jelovnik jednom, poslužite ga na 35 jezika. IQ Rest automatski otkriva jezik telefona svakog gosta i prikazuje jelovnik na njihovom jeziku — bez dodira zastave, bez jezične barijere, bez nezgodnih trenutaka Google Translatea. Od španjolskog i njemačkog do japanskog, arapskog i mandarinskog, vaši gosti vide vaš restoran kako je trebao biti viđen.",
    fullDescription:
      "Većina 'višejezičnih' jelovnika su PDF-ovi razbijenog Google Translatea, otisnuti jednom i nikad ažurirani. Web stranica višejezičnog restorana IQ Rest pravi je i18n: svaki jezik ima vlastitu pravilno prevedenu kopiju, vlastiti URL slug, vlastite meta oznake za Google indeksiranje i vlastito usmjeravanje unutar aplikacije jelovnika.\n\nKad turist s francuskim iPhoneom skenira vaš QR kod, jelovnik se automatski otvara na francuskom — bez dodira, bez odluka. Mogu se prebaciti na bilo koji drugi jezik s izbornikom jezika na vrhu, ali većina nikad ne treba. Isto vrijedi za prehrambene oznake ('vegan' postaje 'vegano' / 'vegetarisch' / 'ヴィーガン' ovisno o jeziku), za poruke o pogreškama, za gumbe 'dodaj u košaricu', za račune. Svaki UI string na 35 jezika, ne samo sadržaj jelovnika.\n\nZa RTL jezike — arapski i perzijski — cijeli raspored se pravilno preokreće: tekst se poravnava desno, izbornici se otvaraju s desne strane, cijene se pojavljuju nakon imena jela kao što se očekuje. Ovo nije CSS hak, to je puna RTL podrška koja arapske i perzijske goste čini posluženima, a ne naknadno opremljenima.",
    benefitsHeading: "Zašto pravi višejezični jelovnik pobjeđuje PDF prijevod",
    benefits: [
      "35 jezika s pravilnim UI prijevodom — ne samo stavke jelovnika",
      "Automatski otkriva jezik telefona gosta — bez potrebnih dodira",
      "Ručni prebacivač jezika za goste koji preferiraju drugi jezik",
      "Puna RTL podrška za arapski i perzijski — ne CSS hak",
      "Svaki jezik ima vlastiti URL — Google indeksira 35 verzija vaše stranice",
      "Promijenite opis jela na materinjem jeziku — prijevodi prate",
    ],
  },

  pricing: {
    heading: "Jedan plan.",
    headingAccent: "Svih 35 jezika uključeno.",
    sub: "Višejezični jelovnik, AI prijevod, QR naručivanje i rezervacije — sve u jednoj ravnoj cijeni. Bez naknada po jeziku, bez dodataka za RTL.",
  },

  faq: {
    sub: "Sve što vlasnici restorana pitaju o višejezičnom jelovniku. Ne vidite svoje? Pošaljite nam poruku na WhatsApp — odgovaraju pravi ljudi.",
    items: [
      {
        q: "Koliko jezika podržava jelovnik?",
        a: "35 jezika uključujući engleski, španjolski, njemački, francuski, talijanski, portugalski, nizozemski, poljski, češki, slovački, mađarski, rumunjski, bugarski, hrvatski, srpski, slovenski, grčki, turski, ruski, ukrajinski, litavski, latvijski, estonski, finski, švedski, norveški, danski, islandski, katalonski, irski galski, arapski, perzijski, japanski, korejski i kineski. UI stringovi profesionalno su prevedeni za svaki.",
      },
      {
        q: "Kako kupci mijenjaju jezike?",
        a: "Dva načina: automatski (jelovnik se otvara na jeziku njihovog telefona) i ručno (izbornik jezika na vrhu jelovnika). 80% turista nikada ne dodirne ručni izbornik — automatsko otkrivanje jednostavno radi jer njihov telefon već zna njihov jezik.",
      },
      {
        q: "Podržavate li jezike s desna na lijevo poput arapskog i perzijskog?",
        a: "Da, s punim RTL rasporedom. Cijeli jelovnik se preokreće: tekst se poravnava desno, stupci se obrću, navigacijski okviri se otvaraju s desne strane, cijene se pojavljuju nakon imena jela. Ovo je prava RTL podrška implementirana na razini rasporeda, ne samo CSS direction trikovi.",
      },
      {
        q: "Hoće li Google indeksirati moj jelovnik na svih 35 jezika?",
        a: "Da. Svaki jezik ima vlastiti URL slug (npr. /es, /fr, /de), pravilne hreflang oznake, lokalizirane meta naslove i opise, te strukturirane podatke specifične za jezik. Google tretira svaki jezik kao zasebnu stranicu za taj locale, što znači da je vjerojatnije da će vas turisti koji traže vaš restoran na svom jeziku pronaći.",
      },
      {
        q: "Što ako ne želim svih 35 jezika — samo svoja glavna tržišta?",
        a: "Odaberite koji su jezici aktivni. Ako ste plažni restoran u Hrvatskoj koji uglavnom poslužuje britanske, njemačke i talijanske turiste, omogućite samo engleski, njemački i talijanski — ostali se ne pojavljuju u izborniku jezika ili automatskom otkrivanju. Uvijek možete omogućiti više kasnije kako se vaša mješavina turista mijenja.",
      },
    ],
  },

  finalCta: {
    heading: "Jezik telefona svakog turista.",
    headingAccent: "Već podržan.",
    sub: "Poslužite višejezični jelovnik na 35 jezika, uključujući RTL arapski i perzijski. 14-dnevna besplatna proba, bez kreditne kartice, bez naknada po jeziku.",
  },
};
