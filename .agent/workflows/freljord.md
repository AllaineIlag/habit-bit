---
description: The Standard Operating Procedure for Team Freljord (Ops, Infra & Reliability)
---

# 🏔️ Operation: FRELJORD (Ops Workflow)

**Squad Leader:** Heimerdinger (Head of Ops)
**Squad:** Ornn (Infra), Garen (SRE), Braum (Security), Blitzcrank (Automation), Shen (Consistency)
**QA Support:** Teemo (QA Lead)

## Phase 1: The War Council (Heimerdinger)
1.  **Initialize Sitrep**:
    *   Read `mission_control/sitrep.md`.
    *   *Action:* Archive old content.
    *   *Action:* Write the new **Mission Brief**:
        ```markdown
        # 📡 ACTIVE SITUATION REPORT (SitRep)
        ## 🏔️ FRELJORD MISSION: [Task Name]
        **Squad Leader:** Heimerdinger
        **Status:** PLANNING
        
        ### 📋 SQUAD WHITEBOARD
        - [ ] **Heimerdinger**: [Pipeline/Process]
        - [ ] **Ornn**: [Infrastructure/Tooling]
        - [ ] **Garen**: [Reliability/Monitoring]
        ```
2.  **Delegate**:
    *   Assign specific sub-tasks.

## Phase 2: Forging (Fabrication)
1.  **Context & Skill Sync**:
    *   Read `mission_control/task.md`.
    *   Read `mission_control/sitrep.md`.
    *   **Execute the agency skill mapped to your champion:**

    | Champion | Agency Skill to Execute |
    |---|---|
    | **Heimerdinger** | `agency-devops-automator` (CI/CD pipelines, infrastructure automation) |
    | **Ornn** | `agency-infrastructure-maintainer` (tooling, environment, configs) |
    | **Garen** | `agency-sre-site-reliability-engineer` (SLOs, monitoring, reliability) |
    | **Braum** | `agency-security-engineer` (threat modeling, auth, secrets) |
    | **Blitzcrank** | `agency-devops-automator` (automation scripts, scheduled jobs) |
    | **Shen** | `agency-code-reviewer` (consistency enforcement, parity checks) |
2.  **Execution**:
    *   Perform Infrastructure changes (Docker, Env, CI/CD).
    *   *Constraint:* Changes must be **Immutable** (Code, not clicks).
    *   *Action:* Update `sitrep.md`.

## Phase 3: The Shield Wall (Validation)
> **Mandate:** "The wall must not break."
1.  **Local Deployment**: 
    *   Run `docker-compose up` (or equivalent). Does it boot?
2.  **Configuration Check**:
    *   Are all new `ENV` vars added to the `.env.example`?
    *   Run `shen` (or internal consistency script) to verify parity.
3.  **Security Scann**:
    *   Run `npm audit` or container scan.

## Phase 4: The Avalanche (Stress Test)
// turbo
1.  **Load Simulation**:
    *   Is the startup time acceptable? (< 5s).
    *   Does the build pass in a clean environment?

## Phase 5: The Inspection (Heimerdinger)
1.  **Infra & Pipe Audit**:
    *   **Execute Audit:** Run `inventing-pipelines` (Check CI yaml) and `persisting-service` (Check Health Endpoints).
    *   *Condition:* If "Flaky Build" or "Hardcoded Secret" found, reject.
2.  **Handover**:
    *   Update `sitrep.md`: Mark status as **[MISSION ACCOMPLISHED]**.
    *   Signal Swain.

## Phase 6: Final Report
Reply to the user with a concise summary:

```
✅ Operation: [Task Name]

What was done: [1-2 sentences]
Files changed: [list]
Deployment: PASSED / FAILED
Security: CLEAN / RISK FOUND

⚠️ Flagged: [Any manual steps detected — these must be automated in a follow-up]
```
