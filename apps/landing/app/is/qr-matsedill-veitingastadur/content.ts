import { Languages, ShieldAlert, Palette, ShoppingCart } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "is",
  slug: "qr-matsedill-veitingastadur",
  trackPrefix: "l_is_qr",

  meta: {
    title: "QR matseðill fyrir veitingastaði | IQ Rest",
    description:
      "QR matseðill fyrir veitingastaði: gesturinn skannar QR-kóðann á borðinu, opnar matseðilinn í vafranum og pantar á sínu tungumáli. 14 dagar frítt, án korts.",
    canonical: "https://iq-rest.com/is/qr-matsedill-veitingastadur",
    ogLocale: "is_IS",
    ogTitle: "QR matseðill fyrir veitingastaði",
    ogDescription:
      "QR á borðinu, matseðill í símanum — myndir, ofnæmisvaldar, 35 tungumál og uppfærslur í rauntíma.",
    brandLine: "IQ Rest — QR matseðill fyrir veitingastaði",
  },

  hero: {
    headline: "QR matseðill fyrir veitingastaði.",
    cta: "Búa til QR-matseðil",
    sub: "Gesturinn beinir myndavélinni að QR-kóðanum á borðinu og matseðillinn opnast samstundis í vafra símans: myndir af réttunum, ofnæmisvaldar, alltaf uppfærð verð og sjálfvirk þýðing á 35 tungumál. Án þess að hlaða niður öppum og án þess að endurprenta matseðilinn í hvert sinn sem verð breytist.",
  },

  scan: {
    heading: "Ertu þegar með matseðil á pappír eða PDF?",
    headingAccent: "Gervigreindin breytir honum í QR-matseðil á 60 sekúndum.",
    sub: "Hladdu upp mynd af matseðlinum eða PDF — gervigreindin dregur út flokka, rétti og verð og tengir þau strax við QR-matseðilinn.",
    cta: "Búa til QR-matseðil",
  },

  subFeatures: [
    {
      icon: Languages,
      eyebrow: "Einn QR, 35 tungumál",
      heading: "Einn QR-kóði, matseðillinn á 35 tungumálum.",
      body: "Gesturinn skannar QR og velur tungumál sitt: þýðinguna annast gervigreind með skilning á matargerð, ekki almenn þýðingarvél. Bless við sérstaka matseðla fyrir ferðamenn og lausa miða á borðinu.",
      bullets: [
        "Ein QR-prentun nær yfir 35 tungumál, innifalin í áskriftinni.",
        "Gervigreindin skilur eldhúsmálið — heiti réttanna hljóma eðlilega á öllum tungumálum.",
        "Gesturinn skiptir um tungumál inni í matseðlinum, án þess að skanna QR aftur.",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Tveir gestir skanna sama QR-kóðann á borðinu og lesa matseðilinn á ólíkum tungumálum" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Ofnæmisvaldar í QR",
      heading: "Ofnæmisvaldar og mataræðismerki inni í QR-matseðlinum.",
      body: "Hver réttur í matseðlinum sem tengist QR getur borið merki fyrir glúten, laktósa, hnetur, sjávarfang, vegan- og glútenlausa valkosti. Gesturinn síar úr símanum réttina sem henta takmörkunum hans, án þess að spyrja starfsfólkið.",
      bullets: [
        "14 flokkar ofnæmisvalda á réttastigi.",
        "Vegan-, grænmetis- og glútenlaus merki með einum smelli í stjórnborðinu.",
        "Gesturinn síar QR-matseðilinn eftir eigin takmörkunum.",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Gestur síar QR-matseðilinn eftir ofnæmisvöldum í símanum á meðan eigandinn ritstýrir listanum í spjaldtölvu" },
    },
    {
      icon: Palette,
      eyebrow: "Meira en bara QR",
      heading: "QR-matseðill fágaður eins og vefsíða veitingastaðarins.",
      body: "Eftir að hafa skannað kóðann lendir gesturinn ekki á flatri PDF: hann sér velkomstskjá með myndbandi eða valinni mynd, lýsingu á staðnum og tengiliðasíðu með korti, símanúmerum og samfélagsmiðlum. QR verður inngangurinn að veitingastaðnum á netinu.",
      bullets: [
        "Bakgrunnsmyndband eða valin mynd á upphafsskjá QR-matseðilsins.",
        "Pláss til að segja frá hugmyndafræði staðarins og hvers flokks.",
        "Innbyggð tengiliðasíða: kort, sími, Instagram, WhatsApp.",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Tveir símar á borði: upphafsskjár QR-matseðils með bakgrunnsmyndbandi og tengiliðasíða með korti" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Pöntun úr QR · valfrjálst",
      heading: "Úr QR-kóðanum getur gesturinn líka pantað.",
      body: "Auk þess að skoða matseðilinn getur QR-matseðillinn orðið pöntunarrás: gesturinn bætir réttum í körfuna og sendir beiðnina. Pöntunin berst þjóninum í salnum, á WhatsApp eða á eldhússkjáinn. Aðgerðin er kveikt eða slökkt í stillingum eftir þörfum.",
      bullets: [
        "Karfa, athugasemdir og sending pöntunar beint úr QR-skönnuninni.",
        "Pöntunin berst samstundis í salinn, á WhatsApp eða á eldhússkjáinn.",
        "Hægt er að virkja aðgerðina eftir tímum, sölum eða tilteknum veitingastöðum.",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Tveir símar á borði: karfa búin til úr QR-matseðlinum og staðfesting á sendri pöntun" },
    },
  ],

  faq: {
    sub: "Það sem veitingamenn spyrja um QR-matseðil IQ Rest. Finnurðu ekki spurninguna þína? Skrifaðu okkur á WhatsApp.",
    items: [
      { q: "Hvernig virkar QR-matseðill IQ Rest?", a: "Hvert borð er með prentaðan QR-kóða. Gesturinn skannar hann með myndavél símans og vafrinn opnar matseðil veitingastaðarins — myndir, lýsingar, ofnæmisvaldar og uppfærð verð. Ekkert app er nauðsynlegt, hvorki fyrir gestinn né starfsfólkið." },
      { q: "Þarf ég tæknikunnáttu til að búa til QR-matseðilinn?", a: "Nei. Stjórnborðið virkar með smellum og draga-og-sleppa, án kóða eða flókinna stillinga. Að bæta við rétti tekur nokkrar sekúndur: heiti, verð, mynd. Fyrsta uppsetning tekur yfirleitt 30 mínútur til klukkustund; ef þú ert þegar með PDF-matseðil breytir gervigreindin honum sjálfkrafa." },
      { q: "Þurfa gestir að setja upp app til að lesa QR?", a: "Nei. Innbyggð myndavél iPhone og Android þekkir QR-kóðann á sekúndum og opnar matseðilinn beint í vafranum. Stjórnborðið virkar einnig úr hvaða nútímavafra sem er — síma, spjaldtölvu eða fartölvu." },
      { q: "Hvernig eru QR-kóðarnir fyrir borðin prentaðir?", a: "QR-kóðarnir eru búnir til sjálfkrafa í stjórnborðinu (einn á hvert borð eða einn fyrir allan staðinn) og sóttir sem prenttilbúin PDF. Það nægir skrifstofuprentari og standur: standur, límmiði eða glasamotta." },
      { q: "Get ég notað mitt eigið lén fyrir QR-matseðilinn?", a: "Já. Við styðjum lén veitingastaðarins með SSL-vottorði (til dæmis matsedill.veitingastadurinnthinn.is): þegar gesturinn skannar QR sér hann heimilisfang veitingastaðarins þíns í stað almenns undirléns. Uppsetning DNS tekur 5–10 mínútur og við leiðum þig í gegnum hana." },
      { q: "Get ég stýrt QR-kóðum margra veitingastaða úr einum aðgangi?", a: "Já, eftir beiðni. Einn aðgangur getur sameinað marga staði, hver með sína QR-kóða, matseðil, hönnun og greiningar. Skrifaðu okkur á WhatsApp og við kveikjum á fjölveitingastaðahamnum." },
      { q: "Er erfitt að setja QR-matseðilinn af stað frá grunni?", a: "Þrjú skref: (1) búðu til flokkana; (2) bættu við réttunum með heiti, verði og mynd; (3) prentaðu QR-kóðana og settu þá á borðin. Ef þú ert þegar með matseðil á pappír eða PDF, hladdu honum upp — gervigreindin þekkir flokka og verð og fyllir út kortin. Grunnmatseðill getur verið kominn á netið á 5 mínútum." },
    ],
  },
};
