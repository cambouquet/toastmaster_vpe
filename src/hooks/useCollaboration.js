import { useState } from 'react';

export const useCollaboration = (aiService) => {
  const [state, setState] = useState({
    status: 'planning', roles: { speakers: [] }
  });
  const [subtitle, setSubtitle] = useState('Standby.');

  const interact = async (input) => {
    const res = await aiService.processInput(input);
    setSubtitle(res.subtitle);
    if (res.newState) setState(prev => ({ ...prev, ...res.newState }));
  };

  const uiAction = async (type, val) => {
    const res = await aiService.handleUiAction(type, val);
    setSubtitle(res.subtitle);
    if (res.newState) {
      setState(prev => {
        const next = { ...prev };
        if (res.newState?.roles) {
          next.roles = { ...next.roles, ...res.newState.roles };
        }
        if (res.newState?.theme) next.theme = res.newState.theme;
        if (res.newState?.date) next.date = res.newState.date;
        return next;
      });
    }
  };

  return { state, subtitle, interact, uiAction };
};
