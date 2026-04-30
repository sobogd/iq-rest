import { ScanLine, Languages, CalendarCheck, Palette, Smartphone, ListPlus } from "lucide-react";
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
  ctaText: "Byrjaðu ókeypis →", microcopy: "14 dagar ókeypis · Ekkert kort · Hættu hvenær sem er",
  header: { navFeatures: "Eiginleikar", navHow: "Hvernig það virkar", navPricing: "Verð", navFaq: "FAQ", signIn: "Innskráning", cta: "Byrjaðu ókeypis →" },
  hero: {
    verticals: ["Veitingastaðir", "Kaffihús", "Barir", "Hótel", "Pizzustaðir"],
    variants: [
      { headline: "Hættu að prenta matseðla.", headlineAccent: "Hættu að borga 30% til afhendingarforrita.", sub: "QR matseðill, beinar pantanir, bókanir og fjöltyngd vefsíða. Tilbúið á 2 mínútum — án korts." },
      { headline: "Veitingastaðurinn þinn á skilið meira en", headlineAccent: "pappírsmatseðla og glataðar hringingar.", sub: "Beinar pantanir, augnabliksuppfærslur og bókanir 24/7. Sett upp á 2 mínútum." },
      { headline: "Einn QR kóði.", headlineAccent: "Núll þóknun. Bless pappír.", sub: "QR matseðill, netpantanir og bókanir — allt á einum stað. 14 dagar ókeypis, án korts." },
      { headline: "Fáðu beinar pantanir.", headlineAccent: "Slepptu þóknuninni.", sub: "Gestir skanna, panta og borga — beint til þín, án Wolt-skerðingar. Tilbúið á 2 mínútum." },
      { headline: "Fleiri pantanir. Fleiri bókanir.", headlineAccent: "Án pappírs, án forrita.", sub: "QR matseðill + bókanir + fjöltyngd vefsíða á sjálfvirkum aksturi. 14 daga ókeypis prufa." },
      { headline: "Skilja ferðamenn ekki matseðilinn?", headlineAccent: "Lagt á 2 mínútum.", sub: "AI þýðir allan matseðilinn á 35 tungumál. Plus QR pantanir og bókanir innifaldar." },
      { headline: "Frá pappírsmatseðli í QR kóða,", headlineAccent: "áður en espressóið kólnar.", sub: "QR matseðill, beinar pantanir og bókanir 24/7. Tilbúið á 2 mínútum — án korts." },
      { headline: "Ferskt einfaldur QR matseðill.", headlineAccent: "Hljóðlega öflugur að innan.", sub: "Beinar pantanir, AI þýðing, bókanir og vefsíða — allt með einum smell á símanum." },
    ],
    painBullets: ["Engin prentun — breyttu verðum strax", "Núll þóknun — pantanir beint til þín", "Engar glataðar hringingar — bókanir 24/7", "35 tungumál — týndu aldrei ferðamanni"],
    rating: "4,9 · meira en 500 veitingastaðir í 30+ löndum",
  },
  features: {
    heading: "Allt sem þú þarft.", headingAccent: "Ekkert sem þú þarft ekki.",
    sub: "Smíðað fyrir veitingastaði. Notað við borðið.",
    items: [
      { Icon: ScanLine, title: "Haltu 100% af hverri pöntun", desc: "Gestir skanna, panta og borga — beint til þín. Engar forritahleðslur, engin 30% afhendingarskerðing. Hver pöntun lendir í rauntíma með borðnúmeri í mælaborðinu." },
      { Icon: Languages, title: "Seldu ferðamönnum á þeirra tungumáli", desc: "Einn smellur þýðir allan matseðilinn á 35 tungumál. AI nær matargerðarsamhenginu — gestir panta meira þegar þeir skilja réttinn raunverulega." },
      { Icon: CalendarCheck, title: "Missiðu ekki bókanir í eldhúsinu", desc: "Gestir bóka 24/7, engar hringingar. Sjálfvirk eða handvirk staðfesting, tölvupóstáminningar — færri ekkimætingar, núll streita." },
      { Icon: Palette, title: "Ógleymanlegt á 1 sekúndu", desc: "Settu eldhúsmyndband eða matarmynd sem matseðilbakgrunn. Gestir hætta að skrolla. Vörumerkið þitt situr eftir." },
      { Icon: Smartphone, title: "Breyttu á sekúndum, ekki dögum", desc: "Verð, myndir, dagsréttur — úr símanum, milli borða. Beint til gesta strax. Aldrei aftur prentun." },
      { Icon: ListPlus, title: "Ef þú getur sent WhatsApp, getur þú þetta", desc: "Smelltu til að bæta við rétti. Drag til að endurraða. Slökktu á því sem er búið. Engar handbækur, engin kennsluefni, engin lærdómskúrfa." },
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
      { q: "Get ég stjórnað fleiri en einum veitingastað úr einum reikningi?", a: "Já. Pro áskriftin leyfir marga veitingastaði í sama reikningi — aðskildir matseðlar, aðskildir QR kóðar, aðskild tölfræði, ein innskráning. Skiptu á milli með tveimur smellum." },
      { q: "Hversu hratt breyti ég verðum og bæti við réttum?", a: "Strax. Breyttu verði í símanum, gestir sjá á sekúndum. Nýr réttur? Smelltu, skrifaðu, mynd, búið — engin endurprentun, engin biðun eftir hönnuði." },
      { q: "Hversu mörg tungumál eru studd?", a: "35 tungumál með innbyggðri AI þýðingu. Einn smellur þýðir allan matseðilinn, og AI skilur matargerðarsamhengi — nöfn og lýsingar hljóma náttúrulega á hverju tungumáli. Ferðamenn panta meira þegar þeir skilja virkilega." },
    ],
  },
  finalCta: { heading: "Tilbúið á 2 mínútum.", headingAccent: "Ókeypis í 14 daga.", sub: "Ekkert kort. Hættu hvenær sem er. Skráðu þig með 500+ veitingastöðum þegar á IQ Rest." },
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
      { href: "/is/contacts", label: "Tengiliður" }, { href: "/is/changelog", label: "Fréttir" },
      { href: "/is/languages", label: "Skipta um tungumál" },
    ],
    legalLinks: [
      { href: "/is/terms", label: "Skilmálar" }, { href: "/is/privacy", label: "Friðhelgi" },
      { href: "/is/cookies", label: "Vafrakökur" }, { href: "/sitemap.xml", label: "Vefsíðukort" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Allur réttur áskilinn.",
  },
};
