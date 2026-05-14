import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Analize meniu de restaurant — Scanări QR, top preparate, limbi turistice",
    description:
      "Vezi exact cum folosesc oaspeții meniul QR. Scanări zilnice, preparate cele mai vizionate, preferințe de limbă, ore de vârf. Decizii bazate pe date pentru restaurantul tău.",
    canonical: "https://iq-rest.com/ro/analytics",
    ogLocale: "ro_RO",
    ogTitle: "Analize restaurant — Urmărește scanări de meniu QR, preparate și limbi",
    ogDescription:
      "Află ce preparate privesc oaspeții tăi de fapt, când sunt orele de vârf și ce naționalitate de turist este în sala ta de mese în seara asta. 14 zile probă gratuită.",
  },

  hero: {
    title: "Nu mai ghici. Află ce fac oaspeții de fapt.",
    subtitle:
      "Vezi analize ale meniului restaurantului în timp real — scanări QR pe oră, preparatele la care zăbovesc oaspeții, limbile pe care le folosesc turiștii, cea mai lentă zi a săptămânii — și folosește acele date ca să printezi mai puține meniuri, să programezi mai inteligent, să împingi specialitățile potrivite.",
    trustLine: "500+ restaurante în 30+ țări",
  },

  seo: {
    description:
      "Analize de restaurant care nu necesită o echipă de date. IQ Rest urmărește fiecare scanare, vizualizare, schimbare de limbă și comandă din meniul tău QR și aduce la suprafață tiparele care contează: preparate cele mai vizionate, ore de vârf de scanare, ziua cea mai aglomerată a săptămânii, distribuția pe limbi a publicului tău turistic. Ia decizii bazate pe date fără să deschizi vreodată un spreadsheet.",
    fullDescription:
      "Majoritatea restaurantelor funcționează pe instinct — „simțim că marțea este lentă”, „cred că pastele se vând bine”. Instinctul e bun, dar datele sunt mai bune. IQ Rest urmărește fiecare interacțiune cu meniul tău QR, ca să nu fie nevoie să ghicești: de câte ori a fost scanat QR-ul tău azi, ce preparate au privit oaspeții cel mai mult timp, ce preparate au adăugat în coș dar nu au comandat, ce limbă au folosit turiștii.\n\nDashboard-ul de analize aduce răspunsurile în trei vizualizări: azi (scanări live, comenzi curente, ce se comandă chiar acum), această săptămână (top 10 preparate, ore aglomerate, distribuție pe limbi, neprezentări la rezervări) și tendințe (creștere lună-de-lună, sezonalitate, tipare pe zile). Poți intra în detaliu pe orice preparat ca să vezi cât de des este vizionat vs comandat (un preparat vizionat de 200 de ori dar comandat de 5 ori are o problemă de copy sau de poză) sau pe orice limbă ca să vezi ce mix turistic servești de fapt.\n\nObiectivul sunt deciziile, nu dashboard-urile: „marțea viitoare este istoric lentă → rulează o notificare push de happy hour”, „turiștii italieni comandă paste de 3x mai mult decât localnicii → pune pastele primele când limba=it”, „acest preparat are rată de vizionare de 90% dar rată de comandă de 5% → îmbunătățește poza”. Schimbări reale, venituri reale, fără MBA necesar.",
    benefitsHeading: "De ce restaurantele iubesc analizele IQ Rest în fața Google Analytics",
    benefits: [
      "Contor live de scanări QR — vezi seara ta umplându-se în timp real",
      "Top preparate vizionate și comandate — identifici ce funcționează și ce nu",
      "Distribuție pe limbi — știi ce turiști sunt în sala ta de mese",
      "Ore de vârf și tipare pe zile — programezi mai inteligent, prepari mai inteligent",
      "Conversie vizionare-la-comandă per preparat — repari poze proaste și descrieri slabe",
      "Analize de rezervări — surse de booking, rata de neprezentare, mix-ul de party-size",
    ],
  },

  pricing: {
    heading: "Un singur plan.",
    headingAccent: "Analize complete incluse.",
    sub: "Analize de restaurant, comenzi QR, traducere AI și rezervări — toate la un preț unic. Fără tier premium pentru date, niciodată.",
  },

  faq: {
    sub: "Tot ce întreabă proprietarii de restaurante despre analizele meniului. Nu vezi întrebarea ta? Scrie-ne pe WhatsApp — răspund oameni reali.",
    items: [
      {
        q: "Ce pot vedea de fapt în dashboard-ul de analize?",
        a: "Scanări QR live (azi, această săptămână, această lună), preparate cele mai vizionate, preparate cele mai comandate, conversie vizionare-la-comandă per preparat, distribuție pe limbi a oaspeților, ore de vârf pe zile ale săptămânii, valoarea medie a comenzii, mesele cele mai aglomerate, rata de neprezentare la rezervări și tendințele în timp. Totul pe un singur dashboard, fără setare necesară.",
      },
      {
        q: "Cum folosesc asta ca să-mi cresc de fapt veniturile?",
        a: "Trei tipare funcționează pentru majoritatea restaurantelor: (1) reordonezi meniul ca preparatele cu cea mai bună conversie să apară primele; (2) repari poza sau descrierea la preparatele cu vizionări mari dar comenzi puține; (3) împingi un happy-hour sau un special în zilele/orele istoric lente. Am văzut restaurante crescând veniturile din zilele de săptămână cu 15–30% doar din aceste trei modificări.",
      },
      {
        q: "Este anonim sau urmăriți persoane?",
        a: "Anonim și agregat. Urmărim vizualizările de meniu și comenzile pe sesiune, nu pe utilizator identificabil. Fără email-uri, fără numere de telefon, fără adrese IP stocate pe termen lung. Dashboard-ul îți arată tipare („200 de scanări vineri”), nu oameni. Pe deplin conform GDPR prin design.",
      },
      {
        q: "Pot exporta datele?",
        a: "Da. Exportă orice vizualizare ca CSV (top preparate, scanări zilnice, distribuție pe ore etc.) și deschide în Excel sau Google Sheets. Util pentru partajare cu investitori, contabili sau pentru combinare cu datele POS.",
      },
      {
        q: "Am nevoie de vreo configurare tehnică ca să primesc analize?",
        a: "Zero. Analizele sunt activate din start din momentul în care meniul tău QR este live — fiecare scanare, vizualizare și comandă este urmărită automat. Dashboard-ul face parte din abonamentul standard, nu este un upsell, iar vei vedea date utile în prima zi de când oaspeții scanează.",
      },
    ],
  },

  finalCta: {
    heading: "Nu mai ghici.",
    headingAccent: "Începe să măsori.",
    sub: "Analize live de scanări QR, top preparate, ore de vârf, distribuție pe limbi turistice. 14 zile probă gratuită, fără card.",
  },
};
