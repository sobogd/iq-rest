import {
  Languages,
  ShieldAlert,
  Palette,
  ShoppingCart,
  CalendarCheck,
  MonitorSmartphone,
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
      eyebrow: "AI prevod",
      heading: "Meni na 35 jezika",
      body: "Jedan QR, 35 jezika. AI prevodi sa kulinarskim kontekstom, pa svako jelo zvuči prirodno. Turisti poručuju sigurno.",
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
      heading: "Alergeni i dijete na jelima",
      body: "Označite gluten, laktozu, orašaste plodove, vegansko i bez glutena. Gosti filtriraju meni po svojoj ishrani i lako poručuju.",
      bullets: [
        "14 kategorija alergena",
        "Oznake vegansko i bez glutena",
        "Gosti filtriraju po ishrani",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Gost filtrira meni po alergenima na telefonu dok vlasnik uređuje listu alergena na tabletu" },
    },
    {
      icon: Palette,
      eyebrow: "Dizajn i brend",
      heading: "Premijum meni na vašem domenu",
      body: "Video ekran dobrodošlice, vaš sopstveni dizajn i stranica kontakta sa mapom i mrežama — na vašem domenu, ne PDF.",
      bullets: [
        "Video i premijum dizajn",
        "Vaš domen sa SSL",
        "Kontakti, mapa i mreže",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Dva telefona na stolu kafića: početni ekran menija sa video pozadinom i stranica kontakta sa mapom" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Porudžbine",
      heading: "Onlajn porudžbine, nula provizije",
      body: "Gosti poručuju iz menija ili pravo na vaš WhatsApp — stiže u salu ili kuhinju, uz 0% uzeto od prometa.",
      bullets: [
        "Iz menija ili WhatsAppa",
        "U salu ili kuhinju, 0%",
        "Uključite u podešavanjima",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Dva telefona na stolu: korpa sa porudžbinom i potvrda poslate porudžbine" },
    },
    {
      icon: CalendarCheck,
      eyebrow: "Rezervacije",
      heading: "Rezervacija stolova, 24/7",
      body: "Gosti sami rezervišu sto preko menija ili linka, vi vidite kalendar po stolovima i potvrđujete auto ili ručno.",
      bullets: [
        "Gosti rezervišu sami",
        "Kalendar po stolovima",
        "Auto i ručna potvrda",
      ],
    },
    {
      icon: MonitorSmartphone,
      eyebrow: "Upravljanje",
      heading: "Upravljajte sa bilo kog mesta",
      body: "Administrativni panel radi u svakom pregledaču — telefon, tablet ili PC. Ništa se ne instalira, a osnovni meni je onlajn za par minuta.",
      bullets: [
        "Svaki uređaj, svaki pregledač",
        "Ništa se ne instalira",
        "Onlajn za par minuta",
      ],
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
