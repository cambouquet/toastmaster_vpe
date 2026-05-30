import { spawnSync } from "node:child_process";
import fs from "node:fs";

export function run(cmd, args, options = {}) {
  const result = spawnSync(cmd, args, { stdio: "inherit", ...options });
  if (result.status !== 0 && !options.allowFail) {
    console.error(`❌ Command failed: ${cmd} ${args.join(" ")}`);
    process.exit(result.status || 1);
  }
  return result;
}

export function loadEnv(target) {
  const envFile = `./deploy/${target}.env`;
  if (!fs.existsSync(envFile)) throw new Error(`Env ${envFile} missing`);
  return Object.fromEntries(
    fs.readFileSync(envFile, "utf-8").split("\n")
      .map(l => l.trim()).filter(l => l && !l.startsWith("#"))
      .map(l => l.split("="))
  );
}
