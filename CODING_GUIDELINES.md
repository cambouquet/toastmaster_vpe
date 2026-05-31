# Coding Guidelines: Mission Control

## 1. Operational UI/UX
- **Next Steps Dashboard**: Every automated job or script MUST conclude with a high-visibility ASCII "Mission Control" block.
- **Visual Standard**: Use box-drawing characters (`╔═╗`, `║`, `╚═╝`) to frame next actions.
- **Clarity**: Next actions must be conditional (e.g., "If X fails -> Do Y").

## 2. Infrastructure Architecture
- **Out-of-Band Priority**: Maintenance MUST run via independent SSH to bypass stuck local Runners.
- **Self-Healing**: Scripts must check Runner health and trigger detached `setsid` repairs automatically.
- **Precise Terminology**: Use **Runner** for execution workers. Avoid "Agent".

## 3. Engineering Constraints
- **File Length**: Maximum **42 lines** per file.
- **Node.js**: Mandatory **Node 24** (Alpine/Ubuntu).
- **SOLID Shell**: Apply clean code principles to all infrastructure scripts.

## 4. Technical Stack
- **Frontend**: React + Vite (Port 1777). No TypeScript.
- **Styling**: Scoped Sass (SCSS) with mandatory variables.
- **Testing**: Playwright for E2E validation.
