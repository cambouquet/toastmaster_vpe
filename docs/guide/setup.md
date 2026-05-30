# System Setup // K App

> [!TIP]
> This is a **Technical Specification**. For the end-user manual and the latest vision, see the [Live Journey Guide](https://k-app.tech/briefing/guide/introduction).

## [PREREQUISITES]
*   **Target Hardware**: Ubuntu 22.04+ VM.
*   **Uplink Address**: A Records for `k-app.cloud` and `auth.k-app.cloud`.
*   **Open Ports**: 80, 443 (Web), 8080 (Auth), 8091-8096 (Data Hub).

## [VM INITIALIZATION]
Run the bootstrap script on the remote host:
```bash
chmod +x setup_vm.sh && ./setup_vm.sh
# LOGOUT/LOGIN TO APPLY PERMISSIONS
```

## [INFRASTRUCTURE SYNC]
The system requires the following files in `~/app/` before deployment:
*   `Caddyfile` (Caddy reverse proxy)
*   `keycloak-realm.json` (Identity protocols)
*   `deploy/*.env` (Environment-specific data)

## [FIRST BOOT PROTOCOL]
1.  **Deploy**: Trigger the pipeline or run `./deploy.sh [target]` manually.
2.  **Data Hub Setup**: Access `http://[IP]:8091`.
3.  **Auth**: Log in with default credentials (`admin`/`password`).
4.  **Bucket**: Create a new bucket named `k-app`. **THE APP WILL FAIL WITHOUT THIS.**

## [TROUBLESHOOTING]
*   **SSL Loop**: Check A Records and Caddy logs: `docker compose logs caddy`.
*   **Uplink Link Failure**: Verify the `k-app` bucket exists in Couchbase.
*   **Port Collision**: Ensure no other service is binding to 80 or 443.

---
<span style="color: #666; font-size: 0.8em;">[TRANSMISSION_SECURED]</span>
