import React from 'react';
import { useChat } from '../../hooks/useChat';
import { MockAiService } from '../../services/ai/MockAiService';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';

const aiService = new MockAiService();

export const ChatContainer: React.FC = () => {
  const { messages, sendMessage } = useChat(aiService);

  return (
    <div className="chat-container">
      <header>
        <span>Toastmaster // Terminal 2077</span>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{ width: '4px', height: '14px', background: '#00f3ff' }}></div>
          <span style={{ fontSize: '0.6rem', color: 'rgba(0, 243, 255, 0.4)' }}>Uplink_v2.077</span>
        </div>
      </header>
      <MessageList messages={messages} />
      <ChatInput onSend={sendMessage} />
    </div>
  );
};
