import { spawnSync } from "node:child_process";
import { run, loadEnv } from "./scripts/lib-deploy.mjs";
import { recoverPorts } from "./scripts/lib-recovery.mjs";

if (!process.version.startsWith('v24.')) process.exit(1);

const target = process.argv[2] || "prod";
const envVars = loadEnv(target);
process.env = { ...process.env, ...envVars };

const appImage = `meetings-app:${target}`;
const buildArgs = Object.entries(envVars)
  .filter(([k]) => k.startsWith("VITE_")).flatMap(([k, v]) => ["--build-arg", `${k}=${v}`]);

run("docker", ["build", ...buildArgs, "-t", appImage, "."]);

const commonEnv = { 
  ...process.env, APP_IMAGE: appImage,
  HTTP_PORT: target === "prod" ? "80" : "8082",
  HTTPS_PORT: target === "prod" ? "443" : "8444",
  KEYCLOAK_PORT: target === "prod" ? "8080" : "8083",
  COUCHBASE_PORT: target === "prod" ? "8091" : "8097",
  COUCHBASE_EXT_PORT: target === "prod" ? "8092" : "8098",
  COUCHBASE_QUERY_PORT: target === "prod" ? "8093" : "8099",
  COUCHBASE_SEARCH_PORT: target === "prod" ? "8094" : "8100",
  COUCHBASE_MEM_PORT: target === "prod" ? "11210" : "11212"
};

console.log("♻️ Rapid Fire: " + target + "...");
const pName = "k-app-" + target;
const res = spawnSync("docker", [
  "compose", "-p", pName, "-f", "docker-compose.prod.yml", "up", "-d"
], { env: commonEnv, stdio: "inherit" });

if (res.status !== 0) {
  console.log("⚠️ Recovery Mode...");
  recoverPorts(commonEnv);
  run("docker", [
    "compose", "-p", pName, "-f", "docker-compose.prod.yml", "up", "-d", "--force-recreate"
  ], { env: commonEnv });
}
console.log("✅ " + target + " Active: " + process.env.DOMAIN_NAME);
