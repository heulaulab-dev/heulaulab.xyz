# heulaulab Landing Page — Design Spec

**Date:** 2026-05-30
**Status:** Draft
**Stack:** Next.js (App Router, TypeScript, `src/app`) · Zustand · Tailwind CSS v4 · Framer Motion · `next/font`

---

## 1. Concept & Direction

heulaulab is a multidisciplinary design lab working across digital and physical space. The landing page must communicate: **boldness without apology, systems over decoration, memory over familiarity**.

The visual system adapts the Cohere token engineering (spacing, typography scale, rounded corners) but shifts the tone from editorial restraint to **raw modernism with controlled imperfection**. Where Cohere is measured, heulaulab is severe. Same structural rigor, confrontational attitude.

---

## 2. Design Tokens

### Colors

| Token | Hex | Usage |
|---|---|---|
| `--color-void` | `#0e0e10` | Hero/CTA dark backgrounds |
| `--color-ink` | `#17171c` | Navbar scrolled, cards, primary surfaces |
| `--color-canvas` | `#f5f4f0` | Light section backgrounds (About) |
| `--color-stone` | `#e8e6e0` | Secondary surfaces |
| `--color-muted` | `#93939f` | Metadata, secondary text, subheadings |
| `--color-rule` | `#d9d9dd` | Dividers, borders |
| `--color-white` | `#ffffff` | Text on dark, CTA buttons |
| `--color-text-dark` | `#212121` | Body text on light backgrounds |
| `--color-grain` | `rgba(255,255,255,0.035)` | Grain overlay on dark surfaces |

### Typography

- **Display:** `Bebas Neue` — bold, compressed, architectural headlines. Fallback: `Impact, Arial Narrow, sans-serif`
- **Body/UI/Mono:** `DM Mono` — monospaced for all copy, labels, metadata. Fallback: `Courier New, monospace`

| Role | Font | Size | Weight | Tracking | Line Height |
|---|---|---|---|---|---|
| Hero display | Bebas Neue | clamp(72px, 10vw, 120px) | 400 | -0.02em | 1 |
| Section heading | Bebas Neue | 60px | 400 | -0.02em | 1 |
| Card heading | Bebas Neue | 32px | 400 | 0 | 1.2 |
| Body large | DM Mono | 18px | 400 | 0 | 1.6 |
| Body | DM Mono | 16px | 400 | 0 | 1.6 |
| Label | DM Mono | 12px | 400 | 0.12em | 1.4 |
| Micro | DM Mono | 11px | 400 | 0.08em | 1.4 |

### Spacing

Base: 8px. Major values: 8, 16, 24, 32, 48, 64, 80, 120, 160px.

### Shapes

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | 4px | Small chips, form inputs |
| `--radius-md` | 8px | Cards, feature blocks |
| `--radius-lg` | 16px | Large cards, modals |
| `--radius-pill` | 32px | CTA buttons |

---

## 3. Layout & Structure

```
[Navbar]          — sticky, transparent → solid on scroll
[Hero]            — 100dvh, dark field, centered
[About]           — light canvas, centered text column
[Features]        — asymmetric, left text / right stacked items
[CTA]             — dark field, centered, minimal
[Footer]          — dark, minimal wordmark + links
```

### Responsive Breakpoints

| Breakpoint | Width | Key behavior |
|---|---|---|
| Mobile | <640px | Single column, reduced headline scale, hamburger nav |
| Tablet | 640–1024px | Two-column features, tighter spacing |
| Desktop | >1024px | Full layout, horizontal nav |

---

## 4. Components

### Navbar

- **Transparent** over hero (hero sits behind)
- **Scrolled state** (80px threshold): `background: var(--color-ink)`, `border-bottom: 1px solid var(--color-rule)`
- Logo: `heulaulab` wordmark in Bebas Neue, `--color-white`, links to `#hero`
- Nav links: `Work`, `About`, `Contact` in DM Mono 14px, `opacity: 0.7` → `1` on hover, no underline
- Desktop: horizontal links, no hamburger
- Mobile: links collapse to full-screen dark overlay with `×` close control
- Transition: `background` and `border-color` with `300ms ease` via CSS transition

**Zustand state:** `isNavScrolled: boolean` — set to `true` when `window.scrollY > 80`

### Hero Section

- Full viewport: `min-height: 100dvh`
- Background: `#0e0e10` with CSS grain texture (pseudo-element + SVG noise filter)
- Layout: Flex column, center-aligned, `padding: 120px 24px 80px`
- Eyebrow: `DESIGN LAB / DIGITAL + PHYSICAL` — DM Mono 12px, uppercase, tracked, `--color-muted`
- Headline: `heulaulab` — Bebas Neue, clamp(72px, 10vw, 120px), white, centered
- Subhead: `Multidisciplinary Design Lab` — DM Mono 18px, `--color-muted`
- CTA: `View our work` pill button — white fill `#ffffff`, dark text `#0e0e10`, `radius-pill`, DM Mono 14px bold
- Scroll indicator: single animated down-arrow (SVG) at absolute bottom center, slow opacity pulse

