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
    titleAccent: "stafrænn á 5 mínútum.",
    sub: "Fallegur stafrænn matseðill, eldhússkjár og bókanir allan sólarhringinn — heildarvettvangurinn fyrir nútímalegan veitingastað.",
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
    { Icon: Languages, tag: "Stafrænn matseðill", title: "Matseðill sem selur.", bullets: ["35 tungumál með gervigreind","Vönduð hönnun","Verð uppfærð strax"], image: "/landing/feature-design.webp", imageAlt: "Tveir símar á kaffihúsaborði: velkomuskjár stafræna matseðilsins og tengiliðasíða með korti" },
    { Icon: ChefHat, tag: "Eldhússkjár", title: "Eldaðu hraðar, misstu ekki af neinu.", bullets: ["Beint á skjáinn","Athugasemdir og ofnæmisvaldar","Spjaldtölva eða sími"], image: "/landing/feature-kds-cards.webp", imageAlt: "Spjaldtölva á barnum sýnir eldhússkjáinn með pöntunum eftir borðum" },
    { Icon: CalendarCheck, tag: "Bókanir", title: "Bókanir á sjálfstýringu.", bullets: ["Sjálfsafgreiðslubókun","Sjálfvirk staðfesting","Dagatal eftir borðum"], image: "/landing/feature-booking-calendar.webp", imageAlt: "Tvær spjaldtölvur sýna bókunardagatalið: dagsýn eftir borðum og mánaðarsýn" },
    { Icon: Receipt, tag: "Pantanir við borðið", title: "Pantanir beint í eldhúsið.", bullets: ["Gestur eða þjónn","Beint í eldhúsið","Kveiktu hvenær sem er"], image: "/landing/feature-orders-map.webp", imageAlt: "Spjaldtölva með pöntunarskjánum: pöntunarlisti og gólfteikning með litakóðuðum borðum." },
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

  platform: {
    hardwareTitle: "Vinndu með þínum eigin búnaði",
    hardwareSub: "Við neyðum þig aldrei til að kaupa búnað af okkur. Notaðu símana, spjaldtölvurnar og tölvurnar sem þú átt nú þegar.",
    anywhereTitle: "Virkar alls staðar",
    anywhereSub: "Sími, spjaldtölva, fartölva, PC. Android, iOS, Windows, Mac, Linux. Virkar í öllum nútíma vöfrum, án uppsetningar.",
  },

  activities: {
    heading: "Eitt kerfi,",
    headingAccent: "allur veitingastaðurinn þinn.",
    sub: "Hraðari þjónusta, rólegra eldhús, lægri kostnaður og upplifun sem gestir muna — allt á einum vettvangi.",
    groups: [
      {
        Icon: Smartphone,
        tag: "Við borðið — gestir",
        bullets: [
          "QR matseðill á 35 tungumálum",
          "Panta án þess að bíða eftir þjóni",
          "Kalla á þjón eða biðja um reikning",
          "Bóka borð allan sólarhringinn",
        ],
      },
      {
        Icon: ChefHat,
        tag: "Í eldhúsinu",
        bullets: [
          "Pantanir birtast strax á skjánum",
          "Dálkar í vinnslu / tilbúið / borið fram",
          "Ofnæmisvaldar og athugasemdir merktar",
          "Spjaldtölva eða sími — engir pappírsmiðar",
        ],
      },
      {
        Icon: BarChart3,
        tag: "Stjórnun",
        bullets: [
          "Breytingar á matseðli og verði samstundis",
          "Þýðing með gervigreind með einum smelli",
          "Sölugreiningar og skýrslur",
          "Margir veitingastaðir á einum reikningi",
        ],
      },
    ],
  },
};
