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
      <header>VPE Toastmaster Assistant</header>
      <MessageList messages={messages} />
      <ChatInput onSend={sendMessage} />
    </div>
  );
};
