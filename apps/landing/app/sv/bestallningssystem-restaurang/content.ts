import { Map, ClipboardList, Receipt, Smartphone } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "sv",
  slug: "bestallningssystem-restaurang",
  trackPrefix: "l_sv_orders",

  meta: {
    title: "Beställningssystem för restaurang — gäst och servitör | IQ Rest",
    description:
      "Restaurangbeställningar från telefon eller surfplatta: salsplan, tudelning av nota, statusar, alternativ och anteckningar. Gäster beställer vid bordet; servitören tar beställningar från valfri enhet. 14 dagar gratis.",
    canonical: "https://iq-rest.com/sv/bestallningssystem-restaurang",
    ogLocale: "sv_SE",
    ogTitle: "Beställningssystem för restaurang — gäst och servitör",
    ogDescription:
      "Gäst vid bordet eller servitör med telefon — beställningen landar omedelbart i köket. Salsplan, tudelning av nota, statusar, alternativ och anteckningar.",
    brandLine: "IQ Rest — Beställningssystem för restaurang",
  },

  hero: {
    headline: "Mottagande av beställningar: gäst och servitör — direkt till köket.",
    cta: "Konfigurera onlinebeställning",
    sub: "Gäster beställer via QR-menyn vid bordet eller servitören tar beställningen från en telefon eller surfplatta — beställningen landar på köksskärmen på några sekunder. Salsplan med färgkodade bord, tudelning av nota, flexibla alternativ och kommentarer. Inga anteckningsblock, inga turer till baren.",
    imageSrc: "/landing/feature-orders.webp",
    imageAlt: "Servitör tar en beställning vid bordet från en smartphone — beställningen landar på köksskärmen",
  },

  scan: {
    heading: "Ställ in beställningssystemet",
    headingAccent: "på 5 minuter.",
    sub: "Ladda upp en pappersmeny eller PDF — AI:n känner igen rätter, priser och kategorier. Anslut en surfplatta i salen och börja ta emot beställningar vid borden.",
    cta: "Skanna meny",
  },

  subFeatures: [
    {
      icon: Map,
      eyebrow: "Lista och salsplan",
      heading: "Beställningslista bredvid salsplanen.",
      body: "Alla aktiva beställningar till höger: status, summa, tid, antal rätter. Till vänster — salsplanen: borden färgade efter status — lediga, upptagna, behöver uppmärksamhet. Tryck på ett bord för att öppna eller skapa en beställning; tryck på ett kort för att öppna detaljvyn. Inget byte mellan skärmar.",
      bullets: [
        "Salsplan: borden färgkodade efter beställningens status.",
        "Beställningslista bredvid — summa, tid, antal rätter.",
        "Tryck på ett bord för att öppna eller skapa en beställning.",
      ],
      image: { src: "/landing/feature-orders-map.webp", alt: "Surfplatta vid servitörsstationen: beställningslista och salsplan med färgkodade bord" },
    },
    {
      icon: ClipboardList,
      eyebrow: "Beställningskort",
      heading: "Beställningskort: statusar, duplicera, ta bort — ett tryck.",
      body: "Varje rätt har egen status (Väntar / Tillagas / Klar / Serverad) — köket och servitören ser samma bild i realtid. Tryck på pricken öppnar åtgärdsmenyn: ändra status, duplicera rätten med samma modifierare och alternativ, ta bort. Allt inuti kortet.",
      bullets: [
        "Status per rätt: Väntar / Tillagas / Klar / Serverad.",
        "Duplicera en rätt med ett tryck med samma alternativ.",
        "Ta bort en rätt direkt från kortet.",
      ],
      image: { src: "/landing/feature-orders-detail.webp", alt: "Surfplatta med beställningens detaljkort: rättsstatusar, duplicera- och ta-bort-åtgärder" },
    },
    {
      icon: Receipt,
      eyebrow: "Dela notan",
      heading: "Dela notan när gäster betalar separat.",
      body: "Gäster bestämde sig för att dela — kryssa i rätterna som flyttas till en ny nota; resten stannar på den nuvarande. Systemet visar omedelbart båda summorna. Ett tryck på „Dela beställning“ och du har två oberoende beställningar med korrekta summor, båda fortfarande knutna till sina bord.",
      bullets: [
        "Välj rätter att dela med kryssrutor.",
        "Båda summorna visas omedelbart.",
        "Ett tryck och beställningen delas utan manuell matematik.",
      ],
      image: { src: "/landing/feature-orders-split.webp", alt: "Surfplatta på ett restaurangbord: notdelningsmodal mellan gäster" },
    },
    {
      icon: Smartphone,
      eyebrow: "Lägg till från telefon",
      heading: "Lägg till rätter från telefonen — i tre åtgärder.",
      body: "Servitören är inte bunden till en enhet: öppna beställning på sin telefon och lägg till en rätt i tre steg — kategori, rätt, alternativ (storlek, tillagningsgrad, extra sås eller ingrediens). Priset räknas om automatiskt. Anteckningen till köket kommer på sista steget.",
      bullets: [
        "Tre steg: kategori → rätt → alternativ.",
        "Alternativ (storlek, tillägg, extra) prissatta med ett klick.",
        "Anteckningsfält på sista steget.",
      ],
      image: { src: "/landing/feature-orders-mobile.webp", alt: "Fyra telefoner med stegen för att lägga till en beställningsrätt: kategori, rätt, storlek, kommentar" },
    },
  ],

  faq: {
    sub: "Vad restauratörer frågar om beställningsmottagning i IQ Rest. Hittar du inte din fråga? Skriv till oss på WhatsApp.",
    items: [
      { q: "Kan flera servitörer arbeta samtidigt från olika enheter?", a: "Ja. Varje servitör loggar in på det delade restaurangkontot från sin egen telefon eller surfplatta — alla ser samma bord, beställningar och statusar i realtid. Ändringar som en servitör gör visas omedelbart för de andra, utan konflikter eller låsningar." },
      { q: "Kan servitörerna använda sina personliga enheter (BYOD)?", a: "Ja. Det är en webbapp i webbläsaren — inget att installera. Servitören öppnar en länk, loggar in på restaurangkontot från sin iPhone, Android eller personliga surfplatta och börjar arbeta. I slutet av passet loggar de bara ut." },
      { q: "Kan obligatoriska alternativ läggas till rätter (storlek, tillagningsgrad osv.)?", a: "Ja. Varje rätt kan ha valfritt antal alternativgrupper — obligatoriska (t.ex. „Storlek“: Liten / Mellan / Stor) och valfria („Tillagningsgrad“: blodig / medium / genomstekt). Alternativ kan ändra priset (+1,00 €). Om en grupp är obligatorisk låter systemet inte gästen eller servitören lägga till rätten utan att välja." },
      { q: "Kan gäster lägga till anteckningar eller extra till en rätt (bröd, sås)?", a: "Ja. Sista steget av tillägget har ett fritt anteckningsfält („utan lök“, „genomstekt“, „nötallergi“). Extra är separata modifierare med pris („+ BBQ-sås +1,50 €“, „+ Bröd +2,00 €“). Anteckningarna visas på köksskärmen, markerade med färg." },
      { q: "Finns det beställningsstatistik?", a: "Ja. Analysavsnittet visar: intäkter per dag och timme, snittnota, toppretter, gäst → beställning-konvertering, servicehastighet (tid från Väntar till Serverad). Detta hjälper till att planera pass, inköp och upptäcka rätter som underpresterar." },
      { q: "Kan beställningar delas eller flyttas mellan bord?", a: "Ja, båda scenarierna stöds. För att dela — kryssa i rätterna som går till en ny nota (för gäster som betalar separat). För att flytta — öppna beställningskortet, välj ett nytt bord; hela beställningen flyttas dit. Ingen manuell matematik, inget behov av att lämna panelen." },
    ],
  },
};
