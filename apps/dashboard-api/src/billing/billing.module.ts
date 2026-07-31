import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { AdminGuard } from "../admin/admin.guard";
import { BillingController } from "./billing.controller";

// Provider-agnostic billing surface (billing-features-constructor): pricing
// catalog, quote, billing profile, invoices, SEPA request, admin flag/pricing
// edits. AdminGuard is provided locally (it injects AuthGuard from AuthModule).
@Module({
  imports: [AuthModule],
  controllers: [BillingController],
  providers: [AdminGuard],
})
export class BillingModule {}
