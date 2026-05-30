# Vercel React Best Practices Audit — heulaulab.xyz

**Date:** 2026-05-31
**Auditor:** vercel-react-best-practices skill
**Project:** Next.js 15 + React 19 + Framer Motion + Zustand + Tailwind v4 landing page

---

## Summary

| Category | Finding Count | Severity |
|---|---|---|
| Eliminating Waterfalls | 0 | — |
| Bundle Size Optimization | 2 | Medium, Medium |
| Server-Side Performance | 1 | Medium |
| Client-Side Data Fetching | 0 | — |
| Re-render Optimization | 6 | High (×2), Medium (×4) |
| Rendering Performance | 1 | Low |
| JavaScript Performance | 1 | Low |
| **Total** | **11** | **2 High · 7 Medium · 2 Low** |

---

## Findings by Rule

### CRITICAL — Bundle Size

#### `bundle-dynamic-imports` — Missing dynamic import for heavy Framer Motion

**Files:** `src/app/layout.tsx`, `src/app/page.tsx`

Framer Motion (11.x) is imported on the client bundle via `'use client'` component files. It is a large library (≈50KB gzipped) and should be loaded via `next/dynamic` with `{ ssr: false }` for any components that are not immediately visible on page load. The `Hero` component — which renders 9 animated elements on first paint — is the primary candidate.

**Fix:** In `Hero.tsx`, add:

```tsx
import dynamic from 'next/dynamic'

const Hero = dynamic(() => import('./Hero'), { ssr: false })
// OR keep Hero.tsx as-is but defer its heavy motion imports:
```

More targeted fix — lazy-load the cursor label component inside `Hero.tsx`:

```tsx
import { lazy, Suspense } from 'react'
// Lazy-load the fixed-position cursor label
const CursorLabel = lazy(() => import('./CursorLabel'))
```

**Impact:** Reduces initial JS payload. Framer Motion tree-shakes well, but the `useMotionValue`, `useSpring`, `useTransform` chain pulls additional code into the critical path.

---

### CRITICAL — Bundle Size

#### `bundle-barrel-imports` — No barrel imports found; all imports are direct

**Status:** ✅ No issues. All imports use direct paths (`@/components/sections/Hero`, not a barrel `@/components`). Zustand store is imported directly. Good.

---

### HIGH — Re-render Optimization

#### `rerender-derived-state-no-effect` — Zustand store used for scroll boolean

**File:** `src/store/useLandingStore.ts`, `src/components/layout/Navbar.tsx`

A simple boolean (`isNavScrolled`) is stored in Zustand and written/read via a hook subscription. This causes re-renders of any component subscribed to the store. The data never leaves the client and is only used by `Navbar`. A `useState` + ref approach would avoid the store entirely.

**Current:**
```ts
// useLandingStore.ts
export const useLandingStore = create<LandingState>((set) => ({
  isNavScrolled: false,
  setNavScrolled: (v) => set({ isNavScrolled: v }),
}))
```

```ts
// Navbar.tsx — subscribes to store
const { isNavScrolled, setNavScrolled } = useLandingStore()
```

**Fix — use `useState` in `Navbar`:**
```tsx
// Remove the Zustand import entirely from Navbar
const [isNavScrolled, setIsNavScrolled] = useState(false)

// Keep the useEffect but update local state:
// setIsNavScrolled(window.scrollY > 80)
```

**Impact:** Eliminates one global store subscription. Small for now, but this store has no reason to exist.

---

### HIGH — Re-render Optimization

#### `rerender-dependencies` — `setNavScrolled` in useEffect dep array

**File:** `src/components/layout/Navbar.tsx:18`

```tsx
useEffect(() => {
  const handleScroll = () => {
    setNavScrolled(window.scrollY > 80)
  }
  window.addEventListener('scroll', handleScroll, { passive: true })
  return () => window.removeEventListener('scroll', handleScroll)
}, [setNavScrolled]) // ← zustand action, stable identity, but explicit is fine
```

`setNavScrolled` from Zustand has a stable identity (never changes), so this is not a bug — but the explicit dep signals the intent is unclear. The linter may warn about this. Safe to remove from deps once confirmed stable, or document with `// eslint-disable-next-line`.

**Impact:** Low (functional), medium (code clarity).

---

### MEDIUM — Bundle Size

#### `bundle-preload` — No preload hints for fonts or critical resources

**File:** `src/app/layout.tsx`

`Geist` from `next/font/google` is self-handling (it emits preload links automatically). No issues here.

**Opportunity:** If the project adds images, fonts, or other static assets in the future, add `<link rel="preload">` for above-the-fold resources. Not applicable to current state.

---

### MEDIUM — Bundle Size

#### `bundle-defer-third-party` — No third-party scripts present

**Status:** ✅ No third-party scripts (analytics, chat widgets, etc.) are loaded. None to defer.

