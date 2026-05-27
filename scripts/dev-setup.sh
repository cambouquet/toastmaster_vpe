#!/bin/bash
echo ">>> TOASTMASTER VPE - NEURAL SYSTEM BOOT"

# 1. Start Machine (if applicable)
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    podman machine start || echo "running"
fi

# 2. Cleanup
podman stop keycloak 2>/dev/null
podman rm -f keycloak 2>/dev/null
podman pod rm -af 2>/dev/null

# 3. Launch
echo ">>> Orchestrating Keycloak via Podman (Port 8081)..."
podman run --detach --name keycloak \
    -p 8081:8080 \
    -e KEYCLOAK_ADMIN=admin \
    -e KEYCLOAK_ADMIN_PASSWORD=admin \
    -e KC_DB=dev-file \
    -e KC_HTTP_PORT=8080 \
    -e KC_HOSTNAME_STRICT=false \
    -v ./keycloak-realm.json:/opt/keycloak/data/import/realm.json:Z \
    quay.io/keycloak/keycloak:24.0.0 start-dev --import-realm

npm run dev
