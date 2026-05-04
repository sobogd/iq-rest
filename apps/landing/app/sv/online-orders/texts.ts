import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "QR-meny onlinebeställning — restaurangbeställningar utan provision",
    description:
      "Ta direkta beställningar från din QR-meny. Noll provision, ingen Uber Eats- eller Wolt-andel. Gästerna skannar, beställer, betalar — direkt till dig. 14 dagars gratis provperiod.",
    canonical: "https://iq-rest.com/sv/online-orders",
    ogLocale: "sv_SE",
    ogTitle: "Onlinebeställning utan provision — direkta beställningar från din QR-meny",
    ogDescription:
      "Byt 30 % leveransappsprovisioner mot direkta beställningar. Gäster skannar din QR, beställer, betalar — varje krona går till dig. 14 dagars gratis provperiod, inget kort.",
  },

  hero: {
    title: "Direkta beställningar. Noll provision. Rakt in i köket.",
    subtitle:
      "Sluta betala 30 % till Uber Eats, Glovo och Wolt. Med IQ Rest skannar gästerna QR-koden, bygger sin beställning på mobilen, och beställningen landar i ditt kök — varje krona stannar hos dig.",
    trustLine: "4,9 · 500+ restauranger i 30+ länder",
  },

  seo: {
    description:
      "Förvandla din QR-meny till ett komplett onlinebeställningssystem utan att ge bort 30 % till leveransappar. Gästerna skannar QR-koden, bläddrar i menyn på sitt språk, bygger en kundvagn, skickar beställningen — och du tar emot den med bordsnumret direkt. Inga appnedladdningar, inga provisioner, ingen tredje part mellan dig och gästen.",
    fullDescription:
      "De flesta restauranger förlorar pengar innan maten ens lämnat köket — Uber Eats tar 30 %, Glovo tar 30 %, Wolt tar 30 %. Onlinebeställning genom IQ Rest fungerar helt annorlunda. Beställningen går rakt från gästens mobil till din kontrollpanel, och hela marginalen är din.\n\nBeställningsupplevelsen är byggd specifikt för restaurangbruk: gästerna väljer ett bord, bläddrar i menyn, lägger varor i en vagn, lämnar en kommentar till köket och skickar in. Du ser nya beställningar i realtid på mobilen eller köksskärmen, med bordsnummer, varor, tillval och anteckningar. Markera rätter som klara — bordet ser statusen, och du sparar in tiotals serveringssprintar per pass.\n\nDet fungerar även för avhämtning och takeaway: gästerna skannar QR-dekalen vid din dörr, lägger en beställning och betalar — du behöver ingen separat beställningsapp, ingen separat webbplats och inget Stripe-integrationsprojekt.",
    benefitsHeading: "Varför direkt beställning genom IQ Rest slår leveransapparna",
    benefits: [
      "Noll provision på varje beställning — behåll 100 % av intäkten",
      "Beställningar flyger till din kontrollpanel med bordsnummer i realtid",
      "Ingen app för gästerna — de skannar QR och beställer i webbläsaren",
      "Tillval, kommentarer, dieteter — allt fångas upp tydligt",
      "Funkar för dine-in, takeaway och avhämtning — en meny, tre flöden",
      "Inbyggda merförsäljningsförslag höjer snittköpet",
    ],
  },

  pricing: {
    heading: "En plan.",
    headingAccent: "Noll provision.",
    sub: "Direktbeställning, QR-meny, restaurangwebbplats och bokningar — allt ingår. Inga avgifter per order, inget Stripe-integrationsprojekt.",
  },

  faq: {
    sub: "Allt restaurangägare frågar om onlinebeställning. Saknar du din fråga? Skriv till oss på WhatsApp — riktiga människor svarar.",
    items: [
      {
        q: "Tar ni provision på beställningarna?",
        a: "Noll. Varje beställning från din QR-meny går direkt till dig — ingen andel till oss, inga Glovo- eller Uber Eats-avgifter. Ett fast månadsabonnemang, det är allt. Räknar man enkelt: tar du 50 000 kr/månad i leveransappsbeställningar förlorar du 15 000. Byt till direktbeställning och de 15 000 stannar i fickan.",
      },
      {
        q: "Hur lägger gästerna en beställning — behöver de en app?",
        a: "Ingen app. Gästerna skannar din QR-kod med mobilkameran, menyn öppnas i webbläsaren, de väljer bord, bläddrar, lägger i vagnen och skickar. Hela flödet är två tryck efter skanningen. Ingen App Store-sökning, ingen registrering, ingen friktion.",
      },
      {
        q: "Hur tar jag emot beställningar i köket?",
        a: "Beställningarna dyker upp direkt i din kontrollpanel, med bordsnummer, varor, tillval och eventuella anteckningar. Visa dem på mobilen, på en surfplatta vid passet eller på en köksdisplay. Markera rätter som klara — bordet ser statusen, färre 'kommer maten snart?' och snabbare omsättning.",
      },
      {
        q: "Kan gästerna betala genom QR-menyn eller bara vid bordet?",
        a: "Båda. De kan skicka beställningen och betala kontant eller med kort vid bordet på klassiskt sätt, eller betala online via Stripe direkt genom menyn. Du bestämmer vad som är aktivt. Onlinebetalning säkras av Stripe — IQ Rest håller aldrig pengarna, de går rakt till ditt Stripe-konto.",
      },
      {
        q: "Funkar det för takeaway och avhämtning, inte bara dine-in?",
        a: "Ja. Sätt en QR-dekal vid entrén för takeaway, eller dela menylänken på Instagram och WhatsApp. Gästerna väljer 'avhämtning', beställer, betalar — du gör i ordning, de hämtar. Samma system, tre olika beställningsflöden: dine-in, takeaway, avhämtning.",
      },
    ],
  },

  finalCta: {
    heading: "Sluta mata leveransapparna.",
    headingAccent: "Börja behålla 100 %.",
    sub: "Byt 30 % provision mot en fast månadsavgift. 14 dagars gratis provperiod. Inget kreditkort. Avsluta när du vill.",
  },
};
