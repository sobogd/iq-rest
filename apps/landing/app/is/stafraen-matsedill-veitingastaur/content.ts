import {
  Languages,
  ShieldAlert,
  Palette,
  ShoppingCart,
  CalendarCheck,
  MonitorSmartphone,
} from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "is",
  slug: "stafraen-matsedill-veitingastaur",
  trackPrefix: "l_is_digital",
  featureHeading: {
    heading: "Meira en matseðill",
    sub: "Allt sem gerir QR-matseðil að þjónustu fyrir salinn og eldhúsið þitt.",
  },

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
    headline: "Stafrænn matseðill\nsem hefur allt",
    cta: "Búa til stafrænan matseðil",
    sub: "Myndir, ofnæmisvakar og þýðing á 35 tungumál. Auk pantana, WhatsApp og borðabókana — allt í einu IQ Rest.",
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
      eyebrow: "Gervigreindar þýðing",
      heading: "Matseðill á 35 tungumálum",
      body: "Einn QR, 35 tungumál. Gervigreindin þýðir með matargerðarsamhengi, svo hver réttur hljómar eðlilega. Ferðamenn panta óhikað.",
      bullets: [
        "35 tungumál í áskriftinni",
        "Matar-gervigreind, ekki Google",
        "Skipt um tungumál með einum smelli",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Tveir gestir lesa sama stafræna matseðilinn á mismunandi tungumálum í sínum eigin símum" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Ofnæmisvakar",
      heading: "Ofnæmisvakar og mataræði á réttum",
      body: "Merktu glúten, laktósa, hnetur, vegan og glúteinlaust. Gestir sía matseðilinn eftir mataræði og panta áreynslulaust.",
      bullets: [
        "14 flokkar ofnæmisvaka",
        "Vegan- og glúteinlausar merkingar",
        "Gestir sía eftir mataræði",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Gestur síar matseðilinn eftir ofnæmisvökum í símanum meðan eigandinn breytir ofnæmisvakalistanum á spjaldtölvu" },
    },
    {
      icon: Palette,
      eyebrow: "Hönnun og vörumerki",
      heading: "Vandaður matseðill á þínu léni",
      body: "Myndbandsbakgrunnur á velkominskjánum, þín eigin hönnun og tengiliðasíða með korti og samfélagsmiðlum — á þínu eigin léni, ekki PDF.",
      bullets: [
        "Myndband og vönduð hönnun",
        "Þitt lén með SSL",
        "Tengiliðir, kort og samfélagsmiðlar",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Tveir símar á kaffihúsborði: heimaskjár matseðilsins með myndbandsbakgrunni og samskiptasíða með korti" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Pantanir",
      heading: "Netpantanir, engin þóknun",
      body: "Gestir panta úr matseðlinum eða beint í þitt WhatsApp — það berst í salinn eða eldhúsið, með 0% tekin af sölunni.",
      bullets: [
        "Úr matseðli eða WhatsApp",
        "Í sal eða eldhús, 0%",
        "Kveiktu á því í stillingum",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Tveir símar á borði: karfa með pöntun og staðfesting á sendri pöntun" },
    },
    {
      icon: CalendarCheck,
      eyebrow: "Bókanir",
      heading: "Borðabókun, 24/7",
      body: "Gestir bóka borð sjálfir gegnum matseðilinn eða tengil, þú sérð dagatal eftir borðum og staðfestir sjálfvirkt eða handvirkt.",
      bullets: [
        "Gestir bóka sjálfir",
        "Dagatal yfir öll borð",
        "Sjálfvirk og handvirk staðfesting",
      ],
    },
    {
      icon: MonitorSmartphone,
      eyebrow: "Stjórnun",
      heading: "Stjórnaðu hvaðan sem er",
      body: "Stjórnborðið keyrir í hvaða vafra sem er — síma, spjaldtölvu eða tölvu. Ekkert að setja upp, og grunnmatseðill fer í loftið á nokkrum mínútum.",
      bullets: [
        "Hvaða tæki og vafri sem er",
        "Ekkert að setja upp",
        "Fer í loftið á nokkrum mínútum",
      ],
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
