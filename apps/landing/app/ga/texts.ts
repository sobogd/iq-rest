import { ScanLine, Languages, CalendarCheck, Palette, Smartphone, ChefHat } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "ga", htmlDir: "ltr",
  meta: {
    title: "Biachlár QR do Bhialanna — Orduithe Díreacha, Gan Coimisiún | IQ Rest",
    description: "Deireadh le biachláir pháipéir agus coimisiúin aipeanna seachadta. Biachlár QR, orduithe díreacha, áirithintí agus suíomh ilteangach. 14 lá saor in aisce, gan chárta.",
    canonical: "https://iq-rest.com/ga", ogLocale: "ga_IE",
    ogTitle: "Biachlár QR do Bhialanna — Orduithe Díreacha, Gan Coimisiún",
    ogDescription: "Biachlár QR, orduithe díreacha, áirithintí agus aistriúchán AI. Réidh i 2 nóiméad. 14 lá saor in aisce — gan chárta.",
  },
  ctaText: "Tosaigh saor in aisce →",
  demoText: "Féach ar an taispeántas", microcopy: "14 lá saor in aisce · Gan chárta · Cealaigh am ar bith",
  header: { navFeatures: "Gnéithe", navHow: "Conas a oibríonn sé", navPricing: "Praghsanna", navFaq: "FAQ", signIn: "Logáil isteach", cta: "Tosaigh saor in aisce →" },
  hero: {
    verticals: ["Bialanna", "Caiféanna", "Beáir", "Óstáin", "Pizzerias"],
    variants: [
      { headline: "Stop ag clóbhualadh biachlár.", headlineAccent: "Stop ag íoc 30% le haipeanna seachadta.", sub: "Biachlár QR, orduithe díreacha, áirithintí agus suíomh ilteangach. Réidh i 2 nóiméad — gan chárta." },
      { headline: "Tá do bhialann ag tuilleadh níos mó ná", headlineAccent: "biachláir pháipéir agus glaonna caillte.", sub: "Orduithe díreacha, nuashonruithe láithreacha agus áirithintí 24/7. Curtha ar bun i 2 nóiméad." },
      { headline: "Cód QR amháin.", headlineAccent: "Gan choimisiún. Slán le páipéar.", sub: "Biachlár QR, orduithe ar líne agus áirithintí — gach rud in aon áit. 14 lá saor, gan chárta." },
      { headline: "Faigh orduithe díreacha.", headlineAccent: "Lig an coimisiún thart.", sub: "Scanann aíonna, ordaíonn agus íocann — díreach chugat, gan ciorrú Deliveroo. Réidh i 2 nóiméad." },
      { headline: "Níos mó orduithe. Níos mó áirithintí.", headlineAccent: "Gan páipéar, gan aipeanna.", sub: "Biachlár QR + áirithintí + suíomh ilteangach ar uathphíolóta. 14 lá saor mar thriail." },
      { headline: "Nach féidir le turasóirí an biachlár a léamh?", headlineAccent: "Réitithe i 2 nóiméad.", sub: "Aistríonn AI an biachlár iomlán go 35 teanga. Móide orduithe QR agus áirithintí san áireamh." },
      { headline: "Ó bhiachlár páipéir go cód QR,", headlineAccent: "sular fhuaraítear an espresso.", sub: "Biachlár QR, orduithe díreacha agus áirithintí 24/7. Réidh i 2 nóiméad — gan chárta." },
      { headline: "Biachlár QR simplí ó nádúr.", headlineAccent: "Cumhachtach go ciúin istigh.", sub: "Orduithe díreacha, aistriúchán AI, áirithintí agus suíomh — gach rud le tap amháin ar an bhfón." },
    ],
    painBullets: ["Gan chló — athraigh praghsanna láithreach", "Gan choimisiún — orduithe díreach chugat", "Gan ghlaonna caillte — áirithintí 24/7", "35 teanga — ná caill turasóir riamh"],
    rating: "4,9 · níos mó ná 500 bialann i 30+ tír",
  },
  features: {
    heading: "Gach rud a theastaíonn uait.", headingAccent: "Aon rud nach dteastaíonn.",
    sub: "Tógtha do bhialanna. Úsáidte ag an mbord.",
    items: [
      { Icon: ScanLine, title: "Coinnigh 100% de gach ordú", desc: "Scanann aíonna, ordaíonn agus íocann — díreach chugat. Gan aipeanna le híoslódáil, gan 30% don seachadadh. Tagann gach ordú i bhfíor-am le huimhir an bhoird ar an bpainéal.", tag: "Orduithe díreach" },
      { Icon: Languages, title: "Díol le turasóirí ina dteanga féin", desc: "Aistríonn tap amháin an biachlár iomlán go 35 teanga. Tuigeann an AI comhthéacs cócaireachta — ordaíonn aíonna níos mó nuair a thuigeann siad an mhias i gceart.", tag: "Aistriúchán AI" },
      { Icon: CalendarCheck, title: "Ná cailltear áirithintí agus tú ag cócaireacht", desc: "Déanann aíonna áirithintí 24/7, gan ghlaonna. Deimhniú uathoibríoch nó láimhe, meabhrúcháin ríomhphoist — níos lú do shows-do shows, gan strus.", tag: "Áirithintí" },
      { Icon: Palette, title: "Dochuimhnithe i 1 soicind", desc: "Cuir físeán cistine nó grianghraf bia mar chúlra biachláir. Stopann aíonna ag scrolladh. Fanann do bhranda.", tag: "Dearadh saincheaptha" },
      { Icon: Smartphone, title: "Athraigh i soicindí, ní laethanta", desc: "Praghsanna, grianghraif, mias an lae — ón bhfón, idir bhoird. Beo do na haíonna láithreach. Gan athchló go deo.", tag: "Eagarthóir biachláir" },
      { Icon: ChefHat, title: "Freastail níos tapa gach seal", desc: "Sroicheann orduithe scáileán na cistine an bomaite a dheimhníonn an custaiméir. Náid pháipéir, náid screadaíl, náid orduithe caillte — níos lú botún, seirbhís níos tapa, níos mó cuirí in aghaidh na hoíche.", tag: "Ag teacht go luath" },
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
    heading: "Beo i níos lú ná 2 nóiméad",
    sub: "Ceithre chéim ghairide. Gan suiteáil, gan socrú teicniúil.",
    steps: [
      { n: "1", t: "Cláraigh", d: "Ríomhphost nó Google. Gan chárta. Déanta i 10 soicind." },
      { n: "2", t: "Ainm na bialainne", d: "Cuir an t-ainm isteach. Taispeánann sé in airde an bhiachláir." },
      { n: "3", t: "Cuir do chéad mhias leis", d: "Catagóir, ainm, praghas, grianghraf. Sin é." },
      { n: "4", t: "Roghnaigh cúlra agus priontáil QR", d: "Roghnaigh cúlra. Tóg do QR. Greamaigh do na boird." },
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
  finalCta: { heading: "Réidh i 2 nóiméad.", headingAccent: "Saor ar feadh 14 lá.", sub: "Gan chárta. Cealaigh am ar bith. Bí leis na 500+ bialann atá ar IQ Rest cheana." },
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
