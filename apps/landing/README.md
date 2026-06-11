# SoQrMenu

Create QR menus for your restaurant in one click.

## Overview

SoQrMenu is a cloud-based platform that enables restaurants to create and manage digital QR menus. Built with Next.js, TypeScript, and shadcn/ui, it provides a fast, SEO-friendly, and multilingual solution for modern restaurants.

## Features

- **Multilingual Support**: English and Spanish with SSR
- **Modern UI**: Built with shadcn/ui and Tailwind CSS
- **SEO Optimized**: Server-side rendering for all pages
- **Responsive Design**: Works on all devices
- **Easy Navigation**: Clean and intuitive interface

## Tech Stack

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **next-intl** for internationalization

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd soqrmenuweb
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
soqrmenuweb/
├── app/
│   ├── [locale]/          # Localized routes
│   └── globals.css        # Global styles
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── Header.tsx         # Site header
│   └── LanguageSelector.tsx # Language switcher
├── i18n/                  # i18n configuration
├── messages/              # Translation files
│   ├── en.json
│   └── es.json
└── lib/                   # Utility functions
```

## Internationalization

The app supports multiple languages with automatic routing:

- English: `/en/*`
- Spanish: `/es/*`

Language switching is available via the globe icon in the header.

## Development

### Adding New Pages

1. Create a new page in `app/[locale]/your-page/page.tsx`
2. Add translations in `messages/en.json` and `messages/es.json`
3. Update navigation if needed in `components/Header.tsx`

### Adding shadcn Components

```bash
npx shadcn@latest add [component-name]
```

## License

Private - All rights reserved

## Support

For questions or support, please contact the development team.
