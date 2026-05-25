# Coding Guidelines: Toastmaster VPE

## 1. File Constraints
- **Strict Line Limit**: No file shall exceed **42 lines** of code.
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
  - `Members/`: Profile registry and pathway management.
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
- **Collaboration Style**: The bot acts as a VPE assistant, updating a shared workspace grid.
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