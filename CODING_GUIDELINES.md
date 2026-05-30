# Coding Guidelines: Mission Control

## 1. File Constraints
- **Strict Line Limit**: No file shall exceed **42 lines** of code.
- **Node.js Standards**: Use **Node 24 (Alpine)** for all environments.
- **CI/CD Excellence**: Native SSH only. Do not use legacy JavaScript actions (like `checkout` or `setup-node` on self-hosted runners) to avoid Node 20 deprecation noise and slow binary downloads.
- **Parallel Deployment**: Always use local self-hosted runners labeled by environment (`prod`, `test`).
- **Pipeline Architecture**: Consistently use the three primary workflows:
  - **🚀 DEPLOY**: Main application delivery (Production & Test).
  - **🛰️ PROVISION**: Initial VM setup and runner registration.
  - **🛠️ MAINTENANCE**: Infrastructure health, cleanup, and resets.
- **Universal SOLID**: Clean code and SOLID principles apply to the entire stack, including CI/CD pipelines, YAML configurations, and shell scripts. Logic must be decoupled (e.g., separate infra library scripts) and naming must be explicit and intent-driven.
- **Satellite Provisioning**: Zero manual intervention. Provisioning new VMs MUST be handled exclusively via the "PROVISION" workflow.
- **Vite Bundling**: Use `manualChunks` to keep main assets under 2000kB. Increase `chunkSizeWarningLimit` for large dependency-heavy documentation.
- **Feature Toggles**: Never hardcode environment-specific logic. Use `VITE_` prefixed variables. Every new toggle MUST be documented in [docs/architecture/feature-nexus.md](docs/architecture/feature-nexus.md) with a "Why" and "Version".
- **Version Tracking**: Manual version increments in [docs/architecture/feature-nexus.md](docs/architecture/feature-nexus.md) are required. Use Semantic Versioning for features.
- **Single Responsibility**: If a file grows too large, extract logic into hooks or smaller sub-components.

## 2. Technical Stack
- **React + Vite**: Fast, modern frontend framework running on port 1777.
- **Pure JavaScript (JSX)**: No TypeScript. Keep the code lean, readable, and free of type boilerplate.
- **Sass (SCSS)**: Style with variables and mixins. Use scoped styles per component.
- **Testing**: Playwright for E2E smoke tests and UI interaction validation.

## 3. Architecture (SOLID & Domain-Driven)
- **Folder Structure**: Organised by high-level domain:
  - `Shell/`: Global layout and HUD.
  - `Workspace/`: Meeting metadata and planning nodes.
  - `Agent/`: Input, messaging, and transmission logic.
  - `Members/`: Profile registry and skill-track management.

## 4. Operational Integrity (Anti-Fragile)
- **Deployment Success**: A deployment script MUST fail loudly if any sub-command fails. Never use `spawnSync` without checking the `status` or `error` properties.
- **Rapid Fire / Deep Recovery Pattern**: Tools must assume a "Warm Environment" and execute immediately. Only on failure should the system trigger "Deep Recovery" (installing dependencies, cloning repos). This keeps 99% of runs ultra-fast.
- **Port Isolation**: Multi-environment deployments (Test vs Prod) must never share ports. Map internal ports to environment-specific host ports via build-time variables.
- **Self-Healing Deployment**: Infrastructure scripts should be idempotent and handle "cold starts" (missing Node, missing Docker, missing Workspace) automatically.
- **Hard Truths over Green Builds**: It is forbidden to suppress errors or return a success exit code if a service fails to start or a network port is blocked.
- **Service Layer**: Keep AI and external logic (e.g., WhatsApp) in dedicated service classes.
- **Logic Separation**: Use custom hooks (e.g., `useCollaboration`) to manage state, keeping components focused on rendering.

## 4. Design & UX: "Cyber-Noir Command Shell"
- **Typography**: Primary font is **Sora**. Secondary font for technical data is **JetBrains Mono**.
- **Color Palette**: Dark background (`#020205`) with Muted Cyan accents (`$accent-cyan: #00bac4`).
- **Interaction**:
  - **Tactical In-place Editing**: Clicking an element turns it into a borderless input/dropdown; submission occurs on Blur or Enter. No explicit "Edit" icons.
  - **Transmission Pulse**: Chat input indicates data transfer via a vibrating top border animated wave.
  - **Global HUD**: Critical system status (Node, Node Count, Mode) fixed in top-right.
- **K-Font Requirement**: All proper names, titles, and system identifiers MUST be rendered using the **K-Font**. No exceptions.
- **Minimalism**: No scrollbars. Use `-ms-overflow-style: none`, `scrollbar-width: none`, and `::-webkit-scrollbar { display: none }`.

## 5. Aesthetics: "2077 Mainstream"
- **Narrative Depth**: Avoid raw technical keys like `SYSTEM_FONT_FORGE`. Use natural, immersive language that feels like part of a lived-in 2077 world (e.g. "K-Font Construction Deck").
- **Visual Texture**: Interface elements should feel physical, technical, and grounded in a near-future cyberpunk reality.

## 6. Communication Pattern
- **Collaboration Style**: The bot acts as a meeting assistant, updating a shared workspace grid.
- **Subtitle Overlay**: Bot messages appear as clean, non-aggressive captions at the bottom.
- **User Input**: Limit user messages to **180 characters** to ensure concise interactions.
## 7. Responsiveness: "Multisupport HUD"
- **Mobile-First Layout**: On screens below 768px, navigation grids must transition to 1-column layouts to preserve tap targets and readability. Grid items should switch to horizontal layouts (`flex-direction: row`) to optimize vertical space.
- **Adaptive Status**: The Global HUD must remain functional on touch devices.
  - **Auto-Rotation**: On mobile, telemetry groups must automatically cycle every 5 seconds (e.g., App Info → Weather → Network) without requiring user interaction.
  - **Fixed Width HUD**: The HUD container must maintain a consistent width on mobile during rotation to prevent layout shifts.
  - **Animated Transitions**: Use vertical slides or fades for data transitions to provide visual feedback of the "cycle."
- **Vesting Spaces**: Adjust padding and font sizes (1.2rem heading max on mobile) to ensure no horizontal scrolling exists.
- **VR/High-FOV**: Maintain high-fidelity animations on high-resolution displays using the `@include vr-headset` mixin.

## 8. Development & Deployment
- **Dual-Env Parity**: Deploy identical code to Prod (`k-app.tech`) and Test (`k-app.cloud`). Behavior is toggled via `VITE_APP_MODE` (demo vs test).
- **No Backward Compatibility**: Breaking changes are allowed. **Persistence Guard**: Data must be backed up (e.g., Couchbase snapshots) before removing deprecated features.
- **Feature Tracking**: Maintain a "Legacy Feature Tracking" ledger in technical documentation for all deprecated system protocols.
- **Auto-Heal CD**: The deployment pipeline must prioritize Speed (Fast Path) but automate Recovery (Long Path) via container cleanup on failure.