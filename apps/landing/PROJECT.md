# SoQrMenu - QR Menu Platform for Restaurants

## Project Overview

SoQrMenu is a cloud-based platform that enables restaurants to create and manage digital QR menus in just one click. The platform provides a complete solution for restaurant owners to digitize their menus and enhance their customers' dining experience.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Internationalization**: next-intl
- **Languages**: English (en), Spanish (es)

## Architecture

### Internationalization (i18n)

The application uses `next-intl` for server-side rendered multilingual support with the following routing structure:

- Default locale: English (`/en`)
- All routes are prefixed with locale: `/en/...`, `/es/...`
- Root path (`/`) redirects to `/en`
- Language switching changes the URL locale prefix

**Routing Examples:**
- Home: `/en`, `/es`
- Features: `/en/features`, `/es/features`
- Pricing: `/en/pricing`, `/es/pricing`
- Contacts: `/en/contacts`, `/es/contacts`

### Project Structure

```
soqrmenuweb/
├── app/
│   ├── [locale]/           # Localized routes
│   │   ├── layout.tsx      # Main layout with i18n provider
│   │   ├── page.tsx        # Home page
│   │   ├── features/       # Features page
│   │   ├── pricing/        # Pricing page
│   │   └── contacts/       # Contacts page
│   ├── layout.tsx          # Root layout
│   └── globals.css         # Global styles with CSS variables
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── Header.tsx          # Site header with navigation
│   └── LanguageSelector.tsx # Language switcher modal
├── i18n/
│   ├── routing.ts          # i18n routing configuration
│   └── request.ts          # i18n request configuration
├── messages/
│   ├── en.json             # English translations
│   └── es.json             # Spanish translations
└── lib/
    └── utils.ts            # Utility functions (cn)
```

## Design System

### Components

All UI components are built using **shadcn/ui** components:
- `Button` - Primary CTA and navigation buttons
- `Dialog` - Language selector modal

### Color Scheme

Using shadcn's default color palette with CSS variables:
- Primary: Dark blue-gray (`hsl(222.2 47.4% 11.2%)`)
- Background: White / Dark (`hsl(0 0% 100%)` / `hsl(222.2 84% 4.9%)`)
- Foreground: Dark / Light text
- Muted: Secondary text and backgrounds

## Key Features

### 1. Header Component

**Location**: `components/Header.tsx`

Features:
- Logo (left): "SoQrMenu" - clickable link to home
- Navigation (center): Pricing, Features, Contacts
- Actions (right): Language selector button, "Get Started" CTA button
- Responsive design

### 2. Language Selector

**Location**: `components/LanguageSelector.tsx`

Features:
- Globe icon button in header
- Opens modal dialog with language options
- Displays current language as active
- Smooth transition when switching languages
- Updates URL locale prefix on change

### 3. Home Page

**Location**: `app/[locale]/page.tsx`

Features:
- Hero section with large heading
- Compelling subtitle text
- Two CTA buttons:
  - "Create Menu in 1 Min" (primary)
  - "View Real Menu" (outline)
- Centered layout
- Fully responsive

### 4. Placeholder Pages

**Pages**: Features, Pricing, Contacts

Simple placeholder pages with:
- Page title
- "Coming soon..." message
- Centered layout

## Translations

All text content is stored in JSON files under `messages/`:

**English** (`messages/en.json`):
- Header navigation
- Home page hero section
- Placeholder pages
- Language names

**Spanish** (`messages/es.json`):
- Complete translations of all English content

## SSR & Routing

### Server-Side Rendering

- All pages are server-rendered using Next.js App Router
- Locale detection and content loading happen on the server
- Improved SEO and performance

### Navigation

- All internal links use `Link` component from `@/i18n/routing`
- Automatic locale prefix handling
- Maintains locale during navigation

### Middleware

**Location**: `middleware.ts`

- Handles locale detection
- Redirects root path to default locale (`/en`)
- Ensures all routes have locale prefix

## Development

### Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Adding New Pages

1. Create page in `app/[locale]/your-page/page.tsx`
2. Add translations to `messages/en.json` and `messages/es.json`
3. Add navigation link to `components/Header.tsx` if needed

### Adding New Languages

1. Add locale to `i18n/routing.ts` locales array
2. Create translation file: `messages/[locale].json`
3. Update language selector in `components/LanguageSelector.tsx`

### Adding New Components

Use shadcn CLI to add new components:

```bash
npx shadcn@latest add [component-name]
```

## Future Enhancements

- Menu builder interface
- QR code generation
- Restaurant dashboard
- Menu categories and items management
- Image upload for menu items
- User authentication
- Subscription plans
- Analytics dashboard

## Best Practices

1. **SSR First**: All pages render on the server
2. **i18n**: Use `useTranslations` hook for all text
3. **Navigation**: Always use `Link` from `@/i18n/routing`
4. **Components**: Use shadcn/ui components exclusively
5. **Styling**: Use Tailwind CSS utility classes
6. **Type Safety**: Leverage TypeScript for type checking

## Performance Considerations

- Static generation for all locale paths
- Optimized font loading
- Minimal client-side JavaScript
- Efficient CSS with Tailwind
- Server components by default
