#!/bin/bash
set -e

# recurring deployment tasks
mkdir -p ~/app
cd ~/app

# Registry login
echo "$GITHUB_TOKEN" | sudo docker login ghcr.io -u "$GITHUB_ACTOR" --password-stdin

# Set environment
export APP_IMAGE="$REGISTRY_IMAGE"
echo "APP_IMAGE=$APP_IMAGE" > .env

# Fast port cleanup
sudo fuser -k 80/tcp || true
sudo fuser -k 443/tcp || true

# Compose cycle
echo "🚀 Updating containers..."

if [[ "$FULL_RESTART" == "true" ]]; then
  echo "⚠️ Performing FULL RESTART (down/up)..."
  sudo -E docker compose -f docker-compose.prod.yml down --remove-orphans || true
  sudo -E docker compose -f docker-compose.prod.yml pull
  sudo -E docker compose -f docker-compose.prod.yml up -d --force-recreate
else
  # Fast path: Only pull specific app image to save time
  sudo -E docker compose -f docker-compose.prod.yml pull app
  sudo -E docker compose -f docker-compose.prod.yml up -d --no-deps --force-recreate app
fi

# Maintenance (background)
sudo docker image prune -f &

# Force Keycloak realm update
echo "🔄 Updating Keycloak realm..."
sudo docker exec $(sudo docker ps -q -f name=keycloak) /opt/keycloak/bin/kc.sh import --file /opt/keycloak/data/import/realm.json --override true || true

# Post-status check
sleep 10
echo "🔍 Health check..."
if ! sudo -E docker compose -f docker-compose.prod.yml ps | grep "app" | grep "Up"; then
  echo "❌ App failed to start in fast-mode. Attempting auto-recovery (FULL RESTART)..."
  sudo -E docker compose -f docker-compose.prod.yml down --remove-orphans || true
  sudo -E docker compose -f docker-compose.prod.yml pull
  sudo -E docker compose -f docker-compose.prod.yml up -d --force-recreate
  
  sleep 10
  if ! sudo -E docker compose -f docker-compose.prod.yml ps | grep "app" | grep "Up"; then
    echo "🚨 Recovery failed. Logic or Configuration error detected."
    sudo -E docker compose -f docker-compose.prod.yml logs --tail=50 app
    exit 1
  fi
  echo "✅ Auto-recovery successful."
fi

sudo -E docker compose -f docker-compose.prod.yml ps
