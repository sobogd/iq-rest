import { Languages, ShieldAlert, Palette, ShoppingCart } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "hr",
  slug: "qr-meni-restoran",
  trackPrefix: "l_hr_qr",

  meta: {
    title: "QR meni za restorane | IQ Rest",
    description:
      "QR meni za restorane: gost skenira QR kod na stolu, otvori jelovnik u pregledniku i naruči na svom jeziku. 14 dana besplatno, bez kartice.",
    canonical: "https://iq-rest.com/hr/qr-meni-restoran",
    ogLocale: "hr_HR",
    ogTitle: "QR meni za restorane",
    ogDescription:
      "QR na stolu, jelovnik na mobitelu — fotografije, alergeni, 35 jezika i ažuriranja u stvarnom vremenu.",
    brandLine: "IQ Rest — QR meni za restorane",
  },

  hero: {
    headline: "QR meni za restorane.",
    cta: "Izradi QR jelovnik",
    sub: "Gost usmjeri kameru na QR kod na stolu i jelovnik se odmah otvori u pregledniku mobitela: fotografije jela, alergeni, uvijek ažurne cijene i automatski prijevod na 35 jezika. Bez preuzimanja aplikacija, bez ponovnog tiskanja jelovnika pri svakoj promjeni cijene.",
  },

  scan: {
    heading: "Već imate papirnati ili PDF jelovnik?",
    headingAccent: "AI ga pretvara u QR meni u 60 sekundi.",
    sub: "Učitajte fotografiju jelovnika ili PDF — AI prepoznaje kategorije, jela i cijene i odmah ih povezuje s QR menijem.",
    cta: "Izradi QR meni",
  },

  subFeatures: [
    {
      icon: Languages,
      eyebrow: "Jedan QR, 35 jezika",
      heading: "Jedan QR kod, jelovnik na 35 jezika.",
      body: "Gost skenira QR i bira svoj jezik: prijevod obavlja AI s gastronomskim osjećajem, a ne generički prevoditelj. Kraj zasebnim jelovnicima za turiste i rasutim papirima na stolu.",
      bullets: [
        "Jedno tiskanje QR-a pokriva 35 jezika, uključeno u pretplatu.",
        "AI razumije kuhinjski jezik — nazivi jela zvuče prirodno na svakom jeziku.",
        "Gost mijenja jezik unutar jelovnika, bez ponovnog skeniranja QR-a.",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Dva gosta skeniraju isti QR kod sa stola i čitaju jelovnik na različitim jezicima" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Alergeni u QR-u",
      heading: "Alergeni i prehrambene oznake unutar QR menija.",
      body: "Svako jelo u jelovniku povezanom s QR-om može nositi oznake za gluten, laktozu, orašaste plodove, plodove mora, veganske i bezglutenske opcije. Gost s mobitela filtrira jela koja odgovaraju njegovim ograničenjima, bez pitanja osoblja.",
      bullets: [
        "14 kategorija alergena na razini jela.",
        "Veganske, vegetarijanske i bezglutenske oznake jednim klikom u panelu.",
        "Gost filtrira QR meni prema vlastitim ograničenjima.",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Gost filtrira QR meni po alergenima na mobitelu dok vlasnik uređuje popis na tabletu" },
    },
    {
      icon: Palette,
      eyebrow: "Više od običnog QR-a",
      heading: "QR meni dotjeran poput web-stranice restorana.",
      body: "Nakon skeniranja koda gost ne nailazi na plošni PDF: vidi početni zaslon s videom ili istaknutom fotografijom, opis lokala i stranicu kontakta s kartom, telefonima i društvenim mrežama. QR postaje ulazna vrata restorana na internetu.",
      bullets: [
        "Pozadinski video ili istaknuta fotografija na početnom zaslonu QR menija.",
        "Prostor za priču o konceptu lokala i svake kategorije.",
        "Ugrađena stranica kontakta: karta, telefon, Instagram, WhatsApp.",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Dva mobitela na stolu: početni zaslon QR menija s pozadinskim videom i stranica kontakta s kartom" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Naručivanje iz QR-a · opcionalno",
      heading: "Iz QR koda gost može i naručiti.",
      body: "Osim pregledavanja jelovnika, QR meni može postati kanal za narudžbe: gost dodaje jela u košaricu i šalje zahtjev. Narudžba stiže konobaru u sali, na WhatsApp ili na kuhinjski zaslon. Značajka se po potrebi uključuje ili isključuje u postavkama.",
      bullets: [
        "Košarica, napomene i slanje narudžbe izravno iz skeniranja QR-a.",
        "Narudžba odmah stiže u salu, na WhatsApp ili na kuhinjski zaslon.",
        "Značajku je moguće aktivirati po terminima, salama ili određenim restoranima.",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Dva mobitela na stolu: košarica izrađena iz QR menija i potvrda poslane narudžbe" },
    },
  ],

  faq: {
    sub: "Što ugostitelji pitaju o QR meniju IQ Resta. Ne nalazite svoje pitanje? Pišite nam na WhatsApp.",
    items: [
      { q: "Kako radi QR meni IQ Resta?", a: "Svaki stol ima otisnut QR kod. Gost ga skenira kamerom mobitela i preglednik otvara jelovnik restorana — fotografije, opisi, alergeni i ažurne cijene. Nikakva aplikacija nije potrebna, ni gostu ni osoblju." },
      { q: "Trebaju li mi tehnička znanja za izradu QR menija?", a: "Ne. Panel radi na klikanje i povlačenje, bez koda i složenih postavki. Dodavanje jela traje nekoliko sekundi: naziv, cijena, fotografija. Početno postavljanje obično traje od 30 minuta do sat vremena; ako već imate PDF jelovnik, AI ga automatski pretvara." },
      { q: "Moraju li gosti instalirati aplikaciju da bi pročitali QR?", a: "Ne. Izvorna kamera iPhonea i Androida prepoznaje QR kod u nekoliko sekundi i otvara jelovnik izravno u pregledniku. Administracijski panel također radi u svakom modernom pregledniku — mobitel, tablet ili prijenosno računalo." },
      { q: "Kako se tiskaju QR kodovi za stolove?", a: "QR kodovi se u panelu generiraju automatski (jedan po stolu ili jedan za cijeli lokal) i preuzimaju kao PDF spreman za tisak. Dovoljan je uredski pisač i stalak: stalak, naljepnica ili podložak za čašu." },
      { q: "Mogu li koristiti vlastitu domenu za QR meni?", a: "Da. Podržavamo domenu restorana s SSL certifikatom (na primjer meni.vasrestoran.hr): kad gost skenira QR, vidi adresu vašeg restorana umjesto generičke poddomene. Postavljanje DNS-a traje 5–10 minuta i vodimo vas kroz njega." },
      { q: "Mogu li upravljati QR kodovima više restorana s jednog računa?", a: "Da, na zahtjev. Jedan račun može objediniti više lokala, svaki s vlastitim QR kodovima, jelovnikom, dizajnom i analitikom. Pišite nam na WhatsApp i uključit ćemo način rada s više restorana." },
      { q: "Je li teško pokrenuti QR meni od nule?", a: "Tri koraka: (1) izradite kategorije; (2) dodajte jela s nazivom, cijenom i fotografijom; (3) ispišite QR kodove i stavite ih na stolove. Ako već imate papirnati ili PDF jelovnik, učitajte ga — AI prepoznaje kategorije i cijene i ispunjava kartice. Osnovni jelovnik može biti online za 5 minuta." },
    ],
  },
};
