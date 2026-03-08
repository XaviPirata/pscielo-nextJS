# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Development server with Turbopack
npm run build     # Production build
npm run lint      # ESLint
npm run optimize:og  # Optimize OG image (runs scripts/optimize-og-image.js)
```

No test suite is configured. There is no test command.

## Architecture

Single-page landing site for **PsCielo** — a psychology center in Córdoba, Argentina. Built with Next.js 15 App Router, React 19, TypeScript, and Tailwind CSS v4.

### Page structure

`src/app/page.tsx` renders one full-viewport section per scroll snap:

1. `HeroSection` — full-screen background video (Cloudinary) with LCP image poster
2. `InstalacionesSection`
3. `QuienesSomosSection`
4. `ServiciosSection`
5. `ProfesionalesSection` — professional cards grid (desktop) / swipeable carousel (mobile), opens `ProfessionalModal`
6. `ContactoSection` — contact info, Google Maps iframe, `ContactForm`

All sections except Hero are lazy-loaded via `next/dynamic`.

### Layout-level components (`src/app/layout.tsx`)

All lazy-loaded via `next/dynamic` (without `ssr: false` to avoid layout issues):

- `FloatingDock` — desktop navigation dock
- `MobileMenu` — hamburger menu for mobile
- `SmoothScrollManager` — desktop: section-by-section wheel scroll using Framer Motion; mobile: native scroll with Lenis
- `WhatsAppButton` — fixed floating button, fires GTM `whatsapp_click` event
- `CustomCursor` — custom cursor on desktop

### Component directory layout

```
src/components/
  sections/     # Full-viewport page sections
  content/      # Data-driven components (ProfessionalCard, therapy-cards)
  forms/        # ContactForm
  ui/           # Reusable UI primitives and decorative/animation elements
  magicui/      # Magic UI library components (particles, dock, animated-gradient-text)
  utils/        # SmoothScrollManager
src/lib/
  utils.ts      # cn() helper (clsx + tailwind-merge)
```

### Contact form & anti-spam

`src/components/forms/contact-form.tsx` POSTs JSON to `https://psicodelcielo.com/submit` (external Node.js server on a VPS managed with PM2). Anti-spam layers:

- Cloudflare Turnstile widget (`@marsidev/react-turnstile`), site key hardcoded in the component
- Honeypot hidden `company` field
- Client-side rate limiting (30 s between submits)
- Minimum time-on-page (3 s) and interaction count (3) checks
- GTM `form_submit` dataLayer push on success

### Analytics & tracking

Google Tag Manager is loaded via `next/script` with `strategy="lazyOnload"`. GTM ID defaults to `GTM-T3PPCXPP` and can be overridden with `NEXT_PUBLIC_GTM_ID`.

### Media & assets

- Videos and remote images are served from **Cloudinary** (`res.cloudinary.com`). Remote pattern is whitelisted in `next.config.ts`.
- Professional photos live in `public/imagenes/` as both `.jpeg` and `.webp` pairs. File names with special characters must be URL-encoded when referenced in JSX (e.g. `ROC%C3%8DO%20N.%20LOPEZ%20VALAZZA.jpeg`).
- Lottie animation JSON files live in `public/animaciones/`.

### Fonts

Two custom fonts are loaded via `@font-face` in `src/app/globals.css`:
- **Hey Gotcha** (primary, `--font-sans` / `--font-heading`) — served from `public/fonts/`
- **UT Breado Sans Demo** — secondary, also from `public/fonts/`

### Theming

Dark/light mode via `next-themes` (`ThemeProvider` wraps the app). Animated stars (`StarsForSection`) are only visible in dark mode.

### Deployment

Deployed to **Vercel** via auto-deploy on push to `main`. Required environment variables:

| Variable | Where used |
|---|---|
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Overrides hardcoded site key in ContactForm (optional) |
| `NEXT_PUBLIC_GTM_ID` | Overrides GTM container ID in layout |
