# setup-env.ps1
Write-Host ">>> TOASTMASTER VPE - INITIAL SYSTEM PROVISIONING" -ForegroundColor Cyan

# 1. Start Podman Machine
Write-Host ">>> Ensuring Podman VM is active..."
try {
    $vmStatus = podman machine inspect default --format "{{.State}}" 2>$null
    if ($vmStatus -ne "running") {
        Write-Host ">>> Powering up Podman VM..." -ForegroundColor Yellow
        podman machine start 2>$null
    } else {
        Write-Host ">>> Podman VM is already online." -ForegroundColor Green
    }
} catch {
    Write-Host ">>> Warning: Could not inspect Podman machine. Attempting start anyway..." -ForegroundColor Gray
    podman machine start 2>$null
}

# 2. Hard Reset of Infrastructure
Write-Host ">>> Purging existing infrastructure..." -ForegroundColor Yellow
$null = podman stop keycloak 2>$null
$null = podman rm -f keycloak 2>$null
$null = podman pod rm -af 2>$null
Write-Host ">>> Cleanup complete." -ForegroundColor Green

# 3. Provision Admin & Import Realm
Write-Host ">>> Bootstrapping Keycloak Admin & Toastmaster Realm (Port 8081)..." -ForegroundColor Cyan
podman run --detach --name keycloak `
    -p 8081:8080 `
    -e KEYCLOAK_ADMIN=admin `
    -e KEYCLOAK_ADMIN_PASSWORD=admin `
    -e KC_DB=dev-file `
    -e KC_HTTP_PORT=8080 `
    -e KC_HOSTNAME_STRICT=false `
    -e KC_HTTP_ENABLED=true `
    -v ./keycloak-realm.json:/opt/keycloak/data/import/realm.json:Z `
    quay.io/keycloak/keycloak:24.0.0 start-dev --import-realm --http-relative-path / --hostname-strict-https=false

# 4. Verification Loop
Write-Host ">>> Validating system heartbeat..." -ForegroundColor Yellow
$sw = [diagnostics.stopwatch]::StartNew()
$timeout = 90 # Generous timeout for first-time provisioning
$ready = $false

while ($sw.Elapsed.TotalSeconds -lt $timeout) {
    try {
        # Check for the actual 'toastmaster' realm availability
        $config = Invoke-RestMethod -Uri "http://localhost:8081/realms/toastmaster" -UseBasicParsing -ErrorAction SilentlyContinue
        if ($config) {
            $ready = $true
            break
        }
    } catch { }
    Write-Host "." -NoNewline
    Start-Sleep -Seconds 3
}

if ($ready) {
    Write-Host "`n>>> PROVISIONING COMPLETE. NEURAL LINK ESTABLISHED." -ForegroundColor Green
    Write-Host ">>> Admin: admin / admin"
    Write-Host ">>> Realm: toastmaster"
    Write-Host ">>> URL: http://localhost:8081"
} else {
    Write-Host "`n>>> [CRITICAL] Provisioning timed out. Check 'podman logs keycloak'." -ForegroundColor Red
}
