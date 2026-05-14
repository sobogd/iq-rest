import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Online Naručivanje s QR Jelovnika — Narudžbe Restorana Bez Provizije",
    description:
      "Primajte izravne narudžbe s vašeg QR jelovnika. Bez provizije, bez Uber Eats / Glovo dijela. Gosti skeniraju, naručuju, plaćaju — izravno vama. 14-dnevna besplatna proba.",
    canonical: "https://iq-rest.com/hr/online-orders",
    ogLocale: "hr_HR",
    ogTitle: "Online Naručivanje Bez Provizije — Izravne Narudžbe s Vašeg QR Jelovnika",
    ogDescription:
      "Zamijenite 30% provizije aplikacija za dostavu izravnim narudžbama. Gosti skeniraju vaš QR, naručuju, plaćaju — svaka kuna ide vama. 14-dnevna besplatna proba, bez kartice.",
  },

  hero: {
    title: "Izravne narudžbe. Bez provizije. Ravno u vašu kuhinju.",
    subtitle:
      "Prestanite plaćati 30% Uber Eatsu, Glovou i Woltu. S IQ Restom vaši gosti skeniraju QR, sastavljaju narudžbu na svom telefonu, a tiket dolazi u vašu kuhinju — svaka kuna ostaje vama.",
    trustLine: "500+ restorana u 30+ zemalja",
  },

  seo: {
    description:
      "Pretvorite svoj QR jelovnik u potpuni sustav online naručivanja bez odustajanja od 30% za aplikacije za dostavu. Gosti skeniraju vaš QR kod, pregledavaju jelovnik na svom jeziku, sastavljaju košaricu, šalju narudžbu — i vi je primate s brojem stola, odmah. Bez preuzimanja aplikacija, bez provizija, bez treće strane između vas i vašeg gosta.",
    fullDescription:
      "Većina restorana gubi novac prije nego što hrana napusti kuhinju — Uber Eats uzima 30%, Glovo uzima 30%, Wolt uzima 30%. Online naručivanje kroz IQ Rest radi potpuno drugačije. Narudžba ide ravno s telefona gosta na vašu kontrolnu ploču, a cijela marža je vaša.\n\nUX naručivanja izgrađen je posebno za korištenje u restoranu: gosti biraju stol, pregledavaju vaš jelovnik, dodaju stavke u košaricu, ostavljaju komentar za kuhinju i predaju. Vidite nove narudžbe u stvarnom vremenu na telefonu ili kuhinjskom ekranu, s brojem stola, stavkama, modifikatorima i napomenama. Označite jela kao spremna, stol vidi status — i uštedite konobarima desetke odlazaka po smjeni.\n\nRadi i za takeaway i pickup: gosti skeniraju QR naljepnicu kraj vrata, naručuju i plaćaju — ne trebate posebnu aplikaciju za naručivanje, posebnu web stranicu ili Stripe integracijski projekt.",
    benefitsHeading: "Zašto izravno naručivanje kroz IQ Rest pobjeđuje aplikacije za dostavu",
    benefits: [
      "Bez provizije na svaku narudžbu — zadržite 100% prihoda",
      "Narudžbe lete na vašu kontrolnu ploču s brojem stola u stvarnom vremenu",
      "Bez aplikacije za goste — skeniraju vaš QR i naručuju u pregledniku",
      "Modifikatori, komentari, prehrambene napomene — sve uredno zabilježeno",
      "Radi za dine-in, takeaway i pickup — jedan jelovnik, tri toka",
      "Ugrađene upsell poruke povećavaju prosječnu vrijednost narudžbe",
    ],
  },

  pricing: {
    heading: "Jedan plan.",
    headingAccent: "Bez provizije.",
    sub: "Izravno naručivanje, QR jelovnik, web stranica restorana i rezervacije — sve uključeno. Bez naknada po narudžbi, bez Stripe integracijskog projekta.",
  },

  faq: {
    sub: "Sve što vlasnici restorana pitaju o online naručivanju. Ne vidite svoje? Pošaljite nam poruku na WhatsApp — odgovaraju pravi ljudi.",
    items: [
      {
        q: "Uzimate li proviziju na narudžbe?",
        a: "Nikakvu. Svaka narudžba s vašeg QR jelovnika ide ravno vama — bez dijela za nas, bez naknada Glovo / Uber Eats. Jedna ravna mjesečna pretplata, to je sve. Matematika je jednostavna: ako uzimate 5.000 €/mjesec u narudžbama aplikacija za dostavu, gubite 1.500 €. Prebacite se na izravno naručivanje i tih 1.500 € ostaje u vašem džepu.",
      },
      {
        q: "Kako gosti naručuju — trebaju li aplikaciju?",
        a: "Bez aplikacije. Gosti skeniraju vaš QR kod kamerom telefona, jelovnik se otvara u pregledniku, biraju stol, pregledavaju, dodaju u košaricu i predaju. Cijeli tok je dva dodira nakon skeniranja. Bez pretrage App Storea, bez registracije, bez prepreka.",
      },
      {
        q: "Kako primam narudžbe u kuhinji?",
        a: "Narudžbe se pojavljuju trenutno na vašoj kontrolnoj ploči, s brojem stola, stavkama, modifikatorima i napomenama. Pogledajte ih na telefonu, na tabletu kraj prolaza, ili na ekranu kuhinjskog displaya. Označite stavke kao spremne i stol vidi status — manje poziva 'dolazi li moja hrana?', brži obrti.",
      },
      {
        q: "Mogu li gosti platiti kroz QR jelovnik, ili samo za stolom?",
        a: "Oboje. Mogu predati i platiti gotovinom ili karticom za stolom na klasičan način, ili platiti online preko Stripea izravno kroz jelovnik. Vi odlučujete što je omogućeno. Online plaćanje osigurano je Stripeom — IQ Rest nikada ne drži novac, on ide ravno na vaš Stripe račun.",
      },
      {
        q: "Radi li za takeaway i pickup, ne samo za dine-in?",
        a: "Da. Zalijepite QR naljepnicu na ulaz za takeaway, ili podijelite link svog jelovnika na Instagramu i WhatsAppu. Gosti biraju 'pickup', naručuju, plaćaju — vi pripremate, oni preuzimaju. Isti sustav, tri različita toka naručivanja: dine-in, takeaway, pickup.",
      },
    ],
  },

  finalCta: {
    heading: "Prestanite hraniti aplikacije za dostavu.",
    headingAccent: "Počnite zadržavati 100%.",
    sub: "Zamijenite svoje 30% provizije ravnom mjesečnom naknadom. 14-dnevna besplatna proba. Bez kreditne kartice. Otkazivanje bilo kada.",
  },
};
