import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { OnboardingModalProvider } from "./onboarding/onboarding-modal-provider";

/** Wraps landing-route children with NextIntlClientProvider + onboarding modal.
 *  Use from per-locale `app/<locale>/layout.tsx` since those routes sit outside
 *  the `[locale]` segment and don't inherit its providers. */
export async function LandingI18nWrap({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) {
  const messages = await getMessages({ locale });
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <OnboardingModalProvider>{children}</OnboardingModalProvider>
    </NextIntlClientProvider>
  );
}
