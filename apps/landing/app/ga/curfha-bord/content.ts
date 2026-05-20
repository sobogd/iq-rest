import { CalendarPlus, CalendarDays } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "ga",
  slug: "curfha-bord",
  trackPrefix: "l_ga_bookings",

  meta: {
    title: "Curfha bord 24/7 do bhialanna | IQ Rest",
    description:
      "Curfha bord 24/7 do bhialanna: cuireann aíonna in áirithe iad féin tríd an mbiachlár QR nó an suíomh. Féilire de réir boird, deimhnithe uathoibríocha agus meabhrúcháin. Gan aon aoi caillte. 14 lá saor in aisce.",
    canonical: "https://iq-rest.com/ga/curfha-bord",
    ogLocale: "ga_IE",
    ogTitle: "Curfha bord 24/7 — cuireann aíonna in áirithe iad féin",
    ogDescription:
      "Cuireann aíonna boird in áirithe tríd an mbiachlár QR nó an suíomh. Féilire, deimhnithe uathoibríocha, meabhrúcháin. Gan aon aoi caillte.",
    brandLine: "IQ Rest — Curfha bord do bhialanna",
  },

  hero: {
    headline: "Curfha bord 24/7 — cuireann aíonna in áirithe iad féin.",
    sub: "Cuireann aíonna boird in áirithe tríd an mbiachlár QR nó nasc díreach. Féilire de réir boird, deimhnithe uathoibríocha agus meabhrúcháin. Gan aon aoi caillte agus gan ghlaonna le linn buaicuaireanta.",
    imageSrc: "/landing/feature-reservation.webp",
    imageAlt: "Banaltra ag bainistiú curfhaí ó tháibléad ag bealach isteach na bialainne",
  },

  scan: {
    heading: "Cuir curfha bord ar siúl",
    headingAccent: "i 5 nóiméad.",
    sub: "Nasc an féilire, cuir boird leis le grianghraif agus toilleadh — tosaíonn aíonna ag cur in áirithe an lá céanna.",
    cta: "Cumasaigh curfha",
  },

  subFeatures: [
    {
      icon: CalendarPlus,
      eyebrow: "Foirm churfha",
      heading: "Cuireann aíonna in áirithe iad féin — de réir dáta, ama agus líon daoine.",
      body: "Osclaíonn an t-aoi an biachlár QR nó nasc díreach, roghnaíonn dáta, am agus líon daoine — agus feiceann sé na boird atá ar fáil láithreach, gach ceann le grianghraf, tuairisc (tarsann, in aice na fuinneoige, suíochán in aice an bheáir) agus toilleadh. Seoltar an deimhniú go huathoibríoch trí ríomhphost agus WhatsApp.",
      bullets: [
        "Roghnú boird de réir grianghraif, tuairisce agus toillte.",
        "Deimhniú uathoibríoch agus meabhrúchán uair an chloig roimh an gcuairt.",
        "Réimsí íosta san fhoirm: ainm, guthán, líon daoine.",
      ],
      image: { src: "/landing/feature-booking-form.webp", alt: "Aoi ag cur boird bialainne in áirithe ó ghuthán: dáta, am, líon daoine agus roghnóir boird" },
    },
    {
      icon: CalendarDays,
      eyebrow: "Féilire curfha",
      heading: "Féilire de réir lae agus boird — gach rud le sracfhéachaint.",
      body: "Taispeánann an painéal riaracháin féilire curfhaí roinnte de réir boird, lae, seachtaine agus míosa. Slotanna saor in aisce, boird áitithe, curfhaí deimhnithe agus neamhdheimhnithe ar scáileán amháin. Oibríonn ar tháibléad san urlár agus ar ríomhaire glúine san oifig.",
      bullets: [
        "Radhairc lá, seachtain agus mí.",
        "Roinnt de réir boird: cé, cathain, cé mhéad aoi.",
        "Aistrigh, cealaigh nó deimhnigh curfha le tapáil amháin ón nguthán.",
      ],
      image: { src: "/landing/feature-booking-calendar.webp", alt: "Féilire curfha sa phainéal riaracháin IQ Rest ar dhá tháibléad: Gantt laethúil de réir bord agus radharc míosúil" },
    },
  ],

  faq: {
    sub: "Cad a fhiafraíonn bialannóirí faoi churfha bord in IQ Rest. Nach féidir leat do cheist a fháil? Cuir teachtaireacht chugainn ar WhatsApp.",
    items: [
      { q: "An féidir liom a roghnú cén lá agus cén uair atá curfha ar fáil?", a: "Tá. Ceadaíonn an painéal riaracháin uaireanta oscailte agus laethanta na seachtaine atá ar fáil a shocrú — ní thaispeánfaidh an córas slotanna nach bhfuil ar fáil d'aíonna. Is féidir leat dáta ar leith a dhúnadh (imeacht comhlachta, curfha príobháideach) nó an féilire iomlán a mhúchadh go sealadach." },
      { q: "An féidir liom grianghraf a uaslódáil do gach bord?", a: "Tá. Is féidir grianghraf, tuairisc (tarsann, in aice na fuinneoige, suíochán in aice an bheáir) agus toilleadh a bheith ag gach bord. Feiceann an t-aoi an bord beacht atá á chur in áirithe aige agus déanann rogha eolasach — laghdaíonn sé seo ionchais neamhchomhlíonta." },
      { q: "An féidir liom curfha a dhíchumasú ar dhátaí ar leith?", a: "Tá. Ceadaíonn an féilire dátaí ar leith a dhúnadh (laethanta saoire, imeachtaí príobháideacha, athchóiriú) nó laethanta iomlána den tseachtain. Ar na dátaí seo feiceann aíonna teachtaireacht „curfha ar fáil go sealadach“." },
      { q: "An féidir liom saincheapadh cad iad na réimsí a bhailítear ón aoi?", a: "Tá. Tacar réamhshocraithe: ainm, guthán, ríomhphost, líon daoine. Is féidir leat réimsí saincheaptha a chur leis (ócáid, ailléirgí, iarratais speisialta) nó na cinn neamhriachtanacha a bhaint chun an fhoirm a choinneáil chomh gairid agus is féidir." },
      { q: "An féidir liom líon na n-aíonna in aghaidh an bhoird a theorannú?", a: "Tá. Tá socrú „toilleadh“ ag gach bord — ní cheadóidh an córas bord 2 a chur in áirithe do 6. Ar bhoird is mó is féidir leat íosmhéid a shocrú ionas nach dtógann grúpaí beaga an „bord ocht“ ó pháirtithe níos mó." },
      { q: "Cé chomh deacair atá socrú an churfha?", a: "Tógann sé an-bheagán ama. Trí chéim: (1) cuir boird leis le hainmneacha, grianghraif agus toilleadh, (2) cumasaigh mód curfha sna socruithe, (3) roinn an nasc nó an cód QR le haíonna. Seoladh iomlán i 5–10 nóiméad." },
      { q: "An féidir liom an córas curfha a úsáid ar mo fhearann féin?", a: "Tá. Tacaímid le fearann saincheaptha le teastas SSL: cuireann aíonna in áirithe ar sheoladh do bhialainne (m.sh. curfha.dobhialannsa.ie). Cuidímid le socrú DNS; tógann an próiseas 5–10 nóiméad." },
      { q: "An féidir liom deimhniú uathoibríoch nó láimhe a chumrú?", a: "Tá, socraítear an mód sna socruithe. Le deimhniú uathoibríoch, faigheann an t-aoi deimhniú láithreach tar éis na foirme a chur isteach agus meastar an curfha glactha. Le deimhniú láimhe, sroicheann an t-iarratas an painéal riaracháin le stádas „ag fanacht le deimhniú“ — déanann an bainisteoir athbhreithniú air agus deimhníonn nó diúltaíonn é. Tá an mód láimhe úsáideach do líon teoranta bord nó do bheartais dhochta aíonna." },
      { q: "An nglacann sibh coimisiún ar churfhaí?", a: "Ní ghlacaimid. Tá curfha bord san áireamh go hiomlán sa phlean Pro — gan céatadán ar aíonna, gan táille in aghaidh an tslota, gan coimisiúin comhthiomsóra. Táille mhíosúil sheasta agus curfhaí gan teorainn." },
    ],
  },
};
