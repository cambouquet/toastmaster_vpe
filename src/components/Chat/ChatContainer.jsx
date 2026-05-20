import React from 'react';
import { useCollaboration } from '../../hooks/useCollaboration';
import { MockAiService } from '../../services/ai/MockAiService';
import { MeetingWorkspace } from './workspace/MeetingWorkspace';
import { MemberRegistry } from '../Members/MemberRegistry';
import { Subtitles } from './messaging/Subtitles';
import { ChatInput } from './input/ChatInput';

const aiService = new MockAiService();

export const ChatContainer = () => {
  const { state, subtitle, interact, uiAction } = useCollaboration(aiService);
  const isWorkspace = state.currentScreen === 'workspace';

  return (
    <div className="chat-container">
      {isWorkspace ? (
        <MeetingWorkspace state={state} onAction={uiAction} />
      ) : (
        <MemberRegistry />
      )}
      {subtitle && subtitle !== 'Standby.' && <Subtitles text={subtitle} />}
      <div className="bottom-input-wrap">
        <ChatInput onSend={interact} />
      </div>
    </div>
  );
};
