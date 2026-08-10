import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { OnboardingModalProvider } from "./onboarding/onboarding-modal-provider";
import { BrandSchema } from "./brand-schema";
import { LangAutoModal } from "./lang-auto-modal";

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
      <BrandSchema />
      <OnboardingModalProvider>{children}</OnboardingModalProvider>
      {/* After the page, not before: effects flush children-first, so this
          ordering guarantees PageTracker has published the page label before
          the modal fires its own events. It renders into a portal, so the
          position in the tree has no visual effect. */}
      <LangAutoModal />
    </NextIntlClientProvider>
  );
}
