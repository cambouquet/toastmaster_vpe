# Coding Guidelines: Toastmaster VPE

## 1. File Constraints
- **Strict Line Limit**: No file shall exceed **42 lines** of code.
- **Single Responsibility**: If a file grows too large, extract logic into hooks or smaller sub-components.

## 2. Technical Stack
- **React + Vite**: Fast, modern frontend framework.
- **Pure JavaScript (JSX)**: No TypeScript. Keep the code lean, readable, and free of type boilerplate.
- **Sass (SCSS)**: Style with variables and mixins. Use scoped styles per component.

## 3. Architecture (SOLID)
- **Service Layer**: Keep AI and external logic (e.g., WhatsApp) in dedicated service classes.
- **Logic Separation**: Use custom hooks (e.g., `useCollaboration`) to manage state, keeping components focused on rendering.
- **Component Reusability**: Use generic components like `EditableCard` for consistent UI patterns.

## 4. Design & UX: "Cyber-Noir"
- **Typography**: Primary font is **Sora** (300/400 weight). No bold fonts for communication.
- **Color Palette**: Dark background (`#050508`) with Cyan accents (`#00f3ff`).
- **Interaction**:
  - Seamless inline editing (no browser prompts).
  - No layout shifts when switching states.
  - Assertive, concise feedback via a subtitle-style overlay.
- **Minimalism**: No redundant headers or icons. Use text-based status (e.g., "Open") instead of labels like "OPEN".

## 5. Communication Pattern
- **Collaboration Style**: The bot acts as a VPE assistant, updating a shared workspace grid.
- **Subtitle Overlay**: Bot messages appear as clean, non-aggressive captions at the bottom.
- **User Input**: Limit user messages to **180 characters** to ensure concise interactions.