**Motion:**
- `staggerChildren: 0.12s` per word of headline (each letter wrapped in span)
- Subhead fades in after 400ms delay
- CTA slides up 200ms after subhead
- Scroll arrow appears last, 300ms after CTA

### About Section

- Background: `--color-canvas` `#f5f4f0`
- Single centered column, `max-width: 680px`, centered with auto margins
- Padding: `120px 24px`
- Eyebrow: `ABOUT` — DM Mono 12px uppercase tracked, `--color-muted`
- Body: 3 tight paragraphs in DM Mono 18px, `--color-text-dark`
  - Para 1: Identity — "heulaulab is a multidisciplinary design lab."
  - Para 2: Method — "We build bold, unconventional systems."
  - Para 3: Positioning — "Not every brand needs to be liked. Some need to be remembered."
- Motion: `useInView` fade-up, `threshold: 0.2`, `duration: 0.6s`, `easeOut`

### Features Section

- Background: `--color-void` `#0e0e10`
- Padding: `120px 24px`
- Layout: Left column (eyebrow + section title, ~40%) + Right column (4 stacked feature items, ~60%)
- On mobile: stack to single column

**Feature items (4):**
1. **Interface Design** — Software that respects the user's intelligence.
2. **Spatial Experience** — Physical environments that change behavior.
3. **Systems Thinking** — Brand and product systems built to last.
4. **Controlled Imperfection** — The method behind every memorable thing we make.

**Feature item treatment:**
- DM Mono 11px uppercase label in `--color-muted` (e.g., `01 / INTERFACE DESIGN`)
- Bebas Neue 32px heading in white
- DM Mono 16px body in `--color-muted`
- Thin top border `1px solid var(--color-rule)` on each item
- No card backgrounds — raw text blocks against the dark field

**Motion:** Staggered `y: 40` → `y: 0` fade-up as each item enters viewport, 0.15s stagger

### CTA Section

- Background: `--color-ink` `#17171c`
- Padding: `120px 24px`
- Centered, single column
- Headline: `Ready to be remembered?` — Bebas Neue 60px, white
- Subline: `We work with brands that want to leave a mark.` — DM Mono 18px, `--color-muted`
- CTA: `Start a project` — outlined pill button, white border, transparent fill, white text, `radius-pill`
- Motion: Single fade-up `y: 30` → `y: 0`, `duration: 0.8s`, `easeOut`

### Footer

- Background: `--color-void` `#0e0e10`
- Padding: `48px 24px`
- Layout: `heulaulab` wordmark left + `© 2026` right, DM Mono 12px
- Minimal — no columns, no links, just the mark and year

### Base Button Component (`Button.tsx`)

Props:
- `variant`: `'filled'` | `'outline'`
- `size`: `'sm'` | `'md'` | `'lg'`
- `children`: ReactNode
- `className?: string`
- All other native `<button>` props forwarded

Default: `radius-pill`, DM Mono 14px weight 500, no box shadow.

---

## 5. Zustand Store

```ts
// src/store/useLandingStore.ts
interface LandingState {
  isNavScrolled: boolean
  setNavScrolled: (v: boolean) => void
}
```

- `isNavScrolled` read by `Navbar` to toggle background
- Set via `scroll` event listener in `Navbar` component (client component)
- Clean up listener on unmount

---

## 6. Shared Motion Variants

```ts
// src/lib/motion.ts
export const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
}

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
}

export const wordRevealVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
}
```

---

## 7. Site Copy (constants.ts)

```ts
export const SITE_TITLE = 'heulaulab — Multidisciplinary Design Lab'
export const SITE_DESCRIPTION = 'Bold, unconventional design systems from digital interfaces to physical space. Built to be remembered.'
export const NAV_LINKS = [{ label: 'Work', href: '#work' }, { label: 'About', href: '#about' }, { label: 'Contact', href: 'mailto:hello@heulaulab.xyz' }]
```

---

## 8. Technical Notes

- All images: `next/image`
- All color values: CSS variables only, no hardcoded hex in components
- TypeScript strict mode — no `any`, no implicit `any`
- `globals.css` defines all CSS custom properties; components import no external CSS
- No UI kit, no Radix, no shadcn
- Mobile menu: CSS transition on an absolutely-positioned overlay, not a JS animation library
- Grain texture: SVG `feTurbulence` filter applied via `::before` pseudo-element on dark sections

---

## 9. File Structure

```
src/
  app/
    layout.tsx         # Root layout, font injection, metadata, fonts
    page.tsx           # Composes all sections in order
    globals.css        # CSS variables, resets, base styles, grain texture
  components/
    layout/
      Navbar.tsx
      Footer.tsx
    sections/
      Hero.tsx
      About.tsx
      Features.tsx
      CTA.tsx
    ui/
      Button.tsx
  store/
    useLandingStore.ts
  lib/
    constants.ts
    motion.ts
```

---

## 10. Spec Self-Review

- [ ] No TBD/TODO placeholders — all copy is explicit
- [ ] Internal consistency — dark sections use `--color-void`/`--color-ink`, light uses `--color-canvas`
- [ ] Scope: single focused landing page, no multi-page routing
- [ ] No ambiguity — every component has defined layout, motion, and content