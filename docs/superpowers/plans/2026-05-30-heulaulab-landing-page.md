# heulaulab Landing Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A working Next.js landing page for heulaulab design lab — dark, cinematic, mata.bot-inspired, with Framer Motion reveals, Zustand scroll state, and full CSS token system from `DESIGN.md`.

**Architecture:** Next.js App Router, TypeScript, `src/app` structure. Zustand for cross-component scroll state. Tailwind CSS v4 with CSS custom properties as the single source of truth for design tokens. Framer Motion for all animations. No UI kit.

**Tech Stack:** Next.js · TypeScript · Tailwind CSS v4 · Zustand · Framer Motion · `next/font/google`

---

## File Map

```
heulaulab.xyz/
  docs/superpowers/plans/         ← this plan
  docs/superpowers/specs/          ← approved design spec
  src/
    app/
      layout.tsx                   ← root layout, fonts, metadata
      page.tsx                     ← page composition
      globals.css                  ← CSS tokens, resets, grain texture
    components/
      layout/
        Navbar.tsx                 ← sticky nav, Zustand scroll state
        Footer.tsx                 ← minimal dark footer
      sections/
        Hero.tsx                   ← 100dvh dark hero with grain + stagger
        About.tsx                  ← light canvas, centered text
        Features.tsx               ← asymmetric dark, stacked items
        CTA.tsx                    ← dark, centered conversion section
      ui/
        Button.tsx                 ← base button, filled + outline variants
    store/
      useLandingStore.ts           ← Zustand: isNavScrolled
    lib/
      constants.ts                 ← site copy, nav links
      motion.ts                    ← shared Framer Motion variants
  README.md
```

---

## Task 1: Scaffold Next.js Project

**Files:**
- Create: `/Users/kiyaya/heulaulab/heulaulab.xyz/package.json`
- Create: `/Users/kiyaya/heulaulab/heulaulab.xyz/tsconfig.json`
- Create: `/Users/kiyaya/heulaulab/heulaulab.xyz/next.config.ts`
- Create: `/Users/kiyaya/heulaulab/heulaulab.xyz/tailwind.config.ts`

**Steps:**

- [ ] **Step 1: Create package.json**

```json
{
  "name": "heulaulab-landing",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "framer-motion": "^11.0.0",
    "zustand": "^5.0.0"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/postcss": "^4.0.0"
  }
}
```

- [ ] **Step 2: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Create next.config.ts**

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
  },
}

export default nextConfig
```

- [ ] **Step 4: Create postcss.config.mjs (required for Tailwind v4)**

```mjs
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}

export default config
```

- [ ] **Step 5: Create tailwind.config.ts (minimal, v4 uses CSS imports)**

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
}

export default config
```

- [ ] **Step 6: Create postcss.config.mjs and .gitignore**

```
node_modules
.next
out
.env*.local
```

- [ ] **Step 7: Install dependencies**

Run: `npm install`
Expected: `added NNN packages` with no errors

- [ ] **Step 8: Commit**

```bash
git add package.json tsconfig.json next.config.ts postcss.config.mjs tailwind.config.ts .gitignore
git commit -m "chore: scaffold Next.js project with TypeScript, Tailwind v4, Framer Motion, Zustand"
```

---

## Task 2: Create Directory Structure

**Files:**
- Create: `src/app/` directory
- Create: `src/components/layout/` directory
- Create: `src/components/sections/` directory
- Create: `src/components/ui/` directory
- Create: `src/store/` directory
- Create: `src/lib/` directory

- [ ] **Step 1: Create all directories**

Run: `mkdir -p src/app src/components/layout src/components/sections src/components/ui src/store src/lib`

- [ ] **Step 2: Commit**

```bash
git add src/
git commit -m "chore: create src/ directory structure"
```

---

## Task 3: globals.css — CSS Tokens from DESIGN.md

**Files:**
- Create: `src/app/globals.css`

**Steps:**

- [ ] **Step 1: Write globals.css**

