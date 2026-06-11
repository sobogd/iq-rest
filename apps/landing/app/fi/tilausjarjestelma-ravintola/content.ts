import { Map, ClipboardList, Receipt, Smartphone } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "fi",
  slug: "tilausjarjestelma-ravintola",
  trackPrefix: "l_fi_orders",

  meta: {
    title: "Tilausjärjestelmä ravintolalle — vieras ja tarjoilija | IQ Rest",
    description:
      "Ravintolatilaukset puhelimesta tai tabletista: salin pohjakartta, laskun jakaminen, tilat, vaihtoehdot ja muistiinpanot. Vieraat tilaavat pöydässä; tarjoilija ottaa tilauksia mistä tahansa laitteesta. 14 päivää ilmaiseksi.",
    canonical: "https://iq-rest.com/fi/tilausjarjestelma-ravintola",
    ogLocale: "fi_FI",
    ogTitle: "Tilausjärjestelmä ravintolalle — vieras ja tarjoilija",
    ogDescription:
      "Vieras pöydässä tai tarjoilija puhelimella — tilaus saapuu välittömästi keittiöön. Salin pohjakartta, laskun jakaminen, tilat, vaihtoehdot ja muistiinpanot.",
    brandLine: "IQ Rest — Tilausjärjestelmä ravintolalle",
  },

  hero: {
    headline: "Tilausten otto: vieras ja tarjoilija — suoraan keittiöön.",
    cta: "Ota verkkotilaukset käyttöön",
    sub: "Vieraat tilaavat QR-ruokalistan kautta pöydässä tai tarjoilija ottaa tilauksen puhelimesta tai tabletista — tilaus saapuu keittiön näyttöön sekunneissa. Salin pohjakartta värikoodatuilla pöydillä, laskun jakaminen, joustavat vaihtoehdot ja kommentit. Ei muistivihkoja, ei käyntejä baariin.",
    imageSrc: "/landing/feature-orders.webp",
    imageAlt: "Tarjoilija ottaa tilausta pöydässä älypuhelimella — tilaus saapuu keittiön näyttöön",
  },

  scan: {
    heading: "Aseta tilausjärjestelmä",
    headingAccent: "5 minuutissa.",
    sub: "Lataa paperinen ruokalista tai PDF — AI tunnistaa ruoat, hinnat ja kategoriat. Liitä tabletti saliin ja aloita tilausten otto pöydissä.",
    cta: "Skannaa ruokalista",
  },

  subFeatures: [
    {
      icon: Map,
      eyebrow: "Lista ja salin pohjakartta",
      heading: "Tilauslista salin pohjakartan vieressä.",
      body: "Kaikki aktiiviset tilaukset oikealla: tila, summa, aika, tuotteiden määrä. Vasemmalla — salin pohjakartta: pöydät värikoodattuina tilan mukaan — vapaa, varattu, tarvitsee huomiota. Näpäytä pöytää avataksesi tai luodaksesi tilauksen; näpäytä korttia avataksesi yksityiskohtaisen näkymän. Ei näyttöjen vaihtoa.",
      bullets: [
        "Salin pohjakartta: pöydät värikoodattuina tilauksen tilan mukaan.",
        "Tilauslista vieressä — summa, aika, tuotteiden määrä.",
        "Näpäytä pöytää avataksesi tai luodaksesi tilauksen.",
      ],
      image: { src: "/landing/feature-orders-map.webp", alt: "Tabletti tarjoilijan asemalla: tilauslista ja salin pohjakartta värikoodatuilla pöydillä" },
    },
    {
      icon: ClipboardList,
      eyebrow: "Tilauskortti",
      heading: "Tilauskortti: tilat, monistus, poisto — yksi näpäytys.",
      body: "Jokaisella tuotteella on oma tilansa (Odottaa / Valmistetaan / Valmis / Tarjoiltu) — keittiö ja tarjoilija näkevät saman kuvan reaaliajassa. Pisteen näpäyttäminen avaa toimintovalikon: tilan vaihto, tuotteen monistus samoilla muutoksilla ja vaihtoehdoilla, poisto. Kaikki kortin sisällä.",
      bullets: [
        "Tila tuoteittain: Odottaa / Valmistetaan / Valmis / Tarjoiltu.",
        "Monista tuote yhdellä näpäytyksellä samoilla vaihtoehdoilla.",
        "Poista tuote suoraan kortilta.",
      ],
      image: { src: "/landing/feature-orders-detail.webp", alt: "Tabletti tilauksen yksityiskohtakortilla: tuotteiden tilat, monistus- ja poistotoiminnot" },
    },
    {
      icon: Receipt,
      eyebrow: "Jaa lasku",
      heading: "Jaa lasku, kun vieraat maksavat erikseen.",
      body: "Vieraat päättivät jakaa — merkitse tuotteet, jotka siirtyvät uuteen kuittiin; loput jäävät nykyiseen. Järjestelmä näyttää välittömästi molemmat summat. Yksi näpäytys ”Jaa tilaus” ja sinulla on kaksi itsenäistä tilausta oikeilla summilla, molemmat edelleen kytkettyinä pöytiinsä.",
      bullets: [
        "Valitse jaettavat tuotteet valintaruuduilla.",
        "Molemmat summat näytetään välittömästi.",
        "Yksi näpäytys ja tilaus on jaettu ilman käsin laskemista.",
      ],
      image: { src: "/landing/feature-orders-split.webp", alt: "Tabletti ravintolapöydällä: laskun jakomodaali vieraiden välillä" },
    },
    {
      icon: Smartphone,
      eyebrow: "Lisäys puhelimesta",
      heading: "Lisää tuotteita puhelimesta — kolmessa toiminnassa.",
      body: "Tarjoilija ei ole sidottu yhteen laitteeseen: avaa tilausten oton omalla puhelimellaan ja lisää tuotteen kolmessa vaiheessa — kategoria, ruoka, vaihtoehdot (koko, kypsyysaste, lisäkastike tai aines). Hinta lasketaan automaattisesti uudelleen. Muistiinpano keittiölle tulee viimeisessä vaiheessa.",
      bullets: [
        "Kolme vaihetta: kategoria → ruoka → vaihtoehdot.",
        "Vaihtoehdot (koko, lisät, extrat) hinnoitellaan yhdellä klikkauksella.",
        "Muistiinpanokenttä viimeisessä vaiheessa.",
      ],
      image: { src: "/landing/feature-orders-mobile.webp", alt: "Neljä puhelinta tilauksen tuotteen lisäysvaiheilla: kategoria, ruoka, koko, kommentti" },
    },
  ],

  faq: {
    sub: "Mitä ravintoloitsijat kysyvät tilausten otosta IQ Restissä. Etkö löydä omaa kysymystäsi? Kirjoita meille WhatsAppissa.",
    items: [
      { q: "Voiko useita tarjoilijoita työskennellä yhtä aikaa eri laitteilta?", a: "Kyllä. Jokainen tarjoilija kirjautuu yhteiseen ravintolatiliin omasta puhelimestaan tai tabletista — kaikki näkevät samat pöydät, tilaukset ja tilat reaaliajassa. Yhden tarjoilijan tekemät muutokset näkyvät muille välittömästi, ilman konflikteja tai lukkoja." },
      { q: "Voivatko tarjoilijat käyttää omia laitteitaan (BYOD)?", a: "Kyllä. Se on selainpohjainen verkkosovellus — ei mitään asennettavaa. Tarjoilija avaa linkin, kirjautuu ravintolatiliin omasta iPhonesta, Androidista tai henkilökohtaisesta tabletista ja aloittaa työn. Vuoron lopussa kirjautuu yksinkertaisesti ulos." },
      { q: "Voiko ruokiin lisätä pakollisia vaihtoehtoja (koko, kypsyysaste jne.)?", a: "Kyllä. Jokaisella ruoalla voi olla mikä tahansa määrä vaihtoehtoryhmiä — pakollisia (esim. ”Koko”: Pieni / Keskikokoinen / Iso) ja valinnaisia (”Kypsyysaste”: raaka / medium / kypsä). Vaihtoehdot voivat muuttaa hintaa (+1,00 €). Jos ryhmä on pakollinen, järjestelmä ei anna vieraan tai tarjoilijan lisätä ruokaa ilman valintaa." },
      { q: "Voivatko vieraat lisätä muistiinpanoja tai extroja ruokaan (leipä, kastike)?", a: "Kyllä. Lisäyksen viimeisessä vaiheessa on vapaa muistiinpanokenttä (”ei sipulia”, ”kypsä”, ”allerginen pähkinöille”). Extrat ovat erillisiä hinnoiteltuja muutoksia (”+ BBQ-kastike +1,50 €”, ”+ Leipä +2,00 €”). Muistiinpanot näkyvät keittiön näytöllä, väreillä korostettuina." },
      { q: "Onko tilaustilastoja?", a: "Kyllä. Analytiikkaosio näyttää: tulot päivittäin ja tunneittain, keskimääräinen lasku, suosituimmat ruoat, vieras → tilaus -konversio, palvelun nopeus (aika Odottaa-tilasta Tarjoiltu-tilaan). Tämä auttaa suunnittelemaan vuoroja, ostoja ja tunnistamaan huonosti menestyvät ruoat." },
      { q: "Voiko tilauksia jakaa tai siirtää pöytien välillä?", a: "Kyllä, molempia skenaarioita tuetaan. Jakamiseen — merkitse tuotteet, jotka siirtyvät uuteen kuittiin (erikseen maksaville vieraille). Siirtoon — avaa tilauskortti, valitse uusi pöytä; koko tilaus siirtyy sinne. Ei käsin laskemista, ei paneelista poistumista." },
    ],
  },
};
