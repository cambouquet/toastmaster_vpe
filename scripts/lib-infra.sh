#!/bin/bash
set -e
A=$1; EX=0;
echo "================================================================"
echo "    _    ____ _____ _   _ _____ "
echo "   / \  / ___| ____| \ | |_   _|"
echo "  / _ \| |  _|  _| |  \| | | |  "
echo "--- THE MACHINES ARE LISTENING ---"
echo "💠 CURRENT TASK: [ $A ]"
echo "================================================================"

case "$A" in
  "telemetry")
    echo "📊 SYSTEM TELEMETRY INITIATED..."
    df -h | grep '^/'; node -v; docker version --format '{{.Client.Version}}' 2>/dev/null || true
    if systemctl list-units "actions.runner.*" --all | grep -m 1 "failed"; then
      echo "❌ CRITICAL: Runner service(s) in FAILED state. Signaling orchestator..."
      EX=1
    fi
    systemctl list-units "actions.runner.*" --all || true
    [ -z "$GH_TOKEN" ] || gh run list -R "$REPO" --status queued --limit 5 || true ;;
  "cancel-queued")
    echo "🗑️  QUEUE PURGE INITIATED..."
    if ! command -v gh &>/dev/null || [ -z "$GH_TOKEN" ]; then echo "❌ Tool Error: gh or token missing"; EX=1; else
    IDS=$(gh run list -R "$REPO" --status queued --json databaseId -q '.[].databaseId' || echo "")
    COUNT=$(echo "$IDS" | grep -c . || echo 0)
    echo "🗑️ Found $COUNT queued jobs in $REPO. Cancelling..."
    if [ "$COUNT" -gt 0 ]; then
      echo "$IDS" | xargs -r -I{} -P 3 gh run cancel {} -R "$REPO" || true
      echo "⏳ Cooling down for API propagation..."
      sleep 5
    fi; fi ;;
  "cleanup") 
    echo "🧹 DISK CLEANUP INITIATED..."
    docker system prune -af --volumes
    docker buildx prune -af ;;
  "patch-os") sudo apt-get update && sudo apt-get upgrade -y ;;
  "hard-reset") docker compose down --remove-orphans || true; sudo rm -rf ~/app && rm -f ~/.vm_ready ;;
esac
echo ""; echo "╔══════════════════════════════════════════════════════════════╗"
if [ $EX -ne 0 ]; then
    echo "║ ❌  TASK ERROR: [ $A ]                                       ║"
    echo "╠══════════════════════════════════════════════════════════════╣"
    echo "║ 🛠️  AUTOMATED REPAIR TRIGGERED ──▶ Running Provision...      ║"
else
    echo "║ 📋  TASK VERIFICATION                                        ║"
    echo "╠══════════════════════════════════════════════════════════════╣"
    echo "║ ✅  STATUS: NOMINAL           ──▶ Continuing Sequence...     ║"
fi
echo "╚══════════════════════════════════════════════════════════════╝"
exit $EX
