---
description: Install and theme Shadcn base components. Reusable building blocks only. No page assembly, no logic.
---

# /setup-components

> **Trigger**: `/setup-components`
> **Scope**: Shared, reusable UI components only. No page-specific layout. No data fetching.
> **Prerequisite**: `/setup-nav` complete. Design tokens and Shadcn must be initialized.

## Deployed Doctrines

- **Piltover (Frontend)**: For component specs, theming, and implementation.

---

## Phase 1: Basis Check
1. Read `mission_control/sitrep.md` — confirm nav shell is in place.
2. Read `mission_control/scope.md` — identify the P0/P1 features to determine which components are actually needed. Do not build components for P2 features.

## Phase 2: Shadcn Base Components
Use the `shadcn` MCP to install only the components required by P0/P1 features:

```bash
# Examples — install only what scope.md demands
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
```

> **Rule**: Do not install components speculatively. Every component added must map to a feature in `scope.md`.

## Phase 3: Custom Components
Build project-specific reusable components in `src/components/`:

For each component:
- Accept props with `variants` (e.g., `size`, `intent`) — no one-off styles
- Use design tokens or Shadcn CSS variables only — no hardcoded values
- Include a JSDoc comment describing its purpose and props

Example structure:
```
src/components/
├── ui/          ← Shadcn-generated (do not edit manually)
└── shared/      ← Custom reusable components go here
```

## Phase 4: Accessibility Check
1. All interactive components must have ARIA labels.
2. Keyboard navigation must work (tab, enter, escape).
3. Color contrast must meet WCAG AA minimum against the Shadcn preset background.

## Phase 5: Verification
1. 🛑 **MANDATORY**: Run `npm run build`. All components must compile with zero errors.
2. Visually confirm components render correctly with the active Shadcn preset.
3. Update `mission_control/sitrep.md`:

```
Status: Base components ready ✅
Next Step: Run `/new-page [name]` or `/add-feature [name]` to start building.
```
