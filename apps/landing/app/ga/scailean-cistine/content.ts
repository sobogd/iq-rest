import { LayoutGrid, Timer } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "ga",
  slug: "scailean-cistine",
  trackPrefix: "l_ga_kds",

  meta: {
    title: "Scáileán cistine (KDS) do bhialanna | IQ Rest",
    description:
      "Scáileán cistine (KDS) do bhialanna: sroicheann orduithe ón urlár agus ón mbiachlár QR scáileán an chócaire láithreach. Colúin de réir boird, stádais Ag fanacht / Á cócaireacht / Réidh / Freastalaithe, scagairí de réir limistéir. Oibríonn ar tháibléad nó guthán.",
    canonical: "https://iq-rest.com/ga/scailean-cistine",
    ogLocale: "ga_IE",
    ogTitle: "Scáileán cistine (KDS) — Orduithe ar scáileán an chócaire",
    ogDescription:
      "Orduithe ón urlár ar scáileán an chócaire. Colúin de réir boird, stádais agus uaineadóir. Tapáil amháin a athraíonn an stádas.",
    brandLine: "IQ Rest — Scáileán cistine",
  },

  hero: {
    headline: "Scáileán cistine: orduithe go díreach chuig scáileán an chócaire.",
    cta: "Socraigh scáileán cistine",
    sub: "Níl ticéid pháipéir ag teastáil a thuilleadh. Sroicheann orduithe ón urlár nó ón mbiachlár QR scáileán na cistine láithreach — le nótaí, ailléirginí agus uaineadóir. Tapáil amháin a athraíonn an stádas. Oibríonn ar tháibléad ag an gcuntar nó ar fhón cliste i bpóca an chócaire.",
    imageSrc: "/landing/feature-kitchen.webp",
    imageAlt: "Cistin ghairmiúil le táibléad ar sheasamh prás a thaispeánann scáileán na cistine le horduithe gníomhacha",
  },

  scan: {
    heading: "Cuir an scáileán cistine ar bun",
    headingAccent: "i 5 nóiméad.",
    sub: "Uaslódáil biachlár páipéir nó PDF — aithníonn an IS miasa, catagóirí agus ailléirginí. Nasc táibléad sa chistin agus tosaigh ag fáil orduithe.",
    cta: "Scan biachlár",
  },

  subFeatures: [
    {
      icon: LayoutGrid,
      eyebrow: "Rialuithe agus scagairí",
      heading: "Roinnt scáileán de réir limistéir: cistin agus beár.",
      body: "Cuir táibléid ar leith ar an líne the, ar an mbeár nó ag an stáisiún caife — taispeánann gach scáileán na miasa a bhaineann léi amháin. Baintear torann le scagairí stádais (Ag fanacht / Á cócaireacht / Réidh / Freastalaithe) agus catagóire: feiceann an cócaire ach an t-ábhar a bhaineann lena stáisiún.",
      bullets: [
        "Roinnt scáileáin KDS le scagairí catagóire.",
        "Scagaire stádais: taispeáin ach Á cócaireacht agus Réidh.",
        "Feiceann gach limistéar a shreabhadh féin orduithe.",
      ],
      image: { src: "/landing/feature-kds-filters.webp", alt: "Táibléad ar sheasamh prás ag cuntar na cistine — KDS le scagaire stádais" },
    },
    {
      icon: Timer,
      eyebrow: "Cártaí agus uaineadóir",
      heading: "Tapáil amháin a athraíonn an stádas. Nótaí agus ailléirginí aibhsithe le dath.",
      body: "Taispeánann cárta na míre na roghanna roghnaithe (gan oinniún, cócaráilte go maith), nóta an aoi, na hailléirginí agus uaineadóir ón nóiméad a rinneadh an t-ordú. Tapáil an cárta agus aistríonn an stádas chuig an gcéad cheann eile: Ag fanacht → Á cócaireacht → Réidh → Freastalaithe. Sortáiltear an liosta de réir tosaíochta go huathoibríoch.",
      bullets: [
        "Tapáil ar an gcárta — athrú láithreach stádais.",
        "Roghanna, nótaí agus ailléirginí aibhsithe le dath.",
        "Sortáil de réir tosaíochta: ardaíonn míreanna a fhanann níos faide go barr.",
      ],
      image: { src: "/landing/feature-kds-cards.webp", alt: "Táibléad ar sheasamh prás ar an gcuntar beáir — KDS le cártaí orduithe de réir boird" },
    },
  ],

  faq: {
    sub: "Cad a fhiafraíonn bialannóirí faoin scáileán cistine in IQ Rest. Nach féidir leat do cheist a fháil? Cuir teachtaireacht chugainn ar WhatsApp.",
    items: [
      { q: "Cad iad na stádais miasa sa chistin?", a: "Ceithre stádas le dathanna éagsúla cártaí: Ag fanacht (liath) — glacadh an t-ordú agus tá sé ag fanacht; Á cócaireacht (oráiste) — tá an mhias á hullmhú; Réidh (gorm) — réidh le freastal; Freastalaithe (glas) — seachadta don aoi. Bogann tapáil ar an gcárta é go dtí an chéad stádas eile, gan roghchláir ná deimhnithe." },
      { q: "An féidir liom roinnt scáileán KDS a reáchtáil i limistéir éagsúla?", a: "Tá. Táibléad amháin ar an líne the, ceann eile ag an mbeár, tríú ceann ag an gcaife — gach ceann lena scagaire catagóire féin. Tá gach scáileán sioncronaithe i bhfíor-am: nuashonraítear stádas a athraíodh ar scáileán amháin gach áit." },
      { q: "Cén crua-earraí a theastaíonn uaim chun KDS a reáchtáil?", a: "Is feidhmchlár gréasáin é KDS a ritheann in aon bhrabhsálaí nua-aimseartha. Cistin mhór — táibléad ar sheasamh prás ag an gcuntar nó teilifíseán ar an mballa. Áit bheag — fón cliste an chócaire. Gan crua-earraí speisialta, gan suiteáil: oscail nasc agus sínigh isteach sa chuntas." },
      { q: "Cá dtagann orduithe ar scáileán na cistine?", a: "Ó gach foinse: an t-aoi a d'ordaigh tríd an mbiachlár QR ag an mbord; an freastalaí a ghlac an t-ordú óna ghuthán; an t-aoi a chuir an t-ordú isteach ón suíomh. Tagann gach ceann acu chuig an KDS le lipéad foinse agus uimhir an bhoird. Gan aistrithe láimhe ó POS." },
      { q: "Cad a thaispeántar ar chárta ordaithe?", a: "Ainm na míre, mionathruithe roghnaithe (gan oinniún, cócaráilte go maith, cuir anlann leis), trácht an aoi, ailléirginí aibhsithe, stádas (Ag fanacht / Á cócaireacht / Réidh / Freastalaithe) agus uaineadóir a thaispeánann cá fhad atá an mhias ag fanacht. Sortáiltear cártaí de réir tosaíochta: dá fhad an fanacht, is airde sa cholún." },
      { q: "An féidir liom na cártaí a scagadh ar an scáileán?", a: "Tá. Dhá scagaire: de réir stádais (m.sh. taispeáin ach Ag fanacht agus Á cócaireacht, folaigh Freastalaithe) agus de réir catagóire (deochanna amháin ag an mbeár, príomh-mhiasa amháin sa chistin). Sábháiltear na socruithe in aghaidh an ghléis — coinníonn gach limistéar a thacar féin." },
    ],
  },
};
