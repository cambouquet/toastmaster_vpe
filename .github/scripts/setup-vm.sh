#!/bin/bash
set -e

# This script handles initial VM preparation
if [ ! -f ~/.vm_ready ]; then
  echo "🛠️ Performing full VM infrastructure setup..."
  
  # Check if docker is installed, if not install it
  if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
  fi
  
  # Proxy DNS fix
  sudo rm -f /etc/resolv.conf
  echo "nameserver 8.8.8.8" | sudo tee /etc/resolv.conf
  echo "nameserver 1.1.1.1" | sudo tee -a /etc/resolv.conf

  if [ ! -f /etc/docker/daemon.json ]; then
    echo '{"dns": ["8.8.8.8", "1.1.1.1"]}' | sudo tee /etc/docker/daemon.json
    sudo systemctl restart docker
  fi

  sudo apt-get update && sudo apt-get install -y psmisc
  sudo systemctl stop nginx || true
  sudo systemctl disable nginx || true
  
  if command -v ufw &> /dev/null; then
    sudo ufw allow 22/tcp
    sudo ufw allow 80/tcp
    sudo ufw allow 443/tcp
    sudo sed -i 's/DEFAULT_FORWARD_POLICY="DROP"/DEFAULT_FORWARD_POLICY="ACCEPT"/' /etc/default/ufw
    sudo ufw --force enable
  fi

  # OVH Netplan Fix
  NETPLAN_FILE=$(ls /etc/netplan/*.yaml 2>/dev/null | head -n 1) || true
  if [ ! -z "$NETPLAN_FILE" ]; then
    if grep -q "ens4:" "$NETPLAN_FILE" && ! grep -q "dhcp4-overrides" "$NETPLAN_FILE"; then
      echo "Applying Netplan fix for ens4..."
      sudo sed -i '/ens4:/a \      dhcp4-overrides:\n        use-routes: false' "$NETPLAN_FILE"
      sudo netplan apply
    fi
  fi

  touch ~/.vm_ready
  echo "✅ VM infrastructure optimized."
fi
