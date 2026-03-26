---
description: Synchronize project documentation, SitRep, and technical logs after a feature or update.
---

# /finalize-docs [scope]

> **Trigger**: Automatically called at the end of implementation workflows, or manually via `/finalize-docs [description]`.
> **Scope**: Updates `mission_control/` artifacts and technical READMEs.

## Deployed Doctrine

- **@[agency-technical-writer]**: Expert in translating technical changes into clear, concise status updates and documentation.

---

## Phase 1: Context Capture
1. **Analyze Changes**: Review the files modified and terminal outputs (build results) from the preceding task.
2. **Identify Impact**:
   - New routes/pages added?
   - Schema/RLS changes?
   - Design token additions?
   - Breaking changes or technical debt introduced?

## Phase 2: Mission Control Sync
1. **Update `mission_control/sitrep.md`**:
   - Reflect the precise state of the application (e.g., "Feature [X] is live in production").
   - Define the next logical step based on remaining P0/P1 tasks.
2. **Update `mission_control/scope.md`**:
   - Move completed items from "In Progress" to "Completed."
   - Update version numbers if applicable.
3. **Update `mission_control/tasks.md`**:
   - Ensure all related task IDs are marked `[x]`.

## Phase 3: Changelog Sync
1. **Update `CHANGELOG.md`**: Categorize the changes under `Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`, or `Security`.
   - Ensure the `[Unreleased]` section reflects the latest task completion.

## Phase 4: Technical Documentation
1. **README Update**: If a new component or logic pattern was introduced, document it in the relevant `README.md` or as a new KI.
2. **Design Audit**: Confirm the change complies with the tokens in `src/styles/tokens.css`. If custom tokens were added, document the rationale.

## Phase 4: Final Report
At the conclusion, the agent MUST provide a concise summary using the **Standard Task Execution** format:

```
✅ Task: Documentation Sync [Feature Name]

Documents Updated:
- mission_control/sitrep.md
- mission_control/scope.md
- src/.../README.md (if applicable)

Next Step: [Next logical P0/P1 feature]
```
