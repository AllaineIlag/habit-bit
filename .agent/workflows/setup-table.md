# /setup-table [name]

> **Trigger**: `/setup-table [name]` (e.g., `/setup-table habits`)
> **Scope**: Install shadcn Table primitives and scaffold a full TanStack Data Table. 
> **Prerequisite**: Next.js 14+ / 15+ / 16+, `@tanstack/react-table`, and `globals.css` with `radius-lg` card tokens.

## Deployed Doctrines

- **Piltover (Frontend)**: For premium table UI and PageScaffold integration.
- **Zaun (Infrastructure)**: For type definitions (contracts) only.

---

## Phase 1: Prerequisite Check
1. Ensure `@tanstack/react-table` and `lucide-react` are installed.
// turbo
2. Run `npx shadcn@latest add table`. 
// turbo
3. Run `npx shadcn@latest add input button dropdown-menu`. (Used for filtering/sorting UI).

## Phase 2: Core Scaffolding (Piltover Doctrine)
1. **Create Column Definitions**: `src/components/[name]/[name]-columns.tsx`
   - Define `ColumnDef<T>` with icons and proper formatting.
   - Include a "Header" with sorting capability.

2. **Create Data Table Component**: `src/components/[name]/[name]-table.tsx`
   - Implement sorting (`getSortedRowModel`).
   - Implement filtering (`getFilteredRowModel`).
   - Implement pagination (`getPaginationRowModel`).

3. **Premium Theming**:
   - Wrap the entire `<Table />` in a `<Card />` or a `div` with these classes:
     ```tsx
     className="rounded-[var(--radius-lg)] border bg-card text-card-foreground shadow-sm overflow-hidden"
     ```
   - Ensure the `radius-lg` token from `globals.css` is applied.
   - Use `Standard` shadcn styles (no glassmorphism).

## Phase 3: Integration
1. Export the table for use in `page.tsx`.
2. Pass a stub data array for immediate visual feedback.

## Phase 4: Verification
// turbo
1. 🛑 **MANDATORY**: Run `npm run build`. The project must build with zero errors.
2. Verify table sorting and filtering work in the browser.

## Phase 5: Documentation
1. Update `mission_control/sitrep.md` with the table scaffolded status.
2. Document any new data contracts used in the columns.
