---
description: The Standard Operating Procedure for Team Zaun (Backend & Core Systems)
---

# 🟢 Operation: ZAUN (Backend Workflow)

**Squad Leader:** Viktor (Head of Backend)
**Squad:** Ekko (Core), Nasus (Data), Renata (Biz Logic), Yasuo (API), Ryze (Principal), Malzahar (Lib)
**QA Support:** Teemo (QA Lead)

## Phase 1: The Undercity Council (Viktor)
1.  **Initialize Sitrep**:
    *   Read `mission_control/sitrep.md`.
    *   *Action:* Archive old content.
    *   *Action:* Write the new **Mission Brief**:
        ```markdown
        # 📡 ACTIVE SITUATION REPORT (SitRep)
        ## 🟢 ZAUN MISSION: [Task Name]
        **Squad Leader:** Viktor
        **Status:** PLANNING
        
        ### 📋 SQUAD WHITEBOARD
        - [ ] **Viktor**: [Architecture/Design]
        - [ ] **[Specialist Name]**: [Backend Task]
        - [ ] **Teemo**: Test Coverage Check
        ```
2.  **Delegate**:
    *   Assign specific sub-tasks.

## Phase 2: Mutation (Fabrication)
1.  **Context & Skill Sync**:
    *   Read `mission_control/task.md`.
    *   Read `mission_control/sitrep.md`.
    *   **Execute the agency skill mapped to your champion:**

    | Champion | Agency Skill to Execute |
    |---|---|
    | **Viktor** | `agency-backend-architect` (system design, Server Actions, architecture) |
    | **Ekko** | `agency-software-architect` (modularity, patterns, code structure) |
    | **Nasus** | `agency-database-optimizer` (schema, indices, RLS, migrations) |
    | **Renata Glasc** | `agency-backend-architect` (business logic, rules, validation) |
    | **Ryze** | `agency-software-architect` (principal-level review, scalability) |
    | **Yasuo** | `agency-backend-architect` (API routes, Server Actions, endpoints) |
    | **Malzahar** | `agency-tool-evaluator` (library selection, dependency evaluation) |
2.  **Execution**:
    *   Perform code changes (API, Database, Logic).
    *   *Constraint:* Must follow the **"Hex Core" Principle** (Scalability, Modularity, Purity).
    *   *Action:* Update `sitrep.md`.

## Phase 3: System Integrity (Validation)
> **Mandate:** "The machine must not falter."
1.  **Unit Tests**: 
    *   Run verifying tests for the specific module modified.
2.  **Schema Check**:
    *   If DB changed: Run `npx prisma validate` (or equivalent).
3.  **API Check**:
    *   Curl the endpoint or use a test client to verify the JSON structure (`flowing-like-wind`).

## Phase 4: The Stress Test (QA / Teemo)
// turbo
1.  **Build Verification (The Iron Will)**:
    *   Run `npm run build` (or backend build command).
    *   *Condition*: If it fails, **DO NOT REPORT YET**.
    *   **Auto-Correction Protocol**: Read the error log -> Attempt a fix -> Retry Build.
    *   *Limit*: Max 3 retries.
    *   *Fallback*: If 3rd retry fails, ONLY THEN report failure to Swain.
2.  **Coverage Check**:
    *   Did we break existing tests? Run the suite.

## Phase 5: The Inspection (Viktor)
1.  **Logic & Code Audit**:
    *   **Execute Audit:** Ryze runs `agency-software-architect` (structure review). Nasus runs `agency-database-optimizer` (migration integrity, RLS check).
    *   *Condition:* If "Spaghetti" or "Data Risk" is found, reject.
2.  **Handover**:
    *   Update `sitrep.md`: Mark status as **[MISSION ACCOMPLISHED]**.
    *   Signal Swain.

## Phase 6: Final Report
Reply to the user with a concise summary:

```
✅ Operation: [Task Name]

What was done: [1-2 sentences]
Files changed: [list]
Build: PASSED / FAILED
Tests: PASSED / FAILED

⚠️ Flagged: [Any improvised actions or tech debt to address]
```
