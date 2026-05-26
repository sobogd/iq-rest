import { Map, ClipboardList, Receipt, Smartphone } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "is",
  slug: "pontunarkerfi-veitingastaur",
  trackPrefix: "l_is_orders",

  meta: {
    title: "Pöntunarkerfi fyrir veitingastað — gestur og þjónn | IQ Rest",
    description:
      "Veitingapantanir úr síma eða spjaldtölvu: salaráætlun, skipting reiknings, stöður, valmöguleikar og athugasemdir. Gestir panta við borðið; þjónninn tekur pantanir úr hvaða tæki sem er. 14 dagar ókeypis.",
    canonical: "https://iq-rest.com/is/pontunarkerfi-veitingastaur",
    ogLocale: "is_IS",
    ogTitle: "Pöntunarkerfi fyrir veitingastað — gestur og þjónn",
    ogDescription:
      "Gestur við borðið eða þjónn á símanum — pöntunin kemur strax í eldhúsið. Salaráætlun, skipting reiknings, stöður, valmöguleikar og athugasemdir.",
    brandLine: "IQ Rest — Pöntunarkerfi fyrir veitingastað",
  },

  hero: {
    headline: "Pantanataka: gestur og þjónn — beint í eldhúsið.",
    cta: "Setja upp netpantanir",
    sub: "Gestir panta í gegnum QR matseðilinn við borðið eða þjónninn tekur pöntunina úr síma eða spjaldtölvu — pöntunin kemur á eldhússkjáinn á sekúndum. Salaráætlun með litakóða borðum, skipting reiknings, sveigjanlegir valmöguleikar og athugasemdir. Engar minnisbækur, engar ferðir á barinn.",
    imageSrc: "/landing/feature-orders.webp",
    imageAlt: "Þjónn tekur pöntun við borðið úr snjallsíma — pöntunin kemur á eldhússkjáinn",
  },

  scan: {
    heading: "Settu upp pöntunarkerfið",
    headingAccent: "á 5 mínútum.",
    sub: "Hlaðið upp pappírs matseðli eða PDF — gervigreindin þekkir rétti, verð og flokka. Tengdu spjaldtölvu í salnum og byrjaðu að taka pantanir við borðin.",
    cta: "Skanna matseðil",
  },

  subFeatures: [
    {
      icon: Map,
      eyebrow: "Listi og salaráætlun",
      heading: "Pöntunarlisti við hliðina á salaráætlun.",
      body: "Allar virkar pantanir til hægri: staða, upphæð, tími, fjöldi atriða. Til vinstri — salaráætlunin: borð litakóðuð eftir stöðu — laust, upptekið, þarf athygli. Pikkaðu á borð til að opna eða stofna pöntun; pikkaðu á spjald til að opna nákvæmari sýn. Engar skjáflakkanir.",
      bullets: [
        "Salaráætlun: borð litakóðuð eftir pöntunarstöðu.",
        "Pöntunarlisti við hliðina — upphæð, tími, fjöldi atriða.",
        "Pikkaðu á borð til að opna eða stofna pöntun.",
      ],
      image: { src: "/landing/feature-orders-map.webp", alt: "Spjaldtölva á þjónustöð: pöntunarlisti og salaráætlun með litakóða borðum" },
    },
    {
      icon: ClipboardList,
      eyebrow: "Pöntunarspjald",
      heading: "Pöntunarspjald: stöður, afritun, eyðing — eitt pikk.",
      body: "Hver hlutur hefur sína eigin stöðu (Bíður / Í eldun / Tilbúið / Borið fram) — eldhús og þjónn sjá sömu mynd í rauntíma. Að pikka á punktinn opnar aðgerðavalmynd: stöðubreyting, afritun hluts með sömu breytum og valmöguleikum, eyðing. Allt innan spjaldsins.",
      bullets: [
        "Staða eftir hlut: Bíður / Í eldun / Tilbúið / Borið fram.",
        "Afritaðu hlut með einu pikki með sömu valmöguleikum.",
        "Eyddu hlut beint úr spjaldinu.",
      ],
      image: { src: "/landing/feature-orders-detail.webp", alt: "Spjaldtölva með nákvæmu pöntunarspjaldi: hlutastöður, afritunar- og eyðingaraðgerðir" },
    },
    {
      icon: Receipt,
      eyebrow: "Skipta reikningi",
      heading: "Skiptu reikningnum þegar gestir borga sér.",
      body: "Gestir ákváðu að skipta — merktu hluti sem flytjast á nýjan miða; afgangurinn er á núverandi. Kerfið sýnir strax bæði upphæðina. Eitt pikk á „Skipta pöntun“ og þú ert með tvær sjálfstæðar pantanir með réttar upphæðir, báðar enn tengdar borðunum sínum.",
      bullets: [
        "Veldu hluti til að skipta með gátreitum.",
        "Báðar upphæðir birtast strax.",
        "Eitt pikk og pöntunin er skipt án handvirks útreiknings.",
      ],
      image: { src: "/landing/feature-orders-split.webp", alt: "Spjaldtölva á veitingaborði: skiptaglugga reiknings milli gesta" },
    },
    {
      icon: Smartphone,
      eyebrow: "Bæta við úr síma",
      heading: "Bættu hlutum við úr síma — í þremur aðgerðum.",
      body: "Þjónninn er ekki bundinn við eitt tæki: opnar pantanatöku á sínum eigin síma og bætir við hlut í þremur skrefum — flokkur, réttur, valmöguleikar (stærð, eldunarstig, viðbótarsósa eða hráefni). Verðið er endurreiknað sjálfkrafa. Athugasemd til eldhúss kemur á síðasta skrefinu.",
      bullets: [
        "Þrjú skref: flokkur → réttur → valmöguleikar.",
        "Valmöguleikar (stærð, viðbætur, auka) með verði í einum smelli.",
        "Athugasemdareitur á lokaskrefi.",
      ],
      image: { src: "/landing/feature-orders-mobile.webp", alt: "Fjórir símar með skrefum til að bæta við hlut við pöntun: flokkur, réttur, stærð, athugasemd" },
    },
  ],

  faq: {
    sub: "Það sem veitingamenn spyrja um pantanatöku í IQ Rest. Finnurðu ekki þína spurningu? Skrifaðu okkur á WhatsApp.",
    items: [
      { q: "Geta margir þjónar unnið samtímis úr mismunandi tækjum?", a: "Já. Hver þjónn skráir sig inn á sameiginlegan veitingastaðareikning úr sínum eigin síma eða spjaldtölvu — allir sjá sömu borð, pantanir og stöður í rauntíma. Breytingar eins þjóns birtast strax öðrum, án árekstra eða læsinga." },
      { q: "Geta þjónar notað sín eigin tæki (BYOD)?", a: "Já. Þetta er vefforrit í vafranum — ekkert að setja upp. Þjónninn opnar tengil, skráir sig inn á veitingastaðareikninginn úr sínum iPhone, Android eða persónulegri spjaldtölvu og byrjar að vinna. Í lok vaktarinnar skráir hann sig einfaldlega út." },
      { q: "Er hægt að bæta við skyldubundnum valmöguleikum á rétti (stærð, eldunarstig o.s.frv.)?", a: "Já. Hver réttur getur haft hvaða fjölda af valmöguleikahópum sem er — skyldubundna (t.d. „Stærð“: Lítil / Miðlungs / Stór) og valfrjálsa („Eldunarstig“: hrátt / miðlungs / vel eldað). Valmöguleikar geta breytt verði (+1,00 €). Ef hópur er skyldubundinn leyfir kerfið ekki gestinum eða þjóninum að bæta við réttinum án vals." },
      { q: "Geta gestir bætt athugasemdum eða aukum við rétt (brauð, sósa)?", a: "Já. Síðasta skref viðbótar hefur fría athugasemdareit („án lauks“, „vel eldað“, „ofnæmi fyrir hnetum“). Aukin eru aðskilin verðlögð breytur („+ BBQ sósa +1,50 €“, „+ Brauð +2,00 €“). Athugasemdir birtast á eldhússkjánum, með áherslu í lit." },
      { q: "Er pöntunartölfræði til staðar?", a: "Já. Greiningardeildin sýnir: tekjur eftir degi og klukkustund, meðalreikningur, vinsælustu réttir, viðskipti gestur → pöntun, þjónustuhraði (tími frá Bíður til Borið fram). Þetta hjálpar við að skipuleggja vaktir, innkaup og finna rétti sem ganga illa." },
      { q: "Er hægt að skipta pöntunum eða færa milli borða?", a: "Já, báðar sviðsmyndir eru studdar. Til að skipta — merktu hluti sem flytjast á nýjan miða (fyrir gesti sem borga sér). Til að færa — opnaðu pöntunarspjaldið, veldu nýtt borð; öll pöntunin færist þangað. Engin handvirk útreikning, engin að yfirgefa spjaldið." },
    ],
  },
};
