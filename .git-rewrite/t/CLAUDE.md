# HEULAULAB — AI WORKER MANUAL

> This project is operated primarily by AI workers (Claude Code).
> This file is your entry point. Read it fully before touching anything.

---

## ⚠️ MANDATORY: READ SKILL FILES BEFORE WORKING

Before doing ANY work in a domain, you MUST read the corresponding skill file.
No exceptions. These files encode the exact patterns this project enforces.

| Task | Read This First |
|------|----------------|
| Creating or editing API calls | `.claude/skills/services.md` |
| Creating or editing Zustand stores | `.claude/skills/stores.md` |
| Creating or editing hooks | `.claude/skills/hooks.md` |
| Creating or editing any component | `.claude/skills/components.md` |
| Touching `src/lib/`, axios, or QueryClient | `.claude/skills/lib.md` |
| Building a full feature (multiple files) | Read ALL of the above |

If you skip a skill file and produce code that violates its patterns,
you have failed this task regardless of whether the code "works."

---

## Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | Next.js 15, App Router | `src/` directory, TypeScript |
| Styling | Tailwind CSS v4 | CSS-first `@theme` — NO `tailwind.config.js` |
| UI | shadcn/ui | Auto-generated into `src/components/ui/` |
| Server state | TanStack Query v5 | All API data lives here |
| Client state | Zustand v5 | UI-only state, always with devtools |
| HTTP | Axios | ONE instance at `src/lib/axios.ts` |
| Animation | Framer Motion | Opt-in per component, not global |
| Package manager | Bun | NEVER use npm, yarn, or pnpm |

---

## Data Flow

```
API
 └─► src/lib/axios.ts         ← single Axios instance + interceptors
      └─► src/services/*.ts   ← domain service functions
           └─► src/hooks/*.ts ← TanStack Query hooks wrapping services
                └─► src/app/ or src/components/ ← components consume hooks
```

Violations of this flow are architecture bugs, not style preferences.

---

## State Rules

- **API / server data** → TanStack Query (via hooks in `src/hooks/`)
- **UI / client-only data** → Zustand (in `src/stores/`)
- **Form state** → local `useState` for simple; React Hook Form for complex
- **NEVER** put API response data into a Zustand store
- **NEVER** put UI toggle state into TanStack Query

---

## Folder Map

```
src/
├── app/              Next.js App Router pages and layouts
│   └── [route]/
│       ├── page.tsx              Server component, minimal, delegates to View
│       ├── layout.tsx            Optional, route-specific layout only
│       └── _components/          Components used ONLY in this route
├── components/
│   ├── ui/           shadcn auto-generated — DO NOT EDIT MANUALLY
│   └── common/       Shared components used in 2+ routes
├── hooks/            TanStack Query hooks + reusable UI hooks
├── lib/              Singleton instances: axios, query-client, utils
├── providers/        React context providers
├── services/         HTTP call functions, one file per resource
├── stores/           Zustand stores, one file per domain
└── types/            Shared TypeScript types/interfaces

.claude/
├── skills/           Domain skill files — AI reads these before working
└── commands/         Custom Claude Code slash commands
```

---

## Hard Rules

These are non-negotiable. Violating any of these is a bug.

1. **Never use `any`** — use `unknown` + type guard, or declare proper types
2. **Never import raw axios** — always `import api from "@/lib/axios"`
3. **Never fetch in components** — call a hook, hooks call services
4. **Never put business logic in `page.tsx` or `layout.tsx`**
5. **Never install packages without asking** — unless the task explicitly requires it
6. **Never duplicate query logic** — if a hook exists, use it
7. **Default to server components** — add `"use client"` only when strictly needed
8. **Never edit `src/components/ui/`** — shadcn owns this directory
9. **Never use `bun add`** without confirming with user unless scaffolding new feature
10. **Always use shadcn components** for inputs, buttons, dialogs, tables

---

## Custom Commands

Use these before rolling your own scaffold:

| Command | What It Does |
|---------|-------------|
| `/new-feature [name]` | Full feature scaffold: types, service, hooks, page, view |
| `/new-page [route]` | New App Router page at given route |
| `/new-service [domain]` | New service file following service skill pattern |
| `/new-store [name]` | New Zustand store with devtools |
| `/new-component [name]` | New component with placement decision logic |
| `/audit` | Full architecture + TypeScript audit |
| `/audit-ui` | UI consistency audit (colors, shadcn, inline styles) |
| `/fix-types` | Find and fix all `any`, `@ts-ignore`, missing types |
