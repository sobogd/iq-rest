import { LayoutGrid, Timer } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "is",
  slug: "eldhus-skjar",
  trackPrefix: "l_is_kds",

  meta: {
    title: "Eldhússkjár (KDS) fyrir veitingastaði | IQ Rest",
    description:
      "Eldhússkjár (KDS) fyrir veitingastaði: pantanir úr salnum og QR matseðli koma strax á skjá kokksins. Dálkar eftir borðum, stöður Bíður / Í eldun / Tilbúið / Borið fram, síur eftir svæði. Virkar á spjaldtölvu eða síma.",
    canonical: "https://iq-rest.com/is/eldhus-skjar",
    ogLocale: "is_IS",
    ogTitle: "Eldhússkjár (KDS) — Pantanir á skjá kokksins",
    ogDescription:
      "Pantanir úr salnum á skjá kokksins. Dálkar eftir borðum, stöður og tímamælir. Eitt pikk breytir stöðu.",
    brandLine: "IQ Rest — Eldhússkjár",
  },

  hero: {
    headline: "Eldhússkjár: pantanir beint á skjá kokksins.",
    cta: "Setja upp eldhússkjá",
    sub: "Pappírsmiðar eru ekki lengur nauðsynlegir. Pantanir úr salnum eða QR matseðli koma strax á eldhússkjáinn — með athugasemdum, ofnæmisvökum og tímamæli. Eitt pikk breytir stöðu. Virkar á spjaldtölvu við afgreiðsluborðið eða snjallsíma í vasa kokksins.",
    imageSrc: "/landing/feature-kitchen.webp",
    imageAlt: "Atvinnueldhús með spjaldtölvu á koparstandi sem sýnir eldhússkjáinn með virkum pöntunum",
  },

  scan: {
    heading: "Settu upp eldhússkjáinn",
    headingAccent: "á 5 mínútum.",
    sub: "Hlaðið upp pappírs matseðli eða PDF — gervigreindin þekkir rétti, flokka og ofnæmisvaka. Tengdu spjaldtölvu í eldhúsið og byrjaðu að taka á móti pöntunum.",
    cta: "Skanna matseðil",
  },

  subFeatures: [
    {
      icon: LayoutGrid,
      eyebrow: "Stjórntæki og síur",
      heading: "Nokkrir skjáir eftir svæðum: eldhús og bar.",
      body: "Settu sérstakar spjaldtölvur á heitu línuna, barinn eða konditorí — hver skjár sýnir aðeins réttina sem honum tilheyra. Síur eftir stöðu (Bíður / Í eldun / Tilbúið / Borið fram) og flokki fjarlægja hávaða: kokkurinn sér aðeins það sem skiptir máli fyrir hans pósti.",
      bullets: [
        "Nokkrir KDS skjáir með flokkasíum.",
        "Stöðusía: sýndu aðeins Í eldun og Tilbúið.",
        "Hvert svæði sér aðeins sitt eigið pöntunarflæði.",
      ],
      image: { src: "/landing/feature-kds-filters.webp", alt: "Spjaldtölva á koparstandi við afgreiðsluborðið í eldhúsinu — KDS með stöðusíu" },
    },
    {
      icon: Timer,
      eyebrow: "Spjöld og tímamælir",
      heading: "Eitt pikk breytir stöðu. Athugasemdir og ofnæmisvakar litaðir með áherslu.",
      body: "Réttarspjaldið sýnir valda valmöguleika (án lauks, vel eldað), athugasemd gestsins, ofnæmisvaka og tímamæli frá því pöntunin var gerð. Pikkaðu á spjaldið og staðan færist í þá næstu: Bíður → Í eldun → Tilbúið → Borið fram. Listinn er flokkaður sjálfkrafa eftir forgangi.",
      bullets: [
        "Pikk á spjaldið — tafarlaus stöðubreyting.",
        "Valmöguleikar, athugasemdir og ofnæmisvakar litaðir með áherslu.",
        "Forgangsflokkun: atriði sem hafa beðið lengur fara upp.",
      ],
      image: { src: "/landing/feature-kds-cards.webp", alt: "Spjaldtölva á koparstandi á barborði — KDS með pöntunarspjöldum eftir borðum" },
    },
  ],

  faq: {
    sub: "Það sem veitingamenn spyrja um eldhússkjáinn í IQ Rest. Finnurðu ekki þína spurningu? Skrifaðu okkur á WhatsApp.",
    items: [
      { q: "Hvaða réttastöður eru í eldhúsinu?", a: "Fjórar stöður með mismunandi spjaldlitum: Bíður (grár) — pöntunin er samþykkt og bíður; Í eldun (appelsínugulur) — rétturinn er í undirbúningi; Tilbúið (blár) — tilbúið til framreiðslu; Borið fram (grænn) — afhent gestinum. Pikk á spjaldið færir það í næstu stöðu, án valmynda eða staðfestinga." },
      { q: "Get ég keyrt nokkra KDS skjái á mismunandi svæðum?", a: "Já. Ein spjaldtölva á heitu línunni, önnur á barnum, þriðja í konditorí — hver með sína eigin flokkasíu. Allir skjáir eru samstilltir í rauntíma: staða sem er breytt á einum skjá uppfærist alls staðar." },
      { q: "Hvaða vélbúnað þarf ég til að keyra KDS?", a: "KDS er vefforrit sem keyrir í hvaða nútímalegri vafri sem er. Stórt eldhús — spjaldtölva á koparstandi við afgreiðsluborðið eða sjónvarp á vegg. Lítill staður — snjallsími kokksins. Enginn sérstakur vélbúnaður, engin uppsetning: opnaðu tengil og skráðu þig inn á reikninginn." },
      { q: "Hvaðan koma pantanir á eldhússkjáinn?", a: "Frá öllum upptökum: gesturinn sem pantaði í gegnum QR matseðilinn við borðið; þjónninn sem tók pöntunina úr símanum sínum; gesturinn sem lagði inn pöntunina af vefsíðunni. Allir koma á KDS með upptökumerki og borðnúmeri. Engar handvirkar færslur úr POS." },
      { q: "Hvað birtist á pöntunarspjaldi?", a: "Nafn réttar, valdir breytingar (án lauks, vel eldað, bæta við sósu), athugasemd gestsins, áberandi ofnæmisvakar, staða (Bíður / Í eldun / Tilbúið / Borið fram) og tímamælir sem sýnir hversu lengi rétturinn hefur beðið. Spjöld eru flokkuð eftir forgangi: því lengri bið, því hærra í dálkinum." },
      { q: "Get ég síað spjöldin á skjánum?", a: "Já. Tvær síur: eftir stöðu (t.d. sýna aðeins Bíður og Í eldun, fela Borið fram) og eftir flokki (aðeins drykkir á barnum, aðeins aðalréttir í eldhúsinu). Stillingar eru vistaðar fyrir hvert tæki — hvert svæði heldur sínu eigin setti." },
    ],
  },
};
