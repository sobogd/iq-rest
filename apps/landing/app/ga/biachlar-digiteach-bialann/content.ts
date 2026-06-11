import { Languages, ShieldAlert, Palette, ShoppingCart } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "ga",
  slug: "biachlar-digiteach-bialann",
  trackPrefix: "l_ga_digital",

  meta: {
    title: "Biachlár digiteach do bhialanna | IQ Rest",
    description:
      "Biachlár digiteach do bhialanna: biachlár ar líne le grianghraif, ailléirginí, aistriúchán IS agus nuashonruithe beo praghsanna. 14 lá saor in aisce, gan cárta.",
    canonical: "https://iq-rest.com/ga/biachlar-digiteach-bialann",
    ogLocale: "ga_IE",
    ogTitle: "Biachlár digiteach do bhialanna",
    ogDescription:
      "Leagan ar líne de do bhiachlár páipéir — grianghraif, ailléirginí, aistriúchán IS, nuashonruithe i bhfíor-am.",
    brandLine: "IQ Rest — Biachlár digiteach do bhialanna",
  },

  hero: {
    headline: "Biachlár digiteach do bhialanna.",
    cta: "Cruthaigh biachlár digiteach",
    sub: "Leagan ar líne de do bhiachlár páipéir le grianghraif, ailléirginí, tuairiscí agus nuashonruithe beo praghsanna. Feiceann aíonna an biachlár ina dteanga féin; sábhálann an bhialann ar phriontáil.",
  },

  scan: {
    heading: "An bhfuil biachlár páipéir nó PDF agat?",
    headingAccent: "Digitíonn an IS é i 60 soicind.",
    sub: "Uaslódáil grianghraf nó doiciméad — aithníonn an IS catagóirí, miasa agus praghsanna go huathoibríoch.",
    cta: "Scan biachlár",
  },

  subFeatures: [
    {
      icon: Languages,
      eyebrow: "35 teanga IS",
      heading: "35 teanga IS — léann gach aoi an biachlár ina theanga féin.",
      body: "Cód QR amháin, 35 teanga. Láimhseálann an IS comhthéacs cócaireachta — fuaimíonn ainmneacha miasa agus tuairiscí nádúrtha. Ordaíonn turasóirí le níos mó muiníne agus fásann an meánticéad gan an freastalaí a bheith ag aistriú gach mias.",
      bullets: [
        "35 teanga san áireamh sa síntiús, gan táille bhreise.",
        "IS le tuiscint ar chomhthéacs cócaireachta, ní Google Translate amh.",
        "Athraíonn an t-aoi an teanga le tapáil amháin sa bhiachlár féin.",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Beirt aíonna ag léamh an bhiachláir dhigitigh chéanna i dteangacha éagsúla ar a ngutháin féin" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Ailléirginí",
      heading: "Clibeanna ailléirginí agus aiste bia.",
      body: "Marcáil miasa do ghluten, lachtós, cnónna, bia mara, roghanna véigeacha agus saor ó ghluten. Scagann aíonna an biachlár de réir a riachtanas aiste bia agus ordaíonn le níos mó muiníne.",
      bullets: [
        "14 catagóir chaighdeánach ailléirginí ar gach mias.",
        "Clibeanna véigeach, glasraí agus saor ó ghluten le cliceáil amháin.",
        "Scagann aíonna an biachlár de réir a srianta aiste bia.",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Aoi ag scagadh an bhiachláir de réir ailléirginí ar a ghuthán fad atá an t-úinéir ag cur an liosta ailléirginí in eagar ar tháibléad" },
    },
    {
      icon: Palette,
      eyebrow: "Dearadh préimhe",
      heading: "Dearadh préimhe le cúlra físeáin agus leathanach teagmhála.",
      body: "Físeán nó grianghraf ar an scáileán fáilte, tuairisc bialainne, leathanach teagmhála tiomnaithe le léarscáil, uimhreacha gutháin agus próifílí sóisialta. Breathnaíonn an biachlár digiteach cosúil le suíomh iomlán bialainne, ní PDF taobh thiar de chód QR.",
      bullets: [
        "Cúlra físeáin nó grianghraf mór ar an scáileán fáilte.",
        "Tuairiscí bialainne agus catagóirí — inis scéal an choincheap.",
        "Leathanach teagmhála: léarscáil, guthán, Instagram, WhatsApp.",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Dhá ghuthán ar bhord caifé: scáileán baile an bhiachláir le cúlra físeáin agus leathanach teagmhála le léarscáil" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Orduithe ón mbiachlár · roghnach",
      heading: "Cuireann aíonna orduithe go díreach ón mbiachlár.",
      body: "Tógann aíonna ciseán sa bhiachlár QR agus seolann an t-ordú — sroicheann sé an freastalaí san urlár nó an táibléad cistine. Is féidir an ghné a chumasú nó a dhíchumasú sna socruithe ag aon am.",
      bullets: [
        "Ciseán, tráchtanna agus seoladh ordaithe le tapáil amháin.",
        "Sroicheann an t-ordú láithreach an painéal riaracháin, WhatsApp nó an scáileán cistine.",
        "Athraítear an ghné sna socruithe.",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Dhá ghuthán ar bhord: ciseán le hordú agus deimhniú gur seoladh an t-ordú" },
    },
  ],

  faq: {
    sub: "Cad a fhiafraíonn bialannóirí faoin mbiachlár digiteach in IQ Rest. Nach féidir leat do cheist a fháil? Cuir teachtaireacht chugainn ar WhatsApp.",
    items: [
      { q: "An gá scileanna teicniúla nó taithí CMS agam?", a: "Ní gá, ní theastaíonn scileanna speisialta. Tá gach gníomh sa phainéal riaracháin trí chliceáil agus tarraingt-agus-scaoileadh — gan chód. Tógann mír a chur leis an mbiachlár cúpla soicind: ainm, praghas, grianghraf. Tógann socrú iomlán biachláir 30 nóiméad go huair go hiondúil." },
      { q: "Cad é an biachlár digiteach IQ Rest?", a: "Is ardán néal é IQ Rest do bhialanna. Is é an biachlár digiteach an leagan ar líne de do bhiachlár, ar fáil d'aíonna trí chód QR nó nasc díreach: grianghraif miasa, praghsanna, ailléirginí, aistriúchán IS i 35 teanga, nuashonruithe i bhfíor-am. Óstáltar an biachlár ar ár bhfreastalaithe; ní gá duit bogearraí a shuiteáil ná a chothabháil — níl le déanamh ach brabhsálaí a oscailt." },
      { q: "An gá d'aíonna aip nó crua-earraí speisialta a bheith acu?", a: "Ní gá. Díríonn aíonna ceamara an ghutháin ar an gcód QR agus osclaíonn an biachlár sa bhrabhsálaí. Ritheann an painéal riaracháin do bhialanna freisin in aon bhrabhsálaí nua-aimseartha — guthán, táibléad nó ríomhaire glúine. Priontáiltear cóid QR ar aon phrintéir oifige." },
      { q: "An féidir liom an biachlár a óstáil ar mo fhearann féin?", a: "Tá. Tacaímid le fearann saincheaptha le teastas SSL — feiceann aíonna an biachlár ar sheoladh do bhialainne (m.sh. menu.dobhialannsa.ie). Cuidímid le socrú DNS; tógann sé 5–10 nóiméad go hiondúil." },
      { q: "An féidir liom roinnt bialanna a bhainistiú ó chuntas amháin?", a: "Tá, ar iarratas. Is féidir le cuntas amháin roinnt bialanna a óstáil: gach áit lena bhiachlár, dearadh, cóid QR agus anailísíocht féin. Cuir teachtaireacht chugainn ar WhatsApp agus cumasóimid mód il-bhialainne do do ghrúpa." },
      { q: "Cé chomh deacair is atá sé an biachlár a chur ar bun ón tús?", a: "Tá trí chéim sa socrú: (1) cruthaigh catagóirí; (2) cuir míreanna leis le hainmneacha, praghsanna agus grianghraif; (3) priontáil cóid QR do na boird. Má tá biachlár páipéir nó PDF agat cheana féin, uaslódáil é — aithneoidh an IS catagóirí, ainmneacha agus praghsanna agus líonfaidh sé na cártaí go huathoibríoch. Is féidir le biachlár bunúsach a bheith ar líne i 5 nóiméad; braitheann an t-am iomlán ar líon na míreanna." },
      { q: "Cén cineál tacaíochta a thairgeann sibh?", a: "Táimid ar fáil ar WhatsApp le linn uaireanta gnó agus freagraímid go tapa trí ríomhphost. Cuidímid leis an gcéad socrú, le cumraíocht fearainn, le dearadh biachláir agus le haon staid neamhchaighdeánach. Má tá taispeántas nó tacaíocht láimhe ag teastáil uait le linn an tseolta — cuir teachtaireacht chugainn." },
    ],
  },
};
