# 📥 raw_tasks — Task Inbox

This is Swain's inbox. Drop a `.raw_task` file here and it will be automatically picked up on the next heartbeat (every 10 minutes).

---

## How to Create a Task

Create a file named: `[short-task-name].md`

Example: `add-weight-chart.md`

> ⚠️ **Naming rule:** Do NOT start your filename with `_`. Files starting with `_` are treated as templates and ignored by Swain.

### Minimum Viable Task (Simple)
```
Add a weight tracking chart to the Health page.
The chart should show the last 30 days of weight entries from the database.
Use recharts. Follow the Bento card style.
```

### Full Task Format (Recommended)
```
# Task: [Name]

## What
[What do you want built or changed?]

## Where
[Which page, component, or system?]

## Why
[Why is this needed? What's the user problem?]

## Acceptance Criteria
- [ ] [What does "done" look like?]
- [ ] [What should NOT break?]

## Notes
[Any constraints, references, or decisions already made]
```

---

## What Happens Next

| Condition | Swain does... |
|---|---|
| Task is clear | Writes sub-tasks to `/tasks/[region]/` and dispatches to the right team |
| Task is vague | Writes a clarity request to `/shallow/` and moves the file to `/tasks_log/pending_clarity/` |

---

## Rules

- **One task per file.** Don't stack multiple requests in one `.md`.
- **Don't edit a file after dropping it.** If you need to update, add a new `.md`.
- After processing, files are moved automatically — don't touch them.
