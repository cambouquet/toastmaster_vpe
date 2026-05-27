# dev-setup.ps1
Write-Host ">>> TOASTMASTER VPE - NEURAL SYSTEM BOOT" -ForegroundColor Cyan

# 1. Start Podman Machine
Write-Host ">>> Checking Podman VM status..."
try {
    $vmStatus = podman machine inspect default --format "{{.State}}" 2>$null
    if ($vmStatus -ne "running") {
        Write-Host ">>> Powering up Podman VM..." -ForegroundColor Yellow
        podman machine start 2>$null
    } else {
        Write-Host ">>> Podman VM is active." -ForegroundColor Green
    }
} catch {
    podman machine start 2>$null
}

# 2. Keycloak Instance Management
Write-Host ">>> Checking Keycloak infrastructure..." -ForegroundColor Cyan
$kcStatus = podman ps --filter "name=keycloak" --format "{{.Status}}" 2>$null

if ($kcStatus -like "Up*") {
    Write-Host ">>> Keycloak is already running. Maintaining uplink..." -ForegroundColor Green
} else {
    Write-Host ">>> Keycloak not detected or stopped. Initializing orchestration..." -ForegroundColor Yellow
    # Cleanup any stale containers
    $null = podman stop keycloak 2>$null
    $null = podman rm -f keycloak 2>$null
    $null = podman pod rm -af 2>$null
    
    # Start container
    $null = podman run --detach --name keycloak `
        -p 8081:8080 `
        -e KEYCLOAK_ADMIN=admin `
        -e KEYCLOAK_ADMIN_PASSWORD=admin `
        -e KC_DB=dev-file `
        -e KC_HTTP_PORT=8080 `
        -e KC_HOSTNAME_STRICT=false `
        -e KC_HTTP_ENABLED=true `
        -v ./keycloak-realm.json:/opt/keycloak/data/import/realm.json:Z `
        quay.io/keycloak/keycloak:24.0.0 start-dev --import-realm --http-relative-path / --hostname-strict-https=false
    
    Write-Host ">>> Keycloak deployment dispatched." -ForegroundColor Green
}

# 3. Immediate Handoff
Write-Host ">>> Launching Neural Interface (VITE) in parallel..." -ForegroundColor Green
npm run dev
