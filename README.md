# Mission Control - Real Life MMO

A high-density "Cyber-Noir" human development platform. This is a real-life MMO designed to help people learn, grow, and become better humans through a fun, gamified experience.

## Tactical Access

| Portal | URL | Description |
| :--- | :--- | :--- |
| **Mission Control** | `http://localhost:1777` | Neural Link Interface (Login required) |
| **Identity Lab** | `http://localhost:8081` | Keycloak Auth Server |
| **Mission Briefing** | `http://localhost:5174` | Project Documentation (VitePress) |

## Core Architecture

The project follows a domain-driven structure to ensure separation of concerns between the AI Mentors, the Growth Workspace, and the Player Registry.

### Directory Overview
- `src/components/Shell/`: structural parent, manages high-level routing and the global Status HUD.
- `src/components/Workspace/`: The Dashboard for evolution planning (11 distinct metadata nodes).
- `src/components/Agent/`: AI Mentor interface, including `ChatInput` with transmission pulse.
- `src/components/Members/`: Player Registry for profiles and status tracking.
- `src/services/ai/`: Brain of the application, handling intent resolution and growth guidance.
- `src/hooks/`: Reactive state management (e.g., `useCollaboration` orchestrates AI and player sync).

## Development

### Setup
```bash
npm install
npm run setup
```

### Launch Everything (Keycloak + Frontend + Mock Agent)
```bash
npm start
```

### Testing
```bash
npx playwright test
```

## UI Principles
- **Tactical Editing**: No explicit save buttons. Edit items directly in-place.
- **Cyber-Noir Aesthetic**: Muted cyan (`#00bac4`) on ultra-dark backgrounds.
- **Max File length**: No file exceeds 42 lines.
- **No Scrollbars**: Clean, fixed-layout interface.

## Documentation
- See [CODING_GUIDELINES.md](CODING_GUIDELINES.md) for strict architectural and design rules.
- See `.github/copilot-instructions.md` for AI agent operational constraints.

## Legal
Copyright (c) 2026 Mission Control. All Rights Reserved. See [LICENSE](LICENSE) for full proprietary terms.
