import { Controller, Get, Post, Query, Req, Res, Logger } from "@nestjs/common";
import type { Request, Response } from "express";
import { createHmac, timingSafeEqual } from "crypto";
import { MetaLeadsService } from "./meta-leads.service";

/** Public Meta Lead Ads webhook (object "page", field "leadgen"). GET = Meta's
 *  verification handshake; POST = lead delivery. No AuthGuard (Meta calls it) —
 *  POST is protected by the X-Hub-Signature-256 HMAC over the raw body. Mirrors
 *  the WhatsApp webhook next door. */
@Controller("meta-leads")
export class MetaLeadsController {
  private readonly logger = new Logger(MetaLeadsController.name);

  constructor(private readonly leads: MetaLeadsService) {}

  @Get("webhook")
  verify(
    @Query("hub.mode") mode: string,
    @Query("hub.verify_token") token: string,
    @Query("hub.challenge") challenge: string,
    @Res() res: Response,
  ) {
    if (mode === "subscribe" && token && token === this.leads.verifyToken) {
      res.status(200).send(challenge);
      return;
    }
    res.status(403).send("forbidden");
  }

  @Post("webhook")
  async receive(@Req() req: Request, @Res() res: Response) {
    // Always 200 fast so Meta doesn't retry; process inline but guard errors.
    if (!this.verifySignature(req)) {
      res.status(401).send("bad signature");
      return;
    }
    res.status(200).send("ok");
    try {
      await this.handlePayload(req.body as WebhookBody);
    } catch (e) {
      this.logger.error(`leadgen webhook processing failed: ${String(e)}`);
    }
  }

  private verifySignature(req: Request): boolean {
    const secret = this.leads.appSecret;
    // If no secret configured (e.g. local/demo), don't hard-fail.
    if (!secret) return true;
    const header = req.headers["x-hub-signature-256"];
    const raw = (req as Request & { rawBody?: Buffer }).rawBody;
    if (typeof header !== "string" || !raw) return false;
    const expected = "sha256=" + createHmac("sha256", secret).update(raw).digest("hex");
    const a = Buffer.from(header);
    const b = Buffer.from(expected);
    return a.length === b.length && timingSafeEqual(a, b);
  }

  private async handlePayload(body: WebhookBody): Promise<void> {
    for (const entry of body?.entry ?? []) {
      for (const change of entry.changes ?? []) {
        if (change.field !== "leadgen") continue;
        const id = change.value?.leadgen_id;
        if (id) await this.leads.processLead(String(id));
      }
    }
  }
}

interface WebhookBody {
  entry?: Array<{
    changes?: Array<{
      field?: string;
      value?: { leadgen_id?: string | number };
    }>;
  }>;
}
