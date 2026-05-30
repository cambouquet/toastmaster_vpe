import { exec, ensureMachine, out, run } from "./podman-common.mjs";

console.log(">>> MISSION CONTROL - NEURAL SYSTEM BOOT");
ensureMachine();

const up = out(["ps", "--filter", "name=keycloak", "--format", "{{.Status}}"]).startsWith("Up");
if (!up) {
  console.log(">>> Keycloak not detected. Initializing orchestration...");
  run(["stop", "keycloak"]);
  run(["rm", "-f", "keycloak"]);
  run(["pod", "rm", "-af"]);
  run([
    "run", "--detach", "--name", "keycloak", "-p", "8081:8080",
    "-e", "KEYCLOAK_ADMIN=admin", "-e", "KEYCLOAK_ADMIN_PASSWORD=admin",
    "-e", "KC_DB=dev-mem", "-e", "KC_HOSTNAME_STRICT=false",
    "-e", "KC_HOSTNAME_STRICT_HTTPS=false", "-e", "KC_HTTP_ENABLED=true",
    "-e", "KC_HOSTNAME=localhost", "-e", "KC_HOSTNAME_PORT=8081",
    "-v", "./keycloak-realm.json:/opt/keycloak/data/import/realm.json:Z",
    "-v", "./keycloak/themes/k:/opt/keycloak/themes/k:Z",
    "quay.io/keycloak/keycloak:24.0.0", "start-dev", "--import-realm"
  ], true);
}

console.log(">>> [LINK] Keycloak Admin: http://localhost:8081 (admin/admin)");
console.log(">>> [LINK] Primary (1777) [CYAN]:  http://localhost:1777");
console.log(">>> [LINK] Sandbox (1778) [YELLOW]: http://localhost:1778");
const child = exec("npm", ["run", "start:dual"], true);
process.exit(child.status ?? 1);
