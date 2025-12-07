import { getTranslations } from "next-intl/server";
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
    <DashboardContainer>
      <ReservationsList
        initialData={reservations}
        translations={translations}
      />
    </DashboardContainer>
  );
}
