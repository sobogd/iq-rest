import type { HelpDoc } from "../types";

// LT help guide.
export const lt: HelpDoc = {
  metaTitle: "Kaip naudotis IQ Rest — žingsnis po žingsnio vadovas",
  metaDescription:
    "Išsamus IQ Rest vadovas: registracija, meniu, užsakymai, rezervacijos, virtuvės ekranas ir nustatymai — restoranams.",
  h1: "Pagalba",
  intro: "Išsamus IQ Rest vadovas — nuo registracijos iki smulkių nustatymų.",
  banner: {
    title: "Tai paprasčiau, nei atrodo",
    sub: "Žingsnis po žingsnio vadovas: nuo registracijos iki smulkių nustatymų — susidoros kiekvienas.",
    cta: "Kaip naudotis",
  },
  tipLabel: "Patarimas",
  noteLabel: "Svarbu",
  sections: [
    {
      id: "start",
      title: "1. Pradžia",
      blocks: [
        { type: "h3", text: "Kas tai per sistema" },
        {
          type: "p",
          text: "IQ Rest yra paslauga restoranams: sukuriate internetinį meniu su QR kodu, priimate užsakymus ir staliukų rezervacijas tiesiai iš svečių telefonų, o virtuvėje ir pas padavėjus veikia planšetės-terminalai. Viskas valdoma iš vieno administravimo skydelio (skydelio).",
        },
        { type: "h3", text: "Registracija ir prisijungimas" },
        { type: "p", text: "Prisijungti galima trimis būdais — pasirinkite bet kurį prisijungimo ekrane:" },
        {
          type: "list",
          items: [
            "Su Google — spustelėkite „Tęsti su Google“ ir pasirinkite paskyrą.",
            "Su Apple — spustelėkite „Tęsti su Apple“.",
            "El. paštu — spustelėkite „Tęsti el. paštu“, įveskite adresą, ir atsiųsime 6 skaitmenų kodą. Įveskite jį kitame ekrane. Slaptažodžio nereikia.",
          ],
        },
        {
          type: "note",
          text: "El. paštu gaunate tik vienkartinį prisijungimo kodą — jokio šlamšto, jokių naujienlaiškių.",
        },
        { type: "h3", text: "Restorano sukūrimas (įvedimas)" },
        {
          type: "p",
          text: "Pirmą kartą prisijungus sistema praveda jus per greitą sąranką. Po to automatiškai sukuriamas restoranas su pavyzdiniu meniu šablonu, kurį vėliau pakeisite savuoju.",
        },
        {
          type: "steps",
          items: [
            "Nurodykite restorano pavadinimą.",
            "Pasirinkite virtuvės tipą (jis nustato pradinį meniu šabloną).",
            "Baigta: patenkate į skydelį su jau užpildytu pavyzdiniu meniu.",
          ],
        },
        {
          type: "note",
          text: "Valiuta nustatoma automatiškai pagal jūsų regioną — pradžioje jos rinktis nereikia. Vėliau pakeisite Nustatymai → Regionas.",
        },
        { type: "h3", text: "Skydelio apžvalga" },
        {
          type: "p",
          text: "Naršymas tarp skilčių: kompiuteryje viršutinė juosta, telefone apatinė juosta. Skiltys: Meniu, Užsakymai, Rezervacijos, Virtuvė, Analitika ir Nustatymai.",
        },
        {
          type: "list",
          items: [
            "Šalia restorano pavadinimo viršutinėje juostoje yra mažas ryšio indikatorius: žalias taškas reiškia, kad užsakymai sinchronizuojami realiuoju laiku.",
            "Puslapyje „Meniu“ viršuje yra mygtukas „Peržiūra“ — atveria jūsų meniu taip, kaip jį mato svečias.",
            "Šalia mygtukas „Bendrinti“ — parodo QR kodą ir nuorodą į meniu (kopijuoti nuorodą, atsisiųsti QR arba atidaryti meniu).",
          ],
        },
        {
          type: "tip",
          text: "Po kiekvieno meniu pakeitimo spauskite „Peržiūra“ — iškart matote, kaip atrodo svečiui.",
        },
      ],
    },
    {
      id: "menu",
      title: "2. Meniu",
      blocks: [
        {
          type: "p",
          text: "Skiltis „Meniu“ yra sistemos širdis. Čia kuriate struktūrą: kategorijos → patiekalai → parinktys. Atidarykite ją iš naršymo.",
        },
        { type: "h3", text: "Kategorijos ir subkategorijos" },
        {
          type: "steps",
          items: [
            "Spustelėkite „Pridėti kategoriją“ ir įveskite pavadinimą (pavyzdžiui „Užkandžiai“).",
            "Norėdami redaguoti kategoriją — užveskite ant jos ir spustelėkite „Redaguoti kategoriją“.",
            "Kategorijų tvarką keičiate mygtukais „Aukštyn“ / „Žemyn“ — būtent tokia tvarka jas mato svečias.",
            "Galite sukurti „Grupę“ (per „Pridėti grupę“) — skilties kategoriją, kurioje yra kitos kategorijos.",
          ],
        },
        { type: "h3", text: "Patiekalų pridėjimas" },
        {
          type: "steps",
          items: [
            "Išskleiskite kategoriją (rodyklė kairėje) ir spustelėkite „Pridėti patiekalą“.",
            "Užpildykite pavadinimą, kainą ir aprašymą.",
            "Pridėkite nuotrauką: „Pridėti nuotrauką“ — įkelkite savo arba spustelėkite „Generuoti“ ir aprašykite patiekalą žodžiais, kad DI sukurtų vaizdą.",
            "Išsaugokite. Patiekalas atsiranda kategorijoje.",
          ],
        },
        {
          type: "tip",
          text: "Nuotrauką gali sugeneruoti DI: nurodykite kampą, apšvietimą ar foną (pavyzdžiui „Pica Margherita ant medinės lentos, vaizdas iš viršaus“).",
        },
        { type: "h3", text: "Parinktys ir variantai (modifikatoriai)" },
        {
          type: "p",
          text: "Parinktys yra pasirinkimai patiekalo viduje: dydis, iškepimas, papildomi ingredientai. Kiekviena parinktis turi variantų, o variantui galima pridėti priemoką (pavyzdžiui „+1.50 už vienetą“).",
        },
        {
          type: "list",
          items: [
            "Pavyzdys: parinktis „Dydis“ su variantais „Maža / Didelė (+2.00)“.",
            "Pavyzdys: parinktis „Priedas“ su keliais variantais, iš kurių svečias pasirenka vieną ar kelis.",
          ],
        },
        { type: "h3", text: "Alergenai ir dietos" },
        {
          type: "p",
          text: "Patiekale galite pažymėti alergenus (glitimas, riešutai ir kt.) ir dietos žymas (vegetariška, vegan). Svečias mato jas kaip piktogramas viešame meniu.",
        },
        { type: "h3", text: "Patiekalų matomumas" },
        {
          type: "p",
          text: "Mygtukas „Slėpti patiekalą“ / „Rodyti patiekalą“ laikinai pašalina poziciją iš viešo meniu jos neištrinant — patogu, kai patiekalo pritrūko.",
        },
        { type: "h3", text: "Popierinio meniu įkėlimas (skenavimas)" },
        {
          type: "p",
          text: "Jei jau turite meniu kaip nuotrauką ar PDF — neįveskite jo ranka. Naudokite skenavimą:",
        },
        {
          type: "steps",
          items: [
            "Spustelėkite reklamjuostę „Įkelti meniu“ (arba „Įkelkite savo popierinį meniu“).",
            "Pridėkite iki 5 failų (nuotrauka/skenas, kiekvienas iki 20 MB) ir spustelėkite „Skenuoti“.",
            "Palaukite iki minutės — DI atpažįsta kategorijas ir patiekalus.",
            "Patikrinkite atpažintą, pažymėkite norimas pozicijas ir spustelėkite „Tęsti“.",
            "Pasirinkite: pakeisti esamą meniu arba pridėti naujas pozicijas prie esamo.",
          ],
        },
        {
          type: "note",
          text: "Pradinio šablono pavyzdžiai pašalinami išsaugant nuskenuotą meniu — tai normalu.",
        },
      ],
    },
    {
      id: "tables",
      title: "3. Staliukai ir QR kodai",
      blocks: [
        {
          type: "p",
          text: "Staliukai skirti susieti užsakymus ir rezervacijas su konkrečiomis vietomis ir spausdinti asmeninius QR kodus. Skiltis: Nustatymai → Staliukai.",
        },
        { type: "h3", text: "Staliukų kūrimas" },
        {
          type: "steps",
          items: [
            "Atidarykite Nustatymai → Staliukai ir spustelėkite „Pridėti staliuką“.",
            "Nurodykite staliuko numerį, vietų skaičių ir (nebūtinai) pavadinimą — pavyzdžiui „Langas“, „Baras“, „Terasa“.",
            "Pridėkite staliuko nuotrauką — svečiai ją mato ir supranta, kur tiksliai yra jų staliukas.",
            "Nustatykite staliuko spalvą — šia spalva staliukas paryškinamas virtuvėje ir skiltyje „Užsakymai“, kad personalas greitai jį rastų.",
            "Jei norite, pridėkite trumpą aprašymą.",
            "Išsaugokite.",
          ],
        },
        {
          type: "note",
          text: "Staliuko nuotrauka skirta svečiams (orientyras „kur mano staliukas“). Spalva skirta personalui (greita vizualinė staliuko žyma virtuvėje ir užsakymuose).",
        },
        { type: "h3", text: "Staliuko QR kodas" },
        {
          type: "p",
          text: "Kiekvienas staliukas turi savo QR kodą. Svečias nuskenuoja jį telefonu ir patenka tiesiai į to staliuko meniu — užsakymas automatiškai susiejamas su tinkamu staliuku.",
        },
        {
          type: "steps",
          items: [
            "Spustelėkite „Rodyti QR kodą“ prie norimo staliuko.",
            "Spustelėkite „Atsisiųsti QR“, kad išsaugotumėte vaizdą.",
            "Atspausdinkite ir padėkite ant staliuko (ant stovo, meniu, lipduko).",
          ],
        },
        {
          type: "tip",
          text: "„Staliuko nuoroda“ yra ta pati nuoroda kaip QR, tik tekstu. Galite ją nusiųsti svečiui žinute.",
        },
      ],
    },
    {
      id: "orders",
      title: "4. Užsakymai",
      blocks: [
        { type: "h3", text: "Kaip svečias užsako" },
        {
          type: "p",
          text: "Svečias nuskenuoja QR ant staliuko → atsidaro meniu → pasirenka patiekalus, parinktis ir kiekį → pateikia užsakymą. Užsakymas iškart atsiranda jūsų skydelyje ir virtuvės/padavėjo terminale.",
        },
        {
          type: "note",
          text: "Kad svečiai galėtų užsakyti, Nustatymai → Užsakymai turi būti įjungta „Priimti užsakymus“. Jei išjungta, svečias mato meniu, bet užsakymo mygtuko nėra.",
        },
        { type: "h3", text: "Darbas su užsakymais skydelyje" },
        {
          type: "p",
          text: "Skiltis „Užsakymai“ rodo salės planą. Užimti staliukai paryškinti ir rodo aktyvių užsakymų skaičių. Bakstelėkite staliuką, kad atvertumėte jo užsakymus.",
        },
        {
          type: "steps",
          items: [
            "Bakstelėkite staliuką → „Pradėti užsakymą“ (arba atverkite esamą).",
            "„Pridėti poziciją“ → pasirinkite kategoriją → patiekalą → parinktis → prireikus nurodykite kiekį ir pastabas (pavyzdžiui „be svogūnų“).",
            "Spustelėkite „Pridėti“ — pozicija patenka į užsakymą.",
          ],
        },
        { type: "h3", text: "Pozicijų būsenos" },
        {
          type: "p",
          text: "Kiekviena pozicija turi būseną: Laukia → Gaminama → Paruošta → Patiekta. Bakstelėkite poziciją, kad pakeistumėte būseną. Būsenos sinchronizuojamos su virtuve realiuoju laiku.",
        },
        { type: "h3", text: "Nuolaidos, dalijimas, staliuko keitimas" },
        {
          type: "list",
          items: [
            "Nuolaida: „Pridėti nuolaidą“ — procentas ar fiksuota suma, visam užsakymui ar vienai pozicijai, su priežastimi.",
            "Padalyti užsakymą: „Padalyti užsakymą“ — pasirinkite pozicijas, kurios eis į naują atskirą sąskaitą.",
            "Keisti staliuką: „Keisti staliuką“ — perkelkite užsakymą į kitą staliuką.",
            "Dubliuoti poziciją: greitai pridėkite dar vieną tokią pat.",
          ],
        },
        { type: "h3", text: "Užsakymo užbaigimas" },
        {
          type: "steps",
          items: [
            "Kai visos pozicijos patiektos, spustelėkite „Užbaigti užsakymą“.",
            "Pasirinkite mokėjimo būdą (jei būdai sukonfigūruoti).",
            "Užsakymas užsidaro ir išeina iš aktyvių.",
          ],
        },
      ],
    },
    {
      id: "kitchen",
      title: "5. Virtuvė (KDS)",
      blocks: [
        {
          type: "p",
          text: "Virtuvės ekranas (KDS) — tai planšetės ekranas virėjams. Nauji užsakymai į jį patenka realiuoju laiku, o virėjas pažymi patiekalus kaip paruoštus.",
        },
        { type: "h3", text: "Ką rodo ekranas" },
        {
          type: "list",
          items: [
            "Užsakymų kortelės su pozicijomis, parinktimis ir laiku „prie išdavimo“.",
            "Spalvinė būsenos žyma: kas gaminama, kas paruošta.",
            "Garsinis signalas atėjus naujam užsakymui.",
          ],
        },
        { type: "h3", text: "Kaip naudoti" },
        {
          type: "steps",
          items: [
            "Bakstelėkite poziciją, kad perkeltumėte ją į kitą būseną (Gaminama → Paruošta).",
            "Įjunkite garsą mygtuku „Įjungti garsą“ — tada nauji užsakymai ateina su garsiniu signalu.",
            "Mastelio keitimu pritaikykite kortelių dydį planšetei.",
            "Filtrais galite rodyti tik reikiamas kategorijas (pavyzdžiui tik karštą liniją).",
          ],
        },
        {
          type: "note",
          text: "Jei planšetė praranda internetą, pasirodo įspėjimas „Nėra ryšio“. Prijunkite „Wi-Fi“ ir užsakymai vėl pradės ateiti.",
        },
      ],
    },
    {
      id: "reservations",
      title: "6. Rezervacijos",
      blocks: [
        {
          type: "p",
          text: "Svečiai gali rezervuoti staliuką per jūsų meniu, o jūs valdote rezervacijas skiltyje „Rezervacijos“ (rodinys „Mėnuo“ / „Diena“).",
        },
        { type: "h3", text: "Rezervacijų nustatymas" },
        { type: "p", text: "Pirmiausia įjunkite ir sukonfigūruokite rezervacijas: Nustatymai → Rezervacijos." },
        {
          type: "steps",
          items: [
            "Įjunkite „Įjungti rezervacijas“.",
            "Pasirinkite patvirtinimo režimą: „Automatinis“ (rezervacijos patvirtinamos pačios) arba „Rankinis“ (kiekvieną patvirtinate jūs).",
            "Nustatykite „Rezervacijos trukmę“ — kiek laiko staliukas laikomas svečiui.",
            "Užpildykite „Savaitės grafiką“: kiekvienai dienai — atidaryta/uždaryta, darbo laikas ir prireikus pietų pertrauka.",
          ],
        },
        {
          type: "note",
          text: "Rezervacijoms priimti reikia staliukų. Jei jų nėra, sistema paprašys pirmiausia pridėti staliukus.",
        },
        { type: "h3", text: "Darbas su rezervacijomis" },
        {
          type: "list",
          items: [
            "Naujos sprendimo laukiančios rezervacijos surinktos bloke „Laukia patvirtinimo“.",
            "Mygtukai „Patvirtinti“ / „Atmesti“ — kiekvienai rezervacijai.",
            "„Užbaigti“ — pažymi, kad svečias atvyko ir rezervacija įvykdyta.",
            "Perjunkite tarp „Mėnuo“ ir „Diena“, vartykite laikotarpį mygtukais „Atgal“ / „Pirmyn“.",
          ],
        },
      ],
    },
    {
      id: "devices",
      title: "7. Įrenginiai (planšetės)",
      blocks: [
        {
          type: "p",
          text: "Virtuvės, padavėjo ir rezervacijų terminalai yra atskiros planšetės, kurios prie jūsų paskyros prisijungia kodu. Skiltis: Nustatymai → Įrenginiai.",
        },
        {
          type: "note",
          text: "Įrenginiai prieinami su mokamu planu arba aktyviu bandomuoju laikotarpiu.",
        },
        { type: "h3", text: "Planšetės prijungimas (susiejimas)" },
        {
          type: "steps",
          items: [
            "Skydelyje: Nustatymai → Įrenginiai → „Pridėti įrenginį“.",
            "Nurodykite pavadinimą (pavyzdžiui „Virtuvė — karšta linija“) ir tipą: Virtuvė, Padavėjas arba Rezervacijos.",
            "Spustelėkite „Generuoti kodą“ — pasirodo 6 skaitmenų kodas (galioja 2 minutes).",
            "Planšetėje atidarykite prisijungimo ekraną ir įveskite šį kodą.",
            "Planšetė prisijungia ir iškart pradeda dirbti pasirinktu vaidmeniu.",
          ],
        },
        { type: "tip", text: "Jei kodas pasibaigė — tiesiog spustelėkite „Naujas kodas“ ir įveskite šviežią." },
        { type: "h3", text: "Įrenginių valdymas" },
        {
          type: "list",
          items: [
            "Būsenos: Prisijungęs / Atsijungęs / Laukia prisijungimo / Atšauktas.",
            "„Atšaukti“ — atjungia planšetę (pavyzdžiui jei pamesta). Norint vėl prisijungti, reikia naujo kodo.",
            "„Ištrinti“ — visam laikui pašalina įrenginį iš sąrašo.",
          ],
        },
      ],
    },
    {
      id: "analytics",
      title: "8. Analitika",
      blocks: [
        {
          type: "p",
          text: "Skiltis „Analitika“ rodo pagrindinius įstaigos skaičius: pajamas, užsakymų skaičių ir jų suskirstymą (pavyzdžiui pagal mokėjimo būdą ir laiką). Naudokite ją, kad suprastumėte, kas ir kada parduodama geriausiai.",
        },
      ],
    },
    {
      id: "settings",
      title: "9. Nustatymai",
      blocks: [
        {
          type: "p",
          text: "Skiltis „Nustatymai“ atsidaro kaip skilčių kortelių rinkinys. Viršuje yra aktyvaus restorano perjungiklis (jei turite kelis). Po juo — kiekviena kortelė iš eilės.",
        },
        { type: "h3", text: "Svetainė" },
        {
          type: "list",
          items: [
            "Viešo meniu URL — unikalus jūsų meniu adresas (galite nustatyti savo trumpą slug ir kopijuoti nuorodą).",
            "Įstaigos pavadinimas (antraštė) viešoje svetainėje.",
            "Akcento spalva — pagrindinė mygtukų ir paryškinimų spalva meniu.",
            "Fonas — vaizdas ar vaizdo įrašas pradžios puslapyje; įkelkite savo arba sugeneruokite foną su DI pagal aprašymą.",
            "Meniu išdėstymas — kaip patiekalai rodomi svečiui.",
          ],
        },
        { type: "h3", text: "Kontaktai ir adresas" },
        {
          type: "p",
          text: "Telefonas, „Instagram“, „WhatsApp“ ir žymeklis žemėlapyje — viskas rodoma svečiui jūsų meniu kontaktų puslapyje.",
        },
        { type: "h3", text: "Regionas" },
        { type: "p", text: "Valiuta (naudojama visoms kainoms) ir įstaigos laiko juosta." },
        { type: "h3", text: "Staliukai" },
        { type: "p", text: "Salės planas, vietos ir staliukų QR kodai — išsamiai 3 skyriuje." },
        { type: "h3", text: "Įrenginiai" },
        {
          type: "p",
          text: "Planšečių prijungimas virtuvės ekranui ir padavėjų terminalams — išsamiai 7 skyriuje.",
        },
        { type: "h3", text: "Užsakymai" },
        {
          type: "list",
          items: [
            "„Priimti užsakymus“ — pagrindinis užsakymų priėmimo jungiklis.",
            "„Užsakymų režimas“ — Vidinis ir (arba) „WhatsApp“.",
            "„Privalomi laukai“ — kokius duomenis svečias turi nurodyti (Vardas, Telefonas, Adresas).",
            "„Mokėjimo būdai“ — dėl restorano mokėjimo sistemos integracijos kreipkitės į palaikymą.",
          ],
        },
        { type: "h3", text: "Rezervacijos" },
        {
          type: "p",
          text: "Rezervacijų įjungimas, automatinis ar rankinis patvirtinimas, trukmė ir darbo laikas — išsamiai 6 skyriuje.",
        },
        { type: "h3", text: "Kalbos" },
        {
          type: "steps",
          items: [
            "Atidarykite Nustatymai → Kalbos.",
            "Pasirinkite kalbas, į kurias verčiamas viešas meniu (bakstelėjus pridedate/pašalinate).",
            "Nustatykite numatytąją kalbą.",
            "Tekstai verčiami rankiniu būdu arba mygtuku „Versti su DI“ — sistema išverčia patiekalų pavadinimus ir aprašymus į pasirinktas kalbas.",
          ],
        },
        { type: "h3", text: "Mokėjimas" },
        { type: "p", text: "Prenumeratos planas, bandomojo laikotarpio būsena ir mokėjimų valdymas." },
        {
          type: "list",
          items: [
            "Mėnesinis ar metinis atsiskaitymas (metinis pigesnis).",
            "„Prenumeruoti“ / „Perjungti“ — pasirinkite ar pakeiskite planą.",
            "„Valdyti“ — pakeiskite mokėjimo būdą arba atšaukite prenumeratą.",
          ],
        },
        {
          type: "note",
          text: "Mokama EUR. Norėdami mokėti kita valiuta, kreipkitės į palaikymą.",
        },
        { type: "h3", text: "Palaikymas" },
        {
          type: "p",
          text: "Įmontuotas pokalbis su mūsų komanda realiuoju laiku. Parašykite žinutę — atsakysime čia pat.",
        },
        { type: "h3", text: "Restoranų perjungimas ir pridėjimas" },
        {
          type: "p",
          text: "Jei turite kelias įstaigas, restorano perjungiklis yra skilties „Nustatymai“ viršuje.",
        },
        {
          type: "steps",
          items: [
            "Atidarykite restoranų perjungiklį „Nustatymų“ viršuje.",
            "„Pridėti restoraną“ → įveskite pavadinimą.",
            "Pasirinkite „Dubliuoti esamą meniu ir nustatymus“ (greitas startas) arba „Pradėti nuo nulio“ (tuščias restoranas).",
            "Sukurkite jį — ir bet kada perjunkite tarp restoranų čia pat.",
          ],
        },
      ],
    },
    {
      id: "public-menu",
      title: "10. Viešas meniu svečiams",
      blocks: [
        {
          type: "p",
          text: "Viešas meniu — tai, ką svečias mato nuskenavęs QR. Jis automatiškai sudaromas iš jūsų meniu, prekės ženklo ir kontaktų.",
        },
        {
          type: "list",
          items: [
            "Meniu adresas nustatomas Nustatymai → Regionas („Meniu nuoroda“).",
            "Bendrą QR kodą ir meniu nuorodą gaunate mygtuku „Bendrinti“ puslapyje „Meniu“.",
            "Kiekvienas staliukas turi savo atskirą QR (Nustatymai → Staliukai), vedantį į būtent to staliuko meniu.",
            "Išvaizda (fonas, akcento spalva, išdėstymas) nustatoma skiltyje „Svetainė“.",
            "Mygtukas „Peržiūra“ atveria meniu taip, kaip jį mato svečias.",
          ],
        },
        {
          type: "tip",
          text: "Po bet kokio meniu/nustatymų pakeitimo spauskite „Peržiūra“, kad patikrintumėte, kaip atrodo svečiui.",
        },
      ],
    },
    {
      id: "faq",
      title: "11. Dažni klausimai ir niuansai",
      blocks: [
        { type: "h3", text: "Svečias negali pateikti užsakymo" },
        {
          type: "p",
          text: "Patikrinkite Nustatymai → Užsakymai → „Priimti užsakymus“ (turi būti įjungta) ir kad pasirinktas bent vienas užsakymų režimas.",
        },
        { type: "h3", text: "Neateina rezervacijos" },
        {
          type: "p",
          text: "Įsitikinkite, kad rezervacijos įjungtos Nustatymai → Rezervacijos, kad pridėti staliukai ir kad diena grafike nepažymėta kaip „Uždaryta“.",
        },
        { type: "h3", text: "Planšetė neprisijungia" },
        {
          type: "p",
          text: "Kodas galioja 2 minutes. Jei pasibaigė — sugeneruokite naują Nustatymai → Įrenginiai. Jei įrenginys atšauktas — sukurkite naują kodą.",
        },
        { type: "h3", text: "Patiekalo pritrūko" },
        {
          type: "p",
          text: "Netrinkite jo — spustelėkite „Slėpti patiekalą“. Jis dingsta iš viešo meniu, o grąžinate mygtuku „Rodyti patiekalą“.",
        },
        { type: "h3", text: "Reikia įrenginių/terminalų, bet jų nėra" },
        {
          type: "p",
          text: "Skiltis „Įrenginiai“ prieinama su mokamu planu arba aktyviu bandomuoju laikotarpiu. Patikrinkite Nustatymai → Mokėjimas.",
        },
        { type: "h3", text: "Liko klausimų" },
        {
          type: "p",
          text: "Parašykite mums Nustatymai → Palaikymas — tai įmontuotas pokalbis su mūsų komanda.",
        },
      ],
    },
  ],
};
