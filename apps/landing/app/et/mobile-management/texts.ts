import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Halda Oma Restorani Telefonist — Mobiilne Restorani Töölaud",
    description:
      "Lisa roogi, muuda hindu, lae üles fotosid, vaata tellimusi — kõik telefonist. Kogu IQ Resti töölaud on mobile-first. Arvutit pole vaja, mitte kunagi.",
    canonical: "https://iq-rest.com/et/mobile-management",
    ogLocale: "et_EE",
    ogTitle: "Mobiilne Restorani Haldamine — Halda Oma Menüüd Telefonist",
    ogDescription:
      "Uuenda hindu laudade vahel. Lae fotosid üles oma kaamerast. Vaata reaalajas tellimusi liinil. Kogu IQ Resti töölaud töötab sinu telefonis.",
  },

  hero: {
    title: "Halda oma restorani telefonist. Laudade vahel.",
    subtitle:
      "Kogu IQ Resti töölaud on ehitatud mobile-first — lisa roogi, vaheta fotosid, muuda hindu ja loe reaalajas tellimusi samalt telefonilt põllaltaskus. Pole sülearvutit, pole tagatoa arvutit, pole vabandust.",
    trustLine: "500+ restorani 30+ riigis",
  },

  seo: {
    description:
      "Restoranipidajad ei istu laua taga — nad on baari taga, köögis, põrandal. IQ Rest on ehitatud selle reaalsuse jaoks. Iga töölaua funktsioon, alates uute roogade lisamisest kuni reaalajas tellimuste vaatamiseni, on disainitud kõigepealt pöialde ja väikeste ekraanide jaoks. Kui sa oskad Instagrami kasutada, saad oma kogu restorani IQ Restis telefonist hallata.",
    fullDescription:
      "Enamik restorani haldamise tarkvara on desktop-first 'mobiilversiooniga' järelmõttena külge poltitud — tillukesed nupud, katkised paigutused ja funktsioonid kolm menüüd sügaval peidus. IQ Rest disainiti vastupidi: iga ekraan töötab telefonis täiuslikult ja desktopversioon on lihtsalt sama UI üles skaleeritud.\n\nMida see praktikas tähendab: tee päeva eripakkumise foto telefoni kaameraga ja lae see otse menüüsse üles. Märkad kirjavea roa kirjelduses, kui koristad lauda — paranda see kohapeal, muutus on reaalajas sekunditega. Kokk lahkub? Tõmba roog telefonist offline enne, kui järgmine külaline su QR-i skaneerib. Uus roog köögist? Puuduta, trüki, klõpsa fotot, määra hind — külalised saavad selle 30 sekundit hiljem tellida.\n\nSama kehtib tellimuste, broneeringute, analüütika ja tõlgete kohta. Reaalajas tellimuste loend uueneb reaalajas. Broneeringu kinnitused on ühe-puudutusega. Päevane tulu, top road ja kõige tihedamad tunnid mahuvad ühele telefoni ekraanile. Sa ei pea kunagi tagatuppa minema midagi haldama.",
    benefitsHeading: "Miks mobile-first haldamine muudab kõike",
    benefits: [
      "Täielik töölaua juurdepääs igal nutitelefonil või tahvelarvutil — pole rakendust paigaldada",
      "Lae roa fotosid otse oma telefoni kaamerast üles kahe puudutusega",
      "Uuenda hindu, kirjeldusi, lahtiolekuaegu kõikjalt",
      "Puutetundlik drag-and-drop kategooriate ja roogade järjestamiseks",
      "Reaalajas tellimused, broneeringud ja analüütika mahuvad ühele telefoni ekraanile",
      "Töötab offline-tolerantselt — lõpeta redigeerimine, sünkroonib taasühenduse korral",
    ],
  },

  pricing: {
    heading: "Üks tellimus.",
    headingAccent: "Halda telefonist.",
    sub: "Mobile-first töölaud pluss QR-menüü, veebipõhine tellimine, AI-tõlge ja broneeringud — kõik ühes fikseeritud hinnas.",
  },

  faq: {
    sub: "Kõik, mida restoranipidajad mobiilse haldamise kohta küsivad. Ei näe enda oma? Saada meile sõnum WhatsAppis — päris inimesed vastavad.",
    items: [
      {
        q: "Kas pean mobiilse rakenduse paigaldama?",
        a: "Ei. IQ Rest töötab sinu telefoni brauseris — Safari, Chrome, mida sa juba kasutad. Saad selle lisada kodusekraanile ühe-puudutusega juurdepääsuks (tundub nagu native rakendus), kuid App Store'ist pole midagi alla laadida, pole lubasid anda, pole versiooniuuendusi hooldada.",
      },
      {
        q: "Kas saan tõesti menüü fotosid otse telefonist üles laadida?",
        a: "Jah — see on kogu mõte. Puuduta roa juures 'lisa foto', sinu telefoni kaamera avaneb, klõpsa või vali galeriist, vajuta üles laadi. Pilt skaleerub automaatselt ümber, optimeeritakse veebi jaoks ja on menüül reaalajas sekunditega. Pole Lightroomi, pole failide ülekandmist arvutisse, pole SFTP-d.",
      },
      {
        q: "Kas see töötab tahvelarvutitel ja vastuvõtulauas?",
        a: "Jah. Töölaud on optimeeritud telefonidele, tahvelarvutitele ja lauaarvutitele — sama UI, samad otseteed, sama kiirus. Paljud restoranid kasutavad iPadi vastuvõtulauas broneeringute jaoks, telefoni koka taskus tellimuste jaoks ja sülearvutit tagatoas arvelduse jaoks — kõik sama logimisega.",
      },
      {
        q: "Mis on hindade uuendamisega kiirema teeninduse ajal?",
        a: "Selleks loodud. Puuduta rooga, redigeeri hinda, salvesta — külalised näevad uut hinda sekunditega ilma värskendamata. Pole ümberavaldamist, pole ümberehitamist, pole sünkroonimisviivitust. Sama kehtib roa märkimise kohta 'läbi müüdud' (see hallib menüül kohe) või päevase eripakkumise lisamise kohta rusakate vahel.",
      },
      {
        q: "Mis siis, kui mu telefon sureb redigeerimise ajal?",
        a: "Muudatused salvestatakse väljapõhiselt, kui sa trükid — kui telefon sureb või internet kukub, leiad oma muudatused ikka, kui sisse logid mistahes seadmest. Pole kaotatud tööd.",
      },
    ],
  },

  finalCta: {
    heading: "Halda seda oma põllaltaskust.",
    headingAccent: "Jäta tagatuba vahele.",
    sub: "Kogu töölaud mahub sinu telefoni. 14-päevane tasuta prooviperiood, krediitkaarti pole vaja, paigaldatav rakendus pole.",
  },
};
