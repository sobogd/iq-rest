import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Višejezični restoranski meni — 35 jezika, jedan tap za prebacivanje",
    description:
      "Uslužite međunarodne goste na njihovom jeziku. Restoranski meni na 35 jezika sa jednim tapom za prebacivanje. RTL podrška za arapski i persijski. 14-dnevna besplatna proba.",
    canonical: "https://iq-rest.com/sr/multilingual",
    ogLocale: "sr_RS",
    ogTitle: "Sajt višejezičnog restoranskog menija — 35 jezika ugrađeno",
    ogDescription:
      "Turisti skeniraju, vide vaš meni na svom jeziku automatski. 35 jezika, RTL podrška, automatsko prepoznavanje iz podešavanja telefona. 14-dnevna besplatna proba.",
  },

  hero: {
    title: "Vaš meni govori jezik svakog turiste.",
    subtitle:
      "Višejezični restoranski meni ne bi trebalo da bude projekat. Sa IQ Rest-om, vaš QR meni automatski prepoznaje jezik telefona svakog gosta i služi ga na bilo kom od 35 jezika — uključujući arapski i persijski sa pravilnim s-desne-ulevo renderovanjem.",
    trustLine: "500+ restorana u 30+ zemalja",
  },

  seo: {
    description:
      "Napravite svoj meni jednom, služite ga na 35 jezika. IQ Rest automatski prepoznaje jezik telefona svakog gosta i renderuje meni na njihovom jeziku — bez tapanja zastava, bez jezičke barijere, bez nezgodnih Google Translate trenutaka. Od španskog i nemačkog do japanskog, arapskog i mandarinskog, vaši gosti vide vaš restoran onako kako je trebalo da bude viđen.",
    fullDescription:
      "Većina 'višejezičnih' menija su PDF-ovi polomljenog Google Translate, odštampani jednom i nikad ažurirani. Sajt višejezičnog restorana od IQ Rest-a je pravi i18n: svaki jezik ima svoju pravilno prevedenu kopiju, svoj URL slug, svoje meta tagove za Google da indeksira i svoje rutiranje unutar aplikacije menija.\n\nKada turist sa francuskim iPhone-om skenira vaš QR kod, meni se automatski otvara na francuskom — bez tapova, bez odluka. Mogu se prebaciti na bilo koji drugi jezik biračem jezika na vrhu, ali većina nikad i ne treba. Isto se odnosi na dijetalne oznake ('vegan' postaje 'vegano' / 'vegetarisch' / 'ヴィーガン' u zavisnosti od jezika), na poruke o greškama, na 'dodaj u korpu' dugmiće, na račune. Svaki UI string na 35 jezika, ne samo sadržaj menija.\n\nZa RTL jezike — arapski i persijski — ceo raspored se pravilno okreće: tekst se poravnava desno, meniji se otvaraju zdesna, cene se pojavljuju nakon imena jela kako se očekuje. Ovo nije CSS hak, to je puna RTL podrška koja čini da se arapski i persijski gosti osećaju usluženo, ne naknadno prilagođeno.",
    benefitsHeading: "Zašto pravi višejezični meni pobeđuje PDF prevod",
    benefits: [
      "35 jezika sa pravilnim UI prevodom — ne samo stavke menija",
      "Automatski prepoznaje jezik telefona gosta — bez potrebnih tapova",
      "Ručni prebacivač jezika za goste koji preferiraju drugi jezik",
      "Puna RTL podrška za arapski i persijski — ne CSS hak",
      "Svaki jezik ima svoj URL — Google indeksira 35 verzija vašeg sajta",
      "Promenite opis jela na svom maternjem jeziku — prevodi prate",
    ],
  },

  pricing: {
    heading: "Jedan paket.",
    headingAccent: "Svih 35 jezika uključeno.",
    sub: "Višejezični meni, AI prevod, QR poručivanje i rezervacije — sve u jednoj fiksnoj ceni. Bez taksi po jeziku, bez doplata za RTL.",
  },

  faq: {
    sub: "Sve što vlasnici restorana pitaju o višejezičnom meniju. Ne vidite svoje pitanje? Pošaljite nam poruku na WhatsApp — odgovaraju pravi ljudi.",
    items: [
      {
        q: "Koliko jezika podržava meni?",
        a: "35 jezika uključujući engleski, španski, nemački, francuski, italijanski, portugalski, holandski, poljski, češki, slovački, mađarski, rumunski, bugarski, hrvatski, srpski, slovenački, grčki, turski, ruski, ukrajinski, litvanski, letonski, estonski, finski, švedski, norveški, danski, islandski, katalonski, irski galski, arapski, persijski, japanski, korejski i kineski. UI stringovi su profesionalno prevedeni za svaki.",
      },
      {
        q: "Kako kupci menjaju jezike?",
        a: "Dva načina: automatski (meni se otvara na jeziku njihovog telefona) i ručno (birač jezika na vrhu menija). 80% turista nikad ne dotakne ručni birač — automatsko prepoznavanje jednostavno radi jer njihov telefon već zna njihov jezik.",
      },
      {
        q: "Da li podržavate jezike s desna ulevo kao arapski i persijski?",
        a: "Da, sa punim RTL rasporedom. Ceo meni se okreće: tekst se poravnava desno, kolone se obrću, navigacioni paneli se otvaraju sa desne strane, cene se pojavljuju nakon imena jela. Ovo je prava RTL podrška implementirana na nivou rasporeda, ne samo CSS trikovi smera.",
      },
      {
        q: "Da li će Google indeksirati moj meni na svih 35 jezika?",
        a: "Da. Svaki jezik ima svoj URL slug (npr. /es, /fr, /de), pravilne hreflang tagove, lokalizovane meta naslove i opise i strukturisane podatke specifične za jezik. Google tretira svaki jezik kao zasebnu stranu za tu lokaciju, što znači da turisti koji traže vaš restoran na svom jeziku imaju veću verovatnoću da vas pronađu.",
      },
      {
        q: "Šta ako ne želim svih 35 jezika — samo svoja glavna tržišta?",
        a: "Izaberite koji jezici su aktivni. Ako ste plažni restoran u Grčkoj koji uglavnom uslužuje britanske, nemačke i italijanske turiste, omogućite samo engleski, nemački i italijanski — ostali se ne pojavljuju u biraču jezika ili automatskom prepoznavanju. Uvek možete omogućiti više kasnije kako se vaš turistički miks menja.",
      },
    ],
  },

  finalCta: {
    heading: "Jezik telefona svakog turiste.",
    headingAccent: "Već podržan.",
    sub: "Uslužite višejezični meni na 35 jezika, uključujući RTL arapski i persijski. 14-dnevna besplatna proba, bez kreditne kartice, bez taksi po jeziku.",
  },
};
