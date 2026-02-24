import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { MenuHeader, MenuPageWrapper } from "../../_components";
import { OrderSuccessContent } from "./success-content";

interface SuccessPageProps {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<{ preview?: string }>;
}

export default async function OrderSuccessPage({ params, searchParams }: SuccessPageProps) {
  const { slug, locale } = await params;
  const { preview } = await searchParams;
  const isPreview = preview === "1";

  const restaurant = await prisma.restaurant.findFirst({
    where: { slug },
    select: { accentColor: true, orderMode: true },
  });

  if (!restaurant) notFound();

  const t = await getTranslations("publicMenu");
  const showWhatsApp = restaurant.orderMode === "whatsapp" || restaurant.orderMode === "both";

  return (
    <MenuPageWrapper slug={slug}>
      <MenuHeader
        slug={slug}
        title={t("order.yourOrder")}
        sticky
        accentColor={restaurant.accentColor}
        isPreview={isPreview}
        backHref={`/m/${slug}${isPreview ? "?preview=1" : ""}`}
      />

      <main className="flex-1 flex items-center justify-center px-5 py-6 bg-white">
        <OrderSuccessContent
          accentColor={restaurant.accentColor}
          text={showWhatsApp ? t("order.sendWhatsApp") : t("order.orderReceived")}
        />
      </main>
    </MenuPageWrapper>
  );
}
