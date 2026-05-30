#!/bin/bash
# 🛰️ UPLINK RUNNER BOOTSTRAP (Node 24 Alpine/Ubuntu)
set -e
TOKEN=$1
TARGET=$2 # 'prod' or 'test'
RUNNER_VER="2.321.0"

if [ -z "$TOKEN" ] || [ -z "$TARGET" ]; then
  echo "Usage: ./setup-runner.sh [TOKEN] [TARGET]"; exit 1
fi

mkdir -p ~/actions-runner && cd ~/actions-runner
if [ ! -f "config.sh" ]; then
  curl -o actions-runner-linux-x64-${RUNNER_VER}.tar.gz -L https://github.com/actions/runner/releases/download/v${RUNNER_VER}/actions-runner-linux-x64-${RUNNER_VER}.tar.gz
  tar xzf ./actions-runner-linux-x64-${RUNNER_VER}.tar.gz
fi

./config.sh --url https://github.com/${GITHUB_REPOSITORY:-k-app-tech/k-app} --token "$TOKEN" --labels "self-hosted,$TARGET" --unattended --replace

# 🛰️ Ensure Node 24 is available for deploy.mjs
if ! node -v | grep -q "v24"; then
  echo "📍 Installing Node 24..."
  curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi

sudo ./svc.sh install || true
sudo ./svc.sh start || true
echo "✅ Runner established with label: $TARGET"
