#!/bin/bash
# 🛰️ UPLINK RUNNER BOOTSTRAP (Node 24 Alpine/Ubuntu)
set -e
TOKEN=$1
TARGET=$2
REPO=${3:-k-app-tech/k-app}
RUNNER_VER="2.321.0"

if [ -z "$TOKEN" ] || [ -z "$TARGET" ]; then
  echo "Usage: ./setup-runner.sh [TOKEN] [TARGET] [REPO]"; exit 1
fi

sudo rm -rf ~/actions-runner && mkdir -p ~/actions-runner && cd ~/actions-runner
curl -o runner.tar.gz -L https://github.com/actions/runner/releases/download/v${RUNNER_VER}/actions-runner-linux-x64-${RUNNER_VER}.tar.gz
tar xzf ./runner.tar.gz

./config.sh --url https://github.com/$REPO --token "$TOKEN" --labels "self-hosted,$TARGET" --name "runner-$TARGET" --unattended --replace

# 🛰️ Ensure Node 24 is available for deploy.mjs
if ! node -v | grep -q "v24"; then
  curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi

sudo ./svc.sh install && sudo ./svc.sh start
echo "✅ Node [$TARGET] online."
