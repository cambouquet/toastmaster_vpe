import React from 'react';
import { Message } from '../../models/Message';
import { MessageItem } from './MessageItem';

export const MessageList: React.FC<{ messages: Message[] }> = ({ messages }) => {
  return (
    <div className="message-list">
      {messages.map((msg) => (
        <MessageItem key={msg.id} message={msg} />
      ))}
    </div>
  );
};
