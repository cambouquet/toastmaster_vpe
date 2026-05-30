#!/bin/bash
set -e

# ID_FILE, TARGET, VM_USER, VM_HOST, GITHUB_REPOSITORY are expected as env vars
ssh -i "$ID_FILE" -o StrictHostKeyChecking=no -o ConnectTimeout=10 "$VM_USER@$VM_HOST" "bash -s" << EOF
  set -e
  
  FUNCTION_RAPID_FIRE() {
    cd \$HOME/app && \
    git fetch origin main && \
    git reset --hard origin/main && \
    node deploy.mjs $TARGET
  }

  FUNCTION_DEEP_RECOVERY() {
    echo "⚠️ RAPID FIRE FAILED. System state inconsistent. Initiating Deep Recovery..."
    if [ ! -d "\$HOME/app/.git" ]; then
      rm -rf "\$HOME/app"
      git clone https://github.com/$GITHUB_REPOSITORY.git "\$HOME/app"
    fi
    
    cd \$HOME/app
    git fetch origin main
    git reset --hard origin/main
    
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
