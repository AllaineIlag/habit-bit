# HEARTBEAT.md — Swain Automation Trigger

> **Read by:** Swain (OpenClaw Agent, Team Noxus)
> **Trigger:** Every 10 minutes (heartbeat) OR on manual command ("Swain, scan raw tasks")
> **Purpose:** Bridge the file system to Swain's internal dispatch logic.

---

## 🔁 On Every Heartbeat

Execute the following in order:

### 1. Scan the Inbox
**Path:** `C:\Projects\habit-bit\raw_tasks\`
**Action:** List all `.md` files. Ignore `README.md` and any file whose name starts with `_` (e.g. `_template.md`).

If the folder is empty (no `.raw_task` files) → log "Inbox clear." and terminate.

### 2. Batch Limit
Process a **maximum of 3 files per heartbeat cycle**.
If more than 3 files are present, process the 3 oldest and leave the rest for the next cycle.
Log: "X tasks queued. Processing 3. Remaining: Y."

### 3. Execute AUTO.md
For each file in the batch, follow the full dispatch logic in `AUTO.md`.

### 4. Dispatcher — Wake Regional Heads
After writing sub-task files to `/tasks/[region]/`, use `sessions_spawn` to activate the appropriate Regional Head agent.

**Spawn instructions per region:**

| Region | Agent to Spawn | Prompt to Send |
|---|---|---|
| `piltover` | Ezreal | "Read your assigned task file in `/tasks/piltover/`. Execute only that task. Follow `piltover.md` workflow. Report completion to Swain." |
| `zaun` | Viktor | "Read your assigned task file in `/tasks/zaun/`. Execute only that task. Follow `zaun.md` workflow. Report completion to Swain." |
| `freljord` | Heimerdinger | "Read your assigned task file in `/tasks/freljord/`. Execute only that task. Follow `freljord.md` workflow. Report completion to Swain." |
| `noxus` | Ashe + Camille | "Read your assigned task file in `/tasks/noxus/`. Execute only that task. Follow `noxus.md` workflow. Report completion to Swain." |

> ⚠️ **Dependency Check Before Spawning:** If the task file contains a `depends_on` field, do NOT spawn the dependent agent until the blocking task's region has reported completion. See dependency rules in AUTO.md.

### 5. Report to User
After processing the batch, send a Telegram summary:

```
🦅 SWAIN DISPATCH — [HH:MM]

Batch: [N] processed | [N] remaining in queue

✅ Delegated:
  - [task-name] → Ezreal (Piltover)
  - [task-name] → Viktor (Zaun)

⚠️ Flagged shallow:
  - [task-name] → /shallow/ (needs your input)

🔗 Blocked (waiting on dependency):
  - [task-name] → waiting for [blocking-task]
```

---

## 🗣️ Manual Trigger

You can override the heartbeat at any time. Send any of these phrases in Telegram:

| Phrase | Action |
|---|---|
| `"Swain, scan raw tasks"` | Run one full heartbeat cycle immediately |
| `"Swain, status"` | Report what's in `/raw_tasks/`, `/shallow/`, and active `/tasks/` |
| `"Swain, clear shallow"` | List all pending clarity requests |
| `"Swain, what's blocking"` | List any tasks with unresolved `depends_on` |

---

## 📌 Paths Reference

| Folder | Purpose |
|---|---|
| `C:\Projects\habit-bit\raw_tasks\` | Inbox — drop `.md` files here |
| `C:\Projects\habit-bit\shallow\` | Clarity requests — check when Swain flags vague tasks |
| `C:\Projects\habit-bit\tasks\piltover\` | Ezreal's sub-task queue |
| `C:\Projects\habit-bit\tasks\zaun\` | Viktor's sub-task queue |
| `C:\Projects\habit-bit\tasks\freljord\` | Heimerdinger's sub-task queue |
| `C:\Projects\habit-bit\tasks\noxus\` | Ashe + Camille's sub-task queue |
| `C:\Projects\habit-bit\tasks_log\completed\` | Archive of dispatched tasks |
| `C:\Projects\habit-bit\tasks_log\pending_clarity\` | Archive of shallow-flagged tasks |
| `C:\Projects\habit-bit\mission_control\sitrep.md` | Live project status |
| `C:\Projects\habit-bit\mission_control\tasks.md` | Active task list |
