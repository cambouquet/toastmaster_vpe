import { useState, useEffect } from 'react';
import { useSystemLogs } from './useSystemLogs';
import { INITIAL_STATE } from '../data/initialState';

export const useCollaboration = (aiService) => {
  const [state, setState] = useState({ ...INITIAL_STATE, testStatus: 'STANDBY' });
  const [subtitle, setSubtitle] = useState('Standby.');
  const { logs, addLog, clearLogs } = useSystemLogs();

  useEffect(() => {
    const handler = (e) => {
      const res = e.detail;
      setState(prev => ({ ...prev, testStatus: res.success ? 'PASSED' : 'FAILED' }));
      console[res.success ? 'log' : 'error'](`TEST RUN COMPLETE: ${res.success ? 'SUCCESS' : 'FAILURE'}`);
    };
    window.addEventListener('TEST_RESULT', handler);
    return () => window.removeEventListener('TEST_RESULT', handler);
  }, []);

  const interact = async (input) => {
    addLog(`User: ${input}`, 'user');
    const res = await aiService.processInput(input, state);
    setSubtitle(res.subtitle);
    if (res.newState) setState(prev => ({ ...prev, ...res.newState }));
  };

  const uiAction = async (type, val) => {
    try {
      console.log(`UI EVENT TRIGGER: ${type}`, val);
      if (type === 'RUN_TESTS') {
        setState(s => ({ ...s, testStatus: 'RUNNING' }));
        return;
      }
      console.debug(`CTX: ${JSON.stringify(val).slice(0, 50)}`);
      const res = await aiService.handleUiAction(type, val, state);
      setSubtitle(res.subtitle);
      if (res.newState) {
        console.log(`STATE_SYNC_INITIATED`, res.newState);
        setState(prev => {
          const next = { ...prev, ...res.newState };
          if (res.newState?.roles) next.roles = { ...prev.roles, ...res.newState.roles };
          return next;
        });
      }
    } catch (err) {
      console.error("NODE_SYNC_FAILED", err);
      setSubtitle("ERROR: NODE_SYNC_FAILED");
    }
  };

  return { state, subtitle, interact, uiAction, logs, clearLogs };
};
