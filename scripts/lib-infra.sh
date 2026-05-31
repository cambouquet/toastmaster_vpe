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
    systemctl list-units "actions.runner.*" --all || true
    [ -z "$GH_TOKEN" ] || gh run list --status queued --limit 5 || true ;;
  "cancel-queued")
    if ! command -v gh &>/dev/null || [ -z "$GH_TOKEN" ]; then echo "❌ Tool Error: gh or token missing"; EX=1; else
    IDS=$(gh run list --status queued --json databaseId -q '.[].databaseId')
    COUNT=$(echo "$IDS" | grep -c . || echo 0)
    echo "🗑️ Found $COUNT queued jobs. Cancelling..."
    echo "$IDS" | xargs -r -I{} -P 5 gh run cancel {} || true; fi ;;
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
