---
description: Workflow for analyzing, defining, and implementing skills for an entire team.
---

# ⚔️ Team Skill Creator Protocol

## Phase 1: Strategic Analysis (The Brainstorm)
1.  **List the Champions**: Identify all members of the target team (e.g., Piltover: Ezreal, Jhin, Katarina, Lux, Sona, Zoe).
2.  **Define Responsibilities**: For each champion, list what they *need* to do to fulfill their role.
3.  **Conflict Check (The Overlap Audit)**: Compare the lists. Are there overlaps? (e.g., Are both Jhin and Sona "designing UI"?).
    *   **Resolution**: Assign the primary responsibility to one, or split the domain (e.g., Jhin = Layout/System, Sona = Art/Assets).
    *   *Rule:* "Two champions cannot hold the exact same sword."

## Phase 2: Roster Inscription (The Yaml)
1.  **Open the Roster File**: Locate the champion's file in `.antigravity/roster/<champion_name>.yaml`.
2.  **List the Skills**: Add the authorized skills to the `skills:` section.
    *   **Format**:
        ```yaml
        skills:
          - name: skill-name-kebab-case
            description: Brief description of the capability.
            path: champions-skills/<TeamName>/skill-name.md
        ```

## Phase 3: The Forging (Content Generation)
1.  **Invoke the Creator**: Use the rules defined in `champions-skill-creator.md`.
2.  **Generate Files**: Create the markdown files for each skill in `champions-skills/<TeamName>/`.
    *   *Note:* Ensure the Team Name folder matches the Roster folder (e.g., `piltover`, `zaun`).
3.  **Verify Links**: Ensure the paths in the YAML match the actual file locations.

## Phase 4: Validation
1.  **Check Consistency**: Do the skills align with the Team Philosophy?
2.  **Verify Roster**: Does the YAML file point to existing markdown files?
