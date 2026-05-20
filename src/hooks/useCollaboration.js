import { useState } from 'react';

export const useCollaboration = (aiService) => {
  const [state, setState] = useState({
    status: 'planning', 
    roles: { speakers: [] },
    currentScreen: 'workspace',
    members: [
      { id: '1', name: 'Alice Chen', pathways: ['DYNAMIC_LEADERSHIP'], level: 3, status: 'ONLINE' },
      { id: '2', name: 'Bob Smith', pathways: ['STRATEGIC_RELATIONSHIPS'], level: 2, status: 'ONLINE' },
      { id: '3', name: 'Catherine Miller', pathways: ['PRESENTATION_MASTERY'], level: 5, status: 'STDBY' },
      { id: '4', name: 'David Wilson', pathways: ['INNOVATIVE_PLANNING'], level: 1, status: 'ONLINE' },
      { id: '5', name: 'Elena Rodriguez', pathways: ['LEADERSHIP_DEVELOPMENT'], level: 4, status: 'ONLINE' },
      { id: '6', name: 'Frank Thompson', pathways: ['EFFECTIVE_COACHING'], level: 2, status: 'STDBY' },
      { id: '7', name: 'Grace Lee', pathways: ['TEAM_COLLABORATION'], level: 3, status: 'ONLINE' }
    ]
  });
  const [subtitle, setSubtitle] = useState('Standby.');
  const [logs, setLogs] = useState([]);

  const addLog = (msg, type = 'info') => {
    setLogs(prev => [...prev, { time: new Date().toLocaleTimeString(), msg, type }].slice(-20));
  };

  const interact = async (input) => {
    addLog(`User: ${input}`, 'user');
    const res = await aiService.processInput(input, state);
    setSubtitle(res.subtitle);
    if (res.newState) {
      addLog(`AI: State transition detected`, 'ai');
      setState(prev => ({ ...prev, ...res.newState }));
    }
  };

  const uiAction = async (type, val) => {
    try {
      addLog(`UI: Action ${type}`, 'ui');
      const res = await aiService.handleUiAction(type, val, state);
      setSubtitle(res.subtitle);
      if (res.newState) {
        setState(prev => {
          const next = { ...prev, ...res.newState };
          if (res.newState?.roles) {
            next.roles = { ...prev.roles, ...res.newState.roles };
          }
          return next;
        });
      }
    } catch (err) {
      addLog(`ERR: ${err.message}`, 'error');
      console.error("UI_ACTION_ERROR:", err);
      setSubtitle("ERROR: NODE_SYNC_FAILED");
    }
  };

  return { state, subtitle, interact, uiAction, logs };
};
