# Coding Guidelines: Maintenance & Reliability

## 1. Operational Visibility
- **Next Steps Logs**: Every maintenance job MUST end with a high-visibility block titled "REQUIRED MAINTENANCE ACTIONS".
- **Visuals**: Use box-drawing characters (`╔═╗`, `║`, `╚═╝`) to frame next actions.
- **Direct Language**: Avoid obscure names (e.g. "Fleet", "Uplink"). Use literal terms like "Runner", "Maintenance", "Setup", "Cleanup".

## 2. Infrastructure Standards
- **SSH Maintenance**: All repair tasks MUST run via direct SSH to allow recovery of stalled runners.
- **Self-Healing**: Scripts must check Runner status and trigger detached `setsid` restarts if offline.
- **Node.js**: Mandatory standard is **Node 24**.

## 3. Engineering Rules
- **File Length**: Maximum **42 lines** per file.
- **Solid Logic**: Infrastructure scripts must be modular and descriptive.
- **Ports**: Frontend runs on 1777 (Vite).
