import { useEffect } from "react";
import { INITIAL_STATE } from "../data/initialState";
export const usePersistence = (state, setState, notify, addLog, setTimedSubtitle) => {
  useEffect(() => {
    const pending = sessionStorage.getItem('pending_notification');
    if (pending) { 
      if (setTimedSubtitle) setTimedSubtitle(pending);
      if (addLog) addLog(`[BOOT] ${pending}`, "bot");
      sessionStorage.removeItem('pending_notification'); 
    }
    fetch('http://localhost:3001/api/state').then(r => r.json()).then(data => {
      if (data?.members?.length > 0) {
        if (addLog) addLog(`[SYNC] Restored ${data.members.length} nodes from persistent storage.`, "info");
        setState(s => ({ ...s, members: data.members }));
      }
    }).catch(e => console.error("Load Error:", e));
    
    // Last Session Restoration
    const lastSession = localStorage.getItem('vpe_last_session');
    if (lastSession) {
      try {
        const { currentApp, currentScreen } = JSON.parse(lastSession);
        setState(s => ({ ...s, currentApp, currentScreen }));
      } catch (e) {
        console.error("Session Restore Error:", e);
      }
    }
  }, [notify, addLog, setState]);

  useEffect(() => {
    localStorage.setItem('vpe_last_session', JSON.stringify({
      currentApp: state.currentApp,
      currentScreen: state.currentScreen
    }));
  }, [state.currentApp, state.currentScreen]);

  useEffect(() => {
    if (state.members !== INITIAL_STATE.members) {
      fetch('http://localhost:3001/api/state', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ members: state.members }) }).catch(e => {
        console.error("Sync Error:", e);
        if (addLog) addLog(`[ERROR] Sync failed: ${e.message}`, "error");
      });
    }
  }, [state.members, addLog]);
};
