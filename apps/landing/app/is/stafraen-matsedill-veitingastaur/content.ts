import { Languages, ShieldAlert, Palette, ShoppingCart } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "is",
  slug: "stafraen-matsedill-veitingastaur",
  trackPrefix: "l_is_digital",

  meta: {
    title: "Stafrænn matseðill fyrir veitingastaði | IQ Rest",
    description:
      "Stafrænn matseðill fyrir veitingastaði: netmatseðill með myndum, ofnæmisvökum, gervigreindar þýðingu og uppfærslum á verðum í rauntíma. 14 dagar ókeypis, ekkert kort.",
    canonical: "https://iq-rest.com/is/stafraen-matsedill-veitingastaur",
    ogLocale: "is_IS",
    ogTitle: "Stafrænn matseðill fyrir veitingastaði",
    ogDescription:
      "Netútgáfa af pappírs matseðlinum þínum — myndir, ofnæmisvakar, gervigreindar þýðing, uppfærslur í rauntíma.",
    brandLine: "IQ Rest — Stafrænn matseðill fyrir veitingastaði",
  },

  hero: {
    headline: "Stafrænn matseðill fyrir veitingastaði.",
    cta: "Búa til stafrænan matseðil",
    sub: "Netútgáfa af pappírs matseðlinum þínum með myndum, ofnæmisvökum, lýsingum og uppfærslum á verðum í rauntíma. Gestir sjá matseðilinn á sínu eigin tungumáli; veitingastaðurinn sparar á prentun.",
  },

  scan: {
    heading: "Ertu með pappírs matseðil eða PDF?",
    headingAccent: "Gervigreindin gerir hann stafrænan á 60 sekúndum.",
    sub: "Hlaðið upp mynd eða skjali — gervigreindin þekkir flokka, rétti og verð sjálfkrafa.",
    cta: "Skanna matseðil",
  },

  subFeatures: [
    {
      icon: Languages,
      eyebrow: "35 gervigreindar tungumál",
      heading: "35 gervigreindar tungumál — hver gestur les matseðilinn á sínu eigin.",
      body: "Einn QR kóði, 35 tungumál. Gervigreindin höndlar matargerðarsamhengið — heiti rétta og lýsingar hljóma náttúrulega. Ferðamenn panta með meiri öryggi og meðalreikningur vex án þess að þjónninn þurfi að þýða hvern rétt.",
      bullets: [
        "35 tungumál innifalin í áskriftinni, án aukagjalds.",
        "Gervigreind sem skilur matargerðarsamhengi, ekki hrátt Google Translate.",
        "Gesturinn skiptir um tungumál með einum smelli í matseðlinum sjálfum.",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Tveir gestir lesa sama stafræna matseðilinn á mismunandi tungumálum í sínum eigin símum" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Ofnæmisvakar",
      heading: "Merkingar fyrir ofnæmisvaka og mataræði.",
      body: "Merktu rétti fyrir glúten, laktósa, hnetur, sjávarrétti, vegan og glúteinlausa valkosti. Gestir sía matseðilinn eftir mataræðisþörfum sínum og panta með meiri öryggi.",
      bullets: [
        "14 staðlaðir flokkar ofnæmisvaka á hverjum rétti.",
        "Merkingar vegan, grænmetisréttar og glúteinlausar með einum smelli.",
        "Gestir sía matseðilinn eftir mataræðistakmörkunum sínum.",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Gestur síar matseðilinn eftir ofnæmisvökum í símanum meðan eigandinn er að breyta ofnæmisvakalistanum á spjaldtölvu" },
    },
    {
      icon: Palette,
      eyebrow: "Premium hönnun",
      heading: "Premium hönnun með myndbandsbakgrunni og samskiptasíðu.",
      body: "Myndband eða mynd á velkominskjánum, lýsing veitingastaðar, sérstök samskiptasíða með korti, símanúmerum og samfélagsmiðlasniðum. Stafræni matseðillinn lítur út eins og full vefsíða veitingastaðar, ekki PDF á bak við QR kóða.",
      bullets: [
        "Myndbandsbakgrunnur eða stór mynd á velkominskjánum.",
        "Lýsingar veitingastaðar og flokka — segðu söguna af hugmyndinni.",
        "Samskiptasíða: kort, sími, Instagram, WhatsApp.",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Tveir símar á kaffihúsborði: heimaskjár matseðilsins með myndbandsbakgrunni og samskiptasíða með korti" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Pantanir úr matseðlinum · valfrjálst",
      heading: "Gestir panta beint úr matseðlinum.",
      body: "Gestir byggja körfu í QR matseðlinum og senda pöntunina — hún kemur til þjónsins í salnum eða á spjaldtölvuna í eldhúsinu. Eiginleikinn er hægt að kveikja eða slökkva á í stillingum hvenær sem er.",
      bullets: [
        "Karfa, athugasemdir og sendingar pöntunar með einum smelli.",
        "Pöntunin kemur strax í stjórnborðið, WhatsApp eða á eldhússkjáinn.",
        "Eiginleikinn er stilltur í stillingum.",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Tveir símar á borði: karfa með pöntun og staðfesting á sendri pöntun" },
    },
  ],

  faq: {
    sub: "Það sem veitingamenn spyrja um stafræna matseðilinn í IQ Rest. Finnurðu ekki þína spurningu? Skrifaðu okkur á WhatsApp.",
    items: [
      { q: "Þarf ég tæknilega kunnáttu eða CMS reynslu?", a: "Nei, sérstök kunnátta er ekki nauðsynleg. Hver aðgerð í stjórnborðinu er með smelli og dráttar-og-sleppi — án kóða. Að bæta við rétti á matseðilinn tekur nokkrar sekúndur: nafn, verð, mynd. Full matseðilsuppsetning tekur venjulega 30 mínútur til klukkustund." },
      { q: "Hvað er stafræni matseðillinn frá IQ Rest?", a: "IQ Rest er skýjavettvangur fyrir veitingastaði. Stafræni matseðillinn er netútgáfa af matseðlinum þínum, aðgengileg gestum í gegnum QR kóða eða beinan tengil: myndir af réttum, verð, ofnæmisvakar, gervigreindar þýðing á 35 tungumál, uppfærslur í rauntíma. Matseðillinn er hýstur á okkar netþjónum; þú þarft ekki að setja upp eða viðhalda hugbúnaði — opnaðu bara vafra." },
      { q: "Þurfa gestir app eða sérstakan vélbúnað?", a: "Nei. Gestir beina símamyndavélinni að QR kóðanum og matseðillinn opnast í vafranum. Stjórnborð veitingastaðarins virkar einnig í hvaða nútímalegri vafri sem er — sími, spjaldtölva eða fartölva. QR kóðar prentast á hvaða skrifstofuprentara sem er." },
      { q: "Get ég hýst matseðilinn á mínu eigin léni?", a: "Já. Við styðjum sérsniðið lén með SSL skírteini — gestir sjá matseðilinn á heimilisfangi veitingastaðarins (t.d. matsedill.veitingastadurthinn.is). Við hjálpum með DNS uppsetningu; það tekur venjulega 5–10 mínútur." },
      { q: "Get ég stjórnað nokkrum veitingastöðum úr einum reikningi?", a: "Já, sé óskað. Einn reikningur getur hýst nokkra veitingastaði: hver staður með sinn eigin matseðil, hönnun, QR kóða og greiningar. Skrifaðu okkur á WhatsApp og við virkjum fjölveitingastaða-stillingu fyrir hópinn þinn." },
      { q: "Hve erfitt er að setja upp matseðilinn frá grunni?", a: "Uppsetning samanstendur af þremur skrefum: (1) búðu til flokka; (2) bættu við réttum með nöfnum, verðum og myndum; (3) prentaðu QR kóða fyrir borðin. Ef þú ert nú þegar með pappírs matseðil eða PDF, hlaðið honum upp — gervigreindin þekkir flokka, nöfn og verð og fyllir spjöldin sjálfkrafa. Grunnmatseðill getur farið í loftið á 5 mínútum; heildartími uppsetningar fer eftir fjölda rétta." },
      { q: "Hvers konar aðstoð bjóðið þið?", a: "Við erum tiltæk á WhatsApp á opnunartíma og svörum hratt í tölvupósti. Við hjálpum með upphaflega uppsetningu, lénsuppsetningu, hönnun matseðils og hvers kyns óstöðluðum aðstæðum. Ef þú þarft kynningu eða praktíska aðstoð við ræsingu — skrifaðu okkur." },
    ],
  },
};
