# Coding Guidelines: ZERO-FAILURE MISSION

## 1. Operational Integrity
- **No Silent Failures**: Every script MUST propagate failure. Green builds on failed infra tasks are a CRITICAL breach.
- **Set -e Everywhere**: All bash scripts and GHA script blocks MUST start with `set -e`.
- **Fail-Fast Dashboard**: If a task fails, the "REQUIRED MAINTENANCE ACTIONS" block MUST reflect the failure in its header with a `❌`.

## 2. Infrastructure Standards
- **Out-of-Band Priority**: Maintenance MUST run via direct SSH to recover stalled Runners.
- **Self-Healing**: Trigger detached `setsid` repairs automatically on health check failure.
- **Fixed-Width Logs**: Use a 64-character width for all ASCII dashboards.

## 3. Engineering Constraints
- **File Length**: Strictly max **42 lines** per file.
- **Node.js**: Standardize on **Node 24**.
- **Solid Shell**: Use explicit exit codes (e.g., `exit 1`) for all error paths.
