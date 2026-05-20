import React from 'react';
import { Message } from '../../models/Message';
import './Chat.scss';

export const MessageItem: React.FC<{ message: Message }> = ({ message }) => {
  return (
    <div className={`message-item ${message.sender}`}>
      <div className="message-content">
        {message.text}
      </div>
      <span className="timestamp">
        {message.timestamp.toLocaleTimeString()}
      </span>
    </div>
  );
};
