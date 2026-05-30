import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

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

console.log("📦 Building frontend...");
spawnSync("npm", ["run", "build"], { 
  stdio: "inherit",
  env: { ...process.env, ...envVars } 
});

const appImage = `meetings-app:${target}`;
console.log(`🔨 Building image ${appImage}...`);
const buildArgs = Object.entries(envVars)
  .filter(([key]) => key.startsWith("VITE_"))
  .flatMap(([key, val]) => ["--build-arg", `${key}=${val}`]);

spawnSync("docker", ["build", ...buildArgs, "-t", appImage, "."], { stdio: "inherit" });

console.log(`♻️ Restarting ${target} stack...`);
const projectName = `k-app-${target}`;
spawnSync("docker", [
  "compose", 
  "-p", projectName,
  "-f", "docker-compose.prod.yml", 
  "down", "--remove-orphans"
], { stdio: "inherit" });

spawnSync("docker", [
  "compose", 
  "-p", projectName,
  "-f", "docker-compose.prod.yml", 
  "up", "-d"
], { 
  stdio: "inherit",
  env: { 
    ...process.env, 
    ...envVars, 
    APP_IMAGE: appImage,
    HTTP_PORT: target === "prod" ? "80" : "8082",
    HTTPS_PORT: target === "prod" ? "443" : "8444",
    KEYCLOAK_PORT: target === "prod" ? "8080" : "8083",
    COUCHBASE_PORT: target === "prod" ? "8091" : "8097"
  }
});

console.log(`✅ ${target} Deployment complete!`);
console.log(`📍 Application: https://${process.env.DOMAIN_NAME}`);
console.log(`🔐 Auth: https://${process.env.AUTH_DOMAIN_NAME}`);
