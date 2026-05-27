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
sudo -E docker compose -f docker-compose.prod.yml down --remove-orphans || true
sudo -E docker compose -f docker-compose.prod.yml pull
sudo -E docker compose -f docker-compose.prod.yml up -d --force-recreate

# Maintenance
sudo docker image prune -f

# Force Keycloak realm update
echo "🔄 Updating Keycloak realm..."
sudo docker exec $(sudo docker ps -q -f name=keycloak) /opt/keycloak/bin/kc.sh import --file /opt/keycloak/data/import/realm.json --override true || true

# Post-status check
sleep 5
sudo -E docker compose -f docker-compose.prod.yml ps
