import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { DashboardContainer } from "@/components/dashboard-container";
import { ReservationsList } from "./reservations-list";
import { prisma } from "@/lib/prisma";
import { getUserCompanyId } from "@/lib/auth";

async function getReservations() {
  const companyId = await getUserCompanyId();
  if (!companyId) return [];

  const restaurant = await prisma.restaurant.findFirst({
    where: { companyId },
    select: { id: true },
  });

  if (!restaurant) return [];

  const reservations = await prisma.reservation.findMany({
    where: { restaurantId: restaurant.id },
    include: {
      table: {
        select: { number: true, zone: true },
      },
    },
    orderBy: [{ date: "desc" }, { startTime: "desc" }],
  });

  return reservations;
}

export default async function ReservationsPage() {
  const t = await getTranslations("reservations");
  const reservations = await getReservations();

  const translations = {
    tables: t("tables"),
    settings: t("settings"),
    noReservations: t("noReservations"),
    pending: t("pending"),
    confirmed: t("confirmed"),
    cancelled: t("cancelled"),
    completed: t("completed"),
    confirm: t("confirm"),
    reject: t("reject"),
    guests: t("guests"),
    date: t("date"),
    time: t("time"),
    guest: t("guest"),
    status: t("status"),
    notes: t("notes"),
  };

  return (
    <>
      {/* Sub-navigation */}
      <div className="border-b bg-background">
        <div className="px-6 max-w-lg md:mx-auto flex items-center gap-4 h-10">
          <Link
            href="/dashboard/reservations/tables"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {translations.tables}
          </Link>
          <Link
            href="/dashboard/settings#reservations"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {translations.settings}
          </Link>
        </div>
      </div>
      <DashboardContainer>
        <ReservationsList
          initialData={reservations}
          translations={translations}
        />
      </DashboardContainer>
    </>
  );
}
