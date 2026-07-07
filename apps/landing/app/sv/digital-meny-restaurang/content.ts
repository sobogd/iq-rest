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
  locale: "sv",
  slug: "digital-meny-restaurang",
  trackPrefix: "l_sv_digital",
  featureHeading: {
    heading: "Mer än en meny",
    sub: "Allt som gör en QR-meny till en tjänst för din matsal och ditt kök.",
  },

  meta: {
    title: "Digital meny för restauranger | IQ Rest",
    description:
      "Digital meny för restauranger: onlinekort med bilder, allergener, AI-översättning och uppdateringar av priser i realtid. 14 dagar gratis, inget kort krävs.",
    canonical: "https://iq-rest.com/sv/digital-meny-restaurang",
    ogLocale: "sv_SE",
    ogTitle: "Digital meny för restauranger",
    ogDescription:
      "Onlineversion av din pappersmeny — bilder, allergener, AI-översättning, uppdateringar i realtid.",
    brandLine: "IQ Rest — Digital meny för restauranger",
  },

  hero: {
    headline: "En digital meny\nsom har allt",
    cta: "Skapa digital meny",
    sub: "Bilder, allergener och översättning till 35 språk. Plus beställningar, WhatsApp och bordsbokning — allt i en IQ Rest.",
  },

  scan: {
    heading: "Har du en pappersmeny eller PDF?",
    headingAccent: "AI digitaliserar den på 60 sekunder.",
    sub: "Ladda upp ett foto eller dokument — AI:n känner igen kategorier, rätter och priser automatiskt.",
    cta: "Skanna meny",
  },

  subFeatures: [
    {
      icon: Languages,
      eyebrow: "AI-översättning",
      heading: "Meny på 35 språk",
      body: "En QR, 35 språk. AI:n översätter med kulinarisk kontext, så varje rätt låter naturlig. Turister beställer med trygghet.",
      bullets: [
        "35 språk i din prenumeration",
        "Kulinarisk AI, inte Google",
        "Byt språk med ett tryck",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Två gäster läser samma digitala meny på olika språk på sina egna telefoner" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Allergener",
      heading: "Allergener och koster på rätterna",
      body: "Markera gluten, laktos, nötter, veganskt och glutenfritt. Gästerna filtrerar menyn efter sin kost och beställer med lätthet.",
      bullets: [
        "14 allergenkategorier",
        "Vegan- och glutenfri-etiketter",
        "Gäster filtrerar efter kost",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Gäst filtrerar menyn efter allergener på telefonen medan ägaren redigerar allergenlistan på en surfplatta" },
    },
    {
      icon: Palette,
      eyebrow: "Design och varumärke",
      heading: "Premiummeny på din domän",
      body: "Videovälkomstskärm, din egen design och en kontaktsida med karta och sociala medier — på din egen domän, inte en PDF.",
      bullets: [
        "Video och premiumdesign",
        "Din domän med SSL",
        "Kontakt, karta och sociala medier",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Två telefoner på ett kafébord: menyns startskärm med videobakgrund och kontaktsidan med karta" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Beställningar",
      heading: "Onlinebeställningar, noll provision",
      body: "Gästerna beställer från menyn eller direkt till din WhatsApp — det landar i salen eller köket, med 0% taget från försäljningen.",
      bullets: [
        "Från menyn eller WhatsApp",
        "Till sal eller kök, 0%",
        "Slå på det i inställningar",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Två telefoner på ett bord: varukorg med beställning och bekräftelse på skickad beställning" },
    },
    {
      icon: CalendarCheck,
      eyebrow: "Bokningar",
      heading: "Bordsbokning, 24/7",
      body: "Gästerna bokar bord själva via menyn eller en länk, du ser kalendern per bord och bekräftar automatiskt eller manuellt.",
      bullets: [
        "Gäster bokar själva",
        "Kalender över alla bord",
        "Auto- och manuell bekräftelse",
      ],
    },
    {
      icon: MonitorSmartphone,
      eyebrow: "Hantering",
      heading: "Sköt det var som helst ifrån",
      body: "Adminpanelen körs i vilken webbläsare som helst — telefon, surfplatta eller PC. Inget att installera, och en enkel meny är live på minuter.",
      bullets: [
        "Vilken enhet och webbläsare som helst",
        "Inget att installera",
        "Live på minuter",
      ],
    },
  ],

  faq: {
    sub: "Vad restauratörer frågar om den digitala menyn i IQ Rest. Hittar du inte din fråga? Skriv till oss på WhatsApp.",
    items: [
      { q: "Behöver jag tekniska kunskaper eller CMS-erfarenhet?", a: "Nej, inga särskilda färdigheter krävs. Varje åtgärd i administrationspanelen är klicka-och-peka och dra-och-släpp — utan någon kod. Att lägga till en menyrätt tar några sekunder: namn, pris, foto. En komplett menyuppsättning tar vanligtvis 30 minuter till en timme." },
      { q: "Vad är IQ Rest digital meny?", a: "IQ Rest är en molnplattform för restauranger. Den digitala menyn är onlineversionen av din meny, tillgänglig för gäster via en QR-kod eller direktlänk: rättsbilder, priser, allergener, AI-översättning till 35 språk, uppdateringar i realtid. Menyn hostas på våra servrar; du behöver inte installera eller underhålla mjukvara — bara öppna webbläsaren." },
      { q: "Behöver gästerna en app eller särskild hårdvara?", a: "Nej. Gästerna riktar telefonkameran mot QR-koden och menyn öppnas i webbläsaren. Administrationspanelen för restaurangen körs också i vilken modern webbläsare som helst — telefon, surfplatta eller laptop. QR-koder skrivs ut på vilken kontorsskrivare som helst." },
      { q: "Kan jag hosta menyn på min egen domän?", a: "Ja. Vi stödjer en anpassad domän med SSL-certifikat — gästerna ser menyn på din restaurangs adress (t.ex. meny.dinrestaurang.se). Vi hjälper till med DNS-konfigurationen; det tar vanligtvis 5–10 minuter." },
      { q: "Kan jag hantera flera restauranger från ett konto?", a: "Ja, på begäran. Ett konto kan hysa flera restauranger: varje plats med egen meny, design, QR-koder och analys. Skriv till oss på WhatsApp så aktiverar vi multi-restaurangläget för din grupp." },
      { q: "Hur svårt är det att sätta upp menyn från grunden?", a: "Uppsättningen består av tre steg: (1) skapa kategorier; (2) lägg till rätter med namn, priser och bilder; (3) skriv ut QR-koder för borden. Om du redan har en pappersmeny eller en PDF, ladda upp den — AI:n känner igen kategorier, namn och priser och fyller i korten automatiskt. En enkel meny kan vara live på 5 minuter; den totala uppsättningstiden beror på antalet rätter." },
      { q: "Vilken sorts support erbjuder ni?", a: "Vi är tillgängliga på WhatsApp under kontorstid och svarar snabbt via e-post. Vi hjälper till med den initiala uppsättningen, domänkonfiguration, menydesign och alla icke-standardiserade situationer. Om du behöver en demo eller praktisk support vid lansering — skriv till oss." },
    ],
  },
};
