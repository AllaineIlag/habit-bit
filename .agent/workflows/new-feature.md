---
description: Prototype and validate out-of-scope ideas before integration.
---

# /new-feature Workflow Doctrine

Use this workflow to safely develop, validate, and integrate experimental features that fall outside the main project scope.

## Phase 1: Idea Presentation & Validation
1. **The Trigger**: The user initiates with `/new-feature [idea description]`.
2. **Analysis**: The agent MUST first analyze the idea for:
   - **Market/UI Fit**: Does it match the "Premium/Bento" aesthetic?
   - **Feasibility**: Can it be prototyped without breaking core RLS/Systems?
   - **Value**: Does it enhance the user's "Momentum" or "Wow Factor"?
3. **Verdict**: The agent provides a clear "Validation Report" back to the user before starting any code.

## Phase 2: Implementation (Piltover & Zaun)
- **Design Token Mandate**: Components MUST use existing design tokens from `src/styles/tokens.css` (e.g., `--space-4`, `--page-max-width`) and `src/app/globals.css`.
- **Exception Rule**: Custom values are ONLY permitted for advanced animations (e.g., Framer Motion `transition` durations) or complex particle effects that are not represented by the core token set.
- **No Magic Numbers**: Avoid hardcoded pixel values for layout, spacing, or core colors.
- **Visual Fidelity**: Prioritize the **Piltover** doctrine for premium aesthetics (glassmorphism, high-density blurs).
- **Data Integrity**: Follow the **Zaun** doctrine for strict RLS and type-safe backend integration.

## Phase 2: Laboratory Prototyping
1. **Doctrine Alignment**: The agent MUST apply **@[Piltover]** for UI/UX fidelity and **@[Zaun]** for data/state integrity.
2. **Isolated Sandbox**: All new features MUST start in `src/components/lab/` and be displayed on the `/lab` page to prevent build side-effects.
3. **Visual Fidelity**: Prioritize "Wow Factor" (animations, gradients, glassmorphism) using Framer Motion and modern CSS.

## Phase 3: Verification & Build
1. **Visual QA**: Ensure the component is responsive and performs at 60fps.
2. **Build Integrity**: `npm run build` must pass with zero errors.

## Phase 4: Immediate Integration (Day-One)
- **Automatic Promotion**: Do not wait for a separate "Promotion" phase. Integrate the new feature into the target page (e.g., Dashboard) immediately.
- **Placeholder Replacement**: Replace any existing tiles or legacy components with the new high-fidelity version.
- **Audit-to-Production Sync**: Ensure the component works with real data from day one, using the Laboratory solely for visual state auditing (back-and-forth toggles).

## Phase 5: Automatic Integration
1. **Promotion**: Once validated in the Lab, the agent MUST automatically integrate the component into a high-visibility page (e.g., `DashboardPage`) to prevent "orphaned" features.

## Phase 6: Documentation
> Invoke `finalize-docs.md` scoped to this new feature.

1. Update `mission_control/sitrep.md` with the feature status.
2. Update `mission_control/scope.md` tracking.
3. Document why this out-of-scope idea was validated and implemented.
