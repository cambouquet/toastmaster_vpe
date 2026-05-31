# Coding Guidelines: Mission Control

## 1. Operational Infrastructure
- **Out-of-Band Maintenance**: All maintenance tasks (`telemetry`, `cleanup`, etc.) MUST run on GitHub-managed runners via Native SSH. This ensures maintenance can proceed even if the local Runner is dead.
- **Self-Healing & Chaining**: Infrastructure scripts MUST automatically chain related tasks (e.g., `cleanup` -> `telemetry`) and attempt auto-repair if they detect a downed Runner.
- **The Next Steps Protocol**: Every script or workflow MUST conclude with a clear `--- ⏭️ NEXT ACTIONS ---` block to guide human operators.

## 2. Infrastructure Terminology
- **Runner**: Always use the term "Runner". "Agent" is forbidden as it is too ambiguous.
- **Workflow UX**: Use professional, descriptive names (`patch-os`, `hard-reset`, `telemetry`, `restart-runner`).

## 3. Engineering Constraints
- **Strict Line Limit**: No file shall exceed **42 lines**.
- **Node.js**: Mandatory **Node 24** across all layers.
- **Port Isolation**: Local deployments must never share or conflict on host ports.
- **SOLID Code**: Principles apply to shell scripts as strictly as to application code.
- **Vite Bundling**: Maintain large documentation assets via `chunkSizeWarningLimit` and `manualChunks`.

## 4. Technical Stack
- **Frontend**: React + Vite (Port 1777). Pure JSX (No TypeScript).
- **Styling**: Scoped Sass (SCSS) with mandatory variable usage.
- **Testing**: Playwright for E2E validation.
