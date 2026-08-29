"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Star, EyeOff, Pencil, Trash2, Paperclip, X, FileText, Play, MessageSquare } from "lucide-react";
import { apiUrl } from "@/lib/api";
import { SendIcon, RefreshIcon } from "../_v2/icons";
import { Page } from "../_v2/page";
import { headerBtnSurface, headerIconBtn } from "../_v2/tokens";
import { useDashboardRouter } from "../_spa/router";
import { AVAILABLE_LANGUAGES } from "../_v2/i18n";

const LANG_FLAG = new Map(AVAILABLE_LANGUAGES.map((l) => [l.code, l.flag]));
const LANG_LABEL = new Map(AVAILABLE_LANGUAGES.map((l) => [l.code, l.label]));

interface Contact {
  id: string;
  channel?: "whatsapp" | "internal";
  name: string;          // resolved display name
  customName: string | null;
  profileName: string | null;
  note: string | null;
  externalId: string;
  lang: string | null;
  watched: boolean;
  muted: boolean;
}

type MediaType = "image" | "video" | "audio" | "document" | "sticker";

interface Msg {
  id: string;
  direction: "in" | "out";
  body: string;        // contact-language text (sent/received)
  lang: string | null;
  translatedRu: string | null; // RU rendering
  mediaUrl?: string | null;
  mediaType?: MediaType | null;
  mediaMime?: string | null;
  mediaName?: string | null;
  status: string;
  createdAt: string;
}

interface Attachment {
  url: string;
  type: "image" | "video" | "audio" | "document";
  mime: string | null;
  name: string | null;
}

interface TplComponent {
  type: "HEADER" | "BODY" | "FOOTER" | "BUTTONS";
  format?: "TEXT" | "IMAGE" | "VIDEO" | "DOCUMENT" | "LOCATION";
  text?: string;
  buttons?: Array<{ type: string; text?: string }>;
}

interface WaTemplate {
  name: string;
  status: string;
  category: string;
  language: string;
  components: TplComponent[];
}

// Highest {{n}} placeholder index in a template string (0 = no variables).
function placeholderCount(text: string | undefined): number {
  if (!text) return 0;
  let max = 0;
  for (const m of text.matchAll(/\{\{\s*(\d+)\s*\}\}/g)) max = Math.max(max, Number(m[1]));
  return max;
}

// Replace {{1}}, {{2}}… with the provided values (falls back to the placeholder).
function fillPlaceholders(text: string, vars: string[]): string {
  return text.replace(/\{\{\s*(\d+)\s*\}\}/g, (_, n) => vars[Number(n) - 1] || `{{${n}}}`);
}

