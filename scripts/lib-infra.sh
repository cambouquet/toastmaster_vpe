#!/bin/bash
# 🛠️ MAINTENANCE COMMAND LIBRARY
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
    else
        echo "⚠️  'gh' CLI not found or GH_TOKEN missing."
    fi
    ;;
  "restart-runner")
    echo "--- 🔄 FORCED RESTART OF RUNNER SERVICE ---"
    sudo systemctl stop actions.runner.* || true
    sudo pkill -9 -f Runner || true
    # Run setup again if needed or just start service
    RUNNER_DIR="$HOME/actions-runner"
    if [ -d "$RUNNER_DIR" ]; then
      cd "$RUNNER_DIR"
      sudo ./svc.sh start || (sudo ./svc.sh install && sudo ./svc.sh start)
    else
      echo "❌ Error: Runner directory not found at $RUNNER_DIR"
      exit 1
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

if [ "$ACTION" == "telemetry" ]; then
    echo "║ 🛠️  DISK FULL (>90%)?      ──▶  Run 'cleanup'                ║"
    echo "║ 📦 DOCKER SERVICES DOWN?   ──▶  Run 'DEPLOY'                 ║"
    echo "║ 🤖 RUNNER SERVICE DEAD?    ──▶  Run 'restart-runner'         ║"
    echo "║ ⏳ JOBS STUCK IN QUEUE?    ──▶  Run 'restart-runner'         ║"
else
    echo "║ ✅ ACTION COMPLETE         ──▶  Run 'telemetry' to verify    ║"
fi
echo "╚══════════════════════════════════════════════════════════════╝"
