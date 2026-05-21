# Domain Model: Toastmaster VPE

## State Structure
The application state is managed as a flat object with nested `roles` and `members` logic.

### 1. Global Metadata
- `theme`: Current meeting theme.
- `date`, `location`, `room`: Logistics info.
- `registrationLink`, `mapUrl`, `zoomLink`: Connection uplinks.
- `wordOfTheDay`, `wordDefinition`: Meeting briefing nodes.

### 2. Roles Model (`state.roles`)
Managed via the `roles.` action prefix.
- `toastmaster`, `genEvaluator`, `topicsMaster`: Single member name strings.
- `timer`, `grammarian`, `ahCounter`: Single member name strings.
- `speakers`: Array of objects `{ id, name, title, evaluator }`.
  - Accessed via `roles.speaker.[field]` with an `{ id, val }` payload.

### 3. Member Registry (`state.members`)
Array of member objects:
- `id`: Unique string ID.
- `name`: Display name.
- `status`: `ONLINE`, `AWAY`, `SICK`, etc.
- `enrolled`: Array of Pathways `{ name, level, projects }`.

## UI Action Protocol
The `AiService.handleUiAction` is the gatekeeper for state transitions:
1.  **Flat Keys**: Direct update (`key: val`).
2.  **Role Keys**: Actions starting with `roles.` are parsed and merged into the `roles` sub-object.
3.  **Member Keys**: Actions like `editMember` or `deleteMember` perform array map/filter operations.

## Navigation Intent
The `MockAiService` resolves screen transitions:
- `members` / `registry` -> `currentScreen: 'members'`
- `workspace` / `back` -> `currentScreen: 'workspace'`
