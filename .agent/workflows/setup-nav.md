---
description: Set up config-driven navigation with sidebar shell and blank page scaffolds. No content, no logic.
---

# /setup-nav

> **Trigger**: `/setup-nav`
> **Scope**: Navigation config + sidebar shell + blank page files only. No content. No data fetching.
> **Doctrine**: Piltover (Frontend)
> **Prerequisite**: `/setup-project` complete. `src/` folder structure must exist.

## Deployed Agents

## Deployed Doctrines

- **Piltover (Frontend)**: For navigation config, layout, and component implementation.

---

## Phase 1: Basis Check
1. Read `mission_control/sitrep.md` — confirm project is scaffolded.
2. Read `mission_control/scope.md` — extract the full list of pages from the Feature Priority table.
3. **This is your page list.** Do not invent pages not listed there.

## Phase 2: Design Tokens
1. Create `src/styles/tokens.css` with the project's design constants:

```css
:root {
  /* Spacing — Law of 4 */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;

  /* Layout */
  --sidebar-width: 240px;
  --page-max-width: 1280px;
  --page-padding-x: var(--space-6);

  /* Breakpoints (use in Tailwind config, not inline) */
  --bp-sm: 640px;
  --bp-md: 768px;
  --bp-lg: 1024px;

  /* Colors — no hardcoded hex values in components */
  --color-bg: #0f0f0f;
  --color-surface: #1a1a1a;
  --color-border: #2a2a2a;
  --color-text-primary: #f5f5f5;
  --color-text-muted: #888888;
  --color-accent: #7c6ff7;
}
```

> **Rule**: All component files MUST reference these tokens. No hardcoded hex, px, or rem values.

## Phase 3: Navigation Config
1. Create `src/config/navigation.ts`:

```ts
import { HomeIcon, /* other icons */ } from 'lucide-react';

export const NAV_ITEMS = [
  { name: 'Overview', href: '/dashboard', icon: HomeIcon },
  // Add one entry per page from scope.md
] as const;
```

2. **One source of truth.** Adding a page = adding one line here. The sidebar auto-updates.

## Phase 4: PageScaffold Component
1. Create `src/components/layout/page-scaffold.tsx`:

```tsx
interface PageScaffoldProps {
  title: string;
  children: React.ReactNode;
}

export function PageScaffold({ title, children }: PageScaffoldProps) {
  return (
    <div
      style={{
        maxWidth: 'var(--page-max-width)',
        padding: '0 var(--page-padding-x)',
        margin: '0 auto',
      }}
    >
      <h1>{title}</h1>
      {children}
    </div>
  );
}
```

> **Rule**: Every `page.tsx` file MUST wrap its content in `<PageScaffold>`. No exceptions.

## Phase 5: Sidebar Selection (Smart Detection)
Determine the sidebar strategy based on existing files or user preference:

| Scenario | Strategy | Action |
|---|---|---|
| **Existing Sidebar** | Adopt | If `components/ui/sidebar.tsx` exists, do NOT install. Skip to Integration. |
| **User Request** | Install Block | Run `npx shadcn@latest add [block-id]` (e.g., `sidebar-07`). |
| **New Project** | Build Custom | Create a lean, config-driven sidebar from scratch. |

**Integration Step (Mandatory)**:
Regardless of the strategy, the sidebar MUST map its links to `src/config/navigation.ts`. 
- If using a Shadcn block, refactor its `navMain` or equivalent array to import and use `NAV_ITEMS`.

## Phase 6: Scaffolding & Layout
1. **Layout Wiring**: 
   - 🛑 **MANDATORY**: Create a protected layout in `src/app/(app)/layout.tsx` containing the `SidebarProvider` and `AppSidebar`.
   - Keep the root `src/app/layout.tsx` minimal (fonts, global providers) for standalone pages like `/auth`.
2. **Blank Page Generation**: For each page in `NAV_ITEMS` that requires authentication, create the route inside `src/app/(app)/`:

```tsx
// src/app/[page-name]/page.tsx
import { PageScaffold } from '@/components/layout/page-scaffold';

export default function [PageName]Page() {
  return (
    <PageScaffold title="[Page Name]">
      <p>Content area ready.</p>
    </PageScaffold>
  );
}
```

> **Responsive Rule**: Sidebar must collapse to icons or a mobile sheet on screens `< var(--bp-md)`. Ensure `SidebarTrigger` is visible on mobile.

## Phase 7: Verification
1. 🛑 **MANDATORY**: Run `npm run build`. All blank pages must compile with zero errors.
2. Visually confirm sidebar links navigate to the correct (empty) pages.
3. Confirm sidebar collapses correctly on mobile.
4. Update `mission_control/sitrep.md`:

```
Status: Navigation shell complete ✅
Next Step: Run `/setup-components` or `/new-page [name]` to start building.
```