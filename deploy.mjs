import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

if (!process.version.startsWith('v24.')) {
  console.error(`❌ Node 24 is required. Current version: ${process.version}`);
  process.exit(1);
}

const target = process.argv[2] || "prod";
const envFile = `./deploy/${target}.env`;

if (!fs.existsSync(envFile)) {
  console.error(`❌ Environment file ${envFile} not found. Specify 'prod' or 'test'.`);
  process.exit(1);
}

console.log(`🚀 Loading environment: ${target}...`);
const envContent = fs.readFileSync(envFile, "utf-8");
const envVars = Object.fromEntries(
  envContent
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))
    .map((line) => line.split("="))
);

process.env = { ...process.env, ...envVars };

const appImage = `meetings-app:${target}`;
console.log(`🔨 Building image ${appImage}...`);
const buildArgs = Object.entries(envVars)
  .filter(([key]) => key.startsWith("VITE_"))
  .flatMap(([key, val]) => ["--build-arg", `${key}=${val}`]);

run("docker", ["build", ...buildArgs, "-t", appImage, "."]);

console.log(`♻️ Restarting ${target} stack...`);
const projectName = `k-app-${target}`;
const commonEnv = { 
  ...process.env, 
  ...envVars, 
  APP_IMAGE: appImage,
  HTTP_PORT: target === "prod" ? "80" : "8082",
  HTTPS_PORT: target === "prod" ? "443" : "8444",
  KEYCLOAK_PORT: target === "prod" ? "8080" : "8083",
  COUCHBASE_PORT: target === "prod" ? "8091" : "8097",
  COUCHBASE_EXT_PORT: target === "prod" ? "8092" : "8098",
  COUCHBASE_QUERY_PORT: target === "prod" ? "8093" : "8099",
  COUCHBASE_SEARCH_PORT: target === "prod" ? "8094" : "8100",
  COUCHBASE_MEM_PORT: target === "prod" ? "11210" : "11212"
};

function run(cmd, args, options = {}) {
  const result = spawnSync(cmd, args, { stdio: "inherit", ...options });
  if (result.status !== 0) {
    console.error(`❌ Command failed: ${cmd} ${args.join(" ")}`);
    process.exit(result.status || 1);
  }
  return result;
}

run("docker", [
  "compose", 
  "-p", projectName,
  "-f", "docker-compose.prod.yml", 
  "down", "--remove-orphans"
], { env: commonEnv });

run("docker", [
  "compose", 
  "-p", projectName,
  "-f", "docker-compose.prod.yml", 
  "up", "-d"
], { env: commonEnv });

console.log("🧹 Pruning dangling system artifacts...");
spawnSync("docker", ["image", "prune", "-f"], { stdio: "inherit" });

console.log(`✅ ${target} Deployment complete!`);
console.log(`📍 Application: https://${process.env.DOMAIN_NAME}`);
console.log(`🔐 Auth: https://${process.env.AUTH_DOMAIN_NAME}`);
