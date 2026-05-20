import { useState } from 'react';
import { useSystemLogs } from './useSystemLogs';
import { INITIAL_STATE } from '../data/initialState';

export const useCollaboration = (aiService) => {
  const [state, setState] = useState(INITIAL_STATE);
  const [subtitle, setSubtitle] = useState('Standby.');
  const { logs, addLog } = useSystemLogs();

  const interact = async (input) => {
    addLog(`User: ${input}`, 'user');
    const res = await aiService.processInput(input, state);
    setSubtitle(res.subtitle);
    if (res.newState) setState(prev => ({ ...prev, ...res.newState }));
  };

  const uiAction = async (type, val) => {
    try {
      console.log(`UI_EVENT_TRIGGER: ${type}`, val);
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

  return { state, subtitle, interact, uiAction, logs };
};
