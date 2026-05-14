import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Varumärkt restaurangmeny — anpassat färgschema och tema",
    description:
      "Matcha ditt restaurangvarumärke med anpassade accentfärger. Ljusa och mörka teman växlar automatiskt med gästens telefon. Varumärkt QR-meny på sekunder. 14 dagars provperiod.",
    canonical: "https://iq-rest.com/sv/color-scheme",
    ogLocale: "sv_SE",
    ogTitle: "Anpassat färgschema — varumärkt restaurangmeny på sekunder",
    ogDescription:
      "Välj din accentfärg, få en varumärkt restaurangmeny. Auto ljus/mörk-läge anpassar sig till varje gästs telefon. Inga designverktyg behövs.",
  },

  hero: {
    title: "Din meny. Dina färger. Ditt varumärke.",
    subtitle:
      "Välj en accentfärg, släpp in din logotyp, och din QR-meny ser direkt ut som ett riktigt varumärke i stället för en mall. Ljusa och mörka teman växlar automatiskt med varje gästs telefon — din meny ser alltid avsiktlig ut.",
    trustLine: "500+ restauranger i 30+ länder",
  },

  seo: {
    description:
      "Ett anpassat färgschema är skillnaden mellan en generisk QR-meny och en varumärkt restaurangupplevelse. IQ Rest låter dig välja exakt din accentfärg (eller klistra in en hex-kod från dina varumärkesriktlinjer), släppa in din logotyp, och hela menyn — knappar, länkar, framhävningar, kategorimärken — antar din varumärkesfärg på sekunder.",
    fullDescription:
      "De flesta QR-meny-byggare ger dig ett fast färgschema: blå eller röd, ta det eller lämna det. IQ Rest behandlar ditt varumärke som om det betyder något — välj vilken accentfärg som helst från en färgväljare eller klistra in din exakta hex-kod från dina varumärkesriktlinjer (samma orange som din skylt, samma grön som din logotyp). Varje accent på menyn — primärknappar, länkar, kategoriframhävningar, aktivt tillstånd i din språkväljare — antar den färgen direkt.\n\nLjus- och mörkläge hanteras automatiskt. När en gästs telefon är i mörkt läge (de flesta telefoner vid middagstid), visas din meny i mörkt läge med din accentfärg uppskruvad. När de är ute i starkt solljus i ljust läge, anpassar sig menyn. Du väljer inte ljus eller mörk — du väljer en varumärkesfärg, och menyn gör det rätta på varje enhet.\n\nDin logotyp sitter högst upp på menyn, på QR-klistermärkets utskriftsmall, på beställningskvittot och i bokningsbekräftelse-mejlet. Varje gästs kontaktpunkt känns som samma varumärke eftersom det är samma varumärke. Ingen designer krävs, ingen Photoshop-session, inget dyrt 'restaurang-varumärkespaket' — bara en färgväljare och logotypuppladdning.",
    benefitsHeading: "Varför ett varumärkt färgschema konverterar bättre än ett standardtema",
    benefits: [
      "Välj vilken accentfärg som helst — färgväljare eller klistra in en hex-kod",
      "Auto ljus/mörk-läge som anpassar sig till varje gästs telefon",
      "Logotypplacering på meny, QR-klistermärke, kvitton och e-post",
      "Varumärkt utseende från första minuten — ingen Photoshop eller designer behövs",
      "Byt färger när som helst för säsongskampanjer (Alla hjärtans rött, julgrönt)",
      "Färgen förblir tillgänglig — kontrastförhållanden anpassas automatiskt för läsbarhet",
    ],
  },

  pricing: {
    heading: "En plan.",
    headingAccent: "Dina varumärkesfärger.",
    sub: "Anpassat färgschema plus QR-meny, onlinebeställning, AI-översättning och bokningar — allt i ett fast pris. Branding utan designer.",
  },

  faq: {
    sub: "Allt restaurangägare frågar om att varumärkesanpassa menyn. Ser du inte din? Skicka oss ett meddelande på WhatsApp — riktiga människor svarar.",
    items: [
      {
        q: "Kan jag matcha min exakta varumärkesfärg från min logotyp eller skylt?",
        a: "Ja — klistra in din exakta hex-kod (t.ex. #C24A2D) och menyn använder den exakta färgen för varje accent. Vi auto-genererar en mörkare nyans för hover-tillstånd och en ljusare nyans för bakgrunder, så en enstaka varumärkesfärg får en hel UI-palett utan att du gör något.",
      },
      {
        q: "Stöder menyn ljust och mörkt läge?",
        a: "Ja, automatiskt. Menyn upptäcker varje gästs telefontema och växlar mellan ljust och mörkt läge i realtid. Din accentfärg förblir densamma; det omgivande UI:t inverteras. De flesta restauranger sätter aldrig ljust vs mörkt — de väljer en färg och låter menyn anpassa sig.",
      },
      {
        q: "Kan jag ändra mitt färgschema senare?",
        a: "När som helst. Öppna designinställningarna, välj en ny färg, spara. Varje sida i din QR-meny, bokningsflöde och beställnings-UI uppdateras inom sekunder. Användbart för säsongskampanjer (rött för Alla hjärtans, grönt för jul, guld för nyår) — byt för en vecka, byt tillbaka.",
      },
      {
        q: "Var visas min logotyp?",
        a: "Högst upp på din QR-meny (bredvid restaurangens namn), på QR-kodens klistermärkes utskriftsmall (så att klistermärket på borden matchar ditt varumärke), på beställningsbekräftelsekvitton och i bokningsbekräftelse-mejl. Ladda upp den en gång i PNG eller SVG, den används överallt automatiskt.",
      },
      {
        q: "Vad om min varumärkesfärg är svår att läsa mot menybakgrunden?",
        a: "Systemet kollar kontrast automatiskt och skuggar eller ljusar din färg försiktigt för textanvändning (så att en blek gul varumärkesfärg inte visas som oläslig text), samtidigt som den behåller din exakta färg för accenter som knappar och framhävningar. Du behöver inte tänka på WCAG — menyn gör det åt dig.",
      },
    ],
  },

  finalCta: {
    heading: "Välj en färg.",
    headingAccent: "Se ut som ett riktigt varumärke.",
    sub: "Anpassat färgschema, varumärkta kvitton, auto ljus/mörk-läge. 14 dagars gratis provperiod, ingen designer, inget kreditkort.",
  },
};
