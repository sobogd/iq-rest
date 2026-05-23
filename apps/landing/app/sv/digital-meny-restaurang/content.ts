import { Languages, ShieldAlert, Palette, LayoutList, Smartphone, ShoppingCart } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "sv",
  slug: "digital-meny-restaurang",
  trackPrefix: "l_sv_digital",

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
    headline: "Digital meny för restauranger.",
    sub: "Onlineversion av din pappersmeny med bilder, allergener, beskrivningar och prisuppdateringar i realtid. Gäster ser menyn på sitt eget språk; restaurangen sparar på tryck.",
  },

  scan: {
    heading: "Har du en pappersmeny eller PDF?",
    headingAccent: "AI digitaliserar den på 60 sekunder.",
    sub: "Ladda upp ett foto eller dokument — AI:n känner igen kategorier, rätter och priser automatiskt.",
    cta: "Skanna meny",
  },

  subFeatures: [
    {
      icon: LayoutList,
      eyebrow: "Meny utan bilder",
      heading: "En meny utan bilder ser lika bra ut.",
      body: "Vissa rätter kanske inte har bilder — och det är helt okej. IQ Rest renderar kort med och utan bilder på samma sätt: typografin, allergenerna och priserna behåller en premiumkänsla. En blandning av rätter med och utan bilder förblir enhetlig.",
      bullets: [
        "Kort utan bilder ser inte tomma ut.",
        "Typografin anpassas efter kortets innehåll.",
        "Enhetlig stil för rätter med och utan bilder.",
      ],
      image: { src: "/landing/feature-photos-optional.webp", alt: "Två telefoner på ett bord: meny med rättsbilder och en meny med endast text" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Allergener",
      heading: "Etiketter för allergener och kost.",
      body: "Markera rätter för gluten, laktos, nötter, skaldjur, veganska och glutenfria alternativ. Gästerna filtrerar menyn efter sina kostbehov och beställer med större trygghet.",
      bullets: [
        "14 standardkategorier av allergener på varje rätt.",
        "Vegan-, vegetariska och glutenfria etiketter med ett klick.",
        "Gästerna filtrerar menyn efter sina kostbegränsningar.",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Gäst filtrerar menyn efter allergener på telefonen medan ägaren redigerar allergenlistan på en surfplatta" },
    },
    {
      icon: Palette,
      eyebrow: "Premiumdesign",
      heading: "Premiumdesign med videobakgrund och kontaktsida.",
      body: "Video eller bild på välkomstskärmen, beskrivning av restaurangen, dedikerad kontaktsida med karta, telefonnummer och sociala profiler. Den digitala menyn ser ut som en komplett restaurangwebbplats, inte en PDF bakom en QR-kod.",
      bullets: [
        "Videobakgrund eller stor bild på välkomstskärmen.",
        "Beskrivningar av restaurang och kategorier — berätta konceptets historia.",
        "Kontaktsida: karta, telefon, Instagram, WhatsApp.",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Två telefoner på ett kafébord: menyns startskärm med videobakgrund och kontaktsidan med karta" },
    },
    {
      icon: Languages,
      eyebrow: "35 AI-språk",
      heading: "35 AI-språk — varje gäst läser menyn på sitt eget.",
      body: "En QR-kod, 35 språk. AI:n hanterar den kulinariska kontexten — rätternas namn och beskrivningar låter naturliga. Turister beställer med större trygghet och snittnotan växer utan att en servitör behöver översätta varje rätt.",
      bullets: [
        "35 språk ingår i prenumerationen, ingen tilläggsavgift.",
        "AI med förståelse för matlagning, inte rå Google Translate.",
        "Gästen byter språk med ett enda tryck inne i menyn.",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Två gäster läser samma digitala meny på olika språk på sina egna telefoner" },
    },
    {
      icon: Smartphone,
      eyebrow: "Hantera från valfri enhet",
      heading: "Hantera menyn från valfri enhet.",
      body: "En enda panel öppnas i webbläsaren på telefon, surfplatta eller laptop. Ändra ett pris, ta bort en rätt från stopplistan eller lägg till en dagens — gästerna ser ändringen inom sekunder. Inga installationer, inga integrationer.",
      bullets: [
        "Ingen app att installera — öppna webbläsaren och du är inne.",
        "Priser, bilder och stopplista — några tryck från telefonen.",
        "Hantera menyn varifrån som helst, även från salen.",
      ],
      image: { src: "/landing/feature-mobile.webp", alt: "Laptop och telefon på ett kafébord redigerar samma menyrätt på båda enheterna" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Beställningar från menyn · valfritt",
      heading: "Gäster lägger beställningar direkt från menyn.",
      body: "Gäster bygger en varukorg i QR-menyn och skickar beställningen — den landar hos servitören i salen eller på köksplattan. Funktionen kan aktiveras eller inaktiveras i inställningarna när som helst.",
      bullets: [
        "Varukorg, kommentarer och beställningsutskick med ett tryck.",
        "Beställningen landar omedelbart i administrationspanelen, WhatsApp eller på köksskärmen.",
        "Funktionen växlas i inställningarna.",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Två telefoner på ett bord: varukorg med beställning och bekräftelse på skickad beställning" },
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
