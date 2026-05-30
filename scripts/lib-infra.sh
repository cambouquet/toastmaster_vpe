#!/bin/bash
# 🛠️ System: Infra Library
set -e
ACTION=$1; ARG=$2

case "$ACTION" in
  "pulse")
    df -h | grep '^/' && node -v && docker ps -a --format "table {{.Names}}\t{{.Status}}"
    ;;
  "authorize")
    mkdir -p ~/.ssh && echo "$ARG" >> ~/.ssh/authorized_keys
    sort -u ~/.ssh/authorized_keys -o ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys
    ;;
  "prune")
    docker system prune -af --volumes
    ;;
  "nuclear")
    docker compose down --remove-orphans || true
    docker stop $(docker ps -aq) || true && docker rm $(docker ps -aq) || true
    docker system prune -af --volumes && sudo rm -rf ~/app && rm -f ~/.vm_ready
    ;;
  "rescue")
    sudo systemctl restart actions.runner.* || true
    cd ~/actions-runner && sudo ./svc.sh stop && sudo ./svc.sh start
    ;;
esac
echo "✅ $ACTION: Complete."
