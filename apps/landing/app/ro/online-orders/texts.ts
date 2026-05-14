import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Comenzi online prin meniu QR — Comenzi pentru restaurant zero comision",
    description:
      "Primește comenzi directe din meniul tău QR. Zero comision, fără tăieri Uber Eats / Glovo. Oaspeții scanează, comandă, plătesc — direct la tine. 14 zile probă gratuită.",
    canonical: "https://iq-rest.com/ro/online-orders",
    ogLocale: "ro_RO",
    ogTitle: "Comenzi online fără comision — Comenzi directe din meniul tău QR",
    ogDescription:
      "Înlocuiește 30% comision la aplicațiile de livrare cu comenzi directe. Oaspeții scanează QR-ul, comandă, plătesc — fiecare ban merge la tine. 14 zile probă gratuită, fără card.",
  },

  hero: {
    title: "Comenzi directe. Zero comision. Direct la bucătăria ta.",
    subtitle:
      "Nu mai plăti 30% către Uber Eats, Glovo și Wolt. Cu IQ Rest, oaspeții scanează codul QR, își construiesc comanda pe telefon, iar bonul ajunge în bucătăria ta — fiecare ban rămâne la tine.",
    trustLine: "500+ restaurante în 30+ țări",
  },

  seo: {
    description:
      "Transformă-ți meniul QR într-un sistem complet de comenzi online fără să dai 30% aplicațiilor de livrare. Oaspeții scanează codul QR, răsfoiesc meniul în limba lor, construiesc un coș, trimit comanda — și o primești cu numărul mesei, instant. Fără descărcări de aplicații, fără comisioane, fără terți între tine și oaspete.",
    fullDescription:
      "Majoritatea restaurantelor pierd bani înainte ca mâncarea să iasă din bucătărie — Uber Eats ia 30%, Glovo ia 30%, Wolt ia 30%. Comenzile online prin IQ Rest funcționează complet diferit. Comanda merge direct de pe telefonul oaspetelui în dashboard-ul tău, iar întreaga marjă este a ta.\n\nUX-ul de comandă este construit specific pentru utilizare în restaurant: oaspeții aleg o masă, răsfoiesc meniul, adaugă produse în coș, lasă un comentariu pentru bucătărie și trimit. Vezi comenzile noi în timp real pe telefon sau pe ecranul din bucătărie, cu numărul mesei, produsele, modificatorii și notițele. Marchezi preparatele ca fiind gata, masa vede statusul — și economisești ospătarilor zeci de drumuri pe tură.\n\nFuncționează și pentru takeaway și pickup: oaspeții scanează autocolantul QR de la ușă, plasează o comandă și plătesc — nu ai nevoie de o aplicație separată de comenzi, de un site separat sau de un proiect de integrare Stripe.",
    benefitsHeading: "De ce comanda directă prin IQ Rest bate aplicațiile de livrare",
    benefits: [
      "Zero comision la fiecare comandă — păstrezi 100% din venituri",
      "Comenzile zboară în dashboard-ul tău cu numărul mesei în timp real",
      "Fără aplicație pentru oaspeți — scanează QR-ul și comandă în browser",
      "Modificatori, comentarii, notițe dietetice — toate capturate curat",
      "Funcționează pentru dine-in, takeaway și pickup — un meniu, trei fluxuri",
      "Sugestii de upsell integrate cresc valoarea medie a comenzii",
    ],
  },

  pricing: {
    heading: "Un singur plan.",
    headingAccent: "Zero comision.",
    sub: "Comenzi directe, meniu QR, site web pentru restaurant și rezervări — toate incluse. Fără taxe per comandă, fără proiect de integrare Stripe.",
  },

  faq: {
    sub: "Tot ce întreabă proprietarii de restaurante despre comenzile online. Nu vezi întrebarea ta? Scrie-ne pe WhatsApp — răspund oameni reali.",
    items: [
      {
        q: "Iei comision la comenzi?",
        a: "Zero. Fiecare comandă din meniul tău QR merge direct la tine — fără tăiere pentru noi, fără taxe Glovo / Uber Eats. Un singur abonament lunar fix, atât. Matematica e simplă: dacă faci 5.000€/lună din comenzi pe aplicații de livrare, pierzi 1.500€. Treci la comenzi directe și acei 1.500€ rămân în buzunarul tău.",
      },
      {
        q: "Cum plasează oaspeții o comandă — au nevoie de o aplicație?",
        a: "Fără aplicație. Oaspeții scanează codul QR cu camera telefonului, meniul se deschide în browser, aleg masa, răsfoiesc, adaugă în coș și trimit. Tot fluxul are două atingeri după scanare. Fără căutări în App Store, fără înregistrare, fără friction.",
      },
      {
        q: "Cum primesc comenzile în bucătărie?",
        a: "Comenzile apar instant în dashboard-ul tău, cu număr de masă, produse, modificatori și notițe. Le vezi pe telefon, pe o tabletă lângă pas sau pe un ecran din bucătărie. Marchezi produsele ca gata, iar masa vede statusul — mai puține apeluri „mai vine mâncarea?”, rotații mai rapide.",
      },
      {
        q: "Pot oaspeții să plătească prin meniul QR sau doar la masă?",
        a: "Ambele. Pot trimite și plăti cu numerar sau card la masă în mod clasic, sau pot plăti online prin Stripe direct prin meniu. Tu decizi ce este activat. Plata online este securizată de Stripe — IQ Rest nu ține banii niciodată, merg direct în contul tău Stripe.",
      },
      {
        q: "Funcționează și pentru takeaway și pickup, nu doar pentru dine-in?",
        a: "Da. Lipești un autocolant QR la intrarea ta pentru takeaway sau distribui linkul meniului pe Instagram și WhatsApp. Oaspeții aleg „pickup”, comandă, plătesc — tu pregătești, ei ridică. Același sistem, trei fluxuri diferite de comandă: dine-in, takeaway, pickup.",
      },
    ],
  },

  finalCta: {
    heading: "Nu mai hrăni aplicațiile de livrare.",
    headingAccent: "Începe să păstrezi 100%.",
    sub: "Înlocuiește comisioanele de 30% cu o taxă lunară fixă. 14 zile probă gratuită. Fără card. Anulezi oricând.",
  },
};
