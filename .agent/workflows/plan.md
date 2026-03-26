---
description: Validate the app idea, define user stories, and establish the MVP feature scope before any code is written.
---

# /plan

> **Trigger**: `/plan [brief description of what you want to build]`
> **Scope**: Discovery and validation only. No code. No UI design.
> **Prerequisite**: `/init-project` complete — `mission_control/law.md` must exist.

## Deployed Doctrines

- **Noxus (Product/Strategy)**: For discovery, validation, and scope definition.

---

## Phase 1: Basis Check
1. Read `mission_control/law.md` — confirm project identity, rules, and stack.
2. Read `mission_control/tasks.md` — understand what's already been decided.
3. **Delta Rule**: If this is a re-plan or update, identify only what has *changed* — do not re-discover the entire app.

## Phase 2: Idea Validation
Answer the following before moving forward:
- Is this idea feasible within the Next.js + Supabase architecture?
- Is there a simpler way to achieve the core value?
- What are the top 2 technical risks (e.g., real-time requirements, heavy data)?

## Phase 3: Feature Scope
Produce `mission_control/scope.md`:

```markdown
# Project Scope

## App Summary
[1-3 sentences]

## User Persona
- **Who**: [type of user]
- **Goal**: [what they want to achieve]
- **Pain**: [what currently frustrates them]

## Feature Priority
| Priority | Feature | Notes |
|---|---|---|
| P0 (MVP) | [Core feature] | Must ship |
| P1 (Quality) | [Nice feature] | Ship if time allows |
| P2 (Future) | [Enhancement] | Backlog |

## Out of Scope
- [Explicit exclusions]
```

## Phase 4: Handoff
1. Update `mission_control/tasks.md` — add next tasks based on the scope.
2. Update `mission_control/sitrep.md`:

```
Status: Planning complete ✅
Next Step: Run `/setup-project` to scaffold the app.
```

> ✅ **Gate**: Do NOT proceed to `/setup-project` until scope is confirmed by the user.
