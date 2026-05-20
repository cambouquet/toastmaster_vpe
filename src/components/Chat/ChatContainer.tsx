import React from 'react';
import { useCollaboration } from '../../hooks/useCollaboration';
import { MockAiService } from '../../services/ai/MockAiService';
import { MeetingWorkspace } from './MeetingWorkspace';
import { Subtitles } from './Subtitles';
import { ChatInput } from './ChatInput';

const aiService = new MockAiService();

export const ChatContainer: React.FC = () => {
  const { state, subtitle, interact, uiAction } = useCollaboration(aiService);

  return (
    <div className="chat-container">
      <header><span>Toastmaster</span></header>
      <MeetingWorkspace state={state} onAction={uiAction} />
      <Subtitles text={subtitle} />
      <div className="bottom-input-wrap">
        <ChatInput onSend={interact} />
      </div>
    </div>
  );
};
