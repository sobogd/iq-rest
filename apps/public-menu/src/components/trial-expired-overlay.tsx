// Blocking overlay when the restaurant's trial has expired. Renders text in
// the restaurant's default language. Hidden when ?preview=1.

import { useEffect } from "react";

const COPY: Record<string, { title: string; body: string }> = {
  ar: { title: "المطعم غير متاح حاليًا", body: "هذا المطعم غير متاح في الوقت الحالي. يرجى المحاولة لاحقًا." },
  bg: { title: "Ресторантът е недостъпен", body: "Този ресторант временно не е достъпен. Моля, опитайте по-късно." },
  ca: { title: "Restaurant no disponible", body: "Aquest restaurant no està disponible en aquests moments. Torneu-ho a provar més tard." },
  cs: { title: "Restaurace není dostupná", body: "Tato restaurace momentálně není dostupná. Zkuste to prosím později." },
  da: { title: "Restauranten er utilgængelig", body: "Denne restaurant er midlertidigt utilgængelig. Prøv igen senere." },
  de: { title: "Restaurant nicht verfügbar", body: "Dieses Restaurant ist derzeit nicht verfügbar. Bitte versuche es später erneut." },
  el: { title: "Το εστιατόριο δεν είναι διαθέσιμο", body: "Αυτό το εστιατόριο δεν είναι διαθέσιμο αυτή τη στιγμή. Δοκιμάστε ξανά αργότερα." },
  en: { title: "Restaurant unavailable", body: "This restaurant is currently unavailable. Please try again later." },
  es: { title: "Restaurante no disponible", body: "Este restaurante no está disponible en este momento. Inténtalo de nuevo más tarde." },
  et: { title: "Restoran ei ole saadaval", body: "See restoran ei ole praegu saadaval. Palun proovige hiljem uuesti." },
  fa: { title: "رستوران در دسترس نیست", body: "این رستوران در حال حاضر در دسترس نیست. لطفاً بعداً دوباره امتحان کنید." },
  fi: { title: "Ravintola ei ole käytettävissä", body: "Tämä ravintola ei ole tällä hetkellä käytettävissä. Yritä myöhemmin uudelleen." },
  fr: { title: "Restaurant indisponible", body: "Ce restaurant n'est pas disponible pour le moment. Veuillez réessayer plus tard." },
  ga: { title: "Bialann nach bhfuil ar fáil", body: "Níl an bhialann seo ar fáil faoi láthair. Bain triail eile as ar ball." },
  hr: { title: "Restoran nije dostupan", body: "Ovaj restoran trenutno nije dostupan. Pokušajte ponovno kasnije." },
  hu: { title: "Az étterem nem elérhető", body: "Ez az étterem jelenleg nem elérhető. Kérjük, próbáld újra később." },
  is: { title: "Veitingastaður ekki í boði", body: "Þessi veitingastaður er ekki í boði eins og er. Reyndu aftur síðar." },
  it: { title: "Ristorante non disponibile", body: "Questo ristorante non è disponibile al momento. Riprova più tardi." },
  ja: { title: "レストランをご利用いただけません", body: "現在このレストランはご利用いただけません。後ほど再度お試しください。" },
  ko: { title: "레스토랑을 이용할 수 없습니다", body: "현재 이 레스토랑을 이용할 수 없습니다. 나중에 다시 시도해 주세요." },
  lt: { title: "Restoranas nepasiekiamas", body: "Šis restoranas šiuo metu nepasiekiamas. Bandykite vėliau." },
  lv: { title: "Restorāns nav pieejams", body: "Šis restorāns pašlaik nav pieejams. Lūdzu, mēģiniet vēlāk." },
  nl: { title: "Restaurant niet beschikbaar", body: "Dit restaurant is momenteel niet beschikbaar. Probeer het later opnieuw." },
  no: { title: "Restauranten er utilgjengelig", body: "Denne restauranten er for øyeblikket ikke tilgjengelig. Prøv igjen senere." },
  pl: { title: "Restauracja niedostępna", body: "Ta restauracja jest obecnie niedostępna. Spróbuj ponownie później." },
  pt: { title: "Restaurante indisponível", body: "Este restaurante não está disponível no momento. Tente novamente mais tarde." },
  ro: { title: "Restaurantul nu este disponibil", body: "Acest restaurant nu este disponibil momentan. Încercați din nou mai târziu." },
  ru: { title: "Ресторан недоступен", body: "Этот ресторан временно недоступен. Пожалуйста, попробуйте позже." },
  sk: { title: "Reštaurácia nie je dostupná", body: "Táto reštaurácia momentálne nie je dostupná. Skúste to neskôr." },
  sl: { title: "Restavracija ni na voljo", body: "Ta restavracija trenutno ni na voljo. Poskusite znova pozneje." },
  sr: { title: "Ресторан није доступан", body: "Овај ресторан тренутно није доступан. Покушајте поново касније." },
  sv: { title: "Restaurangen är inte tillgänglig", body: "Den här restaurangen är för närvarande inte tillgänglig. Försök igen senare." },
  tr: { title: "Restoran kullanılamıyor", body: "Bu restoran şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin." },
  uk: { title: "Ресторан недоступний", body: "Цей ресторан наразі недоступний. Спробуйте пізніше." },
  zh: { title: "餐厅暂不可用", body: "该餐厅当前不可用，请稍后再试。" },
};

interface Props {
  defaultLanguage: string;
}

export function TrialExpiredOverlay({ defaultLanguage }: Props) {
  const params = new URLSearchParams(window.location.search);
  if (params.get("preview") === "1") return null;
  const copy = COPY[defaultLanguage] || COPY.en;

  // Lock body scroll while overlay is mounted.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-6 bg-black/60 backdrop-blur-xl"
      style={{ pointerEvents: "auto" }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="max-w-sm w-full text-center bg-white/95 rounded-2xl shadow-2xl p-6 select-none">
        <h1 className="text-xl font-bold text-black">{copy.title}</h1>
        <p className="mt-3 text-sm text-gray-700">{copy.body}</p>
      </div>
    </div>
  );
}
