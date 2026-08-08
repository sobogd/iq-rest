import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

/** Thin wrapper over the WhatsApp Cloud API (Graph). Configured via env:
 *  WHATSAPP_TOKEN (permanent system-user token), WHATSAPP_PHONE_NUMBER_ID,
 *  WHATSAPP_VERIFY_TOKEN (webhook verify), WHATSAPP_APP_SECRET (signature). */
@Injectable()
export class WhatsappService {
  private readonly logger = new Logger(WhatsappService.name);

  constructor(private readonly config: ConfigService) {}

  get verifyToken(): string {
    return this.config.get<string>("WHATSAPP_VERIFY_TOKEN") || "";
  }

  get appSecret(): string {
    return this.config.get<string>("WHATSAPP_APP_SECRET") || "";
  }

  isConfigured(): boolean {
    return !!(
      this.config.get<string>("WHATSAPP_TOKEN") &&
      this.config.get<string>("WHATSAPP_PHONE_NUMBER_ID")
    );
  }

  /** Send a plain-text WhatsApp message. Returns the provider message id. */
  async sendText(toPhone: string, body: string): Promise<{ ok: boolean; wamid?: string; error?: unknown }> {
    return this.sendMessage(toPhone, { type: "text", text: { preview_url: false, body } });
  }

  /** Send a media WhatsApp message by public link. `type` is one of
   *  image | video | audio | document. Documents keep their file name.
   *  Caption is supported for image/video/document (not audio). */
  async sendMedia(
    toPhone: string,
    type: "image" | "video" | "audio" | "document",
    link: string,
    caption?: string,
    fileName?: string,
  ): Promise<{ ok: boolean; wamid?: string; error?: unknown }> {
    const media: Record<string, string> = { link };
    if (caption && type !== "audio") media.caption = caption;
    if (fileName && type === "document") media.filename = fileName;
    return this.sendMessage(toPhone, { type, [type]: media });
  }

  /** Low-level POST to the Cloud API /messages endpoint. */
  private async sendMessage(
    toPhone: string,
    payload: Record<string, unknown>,
  ): Promise<{ ok: boolean; wamid?: string; error?: unknown }> {
    const token = this.config.get<string>("WHATSAPP_TOKEN");
    const phoneId = this.config.get<string>("WHATSAPP_PHONE_NUMBER_ID");
    if (!token || !phoneId) return { ok: false, error: "WhatsApp not configured" };
    try {
      const res = await fetch(`https://graph.facebook.com/v21.0/${phoneId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: toPhone,
          ...payload,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as {
        messages?: { id: string }[];
        error?: unknown;
      };
      if (!res.ok) {
        this.logger.warn(`WhatsApp send failed (${res.status}): ${JSON.stringify(json)}`);
        return { ok: false, error: json.error ?? json };
      }
      return { ok: true, wamid: json.messages?.[0]?.id };
    } catch (e) {
      this.logger.error(`WhatsApp send error: ${String(e)}`);
      return { ok: false, error: String(e) };
    }
  }

  /** Resolve a WhatsApp media id to a (short-lived) download URL + mime. */
  async getMediaUrl(mediaId: string): Promise<{ url: string; mime?: string } | null> {
    const token = this.config.get<string>("WHATSAPP_TOKEN");
    if (!token) return null;
    try {
      const res = await fetch(`https://graph.facebook.com/v21.0/${mediaId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        this.logger.warn(`WhatsApp media lookup failed (${res.status})`);
        return null;
      }
      const json = (await res.json()) as { url?: string; mime_type?: string };
      if (!json.url) return null;
      return { url: json.url, mime: json.mime_type };
    } catch (e) {
      this.logger.warn(`WhatsApp media lookup error: ${String(e)}`);
      return null;
    }
  }

  /** Download WhatsApp media bytes (the CDN URL requires the bearer token). */
  async downloadMedia(url: string): Promise<Buffer | null> {
    const token = this.config.get<string>("WHATSAPP_TOKEN");
    if (!token) return null;
    try {
      const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) {
        this.logger.warn(`WhatsApp media download failed (${res.status})`);
        return null;
      }
      return Buffer.from(await res.arrayBuffer());
    } catch (e) {
      this.logger.warn(`WhatsApp media download error: ${String(e)}`);
      return null;
    }
  }
}
