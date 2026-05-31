#!/bin/bash
# 🛠️ UPLINK INFRASTRUCTURE LIBRARY
set -e
ACTION=$1; ARG=$2

case "$ACTION" in
  "telemetry")
    echo "--- 🛰️ SYSTEM TELEMETRY ---"
    df -h | grep '^/'
    node -v && docker version --format 'Docker: {{.Client.Version}}'
    docker ps -a --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
    echo "--- 🤖 RUNNER STATUS ---"
    systemctl list-units --type=service "actions.runner.*" --all || true
    ;;
  "cleanup")
    echo "--- 🧹 DISK CLEANUP ---"
    docker system prune -af --volumes
    ;;
  "patch-os")
    echo "--- 🚀 OS SECURITY PATCH ---"
    sudo apt-get update && sudo apt-get upgrade -y
    ;;
  "hard-reset")
    echo "--- ☢️ HARD FACTORY RESET ---"
    docker compose down --remove-orphans || true
    docker stop $(docker ps -aq) || true && docker rm $(docker ps -aq) || true
    docker system prune -af --volumes
    sudo rm -rf ~/app && rm -f ~/.vm_ready
    ;;
esac

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║ ⏭️  UPLINK MISSION CONTROL: NEXT STEPS                        ║"
echo "╠══════════════════════════════════════════════════════════════╣"

if [ "$ACTION" == "telemetry" ]; then
    echo "║ 🛠️  DISK FULL (>90%)?      ──▶  Run 'cleanup'                ║"
    echo "║ 📦 DOCKER MISSING?       ──▶  Run 'DEPLOY'                 ║"
    echo "║ 🤖 RUNNER DEAD/OFFLINE?  ──▶  Run 'restart-runner'         ║"
elif [ "$ACTION" == "cleanup" ]; then
    echo "║ ✅ DISK PURGE COMPLETE    ──▶  Run 'telemetry' to verify    ║"
elif [ "$ACTION" == "hard-reset" ]; then
    echo "║ ☢️  NODE IS VACUUMED       ──▶  Run 'PROVISION' to restore   ║"
elif [ "$ACTION" == "patch-os" ]; then
    echo "║ 🚀 OS PATCHED             ──▶  Run 'telemetry'              ║"
fi

echo "╚══════════════════════════════════════════════════════════════╝"
