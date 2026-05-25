#!/bin/bash
# Production Deployment Script for toastmaster_vpe

echo "🚀 Starting Production Deployment..."

# 1. Build frontend assets locally (optional if Dockerfile does it, but good for local check)
echo "📦 Building frontend with npm..."
npm run build

# 2. Set environment variables
export APP_IMAGE="toastmaster-vpe:latest"

# 3. Build the application image
echo "🛠️ Building Docker image: $APP_IMAGE..."
docker build -t $APP_IMAGE .

# 4. Restart the production stack
echo "♻️ Restarting production stack..."
docker compose -f docker-compose.prod.yml down --remove-orphans
docker compose -f docker-compose.prod.yml up -d

echo "✅ Deployment complete!"
echo "📍 Application: https://k-app.tech"
echo "🔐 Auth: https://auth.k-app.tech"
