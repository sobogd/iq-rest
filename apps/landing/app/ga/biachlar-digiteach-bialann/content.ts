import {
  Languages,
  ShieldAlert,
  Palette,
  ShoppingCart,
  MonitorSmartphone,
  BadgePercent,
  Globe,
  LayoutTemplate,
  Contact,
  MessageCircle,
  CalendarCheck,
} from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "ga",
  slug: "biachlar-digiteach-bialann",
  trackPrefix: "l_ga_digital",
  hideFeatureHeading: true,

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
    headline: "Biachlár digiteach\nina bhfuil gach rud",
    cta: "Cruthaigh biachlár digiteach",
    sub: "Grianghraif, ailléirginí agus aistriúchán go 35 teanga. Chomh maith le horduithe, WhatsApp agus áirithint bord — gach rud in IQ Rest amháin.",
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
      heading: "35 teanga do gach aoi",
      body: "QR amháin, 35 teanga. Aistríonn an IS le comhthéacs cócaireachta, mar sin fuaimíonn gach mias nádúrtha. Ordaíonn turasóirí go muiníneach.",
      bullets: [
        "35 teanga i do phlean",
        "IS cócaireachta, ní Google",
        "Athrú teanga le tapáil amháin",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Beirt aíonna ag léamh an bhiachláir dhigitigh chéanna i dteangacha éagsúla ar a ngutháin féin" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Ailléirginí",
      heading: "Ailléirginí agus aiste bia ar gach mias",
      body: "Clibeáil glútan, lachtós, cnónna, véigeach agus saor ó ghlútan. Scagann aíonna an biachlár chun a n-aiste bia a oiriúnú agus ordaíonn go héasca.",
      bullets: [
        "14 catagóir ailléirginí",
        "Clibeanna véigeach is saor ó ghlútan",
        "Scagann aíonna de réir aiste bia",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Aoi ag scagadh an bhiachláir de réir ailléirginí ar a ghuthán fad atá an t-úinéir ag cur an liosta ailléirginí in eagar ar tháibléad" },
    },
    {
      icon: MonitorSmartphone,
      eyebrow: "Gléas ar bith",
      heading: "Bainistigh ó ghléas ar bith",
      body: "Ritheann an painéal riaracháin sa bhrabhsálaí — cuir biachlár, praghsanna is grianghraif in eagar ó áit ar bith. Gan aon rud le suiteáil.",
      bullets: [
        "Ritheann in aon bhrabhsálaí",
        "Guthán, táibléad nó ríomhaire",
        "Gan aon rud le suiteáil",
      ],
    },
    {
      icon: BadgePercent,
      eyebrow: "Gan choimisiún",
      heading: "Coimisiún nialasach, gan bhreiseáin",
      body: "Síntiús trédhearcach amháin. Ní thógaimid sciar de d'ioncam ná ní cheilimid táillí — fanann sé ar fad leis an mbialann.",
      bullets: [
        "Nialas faoin gcéad ar orduithe",
        "Gan bhreiseáin fholaithe",
        "Praghas cothrom amháin",
      ],
    },
    {
      icon: Globe,
      eyebrow: "Fearann féin",
      heading: "Biachlár ar d'fhearann féin",
      body: "Nascann muid d'fhearann le SSL — feiceann aíonna an biachlár ar sheoladh do bhialainne. Cuidímid le DNS i 10 nóiméad.",
      bullets: [
        "D'fhearann le SSL",
        "menu.dobhialannsa.ie",
        "Cuidímid le socrú DNS",
      ],
    },
    {
      icon: LayoutTemplate,
      eyebrow: "Do dhearadh",
      heading: "Dearadh solúbtha a oireann duit",
      body: "Roinnt leagan amach agus stíleanna réidh — roghnaigh an clúdach, na dathanna is cur i láthair na miasa a oireann do d'áit.",
      bullets: [
        "Roinnt leagan amach réidh",
        "Do chlúdach is do dhathanna",
        "Athstíl i gcúpla cliceáil",
      ],
    },
    {
      icon: Contact,
      eyebrow: "Teagmhálacha",
      heading: "Teagmhálacha is sóisialta sa bhiachlár",
      body: "Leathanach tiomnaithe le léarscáil, guthán is naisc chuig Instagram agus WhatsApp — aimsíonn aíonna thú le tapáil amháin.",
      bullets: [
        "Léarscáil, guthán is seoladh",
        "Instagram agus WhatsApp",
        "Teagmháil le tapáil amháin",
      ],
    },
    {
      icon: MessageCircle,
      eyebrow: "Orduithe WhatsApp",
      heading: "Glac orduithe trí WhatsApp",
      body: "Tógann aíonna ciseán is seolann an t-ordú díreach chuig do WhatsApp — gan aip ar leith, sa chomhrá a úsáideann siad cheana.",
      bullets: [
        "Ordú chuig do WhatsApp",
        "Gan aip ar leith",
        "Comhrá mar is gnách",
      ],
    },
    {
      icon: CalendarCheck,
      eyebrow: "Áirithintí",
      heading: "Áirithint bord gan ghlaonna",
      body: "Áirithníonn aíonna bord iad féin tríd an mbiachlár nó nasc, feiceann tú an féilire de réir boird is deimhníonn go huathoibríoch nó de láimh.",
      bullets: [
        "Áirithint 24/7, gan ghlaonna",
        "Féilire trasna na mbord",
        "Deimhniú uath is de láimh",
      ],
    },
    {
      icon: Palette,
      eyebrow: "Dearadh préimhe",
      heading: "Cuma suímh, ní PDF",
      body: "Cúlra físeáin ar an scáileán fáilte, cur síos ar do choincheap is leathanach teagmhála ar leith le léarscáil is sóisialta.",
      bullets: [
        "Físeán ar an scáileán baile",
        "Coincheap is miasa curtha síos",
        "Leathanach teagmhála ar leith",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Dhá ghuthán ar bhord caifé: scáileán baile an bhiachláir le cúlra físeáin agus leathanach teagmhála le léarscáil" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Orduithe · roghnach",
      heading: "Orduithe díreach ón mbiachlár",
      body: "Tógann aíonna ciseán is seolann an t-ordú — sroicheann sé an halla, WhatsApp nó scáileán na cistine. Roghnach.",
      bullets: [
        "Ciseán is seoladh le tapáil",
        "Chuig halla, WhatsApp nó cistin",
        "Cas air sna socruithe",
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
