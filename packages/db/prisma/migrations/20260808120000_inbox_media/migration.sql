-- Add media (image/video/audio/document/sticker) columns to inbox messages.
ALTER TABLE "inbox_messages"
  ADD COLUMN "mediaUrl"  TEXT,
  ADD COLUMN "mediaType" TEXT,
  ADD COLUMN "mediaMime" TEXT,
  ADD COLUMN "mediaName" TEXT;
