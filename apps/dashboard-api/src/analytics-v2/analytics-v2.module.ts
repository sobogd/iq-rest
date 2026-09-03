import { Module } from "@nestjs/common";
import { TrackV2Controller } from "./track-v2.controller";
import { VisitorIdentityService } from "./identity.service";
import { IngestRelayService } from "./ingest-relay.service";

// Analytics relay for the whole product (landing + dashboard): resolves who's
// behind the request from this app's own cookies/DB (VisitorIdentityService,
// unchanged), then forwards the event batch to the standalone iq-metrix
// service (IngestRelayService), which owns the hashing/session/storage this
// module used to do itself.
@Module({
  controllers: [TrackV2Controller],
  providers: [VisitorIdentityService, IngestRelayService],
})
export class AnalyticsV2Module {}
