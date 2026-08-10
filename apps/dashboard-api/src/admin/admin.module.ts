import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { MailModule } from "../mail/mail.module";
import { DevicesModule } from "../devices/devices.module";
import { RestaurantModule } from "../restaurant/restaurant.module";
import { OnboardingSeedModule } from "../onboarding/onboarding-seed.module";
import { AdminController } from "./admin.controller";
import { AnalyticsV2AdminController } from "./analytics-v2.controller";
import { AdminGuard } from "./admin.guard";
import { AdminLeadsService } from "./leads.service";

@Module({
  imports: [AuthModule, MailModule, DevicesModule, RestaurantModule, OnboardingSeedModule],
  controllers: [AdminController, AnalyticsV2AdminController],
  providers: [AdminGuard, AdminLeadsService],
})
export class AdminModule {}
