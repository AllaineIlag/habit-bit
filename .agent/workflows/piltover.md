---
description: The Standard Operating Procedure for Team Piltover (Frontend & Design)
---

# 🔵 Operation: PILTOVER (Frontend Workflow)

**Squad Leader:** Ezreal (Head of Frontend)
**Squad:** Jhin (UI/UX), Katarina (React), Sona (Art), Lux (Access), Zoe (Concept)
**QA Support:** Teemo (QA Lead)

## Phase 1: The Briefing Room (Ezreal)
1.  **Initialize Sitrep**:
    *   Read `mission_control/sitrep.md`.
    *   *Action*: Archive old content to `mission_control/log.md` if necessary (e.g., if the previous mission is complete).
    *   *Action*: Wipe `sitrep.md` and write the new **Mission Brief** on the "Whiteboard":
        ```markdown
        # 📡 ACTIVE SITUATION REPORT (SitRep)
        ## 🔵 PILTOVER MISSION: [Task Name]
        **Squad Leader:** Ezreal
        **Status:** PLANNING

        ### 📋 SQUAD WHITEBOARD (Who does what & What's Next)
        - [ ] **Ezreal**: [Coordination Task]
        - [ ] **[Specialist Name]**: [Specific Component/File Task]
        - [ ] **[Specialist Name]**: [Specific Component/File Task]
        - [ ] **Teemo**: Build Verification
        ```
2.  **Delegate**:
    *   Assign specific sub-tasks to specialists in the Sitrep (as shown above).

## Phase 2: Fabrication (Specialists)
1.  **Context & Skill Sync**:
    *   Read `mission_control/task.md` (Global Objectives) and `mission_control/law.md`.
    *   Read `mission_control/sitrep.md` (Immediate Orders).
    *   **Execute the agency skill mapped to your champion:**

    | Champion | Agency Skill to Execute |
    |---|---|
    | **Ezreal** | `agency-ux-architect` (coordination, navigation config, PageScaffold) |
    | **Jhin** | `agency-ux-architect` (color systems, spacing, design tokens) |
    | **Katarina** | `agency-frontend-developer` (React components, routing, state) |
    | **Lux** | `agency-accessibility-auditor` (ARIA, keyboard nav, contrast) |
    | **Sona** | `agency-ui-designer` (visual polish, variants, component specs) |
    | **Zoe** | `agency-ui-designer` (concept, micro-animations, creative direction) |
2.  **Execution**:
    *   Perform code changes (Components, CSS, Logic).
    *   *Constraint*: Must follow the **"WOW" Aesthetic Protocol** (Vibrant, Animated, Premium, Responsive).
    *   *Action*: Update `sitrep.md` marking your specific item as `[/]` (In Progress) and then `[x]` (Complete).


## Phase 3: Visual Reconnaissance (Validation)
> **Mandate:** "Trust, but verify. Then verify again."
1.  **Construct the Stage**: 
    *   Create a temporary page or route (e.g., `/playground/[feature-name]`) strictly outside the authentication system.
2.  **Mock the Intel**: 
    *   Populate this page with static, mock data to isolate visual logic from backend dependencies.
3.  **Summon the Scout**: 
    *   Spawn a browser agent (Headless Browser / Browser Session) to navigate to this coordinate.
    *   *Command Interaction*: "Open browser and verify [Component Name] at [URL]"
4.  **Verify the Art**: 
    *   Confirm alignment, responsiveness, and 'The Drama' (visual polish) within the live browser environment.

## Phase 4: The Stress Test (QA / Teemo)
// turbo
1.  **Build Verification (The Iron Will)**:
    *   Run `npm run build`.
    *   *Condition*: If it fails, **DO NOT REPORT YET**.
    *   **Auto-Correction Protocol**: Read the error log -> Attempt a fix -> Retry Build.
    *   *Limit*: Max 3 retries.
    *   *Fallback*: If 3rd retry fails, ONLY THEN report failure to Swain.
2.  **Visual Check** (If applicable):
    *   Verify: Does it look premium? Are there animations?
    *   Verify: Do buttons give feedback (e.g., hover states, click ripples, confirmation modals)?

## Phase 5: The Inspection (Ezreal)
1.  **Alignment & Code Audit**:
    *   **Execute Audit:** Lux runs `agency-accessibility-auditor`. Jhin runs `agency-ux-architect` to verify colors, spacing, and design token compliance.
    *   Compare the result against the Command's (User's) original request and `task.md`.
    *   *Condition*: If defects (rogue colors, bad spacing) are found, reject and send back to Phase 2.
2.  **Handover**:
    *   Update `sitrep.md`: Mark status as **[MISSION ACCOMPLISHED]**.
    *   Signal Swain for final report.

## Phase 6: Final Report
Reply to the user with a concise summary:

```
✅ Operation: [Task Name]

What was done: [1-2 sentences]
Files changed: [list]
Build: PASSED / FAILED
Visual verified: YES / NO

⚠️ Flagged: [Any improvised actions without a workflow — flag for future improvement]
```
