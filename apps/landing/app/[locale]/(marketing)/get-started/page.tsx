import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { GetStartedForm } from "../_components";
import { JsonLd, createBreadcrumbSchema } from "../_lib";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "getStarted" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://iq-rest.com/${locale}/get-started`,
      languages: {
        en: "https://iq-rest.com/en/get-started",
        es: "https://iq-rest.com/es/get-started",
        "x-default": "https://iq-rest.com/en/get-started",
      },
    },
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      url: `https://iq-rest.com/${locale}/get-started`,
      type: "website",
      images: [
        {
          url: "https://iq-rest.com/og-image.png",
          width: 1200,
          height: 630,
          alt: "IQ Rest - QR Menu for Restaurants",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.title"),
      description: t("meta.description"),
      images: ["https://iq-rest.com/og-image.png"],
    },
  };
}

export default async function GetStartedPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  const t = await getTranslations("getStarted");

  if (session) {
    redirect(`/${locale}/dashboard`);
  }

  const breadcrumbSchema = createBreadcrumbSchema(locale, [
    { name: "Home", path: "" },
    { name: t("meta.title").replace(" - IQ Rest", "").replace(" | IQ Rest", "") },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)] py-8">
        <div className="w-full max-w-[1000px] mx-auto px-4">
          <GetStartedForm />
        </div>
      </div>
    </>
  );
}
