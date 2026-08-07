import { Module } from "@nestjs/common";
import { MailModule } from "../mail/mail.module";
import { MetaLeadsController } from "./meta-leads.controller";
import { MetaLeadsService } from "./meta-leads.service";

@Module({
  imports: [MailModule],
  controllers: [MetaLeadsController],
  providers: [MetaLeadsService],
})
export class MetaLeadsModule {}
