import { Controller, Get, Post, Query, Req, Res, Logger } from "@nestjs/common";
import type { Request, Response } from "express";
import { createHmac, timingSafeEqual } from "crypto";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { PrismaService } from "../prisma/prisma.service";
import { WhatsappService } from "./whatsapp.service";
import { detectAndTranslateToRu } from "../common/gemini-translate";
import { s3Client, s3Bucket, s3Key, getPublicUrl } from "../upload/s3";

// WhatsApp media message types we ingest (everything but plain text).
const MEDIA_TYPES = ["image", "video", "audio", "document", "sticker"] as const;
type MediaType = (typeof MEDIA_TYPES)[number];

interface IngestedMedia {
  url: string;
  type: MediaType;
  mime: string | null;
  name: string | null;
}

/** Public WhatsApp Cloud API webhook. GET = Meta's verification handshake;
 *  POST = inbound message delivery. No AuthGuard (Meta calls it) — POST is
 *  protected by the X-Hub-Signature-256 HMAC over the raw body. */
@Controller("whatsapp")
export class WhatsappController {
  private readonly logger = new Logger(WhatsappController.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly wa: WhatsappService,
  ) {}

  // Meta verification: echo hub.challenge when the verify token matches.
  @Get("webhook")
  verify(
    @Query("hub.mode") mode: string,
    @Query("hub.verify_token") token: string,
    @Query("hub.challenge") challenge: string,
    @Res() res: Response,
  ) {
    if (mode === "subscribe" && token && token === this.wa.verifyToken) {
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
      this.logger.error(`WhatsApp webhook processing failed: ${String(e)}`);
    }
  }

  private verifySignature(req: Request): boolean {
    const secret = this.wa.appSecret;
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
        const value = change.value;
        const profileName = value?.contacts?.[0]?.profile?.name ?? null;
        for (const msg of value?.messages ?? []) {
          if (msg.type === "text") {
            if (!msg.text?.body) continue;
            await this.ingest(msg.from, profileName, msg.id, msg.text.body, null);
            continue;
          }
          if ((MEDIA_TYPES as readonly string[]).includes(msg.type)) {
            const media = await this.ingestMedia(msg);
            // Media carries an optional caption; images/videos/documents may.
            const caption = this.mediaOf(msg)?.caption ?? "";
            await this.ingest(msg.from, profileName, msg.id, caption, media);
          }
        }
      }
    }
  }

  private mediaOf(msg: WebhookMessage): WebhookMedia | undefined {
    return (
      msg.image || msg.video || msg.audio || msg.document || msg.sticker || undefined
    );
  }

  /** Download a WhatsApp media object, store it in S3, return its public URL. */
  private async ingestMedia(msg: WebhookMessage): Promise<IngestedMedia | null> {
    const type = msg.type as MediaType;
    const m = this.mediaOf(msg);
    if (!m?.id) return null;
    try {
      const resolved = await this.wa.getMediaUrl(m.id);
      if (!resolved) return null;
      const buf = await this.wa.downloadMedia(resolved.url);
      if (!buf) return null;
      const mime = m.mime_type || resolved.mime || null;
      const ext = mimeExt(mime) || "bin";
      const key = s3Key("inbox", msg.from, `${msg.id}.${ext}`);
      await s3Client.send(
        new PutObjectCommand({
          Bucket: s3Bucket,
          Key: key,
          Body: buf,
          ContentType: mime || "application/octet-stream",
          ACL: "public-read",
        }),
      );
      return { url: getPublicUrl(key), type, mime, name: m.filename || null };
    } catch (e) {
      this.logger.warn(`WhatsApp media ingest failed (${msg.id}): ${String(e)}`);
      return null;
    }
  }

  private async ingest(
    fromPhone: string,
    name: string | null,
    wamid: string,
    text: string,
    media: IngestedMedia | null,
  ): Promise<void> {
    const contact = await this.prisma.inboxContact.upsert({
      where: { channel_externalId: { channel: "whatsapp", externalId: fromPhone } },
      update: { lastMessageAt: new Date(), ...(name ? { name } : {}) },
      create: { channel: "whatsapp", externalId: fromPhone, name, lastMessageAt: new Date() },
    });

    // Translate any text/caption to Russian (best-effort); remember the language.
    let lang: string | null = null;
    let ru: string | null = null;
    if (text.trim()) {
      try {
        const t = await detectAndTranslateToRu(text);
        lang = t.lang;
        ru = t.ru;
        if (lang && lang !== contact.lang) {
          await this.prisma.inboxContact.update({ where: { id: contact.id }, data: { lang } });
        }
      } catch (e) {
        this.logger.warn(`translate-to-ru failed for ${fromPhone}: ${String(e)}`);
      }
    }

    await this.prisma.inboxMessage.create({
      data: {
        contactId: contact.id,
        direction: "in",
        body: text,
        lang: lang ?? contact.lang,
        translatedRu: ru,
        mediaUrl: media?.url ?? null,
        mediaType: media?.type ?? null,
        mediaMime: media?.mime ?? null,
        mediaName: media?.name ?? null,
        externalId: wamid,
        status: "received",
      },
    });
  }
}

/** Map a MIME type to a file extension for the stored S3 key. */
function mimeExt(mime: string | null | undefined): string | null {
  if (!mime) return null;
  const base = mime.split(";")[0].trim().toLowerCase();
  const map: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
    "video/mp4": "mp4",
    "video/3gpp": "3gp",
    "audio/ogg": "ogg",
    "audio/mpeg": "mp3",
    "audio/mp4": "m4a",
    "audio/amr": "amr",
    "application/pdf": "pdf",
  };
  if (map[base]) return map[base];
  const slash = base.indexOf("/");
  return slash >= 0 ? base.slice(slash + 1) : null;
}

interface WebhookMedia {
  id?: string;
  mime_type?: string;
  caption?: string;
  filename?: string;
}

interface WebhookMessage {
  from: string;
  id: string;
  type: string;
  text?: { body?: string };
  image?: WebhookMedia;
  video?: WebhookMedia;
  audio?: WebhookMedia;
  document?: WebhookMedia;
  sticker?: WebhookMedia;
}

interface WebhookBody {
  entry?: Array<{
    changes?: Array<{
      value?: {
        contacts?: Array<{ profile?: { name?: string } }>;
        messages?: Array<WebhookMessage>;
      };
    }>;
  }>;
}
