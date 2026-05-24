import { CalendarCheck, ChefHat, Receipt, Monitor } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "ga",
  htmlDir: "ltr",

  meta: {
    title: "Biachlár QR do bhialanna — Orduithe Díreacha, gan Coimisiún | IQ Rest",
    description:
      "Ardán uile-in-aon do bhialanna: biachlár digiteach, orduithe QR, curfha bord agus scáileán cistine. Ar líne i 5 nóiméad. 14 lá saor in aisce, gan cárta.",
    canonical: "https://iq-rest.com/ga",
    ogLocale: "ga_IE",
    ogTitle: "Biachlár QR do bhialanna — Orduithe Díreacha, gan Coimisiún",
    ogDescription:
      "Biachlár digiteach, orduithe QR, curfha bord agus aistriúchán IS. Ar líne i 5 nóiméad. 14 lá saor in aisce.",
  },

  ctaText: "Tosaigh saor in aisce",
  homeCtaText: "Tóg d'ardán",
  demoText: "Féach an taispeántas",
  microcopy: "14 lá saor in aisce · Gan cárta · Cealaigh aon uair",

  header: {
    navFeatures: "Gnéithe",
    navHow: "Conas a oibríonn sé",
    navPricing: "Praghsanna",
    navFaq: "Ceisteanna Coitianta",
    signIn: "Sínigh isteach",
    cta: "Cruthaigh biachlár",
  },

  hero: {
    verticals: ["Bialanna", "Caifeanna", "Beáir", "Óstáin", "Pizzeríos"],
    headline: "Biachlár digiteach do bhialann. Beo i 5 nóiméad.",
    sub: "Biachlár digiteach do do bhialann i 5 nóiméad. Gach rud san áireamh: eagarthóir gan chód, aithint IS ar bhiachlár clóite, cóid QR do na boird agus orduithe díreacha gan choimisiún.",
    dynamicHeadlines: ["0% coimisiún.", "35 teanga le IS.", "Orduithe ar líne.", "Curfha 24/7.", "Dearadh préimhe."],
    painBullets: [
      "0% coimisiún: téann gach ordú díreach chuig do bhialann.",
      "Aistriúchán IS i 35 teanga — tuigeann turasóirí an biachlár agus ordaíonn níos mó.",
      "Curfha 24/7: cuireann aíonna boird in áirithe iad féin, gan ghlaonna le linn buaicuaireanta.",
      "Praghsáil sholúbtha: téann nuashonruithe biachláir ar líne i soicindí.",
    ],
    rating: "Níos mó ná 500 bialann i níos mó ná 30 tír",
  },

  features: {
    heading: "Gach rud a theastaíonn uait.",
    headingAccent: "Tada breise.",
    sub: "Tógtha do bhialanna. Á úsáid gach lá ag an mbord, sa chistin agus san urlár.",
    items: [
      { Icon: Monitor, title: "Biachlár digiteach", desc: "Biachlár sa bhrabhsálaí le grianghraif, praghsanna, ailléirginí agus tuairiscí. Nuashonraítear i bhfíor-am ón nguthán. Feiceann aíonna an biachlár ina dteanga féin; sábhálann an bhialann ar phriontáil.", tag: "Biachlár digiteach", href: "/ga/biachlar-digiteach-bialann" },
      { Icon: Receipt, title: "Glacadh orduithe: aoi agus freastalaí", desc: "Cód QR ag an mbord don aoi, nó glacann an freastalaí an t-ordú ón nguthán — téann an dá rud go díreach chuig an gcistin nó WhatsApp. Gan choimisiún, le huimhir an bhoird ar gach ticéad.", tag: "Orduithe", href: "/ga/coras-orduithe-bialann" },
      { Icon: CalendarCheck, title: "Curfha bord 24/7", desc: "Cuireann aíonna boird in áirithe iad féin tríd an suíomh nó an biachlár QR fad atá tú gnóthach san urlár. Féilire de réir boird, deimhnithe uathoibríocha agus meabhrúcháin. Gan aon aoi caillte.", tag: "Curfha", href: "/ga/curfha-bord" },
      { Icon: ChefHat, title: "Scáileán cistine (KDS)", desc: "Níl ticéid pháipéir ag teastáil a thuilleadh. Téann orduithe ón urlár go díreach chuig scáileán an chócaire — colúin „á gcócaireacht / réidh / freastalaithe“, ailléirginí agus nótaí aibhsithe le dath. Ar tháibléad nó guthán.", tag: "KDS", href: "/ga/scailean-cistine" },
    ],
  },

  founder: {
    eyebrow: "Tógtha ag bialannóirí",
    quoteStart:
      "Rinne mé féin agus mo bhean ár gcaifé féin a reáchtáil agus tá a fhios againn ó thaithí phearsanta conas a oibríonn lá bialainne i ndáiríre — glacadh orduithe, curfha, sreabhadh urláir agus cistine. Theastaigh uirlis amháin uainn: nua-aimseartha, éasca le tosú agus soiléir ar an gcéad fhéachaint —",
    quoteAccent: "mar sin chuireamar tús leis an ardán a fhorbraímid anois do bhialannóirí eile.",
    sign: "Bogdan Sokolov · bunaitheoir, iar-úinéir caifé",
    photoAlt: "Bogdan Sokolov, bunaitheoir IQ Rest",
  },

  how: {
    heading: "Beo i 5 nóiméad",
    sub: "Ceithre chéim ghairide. Gan suiteáil, gan socrú teicniúil.",
    steps: [
      { n: "1", t: "Cineál agus ainm", d: "Roghnaigh cineál an áit agus cuir isteach an t-ainm." },
      { n: "2", t: "Sábháil", d: "Cuir isteach do ríomhphost nó sínigh isteach le Google." },
      { n: "3", t: "Biachlár", d: "Cuir míreanna leis de láimh nó uaslódáil biachlár priontáilte le haghaidh scanadh IS." },
      { n: "4", t: "Críochnaithe", d: "Roinn nasc nó cód QR agus tosaigh orduithe a ghlacadh." },
    ],
  },

  pricing: {
    badge: "Gan choimisiún · Gan chonarthaí",
    heading: "Plean amháin.",
    headingAccent: "Gach rud san áireamh.",
    sub: "Biachlár QR, glacadh orduithe, aistriúchán IS, suíomh bialainne agus curfha. Táille mhíosúil shoiléir amháin.",
    monthlyLabel: "Míosúil",
    yearlyLabel: "Bliantúil",
    saveBadge: "Sábháil 25%",
    perMonth: "sa mhí",
    billedAnnually: "Bille bliantúil: {total}",
    youSave: "Sábhálann tú {amount}",
    trust: { secure: "Íocaíocht shlán Stripe", noCommitment: "Gan ghealltanas", quick: "Gníomhach i nóiméid", restaurants: "500+ bialann" },
  },

  faq: {
    eyebrow: "An bhfuil ceisteanna agat?",
    heading: "Ceisteanna",
    headingAccent: "coitianta.",
    sub: "Cad a fhiafraíonn bialannóirí roimh chlárú. Nach féidir leat do cheist a fháil? Cuir teachtaireacht chugainn ar WhatsApp — freagraíonn fíordhaoine, ní bot.",
    whatsappCta: "Cuir ceist ar WhatsApp",
    whatsappPrefill: "Dia duit, tá ceist agam faoi IQ Rest",
    items: [
      { q: "Cad atá san áireamh sa tréimhse trialach agus céard a tharlóidh ina dhiaidh?", a: "Rochtain iomlán ar gach gné ar feadh 14 lá, gan cárta. Tar éis 14 lá cuirfear an cuntas ar shos mura gcuirfear modh íocaíochta leis — ní ghearrfaimid go huathoibríoch riamh. Is féidir leat íocaíocht a chur leis níos déanaí agus leanúint ar aghaidh ón áit ar fhág tú. Cealaigh aon uair le cliceáil amháin." },
      { q: "An nglacann sibh coimisiún ar orduithe?", a: "Ní ghlacaimid. Téann gach ordú ón mbiachlár QR díreach chuig an mbialann — gan céatadán uainn, gan táillí comhthiomsóra. Táille mhíosúil sheasta amháin agus tada eile." },
      { q: "An gá d'aíonna aip a bheith acu, an gá scileanna teicniúla againne?", a: "Ní gá aip ag aíonna — díríonn siad ceamara an ghutháin ar an gcód QR agus osclaíonn an biachlár sa bhrabhsálaí. Ní gá scileanna teicniúla ag bialanna ach an oiread: ritheann an painéal riaracháin in aon bhrabhsálaí nua-aimseartha ar ghuthán, táibléad nó ríomhaire glúine. Tá gach gníomh trí chliceáil agus tarraingt-agus-scaoileadh, gan chód." },
      { q: "Cé chomh tapa is a athraíonn praghsanna agus a thagann miasa nua?", a: "Láithreach. Athraigh praghas ón nguthán — feiceann aíonna é i soicindí. Tógann mias nua cúpla tapáil: ainm, praghas, grianghraf. Gan athphriontáil, gan fhanacht ar dhearthóir." },
      { q: "Cé mhéad teanga atá tacaithe?", a: "35 teanga le haistriúchán IS ionsuite. Tapáil amháin agus tá an biachlár ar fad aistrithe; tuigeann an IS comhthéacs cócaireachta — fuaimíonn ainmneacha agus tuairiscí nádúrtha in aon teanga. Ordaíonn turasóirí le níos mó muiníne nuair a thuigeann siad an biachlár i ndáiríre." },
    ],
  },

  finalCta: {
    heading: "Beo i 5 nóiméad.",
    headingAccent: "14 lá saor in aisce.",
    sub: "Gan cárta, cealaigh aon uair. Bí mar chuid de 500+ bialann atá ag úsáid IQ Rest cheana féin.",
  },

  scan: {
    heading: "An bhfuil biachlár páipéir nó PDF agat?",
    headingAccent: "Digitíonn an IS é i 60 soicind.",
    sub: "Uaslódáil grianghraf nó doiciméad — aithníonn an IS catagóirí, miasa agus praghsanna go huathoibríoch.",
    cta: "Scan biachlár →",
  },

  pricingHero: {
    chips: ["Gan choimisiún", "Gan chonarthaí", "14 lá saor in aisce"],
    heading: "Praghsanna.",
    headingAccent: "Gan táillí folaithe.",
    sub: "Táille mhíosúil shoiléir amháin. Gan céatadán ar orduithe ná coimisiúin comhthiomsóra. Cealaigh an síntiús aon uair.",
    popularBadge: "Coitianta",
    perMonthSuffix: "/mí",
    whenAnnualTemplate: "bille bliantúil · {total} € sa bhliain",
    orMonthlyTemplate: "nó {price} €/mí",
    savingsTemplate: "sábháil {amount} € sa bhliain",
    plans: {
      basic: {
        name: "Basic",
        tagline: "Biachlár, orduithe QR agus aistriúchán IS. Beo i 5 nóiméad.",
        features: [
          "Biachlár QR do gach bord",
          "Biachlár digiteach le grianghraif agus ailléirginí",
          "Aistriúchán IS i 35 teanga",
          "Orduithe ón mbiachlár (roghnach)",
          "Cruthú grianghraf miasa le IS",
          "Bainistigh ó aon ghuthán nó táibléad",
        ],
      },
      pro: {
        name: "Pro",
        tagline: "Smacht iomlán bialainne: scáileán cistine agus curfhaí.",
        features: [
          "Gach rud sa Basic",
          "Scáileán cistine (KDS)",
          "Curfha bord ar líne 24/7",
          "Tacaíocht WhatsApp tosaíochta",
        ],
      },
    },
  },

  footer: {
    featureLinks: [
      { href: "/ga/biachlar-digiteach-bialann", label: "Biachlár digiteach" },
      { href: "/ga/coras-orduithe-bialann", label: "Orduithe" },
      { href: "/ga/curfha-bord", label: "Curfha" },
      { href: "/ga/scailean-cistine", label: "Scáileán cistine" },
    ],
    navLinks: [
      { href: "/ga/praghsanna", label: "Praghsanna" },
      { href: "#faq", label: "Ceisteanna Coitianta" },
      { href: "/ga/languages", label: "Athraigh teanga" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Gach ceart ar cosaint.",
  },
};
