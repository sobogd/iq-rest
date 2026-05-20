import { CalendarCheck, ChefHat, Receipt, Monitor } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "is",
  htmlDir: "ltr",

  meta: {
    title: "QR matseðill fyrir veitingastaði — Beinar pantanir, núll þóknun | IQ Rest",
    description:
      "Allt-í-einu vettvangur fyrir veitingastaði: stafrænn matseðill, QR pantanir, borðabókun og eldhússkjár. Komið í gang á 5 mínútum. 14 daga ókeypis, ekkert kort krafist.",
    canonical: "https://iq-rest.com/is",
    ogLocale: "is_IS",
    ogTitle: "QR matseðill fyrir veitingastaði — Beinar pantanir, núll þóknun",
    ogDescription:
      "Stafrænn matseðill, QR pantanir, borðabókun og þýðing með gervigreind. Komið í gang á 5 mínútum. 14 daga ókeypis.",
  },

  ctaText: "Prófaðu ókeypis",
  demoText: "Horfðu á kynningu",
  microcopy: "14 dagar ókeypis · Ekkert kort · Hætta hvenær sem er",

  header: {
    navFeatures: "Eiginleikar",
    navHow: "Hvernig virkar það",
    navPricing: "Verð",
    navFaq: "Algengar spurningar",
    signIn: "Skráning",
    cta: "Byrja",
  },

  hero: {
    verticals: ["Veitingastaðir", "Kaffihús", "Barir", "Hótel", "Pizzustaðir"],
    headline: "Stafrænn matseðill fyrir veitingastað. Í lofti á 5 mínútum.",
    sub: "Stafrænn matseðill fyrir veitingastaðinn þinn á 5 mínútum. Allt innifalið: ritill án kóða, gervigreindar þekking á prentuðum matseðli, QR kóðar á borð og beinar pantanir án þóknunar.",
    dynamicHeadlines: ["0% þóknun.", "35 gervigreindar tungumál.", "Pantanir á netinu.", "Bókanir 24/7.", "Premium hönnun."],
    painBullets: [
      "0% þóknun: hver pöntun fer beint til veitingastaðarins þíns.",
      "Gervigreindar þýðing á 35 tungumál — ferðamenn skilja matseðilinn og panta meira.",
      "Bókun 24/7: gestir bóka borð sjálfir, án símtala á álagstímum.",
      "Sveigjanleg verðlagning: matseðilsbreytingar birtast á sekúndum.",
    ],
    rating: "Yfir 500 veitingastaðir í yfir 30 löndum",
  },

  features: {
    heading: "Allt sem þú þarft.",
    headingAccent: "Ekkert auka.",
    sub: "Búið til fyrir veitingastaði. Notað daglega við borðið, í eldhúsinu og í salnum.",
    items: [
      { Icon: Monitor, title: "Stafrænn matseðill", desc: "Matseðill í vafranum með myndum, verðum, ofnæmisvökum og lýsingum. Uppfærir í rauntíma frá símanum. Gestir sjá matseðilinn á sínu eigin tungumáli; veitingastaðurinn sparar á prentun.", tag: "Stafrænn matseðill", href: "/is/stafraen-matsedill-veitingastaur" },
      { Icon: Receipt, title: "Pantanataka: gestur og þjónn", desc: "QR kóði á borðinu fyrir gestinn eða þjónninn tekur pöntunina úr símanum — bæði fara beint í eldhúsið eða WhatsApp. Án þóknunar, með borðnúmeri á hverjum miða.", tag: "Pantanir", href: "/is/pontunarkerfi-veitingastaur" },
      { Icon: CalendarCheck, title: "Borðabókun 24/7", desc: "Gestir bóka borð sjálfir í gegnum vefsíðu eða QR matseðil meðan þú ert upptekinn í salnum. Dagatal eftir borði, sjálfvirk staðfesting og áminningar. Ekki einn glataður gestur.", tag: "Bókun", href: "/is/bord-bokun" },
      { Icon: ChefHat, title: "Eldhússkjár (KDS)", desc: "Pappírsmiðar eru ekki lengur nauðsynlegir. Pantanir úr salnum fara beint á skjá kokksins — dálkar „í eldun / tilbúið / borið fram“, ofnæmisvakar og athugasemdir litaðar með áherslu. Á spjaldtölvu eða síma.", tag: "KDS", href: "/is/eldhus-skjar" },
    ],
  },

  founder: {
    eyebrow: "Byggt af veitingamönnum",
    quoteStart:
      "Ég og konan mín rekum okkar eigið kaffihús og vitum af eigin reynslu hvernig veitingadagurinn lítur raunverulega út — pantanataka, bókanir, salar- og eldhúsflæði. Við vildum eitt verkfæri: nútímalegt, auðvelt í ræsingu og ljóst við fyrstu sýn —",
    quoteAccent: "þannig byrjuðum við að byggja vettvanginn sem við þróum nú fyrir aðra veitingamenn.",
    sign: "Bogdan Sokolov · stofnandi, fyrrverandi kaffihúsaeigandi",
    photoAlt: "Bogdan Sokolov, stofnandi IQ Rest",
  },

  how: {
    heading: "Í lofti á 5 mínútum",
    sub: "Fjögur stutt skref. Engin uppsetning, engin tæknileg uppsetning.",
    steps: [
      { n: "1", t: "Tegund og nafn", d: "Veldu tegund staðarins og sláðu inn nafnið." },
      { n: "2", t: "Vista", d: "Sláðu inn tölvupóstinn þinn eða skráðu þig inn með Google." },
      { n: "3", t: "Matseðill", d: "Bættu réttum við handvirkt eða hlaðið upp prentuðum matseðli fyrir gervigreindar skönnun." },
      { n: "4", t: "Lokið", d: "Deildu tengli eða QR kóða og byrjaðu að taka við pöntunum." },
    ],
  },

  pricing: {
    badge: "Engin þóknun · Engir samningar",
    heading: "Ein áskrift.",
    headingAccent: "Allt innifalið.",
    sub: "QR matseðill, pantanataka, gervigreindar þýðing, vefsíða veitingastaðar og bókun. Eitt gagnsætt mánaðarlegt gjald.",
    monthlyLabel: "Mánaðarlega",
    yearlyLabel: "Árlega",
    saveBadge: "Sparaðu 25%",
    perMonth: "á mánuði",
    billedAnnually: "Árlegt reikningagerð: {total}",
    youSave: "Þú sparar {amount}",
    trust: { secure: "Örugg greiðsla með Stripe", noCommitment: "Engin skuldbinding", quick: "Virk á mínútum", restaurants: "500+ veitingastaðir" },
  },

  faq: {
    eyebrow: "Ertu með spurningar?",
    heading: "Algengar",
    headingAccent: "spurningar.",
    sub: "Það sem veitingamenn spyrja fyrir skráningu. Finnurðu ekki þína spurningu? Skrifaðu okkur á WhatsApp — alvöru fólk svarar, ekki vélmenni.",
    whatsappCta: "Spyrðu á WhatsApp",
    whatsappPrefill: "Halló, ég er með spurningu um IQ Rest",
    items: [
      { q: "Hvað er innifalið í prufutímabilinu og hvað gerist eftir á?", a: "Fullur aðgangur að öllum eiginleikum í 14 daga, ekkert kort krafist. Eftir 14 daga er reikningurinn settur á bið ef engin greiðsluaðferð er bætt við — við rukkum aldrei sjálfkrafa. Þú getur bætt við greiðslu seinna og haldið áfram þar sem þú slepptir. Hættu hvenær sem er með einum smelli." },
      { q: "Takið þið þóknun af pöntunum?", a: "Nei. Hver pöntun frá QR matseðlinum fer beint til veitingastaðarins — engin prósenta frá okkur, engin samanafnsgjöld. Eitt fast mánaðarlegt gjald og ekkert annað." },
      { q: "Þurfa gestir app, þurfum við tæknilega kunnáttu?", a: "Gestir þurfa ekki app — þeir beina símamyndavélinni að QR kóðanum og matseðillinn opnast í vafranum. Veitingastaðir þurfa heldur ekki tæknilega kunnáttu: stjórnborðið virkar í hvaða nútímalegri vafri sem er á síma, spjaldtölvu eða fartölvu. Hver aðgerð er með smelli og dráttar-og-sleppi, án kóða." },
      { q: "Hve hratt breytast verð og ný matvæli birtast?", a: "Strax. Breyttu verði úr símanum — gestir sjá það á sekúndum. Nýr réttur tekur nokkrar pikkanir: nafn, verð, mynd. Engin endurprentun, engin bið eftir hönnuði." },
      { q: "Hve mörg tungumál eru studd?", a: "35 tungumál með innbyggðri gervigreindar þýðingu. Ein pikkun og allur matseðillinn er þýddur; gervigreindin skilur matargerðarsamhengi — nöfn og lýsingar hljóma náttúrulega á hvaða tungumáli sem er. Ferðamenn panta öruggari þegar þeir skilja matseðilinn raunverulega." },
    ],
  },

  finalCta: {
    heading: "Í lofti á 5 mínútum.",
    headingAccent: "14 dagar ókeypis.",
    sub: "Ekkert kort, hætta hvenær sem er. Komdu með 500+ veitingastöðum sem eru nú þegar að nota IQ Rest.",
  },

  scan: {
    heading: "Ertu með pappírs matseðil eða PDF?",
    headingAccent: "Gervigreindin gerir hann stafrænan á 60 sekúndum.",
    sub: "Hlaðið upp mynd eða skjali — gervigreindin þekkir flokka, rétti og verð sjálfkrafa.",
    cta: "Skanna matseðil →",
  },

  pricingHero: {
    chips: ["Engin þóknun", "Engir samningar", "14 dagar ókeypis"],
    heading: "Verð.",
    headingAccent: "Engin falin gjöld.",
    sub: "Eitt gagnsætt mánaðarlegt gjald. Engin prósenta af pöntunum eða samanafnsþóknun. Hættu áskrift hvenær sem er.",
    popularBadge: "Vinsælt",
    perMonthSuffix: "/mán",
    whenAnnualTemplate: "árlegt reikningagerð · {total} € á ári",
    orMonthlyTemplate: "eða {price} €/mán",
    savingsTemplate: "sparaðu {amount} € á ári",
    plans: {
      basic: {
        name: "Basic",
        tagline: "Matseðill, QR pantanir og gervigreindar þýðing. Í lofti á 5 mínútum.",
        features: [
          "QR matseðill fyrir hvert borð",
          "Stafrænn matseðill með myndum og ofnæmisvökum",
          "Gervigreindar þýðing á 35 tungumál",
          "Pantanir úr matseðlinum (valfrjálst)",
          "Gervigreindar myndgerð fyrir rétti",
          "Stjórnaðu úr hvaða síma eða spjaldtölvu sem er",
        ],
      },
      pro: {
        name: "Pro",
        tagline: "Full stjórn veitingastaðar: eldhússkjár og bókanir.",
        features: [
          "Allt í Basic",
          "Eldhússkjár (KDS)",
          "Borðabókun á netinu 24/7",
          "Forgangs WhatsApp aðstoð",
        ],
      },
    },
  },

  footer: {
    featureLinks: [
      { href: "/is/stafraen-matsedill-veitingastaur", label: "Stafrænn matseðill" },
      { href: "/is/pontunarkerfi-veitingastaur", label: "Pantanir" },
      { href: "/is/bord-bokun", label: "Bókun" },
      { href: "/is/eldhus-skjar", label: "Eldhússkjár" },
    ],
    navLinks: [
      { href: "/is/verd", label: "Verð" },
      { href: "#faq", label: "Algengar spurningar" },
      { href: "/is/languages", label: "Breyta tungumáli" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Allur réttur áskilinn.",
  },
};
