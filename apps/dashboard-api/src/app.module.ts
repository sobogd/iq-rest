import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerModule, ThrottlerGuard } from "@nestjs/throttler";
import { ScheduleModule } from "@nestjs/schedule";
import { APP_GUARD } from "@nestjs/core";
import { I18nModule } from "./i18n/i18n.module";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { MailModule } from "./mail/mail.module";
import { RestaurantModule } from "./restaurant/restaurant.module";
import { CategoriesModule } from "./categories/categories.module";
import { ItemsModule } from "./items/items.module";
import { TablesModule } from "./tables/tables.module";
import { ReservationsModule } from "./reservations/reservations.module";
import { OrdersModule } from "./orders/orders.module";
import { OrdersStreamModule } from "./orders-stream/orders-stream.module";
import { DevicesModule } from "./devices/devices.module";
import { UploadModule } from "./upload/upload.module";
import { TranslateModule } from "./translate/translate.module";
import { SupportModule } from "./support/support.module";
import { StripeModule } from "./stripe/stripe.module";
import { BillingModule } from "./billing/billing.module";
import { GeoModule } from "./geo/geo.module";
import { AnalyticsModule } from "./analytics/analytics.module";
import { AdminModule } from "./admin/admin.module";
import { ScanMenuModule } from "./scan-menu/scan-menu.module";
import { InboxModule } from "./inbox/inbox.module";
import { HealthController } from "./health/health.controller";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot({
      // The guard only ever iterates the throttlers declared here, and a
      // @Throttle override is matched to one of them BY NAME — an override for
      // a name that is missing from this list is silently ignored. "burst" and
      // "sustained" exist so the per-route limits on the analytics ingest route
      // actually apply.
      throttlers: [
        { name: "default", ttl: 60_000, limit: 600 },
        { name: "burst", ttl: 1_000, limit: 10_000 },
        { name: "sustained", ttl: 60_000, limit: 10_000 },
      ],
      // We sit behind nginx (and Cloudflare), and express `trust proxy` is
      // deliberately left off — turning it on would also change req.protocol
      // and the secure-cookie logic. Without a tracker of our own every caller
      // in the world would share one bucket keyed on the proxy's address, which
      // turns any busy minute into a global 429.
      getTracker: (req: Record<string, unknown>) => {
        const headers = (req.headers ?? {}) as Record<string, string | string[] | undefined>;
        const raw =
          (headers["cf-connecting-ip"] as string | undefined) ||
          (headers["x-forwarded-for"] as string | undefined) ||
          (req.ip as string | undefined) ||
          "";
        return raw.split(",")[0]?.trim() || "unknown";
      },
    }),
    I18nModule,
    PrismaModule,
    MailModule,
    AuthModule,
    RestaurantModule,
    CategoriesModule,
    ItemsModule,
    TablesModule,
    ReservationsModule,
    OrdersModule,
    OrdersStreamModule,
    DevicesModule,
    UploadModule,
    TranslateModule,
    SupportModule,
    StripeModule,
    BillingModule,
    GeoModule,
    AnalyticsModule,
    AdminModule,
    ScanMenuModule,
    InboxModule,
  ],
  controllers: [HealthController],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
