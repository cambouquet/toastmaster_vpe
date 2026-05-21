import { useState, useRef } from "react";
import { useSystemLogs } from "./useSystemLogs";
import { INITIAL_STATE } from "../data/initialState";
import { useCollaborationEffects } from "./useCollaborationEffects";
export const useCollaboration = (aiService) => {
  const [state, setState] = useState({ ...INITIAL_STATE, testStatus: "STANDBY", ackCount: 0 });
  const [subtitle, setSubtitle] = useState("Standby.");
  const { logs, addLog, clearLogs } = useSystemLogs();
  const lastReq = useRef(0), lastInput = useRef(""), lastSent = useRef(""), lastAct = useRef(0);
  const up = (ns) => ns && setState(p => ({ ...p, ...ns, roles: ns.roles ? { ...p.roles, ...ns.roles } : p.roles }));
  const interact = async (input, isType = false, isUser = true) => {
    if (isUser) lastAct.current = Date.now();
    if (isType && input === lastSent.current) return;
    if (!isType) setState(p => ({ ...p, ackCount: p.ackCount + 1 }));
    lastInput.current = input;
    if (isType && input !== lastSent.current && (Date.now() - lastAct.current < 50)) return;
    const reqId = ++lastReq.current;
    if (!isType) addLog(`[USER] ${input}`, "user");
    lastSent.current = input; 
    const res = await aiService.processInput(input, state, (u) => {
      if (reqId === lastReq.current) { 
        setSubtitle(u.subtitle); 
        if (u.subtitle) addLog(`[AGENT] ${u.subtitle}`, "bot"); 
        up(u.newState); 
      }
    });
    if (reqId === lastReq.current) {
      setSubtitle(res.subtitle);
      if (res.subtitle) addLog(`[AGENT] ${res.subtitle}`, "bot");
      up(res.newState);
    }
  };
  const uiAction = async (type, val) => {
    if (type === "RUN_TESTS") return setState(s => ({ ...s, testStatus: "RUNNING" }));
    const res = await aiService.handleUiAction(type, val, state);
    setSubtitle(res.subtitle);
    if (res.subtitle) addLog(`[SYS] ${res.subtitle}`, "info");
    up(res.newState);
  };
  useCollaborationEffects(lastAct, lastInput, setState, interact);
  return { state, subtitle, interact, uiAction, logs, clearLogs };
};