```css
@import "tailwindcss";

/* ─── Design Tokens ─────────────────────────────────────────── */
:root {
  /* Colors */
  --color-void: #0e0e10;
  --color-ink: #17171c;
  --color-canvas: #f5f4f0;
  --color-stone: #e8e6e0;
  --color-muted: #93939f;
  --color-rule: #d9d9dd;
  --color-white: #ffffff;
  --color-text-dark: #212121;
  --color-grain: rgba(255, 255, 255, 0.035);

  /* Shapes */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-pill: 32px;

  /* Spacing */
  --space-2: 2px;
  --space-4: 4px;
  --space-6: 6px;
  --space-8: 8px;
  --space-12: 12px;
  --space-16: 16px;
  --space-24: 24px;
  --space-32: 32px;
  --space-48: 48px;
  --space-64: 64px;
  --space-80: 80px;
  --space-120: 120px;
}

/* ─── Reset ────────────────────────────────────────────────── */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
}

body {
  background-color: var(--color-void);
  color: var(--color-white);
  font-family: var(--font-dm-mono), 'Courier New', monospace;
  font-size: 16px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

input, button, textarea, select {
  font: inherit;
}

p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  cursor: pointer;
  border: none;
  background: none;
}

/* ─── Scrollbar ─────────────────────────────────────────────── */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: var(--color-void);
}
::-webkit-scrollbar-thumb {
  background: var(--color-ink);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--color-muted);
}

/* ─── Selection ─────────────────────────────────────────────── */
::selection {
  background-color: var(--color-ink);
  color: var(--color-white);
}

/* ─── Focus ─────────────────────────────────────────────────── */
:focus-visible {
  outline: 2px solid var(--color-white);
  outline-offset: 3px;
}

/* ─── Grain Texture (SVG filter) ────────────────────────────── */
.grain::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 256px 256px;
  opacity: 0.06;
  pointer-events: none;
  z-index: 1;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add globals.css with CSS tokens from DESIGN.md and grain texture"
```

---

## Task 4: lib/constants.ts and lib/motion.ts

**Files:**
- Create: `src/lib/constants.ts`
- Create: `src/lib/motion.ts`

**Steps:**

- [ ] **Step 1: Write constants.ts**

```ts
export const SITE_TITLE = 'heulaulab — Multidisciplinary Design Lab'
export const SITE_DESCRIPTION =
  'Bold, unconventional design systems from digital interfaces to physical space. Built to be remembered.'

export const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: 'mailto:hello@heulaulab.xyz' },
]

export const FEATURES = [
  {
    index: '01',
    label: 'Interface Design',
    body: 'Software that respects the user\'s intelligence.',
  },
  {
    index: '02',
    label: 'Spatial Experience',
    body: 'Physical environments that change behavior.',
  },
  {
    index: '03',
    label: 'Systems Thinking',
    body: 'Brand and product systems built to last.',
  },
  {
    index: '04',
    label: 'Controlled Imperfection',
    body: 'The method behind every memorable thing we make.',
  },
]

export const ABOUT_PARAGRAPHS = [
  'heulaulab is a multidisciplinary design lab working across digital and physical space. We build bold, unconventional systems that refuse to be ignored.',
  'We work from raw modernist principles — stripped of decoration, driven by intent. Every decision is earned. Every surface is a decision.',
  'Not every brand needs to be liked. Some need to be remembered.',
]
```

- [ ] **Step 2: Write motion.ts**

```ts
import type { Variants } from 'framer-motion'

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

export const wordRevealVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

export const ctaVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/constants.ts src/lib/motion.ts
git commit -m "feat: add constants and shared motion variants"
```

---

## Task 5: Zustand Store

**Files:**
- Create: `src/store/useLandingStore.ts`

**Steps:**

- [ ] **Step 1: Write useLandingStore.ts**

```ts
import { create } from 'zustand'

interface LandingState {
  isNavScrolled: boolean
  setNavScrolled: (v: boolean) => void
}

export const useLandingStore = create<LandingState>((set) => ({
  isNavScrolled: false,
  setNavScrolled: (v) => set({ isNavScrolled: v }),
}))
```

- [ ] **Step 2: Commit**

```bash
git add src/store/useLandingStore.ts
git commit -m "feat: add Zustand landing store with isNavScrolled state"
```

---

## Task 6: UI Components — Button

**Files:**
- Create: `src/components/ui/Button.tsx`

**Steps:**

- [ ] **Step 1: Write Button.tsx**

