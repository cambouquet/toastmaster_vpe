import { useState, useRef, useEffect, useCallback } from "react";
import { useSystemLogs } from "./useSystemLogs";
import { INITIAL_STATE } from "../data/initialState";
import { useCollaborationEffects } from "./useCollaborationEffects";
import { getIdentity } from "../services/auth/KeycloakService";
import { useNotifications } from "./useNotifications";
import { usePersistence } from "./usePersistence";
import { useSubtitleQueue } from "./useSubtitleQueue";

export const useCollaboration = (ai) => {
  const [state, setState] = useState({ ...INITIAL_STATE, testStatus: "STANDBY", ackCount: 0, currentUser: getIdentity() });
  const { subtitle, setTimedSubtitle } = useSubtitleQueue();
  const { notifications, notify, dismiss } = useNotifications();
  const { logs, addLog, clearLogs } = useSystemLogs();
  const refs = { lastReq: useRef(0), lastIn: useRef(""), lastSent: useRef(""), lastAct: useRef(0) };

  usePersistence(state, setState, notify, addLog, setTimedSubtitle);
  
  const up = useCallback((ns) => {
    if (!ns) return;
    setState(p => ({ ...p, ...ns, roles: ns.roles ? { ...p.roles, ...ns.roles } : p.roles }));
  }, []);

  const interact = useCallback(async (input, isType = false, isUser = true) => {
    if (isUser) refs.lastAct.current = Date.now();
    if (isType && input === refs.lastSent.current) return;
    if (!isType) setState(p => ({ ...p, ackCount: p.ackCount + 1 }));
    refs.lastIn.current = input;
    if (isType && input !== refs.lastSent.current && (Date.now() - refs.lastAct.current < 50)) return;
    
    const reqId = ++refs.lastReq.current;
    if (!isType) addLog(`[USER] ${input}`, "user");
    refs.lastSent.current = input; 
    
    const res = await ai.processInput(input, state, (u) => {
      if (reqId === refs.lastReq.current) {
        if (u.subtitle) { setTimedSubtitle(u.subtitle); addLog(`[AGENT] ${u.subtitle}`, "bot"); }
        if (u.notification) { notify(u.notification); addLog(`[SYS] ${u.notification}`, "info"); }
        up(u.newState);
      }
    });

    if (reqId === refs.lastReq.current) {
      if (res.subtitle) { setTimedSubtitle(res.subtitle); addLog(`[AGENT] ${res.subtitle}`, "bot"); }
      if (res.notification) { notify(res.notification); addLog(`[SYS] ${res.notification}`, "info"); }
      up(res.newState);
    }
  }, [ai, state, addLog, up, setTimedSubtitle, notify]);

  const uiAction = useCallback(async (type, val) => {
    addLog(`[ACTION] ${type}${val ? ': ' + JSON.stringify(val) : ''}`, "info");
    if (type === "RUN_TESTS") return setState(s => ({ ...s, testStatus: "RUNNING" }));
    const res = await ai.handleUiAction(type, val, state);
    if (res.notification) { 
      notify(res.notification); 
      addLog(`[SYS] ${res.notification}`, "info"); 
    }
    if (res.subtitle) {
      setTimedSubtitle(res.subtitle);
      addLog(`[AGENT] ${res.subtitle}`, "bot");
    }
    up(res.newState);
  }, [ai, state, addLog, notify, up, setTimedSubtitle]);

  useEffect(() => {
    const id = getIdentity();
    if (id.name !== state.currentUser.name) setState(s => ({ ...s, currentUser: id }));
  }, [state.currentUser.name]);

  useCollaborationEffects(refs.lastAct, refs.lastIn, setState, interact, addLog);

  return { state, subtitle, interact, uiAction, logs, clearLogs, notify, notifications, dismiss };
};
