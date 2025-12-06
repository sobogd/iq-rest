# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SobogdQR is a QR menu platform for restaurants built with Next.js 15 (App Router), React 19, TypeScript, and Tailwind CSS. It features multi-language support (English/Spanish), OTP-based authentication, and deploys to AWS App Runner.

## Commands

```bash
npm run dev          # Start dev server at localhost:3000
npm run build        # Production build
npm run lint         # ESLint check

npx prisma migrate dev    # Apply database migrations
npx prisma generate       # Generate Prisma client
npx prisma studio         # Database GUI
```

## Architecture

### Routing Structure
All routes use locale prefix (`/en/*`, `/es/*`) via next-intl middleware. The root `/` redirects to `/en`.

```
app/
├── [locale]/
│   ├── (marketing)/     # Public pages: home, features, pricing, contacts
│   └── (app)/           # Authenticated pages: dashboard
├── api/
│   ├── contact/         # Contact form submission
│   └── auth/            # send-otp, verify-otp, logout
```

### Key Patterns

**i18n Navigation**: Always use `Link` from `@/i18n/routing` (not `next/link`) for automatic locale handling.

**Translations**: Use `useTranslations()` hook. Translation files are in `messages/en.json` and `messages/es.json`.

**Server Components**: Default to server components. Use `"use client"` only for interactive features.

**UI Components**: Built on shadcn/ui (`components/ui/`). Add new components with `npx shadcn@latest add [name]`.

**Database**: Prisma ORM with PostgreSQL. Models: User, Company, UserCompany (multi-tenant with role-based access).

### i18n Configuration

```typescript
// i18n/routing.ts
locales: ["en", "es"]
defaultLocale: "en"
localePrefix: "always"  // Routes always show /en or /es
```

### Environment Variables

Required in `.env`:
- `DATABASE_URL` - PostgreSQL connection string
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` - Email for OTP
- `FROM_EMAIL`, `TO_EMAIL` - Contact form recipients
- `NEXT_PUBLIC_GA_ID` - Google Analytics (optional)

## Key Files

- `middleware.ts` - i18n locale detection and routing
- `i18n/routing.ts` - Locale configuration
- `components/ui/` - shadcn/ui base components
- `prisma/schema.prisma` - Database models
- `tailwind.config.ts` - Theme with CSS variables (HSL format)

## SEO

Every page must export `generateMetadata()` for proper meta tags. Sitemap and robots.txt are generated dynamically via `app/sitemap.ts` and `app/robots.ts`.

## Claude Code Rules

- **Never run `npm run build`** to verify changes - the user will test manually
- Don't run lint checks unless explicitly asked
