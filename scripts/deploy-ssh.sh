#!/bin/bash
set -e

# ID_FILE, TARGET, VM_USER, VM_HOST, GITHUB_REPOSITORY are expected as env vars
ssh -i "$ID_FILE" -o StrictHostKeyChecking=no -o ConnectTimeout=10 "$VM_USER@$VM_HOST" "bash -s" << EOF
  set -e
  
  FUNCTION_RAPID_FIRE() {
    cd $HOME/app && \
    git fetch --all && \
    git reset --hard origin/main && \
    git clean -fd && \
    echo "📍 RUNNER COMMIT: $(git rev-parse HEAD)" && \
    node deploy.mjs $TARGET
  }

  FUNCTION_DEEP_RECOVERY() {
    echo "⚠️ RAPID FIRE FAILED. Performing Nuclear Workspace Reset..."
    sudo rm -rf $HOME/app && mkdir -p $HOME/app && cd $HOME/app
    git clone https://github.com/$GITHUB_REPOSITORY.git .
    node deploy.mjs $TARGET
  }

  FUNCTION_RAPID_FIRE || FUNCTION_DEEP_RECOVERY
EOF
