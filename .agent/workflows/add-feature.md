---
description: Implement one feature at a time. Full stack — UI, logic, and data — scoped to a single feature.
---

# /add-feature [name]

> **Trigger**: `/add-feature [feature-name]` (e.g., `/add-feature habit-streak`)
> **Scope**: One feature only. Full stack implementation within that feature's boundary.
> **Prerequisite**: The target page must exist (via `/new-page`). Components must be ready (via `/setup-components`).

## Deployed Doctrines

- **Piltover (Frontend)**: For UI wiring and client components.
- **Zaun (Infrastructure)**: For Server Actions, RLS, and schema updates.

---

## Phase 1: Basis Check
1. Read `mission_control/sitrep.md` — confirm the target page exists.
2. Read `mission_control/scope.md` — confirm `[feature-name]` is P0 or P1.
   - ⚠️ If it is P2, flag it to the user and stop.
3. Read `mission_control/law.md` — confirm this feature does not violate any standing rules.

## Phase 2: Backend First (Zaun Doctrine)
> Invoke `zaun.md` scoped to this feature only.

1. **Schema** (if needed): Define or update the Supabase table for this feature.
   - Run migration via `supabase-mcp-server` or document the SQL.
   - Add RLS policy: all rows must be user-scoped (`user_id = auth.uid()`).

2. **Server Action**: Implement in `src/actions/[feature-name].ts`:

```ts
'use server';
import { createServerClient } from '@/lib/supabase';

export async function [featureAction](data: FeatureInput) {
  const supabase = createServerClient();
  // 1. Verify auth
  // 2. Validate input
  // 3. Execute DB operation
  // 4. Return typed result or error
}
```

3. **Rule**: All data mutations MUST go through Server Actions. No direct DB calls from client components.

## Phase 3: Frontend Wiring (Piltover Doctrine)
> Invoke `piltover.md` scoped to this feature only.

1. Replace the placeholder content in `src/app/[page]/page.tsx` with real components.
2. Wire Server Action to the UI using `useActionState` or `useTransition`.
3. Handle loading, error, and success states explicitly — no silent failures.
4. Use only components from `src/components/shared/` or `src/components/ui/`. No one-off inline JSX blocks.

## Phase 4: Verification
1. **Functional test**: Manually verify the feature works end-to-end (create, read, update, delete as applicable).
2. **Auth test**: Confirm the feature is inaccessible when logged out.
3. **RLS test**: Confirm users can only see their own data.
4. 🛑 **MANDATORY**: Run `npm run build`. Zero errors before returning to user.
5. Update `mission_control/tasks.md` — mark feature as complete.
## Phase 5: Documentation
> Invoke `finalize-docs.md` scoped to this feature.

1. Update `mission_control/sitrep.md` with the feature completion status.
2. Update `mission_control/scope.md` status.
3. Document any new patterns or technical decisions in the codebase.
