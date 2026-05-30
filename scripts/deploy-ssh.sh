#!/bin/bash
set -e

# ID_FILE, TARGET, VM_USER, VM_HOST, GITHUB_REPOSITORY are expected as env vars
ssh -i "$ID_FILE" -o StrictHostKeyChecking=no -o ConnectTimeout=10 "$VM_USER@$VM_HOST" "bash -s" << EOF
  set -e
  
  FUNCTION_RAPID_FIRE() {
    cd \$HOME/app && \
    git fetch --depth 1 origin main && \
    git reset --hard FETCH_HEAD && \
    node deploy.mjs $TARGET
  }

  FUNCTION_DEEP_RECOVERY() {
    echo "⚠️ RAPID FIRE FAILED. System state inconsistent. Initiating Deep Recovery..."
    mkdir -p \$HOME/app && cd \$HOME/app
    
    # Gold Standard initialization
    git init
    git remote add origin https://github.com/$GITHUB_REPOSITORY.git 2>/dev/null || \
    git remote set-url origin https://github.com/$GITHUB_REPOSITORY.git
    git fetch --depth 1 origin main
    git reset --hard FETCH_HEAD
    git clean -fd
    
    CURRENT_NODE_VER=\$(node -v 2>/dev/null || echo "v0")
    if [[ ! "\$CURRENT_NODE_VER" =~ ^v24\. ]]; then
      echo "📍 Upgrading Node from \$CURRENT_NODE_VER to v24..."
      curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
      sudo apt-get install -y nodejs
    fi
    
    node deploy.mjs $TARGET
  }

  FUNCTION_RAPID_FIRE || FUNCTION_DEEP_RECOVERY
EOF
