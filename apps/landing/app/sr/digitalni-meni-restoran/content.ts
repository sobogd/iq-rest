import { Languages, ShieldAlert, Palette, ShoppingCart } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "sr",
  slug: "digitalni-meni-restoran",
  trackPrefix: "l_sr_digital",

  meta: {
    title: "Digitalni meni za restorane | IQ Rest",
    description:
      "Digitalni meni za restorane: onlajn karta sa fotografijama, alergenima, AI prevodom i ažuriranjima cena u realnom vremenu. 14 dana besplatno, bez kartice.",
    canonical: "https://iq-rest.com/sr/digitalni-meni-restoran",
    ogLocale: "sr_RS",
    ogTitle: "Digitalni meni za restorane",
    ogDescription:
      "Onlajn verzija vašeg papirnog menija — fotografije, alergeni, AI prevod, ažuriranja u realnom vremenu.",
    brandLine: "IQ Rest — Digitalni meni za restorane",
  },

  hero: {
    headline: "Digitalni meni za restorane.",
    cta: "Направи дигитални мени",
    sub: "Onlajn verzija vašeg papirnog menija sa fotografijama, alergenima, opisima i ažuriranjima cena u realnom vremenu. Gosti vide meni na svom jeziku; restoran štedi na štampi.",
  },

  scan: {
    heading: "Imate papirni meni ili PDF?",
    headingAccent: "AI ga digitalizuje za 60 sekundi.",
    sub: "Otpremite fotografiju ili dokument — AI automatski prepoznaje kategorije, jela i cene.",
    cta: "Skeniraj meni",
  },

  subFeatures: [
    {
      icon: Languages,
      eyebrow: "35 AI jezika",
      heading: "35 AI jezika — svaki gost čita meni na svom.",
      body: "Jedan QR kod, 35 jezika. AI razume kulinarski kontekst — imena jela i opisi zvuče prirodno. Turisti poručuju sa većom sigurnošću i prosečan račun raste, bez da konobar mora da prevodi svako jelo.",
      bullets: [
        "35 jezika uključeno u pretplatu, bez doplate.",
        "AI sa razumevanjem kulinarskog konteksta, ne sirov Google Translate.",
        "Gost menja jezik jednim dodirom u samom meniju.",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Dva gosta čitaju isti digitalni meni na različitim jezicima na svojim telefonima" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Alergeni",
      heading: "Oznake alergena i dijeta.",
      body: "Označite jela za gluten, laktozu, orašaste plodove, plodove mora, veganske i bezglutenske opcije. Gosti filtriraju meni prema svojim dijetnim potrebama i poručuju sa većom sigurnošću.",
      bullets: [
        "14 standardnih kategorija alergena na svakom jelu.",
        "Oznake vegansko, vegetarijansko i bez glutena jednim klikom.",
        "Gosti filtriraju meni prema svojim dijetnim ograničenjima.",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Gost filtrira meni po alergenima na telefonu dok vlasnik uređuje listu alergena na tabletu" },
    },
    {
      icon: Palette,
      eyebrow: "Premijum dizajn",
      heading: "Premijum dizajn sa video pozadinom i stranicom kontakta.",
      body: "Video ili fotografija na ekranu dobrodošlice, opis restorana, namenska stranica kontakta sa mapom, telefonima i profilima na društvenim mrežama. Digitalni meni izgleda kao pun sajt restorana, ne kao PDF iza QR koda.",
      bullets: [
        "Video pozadina ili velika fotografija na ekranu dobrodošlice.",
        "Opisi restorana i kategorija — ispričajte priču koncepta.",
        "Stranica kontakta: mapa, telefon, Instagram, WhatsApp.",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Dva telefona na stolu kafića: početni ekran menija sa video pozadinom i stranica kontakta sa mapom" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Porudžbine iz menija · opciono",
      heading: "Gosti poručuju direktno iz menija.",
      body: "Gosti grade korpu u QR meniju i šalju porudžbinu — stiže konobaru u sali ili na tablet u kuhinji. Funkcija se može uključiti ili isključiti u podešavanjima u bilo kom trenutku.",
      bullets: [
        "Korpa, komentari i slanje porudžbine jednim dodirom.",
        "Porudžbina odmah stiže u administrativni panel, na WhatsApp ili na kuhinjski ekran.",
        "Funkcija se prebacuje u podešavanjima.",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Dva telefona na stolu: korpa sa porudžbinom i potvrda poslate porudžbine" },
    },
  ],

  faq: {
    sub: "Šta restorateri pitaju o digitalnom meniju u IQ Rest. Ne nalazite svoje pitanje? Pišite nam na WhatsApp.",
    items: [
      { q: "Da li mi trebaju tehničke veštine ili iskustvo sa CMS-om?", a: "Ne, posebne veštine nisu potrebne. Svaka radnja u administrativnom panelu je klikom i prevlačenjem — bez koda. Dodavanje stavke u meni traje nekoliko sekundi: ime, cena, fotografija. Potpuno podešavanje menija obično traje 30 minuta do sat vremena." },
      { q: "Šta je digitalni meni IQ Rest?", a: "IQ Rest je cloud platforma za restorane. Digitalni meni je onlajn verzija vašeg menija, dostupna gostima preko QR koda ili direktnog linka: fotografije jela, cene, alergeni, AI prevod na 35 jezika, ažuriranja u realnom vremenu. Meni se hostuje na našim serverima; ne morate instalirati ili održavati softver — samo otvorite pretraživač." },
      { q: "Da li gostima treba aplikacija ili poseban hardver?", a: "Ne. Gosti usmere kameru telefona ka QR kodu i meni se otvara u pretraživaču. Administrativni panel za restoran takođe radi u svakom modernom pretraživaču — telefon, tablet ili laptop. QR kodovi se štampaju na bilo kom kancelarijskom štampaču." },
      { q: "Mogu li hostovati meni na sopstvenom domenu?", a: "Da. Podržavamo prilagođeni domen sa SSL sertifikatom — gosti vide meni na adresi vašeg restorana (npr. meni.vasrestoran.rs). Pomažemo sa podešavanjem DNS-a; obično traje 5–10 minuta." },
      { q: "Mogu li upravljati sa više restorana iz jednog naloga?", a: "Da, na zahtev. Jedan nalog može da hostuje više restorana: svako mesto sa svojim menijem, dizajnom, QR kodovima i analitikom. Pišite nam na WhatsApp i aktiviraćemo multi-restoran režim za vašu grupu." },
      { q: "Koliko je teško podesiti meni od nule?", a: "Podešavanje se sastoji iz tri koraka: (1) napravite kategorije; (2) dodajte stavke sa imenima, cenama i fotografijama; (3) odštampajte QR kodove za stolove. Ako već imate papirni meni ili PDF, otpremite ga — AI će prepoznati kategorije, imena i cene i automatski popuniti kartice. Osnovni meni može biti onlajn za 5 minuta; ukupno vreme zavisi od broja stavki." },
      { q: "Kakvu podršku nudite?", a: "Dostupni smo na WhatsApp tokom radnog vremena i brzo odgovaramo putem e-pošte. Pomažemo sa početnim podešavanjem, konfiguracijom domena, dizajnom menija i bilo kojom nestandardnom situacijom. Ako vam treba demo ili praktična podrška tokom pokretanja — pišite nam." },
    ],
  },
};
