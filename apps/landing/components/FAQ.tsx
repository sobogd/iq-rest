"use client";

import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

interface FAQProps {
  noIndex?: boolean;
  showCTA?: boolean;
}

export default function FAQ({ noIndex = false, showCTA = false }: FAQProps) {
  const t = useTranslations("faq");
  const questions = t.raw("questions") as Array<{
    question: string;
    answer: string;
  }>;

  const howto = t.raw("howto") as {
    question: string;
    answer: string;
    steps: Array<{ name: string; text: string }>;
  };

  // FAQPage Schema for SEO
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };

  // HowTo Schema for step-by-step guide
  const howtoSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: howto.question,
    description: howto.answer,
    step: howto.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text
    }))
  };

  return (
    <>
      {!noIndex && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(howtoSchema) }}
          />
        </>
      )}
      <div className="w-full py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {t("title")}
            </h2>

            {/* HowTo Section */}
            <div className="mb-8 p-6 border rounded-lg bg-card">
              <h3 className="text-xl font-semibold mb-4">{howto.question}</h3>
              <p className="text-muted-foreground mb-6">{howto.answer}</p>
              <ol className="space-y-4">
                {howto.steps.map((step, index) => (
                  <li key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{step.name}</h4>
                      <p className="text-muted-foreground text-sm">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {questions.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {noIndex ? (
                      <span data-noindex="true">{item.question}</span>
                    ) : (
                      item.question
                    )}
                  </AccordionTrigger>
                  <AccordionContent>
                    {noIndex ? (
                      <span data-noindex="true">{item.answer}</span>
                    ) : (
                      item.answer
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
      {showCTA && (
        <div className="w-full py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold">
                {t("cta.title")}
              </h3>
              <p className="text-lg text-muted-foreground">
                {t("cta.subtitle")}
              </p>
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link href="/contacts">{t("cta.button")}</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
