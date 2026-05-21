import { useState, useEffect, useRef } from 'react';
import { useSystemLogs } from './useSystemLogs';
import { INITIAL_STATE } from '../data/initialState';

export const useCollaboration = (aiService) => {
  const [state, setState] = useState({ ...INITIAL_STATE, testStatus: 'STANDBY', ackCount: 0 });
  const [subtitle, setSubtitle] = useState('Standby.');
  const { logs, addLog, clearLogs } = useSystemLogs();
  const lastReq = useRef(0), lastInput = useRef(''), lastSent = useRef('');
  const lastAct = useRef(0);

  useEffect(() => {
    const itv = setInterval(() => {
      const now = Date.now();
      if (now - lastAct.current < 5000 && lastInput.current.trim()) {
        setState(p => ({ ...p, ackCount: p.ackCount + 1 }));
        interact(lastInput.current, true, false);
      }
    }, 1000);
    return () => clearInterval(itv);
  }, []);

  useEffect(() => {
    const handler = (e) => setState(p => ({ ...p, testStatus: e.detail.success ? 'PASSED' : 'FAILED' }));
    window.addEventListener('TEST_RESULT', handler);
    return () => window.removeEventListener('TEST_RESULT', handler);
  }, []);

  const interact = async (input, isType = false, isUser = true) => {
    if (isUser) lastAct.current = Date.now();
    if (!isType) setState(p => ({ ...p, ackCount: p.ackCount + 1 }));
    lastInput.current = input;
    
    // Keystrokes (isType=true) only update the buffer. 
    // The actual "reading" pulse is driven exclusively by the 1s interval above.
    if (isType && input !== lastSent.current && (Date.now() - lastAct.current < 50)) return;

    const reqId = ++lastReq.current;
    if (!isType) addLog(`User: ${input}`, 'user');
    lastSent.current = input; 

    const res = await aiService.processInput(input, state);
    if (reqId !== lastReq.current) return;
    
    setSubtitle(res.subtitle);
    if (res.newState) setState(p => ({ 
      ...p, ...res.newState,
      roles: res.newState.roles ? { ...p.roles, ...res.newState.roles } : p.roles
    }));
  };

  const uiAction = async (type, val) => {
    try {
      if (type === 'RUN_TESTS') return setState(s => ({ ...s, testStatus: 'RUNNING' }));
      const res = await aiService.handleUiAction(type, val, state);
      setSubtitle(res.subtitle);
      if (res.newState) setState(p => ({ 
        ...p, ...res.newState, 
        roles: res.newState.roles ? { ...p.roles, ...res.newState.roles } : p.roles 
      }));
    } catch (err) {
      setSubtitle("ERROR: NODE_SYNC_FAILED");
    }
  };

  return { state, subtitle, interact, uiAction, logs, clearLogs };
};
