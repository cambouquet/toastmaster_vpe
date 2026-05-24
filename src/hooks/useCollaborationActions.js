import { useCallback } from "react";

export const useCollaborationActions = ({ ai, state, refs, up, addLog, notify, setTimedSubtitle }) => {
  const interact = useCallback(async (input, isType = false, isUser = true) => {
    if (isUser) refs.lastAct.current = Date.now();
    if (isType && input === refs.lastSent.current) return;
    if (!isType) up({ ackCount: state.ackCount + 1 });
    refs.lastIn.current = input;
    if (isType && input !== refs.lastSent.current && (Date.now() - refs.lastAct.current < 50)) return;
    const reqId = ++refs.lastReq.current;
    if (!isType) addLog(`[USER] ${input}`, "user");
    refs.lastSent.current = input; 
    const handle = (u) => {
      if (reqId !== refs.lastReq.current) return;
      if (u.subtitle) { setTimedSubtitle(u.subtitle); addLog(`[AGENT] ${u.subtitle}`, "ai"); }
      if (u.notification) { notify(u.notification); addLog(`[SYS] ${u.notification}`, "info"); }
      up(u.newState);
    };
    const res = await ai.processInput(input, state, handle);
    handle(res);
  }, [ai, state, addLog, up, setTimedSubtitle, notify, refs]);

  const uiAction = useCallback(async (type, val) => {
    addLog(`[ACTION] ${type}${val ? ': ' + JSON.stringify(val) : ''}`, "info");
    if (type === "RUN_TESTS") return up({ testStatus: "RUNNING" });
    const res = await ai.handleUiAction(type, val, state);
    if (res.notification) { notify(res.notification); addLog(`[SYS] ${res.notification}`, "info"); }
    if (res.subtitle) { setTimedSubtitle(res.subtitle); addLog(`[AGENT] ${res.subtitle}`, "ai"); }
    up(res.newState);
  }, [ai, state, addLog, notify, up, setTimedSubtitle]);

  return { interact, uiAction };
};