```tsx
import React from 'react'

type ButtonVariant = 'filled' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: React.ReactNode
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-5 py-2 text-xs',
  md: 'px-7 py-3 text-sm',
  lg: 'px-9 py-4 text-sm',
}

const variantClasses: Record<ButtonVariant, string> = {
  filled:
    'bg-[var(--color-white)] text-[var(--color-void)] hover:bg-[var(--color-stone)]',
  outline:
    'bg-transparent text-[var(--color-white)] border border-[var(--color-white)] hover:bg-[var(--color-white)] hover:text-[var(--color-void)]',
}

export function Button({
  variant = 'filled',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={[
        'inline-flex items-center gap-2 rounded-[var(--radius-pill)]',
        'font-[var(--font-dm-mono)] font-medium tracking-wide',
        'transition-all duration-200 ease-out',
        'cursor-pointer',
        sizeClasses[size],
        variantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </button>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/Button.tsx
git commit -m "feat: add Button component with filled and outline variants"
```

---

## Task 7: Navbar

**Files:**
- Create: `src/components/layout/Navbar.tsx`

**Steps:**

- [ ] **Step 1: Write Navbar.tsx**

```tsx
'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLandingStore } from '@/store/useLandingStore'
import { NAV_LINKS } from '@/lib/constants'

export function Navbar() {
  const { isNavScrolled, setNavScrolled } = useLandingStore()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [setNavScrolled])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileOpen])

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px',
          backgroundColor: isNavScrolled
            ? 'var(--color-ink)'
            : 'transparent',
          borderBottom: isNavScrolled
            ? '1px solid var(--color-rule)'
            : '1px solid transparent',
          transition: 'background-color 300ms ease, border-color 300ms ease',
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: '22px',
            letterSpacing: '0.05em',
            color: 'var(--color-white)',
          }}
        >
          heulaulab
        </a>

        {/* Desktop Nav */}
        <ul
          style={{
            display: 'flex',
            gap: '40px',
            listStyle: 'none',
          }}
          className="hidden md:flex"
        >
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                style={{
                  fontFamily: 'var(--font-dm-mono)',
                  fontSize: '13px',
                  color: 'var(--color-white)',
                  opacity: 0.7,
                  transition: 'opacity 200ms ease',
                }}
                onMouseEnter={(e) => { (e.target as HTMLAnchorElement).style.opacity = '1' }}
                onMouseLeave={(e) => { (e.target as HTMLAnchorElement).style.opacity = '0.7' }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className="flex md:hidden"
          onClick={() => setIsMobileOpen(true)}
          style={{
            fontFamily: 'var(--font-dm-mono)',
            fontSize: '13px',
            color: 'var(--color-white)',
            opacity: 0.7,
          }}
          aria-label="Open menu"
        >
          MENU
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 200,
              backgroundColor: 'var(--color-void)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '48px',
            }}
          >
            <button
              onClick={() => setIsMobileOpen(false)}
              style={{
                position: 'absolute',
                top: '24px',
                right: '32px',
                fontFamily: 'var(--font-dm-mono)',
                fontSize: '13px',
                color: 'var(--color-muted)',
              }}
              aria-label="Close menu"
            >
              CLOSE
            </button>
            <ul style={{ listStyle: 'none', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    style={{
                      fontFamily: 'var(--font-bebas)',
                      fontSize: '48px',
                      color: 'var(--color-white)',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "feat: add Navbar with Zustand scroll state and mobile overlay"
```

---

## Task 8: Hero Section

**Files:**
- Create: `src/components/sections/Hero.tsx`

**Steps:**

- [ ] **Step 1: Write Hero.tsx**

```tsx
'use client'

import { motion } from 'framer-motion'
import { staggerContainer, wordRevealVariants, ctaVariants } from '@/lib/motion'
import { Button } from '@/components/ui/Button'

const HEADLINE = 'heulaulab'

export function Hero() {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100dvh',
        backgroundColor: 'var(--color-void)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px 80px',
        overflow: 'hidden',
      }}
      className="grain"
    >
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '900px' }}>
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{
            fontFamily: 'var(--font-dm-mono)',
            fontSize: '11px',
            letterSpacing: '0.16em',
            color: 'var(--color-muted)',
            textTransform: 'uppercase',
            marginBottom: '32px',
          }}
        >
          Design Lab / Digital + Physical
        </motion.p>

        {/* Headline — word-by-word stagger */}
        <motion.h1
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(72px, 12vw, 140px)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            color: 'var(--color-white)',
            marginBottom: '24px',
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.15em',
          }}
        >
          {HEADLINE.split('').map((char, i) => (
            <motion.span
              key={i}
              variants={wordRevealVariants}
              style={{ display: 'inline-block' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-dm-mono)',
            fontSize: '18px',
            color: 'var(--color-muted)',
            marginBottom: '48px',
          }}
        >
          Multidisciplinary Design Lab
        </motion.p>

        {/* CTA */}
        <motion.div
          variants={ctaVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.7 }}
        >
          <Button size="lg" onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}>
            View our work
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M10 4v12M4 10l6 6 6-6" stroke="var(--color-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Hero.tsx
git commit -m "feat: add Hero section with grain texture and character stagger animation"
```

