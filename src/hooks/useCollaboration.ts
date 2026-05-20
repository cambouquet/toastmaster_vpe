import { useState } from 'react';
import { MeetingState } from '../models/Collaboration';
import { AiService } from '../services/ai/AiService';

export const useCollaboration = (aiService: AiService) => {
  const [state, setState] = useState<MeetingState>({
    status: 'planning', roles: { speakers: [] }
  });
  const [subtitle, setSubtitle] = useState('Standby.');

  const interact = async (input: string) => {
    const res = await aiService.processInput(input);
    setSubtitle(res.subtitle);
    if (res.newState) setState(prev => ({ ...prev, ...res.newState }));
  };

  const uiAction = async (type: string, val: any) => {
    const res = await aiService.handleUiAction(type, val);
    setSubtitle(res.subtitle);
    if (res.newState) setState(prev => ({ ...prev, ...res.newState }));
  };

  return { state, subtitle, interact, uiAction };
};
