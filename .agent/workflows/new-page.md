---
description: Scaffold one new page using PageScaffold tokens. One page per invocation. No logic, no data fetching.
---

# /new-page [name]

> **Trigger**: `/new-page [page-name]` (e.g., `/new-page auth`)
> **Scope**: One page only. Shell + route only. No business logic, no data fetching.
> **Prerequisite**: `/setup-nav` complete. `src/config/navigation.ts` and `PageScaffold` must exist.

## Deployed Doctrines

- **Piltover (Frontend)**: For page shell and PageScaffold compliance.
- **Zaun (Infrastructure)**: For Server Action stubs and data contracts.

---

## Phase 1: Basis Check
1. Read `mission_control/sitrep.md` — confirm navigation shell is in place.
2. Read `mission_control/scope.md` — confirm `[page-name]` is a P0 or P1 feature.
   - ⚠️ If the page is **P2 or not listed**, flag it to the user before proceeding.
3. **Routing Decision**: Determine if the page is public (e.g., landing, login) or protected (dashboard).
   - If protected: Create in `src/app/(app)/[page-name]/page.tsx`.
   - If public: Create in `src/app/[page-name]/page.tsx`.
4. Check if the target `page.tsx` already exists. If yes, stop and report — do not overwrite.

## Phase 2: Frontend Shell (Piltover Doctrine)
> Invoke `piltover.md` with scope locked to this one page.

1. Create `src/app/[page-name]/page.tsx`:

```tsx
import { PageScaffold } from '@/components/layout/page-scaffold';

export default function [PageName]Page() {
  return (
    <PageScaffold title="[Page Name]">
      {/* Content coming in /add-feature */}
    </PageScaffold>
  );
}
```

2. Add the page to `src/config/navigation.ts` if it is not already listed.
3. **No inline styles. No hardcoded values. All layout via design tokens.**

## Phase 3: Backend Contract (Zaun Doctrine — only if page needs data)
> Invoke `zaun.md` with scope locked to this one page's data contract.

If the page will require server data (e.g., `/dashboard` needs user habits):
1. Create a stub Server Action in `src/actions/[page-name].ts`:

```ts
'use server';

// TODO: implement in /add-feature
export async function get[PageName]Data() {
  return null;
}
```

2. Do **not** implement logic yet. Stub only.

## Phase 4: Verification
1. 🛑 **MANDATORY**: Run `npm run build`. The new page must compile with zero errors.
2. Confirm the page is reachable via the sidebar.
3. Update `mission_control/sitrep.md`:

```
Status: Page /[page-name] scaffolded ✅
Next Step: Run `/add-feature [page-name]` to implement content and logic.
```
