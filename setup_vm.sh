#!/bin/bash
set -e

# 0. NUCLEAR CLEANUP - No mercy for conflicting keys or sources
echo "💣 Initiating Absolute Nuclear Purge of APT sources..."
sudo rm -rf /etc/apt/sources.list.d/nodesource.list*
sudo rm -rf /etc/apt/keyrings/nodesource*
sudo rm -rf /usr/share/keyrings/nodesource*
sudo rm -rf /etc/apt/sources.list.d/github-cli.list*
sudo rm -rf /etc/apt/keyrings/githubcli*

# Clean up any inline references in the main sources.list
sudo sed -i '/nodesource/d' /etc/apt/sources.list || true
sudo sed -i '/github/d' /etc/apt/sources.list || true

# Kill any apt locks that might be hanging
sudo fuser -kk /var/lib/dpkg/lock-frontend /var/lib/apt/lists/lock || true

# 1. Update system baseline (ignore errors as we are rebuilding)
echo "📡 Updating baseline..."
sudo apt-get update || true

# 2. Re-establish Keyrings directory
sudo mkdir -p -m 755 /etc/apt/keyrings

# 3. Install Node 24 (New 2024+ Nodesource distribution method)
echo "📦 Injecting Node 24..."
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor --batch --yes -o /etc/apt/keyrings/nodesource.gpg
sudo chmod a+r /etc/apt/keyrings/nodesource.gpg
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_24.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list

# 4. Install GitHub CLI (gh)
echo "🐙 Injecting GitHub CLI..."
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/etc/apt/keyrings/githubcli-archive-keyring.gpg
sudo chmod go+r /etc/apt/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list

# 5. Final Sync and Install
echo "🚀 Final System Sync..."
sudo apt-get update
sudo apt-get install -y -o Dpkg::Options::="--force-confdef" -o Dpkg::Options::="--force-confold" nodejs gh docker-ce docker-ce-cli containerd.io

# 6. Add current user to docker group
sudo usermod -aG docker $USER

echo "Setup complete. Node: $(node -v), Docker: $(docker --version), GH: $(gh --version)"
