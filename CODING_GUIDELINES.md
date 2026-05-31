# Coding Guidelines: Maintenance & Reliability

## 1. Operational Visibility
- **ASCII Art Welcome**: All primary maintenance scripts MUST begin with a "lighthearted" ASCII greeting.
- **Fixed-Width Dashboard**: End every job with the explicit "REQUIRED MAINTENANCE ACTIONS" block.
- **Border Alignment**: Maintain strict right-border alignment (64-character width) for all dashboard rows.
- **Direct Language**: Use literal terms: "Runner", "Maintenance", "Setup", "Cleanup".

## 2. Infrastructure Standards
- **SSH Maintenance**: Execute repairs via direct SSH to recover stalled/offline Runners.
- **Self-Healing**: Automated status checks must trigger detached `setsid` restarts.
- **Node.js**: Standardize on **Node 24**.

## 3. Engineering Rules
- **File Length**: Max **42 lines** per file.
- **Solid Logic**: Keep scripts modular and descriptive.
- **Ports**: Frontend dev on 1777.
