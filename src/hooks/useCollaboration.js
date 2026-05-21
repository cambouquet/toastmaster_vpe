import { useState, useEffect, useRef } from 'react';
import { useSystemLogs } from './useSystemLogs';
import { INITIAL_STATE } from '../data/initialState';

export const useCollaboration = (aiService) => {
  const [state, setState] = useState({ ...INITIAL_STATE, testStatus: 'STANDBY' });
  const [subtitle, setSubtitle] = useState('Standby.');
  const { logs, addLog, clearLogs } = useSystemLogs();
  const lastReq = useRef(0);

  useEffect(() => {
    const handler = (e) => setState(p => ({ ...p, testStatus: e.detail.success ? 'PASSED' : 'FAILED' }));
    window.addEventListener('TEST_RESULT', handler);
    return () => window.removeEventListener('TEST_RESULT', handler);
  }, []);

  const interact = async (input, isType = false) => {
    const reqId = ++lastReq.current;
    if (!isType) addLog(`User: ${input}`, 'user');
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
