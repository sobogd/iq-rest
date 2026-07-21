import { ConflictException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { MailService } from "../mail/mail.service";
import { OrdersEventsService } from "../orders-stream/orders-events.service";
import type { ReservationStatus } from "./dto";

// Allowed status transitions. cancelled/completed are terminal. Enforced
// server-side so a stale client (e.g. a host acting on a booking another
// device already cancelled) can't silently resurrect it — the guest already
// got the cancellation email; re-confirming would desync them.
const ALLOWED_TRANSITIONS: Record<ReservationStatus, ReservationStatus[]> = {
  pending: ["confirmed", "cancelled"],
  confirmed: ["completed", "cancelled"],
  cancelled: [],
  completed: [],
};

@Injectable()
export class ReservationsService {
  private readonly logger = new Logger(ReservationsService.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly mail: MailService,
    private readonly events: OrdersEventsService,
  ) {}

  async list(restaurantId: string) {
    // Bound the window so neither the admin calendar nor the reservation kiosk
    // pulls an unbounded history in one shot: everything from a year ago
    // forward covers normal month navigation plus all upcoming bookings, while
    // an always-on kiosk no longer re-loads the venue's entire booking history
    // on every slim-payload re-bootstrap. A row ceiling stays as a backstop for
    // pathological volumes (deeper past would need an explicit date range).
    const from = new Date();
    from.setFullYear(from.getFullYear() - 1);
    from.setHours(0, 0, 0, 0);
    return this.prisma.reservation.findMany({
      where: { restaurantId, date: { gte: from } },
      orderBy: [{ date: "desc" }, { startTime: "desc" }],
      take: 2000,
    });
  }

  // Re-fetch with the table relation the reservation kiosk expects, then push
  // it down the shared orders SSE channel so paired RESERVATION tablets update
  // live without polling.
  private async publishBookingUpdated(restaurantId: string, id: string) {
    const booking = await this.prisma.reservation.findUnique({
      where: { id },
      include: { table: { select: { number: true, zone: true } } },
    });
    if (!booking) return;
    await this.events
      .publish({ action: "booking-updated", restaurantId, booking })
      .catch((err) => this.logger.warn(`booking-updated publish failed: ${err?.message || err}`));
  }

  async setStatus(restaurantId: string, id: string, status: ReservationStatus) {
    const res = await this.prisma.reservation.findFirst({
      where: { id, restaurantId },
      include: { restaurant: { select: { title: true, defaultLanguage: true } }, table: { select: { number: true } } },
    });
    if (!res) throw new NotFoundException();

    // Idempotent: re-applying the current status is a no-op (don't re-email or
    // re-broadcast). Otherwise the transition must be allowed from where the
    // booking actually is now, not where the client thinks it is.
    const current = res.status as ReservationStatus;
    if (current === status) return res;
    if (!(ALLOWED_TRANSITIONS[current] ?? []).includes(status)) {
      throw new ConflictException(`Cannot change reservation from ${current} to ${status}`);
    }

    const updated = await this.prisma.reservation.update({ where: { id }, data: { status } });

    if ((status === "confirmed" || status === "cancelled") && res.status !== status && res.guestEmail) {
      const dateStr =
        res.date instanceof Date
          ? `${res.date.getUTCFullYear()}-${String(res.date.getUTCMonth() + 1).padStart(2, "0")}-${String(res.date.getUTCDate()).padStart(2, "0")}`
          : String(res.date);
      this.mail
        .sendReservationStatus({
          email: res.guestEmail,
          guestName: res.guestName,
          restaurantTitle: res.restaurant.title,
          date: dateStr,
          startTime: res.startTime,
          guestsCount: res.guestsCount,
          tableNumber: res.table?.number ?? null,
          status,
          locale: res.restaurant.defaultLanguage || "en",
        })
        .catch((err) => this.logger.warn(`reservation status email failed: ${err?.message || err}`));
    }

    await this.publishBookingUpdated(restaurantId, id);

    return updated;
  }

  async remove(restaurantId: string, id: string) {
    const res = await this.prisma.reservation.findFirst({
      where: { id, restaurantId },
    });
    if (!res) throw new NotFoundException();
    await this.prisma.reservation.delete({ where: { id } });
    await this.events
      .publish({ action: "booking-deleted", restaurantId, bookingId: id })
      .catch((err) => this.logger.warn(`booking-deleted publish failed: ${err?.message || err}`));
  }
}
