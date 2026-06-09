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
    verticals: ["Bialanna","Caiféanna","Beáir","Píotsaíochtaí"],
    title: "Do bhialann,",
    titleAccent: "digiteach i 5 nóiméad.",
    sub: "Biachlár digiteach álainn, scáileán cistine agus áirithintí 24/7 — an t-ardán iomlán do bhialann nua-aimseartha.",
  },

  heroMicrocopy: "{count} bialann · 14 lá saor · Gan chárta",
  seeIncluded: "Féach cad atá san áireamh",

  trust: [
    { kind: "num", value: 35, label: "Teangacha" },
    { kind: "text", value: "24/7", label: "Áirithintí" },
    { kind: "num", value: 5, suffix: " min", label: "Tús" },
    { kind: "count", label: "Bialanna" },
  ],

  bundle: {
    heading: "Gach rud a choinníonn do bhialann ag imeacht.",
    headingAccent: "In aon aip amháin.",
    sub: "Biachlár, cistin agus áirithintí in aon áit — nua-aimseartha, tapa agus tógtha don chaoi a n-oibríonn bialanna i ndáiríre. Gan bhreiseáin, gan táille in aghaidh na gné.",
  },

  benefits: [
    { Icon: Languages, tag: "Biachlár digiteach", title: "Biachlár a dhíolann.", bullets: ["35 teanga le IS","Dearadh den scoth","Praghsanna láithreach"], image: "/landing/feature-design.webp", imageAlt: "Dhá fhón ar bhord caifé: scáileán fáilte an bhiachláir dhigitigh agus an leathanach teagmhála le léarscáil" },
    { Icon: ChefHat, tag: "Scáileán cistine", title: "Cócaráil níos tapúla, gan aon rud a chailleadh.", bullets: ["Beo ar an scáileán","Nótaí is ailléirginí","Táibléad nó fón"], image: "/landing/feature-kds-cards.webp", imageAlt: "Táibléad ag an mbeár ag taispeáint scáileán na cistine le horduithe de réir boird" },
    { Icon: CalendarCheck, tag: "Áirithintí", title: "Áirithintí ar uathphíolóta.", bullets: ["Áirithint féinseirbhíse","Deimhniú uathoibríoch","Féilire de réir boird"], image: "/landing/feature-booking-calendar.webp", imageAlt: "Dhá tháibléad ag taispeáint an fhéilire áirithintí: amharc laethúil de réir boird agus amharc míosúil" },
    { Icon: Receipt, tag: "Orduithe ag an mbord", title: "Orduithe díreach chuig an gcistin.", bullets: ["Aoi nó freastalaí","Díreach go dtí an chistin","Cas air am ar bith"], image: "/landing/feature-orders-map.webp", imageAlt: "Táibléad le scáileán na n-orduithe: liosta orduithe agus plean an urláir le boird daite." },
  ],

  seeDetails: "Féach mionsonraí",

  extras: {
    heading: "Agus gach rud eile san áireamh.",
    items: [
      { Icon: ScanLine, label: "Déanann IS do bhiachlár páipéir a dhigitiú i 60 soicind" },
      { Icon: QrCode, label: "Cód QR uathúil do gach bord" },
      { Icon: Smartphone, label: "Gan aip do na haíonna — osclaíonn sé sa bhrabhsálaí" },
      { Icon: Globe, label: "D'fhearann féin le SSL" },
      { Icon: BarChart3, label: "Anailís díolacháin: ioncam, barr-mhiasa, uaireanta" },
      { Icon: Palette, label: "Clibeanna ailléirginí is aistí bia le scagadh" },
    ],
  },

  midCta: {
    heading: "Aon aip in áit a cúig.",
    sub: "Gan a bheith ag lámhchleasaíocht le huirlisí ar leith don bhiachlár, don chistin agus do na háirithintí — gach rud in aon áit, ar aon fhón nó táibléad, gan aon rud a shuiteáil.",
  },

  how: {
    heading: "Beo i 5 nóiméad",
    sub: "Ceithre chéim. Gan suiteáil, gan socrú teicniúil, gan chárta.",
    steps: [
      { n: "1", t: "Cineál is ainm", d: "Cineál an ionaid agus an t-ainm — sin an clárú ar fad." },
      { n: "2", t: "Logáil isteach", d: "Ríomhphost nó Google. Gan chárta." },
      { n: "3", t: "Cuir an biachlár leis", d: "Clóscríobh é nó lig don IS do bhiachlár páipéir a scanadh." },
      { n: "4", t: "Tá tú beo", d: "Biachlár, cistin agus áirithintí — réidh." },
    ],
  },
};
