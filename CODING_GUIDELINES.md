# Coding Guidelines: Maintenance & Reliability

## 1. Operational Visibility
- **No Silent Failures**: If a command or task fails (e.g., missing CLI, permission error), it MUST exit with a non-zero code. Green builds on failed infrastructure tasks are forbidden.
- **Fail-Fast Dashboards**: If a task fails, the "REQUIRED MAINTENANCE ACTIONS" block MUST highlight the specific failure in the header.
- **ASCII Art Welcome**: All primary maintenance scripts MUST begin with a "lighthearted" ASCII greeting.
- **Fixed-Width Dashboard**: End every job with the explicit "REQUIRED MAINTENANCE ACTIONS" block.
- **Border Alignment**: Maintain strict right-border alignment (64-character width) for all dashboard rows.

## 2. Infrastructure Standards
- **SSH Maintenance**: Execute repairs via direct SSH to recover stalled/offline Runners.
- **Self-Healing**: Automated status checks must trigger detached `setsid` restarts.
- **Clean Registry**: Periodic "cleanup" tasks must trigger "telemetry" for validation.

## 3. Engineering Rules
- **File Length**: Max **42 lines** per file.
- **SOLID Shell**: Scripts must use explicit exit codes and avoid silent `|| true` on business-critical logic.
- **Node.js**: Standardize on **Node 24**.
