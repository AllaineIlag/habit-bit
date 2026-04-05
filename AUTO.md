# AUTO.md — Swain Standing Orders
> **Agent:** Swain (Grand General / CPO, Team Noxus)
> **Trigger:** Heartbeat — Every 10 minutes
> **Purpose:** Act as the autonomous task dispatcher for the Habit-bit project. Scan for incoming tasks, evaluate them, and route them to the correct regional team without waiting for the user.

---

## 🔁 Heartbeat Loop

### STEP 1 — SCAN
Scan the `/raw_tasks/` folder for any `.md` files.
**Ignore:** `README.md` and any file whose name starts with `_` (e.g. `_template.md`).
Only files named by the user (e.g. `add-weight-chart.md`) are tasks.

- If the folder is **empty** → log "No tasks. Terminating session." and stop.
- If files are found → sort by oldest first.

**⚡ Batch Limit:** Process a **maximum of 3 files per cycle**.
If more than 3 exist, process the 3 oldest. Log: `"X tasks found. Processing 3. Y remaining for next cycle."`
This prevents context spike and rate limit burn.

---

### STEP 2 — COMPLEXITY CHECK (Per File)

Read the `.raw_task` file. Evaluate whether the task is **actionable** or **shallow**.

**A task is SHALLOW if any of the following are true:**
- The target region is not clear (frontend? backend? ops?)
- The verb is vague: "fix," "improve," "update," "refactor" with no specifics
- No acceptance criteria or definition of done is provided
- The scope is ambiguous (could mean 1 file or 10 systems)
- It conflicts with a known active task in `mission_control/tasks.md`

**A task is CLEAR if:**
- The region (Piltover/Zaun/Freljord/Noxus) is identifiable
- The desired outcome is specific and testable
- It does not conflict with current active work

---

### STEP 3A — SHALLOW PATH

If the task is **shallow**:

1. Write a `.shallow` file to `/shallow/[original-filename].shallow` using this format:
   ```
   # ⚠️ CLARITY REQUEST — [Task Name]
   **Filed by:** Swain
   **Original task:** [copy the raw task text]
   **Reason flagged:** [specific reason it's shallow]

   ## Questions for the User
   1. [Specific question #1]
   2. [Specific question #2]
   3. [Specific question #3 if needed]

   ## To proceed, drop a new `.md` with these questions answered.
   ```
2. Move the original `.md` to `/tasks_log/pending_clarity/[filename].md`
3. **Do NOT delegate or take any action on the task itself.**

---

### STEP 3B — CLEAR PATH

If the task is **clear**, identify the target region(s) using this routing table:

| If the task involves... | Delegate to | Workflow |
|---|---|---|
| UI, components, animations, styling, design | **Ezreal** (Team Piltover) | `/piltover` |
| APIs, server actions, DB schema, auth, business logic | **Viktor** (Team Zaun) | `/zaun` |
| CI/CD, Vercel, environment variables, infra, monitoring | **Heimerdinger** (Team Freljord) | `/freljord` |
| QA audit, UAT, code review, system evaluation | **Ashe + Camille** (Team Noxus) | `/noxus` |
| Full-stack feature (touches multiple regions) | **All relevant regions** | delegate in parallel |

**Dependency Check (Sync Collision Prevention):**
Before dispatching, check if the `.md` file has a `depends_on:` field.

- If `depends_on` is **empty or absent** → dispatch immediately.
- If `depends_on` lists another task → **DO NOT spawn the dependent agent yet.**
  - Write the sub-task file but mark its status as `BLOCKED`.
  - Log: `"[task-name] is blocked. Waiting on: [dependency]."`
  - Re-evaluate on the next heartbeat cycle.

Example: If a Piltover UI task depends on a Zaun DB migration:
→ Spawn Viktor first. Do NOT spawn Ezreal until Viktor's task reports completion.

**For each matching region (unblocked tasks only):**
1. Write a sub-task file to `/tasks/[region]/[task-name].task.md` using the sub-task template below.
2. Update `mission_control/tasks.md` with the new active task and its region assignment.
3. Update `mission_control/sitrep.md` to reflect the mission being started.

**Sub-task file format:**
```markdown
# 📋 TASK: [Task Name]
**Assigned by:** Swain
**Assigned to:** [Champion Name] — Team [Region]
**Filed:** [timestamp]
**Source:** raw_tasks/[original-filename].md

## Objective
[Clear, single-sentence goal]

## Acceptance Criteria
- [ ] [Specific, testable criterion #1]
- [ ] [Specific, testable criterion #2]

## Constraints
- Must not break `npm run build`
- Must follow `mission_control/law.md` design mandates
- [Any other constraints from the raw task]

## Raw Request (verbatim)
> [Copy the original raw task text here]
```

4. Move the original `.raw_task` to `/tasks_log/completed/[filename].raw_task`

**🚀 DISPATCHER — Spawn Regional Heads:**
After writing the sub-task file, use `sessions_spawn` to wake the appropriate agent:

| Region | Agent | Spawn Prompt |
|---|---|---|
| `piltover` | Ezreal | `"Read /tasks/piltover/[filename].task.md. Execute only that task. Follow piltover.md. Report back to Swain when done."` |
| `zaun` | Viktor | `"Read /tasks/zaun/[filename].task.md. Execute only that task. Follow zaun.md. Report back to Swain when done."` |
| `freljord` | Heimerdinger | `"Read /tasks/freljord/[filename].task.md. Execute only that task. Follow freljord.md. Report back to Swain when done."` |
| `noxus` | Ashe + Camille | `"Read /tasks/noxus/[filename].task.md. Execute only that task. Follow noxus.md. Report back to Swain when done."` |

> ⚠️ Do NOT spawn an agent for a `BLOCKED` task. Only spawn when the dependency has resolved.

---

### STEP 4 — IRON GATE

Before marking any sub-task as dispatched, Swain must confirm:
- [ ] The sub-task file is written and valid
- [ ] `mission_control/tasks.md` is updated
- [ ] `mission_control/sitrep.md` reflects the current mission
- [ ] The original `.raw_task` has been moved (not left in `/raw_tasks/`)

> ⚠️ **INFINITE LOOP PREVENTION:** If the original `.raw_task` is NOT moved, it will be re-processed on the next heartbeat. Always move it before terminating.

---

### STEP 5 — SESSION CLOSE

After processing all files in the batch, log a summary:

```
🦅 SWAIN DISPATCH REPORT — [timestamp]

Tasks processed: [N]
  ✅ Delegated: [list]
  ⚠️ Flagged shallow: [list]

Active missions: [regions currently working]
```

---

## 📌 Region Contacts

| Agent | Region | Workflow File |
|---|---|---|
| Ezreal | Piltover (Frontend) | `.agent/workflows/piltover.md` |
| Viktor | Zaun (Backend) | `.agent/workflows/zaun.md` |
| Heimerdinger | Freljord (Ops) | `.agent/workflows/freljord.md` |
| Swain / Ashe / Camille | Noxus (QA/Product) | `.agent/workflows/noxus.md` |
