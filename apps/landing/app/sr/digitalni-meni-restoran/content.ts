import {
  Languages,
  ShieldAlert,
  Palette,
  ShoppingCart,
  MonitorSmartphone,
  BadgePercent,
  Globe,
  LayoutTemplate,
  Contact,
  MessageCircle,
  CalendarCheck,
} from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "sr",
  slug: "digitalni-meni-restoran",
  trackPrefix: "l_sr_digital",
  hideFeatureHeading: true,

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
    headline: "Digitalni meni\nkoji ima sve",
    cta: "Направи дигитални мени",
    sub: "Fotografije, alergeni i prevod na 35 jezika. Plus porudžbine, WhatsApp i rezervacija stolova — sve u jednom IQ Rest.",
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
      heading: "35 jezika za svakog gosta",
      body: "Jedan QR, 35 jezika. AI prevodi sa kulinarskim kontekstom, pa svako jelo zvuči prirodno. Turisti poručuju bez ustručavanja.",
      bullets: [
        "35 jezika u pretplati",
        "Kulinarski AI, ne Google",
        "Promena jezika jednim dodirom",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Dva gosta čitaju isti digitalni meni na različitim jezicima na svojim telefonima" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Alergeni",
      heading: "Alergeni i dijete na svakom jelu",
      body: "Označite gluten, laktozu, orašaste plodove, vegansko i bez glutena. Gosti filtriraju meni po svojoj ishrani i lako poručuju.",
      bullets: [
        "14 kategorija alergena",
        "Oznake vegansko i bez glutena",
        "Gosti filtriraju po ishrani",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Gost filtrira meni po alergenima na telefonu dok vlasnik uređuje listu alergena na tabletu" },
    },
    {
      icon: MonitorSmartphone,
      eyebrow: "Bilo koji uređaj",
      heading: "Upravljajte sa svakog uređaja",
      body: "Administrativni panel radi u pregledaču — menjajte meni, cene i fotografije bilo gde. Ništa se ne instalira.",
      bullets: [
        "Radi u svakom pregledaču",
        "Telefon, tablet ili PC",
        "Ništa se ne instalira",
      ],
    },
    {
      icon: BadgePercent,
      eyebrow: "Bez provizije",
      heading: "Nula provizije, bez dodataka",
      body: "Jedna transparentna pretplata. Ne uzimamo deo vašeg prometa niti krijemo naknade — sve ostaje restoranu.",
      bullets: [
        "Nula procenata na porudžbine",
        "Bez skrivenih dodataka",
        "Jedna fiksna cena",
      ],
    },
    {
      icon: Globe,
      eyebrow: "Sopstveni domen",
      heading: "Meni na vašem domenu",
      body: "Povezujemo vaš domen sa SSL — gosti vide meni na adresi vašeg restorana. Pomažemo sa DNS za 10 minuta.",
      bullets: [
        "Vaš domen sa SSL",
        "menu.vasrestoran.com",
        "Pomažemo sa DNS podešavanjem",
      ],
    },
    {
      icon: LayoutTemplate,
      eyebrow: "Vaš dizajn",
      heading: "Fleksibilan dizajn po meri",
      body: "Nekoliko gotovih šablona i stilova — izaberite naslovnu, boje i prikaz jela koji odgovaraju vašem lokalu.",
      bullets: [
        "Nekoliko gotovih šablona",
        "Vaša naslovna i boje",
        "Novi izgled u par klikova",
      ],
    },
    {
      icon: Contact,
      eyebrow: "Kontakti",
      heading: "Kontakti i mreže u meniju",
      body: "Posebna stranica sa mapom, telefonom i linkovima ka Instagramu i WhatsAppu — gosti vas nađu jednim dodirom.",
      bullets: [
        "Mapa, telefon i adresa",
        "Instagram i WhatsApp",
        "Dostupni jednim dodirom",
      ],
    },
    {
      icon: MessageCircle,
      eyebrow: "WhatsApp porudžbine",
      heading: "Primajte porudžbine preko WhatsAppa",
      body: "Gosti prave korpu i šalju porudžbinu pravo na vaš WhatsApp — bez posebne aplikacije, u čatu koji već koriste.",
      bullets: [
        "Porudžbina na vaš WhatsApp",
        "Bez posebne aplikacije",
        "Čat kao i obično",
      ],
    },
    {
      icon: CalendarCheck,
      eyebrow: "Rezervacije",
      heading: "Rezervacija stolova bez poziva",
      body: "Gosti sami rezervišu sto preko menija ili linka, vi vidite kalendar po stolovima i potvrđujete auto ili ručno.",
      bullets: [
        "Rezervacije 24/7, bez poziva",
        "Kalendar po stolovima",
        "Auto i ručna potvrda",
      ],
    },
    {
      icon: Palette,
      eyebrow: "Premijum dizajn",
      heading: "Izgleda kao sajt, ne kao PDF",
      body: "Video pozadina na ekranu dobrodošlice, opisan koncept i posebna stranica kontakta sa mapom i mrežama.",
      bullets: [
        "Video na početnom ekranu",
        "Opisan koncept i jela",
        "Posebna stranica kontakta",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Dva telefona na stolu kafića: početni ekran menija sa video pozadinom i stranica kontakta sa mapom" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Porudžbine · opciono",
      heading: "Porudžbine pravo iz menija",
      body: "Gosti prave korpu i šalju porudžbinu — stiže u salu, na WhatsApp ili na kuhinjski ekran. Opciono.",
      bullets: [
        "Korpa i slanje jednim dodirom",
        "U salu, WhatsApp ili kuhinju",
        "Uključite u podešavanjima",
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