---

### MEDIUM — Server-Side Performance

#### `server-hoist-static-io` — Font loading in layout module scope

**File:** `src/app/layout.tsx:6-10`

```tsx
const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
})
```

`Geist` initialization happens at module level in a Server Component (`layout.tsx` has no `'use client'`). This is correct — fonts should be hoisted to module level. However, `next/font/google` handles this automatically, so this is not a concern. **No action needed.**

---

### MEDIUM — Re-render Optimization

#### `rerender-functional-setstate` — `onClick` with inline function in map

**File:** `src/components/layout/Navbar.tsx:86-88`

```tsx
onMouseEnter={(e) => { (e.target as HTMLAnchorElement).style.opacity = '1' }}
onMouseLeave={(e) => { (e.target as HTMLAnchorElement).style.opacity = '0.7' }}
```

Inline arrow functions in JSX are created per render. For a static nav list of 3 items, this is negligible. As the list grows, consider extracting to a `useCallback`-memoized handler.

**Fix if nav list grows beyond ~5 items:**
```tsx
const handleLinkHover = (e: React.MouseEvent<HTMLAnchorElement>, active: boolean) => {
  e.currentTarget.style.opacity = active ? '1' : '0.7'
}
```

---

### MEDIUM — Re-render Optimization

#### `rerender-move-effect-to-event` — Body overflow controlled via useEffect

**File:** `src/components/layout/Navbar.tsx:20-23`

```tsx
useEffect(() => {
  document.body.style.overflow = isMobileOpen ? 'hidden' : ''
  return () => { document.body.style.overflow = '' }
}, [isMobileOpen])
```

This is a valid use of `useEffect` for side effects on DOM outside React's tree. Not a violation — `rerender-move-effect-to-event` applies to state updates that could be derived without effects. This is a genuine side effect. **No change needed.**

---

### MEDIUM — Re-render Optimization

#### `rerender-no-inline-components` — `<style>` tag defined inside component

**File:** `src/components/sections/Features.tsx:129-136`

```tsx
<style>{`
  @media (max-width: 768px) {
    .features-grid {
      grid-template-columns: 1fr !important;
      gap: 48px !important;
    }
  }
`}</style>
```

`<style>` tags inside JSX re-create a `<style>` DOM node on every render. This should be moved to a `globals.css` class or extracted to a CSS Module.

**Fix — move to `globals.css`:**
```css
/* Add to globals.css */
@media (max-width: 768px) {
  .features-grid {
    grid-template-columns: 1fr;
    gap: 48px;
  }
}
```
Then remove the `<style>` block from `Features.tsx`.

---

### MEDIUM — Re-render Optimization

#### `rerender-split-combined-hooks` — Hook dependencies are independent but correct

**File:** `src/components/layout/Navbar.tsx`

Two `useEffect` hooks exist:
1. Scroll listener (depends on `setNavScrolled`)
2. Body overflow toggle (depends on `isMobileOpen`)

These are independent concerns and correctly split. **No issue.**

---

### LOW — Rendering Performance

#### `rendering-conditional-render` — No conditional rendering with `&&` found

**Status:** ✅ Components use ternary (`isInView ? 'visible' : 'hidden'`) or explicit conditional (`{condition && <Component />}`). The `AnimatePresence` with conditional child is idiomatic Framer Motion. No issues.

---

### LOW — JavaScript Performance

#### `js-early-exit` — No performance-critical loops detected

**Status:** ✅ No hot paths with expensive iterations. The feature list is static data. No early-exit optimization needed.

---

## Positive Observations

1. **Font loading:** Correctly uses `next/font/google` (auto preload, swap display).
2. **Client components:** All animated components correctly use `'use client'`. Server components are used for static layout.
3. **Passive scroll listener:** `addEventListener` uses `{ passive: true }` — correct.
4. **Tailwind v4:** Using `@import "tailwindcss"` (v4 syntax), not the old v3 config-based approach. No unused CSS bloat.
5. **Geist font variable:** CSS variable `--font-geist` applied correctly, no FOUT.
6. **noEmit + bundler module resolution:** TypeScript config is optimized for Next.js bundler.
7. **`suppressHydrationWarning`:** Applied correctly on `<html>` tag.

---

## Recommendations (Priority Order)

| Priority | Action | Effort |
|---|---|---|
| 1 | Move `.features-grid` media query to `globals.css`, remove inline `<style>` from `Features.tsx` | Low |
| 2 | Replace Zustand scroll store with local `useState` in `Navbar` | Low |
| 3 | Add `next/dynamic` for `Hero` if bundle analysis shows Framer Motion in critical path | Medium |
| 4 | Remove `setNavScrolled` from useEffect dep array (already stable, linter-safe) | Low |
| 5 | Extract inline hover handlers to `useCallback` if nav links grow > 5 items | Low |