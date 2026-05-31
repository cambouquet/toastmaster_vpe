#!/bin/bash
# 🛠️ UPLINK INFRASTRUCTURE LIBRARY
set -e
ACTION=\$1; ARG=\$2

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
echo "✅ Protocol $ACTION: Finished."
echo "--- ⏭️ NEXT ACTIONS ---"
if [ "$ACTION" == "telemetry" ]; then
  echo "- If disk > 90%, run 'cleanup'."
  echo "- If Docker containers are missing, run 'DEPLOY'."
elif [ "$ACTION" == "cleanup" ]; then
  echo "- Run 'telemetry' to verify disk space recovery."
elif [ "$ACTION" == "hard-reset" ]; then
  echo "- ☢️ CAUTION: Node is now empty."
  echo "- Run 'PROVISION' to restore infrastructure."
fi
