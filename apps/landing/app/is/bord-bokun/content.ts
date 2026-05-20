import { CalendarPlus, CalendarDays } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "is",
  slug: "bord-bokun",
  trackPrefix: "l_is_bookings",

  meta: {
    title: "Borðabókun 24/7 fyrir veitingastaði | IQ Rest",
    description:
      "Borðabókun 24/7 fyrir veitingastaði: gestir bóka sjálfir í gegnum QR matseðil eða vefsíðu. Dagatal eftir borði, sjálfvirk staðfesting og áminningar. Ekki einn glataður gestur. 14 dagar ókeypis.",
    canonical: "https://iq-rest.com/is/bord-bokun",
    ogLocale: "is_IS",
    ogTitle: "Borðabókun 24/7 — gestir bóka sjálfir",
    ogDescription:
      "Gestir bóka borð í gegnum QR matseðil eða vefsíðu. Dagatal, sjálfvirk staðfesting, áminningar. Ekki einn glataður gestur.",
    brandLine: "IQ Rest — Borðabókun fyrir veitingastaði",
  },

  hero: {
    headline: "Borðabókun 24/7 — gestir bóka sjálfir.",
    sub: "Gestir bóka borð í gegnum QR matseðil eða beinan tengil. Dagatal eftir borði, sjálfvirk staðfesting og áminningar. Ekki einn glataður gestur og engin símtöl á álagstímum.",
    imageSrc: "/landing/feature-reservation.webp",
    imageAlt: "Móttökukona stjórnar bókunum úr spjaldtölvu við innganginn á veitingastaðnum",
  },

  scan: {
    heading: "Settu af stað borðabókun",
    headingAccent: "á 5 mínútum.",
    sub: "Tengdu dagatalið, bættu við borðum með myndum og rými — gestir byrja að bóka sama daginn.",
    cta: "Virkja bókun",
  },

  subFeatures: [
    {
      icon: CalendarPlus,
      eyebrow: "Bókunareyðublað",
      heading: "Gestir bóka sjálfir — eftir dagsetningu, tíma og fjölda gesta.",
      body: "Gesturinn opnar QR matseðilinn eða beinan tengil, velur dagsetningu, tíma og fjölda gesta — og sér strax laus borð, hvert með mynd, lýsingu (verönd, við gluggann, sófi við barinn) og rými. Staðfesting er send sjálfkrafa í tölvupósti og á WhatsApp.",
      bullets: [
        "Val á borði eftir mynd, lýsingu og rými.",
        "Sjálfvirk staðfesting og áminning klukkutíma fyrir heimsókn.",
        "Lágmarkssvið í eyðublaði: nafn, sími, fjöldi gesta.",
      ],
      image: { src: "/landing/feature-booking-form.webp", alt: "Gestur bókar veitingaborð úr síma: dagsetning, tími, fjöldi gesta og borðvelur" },
    },
    {
      icon: CalendarDays,
      eyebrow: "Bókunardagatal",
      heading: "Dagatal eftir degi og borði — allt í einni sýn.",
      body: "Stjórnborðið sýnir bókunardagatal sundurliðað eftir borði, degi, viku og mánuði. Lausir tímar, upptekin borð, staðfestar og óstaðfestar bókanir á einum skjá. Virkar á spjaldtölvu í salnum og fartölvu á skrifstofunni.",
      bullets: [
        "Dags-, viku- og mánaðarsýn.",
        "Sundurliðun eftir borði: hver, hvenær, hve margir gestir.",
        "Færa, hætta við eða staðfesta bókun með einu pikki úr símanum.",
      ],
      image: { src: "/landing/feature-booking-calendar.webp", alt: "Bókunardagatal í IQ Rest stjórnborði á tveimur spjaldtölvum: dagleg Gantt eftir borðum og mánaðarsýn" },
    },
  ],

  faq: {
    sub: "Það sem veitingamenn spyrja um borðabókun í IQ Rest. Finnurðu ekki þína spurningu? Skrifaðu okkur á WhatsApp.",
    items: [
      { q: "Get ég valið hvaða daga og tíma er bókun í boði?", a: "Já. Stjórnborðið leyfir að setja opnunartíma og tiltæka vikudaga — kerfið mun ekki sýna gestum ótiltæka tíma. Þú getur lokað ákveðna dagsetningu (fyrirtækjaviðburður, einkabókun) eða slökkt tímabundið á öllu dagatalinu." },
      { q: "Get ég hlaðið upp mynd fyrir hvert borð?", a: "Já. Hvert borð getur haft mynd, lýsingu (verönd, við gluggann, sófi við barinn) og rými. Gesturinn sér nákvæmlega borðið sem hann bókar og tekur upplýsta ákvörðun — þetta minnkar ófullnægðar væntingar." },
      { q: "Get ég slökkt á bókunum á ákveðnum dögum?", a: "Já. Dagatalið leyfir að loka ákveðnum dögum (frídögum, einkaviðburðum, viðgerðum) eða heilum vikudögum. Á þessum dögum sjá gestir skilaboðin „bókun tímabundið ekki tiltæk“." },
      { q: "Get ég sérsniðið hvaða svið er safnað frá gesti?", a: "Já. Sjálfgefið sett: nafn, sími, tölvupóstur, fjöldi gesta. Þú getur bætt við sérsniðnum sviðum (tilefni, ofnæmi, sérstakar beiðnir) eða fjarlægt óþarfa til að halda eyðublaðinu eins stutt og hægt er." },
      { q: "Get ég takmarkað fjölda gesta á borði?", a: "Já. Hvert borð er með „rými“ stillingu — kerfið leyfir ekki að borð fyrir 2 sé bókað fyrir 6. Á stærri borðum getur þú sett lágmark svo litlir hópar taki ekki „borð fyrir átta“ frá stærri hópum." },
      { q: "Hve erfitt er bókunaruppsetningin?", a: "Það tekur mjög stuttan tíma. Þrjú skref: (1) bættu við borðum með nöfnum, myndum og rými, (2) virkjaðu bókunarham í stillingum, (3) deildu tenglinum eða QR kóðanum með gestum. Full ræsing á 5–10 mínútum." },
      { q: "Get ég notað bókunarkerfið á mínu eigin léni?", a: "Já. Við styðjum sérsniðið lén með SSL skírteini: gestir bóka á heimilisfangi veitingastaðarins (t.d. bokun.veitingastadurthinn.is). Við hjálpum með DNS uppsetningu; ferlið tekur 5–10 mínútur." },
      { q: "Get ég stillt sjálfvirka eða handvirka staðfestingu?", a: "Já, hamur er stilltur í stillingum. Með sjálfvirkri staðfestingu fær gesturinn staðfestingu strax eftir að hafa sent eyðublaðið og bókunin telst samþykkt. Með handvirkri staðfestingu kemur beiðnin í stjórnborðið með stöðunni „bíður staðfestingar“ — stjórnandinn skoðar hana og staðfestir eða hafnar. Handvirkur hamur er gagnlegur þegar borðafjöldi er takmarkaður eða strangar gestastefnur eru." },
      { q: "Takið þið þóknun af bókunum?", a: "Nei. Borðabókun er að fullu innifalin í Pro áskriftinni — engin prósenta af gestum, engin gjald á tíma, engar samanafnsþóknanir. Fast mánaðargjald og ótakmarkaðar bókanir." },
    ],
  },
};
