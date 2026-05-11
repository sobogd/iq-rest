import { ScanLine, Languages, CalendarCheck, Palette, Smartphone, ChefHat } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "ga", htmlDir: "ltr",
  meta: {
    title: "Biachlár QR do Bhialanna — Orduithe Díreacha, Gan Coimisiún | IQ Rest",
    description: "Deireadh le biachláir pháipéir agus coimisiúin aipeanna seachadta. Biachlár QR, orduithe díreacha, áirithintí agus suíomh ilteangach. 14 lá saor in aisce, gan chárta.",
    canonical: "https://iq-rest.com/ga", ogLocale: "ga_IE",
    ogTitle: "Biachlár QR do Bhialanna — Orduithe Díreacha, Gan Coimisiún",
    ogDescription: "Biachlár QR, orduithe díreacha, áirithintí agus aistriúchán AI. Réidh i 5 nóiméad. 14 lá saor in aisce — gan chárta.",
  },
  ctaText: "Bain triail as",
  demoText: "Féach ar an taispeántas", microcopy: "14 lá saor in aisce · Gan chárta · Cealaigh am ar bith",
  header: { navFeatures: "Gnéithe", navHow: "Conas a oibríonn sé", navPricing: "Praghsanna", navFaq: "FAQ", signIn: "Logáil isteach", cta: "Bain triail as" },
  hero: {
    verticals: ["Bialanna", "Caiféanna", "Beáir", "Óstáin", "Pizzerias"],
    headline: "Rochlár QR i 5 nóiméad.",
    sub: "Suíomh gréasáin réamhdhéanta dod' bhialann — gan forbróirí ná conraitheoirí. Orduithe díreacha, áitithe agus anailís aíonna in aon síntiús amháin.",
    dynamicHeadlines: ["0% coimisiún.", "35 teanga le AI.", "Orduithe ar líne.", "Áitithe 24/7.", "Dearadh iontach."],
    painBullets: ["0% Coimisiún: Téann gach ordú go díreach chugat.", "Aistriúchán AI: 35 teanga chun caiteachas turasóirí a mhéadú.", "Áitithe 24/7: Bialann lán gan glaonna feles.", "Praghsanna solúbtha: Nuashonraigh an rochlár i soicindí."],
    rating: "4,9 · níos mó ná 500 bialann i 30+ tír",
  },
  features: {
    heading: "Gach rud a theastaíonn uait.", headingAccent: "Aon rud nach dteastaíonn.",
    sub: "Tógtha do bhialanna. Úsáidte ag an mbord.",
    items: [
      
      { Icon: ScanLine, title: "Ordú ag an mbord", desc: "Tagann orduithe láithreach ar WhatsApp nó ar an bpainéal le huimhir an bhoird. Seirbhís níos gasta.", tag: "Orduithe díreach" },
      { Icon: Languages, title: "Aistritheoir AI (35 Teanga)", desc: "Tuigeann ár n-AI an ghasstnamaíocht. Ordaíonn turasóirí 20% níos mó nuair a thuigeann siad an bia.", tag: "Aistriúchán AI" },
      { Icon: CalendarCheck, title: "Áitithe Táblaí", desc: "Glacann an córas le háitithe agus tú gnóthach sa chistin. Ná caill custaiméir arís.", tag: "Áirithintí" },
      { Icon: Palette, title: "Dearadh Nua-aimseartha", desc: "Cúlraí físeáin agus grianghraif áille. Breathnaíonn do rochlár go hiontach.", tag: "Dearadh saincheaptha" },
      { Icon: Smartphone, title: "Eagarthóir Tapa", desc: "Bainistigh praghsanna agus stoc go díreach ó do ghuthán. Athruithe beo láithreach.", tag: "Eagarthóir biachláir" },
      { Icon: ChefHat, title: "Ag teacht go luath: Scáileán Cistine", desc: "Déan dearmad ar thicéid pháipéir. Téann orduithe díreach chuig an gcócaire.", tag: "Ag teacht go luath" },
    
    ],
  },
  founder: {
    eyebrow: "Tógtha ag úinéir bialainne",
    quoteStart: "D'oscail mé féin agus mo bhean caifé agus chaitheamar seachtainí ag lorg córais a ghlacann orduithe ar líne, áirithintí agus a bhfuil cuma nua-aimseartha air. Bhí gach rud a thrialaíomar trom, gránna nó ar iarraidh leath de na gnéithe —",
    quoteAccent: "mar sin thógamar an ceann a theastaigh uainn féin.",
    sign: "Bogdan Sokolov · bunaitheoir, iar-úinéir caifé",
    photoAlt: "Bogdan, bunaitheoir IQ Rest",
  },
  how: {
    heading: "Beo i níos lú ná 5 nóiméad",
    sub: "Ceithre chéim ghairide. Gan suiteáil, gan socrú teicniúil.",
    steps: [
      { n: "1", t: "Cineál agus ainm", d: "Roghnaigh cineál agus cuir an t-ainm isteach." },
      { n: "2", t: "Sábháil", d: "Ríomhphost nó logáil isteach le Google." },
      { n: "3", t: "Roghchlár", d: "Cruthaigh é féin nó scan ceann páipéir." },
      { n: "4", t: "Réidh", d: "Féach, comhroinn agus glac orduithe." },
    ],
  },
  pricing: {
    badge: "Gan choimisiún · Gan chonarthaí",
    heading: "Plean amháin.", headingAccent: "Gach rud san áireamh.",
    sub: "Biachlár QR, orduithe, aistriúchán AI, suíomh bialainne agus áirithintí. Praghas simplí amháin.",
    monthlyLabel: "Míosúil", yearlyLabel: "Bliantúil", saveBadge: "Sábháil 25%", perMonth: "in aghaidh na míosa",
    billedAnnually: "Billáilte go bliantúil {total}", youSave: "Sábhálann tú {amount}",
    trust: { secure: "Íocaíocht slán le Stripe", noCommitment: "Gan tiomantas", quick: "Gníomhach i nóiméid", restaurants: "500+ bialann" },
  },
  faq: {
    eyebrow: "Ceisteanna?", heading: "Ceisteanna", headingAccent: "coitianta.",
    sub: "An rud a fhiafraíonn úinéirí bialainne sula gcláraíonn siad. Nach bhfeiceann tú do cheann féin? Scríobh chugainn ar WhatsApp — freagraíonn fíordhaoine.",
    whatsappCta: "Cuir ceist ar WhatsApp", whatsappPrefill: "Dia duit, tá ceist agam faoi IQ Rest",
    items: [
      { q: "Cad atá san áireamh sa thriail saor in aisce agus cad a tharlaíonn ina dhiaidh?", a: "14 lá rochtain iomlán, gan chárta. Tar éis 14 lá, sosann do chuntas mura gcuireann tú modh íocaíochta isteach — ní ghearrann muid go huathoibríoch riamh. Cuir sonraí íocaíochta isteach níos déanaí chun é a athghníomhachtú. Cealaigh le cliceáil amháin." },
      { q: "An nglacann sibh coimisiún ar orduithe?", a: "Gan ceann ar bith. Téann gach ordú ó do bhiachlár QR díreach chugat — gan sciar ar bith dúinn, gan táillí Deliveroo / Just Eat. Praghas míosúil socair amháin, sin é." },
      { q: "An gá d'aíonna app? An gá scileanna teicniúla domsa?", a: "Gan apps d'aíonna — scanann siad an QR leis an gceamara, osclaíonn an biachlár sa bhrabhsálaí. Gan scileanna teicniúla duitse — oibríonn an painéal go léir ar an bhfón, tap chun cur leis, tarraing chun athordú, sin é an cuar ar fad." },
      { q: "Cé chomh tapa is féidir liom praghsanna a athrú agus miasa nua a chur leis?", a: "Láithreach. Athraigh praghas ar an bhfón, feiceann aíonna i soicindí. Mias nua? Tap, scríobh, grianghraf, déanta — gan athchló, gan fanacht ar an dearthóir." },
      { q: "Cé mhéad teanga a thacaíonn sibh leis?", a: "35 teanga le haistriúchán AI ionsuite. Aistríonn tap amháin an biachlár iomlán, agus tuigeann an AI comhthéacs cócaireachta — fuaimníonn ainmneacha agus cur síos go nádúrtha i ngach teanga. Ordaíonn turasóirí níos mó nuair a thuigeann siad i ndáiríre." },
    ],
  },
  finalCta: { heading: "Réidh i 5 nóiméad.", headingAccent: "Saor ar feadh 14 lá.", sub: "Gan chárta. Cealaigh am ar bith. Bí leis na 500+ bialann atá ar IQ Rest cheana." },
  scan: {
    heading: "Biachlár páipéir nó PDF?",
    headingAccent: "Déanann an IS digitiú air i 60 soicind.",
    sub: "Uaslódáil — aithníonn an IS catagóirí, miasa agus praghsanna.",
    cta: "Scan an biachlár →",
  },
  footer: {
    featureLinks: [
      { href: "/ga/online-orders", label: "Orduithe ar líne" }, { href: "/ga/ai-translation", label: "Aistriúchán AI" },
      { href: "/ga/reservations", label: "Áirithintí" }, { href: "/ga/mobile-management", label: "Bainistíocht ar fhón" },
      { href: "/ga/easy-menu", label: "Eagarthóir biachláir" }, { href: "/ga/custom-design", label: "Cúlraí físe agus grianghraif" },
      { href: "/ga/color-scheme", label: "Dathanna brandála" }, { href: "/ga/multilingual", label: "Suíomh ilteangach" },
      { href: "/ga/ai-images", label: "Optamú íomhá AI" }, { href: "/ga/analytics", label: "Anailís" },
      { href: "/ga/instant-setup", label: "Socrú láithreach" }, { href: "/ga/personal-support", label: "Tacaíocht phearsanta" },
    ],
    navLinks: [
      { href: "#pricing", label: "Praghsanna" }, { href: "#faq", label: "Ceisteanna" },
      { href: "/ga/languages", label: "Athraigh teanga" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Gach ceart ar cosaint.",
  },
};
