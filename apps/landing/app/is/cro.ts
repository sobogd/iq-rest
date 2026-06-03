import {
  Languages,
  ChefHat,
  CalendarCheck,
  Receipt,
  ScanLine,
  Globe,
  BarChart3,
  QrCode,
  Smartphone,
  Palette,
} from "lucide-react";
import type { CroCopy } from "@/app/_landing/templates/cro-home-template";

export const CRO: CroCopy = {
  hero: {
    verticals: ["Veitingastaðir","Kaffihús","Barir","Pítsustaðir"],
    title: "Veitingastaðurinn þinn,",
    titleAccent: "algjörlega stafrænn á 5 mínútum.",
    sub: "Heildarvettvangurinn til að reka nútímalegan veitingastað — fallegur, allt á einum stað, án tæknikunnáttu.",
  },

  heroMicrocopy: "{count} veitingastaðir · 14 dagar frítt · Ekkert kort",
  seeIncluded: "Sjá hvað fylgir",

  trust: [
    { kind: "num", value: 35, label: "Tungumál" },
    { kind: "text", value: "24/7", label: "Bókanir" },
    { kind: "num", value: 5, suffix: " min", label: "Ræsing" },
    { kind: "count", label: "Veitingastaðir" },
  ],

  bundle: {
    heading: "Allt sem veitingastaðurinn þinn gengur á.",
    headingAccent: "Í einu appi.",
    sub: "Matseðill, eldhús og bókanir á einum stað — nútímalegt, hratt og byggt fyrir hvernig veitingastaðir vinna í raun. Engin viðbót, ekkert gjald á hvern eiginleika.",
  },

  benefits: [
    { Icon: Languages, tag: "Stafrænn matseðill", title: "Matseðill sem lítur út eins og vefsíða, ekki PDF.", bullets: ["35 tungumál með gervigreind","Vönduð hönnun","Verð uppfærð strax"], image: "/landing/feature-design.webp", imageAlt: "Tveir símar á kaffihúsaborði: velkomuskjár stafræna matseðilsins og tengiliðasíða með korti" },
    { Icon: ChefHat, tag: "Eldhússkjár", title: "Eldhúsið, loksins pappírslaust.", bullets: ["Beint á skjáinn","Athugasemdir og ofnæmisvaldar","Spjaldtölva eða sími"], image: "/landing/feature-kds-cards.webp", imageAlt: "Spjaldtölva á barnum sýnir eldhússkjáinn með pöntunum eftir borðum" },
    { Icon: CalendarCheck, tag: "Bókanir", title: "Borð sem bóka sig sjálf, 24/7.", bullets: ["Sjálfsafgreiðslubókun","Sjálfvirk staðfesting","Dagatal eftir borðum"], image: "/landing/feature-booking-calendar.webp", imageAlt: "Tvær spjaldtölvur sýna bókunardagatalið: dagsýn eftir borðum og mánaðarsýn" },
    { Icon: Receipt, tag: "Pantanir við borðið", title: "Taktu pantanir án blokkar — valfrjálst.", bullets: ["Gestur eða þjónn","Beint í eldhúsið","Kveiktu hvenær sem er"], image: "/landing/feature-orders.webp", imageAlt: "Þjónn tekur pöntun við borðið í símanum, hún berst á eldhússkjáinn" },
  ],

  seeDetails: "Sjá nánar",

  extras: {
    heading: "Og allt annað fylgir.",
    items: [
      { Icon: ScanLine, label: "Gervigreind gerir pappírsmatseðilinn stafrænan á 60 sekúndum" },
      { Icon: QrCode, label: "Einstakur QR-kóði fyrir hvert borð" },
      { Icon: Smartphone, label: "Ekkert app fyrir gesti — opnast í vafranum" },
      { Icon: Globe, label: "Þitt eigið lén með SSL" },
      { Icon: BarChart3, label: "Sölugreining: tekjur, vinsælustu réttir, klukkustundir" },
      { Icon: Palette, label: "Ofnæmis- og mataræðismerki til að sía" },
    ],
  },

  midCta: {
    heading: "Eitt app í stað fimm.",
    sub: "Engin glíma við aðskilin verkfæri fyrir matseðil, eldhús og bókanir — allt á einum stað, í hvaða síma eða spjaldtölvu sem er, án uppsetningar.",
  },

  how: {
    heading: "Tilbúið á 5 mínútum",
    sub: "Fjögur skref. Engin uppsetning, engin tæknileg stilling, ekkert kort.",
    steps: [
      { n: "1", t: "Tegund og nafn", d: "Tegund staðar og nafn — það er öll skráningin." },
      { n: "2", t: "Skráðu þig inn", d: "Tölvupóstur eða Google. Ekkert kort." },
      { n: "3", t: "Bættu við matseðli", d: "Sláðu hann inn eða leyfðu gervigreind að skanna pappírsmatseðilinn." },
      { n: "4", t: "Þú ert komin í loftið", d: "Matseðill, eldhús og bókanir — tilbúið." },
    ],
  },
};
