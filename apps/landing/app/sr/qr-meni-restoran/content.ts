import { Languages, ShieldAlert, Palette, ShoppingCart } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "sr",
  slug: "qr-meni-restoran",
  trackPrefix: "l_sr_qr",

  meta: {
    title: "QR meni za restorane | IQ Rest",
    description:
      "QR meni za restorane: gost skenira QR kod na stolu, otvori meni u pregledaču i poruči na svom jeziku. 14 dana besplatno, bez kartice.",
    canonical: "https://iq-rest.com/sr/qr-meni-restoran",
    ogLocale: "sr_RS",
    ogTitle: "QR meni za restorane",
    ogDescription:
      "QR na stolu, meni na telefonu — fotografije, alergeni, 35 jezika i ažuriranja u realnom vremenu.",
    brandLine: "IQ Rest — QR meni za restorane",
  },

  hero: {
    headline: "QR meni za restorane.",
    sub: "Gost usmeri kameru na QR kod na stolu i meni se odmah otvori u pregledaču telefona: fotografije jela, alergeni, uvek ažurne cene i automatski prevod na 35 jezika. Bez preuzimanja aplikacija, bez ponovnog štampanja menija pri svakoj promeni cene.",
  },

  scan: {
    heading: "Već imate papirni ili PDF meni?",
    headingAccent: "AI ga pretvara u QR meni za 60 sekundi.",
    sub: "Otpremite fotografiju menija ili PDF — AI prepoznaje kategorije, jela i cene i odmah ih povezuje sa QR menijem.",
    cta: "Napravi QR meni",
  },

  subFeatures: [
    {
      icon: Languages,
      eyebrow: "Jedan QR, 35 jezika",
      heading: "Jedan QR kod, meni na 35 jezika.",
      body: "Gost skenira QR i bira svoj jezik: prevod obavlja AI sa gastronomskim osećajem, a ne generički prevodilac. Kraj zasebnim menijima za turiste i razbacanim papirima na stolu.",
      bullets: [
        "Jedno štampanje QR-a pokriva 35 jezika, uključeno u pretplatu.",
        "AI razume kuhinjski jezik — nazivi jela zvuče prirodno na svakom jeziku.",
        "Gost menja jezik unutar menija, bez ponovnog skeniranja QR-a.",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Dva gosta skeniraju isti QR kod sa stola i čitaju meni na različitim jezicima" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Alergeni u QR-u",
      heading: "Alergeni i dijetetske oznake unutar QR menija.",
      body: "Svako jelo u meniju povezanom sa QR-om može nositi oznake za gluten, laktozu, koštunjave plodove, plodove mora, veganske i bezglutenske opcije. Gost sa telefona filtrira jela koja odgovaraju njegovim ograničenjima, bez pitanja osoblja.",
      bullets: [
        "14 kategorija alergena na nivou jela.",
        "Veganske, vegetarijanske i bezglutenske oznake jednim klikom u panelu.",
        "Gost filtrira QR meni prema sopstvenim ograničenjima.",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Gost filtrira QR meni po alergenima na telefonu dok vlasnik uređuje listu na tabletu" },
    },
    {
      icon: Palette,
      eyebrow: "Više od običnog QR-a",
      heading: "QR meni doteran kao sajt restorana.",
      body: "Nakon skeniranja koda gost ne nailazi na ravan PDF: vidi početni ekran sa videom ili istaknutom fotografijom, opis lokala i stranicu kontakta sa mapom, telefonima i društvenim mrežama. QR postaje ulazna vrata restorana na internetu.",
      bullets: [
        "Pozadinski video ili istaknuta fotografija na početnom ekranu QR menija.",
        "Prostor za priču o konceptu lokala i svake kategorije.",
        "Ugrađena stranica kontakta: mapa, telefon, Instagram, WhatsApp.",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Dva telefona na stolu: početni ekran QR menija sa pozadinskim videom i stranica kontakta sa mapom" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Poručivanje iz QR-a · opciono",
      heading: "Iz QR koda gost može i da poruči.",
      body: "Pored pregleda menija, QR meni može postati kanal za porudžbine: gost dodaje jela u korpu i šalje zahtev. Porudžbina stiže konobaru u sali, na WhatsApp ili na kuhinjski ekran. Funkcija se po potrebi uključuje ili isključuje u podešavanjima.",
      bullets: [
        "Korpa, napomene i slanje porudžbine direktno iz skeniranja QR-a.",
        "Porudžbina odmah stiže u salu, na WhatsApp ili na kuhinjski ekran.",
        "Funkcija se može aktivirati po terminima, salama ili određenim restoranima.",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Dva telefona na stolu: korpa napravljena iz QR menija i potvrda poslate porudžbine" },
    },
  ],

  faq: {
    sub: "Šta ugostitelji pitaju o QR meniju IQ Resta. Ne nalazite svoje pitanje? Pišite nam na WhatsApp.",
    items: [
      { q: "Kako radi QR meni IQ Resta?", a: "Svaki sto ima odštampan QR kod. Gost ga skenira kamerom telefona i pregledač otvara meni restorana — fotografije, opisi, alergeni i ažurne cene. Nikakva aplikacija nije potrebna, ni gostu ni osoblju." },
      { q: "Da li su mi potrebna tehnička znanja za pravljenje QR menija?", a: "Ne. Panel radi na klik i prevlačenje, bez koda i složenih podešavanja. Dodavanje jela traje nekoliko sekundi: naziv, cena, fotografija. Početno podešavanje obično traje od 30 minuta do sat vremena; ako već imate PDF meni, AI ga automatski konvertuje." },
      { q: "Da li gosti moraju da instaliraju aplikaciju da bi pročitali QR?", a: "Ne. Izvorna kamera iPhonea i Androida prepoznaje QR kod za nekoliko sekundi i otvara meni direktno u pregledaču. Administratorski panel takođe radi u svakom modernom pregledaču — telefon, tablet ili laptop." },
      { q: "Kako se štampaju QR kodovi za stolove?", a: "QR kodovi se u panelu generišu automatski (jedan po stolu ili jedan za ceo lokal) i preuzimaju kao PDF spreman za štampu. Dovoljan je kancelarijski štampač i stalak: stalak, nalepnica ili podmetač za čašu." },
      { q: "Mogu li da koristim sopstveni domen za QR meni?", a: "Da. Podržavamo domen restorana sa SSL sertifikatom (na primer meni.vasrestoran.rs): kada gost skenira QR, vidi adresu vašeg restorana umesto generičkog poddomena. Podešavanje DNS-a traje 5–10 minuta i vodimo vas kroz njega." },
      { q: "Mogu li da upravljam QR kodovima više restorana sa jednog naloga?", a: "Da, na zahtev. Jedan nalog može da objedini više lokala, svaki sa sopstvenim QR kodovima, menijem, dizajnom i analitikom. Pišite nam na WhatsApp i uključićemo režim sa više restorana." },
      { q: "Da li je teško pokrenuti QR meni od nule?", a: "Tri koraka: (1) napravite kategorije; (2) dodajte jela sa nazivom, cenom i fotografijom; (3) odštampajte QR kodove i stavite ih na stolove. Ako već imate papirni ili PDF meni, otpremite ga — AI prepoznaje kategorije i cene i popunjava kartice. Osnovni meni može biti onlajn za 5 minuta." },
    ],
  },
};
