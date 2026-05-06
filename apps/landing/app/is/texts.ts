import { ScanLine, Languages, CalendarCheck, Palette, Smartphone, ChefHat } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "is", htmlDir: "ltr",
  meta: {
    title: "QR Matseðill fyrir Veitingastaði — Beinar Pantanir, Núll Þóknun | IQ Rest",
    description: "Lokið fyrir pappírsmatseðla og þóknanir afhendingarforrita. QR matseðill, beinar pantanir, bókanir og fjöltyngd vefsíða. 14 dagar ókeypis, án korts.",
    canonical: "https://iq-rest.com/is", ogLocale: "is_IS",
    ogTitle: "QR Matseðill fyrir Veitingastaði — Beinar Pantanir, Núll Þóknun",
    ogDescription: "QR matseðill, beinar pantanir, bókanir og AI þýðing. Tilbúið á 2 mínútum. 14 dagar ókeypis — án korts.",
  },
  ctaText: "Prófa frítt", ctaSite: "Búa til vefsíðu",
  demoText: "Sjá kynningu", microcopy: "14 dagar ókeypis · Ekkert kort · Hættu hvenær sem er",
  header: { navFeatures: "Eiginleikar", navHow: "Hvernig það virkar", navPricing: "Verð", navFaq: "FAQ", signIn: "Innskráning", cta: "Prófa frítt" },
  hero: {
    verticals: ["Veitingastaðir", "Kaffihús", "Barir", "Hótel", "Pizzustaðir"],
    qr: { headline: "QR matseðill á 5 mínútum.", sub: "Beinar pantanir, bókanir og 35 tungumál. Engin þóknun eða forritarar." },
    web: { headline: "Vefsíða staðarins á 5 mín.", sub: "Beinar pantanir, bókanir og 35 tungumál. Engin þóknun eða forritarar." },
    dynamicHeadlines: ["0% þóknun.", "35 tungumál (AI).", "Netpantanir.", "Bókanir 24/7.", "Flott hönnun."],
    painBullets: ["0% þóknun: Allar pantanir fara beint til þín.", "AI þýðing: 35 tungumál til að auka sölu til ferðamanna.", "Bókanir 24/7: Fullt hús án auka símtala.", "Sveigjanlegt verð: Uppfærðu matseðilinn á nokkrum sekúndum."],
    rating: "4,9 · meira en 500 veitingastaðir í 30+ löndum",
  },
  features: {
    heading: "Allt sem þú þarft.", headingAccent: "Ekkert sem þú þarft ekki.",
    sub: "Smíðað fyrir veitingastaði. Notað við borðið.",
    items: [
      
      { Icon: ScanLine, title: "Pöntun við borðið", desc: "Pantanir berast samstundis í WhatsApp eða stjórnborðið með borðnúmeri. Hraðari þjónusta.", tag: "Beinar pantanir" },
      { Icon: Languages, title: "AI þýðandi (35 tungumál)", desc: "Gervigreindin okkar skilur matargerð. Ferðamenn panta 20% meira þegar þeir skilja matseðilinn.", tag: "AI þýðing" },
      { Icon: CalendarCheck, title: "Borðabókanir", desc: "Kerfið tekur við bókunum á meðan þú ert upptekinn í eldhúsinu. Enginn viðskiptavinur tapast.", tag: "Borðapantanir" },
      { Icon: Palette, title: "Nútímaleg hönnun", desc: "Myndbandsbakgrunnar og girnilegar myndir. Matseðillinn lítur út fyrir að vera dýr.", tag: "Eigin hönnun" },
      { Icon: Smartphone, title: "Hraðvirkur ritill", desc: "Stýrðu verðum og framboði beint úr símanum. Breytingar sjást strax.", tag: "Matseðilsritill" },
      { Icon: ChefHat, title: "Væntanlegt: Eldhússkjár", desc: "Gleymdu pappírsmiðum. Pantanir fara beint á skjáinn hjá kokkinum.", tag: "Kemur bráðum" },
    
    ],
  },
  founder: {
    eyebrow: "Smíðað af veitingastaðareiganda",
    quoteStart: "Konan mín og ég opnuðum kaffihús og eyddum vikum í að leita að kerfi sem höndlar netpantanir, bókanir og lítur líka nútímalega út. Allt sem við reyndum var klúbbalegt, ljótt eða það vantaði helminginn af eiginleikunum —",
    quoteAccent: "svo við smíðuðum það sem við sjálf vildum hafa.",
    sign: "Bogdan Sokolov · stofnandi, fyrrverandi kaffihúsareigandi",
    photoAlt: "Bogdan, stofnandi IQ Rest",
  },
  how: {
    heading: "Beint á minna en 2 mínútum",
    sub: "Fjögur stutt skref. Engin uppsetning, engin tæknileg uppsetning.",
    steps: [
      { n: "1", t: "Skráðu þig", d: "Tölvupóstur eða Google. Ekkert kort. Tilbúið á 10 sekúndum." },
      { n: "2", t: "Nafn veitingastaðar", d: "Skrifaðu nafnið. Birtist efst á matseðlinum." },
      { n: "3", t: "Bættu við fyrsta réttinum", d: "Flokkur, nafn, verð, mynd. Það er allt og sumt." },
      { n: "4", t: "Veldu bakgrunn og prentaðu QR", d: "Veldu bakgrunn. Sæktu þér QR. Límdu á borðin." },
    ],
  },
  pricing: {
    badge: "Núll þóknun · Engir samningar",
    heading: "Ein áskrift.", headingAccent: "Allt innifalið.",
    sub: "QR matseðill, pantanir, AI þýðing, vefsíða veitingastaðar og bókanir. Eitt einfalt verð.",
    monthlyLabel: "Mánaðarlega", yearlyLabel: "Árlega", saveBadge: "Sparaðu 25%", perMonth: "á mánuði",
    billedAnnually: "Rukkað árlega {total}", youSave: "Þú sparar {amount}",
    trust: { secure: "Örugg greiðsla með Stripe", noCommitment: "Engin skuldbinding", quick: "Virkt á mínútum", restaurants: "500+ veitingastaðir" },
  },
  faq: {
    eyebrow: "Spurningar?", heading: "Algengar", headingAccent: "spurningar.",
    sub: "Hvað veitingastaðareigendur spyrja áður en þeir skrá sig. Sérðu ekki þína? Skrifaðu á WhatsApp — alvöru fólk svarar.",
    whatsappCta: "Spurðu á WhatsApp", whatsappPrefill: "Hæ, ég er með spurningu um IQ Rest",
    items: [
      { q: "Hvað er innifalið í ókeypis prufu og hvað gerist eftir?", a: "14 dagar fullur aðgangur, ekkert kort. Eftir 14 daga gerir reikningurinn hlé ef þú bætir ekki við greiðslumáta — við rukkum aldrei sjálfvirkt. Bættu við greiðslu seinna til að virkja aftur. Hættu með einum smelli." },
      { q: "Takið þið þóknun af pöntunum?", a: "Núll. Hver pöntun frá QR matseðlinum þínum fer beint til þín — engin sneið til okkar, engin Wolt / Deliveroo gjöld. Eitt fast mánaðarverð, það er allt." },
      { q: "Þurfa gestir forrit? Þarf ég tæknilega kunnáttu?", a: "Engin forrit fyrir gesti — þeir skanna QR með myndavélinni, matseðillinn opnast í vafranum. Engin tæknileg kunnátta fyrir þig — allt mælaborðið virkar í símanum, smelltu til að bæta við, dragðu til að endurraða, það er öll lærdómskúrfan." },
      { q: "Hversu hratt breyti ég verðum og bæti við réttum?", a: "Strax. Breyttu verði í símanum, gestir sjá á sekúndum. Nýr réttur? Smelltu, skrifaðu, mynd, búið — engin endurprentun, engin biðun eftir hönnuði." },
      { q: "Hversu mörg tungumál eru studd?", a: "35 tungumál með innbyggðri AI þýðingu. Einn smellur þýðir allan matseðilinn, og AI skilur matargerðarsamhengi — nöfn og lýsingar hljóma náttúrulega á hverju tungumáli. Ferðamenn panta meira þegar þeir skilja virkilega." },
    ],
  },
  finalCta: { heading: "Tilbúið á 2 mínútum.", headingAccent: "Ókeypis í 14 daga.", sub: "Ekkert kort. Hættu hvenær sem er. Skráðu þig með 500+ veitingastöðum þegar á IQ Rest." },
  scan: {
    heading: "Pappírsmatseðill eða PDF?",
    headingAccent: "Gervigreind stafrænirann á 60 sekúndum.",
    sub: "Hladdu upp — gervigreindin þekkir flokka, rétti og verð.",
    cta: "Skanna matseðilinn →",
  },
  footer: {
    featureLinks: [
      { href: "/is/online-orders", label: "Netpantanir" }, { href: "/is/ai-translation", label: "AI þýðing" },
      { href: "/is/reservations", label: "Bókanir" }, { href: "/is/mobile-management", label: "Stjórn úr síma" },
      { href: "/is/easy-menu", label: "Matseðilritstjóri" }, { href: "/is/custom-design", label: "Mynd- og myndbandsbakgrunnar" },
      { href: "/is/color-scheme", label: "Vörumerkjalitir" }, { href: "/is/multilingual", label: "Fjöltyngd vefsíða" },
      { href: "/is/ai-images", label: "AI myndbestun" }, { href: "/is/analytics", label: "Tölfræði" },
      { href: "/is/instant-setup", label: "Stundaruppsetning" }, { href: "/is/personal-support", label: "Persónuleg aðstoð" },
    ],
    navLinks: [
      { href: "#pricing", label: "Verð" }, { href: "#faq", label: "Spurningar" },
      { href: "/is/languages", label: "Skipta um tungumál" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Allur réttur áskilinn.",
  },
};
