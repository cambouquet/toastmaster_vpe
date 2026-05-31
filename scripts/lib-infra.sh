#!/bin/bash
# 🛠️ MAINTENANCE COMMAND LIBRARY (Self-Healing Edition)
set -e
ACTION=$1; ARG=$2

# 🎨 Welcome Greeting
echo "    _    ____ _____ _   _ _____ "
echo "   / \  / ___| ____| \ | |_   _|"
echo "  / _ \| |  _|  _| |  \| | | |  "
echo " / ___ \ |_| | |___| |\  | | |  "
echo "/_/   \_\____|_____|_| \_| |_|  "
echo "--- THE MACHINES ARE LISTENING ---"

case "$ACTION" in
  "telemetry")
    echo ""
    echo "--- [1] SERVER HEALTH & DIAGNOSTICS ---"
    df -h | grep '^/'
    echo "Node: $(node -v) | Docker: $(docker version --format '{{.Client.Version}}' 2>/dev/null || echo 'Offline')"
    
    echo ""
    echo "--- [2] RUNNER SERVICE STATUS ---"
    systemctl list-units --type=service "actions.runner.*" --all || true
    
    echo ""
    echo "--- [3] RUNNER LOGS (Listening Check) ---"
    journalctl -u "actions.runner.*" -n 20 --no-pager | grep -E "Listening for Jobs|Running job|Finished job|Error|failed" || echo "No recent activity logs found."

    echo ""
    echo "--- [4] QUEUED GITHUB ACTIONS (Repository View) ---"
    if command -v gh &> /dev/null && [ -n "$GH_TOKEN" ]; then
        gh run list --status queued --limit 5 || echo "No queued jobs."
    fi
    ;;
  "cleanup")
    echo "--- 🧹 CLEANING DISK & DOCKER IMAGES ---"
    docker system prune -af --volumes
    ;;
  "patch-os")
    echo "--- 🚀 UPDATING OPERATING SYSTEM PACKAGES ---"
    sudo apt-get update && sudo apt-get upgrade -y
    ;;
  "hard-reset")
    echo "--- ☢️  CRITICAL: WIPING ALL DATA & SERVICES ---"
    docker compose down --remove-orphans || true
    docker stop $(docker ps -aq) || true && docker rm $(docker ps -aq) || true
    docker system prune -af --volumes
    sudo rm -rf ~/app && rm -f ~/.vm_ready
    ;;
esac

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║ ⏭️  REQUIRED MAINTENANCE ACTIONS                              ║"
echo "╠══════════════════════════════════════════════════════════════╣"

RUNNER_ACTIVE=$(systemctl is-active "actions.runner.*" || echo "inactive")

if [ "$ACTION" == "telemetry" ]; then
    [ $(df / --output=pcent | tail -1 | tr -dc '0-9') -gt 90 ] && echo "║ 🛠️  DISK FULL (>90%)?      ──▶  Run 'cleanup'                ║"
    [ "$RUNNER_ACTIVE" != "active" ] && echo "║ ✅ RUNNER RECOVERED        ──▶  Wait 20s for connectivity    ║"
    [ "$RUNNER_ACTIVE" == "active" ] && echo "║ ✨ RUNNER STATUS: OK       ──▶  No action required           ║"
    echo "║ 📦 DOCKER SERVICES DOWN?   ──▶  Run 'DEPLOY'                 ║"
else
    echo "║ ✅ TASK COMPLETE           ──▶  Run 'telemetry' to verify    ║"
fi
echo "╚══════════════════════════════════════════════════════════════╝"
