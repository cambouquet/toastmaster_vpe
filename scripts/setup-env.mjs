import path from "node:path";
import { ensureMachine, run } from "./podman-common.mjs";

console.log(">>> MISSION CONTROL - INITIAL SYSTEM PROVISIONING");
ensureMachine();

run(["stop", "keycloak"]);
run(["rm", "-f", "keycloak"]);
run(["pod", "rm", "-af"]);

run([
  "run", "--detach", "--name", "keycloak", "-p", "8081:8080",
  "-e", "KEYCLOAK_ADMIN=admin", "-e", "KEYCLOAK_ADMIN_PASSWORD=admin",
  "-e", "KC_DB=dev-mem", "-e", "KC_HOSTNAME_STRICT=false",
  "-e", "KC_HOSTNAME_STRICT_HTTPS=false", "-e", "KC_HTTP_ENABLED=true",
  "-e", "KC_HOSTNAME=localhost", "-e", "KC_HOSTNAME_PORT=8081",
  "-v", `./${path.basename("./keycloak-realm.json")}:/opt/keycloak/data/import/realm.json:Z`,
  "-v", `./keycloak/themes/k:/opt/keycloak/themes/k:Z`,
  "quay.io/keycloak/keycloak:24.0.0", "start-dev", "--import-realm"
], true);

const deadline = Date.now() + 120000;
let ok = false;
while (Date.now() < deadline) {
  try {
    const r = await fetch("http://localhost:8081/realms/k");
    if (r.ok) { ok = true; break; }
  } catch {}
  await new Promise((r) => setTimeout(r, 3000));
  process.stdout.write(".");
}
console.log("");
if (!ok) {
  console.error(">>> [CRITICAL] Provisioning timed out. Check 'podman logs keycloak'.");
  process.exit(1);
}
run(["exec", "keycloak", "/opt/keycloak/bin/kcadm.sh", "config", "credentials", "--server", "http://localhost:8080", "--realm", "master", "--user", "admin", "--password", "admin"], true);
run(["exec", "keycloak", "/opt/keycloak/bin/kcadm.sh", "update", "realms/master", "-s", "sslRequired=none"], true);
console.log(">>> PROVISIONING COMPLETE. URL: http://localhost:8081 Realm: k");
