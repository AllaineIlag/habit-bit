---
description: The Standard Operating Procedure for Team Noxus (Product, QA & Management)
---

# 🦅 Operation: NOXUS (Command Workflow)

**Squad Leader:** Swain (Grand General / CPO)
**Squad:** Teemo (QA Lead), Ashe (UAT Lead), Camille (Precision), Caitlyn (Investigation), Twisted Fate (Risk), Vel'Koz (Research), Yuumi (Support)

## Phase 1: The War Room (Swain)
> **Mandate:** "Vision is the only truth."
1.  **Initialize Strategy**:
    *   Read `mission_control/sitrep.md`.
    *   **Execute Skill:** `dictating-strategy`. Is the objective clear? Is it feasible?
    *   *Action:* Write the **Mission Brief**:
        ```markdown
        # 📡 ACTIVE SITUATION REPORT (SitRep)
        ## 🦅 NOXUS MISSION: [Task Name]
        **Squad Leader:** Swain
        **Status:** PLANNING
        
        ### 📋 SQUAD WHITEBOARD
        - [ ] **Swain**: [Strategy/PRD]
        - [ ] **Teemo**: [QA Plan]
        - [ ] **Ashe**: [UAT Verification]
        ```
2.  **Mobilize**:
    *   Assign QA/UAT tasks.

## Phase 2: Conquest (Fabrication/Testing)
1.  **Context & Skill Sync**:
    *   **Execute the agency skill mapped to your champion:**

    | Champion | Agency Skill to Execute |
    |---|---|
    | **Swain** | `agency-senior-project-manager` (strategy, PRD, scope decisions) |
    | **Teemo** | `agency-evidence-collector` (edge cases, bug hunting, QA) |
    | **Ashe** | `agency-ux-researcher` (user flow verification, UAT) |
    | **Camille** | `agency-code-reviewer` (precision audit, code quality) |
    | **Caitlyn** | `agency-reality-checker` (fact-checking, production readiness) |
    | **Twisted Fate** | `agency-growth-hacker` (metrics, risk, growth opportunities) |
    | **Vel'Koz** | `agency-analytics-reporter` (technical analysis, data insights) |
    | **Yuumi** | `agency-technical-writer` (documentation, HANDOFF.md) |
2.  **Execution ( QA & UAT )**:
    *   This phase is often about *testing* other teams' work, or defining specs for them.
    *   *Action:* Update `sitrep.md` with defects found.

## Phase 3: The Interrogation (Validation)
> **Mandate:** "No secrets."
1.  **Edge Case Analysis (Teemo)**: 
    *   **Execute Audit:** Run `planting-mushrooms`.
    *   Try to break the feature with invalid inputs, network disconnects, or spam.
2.  **User Flow Verification (Ashe)**:
    *   **Execute Audit:** Run `surveying-field`.
    *   Walk the "Golden Path" of the user. Is it smooth?

## Phase 5: The Judgment (Swain)
1.  **Product Audit**:
    *   Compare the result against the original `dictating-strategy` (PRD).
    *   *Condition:* If the feature works but is confusing, REJECT.
2.  **Greenlight**:
    *   If alignment is perfect, update `sitrep.md`: Mark status as **[MISSION ACCOMPLISHED]**.

## Phase 6: Final Report
Reply to the user with a concise summary:

```
✅ Operation: [Task Name]

What was done: [1-2 sentences]
Defects found: [count or "none"]
User flow: SMOOTH / NEEDS WORK
Build: PASSED / FAILED

⚠️ Flagged: [Any feature that passed QA but feels confusing to users]
```
