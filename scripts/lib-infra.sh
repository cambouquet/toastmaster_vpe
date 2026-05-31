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
    echo "--- [1] SERVER HEALTH & DIAGNOSTICS ---"
    df -h | grep '^/'
    node -v && docker version --format 'Docker: {{.Client.Version}}'
    docker ps -a --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
    echo "--- [2] RUNNER SERVICE STATUS ---"
    systemctl list-units --type=service "actions.runner.*" --all || true
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
    echo "║ 🛠️  DISK FULL?            ──▶  Run 'cleanup'                ║"
    echo "║ 📦 DOCKER SERVICES DOWN? ──▶  Run 'DEPLOY'                 ║"
    echo "║ 🤖 RUNNER OFFLINE?       ──▶  Run 'restart-runner'         ║"
elif [ "$ACTION" == "cleanup" ]; then
    echo "║ ✅ CLEANUP COMPLETE      ──▶  Run 'telemetry' to verify    ║"
elif [ "$ACTION" == "hard-reset" ]; then
    echo "║ ☢️  SYSTEM WIPED          ──▶  Run 'PROVISION' to restore   ║"
elif [ "$ACTION" == "patch-os" ]; then
    echo "║ 🚀 UPDATES COMPLETE      ──▶  Run 'telemetry'              ║"
fi
echo "╚══════════════════════════════════════════════════════════════╝"
