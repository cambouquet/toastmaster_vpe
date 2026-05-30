import { spawnSync } from "node:child_process";

const isWin = process.platform === "win32";

export function exec(cmd, args, inherit = false) {
  return spawnSync(cmd, args, {
    encoding: "utf8",
    shell: isWin,
    stdio: inherit ? "inherit" : "pipe"
  });
}

export function run(args, inherit = false) {
  return exec("podman", args, inherit);
}

export function out(args) {
  const r = run(args);
  return r.status === 0 ? r.stdout.trim() : "";
}

export function ensureMachine() {
  if (process.platform === "linux") return;
  const state = out(["machine", "inspect", "default", "--format", "{{.State}}"]);
  if (!/running/i.test(state)) run(["machine", "start"], true);
}
