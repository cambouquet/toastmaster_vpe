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
    journalctl -u "actions.runner.*" -n 20 --no-pager | grep -E "Listening for Jobs|Running job|Finished job" || echo "No recent activity logs found."

    echo ""
    echo "--- [4] QUEUED GITHUB ACTIONS (Repository View) ---"
    if command -v gh &> /dev/null && [ -n "$GH_TOKEN" ]; then
        export GH_TOKEN="$GH_TOKEN"
        gh run list --status queued --limit 5 || echo "No queued jobs."
    else
        echo "⚠️  'gh' CLI not found or GH_TOKEN missing. Install 'gh' using provision."
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
elif [ "$ACTION" == "cleanup" ]; then
    echo "║ ✅ CLEANUP COMPLETE        ──▶  Run 'telemetry' to verify    ║"
elif [ "$ACTION" == "hard-reset" ]; then
    echo "║ ☢️  SYSTEM WIPED            ──▶  Run 'PROVISION' to restore   ║"
elif [ "$ACTION" == "patch-os" ]; then
    echo "║ 🚀 UPDATES COMPLETE        ──▶  Run 'telemetry'              ║"
fi
echo "╚══════════════════════════════════════════════════════════════╝"
