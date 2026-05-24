import { useState, useRef, useEffect, useCallback } from "react";
import { useSystemLogs } from "./useSystemLogs";
import { INITIAL_STATE } from "../data/initialState";
import { useCollaborationEffects } from "./useCollaborationEffects";
import { getIdentity } from "../services/auth/KeycloakService";
import { useNotifications } from "./useNotifications";
import { usePersistence } from "./usePersistence";
import { useSubtitleQueue } from "./useSubtitleQueue";
import { useCollaborationActions } from "./useCollaborationActions";

export const useCollaboration = (ai) => {
  const [state, setState] = useState({ ...INITIAL_STATE, testStatus: "STANDBY", ackCount: 0, currentUser: getIdentity() });
  const { subtitle, setTimedSubtitle } = useSubtitleQueue();
  const { notifications, notify, dismiss } = useNotifications();
  const { logs, addLog, clearLogs } = useSystemLogs();
  const refs = { lastReq: useRef(0), lastIn: useRef(""), lastSent: useRef(""), lastAct: useRef(0) };

  const up = useCallback((ns) => {
    if (!ns) return;
    setState(p => ({ ...p, ...ns, roles: ns.roles ? { ...p.roles, ...ns.roles } : p.roles }));
  }, []);

  const { interact, uiAction } = useCollaborationActions({ ai, state, refs, up, addLog, notify, setTimedSubtitle });

  usePersistence(state, setState, notify, addLog, setTimedSubtitle);
  
  useEffect(() => {
    const id = getIdentity();
    if (id.name !== state.currentUser.name) setState(s => ({ ...s, currentUser: id }));
  }, [state.currentUser.name]);

  useCollaborationEffects(refs.lastAct, refs.lastIn, setState, interact, addLog);

  return { state, subtitle, interact, uiAction, logs, clearLogs, notify, notifications, dismiss };
};
