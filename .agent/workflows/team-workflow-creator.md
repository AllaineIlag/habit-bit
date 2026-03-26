---
description: Meta-workflow for bootstrapping a new Team (e.g., Zaun, Noxus) with Skills and Operational Protocols.
---

# 🏭 Team Workflow Creator (The Foundry)

**Objective:** To instantiate a fully operational Team structure from nothing.
**Inputs:** [Team Name] (e.g., "Zaun")

## Phase 1: Skill Injection (The Capability)
> **Reference:** `workflows/team-skill-creator.md`

1.  **Identify the Squad**:
    *   **Source of Truth**: Consult `champions-list/champions-v4.md` to identify the team members and their specific roles.
2.  **Execute Protocol**: Run the `team-skill-creator` workflow for the target team.
    *   *Action:* Brainstorm needed skills.
    *   *Action:* Update Champion Rosters (`.yaml`).
    *   *Action:* Create `champions-skills/<TeamName>/*.md` files.

## Phase 2: Workflow Fabrication (The Doctrine)
> **Goal:** Create `.agent/workflows/<team-name>.md`

1.  **Determine Team Archetype**:
    *   **Visual (Frontend/Design):** (Like Piltover). Needs Browser Verification, Component Checks.
    *   **Logical (Backend/Data):** (Like Zaun). Needs Unit Tests, API Responses, DB Schema Checks.
    *   **Operational (Infra/Ops):** (Like Freljord). Needs Deployment checks, Load tests.

2.  **Draft the Workflow File**:
    Create `.agent/workflows/<team-name>.md` using the Standard Template:

    *   **Header:** `Operation: <TEAM_NAME>`
    *   **Squad:** List the members.
    *   **Phase 1 (Briefing):** Standard Sitrep initialization.
    *   **Phase 2 (Fabrication):**
        *   🛑 **CRITICAL MANDATE:** Must include the step:
            > "**Consult Skill Tablets:** Open `champions-skills/<TeamName>/`. You *must* adhere to defined protocols."
    *   **Phase 3 (Validation):** *ADAPT THIS TO ARCHETYPE.*
        *   *If Visual:* "Visual Reconnaissance" (Browser).
        *   *If Logical:* "System Integrity Test" (Run Jest/Pytest/Curl).
    *   **Phase 5 (Inspection):**
        *   🛑 **CRITICAL MANDATE:** Must include the step:
            > "**Execute Audit:** Run team-specific audit skills."
    *   **Phase 6 (The Report):**
        *   🛑 **CRITICAL MANDATE:** Must include the **Retrospective Codification** section:
            ```markdown
            ## 🧠 Retrospective Codification
            - **Skills Deployed:** ...
            - **⚠️ Improvisations:** [Flag new complex actions]
            ```

3.  **Registration**:
    *   Add the new workflow to the known workflows list (if applicable).
    *   Notify Swain that the Team is ready for deployment.
