# heulaulab Landing Page

Bold, cinematic landing page for heulaulab — a multidisciplinary design lab working across digital and physical space.

## Stack

- **Framework:** Next.js 15 (App Router, TypeScript)
- **Styling:** Tailwind CSS v4 + CSS custom properties (design tokens from `DESIGN.md`)
- **State:** Zustand — nav scroll state
- **Animation:** Framer Motion — scroll-triggered reveals, stagger, grain texture
- **Fonts:** Bebas Neue (display headlines) · DM Mono (body/UI)

## Design Decisions

- **Dark-first aesthetic** — hero and features use `#0e0e10` dark field with grain texture overlay
- **Controlled imperfection** — film grain pseudo-element on dark sections; architectural Bebas Neue headlines; zero decorative chrome
- **CSS tokens as source of truth** — all color, spacing, and shape values are CSS custom properties; no hardcoded hex in components
- **No UI kit** — every component built from scratch

## Setup

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build

```bash
bun run build
bun run start
```

## Project Structure

```
src/
  app/              # layout.tsx, page.tsx, globals.css
  components/
    layout/         # Navbar, Footer
    sections/       # Hero, About, Features, CTA
    ui/             # Button
  store/            # useLandingStore.ts (Zustand)
  lib/              # constants.ts, motion.ts
```