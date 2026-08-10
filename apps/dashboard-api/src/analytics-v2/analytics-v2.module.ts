import { Module } from "@nestjs/common";
import { AnalyticsSaltService } from "./salt.service";
import { TrackV2Controller } from "./track-v2.controller";
import { ConversionV2Service } from "./conversion-v2.service";
import { VisitService } from "./visit.service";
import { VisitorIdentityService } from "./identity.service";

// Cookieless analytics for the whole product (landing + dashboard): salt-hash
// visits, per-event venue attribution, instant registration conversions.
// See packages/db schema comments for the privacy model.
@Module({
  controllers: [TrackV2Controller],
  providers: [AnalyticsSaltService, ConversionV2Service, VisitService, VisitorIdentityService],
  exports: [ConversionV2Service],
})
export class AnalyticsV2Module {}
