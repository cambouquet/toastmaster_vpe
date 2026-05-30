import { spawnSync } from "node:child_process";

export function recoverPorts(env) {
  const ports = [
    env.HTTP_PORT, env.HTTPS_PORT, env.KEYCLOAK_PORT, 
    env.COUCHBASE_PORT, env.COUCHBASE_EXT_PORT,
    env.COUCHBASE_QUERY_PORT, env.COUCHBASE_SEARCH_PORT,
    env.COUCHBASE_MEM_PORT
  ];
  ports.forEach(port => {
    const check = spawnSync("docker", ["ps", "-q", "--filter", `publish=${port}`]);
    const id = check.stdout?.toString().trim();
    if (id) {
      console.log(`🧹 Release: ${port} (${id})`);
      spawnSync("docker", ["stop", id]);
    }
  });
  spawnSync("docker", ["image", "prune", "-f"], { stdio: "inherit" });
}
