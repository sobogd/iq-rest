import { Languages, ShieldAlert, Palette, ShoppingCart } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "da",
  slug: "qr-kode-menukort-restaurant",
  trackPrefix: "l_da_qr",

  meta: {
    title: "QR-kode menukort til restauranter | IQ Rest",
    description:
      "QR-kode menukort til restauranter: gæsten scanner QR-koden på bordet, åbner menuen i browseren og bestiller på sit eget sprog. 14 dage gratis, uden kort.",
    canonical: "https://iq-rest.com/da/qr-kode-menukort-restaurant",
    ogLocale: "da_DK",
    ogTitle: "QR-kode menukort til restauranter",
    ogDescription:
      "QR på bordet, menu på telefonen — fotos, allergener, 35 sprog og opdateringer i realtid.",
    brandLine: "IQ Rest — QR-kode menukort til restauranter",
  },

  hero: {
    headline: "QR-kode menukort til restauranter.",
    cta: "Opret QR-menu",
    sub: "Gæsten retter kameraet mod QR-koden på bordet, og menuen åbnes med det samme i telefonens browser: billeder af retter, allergener, altid opdaterede priser og automatisk oversættelse til 35 sprog. Uden at downloade apps og uden at genoptrykke menuen ved hver prisændring.",
  },

  scan: {
    heading: "Har du allerede et papir- eller PDF-menukort?",
    headingAccent: "AI laver det om til et QR-menukort på 60 sekunder.",
    sub: "Upload et foto af menuen eller PDF'en — AI udtrækker kategorier, retter og priser og kobler dem straks til QR-menuen.",
    cta: "Opret QR-menu",
  },

  subFeatures: [
    {
      icon: Languages,
      eyebrow: "Én QR, 35 sprog",
      heading: "Én QR-kode, menuen på 35 sprog.",
      body: "Gæsten scanner QR'en og vælger sit sprog: oversættelsen klares af en AI med sans for gastronomi, ikke en generisk oversætter. Slut med separate menukort til turister og løse sedler på bordet.",
      bullets: [
        "Ét QR-tryk dækker 35 sprog, inkluderet i abonnementet.",
        "AI'en forstår køkkensproget — rettens navne lyder naturlige på alle sprog.",
        "Gæsten skifter sprog inde i menuen uden at scanne QR'en igen.",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "To gæster scanner den samme QR-kode på bordet og læser menuen på forskellige sprog" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Allergener i QR'en",
      heading: "Allergener og diætmærker inde i QR-menuen.",
      body: "Hver ret i menuen, der er koblet til QR'en, kan have mærker for gluten, laktose, nødder, skaldyr, veganske og glutenfrie muligheder. Gæsten filtrerer fra telefonen de retter, der passer til sine restriktioner, uden at spørge personalet.",
      bullets: [
        "14 allergenkategorier på retniveau.",
        "Vegan-, vegetar- og glutenfri-mærker med ét klik i panelet.",
        "Gæsten filtrerer QR-menuen efter sine egne restriktioner.",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Gæst filtrerer QR-menuen efter allergener på telefonen, mens ejeren redigerer listen fra en tablet" },
    },
    {
      icon: Palette,
      eyebrow: "Mere end bare en QR",
      heading: "Et QR-menukort, der er forfinet som restaurantens egen hjemmeside.",
      body: "Efter at have scannet koden lander gæsten ikke på en flad PDF: han ser en velkomstskærm med video eller fremhævet foto, beskrivelsen af stedet og en kontaktside med kort, telefonnumre og sociale links. QR'en bliver restaurantens hoveddør online.",
      bullets: [
        "Baggrundsvideo eller fremhævet foto på QR-menuens startskærm.",
        "Plads til at fortælle om stedets og hver kategoris koncept.",
        "Indbygget kontaktside: kort, telefon, Instagram, WhatsApp.",
      ],
      image: { src: "/landing/feature-design.webp", alt: "To telefoner på et bord: QR-menuens startskærm med baggrundsvideo og en kontaktside med kort" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Bestilling fra QR · valgfrit",
      heading: "Fra QR-koden kan gæsten også bestille.",
      body: "Ud over at se menuen kan QR-menuen blive en bestillingskanal: gæsten lægger retter i kurven og sender anmodningen. Bestillingen når tjeneren i lokalet, WhatsApp eller køkkenskærmen. Funktionen slås til eller fra i indstillingerne efter behov.",
      bullets: [
        "Kurv, noter og afsendelse af bestilling direkte fra QR-scanningen.",
        "Bestillingen ankommer straks i lokalet, på WhatsApp eller på køkkenskærmen.",
        "Funktionen kan aktiveres efter tidspunkter, lokaler eller bestemte restauranter.",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "To telefoner på et bord: en kurv oprettet fra QR-menuen og en bekræftelse på afsendt bestilling" },
    },
  ],

  faq: {
    sub: "Hvad restauratører spørger om QR-menukortet fra IQ Rest. Kan du ikke finde dit spørgsmål? Skriv til os på WhatsApp.",
    items: [
      { q: "Hvordan fungerer QR-menukortet fra IQ Rest?", a: "Hvert bord har en trykt QR-kode. Gæsten scanner den med telefonens kamera, og browseren åbner restaurantens menu — fotos, beskrivelser, allergener og opdaterede priser. Der kræves ingen app, hverken til gæsten eller personalet." },
      { q: "Skal jeg have tekniske færdigheder for at lave QR-menuen?", a: "Nej. Panelet fungerer med klik og træk-og-slip, uden kode eller komplicerede indstillinger. At tilføje en ret tager få sekunder: navn, pris, foto. Den indledende opsætning tager normalt 30 minutter til en time; har du allerede en PDF-menu, konverterer AI'en den automatisk." },
      { q: "Skal gæsterne installere en app for at læse QR'en?", a: "Nej. Det indbyggede kamera på iPhone og Android genkender QR-koden på sekunder og åbner menuen direkte i browseren. Administrationspanelet fungerer også fra enhver moderne browser — telefon, tablet eller laptop." },
      { q: "Hvordan trykkes QR-koderne til bordene?", a: "QR-koderne genereres automatisk i panelet (én pr. bord eller én til hele stedet) og downloades som trykklare PDF'er. Det kræver blot en kontorprinter og en holder: stander, klistermærke eller bordskåner." },
      { q: "Kan jeg bruge mit eget domæne til QR-menuen?", a: "Ja. Vi understøtter et restaurantdomæne med SSL-certifikat (for eksempel menu.dinrestaurant.dk): når gæsten scanner QR'en, ser han din restaurants adresse i stedet for et generisk subdomæne. DNS-opsætningen tager 5-10 minutter, og vi guider dig igennem." },
      { q: "Kan jeg administrere QR-koderne for flere restauranter fra én konto?", a: "Ja, på forespørgsel. Én konto kan samle flere steder, hvert med sine egne QR-koder, menu, design og analyser. Skriv til os på WhatsApp, så aktiverer vi multi-restaurant-tilstand." },
      { q: "Er det svært at lancere QR-menuen fra bunden?", a: "Tre trin: (1) opret kategorierne; (2) tilføj retterne med navn, pris og foto; (3) tryk QR-koderne og sæt dem på bordene. Har du allerede et papir- eller PDF-menukort, så upload det — AI'en genkender kategorier og priser og udfylder kortene. En basismenu kan være online på 5 minutter." },
    ],
  },
};
