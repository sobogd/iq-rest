import type { HelpDoc } from "../types";

// FI help guide.
export const fi: HelpDoc = {
  metaTitle: "Näin käytät IQ Restiä — vaiheittainen opas",
  metaDescription:
    "Kattava IQ Rest -opas: rekisteröinti, menu, tilaukset, varaukset, keittiönäyttö ja asetukset — ravintoloille.",
  h1: "Ohje",
  intro: "Yksityiskohtainen opas IQ Restiin — rekisteröinnistä hienosäätöasetuksiin.",
  banner: {
    title: "Se on helpompaa kuin miltä näyttää",
    sub: "Vaiheittainen opas: rekisteröinnistä hienosäätöasetuksiin — kuka tahansa osaa.",
    cta: "Näin se toimii",
  },
  tipLabel: "Vinkki",
  noteLabel: "Tärkeää",
  sections: [
    {
      id: "start",
      title: "1. Aloitus",
      blocks: [
        { type: "h3", text: "Mikä tämä järjestelmä on" },
        {
          type: "p",
          text: "IQ Rest on palvelu ravintoloille: luot verkkomenun QR-koodilla, otat vastaan tilauksia ja pöytävarauksia suoraan asiakkaiden puhelimista, ja keittiössä sekä tarjoilijoilla toimivat tabletti-päätteet. Kaikkea hallitaan yhdestä hallintapaneelista (dashboardista).",
        },
        { type: "h3", text: "Rekisteröinti ja kirjautuminen" },
        { type: "p", text: "Voit kirjautua kolmella tavalla — valitse mikä tahansa kirjautumisnäytöllä:" },
        {
          type: "list",
          items: [
            "Googlella — napsauta ”Jatka Googlella” ja valitse tili.",
            "Applella — napsauta ”Jatka Applella”.",
            "Sähköpostilla — napsauta ”Jatka sähköpostilla”, syötä osoitteesi, niin lähetämme 6-numeroisen koodin. Syötä se seuraavalla näytöllä. Salasanaa ei tarvita.",
          ],
        },
        {
          type: "note",
          text: "Sähköpostilla saat vain kertakäyttöisen kirjautumiskoodin — ei roskapostia, ei uutiskirjeitä.",
        },
        { type: "h3", text: "Ravintolan luominen (käyttöönotto)" },
        {
          type: "p",
          text: "Ensimmäisellä kirjautumisella järjestelmä ohjaa sinut nopean asennuksen läpi. Tämän jälkeen luodaan automaattisesti ravintola esimerkkimenupohjalla, jonka korvaat myöhemmin omallasi.",
        },
        {
          type: "steps",
          items: [
            "Anna ravintolan nimi.",
            "Valitse keittiötyyppi (se määrää aloitusmenupohjan).",
            "Valmis: päädyt dashboardiin, jossa on jo täytetty esimerkkimenu.",
          ],
        },
        {
          type: "note",
          text: "Valuutta tunnistetaan automaattisesti alueesi perusteella — sitä ei tarvitse valita alussa. Voit muuttaa sitä myöhemmin kohdassa Asetukset → Alue.",
        },
        { type: "h3", text: "Dashboardin yleiskatsaus" },
        {
          type: "p",
          text: "Navigointi osioiden välillä: tietokoneella yläpalkki, puhelimella alapalkki. Osiot: Menu, Tilaukset, Varaukset, Keittiö, Analytiikka ja Asetukset.",
        },
        {
          type: "list",
          items: [
            "Ravintolan nimen vieressä yläpalkissa on pieni yhteysilmaisin: vihreä piste tarkoittaa, että tilaukset synkronoituvat reaaliajassa.",
            "Sivulla ”Menu” ylhäällä on painike ”Esikatselu” — se avaa menusi sellaisena kuin asiakas sen näkee.",
            "Vieressä painike ”Jaa” — se näyttää QR-koodin ja linkin menuun (kopioi linkki, lataa QR tai avaa menu).",
          ],
        },
        {
          type: "tip",
          text: "Paina ”Esikatselu” jokaisen menumuutoksen jälkeen — näet heti, miltä se näyttää asiakkaalle.",
        },
      ],
    },
    {
      id: "menu",
      title: "2. Menu",
      blocks: [
        {
          type: "p",
          text: "Osio ”Menu” on järjestelmän sydän. Täällä rakennat rakenteen: kategoriat → annokset → vaihtoehdot. Avaa se navigoinnista.",
        },
        { type: "h3", text: "Kategoriat ja alikategoriat" },
        {
          type: "steps",
          items: [
            "Paina ”Lisää kategoria” ja anna nimi (esimerkiksi ”Alkuruoat”).",
            "Muokataksesi kategoriaa — vie osoitin sen päälle ja paina ”Muokkaa kategoriaa”.",
            "Kategorioiden järjestystä muutat painikkeilla ”Ylös” / ”Alas” — juuri siinä järjestyksessä asiakas näkee ne.",
            "Voit luoda ”Ryhmän” (kohdasta ”Lisää ryhmä”) — osiokategorian, joka sisältää muita kategorioita.",
          ],
        },
        { type: "h3", text: "Annosten lisääminen" },
        {
          type: "steps",
          items: [
            "Laajenna kategoria (nuoli vasemmalla) ja paina ”Lisää annos”.",
            "Täytä nimi, hinta ja kuvaus.",
            "Lisää kuva: ”Lisää kuva” — lataa oma, tai paina ”Luo” ja kuvaile annos sanoin, jotta tekoäly luo kuvan.",
            "Tallenna. Annos ilmestyy kategoriaan.",
          ],
        },
        {
          type: "tip",
          text: "Kuvan voi luoda tekoälyllä: kerro kuvakulma, valaistus tai tausta (esimerkiksi ”Pizza Margherita puulaudalla, ylhäältä kuvattuna”).",
        },
        { type: "h3", text: "Vaihtoehdot ja variantit (muuntimet)" },
        {
          type: "p",
          text: "Vaihtoehdot ovat valintoja annoksen sisällä: koko, kypsyysaste, lisäainekset. Jokaisella vaihtoehdolla on variantteja, ja varianttiin voi lisätä lisämaksun (esimerkiksi ”+1.50 kpl”).",
        },
        {
          type: "list",
          items: [
            "Esimerkki: vaihtoehto ”Koko” varianteilla ”Pieni / Suuri (+2.00)”.",
            "Esimerkki: vaihtoehto ”Lisä” useilla varianteilla, joista asiakas valitsee yhden tai useamman.",
          ],
        },
        { type: "h3", text: "Allergeenit ja ruokavaliot" },
        {
          type: "p",
          text: "Annokseen voit merkitä allergeenit (gluteeni, pähkinät jne.) ja ruokavaliomerkinnät (kasvis, vegaaninen). Asiakas näkee ne kuvakkeina julkisessa menussa.",
        },
        { type: "h3", text: "Annosten näkyvyys" },
        {
          type: "p",
          text: "Painike ”Piilota annos” / ”Näytä annos” poistaa kohteen väliaikaisesti julkisesta menusta poistamatta sitä — kätevää, kun annos on loppu.",
        },
        { type: "h3", text: "Paperimenun lataaminen (skannaus)" },
        {
          type: "p",
          text: "Jos sinulla on jo menu kuvana tai PDF:nä — älä syötä sitä käsin. Käytä skannausta:",
        },
        {
          type: "steps",
          items: [
            "Paina banneria ”Lataa menu” (tai ”Lataa paperimenusi”).",
            "Lisää enintään 5 tiedostoa (kuva/skannaus, kukin enintään 20 Mt) ja paina ”Skannaa”.",
            "Odota enintään minuutti — tekoäly tunnistaa kategoriat ja annokset.",
            "Tarkista tunnistettu, valitse halutut kohteet ja paina ”Jatka”.",
            "Valitse: korvaa nykyinen menu tai lisää uudet kohteet olemassa olevaan.",
          ],
        },
        {
          type: "note",
          text: "Aloituspohjan esimerkit poistetaan, kun tallennat skannatun menun — se on normaalia.",
        },
      ],
    },
    {
      id: "tables",
      title: "3. Pöydät ja QR-koodit",
      blocks: [
        {
          type: "p",
          text: "Pöytiä käytetään tilausten ja varausten yhdistämiseen tiettyihin paikkoihin ja henkilökohtaisten QR-koodien tulostamiseen. Osio: Asetukset → Pöydät.",
        },
        { type: "h3", text: "Pöytien luominen" },
        {
          type: "steps",
          items: [
            "Avaa Asetukset → Pöydät ja paina ”Lisää pöytä”.",
            "Anna pöydän numero, paikkamäärä ja (valinnainen) nimi — esimerkiksi ”Ikkuna”, ”Baari”, ”Terassi”.",
            "Lisää pöydän kuva — asiakkaat näkevät sen ja ymmärtävät tarkalleen, missä heidän pöytänsä on.",
            "Aseta pöydän väri — sillä värillä pöytä korostuu keittiössä ja osiossa ”Tilaukset”, jotta henkilökunta löytää sen nopeasti.",
            "Lisää halutessasi lyhyt kuvaus.",
            "Tallenna.",
          ],
        },
        {
          type: "note",
          text: "Pöydän kuva on asiakkaille (opaste ”missä pöytäni on”). Väri on henkilökunnalle (nopea visuaalinen merkintä pöydästä keittiössä ja tilauksissa).",
        },
        { type: "h3", text: "Pöydän QR-koodi" },
        {
          type: "p",
          text: "Jokaisella pöydällä on oma QR-koodi. Asiakas skannaa sen puhelimella ja päätyy suoraan kyseisen pöydän menuun — tilaus yhdistyy automaattisesti oikeaan pöytään.",
        },
        {
          type: "steps",
          items: [
            "Paina ”Näytä QR-koodi” halutun pöydän kohdalla.",
            "Paina ”Lataa QR” tallentaaksesi kuvan.",
            "Tulosta se ja aseta pöydälle (telineeseen, menuun, tarraan).",
          ],
        },
        {
          type: "tip",
          text: "”Pöydän linkki” on sama linkki kuin QR:ssä mutta tekstinä. Voit lähettää sen asiakkaalle viestillä.",
        },
      ],
    },
    {
      id: "orders",
      title: "4. Tilaukset",
      blocks: [
        { type: "h3", text: "Miten asiakas tilaa" },
        {
          type: "p",
          text: "Asiakas skannaa pöydän QR:n → menu avautuu → valitsee annokset, vaihtoehdot ja määrän → tekee tilauksen. Tilaus ilmestyy heti dashboardiisi ja keittiö-/tarjoilijapäätteelle.",
        },
        {
          type: "note",
          text: "Jotta asiakkaat voivat tilata, kohdassa Asetukset → Tilaukset on oltava päällä ”Ota vastaan tilauksia”. Jos se on pois, asiakas näkee menun mutta tilauspainiketta ei ole.",
        },
        { type: "h3", text: "Tilausten käsittely dashboardissa" },
        {
          type: "p",
          text: "Osio ”Tilaukset” näyttää pohjapiirroksen. Varatut pöydät on korostettu ja näyttävät aktiivisten tilausten määrän. Avaa pöydän tilaukset napauttamalla pöytää.",
        },
        {
          type: "steps",
          items: [
            "Napauta pöytää → ”Aloita tilaus” (tai avaa olemassa oleva).",
            "”Lisää kohde” → valitse kategoria → annos → vaihtoehdot → anna tarvittaessa määrä ja muistiinpanot (esimerkiksi ”ilman sipulia”).",
            "Paina ”Lisää” — kohde tulee tilaukseen.",
          ],
        },
        { type: "h3", text: "Kohteiden tilat" },
        {
          type: "p",
          text: "Jokaisella kohteella on tila: Odottaa → Valmistuu → Valmis → Tarjoiltu. Vaihda tila napauttamalla kohdetta. Tilat synkronoituvat keittiön kanssa reaaliajassa.",
        },
        { type: "h3", text: "Alennukset, jako, pöydän vaihto" },
        {
          type: "list",
          items: [
            "Alennus: ”Lisää alennus” — prosentti tai kiinteä summa, koko tilaukselle tai yhdelle kohteelle, syyllä.",
            "Jaa tilaus: ”Jaa tilaus” — valitse kohteet, jotka siirtyvät uudelle erilliselle laskulle.",
            "Vaihda pöytää: ”Vaihda pöytää” — siirrä tilaus toiseen pöytään.",
            "Monista kohde: lisää nopeasti toinen samanlainen.",
          ],
        },
        { type: "h3", text: "Tilauksen päättäminen" },
        {
          type: "steps",
          items: [
            "Kun kaikki kohteet on tarjoiltu, paina ”Päätä tilaus”.",
            "Valitse maksutapa (jos tapoja on määritetty).",
            "Tilaus sulkeutuu ja poistuu aktiivisista.",
          ],
        },
      ],
    },
    {
      id: "kitchen",
      title: "5. Keittiö (KDS)",
      blocks: [
        {
          type: "p",
          text: "Keittiönäyttö (KDS) on kokkien tabletilla oleva näyttö. Uudet tilaukset tippuvat siihen reaaliajassa, ja kokki merkitsee annokset valmiiksi.",
        },
        { type: "h3", text: "Mitä näyttö näyttää" },
        {
          type: "list",
          items: [
            "Tilauskortit kohteineen, vaihtoehtoineen ja ”passilla” -aikoineen.",
            "Tilan värimerkintä: mikä valmistuu, mikä on valmis.",
            "Äänimerkki uuden tilauksen saapuessa.",
          ],
        },
        { type: "h3", text: "Näin sitä käytetään" },
        {
          type: "steps",
          items: [
            "Napauta kohdetta siirtääksesi sen seuraavaan tilaan (Valmistuu → Valmis).",
            "Kytke ääni päälle painikkeella ”Kytke ääni” — silloin uudet tilaukset tulevat äänimerkillä.",
            "Zoomilla säädät korttien koon tabletille sopivaksi.",
            "Suodattimilla voit näyttää vain tarvitsemasi kategoriat (esimerkiksi vain kuuman linjan).",
          ],
        },
        {
          type: "note",
          text: "Jos tabletti menettää internetin, näkyviin tulee varoitus ”Ei yhteyttä”. Yhdistä Wi-Fi, niin tilaukset alkavat taas tulla.",
        },
      ],
    },
    {
      id: "reservations",
      title: "6. Varaukset",
      blocks: [
        {
          type: "p",
          text: "Asiakkaat voivat varata pöydän menusi kautta, ja sinä hallitset varauksia osiossa ”Varaukset” (näkymä ”Kuukausi” / ”Päivä”).",
        },
        { type: "h3", text: "Varausten asettaminen" },
        { type: "p", text: "Kytke varaukset päälle ja määritä ensin: Asetukset → Varaukset." },
        {
          type: "steps",
          items: [
            "Kytke ”Ota varaukset käyttöön”.",
            "Valitse vahvistustila: ”Automaattinen” (varaukset vahvistuvat itsestään) tai ”Manuaalinen” (vahvistat jokaisen).",
            "Aseta ”Varauksen kesto” — kuinka kauan pöytä pidetään asiakkaalle.",
            "Täytä ”Viikko-ohjelma”: jokaiselle päivälle — auki/kiinni, aukioloajat ja tarvittaessa lounastauko.",
          ],
        },
        {
          type: "note",
          text: "Varausten vastaanottamiseen tarvitaan pöytiä. Jos niitä ei ole, järjestelmä pyytää lisäämään pöydät ensin.",
        },
        { type: "h3", text: "Varausten käsittely" },
        {
          type: "list",
          items: [
            "Uudet päätöstä odottavat varaukset on koottu lohkoon ”Odottaa vahvistusta”.",
            "Painikkeet ”Vahvista” / ”Hylkää” — jokaiselle varaukselle.",
            "”Päätä” — merkitsee, että asiakas saapui ja varaus on hoidettu.",
            "Vaihda ”Kuukausi”- ja ”Päivä”-näkymän välillä, selaa jaksoa painikkeilla ”Takaisin” / ”Eteenpäin”.",
          ],
        },
      ],
    },
    {
      id: "devices",
      title: "7. Laitteet (tabletit)",
      blocks: [
        {
          type: "p",
          text: "Keittiö-, tarjoilija- ja varauspäätteet ovat erillisiä tabletteja, jotka yhdistetään tiliisi koodilla. Osio: Asetukset → Laitteet.",
        },
        {
          type: "note",
          text: "Laitteet ovat käytettävissä maksullisella tilauksella tai aktiivisen kokeilujakson aikana.",
        },
        { type: "h3", text: "Tabletin yhdistäminen (pariliitos)" },
        {
          type: "steps",
          items: [
            "Dashboardissa: Asetukset → Laitteet → ”Lisää laite”.",
            "Anna nimi (esimerkiksi ”Keittiö — kuuma linja”) ja tyyppi: Keittiö, Tarjoilija tai Varaukset.",
            "Paina ”Luo koodi” — näkyviin tulee 6-numeroinen koodi (voimassa 2 minuuttia).",
            "Avaa tabletilla yhdistämisnäyttö ja syötä tämä koodi.",
            "Tabletti yhdistyy ja alkaa heti toimia valitussa roolissa.",
          ],
        },
        { type: "tip", text: "Jos koodi vanheni — paina vain ”Uusi koodi” ja syötä tuore." },
        { type: "h3", text: "Laitteiden hallinta" },
        {
          type: "list",
          items: [
            "Tilat: Verkossa / Offline / Odottaa yhdistämistä / Peruutettu.",
            "”Peruuta” — irrottaa tabletin (esimerkiksi jos se katoaa). Uudelleenkirjautumiseen tarvitaan uusi koodi.",
            "”Poista” — poistaa laitteen luettelosta pysyvästi.",
          ],
        },
      ],
    },
    {
      id: "analytics",
      title: "8. Analytiikka",
      blocks: [
        {
          type: "p",
          text: "Osio ”Analytiikka” näyttää toimipaikan keskeiset luvut: liikevaihdon, tilausten määrän ja niiden erittelyn (esimerkiksi maksutavan ja ajankohdan mukaan). Käytä sitä ymmärtääksesi, mikä myy parhaiten ja milloin.",
        },
      ],
    },
    {
      id: "settings",
      title: "9. Asetukset",
      blocks: [
        {
          type: "p",
          text: "Osio ”Asetukset” avautuu osiokorttien joukkona. Ylhäällä on aktiivisen ravintolan valitsin (jos sinulla on useita). Alla — jokainen kortti järjestyksessä.",
        },
        { type: "h3", text: "Sivusto" },
        {
          type: "list",
          items: [
            "Julkisen menun URL — menusi yksilöllinen osoite (voit asettaa oman lyhyen slugin ja kopioida linkin).",
            "Toimipaikan nimi (otsikko) julkisella sivustolla.",
            "Korostusväri — menun painikkeiden ja korostusten pääväri.",
            "Tausta — kuva tai video etusivulla; lataa oma tai luo tausta tekoälyllä kuvauksesta.",
            "Menun asettelu — miten annokset näytetään asiakkaalle.",
          ],
        },
        { type: "h3", text: "Yhteystiedot ja osoite" },
        {
          type: "p",
          text: "Puhelin, Instagram, WhatsApp ja karttamerkki — kaikki näytetään asiakkaalle menusi yhteystietosivulla.",
        },
        { type: "h3", text: "Alue" },
        { type: "p", text: "Valuutta (käytetään kaikkiin hintoihin) ja toimipaikan aikavyöhyke." },
        { type: "h3", text: "Pöydät" },
        { type: "p", text: "Pohjapiirros, paikat ja pöytien QR-koodit — yksityiskohtaisesti osiossa 3." },
        { type: "h3", text: "Laitteet" },
        {
          type: "p",
          text: "Tablettien yhdistäminen keittiönäyttöön ja tarjoilijapäätteisiin — yksityiskohtaisesti osiossa 7.",
        },
        { type: "h3", text: "Tilaukset" },
        {
          type: "list",
          items: [
            "”Ota vastaan tilauksia” — tilausten vastaanoton pääkytkin.",
            "”Tilaustila” — Sisäinen ja/tai WhatsApp.",
            "”Pakolliset kentät” — mitkä tiedot asiakkaan on annettava (Nimi, Puhelin, Osoite).",
            "”Maksutavat” — ota yhteyttä tukeen ravintolan maksujärjestelmän integroimiseksi.",
          ],
        },
        { type: "h3", text: "Varaukset" },
        {
          type: "p",
          text: "Varausten käyttöönotto, automaattinen tai manuaalinen vahvistus, kesto ja aukioloajat — yksityiskohtaisesti osiossa 6.",
        },
        { type: "h3", text: "Kielet" },
        {
          type: "steps",
          items: [
            "Avaa Asetukset → Kielet.",
            "Valitse kielet, joille julkinen menu käännetään (lisää/poista napauttamalla).",
            "Aseta oletuskieli.",
            "Tekstit käännetään käsin tai painikkeella ”Käännä tekoälyllä” — järjestelmä kääntää annosten nimet ja kuvaukset valituille kielille.",
          ],
        },
        { type: "h3", text: "Maksu" },
        { type: "p", text: "Tilauksen suunnitelma, kokeilujakson tila ja maksujen hallinta." },
        {
          type: "list",
          items: [
            "Kuukausi- tai vuosilaskutus (vuosittain halvempaa).",
            "”Tilaa” / ”Vaihda” — valitse tai vaihda suunnitelma.",
            "”Hallinnoi” — vaihda maksutapa tai peru tilaus.",
          ],
        },
        {
          type: "note",
          text: "Maksu tapahtuu EUR-valuutassa. Maksaaksesi toisella valuutalla ota yhteyttä tukeen.",
        },
        { type: "h3", text: "Tuki" },
        {
          type: "p",
          text: "Sisäänrakennettu chat tiimimme kanssa reaaliajassa. Kirjoita viesti — vastaamme heti tässä.",
        },
        { type: "h3", text: "Ravintoloiden vaihto ja lisääminen" },
        {
          type: "p",
          text: "Jos sinulla on useita toimipaikkoja, ravintolan valitsin on osion ”Asetukset” yläosassa.",
        },
        {
          type: "steps",
          items: [
            "Avaa ravintolan valitsin ”Asetusten” yläosassa.",
            "”Lisää ravintola” → anna nimi.",
            "Valitse ”Monista nykyinen menu ja asetukset” (nopea aloitus) tai ”Aloita tyhjästä” (tyhjä ravintola).",
            "Luo se — ja vaihda ravintoloiden välillä milloin tahansa tässä.",
          ],
        },
      ],
    },
    {
      id: "public-menu",
      title: "10. Julkinen menu asiakkaille",
      blocks: [
        {
          type: "p",
          text: "Julkinen menu on se, minkä asiakas näkee skannattuaan QR:n. Se kootaan automaattisesti menustasi, brändistäsi ja yhteystiedoistasi.",
        },
        {
          type: "list",
          items: [
            "Menun osoite asetetaan kohdassa Asetukset → Alue (”Menun linkki”).",
            "Yleisen QR-koodin ja menun linkin saat painikkeella ”Jaa” sivulla ”Menu”.",
            "Jokaisella pöydällä on oma erillinen QR (Asetukset → Pöydät), joka johtaa juuri sen pöydän menuun.",
            "Ulkoasu (tausta, korostusväri, asettelu) määritetään osiossa ”Sivusto”.",
            "Painike ”Esikatselu” avaa menun sellaisena kuin asiakas sen näkee.",
          ],
        },
        {
          type: "tip",
          text: "Paina ”Esikatselu” jokaisen menu-/asetusmuutoksen jälkeen tarkistaaksesi, miltä se näyttää asiakkaalle.",
        },
      ],
    },
    {
      id: "faq",
      title: "11. Usein kysytyt kysymykset ja yksityiskohdat",
      blocks: [
        { type: "h3", text: "Asiakas ei voi tehdä tilausta" },
        {
          type: "p",
          text: "Tarkista Asetukset → Tilaukset → ”Ota vastaan tilauksia” (on oltava päällä) ja että vähintään yksi tilaustila on valittu.",
        },
        { type: "h3", text: "Varauksia ei tule" },
        {
          type: "p",
          text: "Varmista, että varaukset on otettu käyttöön kohdassa Asetukset → Varaukset, että pöytiä on lisätty ja ettei päivää ole merkitty ”Kiinni” ohjelmaan.",
        },
        { type: "h3", text: "Tabletti ei yhdisty" },
        {
          type: "p",
          text: "Koodi on voimassa 2 minuuttia. Jos se vanheni — luo uusi kohdassa Asetukset → Laitteet. Jos laite peruutettiin — luo uusi koodi.",
        },
        { type: "h3", text: "Annos on loppu" },
        {
          type: "p",
          text: "Älä poista sitä — paina ”Piilota annos”. Se katoaa julkisesta menusta, ja tuot sen takaisin painikkeella ”Näytä annos”.",
        },
        { type: "h3", text: "Tarvitset laitteita/päätteitä mutta sinulla ei ole niitä" },
        {
          type: "p",
          text: "Osio ”Laitteet” on käytettävissä maksullisella tilauksella tai aktiivisen kokeilujakson aikana. Tarkista Asetukset → Maksu.",
        },
        { type: "h3", text: "Onko vielä kysyttävää" },
        {
          type: "p",
          text: "Kirjoita meille kohdassa Asetukset → Tuki — se on sisäänrakennettu chat tiimimme kanssa.",
        },
      ],
    },
  ],
};
