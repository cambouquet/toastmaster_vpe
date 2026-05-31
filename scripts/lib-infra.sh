#!/bin/bash
set -e
A=$1; EX=0; echo "    _    ____ _____ _   _ _____ "
echo "   / \  / ___| ____| \ | |_   _|"
echo "  / _ \| |  _|  _| |  \| | | |  "
echo "--- THE MACHINES ARE LISTENING ---"
echo "💠 TASK: [ $A ]"
case "$A" in
  "telemetry")
    df -h | grep '^/'; node -v; docker version --format '{{.Client.Version}}' 2>/dev/null || true
    if systemctl list-units "actions.runner.*" --all | grep -q "failed"; then
      echo "❌ CRITICAL: Runner service(s) in FAILED state. Triggering repair..."
      EX=1
    fi
    systemctl list-units "actions.runner.*" --all || true
    [ -z "$GH_TOKEN" ] || gh run list -R "$REPO" --status queued --limit 5 || true ;;
  "cancel-queued")
    if ! command -v gh &>/dev/null || [ -z "$GH_TOKEN" ]; then echo "❌ Tool Error: gh or token missing"; EX=1; else
    # Use -R to force repository context when outside a git clone
    IDS=$(gh run list -R "$REPO" --status queued --json databaseId -q '.[].databaseId' || echo "")
    COUNT=$(echo "$IDS" | grep -c . || echo 0)
    echo "🗑️ Found $COUNT queued jobs in $REPO. Cancelling..."
    if [ "$COUNT" -gt 0 ]; then
      # GitHub API might return 500/Concurrency errors if hammered too hard or if runs are already terminating
      echo "$IDS" | xargs -r -I{} -P 3 gh run cancel {} -R "$REPO" || true
      echo "⏳ Cooling down for API propagation..."
      sleep 5
    fi; fi ;;
  "cleanup") docker system prune -af --volumes ;;
  "patch-os") sudo apt-get update && sudo apt-get upgrade -y ;;
  "hard-reset") docker compose down --remove-orphans || true; sudo rm -rf ~/app && rm -f ~/.vm_ready ;;
esac
echo ""; echo "╔══════════════════════════════════════════════════════════════╗"
if [ $EX -ne 0 ]; then
    echo "║ ❌ TASK FAILED: [ $A ]                                       ║"
    echo "╠══════════════════════════════════════════════════════════════╣"
    echo "║ 🚀 ERROR DETECTED     ──▶ Run 'PROVISION' to fix tools       ║"
else
    echo "║ ⏭️  REQUIRED MAINTENANCE ACTIONS                              ║"
    echo "╠══════════════════════════════════════════════════════════════╣"
    echo "║ ✅ TASK COMPLETE: [ $A ] ──▶ Run 'telemetry' to verify       ║"
fi
echo "╚══════════════════════════════════════════════════════════════╝"
exit $EX
