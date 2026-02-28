# CLAUDE.md — Project Instructions

This file contains instructions and conventions for Claude when working in this project.

---

## Project Overview

A React practice project built with Vite and TypeScript. The goal is to learn and integrate modern frontend technologies in a structured way.

---

## Tech Stack

| Layer      | Technology                   |
| ---------- | ---------------------------- |
| Framework  | React 19                     |
| Build tool | Vite 7                       |
| Language   | TypeScript 5.9 (strict mode) |
| Styling    | Tailwind CSS v4              |
| Linting    | ESLint 9 (flat config)       |
| Formatting | Prettier 3                   |
| Git hooks  | Husky + lint-staged          |

## Scripts

```bash
npm run dev          # Start dev server
npm run build        # Type-check + build
npm run lint         # Run ESLint
npm run lint:fix     # Auto-fix ESLint errors
npm run format       # Run Prettier
npm run preview      # Preview production build
```

---

## Conventions

### TypeScript

- Strict mode is ON — never use `any`, use `unknown` if the type is truly unknown
- Prefer `type` over `interface` for object shapes unless extending
- Always infer types from Zod schemas: `type FormValues = z.infer<typeof schema>`

### Components

- One component per file
- Component filename = component name (PascalCase): `UserCard.tsx`
- Use named exports for components, default export only for pages

### Imports

- Use `@/` path alias for all src imports (once configured)
- Import order: external libraries → internal modules → styles

### Styling

- Use Tailwind CSS utility classes only
- No inline styles, no CSS modules (unless there is a specific reason)
- Class order is auto-sorted by prettier-plugin-tailwindcss on save

### Naming

- Components: `PascalCase`
- Functions, variables, hooks: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- Files: `camelCase.ts` for utils/hooks, `PascalCase.tsx` for components

---

## Folder Structure (target)

```
src/
  components/       # Reusable UI components
    ui/             # Base primitives (Button, Input, Modal...)
  pages/            # Route-level page components
  features/         # Feature-specific logic and components
  hooks/            # Custom React hooks
  lib/              # Third-party config (axios instance, queryClient)
  services/         # API call functions grouped by domain
  types/            # Shared TypeScript types and interfaces
  utils/            # Pure utility functions
  store/            # Zustand stores
```

---

## Testing (once Vitest is set up)

- Test files live next to the source file: `Button.test.tsx` beside `Button.tsx`
- Use React Testing Library — test behavior, not implementation
- Prefer `userEvent` over `fireEvent` for simulating interactions
- Run tests: `npm run test`

---

## Environment Variables

- `.env` — shared defaults (safe to commit, no secrets)
- `.env.development` — dev-specific values
- `.env.production` — production-specific values
- `.env.local` — local overrides (gitignored, never commit)

All Vite env vars must start with `VITE_` to be accessible in the browser.

---

## Git Workflow

- Pre-commit hook runs `lint-staged`: ESLint + Prettier on staged files
- Commit messages should be descriptive
- Never bypass hooks with `--no-verify` unless absolutely necessary

---

## User Preferences

- Communication language: Russian (respond in Russian by default)
- Keep solutions simple — no over-engineering
- Ask before making large structural changes
