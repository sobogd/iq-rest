import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { StripeController } from "./stripe.controller";
import { StripeReconcileService } from "./stripe-reconcile.service";

@Module({
  imports: [AuthModule],
  controllers: [StripeController],
  providers: [StripeReconcileService],
})
export class StripeModule {}