export function AdminInboxThreadPage({ threadId }: { threadId: string }) {
  const router = useDashboardRouter();
  // Internal support threads (id "int:<restaurantId>") skip the WhatsApp
  // translation/preview flow and the contact curation controls.
  const isInternal = threadId.startsWith("int:");
  const [contact, setContact] = useState<Contact | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [preparing, setPreparing] = useState(false);
  const [preview, setPreview] = useState<{ ru: string; lang: string; text: string } | null>(null);
  const [langModal, setLangModal] = useState(false);
  const [langQuery, setLangQuery] = useState("");
  const [attachment, setAttachment] = useState<Attachment | null>(null);
  const [uploading, setUploading] = useState(false);
  const [tplOpen, setTplOpen] = useState(false);
  const [templates, setTemplates] = useState<WaTemplate[] | null>(null);
  const [tplSel, setTplSel] = useState<WaTemplate | null>(null);
  const [tplBodyVars, setTplBodyVars] = useState<string[]>([]);
  const [tplHeaderVars, setTplHeaderVars] = useState<string[]>([]);
  const [tplHeaderMedia, setTplHeaderMedia] = useState<Attachment | null>(null);
  const [tplSending, setTplSending] = useState(false);
  const [showOriginal, setShowOriginal] = useState<Set<string>>(new Set());
  const [editing, setEditing] = useState<{ customName: string; note: string } | null>(null);
  const [savingEdit, setSavingEdit] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const lastIdRef = useRef<string | null>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const tplHeaderFileRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const res = await fetch(apiUrl(`/api/admin/inbox/threads/${encodeURIComponent(threadId)}/messages`), { credentials: "include" });
      if (res.ok) {
        const j = (await res.json()) as { contact: Contact; messages: Msg[] };
        setContact(j.contact);
        setMessages(j.messages ?? []);
      }
    } finally {
      if (!silent) setLoading(false);
    }
  }, [threadId]);

  useEffect(() => {
    void load();
  }, [load]);

  // Light polling so inbound replies appear without a manual refresh.
  useEffect(() => {
    const id = setInterval(() => void load(true), 15000);
    return () => clearInterval(id);
  }, [load]);

  useEffect(() => {
    const last = messages[messages.length - 1];
    if (last && last.id !== lastIdRef.current) {
      lastIdRef.current = last.id;
      if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  function autoresize(el: HTMLTextAreaElement) {
    el.style.height = "auto";
    el.style.height = Math.min(Math.max(el.scrollHeight, 40), 120) + "px";
  }

  // Step 1: translate (no send) so the admin can verify the outgoing text.
  // `overrideLang` re-translates into a different target language (language modal).
  async function requestPreview(overrideLang?: string) {
    const ru = input.trim();
    if (!ru || preparing || sending) return;
    setPreparing(true);
    try {
      const res = await fetch(apiUrl(`/api/admin/inbox/threads/${encodeURIComponent(threadId)}/preview`), {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ru, ...(overrideLang ? { lang: overrideLang } : {}) }),
      });
      if (res.ok) {
        const j = (await res.json()) as { lang: string; text: string };
        setPreview({ ru, lang: j.lang, text: j.text });
      } else {
        const j = await res.json().catch(() => ({}));
        window.alert(j.message || "Preview failed");
      }
    } finally {
      setPreparing(false);
    }
  }

  // Upload a picked file, then keep it as a pending attachment on the composer.
  async function onPickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-picking the same file
    if (!file || uploading) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch(apiUrl(`/api/admin/inbox/upload`), {
        method: "POST",
        credentials: "include",
        body: fd,
      });
      if (res.ok) {
        const j = (await res.json()) as Attachment;
        setAttachment(j);
      } else {
        const j = await res.json().catch(() => ({}));
        window.alert(j.message || "Upload failed");
      }
    } finally {
      setUploading(false);
    }
  }

  // Send the pending attachment (optionally with the typed Russian text as a
  // caption, translated to the contact's language server-side).
  async function sendAttachment() {
    if (!attachment || sending) return;
    setSending(true);
    try {
      const ru = input.trim();
      const res = await fetch(apiUrl(`/api/admin/inbox/threads/${encodeURIComponent(threadId)}/send`), {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ru, media: attachment }),
      });
      if (res.ok) {
        const sent = (await res.json()) as Msg;
        setMessages((m) => [...m, sent]);
        setInput("");
        if (taRef.current) taRef.current.style.height = "";
        setAttachment(null);
      } else {
        const j = await res.json().catch(() => ({}));
        window.alert(j.message || "Send failed");
      }
    } finally {
      setSending(false);
    }
  }

  // Step 2: send the approved (possibly edited) translation verbatim.
  async function confirmSend() {
    if (!preview || sending) return;
    setSending(true);
    try {
      const res = await fetch(apiUrl(`/api/admin/inbox/threads/${encodeURIComponent(threadId)}/send`), {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ru: preview.ru, text: preview.text, lang: preview.lang }),
      });
      if (res.ok) {
        const sent = (await res.json()) as Msg;
        setMessages((m) => [...m, sent]);
        setInput("");
        if (taRef.current) taRef.current.style.height = "";
        setPreview(null);
      } else {
        const j = await res.json().catch(() => ({}));
        window.alert(j.message || "Send failed");
      }
    } finally {
      setSending(false);
    }
  }

  // Open the templates modal and lazily load approved templates.
  async function openTemplates() {
    setTplOpen(true);
    setTplSel(null);
    if (templates) return;
    try {
      const res = await fetch(apiUrl(`/api/admin/inbox/templates`), { credentials: "include" });
      if (res.ok) {
        const j = (await res.json()) as { templates: WaTemplate[] };
        setTemplates(j.templates ?? []);
      } else {
        const j = await res.json().catch(() => ({}));
        window.alert(j.message || "Templates unavailable");
        setTemplates([]);
      }
    } catch {
      setTemplates([]);
    }
  }

  function pickTemplate(t: WaTemplate) {
    const bodyText = t.components.find((c) => c.type === "BODY")?.text ?? "";
    const header = t.components.find((c) => c.type === "HEADER");
    const headerText = header?.format === "TEXT" ? header.text : "";
    setTplSel(t);
    setTplBodyVars(new Array(placeholderCount(bodyText)).fill(""));
    setTplHeaderVars(new Array(placeholderCount(headerText)).fill(""));
    setTplHeaderMedia(null);
  }

  async function onPickTplHeader(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch(apiUrl(`/api/admin/inbox/upload`), { method: "POST", credentials: "include", body: fd });
    if (res.ok) setTplHeaderMedia((await res.json()) as Attachment);
    else {
      const j = await res.json().catch(() => ({}));
      window.alert(j.message || "Upload failed");
    }
  }

  async function submitTemplate() {
    if (!tplSel || tplSending) return;
    const header = tplSel.components.find((c) => c.type === "HEADER");
    const bodyComp = tplSel.components.find((c) => c.type === "BODY");
    // Build header params: media header needs an uploaded file; text header needs its vars.
    const headerParams: Array<{ type: string; text?: string; link?: string }> = [];
    if (header?.format && header.format !== "TEXT" && header.format !== "LOCATION") {
      if (!tplHeaderMedia) { window.alert("This template needs a header file"); return; }
      headerParams.push({ type: header.format.toLowerCase(), link: tplHeaderMedia.url });
    } else if (header?.format === "TEXT") {
      tplHeaderVars.forEach((v) => headerParams.push({ type: "text", text: v }));
    }
    const bodyText = bodyComp?.text ? fillPlaceholders(bodyComp.text, tplBodyVars) : `[template: ${tplSel.name}]`;
    setTplSending(true);
    try {
      const res = await fetch(apiUrl(`/api/admin/inbox/threads/${encodeURIComponent(threadId)}/send-template`), {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: tplSel.name,
          language: tplSel.language,
          bodyText,
          bodyParams: tplBodyVars,
          headerParams: headerParams.length ? headerParams : undefined,
        }),
      });
      if (res.ok) {
        const sent = (await res.json()) as Msg;
        setMessages((m) => [...m, sent]);
        setTplOpen(false);
        setTplSel(null);
      } else {
        const j = await res.json().catch(() => ({}));
        window.alert(j.message || "Template send failed");
      }
    } finally {
      setTplSending(false);
    }
  }

  function onKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void requestPreview();
    }
  }

  async function setFlag(patch: { watched?: boolean; muted?: boolean }) {
    if (!contact) return;
    await fetch(apiUrl(`/api/admin/inbox/contacts/${contact.id}/flags`), {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    void load(true);
  }

  async function saveEdit() {
    if (!contact || !editing || savingEdit) return;
    setSavingEdit(true);
    try {
      const res = await fetch(apiUrl(`/api/admin/inbox/contacts/${contact.id}/flags`), {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customName: editing.customName, note: editing.note }),
      });
      if (res.ok) {
        setEditing(null);
        void load(true);
      }
    } finally {
      setSavingEdit(false);
    }
  }

  async function removeThread() {
    if (!window.confirm("Delete this conversation? This cannot be undone.")) return;
    await fetch(apiUrl(`/api/admin/inbox/threads/${encodeURIComponent(threadId)}`), {
      method: "DELETE",
      credentials: "include",
    });
    router.push({ name: "settings.admin.inbox" });
  }

  function toggleOriginal(id: string) {
    setShowOriginal((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <Page
      title={contact?.name ?? "Conversation"}
      onBack={() => router.push({ name: "settings.admin.inbox" })}
      fill
      actions={
        <>
        {contact && !isInternal ? (
          <>
            <button
              type="button"
              onClick={() => setFlag({ watched: !contact.watched })}
              className={headerIconBtn + " bg-secondary hover:text-foreground " + (contact.watched ? "text-amber-500" : "text-muted-foreground")}
              title={contact.watched ? "Unwatch" : "Watch"}
            >
              <Star className="w-3.5 h-3.5" fill={contact.watched ? "currentColor" : "none"} />
            </button>
            <button
              type="button"
              onClick={() => setFlag({ muted: !contact.muted })}
              className={headerIconBtn + " bg-secondary hover:text-foreground " + (contact.muted ? "text-primary" : "text-muted-foreground")}
              title={contact.muted ? "Unmute" : "Mute"}
            >
              <EyeOff className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={removeThread}
              className={headerIconBtn + " bg-secondary text-red-500 hover:text-red-600"}
              title="Delete conversation"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </>
        ) : null}
        <button
          type="button"
          onClick={() => void load()}
          disabled={loading}
          className={headerIconBtn + " " + headerBtnSurface}
          title="Refresh"
        >
          <RefreshIcon size={14} className={loading ? "animate-spin" : ""} />
        </button>
        </>
      }
    >
      {/* Pinned contact header (phone + name + info). */}
      {contact ? (
        <div className="shrink-0 px-4 md:px-6 py-2.5 border-b border-border/60 bg-card/40">
          <div className="w-full max-w-3xl mx-auto">
            <div className="flex items-center gap-2">
              <span className="text-base" title={contact.lang || ""}>{LANG_FLAG.get(contact.lang || "") || "🌐"}</span>
              <span className="text-sm font-medium text-foreground truncate">{contact.name}</span>
              {!isInternal ? (
                <>
                  <span className="text-[11px] text-muted-foreground">{contact.externalId}</span>
                  <button
                    type="button"
                    onClick={() => setEditing({ customName: contact.customName ?? "", note: contact.note ?? "" })}
                    className="h-6 w-6 inline-flex items-center justify-center rounded text-muted-foreground hover:text-foreground"
                    title="Edit name / note"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                </>
              ) : null}
            </div>
            {contact.note ? <div className="text-[11px] text-muted-foreground mt-1 italic">{contact.note}</div> : null}
          </div>
        </div>
      ) : null}

      {/* Centered fill: scrollable messages + pinned composer. */}
      <div className="flex-1 min-h-0 w-full max-w-3xl mx-auto flex flex-col">
        <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto px-3 md:px-4 py-3 space-y-3">
          {loading && messages.length === 0 ? (
            <div className="h-full flex items-center justify-center text-sm text-muted-foreground">Loading…</div>
          ) : messages.length === 0 ? (
            <div className="h-full flex items-center justify-center text-sm text-muted-foreground">No messages yet</div>
          ) : (
            messages.map((m) => (
              <Bubble key={m.id} m={m} showOriginal={showOriginal.has(m.id)} onToggle={() => toggleOriginal(m.id)} />
            ))
          )}
        </div>

        {attachment ? (
          <div className="shrink-0 px-3 pt-2">
            <div className="inline-flex items-center gap-2 max-w-full px-2 py-1.5 bg-secondary border border-border rounded-lg">
              {attachment.type === "image" ? (
                <img src={attachment.url} alt="" className="w-10 h-10 rounded object-cover" />
              ) : (
                <span className="w-10 h-10 rounded bg-muted inline-flex items-center justify-center text-muted-foreground">
                  {attachment.type === "video" ? <Play className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                </span>
              )}
              <span className="text-xs text-foreground truncate max-w-[180px]">{attachment.name || attachment.type}</span>
              <button
                type="button"
                onClick={() => setAttachment(null)}
                className="h-6 w-6 inline-flex items-center justify-center rounded text-muted-foreground hover:text-foreground"
                title="Remove attachment"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : null}

        <div className="shrink-0 flex items-start gap-2 p-3">
          <input ref={fileRef} type="file" className="hidden" onChange={onPickFile} />
          {!isInternal ? (
            <button
              type="button"
              onClick={() => void openTemplates()}
              disabled={sending}
              className="shrink-0 h-10 w-10 inline-flex items-center justify-center bg-secondary rounded-lg text-muted-foreground hover:text-foreground disabled:opacity-60"
              title="Send a template (outside 24h window)"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading || sending}
            className="shrink-0 h-10 w-10 inline-flex items-center justify-center bg-secondary rounded-lg text-muted-foreground hover:text-foreground disabled:opacity-60"
            title="Attach file"
          >
            {uploading ? <span className="w-4 h-4 border-2 border-muted-foreground/40 border-t-muted-foreground rounded-full animate-spin" /> : <Paperclip className="w-4 h-4" />}
          </button>
          <textarea
            ref={taRef}
            value={input}
            onChange={(e) => { setInput(e.target.value); autoresize(e.currentTarget); }}
            onKeyDown={onKey}
            placeholder={attachment ? "Подпись (необязательно)…" : "Напишите по-русски…"}
            rows={1}
            className="flex-1 h-[40px] min-h-[40px] max-h-[120px] px-3 py-2 text-sm leading-5 text-foreground bg-card border border-input rounded-lg placeholder:text-muted-foreground focus:outline-none resize-none box-border"
          />
          {attachment ? (
            <button
              type="button"
              onClick={() => void sendAttachment()}
              disabled={sending}
              className="shrink-0 inline-flex items-center gap-1.5 h-10 px-4 text-sm font-medium text-primary-foreground bg-primary-gradient rounded-lg disabled:opacity-60"
            >
              {sending ? <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : <SendIcon size={14} />}
              Send
            </button>
          ) : (
            <button
              type="button"
              onClick={() => void requestPreview()}
              disabled={!input.trim() || preparing || sending}
              className="shrink-0 inline-flex items-center gap-1.5 h-10 px-4 text-sm font-medium text-primary-foreground bg-primary-gradient rounded-lg disabled:opacity-60"
            >
              {preparing ? <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : <SendIcon size={14} />}
              Send
            </button>
          )}
        </div>
      </div>

      {editing ? (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/40" onClick={() => setEditing(null)}>
          <div className="w-full max-w-md bg-card border border-border rounded-xl p-4 space-y-3" onClick={(e) => e.stopPropagation()}>
            <div className="text-sm font-medium text-foreground">Edit contact</div>
            <div className="space-y-1">
              <label className="text-[11px] text-muted-foreground">Internal name</label>
              <input
                value={editing.customName}
                onChange={(e) => setEditing((p) => (p ? { ...p, customName: e.target.value } : p))}
                placeholder={contact?.profileName || contact?.externalId || ""}
                className="w-full h-9 px-3 text-sm text-foreground bg-secondary border border-input rounded-lg focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] text-muted-foreground">Note</label>
              <textarea
                value={editing.note}
                onChange={(e) => setEditing((p) => (p ? { ...p, note: e.target.value } : p))}
                rows={3}
                className="w-full px-3 py-2 text-sm text-foreground bg-secondary border border-input rounded-lg focus:outline-none resize-none"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setEditing(null)} disabled={savingEdit} className="h-8 px-3 text-xs font-medium bg-secondary text-foreground rounded-lg hover:bg-muted disabled:opacity-60">Cancel</button>
              <button type="button" onClick={() => void saveEdit()} disabled={savingEdit} className="h-8 px-3 text-xs font-medium text-primary-foreground bg-primary-gradient rounded-lg disabled:opacity-60">{savingEdit ? "Saving…" : "Save"}</button>
            </div>
          </div>
        </div>
      ) : null}

      {preview ? (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/40" onClick={() => setPreview(null)}>
          <div className="w-full max-w-md bg-card border border-border rounded-xl p-4 space-y-3" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <span>Preview — will be sent in</span>
              <button
                type="button"
                onClick={() => { setLangQuery(""); setLangModal(true); }}
                disabled={preparing}
                className="inline-flex items-center gap-1.5 h-7 px-2 bg-secondary border border-border rounded-md hover:bg-muted disabled:opacity-60"
                title="Change language"
              >
                <span className="text-base">{LANG_FLAG.get(preview.lang) || "🌐"}</span>
                <span>{LANG_LABEL.get(preview.lang) || preview.lang.toUpperCase()}</span>
                {preparing ? <span className="w-3 h-3 border-2 border-muted-foreground/40 border-t-muted-foreground rounded-full animate-spin" /> : <Pencil className="w-3 h-3 text-muted-foreground" />}
              </button>
            </div>
            <textarea
              value={preview.text}
              onChange={(e) => setPreview((p) => (p ? { ...p, text: e.target.value } : p))}
              rows={4}
              className="w-full px-3 py-2 text-sm leading-5 text-foreground bg-secondary border border-input rounded-lg focus:outline-none resize-none"
            />
            <div className="text-[11px] text-muted-foreground">
              <span className="opacity-70">Your text (RU):</span> {preview.ru}
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setPreview(null)}
                disabled={sending}
                className="h-8 px-3 text-xs font-medium bg-secondary text-foreground rounded-lg hover:bg-muted disabled:opacity-60"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => void confirmSend()}
                disabled={sending || !preview.text.trim()}
                className="h-8 px-3 text-xs font-medium text-primary-foreground bg-primary-gradient rounded-lg disabled:opacity-60 inline-flex items-center gap-1.5"
              >
                {sending ? <span className="w-3 h-3 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : <SendIcon size={12} />}
                Send
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {preview && langModal ? (
        <div className="fixed inset-0 z-[210] flex items-center justify-center p-4 bg-black/40" onClick={() => setLangModal(false)}>
          <div className="w-full max-w-sm bg-card border border-border rounded-xl p-4 space-y-3 flex flex-col max-h-[80vh]" onClick={(e) => e.stopPropagation()}>
            <div className="text-sm font-medium text-foreground">Translate to…</div>
            <input
              autoFocus
              value={langQuery}
              onChange={(e) => setLangQuery(e.target.value)}
              placeholder="Search language…"
              className="w-full h-9 px-3 text-sm text-foreground bg-secondary border border-input rounded-lg focus:outline-none"
            />
            <div className="flex-1 min-h-0 overflow-y-auto -mx-1 px-1">
              {AVAILABLE_LANGUAGES.filter((l) => {
                const q = langQuery.trim().toLowerCase();
                return !q || l.label.toLowerCase().includes(q) || l.code.toLowerCase().includes(q);
              }).map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => { setLangModal(false); if (l.code !== preview.lang) void requestPreview(l.code); }}
                  className={"w-full flex items-center gap-2 h-9 px-2 rounded-md text-left text-sm hover:bg-secondary " + (l.code === preview.lang ? "text-primary font-medium" : "text-foreground")}
                >
                  <span className="text-base">{l.flag}</span>
                  <span className="flex-1 truncate">{l.label}</span>
                  <span className="text-[11px] text-muted-foreground">{l.short}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {tplOpen ? (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/40" onClick={() => setTplOpen(false)}>
          <div className="w-full max-w-md bg-card border border-border rounded-xl p-4 space-y-3 flex flex-col max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
            {!tplSel ? (
              <>
                <div className="text-sm font-medium text-foreground">Send a template</div>
                <div className="text-[11px] text-muted-foreground">Use an approved template to message a contact outside the 24-hour window.</div>
                <div className="flex-1 min-h-0 overflow-y-auto -mx-1 px-1 space-y-1.5">
                  {templates === null ? (
                    <div className="py-8 text-center text-sm text-muted-foreground">Loading…</div>
                  ) : templates.length === 0 ? (
                    <div className="py-8 text-center text-sm text-muted-foreground">No approved templates</div>
                  ) : (
                    templates.map((t) => {
                      const bodyPrev = t.components.find((c) => c.type === "BODY")?.text ?? "";
                      return (
                        <button
                          key={`${t.name}:${t.language}`}
                          type="button"
                          onClick={() => pickTemplate(t)}
                          className="w-full text-left p-2.5 bg-secondary rounded-lg hover:bg-muted"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-foreground truncate">{t.name}</span>
                            <span className="text-[10px] uppercase text-muted-foreground">{t.language}</span>
                            <span className="ml-auto text-[10px] uppercase text-muted-foreground">{t.category}</span>
                          </div>
                          <div className="text-[11px] text-muted-foreground mt-1 line-clamp-2">{bodyPrev}</div>
                        </button>
                      );
                    })
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => setTplSel(null)} className="text-xs text-muted-foreground hover:text-foreground">← Back</button>
                  <span className="text-sm font-medium text-foreground truncate">{tplSel.name}</span>
                  <span className="ml-auto text-[10px] uppercase text-muted-foreground">{tplSel.language}</span>
                </div>
                <div className="flex-1 min-h-0 overflow-y-auto -mx-1 px-1 space-y-3">
                  {(() => {
                    const header = tplSel.components.find((c) => c.type === "HEADER");
                    const isMediaHeader = !!header?.format && header.format !== "TEXT" && header.format !== "LOCATION";
                    return (
                      <>
                        {isMediaHeader ? (
                          <div className="space-y-1">
                            <label className="text-[11px] text-muted-foreground">Header {header!.format!.toLowerCase()}</label>
                            <input ref={tplHeaderFileRef} type="file" className="hidden" onChange={onPickTplHeader} />
                            {tplHeaderMedia ? (
                              <div className="flex items-center gap-2 text-xs text-foreground">
                                {tplHeaderMedia.type === "image" ? <img src={tplHeaderMedia.url} alt="" className="w-10 h-10 rounded object-cover" /> : <FileText className="w-4 h-4" />}
                                <span className="truncate max-w-[180px]">{tplHeaderMedia.name || tplHeaderMedia.type}</span>
                                <button type="button" onClick={() => setTplHeaderMedia(null)} className="text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
                              </div>
                            ) : (
                              <button type="button" onClick={() => tplHeaderFileRef.current?.click()} className="h-8 px-3 text-xs bg-secondary rounded-lg text-foreground hover:bg-muted">Upload file</button>
                            )}
                          </div>
                        ) : null}
                        {tplHeaderVars.map((v, i) => (
                          <div key={`h${i}`} className="space-y-1">
                            <label className="text-[11px] text-muted-foreground">Header {`{{${i + 1}}}`}</label>
                            <input value={v} onChange={(e) => setTplHeaderVars((p) => p.map((x, j) => (j === i ? e.target.value : x)))} className="w-full h-9 px-3 text-sm text-foreground bg-secondary border border-input rounded-lg focus:outline-none" />
                          </div>
                        ))}
                        {tplBodyVars.map((v, i) => (
                          <div key={`b${i}`} className="space-y-1">
                            <label className="text-[11px] text-muted-foreground">Variable {`{{${i + 1}}}`}</label>
                            <input value={v} onChange={(e) => setTplBodyVars((p) => p.map((x, j) => (j === i ? e.target.value : x)))} className="w-full h-9 px-3 text-sm text-foreground bg-secondary border border-input rounded-lg focus:outline-none" />
                          </div>
                        ))}
                        <div className="space-y-1">
                          <label className="text-[11px] text-muted-foreground">Preview</label>
                          <div className="px-3 py-2 text-sm text-foreground bg-secondary rounded-lg whitespace-pre-wrap">
                            {fillPlaceholders(tplSel.components.find((c) => c.type === "BODY")?.text ?? "", tplBodyVars)}
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setTplOpen(false)} disabled={tplSending} className="h-8 px-3 text-xs font-medium bg-secondary text-foreground rounded-lg hover:bg-muted disabled:opacity-60">Cancel</button>
                  <button type="button" onClick={() => void submitTemplate()} disabled={tplSending} className="h-8 px-3 text-xs font-medium text-primary-foreground bg-primary-gradient rounded-lg disabled:opacity-60 inline-flex items-center gap-1.5">
                    {tplSending ? <span className="w-3 h-3 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : <SendIcon size={12} />}
                    Send
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      ) : null}
    </Page>
  );
}

// Renders an attached WhatsApp media file inside a message bubble.
function MediaBlock({ m }: { m: Msg }) {
  if (!m.mediaUrl) return null;
  const t = m.mediaType;
  const wrap = "mb-1.5 -mx-1 first:mt-0";
  if (t === "image" || t === "sticker") {
    return (
      <a href={m.mediaUrl} target="_blank" rel="noreferrer" className={wrap + " block"}>
        <img src={m.mediaUrl} alt={m.mediaName || ""} className="max-h-64 rounded-lg object-contain" />
      </a>
    );
  }
  if (t === "video") {
    return (
      <div className={wrap}>
        <video src={m.mediaUrl} controls className="max-h-64 rounded-lg" />
      </div>
    );
  }
  if (t === "audio") {
    return (
      <div className={wrap}>
        <audio src={m.mediaUrl} controls className="w-56 max-w-full" />
      </div>
    );
  }
  return (
    <a
      href={m.mediaUrl}
      target="_blank"
      rel="noreferrer"
      className={wrap + " flex items-center gap-2 px-2 py-2 bg-black/10 rounded-lg hover:bg-black/20"}
    >
      <FileText className="w-4 h-4 shrink-0" />
      <span className="text-xs underline truncate">{m.mediaName || "Download file"}</span>
    </a>
  );
}

// Incoming: Russian translation shown primary, original on tap. Outgoing: the
// Russian you typed shown primary, the sent (contact-language) text on tap.
function Bubble({ m, showOriginal, onToggle }: { m: Msg; showOriginal: boolean; onToggle: () => void }) {
  const out = m.direction === "out";
  const time = new Date(m.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
  const primary = out ? (m.translatedRu || m.body) : (m.translatedRu || m.body);
  const secondary = out ? m.body : m.body; // contact-language text
  const hasAlt = !!m.translatedRu && m.body !== m.translatedRu;
  const hasText = !!(primary && primary.trim());
  const cls = out ? "bg-primary-gradient text-primary-foreground rounded-tr-sm" : "bg-secondary text-foreground rounded-tl-sm";
  return (
    <div className={"flex " + (out ? "justify-end" : "justify-start")}>
      <div className="max-w-[78%]">
        <div className={"px-3.5 py-2 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap break-words " + cls}>
          {m.mediaUrl ? <MediaBlock m={m} /> : null}
          {hasText ? primary : null}
          {hasAlt && showOriginal ? (
            <div className={"mt-1.5 pt-1.5 text-[12px] border-t " + (out ? "border-white/25" : "border-border")}>
              {secondary}
            </div>
          ) : null}
        </div>
        <div className={"flex items-center gap-2 mt-1 px-1 " + (out ? "justify-end" : "justify-start")}>
          {hasAlt ? (
            <button type="button" onClick={onToggle} className="text-[10px] text-muted-foreground underline">
              {showOriginal ? "hide original" : (out ? "show sent" : "show original")}
            </button>
          ) : null}
          <span className="text-[10px] text-muted-foreground tabular-nums">{time}</span>
          {out && m.status === "failed" ? <span className="text-[10px] text-red-500">failed</span> : null}
        </div>
      </div>
    </div>
  );
}
