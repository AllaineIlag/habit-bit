---
description: Bootstrap a new Next.js + Supabase project with environment configuration.
---

# /setup-project

> **Trigger**: `/setup-project [app-name]`
> **Scope**: Project scaffolding only. No pages, no components, no features.
> **Doctrine**: Zaun (Infrastructure)

## Deployed Doctrines

- **Zaun (Infrastructure)**: For Next.js/Supabase scaffolding and middleware configuration.

---

## Phase 1: Basis Check
1. Read `mission_control/sitrep.md` — confirm no active project is already bootstrapped.
2. Confirm the target stack: **Next.js 16 (App Router) + React 19 + Supabase (PostgreSQL/RLS)**.

## Phase 2: Scaffold
1. Initialize the project:
   ```bash
   npx create-next-app@latest ./ --ts --tailwind --app --src-dir --import-alias "@/*"
   ```
2. Install Supabase client:
   ```bash
   npm install @supabase/supabase-js @supabase/ssr
   ```
3. Create the standard folder structure:
   ```
   src/
   ├── app/           # Routes (App Router)
   ├── components/    # UI components
   ├── config/        # navigation.ts, constants
   ├── lib/           # supabase.ts client, utils
   ├── actions/       # Server Actions
   └── styles/        # tokens.css, globals.css
   ```

## Phase 3: Environment Setup
1. Create `.env.local` with the required keys:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   SUPABASE_SERVICE_ROLE_KEY=
   ```
2. Create `src/lib/supabase.ts` — server and browser clients using `@supabase/ssr`.
3. Create `middleware.ts` at the root — handles auth session refresh on every request.

## Phase 4: Verification
1. 🛑 **MANDATORY**: Run `npm run build`. Fix any errors before proceeding.
2. Confirm `.env.local` is in `.gitignore`.
3. Update `mission_control/sitrep.md`: Project bootstrapped, ready for `/plan`.
