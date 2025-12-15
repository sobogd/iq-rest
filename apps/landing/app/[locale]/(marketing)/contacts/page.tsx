import { useTranslations } from "next-intl";
import { ContactForm, HowToSteps } from "../_components";
import Image from "next/image";

export default function ContactsPage() {
  const t = useTranslations("contacts");

  return (
    <>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-6">
              {t("subtitle")}
            </p>
            <div className="flex justify-center">
              <div className="relative w-[150px] h-[150px] rounded-full overflow-hidden">
                <Image
                  src="/contacts.webp"
                  alt="Bogdan's photos"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </div>
      <HowToSteps noIndex />
    </>
  );
}
