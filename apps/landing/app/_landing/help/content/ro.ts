import type { HelpDoc } from "../types";

// RO help guide.
export const ro: HelpDoc = {
  metaTitle: "Cum se folosește IQ Rest — ghid pas cu pas",
  metaDescription:
    "Ghid complet IQ Rest: înregistrare, meniu, comenzi, rezervări, ecran de bucătărie și setări — pentru restaurante.",
  h1: "Ajutor",
  intro: "Un ghid detaliat pentru IQ Rest — de la înregistrare la setările mai fine.",
  banner: {
    title: "E mai simplu decât pare",
    sub: "Un ghid pas cu pas: de la înregistrare la setările mai fine — oricine reușește.",
    cta: "Cum se folosește",
  },
  tipLabel: "Sfat",
  noteLabel: "Important",
  sections: [
    {
      id: "start",
      title: "1. Primii pași",
      blocks: [
        { type: "h3", text: "Ce este acest sistem" },
        {
          type: "p",
          text: "IQ Rest este un serviciu pentru restaurante: creezi un meniu online cu cod QR, primești comenzi și rezervări de masă direct de pe telefoanele clienților, iar în bucătărie și la ospătari funcționează tablete-terminal. Totul se gestionează dintr-un singur panou de administrare (dashboard).",
        },
        { type: "h3", text: "Înregistrare și autentificare" },
        { type: "p", text: "Te poți autentifica în trei moduri — alege oricare pe ecranul de autentificare:" },
        {
          type: "list",
          items: [
            "Cu Google — apasă „Continuă cu Google” și alege contul.",
            "Cu Apple — apasă „Continuă cu Apple”.",
            "Prin e-mail — apasă „Continuă cu e-mailul”, introdu adresa, iar noi trimitem un cod din 6 cifre. Introdu-l pe ecranul următor. Nu e nevoie de parolă.",
          ],
        },
        {
          type: "note",
          text: "Prin e-mail primești doar un cod de autentificare de unică folosință — fără spam, fără newslettere.",
        },
        { type: "h3", text: "Crearea restaurantului (onboarding)" },
        {
          type: "p",
          text: "La prima autentificare, sistemul te ghidează printr-o configurare rapidă. Apoi se creează automat un restaurant cu un șablon de meniu exemplu, pe care îl vei înlocui mai târziu cu al tău.",
        },
        {
          type: "steps",
          items: [
            "Indică numele restaurantului.",
            "Alege tipul de bucătărie (determină șablonul de meniu inițial).",
            "Gata: ajungi în dashboard cu un meniu exemplu deja completat.",
          ],
        },
        {
          type: "note",
          text: "Moneda este detectată automat în funcție de regiunea ta — nu trebuie aleasă la început. O poți schimba mai târziu în Setări → Regiune.",
        },
        { type: "h3", text: "Prezentare generală a dashboardului" },
        {
          type: "p",
          text: "Navigarea între secțiuni: pe computer o bară sus, pe telefon o bară jos. Secțiuni: Meniu, Comenzi, Rezervări, Bucătărie, Analize și Setări.",
        },
        {
          type: "list",
          items: [
            "Lângă numele restaurantului, în bara de sus, este un mic indicator de conexiune: un punct verde înseamnă că comenzile se sincronizează în timp real.",
            "Pe pagina „Meniu”, sus, este butonul „Previzualizare” — deschide meniul așa cum îl vede clientul.",
            "Tot acolo butonul „Distribuie” — afișează codul QR și linkul către meniu (copiază linkul, descarcă QR sau deschide meniul).",
          ],
        },
        {
          type: "tip",
          text: "Apasă „Previzualizare” după fiecare modificare a meniului — vezi imediat cum arată pentru client.",
        },
      ],
    },
    {
      id: "menu",
      title: "2. Meniu",
      blocks: [
        {
          type: "p",
          text: "Secțiunea „Meniu” este inima sistemului. Aici construiești structura: categorii → preparate → opțiuni. Deschide-o din navigare.",
        },
        { type: "h3", text: "Categorii și subcategorii" },
        {
          type: "steps",
          items: [
            "Apasă „Adaugă categorie” și introdu un nume (de exemplu „Aperitive”).",
            "Pentru a edita o categorie — treci cu cursorul peste ea și apasă „Editează categoria”.",
            "Ordinea categoriilor se schimbă cu butoanele „Sus” / „Jos” — exact în această ordine le vede clientul.",
            "Poți crea un „Grup” (prin „Adaugă grup”) — o categorie-secțiune care conține alte categorii.",
          ],
        },
        { type: "h3", text: "Adăugarea preparatelor" },
        {
          type: "steps",
          items: [
            "Extinde o categorie (săgeata din stânga) și apasă „Adaugă preparat”.",
            "Completează numele, prețul și descrierea.",
            "Adaugă o fotografie: „Adaugă fotografie” — încarcă a ta, sau apasă „Generează” și descrie preparatul în cuvinte ca IA să creeze imaginea.",
            "Salvează. Preparatul apare în categorie.",
          ],
        },
        {
          type: "tip",
          text: "Fotografia poate fi generată cu IA: indică unghiul, lumina sau fundalul (de exemplu „Pizza Margherita pe un tocător de lemn, vedere de sus”).",
        },
        { type: "h3", text: "Opțiuni și variante (modificatori)" },
        {
          type: "p",
          text: "Opțiunile sunt alegeri în cadrul unui preparat: mărime, grad de gătire, ingrediente extra. Fiecare opțiune are variante, iar unei variante i se poate adăuga un supliment de preț (de exemplu „+1.50 bucata”).",
        },
        {
          type: "list",
          items: [
            "Exemplu: o opțiune „Mărime” cu variantele „Mică / Mare (+2.00)”.",
            "Exemplu: o opțiune „Extra” cu mai multe variante din care clientul alege una sau mai multe.",
          ],
        },
        { type: "h3", text: "Alergeni și diete" },
        {
          type: "p",
          text: "La un preparat poți marca alergenii (gluten, nuci etc.) și etichetele dietetice (vegetarian, vegan). Clientul le vede ca pictograme în meniul public.",
        },
        { type: "h3", text: "Vizibilitatea preparatelor" },
        {
          type: "p",
          text: "Butonul „Ascunde preparatul” / „Arată preparatul” elimină temporar un element din meniul public fără a-l șterge — util când un preparat s-a terminat.",
        },
        { type: "h3", text: "Încărcarea unui meniu pe hârtie (scanare)" },
        {
          type: "p",
          text: "Dacă ai deja un meniu ca fotografie sau PDF — nu-l introduce manual. Folosește scanarea:",
        },
        {
          type: "steps",
          items: [
            "Apasă bannerul „Încarcă meniul” (sau „Încarcă meniul pe hârtie”).",
            "Adaugă până la 5 fișiere (foto/scan, până la 20 MB fiecare) și apasă „Scanează”.",
            "Așteaptă până la un minut — IA recunoaște categoriile și preparatele.",
            "Verifică ce a fost recunoscut, bifează elementele dorite și apasă „Continuă”.",
            "Alege: înlocuiește meniul actual sau adaugă noile elemente la cel existent.",
          ],
        },
        {
          type: "note",
          text: "Exemplele din șablonul inițial sunt eliminate la salvarea meniului scanat — este normal.",
        },
      ],
    },
    {
      id: "tables",
      title: "3. Mese și coduri QR",
      blocks: [
        {
          type: "p",
          text: "Mesele servesc la asocierea comenzilor și rezervărilor cu locuri concrete și la tipărirea codurilor QR personale. Secțiune: Setări → Mese.",
        },
        { type: "h3", text: "Crearea meselor" },
        {
          type: "steps",
          items: [
            "Deschide Setări → Mese și apasă „Adaugă masă”.",
            "Indică numărul mesei, numărul de locuri și (opțional) un nume — de exemplu „Fereastră”, „Bar”, „Terasă”.",
            "Adaugă o fotografie a mesei — clienții o văd și înțeleg exact unde este masa lor.",
            "Setează o culoare a mesei — cu acea culoare masa este evidențiată în bucătărie și în secțiunea „Comenzi”, ca personalul să o găsească rapid.",
            "Opțional, adaugă o scurtă descriere.",
            "Salvează.",
          ],
        },
        {
          type: "note",
          text: "Fotografia mesei este pentru clienți (reper „unde e masa mea”). Culoarea este pentru personal (un marcaj vizual rapid al mesei în bucătărie și în comenzi).",
        },
        { type: "h3", text: "Codul QR al mesei" },
        {
          type: "p",
          text: "Fiecare masă are propriul cod QR. Clientul îl scanează cu telefonul și ajunge direct în meniul acelei mese — comanda se asociază automat cu masa corectă.",
        },
        {
          type: "steps",
          items: [
            "Apasă „Arată codul QR” la masa dorită.",
            "Apasă „Descarcă QR” pentru a salva imaginea.",
            "Tipărește-l și pune-l pe masă (pe un suport, în meniu, pe un autocolant).",
          ],
        },
        {
          type: "tip",
          text: "„Linkul mesei” este același link ca în QR, dar ca text. Îl poți trimite clientului printr-un mesaj.",
        },
      ],
    },
    {
      id: "orders",
      title: "4. Comenzi",
      blocks: [
        { type: "h3", text: "Cum comandă clientul" },
        {
          type: "p",
          text: "Clientul scanează codul QR de pe masă → se deschide meniul → alege preparate, opțiuni și cantitate → plasează comanda. Comanda apare imediat în dashboardul tău și pe terminalul de bucătărie/ospătar.",
        },
        {
          type: "note",
          text: "Pentru ca clienții să poată comanda, în Setări → Comenzi trebuie activat „Acceptă comenzi”. Dacă e dezactivat, clientul vede meniul dar nu există buton de comandă.",
        },
        { type: "h3", text: "Gestionarea comenzilor în dashboard" },
        {
          type: "p",
          text: "Secțiunea „Comenzi” arată planul sălii. Mesele ocupate sunt evidențiate și arată numărul de comenzi active. Atinge o masă pentru a-i deschide comenzile.",
        },
        {
          type: "steps",
          items: [
            "Atinge o masă → „Începe comanda” (sau deschide una existentă).",
            "„Adaugă articol” → alege categoria → preparatul → opțiunile → la nevoie indică cantitatea și notele (de exemplu „fără ceapă”).",
            "Apasă „Adaugă” — articolul intră în comandă.",
          ],
        },
        { type: "h3", text: "Statusurile articolelor" },
        {
          type: "p",
          text: "Fiecare articol are un status: În așteptare → Se gătește → Gata → Servit. Atinge un articol pentru a-i schimba statusul. Statusurile se sincronizează cu bucătăria în timp real.",
        },
        { type: "h3", text: "Reduceri, împărțire, schimbarea mesei" },
        {
          type: "list",
          items: [
            "Reducere: „Adaugă reducere” — procent sau sumă fixă, pe toată comanda sau pe un articol, cu motiv.",
            "Împarte comanda: „Împarte comanda” — alege articolele care merg pe o notă nouă separată.",
            "Schimbă masa: „Schimbă masa” — mută comanda pe altă masă.",
            "Duplică articol: adaugă rapid încă unul identic.",
          ],
        },
        { type: "h3", text: "Finalizarea unei comenzi" },
        {
          type: "steps",
          items: [
            "Când toate articolele sunt servite, apasă „Finalizează comanda”.",
            "Alege o metodă de plată (dacă sunt configurate metode).",
            "Comanda se închide și iese din cele active.",
          ],
        },
      ],
    },
    {
      id: "kitchen",
      title: "5. Bucătărie (KDS)",
      blocks: [
        {
          type: "p",
          text: "Ecranul de bucătărie (KDS) este un ecran pe o tabletă pentru bucătari. Comenzile noi ajung pe el în timp real, iar bucătarul marchează preparatele ca gata.",
        },
        { type: "h3", text: "Ce arată ecranul" },
        {
          type: "list",
          items: [
            "Carduri de comandă cu articole, opțiuni și timpul „la pas”.",
            "Indicație colorată a statusului: ce se gătește, ce e gata.",
            "Un semnal sonor la sosirea unei comenzi noi.",
          ],
        },
        { type: "h3", text: "Cum se folosește" },
        {
          type: "steps",
          items: [
            "Atinge un articol pentru a-l trece în statusul următor (Se gătește → Gata).",
            "Activează sunetul cu butonul „Activează sunetul” — atunci comenzile noi vin cu un semnal sonor.",
            "Cu zoomul reglezi mărimea cardurilor pentru tabletă.",
            "Cu filtrele poți arăta doar categoriile necesare (de exemplu doar linia caldă).",
          ],
        },
        {
          type: "note",
          text: "Dacă tableta pierde internetul, apare avertismentul „Fără conexiune”. Conectează Wi-Fi și comenzile vor începe să vină din nou.",
        },
      ],
    },
    {
      id: "reservations",
      title: "6. Rezervări",
      blocks: [
        {
          type: "p",
          text: "Clienții pot rezerva o masă prin meniul tău, iar tu gestionezi rezervările în secțiunea „Rezervări” (vizualizare „Lună” / „Zi”).",
        },
        { type: "h3", text: "Configurarea rezervărilor" },
        { type: "p", text: "Mai întâi activează și configurează rezervările: Setări → Rezervări." },
        {
          type: "steps",
          items: [
            "Activează „Activează rezervările”.",
            "Alege modul de confirmare: „Automat” (rezervările se confirmă singure) sau „Manual” (confirmi fiecare).",
            "Setează „Durata rezervării” — cât timp se ține masa pentru client.",
            "Completează „Programul săptămânal”: pentru fiecare zi — deschis/închis, orele de lucru și, la nevoie, pauza de prânz.",
          ],
        },
        {
          type: "note",
          text: "Pentru a accepta rezervări sunt necesare mese. Dacă nu există, sistemul îți cere să adaugi mai întâi mese.",
        },
        { type: "h3", text: "Gestionarea rezervărilor" },
        {
          type: "list",
          items: [
            "Rezervările noi care așteaptă o decizie sunt adunate în blocul „Așteaptă confirmare”.",
            "Butoanele „Confirmă” / „Respinge” — pentru fiecare rezervare.",
            "„Finalizează” — marchează că oaspetele a venit și rezervarea este onorată.",
            "Comută între „Lună” și „Zi”, parcurge perioada cu „Înapoi” / „Înainte”.",
          ],
        },
      ],
    },
    {
      id: "devices",
      title: "7. Dispozitive (tablete)",
      blocks: [
        {
          type: "p",
          text: "Terminalele de bucătărie, ospătar și rezervări sunt tablete separate care se conectează la contul tău printr-un cod. Secțiune: Setări → Dispozitive.",
        },
        {
          type: "note",
          text: "Dispozitivele sunt disponibile pe un plan plătit sau în timpul unei perioade de probă active.",
        },
        { type: "h3", text: "Conectarea unei tablete (împerechere)" },
        {
          type: "steps",
          items: [
            "În dashboard: Setări → Dispozitive → „Adaugă dispozitiv”.",
            "Indică un nume (de exemplu „Bucătărie — linia caldă”) și un tip: Bucătărie, Ospătar sau Rezervări.",
            "Apasă „Generează cod” — apare un cod din 6 cifre (valabil 2 minute).",
            "Pe tabletă deschide ecranul de conectare și introdu acest cod.",
            "Tableta se conectează și începe imediat să lucreze în rolul ales.",
          ],
        },
        { type: "tip", text: "Dacă a expirat codul — apasă pur și simplu „Cod nou” și introdu-l pe cel proaspăt." },
        { type: "h3", text: "Gestionarea dispozitivelor" },
        {
          type: "list",
          items: [
            "Statusuri: Online / Offline / Așteaptă conectare / Revocat.",
            "„Revocă” — deconectează tableta (de exemplu dacă e pierdută). Pentru reconectare e nevoie de un cod nou.",
            "„Șterge” — elimină definitiv dispozitivul din listă.",
          ],
        },
      ],
    },
    {
      id: "analytics",
      title: "8. Analize",
      blocks: [
        {
          type: "p",
          text: "Secțiunea „Analize” arată cifrele cheie ale localului: încasări, numărul de comenzi și defalcarea lor (de exemplu pe metodă de plată și pe oră). Folosește-o pentru a înțelege ce se vinde cel mai bine și când.",
        },
      ],
    },
    {
      id: "settings",
      title: "9. Setări",
      blocks: [
        {
          type: "p",
          text: "Secțiunea „Setări” se deschide ca un set de carduri-secțiuni. Sus este comutatorul restaurantului activ (dacă ai mai multe). Dedesubt — fiecare card pe rând.",
        },
        { type: "h3", text: "Site" },
        {
          type: "list",
          items: [
            "URL-ul meniului public — adresa unică a meniului tău (poți seta propriul slug scurt și copia linkul).",
            "Numele (titlul) localului pe site-ul public.",
            "Culoare de accent — culoarea principală a butoanelor și evidențierilor din meniu.",
            "Fundal — o imagine sau un videoclip pe pagina principală; încarcă al tău sau generează un fundal cu IA dintr-o descriere.",
            "Aspectul meniului — cum sunt afișate preparatele clientului.",
          ],
        },
        { type: "h3", text: "Contacte și adresă" },
        {
          type: "p",
          text: "Telefon, Instagram, WhatsApp și un marcaj pe hartă — totul i se arată clientului pe pagina de contacte a meniului tău.",
        },
        { type: "h3", text: "Regiune" },
        { type: "p", text: "Moneda (folosită pentru toate prețurile) și fusul orar al localului." },
        { type: "h3", text: "Mese" },
        { type: "p", text: "Planul sălii, locurile și codurile QR ale meselor — în detaliu în secțiunea 3." },
        { type: "h3", text: "Dispozitive" },
        {
          type: "p",
          text: "Conectarea tabletelor pentru ecranul de bucătărie și terminalele ospătarilor — în detaliu în secțiunea 7.",
        },
        { type: "h3", text: "Comenzi" },
        {
          type: "list",
          items: [
            "„Acceptă comenzi” — comutatorul principal pentru primirea comenzilor.",
            "„Modul de comandă” — Intern și/sau WhatsApp.",
            "„Câmpuri obligatorii” — ce date trebuie să furnizeze clientul (Nume, Telefon, Adresă).",
            "„Metode de plată” — pentru integrarea sistemului de plată al restaurantului contactează suportul.",
          ],
        },
        { type: "h3", text: "Rezervări" },
        {
          type: "p",
          text: "Activarea rezervărilor, confirmare automată sau manuală, durată și ore de lucru — în detaliu în secțiunea 6.",
        },
        { type: "h3", text: "Limbi" },
        {
          type: "steps",
          items: [
            "Deschide Setări → Limbi.",
            "Alege limbile în care se traduce meniul public (atinge pentru a adăuga/elimina).",
            "Setează limba implicită.",
            "Textele se traduc manual sau cu butonul „Tradu cu IA” — sistemul traduce numele și descrierile preparatelor în limbile alese.",
          ],
        },
        { type: "h3", text: "Plată" },
        { type: "p", text: "Planul de abonament, starea perioadei de probă și gestionarea plăților." },
        {
          type: "list",
          items: [
            "Facturare lunară sau anuală (anuală e mai ieftină).",
            "„Abonează-te” / „Schimbă” — alege sau schimbă planul.",
            "„Gestionează” — schimbă metoda de plată sau anulează abonamentul.",
          ],
        },
        {
          type: "note",
          text: "Plata se face în EUR. Pentru plata în altă monedă contactează suportul.",
        },
        { type: "h3", text: "Suport" },
        {
          type: "p",
          text: "Un chat integrat cu echipa noastră în timp real. Scrie un mesaj — răspundem chiar aici.",
        },
        { type: "h3", text: "Schimbarea și adăugarea restaurantelor" },
        {
          type: "p",
          text: "Dacă ai mai multe localuri, comutatorul de restaurant este sus în secțiunea „Setări”.",
        },
        {
          type: "steps",
          items: [
            "Deschide comutatorul de restaurante sus în „Setări”.",
            "„Adaugă restaurant” → introdu un nume.",
            "Alege „Duplică meniul și setările curente” (start rapid) sau „Începe de la zero” (un restaurant gol).",
            "Creează-l — și comută între restaurante oricând chiar aici.",
          ],
        },
      ],
    },
    {
      id: "public-menu",
      title: "10. Meniul public pentru clienți",
      blocks: [
        {
          type: "p",
          text: "Meniul public este ceea ce vede clientul după ce scanează codul QR. Se compune automat din meniul, brandingul și contactele tale.",
        },
        {
          type: "list",
          items: [
            "Adresa meniului se setează în Setări → Regiune („Linkul meniului”).",
            "Codul QR general și linkul meniului le obții cu butonul „Distribuie” pe pagina „Meniu”.",
            "Fiecare masă are propriul QR separat (Setări → Mese) care duce la meniul exact al acelei mese.",
            "Aspectul (fundal, culoare de accent, layout) se configurează în secțiunea „Site”.",
            "Butonul „Previzualizare” deschide meniul așa cum îl vede clientul.",
          ],
        },
        {
          type: "tip",
          text: "După orice modificare a meniului/setărilor apasă „Previzualizare” pentru a verifica cum arată pentru client.",
        },
      ],
    },
    {
      id: "faq",
      title: "11. Întrebări frecvente și detalii",
      blocks: [
        { type: "h3", text: "Clientul nu poate plasa o comandă" },
        {
          type: "p",
          text: "Verifică Setări → Comenzi → „Acceptă comenzi” (trebuie să fie activ) și că este selectat cel puțin un mod de comandă.",
        },
        { type: "h3", text: "Nu vin rezervări" },
        {
          type: "p",
          text: "Asigură-te că rezervările sunt activate în Setări → Rezervări, că există mese adăugate și că ziua nu e marcată „Închis” în program.",
        },
        { type: "h3", text: "Tableta nu se conectează" },
        {
          type: "p",
          text: "Codul e valabil 2 minute. Dacă a expirat — generează unul nou în Setări → Dispozitive. Dacă dispozitivul a fost revocat — creează un cod nou.",
        },
        { type: "h3", text: "Un preparat s-a terminat" },
        {
          type: "p",
          text: "Nu-l șterge — apasă „Ascunde preparatul”. Dispare din meniul public, iar îl readuci cu „Arată preparatul”.",
        },
        { type: "h3", text: "Ai nevoie de dispozitive/terminale dar nu le ai" },
        {
          type: "p",
          text: "Secțiunea „Dispozitive” este disponibilă pe un plan plătit sau în timpul unei perioade de probă active. Verifică Setări → Plată.",
        },
        { type: "h3", text: "Mai ai întrebări" },
        {
          type: "p",
          text: "Scrie-ne în Setări → Suport — este un chat integrat cu echipa noastră.",
        },
      ],
    },
  ],
};
