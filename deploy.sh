#!/bin/bash
# Multi-environment Deployment Script

TARGET=${1:-prod}
ENV_FILE="./deploy/${TARGET}.env"

if [ ! -f "$ENV_FILE" ]; then
  echo "❌ Environment file $ENV_FILE not found. Specify 'prod' or 'test'."
  exit 1
fi

echo "🚀 Loading environment: $TARGET..."
set -a; source "$ENV_FILE"; set +a

# 1. Build frontend assets with environment-specific vars
echo "📦 Building frontend..."
npm run build

# 2. Build and restart
export APP_IMAGE="meetings-app:${TARGET}"
docker build -t $APP_IMAGE .

echo "♻️ Restarting $TARGET stack..."
docker compose -f docker-compose.prod.yml down --remove-orphans
docker compose -f docker-compose.prod.yml up -d

echo "✅ $TARGET Deployment complete!"
echo "📍 Application: https://$DOMAIN_NAME"
echo "🔐 Auth: https://$AUTH_DOMAIN_NAME"
