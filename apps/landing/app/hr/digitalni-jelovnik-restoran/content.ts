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
  locale: "hr",
  slug: "digitalni-jelovnik-restoran",
  trackPrefix: "l_hr_digital",
  hideFeatureHeading: true,

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
    headline: "Digitalni jelovnik\nkoji ima sve",
    cta: "Izradi digitalni jelovnik",
    sub: "Fotografije, alergeni i prijevod na 35 jezika. Plus narudžbe, WhatsApp i rezervacije stolova — sve u jednom IQ Rest.",
  },

  scan: {
    heading: "Imate jelovnik na papiru ili PDF?",
    headingAccent: "AI ga digitalizira u 60 sekundi.",
    sub: "Učitajte fotografiju ili dokument — AI automatski prepoznaje kategorije, jela i cijene.",
    cta: "Skeniraj jelovnik",
  },

  subFeatures: [
    {
      icon: Languages,
      eyebrow: "AI prijevod",
      heading: "Jelovnik na 35 jezika",
      body: "Jedan QR, 35 jezika. AI prevodi s kulinarskim kontekstom, pa svako jelo zvuči prirodno. Turisti naručuju sa sigurnošću.",
      bullets: [
        "35 jezika u paketu",
        "Kulinarski AI, ne Google",
        "Promjena jezika jednim dodirom",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Dva gosta čitaju isti digitalni jelovnik na različitim jezicima na svojim telefonima" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Alergeni",
      heading: "Alergeni i dijete na jelima",
      body: "Označite gluten, laktozu, orašaste plodove, vegansko i bez glutena. Gosti filtriraju jelovnik po dijeti i lako naručuju.",
      bullets: [
        "14 kategorija alergena",
        "Oznake vegansko i bez glutena",
        "Gosti filtriraju po dijeti",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Gost filtrira jelovnik prema alergenima na telefonu dok vlasnik uređuje popis alergena na tabletu" },
    },
    {
      icon: Palette,
      eyebrow: "Dizajn i brend",
      heading: "Premium jelovnik na vašoj domeni",
      body: "Video pozdravni zaslon, vlastiti dizajn i kontakt stranica s kartom i mrežama — na vlastitoj domeni, ne PDF.",
      bullets: [
        "Video i premium dizajn",
        "Vaša domena sa SSL",
        "Kontakti, karta i mreže",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Dva telefona na kafićkom stolu: početni zaslon jelovnika s video pozadinom i kontakt stranica s kartom" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Narudžbe",
      heading: "Online narudžbe, nula provizije",
      body: "Gosti naručuju iz jelovnika ili ravno na vaš WhatsApp — stiže u salu ili kuhinju, s 0% od prodaje.",
      bullets: [
        "Iz jelovnika ili s WhatsApp",
        "U salu ili kuhinju, 0%",
        "Uključite u postavkama",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Dva telefona na stolu: košarica s narudžbom i potvrda poslane narudžbe" },
    },
    {
      icon: CalendarCheck,
      eyebrow: "Rezervacije",
      heading: "Rezervacija stola, 24/7",
      body: "Gosti sami rezerviraju stol putem jelovnika ili linka, vi vidite kalendar po stolovima i potvrđujete auto ili ručno.",
      bullets: [
        "Gosti rezerviraju sami",
        "Kalendar po stolovima",
        "Auto i ručna potvrda",
      ],
    },
    {
      icon: MonitorSmartphone,
      eyebrow: "Upravljanje",
      heading: "Upravljajte s bilo kojeg mjesta",
      body: "Admin panel radi u svakom pregledniku — telefon, tablet ili PC. Ništa za instalirati, a osnovni jelovnik kreće za par minuta.",
      bullets: [
        "Bilo koji uređaj i preglednik",
        "Ništa za instalirati",
        "Kreće za par minuta",
      ],
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
