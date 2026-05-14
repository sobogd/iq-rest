import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Hallitse ravintolaasi puhelimella — mobiilipohjainen ravintolan hallintapaneeli",
    description:
      "Lisää ruokia, muuta hintoja, lataa kuvia, tarkastele tilauksia — kaikki puhelimellasi. Koko IQ Restin hallintapaneeli on mobiili ensisijaisesti. Ei tietokonetta tarvita, koskaan.",
    canonical: "https://iq-rest.com/fi/mobile-management",
    ogLocale: "fi_FI",
    ogTitle: "Mobiilipohjainen ravintolahallinta — pyöritä ruokalistaasi puhelimellasi",
    ogDescription:
      "Päivitä hintoja pöytien välissä. Lataa kuvia kamerastasi. Tarkastele live-tilauksia keittiössä. Koko IQ Restin hallintapaneeli toimii puhelimellasi.",
  },

  hero: {
    title: "Pyöritä ravintolaasi puhelimellasi. Pöytien välissä.",
    subtitle:
      "Koko IQ Restin hallintapaneeli on rakennettu mobiili ensisijaisesti — lisää ruokia, vaihda kuvia, muuta hintoja ja lue live-tilauksia samalla puhelimella, joka on essun taskussa. Ei läppäriä, ei back-office-tietokonetta, ei tekosyitä.",
    trustLine: "Yli 500 ravintolaa yli 30 maassa",
  },

  seo: {
    description:
      "Ravintoloitsijat eivät istu pöydän ääressä — he ovat baaritiskillä, keittiössä, salissa. IQ Rest on rakennettu juuri tähän todellisuuteen. Jokainen hallintapaneelin ominaisuus, uusien ruokien lisäämisestä live-tilausten katseluun, on suunniteltu peukaloille ja pienille näytöille ensisijaisesti. Jos osaat käyttää Instagramia, osaat pyörittää koko ravintolaasi IQ Restillä puhelimellasi.",
    fullDescription:
      "Useimmat ravintolan hallintaohjelmistot ovat työpöytäpohjaisia ja niihin on liimattu jälkikäteen 'mobiiliversio' — pieniä painikkeita, rikkonaisia asetteluja ja ominaisuuksia piilotettuina kolmen valikon syvyyteen. IQ Rest on suunniteltu päinvastoin: jokainen näyttö toimii täydellisesti puhelimella, ja työpöytäversio on vain sama käyttöliittymä suuremmaksi skaalattuna.\n\nMitä se tarkoittaa käytännössä: ota kuva päivän erikoisuudesta puhelimesi kameralla ja lataa se suoraan ruokalistalle. Huomaa kirjoitusvirhe ruoan kuvauksessa pöytää siivotessasi — korjaa se paikan päällä, muutos on live sekunneissa. Kokki kävelee ulos? Vedä ruoka offline-tilaan puhelimellasi ennen kuin seuraava vieras skannaa QR-koodisi. Uusi ruoka keittiöstä? Napauta, kirjoita, ota kuva, aseta hinta — vieraat voivat tilata sen 30 sekuntia myöhemmin.\n\nSama pätee tilauksiin, varauksiin, analytiikkaan ja käännöksiin. Live-tilauslista päivittyy reaaliajassa. Varausvahvistukset ovat yhden napautuksen päässä. Päivän liikevaihto, suosituimmat ruoat ja kiireisimmät tunnit mahtuvat yhdelle puhelinnäytölle. Sinun ei tarvitse koskaan kävellä takatoimistoon hallitaksesi mitään.",
    benefitsHeading: "Miksi mobiili ensisijainen hallinta muuttaa kaiken",
    benefits: [
      "Täysi hallintapaneeli millä tahansa älypuhelimella tai tabletilla — ei sovellusta asennettavaksi",
      "Lataa ruokakuvia suoraan puhelimesi kamerasta kahdella napautuksella",
      "Päivitä hintoja, kuvauksia, aukioloaikoja mistä tahansa",
      "Kosketusystävällinen drag-and-drop kategorioille ja ruokien järjestämiselle",
      "Live-tilaukset, varaukset ja analytiikka mahtuvat yhdelle puhelinnäytölle",
      "Toimii offline-sietoisesti — viimeistele muokkaus, synkronoi yhteyden palatessa",
    ],
  },

  pricing: {
    heading: "Yksi paketti.",
    headingAccent: "Pyöritä puhelimellasi.",
    sub: "Mobiili ensisijainen hallintapaneeli sekä QR-ruokalista, verkkotilaaminen, AI-käännös ja varaukset — kaikki yhdellä kiinteällä hinnalla.",
  },

  faq: {
    sub: "Kaikki, mitä ravintoloitsijat kysyvät mobiilihallinnasta. Etkö löydä omaasi? Pingaa meitä WhatsAppissa — oikeat ihmiset vastaavat.",
    items: [
      {
        q: "Pitääkö minun asentaa mobiilisovellus?",
        a: "Ei. IQ Rest toimii puhelimesi selaimessa — Safari, Chrome, mitä jo käytät. Voit lisätä sen kotinäytöllesi yhden napautuksen pääsyä varten (se tuntuu natiivisovellukselta), mutta App Storesta ei ole ladattavaa, ei myönnettäviä lupia, ei vahdittavia versiopäivityksiä.",
      },
      {
        q: "Voinko todella ladata ruokalistakuvia suoraan puhelimellani?",
        a: "Kyllä — siinä on koko pointti. Napauta 'lisää kuva' ruoan kohdalla, puhelimesi kamera avautuu, napsauta tai valitse galleriasta, paina lataa. Kuva muuttaa kokoaan automaattisesti, optimoituu verkkoa varten ja on live ruokalistallasi sekunneissa. Ei Lightroomia, ei tiedostojen siirtoa tietokoneelle, ei SFTP:tä.",
      },
      {
        q: "Toimiiko se tableteilla ja vastaanotossa?",
        a: "Kyllä. Hallintapaneeli on optimoitu puhelimille, tableteille ja työpöytätietokoneille — sama käyttöliittymä, samat oikotiet, sama nopeus. Monet ravintolat pyörittävät iPadia isäntäpisteellä varauksia varten, puhelinta kokin taskussa tilauksia varten ja läppäriä back-officessa laskutusta varten — kaikki samalla kirjautumisella.",
      },
      {
        q: "Entä hintojen päivittäminen kiireisen palvelun aikana?",
        a: "Suunniteltu juuri siihen. Napauta ruokaa, muokkaa hintaa, tallenna — vieraat näkevät uuden hinnan sekuntien sisällä ilman päivitystä. Ei uudelleenjulkaisua, ei uudelleenrakentamista, ei synkronointiviivettä. Sama pätee ruoan merkitsemiseen 'loppu' (se harmaantuu välittömästi ruokalistalla) tai päivän erikoisuuden lisäämiseen ruuhkien välissä.",
      },
      {
        q: "Mitä jos puhelimeni kuolee kesken muokkauksen?",
        a: "Muokkaukset tallentuvat kenttäkohtaisesti kirjoittaessasi — jos puhelimesi kuolee tai internetisi katkeaa, löydät muutoksesi siellä, kun kirjaudut takaisin sisään millä tahansa laitteella. Ei menetettyä työtä.",
      },
    ],
  },

  finalCta: {
    heading: "Pyöritä sitä essun taskusta.",
    headingAccent: "Ohita back office.",
    sub: "Koko hallintapaneeli mahtuu puhelimellesi. 14 päivän ilmainen kokeilu, ei luottokorttia, ei asennettavaa sovellusta.",
  },
};
