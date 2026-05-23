import { Languages, ShieldAlert, Palette, LayoutList, Smartphone, ShoppingCart } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "hr",
  slug: "digitalni-jelovnik-restoran",
  trackPrefix: "l_hr_digital",

  meta: {
    title: "Digitalni jelovnik za restorane | IQ Rest",
    description:
      "Digitalni jelovnik za restorane: online karta s fotografijama, alergenima, AI prijevodom i ažuriranjem cijena u stvarnom vremenu. 14 dana besplatno, bez kartice.",
    canonical: "https://iq-rest.com/hr/digitalni-jelovnik-restoran",
    ogLocale: "hr_HR",
    ogTitle: "Digitalni jelovnik za restorane",
    ogDescription:
      "Online verzija vašeg papirnog jelovnika — fotografije, alergeni, AI prijevod, ažuriranja u stvarnom vremenu.",
    brandLine: "IQ Rest — Digitalni jelovnik za restorane",
  },

  hero: {
    headline: "Digitalni jelovnik za restorane.",
    sub: "Online verzija vašeg papirnog jelovnika s fotografijama, alergenima, opisima i ažuriranjem cijena u stvarnom vremenu. Gosti vide jelovnik na svom jeziku; restoran štedi na tisku.",
  },

  scan: {
    heading: "Imate jelovnik na papiru ili PDF?",
    headingAccent: "AI ga digitalizira u 60 sekundi.",
    sub: "Učitajte fotografiju ili dokument — AI automatski prepoznaje kategorije, jela i cijene.",
    cta: "Skeniraj jelovnik",
  },

  subFeatures: [
    {
      icon: LayoutList,
      eyebrow: "Jelovnik bez fotografija",
      heading: "Jelovnik bez fotografija izgleda jednako dobro.",
      body: "Neka jela možda nemaju fotografije — i to je posve u redu. IQ Rest prikazuje kartice s i bez slika dosljedno: tipografija, alergeni i cijene zadržavaju premium osjećaj. Mješavina jela s fotografijama i bez ostaje koherentna.",
      bullets: [
        "Kartice bez fotografija ne izgledaju prazno.",
        "Tipografija se prilagođava sadržaju kartice.",
        "Dosljedan stil za jela sa i bez slika.",
      ],
      image: { src: "/landing/feature-photos-optional.webp", alt: "Dva telefona na stolu: jelovnik s fotografijama jela i jelovnik samo s tekstom" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Alergeni",
      heading: "Oznake alergena i prehrambenih režima.",
      body: "Označite jela za gluten, laktozu, orašaste plodove, plodove mora, veganske i bezglutenske opcije. Gosti filtriraju jelovnik prema svojim prehrambenim potrebama i naručuju s većim povjerenjem.",
      bullets: [
        "14 standardnih kategorija alergena na svakom jelu.",
        "Oznake vegansko, vegetarijansko i bezglutensko jednim klikom.",
        "Gosti filtriraju jelovnik prema svojim prehrambenim ograničenjima.",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Gost filtrira jelovnik prema alergenima na telefonu dok vlasnik uređuje popis alergena na tabletu" },
    },
    {
      icon: Palette,
      eyebrow: "Premium dizajn",
      heading: "Premium dizajn s video pozadinom i kontakt stranicom.",
      body: "Video ili fotografija na pozdravnom zaslonu, opis restorana, namjenska kontakt stranica s kartom, telefonima i društvenim profilima. Digitalni jelovnik izgleda kao puna web-stranica restorana, ne kao PDF iza QR koda.",
      bullets: [
        "Video pozadina ili velika fotografija na pozdravnom zaslonu.",
        "Opisi restorana i kategorija — ispričajte priču koncepta.",
        "Kontakt stranica: karta, telefon, Instagram, WhatsApp.",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Dva telefona na kafićkom stolu: početni zaslon jelovnika s video pozadinom i kontakt stranica s kartom" },
    },
    {
      icon: Languages,
      eyebrow: "35 AI jezika",
      heading: "35 AI jezika — svaki gost čita jelovnik na svom.",
      body: "Jedan QR kod, 35 jezika. AI upravlja kulinarskim kontekstom — nazivi jela i opisi zvuče prirodno. Turisti naručuju s većim povjerenjem i prosječni račun raste, a da konobar ne mora prevoditi svako jelo.",
      bullets: [
        "35 jezika uključeno u pretplatu, bez doplate.",
        "AI s razumijevanjem kulinarskog konteksta, ne sirovi Google Translate.",
        "Gost mijenja jezik jednim dodirom unutar jelovnika.",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Dva gosta čitaju isti digitalni jelovnik na različitim jezicima na svojim telefonima" },
    },
    {
      icon: Smartphone,
      eyebrow: "Upravljanje s bilo kojeg uređaja",
      heading: "Upravljajte jelovnikom s bilo kojeg uređaja.",
      body: "Jedan panel otvara se u pregledniku na telefonu, tabletu ili laptopu. Promijenite cijenu, uklonite jelo sa stop liste ili dodajte specijalitet — gosti vide promjenu u sekundama. Bez instalacija, bez integracija.",
      bullets: [
        "Bez aplikacije za instaliranje — otvorite preglednik i unutra ste.",
        "Cijene, fotografije i stop lista — nekoliko dodira s telefona.",
        "Upravljajte jelovnikom s bilo kojeg mjesta, uključujući salu.",
      ],
      image: { src: "/landing/feature-mobile.webp", alt: "Laptop i telefon na kafićkom stolu uređuju istu stavku jelovnika na oba uređaja" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Narudžbe iz jelovnika · opcionalno",
      heading: "Gosti naručuju izravno iz jelovnika.",
      body: "Gosti grade košaricu u QR jelovniku i šalju narudžbu — stiže konobaru u sali ili na tablet u kuhinji. Mogućnost se može uključiti ili isključiti u postavkama u bilo kojem trenutku.",
      bullets: [
        "Košarica, komentari i slanje narudžbe jednim dodirom.",
        "Narudžba odmah stiže u admin panel, na WhatsApp ili na kuhinjski ekran.",
        "Mogućnost se prebacuje u postavkama.",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Dva telefona na stolu: košarica s narudžbom i potvrda poslane narudžbe" },
    },
  ],

  faq: {
    sub: "Što restoratori pitaju o digitalnom jelovniku u IQ Restu. Ne nalazite svoje pitanje? Pišite nam na WhatsApp.",
    items: [
      { q: "Trebam li tehničke vještine ili iskustvo s CMS-om?", a: "Ne, posebne vještine nisu potrebne. Svaka radnja u admin panelu je klikom i povlačenjem — bez koda. Dodavanje stavke u jelovnik traje nekoliko sekundi: naziv, cijena, fotografija. Potpuno postavljanje jelovnika obično traje 30 minuta do sat vremena." },
      { q: "Što je digitalni jelovnik IQ Rest?", a: "IQ Rest je cloud platforma za restorane. Digitalni jelovnik je online verzija vašeg jelovnika, dostupna gostima putem QR koda ili izravnog linka: fotografije jela, cijene, alergeni, AI prijevod na 35 jezika, ažuriranja u stvarnom vremenu. Jelovnik se hosta na našim poslužiteljima; ne morate instalirati ni održavati softver — samo otvorite preglednik." },
      { q: "Trebaju li gosti aplikaciju ili poseban hardver?", a: "Ne. Gosti usmjeravaju kameru telefona na QR kod i jelovnik se otvara u pregledniku. Admin panel za restoran također radi u svakom modernom pregledniku — telefon, tablet ili laptop. QR kodovi se ispisuju na svakom uredskom pisaču." },
      { q: "Mogu li jelovnik hostati na vlastitoj domeni?", a: "Da. Podržavamo prilagođenu domenu s SSL certifikatom — gosti vide jelovnik na adresi vašeg restorana (npr. jelovnik.vasrestoran.hr). Pomažemo s postavljanjem DNS-a; obično traje 5–10 minuta." },
      { q: "Mogu li upravljati s više restorana iz jednog računa?", a: "Da, na zahtjev. Jedan račun može hostati više restorana: svako mjesto s vlastitim jelovnikom, dizajnom, QR kodovima i analitikom. Pišite nam na WhatsApp i aktivirat ćemo višerestoranski način za vašu grupu." },
      { q: "Koliko je teško postaviti jelovnik od nule?", a: "Postavljanje se sastoji od tri koraka: (1) stvorite kategorije; (2) dodajte stavke s nazivima, cijenama i fotografijama; (3) ispišite QR kodove za stolove. Ako već imate papirni jelovnik ili PDF, učitajte ga — AI će prepoznati kategorije, nazive i cijene i automatski popuniti kartice. Osnovni jelovnik može biti online za 5 minuta; ukupno vrijeme ovisi o broju stavki." },
      { q: "Kakvu podršku nudite?", a: "Dostupni smo na WhatsAppu tijekom radnog vremena i brzo odgovaramo putem e-pošte. Pomažemo s početnim postavljanjem, konfiguracijom domene, dizajnom jelovnika i bilo kojom nestandardnom situacijom. Ako vam treba demo ili praktična podrška tijekom pokretanja — pišite nam." },
    ],
  },
};