---

## Task 9: About Section

**Files:**
- Create: `src/components/sections/About.tsx`

**Steps:**

- [ ] **Step 1: Write About.tsx**

```tsx
'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { fadeUpVariants } from '@/lib/motion'
import { ABOUT_PARAGRAPHS } from '@/lib/constants'

export function About() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="about"
      ref={ref}
      style={{
        backgroundColor: 'var(--color-canvas)',
        padding: '120px 24px',
      }}
    >
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        {/* Eyebrow */}
        <motion.p
          variants={fadeUpVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{
            fontFamily: 'var(--font-dm-mono)',
            fontSize: '11px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--color-muted)',
            marginBottom: '48px',
          }}
        >
          About
        </motion.p>

        {/* Body paragraphs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {ABOUT_PARAGRAPHS.map((para, i) => (
            <motion.p
              key={i}
              variants={fadeUpVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ delay: i * 0.1 }}
              style={{
                fontFamily: 'var(--font-dm-mono)',
                fontSize: '18px',
                lineHeight: 1.7,
                color: i === 2 ? 'var(--color-ink)' : 'var(--color-text-dark)',
                fontWeight: i === 2 ? 500 : 400,
              }}
            >
              {para}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/About.tsx
git commit -m "feat: add About section with scroll-triggered fade-up reveals"
```

---

## Task 10: Features Section

**Files:**
- Create: `src/components/sections/Features.tsx`

**Steps:**

- [ ] **Step 1: Write Features.tsx**

