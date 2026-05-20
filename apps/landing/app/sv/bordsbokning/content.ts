import { CalendarPlus, CalendarDays } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "sv",
  slug: "bordsbokning",
  trackPrefix: "l_sv_bookings",

  meta: {
    title: "Bordsbokning 24/7 för restauranger | IQ Rest",
    description:
      "Bordsbokning 24/7 för restauranger: gäster bokar själva via QR-menyn eller webbplatsen. Kalender per bord, automatiska bekräftelser och påminnelser. Inte en enda missad gäst. 14 dagar gratis.",
    canonical: "https://iq-rest.com/sv/bordsbokning",
    ogLocale: "sv_SE",
    ogTitle: "Bordsbokning 24/7 — gäster bokar själva",
    ogDescription:
      "Gäster bokar bord via QR-menyn eller webbplatsen. Kalender, automatiska bekräftelser, påminnelser. Inte en enda missad gäst.",
    brandLine: "IQ Rest — Bordsbokning för restauranger",
  },

  hero: {
    headline: "Bordsbokning 24/7 — gäster bokar själva.",
    sub: "Gäster bokar bord via QR-menyn eller en direktlänk. Kalender per bord, automatiska bekräftelser och påminnelser. Inte en enda missad gäst och inga telefonsamtal under rusningstid.",
    imageSrc: "/landing/feature-reservation.webp",
    imageAlt: "Värdinna hanterar bokningar från en surfplatta vid restaurangens entré",
  },

  scan: {
    heading: "Starta bordsbokning",
    headingAccent: "på 5 minuter.",
    sub: "Anslut kalendern, lägg till bord med bilder och kapacitet — gästerna börjar boka samma dag.",
    cta: "Aktivera bokning",
  },

  subFeatures: [
    {
      icon: CalendarPlus,
      eyebrow: "Bokningsformulär",
      heading: "Gäster bokar själva — efter datum, tid och sällskapsstorlek.",
      body: "Gästen öppnar QR-menyn eller en direktlänk, väljer datum, tid och sällskapsstorlek — och ser omedelbart tillgängliga bord, vart och ett med en bild, beskrivning (terrass, vid fönstret, bänk nära baren) och kapacitet. Bekräftelse skickas automatiskt via e-post och WhatsApp.",
      bullets: [
        "Välj bord efter bild, beskrivning och kapacitet.",
        "Automatisk bekräftelse och påminnelse en timme före besöket.",
        "Minsta antal fält i formuläret: namn, telefon, antal personer.",
      ],
      image: { src: "/landing/feature-booking-form.webp", alt: "Gäst bokar ett restaurangbord från telefonen: datum, tid, sällskapsstorlek och bordsval" },
    },
    {
      icon: CalendarDays,
      eyebrow: "Bokningskalender",
      heading: "Kalender per dag och bord — se allt med en blick.",
      body: "Administrationspanelen visar en kalender över bokningar uppdelat per bord, dag, vecka och månad. Lediga slots, upptagna bord, bekräftade och obekräftade bokningar på en enda skärm. Fungerar på en surfplatta i salen och en laptop på kontoret.",
      bullets: [
        "Dag-, vecko- och månadsvyer.",
        "Uppdelning per bord: vem, när, hur många gäster.",
        "Flytta, avboka eller bekräfta en bokning med ett tryck från telefonen.",
      ],
      image: { src: "/landing/feature-booking-calendar.webp", alt: "Bokningskalender i IQ Rest-administrationspanelen på två surfplattor: dagligt Gantt-diagram per bord och månadsvy" },
    },
  ],

  faq: {
    sub: "Vad restauratörer frågar om bordsbokning i IQ Rest. Hittar du inte din fråga? Skriv till oss på WhatsApp.",
    items: [
      { q: "Kan jag välja vilka dagar och tider som är tillgängliga för bokning?", a: "Ja. Administrationspanelen låter dig ställa in öppettider och tillgängliga veckodagar — systemet visar inga otillgängliga slots för gästerna. Du kan stänga ett specifikt datum (företagsevent, privatbokning) eller stänga av hela kalendern tillfälligt." },
      { q: "Kan jag ladda upp en bild för varje bord?", a: "Ja. Varje bord kan ha en bild, beskrivning (terrass, vid fönstret, bänk vid baren) och kapacitet. Gästen ser exakt vilket bord de bokar och gör ett medvetet val — detta minskar oinfriade förväntningar." },
      { q: "Kan jag inaktivera bokning på specifika datum?", a: "Ja. Kalendern låter dig stänga specifika datum (helger, privatevent, renovering) eller hela veckodagar. På dessa datum ser gästerna meddelandet „bokning tillfälligt otillgänglig“." },
      { q: "Kan jag anpassa vilka fält som samlas in från gästen?", a: "Ja. Standardupplägget: namn, telefon, e-post, sällskapsstorlek. Du kan lägga till anpassade fält (tillfälle, allergier, särskilda önskemål) eller ta bort onödiga för att hålla formuläret så kort som möjligt." },
      { q: "Kan jag begränsa antalet gäster per bord?", a: "Ja. Varje bord har en inställning för „kapacitet“ — systemet låter inte ett 2-bord bokas för 6. På större bord kan du sätta ett minimum så att små sällskap inte tar „åttabordet“ från större grupper." },
      { q: "Hur svår är bokningsuppsättningen?", a: "Det tar väldigt lite tid. Tre steg: (1) lägg till bord med namn, bilder och kapacitet, (2) aktivera bokningsläge i inställningarna, (3) dela länken eller QR-koden med gästerna. Full lansering tar 5–10 minuter." },
      { q: "Kan jag använda bokningssystemet på min egen domän?", a: "Ja. Vi stödjer en anpassad domän med SSL-certifikat: gäster bokar på din restaurangs adress (t.ex. bokning.dinrestaurang.se). Vi hjälper till med DNS-konfigurationen; processen tar 5–10 minuter." },
      { q: "Kan jag konfigurera automatisk eller manuell bekräftelse?", a: "Ja, läget ställs in i inställningarna. Med automatisk bekräftelse får gästen en bekräftelse omedelbart efter att ha skickat formuläret och bokningen anses accepterad. Med manuell bekräftelse landar förfrågan i administrationspanelen med statusen „väntar på bekräftelse“ — chefen granskar den och antingen bekräftar eller avvisar. Manuellt läge är användbart för begränsat antal bord eller strikta gästpolicyer." },
      { q: "Tar ni provision på bokningar?", a: "Nej. Bordsbokning ingår fullt ut i Pro-planen — ingen procentsats på gäster, ingen avgift per slot, inga aggregatorprovisioner. En fast månadsavgift och obegränsade bokningar." },
    ],
  },
};
