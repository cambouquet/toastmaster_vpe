#!/bin/bash
# 🛠️ MAINTENANCE COMMAND LIBRARY (Zero-Intervention Edition)
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
    echo "--- [4] QUEUED GITHUB ACTIONS ---"
    if command -v gh &> /dev/null && [ -n "$GH_TOKEN" ]; then
        gh run list --status queued --limit 10 || echo "Queue is empty."
    fi
    ;;
  "cancel-queued")
    echo "--- 🚫 CANCELLING ALL QUEUED WORKFLOW RUNS ---"
    if command -v gh &> /dev/null && [ -n "$GH_TOKEN" ]; then
        QUEUED_RUNS=$(gh run list --status queued --json databaseId -q '.[].databaseId')
        if [ -n "$QUEUED_RUNS" ]; then
            for run_id in $QUEUED_RUNS; do
                echo "Cancelling run $run_id..."
                gh run cancel "$run_id" || true
            done
            echo "✅ All queued runs targeted for cancellation."
        else
            echo "✨ No queued runs found."
        fi
    else
        echo "❌ Error: 'gh' CLI or GH_TOKEN missing."
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
    echo "║ ⏳ JOBS QUEUED?            ──▶  Run 'cancel-queued'          ║"
else
    echo "║ ✅ TASK COMPLETE           ──▶  Run 'telemetry' to verify    ║"
fi
echo "╚══════════════════════════════════════════════════════════════╝"
