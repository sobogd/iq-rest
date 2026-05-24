import { Languages, ShieldAlert, Palette, ShoppingCart } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "ga",
  slug: "biachlar-qr-coda-bialann",
  trackPrefix: "l_ga_qr",

  meta: {
    title: "Biachlár cód QR do bhialanna | IQ Rest",
    description:
      "Biachlár cód QR do bhialanna: scanann an t-aoi an cód QR ar an mbord, osclaíonn sé an biachlár sa bhrabhsálaí agus ordaíonn sé ina theanga féin. 14 lá saor in aisce, gan chárta.",
    canonical: "https://iq-rest.com/ga/biachlar-qr-coda-bialann",
    ogLocale: "ga_IE",
    ogTitle: "Biachlár cód QR do bhialanna",
    ogDescription:
      "QR ar an mbord, biachlár ar an bhfón — grianghraif, ailléirginí, 35 teanga agus nuashonruithe fíor-ama.",
    brandLine: "IQ Rest — Biachlár cód QR do bhialanna",
  },

  hero: {
    headline: "Biachlár cód QR do bhialanna.",
    sub: "Díríonn an t-aoi an ceamara ar an gcód QR ar an mbord agus osclaíonn an biachlár láithreach i mbrabhsálaí an fhóin: grianghraif na mbéilí, ailléirginí, praghsanna cothrom le dáta i gcónaí agus aistriúchán uathoibríoch go 35 teanga. Gan aipeanna a íoslódáil, agus gan an biachlár a athphriontáil gach uair a athraíonn praghas.",
  },

  scan: {
    heading: "An bhfuil biachlár páipéir nó PDF agat cheana?",
    headingAccent: "Déanann an IS biachlár QR de i 60 soicind.",
    sub: "Uaslódáil grianghraf den bhiachlár nó an PDF — baineann an IS catagóirí, béilí agus praghsanna amach agus nascann sé láithreach iad leis an mbiachlár QR.",
    cta: "Cruthaigh biachlár QR",
  },

  subFeatures: [
    {
      icon: Languages,
      eyebrow: "QR amháin, 35 teanga",
      heading: "Cód QR amháin, an biachlár i 35 teanga.",
      body: "Scanann an t-aoi an QR agus roghnaíonn sé a theanga: déanann IS a bhfuil tuiscint chócaireachta aici an t-aistriúchán, ní aistritheoir ginearálta. Slán le biachláir ar leith do thurasóirí agus le leathanaigh scaoilte ar an mbord.",
      bullets: [
        "Clúdaíonn priontáil QR amháin 35 teanga, san áireamh sa síntiús.",
        "Tuigeann an IS teanga na cistine — fuaimníonn ainmneacha na mbéilí nádúrtha i ngach teanga.",
        "Athraíonn an t-aoi teanga laistigh den bhiachlár, gan an QR a athscanadh.",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Scanann beirt aíonna an cód QR céanna ón mbord agus léann siad an biachlár i dteangacha éagsúla" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Ailléirginí sa QR",
      heading: "Ailléirginí agus lipéid aiste bia laistigh den bhiachlár QR.",
      body: "Is féidir le gach béile sa bhiachlár atá nasctha leis an QR lipéid a iompar do ghlútan, lachtós, cnónna, bia mara, roghanna vegan agus saor ó ghlútan. Scagann an t-aoi óna fhón na béilí a oireann dá shrianta, gan ceist a chur ar an bhfoireann.",
      bullets: [
        "14 chatagóir ailléirgine ar leibhéal an bhéile.",
        "Lipéid vegan, veigeatóra agus saor ó ghlútan le cliceáil amháin sa phainéal.",
        "Scagann an t-aoi an biachlár QR de réir a shrianta féin.",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Scagann aoi an biachlár QR de réir ailléirginí ar an bhfón agus an t-úinéir ag cur in eagar an liosta ó tháibléad" },
    },
    {
      icon: Palette,
      eyebrow: "Níos mó ná QR amháin",
      heading: "Biachlár QR snasta cosúil le suíomh gréasáin na bialainne féin.",
      body: "Tar éis an cód a scanadh, ní bhuaileann an t-aoi le PDF cothrom: feiceann sé scáileán fáilte le físeán nó grianghraf mór le rá, cur síos ar an áit agus leathanach teagmhála le léarscáil, uimhreacha gutháin agus naisc shóisialta. Éiríonn an QR ina dhoras tosaigh don bhialann ar líne.",
      bullets: [
        "Físeán cúlra nó grianghraf mór le rá ar scáileán tosaigh an bhiachláir QR.",
        "Spás chun coincheap na háite agus gach catagóire a insint.",
        "Leathanach teagmhála ionsuite: léarscáil, guthán, Instagram, WhatsApp.",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Dhá fhón ar bhord: scáileán tosaigh an bhiachláir QR le físeán cúlra agus leathanach teagmhála le léarscáil" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Ordú ón QR · roghnach",
      heading: "Ón gcód QR is féidir leis an aoi ordú a dhéanamh freisin.",
      body: "Chomh maith leis an mbiachlár a bhreathnú, is féidir leis an mbiachlár QR a bheith ina chainéal ordaithe: cuireann an t-aoi béilí sa chiseán agus seolann sé an t-iarratas. Sroicheann an t-ordú an freastalaí sa halla, WhatsApp nó scáileán na cistine. Cuirtear an ghné ar siúl nó as sna socruithe de réir mar is gá.",
      bullets: [
        "Ciseán, nótaí agus seoladh an ordaithe go díreach ó scanadh an QR.",
        "Sroicheann an t-ordú an halla, WhatsApp nó scáileán na cistine láithreach.",
        "Is féidir an ghné a chumasú de réir amanna, hallaí nó bialanna ar leith.",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Dhá fhón ar bhord: ciseán cruthaithe ón mbiachlár QR agus deimhniú ordaithe seolta" },
    },
  ],

  faq: {
    sub: "Na rudaí a fhiafraíonn lucht bialainne faoi bhiachlár QR IQ Rest. Nach bhfaigheann tú do cheist? Scríobh chugainn ar WhatsApp.",
    items: [
      { q: "Conas a oibríonn biachlár QR IQ Rest?", a: "Tá cód QR clóite ar gach bord. Scanann an t-aoi é le ceamara an fhóin agus osclaíonn an brabhsálaí biachlár na bialainne — grianghraif, cur síos, ailléirginí agus praghsanna cothrom le dáta. Níl gá le haon aip, don aoi ná don fhoireann." },
      { q: "An gá scileanna teicniúla chun an biachlár QR a chruthú?", a: "Ní gá. Oibríonn an painéal le cliceáil agus tarraingt-agus-scaoileadh, gan chód ná socruithe casta. Tógann sé cúpla soicind béile a chur leis: ainm, praghas, grianghraf. De ghnáth tógann an socrú tosaigh 30 nóiméad go uair an chloig; má tá PDF den bhiachlár agat cheana, tiontaíonn an IS go huathoibríoch é." },
      { q: "An gá d'aíonna aip a shuiteáil chun an QR a léamh?", a: "Ní gá. Aithníonn ceamara dúchasach iPhone agus Android an cód QR i soicindí agus osclaíonn sé an biachlár go díreach sa bhrabhsálaí. Oibríonn an painéal riaracháin freisin ó aon bhrabhsálaí nua-aimseartha — fón, táibléad nó ríomhaire glúine." },
      { q: "Conas a phriontáiltear na cóid QR do na boird?", a: "Gintear na cóid QR go huathoibríoch sa phainéal (ceann in aghaidh an bhoird nó ceann don áit ar fad) agus íoslódáiltear iad mar PDF réidh le priontáil. Níl uait ach printéir oifige agus seastán: seastán, greamán nó fomhias." },
      { q: "An féidir liom mo fhearann féin a úsáid don bhiachlár QR?", a: "Is féidir. Tacaímid le fearann bialainne le teastas SSL (mar shampla biachlar.dobhialann.ie): nuair a scanann an t-aoi an QR, feiceann sé seoladh do bhialainne in ionad fofhearann ginearálta. Tógann socrú DNS 5–10 nóiméad agus déanaimid tú a threorú tríd." },
      { q: "An féidir liom cóid QR roinnt bialann a bhainistiú ó chuntas amháin?", a: "Is féidir, ar iarratas. Is féidir le cuntas amháin roinnt áiteanna a chomhcheangal, gach ceann lena chóid QR, biachlár, dearadh agus anailísíocht féin. Scríobh chugainn ar WhatsApp agus cuirfimid an mód il-bhialainne ar siúl." },
      { q: "An bhfuil sé deacair an biachlár QR a sheoladh ón tús?", a: "Trí chéim: (1) cruthaigh na catagóirí; (2) cuir na béilí leis le hainm, praghas agus grianghraf; (3) priontáil na cóid QR agus cuir ar na boird iad. Má tá biachlár páipéir nó PDF agat cheana, uaslódáil é — aithníonn an IS catagóirí agus praghsanna agus líonann sé na cártaí. Is féidir biachlár bunúsach a bheith ar líne i 5 nóiméad." },
    ],
  },
};
