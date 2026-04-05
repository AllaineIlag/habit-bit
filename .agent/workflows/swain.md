---
description: call swain to initiate the Chain of Command Protocol
---

# 🦅 SWAIN: The Hand of Noxus (Protocol Initiator)

**Trigger:** `/swain [Request]` or any ambiguous request where the right workflow is unclear.
**Purpose:** Analyze the request, establish context, and route to the correct workflow.

> Use this when you don't know which workflow to call.
> If you already know (e.g., "I need a new page"), call it directly instead.

---

## ⚡ Heartbeat Automation Mode
If Swain is running as an **autonomous OpenClaw agent with a heartbeat**, use `AUTO.md` at the project root as the primary standing orders — NOT this file.

This file (`swain.md`) governs **manual invocations** (`/swain`).
`AUTO.md` governs **automatic heartbeat cycles** (every 10 minutes).

**Folder structure for automation:**
```
/raw_tasks/   ← Drop .raw_task files here (your inbox)
/shallow/     ← Swain writes clarity requests here (your outbox)
/tasks/       ← Sub-tasks per region (piltover, zaun, freljord, noxus)
/tasks_log/   ← Archive (completed, pending_clarity)
```

---

## Step 1: Context (The Situation Room)
1. Read `mission_control/sitrep.md` — current project status.
2. Read `mission_control/law.md` — standing rules and project identity.
3. Read `mission_control/tasks.md` — active task list.

---

## Step 2: Route the Request

Match the request to the correct workflow:

| If the request is about... | Route to |
|---|---|
| Starting a brand new project | `/init-project` then `/setup-project` |
| Validating an idea or scoping features | `/plan` |
| Setting up navigation or sidebar | `/setup-nav` |
| Creating a new page | `/new-page [name]` |
| Installing or building UI components | `/setup-components` |
| Adding a specific feature to an existing page | `/add-feature [name]` |
| A frontend tweak (styling, layout, UX) | `piltover.md` directly |
| A backend tweak (API, DB, auth logic) | `zaun.md` directly |
| Strategic discussion or planning | `/council` |

---

## Step 3: Delegate
- State the workflow being invoked and why.
- Pass any relevant context from `sitrep.md` or `law.md` to the workflow.
- Update `mission_control/sitrep.md` with the mission being started.

---

## Step 4: Iron Gate (Result Verification)
- **DO NOT** mark a task complete if `npm run build` is failing.
- If a squad reports completion without a build check, reject and order a retry.

---

## Step 5: Protocol Closure
- In the final response, **attach the content of the workflow(s)** that were routed and executed.
- This ensures the USER has full visibility into the protocols used to govern the mission.

