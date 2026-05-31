#!/bin/bash
# 🛠️ FLEET MANAGEMENT COMMAND LIBRARY
set -e
ACTION=$1; ARG=$2

case "$ACTION" in
  "telemetry")
    echo "--- 🛰️  DETAILED HARDWARE & SERVICE DIAGNOSTICS ---"
    df -h | grep '^/'
    node -v && docker version --format 'Docker: {{.Client.Version}}'
    docker ps -a --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
    echo "--- 🤖 RUNNER SERVICE HEALTH ---"
    systemctl list-units --type=service "actions.runner.*" --all || true
    ;;
  "cleanup")
    echo "--- 🧹 DISK & DOCKER GARBAGE COLLECTION ---"
    docker system prune -af --volumes
    ;;
  "patch-os")
    echo "--- 🚀 OPERATING SYSTEM SECURITY UPDATES ---"
    sudo apt-get update && sudo apt-get upgrade -y
    ;;
  "hard-reset")
    echo "--- ☢️  CRITICAL: FULL INFRASTRUCTURE PURGE ---"
    docker compose down --remove-orphans || true
    docker stop $(docker ps -aq) || true && docker rm $(docker ps -aq) || true
    docker system prune -af --volumes
    sudo rm -rf ~/app && rm -f ~/.vm_ready
    ;;
esac

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║ ⏭️  FLEET STATUS: REQUIRED OPERATOR ACTIONS                   ║"
echo "╠══════════════════════════════════════════════════════════════╣"

if [ "$ACTION" == "telemetry" ]; then
    echo "║ 🛠️  DISK EXHAUSTED?       ──▶  Run 'cleanup'                ║"
    echo "║ 📦 DOCKER SERVICES DOWN? ──▶  Run 'DEPLOY'                 ║"
    echo "║ 🤖 RUNNER OFFLINE?       ──▶  Run 'restart-runner'         ║"
elif [ "$ACTION" == "cleanup" ]; then
    echo "║ ✅ PURGE FINISHED        ──▶  Run 'telemetry' to verify    ║"
elif [ "$ACTION" == "hard-reset" ]; then
    echo "║ ☢️  SYSTEM WIPED          ──▶  Run 'PROVISION' to restore   ║"
elif [ "$ACTION" == "patch-os" ]; then
    echo "║ 🚀 PATCHING COMPLETE     ──▶  Run 'telemetry'              ║"
fi
echo "╚══════════════════════════════════════════════════════════════╝"
