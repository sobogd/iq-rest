import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";
import type { Request } from "express";
import { Prisma } from "@iq-rest/db";
import { PrismaService } from "../prisma/prisma.service";
import { AdminGuard } from "../admin/admin.guard";
import type { AuthedRequest } from "../auth/auth.guard";
import { MailService } from "../mail/mail.service";
import { WhatsappService } from "./whatsapp.service";
import { translateText } from "../common/gemini-translate";
import { s3Client, s3Bucket, s3Key, getPublicUrl } from "../upload/s3";

const INBOX_MAX_UPLOAD_BYTES = 90 * 1024 * 1024; // WhatsApp allows up to 100 MB documents

/** Unified admin inbox: WhatsApp contacts + internal support threads, both
 *  opened and answered here. WhatsApp threads carry the auto-translation flow;
 *  internal threads write to support_messages and email the restaurant owner.
 *  Opening a thread marks it read (per-thread `inbox_reads` marker); the
 *  half-hourly digest cron (InboxNotifyService) emails when anything is unread. */
@Controller("admin/inbox")
@UseGuards(AdminGuard)
export class InboxController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly wa: WhatsappService,
    private readonly mail: MailService,
  ) {}

  @Get("config")
  config() {
    return { whatsapp: this.wa.isConfigured() };
  }

  /** Upload an outbound attachment (any type) to S3 and return a public URL the
   *  WhatsApp Cloud API can fetch. Separate from the menu-photo /upload endpoint
   *  because that one only accepts images/videos and re-encodes images. */
  @Post("upload")
  @UseInterceptors(FileInterceptor("file", { limits: { fileSize: INBOX_MAX_UPLOAD_BYTES } }))
  async upload(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException("No file provided");
    const srcMime = file.mimetype || "application/octet-stream";
    const type: OutMediaType = srcMime.startsWith("image/")
      ? "image"
      : srcMime.startsWith("video/")
        ? "video"
        : srcMime.startsWith("audio/")
          ? "audio"
          : "document";

    // WhatsApp only accepts image/jpeg and image/png as image messages — iPhone
    // HEIC/HEIF and webp get accepted by the API but silently never delivered.
    // Normalise every image to JPEG so it always arrives.
    let body: Buffer = file.buffer;
    let mime = srcMime;
    let ext = file.originalname.split(".").pop()?.toLowerCase() || srcMime.split("/")[1] || "bin";
    if (type === "image" && srcMime !== "image/png") {
      try {
        body = await sharp(file.buffer).rotate().jpeg({ quality: 85 }).toBuffer();
        mime = "image/jpeg";
        ext = "jpg";
      } catch (e) {
        throw new BadRequestException(`Unsupported image: ${String(e)}`);
      }
    }

    const timestamp = Date.now();
    const rand = Math.random().toString(36).substring(2, 8);
    const key = s3Key("inbox", "out", `${timestamp}-${rand}.${ext}`);
    await s3Client.send(
      new PutObjectCommand({
        Bucket: s3Bucket,
        Key: key,
        Body: body,
        ContentType: mime,
        ACL: "public-read",
      }),
    );
    return { url: getPublicUrl(key), type, mime, name: file.originalname || null };
  }

  /** Unified thread list, newest activity first. filter: all | watched | new | muted. */
  @Get("threads")
  async threads(@Query("filter") filter?: string) {
    const f =
      filter === "watched" || filter === "new" || filter === "muted" ? filter : "all";

    // Read markers + last inbound timestamps drive the unread flag.
    const reads = await this.prisma.inboxRead.findMany();
    const readMap = new Map(reads.map((r) => [r.threadId, r.readAt]));

    // WhatsApp threads.
    const contacts = await this.prisma.inboxContact.findMany({
      where: {
        channel: "whatsapp",
        ...(f === "watched" ? { watched: true, muted: false } : {}),
        // "new" surfaces non-muted contacts not yet curated (watch/mute).
        ...(f === "new" ? { watched: false, muted: false } : {}),
        ...(f === "muted" ? { muted: true } : {}),
        ...(f === "all" ? { muted: false } : {}),
      },
      orderBy: { lastMessageAt: "desc" },
      take: 200,
      include: {
        messages: { orderBy: { createdAt: "desc" }, take: 1 },
      },
    });
    // Last inbound time per WhatsApp contact (for unread detection).
    const waLastIn = await this.prisma.inboxMessage.groupBy({
      by: ["contactId"],
      where: { direction: "in" },
      _max: { createdAt: true },
    });
    const waLastInMap = new Map(waLastIn.map((g) => [g.contactId, g._max.createdAt]));
    const waThreads = contacts.map((c) => {
      const last = c.messages[0];
      const lastIn = waLastInMap.get(c.id);
      const readAt = readMap.get(`wa:${c.id}`);
      return {
        id: `wa:${c.id}`,
        channel: "whatsapp" as const,
        contactId: c.id,
        // Display priority: admin's custom name → WhatsApp profile name → phone.
        name: c.customName || c.name || c.externalId,
        customName: c.customName,
        externalId: c.externalId,
        lang: c.lang,
        watched: c.watched,
        muted: c.muted,
        unread: !!lastIn && (!readAt || lastIn > readAt),
        lastAt: c.lastMessageAt.toISOString(),
        lastPreview: last ? (last.translatedRu || last.body || (last.mediaType ? `📎 ${last.mediaType}` : "")) : "",
        lastFromMe: last ? last.direction === "out" : false,
      };
    });

    // Internal support threads (only on the unfiltered/all view to keep it simple).
    let internalThreads: Array<Record<string, unknown>> = [];
    if (f === "all") {
      type Row = {
        rid: string;
        title: string;
        lang: string | null;
        last_at: Date;
        last_in: Date | null;
        last_msg: string;
        last_admin: boolean;
      };
      const rows = await this.prisma.$queryRaw<Row[]>(Prisma.sql`
        SELECT sm."restaurantId" AS rid, r.title, r."defaultLanguage" AS lang,
               max(sm."createdAt") AS last_at,
               max(sm."createdAt") FILTER (WHERE sm."isAdmin" = false) AS last_in,
               (array_agg(sm.message ORDER BY sm."createdAt" DESC))[1] AS last_msg,
               (array_agg(sm."isAdmin" ORDER BY sm."createdAt" DESC))[1] AS last_admin
        FROM support_messages sm
        JOIN restaurants r ON r.id = sm."restaurantId"
        GROUP BY sm."restaurantId", r.title, r."defaultLanguage"
        ORDER BY max(sm."createdAt") DESC
        LIMIT 200
      `);
      internalThreads = rows.map((r) => {
        const readAt = readMap.get(`int:${r.rid}`);
        return {
          id: `int:${r.rid}`,
          channel: "internal" as const,
          restaurantId: r.rid,
          name: r.title,
          lang: r.lang,
          watched: false,
          muted: false,
          unread: !!r.last_in && (!readAt || r.last_in > readAt),
          lastAt: r.last_at.toISOString(),
          lastPreview: r.last_msg,
          lastFromMe: r.last_admin,
        };
      });
    }

    const all = [...waThreads, ...internalThreads].sort((a, b) =>
      (b.lastAt as string).localeCompare(a.lastAt as string),
    );
    return { threads: all };
  }

  /** Messages of one thread (WhatsApp or internal). Opening marks it read. */
  @Get("threads/:id/messages")
  async messages(@Param("id") id: string) {
    const thread = this.parseThread(id);
    if (thread.channel === "internal") {
      const restaurant = await this.prisma.restaurant.findUnique({
        where: { id: thread.key },
        select: {
          title: true,
          defaultLanguage: true,
          restaurantUsers: {
            take: 1,
            orderBy: { addedAt: "asc" },
            select: { user: { select: { email: true, preferredLocale: true } } },
          },
        },
      });
      if (!restaurant) throw new NotFoundException("Thread not found");
      const msgs = await this.prisma.supportMessage.findMany({
        where: { restaurantId: thread.key },
        orderBy: { createdAt: "asc" },
        take: 500,
        select: { id: true, message: true, isAdmin: true, createdAt: true, lang: true, translatedRu: true },
      });
      await this.markRead(id);
      return {
        contact: {
          id: thread.key,
          channel: "internal" as const,
          name: restaurant.restaurantUsers[0]?.user.email || restaurant.title || "Conversation",
          customName: null,
          profileName: null,
          note: null,
          externalId: restaurant.title || "",
          lang: restaurant.restaurantUsers[0]?.user.preferredLocale || restaurant.defaultLanguage,
          watched: false,
          muted: false,
        },
        messages: msgs.map((m) => ({
          id: m.id,
          direction: m.isAdmin ? ("out" as const) : ("in" as const),
          body: m.message,
          lang: m.lang,
          translatedRu: m.translatedRu,
          status: "",
          createdAt: m.createdAt.toISOString(),
        })),
      };
    }

    const contactId = thread.key;
    const contact = await this.prisma.inboxContact.findUnique({ where: { id: contactId } });
    if (!contact) throw new NotFoundException("Thread not found");
    const msgs = await this.prisma.inboxMessage.findMany({
      where: { contactId },
      orderBy: { createdAt: "asc" },
      take: 500,
    });
    await this.markRead(id);
    return {
      contact: {
        id: contact.id,
        channel: "whatsapp" as const,
        name: contact.customName || contact.name || contact.externalId,
        customName: contact.customName,
        profileName: contact.name,
        note: contact.note,
        externalId: contact.externalId,
        lang: contact.lang,
        watched: contact.watched,
        muted: contact.muted,
      },
      messages: msgs.map((m) => ({
        id: m.id,
        direction: m.direction,
        body: m.body,
        lang: m.lang,
        translatedRu: m.translatedRu,
        mediaUrl: m.mediaUrl,
        mediaType: m.mediaType,
        mediaMime: m.mediaMime,
        mediaName: m.mediaName,
        status: m.status,
        createdAt: m.createdAt.toISOString(),
      })),
    };
  }

  /** Preview the translation of a Russian reply in the contact's language,
   *  WITHOUT sending — lets the admin verify before delivery. Both channels. */
  @Post("threads/:id/preview")
  @HttpCode(HttpStatus.OK)
  async preview(@Param("id") id: string, @Body() body: { ru?: string; lang?: string }) {
    const thread = this.parseThread(id);
    const ru = (body?.ru ?? "").trim();
    if (!ru) throw new BadRequestException("ru text required");

    // The admin may override the target language for this reply; otherwise use
    // the contact's detected language (internal threads use the owner's locale).
    const override = (body?.lang ?? "").trim();
    const target =
      override ||
      (thread.channel === "internal"
        ? await this.internalLang(thread.key)
        : (await this.requireContact(thread.key)).lang || "en");
    let text = ru;
    if (target !== "ru") {
      try {
        text = await translateText(ru, target, "ru");
      } catch {
        text = ru;
      }
    }
    return { lang: target, text };
  }

  /** Send a reply. WhatsApp: translate the Russian reply to the contact's
   *  language and deliver via WhatsApp (stores both). Internal: write a
   *  support_message as admin and email the owner. Either way marks read. */
  @Post("threads/:id/send")
  @HttpCode(HttpStatus.OK)
  async send(
    @Req() req: Request,
    @Param("id") id: string,
    @Body() body: SendBody,
  ) {
    const thread = this.parseThread(id);
    if (thread.channel === "internal") {
      return this.sendInternal(req, thread.key, body);
    }

    const contactId = thread.key;
    const ru = (body?.ru ?? "").trim();
    const media = this.parseMedia(body?.media);
    if (!ru && !media) throw new BadRequestException("ru text or media required");
    const contact = await this.prisma.inboxContact.findUnique({ where: { id: contactId } });
    if (!contact) throw new NotFoundException("Thread not found");

    // Target language: explicit override → contact's detected language → en.
    const target = (body?.lang ?? "").trim() || contact.lang || "en";
    const approved = (body?.text ?? "").trim();
    let outText = approved || ru;
    if (ru && !approved && target !== "ru") {
      try {
        outText = await translateText(ru, target, "ru");
      } catch {
        outText = ru; // fall back to sending the Russian text if translation fails
      }
    }

    const result = media
      ? await this.wa.sendMedia(contact.externalId, media.type, media.url, outText, media.name ?? undefined)
      : await this.wa.sendText(contact.externalId, outText);
    const msg = await this.prisma.inboxMessage.create({
      data: {
        contactId,
        direction: "out",
        body: outText,
        lang: target,
        translatedRu: ru || null,
        mediaUrl: media?.url ?? null,
        mediaType: media?.type ?? null,
        mediaMime: media?.mime ?? null,
        mediaName: media?.name ?? null,
        externalId: result.wamid ?? null,
        status: result.ok ? "sent" : "failed",
      },
    });
    await this.prisma.inboxContact.update({
      where: { id: contactId },
      data: { lastMessageAt: new Date() },
    });
    await this.markRead(id);
    if (!result.ok) throw new BadRequestException({ message: "WhatsApp send failed", response: result.error });
    return {
      id: msg.id,
      direction: "out",
      body: outText,
      lang: target,
      translatedRu: ru || null,
      mediaUrl: media?.url ?? null,
      mediaType: media?.type ?? null,
      mediaMime: media?.mime ?? null,
      mediaName: media?.name ?? null,
      status: msg.status,
      createdAt: msg.createdAt.toISOString(),
    };
  }

  /** Validate an outbound media attachment; only our own S3 URLs are allowed
   *  (SSRF guard — WhatsApp fetches the link, so it must be a trusted origin). */
  private parseMedia(m: SendBody["media"]): OutMedia | null {
    if (!m || typeof m.url !== "string" || !m.url) return null;
    const prefix = process.env.S3_HOST ? `${process.env.S3_HOST}/` : null;
    if (!prefix || !m.url.startsWith(prefix)) {
      throw new BadRequestException("media url must be an uploaded file");
    }
    const type = m.type;
    if (type !== "image" && type !== "video" && type !== "audio" && type !== "document") {
      throw new BadRequestException("invalid media type");
    }
    return { url: m.url, type, mime: m.mime ?? null, name: m.name ?? null };
  }

  /** Internal support reply: the admin writes Russian; translate it to the
   *  owner's language, persist as an admin message (owner-language `message`,
   *  Russian original in `translatedRu`) and email the owner. */
  private async sendInternal(
    req: Request,
    restaurantId: string,
    body: { ru?: string; text?: string },
  ) {
    const ru = (body?.ru ?? "").trim();
    if (!ru) throw new BadRequestException("ru text required");
    if (ru.length > 2000) throw new BadRequestException("Message too long");

    const adminEmail = (req as AuthedRequest).authUser.email;
    const restaurant = await this.prisma.restaurant.findUnique({
      where: { id: restaurantId },
      select: {
        defaultLanguage: true,
        restaurantUsers: {
          take: 1,
          orderBy: { addedAt: "asc" },
          select: { user: { select: { email: true, preferredLocale: true } } },
        },
      },
    });
    if (!restaurant) throw new NotFoundException("Thread not found");
    const owner = restaurant.restaurantUsers[0]?.user;
    const target = owner?.preferredLocale || restaurant.defaultLanguage || "en";

    // Send the approved preview verbatim, else translate the Russian original.
    const approved = (body?.text ?? "").trim();
    let outText = approved || ru;
    if (!approved && target !== "ru") {
      try {
        outText = await translateText(ru, target, "ru");
      } catch {
        outText = ru;
      }
    }

    const adminUser = await this.prisma.user.findUnique({ where: { email: adminEmail } });
    if (!adminUser) throw new NotFoundException("Admin user not found");

    const created = await this.prisma.supportMessage.create({
      data: {
        message: outText,
        translatedRu: ru,
        lang: target,
        restaurantId,
        userId: adminUser.id,
        isAdmin: true,
      },
      select: { id: true, createdAt: true },
    });

    if (owner?.email) {
      this.mail
        .sendSupportReplyNotification(owner.email, target)
        .catch((err) => console.error("support email failed:", err));
    }

    await this.markRead(`int:${restaurantId}`);
    return {
      id: created.id,
      direction: "out" as const,
      body: outText,
      lang: target,
      translatedRu: ru,
      status: "",
      createdAt: created.createdAt.toISOString(),
    };
  }

  /** Owner's language for an internal thread (preferredLocale → default → en). */
  private async internalLang(restaurantId: string): Promise<string> {
    const r = await this.prisma.restaurant.findUnique({
      where: { id: restaurantId },
      select: {
        defaultLanguage: true,
        restaurantUsers: {
          take: 1,
          orderBy: { addedAt: "asc" },
          select: { user: { select: { preferredLocale: true } } },
        },
      },
    });
    if (!r) throw new NotFoundException("Thread not found");
    return r.restaurantUsers[0]?.user.preferredLocale || r.defaultLanguage || "en";
  }

  private async requireContact(contactId: string) {
    const contact = await this.prisma.inboxContact.findUnique({ where: { id: contactId } });
    if (!contact) throw new NotFoundException("Thread not found");
    return contact;
  }

  /** Pin (watch) / hide (mute) a contact, or edit name/note. WhatsApp only. */
  @Post("contacts/:id/flags")
  @HttpCode(HttpStatus.OK)
  async flags(
    @Param("id") id: string,
    @Body() body: { watched?: boolean; muted?: boolean; customName?: string | null; note?: string | null },
  ) {
    const data: { watched?: boolean; muted?: boolean; customName?: string | null; note?: string | null } = {};
    if (typeof body.watched === "boolean") data.watched = body.watched;
    if (typeof body.muted === "boolean") data.muted = body.muted;
    if (body.customName !== undefined) {
      const v = (body.customName ?? "").trim();
      data.customName = v || null;
    }
    if (body.note !== undefined) {
      const v = (body.note ?? "").trim();
      data.note = v || null;
    }
    if (Object.keys(data).length === 0) throw new BadRequestException("nothing to update");
    await this.prisma.inboxContact.update({ where: { id }, data });
    return { ok: true };
  }

  /** Delete a WhatsApp thread (contact + its messages + read marker). */
  @Delete("threads/:id")
  @HttpCode(HttpStatus.OK)
  async remove(@Param("id") id: string) {
    const contactId = this.waId(id);
    await this.prisma.inboxContact.delete({ where: { id: contactId } });
    await this.prisma.inboxRead.deleteMany({ where: { threadId: id } });
    return { ok: true };
  }

  /** Upsert the read marker for a thread to now(). */
  private async markRead(threadId: string): Promise<void> {
    const now = new Date();
    await this.prisma.inboxRead.upsert({
      where: { threadId },
      update: { readAt: now },
      create: { threadId, readAt: now },
    });
  }

  private parseThread(id: string): { channel: "whatsapp" | "internal"; key: string } {
    if (id.startsWith("wa:")) return { channel: "whatsapp", key: id.slice(3) };
    if (id.startsWith("int:")) return { channel: "internal", key: id.slice(4) };
    throw new BadRequestException("Unknown thread id");
  }

  private waId(id: string): string {
    if (!id.startsWith("wa:")) throw new BadRequestException("WhatsApp thread id required");
    return id.slice(3);
  }
}

type OutMediaType = "image" | "video" | "audio" | "document";

interface OutMedia {
  url: string;
  type: OutMediaType;
  mime: string | null;
  name: string | null;
}

interface SendBody {
  ru?: string;
  text?: string;
  lang?: string;
  media?: { url?: string; type?: string; mime?: string | null; name?: string | null };
}
