#!/bin/bash
set -e
ACTION=$1
echo "🩺 Running Diagnostics..."

# 1. Check Service Status
if systemctl is-active --quiet actions.runner.*.service; then
  echo "✅ Runner service is active."
else
  echo "⚠️ Runner service is DOWN. Attempting restart..."
  sudo systemctl restart actions.runner.*.service || true
fi

# 2. Check Disk Space
echo "💾 Disk Usage:"
df -h / | grep /

# 3. Clean Garbage
if [[ "$ACTION" == "deep-clean" ]]; then
  echo "🧹 Performing Deep Clean..."
  sudo docker system prune -a --volumes -f
  rm -rf ~/actions-runner/_work/*
  echo "✨ Deep clean complete."
else
  echo "🧹 Basic cleanup..."
  sudo docker image prune -f
  find ~/actions-runner/_work -maxdepth 1 -mtime +7 -exec rm -rf {} + || true
fi

# 4. Restart if requested
if [[ "$ACTION" == "restart" ]]; then
  echo "🔄 Forced restart of runner service..."
  sudo systemctl restart actions.runner.*.service
fi

echo "🚀 Runner is ready."
