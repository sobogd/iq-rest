import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";

interface HowToStepsProps {
  noIndex?: boolean;
}

interface HowToData {
  question: string;
  answer: string;
  steps: Array<{ name: string; text: string; icon?: string }>;
}

export async function HowToSteps({ noIndex = false }: HowToStepsProps) {
  const t = await getTranslations("faq");
  const howto = t.raw("howto") as HowToData;

  // Show first 4 steps for the "4 easy steps" title
  const displaySteps = howto.steps.slice(0, 4);

  const howtoSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: howto.question,
    description: howto.answer,
    step: displaySteps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };

  return (
    <>
      {!noIndex && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howtoSchema) }}
        />
      )}
      <div className="w-full py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2
                className="text-3xl md:text-4xl font-bold mb-4"
                data-noindex={noIndex ? "true" : undefined}
              >
                {howto.question}
              </h2>
              <p
                className="text-lg text-muted-foreground"
                data-noindex={noIndex ? "true" : undefined}
              >
                {howto.answer}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {displaySteps.map((step, index) => (
                <div
                  key={index}
                  className="p-6 border rounded-lg bg-card hover:shadow-lg transition-shadow"
                  data-noindex={noIndex ? "true" : undefined}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{step.name}</h3>
                      <p className="text-muted-foreground">{step.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center p-8 border rounded-lg bg-card">
              <h3 className="text-2xl font-bold mb-3">{t("howto.faqTitle")}</h3>
              <p className="text-lg text-muted-foreground mb-6">
                {t("howto.faqDescription")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/faq">{t("howto.faqButton")}</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/contacts">{t("howto.contactButton")}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
