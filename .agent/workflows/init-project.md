---
description: Step 0 — Initialize mission_control files by interviewing the user before any development begins.
---

# /init-project

> **Trigger**: `/init-project`
> **Scope**: Creates `mission_control/` foundation files only. No code. No scaffolding.
> **Purpose**: Establish the project memory so every subsequent workflow has a "Basis" to read from.

## Deployed Doctrines

- **Noxus (Product/Strategy)**: For interview facilitation and story shaping.

---

## Phase 1: The Interview
Ask the user the following questions **in a single message**. Wait for their full response before proceeding.

```
1. What is the name of this project?
2. What does it do? (1-3 sentences)
3. Who is it for? (Target user)
4. What is the #1 thing it must do well? (Core value)
5. What is explicitly OUT of scope for now?
6. What are your non-negotiable rules for how the agent should work?
   (e.g., "always run npm run build before returning", "never one-shot multiple pages")
7. What are the first 3 tasks you want to accomplish?
```

---

## Phase 2: Write Foundation Files
Using the user's answers, create the `mission_control/` directory and write the following files:

### `mission_control/law.md`
The project's standing rules and agreements. The agent must read this before any task.

```markdown
# Project Law

## Project Identity
- **Name**: [from Q1]
- **Purpose**: [from Q2]
- **Target User**: [from Q3]
- **Core Value**: [from Q4]
- **Out of Scope**: [from Q5]

## Standing Rules (Non-Negotiable)
[from Q6 — formatted as a numbered list]

## Stack
- Framework: Next.js 16 (App Router) + React 19
- Backend: Supabase (PostgreSQL + RLS)
- Styling: Tailwind CSS + Shadcn/ui
```

### `mission_control/tasks.md`
The live task list. Updated by the agent as work progresses.

```markdown
# Task List

## Active
- [ ] [Task 1 from Q7]
- [ ] [Task 2 from Q7]
- [ ] [Task 3 from Q7]

## Completed
(empty)
```

### `mission_control/sitrep.md`
The rolling status report. Written fresh at project init.

```markdown
# Situation Report

**Status**: Project Initialized ✅
**Last Action**: `/init-project` completed. Foundation files written.
**Next Step**: Run `/setup-project` to scaffold Next.js + Supabase.
```

### `mission_control/log.md`
The persistent change log. First entry written at init.

```markdown
# Change Log

## [DATE] — Project Init
- Created `mission_control/` foundation files via `/init-project`.
- Rules established in `law.md`.
- Initial tasks logged in `tasks.md`.
```

---

## Phase 3: Confirmation
- Read back a **summary** of `law.md` to the user for confirmation.
- Ask: *"Are these rules and tasks correct? Any changes before we begin?"*
- Apply any corrections, then declare:

> ✅ **Foundation is set. You may now run `/setup-project`.**
