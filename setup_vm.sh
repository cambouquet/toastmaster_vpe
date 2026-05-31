#!/bin/bash
set -e

# 0. Nuclear cleanup of conflicting repos/keys
sudo rm -f /etc/apt/sources.list.d/nodesource.list*
sudo rm -f /usr/share/keyrings/nodesource.gpg /etc/apt/keyrings/nodesource.gpg 
# ALSO clean the common alternate path used by some older installers
sudo rm -f /etc/apt/keyrings/nodesource-repo.gpg.key 

# Also clean up potential legacy entries in main sources.list or other files
sudo sed -i '/nodesource/d' /etc/apt/sources.list /etc/apt/sources.list.d/*.list || true

# 1. Update system (ignoring failures on sources that we are about to fix in the next steps)
sudo apt-get update || true
sudo apt-get upgrade -y -o Dpkg::Options::="--force-confdef" -o Dpkg::Options::="--force-confold"

# 2. Install Docker
sudo apt-get install -y ca-certificates curl gnupg
sudo mkdir -p -m 755 /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor --batch --yes --no-tty -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 3. Install GitHub CLI (gh)
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo tee /etc/apt/keyrings/githubcli-archive-keyring.gpg > /dev/null
sudo chmod go+r /etc/apt/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null

# 4. Install Node 24 (The explicit correct way for the new NodeSource distribution)
# We ensure the keyring is freshly fetched and the .list file is created with only ONE signed-by reference
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor --batch --yes --no-tty -o /etc/apt/keyrings/nodesource.gpg
sudo chmod a+r /etc/apt/keyrings/nodesource.gpg
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_24.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list > /dev/null

# 5. Install Packages
# Run update again to ensure the new sources are active
sudo apt-get update
sudo apt-get install -y -o Dpkg::Options::="--force-confdef" -o Dpkg::Options::="--force-confold" docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin nodejs gh

# 6. Add current user to docker group
sudo usermod -aG docker $USER

echo "Setup complete. Node: $(node -v), Docker: $(docker --version), GH: $(gh --version)"
