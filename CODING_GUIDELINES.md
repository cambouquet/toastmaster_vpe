# Coding Guidelines: Mission Control

## 1. File Constraints
- **Strict Line Limit**: No file shall exceed **42 lines**.
- **Node.js Standards**: Use **Node 24 (Alpine)** for all environments.
- **CI/CD Excellence**: Native SSH only. Avoid legacy JS actions on self-hosted runners.
- **Universal SOLID**: Every automated task must describe its technical outcome precisely.

## 2. Infrastructure Terminology
- **Runner vs Agent**: Always use the term **Runner** when referring to the GitHub Actions execution worker. "Agent" is too generic.
- **Action Naming**: Use high-clarity professional verbs:
  - `telemetry`: Health check (Disk/Docker/Nodes).
  - `cleanup`: Disk space recovery.
  - `patch-os`: Security updates.
  - `hard-reset`: Factory wipe.
  - `restart-runner`: Detached service restart.

## 3. Workflow UX (Mandatory)
- **The Next Steps Protocol**: Every job, script, or library operation MUST conclude with a clear `--- ⏭️ NEXT ACTIONS ---` block.
- **Logic**: This block must guide the user on what to do next based on the success or failure of the current operation.
- **Example**: If a runner is offline, the next action should suggest `restart-runner` or `PROVISION`.

## 4. Operational Safety
- **Anti-Fragility**: Tools must handle "cold starts" automatically.
- **Detached Operations**: Core service restarts (like Runners) must use `systemd-run` to survive SSH disconnects.
- **Rapid Fire / Deep Recovery**: Optimise for speed (assume warm environment) but fallback to full installs on failure.

## 5. Technical Stack
- **React + Vite**: Frontend on port 1777. No TypeScript.
- **Sass (SCSS)**: Scoped styles with variables.
- **Testing**: Playwright for E2E validation.
