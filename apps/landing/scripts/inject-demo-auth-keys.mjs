// One-off: inject the unified-modal + demo auth keys into every messages/<loc>.json.
// Keys: auth.unifiedTitle, auth.unifiedSubtitle, auth.tryDemo, auth.tryDemoHint,
// auth.errors.demoFailed. Hand-authored translations per locale.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// [unifiedTitle, unifiedSubtitle, tryDemo, tryDemoHint, demoFailed]
const T = {
  en: ["Get started", "Sign in or create your account — no password needed.", "Try the live demo", "No email needed · data not saved", "Couldn't open the demo. Try again."],
  es: ["Empieza ahora", "Inicia sesión o crea tu cuenta — sin contraseña.", "Probar la demo", "Sin email · los datos no se guardan", "No se pudo abrir la demo. Inténtalo de nuevo."],
  de: ["Loslegen", "Anmelden oder Konto erstellen — kein Passwort nötig.", "Live-Demo testen", "Keine E-Mail · Daten werden nicht gespeichert", "Demo konnte nicht geöffnet werden. Erneut versuchen."],
  fr: ["Commencer", "Connectez-vous ou créez votre compte — sans mot de passe.", "Essayer la démo", "Sans e-mail · données non enregistrées", "Impossible d'ouvrir la démo. Réessayez."],
  it: ["Inizia ora", "Accedi o crea il tuo account — senza password.", "Prova la demo", "Senza email · i dati non vengono salvati", "Impossibile aprire la demo. Riprova."],
  pt: ["Começar", "Entre ou crie a sua conta — sem palavra-passe.", "Experimentar a demo", "Sem email · os dados não são guardados", "Não foi possível abrir a demo. Tente novamente."],
  nl: ["Aan de slag", "Log in of maak een account — geen wachtwoord nodig.", "Probeer de demo", "Geen e-mail · gegevens niet opgeslagen", "Kan de demo niet openen. Probeer opnieuw."],
  pl: ["Zacznij teraz", "Zaloguj się lub załóż konto — bez hasła.", "Wypróbuj demo", "Bez e-maila · dane nie są zapisywane", "Nie udało się otworzyć demo. Spróbuj ponownie."],
  ru: ["Начать", "Войдите или создайте аккаунт — без пароля.", "Открыть демо", "Без email · данные не сохраняются", "Не удалось открыть демо. Попробуйте снова."],
  uk: ["Почати", "Увійдіть або створіть акаунт — без пароля.", "Відкрити демо", "Без email · дані не зберігаються", "Не вдалося відкрити демо. Спробуйте ще раз."],
  sv: ["Kom igång", "Logga in eller skapa ett konto — inget lösenord behövs.", "Testa demon", "Ingen e-post · data sparas inte", "Det gick inte att öppna demon. Försök igen."],
  da: ["Kom i gang", "Log ind eller opret en konto — ingen adgangskode nødvendig.", "Prøv demoen", "Ingen e-mail · data gemmes ikke", "Kunne ikke åbne demoen. Prøv igen."],
  no: ["Kom i gang", "Logg inn eller opprett en konto — ingen passord nødvendig.", "Prøv demoen", "Ingen e-post · data lagres ikke", "Kunne ikke åpne demoen. Prøv igjen."],
  fi: ["Aloita", "Kirjaudu sisään tai luo tili — ei salasanaa.", "Kokeile demoa", "Ei sähköpostia · tietoja ei tallenneta", "Demon avaaminen epäonnistui. Yritä uudelleen."],
  cs: ["Začít", "Přihlaste se nebo si vytvořte účet — bez hesla.", "Vyzkoušet demo", "Bez e-mailu · data se neukládají", "Demo se nepodařilo otevřít. Zkuste to znovu."],
  el: ["Ξεκινήστε", "Συνδεθείτε ή δημιουργήστε λογαριασμό — χωρίς κωδικό.", "Δοκιμάστε το demo", "Χωρίς email · τα δεδομένα δεν αποθηκεύονται", "Δεν ήταν δυνατό το άνοιγμα του demo. Δοκιμάστε ξανά."],
  tr: ["Başla", "Giriş yap veya hesap oluştur — şifre gerekmez.", "Demoyu dene", "E-posta gerekmez · veriler kaydedilmez", "Demo açılamadı. Tekrar deneyin."],
  ro: ["Începe", "Conectează-te sau creează un cont — fără parolă.", "Încearcă demo", "Fără e-mail · datele nu se salvează", "Demo nu a putut fi deschis. Încearcă din nou."],
  hu: ["Kezdjük", "Jelentkezz be vagy hozz létre fiókot — jelszó nélkül.", "Demó kipróbálása", "Nincs e-mail · az adatok nem mentődnek", "A demó megnyitása nem sikerült. Próbáld újra."],
  bg: ["Започнете", "Влезте или създайте акаунт — без парола.", "Опитайте демото", "Без имейл · данните не се запазват", "Демото не можа да се отвори. Опитайте отново."],
  hr: ["Započnite", "Prijavite se ili izradite račun — bez lozinke.", "Isprobaj demo", "Bez e-pošte · podaci se ne spremaju", "Demo nije moguće otvoriti. Pokušajte ponovno."],
  sk: ["Začať", "Prihláste sa alebo si vytvorte účet — bez hesla.", "Vyskúšať demo", "Bez e-mailu · údaje sa neukladajú", "Demo sa nepodarilo otvoriť. Skúste znova."],
  sl: ["Začnite", "Prijavite se ali ustvarite račun — brez gesla.", "Preizkusi demo", "Brez e-pošte · podatki se ne shranijo", "Demota ni bilo mogoče odpreti. Poskusite znova."],
  et: ["Alusta", "Logi sisse või loo konto — parooli pole vaja.", "Proovi demo", "E-posti pole vaja · andmeid ei salvestata", "Demo avamine ebaõnnestus. Proovi uuesti."],
  lv: ["Sākt", "Piesakieties vai izveidojiet kontu — bez paroles.", "Izmēģināt demo", "Bez e-pasta · dati netiek saglabāti", "Neizdevās atvērt demo. Mēģiniet vēlreiz."],
  lt: ["Pradėti", "Prisijunkite arba sukurkite paskyrą — be slaptažodžio.", "Išbandyti demo", "Nereikia el. pašto · duomenys neišsaugomi", "Nepavyko atidaryti demo. Bandykite dar kartą."],
  sr: ["Почните", "Пријавите се или направите налог — без лозинке.", "Испробај демо", "Без имејла · подаци се не чувају", "Демо није могуће отворити. Покушајте поново."],
  ca: ["Comença", "Inicia la sessió o crea el teu compte — sense contrasenya.", "Prova la demo", "Sense correu · les dades no es desen", "No s'ha pogut obrir la demo. Torna-ho a provar."],
  ga: ["Tosaigh", "Sínigh isteach nó cruthaigh cuntas — gan pasfhocal.", "Bain triail as an taispeántas", "Gan ríomhphost · ní shábháiltear sonraí", "Níorbh fhéidir an taispeántas a oscailt. Bain triail eile."],
  is: ["Byrja", "Skráðu þig inn eða stofnaðu reikning — ekkert lykilorð.", "Prófa kynningu", "Enginn tölvupóstur · gögn eru ekki vistuð", "Ekki tókst að opna kynninguna. Reyndu aftur."],
  fa: ["شروع کنید", "وارد شوید یا حساب بسازید — بدون رمز عبور.", "نسخه نمایشی را امتحان کنید", "بدون ایمیل · داده‌ها ذخیره نمی‌شوند", "باز کردن نسخه نمایشی ممکن نشد. دوباره تلاش کنید."],
  ar: ["ابدأ الآن", "سجّل الدخول أو أنشئ حسابك — بدون كلمة مرور.", "جرّب النسخة التجريبية", "بدون بريد إلكتروني · لا يتم حفظ البيانات", "تعذّر فتح النسخة التجريبية. حاول مرة أخرى."],
  ja: ["始めましょう", "ログインまたはアカウント作成 — パスワード不要。", "デモを試す", "メール不要 · データは保存されません", "デモを開けませんでした。もう一度お試しください。"],
  ko: ["시작하기", "로그인하거나 계정을 만드세요 — 비밀번호 불필요.", "데모 사용해보기", "이메일 불필요 · 데이터는 저장되지 않음", "데모를 열 수 없습니다. 다시 시도하세요."],
  zh: ["开始使用", "登录或创建账户 — 无需密码。", "试用演示", "无需邮箱 · 数据不会保存", "无法打开演示，请重试。"],
};

let touched = 0;
for (const [loc, [unifiedTitle, unifiedSubtitle, tryDemo, tryDemoHint, demoFailed]] of Object.entries(T)) {
  const file = join(root, "messages", `${loc}.json`);
  const json = JSON.parse(readFileSync(file, "utf8"));
  json.auth = json.auth || {};
  json.auth.unifiedTitle = unifiedTitle;
  json.auth.unifiedSubtitle = unifiedSubtitle;
  json.auth.tryDemo = tryDemo;
  json.auth.tryDemoHint = tryDemoHint;
  json.auth.errors = json.auth.errors || {};
  json.auth.errors.demoFailed = demoFailed;
  writeFileSync(file, JSON.stringify(json, null, 2) + "\n", "utf8");
  touched++;
}
console.log(`injected demo/unified auth keys into ${touched} locale files`);
