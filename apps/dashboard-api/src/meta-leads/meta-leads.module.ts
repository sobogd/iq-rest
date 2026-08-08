import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { MailModule } from "../mail/mail.module";
import { OnboardingSeedModule } from "../onboarding/onboarding-seed.module";
import { MetaLeadsController } from "./meta-leads.controller";
import { MetaLeadsService } from "./meta-leads.service";

@Module({
  imports: [AuthModule, MailModule, OnboardingSeedModule],
  controllers: [MetaLeadsController],
  providers: [MetaLeadsService],
})
export class MetaLeadsModule {}
