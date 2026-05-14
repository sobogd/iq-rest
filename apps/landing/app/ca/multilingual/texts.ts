import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Menú de restaurant multilingüe — 35 idiomes, un toc per canviar",
    description:
      "Atén clients internacionals en la seva llengua. Menú de restaurant en 35 idiomes amb canvi d'un toc. Suport RTL per a àrab i persa. 14 dies gratis.",
    canonical: "https://iq-rest.com/ca/multilingual",
    ogLocale: "ca_ES",
    ogTitle: "Web per a restaurant amb menú multilingüe — 35 idiomes integrats",
    ogDescription:
      "Els turistes escanegen i veuen el menú en la seva llengua automàticament. 35 idiomes, suport RTL, detecció automàtica des de la configuració del mòbil. 14 dies gratis.",
  },

  hero: {
    title: "El teu menú parla la llengua de cada turista.",
    subtitle:
      "Un menú de restaurant multilingüe no hauria de ser un projecte. Amb IQ Rest, el teu menú QR detecta automàticament la llengua del mòbil de cada client i el serveix en qualsevol dels 35 idiomes — incloent àrab i persa amb renderització correcta de dreta a esquerra.",
    trustLine: "Més de 500 restaurants en més de 30 països",
  },

  seo: {
    description:
      "Munta el teu menú un cop, serveix-lo en 35 idiomes. IQ Rest detecta automàticament la llengua del mòbil de cada client i renderitza el menú en la seva llengua — sense tocar banderes, sense barrera lingüística, sense moments incòmodes amb Google Translate. De l'espanyol i l'alemany al japonès, l'àrab i el mandarí, els teus clients veuen el teu restaurant tal com cal veure'l.",
    fullDescription:
      "La majoria de menús 'multilingües' són PDFs amb Google Translate trencat, impresos un cop i mai actualitzats. La web per a restaurant multilingüe d'IQ Rest és i18n de debò: cada idioma té la seva pròpia còpia ben traduïda, el seu propi slug d'URL, les seves pròpies meta tags perquè Google les indexi i el seu propi enrutament dins l'app del menú.\n\nQuan un turista amb un iPhone en francès escaneja el teu codi QR, el menú s'obre en francès automàticament — sense tocs, sense decisions. Pot canviar a qualsevol altra llengua amb el selector d'idioma de la part superior, però la majoria mai ho necessita. El mateix s'aplica a etiquetes dietètiques ('vegan' es converteix en 'vegano' / 'vegetarisch' / 'ヴィーガン' segons l'idioma), a missatges d'error, a botons 'afegeix a la cistella', a rebuts. Cada cadena d'UI en 35 idiomes, no només el contingut del menú.\n\nPer a idiomes RTL — àrab i persa — tot el layout es capgira correctament: el text s'alinea a la dreta, els menús s'obren des de la dreta, els preus apareixen després del nom del plat com cal. No és un truc de CSS, és suport RTL complet que fa que els clients àrabs i perses se sentin atesos, no encaixats després.",
    benefitsHeading: "Per què un menú multilingüe de debò supera una traducció en PDF",
    benefits: [
      "35 idiomes amb traducció d'UI adequada — no només articles del menú",
      "Detecta automàticament la llengua del mòbil del client — sense tocs",
      "Selector d'idioma manual per a clients que prefereixin una altra llengua",
      "Suport RTL complet per a àrab i persa — no és un truc de CSS",
      "Cada idioma té el seu propi URL — Google indexa 35 versions de la teva web",
      "Canvia la descripció d'un plat en la teva llengua — les traduccions ho segueixen",
    ],
  },

  pricing: {
    heading: "Un sol pla.",
    headingAccent: "Els 35 idiomes inclosos.",
    sub: "Menú multilingüe, traducció per IA, comandes QR i reserves — tot en un únic preu fix. Sense costos per idioma, sense extres per a RTL.",
  },

  faq: {
    sub: "Tot el que els restauradors pregunten sobre un menú multilingüe. No hi veus la teva? Escriu-nos per WhatsApp — responen persones reals.",
    items: [
      {
        q: "Quants idiomes admet el menú?",
        a: "35 idiomes que inclouen anglès, espanyol, alemany, francès, italià, portuguès, neerlandès, polonès, txec, eslovac, hongarès, romanès, búlgar, croat, serbi, eslovè, grec, turc, rus, ucraïnès, lituà, letó, estonià, finès, suec, noruec, danès, islandès, català, gaèlic irlandès, àrab, persa, japonès, coreà i xinès. Les cadenes d'UI estan traduïdes professionalment per a tots ells.",
      },
      {
        q: "Com canvien d'idioma els clients?",
        a: "De dues maneres: automàtica (el menú s'obre en la llengua del seu mòbil) i manual (un selector d'idioma a la part superior del menú). El 80% dels turistes mai toca el selector manual — la detecció automàtica funciona perquè el mòbil ja sap la seva llengua.",
      },
      {
        q: "Admeteu idiomes de dreta a esquerra com l'àrab i el persa?",
        a: "Sí, amb layout RTL complet. Tot el menú es capgira: el text s'alinea a la dreta, les columnes s'inverteixen, els calaixos de navegació s'obren pel costat dret, els preus apareixen després dels noms dels plats. És suport RTL real implementat al nivell del layout, no només trucs de direcció en CSS.",
      },
      {
        q: "Google indexarà el meu menú en els 35 idiomes?",
        a: "Sí. Cada idioma té el seu propi slug d'URL (per exemple, /es, /fr, /de), tags hreflang correctes, meta títols i descripcions localitzats i dades estructurades específiques de la llengua. Google tracta cada idioma com una pàgina separada per a aquesta regió, cosa que vol dir que els turistes que cerquin el teu restaurant en la seva llengua tenen més possibilitats de trobar-te.",
      },
      {
        q: "I si no vull els 35 idiomes — només els meus mercats principals?",
        a: "Tries quins idiomes són actius. Si ets un restaurant de platja a Grècia que serveix sobretot turistes britànics, alemanys i italians, activa només anglès, alemany i italià — la resta no apareixen al selector d'idioma ni a la detecció automàtica. Pots activar-ne més més tard a mesura que canviï la teva barreja de turistes.",
      },
    ],
  },

  finalCta: {
    heading: "La llengua del mòbil de cada turista.",
    headingAccent: "Ja admesa.",
    sub: "Serveix un menú multilingüe en 35 idiomes, incloent àrab i persa en RTL. 14 dies gratis, sense targeta, sense costos per idioma.",
  },
};
