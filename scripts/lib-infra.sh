#!/bin/bash
# 🛠️ UPLINK INFRASTRUCTURE LIBRARY
set -e
ACTION=\$1; ARG=\$2

case "\$ACTION" in
  "pulse")
    echo "--- 🛰️ SYSTEM PULSE ---"
    df -h | grep '^/'
    node -v && docker version --format 'Docker: {{.Client.Version}}'
    docker ps -a --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
    ;;
  "prune")
    echo "--- 🧹 DEEP CLEAN ---"
    docker system prune -af --volumes
    ;;
  "upgrade")
    echo "--- 🚀 OS UPGRADE ---"
    sudo apt-get update && sudo apt-get upgrade -y
    ;;
  "burn")
    echo "--- ☢️ NUCLEAR RESET ---"
    docker compose down --remove-orphans || true
    docker stop \$(docker ps -aq) || true && docker rm \$(docker ps -aq) || true
    docker system prune -af --volumes
    sudo rm -rf ~/app && rm -f ~/.vm_ready
    ;;
esac
echo "✅ Protocol \$ACTION: Finished."
