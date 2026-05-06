import { ScanLine, Languages, CalendarCheck, Palette, Smartphone, ChefHat } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "sv", htmlDir: "ltr",
  meta: {
    title: "QR-meny för Restauranger — Direkta Beställningar, Noll Provision | IQ Rest",
    description: "Slut med pappersmenyer och leverans-app-provisioner. QR-meny, direkta beställningar, bokningar och flerspråkig webbplats. 14 dagar gratis, utan kort.",
    canonical: "https://iq-rest.com/sv", ogLocale: "sv_SE",
    ogTitle: "QR-meny för Restauranger — Direkta Beställningar, Noll Provision",
    ogDescription: "QR-meny, direkta beställningar, bokningar och AI-översättning. Klar på 2 minuter. 14 dagar gratis — utan kort.",
  },
  ctaText: "Prova gratis", ctaSite: "Skapa hemsida",
  demoText: "Se live-demo",
  microcopy: "14 dagar gratis · Inget kort · Avsluta när du vill",
  header: { navFeatures: "Funktioner", navHow: "Så funkar det", navPricing: "Priser", navFaq: "FAQ", signIn: "Logga in", cta: "Prova gratis" },
  hero: {
    verticals: ["Restauranger", "Caféer", "Barer", "Hotell", "Pizzerior"],
    qr: { headline: "QR-meny för din restaurang på 5 minuter.", sub: "Direktbeställningar, bokning och 35 språk. Ingen provision eller kodning." },
    web: { headline: "Professionell restauranghemsida på 5 minuter.", sub: "Direktbeställningar, bokning och 35 språk. Ingen provision eller kodning." },
    painBullets: ["0% provision: Alla beställningar går direkt till dig.", "AI-översättning: 35 språk ökar försäljningen till turister.", "Bokning 24/7: Fullsatt utan extra samtal.", "Flexibla priser: Uppdatera menyn på några sekunder."],
    rating: "4,9 · över 500 restauranger i 30+ länder",
  },
  features: {
    heading: "Allt du behöver.", headingAccent: "Inget mer.",
    sub: "Byggd för restauranger. Använd vid bordet.",
    items: [
      
      { Icon: ScanLine, title: "Beställning vid bordet", desc: "Beställningar hamnar direkt i WhatsApp eller kontrollpanelen med bordsnummer. Snabbare service.", tag: "Direkta beställningar" },
      { Icon: Languages, title: "AI-översättare (35 språk)", desc: "Vår AI förstår gastronomi. Turister beställer 20% mer när de faktiskt förstår menyn.", tag: "AI-översättning" },
      { Icon: CalendarCheck, title: "Bordsreservation", desc: "Systemet tar emot bokningar medan du jobbar i köket. Ingen missad gäst.", tag: "Bokningar" },
      { Icon: Palette, title: "Modern design", desc: "Videobakgrunder och läckra bilder. Din meny ser exklusiv ut och väcker aptit direkt.", tag: "Egen design" },
      { Icon: Smartphone, title: "Snabb-editor", desc: "Hantera stop-listor och priser direkt från mobilen. Ändringar är synliga för gäster direkt.", tag: "Meny-editor" },
      { Icon: ChefHat, title: "Snart: Köksskärm", desc: "Glöm papperslappar. Beställningar från salen går direkt till kockens skärm.", tag: "Kommer snart" },
    
    ],
  },
  founder: {
    eyebrow: "Byggd av en restaurangägare",
    quoteStart: "Min fru och jag öppnade ett café och sökte i veckor efter ett system som klarade onlinebeställningar, bokningar och samtidigt såg modernt ut. Allt vi testade var klumpigt, fult eller saknade halva funktionerna —",
    quoteAccent: "så vi byggde det vi själva ville ha.",
    sign: "Bogdan Sokolov · grundare, f.d. cafégare",
    photoAlt: "Bogdan, grundare av IQ Rest",
  },
  how: {
    heading: "Live på under 2 minuter",
    sub: "Fyra korta steg. Ingen installation, ingen teknisk konfig.",
    steps: [
      { n: "1", t: "Registrera dig", d: "Mejl eller Google. Inget kort. Klart på 10 sekunder." },
      { n: "2", t: "Restaurangens namn", d: "Skriv namnet. Visas högst upp på menyn." },
      { n: "3", t: "Lägg till första rätten", d: "Kategori, namn, pris, foto. Det var det." },
      { n: "4", t: "Välj omslag och skriv ut QR", d: "Välj bakgrund. Hämta din QR. Klistra på borden." },
    ],
  },
  pricing: {
    badge: "Noll provision · Inga avtal",
    heading: "En plan.", headingAccent: "Allt ingår.",
    sub: "QR-meny, beställningar, AI-översättning, restaurangwebb och bokningar. Ett enkelt pris.",
    monthlyLabel: "Månadsvis", yearlyLabel: "Årsvis", saveBadge: "Spara 25%", perMonth: "per månad",
    billedAnnually: "Faktureras årligen {total}", youSave: "Du sparar {amount}",
    trust: { secure: "Säker betalning med Stripe", noCommitment: "Ingen bindning", quick: "Aktivt på minuter", restaurants: "500+ restauranger" },
  },
  faq: {
    eyebrow: "Frågor?", heading: "Vanliga", headingAccent: "frågor.",
    sub: "Det restaurangägare frågar innan de skriver upp sig. Saknas din? Skriv på WhatsApp — riktiga människor svarar.",
    whatsappCta: "Fråga på WhatsApp", whatsappPrefill: "Hej, jag har en fråga om IQ Rest",
    items: [
      { q: "Vad ingår i den fria provperioden och vad händer sedan?", a: "14 dagar full åtkomst, utan kort. Efter 14 dagar pausas kontot om du inte lägger till en betalmetod — vi drar aldrig automatiskt. Lägg till senare för att aktivera. Avsluta med ett klick." },
      { q: "Tar ni provision på beställningar?", a: "Noll. Varje beställning från din QR-meny går rakt till dig — ingen del till oss, inga Foodora / Wolt-avgifter. Ett fast månadspris, det är allt." },
      { q: "Behöver gästerna en app? Behöver jag tekniska kunskaper?", a: "Inga appar för gästerna — de skannar QR med kameran, menyn öppnas i webbläsaren. Inga tekniska kunskaper för dig — hela panelen funkar i mobilen, klicka för att lägga till, dra för att sortera om, det är hela inlärningen." },
      { q: "Hur snabbt ändrar jag priser och lägger till rätter?", a: "Direkt. Ändra ett pris i mobilen, gästerna ser det på sekunder. Ny rätt? Klicka, skriv, foto, klart — inga utskrifter, ingen designer att vänta på." },
      { q: "Hur många språk stöds?", a: "35 språk med inbyggd AI-översättning. Ett klick översätter hela menyn, AI fattar kulinarisk kontext — namn och beskrivningar låter naturligt på varje språk. Turister beställer mer när de verkligen förstår." },
    ],
  },
  finalCta: { heading: "Klar på 2 minuter.", headingAccent: "Gratis i 14 dagar.", sub: "Inget kort. Avsluta när du vill. Anslut dig till 500+ restauranger redan på IQ Rest." },
  scan: {
    heading: "Pappersmeny eller PDF?",
    headingAccent: "AI digitaliserar den på 60 sekunder.",
    sub: "Ladda upp — AI hittar kategorier, rätter och priser.",
    cta: "Skanna menyn →",
  },
  footer: {
    featureLinks: [
      { href: "/sv/online-orders", label: "Onlinebeställningar" },
      { href: "/sv/ai-translation", label: "AI-översättning" },
      { href: "/sv/reservations", label: "Bokningar" },
      { href: "/sv/mobile-management", label: "Mobil hantering" },
      { href: "/sv/easy-menu", label: "Meny-editor" },
      { href: "/sv/custom-design", label: "Video- och fotobakgrunder" },
      { href: "/sv/color-scheme", label: "Varumärkesfärger" },
      { href: "/sv/multilingual", label: "Flerspråkig webbplats" },
      { href: "/sv/ai-images", label: "AI-bildoptimering" },
      { href: "/sv/analytics", label: "Statistik" },
      { href: "/sv/instant-setup", label: "Direktstart" },
      { href: "/sv/personal-support", label: "Personlig support" },
    ],
    navLinks: [
      { href: "#pricing", label: "Priser" },
      { href: "#faq", label: "Frågor" },
      { href: "/sv/changelog", label: "Nyheter" },
      { href: "/sv/languages", label: "Byt språk" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Med ensamrätt.",
  },
};
