import { useEffect } from "react";
import { INITIAL_STATE } from "../data/initialState";
export const usePersistence = (state, setState, notify, addLog, setTimedSubtitle) => {
  const isProd = typeof window !== 'undefined' && window.location.hostname !== 'localhost';
  const baseUrl = isProd ? '' : 'http://localhost:3001';

  useEffect(() => {
    const pending = sessionStorage.getItem('pending_notification');
    if (pending) { 
      if (setTimedSubtitle) setTimedSubtitle(pending);
      if (addLog) addLog(`[BOOT] ${pending}`, "bot");
      sessionStorage.removeItem('pending_notification'); 
    }
    fetch(`${baseUrl}/api/state`).then(r => r.json()).then(data => {
      if (data?.members?.length > 0) {
        if (addLog) addLog(`[SYNC] Restored ${data.members.length} nodes from persistent storage.`, "info");
        setState(s => ({ ...s, members: data.members }));
      }
    }).catch(e => console.error("Load Error:", e));
    
    // Last Session Restoration
    const lastSession = localStorage.getItem('meeting_last_session');
    if (lastSession) {
      try {
        const { members } = JSON.parse(lastSession);
        if (members) setState(s => ({ ...s, members }));
      } catch (e) {
        console.error("Session Restore Error:", e);
      }
    }
  }, [notify, addLog, setState]);

  useEffect(() => {
    localStorage.setItem('meeting_last_session', JSON.stringify({
      currentApp: state.currentApp,
      currentScreen: state.currentScreen
    }));
  }, [state.currentApp, state.currentScreen]);

  useEffect(() => {
    if (state.members !== INITIAL_STATE.members) {
      fetch(`${baseUrl}/api/state`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ members: state.members }) }).catch(e => {
        console.error("Sync Error:", e);
        if (addLog) addLog(`[ERROR] Sync failed: ${e.message}`, "error");
      });
    }
  }, [state.members, addLog, baseUrl]);
};