```tsx
'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { fadeUpVariants, staggerContainer } from '@/lib/motion'
import { FEATURES } from '@/lib/constants'

export function Features() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="work"
      ref={ref}
      style={{
        backgroundColor: 'var(--color-void)',
        padding: '120px 24px',
      }}
      className="grain"
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1.5fr',
          gap: '80px',
          alignItems: 'start',
        }}
        className="features-grid"
      >
        {/* Left: title block */}
        <div>
          <motion.p
            variants={fadeUpVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            style={{
              fontFamily: 'var(--font-dm-mono)',
              fontSize: '11px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--color-muted)',
              marginBottom: '24px',
            }}
          >
            What we do
          </motion.p>
          <motion.h2
            variants={fadeUpVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(48px, 5vw, 72px)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              color: 'var(--color-white)',
            }}
          >
            We build<br />bold systems.
          </motion.h2>
        </div>

        {/* Right: feature list */}
        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{ listStyle: 'none', display: 'flex', flexDirection: 'column' }}
        >
          {FEATURES.map((feature, i) => (
            <motion.li
              key={feature.index}
              variants={fadeUpVariants}
              style={{
                borderTop: '1px solid var(--color-rule)',
                padding: '32px 0',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-dm-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.12em',
                  color: 'var(--color-muted)',
                }}
              >
                {feature.index}
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-bebas)',
                  fontSize: '32px',
                  letterSpacing: '0',
                  color: 'var(--color-white)',
                  lineHeight: 1.2,
                }}
              >
                {feature.label}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-dm-mono)',
                  fontSize: '15px',
                  color: 'var(--color-muted)',
                  lineHeight: 1.6,
                  maxWidth: '400px',
                }}
              >
                {feature.body}
              </p>
            </motion.li>
          ))}
          {/* Last item gets bottom border */}
          <motion.li
            variants={fadeUpVariants}
            style={{
              borderTop: '1px solid var(--color-rule)',
              borderBottom: '1px solid var(--color-rule)',
              padding: '32px 0',
            }}
          />
        </motion.ul>
      </div>

      {/* Responsive grid override */}
      <style>{`
        @media (max-width: 768px) {
          .features-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Features.tsx
git commit -m "feat: add Features section with asymmetric layout and staggered scroll reveals"
```

---

## Task 11: CTA Section

**Files:**
- Create: `src/components/sections/CTA.tsx`

**Steps:**

- [ ] **Step 1: Write CTA.tsx**

```tsx
'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { fadeUpVariants } from '@/lib/motion'
import { Button } from '@/components/ui/Button'

export function CTA() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: 'var(--color-ink)',
        padding: '120px 24px',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <motion.h2
          variants={fadeUpVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(48px, 6vw, 80px)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            color: 'var(--color-white)',
            marginBottom: '24px',
          }}
        >
          Ready to be<br />remembered?
        </motion.h2>

        <motion.p
          variants={fadeUpVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-dm-mono)',
            fontSize: '16px',
            color: 'var(--color-muted)',
            marginBottom: '48px',
          }}
        >
          We work with brands that want to leave a mark.
        </motion.p>

        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.2 }}
        >
          <Button
            variant="outline"
            size="lg"
            onClick={() => { window.location.href = 'mailto:hello@heulaulab.xyz' }}
          >
            Start a project
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/CTA.tsx
git commit -m "feat: add CTA section with dark conversion layout"
```

---

## Task 12: Footer

**Files:**
- Create: `src/components/layout/Footer.tsx`

**Steps:**

- [ ] **Step 1: Write Footer.tsx**

```tsx
export function Footer() {
  return (
    <footer
      style={{
        backgroundColor: 'var(--color-void)',
        padding: '48px 24px',
        borderTop: '1px solid var(--color-rule)',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: '18px',
            letterSpacing: '0.05em',
            color: 'var(--color-white)',
          }}
        >
          heulaulab
        </span>
        <span
          style={{
            fontFamily: 'var(--font-dm-mono)',
            fontSize: '12px',
            color: 'var(--color-muted)',
          }}
        >
          © 2026
        </span>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat: add minimal dark footer"
```

---

## Task 13: Root Layout and Page Composition

**Files:**
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`

**Steps:**

- [ ] **Step 1: Write layout.tsx**

```tsx
import type { Metadata } from 'next'
import { Bebas_Neue, DM_Mono } from 'next/font/google'
import './globals.css'
import { SITE_TITLE, SITE_DESCRIPTION } from '@/lib/constants'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})

const dmMono = DM_Mono({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  variable: '--font-dm-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${dmMono.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
```

- [ ] **Step 2: Write page.tsx**

```tsx
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Features } from '@/components/sections/Features'
import { CTA } from '@/components/sections/CTA'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Features />
      <CTA />
      <Footer />
    </main>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx src/app/page.tsx
git commit -m "feat: add root layout with Bebas Neue + DM Mono fonts and page composition"
```

---

## Task 14: README.md

**Files:**
- Create: `README.md`

**Steps:**

- [ ] **Step 1: Write README.md**

```md
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
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build

```bash
npm run build
npm run start
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
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: add README with setup instructions and design decisions"
```

---

## Task 15: TypeScript Check

**Files:**
- Verify: all `.ts` and `.tsx` files

**Steps:**

- [ ] **Step 1: Run TypeScript compiler check**

Run: `npx tsc --noEmit`
Expected: No errors. If errors appear, fix them before proceeding.

- [ ] **Step 2: Run dev server and verify it starts**

Run: `npm run dev` (background)
Expected: `Ready — started server on http://localhost:3000`

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "chore: final TypeScript check passed, dev server verified"
```

---

## Spec Coverage Checklist

| Spec Item | Task(s) |
|---|---|
| CSS tokens (DESIGN.md adapted) | Task 3 |
| Bebas Neue + DM Mono fonts | Task 13 |
| Zustand store (isNavScrolled) | Task 5 |
| Navbar with scroll state | Task 7 |
| Hero (100dvh, grain, stagger) | Task 8 |
| About (light canvas, fade-up) | Task 9 |
| Features (asymmetric, staggered) | Task 10 |
| CTA (dark conversion) | Task 11 |
| Footer (minimal) | Task 12 |
| Page composition | Task 13 |
| Mobile responsive | Tasks 7, 10 |
| No hardcoded hex in components | All tasks |
| TypeScript strict, no `any` | All tasks |
| README.md | Task 14 |

---

## Implementation Order

1. Task 1 — Scaffold Next.js
2. Task 2 — Directory structure
3. Task 3 — globals.css (tokens)
4. Task 4 — lib files
5. Task 5 — Zustand store
6. Task 6 — Button component
7. Task 7 — Navbar
8. Task 8 — Hero
9. Task 9 — About
10. Task 10 — Features
11. Task 11 — CTA
12. Task 12 — Footer
13. Task 13 — Layout + Page
14. Task 14 — README
15. Task 15 — TypeScript check