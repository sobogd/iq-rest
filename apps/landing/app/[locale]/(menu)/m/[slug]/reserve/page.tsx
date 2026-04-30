import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ReserveForm } from "./reserve-form";
import { MenuHeader, MenuPageWrapper } from "../_components";
import { getRestaurantBySlug } from "../_lib/get-restaurant";

export const revalidate = 300;

interface ReservePageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
  searchParams: Promise<{ preview?: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const restaurant = await getRestaurantBySlug(slug);

  if (!restaurant) return {};

  const title = `${restaurant.title} — Reserve`;
  return {
    title,
    description: title,
    openGraph: { title, description: title },
  };
}

export default async function ReservePage({ params, searchParams }: ReservePageProps) {
  const { slug, locale } = await params;
  const { preview } = await searchParams;
  const isPreview = preview === "1";
  const [restaurant, t] = await Promise.all([
    getRestaurantBySlug(slug),
    getTranslations("publicReserve"),
  ]);

  if (!restaurant) {
    notFound();
  }

  if (!restaurant.reservationsEnabled) {
    redirect(`/${locale}/m/${slug}`);
  }

  if (restaurant._count.tables === 0) {
    redirect(`/${locale}/m/${slug}`);
  }

  const translations = {
    title: t("title"),
    selectDate: t("selectDate"),
    selectTime: t("selectTime"),
    selectGuests: t("selectGuests"),
    selectTable: t("selectTable"),
    yourDetails: t("yourDetails"),
    name: t("name"),
    namePlaceholder: t("namePlaceholder"),
    email: t("email"),
    emailPlaceholder: t("emailPlaceholder"),
    notes: t("notes"),
    notesPlaceholder: t("notesPlaceholder"),
    submit: t("submit"),
    submitting: t("submitting"),
    success: t("success"),
    successAuto: t("successAuto"),
    successManual: t("successManual"),
    error: t("error"),
    guests: t("guests"),
    table: t("table"),
    capacity: t("capacity"),
    noAvailableTables: t("noAvailableTables"),
    noTimeSlotsAvailable: t("noTimeSlotsAvailable"),
    loadingAvailability: t("loadingAvailability"),
  };

  return (
    <MenuPageWrapper>
      {/* Header */}
      <MenuHeader slug={slug} title={translations.title} sticky accentColor={restaurant.accentColor} isPreview={isPreview} />

      {/* Content */}
      <main className="flex-1 flex justify-center px-5 py-6 bg-white overflow-auto">
        <div className="max-w-[440px] w-full">
          <ReserveForm
            restaurantId={restaurant.id}
            slotMinutes={restaurant.reservationSlotMinutes}
            mode={restaurant.reservationMode}
            accentColor={restaurant.accentColor}
            translations={translations}
            slug={slug}
            locale={locale}
          />
        </div>
      </main>
    </MenuPageWrapper>
  );
}
