import { Map, ClipboardList, Receipt, Smartphone } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "ga",
  slug: "coras-orduithe-bialann",
  trackPrefix: "l_ga_orders",

  meta: {
    title: "Córas orduithe do bhialann — aoi agus freastalaí | IQ Rest",
    description:
      "Orduithe bialainne ó ghuthán nó táibléad: léarscáil urláir, scoilteadh bille, stádais, roghanna agus nótaí. Ordaíonn aíonna ag an mbord; glacann an freastalaí orduithe ó aon ghléas. 14 lá saor in aisce.",
    canonical: "https://iq-rest.com/ga/coras-orduithe-bialann",
    ogLocale: "ga_IE",
    ogTitle: "Córas orduithe do bhialann — aoi agus freastalaí",
    ogDescription:
      "Aoi ag an mbord nó freastalaí ar an nguthán — sroicheann an t-ordú an chistin láithreach. Léarscáil urláir, scoilteadh bille, stádais, roghanna agus nótaí.",
    brandLine: "IQ Rest — Córas orduithe do bhialann",
  },

  hero: {
    headline: "Glacadh orduithe: aoi agus freastalaí — díreach chuig an gcistin.",
    cta: "Socraigh ordú ar líne",
    sub: "Ordaíonn aíonna tríd an mbiachlár QR ag an mbord nó glacann an freastalaí an t-ordú ó ghuthán nó táibléad — sroicheann an t-ordú scáileán na cistine i soicindí. Léarscáil urláir le boird daite, scoilteadh bille, roghanna solúbtha agus tuairimí. Gan leabhair nótaí, gan turais chuig an mbeár.",
    imageSrc: "/landing/feature-orders.webp",
    imageAlt: "Freastalaí ag glacadh ordaithe ag an mbord ó fhón cliste — sroicheann an t-ordú scáileán na cistine",
  },

  scan: {
    heading: "Cuir an córas orduithe ar bun",
    headingAccent: "i 5 nóiméad.",
    sub: "Uaslódáil biachlár páipéir nó PDF — aithníonn an IS miasa, praghsanna agus catagóirí. Nasc táibléad san urlár agus tosaigh ag glacadh orduithe ag na boird.",
    cta: "Scan biachlár",
  },

  subFeatures: [
    {
      icon: Map,
      eyebrow: "Liosta agus léarscáil urláir",
      heading: "Liosta orduithe in aice le léarscáil an urláir.",
      body: "Gach ordú gníomhach ar dheis: stádas, iomlán, am, líon míreanna. Ar chlé — léarscáil an urláir: boird daite de réir stádais — folamh, áitithe, ag teastáil aird. Tapáil bord chun ordú a oscailt nó a chruthú; tapáil cárta chun an radharc mionsonraithe a oscailt. Gan léim idir scáileáin.",
      bullets: [
        "Léarscáil urláir: boird daite de réir stádas an ordaithe.",
        "Liosta orduithe in aice leis — iomlán, am, líon míreanna.",
        "Tapáil bord chun ordú a oscailt nó a chruthú.",
      ],
      image: { src: "/landing/feature-orders-map.webp", alt: "Táibléad ag stáisiún an fhreastalaí: liosta orduithe agus léarscáil urláir le boird daite" },
    },
    {
      icon: ClipboardList,
      eyebrow: "Cárta ordaithe",
      heading: "Cárta ordaithe: stádais, dúbailt, scriosadh — tapáil amháin.",
      body: "Tá a stádas féin ag gach mír (Ag fanacht / Á cócaireacht / Réidh / Freastalaithe) — feiceann an chistin agus an freastalaí an pictiúr céanna i bhfíor-am. Osclaíonn tapáil ar an bponc an roghchlár gníomhartha: athrú stádais, dúbailt na míre leis na mionathruithe agus na roghanna céanna, scriosadh. Gach rud taobh istigh den chárta.",
      bullets: [
        "Stádas in aghaidh na míre: Ag fanacht / Á cócaireacht / Réidh / Freastalaithe.",
        "Dúblaigh mír le tapáil amháin leis na roghanna céanna.",
        "Scrios mír go díreach ón gcárta.",
      ],
      image: { src: "/landing/feature-orders-detail.webp", alt: "Táibléad le cárta sonraí an ordaithe: stádais míreanna, gníomhartha dúblála agus scriosta" },
    },
    {
      icon: Receipt,
      eyebrow: "Scoilteadh bille",
      heading: "Scoilt an bille nuair a íocann aíonna ar leithligh.",
      body: "Shocraigh na haíonna scoilteadh — marcáil na míreanna a théann go ticéad nua; fanann an chuid eile ar an gceann reatha. Taispeánann an córas an dá iomlán láithreach. Tapáil amháin ar „Scoilt ordú“ agus tá dhá ordú neamhspleácha agat le hiomláin cheart, an dá cheann fós ceangailte lena mboird.",
      bullets: [
        "Roghnaigh míreanna le scoilteadh le ticbhoscaí.",
        "Taispeántar an dá iomlán láithreach.",
        "Tapáil amháin agus tá an t-ordú scoilte gan mata láimhe.",
      ],
      image: { src: "/landing/feature-orders-split.webp", alt: "Táibléad ar bhord bialainne: modal scoilte bille idir na haíonna" },
    },
    {
      icon: Smartphone,
      eyebrow: "Cur leis ón nguthán",
      heading: "Cuir míreanna leis ón nguthán — i dtrí ghníomh.",
      body: "Níl an freastalaí ceangailte le haon ghléas amháin: osclaíonn glacadh orduithe ar a ghuthán féin agus cuireann mír leis i dtrí chéim — catagóir, mias, roghanna (méid, cócaireacht, anlann nó comhábhar breise). Ríomhtar an praghas go huathoibríoch. Tagann an nóta don chistin ar an gcéim dheireanach.",
      bullets: [
        "Trí chéim: catagóir → mias → roghanna.",
        "Roghanna (méid, breiseanna, breise) le praghas le cliceáil amháin.",
        "Réimse nóta ar an gcéim dheireanach.",
      ],
      image: { src: "/landing/feature-orders-mobile.webp", alt: "Ceithre ghuthán le céimeanna cur míre ordaithe leis: catagóir, mias, méid, trácht" },
    },
  ],

  faq: {
    sub: "Cad a fhiafraíonn bialannóirí faoi ghlacadh orduithe in IQ Rest. Nach féidir leat do cheist a fháil? Cuir teachtaireacht chugainn ar WhatsApp.",
    items: [
      { q: "An féidir le roinnt freastalaithe oibriú ag an am céanna ó ghléasanna éagsúla?", a: "Tá. Síníonn gach freastalaí isteach sa chuntas roinnte bialainne óna ghuthán nó tháibléad féin — feiceann gach duine na boird, orduithe agus stádais chéanna i bhfíor-am. Léirítear athruithe ag aon fhreastalaí láithreach do na cinn eile, gan choimhlintí ná ghlais." },
      { q: "An féidir le freastalaithe a ngléasanna pearsanta a úsáid (BYOD)?", a: "Tá. Is feidhmchlár gréasáin sa bhrabhsálaí é — gan tada le suiteáil. Osclaíonn an freastalaí nasc, síníonn isteach sa chuntas bialainne óna iPhone, Android nó tháibléad pearsanta agus tosaíonn ag obair. Ag deireadh an tseifte síníonn amach go simplí." },
      { q: "An féidir roghanna éigeantacha a chur le miasa (méid, cócaireacht, srl.)?", a: "Tá. Is féidir aon líon grúpaí roghanna a bheith ag gach mias — éigeantach (m.sh. „Méid“: Beag / Meánach / Mór) agus roghnach („Cócaireacht“: amh / meán / cócaráilte go maith). Is féidir le roghanna an praghas a athrú (+1,00 €). Más éigeantach grúpa, ní ligfidh an córas don aoi ná don fhreastalaí an mhias a chur leis gan rogha." },
      { q: "An féidir le haíonna nótaí nó breiseanna a chur le mias (arán, anlann)?", a: "Tá. Tá réimse nóta saor ag an gcéim dheireanach cuir leis („gan oinniún“, „cócaráilte go maith“, „ailléirgeach do chnónna“). Is mionathruithe ar leithligh praghsáilte iad na breiseanna („+ anlann BBQ +1,50 €“, „+ Arán +2,00 €“). Taispeántar nótaí ar scáileán na cistine, aibhsithe le dath." },
      { q: "An bhfuil staitisticí orduithe ar fáil?", a: "Tá. Taispeánann an chuid anailísíochta: ioncam in aghaidh an lae agus uair, meán ticéad, miasa is mó éilimh, tiontú aoi → ordú, luas freastail (am ó Ag fanacht go Freastalaithe). Cabhraíonn sé seo le seifteanna, ceannach a phleanáil agus miasa lag-ghníomhaíochta a aithint." },
      { q: "An féidir orduithe a scoilt nó a aistriú idir boird?", a: "Tá, tacaítear leis an dá chás. Chun scoilteadh — marcáil míreanna a théann go ticéad nua (do aíonna a íocann ar leithligh). Chun aistriú — oscail an cárta ordaithe, roghnaigh bord nua; aistríonn an t-ordú iomlán ann. Gan mata láimhe, gan an painéal a fhágáil." },
    ],
  },
};
