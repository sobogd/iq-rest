import { Languages, ShieldAlert, Palette, ShoppingCart } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "ro",
  slug: "meniu-qr-cod-restaurant",
  trackPrefix: "l_ro_qr",

  meta: {
    title: "Meniu cu cod QR pentru restaurante | IQ Rest",
    description:
      "Meniu cu cod QR pentru restaurante: clientul scanează codul QR de pe masă, deschide meniul în browser și comandă în limba lui. 14 zile gratuit, fără card.",
    canonical: "https://iq-rest.com/ro/meniu-qr-cod-restaurant",
    ogLocale: "ro_RO",
    ogTitle: "Meniu cu cod QR pentru restaurante",
    ogDescription:
      "QR pe masă, meniu pe telefon — fotografii, alergeni, 35 de limbi și actualizări în timp real.",
    brandLine: "IQ Rest — Meniu cu cod QR pentru restaurante",
  },

  hero: {
    headline: "Meniu cu cod QR pentru restaurante.",
    sub: "Clientul îndreaptă camera spre codul QR de pe masă, iar meniul se deschide instant în browserul telefonului: fotografii ale preparatelor, alergeni, prețuri mereu actualizate și traducere automată în 35 de limbi. Fără descărcat aplicații, fără retipărit meniul la fiecare schimbare de preț.",
  },

  scan: {
    heading: "Ai deja un meniu pe hârtie sau PDF?",
    headingAccent: "IA îl transformă în meniu QR în 60 de secunde.",
    sub: "Încarcă o fotografie a meniului sau PDF-ul — IA extrage categoriile, preparatele și prețurile și le conectează imediat la meniul QR.",
    cta: "Creează meniul QR",
  },

  subFeatures: [
    {
      icon: Languages,
      eyebrow: "Un QR, 35 de limbi",
      heading: "Un singur cod QR, meniul în 35 de limbi.",
      body: "Clientul scanează QR-ul și își alege limba: traducerea o face o IA cu simț gastronomic, nu un traducător generic. Gata cu meniurile separate pentru turiști și foile răzlețe de pe masă.",
      bullets: [
        "O singură tipărire a QR acoperă 35 de limbi, incluse în abonament.",
        "IA înțelege limbajul culinar — numele preparatelor sună natural în fiecare limbă.",
        "Clientul schimbă limba în meniu, fără să rescaneze QR-ul.",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Doi clienți scanează același cod QR de pe masă și citesc meniul în limbi diferite" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Alergeni în QR",
      heading: "Alergeni și etichete dietetice în meniul QR.",
      body: "Fiecare preparat din meniul conectat la QR poate avea etichete pentru gluten, lactoză, nuci, fructe de mare, opțiuni vegane și fără gluten. Clientul filtrează de pe telefon preparatele compatibile cu restricțiile lui, fără să întrebe personalul.",
      bullets: [
        "14 categorii de alergeni la nivel de preparat.",
        "Etichete vegan, vegetarian și fără gluten cu un clic în panou.",
        "Clientul filtrează meniul QR după propriile restricții.",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Un client filtrează meniul QR după alergeni pe telefon în timp ce proprietarul editează lista de pe o tabletă" },
    },
    {
      icon: Palette,
      eyebrow: "Mai mult decât un simplu QR",
      heading: "Un meniu QR îngrijit ca site-ul restaurantului.",
      body: "După scanarea codului, clientul nu dă peste un PDF plat: vede un ecran de întâmpinare cu video sau fotografie principală, descrierea localului și o pagină de contact cu hartă, numere de telefon și rețele sociale. QR-ul devine ușa de intrare a restaurantului online.",
      bullets: [
        "Video de fundal sau fotografie principală pe ecranul de start al meniului QR.",
        "Spațiu pentru a povesti conceptul localului și al fiecărei categorii.",
        "Pagină de contact integrată: hartă, telefon, Instagram, WhatsApp.",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Două telefoane pe o masă: ecranul de start al meniului QR cu video de fundal și o pagină de contact cu hartă" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Comandă din QR · opțional",
      heading: "Din codul QR, clientul poate și comanda.",
      body: "Pe lângă consultarea meniului, meniul QR poate deveni un canal de comenzi: clientul adaugă preparatele în coș și trimite cererea. Comanda ajunge la ospătarul din sală, pe WhatsApp sau pe ecranul din bucătărie. Funcția se activează sau se dezactivează din setări când e nevoie.",
      bullets: [
        "Coș, comentarii și trimiterea comenzii direct din scanarea QR.",
        "Comanda ajunge instant în sală, pe WhatsApp sau pe ecranul din bucătărie.",
        "Funcție activabilă pe ore, săli sau restaurante anume.",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Două telefoane pe o masă: un coș creat din meniul QR și o confirmare de comandă trimisă" },
    },
  ],

  faq: {
    sub: "Ce întreabă restauratorii despre meniul cu cod QR de la IQ Rest. Nu îți găsești întrebarea? Scrie-ne pe WhatsApp.",
    items: [
      { q: "Cum funcționează meniul cu cod QR de la IQ Rest?", a: "Fiecare masă are un cod QR tipărit. Clientul îl scanează cu camera telefonului, iar browserul deschide meniul restaurantului — fotografii, descrieri, alergeni și prețuri actualizate. Nu e nevoie de nicio aplicație, nici pentru client, nici pentru personal." },
      { q: "Am nevoie de cunoștințe tehnice ca să creez meniul QR?", a: "Nu. Panoul funcționează prin clic și drag-and-drop, fără cod sau setări complicate. Adăugarea unui preparat durează câteva secunde: nume, preț, fotografie. Configurarea inițială durează de obicei între 30 de minute și o oră; dacă ai deja un PDF al meniului, IA îl convertește automat." },
      { q: "Trebuie clienții să instaleze o aplicație ca să citească QR-ul?", a: "Nu. Camera nativă de iPhone și Android recunoaște codul QR în câteva secunde și deschide meniul direct în browser. Panoul de administrare funcționează și el din orice browser modern — telefon, tabletă sau laptop." },
      { q: "Cum se tipăresc codurile QR pentru mese?", a: "Codurile QR se generează automat în panou (unul pe masă sau unul pentru tot localul) și se descarcă în PDF gata de tipărit. E suficientă o imprimantă de birou și un suport: șevalet, autocolant sau suport de pahar." },
      { q: "Pot folosi un domeniu propriu pentru meniul QR?", a: "Da. Acceptăm un domeniu al restaurantului cu certificat SSL (de exemplu meniu.restaurantultau.ro): când clientul scanează QR-ul, vede adresa restaurantului tău în loc de un subdomeniu generic. Configurarea DNS durează 5–10 minute și te însoțim în proces." },
      { q: "Pot gestiona codurile QR ale mai multor restaurante dintr-un singur cont?", a: "Da, la cerere. Un cont poate grupa mai multe locații, fiecare cu propriile coduri QR, meniu, design și statistici. Scrie-ne pe WhatsApp și activăm modul multi-restaurant." },
      { q: "E greu să lansez meniul QR de la zero?", a: "Trei pași: (1) creează categoriile; (2) adaugă preparatele cu nume, preț și fotografie; (3) tipărește codurile QR și pune-le pe mese. Dacă ai deja un meniu pe hârtie sau PDF, încarcă-l — IA recunoaște categoriile și prețurile și completează fișele. Un meniu de bază poate fi online în 5 minute." },
    ],
  },
};
