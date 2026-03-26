---
description: Standard Task Execution
---

Executes a generic task request and reports back concisely.

## Report Format
At the conclusion of every task, reply to the user with:

```
✅ Task: [Task Name]

What was done: [1-2 sentences]
Files changed: [list or "none"]
Build: PASSED / FAILED

⚠️ Flagged: [Anything that needs follow-up]
```
